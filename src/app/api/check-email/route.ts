// ── POST /api/check-email ─────────────────────────────────────────
// Checks whether an email is already registered.
// Returns { exists: true, name, inviteCode } or { exists: false }.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ exists: false })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const cleanEmail = email.toLowerCase().trim()

  const { data } = await supabase
    .from('members')
    .select('name, invite_code')
    .eq('email', cleanEmail)
    .maybeSingle()

  if (!data) return NextResponse.json({ exists: false })

  return NextResponse.json({
    exists:     true,
    name:       data.name ?? '',
    inviteCode: data.invite_code,
  })
}
