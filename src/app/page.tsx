'use client'

import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'

const MAROC_SVG      = '/figma/maroc.svg'
const ARABIC_SVG     = '/figma/arabic.svg'
const SUNFLOWER_SVG  = '/figma/sunflower.svg'
const VILLA_SVG      = '/figma/villa-volubilia.svg'
const OTHER_LOGO_PNG = '/figma/other-logo-yellow.png'
const OTHER_VIDEO    = '/Other_alt3_yellow_red.mp4'  // H.264, yellow letters on red
const FARMER_LEFT    = '/farmer-left.mp4'
const FARMER_RIGHT   = '/farmer-right.mp4'

// ── Animated OTHER logo ────────────────────────────────────────
// Canvas-based crop: plays the 2000×2000 video off-screen and draws only the
// letter band (approx x:8–88%, y:36–66%) onto a visible canvas each frame.
// This works in all browsers (object-view-box is Chrome/FF only, not Safari).
function OtherLogoVideo() {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const video  = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    video.play().catch(() => {})

    const v = video
    const c = canvas
    const x = ctx
    function draw() {
      if (v.readyState >= 2) {
        const vw = v.videoWidth  || 2000
        const vh = v.videoHeight || 2000
        // Source crop: letters at x:15–85%, y:36–66%
        const sx = Math.round(0.15 * vw)
        const sw = Math.round(0.70 * vw)
        // Vertical: fit letter-band centre into canvas height
        const cropH = Math.round(sw * c.height / c.width)
        const sy    = Math.round(0.51 * vh - cropH / 2)
        x.drawImage(v, sx, sy, sw, cropH, 0, 0, c.width, c.height)
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{
      width: '106%',
      marginLeft: '-3%',
      height: 'clamp(99px, 20.6vw, 356px)',
      overflow: 'hidden',
      position: 'relative',
      lineHeight: 0,
      flexShrink: 0,
    }}>
      {/* Hidden video source */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        style={{ display: 'none' }}
      >
        <source src={OTHER_VIDEO} type="video/mp4" />
      </video>
      {/* Canvas shows cropped letter region — 5.15:1 matches container ratio */}
      <canvas
        ref={canvasRef}
        width={2000}
        height={388}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}

// ── Oval farmer video ──────────────────────────────────────────
function FarmerVideo({ src, label, muted }: { src: string; label: string; muted: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // FIX 2: always starts muted (autoPlay muted) so browsers allow autoplay
  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  // Sync muted state when parent toggles sound
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])

  return (
    <div style={{
      borderRadius: 'clamp(80px, 13.83vw, 239px)',
      overflow: 'hidden',
      flex: 1,
      border: '2px solid #EDFF00',
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
  // FIX 2: start muted so browsers allow autoplay; user can toggle sound on
  const [soundOn, setSoundOn]     = useState(false)

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
          HERO — FIX 3: height: 100vh so everything fits on screen
      ══════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#FF3C00',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}>

        <OtherLogoVideo />

        {/* Ovals — flex:1 so they fill remaining hero height at any viewport size */}
        <div style={{
          display: 'flex',
          gap: '0.09vw',
          padding: '0 1.5%',
          marginTop: 'clamp(-10px, -1.62vw, -5px)',
          flex: 1,
          minHeight: 0,
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" muted={!soundOn} />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" muted={!soundOn} />
        </div>

        {/* Sunflower overlapping lower-left of logo — Figma y:264 / 1728 = 15.3vw */}
        <div style={{
          position: 'absolute',
          top: '15.3vw',
          left: '0',
          pointerEvents: 'none',
        }}>
          <img src={SUNFLOWER_SVG} alt=""
            style={{ height: 'clamp(28px, 5.5vw, 95px)', width: 'auto', aspectRatio: '114 / 113', display: 'block' }} />
        </div>

        <div style={{ marginTop: 'clamp(0.5rem, 2.89vw, 50px)', flexShrink: 0 }}>

          {/* Row 1: Arabic left and right */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
          }}>
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.88vw, 67px)', width: 'auto', aspectRatio: '210 / 68' }} />
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.88vw, 67px)', width: 'auto', aspectRatio: '210 / 68' }} />
          </div>

          {/* Row 2: MAROC L · "Limited Edition Capsules" · MAROC R
              FIX 5: "Limited Edition Capsules" centred between both MAROs
              FIX 4: sunflower now overlaps top-left corner of right MAROC */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: 0,
          }}>
            <img src={MAROC_SVG} alt="MAROC"
              style={{ height: 'clamp(40px, 5.61vw, 97px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />

            {/* FIX 5: text only, no sunflower here */}
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

            {/* FIX 4: right MAROC with sunflower overlapping its top-left corner */}
            <div style={{ position: 'relative' }}>
              <img src={SUNFLOWER_SVG} alt=""
                style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-8%',
                  height: 'clamp(24px, 4.6vw, 80px)',
                  width: 'auto',
                  aspectRatio: '114 / 113',
                  display: 'block',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />
              <img src={MAROC_SVG} alt="MAROC"
                style={{ height: 'clamp(40px, 5.61vw, 97px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 'clamp(0.5rem, 1.2vw, 1.25rem)', backgroundColor: '#EDFF00' }} />
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

        {/* Capsule 01 */}
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

        {/* Body copy */}
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

        {/* Stats table */}
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

        {/* Registration form */}
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

        {/* Footer */}
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
