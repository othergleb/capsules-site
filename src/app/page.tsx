'use client'

import { useState, useRef } from 'react'
import Nav from '@/components/Nav'
import RegistrationModal from '@/components/RegistrationModal'

// ── Sunflower SVG ──────────────────────────────────────────────
function Sunflower({ size = 44 }: { size?: number }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none">
      <g transform="translate(25,25)">
        {petals.map(angle => (
          <ellipse
            key={angle}
            cx="0" cy="-16"
            rx="5.5" ry="8.5"
            fill="#EDFF00"
            stroke="#1A1A0A"
            strokeWidth="1.2"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
      <circle cx="25" cy="25" r="9.5" fill="#FF3C00" stroke="#1A1A0A" strokeWidth="1.5" />
      <circle cx="25" cy="25" r="3.5" fill="#1A1A0A" />
    </svg>
  )
}

// ── OTHER blob wordmark ────────────────────────────────────────
function OtherWordmark() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      {/* SVG filter definition — must be in the DOM */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="blob-merge" x="-5%" y="-40%" width="110%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -11"
              result="blob"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          filter: 'url(#blob-merge)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(7rem, 23vw, 18rem)',
            letterSpacing: '-0.07em',
            color: '#EDFF00',
            lineHeight: 0.88,
            display: 'block',
            userSelect: 'none',
          }}
        >
          OTHER
        </span>
      </div>
    </div>
  )
}

// ── OTHER footer logo (small) ──────────────────────────────────
function OtherLogo() {
  return (
    <svg viewBox="0 0 300 70" width="140" height="40" fill="none">
      <text
        x="2" y="58"
        fontFamily="'Vulf Sans', sans-serif"
        fontWeight="900"
        fontSize="66"
        letterSpacing="-2"
        fill="#FF3C00"
      >
        OTHER
      </text>
    </svg>
  )
}

