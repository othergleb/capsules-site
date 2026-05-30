// ── /admin/draw ────────────────────────────────────────────────────
//
// Server component — fetches ballot-eligible members from Supabase,
// passes them to the DrawClient for the interactive draw UI.
//
// Protected by HTTP Basic Auth (see src/middleware.ts).

import { createClient } from '@/lib/supabase-server'
import DrawClient from './DrawClient'

export const dynamic = 'force-dynamic'

interface MemberRow {
  id:           string
  email:        string
  name:         string | null
  status:       string
  companion_id: string | null
  invited_by_id: string | null
}

export default async function DrawPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const { data: members, error } = await supabase
    .from('members')
    .select('id, email, name, status, companion_id, invited_by_id')
    .in('status', ['registered', 'paired'])
    .order('created_at', { ascending: true })

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <p style={{ color: 'red' }}>Failed to fetch members: {error.message}</p>
      </div>
    )
  }

  const eligibleMembers: MemberRow[] = members ?? []

  // Count pairs and singles for the info display
  const primaries = eligibleMembers.filter((m: MemberRow) => m.companion_id)
  const secondaries = new Set(primaries.map((m: MemberRow) => m.companion_id))
  const singleCount = eligibleMembers.filter(
    (m: MemberRow) => !m.companion_id && !secondaries.has(m.id)
  ).length
  const pairCount = primaries.length

  return (
    <DrawClient
      members={eligibleMembers}
      poolStats={{ total: eligibleMembers.length, pairs: pairCount, singles: singleCount }}
    />
  )
}
