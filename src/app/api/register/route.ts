import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
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
      data: {
        type: 'profile',
        attributes: {
          ...attributes,
          properties: { 'capsule-01': true },
        },
      },
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

async function klaviyoSubscribeWithConsent(email: string) {
  const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type':  'application/json',
      'revision':      '2024-02-15',
    },
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [{
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED',
                      consented_at: new Date().toISOString(),
                    },
                  },
                },
              },
            }],
          },
        },
        relationships: {
          list: { data: { type: 'list', id: KLAVIYO_LIST_ID } },
        },
      },
    }),
  })

  if (!res.ok) {
    console.error('[Klaviyo] subscribeWithConsent failed', await res.text())
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

async function klaviyoTrackPresaleUnlocked(referrerEmail: string) {
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
          metric: { data: { type: 'metric', attributes: { name: 'Presale Unlocked' } } },
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

  // 2. Look up referrer if refCode provided
  let referrer: { id: string; email: string; referral_count: number; presale_unlocked: boolean } | null = null
  if (refCode) {
    const { data } = await supabase
      .from('members')
      .select('id, email, referral_count, presale_unlocked')
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

  // 4. If referred — increment referral_count, keep/set tier 1, unlock presale at 2 referrals
  let presaleJustUnlocked = false
  if (referrer) {
    const newCount = (referrer.referral_count ?? 0) + 1
    presaleJustUnlocked = newCount >= 2 && !referrer.presale_unlocked

    await supabase
      .from('members')
      .update({
        companion_id:     member.id,
        tier:             1,
        referral_count:   newCount,
        ...(presaleJustUnlocked ? { presale_unlocked: true } : {}),
      })
      .eq('id', referrer.id)
  }

  // 5. Return immediately — fire Klaviyo calls in the background
  const klaviyoInBackground = async () => {
    if (referrer) {
      try { await klaviyoTrackCompanionAccepted(referrer.email) }
      catch (err) { console.error('[Klaviyo] companion accepted failed', err) }
      if (presaleJustUnlocked) {
        try { await klaviyoTrackPresaleUnlocked(referrer.email) }
        catch (err) { console.error('[Klaviyo] presale unlocked failed', err) }
      }
    }
    try {
      const profileId = await klaviyoCreateProfile(cleanEmail, firstName || undefined, lastName || undefined)
      if (profileId) {
        await supabase.from('members').update({ klaviyo_id: profileId }).eq('id', member.id)
      }
      await klaviyoSubscribeWithConsent(cleanEmail)
      await klaviyoTrackRegistration(cleanEmail, member.invite_code)
    } catch (err) {
      console.error('[Klaviyo] registration flow failed', err)
    }
  }

  waitUntil(klaviyoInBackground())

  return NextResponse.json({ success: true, inviteCode: member.invite_code })
}
