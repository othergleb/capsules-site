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
        <div style={{ backgroundColor: '#fffff5' }}>
          {PAGES.filter(p => p.href !== '/').map((page, i) => (
            <div key={page.href}>
              {i > 0 && (
                <div style={{ height: '1px', backgroundColor: '#00006a', margin: '0 24px', opacity: 0.25 }} />
              )}
              <Link
                href={page.href}
                onClick={() => setOpen(false)}
                style={{
                  ...NAV_TEXT,
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px 24px',
                  textDecoration: 'none',
                  fontWeight: pathname === page.href ? 700 : 300,
                }}
              >
                {page.label}
              </Link>
            </div>
          ))}
          {/* Divider above bottom bar */}
          <div style={{ height: '1px', backgroundColor: '#00006a', margin: '0 24px', opacity: 0.25 }} />
        </div>
      )}

      {/* Bottom bar */}
      <div style={{
        height: 'calc(41px + env(safe-area-inset-bottom, 0px))',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px calc(env(safe-area-inset-bottom, 0px)) 24px',
      }}>
        <button onClick={() => go(PAGES[prevIdx].href)} style={NAV_TEXT}>←</button>
        <button onClick={() => setOpen(o => !o)} style={NAV_TEXT}>
          {open ? 'CLOSE MENU' : centerLabel}
        </button>
        <button onClick={() => go(PAGES[nextIdx].href)} style={NAV_TEXT}>→</button>
      </div>

    </div>
  )
}
