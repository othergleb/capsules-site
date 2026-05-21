import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY!

// ── Klaviyo: send companion invitation email ───────────────────

async function klaviyoTrackCompanionInvite(
  referrerEmail: string,
  referrerName:  string,
  companionEmail: string,
  inviteCode:    string,
) {
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk'
  const inviteUrl = `${siteUrl}/?ref=${inviteCode}`

  // Track the event on the referrer's profile
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
          properties: {
            referrer_name:   referrerName,
            companion_email: companionEmail,
            invite_link:     inviteUrl,
          },
        },
      },
    }),
  })

  // Track the event on the companion's profile (creates profile if needed)
  // This is what triggers the invitation email flow in Klaviyo
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
          properties: {
            referrer_name:   referrerName,
            referrer_email:  referrerEmail,
            invite_link:     inviteUrl,
          },
        },
      },
    }),
  })
}

// ── Route handler ──────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { email, name, inviteEmail } = await req.json()

  if (!email || !name || !inviteEmail) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  // Basic validation — companion can't invite themselves
  if (email.toLowerCase().trim() === inviteEmail.toLowerCase().trim()) {
    return NextResponse.json({ error: 'You can\'t invite yourself.' }, { status: 400 })
  }

  const supabase = createClient()

  // 1. Find the referrer's member record
  const { data: member, error } = await supabase
    .from('members')
    .select('id, invite_code, companion_id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle() as { data: { id: string; invite_code: string; companion_id: string | null } | null; error: unknown }

  if (error || !member) {
    console.error('[Supabase] member lookup failed', error)
    return NextResponse.json({ error: 'Member not found.' }, { status: 404 })
  }

  // 2. Check they haven't already confirmed a companion
  if (member.companion_id) {
    return NextResponse.json({ error: 'You already have a confirmed companion.' }, { status: 409 })
  }

  // 3. Store the companion email on the member record
  await supabase
    .from('members')
    .update({ companion_email: inviteEmail.toLowerCase().trim() })
    .eq('id', member.id)

  // 4. Send via Klaviyo
  try {
    await klaviyoTrackCompanionInvite(email, name, inviteEmail, member.invite_code)
  } catch (err) {
    console.error('[Klaviyo] companion invite error', err)
    // Invite email failed but companion_email is saved — can retry
    return NextResponse.json({ error: 'Invite could not be sent. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
