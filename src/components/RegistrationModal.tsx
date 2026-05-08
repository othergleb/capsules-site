'use client'

import { useState, useEffect, useRef } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

// Animation phases:
//   closed    — not mounted
//   ready     — mounted at trigger rect, no transition yet (1 paint)
//   expanding — transitioning to full screen
//   open      — fully expanded, form visible
interface Props {
  open: boolean
  onClose: () => void
  startRect?: DOMRect | null
}

export default function RegistrationModal({ open, onClose, startRect }: Props) {
  // 'closed' means the whole thing is unmounted
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const storedRect = useRef<DOMRect | null>(null)

  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (open) {
      // Capture the trigger rect at the moment of opening
      storedRect.current = startRect ?? null
      setExpanded(false)
      setFormVisible(false)
      setMounted(true)

      // Double rAF: ensures the browser paints the "small" initial state
      // before we start the transition to full screen
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExpanded(true)
          // Form fades in slightly after the background lands
          const t = setTimeout(() => setFormVisible(true), 380)
          return () => clearTimeout(t)
        })
      })
    } else {
      // Collapse: fade form out, shrink back, unmount
      setFormVisible(false)
      const t1 = setTimeout(() => setExpanded(false), 120)
      const t2 = setTimeout(() => setMounted(false), 560)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setFormState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setFormState('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong.')
        setFormState('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setFormState('error')
    }
  }

  if (!mounted) return null

  // Compute starting transform so the full-screen div appears at the trigger rect
  const buildInitialTransform = () => {
    const rect = storedRect.current
    if (!rect || typeof window === 'undefined') return 'none'
    const vw = window.innerWidth
    const vh = window.innerHeight
    const scaleX = rect.width / vw
    const scaleY = rect.height / vh
    const tx = rect.left + rect.width / 2 - vw / 2
    const ty = rect.top + rect.height / 2 - vh / 2
    return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'var(--red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Start at trigger rect; after double-rAF, transition to full screen
        transform: expanded ? 'none' : buildInitialTransform(),
        transformOrigin: 'center center',
        transition: expanded
          ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'none',
      }}
    >
      {/* Close — fades in with the form */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '1.6rem',
          fontWeight: 300,
          lineHeight: 1,
          cursor: 'pointer',
          fontFamily: 'Vulf Sans, sans-serif',
          opacity: formVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        &times;
      </button>

      {/* Form content */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          opacity: formVisible ? 1 : 0,
          transform: formVisible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {formState === 'success' ? (
          <>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.68rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              fontFamily: 'Vulf Sans, sans-serif',
            }}>
              You are on the list
            </p>
            <p style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.65,
              fontFamily: 'Vulf Sans, sans-serif',
            }}>
              Check your inbox. If you are drawn on 9 June, you will have 48 hours to complete your purchase.
            </p>
          </>
        ) : (
          <>
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.68rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              fontFamily: 'Vulf Sans, sans-serif',
            }}>
              Join the ballot
            </p>
            <p style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.65,
              marginBottom: '2rem',
              fontFamily: 'Vulf Sans, sans-serif',
            }}>
              480 bottles remain. One per person. Register your email for a chance to receive Capsule 01.
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderBottom: '1px solid rgba(255,255,255,0.35)',
                paddingBottom: '0.6rem',
                marginBottom: '0.75rem',
              }}>
                <input
                  className="modal-input"
                  type="email"
                  required
                  placeholder="your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={formState === 'loading'}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 300,
                  }}
                />
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 500,
                    opacity: formState === 'loading' ? 0.5 : 1,
                    whiteSpace: 'nowrap',
                    padding: '0.25rem 0',
                  }}
                >
                  {formState === 'loading' ? '...' : 'Register'}
                </button>
              </div>
              {formState === 'error' && (
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginBottom: '0.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
                  {errorMsg}
                </p>
              )}
              <p style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '0.68rem',
                fontWeight: 300,
                fontFamily: 'Vulf Sans, sans-serif',
                marginTop: '0.5rem',
              }}>
                One entry per person. Ballot closes 8 June. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
