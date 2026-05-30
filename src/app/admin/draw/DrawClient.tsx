'use client'

// ── DrawClient ─────────────────────────────────────────────────────
//
// 3-step admin UI for running the Capsule 01 ballot draw.
//
// Step 1 — Configure: set capsule count, click Run Draw
// Step 2 — Review:    inspect / remove winners, then Confirm
// Step 3 — Sending:   API call in progress, then result
//
// The draw algorithm runs entirely client-side using the member data
// passed from the server component — no extra API calls needed.

import { useState, useCallback } from 'react'
import type { DrawWinner } from '@/lib/purchase-types'

// ── Types ──────────────────────────────────────────────────────────

interface MemberRow {
  id:            string
  email:         string
  name:          string | null
  status:        string
  companion_id:  string | null
  invited_by_id: string | null
}

interface PoolStats {
  total:   number
  pairs:   number
  singles: number
}

interface Props {
  members:   MemberRow[]
  poolStats: PoolStats
}

type Step = 'configure' | 'review' | 'sending' | 'done' | 'error'

interface ConfirmResult {
  ok:               boolean
  tokensCreated:    number
  klaviyoFired:     number
  nonWinnersMarked: number
  errors:           string[]
}

// ── Fisher-Yates shuffle ───────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Draw algorithm ─────────────────────────────────────────────────
//
// Rules:
//  - Pairs win together (drawing either member pulls in the companion)
//  - Drawing a secondary doesn't cascade beyond the direct pair
//  - If only 1 capsule slot remains, only singles can fill it
//  - Stop when capsules_allocated === totalCapsules or pool exhausted

function runDraw(members: MemberRow[], totalCapsules: number): DrawWinner[] {
  const memberMap = new Map(members.map(m => [m.id, m]))

  // Build pair and singles pools
  type Pair = [MemberRow, MemberRow]
  const pairs: Pair[] = []
  const coveredAsSecondary = new Set<string>()

  for (const m of members) {
    if (m.companion_id) {
      const companion = memberMap.get(m.companion_id)
      if (companion) {
        pairs.push([m, companion])
        coveredAsSecondary.add(companion.id)
      }
      // Companion not in pool → treat primary as single (handled below)
    }
  }

  // Singles: not a primary (no companion_id) AND not covered as a secondary
  const singles = members.filter(
    m => !m.companion_id && !coveredAsSecondary.has(m.id)
  )

  // Build combined draw pool, shuffled
  type Ticket =
    | { kind: 'pair';   entry: Pair }
    | { kind: 'single'; entry: MemberRow }

  const pool: Ticket[] = shuffle([
    ...shuffle(pairs).map(p  => ({ kind: 'pair'   as const, entry: p })),
    ...shuffle(singles).map(s => ({ kind: 'single' as const, entry: s })),
  ])

  const winners: DrawWinner[] = []
  let capsulesLeft = totalCapsules

  for (const ticket of pool) {
    if (capsulesLeft <= 0) break

    if (ticket.kind === 'pair') {
      if (capsulesLeft >= 2) {
        const [primary, secondary] = ticket.entry
        winners.push({
          member_id:    primary.id,
          email:        primary.email,
          type:         'pair_primary',
          companion_id: secondary.id,
        })
        winners.push({
          member_id:    secondary.id,
          email:        secondary.email,
          type:         'pair_secondary',
          companion_id: primary.id,
        })
        capsulesLeft -= 2
      }
      // 1 slot left → skip pair, continue to singles
    } else {
      winners.push({
        member_id:    ticket.entry.id,
        email:        ticket.entry.email,
        type:         'single',
        companion_id: null,
      })
      capsulesLeft -= 1
    }
  }

  return winners
}

// ── Styles ─────────────────────────────────────────────────────────

const CREAM = '#F2EDE6'
const BLUE  = '#1B2A3B'
const MUTED = '#8A8A8A'
const RED   = '#C0392B'
const GREEN = '#27AE60'

