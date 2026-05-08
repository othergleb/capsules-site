'use client'

import { useState, useEffect } from 'react'

type State = 'idle' | 'loading' | 'success' | 'error'

interface Props {
  open: boolean
  onClose: () => void
}

export default function RegistrationModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Auto-focus input when modal opens
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      const input = document.getElementById('modal-email-input')
      if (input) (input as HTMLInputElement).focus()
    }, 50)
    return () => clearTimeout(t)
  }, [open])

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
      setErrorMsg('Network error. Please try again.')
      setState('error')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,106,0.4)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-6 p-8"
        style={{ backgroundColor: 'var(--cream)', borderRadius: '2px' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 hover:opacity-50 transition-opacity"
          style={{
            color: 'var(--blue)',
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 300,
            fontSize: '1.4rem',
            lineHeight: 1,
          }}
          aria-label="Close"
        >
          &times;
        </button>

        {state === 'success' ? (
          <div>
            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--red)', letterSpacing: '0.16em' }}
            >
              You are on the list
            </p>
            <p className="text-base font-light leading-relaxed" style={{ color: 'var(--blue)' }}>
              Check your inbox. If you are drawn on 9 June, you will have 48 hours to complete your purchase.
            </p>
          </div>
        ) : (
          <>
            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--red)', letterSpacing: '0.16em' }}
            >
              Join the ballot
            </p>
            <p className="text-base font-light leading-relaxed mb-6" style={{ color: 'var(--blue)' }}>
              480 bottles remain. One per person. Register your email for a chance to receive Capsule 01.
            </p>
            <form onSubmit={handleSubmit}>
              <div
                className="flex items-center gap-2 px-4 py-2"
                style={{ border: '1.5px solid var(--red)' }}
              >
                <input
                  id="modal-email-input"
                  type="email"
                  required
                  placeholder="your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={state === 'loading'}
                  className="flex-1 bg-transparent text-sm font-light outline-none placeholder:opacity-40"
                  style={{ color: 'var(--blue)', fontFamily: 'Vulf Sans, sans-serif' }}
                />
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="text-xs font-medium tracking-widest uppercase px-4 py-2 whitespace-nowrap hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    fontFamily: 'Vulf Sans, sans-serif',
                    letterSpacing: '0.1em',
                  }}
                >
                  {state === 'loading' ? '...' : 'Register'}
                </button>
              </div>
              {state === 'error' && (
                <p className="mt-2 text-xs" style={{ color: 'var(--red)' }}>{errorMsg}</p>
              )}
              <p className="mt-3 text-xs font-light" style={{ color: 'rgba(0,0,106,0.4)' }}>
                One entry per person. Ballot closes 8 June. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
