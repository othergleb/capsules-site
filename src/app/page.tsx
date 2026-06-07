'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const MAROC_SVG     = '/figma/maroc.svg'
const ARABIC_SVG    = '/figma/arabic.svg'
const TIFINAGH_SVG  = '/figma/tifinagh.svg'
const SUNFLOWER_SVG = '/figma/sunflower.svg'
const STAR_SVG      = '/figma/star.svg'
const CAM1          = '/cam 1.png'
const CAM2          = '/cam 2.png'
const CAM3          = '/cam 3.png'
const OTHER_VIDEO       = '/other-logo-cropped.mp4'
const OTHER_VIDEO_6K    = '/other-logo-cropped-6k.mp4'
const FARMER_LEFT       = '/Homepage_OTHER_VIDEO_02_web.mp4'
const FARMER_RIGHT      = '/Homepage_OTHER_VIDEO_08_web.mp4'

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
    <Link href="/" style={{ width: 'min(104.1vw, calc(38dvh * 469 / 103))', alignSelf: 'center', flexShrink: 0, display: 'block' }}>
      {showGif
        ? <img src="/other-logo.gif" alt="OTHER" style={{ width: '100%', display: 'block' }} />
        : <video ref={videoRef} autoPlay loop muted playsInline preload="auto" style={{ width: '100%', display: 'block' }}>
            <source src={src} type="video/mp4" />
          </video>
      }
    </Link>
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

