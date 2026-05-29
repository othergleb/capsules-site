// ── Shopify Order Webhook ──────────────────────────────────────
//
// POST /api/purchase/webhook
//
// Called by Shopify when an order is created. Finds the matching
// purchase_token by customer email + capsule_id, marks it as used,
// and updates the member's status to 'purchased'.
//
// Setup in Shopify Admin → Settings → Notifications → Webhooks:
//   Topic:   orders/create
//   URL:     https://capsules.otherwine.co.uk/api/purchase/webhook
//   Format:  JSON
//
// Verify the request with SHOPIFY_WEBHOOK_SECRET in .env.local

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase-server'

// ── Signature verification ─────────────────────────────────────

async function verifyShopifyWebhook(req: NextRequest, rawBody: string): Promise<boolean> {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret) {
    console.warn('[Shopify webhook] SHOPIFY_WEBHOOK_SECRET not set — skipping verification')
    return true
  }

  const hmac = req.headers.get('x-shopify-hmac-sha256')
  if (!hmac) return false

  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64')

  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac))
}

// ── Route handler ──────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  const valid = await verifyShopifyWebhook(req, rawBody)
  if (!valid) {
    console.error('[Shopify webhook] Invalid HMAC signature')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let order: {
    id: number
    email: string
    line_items: Array<{ product_id: number; title: string }>
  }

  try {
    order = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const customerEmail = order.email?.toLowerCase().trim()
  const shopifyOrderId = String(order.id)

  if (!customerEmail) {
    console.warn('[Shopify webhook] Order has no email', shopifyOrderId)
    return NextResponse.json({ ok: true }) // acknowledge, don't retry
  }

  // Check the order contains Capsule 01
  // Update CAPSULE_PRODUCT_TITLE to match the exact Shopify product title
  const CAPSULE_PRODUCT_TITLE = process.env.CAPSULE_01_PRODUCT_TITLE || 'Capsule 01'
  const isCapsuleOrder = order.line_items.some(
    item => item.title.toLowerCase().includes(CAPSULE_PRODUCT_TITLE.toLowerCase())
  )

  if (!isCapsuleOrder) {
    // Not a capsule order — nothing to do
    return NextResponse.json({ ok: true })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const now = new Date().toISOString()

  // Find the member by email
  const { data: member } = await supabase
    .from('members')
    .select('id')
    .eq('email', customerEmail)
    .maybeSingle()

  if (!member) {
    console.warn('[Shopify webhook] No member found for email', customerEmail)
    return NextResponse.json({ ok: true })
  }

  // Find their active purchase token for capsule-01
  const { data: token } = await supabase
    .from('purchase_tokens')
    .select('id, expires_at, used_at')
    .eq('member_id', member.id)
    .eq('capsule_id', 'capsule-01')
    .is('used_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!token) {
    console.warn('[Shopify webhook] No active purchase token found for member', member.id)
    return NextResponse.json({ ok: true })
  }

  // Mark token as used
  await supabase
    .from('purchase_tokens')
    .update({ used_at: now, shopify_order_id: shopifyOrderId })
    .eq('id', token.id)

  // Update member status
  await supabase
    .from('members')
    .update({ status: 'purchased', shopify_order_id: shopifyOrderId, purchased_at: now })
    .eq('id', member.id)

  console.log(`[Shopify webhook] Purchase confirmed — member ${member.id}, order ${shopifyOrderId}`)

  return NextResponse.json({ ok: true })
}
