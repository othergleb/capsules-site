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
  const { email, name, refCode, srcCode } = await req.json()

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

  // 1. Check for existing member — return their details so frontend can show "welcome back"
  const { data: existing } = await supabase
    .from('members')
    .select('id, name, invite_code')
    .eq('email', cleanEmail)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({
      returning:   true,
      name:        existing.name ?? '',
      inviteCode:  existing.invite_code,
    }, { status: 200 })
  }

  // 2. Look up referrer if refCode provided (no limit on how many referrals a member can make)
  let referrer: { id: string; email: string } | null = null
  if (refCode) {
    const { data } = await supabase
      .from('members')
      .select('id, email')
      .eq('invite_code', refCode)
      .maybeSingle()
    referrer = data ?? null
  }

  // 3. Insert member — always tier 2 on signup; tier 1 earned by referring
  const { data: member, error } = await supabase
    .from('members')
    .insert({
      email:         cleanEmail,
      name:          cleanName || null,
      status:        'registered',
      tier:          2,
      source:        typeof srcCode === 'string' ? srcCode : null,
      invited_by_id: referrer?.id ?? null,
    })
    .select()
    .single()

  if (error || !member) {
    console.error('[Supabase] insert failed', error)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }

  // 4. If referred — bump referrer to tier 1 (awaited: important DB write)
  if (referrer) {
    await supabase
      .from('members')
      .update({ companion_id: member.id, tier: 1 })
      .eq('id', referrer.id)
  }

  // 5. Return immediately — fire Klaviyo calls in the background
  const klaviyoInBackground = async () => {
    if (referrer) {
      try { await klaviyoTrackCompanionAccepted(referrer.email) }
      catch (err) { console.error('[Klaviyo] companion accepted failed', err) }
    }
    try {
      const profileId = await klaviyoCreateProfile(cleanEmail, firstName || undefined, lastName || undefined)
      if (profileId) {
        await klaviyoSubscribeToList(profileId)
        await supabase.from('members').update({ klaviyo_id: profileId }).eq('id', member.id)
      }
      await klaviyoTrackRegistration(cleanEmail, member.invite_code)
    } catch (err) {
      console.error('[Klaviyo] registration flow failed', err)
    }
  }

  void klaviyoInBackground()

  return NextResponse.json({ success: true, inviteCode: member.invite_code })
}
