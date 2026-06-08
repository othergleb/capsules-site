import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY!

// ── Klaviyo helpers ────────────────────────────────────────────

async function klaviyoTrackCompanionInvite(
  referrerEmail:  string,
  companionEmail: string,
  inviteCode:     string,
) {
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk'
  const inviteUrl = `${siteUrl}/?ref=${inviteCode}`

  // Event on referrer's profile
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
          metric: { data: { type: 'metric', attributes: { name: 'Companion Invited' } } },
          profile: { data: { type: 'profile', attributes: { email: referrerEmail } } },
          properties: { invite_link: inviteUrl },
        },
      },
    }),
  })

  // Event on companion's profile — triggers the invitation email flow
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
          metric: { data: { type: 'metric', attributes: { name: 'Companion Invitation Received' } } },
          profile: { data: { type: 'profile', attributes: { email: companionEmail } } },
          properties: { referrer_email: referrerEmail, invite_link: inviteUrl },
        },
      },
    }),
  })
}

async function klaviyoTrackAdminInvite(
  inviteeEmail: string,
  inviteCode:   string,
) {
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk'
  const inviteUrl = `${siteUrl}/?ref=${inviteCode}`

  // Event on invitee's profile — triggers the personal invite email flow
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
          metric: { data: { type: 'metric', attributes: { name: 'Admin Invite Received' } } },
          profile: { data: { type: 'profile', attributes: { email: inviteeEmail } } },
          properties: { invite_link: inviteUrl },
        },
      },
    }),
  })
}

// ── Route handler ──────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { email, inviteEmail } = await req.json()

  if (!email || !inviteEmail) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  if (email.toLowerCase().trim() === inviteEmail.toLowerCase().trim()) {
    return NextResponse.json({ error: 'You can\'t invite yourself.' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  // 1. Find the referrer's member record
  const { data: member, error } = await supabase
    .from('members')
    .select('id, invite_code, companion_id, is_admin')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle() as {
      data: { id: string; invite_code: string; companion_id: string | null; is_admin: boolean } | null
      error: unknown
    }

  if (error || !member) {
    console.error('[Supabase] member lookup failed', error)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })
  }

  // ── Admin path: unlimited invites, no companion pairing ───────
  if (member.is_admin) {
    try {
      await klaviyoTrackAdminInvite(inviteEmail, member.invite_code)
    } catch (err) {
      console.error('[Klaviyo] admin invite error', err)
      return NextResponse.json({ error: 'Invite could not be sent. Please try again.' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  }

  // ── Standard path: one companion, ballot pairing ──────────────

  // Block if companion already confirmed
  if (member.companion_id) {
    return NextResponse.json({ error: 'You already have a confirmed companion.' }, { status: 409 })
  }

  try {
    await klaviyoTrackCompanionInvite(email, inviteEmail, member.invite_code)
  } catch (err) {
    console.error('[Klaviyo] companion invite error', err)
    return NextResponse.json({ error: 'Invite could not be sent. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
