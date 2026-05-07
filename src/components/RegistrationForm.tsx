'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

export default function RegistrationForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setState('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong.')
        setState('error')
      }
    } catch {
      setErrorMsg('Network error — please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center">
        <p className="text-lg font-medium" style={{ color: 'var(--blue)' }}>
          You're on the list.
        </p>
        <p className="mt-2 text-sm opacity-60" style={{ color: 'var(--blue)' }}>
          Check your inbox — we've sent your member number and a link to your member page.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={state === 'loading'}
          className="flex-1 px-5 py-3 rounded-full border text-sm outline-none transition-all"
          style={{
            borderColor: 'var(--blue)',
            color: 'var(--blue)',
            backgroundColor: 'transparent',
            fontFamily: 'Vulf Sans, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary px-7 py-3 rounded-full text-sm whitespace-nowrap"
        >
          {state === 'loading' ? 'Registering…' : 'Join the ballot'}
        </button>
      </div>

      {state === 'error' && (
        <p className="mt-3 text-sm text-center" style={{ color: 'var(--red)' }}>
          {errorMsg}
        </p>
      )}

      <p className="mt-4 text-xs text-center opacity-50" style={{ color: 'var(--blue)' }}>
        By registering you agree to receive email updates about Capsule 01.
        No spam, ever.
      </p>
    </form>
  )
}
