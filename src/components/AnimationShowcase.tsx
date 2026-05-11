'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Scramble hook ─────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—×#@!%&0123456789'

function useScramble(target: string) {
  const [output, setOutput] = useState(target)
  const rafRef = useRef<number | null>(null)

  const play = useCallback(() => {
    let frame = 0
    const SPEED = 3 // frames before each character settles

    function tick() {
      frame++
      setOutput(
        target.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          if (frame > (i + 1) * SPEED) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }).join('')
      )
      if (frame <= (target.length + 1) * SPEED) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setOutput(target)
      }
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    frame = 0
    tick()
  }, [target])

  useEffect(() => {
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [])

  return { output, play }
}

// ── Custom cursor ─────────────────────────────────────────────
function useCursor(containerRef: React.RefObject<HTMLDivElement | null>) {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const target = el  // capture for closures

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let rafId: number

    function onMove(e: MouseEvent) {
      const rect = target.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
      }
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      rx = lerp(rx, mx, 0.1)
      ry = lerp(ry, my, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    target.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)
    return () => { target.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [containerRef])

  return { ringRef, dotRef }
}

// ── Scramble link (hover triggers scramble + image reveal) ────
function ScrambleLink({
  label, onEnter, onLeave,
}: {
  label: string
  onEnter: () => void
  onLeave: () => void
}) {
  const { output, play } = useScramble(label)

  return (
    <span
      onMouseEnter={() => { play(); onEnter() }}
      onMouseLeave={onLeave}
      style={{
        display: 'block',
        fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        color: 'rgba(255,255,248,0.85)',
        cursor: 'none',
        userSelect: 'none',
        fontFamily: 'Vulf Sans, sans-serif',
        paddingBlock: '0.2rem',
      }}
    >
      {output}
    </span>
  )
}

// ── Items ────────────────────────────────────────────────────
const ITEMS = [
  { label: 'THE WINE',   img: 'https://images.unsplash.com/photo-1569613946657-4c3f3ff490bb?w=1400&q=80' },
  { label: 'THE ORIGIN', img: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=1400&q=80' },
  { label: 'THE METHOD', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1400&q=80' },
  { label: 'REGISTER',   img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&q=80' },
]

// ── Main component ────────────────────────────────────────────
export default function AnimationShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ringRef, dotRef } = useCursor(containerRef)
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const { output: headline, play: playHeadline } = useScramble('CAPSULE 01')

  useEffect(() => {
    const t = setTimeout(playHeadline, 500)
    return () => clearTimeout(t)
  }, [playHeadline])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#080604',
        cursor: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(2rem, 5vw, 4rem) clamp(2.5rem, 4vw, 3.5rem)',
      }}
    >
      {/* Background images — revealed on link hover */}
      {ITEMS.map(({ label, img }) => (
        <div
          key={label}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: activeImg === img ? 0.28 : 0,
            transition: 'opacity 0.55s ease',
            zIndex: 0,
          }}
        />
      ))}
      {/* Persistent dark overlay so text always reads */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,5,3,0.6)', zIndex: 0 }} />

      {/* ── Top label ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '0.65rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--red)',
          fontFamily: 'Vulf Sans, sans-serif',
        }}>
          Animation capabilities — hover to explore
        </p>
      </div>

      {/* ── Centre content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Scramble headline — fires on page load */}
        <h2
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(4rem, 13vw, 11rem)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'transparent',
            WebkitTextStrokeColor: 'rgba(255,255,248,0.85)',
          }}
        >
          {headline}
        </h2>

        {/* Links — hover to scramble + reveal image */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {ITEMS.map(({ label, img }) => (
            <ScrambleLink
              key={label}
              label={label}
              onEnter={() => setActiveImg(img)}
              onLeave={() => setActiveImg(null)}
            />
          ))}
        </nav>
      </div>

      {/* ── Bottom label ── */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,248,0.2)', fontFamily: 'Vulf Sans, sans-serif', letterSpacing: '0.12em' }}>
          Scramble on load &nbsp;·&nbsp; Scramble on hover &nbsp;·&nbsp; Custom cursor &nbsp;·&nbsp; Image reveal
        </p>
      </div>

      {/* ── Custom cursor ── */}
      {/* Lagged ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 40, height: 40,
          border: '1px solid rgba(255,255,248,0.45)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 200,
        }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 8, height: 8,
          backgroundColor: 'var(--red)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 201,
        }}
      />
    </div>
  )
}
