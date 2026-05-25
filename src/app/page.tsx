'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'

const MAROC_SVG      = '/figma/maroc.svg'
const ARABIC_SVG     = '/figma/arabic.svg'
const TIFINAGH_SVG   = '/figma/tifinagh.svg'
const SUNFLOWER_SVG  = '/figma/sunflower.svg'
const STAR_SVG       = '/figma/star.svg'
const DIAMONDS_SVG   = '/figma/polygon-diamonds.svg'
const OTHER_LOGO_PNG = '/figma/other-logo-yellow.png'
const OTHER_VIDEO    = '/Other_alt3_yellow_red.mp4'  // H.264, yellow letters on red
const FARMER_LEFT    = '/farmer-left.mp4'
const FARMER_RIGHT   = '/farmer-right.mp4'

// ── Animated OTHER logo ────────────────────────────────────────
// Canvas-based crop: draws the letter band (x:15–85%, y centred at 51%)
// from the hidden video onto a visible canvas each frame.
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

    const v = video, c = canvas, x = ctx
    function draw() {
      if (v.readyState >= 2) {
        const vw = v.videoWidth  || 2000
        const vh = v.videoHeight || 2000
        const sx    = Math.round(0.15 * vw)
        const sw    = Math.round(0.70 * vw)
        const cropH = Math.round(sw * c.height / c.width)
        const sy    = Math.round(0.51 * vh - cropH / 2)
        x.drawImage(v, sx, sy, sw, cropH, 0, 0, c.width, c.height)
      }
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(rafRef.current); video.pause() }
  }, [])

  return (
    <div style={{
      width: '104.1vw',
      alignSelf: 'center',
      aspectRatio: '469 / 103',
      maxWidth: 'calc(25dvh * 469 / 103)',
      overflow: 'hidden',
      position: 'relative',
      lineHeight: 0,
      flexShrink: 0,
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={OTHER_VIDEO} type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        width={2000}
        height={440}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}

// ── Bottom-left OTHER logo (animated GIF, cropped via Figma background offsets) ──
function OtherLogoGif() {
  return (
    <div style={{
      position: 'absolute',
      left: '0.98vw',
      bottom: '3.99vw',
      width: '21.18vw',
      aspectRatio: '366 / 69',
      backgroundImage: 'url(/d1b1a4182a1186e24123228dd59891419b9ccdd3.gif)',
      backgroundPosition: '50.1% 49.6%',
      backgroundSize: '148.368% 784.314%',
      backgroundRepeat: 'no-repeat',
    }} />
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
      width: '100%',
      height: '100%',
      border: '2.22px solid #EDFF00',
      position: 'relative',
      transform: 'translateZ(0)',
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        aria-label={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Shadow overlay above the video — inset box-shadow is painted below children so must live here */}
      <div style={{
        position: 'absolute',
        inset: 0,
        boxShadow: '15px 4px 15px 0 rgba(0, 0, 0, 0.42) inset',
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────
function HomeInner() {
  const searchParams                  = useSearchParams()
  const refCode                       = searchParams.get('ref') ?? undefined

  const [email, setEmail]             = useState('')
  const [name, setName]               = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [formStep, setFormStep]       = useState<'email' | 'name' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [formState, setFormState]     = useState<'idle'|'loading'|'error'>('idle')
  const [inviteState, setInviteState] = useState<'idle'|'loading'|'sent'|'error'>('idle')
  const [errorMsg, setErrorMsg]       = useState('')
  const nameInputRef                  = useRef<HTMLInputElement>(null)
  const [soundOn, setSoundOn]         = useState(false)

  async function advanceToName(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Capture email immediately — fire and forget, don't block the UI
    fetch('/api/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {/* silent fail */})
    setStepIn(false)
    setTimeout(() => { setFormStep('name') }, 220)
  }

  useEffect(() => {
    if (formStep === 'name' || formStep === 'invite') {
      const fadeIn = setTimeout(() => setStepIn(true), 20)
      const focus  = formStep === 'name'
        ? setTimeout(() => nameInputRef.current?.focus(), 260)
        : undefined
      return () => { clearTimeout(fadeIn); clearTimeout(focus) }
    }
  }, [formStep])


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    setFormState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, refCode }),
      })
      if (res.ok) {
        setStepIn(false)
        setFormStep('invite')
        setFormState('idle')
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

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!inviteEmail || inviteState !== 'idle') return
    setInviteState('loading')
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, inviteEmail }),
      })
      setInviteState(res.ok ? 'sent' : 'error')
    } catch {
      setInviteState('error')
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
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '30px',
        paddingBottom: 'clamp(1rem, 2.5vw, 44px)',
      }}>

        <OtherLogoVideo />

        {/* Ovals — natural aspect ratio, section grows to fit */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.09vw',
          padding: '0 1.5%',
          marginTop: 'clamp(-10px, -1.62vw, -5px)',
          flex: 1,
          minHeight: 0,
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" muted={!soundOn} />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" muted={!soundOn} />
        </div>

        {/* Star overlapping lower-left of logo — Figma y:295 / 1728 = 17.07vw */}
        <div style={{
          position: 'absolute',
          top: '17.07vw',
          left: '17px',
          pointerEvents: 'none',
        }}>
          <img src={STAR_SVG} alt=""
            style={{ height: 'clamp(50px, 7vw, 121px)', width: 'auto', aspectRatio: '1 / 1', display: 'block' }} />
        </div>

        <div style={{ marginTop: 'clamp(0.25rem, 1.5vw, 26px)', flexShrink: 0 }}>

          {/* Row 1: Tifinagh left, Arabic right */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
          }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ"
              style={{ height: 'clamp(10px, 1.97vw, 34px)', width: 'auto', aspectRatio: '171 / 34' }} />
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.18vw, 55px)', width: 'auto', aspectRatio: '161 / 55' }} />
          </div>

          {/* Row 2: MAROC L · "Limited Edition Capsules" · MAROC R */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: 0,
            padding: '0 1.5%',
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

      </section>

      {/* ══════════════════════════════════════════════════════
          CONTENT — yellow
      ══════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100dvh',
        overflow: 'hidden',
        paddingTop: 'clamp(2rem, 8vw, 140px)',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 4vw, 70px)',
        position: 'relative',
      }}>

        <h1
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(3rem, 5.52vw, 95.5px)',
            letterSpacing: '0.02em',
            WebkitTextStrokeColor: '#00006A',
            textAlign: 'center',
            marginBottom: 'clamp(1.5rem, 3vw, 52px)',
          }}
        >
          Capsule 01
        </h1>

        {/* Red content box */}
        <div style={{
          backgroundColor: '#FF3C00',
          maxWidth: 'clamp(300px, 30.15vw, 521px)',
          width: '100%',
          padding: 'clamp(1rem, 1.5vw, 26px)',
          position: 'relative',
        }}>

          {formStep === 'invite' ? (

            /* ── Screen 3: YOU'RE IN ─────────────────────────────── */
            <div style={{
              opacity: stepIn ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 1.45vw, 25px)',
                color: '#EDFF00',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: 'clamp(0.5rem, 0.7vw, 12px)',
              }}>
                WINE IS FOR SHARING.
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.78rem, 1.014vw, 17.5px)',
                lineHeight: 1.4,
                color: '#EDFF00',
                marginBottom: 'clamp(0.75rem, 1.2vw, 21px)',
              }}>
                Though we&apos;re restricting this ballot to one box per person,
                you can invite one friend.
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.78rem, 1.014vw, 17.5px)',
                lineHeight: 1.4,
                color: '#EDFF00',
                marginBottom: 'clamp(0.75rem, 1.2vw, 21px)',
              }}>
                If either of you is drawn, you&apos;ll both be drawn — your fate is linked.
              </p>
              {inviteState === 'sent' ? (
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.78rem, 1.014vw, 17.5px)',
                  color: '#EDFF00',
                  lineHeight: 1.4,
                }}>
                  Invite sent.
                </p>
              ) : (
                <form onSubmit={handleInvite}>
                  <div style={{
                    borderBottom: '1.5px solid #00006A',
                    height: 'clamp(48px, 3.7vw, 64px)',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.65rem',
                  }}>
                    <input
                      type="email"
                      required
                      placeholder="Companion Email"
                      value={inviteEmail}
                      onChange={e => setInviteEmail(e.target.value)}
                      disabled={inviteState === 'loading'}
                      className="form-input-cream"
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
                        color: '#EDFF00',
                      }}
                    />
                  </div>
                  {inviteState === 'error' && (
                    <p style={{ color: '#EDFF00', fontSize: '0.75rem', marginBottom: '0.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={inviteState === 'loading'}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(52px, 4.05vw, 70px)',
                      backgroundColor: '#EDFF00',
                      color: '#00006A',
                      border: '2px solid #00006A',
                      borderRadius: '999px',
                      fontFamily: 'Vulf Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(0.9rem, 1.45vw, 25px)',
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      cursor: inviteState === 'loading' ? 'wait' : 'pointer',
                      opacity: inviteState === 'loading' ? 0.6 : 1,
                      transition: 'opacity 0.15s ease',
                      fontFeatureSettings: "'cv10', 'ss03', 'ss05', 'case', 'ordn', 'dlig'",
                    }}
                    onMouseOver={e => { if (inviteState !== 'loading') e.currentTarget.style.opacity = '0.8' }}
                    onMouseOut={e => { if (inviteState !== 'loading') e.currentTarget.style.opacity = '1' }}
                  >
                    {inviteState === 'loading' ? '...' : 'Send Invite'}
                  </button>
                </form>
              )}
            </div>

          ) : (

            /* ── Screens 1 & 2: email → name ─────────────────────── */
            <div style={{ position: 'relative' }}>

              {/* Email content — holds box height; fades out then hides on name step */}
              <div style={{
                visibility: formStep === 'name' ? 'hidden' : 'visible',
                opacity:    formStep === 'name' ? 0 : (stepIn ? 1 : 0),
                transition: 'opacity 0.22s ease',
              }}>

                {/* Body copy */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(0.75rem, 1.2vw, 21px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
                    lineHeight: 1.29,
                    color: '#EDFF00',
                    marginBottom: '1.29em',
                  }}>
                    The last 480 bottles of an amphora aged grenache,
                    grown by Berber farmers in the foothills of
                    the Atlas mountains.
                  </p>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
                    lineHeight: 1.29,
                    color: '#EDFF00',
                    marginBottom: 0,
                  }}>
                    £89 including delivery.
                  </p>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(0.8rem, 1.014vw, 17.5px)',
                    lineHeight: 1.29,
                    color: '#EDFF00',
                    marginBottom: 0,
                  }}>
                    One bottle of amphora-aged Grenache gris, two bottles of estate rosé,
                    and a small vial of their olive oil.
                  </p>
                </div>

                {/* Stats table */}
                <div style={{ width: '100%' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#EDFF00' }} />
                  {[
                    { label: 'Ballot closes', value: '14 June 2026' },
                    { label: 'Vineyard',      value: 'Meknes, Morocco' },
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
                        color: '#EDFF00',
                        textTransform: 'uppercase',
                      }}>
                        <span style={{ fontWeight: 300 }}>{label}</span>
                        <span style={{ fontWeight: 400 }}>{value}</span>
                      </div>
                      <div style={{ width: '100%', height: '1px', backgroundColor: '#EDFF00' }} />
                    </div>
                  ))}
                </div>

                {/* Email form */}
                <div style={{ height: 'clamp(0.75rem, 1.2vw, 21px)' }} />
                <form onSubmit={advanceToName}>
                  <div style={{
                    borderBottom: '1.5px solid #00006A',
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
                      className="form-input-cream"
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
                        color: '#EDFF00',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(52px, 4.05vw, 70px)',
                      backgroundColor: '#EDFF00',
                      color: '#00006A',
                      border: '2px solid #00006A',
                      borderRadius: '999px',
                      fontFamily: 'Vulf Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(0.9rem, 1.45vw, 25px)',
                      letterSpacing: '-0.03em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'opacity 0.15s ease',
                      fontFeatureSettings: "'cv10', 'ss03', 'ss05', 'case', 'ordn', 'dlig'",
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    Register Now
                  </button>
                </form>
              </div>

              {/* Name step overlay */}
              {formStep === 'name' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: stepIn ? 1 : 0,
                  transform: stepIn ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.32s ease, transform 0.32s ease',
                }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(0.75rem, 1.05vw, 18px)',
                    color: '#EDFF00',
                    lineHeight: 1.4,
                    marginBottom: 'clamp(0.75rem, 1.2vw, 21px)',
                  }}>
                    What shall we call you?
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div style={{
                      borderBottom: '1.5px solid #00006A',
                      height: 'clamp(48px, 3.7vw, 64px)',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.65rem',
                    }}>
                      <input
                        ref={nameInputRef}
                        type="text"
                        required
                        placeholder="Your Name Here"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        disabled={formState === 'loading'}
                        className="form-input-cream"
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
                          color: '#EDFF00',
                        }}
                      />
                    </div>
                    {formState === 'error' && (
                      <p style={{ color: '#EDFF00', fontSize: '0.75rem', marginBottom: '0.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
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
                        backgroundColor: '#EDFF00',
                        color: '#00006A',
                        border: '2px solid #00006A',
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
                      {formState === 'loading' ? '...' : 'Enter Ballot'}
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}
        </div>

        <OtherLogoGif />

        {/* Bottom-right: 4 diamond polygons — Figma x:1447–1597, y:1766–2054 */}
        <img src={DIAMONDS_SVG} alt="" style={{
          position: 'absolute',
          right: '7.58vw',
          bottom: '14.24vw',
          width: '8.68vw',
          height: 'auto',
        }} />

        {/* "Villa" cursive text (node 1:85) — Figma x:1205, y:2052, w:241, h:110 */}
        <img src="/figma/villa-text.svg" alt="" style={{
          position: 'absolute',
          right: '16.32vw',
          bottom: '7.99vw',
          width: '13.95vw',
          height: 'auto',
        }} />

        {/* "Volubilia" cursive text (node 1:84) — Figma x:1292, y:2069, w:412, h:151 */}
        <img src="/figma/villa-volubilia-text.svg" alt="Villa Volubilia" style={{
          position: 'absolute',
          right: '1.39vw',
          bottom: '4.63vw',
          width: '23.84vw',
          height: 'auto',
        }} />

      </section>

    </div>
  )
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  )
}
