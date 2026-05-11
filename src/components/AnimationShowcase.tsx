'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Scramble hook ─────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—×#@!%&0123456789'

function useScramble(target: string) {
  const [output, setOutput] = useState('')
  const rafRef = useRef<number | null>(null)

  const play = useCallback(() => {
    let frame = 0
    const SPEED = 3

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

  useEffect(() => () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }, [])
  return { output, play }
}

// ── Custom cursor ─────────────────────────────────────────────
function useCursor(containerRef: React.RefObject<HTMLDivElement | null>) {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)
  // Expose raw mouse pos for the floating image
  const mousePos = useRef({ x: -300, y: -300 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const target = el

    let rx = -300, ry = -300
    let rafId: number

    function onMove(e: MouseEvent) {
      const rect = target.getBoundingClientRect()
      mousePos.current.x = e.clientX - rect.left
      mousePos.current.y = e.clientY - rect.top
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`
      }
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      rx = lerp(rx, mousePos.current.x, 0.1)
      ry = lerp(ry, mousePos.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    target.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)
    return () => { target.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [containerRef])

  return { ringRef, dotRef, mousePos }
}

// ── Items ─────────────────────────────────────────────────────
const ITEMS = [
  { label: 'THE WINE',   img: 'https://images.unsplash.com/photo-1569613946657-4c3f3ff490bb?w=900&q=80' },
  { label: 'THE ORIGIN', img: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=900&q=80' },
  { label: 'THE METHOD', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=900&q=80' },
  { label: 'REGISTER',   img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80' },
]

// ── Scramble link ─────────────────────────────────────────────
function ScrambleLink({
  label, delay, linksVisible, onEnter, onLeave,
}: {
  label: string
  delay: number
  linksVisible: boolean
  onEnter: () => void
  onLeave: () => void
}) {
  const { output, play } = useScramble(label)
  // Initialise display to label (not empty) once visible
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (linksVisible && !shown) setShown(true)
  }, [linksVisible, shown])

  return (
    <span
      onMouseEnter={() => { play(); onEnter() }}
      onMouseLeave={onLeave}
      style={{
        display: 'block',
        fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        color: 'rgba(255,255,248,0.82)',
        cursor: 'none',
        userSelect: 'none',
        fontFamily: 'Vulf Sans, sans-serif',
        paddingBlock: '0.15rem',
        opacity: linksVisible ? 1 : 0,
        transform: linksVisible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {shown ? (output || label) : label}
    </span>
  )
}

// ── Main component ────────────────────────────────────────────
export default function AnimationShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ringRef, dotRef, mousePos } = useCursor(containerRef)
  const floatRef = useRef<HTMLDivElement>(null)

  const [headlineVisible, setHeadlineVisible] = useState(false)
  const [linksVisible, setLinksVisible]       = useState(false)
  const [hoverImg, setHoverImg]               = useState<string | null>(null)

  const { output: headline, play: playHeadline } = useScramble('CAPSULE 01')

  // Intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => { setHeadlineVisible(true) }, 120)
    const t2 = setTimeout(() => { playHeadline() }, 180)
    const t3 = setTimeout(() => { setLinksVisible(true) }, 820)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [playHeadline])

  // Floating image: update position directly via DOM (no React re-render lag)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const target = el
    let rafId: number
    let fx = -400, fy = -400

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      fx = lerp(fx, mousePos.current.x, 0.1)
      fy = lerp(fy, mousePos.current.y, 0.1)
      if (floatRef.current) {
        floatRef.current.style.left = `${fx + 28}px`
        floatRef.current.style.top  = `${fy - 180}px`
      }
      rafId = requestAnimationFrame(animate)
    }

    target.addEventListener('mousemove', () => {}) // ensure RAF stays alive while in section
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [mousePos])

  return (
    <div
      ref={containerRef}
      data-nav-dark=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#080604',
        cursor: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(5.5rem, 9vw, 8rem) clamp(2rem, 6vw, 5rem) clamp(2.5rem, 4vw, 3.5rem)',
      }}
    >

      {/* ── Top label ── */}
      <p style={{
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--red)',
        fontFamily: 'Vulf Sans, sans-serif',
        opacity: headlineVisible ? 1 : 0,
        transition: 'opacity 0.6s ease 400ms',
      }}>
        Capsule 01 &nbsp;·&nbsp; Animation demo
      </p>

      {/* ── Centre content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBlock: '3rem' }}>

        {/* Headline — scrambles in on load */}
        <h2
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'transparent',
            WebkitTextStrokeColor: 'rgba(255,255,248,0.88)',
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          {headline || 'CAPSULE 01'}
        </h2>

        {/* Links — hover to scramble + reveal floating image */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {ITEMS.map(({ label, img }, i) => (
            <ScrambleLink
              key={label}
              label={label}
              delay={i * 90}
              linksVisible={linksVisible}
              onEnter={() => setHoverImg(img)}
              onLeave={() => setHoverImg(null)}
            />
          ))}
        </nav>
      </div>

      {/* ── Bottom caption ── */}
      <p style={{
        fontSize: '0.65rem',
        color: 'rgba(255,255,248,0.18)',
        fontFamily: 'Vulf Sans, sans-serif',
        letterSpacing: '0.12em',
        opacity: linksVisible ? 1 : 0,
        transition: 'opacity 0.6s ease 600ms',
      }}>
        Scramble on load &nbsp;·&nbsp; Scramble on hover &nbsp;·&nbsp; Custom cursor &nbsp;·&nbsp; Image on hover
      </p>

      {/* ── Floating image (follows cursor on link hover) ── */}
      <div
        ref={floatRef}
        style={{
          position: 'absolute',
          width: 260,
          height: 360,
          pointerEvents: 'none',
          zIndex: 10,
          overflow: 'hidden',
          opacity: hoverImg ? 1 : 0,
          transform: hoverImg ? 'scale(1)' : 'scale(0.88)',
          transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.2,0.64,1)',
        }}
      >
        {hoverImg && (
          <img
            src={hoverImg}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* ── Custom cursor ring (lagged) ── */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 40, height: 40,
          border: '1px solid rgba(255,255,248,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 200,
        }}
      />
      {/* ── Custom cursor dot (instant) ── */}
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
