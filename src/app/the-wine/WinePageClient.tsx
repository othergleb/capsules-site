'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const DETAILS = [
  ['Producer', 'Domaine de la Zouina'],
  ['Region', 'Meknes, Morocco'],
  ['Grape', 'Grenache Gris'],
  ['Vintage', '2023'],
  ['Method', 'Amphora aged'],
  ['Format', '75cl · natural cork'],
]

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
    {Array.from({ length: 12 }, (_, i) => (
      <span key={i} style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 300,
        fontSize: 'clamp(12px, 1.45vw, 25px)',
        color: '#EDFF00',
        textTransform: 'uppercase',
        letterSpacing: '-0.75px',
        fontFeatureSettings: "'case' on, 'dlig' on, 'ss03' on, 'ss05' on, 'cv10' on",
        lineHeight: 1,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {word}
      </span>
    ))}
  </div>
)

const sideLabel = {
  position: 'absolute' as const,
  top: '50%',
  transform: 'translateY(-50%)',
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: 'clamp(10px, 1.45vw, 25px)',
  color: 'var(--yellow)',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.03em',
  lineHeight: 1,
}

const sectionHeading = (text: string, leftLabel: string, rightLabel: string) => (
  <div style={{
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    marginBottom: 'clamp(1.5rem, 2.5vw, 43px)',
  }}>
    <span style={{ ...sideLabel, left: 'clamp(1rem, 3.47vw, 60px)' }}>{leftLabel}</span>
    <h2 className="capsules-wordmark" style={{
      fontSize: 'clamp(2.5rem, 5.53vw, 95px)',
      fontWeight: 900,
      letterSpacing: '0.02em',
    }}>
      {text}
    </h2>
    <span style={{ ...sideLabel, right: 'clamp(1rem, 3.47vw, 60px)' }}>{rightLabel}</span>
  </div>
)

// ── Mobile product data ────────────────────────────────────────
const PRODUCTS = [
  {
    name: 'Amphora Aged Grenache',
    img: '/bottle-box-1.png',
    details: [
      ['Producer', 'Domaine de la Zouina'],
      ['Region',   'Meknes, Morocco'],
      ['Grape',    'Grenache Gris'],
      ['Vintage',  '2023'],
      ['Method',   'Amphora aged'],
      ['Format',   '75cl · natural cork'],
    ],
  },
  {
    name: 'Estate Rosé',
    img: '/bottle-box-2.png',
    details: [
      ['Producer', 'Domaine de la Zouina'],
      ['Region',   'Meknes, Morocco'],
      ['Grape',    'Grenache Gris'],
      ['Vintage',  '2023'],
      ['Method',   'Stainless steel'],
      ['Format',   '75cl · natural cork'],
    ],
  },
  {
    name: 'Estate Olive Oil',
    img: '/bottle-box-3.png',
    details: [
      ['Producer', 'Domaine de la Zouina'],
      ['Region',   'Meknes, Morocco'],
      ['Type',     'Cold-pressed'],
      ['Harvest',  '2023'],
      ['Format',   '100ml vial'],
    ],
  },
]

// ── Mobile wine page ───────────────────────────────────────────
function WinePageMobile() {
  const [current, setCurrent] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const product = PRODUCTS[current]

  function prev() { setCurrent(c => (c - 1 + PRODUCTS.length) % PRODUCTS.length) }
  function next() { setCurrent(c => (c + 1) % PRODUCTS.length) }

  function onTouchStart(e: React.TouchEvent) { setTouchStart(e.touches[0].clientX) }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    setTouchStart(null)
  }

  const TH: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300,
    fontSize: '13px', color: '#00006A', textTransform: 'uppercase',
    letterSpacing: '-0.2px', lineHeight: 1,
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)', minHeight: '100dvh', paddingBottom: '41px' }}>

      {/* Logo header */}
      <Link href="/" style={{ display: 'block', padding: '20px 16px 16px', textAlign: 'center' }}>
        <img src="/figma/other-logo-yellow.png" alt="OTHER" style={{ height: '44px', width: 'auto' }} />
      </Link>

      {/* Carousel */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ padding: '0 24px', userSelect: 'none' }}
      >
        {/* Product image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '340px', padding: '0 32px' }}>
          <img
            src={product.img}
            alt={product.name}
            style={{ maxHeight: '340px', width: 'auto', maxWidth: '100%', display: 'block' }}
          />
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '16px 0' }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{ width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: i === current ? '#00006A' : 'rgba(0,0,106,0.2)', padding: 0 }}
            />
          ))}
        </div>

        {/* Spec table */}
        <div style={{ backgroundColor: '#EDFF00', marginBottom: '16px' }}>
          <div style={{ height: '1.5px', backgroundColor: '#00006A', margin: '0 16px' }} />
          {product.details.map(([label, val]) => (
            <div key={label} style={{ margin: '0 16px', borderBottom: '1.5px solid #00006A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                <span style={{ ...TH, fontWeight: 300 }}>{label}</span>
                <span style={{ ...TH, fontWeight: 400 }}>{val}</span>
              </div>
            </div>
          ))}
          <div style={{ height: '24px' }} />
          <div style={{ height: '1.5px', backgroundColor: '#00006A', margin: '0 16px' }} />
        </div>
      </div>

      <MobileNav />
    </div>
  )
}

