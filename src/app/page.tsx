'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const MAROC_SVG     = '/figma/maroc.svg'
const ARABIC_SVG    = '/figma/arabic.svg'
const TIFINAGH_SVG  = '/figma/tifinagh.svg'
const SUNFLOWER_SVG = '/figma/sunflower.svg'
const STAR_SVG      = '/figma/star.svg'
const DIAMONDS_SVG      = '/figma/polygon-diamonds.svg'
const OTHER_VIDEO       = '/other-logo-cropped.mp4'
const OTHER_VIDEO_6K    = '/other-logo-cropped-6k.mp4'
const FARMER_LEFT       = '/farmer-left.mp4'
const FARMER_RIGHT      = '/farmer-right.mp4'

function OtherLogoVideo({ src = OTHER_VIDEO }: { src?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showGif, setShowGif] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch((err) => {
      if (err.name === 'NotAllowedError') setShowGif(true)
    })
  }, [])

  return (
    <div style={{ width: 'min(104.1vw, calc(38dvh * 469 / 103))', alignSelf: 'center', flexShrink: 0 }}>
      {showGif
        ? <img src="/other-logo.gif" alt="OTHER" style={{ width: '100%', display: 'block' }} />
        : <video ref={videoRef} autoPlay loop muted playsInline preload="auto" style={{ width: '100%', display: 'block' }}>
            <source src={src} type="video/mp4" />
          </video>
      }
    </div>
  )
}

function OtherLogoGif() {
  return (
    <div style={{
      position: 'absolute',
      left: '0.98vw',
      bottom: '0.64vw',
      width: '21.18vw',
      aspectRatio: '366 / 69',
      backgroundImage: 'url(/d1b1a4182a1186e24123228dd59891419b9ccdd3.gif)',
      backgroundPosition: '50.1% 49.6%',
      backgroundSize: '148.368% 784.314%',
      backgroundRepeat: 'no-repeat',
    }} />
  )
}

function FarmerVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div style={{
      borderRadius: '239.351px',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      border: '2.22px solid #EDFF00',
      position: 'relative',
      transform: 'translateZ(0)',
    }}>
      <video
        ref={videoRef}
        autoPlay loop muted playsInline preload="auto"
        aria-label={label}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#FF3C00' }}
      >
        <source src={src} type="video/mp4" />
      </video>
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

function StepDots({ step, size = 6 }: { step: 2 | 3; size?: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginBottom: '18px' }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          width: size, height: size, borderRadius: '50%',
          backgroundColor: n === step ? '#EDFF00' : 'rgba(237,255,0,0.28)',
          transition: 'background-color 0.3s ease',
          flexShrink: 0,
        }} />
      ))}
    </div>
  )
}

