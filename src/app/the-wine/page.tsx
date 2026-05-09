import Nav from '@/components/Nav'
import Link from 'next/link'

export const metadata = { title: 'The Wine — Capsules by OTHER' }

export default function TheWinePage() {
  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>

      <Nav backHref="/" />

      {/* ── Hero: portrait image + product details ───────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }} className="grid-cols-1 md:grid-cols-[1fr_1fr]">

        {/* Portrait image */}
        <div
          className="order-1"
          style={{
            position: 'relative',
            minHeight: '60vw',
            overflow: 'hidden',
            backgroundColor: '#1a1208',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1569613946657-4c3f3ff490bb?w=1000&q=80"
            alt="Amphora wine vessel"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.9,
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(10,8,4,0.7) 0%, transparent 100%)',
          }} />
        </div>

        {/* Product details */}
        <div
          className="order-2"
          style={{
            padding: 'clamp(7rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '1px solid rgba(0,0,106,0.08)',
          }}
        >
          <p style={{
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            marginBottom: '1rem',
            fontFamily: 'Vulf Sans, sans-serif',
          }}>
            Capsule 01
          </p>
          <h1
            className="capsules-wordmark"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', marginBottom: '2rem' }}
          >
            The Wine
          </h1>

          {/* Details table */}
          <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)', marginBottom: '2rem' }}>
            {[
              ['Producer', 'Domaine de la Zouina'],
              ['Region', 'Meknes, Morocco'],
              ['Grape', 'Grenache Gris'],
              ['Vintage', '2023'],
              ['Method', 'Amphora aged'],
              ['Format', '75cl · natural cork'],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid rgba(0,0,106,0.1)',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'rgba(0,0,106,0.45)', fontWeight: 300 }}>{label}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--blue)', textAlign: 'right' }}>{val}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--blue)', marginBottom: '0.5rem' }}>
            &pound;89 including delivery
          </p>
          <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(0,0,106,0.55)', lineHeight: 1.6 }}>
            One amphora-aged Grenache gris, two bottles of estate ros&eacute;, and a cold-pressed olive oil vial.
          </p>
        </div>
      </section>

      {/* ── Story: The Origin ────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div style={{ padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
              The Origin
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--blue)' }}>
              Meknes, Morocco
            </h2>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(0,0,106,0.7)', maxWidth: '480px' }}>
              Nestled at the foot of the Middle Atlas mountains, Meknes is one of
              the oldest wine-producing regions in the world. The high altitude and
              dramatic temperature swings between day and night preserve natural
              acidity, giving the wine a freshness that is rare in this latitude.
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(0,0,106,0.7)', maxWidth: '480px', marginTop: '1rem' }}>
              In 2023, a Berber tribe and a team of French winemakers set out to
              make something new from something ancient. Grenache Gris — a pale,
              copper-skinned grape — fermented and aged in clay amphorae, the
              same vessels used across the Mediterranean for thousands of years.
            </p>
          </div>
          <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=900&q=80"
              alt="Wine cellar in Morocco"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── Story: The Method ────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div style={{ aspectRatio: '4/3', overflow: 'hidden' }} className="order-1 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=900&q=80"
              alt="Amphora wine vessel"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div
            className="order-2"
            style={{ padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
              The Method
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--blue)' }}>
              Amphora aged
            </h2>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(0,0,106,0.7)', maxWidth: '480px' }}>
              The wine rests in unlined clay vessels — qvevri-style amphorae —
              buried in the cellar floor. Clay is porous enough to allow a slow
              micro-oxidation but neutral enough to leave the fruit unmasked.
              The result has a texture and minerality that glass and steel cannot replicate.
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(0,0,106,0.7)', maxWidth: '480px', marginTop: '1rem' }}>
              No fining. No filtration. 480 bottles filled by hand.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Box ──────────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid rgba(0,0,106,0.1)',
          padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.16em', color: 'var(--red)', textTransform: 'uppercase', marginBottom: '2.5rem', fontFamily: 'Vulf Sans, sans-serif' }}>
          What is in the box
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {[
            {
              label: 'Amphora Aged Grenache',
              desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
              sub: '1 bottle · 75cl',
              img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
              alt: 'Wine bottle',
            },
            {
              label: 'Estate Rosé',
              desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.',
              sub: '2 bottles · 75cl each',
              img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
              alt: 'Rosé wine',
            },
            {
              label: 'Estate Olive Oil',
              desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.',
              sub: '1 vial · 100ml',
              img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
              alt: 'Olive oil',
            },
          ].map(({ label, desc, sub, img, alt }) => (
            <div key={label}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', marginBottom: '1rem' }}>
                <img src={img} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--blue)', marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(0,0,106,0.6)', lineHeight: 1.6, marginBottom: '0.5rem' }}>{desc}</p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(0,0,106,0.4)', letterSpacing: '0.06em' }}>{sub}</p>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,106,0.1)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>&pound;89 including delivery.</p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid rgba(0,0,106,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Link
          href="/"
          style={{ fontSize: '0.8rem', color: 'rgba(0,0,106,0.5)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          &larr; Back to Capsules
        </Link>
        <a
          href="https://otherwine.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.8rem', color: 'rgba(0,0,106,0.35)', textDecoration: 'underline', textUnderlineOffset: '2px' }}
        >
          otherwine.co.uk
        </a>
      </footer>
    </div>
  )
}
