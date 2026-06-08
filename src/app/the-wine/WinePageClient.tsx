'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const DETAILS = [
  ['Producer', 'Domaine de la Zouina'],
  ['Region',   'Meknes, Morocco'],
  ['Grape',    'Grenache Gris'],
  ['Vintage',  '2023'],
  ['Method',   'Amphora aged'],
  ['Format',   '75cl · natural cork'],
]

const PRODUCTS = [
  { img: '/WhiteFront 1.png', name: 'Amphora Aged Grenache', qty: '1 bottle · 75cl',       desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.' },
  { img: '/RoseFront 1.png', name: 'Estate Rosé',           qty: '2 bottles · 75cl each', desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.' },
  { img: '/OilTilted2 1.png', name: 'Estate Olive Oil', qty: '1 vial · 60ml', desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.' },
  { img: '/poster-overlay.svg', name: 'Illustration',         qty: '1 poster · 35 × 20cm', desc: 'A photographic print from the estate by Mehdi Amini.' },
]

// ── Mobile wine page ───────────────────────────────────────────
function WinePageMobile() {
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

  const TEXT: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontSize: '12px',
    color: '#00006A',
    textTransform: 'uppercase',
    letterSpacing: '-0.36px',
    lineHeight: '14px',
    margin: 0,
  }

  const ARCH: React.CSSProperties = {
    border: '1px solid #00006A',
    borderRadius: '9999px 9999px 0 0',
    height: '66vw',
    backgroundColor: '#FF3C00',
    overflow: 'visible',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const YELLOW: React.CSSProperties = {
    backgroundColor: '#EDFF00',
    border: '1px solid #00006A',
    marginTop: '-1px',
    padding: '10px 8px 8px',
    minHeight: 'calc(29vw - 28px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }

  const rows = [[0, 1], [2, 3]] as const

  return (
    <div style={{ backgroundColor: '#FF3C00', minHeight: '100svh', display: 'flex', flexDirection: 'column', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 7px)' }}>

      {/* OTHER animated logo — same size as homepage mobile */}
      <Link href="/" style={{ width: 'min(104.1vw, calc(38dvh * 469 / 103))', alignSelf: 'center', flexShrink: 0, display: 'block' }}>
        {showGif
          ? <img src="/other-logo.gif" alt="OTHER" style={{ width: '100%', display: 'block' }} />
          : <video ref={videoRef} autoPlay loop muted playsInline preload="auto" style={{ width: '100%', display: 'block' }}>
              <source src="/other-logo-cropped.mp4" type="video/mp4" />
            </video>
        }
      </Link>

      {/* "In the box" heading */}
      <h2 style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 900,
        fontSize: '39.6px',
        color: 'transparent',
        WebkitTextStrokeWidth: '0.75px',
        WebkitTextStrokeColor: '#00006A',
        letterSpacing: '1.2px',
        textAlign: 'center',
        margin: '0 0 14px',
      }}>
        In the box
      </h2>

      {/* 2×2 product grid */}
      <div style={{ padding: '0 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {rows.map((pair, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex' }}>
            {pair.map((i, colIdx) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: colIdx > 0 ? '-1px' : 0 }}>
                {/* Arch */}
                <div style={ARCH}>
                  {(i === 0 || i === 1) && (
                    <img
                      src={PRODUCTS[i].img}
                      alt={PRODUCTS[i].name}
                      style={{ width: '41.4%', height: 'auto', display: 'block', pointerEvents: 'none' }}
                    />
                  )}
                  {i === 2 && (
                    <img
                      src={PRODUCTS[2].img}
                      alt={PRODUCTS[2].name}
                      style={{ width: '33.35%', height: 'auto', display: 'block', pointerEvents: 'none', alignSelf: 'flex-end', marginBottom: '50px' }}
                    />
                  )}
                  {i === 3 && (
                    <div style={{ width: '65%', border: '3px solid #fffff5', overflow: 'hidden' }}>
                      <img src={PRODUCTS[3].img} alt={PRODUCTS[3].name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  )}
                </div>
                {/* Yellow info card */}
                <div style={YELLOW}>
                  <div>
                    <p style={{ ...TEXT, fontWeight: 400 }}>{PRODUCTS[i].name}</p>
                    <p style={{ ...TEXT, fontWeight: 300, marginTop: '2px' }}>{PRODUCTS[i].desc}</p>
                  </div>
                  <p style={{ ...TEXT, fontWeight: 300 }}>{PRODUCTS[i].qty}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ height: 'calc(41px + env(safe-area-inset-bottom, 0px) + 24px)', flexShrink: 0 }} />
      <MobileNav bg="#fffff5" />
    </div>
  )
}

// ── Desktop wine page ──────────────────────────────────────────
const marqueeStrip = (bg: string, word: string) => (
  <div style={{
    backgroundColor: bg,
    height: 'clamp(28px, 2.6vw, 45px)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTop: '2.22px solid #EDFF00',
    borderBottom: '2.22px solid #EDFF00',
  }}>
    {Array.from({ length: 10 }, (_, i) => (
      <span key={i} style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 300,
        fontSize: 'clamp(12px, 1.45vw, 25px)',
        color: '#EDFF00',
        textTransform: 'uppercase',
        letterSpacing: '-0.75px',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {word}
      </span>
    ))}
  </div>
)

const sideLabel: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: 'clamp(14px, 1.45vw, 25px)',
  color: 'var(--yellow)',
  textTransform: 'uppercase',
  letterSpacing: '-0.03em',
  lineHeight: 1,
}

const sectionHeading = (text: string, leftLabel: string, rightLabel: string) => (
  <div style={{ position: 'relative', width: '100%', textAlign: 'center', marginBottom: 'clamp(12px, 1.5svh, 43px)' }}>
    <span style={{ ...sideLabel, left: 'clamp(1rem, 3.47vw, 60px)' }}>{leftLabel}</span>
    <h2 className="capsules-wordmark" style={{ fontSize: 'clamp(3.5rem, 5.53vw, 95px)', fontWeight: 900, letterSpacing: '0.02em' }}>
      {text}
    </h2>
    <span style={{ ...sideLabel, right: 'clamp(1rem, 3.47vw, 60px)' }}>{rightLabel}</span>
  </div>
)

export default function WinePageClient() {
  const isMobile = useIsMobile()
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v1 = video1Ref.current
    const v2 = video2Ref.current
    if (v1) { v1.muted = true; v1.play().catch(() => {}) }
    if (v2) { v2.muted = true; v2.play().catch(() => {}) }
  }, [])

  if (isMobile) return <WinePageMobile />

  return (
    <div style={{ backgroundColor: 'var(--red)', overflowX: 'hidden' }}>
      <Nav color="#00006A" />

      {/* In the Capsule — 4 arch product columns */}
      <section style={{
        backgroundColor: 'var(--red)',
        position: 'relative',
        paddingTop: 'clamp(50px, 9svh, 110px)',
        paddingBottom: 'clamp(10px, 2svh, 27px)',
        height: '100svh',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {sectionHeading('In the Capsule', 'PRODUCT', 'PRODUCT')}
        <div style={{ width: '100%', display: 'flex', padding: '0 clamp(7px, 0.81vw, 14px)', marginTop: 'clamp(8px, 1.5svh, 32px)', flex: 1, minHeight: 0 }}>
          {PRODUCTS.map((item, i) => (
            <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: i > 0 ? '-2.22px' : 0, minHeight: 0 }}>
              <div style={{
                position: 'relative',
                borderRadius: 'clamp(100px, 16.44vw, 284px) clamp(100px, 16.44vw, 284px) 0 0',
                backgroundColor: 'var(--red)',
                overflow: 'visible',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 'clamp(12px, 2.03vw, 35px)',
                flex: 1,
                minHeight: 0,
              }}>
                <div style={{ position: 'absolute', inset: 0, border: '2.22px solid #00006A', borderRadius: 'clamp(100px, 16.44vw, 284px) clamp(100px, 16.44vw, 284px) 0 0', pointerEvents: 'none', zIndex: 10 }} />
                {i === 3 ? (
                  <div style={{
                    position: 'absolute',
                    top: '28%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    maxHeight: '65%',
                    aspectRatio: '5 / 8',
                    backgroundColor: 'white',
                  }}>
                    <div style={{ position: 'absolute', inset: '1.6%', overflow: 'hidden' }}>
                      <img src="/illustration-bg.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, right: '50%', bottom: '50%' }}>
                        <img src="/illustration-vector-a.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: '50%', right: 0, top: '50%', transform: 'rotate(180deg)' }}>
                        <img src="/illustration-vector-b.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                      </div>
                      <div style={{ position: 'absolute', top: 0, left: '50%', right: 0, bottom: '50%', transform: 'rotate(180deg)' }}>
                        <img src="/illustration-vector-c.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: '50%', top: '50%' }}>
                        <img src="/illustration-vector-a.svg" alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
                      </div>
                      <img src="/poster-overlay.svg" alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                    </div>
                  </div>
                ) : i === 2 ? (
                  <img src={item.img} alt={item.name} style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 'calc(clamp(12px, 2.03vw, 35px) - 22svh + 20px)',
                    transform: 'translateX(-50%) rotate(0.19deg) scale(2)',
                    width: '80vw',
                    height: 'auto',
                    display: 'block',
                    pointerEvents: 'none',
                    transformOrigin: 'center bottom',
                  }} />
                ) : (
                  <img src={item.img} alt={item.name} style={{ width: i === 0 ? '61%' : '60%', height: 'auto', display: 'block', marginBottom: i === 0 ? '-5.2svh' : '-1.1svh' }} />
                )}
              </div>
              <div style={{
                backgroundColor: 'var(--yellow)',
                border: '2.22px solid #00006A',
                marginTop: '-2.22px',
                padding: 'clamp(10px, 1.3svh, 31px)',
                paddingBottom: 'clamp(8px, 1.1svh, 26px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'clamp(90px, 16svh, 196px)',
                flexShrink: 0,
                overflow: 'hidden',
              }}>
                <div>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(10px, min(1.33vw, 1.5svh), 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0, textTransform: 'uppercase' }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(10px, min(1.33vw, 1.5svh), 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
                <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(10px, min(1.33vw, 1.5svh), 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0, marginTop: i === 3 ? '2.5em' : '1.25em', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {marqueeStrip('var(--blue)', 'THE WINE')}

      {/* Cream section: cam 3 bottle + vial + wine detail table */}
      <section style={{
        backgroundColor: 'var(--cream)',
        position: 'relative',
        height: '100svh',
        overflow: 'hidden',
      }}>
        {/* cam 3 — large rotated bottle */}
        <img
          src="/WhiteBottomTiltes 1.png"
          alt=""
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: '90svh',
            pointerEvents: 'none',
          }}
        />


        {/* Wine detail table card */}
        <div style={{
          position: 'absolute',
          left: '55.67vw',
          top: '45%',
          transform: 'translateY(-50%)',
          width: 'clamp(220px, 30.03vw, 520px)',
          backgroundColor: 'var(--yellow)',
          paddingTop: 'clamp(10px, 1.27vw, 22px)',
          paddingBottom: 'clamp(12px, 1.79vw, 31px)',
        }}>
          <div style={{ margin: '0 clamp(10px, 1.16vw, 20px)' }}>
            <div style={{ height: '1.5px', backgroundColor: 'var(--blue)' }} />
            {DETAILS.map(([label, val]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 'clamp(26px, 1.79vw, 31px)',
                padding: '0 clamp(8px, 1.1vw, 19px)',
                borderBottom: '1.5px solid var(--blue)',
              }}>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(11px, 1.16vw, 20px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.2px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(11px, 1.16vw, 20px)',
                  color: 'var(--blue)',
                  textAlign: 'right',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.2px',
                  lineHeight: 1,
                }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {marqueeStrip('var(--blue)', 'ORIGIN')}

      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: '100%',
          height: 'clamp(300px, calc(100svh - 110px), 820px)',
          borderRadius: '9999px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            ref={video1Ref}
            src="/CapsulesPage_OTHER_VIDEO_04_web.mp4"
            autoPlay loop muted playsInline preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--red)' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset',
            pointerEvents: 'none',
          }} />
        </div>
        {sectionHeading('Meknes, Morocco', 'ORIGIN', 'ORIGIN')}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare in this latitude.',
            'In 2023, a Berber tribe and a team of French winemakers set out to make something new from something ancient. Grenache Gris — a pale, copper-skinned grape — fermented and aged in clay amphorae, the same vessels used across the Mediterranean for thousands of years.',
          ].map((t, i) => (
            <p key={i} style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(12px, 1.33vw, 23px)',
              color: 'var(--cream)',
              lineHeight: 1.29,
              letterSpacing: '0.23px',
            }}>{t}</p>
          ))}
        </div>
      </section>

      {marqueeStrip('var(--blue)', 'METHOD')}

      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: '100%',
          height: 'clamp(300px, calc(100svh - 110px), 820px)',
          borderRadius: '9999px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            ref={video2Ref}
            src="/CapsulesPage_OTHER_VIDEO_05_web.mp4"
            autoPlay loop muted playsInline preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--red)' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset',
            pointerEvents: 'none',
          }} />
        </div>
        {sectionHeading('Amphora aged', 'method', 'method')}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.',
            'The result has a texture and minerality that glass and steel cannot replicate.\nNo fining. No filtration. 480 bottles filled by hand.',
          ].map((t, i) => (
            <p key={i} style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(12px, 1.33vw, 23px)',
              color: 'var(--cream)',
              lineHeight: 1.29,
              letterSpacing: '0.23px',
            }}>{t}</p>
          ))}
        </div>
      </section>
    </div>
  )
}