function HomeMobile() {
  const searchParams = useSearchParams()
  const refCode      = searchParams.get('ref') ?? undefined

  const [email, setEmail]             = useState('')
  const [name, setName]               = useState('')
  const [welcomeBack, setWelcomeBack] = useState(false)
  const [formStep, setFormStep]       = useState<'email' | 'name' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [copied, setCopied]           = useState(false)

  async function advanceToName(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.exists) {
          setName(data.name ?? '')
          setInviteCode(data.inviteCode)
          setWelcomeBack(true)
          setStepIn(false)
          setTimeout(() => setFormStep('invite'), 220)
          return
        }
      }
    } catch { /* fall through */ }
    setStepIn(false)
    setTimeout(() => setFormStep('name'), 220)
  }

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    setStepIn(false)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, refCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
    setTimeout(() => setFormStep('invite'), 220)
  }

  useEffect(() => {
    if (formStep === 'invite' || formStep === 'name') {
      const t = setTimeout(() => setStepIn(true), 20)
      return () => clearTimeout(t)
    }
  }, [formStep])

  async function handleShare() {
    const siteUrl = window.location.origin
    const url = inviteCode ? `${siteUrl}/?ref=${inviteCode}` : siteUrl
    const shareData = {
      title: 'Other Wine — Capsule 01',
      text:  `I've registered for Other Wine's first capsule drop. Join the list:\n${url}`,
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch { /* dismissed */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const TEXT: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    color: '#EDFF00',
  }

  return (
    <div style={{ backgroundColor: '#FF3C00', overflowX: 'hidden' }}>

      <section style={{
        backgroundColor: '#FF3C00',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 7px)',
        paddingBottom: 'calc(41px + env(safe-area-inset-bottom, 0px))',
      }}>

        <OtherLogoVideo src={OTHER_VIDEO} />

        {/* Two video ovals — fixed aspect ratio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          <div style={{ marginLeft: '7px', width: 'calc(100% - 13px)', aspectRatio: '380 / 214' }}>
            <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" />
          </div>
          <div style={{ marginLeft: '7px', width: 'calc(100% - 13px)', aspectRatio: '380 / 214' }}>
            <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" />
          </div>
        </div>

        {/* Flexible spacer — pushes MAROC to the bottom of the first screen */}
        <div style={{ flex: 1, minHeight: '16px' }} />

        {/* MAROC / script text — pinned to bottom of viewport */}
        <div style={{ padding: '0 12px 13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ" style={{ width: '13.74vw', height: 'auto' }} />
            <img src={ARABIC_SVG}   alt="المغرب"   style={{ width: '12.98vw', height: 'auto', transform: 'scaleX(-1)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
          </div>
        </div>

      </section>

      <section style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10px',
        paddingLeft: '40px',
        paddingRight: '36px',
        paddingBottom: '80px',
        position: 'relative',
      }}>

        <h1 style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontSize: '45px',
          fontWeight: 900,
          letterSpacing: '0.9px',
          color: 'transparent',
          WebkitTextStroke: '2px #00006A',
          textAlign: 'center',
          marginBottom: '20px',
          lineHeight: 'normal',
          whiteSpace: 'nowrap',
        }}>
          Capsule 01
        </h1>

        <div style={{ backgroundColor: '#FF3C00', width: '100%', padding: '16px', position: 'relative' }}>

          {formStep === 'invite' ? (

            /* Confirmed / Share */
            <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              <StepDots step={3} />
              <p style={{ ...TEXT, fontWeight: 700, fontSize: 'clamp(0.9rem,4.5vw,18px)', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '12px' }}>
                {welcomeBack ? `Welcome back${name ? `, ${name.split(' ')[0]}` : ''}.` : 'You\'re on the list.'}
              </p>
              <p style={{ ...TEXT, fontWeight: 300, fontSize: 'clamp(0.75rem,3.5vw,15px)', lineHeight: 1.4, marginBottom: '16px' }}>
                Invite a friend — if they sign up, you&apos;ll both get early access before the general list.
              </p>
              {inviteCode && (
                <button
                  onClick={handleShare}
                  style={{ display: 'block', width: '100%', height: '52px', backgroundColor: '#EDFF00', color: '#00006A', border: '2px solid #00006A', borderRadius: '999px', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '16px', letterSpacing: '-0.03em', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  {copied ? 'Link copied!' : 'Invite a friend'}
                </button>
              )}
            </div>

          ) : formStep === 'name' ? (

            /* Name step */
            <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease' }}>
              <StepDots step={2} />
              <p style={{ ...TEXT, fontWeight: 700, fontSize: 'clamp(0.9rem,4.5vw,18px)', textAlign: 'center', marginBottom: '20px', lineHeight: 1.2 }}>
                What&apos;s your name?
              </p>
              <form onSubmit={advanceToInvite}>
                <div style={{ borderBottom: '1.5px solid #00006A', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="form-input-cream"
                    style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '0 1rem', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '16px', letterSpacing: '-0.01em', color: '#EDFF00', textAlign: 'center' }}
                  />
                </div>
                <button type="submit" style={{ display: 'block', width: '100%', maxWidth: '240px', margin: '0 auto', height: '52px', backgroundColor: '#EDFF00', color: '#00006A', border: '2px solid #00006A', borderRadius: '999px', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '16px', letterSpacing: '-0.03em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Continue
                </button>
              </form>
            </div>

          ) : (

            /* Email entry */
            <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease' }}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ ...TEXT, fontWeight: 700, fontSize: 'clamp(0.85rem,4vw,16px)', lineHeight: 1.3, marginBottom: '1em' }}>
                  An amphora aged grenache ros&eacute;, grown by Berber farmers in northern Morocco.
                </p>
                <p style={{ ...TEXT, fontWeight: 400, fontSize: 'clamp(0.85rem,4vw,16px)', lineHeight: 1.3 }}>
                  480 bottles of their 2023 vintage remain. Available as part of Capsule 01 to members only.
                </p>
              </div>

              {/* Info table */}
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <div style={{ width: '100%', height: '1px', backgroundColor: '#EDFF00' }} />
                {[
                  ['On Sale',             '23 June'],
                  ['Membership Status',   'Open'],
                  ['Capsules Available',  '480'],
                  ['Pricing',             '£87'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 16px', fontFamily: 'Vulf Sans, sans-serif', fontSize: 'clamp(0.7rem,3.5vw,14px)', lineHeight: 1, letterSpacing: '-0.2px', color: '#EDFF00', textTransform: 'uppercase' }}>
                      <span style={{ fontWeight: 300 }}>{label}</span>
                      <span style={{ fontWeight: 400 }}>{value}</span>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#EDFF00' }} />
                  </div>
                ))}
              </div>

              <form onSubmit={advanceToName}>
                <div style={{ borderBottom: '1.5px solid #00006A', height: '40px', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <input
                    type="email" required placeholder="Your Email Here"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="form-input-cream"
                    style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '0 1rem', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '16px', letterSpacing: '-0.01em', color: '#EDFF00', textAlign: 'center' }}
                  />
                </div>
                <button type="submit" style={{ display: 'block', width: '100%', maxWidth: '240px', margin: '0 auto', height: '52px', backgroundColor: '#EDFF00', color: '#00006A', border: '2px solid #00006A', borderRadius: '999px', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '16px', letterSpacing: '-0.03em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Join the Waitlist
                </button>
              </form>
            </div>

          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '32px', width: '100%' }}>
          <img src="/bottle-1.png" alt="" style={{ width: '130px', height: 'auto', display: 'block', flexShrink: 0 }} />
          <img src="/bottle-2.png" alt="" style={{ width: '130px', height: 'auto', display: 'block', flexShrink: 0 }} />
          <img src="/bottle-1.png" alt="" style={{ width: '66px', height: 'auto', display: 'block', flexShrink: 0, transform: 'rotate(0.83deg)' }} />
        </div>

      </section>

      <MobileNav />
    </div>
  )
}

function HomeInner() {
  const searchParams                  = useSearchParams()
  const refCode                       = searchParams.get('ref') ?? undefined
  const isMobile                      = useIsMobile()

  const [email, setEmail]             = useState('')
  const [name, setName]               = useState('')
  const [welcomeBack, setWelcomeBack] = useState(false)
  const [formStep, setFormStep]       = useState<'email' | 'name' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [copied, setCopied]           = useState(false)
  const yellowRef                     = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      const target = yellowRef.current
      if (!target) return
      const start = window.scrollY
      const end = target.getBoundingClientRect().top + window.scrollY
      const duration = 1600
      const startTime = performance.now()
      function step(now: number) {
        const p = Math.min((now - startTime) / duration, 1)
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
        window.scrollTo(0, start + (end - start) * ease)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  async function advanceToName(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Check if already registered — if so skip straight to share step
    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.exists) {
          setName(data.name ?? '')
          setInviteCode(data.inviteCode)
          setWelcomeBack(true)
          setStepIn(false)
          setTimeout(() => setFormStep('invite'), 220)
          return
        }
      }
    } catch { /* fall through to normal flow */ }
    setStepIn(false)
    setTimeout(() => setFormStep('name'), 220)
  }

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    setStepIn(false)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, refCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
    setTimeout(() => setFormStep('invite'), 220)
  }

  useEffect(() => {
    if (formStep === 'invite' || formStep === 'name') {
      const fadeIn = setTimeout(() => setStepIn(true), 20)
      return () => clearTimeout(fadeIn)
    }
  }, [formStep])

  async function handleShare() {
    const siteUrl = window.location.origin
    const url = inviteCode ? `${siteUrl}/?ref=${inviteCode}` : siteUrl
    const shareData = {
      title: 'Other Wine — Capsule 01',
      text:  `I've registered for Other Wine's first capsule drop. Join the list:\n${url}`,
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch { /* dismissed */ }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isMobile) return <HomeMobile />

  return (
    <div style={{ backgroundColor: '#FF3C00', overflow: 'hidden' }}>

      <Nav color="#00006A" />

      <section style={{
        backgroundColor: '#FF3C00',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '0.58vw',
        paddingBottom: 'clamp(1rem, 2.5vw, 44px)',
      }}>

        <OtherLogoVideo src={OTHER_VIDEO_6K} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.09vw',
          padding: '0 1.5%',
          marginTop: 'clamp(-10px, -1.62vw, -5px)',
          flex: 1,
          minHeight: 0,
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" />
        </div>

        <div style={{
          position: 'absolute',
          top: '15vw',
          left: '17px',
          pointerEvents: 'none',
        }}>
          <img src={STAR_SVG} alt=""
            style={{ height: 'clamp(50px, 7vw, 121px)', width: 'auto', aspectRatio: '1 / 1', display: 'block' }} />
        </div>

        <div style={{ marginTop: 'clamp(0.25rem, 1.5vw, 26px)', flexShrink: 0 }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
          }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ"
              style={{ height: 'clamp(10px, 1.97vw, 34px)', width: 'auto', aspectRatio: '171 / 34' }} />
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(16px, 3.18vw, 55px)', width: 'auto', aspectRatio: '161 / 55', transform: 'scaleX(-1)', marginBottom: '0.5vw' }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: 0,
            padding: '0 1.5%',
          }}>
            <img src={MAROC_SVG} alt="MAROC"
              style={{ height: 'clamp(40px, 5.61vw, 97px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />

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

            <div style={{ position: 'relative' }}>
              <img src={SUNFLOWER_SVG} alt=""
                style={{
                  position: 'absolute',
                  top: '-45%',
                  left: '-9%',
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

      <section ref={yellowRef} style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100dvh',
        paddingTop: 'clamp(2.5rem, 3.5vw, 60px)',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 14.64vw, 253px)',
        position: 'relative',
      }}>

        <h1
          style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontSize: 'clamp(3rem, 5.52vw, 95.484px)',
            fontStyle: 'normal',
            fontWeight: 900,
            lineHeight: 1.47,
            letterSpacing: '1.91px',
            color: 'transparent',
            WebkitTextStroke: '2.22px #00006A',
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 2.03vw, 35px)',
          }}
        >
          Capsule 01
        </h1>

        <div style={{
          backgroundColor: '#FF3C00',
          maxWidth: 'clamp(340px, 36vw, 622px)',
          width: '100%',
          padding: 'clamp(1rem, 1.5vw, 26px)',
          position: 'relative',
        }}>

          {formStep === 'invite' ? (

            /* Screen 3: share / confirmed */
            <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
              <StepDots step={3} size={7} />
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 1.45vw, 25px)',
                color: '#EDFF00',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: 'clamp(0.5rem, 0.7vw, 12px)',
              }}>
                {welcomeBack ? `Welcome back${name ? `, ${name.split(' ')[0]}` : ''}.` : 'You\'re on the list.'}
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(0.78rem, 1.014vw, 17.5px)',
                lineHeight: 1.4,
                color: '#EDFF00',
                marginBottom: 'clamp(0.75rem, 1.2vw, 21px)',
              }}>
                Invite a friend — if they sign up, you&apos;ll both get early access before the general list.
              </p>
              {inviteCode && (
                <button
                  onClick={handleShare}
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
                  }}
                  onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                  onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {copied ? 'Link copied!' : 'Invite a friend'}
                </button>
              )}
            </div>

          ) : formStep === 'name' ? (

            /* Screen 2: name */
            <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease' }}>
              <StepDots step={2} size={7} />
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1rem, 1.45vw, 25px)',
                color: '#EDFF00',
                textAlign: 'center',
                marginBottom: 'clamp(1rem, 1.5vw, 26px)',
                lineHeight: 1.2,
              }}>
                What&apos;s your name?
              </p>
              <form onSubmit={advanceToInvite}>
                <div style={{
                  borderBottom: '1.5px solid #00006A',
                  height: 'clamp(28px, 2.3vw, 40px)',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 'clamp(0.5rem, 1.79vw, 31px)',
                }}>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                      textAlign: 'center',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    display: 'block',
                    width: 'clamp(180px, 17.42vw, 301px)',
                    margin: '0 auto',
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
                  Continue
                </button>
              </form>
            </div>

          ) : (

            /* Screen 1: email */
            <div style={{ position: 'relative' }}>
              <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease' }}>

                        <div style={{ textAlign: 'center', marginBottom: 'clamp(0.75rem, 2.54vw, 44px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(0.9rem, 1.331vw, 23px)',
                    lineHeight: 1.29,
                    letterSpacing: '0.23px',
                    color: '#EDFF00',
                    marginBottom: '1.29em',
                  }}>
                    An amphora aged grenache ros&eacute;, grown by Berber farmers in northern Morocco.
                  </p>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(0.9rem, 1.331vw, 23px)',
                    lineHeight: 1.29,
                    letterSpacing: '0.23px',
                    color: '#EDFF00',
                    marginBottom: 0,
                  }}>
                    480 bottles of their 2023 vintage remain. Available as part of Capsule 01 to members only.
                  </p>
                </div>

                <div style={{ width: '100%', marginBottom: 'clamp(0.75rem, 3.31vw, 57px)' }}>
                  <div style={{ width: '100%', height: '1px', backgroundColor: '#EDFF00' }} />
                  {[
                    ['On Sale',            '23 June'],
                    ['Membership Status',  'Open'],
                    ['Capsules Available', '480'],
                    ['Pricing',            '£87'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 'clamp(4px, 0.33vw, 6px) clamp(18px, 2.79vw, 48px)',
                        fontFamily: 'Vulf Sans, sans-serif',
                        fontSize: 'clamp(0.75rem, 1.16vw, 20px)',
                        lineHeight: 1,
                        letterSpacing: '-0.2px',
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

                <form onSubmit={advanceToName}>
                  <div style={{
                    borderBottom: '1.5px solid #00006A',
                    height: 'clamp(28px, 2.3vw, 40px)',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'clamp(0.5rem, 1.79vw, 31px)',
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
                        textAlign: 'center',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'block',
                      width: 'clamp(180px, 17.42vw, 301px)',
                      margin: '0 auto',
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
                    Join the Waitlist
                  </button>
                </form>
              </div>


            </div>
          )}
        </div>

        <OtherLogoGif />

        <img src={DIAMONDS_SVG} alt="" style={{
          position: 'absolute',
          right: '7.58vw',
          bottom: '11.35vw',
          width: '8.68vw',
          height: 'auto',
        }} />

        <img src="/figma/villa-text.svg" alt="" style={{
          position: 'absolute',
          right: '16.32vw',
          bottom: '4.63vw',
          width: '13.95vw',
          height: 'auto',
        }} />

        <img src="/figma/villa-volubilia-text.svg" alt="Villa Volubilia" style={{
          position: 'absolute',
          right: '1.39vw',
          bottom: '1.27vw',
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
