'use client'

import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'

// ── Figma asset paths ──────────────────────────────────────────
const MAROC_SVG        = '/figma/maroc.svg'
const ARABIC_SVG       = '/figma/arabic.svg'
const SUNFLOWER_SVG    = '/figma/sunflower.svg'
const VILLA_SVG        = '/figma/villa-volubilia.svg'
const OTHER_LOGO_PNG   = '/figma/other-logo-yellow.png'
const OTHER_VIDEO      = '/other-logo.mp4'
const FARMER_LEFT      = '/farmer-left.mp4'
const FARMER_RIGHT     = '/farmer-right.mp4'

// ── Animated OTHER logo (video, full-bleed) ────────────────────
function OtherLogoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])
  return (
    <div style={{
      width: '100%',
      height: 'clamp(100px, 14vw, 220px)',
      overflow: 'hidden',
      position: 'relative',
      lineHeight: 0,
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      >
        <source src={OTHER_VIDEO} type="video/mp4" />
      </video>
    </div>
  )
}

// ── Oval farmer video ──────────────────────────────────────────
function FarmerVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])
  return (
    <div style={{
      borderRadius: 'clamp(120px, 28vw, 240px)',
      overflow: 'hidden',
      aspectRatio: '843 / 474',
      border: '2px solid #EDFF00',
      width: '100%',
      position: 'relative',
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        aria-label={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────
export default function Home() {
  const [email, setEmail]         = useState('')
  const [formState, setFormState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errorMsg, setErrorMsg]   = useState('')

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
    <div style={{ backgroundColor: '#FF3C00' }}>

      {/* Nav — dark navy pill buttons */}
      <Nav color="#00006A" showSound />

      {/* ══════════════════════════════════════════════════════
          HERO — red/orange background
      ══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        backgroundColor: '#FF3C00',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* OTHER animated logo — full bleed, no padding */}
        <OtherLogoVideo />

        {/* Two oval farmer videos with yellow border */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(0.5rem, 1.5vw, 1.25rem)',
          padding: '0 clamp(0.5rem, 1.5vw, 1.25rem)',
          marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" />
        </div>

        {/* Bottom strip — Arabic + MAROC + sunflower + caption */}
        <div style={{ marginTop: 'clamp(0.5rem, 1.5vw, 1rem)' }}>

          {/* Arabic text row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 clamp(0.5rem, 1.5vw, 1.25rem)',
            marginBottom: '0.15rem',
          }}>
            {/* Left arabic */}
            <img src={ARABIC_SVG} alt="المغرب" style={{ height: 'clamp(18px, 3.9vw, 68px)', width: 'auto' }} />

            {/* Centre: sunflower + caption */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
              <img src={SUNFLOWER_SVG} alt="" style={{ height: 'clamp(28px, 5.5vw, 112px)', width: 'auto' }} />
              <span style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(0.55rem, 1.7vw, 1.73rem)',
                letterSpacing: '0.03em',
                color: '#EDFF00',
                whiteSpace: 'nowrap',
              }}>
                Limited Edition Capsules
              </span>
              <img src={SUNFLOWER_SVG} alt="" style={{ height: 'clamp(28px, 5.5vw, 112px)', width: 'auto' }} />
            </div>

            {/* Right arabic */}
            <img src={ARABIC_SVG} alt="المغرب" style={{ height: 'clamp(18px, 3.9vw, 68px)', width: 'auto' }} />
          </div>

          {/* MAROC row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            lineHeight: 0,
            overflow: 'hidden',
          }}>
            <img src={MAROC_SVG} alt="MAROC" style={{ height: 'clamp(50px, 10.5vw, 182px)', width: 'auto', display: 'block' }} />
            <img src={MAROC_SVG} alt="MAROC" style={{ height: 'clamp(50px, 10.5vw, 182px)', width: 'auto', display: 'block' }} />
          </div>
        </div>

        {/* Yellow transition band */}
        <div style={{ height: 'clamp(1rem, 2.5vw, 2rem)', backgroundColor: '#EDFF00' }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTENT — yellow background
      ══════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#EDFF00',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0',
      }}>

        {/* Capsule 01 — outlined Vulf Sans Black, matching design exactly */}
        <h1
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(3rem, 8.5vw, 9.5rem)',
            letterSpacing: '0.02em',
            WebkitTextStrokeColor: '#00006A',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          Capsule 01
        </h1>

        {/* Body copy — Vulf Sans Bold, #00006A, centered */}
        <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(0.8rem, 1.75vw, 1.09rem)',
            lineHeight: 1.29,
            color: '#00006A',
            marginBottom: '1rem',
          }}>
            The last 480 bottles of an amphora aged grenache,<br />
            grown by Berber farmers in the foothills of<br />
            the Atlas mountains.
          </p>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.8rem, 1.75vw, 1.09rem)',
            lineHeight: 1.29,
            color: '#00006A',
            marginBottom: '0.3rem',
          }}>
            £89 including delivery.
          </p>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.8rem, 1.75vw, 1.09rem)',
            lineHeight: 1.29,
            color: '#00006A',
          }}>
            One bottle of amphora-aged Grenache gris, two bottles of estate rosé,
            and a small vial of their olive oil.
          </p>
        </div>

        {/* Stats table — Vulf Sans Light/Regular, #00006A, uppercase */}
        <div style={{
          maxWidth: '520px',
          width: '100%',
          marginTop: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          borderTop: '1.5px solid #00006A',
        }}>
          {[
            { label: 'Ballot closes', value: '14 June 2026' },
            { label: 'Vineyard',      value: 'Mknes, Morocco' },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.7rem 0',
              borderBottom: '1.5px solid #00006A',
              fontFamily: 'Vulf Sans, sans-serif',
              fontSize: 'clamp(0.7rem, 1.6vw, 1.25rem)',
              letterSpacing: '-0.01em',
              color: '#00006A',
              textTransform: 'uppercase',
            }}>
              <span style={{ fontWeight: 300 }}>{label}</span>
              <span style={{ fontWeight: 400 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Registration form */}
        <div style={{ maxWidth: '520px', width: '100%', marginTop: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
          {formState === 'success' ? (
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: '1rem',
              color: '#00006A',
              lineHeight: 1.65,
              textAlign: 'center',
              padding: '1.5rem 0',
            }}>
              You&apos;re on the list. If drawn on 14 June you&apos;ll receive
              a checkout link with 48 hours to complete your purchase.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Email input — red border, navy placeholder */}
              <div style={{
                border: '2px solid #FF3C00',
                borderRadius: '6px',
                height: 'clamp(48px, 6.5vw, 64px)',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.65rem',
              }}>
                <input
                  type="email"
                  required
                  placeholder="Your Email Here"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={formState === 'loading'}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '0 1rem',
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(0.8rem, 1.75vw, 1.31rem)',
                    letterSpacing: '-0.01em',
                    color: '#00006A',
                  }}
                />
              </div>
              {formState === 'error' && (
                <p style={{ color: '#FF3C00', fontSize: '0.75rem', marginBottom: '0.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
                  {errorMsg}
                </p>
              )}
              {/* REGISTER NOW — red bg, navy text */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'clamp(52px, 7vw, 70px)',
                  backgroundColor: '#FF3C00',
                  color: '#00006A',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.8rem, 1.75vw, 1.56rem)',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  cursor: formState === 'loading' ? 'wait' : 'pointer',
                  opacity: formState === 'loading' ? 0.6 : 1,
                  transition: 'opacity 0.15s ease',
                  fontFeatureSettings: "'cv10', 'ss03', 'ss05', 'case', 'ordn', 'dlig'",
                }}
                onMouseOver={e => { if (formState !== 'loading') e.currentTarget.style.opacity = '0.8' }}
                onMouseOut={e => { if (formState !== 'loading') e.currentTarget.style.opacity = '1' }}
              >
                {formState === 'loading' ? '...' : 'Register Now'}
              </button>
            </form>
          )}
        </div>

        {/* Footer — OTHER logo left, Villa Volubilia right */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: 'clamp(3rem, 6vw, 6rem)',
          paddingBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
        }}>
          <img
            src={OTHER_LOGO_PNG}
            alt="OTHER"
            style={{ height: 'clamp(32px, 4.5vw, 69px)', width: 'auto' }}
          />
          <img
            src={VILLA_SVG}
            alt="Villa Volubilia"
            style={{ height: 'clamp(60px, 8vw, 125px)', width: 'auto' }}
          />
        </div>
      </section>

    </div>
  )
}
