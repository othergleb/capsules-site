'use client'

import { useState } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

interface RegistrationFormProps {
  dark?: boolean
  minimal?: boolean
}

export default function RegistrationForm({ dark = false, minimal = false }: RegistrationFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const textColor = dark ? 'var(--cream)' : 'var(--blue)'

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
      <p className="text-base font-light" style={{ color: textColor }}>
        You&apos;re on the list. Check your inbox.
      </p>
    )
  }

  if (minimal) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className="flex items-center gap-4 pb-2"
          style={{ borderBottom: '1px solid rgba(0,0,106,0.3)' }}
        >
          <input
            type="email"
            required
            placeholder="your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={state === 'loading'}
            className="flex-1 bg-transparent text-base font-light outline-none placeholder:opacity-40"
            style={{
              color: 'var(--blue)',
              fontFamily: 'Vulf Sans, sans-serif',
            }}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="text-sm font-light hover:opacity-60 transition-opacity whitespace-nowrap"
            style={{ color: 'var(--blue)', fontFamily: 'Vulf Sans, sans-serif' }}
          >
            {state === 'loading' ? 'registering…' : 'register for Capsule 01'}
          </button>
        </div>
        {state === 'error' && (
          <p className="mt-2 text-xs" style={{ color: 'var(--red)' }}>{errorMsg}</p>
        )}
        <p className="mt-3 text-xs font-light" style={{ color: 'rgba(0,0,106,0.4)' }}>
          One entry per person. No spam, ever.
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
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
            borderColor: dark ? 'rgba(248,248,248,0.3)' : 'var(--blue)',
            color: textColor,
            backgroundColor: 'transparent',
            fontFamily: 'Vulf Sans, sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary px-7 py-3 rounded-full text-sm whitespace-nowrap"
        >
          {state === 'loading' ? 'Registering…' : 'Register for Capsule 01'}
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-3 text-sm text-center" style={{ color: 'var(--red)' }}>{errorMsg}</p>
      )}
      <p className="mt-4 text-xs text-center" style={{ color: dark ? 'rgba(248,248,248,0.4)' : 'rgba(0,0,106,0.45)' }}>
        By registering you agree to receive email updates about Capsule 01. No spam, ever.
      </p>
    </form>
  )
}