// ── Villa Volubilia script ─────────────────────────────────────
function VillaVolubilia() {
  return (
    <div style={{ transform: 'rotate(-6deg)', transformOrigin: 'bottom right' }}>
      <svg viewBox="0 0 280 90" width="210" height="72" fill="none">
        <text x="8" y="36"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="33"
          fill="#FF3C00"
          letterSpacing="0.5"
        >
          Villa
        </text>
        <text x="8" y="76"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontStyle="italic"
          fontWeight="700"
          fontSize="33"
          fill="#FF3C00"
          letterSpacing="0.5"
        >
          Volubilia
        </text>
        <path d="M8 83 Q140 93 272 80" stroke="#FF3C00" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────
export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  return (
    <div>

      <Nav color="#1A1A0A" />

      <RegistrationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        startRect={triggerRect}
      />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO (orange-red)
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#F03D00',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* OTHER blob wordmark */}
        <div
          style={{
            paddingTop: 'clamp(4rem, 8vw, 6rem)',
            paddingLeft: 'clamp(0.5rem, 2vw, 1.5rem)',
            paddingRight: 'clamp(0.5rem, 2vw, 1.5rem)',
          }}
        >
          <OtherWordmark />
        </div>

        {/* Two circular photos */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            padding: '0 clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'center',
            minHeight: '35vh',
          }}
        >
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              aspectRatio: '1',
              width: '100%',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1504151932400-72d4384f04b3?w=900&q=85"
              alt="Moroccan farmers"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              aspectRatio: '1',
              width: '100%',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=85"
              alt="Atlas mountains vineyard"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Bottom strip — Arabic labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.4rem clamp(0.75rem, 3vw, 2rem) 0',
          }}
        >
          <span
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              color: '#EDFF00',
              fontWeight: 700,
            }}
          >
            المغرب!
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sunflower size={32} />
            <span
              style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontSize: 'clamp(0.55rem, 1.3vw, 0.7rem)',
                letterSpacing: '0.2em',
                color: '#F03D00',
                textTransform: 'uppercase',
                fontWeight: 600,
                background: '#EDFF00',
                padding: '0.18rem 0.65rem',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
              }}
            >
              Limited Edition Capsules
            </span>
            <Sunflower size={32} />
          </div>

          <span
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
              color: '#EDFF00',
              fontWeight: 700,
            }}
          >
            المغرب!
          </span>
        </div>

        {/* MAROC display text */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            lineHeight: 0.82,
            overflow: 'hidden',
            padding: '0 0',
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif",
              fontSize: 'clamp(4rem, 17vw, 14rem)',
              color: '#EDFF00',
              letterSpacing: '0.01em',
              display: 'block',
            }}
          >
            MAROC
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif",
              fontSize: 'clamp(4rem, 17vw, 14rem)',
              color: '#EDFF00',
              letterSpacing: '0.01em',
              display: 'block',
            }}
          >
            MAROC
          </span>
        </div>

        {/* Yellow transition band */}
        <div style={{ height: 'clamp(1.25rem, 3vw, 2rem)', backgroundColor: '#EDFF00' }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — CONTENT (yellow)
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: '#EDFF00',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0',
        }}
      >
        {/* Capsule 01 heading */}
        <h1
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            color: '#F03D00',
            textAlign: 'center',
            lineHeight: 1,
            marginBottom: 'clamp(1.75rem, 4vw, 3rem)',
          }}
        >
          Capsule 01
        </h1>

        {/* Body copy */}
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.8rem, 1.8vw, 0.92rem)',
              lineHeight: 1.8,
              color: '#1A1A0A',
              marginBottom: '0.75rem',
            }}
          >
            The last 480 bottles of an amphora aged grenache,<br />
            grown by Berber farmers in the foothills of<br />
            the Atlas mountains.
          </p>
          <p
            style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(0.8rem, 1.8vw, 0.92rem)',
              color: '#1A1A0A',
              marginBottom: '0.4rem',
            }}
          >
            £89 including delivery.
          </p>
          <p
            style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.76rem, 1.6vw, 0.86rem)',
              color: 'rgba(26,26,10,0.65)',
              lineHeight: 1.7,
            }}
          >
            One bottle of amphora-aged Grenache gris, two bottles of estate rosé,
            and a small vial of their olive oil.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            maxWidth: '400px',
            margin: 'clamp(1.5rem, 3.5vw, 2.5rem) auto 0',
            width: '100%',
            borderTop: '1.5px solid #F03D00',
          }}
        >
          {[
            { label: 'BALLOT CLOSES', value: '14 JUNE 2026' },
            { label: 'VINEYARD',      value: 'MEKNES, MOROCCO' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.65rem 0',
                borderBottom: '1.5px solid #F03D00',
                fontFamily: 'Vulf Sans, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                color: '#1A1A0A',
              }}
            >
              <span style={{ fontWeight: 400, opacity: 0.55 }}>{label}</span>
              <span style={{ fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Registration form */}
        <div style={{ maxWidth: '400px', margin: 'clamp(1.25rem, 3vw, 2rem) auto 0', width: '100%' }}>
          {formState === 'success' ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <p
                style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: '#1A1A0A',
                  lineHeight: 1.7,
                }}
              >
                You&apos;re on the list. If drawn on 14 June you&apos;ll get
                a checkout link with 48 hours to complete your purchase.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                className="yellow-input"
                type="email"
                required
                placeholder="Your Email Here..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={formState === 'loading'}
              />
              {formState === 'error' && (
                <p style={{ color: '#F03D00', fontSize: '0.75rem', marginTop: '0.4rem', fontFamily: 'Vulf Sans, sans-serif' }}>
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={formState === 'loading'}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: '0.7rem',
                  padding: '0.85rem',
                  backgroundColor: '#F03D00',
                  color: '#EDFF00',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: formState === 'loading' ? 'wait' : 'pointer',
                  opacity: formState === 'loading' ? 0.6 : 1,
                  transition: 'opacity 0.15s ease',
                }}
                onMouseOver={e => { if (formState !== 'loading') e.currentTarget.style.opacity = '0.8' }}
                onMouseOut={e => { if (formState !== 'loading') e.currentTarget.style.opacity = '1' }}
              >
                {formState === 'loading' ? '...' : 'Register Now'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingTop: 'clamp(3rem, 6vw, 5rem)',
            paddingBottom: 'clamp(1rem, 2.5vw, 1.75rem)',
          }}
        >
          <OtherLogo />
          <VillaVolubilia />
        </div>
      </section>

    </div>
  )
}
