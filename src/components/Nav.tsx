'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
  /** Override text colour */
  color?: string
  backHref?: string
  /** Show Sound toggle (home page only) */
  showSound?: boolean
}

export default function Nav({ color = '#1A1A0A', backHref, showSound = false }: NavProps) {
  const [soundOn, setSoundOn] = useState(false)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        pointerEvents: 'none',
        color,
      }}
    >
      {/* Left pills */}
      <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'all' }}>
        {backHref ? (
          <Link href={backHref} className="pill-btn">← Capsules</Link>
        ) : (
          <>
            <Link href="/the-wine" className="pill-btn">The Wine</Link>
            <Link href="/how-it-works" className="pill-btn">How it Works</Link>
          </>
        )}
      </div>

      {/* Right pills */}
      <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'all' }}>
        <Link href="/faq" className="pill-btn">FAQ</Link>
        {showSound && (
          <button className="pill-btn" onClick={() => setSoundOn(s => !s)}>
            {soundOn ? 'Sound On' : 'Sound Off'}
          </button>
        )}
      </div>
    </nav>
  )
}
