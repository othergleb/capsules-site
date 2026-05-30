// ── POST /api/waitlist ─────────────────────────────────────────────
//
// Programmatic waitlist opt-in. Used for internal/future integrations.
// The /waitlist/[memberId] page uses a server action instead, but this
// API route allows scripted access (e.g. bulk imports, testing).
//
// Body: { memberId: string }
//
// Returns: { ok: true } on success (idempotent — safe to call twice)

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY!
const SITE_URL    = (process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk').replace(/\/$/, '')

export async function POST(req: NextRequest) {
  let memberId: string

  try {
    const body = await req.json()
    memberId = body.memberId
    if (!memberId || typeof memberId !== 'string') {
      return NextResponse.json({ error: 'memberId is required' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const { data: member } = await supabase
    .from('members')
    .select('id, email, status')
    .eq('id', memberId)
    .maybeSingle()

  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  }

  // Already waitlisted — idempotent, return success
  if (member.status === 'waitlisted') {
    return NextResponse.json({ ok: true, already: true })
  }

  if (member.status !== 'not_selected') {
    return NextResponse.json(
      { error: `Cannot join waitlist from status '${member.status}'` },
      { status: 409 }
    )
  }

  // Update status
  const { error } = await supabase
    .from('members')
    .update({ status: 'waitlisted' })
    .eq('id', memberId)

  if (error) {
    console.error('[waitlist] Supabase update failed', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  // Fire Klaviyo event
  try {
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
            metric:     { data: { type: 'metric', attributes: { name: 'Waitlist Joined' } } },
            profile:    { data: { type: 'profile', attributes: { email: member.email } } },
            properties: {
              capsule_id:   'capsule-01',
              waitlist_url: `${SITE_URL}/waitlist/${memberId}`,
            },
          },
        },
      }),
    })
  } catch (err) {
    console.error('[waitlist] Klaviyo event failed', err)
    // Don't fail the request — the DB update succeeded
  }

  return NextResponse.json({ ok: true })
}
