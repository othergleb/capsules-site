'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

const PAGES = [
  { label: 'MENU',               href: '/'                   },
  { label: 'THE WINE',           href: '/the-wine'           },
  { label: 'ORIGIN, METHOD, BOX', href: '/origin-method-box' },
  { label: 'HOW IT WORKS',       href: '/how-it-works'       },
  { label: 'FAQS',               href: '/faq'                },
]

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#EDFF00',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  lineHeight: 1,
}

export default function MobileNav() {
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  const idx     = PAGES.findIndex(p => p.href === pathname)
  const safeIdx = idx < 0 ? 0 : idx
  const prevIdx = (safeIdx - 1 + PAGES.length) % PAGES.length
  const nextIdx = (safeIdx + 1) % PAGES.length

  const centerLabel = pathname === '/' ? 'MENU' : (PAGES[safeIdx]?.label ?? 'MENU')

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200 }}>

      {/* Expanded menu panel */}
      {open && (
        <div style={{ backgroundColor: '#00006A' }}>
          {PAGES.filter(p => p.href !== '/').map((page, i) => (
            <div key={page.href}>
              {i > 0 && (
                <div style={{ height: '1px', backgroundColor: 'rgba(237,255,0,0.2)', margin: '0 24px' }} />
              )}
              <Link
                href={page.href}
                onClick={() => setOpen(false)}
                style={{
                  ...LABEL_STYLE,
                  display: 'block',
                  textAlign: 'center',
                  padding: '11px 24px',
                  textDecoration: 'none',
                  fontWeight: pathname === page.href ? 700 : 300,
                }}
              >
                {page.label}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Bottom bar */}
      <div style={{
        height: '41px',
        backgroundColor: '#FF3C00',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        borderTop: open ? '1px solid rgba(237,255,0,0.25)' : 'none',
      }}>
        <button onClick={() => go(PAGES[prevIdx].href)} style={LABEL_STYLE}>←</button>
        <button onClick={() => setOpen(o => !o)} style={{ ...LABEL_STYLE, letterSpacing: '0.12em' }}>
          {open ? 'CLOSE MENU' : centerLabel}
        </button>
        <button onClick={() => go(PAGES[nextIdx].href)} style={LABEL_STYLE}>→</button>
      </div>

    </div>
  )
}
