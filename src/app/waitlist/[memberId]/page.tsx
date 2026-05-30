// ── /waitlist/[memberId] ───────────────────────────────────────────
//
// Opt-in page linked from the "Ballot Not Selected" (Missed Out) email.
// The memberId in the URL is their UUID — not guessable from outside.
//
// GET:  shows a confirmation button
// POST: (server action) marks member as 'waitlisted', fires Klaviyo event

import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

type Props = {
  params: Promise<{ memberId: string }>
}

// ── Server action ─────────────────────────────────────────────────

async function optIntoWaitlist(formData: FormData) {
  'use server'

  const memberId = formData.get('memberId') as string
  if (!memberId) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const key      = process.env.KLAVIYO_PRIVATE_KEY!
  const siteUrl  = (process.env.NEXT_PUBLIC_SITE_URL || 'https://capsules.otherwine.co.uk').replace(/\/$/, '')

  // Fetch member
  const { data: member } = await supabase
    .from('members')
    .select('id, email, status')
    .eq('id', memberId)
    .maybeSingle()

  if (!member) return

  // Idempotent — only update if they haven't already joined
  if (member.status === 'not_selected') {
    await supabase
      .from('members')
      .update({ status: 'waitlisted' })
      .eq('id', memberId)

    // Fire Klaviyo event
    try {
      await fetch('https://a.klaviyo.com/api/events/', {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${key}`,
          'Content-Type':  'application/json',
          'revision':      '2024-02-15',
        },
        body: JSON.stringify({
          data: {
            type: 'event',
            attributes: {
              metric:     { data: { type: 'metric', attributes: { name: 'Waitlist Joined' } } },
              profile:    { data: { type: 'profile', attributes: { email: member.email } } },
              properties: { capsule_id: 'capsule-01', waitlist_url: `${siteUrl}/waitlist/${memberId}` },
            },
          },
        }),
      })
    } catch (err) {
      console.error('[waitlist] Klaviyo event failed', err)
    }
  }

  redirect(`/waitlist/${memberId}/confirmed`)
}

// ── UI ─────────────────────────────────────────────────────────────

function WaitlistPage({
  title,
  body,
  children,
}: {
  title: string
  body: string
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100svh',
        backgroundColor: '#F2EDE6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Vulf Sans', sans-serif",
      }}
    >
      <div style={{ marginBottom: '3rem', opacity: 0.6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="OTHER" style={{ height: '2rem' }} />
      </div>

      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Vulf Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            marginBottom: '1rem',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#444',
            marginBottom: '1.75rem',
          }}
        >
          {body}
        </p>
        {children}
      </div>

      <p
        style={{
          position: 'fixed',
          bottom: '2rem',
          fontWeight: 300,
          fontSize: '0.75rem',
          color: '#999',
          letterSpacing: '0.03em',
        }}
      >
        CAPSULE 01 — OTHER WINE
      </p>
    </div>
  )
}

// ── Route ──────────────────────────────────────────────────────────

export default async function WaitlistOptInPage({ params }: Props) {
  const { memberId } = await params

  // UUID format check
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(memberId)) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const { data: member } = await supabase
    .from('members')
    .select('id, status')
    .eq('id', memberId)
    .maybeSingle()

  if (!member) notFound()

  // Already joined
  if (member.status === 'waitlisted') {
    return (
      <WaitlistPage
        title="You're on the waitlist"
        body="You've already joined the waitlist for Capsule 01. We'll be in touch if a slot opens up."
      />
    )
  }

  // Already purchased, or ineligible
  if (!['not_selected', 'waitlisted'].includes(member.status)) {
    return (
      <WaitlistPage
        title="Not available"
        body="This link isn't valid for your account. If you think this is a mistake, email hello@otherwine.co.uk."
      />
    )
  }

  return (
    <WaitlistPage
      title="Join the waitlist"
      body="You didn't win a place in the Capsule 01 ballot, but slots sometimes open up when winner windows expire. Join the waitlist and we'll reach out if one becomes available."
    >
      <form action={optIntoWaitlist}>
        <input type="hidden" name="memberId" value={memberId} />
        <button
          type="submit"
          style={{
            backgroundColor: '#1B2A3B',
            color: '#F2EDE6',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 2rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: "'Vulf Sans', sans-serif",
          }}
        >
          Join Waitlist
        </button>
      </form>
    </WaitlistPage>
  )
}