export default function WinePageClient() {
  const isMobile = useIsMobile()
  const [soundOn, setSoundOn] = useState(false)
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    video1Ref.current?.play().catch(() => {})
    video2Ref.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    if (video1Ref.current) video1Ref.current.muted = !soundOn
    if (video2Ref.current) video2Ref.current.muted = !soundOn
  }, [soundOn])

  if (isMobile) return <WinePageMobile />

  return (
    <div style={{ backgroundColor: 'var(--red)' }}>
      <Nav color="#00006A" showSound soundOn={soundOn} onSoundToggle={() => setSoundOn(s => !s)} />

      {/* ── Cream top: bottles + yellow info card ───────────────── */}
      <section style={{
        backgroundColor: 'var(--cream)',
        position: 'relative',
        height: 'clamp(500px, 63.6vw, 1100px)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 'clamp(1rem, 9.38vw, 162px)',
          bottom: 'clamp(24px, 4.75vw, 82px)',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <img
            src="/bottle-1.png"
            alt="Capsule 01 wine bottle"
            style={{ width: 'clamp(80px, 16.7vw, 289px)', height: 'auto', display: 'block' }}
          />
          <img
            src="/bottle-2.png"
            alt="Capsule 01 wine bottle"
            style={{
              width: 'clamp(80px, 16.7vw, 289px)',
              height: 'auto',
              display: 'block',
              marginLeft: 'clamp(-1.5rem, -2.84vw, -49px)',
            }}
          />
        </div>

        <div style={{
          position: 'absolute',
          left: '55.67vw',
          top: '22.86vw',
          width: '30.03vw',
          backgroundColor: 'var(--yellow)',
          paddingTop: '1.27vw',
          paddingBottom: '1.79vw',
        }}>
          <div style={{ margin: '0 1.16vw' }}>
            {/* Top line */}
            <div style={{ height: '1.5px', backgroundColor: 'var(--blue)' }} />

            {DETAILS.map(([label, val]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '1.79vw',
                padding: '0 1.1vw',
                borderBottom: '1.5px solid var(--blue)',
              }}>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.65rem, 1.16vw, 20px)',
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
                  fontSize: 'clamp(0.65rem, 1.16vw, 20px)',
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

            {/* Empty yellow section below data rows */}
            <div style={{ height: '7vw' }} />

            {/* Bottom line */}
            <div style={{ height: '1.5px', backgroundColor: 'var(--blue)' }} />
          </div>
        </div>
      </section>

      {/* ── ORIGIN strip ────────────────────────────────────────── */}
      {marqueeStrip('var(--red)', 'ORIGIN')}

      {/* ── Meknes, Morocco ─────────────────────────────────────── */}
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
            src="/farmer-right.mp4"
            autoPlay muted loop playsInline preload="auto"
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
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1vw, 17px)',
              color: 'var(--cream)',
              lineHeight: 1.65,
            }}>{t}</p>
          ))}
        </div>
      </section>

      {/* ── METHOD strip ────────────────────────────────────────── */}
      {marqueeStrip('var(--blue)', 'METHOD')}

      {/* ── Amphora aged ────────────────────────────────────────── */}
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
            src="/farmer-left.mp4"
            autoPlay muted loop playsInline preload="auto"
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
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1vw, 17px)',
              color: 'var(--cream)',
              lineHeight: 1.65,
            }}>{t}</p>
          ))}
        </div>
      </section>

      {/* ── BOX strip ───────────────────────────────────────────── */}
      {marqueeStrip('var(--blue)', 'BOX')}

      {/* ── In the Box ──────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 'clamp(2rem, 3vw, 52px)',
        paddingBottom: 'clamp(4rem, 7vw, 120px)',
      }}>
        {sectionHeading('In the Box', 'PRODUCT', 'PRODUCT')}

        <div style={{
          width: '100%',
          display: 'flex',
          padding: '0 clamp(7px, 0.81vw, 14px)',
        }}>
          {[
            {
              img: '/bottle-box-1.png',
              name: 'Amphora Aged Grenache',
              qty: '1 bottle · 75cl',
              desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
            },
            {
              img: '/bottle-box-2.png',
              name: 'Estate Rosé',
              qty: '2 bottles · 75cl each',
              desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.',
            },
            {
              img: '/bottle-box-3.png',
              name: 'Estate Olive Oil',
              qty: '1 vial · 100ml',
              desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.',
            },
          ].map((item, i) => (
            <div key={item.name} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginLeft: i > 0 ? '-2.22px' : 0,
            }}>
              <div style={{
                border: '2.22px solid #00006A',
                borderRadius: 'clamp(100px, 16.44vw, 284px) clamp(100px, 16.44vw, 284px) 0 0',
                backgroundColor: 'var(--red)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 'clamp(12px, 2.03vw, 35px)',
                aspectRatio: '568 / 715',
              }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '37%', height: 'auto', display: 'block' }}
                />
              </div>
              <div style={{
                flex: 1,
                backgroundColor: 'var(--yellow)',
                border: '2.22px solid #00006A',
                marginTop: '-2.22px',
                padding: 'clamp(14px, 1.79vw, 31px)',
                paddingBottom: 'clamp(20px, 2.5vw, 43px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 'clamp(120px, 16vw, 276px)',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(11px, 1.33vw, 23px)',
                    color: 'var(--blue)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.25,
                    margin: 0,
                    textTransform: 'uppercase',
                  }}>
                    {item.name}
                  </p>
                  <p style={{
                    fontFamily: 'Vulf Sans, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(11px, 1.33vw, 23px)',
                    color: 'var(--blue)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.25,
                    margin: 0,
                  }}>
                    {item.desc}
                  </p>
                </div>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(11px, 1.33vw, 23px)',
                  color: 'var(--blue)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  margin: 0,
                  textTransform: 'uppercase',
                }}>
                  {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
