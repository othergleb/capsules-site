import Nav from '@/components/Nav'
import RegistrationForm from '@/components/RegistrationForm'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex flex-col px-6 md:px-10 pt-36 pb-24 max-w-6xl mx-auto w-full">

        {/* OTHER logo — large hero version */}
        <Image
          src="/logo-other.svg"
          alt="OTHER"
          width={280}
          height={45}
          priority
          className="mb-10"
        />

        {/* Capsule 01 wordmark */}
        <h1
          className="capsules-wordmark-red"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
        >
          Capsule 01
        </h1>

        {/* Headline */}
        <p
          className="mt-10 max-w-2xl text-2xl font-light leading-snug"
          style={{ color: 'var(--blue)', letterSpacing: '-0.01em' }}
        >
          480 bottles of pale Moroccan rosé.
          Maximum one bottle per person.
        </p>

        {/* Subheading */}
        <div
          className="mt-8 max-w-xl text-base font-light leading-relaxed"
          style={{ color: 'rgba(0,0,106,0.6)' }}
        >
          <p>
            In 2023, a Berber tribe in Meknes, Morocco collaborated with world-class
            French winemakers to create a one-of-a-kind wine. Taking carefully selected
            Grenache grapes from their harvest and ageing them in clay amphora, together
            they produced a gris wine — a rosé so pale it enters a new classification.
          </p>
          <p className="mt-4">
            Only 480 bottles remain in existence. They&apos;re all for sale via an
            allocation ballot on the 9th of June.
          </p>
          <p className="mt-4">
            Join Capsule 01 below to enter the allocation.
          </p>
        </div>

        {/* Register CTA */}
        <div id="register" className="mt-12 w-full max-w-lg">
          <RegistrationForm />
        </div>

      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.12)' }} />

      {/* ── How the ballot works ──────────────────────────────── */}
      <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--red)', letterSpacing: '0.18em' }}>
          The allocation
        </p>
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--blue)' }}>
          Why a ballot?
        </h2>
        <p className="max-w-xl text-base font-light leading-relaxed" style={{ color: 'rgba(0,0,106,0.65)' }}>
          We&apos;re allocating the amphora rosé by ballot to give everyone an equal shot.
          Register above — and if you&apos;re drawn on the 9th of June, you&apos;ll get a checkout
          link and 48 hours to purchase your box.
        </p>

        {/* Steps */}
        <ol className="mt-10 space-y-5 max-w-lg">
          {[
            ['Register', 'Enter your email above. You get a member number and a personal link.'],
            ['Ballot runs on 9 June', "OTHER draws the allocation. You'll hear by email the same day."],
            ['48-hour window', "If you're drawn, you get a checkout link. 48 hours to complete your purchase."],
            ['Box ships', 'Your amphora rosé is on its way.'],
          ].map(([step, desc], i) => (
            <li key={i} className="flex gap-5 items-start">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ border: '1px solid var(--red)', color: 'var(--red)' }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium" style={{ color: 'var(--blue)' }}>{step}</p>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(0,0,106,0.55)' }}>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,0,106,0.12)' }} />

      {/* ── What's in the box ─────────────────────────────────── */}
      <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto w-full">
        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--red)', letterSpacing: '0.18em' }}>
          What you get
        </p>
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--blue)' }}>
          The box
        </h2>
        <p className="max-w-xl text-base font-light leading-relaxed" style={{ color: 'rgba(0,0,106,0.65)' }}>
          Each box includes a bottle of amphora-aged Grenache, two bottles of Syrah rosé
          from the same vineyard, and a vial of olive oil made from olives grown on the estate.
        </p>

        {/* Fact strip */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 max-w-lg">
          {[
            ['3 bottles', 'Amphora Grenache · Syrah Rosé × 2'],
            ['+ olive oil', 'Estate-grown, cold-pressed'],
            ['£85', 'Including delivery to UK mainland'],
          ].map(([value, label]) => (
            <div key={value} className="flex-1" style={{ borderTop: '1px solid rgba(0,0,106,0.2)', paddingTop: '1rem' }}>
              <p className="text-2xl font-bold" style={{ color: 'var(--red)' }}>{value}</p>
              <p className="text-sm mt-1 font-light" style={{ color: 'rgba(0,0,106,0.55)' }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 text-sm" style={{ color: 'rgba(0,0,106,0.5)' }}>
          <Link href="/the-wine" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            About the wine
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="/how-it-works" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            Full ballot details
          </Link>
          <span className="hidden sm:block">·</span>
          <Link href="/faq" className="hover:opacity-100 transition-opacity underline underline-offset-4">
            FAQ
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer
        className="px-6 md:px-10 py-6 text-xs"
        style={{ borderTop: '1px solid rgba(0,0,106,0.12)', color: 'rgba(0,0,106,0.4)' }}
      >
        <p>
          Ballot closes 8th June, one entry per person.{' '}
          <a
            href="https://otherwine.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            A project by OTHER.
          </a>
        </p>
      </footer>
    </main>
  )
}
