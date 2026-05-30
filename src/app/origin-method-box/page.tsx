'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import MobileNav from '@/components/MobileNav'
import Nav from '@/components/Nav'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function OriginMethodBoxPage() {
  const isMobile = useIsMobile()
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // setAttribute sets the HTML attribute iOS Safari reads; .muted = true sets the JS property
    if (video1Ref.current) { video1Ref.current.setAttribute('muted', ''); video1Ref.current.muted = true; video1Ref.current.play().catch(() => {}) }
    if (video2Ref.current) { video2Ref.current.setAttribute('muted', ''); video2Ref.current.muted = true; video2Ref.current.play().catch(() => {}) }
  }, [])

  // ── Shared strip ────────────────────────────────────────────
  function Strip({ label, bg }: { label: string; bg: string }) {
    return (
      <div style={{
        backgroundColor: bg,
        height: isMobile ? '28px' : 'clamp(28px,2.6vw,45px)',
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
            fontSize: isMobile ? '12px' : 'clamp(12px,1.45vw,25px)',
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

  const BOX_ITEMS = [
    {
      img: '/bottle-box-1.png',
      name: 'Amphora Aged Grenache',
      desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
      qty: '1 bottle · 75cl',
    },
    {
      img: '/bottle-box-2.png',
      name: 'Estate Rosé',
      desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.',
      qty: '2 bottles · 75cl each',
    },
    {
      img: '/bottle-box-3.png',
      name: 'Estate Olive Oil',
      desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.',
      qty: '1 vial · 100ml',
    },
  ]

  const BODY: React.CSSProperties = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontWeight: 300,
    fontSize: isMobile ? '14px' : 'clamp(0.8rem,1vw,17px)',
    color: 'var(--cream)',
    lineHeight: 1.65,
    margin: 0,
  }

  return (
    <div style={{ backgroundColor: 'var(--red)', paddingBottom: isMobile ? '41px' : 0 }}>

      {isMobile ? (
        /* Mobile logo header */
        <Link href="/" style={{ display: 'block', backgroundColor: 'var(--cream)', padding: '20px 16px 16px', textAlign: 'center' }}>
          <img src="/figma/other-logo-yellow.png" alt="OTHER" style={{ height: '44px', width: 'auto' }} />
        </Link>
      ) : (
        <Nav />
      )}

      {/* ── ORIGIN ──────────────────────────────────────────── */}
      <Strip label="ORIGIN" bg="var(--red)" />

      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(2rem,5vw,86px)',
      }}>
        {/* Video */}
        <div style={{
          width: '100%',
          aspectRatio: isMobile ? '380/214' : '857/482',
          borderRadius: isMobile ? 'clamp(60px,28vw,100px)' : '486.5px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: isMobile ? '20px' : 'clamp(2rem,3.5vw,60px)',
        }}>
          <video ref={video1Ref} src="/farmer-right.mp4" autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>

        <h2 style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 900,
          fontSize: isMobile ? 'clamp(2rem,9vw,3rem)' : 'clamp(2.5rem,5.53vw,95px)',
          color: 'transparent',
          WebkitTextStroke: '2px var(--cream)',
          letterSpacing: '0.02em',
          textAlign: 'center',
          margin: '0 0 clamp(1rem,2vw,32px)',
        }}>
          Meknes, Morocco
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px', padding: '0 20px', width: '100%' }}>
          {[
            'Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare in this latitude.',
            'In 2023, a Berber tribe and a team of French winemakers set out to make something new from something ancient. Grenache Gris — a pale, copper-skinned grape — fermented and aged in clay amphorae, the same vessels used across the Mediterranean for thousands of years.',
          ].map((t, i) => <p key={i} style={BODY}>{t}</p>)}
        </div>
      </section>

      {/* ── METHOD ──────────────────────────────────────────── */}
      <Strip label="METHOD" bg="var(--blue)" />

      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(2rem,5vw,86px)',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: isMobile ? '380/214' : '857/482',
          borderRadius: isMobile ? 'clamp(60px,28vw,100px)' : '486.5px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: isMobile ? '20px' : 'clamp(2rem,3.5vw,60px)',
        }}>
          <video ref={video2Ref} src="/farmer-left.mp4" autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset', pointerEvents: 'none' }} />
        </div>

        <h2 style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 900,
          fontSize: isMobile ? 'clamp(2rem,9vw,3rem)' : 'clamp(2.5rem,5.53vw,95px)',
          color: 'transparent',
          WebkitTextStroke: '2px var(--cream)',
          letterSpacing: '0.02em',
          textAlign: 'center',
          margin: '0 0 clamp(1rem,2vw,32px)',
        }}>
          Amphora aged
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '440px', padding: '0 20px', width: '100%' }}>
          {[
            'The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.',
            'The result has a texture and minerality that glass and steel cannot replicate.\nNo fining. No filtration. 480 bottles filled by hand.',
          ].map((t, i) => <p key={i} style={BODY}>{t}</p>)}
        </div>
      </section>

      {/* ── BOX ─────────────────────────────────────────────── */}
      <Strip label="BOX" bg="var(--blue)" />

      <section style={{
        backgroundColor: 'var(--red)',
        paddingTop: 'clamp(1.5rem,3vw,52px)',
        paddingBottom: 'clamp(2rem,5vw,86px)',
      }}>
        <h2 style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 900,
          fontSize: isMobile ? 'clamp(2rem,9vw,3rem)' : 'clamp(2.5rem,5.53vw,95px)',
          color: 'transparent',
          WebkitTextStroke: '2px var(--cream)',
          letterSpacing: '0.02em',
          textAlign: 'center',
          margin: '0 0 clamp(1rem,2vw,32px)',
        }}>
          In the Box
        </h2>

        {/* 2-column product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          padding: '0 9px',
        }}>
          {BOX_ITEMS.map((item, i) => (
            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', marginLeft: i % 2 !== 0 ? '-2.22px' : 0 }}>
              {/* Image area */}
              <div style={{
                border: '2.22px solid #00006A',
                borderRadius: 'clamp(60px,20vw,140px) clamp(60px,20vw,140px) 0 0',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: '12px',
                aspectRatio: '1/1.2',
                backgroundColor: 'var(--red)',
              }}>
                <img src={item.img} alt={item.name} style={{ width: '50%', height: 'auto', display: 'block' }} />
              </div>
              {/* Caption */}
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

      {isMobile ? <MobileNav /> : null}
    </div>
  )
}
