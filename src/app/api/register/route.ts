import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!
const KLAVIYO_KEY     = process.env.KLAVIYO_PRIVATE_KEY!

// ── Klaviyo helpers ────────────────────────────────────────────

async function klaviyoCreateProfile(email: string, firstName?: string, lastName?: string) {
  const attributes: Record<string, string> = { email }
  if (firstName) attributes.first_name = firstName
  if (lastName)  attributes.last_name  = lastName

  const res = await fetch('https://a.klaviyo.com/api/profiles/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type':  'application/json',
      'revision':      '2024-02-15',
    },
    body: JSON.stringify({
      data: { type: 'profile', attributes },
    }),
  })

  if (res.status === 409) {
    const body = await res.json()
    return body.errors?.[0]?.meta?.duplicate_profile_id as string | undefined
  }

  if (!res.ok) {
    console.error('[Klaviyo] createProfile failed', await res.text())
    return undefined
  }

  const body = await res.json()
  return body.data?.id as string | undefined
}

async function klaviyoSubscribeToList(profileId: string) {
  const res = await fetch(
    `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
        'Content-Type':  'application/json',
        'revision':      '2024-02-15',
      },
      body: JSON.stringify({
        data: [{ type: 'profile', id: profileId }],
      }),
    }
  )

  if (!res.ok && res.status !== 204) {
    console.error('[Klaviyo] subscribeToList failed', await res.text())
  }
}

async function klaviyoTrackRegistration(email: string, inviteCode: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk'

  await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type':  'application/json',
      'revision':      '2024-02-15',
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: 'Ballot Registration' } } },
          profile: { data: { type: 'profile', attributes: { email } } },
          properties: {
            invite_link:   `${siteUrl}/?ref=${inviteCode}`,
            ballot_closes: '20 June 2026',
          },
        },
      },
    }),
  })
}

async function klaviyoTrackCompanionAccepted(referrerEmail: string) {
  await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type':  'application/json',
      'revision':      '2024-02-15',
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name: 'Companion Accepted' } } },
          profile: { data: { type: 'profile', attributes: { email: referrerEmail } } },
          properties: {},
        },
      },
    }),
  })
}

// ── Route handler ──────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { email, name, refCode } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const cleanEmail = email.toLowerCase().trim()
  const cleanName  = typeof name === 'string' ? name.trim() : ''

  // Parse first / last name for Klaviyo
  const nameParts = cleanName.split(/\s+/)
  const firstName = nameParts[0] ?? ''
  const lastName  = nameParts.slice(1).join(' ')

  // 1. Check for duplicate
  const { data: existing } = await supabase
    .from('members')
    .select('id')
    .eq('email', cleanEmail)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
  }

  // 2. Look up referrer if refCode provided
  let referrer: { id: string; email: string; companion_id: string | null } | null = null
  if (refCode) {
    const { data } = await supabase
      .from('members')
      .select('id, email, companion_id')
      .eq('invite_code', refCode)
      .maybeSingle()
    referrer = data ?? null
  }

  // 3. Insert member (tier 1 if referred, otherwise tier 2)
  const { data: member, error } = await supabase
    .from('members')
    .insert({
      email:         cleanEmail,
      name:          cleanName || null,
      status:        'registered',
      tier:          referrer ? 1 : 2,
      invited_by_id: referrer?.id ?? null,
    })
    .select()
    .single()

  if (error || !member) {
    console.error('[Supabase] insert failed', error)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }

  // 4. If referred — bump referrer to tier 1 and fire Klaviyo event
  if (referrer && !referrer.companion_id) {
    await supabase
      .from('members')
      .update({ companion_id: member.id, tier: 1 })
      .eq('id', referrer.id)

    try {
      await klaviyoTrackCompanionAccepted(referrer.email)
    } catch (err) {
      console.error('[Klaviyo] companion accepted event failed', err)
    }
  }

  // 5. Klaviyo: create profile, subscribe, track event
  try {
    const profileId = await klaviyoCreateProfile(cleanEmail, firstName || undefined, lastName || undefined)
    if (profileId) {
      await klaviyoSubscribeToList(profileId)
      await supabase.from('members').update({ klaviyo_id: profileId }).eq('id', member.id)
    }
    await klaviyoTrackRegistration(cleanEmail, member.invite_code)
  } catch (err) {
    console.error('[Klaviyo] error during registration', err)
  }

  return NextResponse.json({ success: true, inviteCode: member.invite_code })
}
