// ── POST /api/admin/grant-tier1 ───────────────────────────────────
// Manually upgrades a member to Tier 1 (early access) by email.
// Protected by HTTP Basic Auth middleware.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  let email: string

  try {
    const body = await req.json()
    email = (body.email ?? '').toLowerCase().trim()
    if (!email) throw new Error('missing email')
  } catch {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const { data: member, error: findErr } = await supabase
    .from('members')
    .select('id, email, tier')
    .eq('email', email)
    .maybeSingle()

  if (findErr || !member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  }

  if (member.tier === 1) {
    return NextResponse.json({ ok: true, message: 'Already Tier 1', email })
  }

  const { error: updateErr } = await supabase
    .from('members')
    .update({ tier: 1 })
    .eq('id', member.id)

  if (updateErr) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: 'Upgraded to Tier 1', email })
}
