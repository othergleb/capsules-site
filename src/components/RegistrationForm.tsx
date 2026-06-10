'use client'

import { useState, useEffect } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

interface RegistrationFormProps {
  dark?: boolean
  minimal?: boolean
}

export default function RegistrationForm({ dark = false, minimal = false }: RegistrationFormProps) {
  const [email, setEmail]         = useState('')
  const [state, setState]         = useState<State>('idle')
  const [errorMsg, setErrorMsg]   = useState('')
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [refCode, setRefCode]     = useState<string | null>(null)
  const [srcCode, setSrcCode]     = useState<string | null>(null)
  const [copied, setCopied]       = useState(false)

  const textColor = dark ? 'var(--cream)' : 'var(--blue)'

  // Pick up ?ref= from the URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setRefCode(ref)
    const src = params.get('src')
    if (src) setSrcCode(src)
  }, [])

  const referralUrl = inviteCode
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://capsules.otherwine.co.uk'}/?ref=${inviteCode}`
    : ''

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, refCode, srcCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
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

  async function handleShare() {
    const text = `Just registered for Capsule 01 by OTHER - 480 bottles of a Moroccan amphora rosé, grown by Berber farmers. Open to members only on 23 June. Here's my referral link: ${referralUrl}`

    if (typeof navigator !== 'undefined' && navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && !/Windows/i.test(navigator.userAgent)) {
      try {
        await navigator.share({ text })
      } catch {
        // User dismissed — that's fine
      }
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col gap-4" style={{ color: textColor }}>
        <p className="text-base font-light">
          You&apos;re on the list.
        </p>
        {inviteCode && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-light" style={{ opacity: 0.7 }}>
              Refer a friend and you&apos;ll both get early access.
            </p>
            <button
              onClick={handleShare}
              className="text-sm font-medium tracking-widest uppercase px-5 py-3 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--red)',
                color:           'white',
                fontFamily:      'Vulf Sans, sans-serif',
                letterSpacing:   '0.1em',
                border:          'none',
                cursor:          'pointer',
              }}
            >
              {copied ? 'Link copied!' : 'Invite a friend'}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (minimal) {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-sm"
          style={{ border: '1.5px solid var(--red)' }}
        >
          <input
            type="email"
            required
            placeholder="your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={state === 'loading'}
            className="flex-1 bg-transparent text-sm font-light outline-none placeholder:opacity-40"
            style={{
              color:      'var(--blue)',
              fontFamily: 'Vulf Sans, sans-serif',
            }}
          />
          <button
            type="submit"
            disabled={state === 'loading'}
            className="text-xs font-medium tracking-widest uppercase px-4 py-2 whitespace-nowrap hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: 'var(--red)',
              color:           'white',
              fontFamily:      'Vulf Sans, sans-serif',
              letterSpacing:   '0.1em',
            }}
          >
            {state === 'loading' ? '…' : 'Register'}
          </button>
        </div>
        {state === 'error' && (
          <p className="mt-2 text-xs" style={{ color: 'var(--red)' }}>{errorMsg}</p>
        )}
        <p className="mt-2 text-xs font-light" style={{ color: 'rgba(0,0,106,0.4)' }}>
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
            borderColor:     dark ? 'rgba(248,248,248,0.3)' : 'var(--blue)',
            color:           textColor,
            backgroundColor: 'transparent',
            fontFamily:      'Vulf Sans, sans-serif',
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
        By registering you agree to receive email updates about Capsule 01.{' '}
        <a href="/privacy" style={{ textDecoration: 'underline', color: 'inherit' }}>Privacy policy</a>.
      </p>
    </form>
  )
}
