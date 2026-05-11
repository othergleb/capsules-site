'use client'

import { useState, useRef, useEffect } from 'react'
import Nav from '@/components/Nav'
import RegistrationModal from '@/components/RegistrationModal'
import AnimationShowcase from '@/components/AnimationShowcase'
import Link from 'next/link'

const STATS = [
  { label: 'Ballot closes', value: '14 June 2026' },
  { label: 'Bottles',       value: '480' },
  { label: 'Vineyard',      value: 'Meknes, Morocco' },
]

export default function Home() {
  const [modalOpen, setModalOpen]     = useState(false)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const hookCtaRef    = useRef<HTMLButtonElement>(null)
  const ballotVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    ballotVideoRef.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    function handleOpenModal() { openModal() }
    window.addEventListener('open-register-modal', handleOpenModal)
    return () => window.removeEventListener('open-register-modal', handleOpenModal)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

      {/* ── Animation showcase ───────────────────────────────── */}
      <AnimationShowcase />

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid rgba(0,0,106,0.1)' }}>
        <div className="flex flex-wrap">
          {STATS.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-baseline justify-between py-4 px-8"
              style={{
                flex: '1 1 200px',
                borderRight: '1px solid rgba(0,0,106,0.1)',
              }}
            >
              <span className="text-xs font-light" style={{ color: 'rgba(0,0,106,0.5)' }}>
                {label}
              </span>
              <span className="text-xs font-medium tracking-wider uppercase ml-4" style={{ color: 'var(--blue)', letterSpacing: '0.08em' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 1: Hook ──────────────────────────────────── */}
      <section
        data-nav-dark=""
        className="relative flex items-end min-h-screen px-10 py-16"
        style={{ backgroundColor: '#1a1208' }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        >
          <source src="https://videos.pexels.com/video-files/1003933/1003933-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,8,4,0.9) 0%, rgba(10,8,4,0.3) 60%, transparent 100%)' }}
        />
        <div className="relative z-10 w-full max-w-3xl">
          <p className="text-xl font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.9)' }}>
            The last 480 bottles of an amphora aged grenache, grown by Berber farmers
            in the foothills of the Atlas mountains.
          </p>
          <p className="mt-4 text-xl font-light" style={{ color: 'rgba(255,255,248,0.9)' }}>
            Available only by ballot &mdash; one capsule per person.
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
              background: 'none',
              cursor: 'pointer',
            }}
          >
            Register for Capsule 01
          </button>
        </div>
      </section>

      {/* ── Section 1b: Subtext ──────────────────────────────── */}
      <section
        className="px-10 py-16 max-w-3xl"
        style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}
      >
        <p className="text-base font-light leading-relaxed mb-5" style={{ color: 'var(--blue)' }}>
          In 2023, Berber farmers in Meknes, Morocco collaborated with world class French winemakers
          to create a beautiful, one of a kind wine.
        </p>
        <p className="text-base font-light leading-relaxed mb-5" style={{ color: 'var(--blue)' }}>
          Taking carefully selected Grenache grapes from their harvest and ageing them in clay
          amphora, together they produced what&rsquo;s known as a gris &mdash; a ros&eacute; so pale
          it enters a new classification.
        </p>
        <p className="text-base font-light leading-relaxed mb-5" style={{ color: 'var(--blue)' }}>
          Only 480 bottles remain, and they&rsquo;re all for sale via an allocation ballot on
          the 14th June. One bottle per customer.
        </p>
        <p className="text-base font-light leading-relaxed" style={{ color: 'var(--blue)' }}>
          Join Capsule 01 below to enter the allocation.
        </p>
      </section>

      {/* ── Section 2: The ballot ─────────────────────────────── */}
      <section
        data-nav-dark=""
        className="relative px-10 py-20 min-h-[50vh] flex flex-col justify-center"
        style={{ backgroundColor: '#0e1a12' }}
      >
        <video
          ref={ballotVideoRef}
          autoPlay loop muted playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
        >
          <source src="https://videos.pexels.com/video-files/1003934/1003934-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,26,18,0.8) 0%, rgba(26,14,8,0.8) 100%)' }} />
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            The ballot
          </p>
          <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.8)' }}>
            We are allocating by ballot to give everyone an equal shot. Register
            and if you are drawn on 14 June, you will get a checkout link and
            48 hours to complete your purchase. Ballot closes 13 June.
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl">
          {[
            { label: 'Amphora Aged Grenache', sub: '1 bottle · gris de grenache', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', alt: 'Wine bottle' },
            { label: 'Estate Rosé',           sub: '2 bottles · same estate',    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',   alt: 'Rosé wine' },
            { label: 'Estate Olive Oil',      sub: '1 vial · cold-pressed',      img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', alt: 'Olive oil' },
          ].map(({ label, sub, img, alt }) => (
            <div key={label}>
              <div className="w-full mb-3 overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* ── Footer ──────────────────────────────────────────────*/}
      <footer
        className="px-10 py-6 text-xs"
        style={{ borderTop: '1px solid rgba(0,0,106,0.1)', color: 'rgba(0,0,106,0.35)' }}
      >
        <div className="flex justify-between items-center">
          <p>One entry per person. Ballot closes 13 June.</p>
          <a href="https://otherwine.co.uk" target="_blank" rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70">otherwine.co.uk</a>
        </div>
      </footer>

    </div>
  )
}
