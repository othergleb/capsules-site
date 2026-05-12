'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavProps {
  soundOn?: boolean
  onSoundToggle?: () => void
  /** Override text colour (default auto based on scroll/background) */
  color?: string
  backHref?: string
}

export default function Nav({ soundOn = false, onSoundToggle, color = '#1A1A0A', backHref }: NavProps) {
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
        {onSoundToggle && (
          <button className="pill-btn" onClick={onSoundToggle}>
            {soundOn ? 'Sound On' : 'Sound Off'}
          </button>
        )}
      </div>
    </nav>
  )
}
