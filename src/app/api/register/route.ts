import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase-server'  // uncomment once Supabase is set up
// import { Resend } from 'resend'                        // uncomment once Resend is set up

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  // ── TODO: wire up Supabase ───────────────────────────────────
  // const supabase = createClient()
  //
  // 1. Check if member already exists
  // const { data: existing } = await supabase
  //   .from('members')
  //   .select('id')
  //   .eq('email', email)
  //   .single()
  //
  // if (existing) {
  //   return NextResponse.json({ error: 'Already registered.' }, { status: 409 })
  // }
  //
  // 2. Generate member number (auto-increment via Supabase sequence)
  // const { data: member, error } = await supabase
  //   .from('members')
  //   .insert({ email, status: 'registered' })
  //   .select()
  //   .single()
  //
  // if (error) {
  //   return NextResponse.json({ error: 'Registration failed.' }, { status: 500 })
  // }
  //
  // 3. Send registration email via Resend (magic link + member number)
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'Capsules <capsules@otherwine.co.uk>',
  //   to: email,
  //   subject: `You're in — Member #${member.member_number}`,
  //   // html: RegistrationEmailTemplate({ memberNumber: member.member_number, magicLink: '...' })
  // })
  // ────────────────────────────────────────────────────────────

  // Placeholder response (remove once Supabase is wired)
  console.log(`[DEV] Registration received for: ${email}`)
  return NextResponse.json({ success: true })
}
