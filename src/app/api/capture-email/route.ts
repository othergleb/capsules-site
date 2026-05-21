import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

const KLAVIYO_KEY    = process.env.KLAVIYO_PRIVATE_KEY!
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!

async function klaviyoSubscribeEmail(email: string) {
  // Create profile
  const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
    method: 'POST',
    headers: {
      'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
      'Content-Type':  'application/json',
      'revision':      '2024-02-15',
    },
    body: JSON.stringify({
      data: { type: 'profile', attributes: { email } },
    }),
  })

  let profileId: string | undefined
  if (profileRes.status === 409) {
    const body = await profileRes.json()
    profileId = body.errors?.[0]?.meta?.duplicate_profile_id
  } else if (profileRes.ok) {
    const body = await profileRes.json()
    profileId = body.data?.id
  }

  if (!profileId) return

  // Subscribe to list
  await fetch(
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
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email required.' }, { status: 400 })
  }

  const supabase = createClient() as any // eslint-disable-line @typescript-eslint/no-explicit-any
  const cleanEmail = email.toLowerCase().trim()

  // Upsert — if they complete step 2 later, register route will update the same row
  const { error } = await supabase
    .from('members')
    .upsert({ email: cleanEmail, status: 'registered' }, { onConflict: 'email', ignoreDuplicates: true })

  if (error) {
    console.error('[Supabase] capture-email upsert failed', error)
    // Don't block — still try Klaviyo
  }

  try {
    await klaviyoSubscribeEmail(cleanEmail)
  } catch (err) {
    console.error('[Klaviyo] capture-email failed', err)
  }

  return NextResponse.json({ success: true })
}
