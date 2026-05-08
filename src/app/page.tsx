import Nav from '@/components/Nav'
import RegistrationForm from '@/components/RegistrationForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex flex-col px-6 md:px-16 pt-32 pb-24 w-full">

        {/* Animated logo — centred */}
        <div className="flex justify-center mb-16">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '260px' }}
          >
            <source src="/logo-animated-v2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Two-column: label + hook */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-16">

          {/* Left: small label */}
          <div className="sm:w-40 flex-shrink-0 pt-1">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: 'var(--red)', letterSpacing: '0.16em' }}
            >
              Capsule 01
            </p>
          </div>

          {/* Right: hook + form */}
          <div className="flex-1 max-w-xl">
            <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--blue)' }}>
              In 2023 a Berber tribe in Meknes, Morocco took the finest Grenache
              grapes from their harvest, and worked with French winemakers to make
              a one of a kind amphora aged wine.
            </p>
            <p className="mt-4 text-lg font-light" style={{ color: 'var(--blue)' }}>
              480 bottles remain. One per person.
            </p>

            {/* Registration */}
            <div id="register" className="mt-10">
              <RegistrationForm minimal />
            </div>
          </div>

        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }} />

      {/* ── The allocation ────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-16 px-6 md:px-16 py-20 w-full">

        <div className="sm:w-40 flex-shrink-0 pt-1">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            The ballot
          </p>
        </div>

        <div className="flex-1 max-w-xl">
          <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(0,0,106,0.7)' }}>
            We&apos;re allocating by ballot to give everyone an equal shot. Register above
            and if you&apos;re drawn on 9 June, you&apos;ll get a checkout link and 48 hours
            to purchase. Ballot closes 8 June.
          </p>
          <p className="mt-4 text-sm" style={{ color: 'rgba(0,0,106,0.45)' }}>
            <Link href="/how-it-works" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
              How it works →
            </Link>
          </p>
        </div>

      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }} />

      {/* ── The box ───────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-16 px-6 md:px-16 py-20 w-full">

        <div className="sm:w-40 flex-shrink-0 pt-1">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            What you get
          </p>
        </div>

        <div className="flex-1 max-w-xl">
          <p className="text-base font-light leading-relaxed" style={{ color: 'rgba(0,0,106,0.7)' }}>
            Two bottles of pale gris rosé, one bottle of the amphora-aged red from
            the same estate, and a small vial of their olive oil. That&apos;s it.
          </p>
          <p className="mt-6 text-base font-medium" style={{ color: 'var(--blue)' }}>
            £89 including delivery.
          </p>
          <p className="mt-4 text-sm" style={{ color: 'rgba(0,0,106,0.45)' }}>
            <Link href="/the-wine" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
              About the wine →
            </Link>
          </p>
        </div>

      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-16 py-6 text-xs mt-auto"
        style={{ borderTop: '1px solid rgba(0,0,106,0.1)', color: 'rgba(0,0,106,0.35)' }}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p>One entry per person. Ballot closes 8 June.</p>
          <a
            href="https://otherwine.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            otherwine.co.uk
          </a>
        </div>
      </footer>
    </main>
  )
}
