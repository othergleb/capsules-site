'use client'

import { useRef, useEffect, useState } from 'react'
import MobileNav from '@/components/MobileNav'
import Nav from '@/components/Nav'
import { useIsMobile } from '@/hooks/useIsMobile'

// ── Animated yellow-on-red logo ────────────────────────────────
function OtherLogoVideo() {
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
    <div style={{ width: '100%', flexShrink: 0 }}>
      {showGif
        ? <img src="/other-logo.gif" alt="OTHER" style={{ width: '100%', display: 'block' }} />
        : <video ref={videoRef} autoPlay loop muted playsInline preload="auto" style={{ width: '100%', display: 'block' }}>
            <source src="/other-logo-cropped.mp4" type="video/mp4" />
          </video>
      }
    </div>
  )
}

// ── Section strip ──────────────────────────────────────────────
function Strip({ label }: { label: string }) {
  const text = Array.from({ length: 6 }, () => label).join('          ')
  return (
    <div style={{
      backgroundColor: '#00006A',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid #EDFF00',
      borderBottom: '1px solid #EDFF00',
      overflow: 'hidden',
    }}>
      <p style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 300,
        fontSize: '14px',
        color: '#EDFF00',
        textTransform: 'uppercase',
        letterSpacing: '-0.42px',
        lineHeight: '20px',
        whiteSpace: 'pre',
        margin: 0,
        textAlign: 'center',
        fontFeatureSettings: '"cv10" 1, "ss03" 1, "ss05" 1, "case" 1, "ordn" 1, "dlig" 1',
      }}>
        {text}
      </p>
    </div>
  )
}

const BOX_ITEMS = [
  {
    img: '/bottle-box-1.png',
    name: 'Amphora Aged Grenache',
    desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
    qty: '1 bottle · 75cl',
    artwork: false,
  },
  {
    img: '/bottle-box-2.png',
    name: 'Estate Rosé',
    desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.',
    qty: '2 bottles · 75cl each',
    artwork: false,
  },
  {
    img: '/bottle-box-3.png',
    name: 'Estate Olive Oil',
    desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.',
    qty: '1 vial · 100ml',
    artwork: false,
  },
  {
    img: '/poster-artwork.png',
    name: 'Illustrator Name',
    desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
    qty: '1 poster · 100 x 70 cm',
    artwork: true,
  },
]

const WINE_DETAILS = [
  ['Producer', 'Domaine de la Zouina'],
  ['Region',   'Meknes, Morocco'],
  ['Grape',    'Grenache Gris'],
  ['Vintage',  '2023'],
  ['Method',   'Amphora aged'],
  ['Format',   '75cl · natural cork'],
]