function StepDots({ step, size = 6, color = '#EDFF00' }: { step: 2 | 3; size?: number; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginBottom: '18px' }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          width: size, height: size, borderRadius: '50%',
          backgroundColor: n === step ? color : color + '44',
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
  const yellowRef    = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      const target = yellowRef.current
      if (!target) return
      const start = window.scrollY
      const end = target.getBoundingClientRect().top + window.scrollY
      const duration = 1000
      const startTime = performance.now()
      function step(now: number) {
        const p = Math.min((now - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        window.scrollTo(0, start + (end - start) * ease)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  const [email, setEmail]             = useState('')
  const [formStep, setFormStep]       = useState<'email' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [shared, setShared]           = useState(false)
  const [dismissed, setDismissed]     = useState(false)

  async function handleShare() {
    const siteUrl = window.location.origin
    const url = inviteCode ? `${siteUrl}/?ref=${inviteCode}` : siteUrl
    const shareData = { title: 'Other Wine — Capsule 01', text: `I've registered for Other Wine's first capsule drop. Join the list:\n${url}` }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch { /* dismissed */ }
    } else {
      await navigator.clipboard.writeText(url)
    }
    setShared(true)
  }

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStepIn(false)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, refCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
    setTimeout(() => setFormStep('invite'), 220)
  }

  useEffect(() => {
    const fadeIn = setTimeout(() => setStepIn(true), 20)
    return () => clearTimeout(fadeIn)
  }, [formStep])

  const FONT: React.CSSProperties = { fontFamily: 'Vulf Sans, sans-serif' }

  return (
    <div style={{ backgroundColor: '#FF3C00', overflowX: 'hidden' }}>

      <section style={{
        backgroundColor: '#FF3C00',
        minHeight: 'calc(100svh - 41px - env(safe-area-inset-bottom, 0px))',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 7px)',
      }}>

        <OtherLogoVideo src={OTHER_VIDEO} />

        <div style={{ flex: 8 }} />

        {/* Two video ovals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ marginLeft: '7px', width: 'calc(100% - 13px)', aspectRatio: '380 / 214' }}>
            <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" />
          </div>
          <div style={{ marginLeft: '7px', width: 'calc(100% - 13px)', aspectRatio: '380 / 214' }}>
            <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" />
          </div>
        </div>

        <div style={{ flex: 50 }} />

        <div style={{ padding: '0 12px 13px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ" style={{ width: '13.74vw', height: 'auto' }} />
            <img src={ARABIC_SVG}   alt="المغرب"   style={{ width: '12.98vw', height: 'auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
          </div>
        </div>

      </section>

      <section ref={yellowRef} style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '41px',
        position: 'relative',
        minHeight: '1200px',
        overflow: 'hidden',
      }}>

        {/* "Capsule 01" label */}
        <p style={{
          ...FONT,
          fontWeight: 900,
          fontSize: '18px',
          letterSpacing: '0.72px',
          lineHeight: 1.05,
          color: '#00006A',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '0',
        }}>Capsule 01</p>

        {/* Main heading */}
        <h1 style={{
          ...FONT,
          fontWeight: 300,
          fontSize: '25px',
          lineHeight: '24.677px',
          letterSpacing: '0.5px',
          color: '#00006A',
          textAlign: 'center',
          textTransform: 'uppercase',
          maxWidth: '365px',
          margin: '12px auto 90px',
        }}>
          Register for exclusive<br />access on 23 June
        </h1>

        {/* Form steps — directly on yellow */}
        {dismissed ? (

          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto 24px' }}>
              <p style={{ ...FONT, fontWeight: 700, fontSize: '16px', lineHeight: 1.27, color: '#FF3C00', textTransform: 'uppercase', marginBottom: '1.75em' }}>
                You&apos;ve registered.
              </p>
              <p style={{ ...FONT, fontWeight: 300, fontSize: '16px', lineHeight: 1.27, color: '#FF3C00' }}>
                Purchase link drops on 23 June, keep an eye on your emails.
              </p>
            </div>
            <div style={{ padding: '0 14px' }}>
              <a href="/the-wine" style={{
                display: 'block',
                width: '100%',
                height: '45px',
                lineHeight: '45px',
                backgroundColor: 'transparent',
                border: '1px solid #00006A',
                borderRadius: '999px',
                ...FONT,
                fontWeight: 300,
                fontSize: '16px',
                letterSpacing: '-0.48px',
                textTransform: 'uppercase',
                color: '#00006A',
                textDecoration: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}>What&apos;s in the Capsule</a>
            </div>
          </div>

        ) : formStep === 'invite' ? (

          /* Screen 2: share */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease', width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto 24px' }}>
              <p style={{ ...FONT, fontWeight: 700, fontSize: '16px', lineHeight: 1.27, color: '#FF3C00', textTransform: 'uppercase', marginBottom: '1.75em' }}>
                CONFIRM EARLY BIRD ACCESS
              </p>
              <p style={{ ...FONT, fontWeight: 300, fontSize: '16px', lineHeight: 1.27, color: '#FF3C00' }}>
                Successfully refer one friend and get access to Capsule 01 early.
              </p>
            </div>
            <div style={{ padding: '0 14px' }}>
              <button
                onClick={shared ? () => setDismissed(true) : handleShare}
                style={{ display: 'block', width: '100%', height: '45px', backgroundColor: '#00006A', color: '#EDFF00', border: 'none', borderRadius: '999px', ...FONT, fontWeight: 300, fontSize: '16px', letterSpacing: '-0.48px', textTransform: 'uppercase', cursor: 'pointer', marginBottom: '12px' }}
              >
                {shared ? 'Complete' : 'Share your link'}
              </button>
              <button
                onClick={() => setDismissed(true)}
                style={{ display: 'block', width: '100%', background: 'none', border: 'none', ...FONT, fontWeight: 300, fontSize: '12.8px', letterSpacing: '-0.48px', color: '#FF3C00', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Skip
              </button>
            </div>
          </div>

        ) : (

          /* Screen 1: email */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease', width: '100%', position: 'relative', zIndex: 1 }}>
            <p style={{ ...FONT, fontWeight: 700, fontSize: '16px', lineHeight: 1.27, letterSpacing: '0.16px', color: '#FF3C00', textAlign: 'center', maxWidth: '320px', margin: '-32px auto 48px' }}>
              We&apos;ve been given access to the last remaining bottles of an amphora aged grenache, grown by Berber farmers in northern Morocco — a ros&eacute; so pale it enters a new classification.
            </p>

            <div style={{ padding: '0 14px 16px', marginTop: '-16px', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
              <p style={{ ...FONT, fontWeight: 400, fontSize: '12px', lineHeight: '17.738px', letterSpacing: '-0.12px', color: '#FF3C00', textAlign: 'center', marginTop: '10px', marginBottom: '7px', textTransform: 'uppercase' }}>
                Inside Capsule 01 (£89)
              </p>
              <div style={{ borderTop: '0.633px solid #FF3C00' }}>
                {([
                  ['1 x Bottle',  'Amphora Aged Grenache, 2023'],
                  ['2 x Bottles', 'Estate Moroccan Rosé'],
                  ['1 x Vial',    'Award-winning Olive Oil'],
                ] as [string, string][]).map(([qty, item]) => (
                  <div key={qty} style={{ display: 'grid', gridTemplateColumns: '31% 1fr', alignItems: 'center', padding: '2px 0', borderBottom: '0.633px solid #FF3C00' }}>
                    <span style={{ ...FONT, fontWeight: 300, fontSize: '12px', lineHeight: '17.738px', color: '#FF3C00', letterSpacing: '-0.12px', textTransform: 'uppercase', paddingLeft: '40px' }}>{qty}</span>
                    <span style={{ ...FONT, fontWeight: 400, fontSize: '12px', lineHeight: '17.738px', color: '#FF3C00', letterSpacing: '-0.12px', textTransform: 'uppercase', textAlign: 'left', paddingLeft: '36px' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={advanceToInvite} style={{ padding: '0 14px' }}>
              <div style={{ border: '0.633px solid #00006A', height: '32px', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Your email here"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input-cream"
                  style={{ width: '100%', height: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '0 1rem', ...FONT, fontWeight: 300, fontSize: '16px', letterSpacing: '-0.48px', color: '#00006A', textAlign: 'center' }}
                />
              </div>
              <button type="submit" style={{ display: 'block', width: '100%', height: '45px', backgroundColor: '#00006A', color: '#EDFF00', border: 'none', borderRadius: '63.35px', ...FONT, fontWeight: 300, fontSize: '16px', letterSpacing: '-0.48px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Claim your place
              </button>
            </form>
          </div>

        )}


        {/* Bottles — two-div bounding-box pattern from Figma (outer = bbox, inner = transform, img = natural size) */}
        {/* All tops = Figma frame y − 653 (yellow section top); lefts are direct from Figma */}

        {/* cam 1 — bbox 492.711×601.124 at (-144, 479) */}
        <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', left:'-128px', top:'524px', width:'492.711px', height:'601.124px', pointerEvents:'none', userSelect:'none', zIndex:0 }}>
          <div style={{ transform:'scaleX(-1) rotate(0deg)', flexShrink:0 }}>
            <img src={CAM2} alt="" style={{ width:'556.517px', height:'742.022px', objectFit:'cover', display:'block' }} />
          </div>
        </div>

        {/* cam 2 — bbox 473.191×588.029 at (-48.54, 510.87) */}
        <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', left:'-29.54px', top:'570.87px', width:'473.191px', height:'588.029px', pointerEvents:'none', userSelect:'none', zIndex:1 }}>
          <div style={{ transform:'rotate(1deg)', flexShrink:0 }}>
            <img src={CAM2} alt="" style={{ width:'556.517px', height:'742.022px', objectFit:'cover', display:'block' }} />
          </div>
        </div>

        {/* cam 3 — bbox 582.055×653.043 at (5.49, 503.64) */}
        <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', left:'-48.51px', top:'573.64px', width:'582.055px', height:'653.043px', pointerEvents:'none', userSelect:'none', zIndex:2 }}>
          <div style={{ transform:'rotate(0deg)', flexShrink:0 }}>
            <img src={CAM3} alt="" style={{ width:'556.517px', height:'742.022px', objectFit:'cover', display:'block' }} />
          </div>
        </div>

        {/* vial — bbox 123.221×153.639 at (-9.77, 865.12) */}
        <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', left:'-4.77px', top:'955.12px', width:'123.221px', height:'153.639px', pointerEvents:'none', userSelect:'none', zIndex:3 }}>
          <div style={{ transform:'scaleX(-1) rotate(15deg)', flexShrink:0 }}>
            <img src="/b9f0e9393dc291355495125a98e814a8 1.png" alt="" style={{ width:'98.96px', height:'187.611px', objectFit:'cover', display:'block' }} />
          </div>
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
  const [formStep, setFormStep]       = useState<'email' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [shared, setShared]           = useState(false)
  const [dismissed, setDismissed]     = useState(false)
  const yellowRef                     = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      const target = yellowRef.current
      if (!target) return
      const start = window.scrollY
      const end = target.getBoundingClientRect().top + window.scrollY
      const duration = 1000
      const startTime = performance.now()
      function step(now: number) {
        const p = Math.min((now - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - p, 4)
        window.scrollTo(0, start + (end - start) * ease)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStepIn(false)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, refCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
    setTimeout(() => setFormStep('invite'), 220)
  }

  useEffect(() => {
    const fadeIn = setTimeout(() => setStepIn(true), 20)
    return () => clearTimeout(fadeIn)
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
    }
    setShared(true)
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
              style={{ height: 'clamp(16px, 3.18vw, 55px)', width: 'auto', aspectRatio: '161 / 55', marginBottom: '0.5vw' }} />
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
        borderTop: '2px solid #FF3C00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100dvh',
        paddingTop: 'clamp(2rem, 3vw, 52px)',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(4rem, 6vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Section label */}
        <p style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(15px, 1.74vw, 30px)',
          letterSpacing: '1.2px',
          color: '#00006A',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 'clamp(0.25rem, 0.4vw, 7px)',
        }}>Capsule 01</p>

        {/* Large heading */}
        <h1 style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontSize: '42px',
          fontWeight: 300,
          lineHeight: '37px',
          letterSpacing: '0.84px',
          color: '#00006A',
          textAlign: 'center',
          marginBottom: 'clamp(4rem, 7vw, 120px)',
          textTransform: 'uppercase',
          maxWidth: '52%',
        }}>
          Register for exclusive<br />access on 23 June
        </h1>

        {/* Form — directly on yellow */}
        {dismissed ? (
          <div style={{ maxWidth: 'clamp(340px, 36vw, 622px)', width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto clamp(0.75rem, 1.5vw, 26px)' }}>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 700,
                fontSize: '23px',
                lineHeight: 1.27,
                letterSpacing: '0.23px',
                color: '#FF3C00',
                textTransform: 'uppercase',
                marginBottom: '0.75em',
              }}>
                You&apos;ve registered.
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: '23px',
                lineHeight: 1.27,
                letterSpacing: '0.23px',
                color: '#FF3C00',
              }}>
                Purchase link drops on 23 June, keep an eye on your emails.
              </p>
            </div>
            <div style={{ padding: '0 8.5%' }}>
              <a href="/the-wine" style={{
                display: 'block',
                width: '100%',
                height: 'clamp(44px, 2.95vw, 51px)',
                lineHeight: 'clamp(44px, 2.95vw, 51px)',
                backgroundColor: 'transparent',
                border: '1px solid #00006A',
                borderRadius: '999px',
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(12px, 1.45vw, 25px)',
                letterSpacing: '-0.75px',
                textTransform: 'uppercase',
                color: '#00006A',
                textDecoration: 'none',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}>What&apos;s in the Capsule</a>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 'clamp(340px, 36vw, 622px)', width: '100%', position: 'relative', zIndex: 1 }}>

            {formStep === 'invite' ? (

              /* Screen 2: share */
              <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto clamp(0.75rem, 1.5vw, 26px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '23px',
                    lineHeight: 1.27,
                    letterSpacing: '0.23px',
                    color: '#FF3C00',
                    marginBottom: '1.75em',
                    textTransform: 'uppercase',
                  }}>
                    CONFIRM EARLY BIRD ACCESS
                  </p>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: '23px',
                    lineHeight: 1.27,
                    letterSpacing: '0.23px',
                    color: '#FF3C00',
                  }}>
                    Successfully refer one friend and get access to Capsule 01 early.
                  </p>
                </div>
                <div style={{ padding: '0 8.5%', marginTop: 'clamp(4rem, 8vw, 130px)' }}>
                  <button
                    onClick={shared ? () => setDismissed(true) : handleShare}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(44px, 2.95vw, 51px)',
                      backgroundColor: '#00006A',
                      color: '#EDFF00',
                      border: 'none',
                      borderRadius: '999px',
                      fontFamily: 'Vulf Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(12px, 1.45vw, 25px)',
                      letterSpacing: '-0.75px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'opacity 0.15s ease',
                      marginBottom: 'clamp(0.4rem, 0.6vw, 10px)',
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    {shared ? 'Complete' : 'Share your link'}
                  </button>
                  <button
                    onClick={() => setDismissed(true)}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      fontFamily: 'Vulf Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(9.6px, 1.16vw, 20px)',
                      letterSpacing: '-0.75px',
                      color: '#FF3C00',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Skip
                  </button>
                </div>
              </div>

            ) : (

              /* Screen 1: email */
              <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(0.75rem, 1.5vw, 26px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '23px',
                    lineHeight: 1.27,
                    letterSpacing: '0.23px',
                    color: '#FF3C00',
                    marginBottom: '0.75em',
                    maxWidth: '85%',
                    margin: '0 auto 0.75em',
                  }}>
                    We&apos;ve been given access to the last remaining bottles of an amphora aged grenache, grown by Berber farmers in northern Morocco — a ros&eacute; so pale it enters a new classification.
                  </p>
                </div>

                {/* Contents table */}
                <div style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 26px)', padding: '0 8.5%' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(9px, 1.04vw, 18px)',
                    letterSpacing: '-0.18px',
                    color: '#FF3C00',
                    textAlign: 'center',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                  }}>Inside Capsule 01 (£89)</p>
                  <div style={{ borderTop: '1px solid #FF3C00' }}>
                    {([
                      ['1 x Bottle',  'Amphora Aged Grenache, 2023'],
                      ['2 x Bottles', 'Estate Moroccan Rosé'],
                      ['1 x Vial',    'Award-winning Olive Oil'],
                    ] as [string, string][]).map(([qty, item]) => (
                      <div key={qty} style={{
                        display: 'grid',
                        gridTemplateColumns: '31% 1fr',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderBottom: '1px solid #FF3C00',
                      }}>
                        <span style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '18px', lineHeight: '20px', color: '#FF3C00', letterSpacing: '-0.18px', textTransform: 'uppercase', paddingLeft: '8px' }}>{qty}</span>
                        <span style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: '18.5px', color: '#FF3C00', letterSpacing: '-0.18px', textTransform: 'uppercase', textAlign: 'left', paddingLeft: '0px' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={advanceToInvite} style={{ padding: '0 8.5%' }}>
                  <div style={{
                    border: '1px solid #00006A',
                    height: 'clamp(44px, 2.95vw, 51px)',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 'clamp(0.4rem, 0.6vw, 10px)',
                  }}>
                    <input
                      type="email"
                      required
                      placeholder="Your email here"
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
                        fontSize: 'clamp(12px, 1.45vw, 25px)',
                        letterSpacing: '-0.75px',
                        color: '#00006A',
                        textAlign: 'center',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(44px, 2.95vw, 51px)',
                      backgroundColor: '#00006A',
                      color: '#EDFF00',
                      border: 'none',
                      borderRadius: '999px',
                      fontFamily: 'Vulf Sans, sans-serif',
                      fontWeight: 300,
                      fontSize: 'clamp(12px, 1.45vw, 25px)',
                      letterSpacing: '-0.75px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'opacity 0.15s ease',
                      fontFeatureSettings: "'cv10', 'ss03', 'ss05', 'case', 'ordn', 'dlig'",
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    Claim your place
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Left large bottle — cam 1: 658×878, rotate(10.247deg) */}
        <img src={CAM1} alt="" style={{
          position: 'absolute',
          left: 'calc(-2vw + 20px)',
          bottom: '0',
          width: 'clamp(165.6px, 33.12vw, 573.3px)',
          aspectRatio: '329 / 439',
          objectFit: 'cover',
          transform: 'rotate(0deg)',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }} />

        {/* Olive oil vial — b9f0e9393, rotate(6.422deg) */}
        <img src="/b9f0e9393dc291355495125a98e814a8 1.png" alt="" style={{
          position: 'absolute',
          left: '20.83vw',
          top: '33vw',
          width: '117px',
          height: '222px',
          aspectRatio: '39 / 74',
          transform: 'rotate(0deg)',
          pointerEvents: 'none',
          zIndex: 1,
          userSelect: 'none',
        }} />

        {/* Right back bottle — cam 2: 658×878, scaleY(-1) rotate(172.14deg) — rendered first so cam 3 sits on top */}
        <img src={CAM2} alt="" style={{
          position: 'absolute',
          right: '5vw',
          top: '0vw',
          width: 'clamp(184px, 36.8vw, 637px)',
          aspectRatio: '329 / 439',
          objectFit: 'cover',
          transform: 'rotate(0deg)',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }} />

        {/* Right front bottle — cam 3: 658×878, scaleY(-1) rotate(156.92deg) */}
        <img src={CAM3} alt="" style={{
          position: 'absolute',
          right: '2vw',
          top: '7vw',
          width: 'clamp(184px, 36.8vw, 637px)',
          aspectRatio: '329 / 439',
          objectFit: 'cover',
          transform: 'rotate(0deg)',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
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
