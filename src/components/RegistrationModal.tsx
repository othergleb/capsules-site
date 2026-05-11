'use client'

import { useState, useEffect, useRef } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface Props {
  open: boolean
  onClose: () => void
  startRect?: DOMRect | null
}

// Fixed card dimensions used for FLIP animation math
const CARD_W = 460
const CARD_H = 480

export default function RegistrationModal({ open, onClose, startRect }: Props) {
  const [mounted, setMounted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const storedRect = useRef<DOMRect | null>(null)

  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (open) {
      storedRect.current = startRect ?? null
      setExpanded(false)
      setFormVisible(false)
      setMounted(true)

      // Double rAF: paint initial (trigger-sized) state before transitioning
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setExpanded(true)
          const t = setTimeout(() => setFormVisible(true), 360)
          return () => clearTimeout(t)
        })
      })
    } else {
      setFormVisible(false)
      const t1 = setTimeout(() => setExpanded(false), 120)
      const t2 = setTimeout(() => setMounted(false), 520)
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

  // FLIP: compute transform so card appears to start at trigger rect
  const buildInitialTransform = () => {
    const rect = storedRect.current
    if (!rect || typeof window === 'undefined') return 'none'
    const vw = window.innerWidth
    const vh = window.innerHeight
    // Trigger center
    const trigCX = rect.left + rect.width / 2
    const trigCY = rect.top + rect.height / 2
    // Card center (when expanded, card sits at center of viewport)
    const cardCX = vw / 2
    const cardCY = vh / 2
    const tx = trigCX - cardCX
    const ty = trigCY - cardCY
    const scaleX = rect.width / CARD_W
    const scaleY = rect.height / CARD_H
    return `translate(${tx}px, ${ty}px) scale(${scaleX}, ${scaleY})`
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 150,
          backgroundColor: 'rgba(0,0,0,0.55)',
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'fixed',
          left: `max(1rem, calc(50% - ${CARD_W / 2}px))`,
          top: `max(1rem, calc(50% - ${CARD_H / 2}px))`,
          width: `min(${CARD_W}px, calc(100vw - 2rem))`,
          minHeight: `${CARD_H}px`,
          zIndex: 200,
          backgroundColor: 'var(--red)',
          borderRadius: '18px',
          overflow: 'hidden',
          transform: expanded ? 'none' : buildInitialTransform(),
          transformOrigin: 'center center',
          transition: expanded
            ? 'transform 0.44s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.65)',
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

        {/* Content */}
        <div
          style={{
            padding: '3rem 2.25rem 2.5rem',
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {formState === 'success' ? (
            <>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
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
                fontSize: '1.05rem',
                fontWeight: 300,
                lineHeight: 1.65,
                fontFamily: 'Vulf Sans, sans-serif',
              }}>
                Check your inbox. If you are drawn on 14 June, you will have 48 hours to complete your purchase.
              </p>
            </>
          ) : (
            <>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
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
                fontSize: '1.05rem',
                fontWeight: 300,
                lineHeight: 1.65,
                marginBottom: '2.25rem',
                fontFamily: 'Vulf Sans, sans-serif',
              }}>
                480 bottles remain. One per person. Register your email for a chance to receive Capsule 01.
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  paddingBottom: '0.65rem',
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
                      fontSize: '0.95rem',
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
                }}>
                  One entry per person. Ballot closes 13 June. No spam, ever.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
