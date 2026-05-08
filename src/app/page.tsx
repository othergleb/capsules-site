import Nav from '@/components/Nav'
import RegistrationForm from '@/components/RegistrationForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      {/* ── Animated logo + Capsule 01 — centred ──────────────── */}
      <section className="flex flex-col items-center pt-28 pb-12 px-6">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: 'clamp(280px, 40vw, 560px)', height: 'auto' }}
        >
          <source src="/logo-animated-v3.mp4" type="video/mp4" />
        </video>
        <div className="mt-2">
          <span
            className="capsules-wordmark-red"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
          >
            Capsule 01
          </span>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }} />

      {/* ── Hook + form ───────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-16 px-6 md:px-16 py-16 w-full">
        <div className="sm:w-40 flex-shrink-0 pt-1">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            Capsule 01
          </p>
        </div>
        <div className="flex-1 max-w-2xl">
          <p className="text-xl font-light leading-relaxed" style={{ color: 'var(--blue)' }}>
            In 2023 a Berber tribe in Meknes, Morocco took the finest Grenache
            grapes from their harvest, and worked with French winemakers to make
            a one of a kind amphora aged wine.
          </p>
          <p className="mt-5 text-xl font-light" style={{ color: 'var(--blue)' }}>
            480 bottles remain. One per person.
          </p>
          <div id="register" className="mt-10">
            <RegistrationForm minimal />
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }} />

      {/* ── The ballot ────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-16 px-6 md:px-16 py-16 w-full">
        <div className="sm:w-40 flex-shrink-0 pt-1">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            The ballot
          </p>
        </div>
        <div className="flex-1 max-w-2xl">
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

      {/* ── What's in the box ─────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-6 sm:gap-16 px-6 md:px-16 py-16 w-full">
        <div className="sm:w-40 flex-shrink-0 pt-1">
          <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--red)', letterSpacing: '0.16em' }}>
            What you get
          </p>
        </div>
        <div className="flex-1 max-w-2xl">
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
        <div className="flex justify-between items-center">
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
