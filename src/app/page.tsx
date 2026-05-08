import Nav from '@/components/Nav'
import RegistrationForm from '@/components/RegistrationForm'
import CountdownTimer from '@/components/CountdownTimer'
import Link from 'next/link'

const BALLOT_DATE = '2026-06-09T10:00:00'

const STATS = [
  { label: 'Ballot opens',       value: <CountdownTimer target={BALLOT_DATE} /> },
  { label: 'Bottles available',  value: '480' },
  { label: 'Vineyard',           value: 'Meknes, Morocco' },
]

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>

      {/* Mobile-only nav */}
      <div className="lg:hidden">
        <Nav />
      </div>

      <div className="lg:flex">

        {/* ── LEFT: fixed sidebar ─────────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col fixed top-0 left-0 h-screen z-20 overflow-y-auto"
          style={{
            width: '360px',
            padding: '2.5rem 2rem',
            borderRight: '1px solid rgba(0,0,106,0.1)',
            backgroundColor: 'var(--cream)',
          }}
        >
          {/* Logo */}
          <div>
            <video
              autoPlay loop muted playsInline
              style={{ width: '200px', height: 'auto', display: 'block' }}
            >
              <source src="/logo-animated-v3.mp4" type="video/mp4" />
            </video>
            <div className="mt-1">
              <span className="capsules-wordmark-red" style={{ fontSize: '2.2rem' }}>
                Capsule 01
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8" style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
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

          {/* Registration form */}
          <div className="mt-6">
            <RegistrationForm minimal />
          </div>

          {/* Nav links at bottom */}
          <div className="mt-auto pt-8 flex flex-col gap-3">
            {[['The Wine', '/the-wine'], ['How it works', '/how-it-works'], ['FAQ', '/faq']].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-widest uppercase hover:opacity-50 transition-opacity"
                style={{ color: 'rgba(0,0,106,0.4)', letterSpacing: '0.14em' }}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://otherwine.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:opacity-50 transition-opacity mt-2"
              style={{ color: 'rgba(0,0,106,0.3)' }}
            >
              otherwine.co.uk
            </a>
          </div>
        </aside>

        {/* ── RIGHT: scrollable content ──────────────────────────── */}
        <main className="lg:ml-[360px] flex-1">

          {/* Mobile: logo + form above content */}
          <div className="lg:hidden px-6 pt-28 pb-10">
            <video autoPlay loop muted playsInline style={{ width: '180px' }}>
              <source src="/logo-animated-v3.mp4" type="video/mp4" />
            </video>
            <div className="mt-1 mb-6">
              <span className="capsules-wordmark-red" style={{ fontSize: '2rem' }}>Capsule 01</span>
            </div>

            <div className="mb-6" style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
              {STATS.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,106,0.1)' }}>
                  <span className="text-xs" style={{ color: 'rgba(0,0,106,0.5)' }}>{label}</span>
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--blue)' }}>{value}</span>
                </div>
              ))}
            </div>
            <RegistrationForm minimal />
          </div>

          {/* ── Section 1: Hook — video background ──────────────── */}
          <section
            className="relative flex items-end min-h-screen px-10 py-16"
            style={{ backgroundColor: '#1a1208' }}
          >
            {/* Placeholder: replace with <video> of vineyard footage */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg, #2c1a0e 0%, #0d1a0a 100%)', opacity: 0.95 }}
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>
                [ Video: Vineyard footage — to be replaced ]
              </p>
            </div>

            <div className="relative z-10 max-w-lg">
              <p className="text-2xl font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.9)' }}>
                In 2023 a Berber tribe in Meknes, Morocco took the finest Grenache
                grapes from their harvest, and worked with French winemakers to make
                a one of a kind amphora aged wine.
              </p>
              <p className="mt-6 text-2xl font-light" style={{ color: 'var(--cream)' }}>
                480 bottles remain. One per person.
              </p>
            </div>
          </section>

          {/* ── Section 2: What you get — image led ─────────────── */}
          <section className="px-10 py-20" style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
            <p className="text-xs tracking-widest uppercase mb-10" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
              What you get
            </p>

            {/* Image grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: 'Amphora-aged Grenache', sub: '1 bottle · the red' },
                { label: 'Pale gris rosé', sub: '2 bottles · from the same estate' },
                { label: 'Estate olive oil', sub: '1 vial · cold-pressed' },
              ].map(({ label, sub }) => (
                <div key={label}>
                  {/* Image placeholder — swap in product photography */}
                  <div
                    className="w-full mb-3 flex items-center justify-center"
                    style={{
                      aspectRatio: '3/4',
                      backgroundColor: 'rgba(0,0,106,0.05)',
                      border: '1px dashed rgba(0,0,106,0.15)',
                    }}
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
              £89 including delivery.
            </p>
            <p className="mt-2 text-sm font-light" style={{ color: 'rgba(0,0,106,0.6)' }}>
              Two bottles of pale gris rosé, one bottle of the amphora-aged red,
              and a small vial of their olive oil. That&apos;s it.
            </p>
            <p className="mt-4 text-sm" style={{ color: 'rgba(0,0,106,0.45)' }}>
              <Link href="/the-wine" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                About the wine →
              </Link>
            </p>
          </section>

          {/* ── Section 3: The ballot ────────────────────────────── */}
          <section
            className="relative px-10 py-20 min-h-[50vh] flex flex-col justify-center"
            style={{ backgroundColor: '#0e1a12', borderTop: '1px solid rgba(0,0,106,0.1)' }}
          >
            {/* Placeholder: second vineyard video */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #0e1a12 0%, #1a0e08 100%)', opacity: 0.98 }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.1)', letterSpacing: '0.2em' }}>
                [ Video: Winemaker footage — to be replaced ]
              </p>
            </div>

            <div className="relative z-10 max-w-lg">
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
                The ballot
              </p>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,248,0.8)' }}>
                We&apos;re allocating by ballot to give everyone an equal shot. Register
                and if you&apos;re drawn on 9 June, you&apos;ll get a checkout link and
                48 hours to complete your purchase. Ballot closes 8 June.
              </p>
              <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,248,0.4)' }}>
                <Link href="/how-it-works" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
                  How it works →
                </Link>
              </p>
            </div>
          </section>

          {/* ── Footer ──────────────────────────────────────────── */}
          <footer
            className="px-10 py-6 text-xs"
            style={{ borderTop: '1px solid rgba(0,0,106,0.1)', color: 'rgba(0,0,106,0.35)' }}
          >
            <div className="flex justify-between items-center">
              <p>One entry per person. Ballot closes 8 June.</p>
              <a href="https://otherwine.co.uk" target="_blank" rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70">
                otherwine.co.uk
              </a>
            </div>
          </footer>

        </main>
      </div>
    </div>
  )
}
