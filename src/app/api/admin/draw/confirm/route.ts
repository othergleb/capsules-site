// ── POST /api/admin/draw/confirm ───────────────────────────────────
//
// Called by the admin draw page once winners are reviewed and confirmed.
// For each winner:
//   1. Creates a purchase_token (48hr expiry)
//   2. Updates member status → 'allocated'
//   3. Fires 'Ballot Winner Selected' Klaviyo event with purchase URL
//
// For all remaining registered/paired members:
//   4. Updates status → 'not_selected'
//   5. Fires 'Ballot Not Selected' Klaviyo event
//
// Protected by HTTP Basic Auth middleware (see src/middleware.ts).
// Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import type { DrawWinner } from '@/lib/purchase-types'

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY!
const SITE_URL    = (process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk').replace(/\/$/, '')

// 48-hour purchase window
const WINDOW_HOURS = 48

// ── Klaviyo helper ─────────────────────────────────────────────────

async function klaviyoTrackEvent(
  email: string,
  eventName: string,
  properties: Record<string, unknown>
): Promise<void> {
  try {
    const res = await fetch('https://a.klaviyo.com/api/events/', {
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
            metric:     { data: { type: 'metric', attributes: { name: eventName } } },
            profile:    { data: { type: 'profile', attributes: { email } } },
            properties,
          },
        },
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error(`[Klaviyo] ${eventName} for ${email} failed (${res.status}):`, text)
    }
  } catch (err) {
    console.error(`[Klaviyo] ${eventName} for ${email} threw:`, err)
  }
}

// ── Route handler ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let winners: DrawWinner[]

  try {
    const body = await req.json()
    winners = body.winners
    if (!Array.isArray(winners)) {
      return NextResponse.json({ error: 'winners array is required' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const now        = new Date()
  const expiresAt  = new Date(now.getTime() + WINDOW_HOURS * 60 * 60 * 1000)
  const winnerIds  = new Set(winners.map(w => w.member_id))

  let tokensCreated = 0
  let klaviyoFired  = 0
  const errors: string[] = []

  // ── 1. Process winners ─────────────────────────────────────────

  for (const winner of winners) {
    try {
      // Create purchase token
      const { data: tokenRow, error: tokenErr } = await supabase
        .from('purchase_tokens')
        .insert({
          member_id:  winner.member_id,
          type:       'winner',
          capsule_id: 'capsule-01',
          expires_at: expiresAt.toISOString(),
        })
        .select('token')
        .single()

      if (tokenErr || !tokenRow) {
        errors.push(`Token failed for ${winner.email}: ${tokenErr?.message ?? 'unknown'}`)
        continue
      }

      const purchaseUrl = `${SITE_URL}/purchase/${tokenRow.token}`

      // Update member status
      await supabase
        .from('members')
        .update({ status: 'allocated', allocated_at: now.toISOString() })
        .eq('id', winner.member_id)

      // Fire Klaviyo event
      await klaviyoTrackEvent(winner.email, 'Ballot Winner Selected', {
        purchase_url:      purchaseUrl,
        purchase_deadline: expiresAt.toISOString(),
        type:              winner.type,
      })

      tokensCreated++
      klaviyoFired++
    } catch (err) {
      errors.push(`Error processing winner ${winner.email}: ${String(err)}`)
    }
  }

  // ── 2. Mark non-winners ────────────────────────────────────────

  // Fetch all members still in pre-ballot statuses
  const { data: ballotPool } = await supabase
    .from('members')
    .select('id, email')
    .in('status', ['registered', 'paired'])

  const nonWinners = (ballotPool ?? []).filter(
    (m: { id: string; email: string }) => !winnerIds.has(m.id)
  )

  if (nonWinners.length > 0) {
    const nonWinnerIds = nonWinners.map((m: { id: string }) => m.id)

    // Bulk status update
    await supabase
      .from('members')
      .update({ status: 'not_selected' })
      .in('id', nonWinnerIds)

    // Fire Klaviyo events for each non-winner
    for (const m of nonWinners) {
      await klaviyoTrackEvent(m.email, 'Ballot Not Selected', {})
      klaviyoFired++
    }
  }

  console.log(
    `[draw/confirm] Winners: ${tokensCreated}, Non-winners: ${nonWinners.length}, Errors: ${errors.length}`
  )

  return NextResponse.json({
    ok:              true,
    tokensCreated,
    klaviyoFired,
    nonWinnersMarked: nonWinners.length,
    errors,
  })
}
