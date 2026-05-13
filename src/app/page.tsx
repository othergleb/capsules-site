'use client'

import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'

const MAROC_SVG      = '/figma/maroc.svg'
const ARABIC_SVG     = '/figma/arabic.svg'
const SUNFLOWER_SVG  = '/figma/sunflower.svg'
const VILLA_SVG      = '/figma/villa-volubilia.svg'
const OTHER_LOGO_PNG = '/figma/other-logo-yellow.png'
const OTHER_VIDEO    = '/other-logo.mp4'  // 2000×2000, yellow on red — correct colours
const FARMER_LEFT    = '/farmer-left.mp4'
const FARMER_RIGHT   = '/farmer-right.mp4'

// ── Animated OTHER logo ────────────────────────────────────────
// other-logo.mp4 is 2000×2000. Figma shows top 22% of the video (letters live there).
// Container bleeds 3% off each side. objectPosition 'top' crops from the top.
function OtherLogoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])
  return (
    <div style={{
      width: '106%',
      marginLeft: '-3%',
      height: 'clamp(110px, 22.9vw, 395px)',
      overflow: 'hidden',
      lineHeight: 0,
      flexShrink: 0,
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          // Show the top of the video where the letters are
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      >
        <source src={OTHER_VIDEO} type="video/mp4" />
      </video>
    </div>
  )
}

// ── Oval farmer video ──────────────────────────────────────────
// Accepts muted as a controlled prop so Sound Off can toggle it
function FarmerVideo({ src, label, muted }: { src: string; label: string; muted: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  // Sync muted state when parent toggles sound
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])

  return (
    <div style={{
      // Figma border-radius: 239px on 1728px = 13.83vw
      borderRadius: 'clamp(80px, 13.83vw, 239px)',
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
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
  // Default sound ON — browser will allow after first interaction
  const [soundOn, setSoundOn]     = useState(true)

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
    <div style={{ backgroundColor: '#FF3C00', overflow: 'hidden' }}>

      <Nav
        color="#00006A"
        showSound
        soundOn={soundOn}
        onSoundToggle={() => setSoundOn(s => !s)}
      />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#FF3C00',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '0.58vw',
      }}>

        <OtherLogoVideo />

        {/* Ovals — Figma: ovals start at top 377px, logo ends at ~405px → 28px overlap
            Negative margin recreates this overlap responsively */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          // Figma gap between ovals: ~1.6px on 1728px = 0.09vw ≈ touching
          gap: '0.09vw',
          // Figma: left oval starts at ~26px = 1.5% of 1728px
          padding: '0 1.5%',
          // Figma: ovals overlap logo by ~28px on 1728px = 1.62vw
          marginTop: 'clamp(-10px, -1.62vw, -5px)',
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" muted={!soundOn} />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" muted={!soundOn} />
        </div>

        {/* ── Bottom strip ─────────────────────────────────────────
            Figma layout (from screenshot):
            Row 1: [Arabic L] ·············· [Arabic R]
            Row 2: [MAROC L] [Limited Ed · Sunflower] [MAROC R]
            + one sunflower absolutely positioned upper-left of hero (over logo area)
        ────────────────────────────────────────────────────── */}

        {/* Upper-left sunflower — overlaid on hero, above ovals (Figma: ~26% down, left edge) */}
        <div style={{
          position: 'absolute',
          top: 'clamp(100px, 26%, 270px)',
          left: '1.5%',
          pointerEvents: 'none',
        }}>
          <img src={SUNFLOWER_SVG} alt=""
            style={{ height: 'clamp(28px, 5.5vw, 95px)', width: 'auto', aspectRatio: '114 / 113', display: 'block' }} />
        </div>

        <div style={{ marginTop: 'clamp(0.5rem, 2.89vw, 50px)' }}>

          {/* Row 1: Arabic left and right only */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
            marginBottom: '0.25rem',
          }}>
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.88vw, 67px)', width: 'auto', aspectRatio: '210 / 68' }} />
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.88vw, 67px)', width: 'auto', aspectRatio: '210 / 68' }} />
          </div>

          {/* Row 2: MAROC left · "Limited Edition Capsules" + sunflower · MAROC right */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: 0,
          }}>
            <img src={MAROC_SVG} alt="MAROC"
              style={{ height: 'clamp(40px, 5.61vw, 97px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />

            {/* Centre: caption + sunflower to the right of it */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
              <span style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(0.5rem, 1.74vw, 30px)',
                letterSpacing: '0.052em',
                color: '#EDFF00',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}>
                Limited Edition Capsules
              </span>
              <img src={SUNFLOWER_SVG} alt=""
                style={{ height: 'clamp(24px, 4.6vw, 80px)', width: 'auto', aspectRatio: '114 / 113', display: 'block' }} />
            </div>

            <img src={MAROC_SVG} alt="MAROC"
              style={{ height: 'clamp(40px, 5.61vw, 97px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />
          </div>
        </div>

        {/* Yellow transition band */}
        <div style={{ height: 'clamp(0.5rem, 1.2vw, 1.25rem)', backgroundColor: '#EDFF00' }} />
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTENT — yellow
      ══════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) 0',
      }}>

        {/* Capsule 01 — Figma: 95.484px Vulf Sans Black, transparent + stroke */}
        <h1
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(3rem, 5.52vw, 95.5px)',
            letterSpacing: '0.02em',
            WebkitTextStrokeColor: '#00006A',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          Capsule 01
        </h1>

        {/* Body copy — Figma: 17.525px, max-width 484px, centered */}
        <div style={{ maxWidth: '484px', width: '100%', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
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
            fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
            lineHeight: 1.29,
            color: '#00006A',
            marginBottom: '0.3rem',
          }}>
            £89 including delivery.
          </p>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
            lineHeight: 1.29,
            color: '#00006A',
          }}>
            One bottle of amphora-aged Grenache gris, two bottles of estate rosé,
            and a small vial of their olive oil.
          </p>
        </div>

        {/* Stats table — Figma: 519px wide, 20px Vulf Sans Light/Regular, uppercase */}
        <div style={{ maxWidth: '519px', width: '100%', marginTop: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>
          <img src="/figma/stats-lines.svg" alt="" style={{ width: '100%', display: 'block' }} />
          {[
            { label: 'Ballot closes', value: '14 June 2026' },
            { label: 'Vineyard',      value: 'Mknes, Morocco' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.7rem 0',
                fontFamily: 'Vulf Sans, sans-serif',
                fontSize: 'clamp(0.75rem, 1.16vw, 20px)',
                letterSpacing: '-0.01em',
                color: '#00006A',
                textTransform: 'uppercase',
              }}>
                <span style={{ fontWeight: 300 }}>{label}</span>
                <span style={{ fontWeight: 400 }}>{value}</span>
              </div>
              <img src="/figma/stats-lines.svg" alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>

        {/* Registration form — Figma: input 64px tall, button 70px, both 519px wide */}
        <div style={{ maxWidth: '519px', width: '100%', marginTop: 'clamp(1rem, 2.5vw, 1.75rem)' }}>
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
              <div style={{
                border: '2px solid #FF3C00',
                borderRadius: '6px',
                height: 'clamp(48px, 3.7vw, 64px)',
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
                    fontSize: 'clamp(0.8rem, 1.2vw, 21px)',
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
              <button
                type="submit"
                disabled={formState === 'loading'}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'clamp(52px, 4.05vw, 70px)',
                  backgroundColor: '#FF3C00',
                  color: '#00006A',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 1.45vw, 25px)',
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

        {/* Footer — Figma: OTHER logo 69px left, Villa Volubilia 125px right */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingTop: 'clamp(3rem, 6vw, 6rem)',
          paddingBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
        }}>
          <img src={OTHER_LOGO_PNG} alt="OTHER"
            style={{ height: 'clamp(32px, 4vw, 69px)', width: 'auto' }} />
          <img src={VILLA_SVG} alt="Villa Volubilia"
            style={{ height: 'clamp(60px, 7.2vw, 125px)', width: 'auto' }} />
        </div>
      </section>

    </div>
  )
}