const s = {
  page: {
    minHeight: '100svh',
    backgroundColor: CREAM,
    color: BLUE,
    fontFamily: "'Vulf Sans', sans-serif",
    padding: '2rem',
  } as React.CSSProperties,

  container: {
    maxWidth: '720px',
    margin: '0 auto',
  } as React.CSSProperties,

  header: {
    marginBottom: '2.5rem',
  } as React.CSSProperties,

  label: {
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: MUTED,
    marginBottom: '0.35rem',
  } as React.CSSProperties,

  h1: {
    fontSize: '1.4rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: BLUE,
    margin: 0,
  } as React.CSSProperties,

  card: {
    backgroundColor: '#fff',
    border: `1px solid rgba(27,42,59,0.12)`,
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.25rem',
  } as React.CSSProperties,

  statRow: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '1.5rem',
  } as React.CSSProperties,

  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
  } as React.CSSProperties,

  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: BLUE,
  } as React.CSSProperties,

  statLabel: {
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: MUTED,
  } as React.CSSProperties,

  input: {
    border: `1.5px solid rgba(27,42,59,0.3)`,
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    fontFamily: "'Vulf Sans', sans-serif",
    color: BLUE,
    backgroundColor: CREAM,
    width: '100px',
    outline: 'none',
  } as React.CSSProperties,

  btnPrimary: {
    backgroundColor: BLUE,
    color: CREAM,
    border: 'none',
    borderRadius: '8px',
    padding: '0.65rem 1.5rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    fontFamily: "'Vulf Sans', sans-serif",
  } as React.CSSProperties,

  btnSecondary: {
    backgroundColor: 'transparent',
    color: BLUE,
    border: `1.5px solid rgba(27,42,59,0.3)`,
    borderRadius: '8px',
    padding: '0.6rem 1.25rem',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    fontFamily: "'Vulf Sans', sans-serif",
  } as React.CSSProperties,

  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.85rem',
  } as React.CSSProperties,

  th: {
    textAlign: 'left' as const,
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: MUTED,
    paddingBottom: '0.75rem',
    borderBottom: `1px solid rgba(27,42,59,0.1)`,
  } as React.CSSProperties,

  td: {
    padding: '0.55rem 0',
    borderBottom: `1px solid rgba(27,42,59,0.06)`,
    verticalAlign: 'middle' as const,
  } as React.CSSProperties,

  removeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: MUTED,
    fontSize: '1rem',
    lineHeight: 1,
    padding: '0 0.25rem',
    fontFamily: 'monospace',
  } as React.CSSProperties,

  badge: (type: DrawWinner['type']) => ({
    display: 'inline-block',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    padding: '0.2rem 0.5rem',
    borderRadius: '4px',
    backgroundColor: type === 'single' ? 'rgba(27,42,59,0.07)' : 'rgba(27,42,59,0.14)',
    color: BLUE,
  } as React.CSSProperties),
}

// ── Component ──────────────────────────────────────────────────────

