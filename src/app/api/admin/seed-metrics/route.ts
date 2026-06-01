// ── Temporary: seed Klaviyo metrics ───────────────────────────────
// One-shot endpoint to fire placeholder Klaviyo events so the metrics
// exist in the account and can be used as flow triggers.
// DELETE this file after metrics are created.

import { NextRequest, NextResponse } from 'next/server'

const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY!
const SEED_EMAIL  = 'klaviyo-seed@otherwine.co.uk'

async function fireEvent(name: string) {
  const res = await fetch('https://a.klaviyo.com/api/events/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type': 'application/json',
      'revision': '2024-02-15',
    },
    body: JSON.stringify({
      data: {
        type: 'event',
        attributes: {
          metric: { data: { type: 'metric', attributes: { name } } },
          profile: { data: { type: 'profile', attributes: { email: SEED_EMAIL } } },
          properties: {},
        },
      },
    }),
  })
  return res.status
}

export async function POST(req: NextRequest) {
  void req
  const results: Record<string, number> = {}
  results['Waitlist Joined']    = await fireEvent('Waitlist Joined')
  results['Waitlist Allocated'] = await fireEvent('Waitlist Allocated')
  return NextResponse.json({ ok: true, results })
}
