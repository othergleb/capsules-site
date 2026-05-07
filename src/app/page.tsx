import Nav from '@/components/Nav'
import RegistrationForm from '@/components/RegistrationForm'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">

        {/* Capsule 01 label */}
        <p
          className="text-xs font-medium tracking-widest uppercase mb-8 opacity-60"
          style={{ letterSpacing: '0.18em' }}
        >
          Capsule 01
        </p>

        {/* Capsules wordmark — bold, outlined */}
        <h1
          className="capsules-wordmark"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
        >
          Capsules
        </h1>

        {/* Tagline */}
        <p
          className="mt-8 max-w-sm text-base font-light leading-relaxed opacity-70"
          style={{ letterSpacing: '-0.01em' }}
        >
          A limited edition wine series by OTHER.
          <br />
          One wine. A ballot. A short window to buy.
        </p>

        {/* Register CTA */}
        <div id="register" className="mt-12 w-full max-w-md">
          <RegistrationForm />
        </div>

        {/* Learn more links */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 text-sm opacity-60">
          <Link href="/the-wine" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            About the wine
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="/how-it-works" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            How the ballot works
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="/faq" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            FAQ
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="px-6 py-6 text-center text-xs opacity-40" style={{ borderTop: '1px solid currentColor' }}>
        <p>
          Capsules is a project by{' '}
          <a href="https://otherwine.co.uk" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            OTHER
          </a>
          . Members only.
        </p>
      </footer>
    </main>
  )
}
