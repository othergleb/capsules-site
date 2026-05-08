'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav({ initialDark = false }: { initialDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [overDark, setOverDark] = useState(initialDark)

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

  // When overlay is open, hide the underlying menu button visually
  const menuColor = open ? 'transparent' : overDark ? 'var(--cream)' : 'var(--red)'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-5 md:px-10">
        <button
          onClick={() => setOpen(true)}
          className="text-sm tracking-widest uppercase hover:opacity-60 transition-colors duration-300"
          style={{
            color: menuColor,
            fontFamily: 'Vulf Sans, sans-serif',
            letterSpacing: '0.14em',
          }}
          aria-label="Open menu"
        >
          Menu
        </button>
      </nav>

      {/* Full-screen overlay */}
      <div
        className="fixed inset-0 z-[100] flex flex-col"
        style={{
          backgroundColor: 'var(--blue)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        <div className="flex justify-end px-6 py-5 md:px-10">
          <button
            onClick={() => setOpen(false)}
            className="text-sm tracking-widest uppercase hover:opacity-60 transition-opacity"
            style={{
              color: 'var(--cream)',
              fontFamily: 'Vulf Sans, sans-serif',
              letterSpacing: '0.14em',
            }}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-10 md:px-16 gap-6">
          {[
            ['THE WINE', '/the-wine'],
            ['HOW IT WORKS', '/how-it-works'],
            ['FAQ', '/faq'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="capsules-wordmark hover:opacity-60 transition-opacity"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                WebkitTextStrokeColor: 'var(--cream)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="px-10 md:px-16 pb-12">
          <Link
            href="/#register"
            onClick={() => setOpen(false)}
            className="btn-primary inline-block px-8 py-3 rounded-full text-sm tracking-widest uppercase"
            style={{ letterSpacing: '0.1em' }}
          >
            Register for Capsule 01
          </Link>
        </div>
      </div>
    </>
  )
}
