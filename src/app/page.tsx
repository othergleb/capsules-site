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
    <Link href="/" style={{ width: 'min(104.1vw, calc(43dvh * 469 / 103))', alignSelf: 'center', flexShrink: 0, display: 'block' }}>
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

function BgBottleVideo({ src, rotation, width }: { src: string; rotation: string; width: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])
  return (
    <div style={{ transform: `rotate(${rotation})`, flexShrink: 0, width }}>
      <video ref={videoRef} autoPlay loop muted playsInline preload="auto"
        style={{ width: '100%', height: 'auto', display: 'block' }}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
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
  const refCode = (() => {
    const fromUrl = searchParams.get('ref')
    if (typeof window === 'undefined') return fromUrl ?? undefined
    if (fromUrl) { sessionStorage.setItem('ref', fromUrl); return fromUrl }
    return sessionStorage.getItem('ref') ?? undefined
  })()
  const srcCode = (() => {
    const fromUrl = searchParams.get('src')
    if (typeof window === 'undefined') return fromUrl ?? undefined
    if (fromUrl) { sessionStorage.setItem('src', fromUrl); return fromUrl }
    return sessionStorage.getItem('src') ?? undefined
  })()
  const yellowRef    = useRef<HTMLElement>(null)
  const [sectionH, setSectionH] = useState<string>('calc(100svh - 41px - env(safe-area-inset-bottom, 0px))')

  useEffect(() => {
    const compute = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight
      setSectionH(`${Math.floor(vh) - 41}px`)
    }
    compute()
    // Use window resize only (not visualViewport resize) so keyboard open doesn't trigger a reflow
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  const [email, setEmail]             = useState('')
  const [formStep, setFormStep]       = useState<'email' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [dismissed, setDismissed]     = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)

  async function handleShare() {
    const siteUrl = window.location.origin
    const url = inviteCode ? `${siteUrl}/?ref=${inviteCode}` : siteUrl
    const text = `Just registered for Capsule 01 by OTHER - 480 bottles of an amphora rosé grown by Berber farmers in northern Morocco. Available to purchase on 23 June. Here's my referral link: ${url}`
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && !/Windows/i.test(navigator.userAgent)) {
      try { await navigator.share({ text }) } catch { /* dismissed */ }
      setDismissed(true)
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedToClipboard(true)
        setTimeout(() => { setCopiedToClipboard(false); setDismissed(true) }, 2000)
      } catch { /* clipboard unavailable */ }
    }
  }

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStepIn(false)
    // Transition to share screen immediately — API runs in background
    setTimeout(() => setFormStep('invite'), 220)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, refCode, srcCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
  }

  useEffect(() => {
    const fadeIn = setTimeout(() => setStepIn(true), 20)
    return () => clearTimeout(fadeIn)
  }, [formStep])

  const FONT: React.CSSProperties = { fontFamily: 'Vulf Sans, sans-serif' }

  return (
    <div style={{ backgroundColor: '#FF3C00', overflowX: 'clip' }}>

      <section style={{
        backgroundColor: '#FF3C00',
        height: sectionH,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 7px)',
        position: 'relative',
        overflow: 'hidden',
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
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ ...FONT, fontWeight: 400, fontSize: '17px', letterSpacing: '0.51px', color: '#EDFF00', whiteSpace: 'nowrap' }}>
              Limited Edition Capsules
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ" style={{ width: '13.74vw', height: 'auto' }} />
            <img src={ARABIC_SVG}   alt="المغرب"   style={{ width: '12.98vw', height: 'auto' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
            <img src={MAROC_SVG} alt="MAROC" style={{ width: '34.47vw', height: 'auto' }} />
          </div>
        </div>

        <button
          onClick={() => yellowRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="scroll-arrow"
          style={{ position: 'absolute', bottom: '14px', left: 0, right: 0, margin: '0 auto', width: 'fit-content', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex' }}
          aria-label="Scroll down"
        >
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none"><path d="M1.5 1.5L11 11L20.5 1.5" stroke="#EDFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

      </section>

      <section ref={yellowRef} style={{
        backgroundColor: '#EDFF00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '41px',
        position: 'relative',
        minHeight: '1100px',
        overflow: 'clip',
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
          fontSize: '30px',
          lineHeight: '29px',
          letterSpacing: '0.5px',
          color: '#00006A',
          textAlign: 'center',
          textTransform: 'uppercase',
          width: 'calc(100% - 20px)',
          margin: '12px auto 70px',
        }}>
          Register for exclusive<br />access on 23 June
        </h1>

        {/* Form steps — directly on yellow */}
        <div style={{ width: '100%', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '330px' }}>
        {dismissed ? (

          /* Screen 3: pre-sale unlock */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto 24px' }}>
              <p style={{ ...FONT, fontWeight: 300, fontSize: '16px', lineHeight: 1.35, color: '#FF3C00' }}>
                A small portion of capsules are available for pre-order, while stocks last — get two friends to register to access the pre-sale.
              </p>
            </div>
            <div style={{ padding: '0 10px', marginTop: 'auto' }}>
              <button
                onClick={handleShare}
                style={{ display: 'block', width: '100%', height: '45px', backgroundColor: '#00006A', color: '#EDFF00', border: 'none', borderRadius: '999px', ...FONT, fontWeight: 300, fontSize: '16px', letterSpacing: '-0.48px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                {copiedToClipboard ? 'Link copied!' : 'Share again'}
              </button>
            </div>
          </div>

        ) : formStep === 'invite' ? (

          /* Screen 2: refer one friend */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto 24px' }}>
              <p style={{ ...FONT, fontWeight: 700, fontSize: '16px', lineHeight: 1.27, color: '#FF3C00', textTransform: 'uppercase' }}>
                Refer one friend for priority access
              </p>
            </div>
            <div style={{ padding: '0 10px', marginTop: 'auto' }}>
              <button
                onClick={handleShare}
                style={{ display: 'block', width: '100%', height: '45px', backgroundColor: '#00006A', color: '#EDFF00', border: 'none', borderRadius: '999px', ...FONT, fontWeight: 300, fontSize: '16px', letterSpacing: '-0.48px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                {copiedToClipboard ? 'Link copied!' : 'Share your link'}
              </button>
            </div>
          </div>

        ) : (

          /* Screen 1: email */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <p style={{ ...FONT, fontWeight: 700, fontSize: '18px', lineHeight: 1.27, letterSpacing: '0.16px', color: '#FF3C00', textAlign: 'center', width: 'calc(100% - 72px)', margin: '-32px auto 48px' }}>
              A capsule from a Berber farmed vineyard in northern Morocco, including an amphora aged grenache ros&eacute;, of which only 480 remain in existence.
            </p>

            <div style={{ padding: '0 10px 16px', marginTop: '-16px', marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
              <p style={{ ...FONT, fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.12px', color: '#FF3C00', textAlign: 'center', marginTop: '10px', marginBottom: '7px', textTransform: 'uppercase' }}>
                Inside Capsule 01 (£89)
              </p>
              <div style={{ borderTop: '0.633px solid #FF3C00' }}>
                {([
                  ['1 x Bottle',  'Amphora Aged Grenache, 2023'],
                  ['2 x Bottles', 'Moroccan Syrah Rosé'],
                  ['1 x Vial',    'Award-winning Olive Oil'],
                ] as [string, string][]).map(([qty, item]) => (
                  <div key={qty} style={{ display: 'grid', gridTemplateColumns: '38% 1fr', alignItems: 'center', padding: '2px 0', borderBottom: '0.633px solid #FF3C00' }}>
                    <span style={{ ...FONT, fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#FF3C00', letterSpacing: '-0.12px', textTransform: 'uppercase', paddingLeft: '14px', whiteSpace: 'nowrap' }}>{qty}</span>
                    <span style={{ ...FONT, fontWeight: 300, fontSize: '14px', lineHeight: '20px', color: '#FF3C00', letterSpacing: '-0.12px', textTransform: 'uppercase', textAlign: 'left' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={advanceToInvite} style={{ padding: '0 10px', marginTop: 'auto' }}>
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
        </div>


        {/* Rose Adjusted — left bottle video, pre-cropped to Figma frame */}
        <div style={{
          position: 'absolute',
          left: '-38vw',
          top: '499px',
          width: '86.5vw',
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}>
          <BgBottleVideo src="/rose-adjusted.mp4" rotation="15deg" width="100%" />
        </div>

        {/* WhiteTitled_v03 — right bottle video */}
        <div style={{
          position: 'absolute',
          left: '12vw',
          top: '627px',
          width: '125vw',
          height: '137vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}>
          <BgBottleVideo src="/WhiteTitled_v03.mp4" rotation="-10.82deg" width="118.9vw" />
        </div>


      </section>

      <MobileNav />
    </div>
  )
}

function HomeInner() {
  const searchParams                  = useSearchParams()
  const refCode = (() => {
    const fromUrl = searchParams.get('ref')
    if (typeof window === 'undefined') return fromUrl ?? undefined
    if (fromUrl) { sessionStorage.setItem('ref', fromUrl); return fromUrl }
    return sessionStorage.getItem('ref') ?? undefined
  })()
  const srcCode = (() => {
    const fromUrl = searchParams.get('src')
    if (typeof window === 'undefined') return fromUrl ?? undefined
    if (fromUrl) { sessionStorage.setItem('src', fromUrl); return fromUrl }
    return sessionStorage.getItem('src') ?? undefined
  })()
  const isMobile                      = useIsMobile()
  const isNarrow                      = useIsMobile(900)

  const [email, setEmail]             = useState('')
  const [formStep, setFormStep]       = useState<'email' | 'invite'>('email')
  const [stepIn, setStepIn]           = useState(true)
  const [inviteCode, setInviteCode]   = useState<string | null>(null)
  const [dismissed, setDismissed]     = useState(false)
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  const yellowRef                     = useRef<HTMLElement>(null)

  async function advanceToInvite(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStepIn(false)
    setTimeout(() => setFormStep('invite'), 220)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, refCode, srcCode }),
      })
      if (res.ok) {
        const data = await res.json()
        setInviteCode(data.inviteCode ?? null)
      }
    } catch { /* non-blocking */ }
  }

  useEffect(() => {
    const fadeIn = setTimeout(() => setStepIn(true), 20)
    return () => clearTimeout(fadeIn)
  }, [formStep])

  async function handleShare() {
    const siteUrl = window.location.origin
    const url = inviteCode ? `${siteUrl}/?ref=${inviteCode}` : siteUrl
    const text = `Just registered for Capsule 01 by OTHER - 480 bottles of an amphora rosé grown by Berber farmers in northern Morocco. Available to purchase on 23 June. Here's my referral link: ${url}`
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && !/Windows/i.test(navigator.userAgent)) {
      try { await navigator.share({ text }) } catch { /* dismissed */ }
      setDismissed(true)
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setCopiedToClipboard(true)
        setTimeout(() => { setCopiedToClipboard(false); setDismissed(true) }, 2000)
      } catch { /* clipboard unavailable */ }
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
        height: isNarrow ? 'auto' : '100dvh',
        overflow: 'hidden',
        position: 'relative',
        paddingTop: '0.58vw',
        paddingBottom: 'clamp(8px, 1vw, 16px)',
      }}>

        <OtherLogoVideo src={OTHER_VIDEO_6K} />

        {/* Constrain all content to the logo's visible width */}
        <div style={{
          width: 'min(100%, calc(43dvh * 469 / 103))',
          margin: '0 auto',
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.09vw',
          padding: '0 1.5%',
          marginTop: 'clamp(-30px, -5vw, -10px)',
          flex: 1,
          minHeight: 0,
        }}>
          <FarmerVideo src={FARMER_LEFT}  label="Moroccan farmers in the vineyard" />
          <FarmerVideo src={FARMER_RIGHT} label="Berber farmers working in the Atlas mountains" />
        </div>

        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '17px',
          pointerEvents: 'none',
        }}>
          <img src={STAR_SVG} alt=""
            style={{ height: 'clamp(38px, 5.25vw, 91px)', width: 'auto', aspectRatio: '1 / 1', display: 'block' }} />
        </div>

        <div style={{ marginTop: 'clamp(0.25rem, 1.5vw, 26px)', flexShrink: 0 }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1.5%',
          }}>
            <img src={TIFINAGH_SVG} alt="ⵍⵎⵖⵔⵉⴱ"
              style={{ height: 'clamp(8px, 1.48vw, 26px)', width: 'auto', aspectRatio: '171 / 34' }} />
            <img src={ARABIC_SVG} alt="المغرب"
              style={{ height: 'clamp(12px, 2.39vw, 41px)', width: 'auto', aspectRatio: '161 / 55', marginBottom: '0.5vw' }} />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            lineHeight: 0,
            padding: '0 1.5%',
          }}>
            <img src={MAROC_SVG} alt="MAROC"
              style={{ height: 'clamp(30px, 4.21vw, 73px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />

            <span style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.375rem, 1.3vw, 22px)',
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
                  height: 'clamp(18px, 3.45vw, 60px)',
                  width: 'auto',
                  aspectRatio: '114 / 113',
                  display: 'block',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />
              <img src={MAROC_SVG} alt="MAROC"
                style={{ height: 'clamp(30px, 4.21vw, 73px)', width: 'auto', aspectRatio: '431 / 99', display: 'block' }} />
            </div>
          </div>
        </div>

        </div>{/* end logo-width wrapper */}

        <button
          onClick={() => yellowRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="scroll-arrow"
          style={{ position: 'absolute', bottom: '80px', left: 0, right: 0, margin: '0 auto', width: 'fit-content', background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex' }}
          aria-label="Scroll down"
        >
          <svg width="26" height="15" viewBox="0 0 26 15" fill="none"><path d="M1.5 1.5L13 13L24.5 1.5" stroke="#EDFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

      </section>

      <section ref={yellowRef} style={{
        backgroundColor: '#EDFF00',
        borderTop: '2px solid #FF3C00',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: isNarrow ? 'auto' : '100dvh',
        justifyContent: 'center',
        boxSizing: 'border-box',
        paddingTop: 'clamp(2rem, 3vw, 52px)',
        paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(4rem, 6vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* White bottle video — right background decoration */}
        <div style={{
          position: 'absolute',
          left: '49vw',
          top: 'calc(50% - 33.6vw)',
          width: '74.1vw',
          height: '67.2vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}>
          <BgBottleVideo src="/WhiteTitled_v03.mp4" rotation="-14.55deg" width="62.9vw" />
        </div>

        {/* Rosé bottle video — left background decoration */}
        <div style={{
          position: 'absolute',
          left: '-18.5vw',
          top: '-17vw',
          width: '70vw',
          height: '82vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}>
          <BgBottleVideo src="/Rose360.mp4" rotation="-15.71deg" width="53vw" />
        </div>


        {/* Centered content wrapper — sits above decorative bottles */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', zIndex: 10, top: '10dvh' }}>

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
          fontSize: 'clamp(12px, 2.4vw, 42px)',
          fontWeight: 300,
          lineHeight: 0.88,
          letterSpacing: '0.84px',
          color: '#00006A',
          textAlign: 'center',
          marginBottom: 'clamp(1.5rem, 7vw, 120px)',
          textTransform: 'uppercase',
          maxWidth: '52%',
        }}>
          Register for exclusive<br />access on 23 June
        </h1>

        {/* Form — directly on yellow */}
        <div style={{ maxWidth: 'clamp(340px, 36vw, 622px)', width: '100%', display: 'flex', flexDirection: 'column', minHeight: 'clamp(200px, 24vw, 420px)' }}>
        {dismissed ? (

          /* Screen 3: pre-sale unlock */
          <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto clamp(0.75rem, 1.5vw, 26px)' }}>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(11px, 1.14vw, 20px)',
                lineHeight: 1.35,
                letterSpacing: '0.23px',
                color: '#FF3C00',
              }}>
                A small portion of capsules are available for pre-order, while stocks last — get two friends to register to access the pre-sale.
              </p>
            </div>
            <div style={{ padding: '0 8.5%', marginTop: 'auto' }}>
              <button
                onClick={handleShare}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'clamp(32px, 2.95vw, 51px)',
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
                }}
                onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
              >
                {copiedToClipboard ? 'Link copied!' : 'Share again'}
              </button>
            </div>
          </div>

        ) : formStep === 'invite' ? (

              /* Screen 2: refer one friend */
              <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.4s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ textAlign: 'center', maxWidth: '85%', margin: '0 auto clamp(0.75rem, 1.5vw, 26px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(11px, 1.14vw, 20px)',
                    lineHeight: 1.27,
                    letterSpacing: '0.23px',
                    color: '#FF3C00',
                    textTransform: 'uppercase',
                  }}>
                    Refer one friend for priority access
                  </p>
                </div>
                <div style={{ padding: '0 8.5%', marginTop: 'auto' }}>
                  <button
                    onClick={handleShare}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'clamp(32px, 2.95vw, 51px)',
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
                    }}
                    onMouseOver={e => { e.currentTarget.style.opacity = '0.8' }}
                    onMouseOut={e => { e.currentTarget.style.opacity = '1' }}
                  >
                    {copiedToClipboard ? 'Link copied!' : 'Share your link'}
                  </button>
                </div>
              </div>

            ) : (

              /* Screen 1: email */
              <div style={{ opacity: stepIn ? 1 : 0, transition: 'opacity 0.22s ease', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(0.75rem, 1.5vw, 26px)' }}>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(11px, 1.14vw, 20px)',
                    lineHeight: 1.27,
                    letterSpacing: '0.23px',
                    color: '#FF3C00',
                    marginBottom: '0.75em',
                    maxWidth: '83%',
                    margin: '0 auto 0.75em',
                  }}>
                    A capsule from a Berber farmed vineyard in northern Morocco, including an amphora aged grenache ros&eacute;, of which only 480 remain in existence.
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
                  <div style={{ borderTop: '1px solid #FF3C00', overflow: 'hidden' }}>
                    {([
                      ['1 x Bottle',  'Amphora Aged Grenache, 2023'],
                      ['2 x Bottles', 'Moroccan Syrah Rosé'],
                      ['1 x Vial',    'Award-winning Olive Oil'],
                    ] as [string, string][]).map(([qty, item]) => (
                      <div key={qty} style={{
                        display: 'grid',
                        gridTemplateColumns: '32% 1fr',
                        alignItems: 'center',
                        textAlign: 'left',
                        padding: '2px 8px',
                        borderBottom: '1px solid #FF3C00',
                      }}>
                        <span style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 500, fontSize: 'clamp(9px, 1.04vw, 18px)', lineHeight: 1.15, color: '#FF3C00', letterSpacing: '-0.18px', textTransform: 'uppercase', paddingLeft: '8px', paddingRight: '16px', whiteSpace: 'nowrap' }}>{qty}</span>
                        <span style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(9px, 1.04vw, 18px)', lineHeight: 1.15, color: '#FF3C00', letterSpacing: '-0.18px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ flex: 1 }} />
                <form onSubmit={advanceToInvite} style={{ padding: '0 8.5%' }}>
                  <div style={{
                    border: '1px solid #00006A',
                    height: 'clamp(32px, 2.95vw, 51px)',
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
                      height: 'clamp(32px, 2.95vw, 51px)',
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
                <div style={{ flex: 3 }} />
              </div>
        )}
        </div>
        </div>{/* end centered content wrapper */}

        {/* Diamonds — top right (Figma: x=1342, y=1235, frame=1748px, yellow top=1112) */}
        <img
          src="/Group 47.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '20.2vw',
            top: '7vw',
            width: 'clamp(70px, 8vw, 140px)',
            height: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 2,
          }}
        />

        {/* Diamonds — bottom left */}
        <img
          src="/Group 47.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '27vw',
            top: 'calc(80% - 4vw + 50px)',
            width: 'clamp(70px, 8vw, 140px)',
            height: 'auto',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 4,
          }}
        />


        {/* Contact info — in flow, centred below form */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(9px, 0.8vw, 14px)',
          letterSpacing: '0.42px',
          textTransform: 'uppercase',
          color: '#000',
          marginTop: 'calc(clamp(1.5rem, 3vw, 48px) + 50px + 10dvh)',
          marginBottom: 0,
          whiteSpace: 'nowrap',
          position: 'relative',
          zIndex: 10,
        }}>
          Contact:{' '}
          <a href="mailto:info@otherwine.co.uk" style={{ color: 'inherit', textDecoration: 'underline' }}>
            info@otherwine.co.uk
          </a>
        </p>

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
