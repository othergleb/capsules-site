'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const PAGES = [
  { label: 'CAPSULE 01',           href: '/the-wine'           },
  { label: 'ORIGIN, METHOD, BOX', href: '/origin-method-box'  },
  { label: 'HOW IT WORKS',        href: '/how-it-works'       },
]

const NAV_TEXT: React.CSSProperties = {
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: '18px',
  letterSpacing: '-0.54px',
  textTransform: 'uppercase',
  color: '#00006a',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  lineHeight: 1,
  fontFeatureSettings: '"cv10" 1, "ss03" 1, "ss05" 1, "case" 1, "ordn" 1, "dlig" 1',
}

export default function MobileNav({ bg = '#fffff5' }: { bg?: string }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  const isHome  = pathname === '/'
  const idx     = PAGES.findIndex(p => p.href === pathname)
  const safeIdx = idx < 0 ? 0 : idx
  const prevIdx = (safeIdx - 1 + PAGES.length) % PAGES.length
  const nextIdx = (safeIdx + 1) % PAGES.length
  const centerLabel = isHome ? 'MENU' : (PAGES[safeIdx]?.label ?? 'MENU')

  function go(href: string) {
    setOpen(false)
    router.push(href)
  }

  const showArrows = !open && !isHome

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200 }}>

      {/* Expanded menu panel */}
      {open && (
        <div style={{ backgroundColor: bg }}>
          <div>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              style={{ ...NAV_TEXT, display: 'block', textAlign: 'center', padding: '5px 24px', textDecoration: 'none', fontWeight: isHome ? 700 : 300 }}
            >
              HOME
            </Link>
            <div style={{ height: '1px', backgroundColor: '#00006a', margin: '0 24px' }} />
          </div>
          {PAGES.map((page, i) => (
            <div key={page.href}>
              {i > 0 && (
                <div style={{ height: '1px', backgroundColor: '#00006a', margin: '0 24px' }} />
              )}
              <Link
                href={page.href}
                onClick={() => setOpen(false)}
                style={{
                  ...NAV_TEXT,
                  display: 'block',
                  textAlign: 'center',
                  padding: '5px 24px',
                  textDecoration: 'none',
                  fontWeight: pathname === page.href ? 700 : 300,
                }}
              >
                {page.label}
              </Link>
            </div>
          ))}
          <div style={{ height: '1px', backgroundColor: '#00006a', margin: '0 24px' }} />
        </div>
      )}

      {/* Bottom bar */}
      <div style={{
        height: 'calc(41px + env(safe-area-inset-bottom, 0px))',
        backgroundColor: bg,
        borderTop: '1px solid #00006a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: showArrows ? 'space-between' : 'center',
        padding: '0 24px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
        {showArrows && (
          <button onClick={() => go(PAGES[prevIdx].href)} style={NAV_TEXT}>←</button>
        )}
        <button onClick={() => setOpen(o => !o)} style={NAV_TEXT}>
          {open ? 'CLOSE MENU' : centerLabel}
        </button>
        {showArrows && (
          <button onClick={() => go(PAGES[nextIdx].href)} style={NAV_TEXT}>→</button>
        )}
      </div>

    </div>
  )
}
