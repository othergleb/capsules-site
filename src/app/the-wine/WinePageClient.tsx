'use client'

import { useRef, useEffect } from 'react'
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
  { img: '/bottle-box-1.png', name: 'Amphora Aged Grenache', qty: '1 bottle · 75cl',       desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.' },
  { img: '/bottle-box-2.png', name: 'Estate Rosé',           qty: '2 bottles · 75cl each', desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.' },
  { img: '/bottle-box-3.png', name: 'Estate Olive Oil',       qty: '1 vial · 100ml',        desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.' },
  { img: '/poster-artwork.png', name: 'Illustration',         qty: '1 poster · 100 × 70cm', desc: 'A photographic print from the estate by Mehdi Amini.' },
]

// ── Mobile wine page ───────────────────────────────────────────
function WinePageMobile() {
  const CELL: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontSize: '18px',
    color: '#00006A',
    textTransform: 'uppercase',
    letterSpacing: '-0.18px',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  }

  return (
    <div style={{
      backgroundColor: '#fffff5',
      height: '100svh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      paddingBottom: '41px',
      position: 'relative',
    }}>

      {/* Large red OTHER logo – bleeds from top-left, sized in vw to stay proportional */}
      <div style={{
        position: 'absolute',
        left: '-23.15vw',
        top: '-60.3vw',
        width: '144.8vw',
        height: '144.8vw',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <img src="/figma/other-logo-red.png" alt="" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Bottles – centred, fill remaining space, aligned to bottom */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '8px',
        minHeight: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        <img
          src="/bottle-1.png"
          alt="Amphora aged Grenache"
          style={{ width: '32.3%', height: 'auto', display: 'block', flexShrink: 0 }}
        />
        <img
          src="/bottle-2.png"
          alt="Estate Rosé"
          style={{ width: '32.3%', height: 'auto', display: 'block', flexShrink: 0, marginLeft: '-5.6%' }}
        />
      </div>

      {/* Wine spec table */}
      <div style={{ margin: '0 11px', backgroundColor: '#EDFF00', flexShrink: 0, position: 'relative', zIndex: 1 }}>
        <div style={{ height: '1px', backgroundColor: '#00006A' }} />
        {DETAILS.map(([label, val]) => (
          <div key={label} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '28px',
            padding: '0 20px',
            borderBottom: '1px solid #00006A',
          }}>
            <span style={{ ...CELL, fontWeight: 300 }}>{label}</span>
            <span style={{ ...CELL, fontWeight: 400, textAlign: 'right' }}>{val}</span>
          </div>
        ))}
        <div style={{ height: '22px' }} />
      </div>

      <MobileNav bg="#ff3c00" />
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
  <div style={{ position: 'relative', width: '100%', textAlign: 'center', marginBottom: 'clamp(1.5rem, 2.5vw, 43px)' }}>
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
        paddingTop: 'clamp(calc(4rem - 35px), calc(16.5vh - 35px), calc(12rem - 35px))',
        paddingBottom: 'clamp(16px, 1.5vw, 27px)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {sectionHeading('In the Capsule', 'PRODUCT', 'PRODUCT')}
        <div style={{ width: '100%', display: 'flex', padding: '0 clamp(7px, 0.81vw, 14px)', marginTop: 'clamp(1rem, 3vh, 3rem)' }}>
          {PRODUCTS.map((item, i) => (
            <div key={item.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: i > 0 ? '-2.22px' : 0 }}>
              <div style={{
                border: '2.22px solid #00006A',
                borderRadius: 'clamp(100px, 16.44vw, 284px) clamp(100px, 16.44vw, 284px) 0 0',
                backgroundColor: 'var(--red)',
                overflow: 'visible',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 'clamp(12px, 2.03vw, 35px)',
                height: 'clamp(260px, max(calc(42vw - 25px), calc(50vh - 25px)), 695px)',
              }}>
                {i === 3 ? (
                  <div style={{ width: '75%', border: '14px solid #fffff5', display: 'block', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                ) : (
                  <img src={item.img} alt={item.name} style={{ width: '46%', height: 'auto', display: 'block' }} />
                )}
              </div>
              <div style={{
                backgroundColor: 'var(--yellow)',
                border: '2.22px solid #00006A',
                marginTop: '-2.22px',
                padding: 'clamp(14px, 1.79vw, 31px)',
                paddingBottom: 'clamp(20px, 2.5vw, 43px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'clamp(120px, 12.5vw, 216px)',
              }}>
                <div>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(13px, 1.33vw, 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0, textTransform: 'uppercase' }}>
                    {item.name}
                  </p>
                  <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(13px, 1.33vw, 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
                <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(13px, 1.33vw, 23px)', color: 'var(--blue)', letterSpacing: '-0.03em', lineHeight: 1.25, margin: 0, marginTop: i === 3 ? '2.5em' : '1.25em', textTransform: 'uppercase' }}>
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
          src="/cam 3.png"
          alt=""
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: 'auto',
            height: '180svh',
            transform: 'translate(calc(4vw - 120px), calc(-40vh - 195px)) scaleX(-1) scaleY(-1) rotate(-135.51deg)',
            transformOrigin: 'center center',
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
          aspectRatio: '857 / 482',
          borderRadius: '486.5px',
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
            borderRadius: '486.5px',
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
          aspectRatio: '857 / 482',
          borderRadius: '486.5px',
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
            borderRadius: '486.5px',
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