// ── Mobile page ────────────────────────────────────────────────
function OriginMethodBoxMobile() {
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video1Ref.current) { video1Ref.current.muted = true; video1Ref.current.play().catch(() => {}) }
    if (video2Ref.current) { video2Ref.current.muted = true; video2Ref.current.play().catch(() => {}) }
  }, [])

  const BODY: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 400,
    fontSize: '16.5px',
    color: '#fffff5',
    lineHeight: '18px',
    letterSpacing: '0.165px',
    margin: 0,
  }

  const HEADING: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 900,
    fontSize: '32px',
    color: 'transparent',
    WebkitTextStrokeWidth: '0.75px',
    WebkitTextStrokeColor: '#00006A',
    letterSpacing: '1.28px',
    textAlign: 'center',
    margin: '25px 0 18px',
  }

  const VIDEO_OVAL: React.CSSProperties = {
    width: 'calc(100% - 22px)',
    margin: '0 11px',
    aspectRatio: '371 / 209',
    borderRadius: '486.5px',
    overflow: 'hidden',
    border: '1px solid #EDFF00',
    position: 'relative',
    marginTop: '-1px',
  }

  const ROW_STYLE: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontSize: '16px',
    color: '#00006A',
    textTransform: 'uppercase',
    letterSpacing: '-0.16px',
    lineHeight: '28px',
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  return (
    <div style={{ backgroundColor: '#FF3C00', paddingBottom: 'calc(41px + env(safe-area-inset-bottom, 0px))' }}>

      {/* ── Cream hero section ── */}
      <section style={{
        backgroundColor: '#fffff5',
        position: 'relative',
        height: 'calc(100svh - 41px - env(safe-area-inset-bottom, 0px))',
        overflow: 'hidden',
      }}>
        {/* Red OTHER logo — large, bleeds top-left */}
        <div style={{ position: 'absolute', left: '-23.15vw', top: '-60.3vw', width: '144.8vw', height: '144.8vw', pointerEvents: 'none', zIndex: 0 }}>
          <img src="/figma/other-logo-red.png" alt="" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Cam 3 bottle — flipped vertically, rotated */}
        <div style={{
          position: 'absolute',
          left: 'calc(-3.05vw - 30px)',
          top: '9px',
          width: '107.6vw',
          height: '141vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ transform: 'rotate(25deg)', flexShrink: 0 }}>
            <img
              src="/cam 3.png"
              alt=""
              style={{ width: '103.2vw', height: '137.7vw', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Wine details table */}
        <div style={{
          position: 'absolute',
          left: '11px',
          right: '11px',
          bottom: '0',
          backgroundColor: '#EDFF00',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}>
          {WINE_DETAILS.map(([label, val], i) => (
            <div key={label} style={{
              display: 'grid',
              gridTemplateColumns: '130px 1fr',
              borderTop: i === 0 ? '1px solid #00006A' : 'none',
              borderBottom: '1px solid #00006A',
              padding: '0 20px',
              height: '28px',
              alignItems: 'center',
            }}>
              <span style={{ ...ROW_STYLE, fontWeight: 300 }}>{label}</span>
              <span style={{ ...ROW_STYLE, fontWeight: 400 }}>{val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORIGIN ── */}
      <Strip label="ORIGIN" />

      <section style={{ backgroundColor: '#FF3C00', paddingBottom: '32px' }}>
        <div style={VIDEO_OVAL}>
          <video ref={video1Ref} src="/CapsulesPage_OTHER_VIDEO_04_web.mp4" autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>

        <h2 style={HEADING}>Meknes, Morocco</h2>

        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={BODY}>Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare in this latitude.</p>
          <p style={BODY}>In 2023, a Berber tribe and a team of French winemakers set out to make something new from something ancient. Grenache Gris — a pale, copper-skinned grape — fermented and aged in clay amphorae, the same vessels used across the Mediterranean for thousands of years.</p>
        </div>
      </section>

      {/* ── METHOD ── */}
      <Strip label="METHOD" />

      <section style={{ backgroundColor: '#FF3C00', paddingBottom: '32px' }}>
        <div style={VIDEO_OVAL}>
          <video ref={video2Ref} src="/CapsulesPage_OTHER_VIDEO_05_web.mp4" autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>

        <h2 style={HEADING}>Amphora aged</h2>

        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={BODY}>The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.</p>
          <p style={BODY}>The result has a texture and minerality that glass and steel cannot replicate. No fining. No filtration. 480 bottles filled by hand.</p>
        </div>
      </section>

      <MobileNav bg="#FF3C00" />
    </div>
  )
}

// ── Desktop page ───────────────────────────────────────────────
function OriginMethodBoxDesktop() {
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video1Ref.current) { video1Ref.current.muted = true; video1Ref.current.play().catch(() => {}) }
    if (video2Ref.current) { video2Ref.current.muted = true; video2Ref.current.play().catch(() => {}) }
  }, [])

  function DesktopStrip({ label, bg }: { label: string; bg: string }) {
    return (
      <div style={{
        backgroundColor: bg,
        height: 'clamp(28px, 2.6vw, 45px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTop: '2.22px solid #EDFF00',
        borderBottom: '2.22px solid #EDFF00',
        overflow: 'hidden',
      }}>
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.45vw, 25px)',
            color: '#EDFF00',
            textTransform: 'uppercase',
            letterSpacing: '-0.75px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {label}
          </span>
        ))}
      </div>
    )
  }

  const BODY: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 300,
    fontSize: 'clamp(0.8rem, 1vw, 17px)',
    color: 'var(--cream)',
    lineHeight: 1.65,
    margin: 0,
  }

  const videoOvalStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '857 / 482',
    borderRadius: '486.5px',
    overflow: 'hidden',
    border: '2.22px solid #EDFF00',
    position: 'relative',
    marginTop: '-2.22px',
    marginBottom: 'clamp(2rem, 3.5vw, 60px)',
  }

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(2.5rem, 5.53vw, 95px)',
    color: 'transparent',
    WebkitTextStroke: '2px var(--cream)',
    letterSpacing: '0.02em',
    textAlign: 'center',
    margin: '0 0 clamp(1rem, 2vw, 32px)',
  }

  return (
    <div style={{ backgroundColor: 'var(--red)' }}>
      <Nav />

      <DesktopStrip label="ORIGIN" bg="var(--red)" />

      <section style={{ backgroundColor: 'var(--red)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 'clamp(2rem, 5vw, 86px)' }}>
        <div style={videoOvalStyle}>
          <video ref={video1Ref} src="/CapsulesPage_OTHER_VIDEO_04_web.mp4" autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>
        <h2 style={headingStyle}>Meknes, Morocco</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px', padding: '0 20px', width: '100%' }}>
          {[
            'Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare in this latitude.',
            'In 2023, a Berber tribe and a team of French winemakers set out to make something new from something ancient. Grenache Gris — a pale, copper-skinned grape — fermented and aged in clay amphorae, the same vessels used across the Mediterranean for thousands of years.',
          ].map((t, i) => <p key={i} style={BODY}>{t}</p>)}
        </div>
      </section>

      <DesktopStrip label="METHOD" bg="var(--blue)" />

      <section style={{ backgroundColor: 'var(--red)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 'clamp(2rem, 5vw, 86px)' }}>
        <div style={videoOvalStyle}>
          <video ref={video2Ref} src="/CapsulesPage_OTHER_VIDEO_05_web.mp4" autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>
        <h2 style={headingStyle}>Amphora aged</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px', padding: '0 20px', width: '100%' }}>
          {[
            'The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.',
            'The result has a texture and minerality that glass and steel cannot replicate.\nNo fining. No filtration. 480 bottles filled by hand.',
          ].map((t, i) => <p key={i} style={BODY}>{t}</p>)}
        </div>
      </section>

      <DesktopStrip label="BOX" bg="var(--blue)" />

      <section style={{ backgroundColor: 'var(--red)', paddingTop: 'clamp(1.5rem, 3vw, 52px)', paddingBottom: 'clamp(2rem, 5vw, 86px)' }}>
        <h2 style={{ ...headingStyle, margin: '0 0 clamp(1rem, 2vw, 32px)' }}>In the Box</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', padding: '0 9px' }}>
          {BOX_ITEMS.map((item, i) => (
            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', marginLeft: i % 2 !== 0 ? '-2.22px' : 0 }}>
              <div style={{
                border: '2.22px solid #00006A',
                borderRadius: 'clamp(60px, 20vw, 140px) clamp(60px, 20vw, 140px) 0 0',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: '12px',
                aspectRatio: '1 / 1.2',
                backgroundColor: 'var(--red)',
              }}>
                <img src={item.img} alt={item.name} style={{ width: '50%', height: 'auto', display: 'block' }} />
              </div>
              <div style={{
                backgroundColor: '#EDFF00',
                border: '2.22px solid #00006A',
                marginTop: '-2.22px',
                padding: '12px',
                minHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: '11px', color: '#00006A', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.3, margin: '0 0 4px' }}>{item.name}</p>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '11px', color: '#00006A', letterSpacing: '-0.02em', lineHeight: 1.3, margin: 0 }}>{item.desc}</p>
                </div>
                <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: '11px', color: '#00006A', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.3, margin: '6px 0 0' }}>{item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Root ───────────────────────────────────────────────────────
export default function OriginMethodBoxPage() {
  const isMobile = useIsMobile()
  return isMobile ? <OriginMethodBoxMobile /> : <OriginMethodBoxDesktop />
}
