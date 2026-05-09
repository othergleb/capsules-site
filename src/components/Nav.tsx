'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface NavProps {
  initialDark?: boolean
  backHref?: string
}

export default function Nav({ initialDark = false, backHref }: NavProps) {
  const [open, setOpen] = useState(false)
  const [overDark, setOverDark] = useState(initialDark)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const darkEls = document.querySelectorAll('[data-nav-dark]')
    if (!darkEls.length) return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) visible.add(e.target)
          else visible.delete(e.target)
        })
        setOverDark(visible.size > 0)
      },
      { rootMargin: '0px 0px -95% 0px' }
    )

    darkEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close panel on click outside
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const fgColor = overDark ? 'rgba(255,255,248,0.8)' : 'var(--red)'

  function handleRegisterClick() {
    setOpen(false)
    window.dispatchEvent(new CustomEvent('open-register-modal'))
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10"
        style={{ pointerEvents: 'none' }}
      >
        {/* Back home — shown on sub-pages */}
        {backHref ? (
          <Link
            href={backHref}
            style={{
              color: fgColor,
              fontFamily: 'Vulf Sans, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              pointerEvents: 'all',
            }}
          >
            ← Capsules
          </Link>
        ) : (
          <div />
        )}

        {/* Menu button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="text-sm tracking-widest uppercase transition-colors duration-300"
          style={{
            color: open ? 'transparent' : fgColor,
            fontFamily: 'Vulf Sans, sans-serif',
            letterSpacing: '0.14em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            pointerEvents: 'all',
          }}
          aria-label="Open menu"
        >
          Menu
        </button>
      </nav>

      {/* Backdrop — closes on click */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          background: 'rgba(0,0,0,0.12)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.22s ease',
        }}
      />

      {/* Popout panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: '0.75rem',
          right: '1.25rem',
          zIndex: 100,
          width: '220px',
          backgroundColor: 'white',
          borderRadius: '14px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.06)',
          padding: '0.5rem 0 0.75rem',
          transformOrigin: 'top right',
          transform: open ? 'scale(1)' : 'scale(0.82)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.18s ease',
        }}
      >
        {/* Close row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem 1rem 0.5rem' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(0,0,0,0.3)',
              fontSize: '1.5rem',
              lineHeight: 1,
              cursor: 'pointer',
              fontWeight: 300,
              padding: 0,
            }}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Nav links */}
        {[
          ['The Wine', '/the-wine'],
          ['How it Works', '/how-it-works'],
          ['FAQ', '/faq'],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 1.25rem',
              color: 'var(--blue)',
              fontFamily: 'Vulf Sans, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 400,
              textDecoration: 'none',
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            <span>{label}</span>
            <span style={{ color: 'rgba(0,0,106,0.3)', fontSize: '1rem' }}>›</span>
          </Link>
        ))}

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(0,0,106,0.08)', margin: '0.5rem 1.25rem' }} />

        {/* Register */}
        <div style={{ padding: '0.5rem 1.25rem 0' }}>
          <button
            onClick={handleRegisterClick}
            style={{
              width: '100%',
              backgroundColor: 'var(--red)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem 1rem',
              fontSize: '0.7rem',
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={e => (e.currentTarget.style.opacity = '1')}
          >
            Register for Capsule 01
          </button>
        </div>
      </div>
    </>
  )
}
