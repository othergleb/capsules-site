import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

// ── Types ──────────────────────────────────────────────────────

type Props = {
  params: Promise<{ token: string }>
}

type TokenState = 'valid' | 'used' | 'expired' | 'not_found'

// ── Helpers ────────────────────────────────────────────────────

function getTokenState(token: {
  expires_at: string
  used_at: string | null
} | null): TokenState {
  if (!token) return 'not_found'
  if (token.used_at) return 'used'
  if (new Date(token.expires_at) < new Date()) return 'expired'
  return 'valid'
}

// ── Error UI ───────────────────────────────────────────────────

function PurchasePage({
  title,
  body,
}: {
  title: string
  body: string
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
      {/* Logo */}
      <div style={{ marginBottom: '3rem', opacity: 0.6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="OTHER" style={{ height: '2rem' }} />
      </div>

      {/* Message */}
      <div
        style={{
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
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
          }}
        >
          {body}
        </p>
      </div>

      {/* Footer */}
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

// ── Route handler ──────────────────────────────────────────────

export default async function PurchaseTokenPage({ params }: Props) {
  const { token } = await params

  // Basic format check — tokens are UUIDs
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(token)) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const now = new Date().toISOString()

  const { data: pt } = await supabase
    .from('purchase_tokens')
    .select('id, expires_at, used_at, accessed_at, member_id, type')
    .eq('token', token)
    .maybeSingle() as {
      data: {
        id: string
        expires_at: string
        used_at: string | null
        accessed_at: string | null
        member_id: string
        type: 'winner' | 'waitlist'
      } | null
    }

  const state = getTokenState(pt)

  // ── Invalid states ─────────────────────────────────────────────

  if (state === 'not_found') {
    return (
      <PurchasePage
        title="Invalid link"
        body="This purchase link isn't valid. If you think this is a mistake, please get in touch at hello@otherwine.co.uk."
      />
    )
  }

  if (state === 'used') {
    return (
      <PurchasePage
        title="Already purchased"
        body="This link has already been used to complete a purchase. If you need help with your order, email hello@otherwine.co.uk."
      />
    )
  }

  if (state === 'expired') {
    return (
      <PurchasePage
        title="Your window has closed"
        body="The purchase window for this allocation has passed. Your slot has been released. Keep an eye out — Capsule 02 is coming."
      />
    )
  }

  // ── Valid — record first access, then redirect ──────────────────

  if (!pt!.accessed_at) {
    await supabase
      .from('purchase_tokens')
      .update({ accessed_at: now })
      .eq('id', pt!.id)
  }

  const shopifyUrl = process.env.SHOPIFY_PURCHASE_URL
  if (!shopifyUrl) {
    // Shopify not yet configured — show holding page
    return (
      <PurchasePage
        title="Almost there"
        body="The shop is being set up. Your allocation is reserved — please check back shortly or email hello@otherwine.co.uk."
      />
    )
  }

  redirect(shopifyUrl)
}
