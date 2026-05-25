'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface NavProps {
  color?: string
  showSound?: boolean
  soundOn?: boolean
  onSoundToggle?: () => void
}

export default function Nav({ color = '#00006A', showSound = false, soundOn = false, onSoundToggle }: NavProps) {
  const pathname = usePathname()

  function activePill(href: string): React.CSSProperties {
    if (!(pathname === href || pathname.startsWith(href + '/'))) return {}
    return { backgroundColor: '#00006A', color: '#EDFF00', borderColor: '#00006A' }
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.85rem 1.25rem',
      pointerEvents: 'none',
      color,
    }}>
      <div style={{ display: 'flex', gap: 0, pointerEvents: 'all' }}>
        {pathname !== '/' && (
          <Link href="/" className="pill-btn">Home</Link>
        )}
        <Link href="/the-wine" className="pill-btn" style={activePill('/the-wine')}>The Wine</Link>
        <Link href="/how-it-works" className="pill-btn" style={activePill('/how-it-works')}>How it Works</Link>
      </div>
      <div style={{ display: 'flex', gap: 0, pointerEvents: 'all' }}>
        {showSound && (
          <button className="pill-btn" onClick={onSoundToggle} style={{ color }}>
            {soundOn ? 'Sound Off' : 'Sound On'}
          </button>
        )}
        <Link href="/faq" className="pill-btn" style={activePill('/faq')}>FAQ</Link>
        <a href="https://otherwine.co.uk" className="pill-btn" target="_blank" rel="noopener noreferrer">
          Otherwine.co.uk
        </a>
      </div>
    </nav>
  )
}
