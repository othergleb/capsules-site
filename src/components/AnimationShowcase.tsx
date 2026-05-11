'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ── Scramble hook ─────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ·—×#@!%&0123456789'
const SPEED  = 9 // frames before each character settles (3× original)

function useScramble(target: string) {
  const [output, setOutput] = useState('')
  const rafRef = useRef<number | null>(null)

  const play = useCallback(() => {
    let frame = 0

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

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const target = el

    let mx = -300, my = -300
    let rx = -300, ry = -300
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

// ── Scramble link ─────────────────────────────────────────────
function ScrambleLink({ label, delay, linksVisible }: {
  label: string
  delay: number
  linksVisible: boolean
}) {
  const { output, play } = useScramble(label)
  const [shown, setShown] = useState(false)
  useEffect(() => { if (linksVisible && !shown) setShown(true) }, [linksVisible, shown])

  return (
    <span
      onMouseEnter={play}
      style={{
        display: 'block',
        fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
        cursor: 'none',
        userSelect: 'none',
        fontFamily: 'Vulf Sans, sans-serif',
        paddingBlock: '0.15rem',
        // Burn: white text at slightly reduced opacity so video bleeds through visually
        color: 'rgba(255,255,248,0.78)',
        mixBlendMode: 'overlay',
        opacity: linksVisible ? 1 : 0,
        transform: linksVisible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {shown ? (output || label) : label}
    </span>
  )
}

// ── Items ─────────────────────────────────────────────────────
const ITEMS = ['THE WINE', 'THE ORIGIN', 'THE METHOD', 'REGISTER']

// ── Main component ────────────────────────────────────────────
export default function AnimationShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const { ringRef, dotRef } = useCursor(containerRef)

  const [headlineVisible, setHeadlineVisible] = useState(false)
  const [linksVisible, setLinksVisible]       = useState(false)

  const { output: headline, play: playHeadline } = useScramble('CAPSULE 01')

  // iOS autoplay push
  useEffect(() => { videoRef.current?.play().catch(() => {}) }, [])

  // Intro sequence — 3× the original timing
  useEffect(() => {
    const t1 = setTimeout(() => { setHeadlineVisible(true) }, 360)
    const t2 = setTimeout(() => { playHeadline() },           480)
    const t3 = setTimeout(() => { setLinksVisible(true) },   2460)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [playHeadline])

  return (
    <div
      ref={containerRef}
      data-nav-dark=""
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#000',
        cursor: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(5.5rem, 9vw, 8rem) clamp(2rem, 6vw, 5rem) clamp(2.5rem, 4vw, 3.5rem)',
      }}
    >
      {/* ── B&W background video ── */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // Grayscale + pushed contrast for a filmic, grain-heavy look
          filter: 'grayscale(1) contrast(1.35) brightness(0.72)',
          opacity: 0.9,
        }}
      >
        <source src="https://videos.pexels.com/video-files/1003933/1003933-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* Subtle gradient at bottom so captions stay legible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top label ── */}
      <p style={{
        position: 'relative',
        zIndex: 1,
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--red)',
        fontFamily: 'Vulf Sans, sans-serif',
        mixBlendMode: 'screen',
        opacity: headlineVisible ? 1 : 0,
        transition: 'opacity 0.8s ease 600ms',
      }}>
        Capsule 01 &nbsp;·&nbsp; Animation demo
      </p>

      {/* ── Centre content ── */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBlock: '3rem' }}>

        {/* Headline — burns against the video via overlay blend */}
        <h2
          className="capsules-wordmark"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 13rem)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'transparent',
            WebkitTextStrokeColor: 'rgba(255,255,248,1)',
            mixBlendMode: 'overlay',
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {headline || 'CAPSULE 01'}
        </h2>

        {/* Links */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {ITEMS.map((label, i) => (
            <ScrambleLink
              key={label}
              label={label}
              delay={i * 220}
              linksVisible={linksVisible}
            />
          ))}
        </nav>
      </div>

      {/* ── Bottom caption ── */}
      <p style={{
        position: 'relative',
        zIndex: 1,
        fontSize: '0.65rem',
        color: 'rgba(255,255,248,0.3)',
        fontFamily: 'Vulf Sans, sans-serif',
        letterSpacing: '0.12em',
        opacity: linksVisible ? 1 : 0,
        transition: 'opacity 0.8s ease 1000ms',
      }}>
        Scramble on load &nbsp;·&nbsp; Scramble on hover &nbsp;·&nbsp; Custom cursor
      </p>

      {/* ── Cursor ring (lagged) ── */}
      <div ref={ringRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: 40, height: 40,
        border: '1px solid rgba(255,255,248,0.5)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 200,
      }} />
      {/* ── Cursor dot (instant) ── */}
      <div ref={dotRef} style={{
        position: 'absolute', top: 0, left: 0,
        width: 8, height: 8,
        backgroundColor: 'var(--red)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 201,
      }} />
    </div>
  )
}
