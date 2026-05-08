'use client'

import { useState, useRef } from 'react'
import Nav from '@/components/Nav'
import CountdownTimer from '@/components/CountdownTimer'
import RegistrationModal from '@/components/RegistrationModal'
import Link from 'next/link'

const BALLOT_DATE = '2026-06-09T23:59:59'

const STATS = [
  { label: 'Ballot closes', value: <CountdownTimer target={BALLOT_DATE} /> },
  { label: 'Bottles',       value: '480' },
  { label: 'Vineyard',      value: 'Meknes, Morocco' },
]

// Red tile that expands to fill the screen on click.
// Passes its bounding rect so the modal can animate from exactly here.
function EmailTrigger({ onOpen }: { onOpen: (rect: DOMRect) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div className="w-full">
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={() => ref.current && onOpen(ref.current.getBoundingClientRect())}
        onKeyDown={e => e.key === 'Enter' && ref.current && onOpen(ref.current.getBoundingClientRect())}
        className="cursor-pointer select-none"
        style={{
          backgroundColor: 'var(--red)',
          padding: '1.2rem 1.25rem 1rem',
        }}
      >
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.875rem',
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 300,
          marginBottom: '0.7rem',
        }}>
          your email
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            color: 'white',
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 500,
          }}>
            Register
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            &rarr;
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs font-light" style={{ color: 'rgba(0,0,106,0.4)' }}>
        One entry per person. No spam, ever.
      </p>
    </div>
  )
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const hookCtaRef = useRef<HTMLButtonElement>(null)

  function openModal(rect?: DOMRect) {
    setTriggerRect(rect ?? null)
    setModalOpen(true)
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>

      <Nav initialDark={true} />

      <RegistrationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        startRect={triggerRect}
      />

      <div className="lg:flex">

        {/* ── LEFT: fixed sidebar ─────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col fixed top-0 left-0 h-screen z-20 overflow-y-auto"
          style={{
            width: '33.333vw',
            padding: '2.5rem 2rem',
            borderRight: '1px solid rgba(0,0,106,0.1)',
            backgroundColor: 'var(--cream)',
          }}
        >
          <div className="flex flex-col items-center">
            <video
              autoPlay loop muted playsInline
              style={{ width: 'calc(100% - 2rem)', height: 'auto', display: 'block' }}
            >
              <source src="/logo-animated-v3.mp4" type="video/mp4" />
            </video>
            <span
              className="capsules-wordmark-red mt-2 text-center"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 4.5rem)', display: 'block' }}
            >
              Capsule 01
            </span>
          </div>

          <div className="mt-auto">
            <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
              {STATS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between py-3"
                  style={{ borderBottom: '1px solid rgba(0,0,106,0.1)' }}
                >
                  <span className="text-xs font-light" style={{ color: 'rgba(0,0,106,0.5)' }}>
                    {label}
                  </span>
                  <span
                    className="text-xs font-medium tracking-wider uppercase"
                    style={{ color: 'var(--blue)', letterSpacing: '0.08em' }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <EmailTrigger onOpen={rect => openModal(rect)} />
            </div>
          </div>
        </aside>

        {/* ── RIGHT: scrollable content ────────────────────────── */}
        <main className="lg:ml-[33.333vw] flex-1">

          {/* Mobile header */}
          <div className="lg:hidden px-6 pt-28 pb-10">
            <div className="flex flex-col items-center mb-8">
              <video autoPlay loop muted playsInline style={{ width: '75%' }}>
                <source src="/logo-animated-v3.mp4" type="video/mp4" />
              </video>
              <span className="capsules-wordmark-red mt-2" style={{ fontSize: '2.5rem' }}>Capsule 01</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,106,0.1)' }}>
                  <span className="text-xs" style={{ color: 'rgba(0,0,106,0.5)' }}>{label}</span>
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--blue)' }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <EmailTrigger onOpen={rect => openModal(rect)} />
            </div>
          </div>

          {/* ── Section 1: Hook ──────────────────────────────────── */}
          <section
            data-nav-dark=""
            className="relative flex items-end min-h-screen px-10 py-16"
            style={{ backgroundColor: '#1a1208' }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, #2c1a0e 0%, #0d1a0a 100%)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.15)', letterSpacing: '0.2em' }}>
                [ Video: Vineyard footage ]
              </p>
            </div>
            <div className="relative z-10 w-full">
              <p className="text-xl font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.9)' }}>
                In 2023 a Berber tribe in Meknes, Morocco, took the finest Grenache
                grapes from their harvest, and worked alongside French winemakers
                to create a one of a kind amphora aged wine.
              </p>
              <p className="mt-8 text-xl font-light" style={{ color: 'rgba(255,255,248,0.9)' }}>
                480 bottles remain.
              </p>
              <p className="mt-2 text-xl font-light" style={{ color: 'rgba(255,255,248,0.9)' }}>
                One per person.
              </p>
              <button
                ref={hookCtaRef}
                onClick={() => openModal(hookCtaRef.current?.getBoundingClientRect())}
                className="mt-10 px-8 py-3 text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
                style={{
                  border: '1px solid rgba(255,255,248,0.35)',
                  color: 'rgba(255,255,248,0.8)',
                  fontFamily: 'Vulf Sans, sans-serif',
                  letterSpacing: '0.14em',
                }}
              >
                Register for Capsule 01
              </button>
            </div>
          </section>

          {/* ── Section 2: The ballot ─────────────────────────────── */}
          <section
            data-nav-dark=""
            className="relative px-10 py-20 min-h-[50vh] flex flex-col justify-center"
            style={{ backgroundColor: '#0e1a12' }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0e1a12 0%, #1a0e08 100%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.08)', letterSpacing: '0.2em' }}>
                [ Video: Winemaker footage ]
              </p>
            </div>
            <div className="relative z-10 w-full">
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
                The ballot
              </p>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.8)' }}>
                We are allocating by ballot to give everyone an equal shot. Register
                and if you are drawn on 9 June, you will get a checkout link and
                48 hours to complete your purchase. Ballot closes 8 June.
              </p>
              <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,248,0.4)' }}>
                <Link href="/how-it-works" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                  How it works &rarr;
                </Link>
              </p>
            </div>
          </section>

          {/* ── Section 3: Inside the Capsule ────────────────────── */}
          <section className="px-10 py-20" style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
            <p className="text-xs tracking-widest uppercase mb-10" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
              Inside the Capsule
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Amphora Aged Grenache', sub: '1 bottle · gris de grenache' },
                { label: 'Estate Rosé', sub: '2 bottles · same estate' },
                { label: 'Estate Olive Oil', sub: '1 vial · cold-pressed' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <div
                    className="w-full mb-3 flex items-center justify-center"
                    style={{ aspectRatio: '3/4', backgroundColor: 'rgba(0,0,106,0.05)', border: '1px dashed rgba(0,0,106,0.15)' }}
                  >
                    <p className="text-xs text-center px-4" style={{ color: 'rgba(0,0,106,0.3)' }}>
                      [ Photo: {label} ]
                    </p>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--blue)' }}>{label}</p>
                  <p className="text-xs mt-0.5 font-light" style={{ color: 'rgba(0,0,106,0.5)' }}>{sub}</p>
                </div>
              ))}
            </div>
            <p className="text-base font-medium" style={{ color: 'var(--blue)' }}>
              &pound;89 including delivery.
            </p>
            <p className="mt-2 text-sm font-light" style={{ color: 'rgba(0,0,106,0.6)' }}>
              One bottle of amphora-aged Grenache gris, two bottles of estate ros&eacute;, and a small vial of their olive oil.
            </p>
            <p className="mt-4 text-sm" style={{ color: 'rgba(0,0,106,0.45)' }}>
              <Link href="/the-wine" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                About the wine &rarr;
              </Link>
            </p>
          </section>

          {/* ── Footer ──────────────────────────────────────────── */}
          <footer
            className="px-10 py-6 text-xs"
            style={{ borderTop: '1px solid rgba(0,0,106,0.1)', color: 'rgba(0,0,106,0.35)' }}
          >
            <div className="flex justify-between items-center">
              <p>One entry per person. Ballot closes 8 June.</p>
              <a href="https://otherwine.co.uk" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70">otherwine.co.uk</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
