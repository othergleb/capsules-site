'use client'

import { useState } from 'react'

type Result = { ok: boolean; message: string; email: string } | null

export default function AdminTierPage() {
  const [email, setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result>(null)
  const [error, setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/admin/grant-tier1', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data)
        setEmail('')
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'Vulf Sans, sans-serif', maxWidth: 480 }}>
      <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Grant Tier 1 Access</h1>
      <p style={{ fontSize: '0.875rem', opacity: 0.6, marginBottom: '2rem' }}>
        Manually upgrade a member to early access. Use this if their referral wasn&apos;t tracked automatically.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          required
          placeholder="member@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          style={{
            padding:     '0.75rem 1rem',
            fontSize:    '0.875rem',
            border:      '1px solid #ccc',
            borderRadius: 4,
            outline:     'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !email}
          style={{
            padding:         '0.75rem 1rem',
            backgroundColor: loading ? '#ccc' : 'var(--red, #c0392b)',
            color:           'white',
            border:          'none',
            borderRadius:    4,
            fontSize:        '0.875rem',
            cursor:          loading ? 'not-allowed' : 'pointer',
            letterSpacing:   '0.05em',
          }}
        >
          {loading ? 'Updating…' : 'Grant Tier 1'}
        </button>
      </form>

      {result && (
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'green' }}>
          ✓ {result.message} — {result.email}
        </p>
      )}
      {error && (
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'red' }}>
          {error}
        </p>
      )}
    </main>
  )
}