export default function DrawClient({ members, poolStats }: Props) {
  const [step, setStep]           = useState<Step>('configure')
  const [capsuleCount, setCapsuleCount] = useState(480)
  const [winners, setWinners]     = useState<DrawWinner[]>([])
  const [result, setResult]       = useState<ConfirmResult | null>(null)
  const [errorMsg, setErrorMsg]   = useState('')

  // ── Step 1: Run draw ─────────────────────────────────────────────

  const handleRunDraw = useCallback(() => {
    const drawn = runDraw(members, capsuleCount)
    setWinners(drawn)
    setStep('review')
  }, [members, capsuleCount])

  // ── Step 2: Remove winner(s) ─────────────────────────────────────
  // Clicking × on a pair_primary removes both primary + secondary
  // Clicking × on a pair_secondary removes both secondary + primary
  // Clicking × on a single removes just that entry

  const handleRemove = useCallback((winner: DrawWinner) => {
    setWinners(prev => {
      if (winner.type === 'single') {
        return prev.filter(w => w.member_id !== winner.member_id)
      }
      // Remove the whole pair
      return prev.filter(
        w => w.member_id !== winner.member_id && w.member_id !== winner.companion_id
      )
    })
  }, [])

  // ── Step 2: Confirm ──────────────────────────────────────────────

  const handleConfirm = useCallback(async () => {
    const confirmed = window.confirm(
      `Send purchase invites to ${winners.length} people?\n\n` +
      `This will:\n` +
      `• Create ${winners.length} purchase tokens (48hr expiry)\n` +
      `• Fire Ballot Winner Selected events in Klaviyo\n` +
      `• Mark all other ballot members as Not Selected\n\n` +
      `This cannot be undone.`
    )
    if (!confirmed) return

    setStep('sending')

    try {
      const res = await fetch('/api/admin/draw/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winners }),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || `HTTP ${res.status}`)
        setStep('error')
        return
      }

      setResult(data)
      setStep('done')
    } catch (err) {
      setErrorMsg(String(err))
      setStep('error')
    }
  }, [winners])

  // ── Counts ───────────────────────────────────────────────────────

  const capsulesAllocated = winners.filter(w => w.type !== 'pair_secondary').length +
    winners.filter(w => w.type === 'pair_secondary').length
  // Each winner row = 1 capsule
  const capsulesTotal = winners.length
  const pairsInDraw   = winners.filter(w => w.type === 'pair_primary').length
  const singlesInDraw = winners.filter(w => w.type === 'single').length

  // ── Render ────────────────────────────────────────────────────────

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.header}>
          <p style={s.label}>Admin — Capsule 01</p>
          <h1 style={s.h1}>Ballot Draw</h1>
        </div>

        {/* ── Step 1: Configure ─────────────────────────────────── */}
        {step === 'configure' && (
          <>
            <div style={s.card}>
              <div style={s.statRow}>
                <div style={s.stat}>
                  <span style={s.statValue}>{poolStats.total}</span>
                  <span style={s.statLabel}>Members in pool</span>
                </div>
                <div style={s.stat}>
                  <span style={s.statValue}>{poolStats.pairs}</span>
                  <span style={s.statLabel}>Pairs (×2 capsules)</span>
                </div>
                <div style={s.stat}>
                  <span style={s.statValue}>{poolStats.singles}</span>
                  <span style={s.statLabel}>Singles</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: MUTED, margin: '0 0 1.25rem' }}>
                Max allocatable:{' '}
                <strong style={{ color: BLUE }}>
                  {poolStats.pairs * 2 + poolStats.singles} capsules
                </strong>{' '}
                ({poolStats.pairs} pairs + {poolStats.singles} singles)
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div>
                  <p style={{ ...s.label, marginBottom: '0.5rem' }}>Capsules to allocate</p>
                  <input
                    style={s.input}
                    type="number"
                    min={1}
                    max={poolStats.pairs * 2 + poolStats.singles}
                    value={capsuleCount}
                    onChange={e => setCapsuleCount(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <button style={s.btnPrimary} onClick={handleRunDraw}>
              Run Draw →
            </button>
          </>
        )}

        {/* ── Step 2: Review ────────────────────────────────────── */}
        {step === 'review' && (
          <>
            <div style={s.card}>
              <div style={s.statRow}>
                <div style={s.stat}>
                  <span style={s.statValue}>{capsulesTotal}</span>
                  <span style={s.statLabel}>Capsules allocated</span>
                </div>
                <div style={s.stat}>
                  <span style={s.statValue}>{pairsInDraw}</span>
                  <span style={s.statLabel}>Pairs</span>
                </div>
                <div style={s.stat}>
                  <span style={s.statValue}>{singlesInDraw}</span>
                  <span style={s.statLabel}>Singles</span>
                </div>
                <div style={s.stat}>
                  <span style={s.statValue}>{winners.length}</span>
                  <span style={s.statLabel}>People notified</span>
                </div>
              </div>

              <p style={{ fontSize: '0.75rem', color: MUTED, margin: '0 0 1.25rem' }}>
                Click × to remove. Removing a paired entry removes both members.
              </p>

              {/* Winners table */}
              <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={{ ...s.th, width: '2rem' }}>#</th>
                      <th style={s.th}>Email</th>
                      <th style={s.th}>Name</th>
                      <th style={s.th}>Type</th>
                      <th style={{ ...s.th, width: '2rem' }} />
                    </tr>
                  </thead>
                  <tbody>
                    {winners.map((w, i) => {
                      const member = members.find(m => m.id === w.member_id)
                      return (
                        <tr key={w.member_id}>
                          <td style={{ ...s.td, color: MUTED, fontSize: '0.75rem' }}>{i + 1}</td>
                          <td style={s.td}>{w.email}</td>
                          <td style={{ ...s.td, color: MUTED }}>{member?.name ?? '—'}</td>
                          <td style={s.td}>
                            <span style={s.badge(w.type)}>
                              {w.type === 'pair_primary'   ? 'Pair'
                               : w.type === 'pair_secondary' ? 'Pair ↩'
                               : 'Single'}
                            </span>
                          </td>
                          <td style={s.td}>
                            <button
                              style={s.removeBtn}
                              onClick={() => handleRemove(w)}
                              title="Remove"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                style={s.btnSecondary}
                onClick={() => setStep('configure')}
              >
                ← Re-run Draw
              </button>
              <button
                style={{ ...s.btnPrimary, backgroundColor: winners.length ? BLUE : MUTED }}
                onClick={handleConfirm}
                disabled={winners.length === 0}
              >
                Confirm & Send Invites ({winners.length})
              </button>
            </div>
          </>
        )}

        {/* ── Step 3: Sending ───────────────────────────────────── */}
        {step === 'sending' && (
          <div style={s.card}>
            <p style={{ fontSize: '0.85rem', color: MUTED, margin: 0 }}>
              Creating tokens and firing Klaviyo events — this may take a minute...
            </p>
          </div>
        )}

        {/* ── Step 4: Done ──────────────────────────────────────── */}
        {step === 'done' && result && (
          <div style={{ ...s.card, borderColor: GREEN }}>
            <p style={{ ...s.label, color: GREEN, marginBottom: '1rem' }}>Draw complete</p>
            <div style={s.statRow}>
              <div style={s.stat}>
                <span style={{ ...s.statValue, color: GREEN }}>{result.tokensCreated}</span>
                <span style={s.statLabel}>Tokens created</span>
              </div>
              <div style={s.stat}>
                <span style={{ ...s.statValue, color: GREEN }}>{result.klaviyoFired}</span>
                <span style={s.statLabel}>Klaviyo events</span>
              </div>
              <div style={s.stat}>
                <span style={s.statValue}>{result.nonWinnersMarked}</span>
                <span style={s.statLabel}>Not selected</span>
              </div>
            </div>
            {result.errors.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ ...s.label, color: RED }}>Errors ({result.errors.length})</p>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8rem', color: RED }}>
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            <p style={{ fontSize: '0.75rem', color: MUTED, marginTop: '1.25rem', marginBottom: 0 }}>
              Purchase tokens expire in 48 hours. Winners will receive their invite emails via Klaviyo.
            </p>
          </div>
        )}

        {/* ── Step 5: Error ─────────────────────────────────────── */}
        {step === 'error' && (
          <div style={{ ...s.card, borderColor: RED }}>
            <p style={{ ...s.label, color: RED, marginBottom: '0.5rem' }}>Error</p>
            <p style={{ fontSize: '0.85rem', color: RED, margin: '0 0 1rem' }}>{errorMsg}</p>
            <button
              style={{ ...s.btnSecondary, borderColor: RED, color: RED }}
              onClick={() => setStep('review')}
            >
              ← Back to Review
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
