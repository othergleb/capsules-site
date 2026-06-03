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
    fontSize: '16px',
    color: '#fffff5',
    lineHeight: '18px',
    letterSpacing: '0.16px',
    margin: 0,
  }

  const HEADING: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 900,
    fontSize: '30px',
    color: 'transparent',
    WebkitTextStrokeWidth: '0.75px',
    WebkitTextStrokeColor: '#00006A',
    letterSpacing: '1.2px',
    textAlign: 'center',
    margin: '25px 0 18px',
  }

  const VIDEO_OVAL: React.CSSProperties = {
    width: '100%',
    aspectRatio: '393 / 221',
    borderRadius: '486.5px',
    overflow: 'hidden',
    border: '1px solid #EDFF00',
    position: 'relative',
    marginTop: '-1px',
  }

  const CAPTION_NAME: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    color: '#00006A',
    textTransform: 'uppercase',
    letterSpacing: '-0.36px',
    lineHeight: '14px',
    margin: '0 0 4px',
  }

  const CAPTION_DESC: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 300,
    fontSize: '12px',
    color: '#00006A',
    textTransform: 'uppercase',
    letterSpacing: '-0.36px',
    lineHeight: '14px',
    margin: 0,
  }

  return (
    <div style={{ backgroundColor: '#FF3C00', paddingBottom: '41px' }}>

      <OtherLogoVideo />

      {/* ── ORIGIN ── */}
      <Strip label="ORIGIN" />

      <section style={{ backgroundColor: '#FF3C00', paddingBottom: '32px' }}>
        <div style={VIDEO_OVAL}>
          <video ref={video1Ref} src="/farmer-right.mp4" autoPlay loop muted playsInline
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
          <video ref={video2Ref} src="/farmer-left.mp4" autoPlay loop muted playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>

        <h2 style={HEADING}>Amphora aged</h2>

        <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={BODY}>The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.</p>
          <p style={BODY}>The result has a texture and minerality that glass and steel cannot replicate. No fining. No filtration. 480 bottles filled by hand.</p>
        </div>
      </section>

      {/* ── BOX ── */}
      <Strip label="BOX" />

      <section style={{ backgroundColor: '#FF3C00', paddingTop: '13px', paddingBottom: '32px' }}>
        {[BOX_ITEMS.slice(0, 2), BOX_ITEMS.slice(2, 4)].map((rowItems, rowIdx) => (
          <div key={rowIdx} style={{ marginTop: rowIdx > 0 ? '9px' : 0, padding: '0 9px' }}>
            {/* Card frames row — separate grid so heights lock across columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {rowItems.map((item, colIdx) => (
                <div key={item.name} style={{
                  borderTop: '1px solid #00006A',
                  borderLeft: '1px solid #00006A',
                  borderRight: '1px solid #00006A',
                  borderBottom: 'none',
                  borderRadius: '284px 284px 0 0',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: item.artwork ? 'center' : 'flex-end',
                  paddingBottom: item.artwork ? '0' : '10px',
                  aspectRatio: '185 / 259',
                  backgroundColor: '#FF3C00',
                  marginLeft: colIdx > 0 ? '-1px' : 0,
                }}>
                  {item.artwork ? (
                    <div style={{
                      border: '1px solid #fffff5',
                      width: '65%',
                      aspectRatio: '121 / 156',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}>
                      <img src={item.img} alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <img src={item.img} alt={item.name} style={{ width: '41%', height: 'auto', display: 'block' }} />
                  )}
                </div>
              ))}
            </div>
            {/* Caption row — separate grid, always bottom-aligned with cards above */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {rowItems.map((item, colIdx) => (
                <div key={item.name} style={{
                  backgroundColor: '#EDFF00',
                  border: '1px solid #00006A',
                  marginLeft: colIdx > 0 ? '-1px' : 0,
                  padding: '8px 8px 10px',
                  aspectRatio: '185 / 113',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <p style={CAPTION_NAME}>{item.name}</p>
                    <p style={CAPTION_DESC}>{item.desc}</p>
                  </div>
                  <p style={{ ...CAPTION_DESC, textTransform: 'uppercase' }}>{item.qty}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <MobileNav />
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
          <video ref={video1Ref} src="/farmer-right.mp4" autoPlay loop muted playsInline
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
          <video ref={video2Ref} src="/farmer-left.mp4" autoPlay loop muted playsInline
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
