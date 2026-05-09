import Nav from '@/components/Nav'
import Link from 'next/link'

export const metadata = { title: 'How it Works — Capsules by OTHER' }

const STEPS = [
  {
    num: '01',
    title: 'Register',
    body: 'Enter your email address. No payment details, no account. You will receive a confirmation and your name enters the ballot.',
    img: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=900&q=80',
    alt: 'Person writing at a desk',
  },
  {
    num: '02',
    title: 'The Ballot',
    body: 'On 9 June, we run the ballot. Every registered email has an equal chance. There are 480 bottles and one per person. The draw is final.',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80',
    alt: 'Wine bottles lined up',
  },
  {
    num: '03',
    title: '48-Hour Window',
    body: 'If you are drawn, you receive a personal checkout link by email. You have 48 hours to complete your purchase. After that the allocation moves on.',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=900&q=80',
    alt: 'Wine being poured',
  },
  {
    num: '04',
    title: 'Your Box Ships',
    body: 'Your Capsule 01 box ships directly to you — one amphora-aged Grenache, two estate rosés, and a vial of cold-pressed olive oil. Delivery included.',
    img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80',
    alt: 'Olive oil and wine on a table',
  },
]

export default function HowItWorksPage() {
  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>

      <Nav initialDark={true} backHref="/" />

      {/* Hero */}
      <section
        data-nav-dark=""
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(6rem, 12vw, 9rem) clamp(1.5rem, 5vw, 4rem) clamp(2.5rem, 5vw, 4rem)',
          overflow: 'hidden',
          backgroundColor: '#0d1208',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=1600&q=80"
          alt="Wine cellar"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,8,0.85) 0%, transparent 65%)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
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
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              color: 'transparent',
              WebkitTextStrokeColor: 'rgba(255,255,248,0.9)',
            }}
          >
            How it Works
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', maxWidth: '700px' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.75, color: 'var(--blue)' }}>
          We allocate by ballot to give everyone an equal shot. Register once,
          and if you are drawn on 9 June you will receive a checkout link with
          48 hours to complete your purchase.
        </p>
      </section>

      {/* Steps */}
      {STEPS.map((step, i) => {
        const isEven = i % 2 === 0
        return (
          <section
            key={step.num}
            style={{ borderTop: '1px solid rgba(0,0,106,0.1)' }}
          >
            <div className={`grid grid-cols-1 md:grid-cols-2`}>
              {/* Text */}
              <div
                className={isEven ? 'order-2 md:order-1' : 'order-2'}
                style={{
                  padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  color: 'var(--red)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  fontFamily: 'Vulf Sans, sans-serif',
                }}>
                  Step {step.num}
                </p>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--blue)',
                  marginBottom: '1.25rem',
                  lineHeight: 1.15,
                }}>
                  {step.title}
                </h2>
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: 'rgba(0,0,106,0.7)',
                  maxWidth: '420px',
                }}>
                  {step.body}
                </p>
              </div>

              {/* Image */}
              <div
                className={isEven ? 'order-1 md:order-2' : 'order-1'}
                style={{ aspectRatio: '4/3', overflow: 'hidden' }}
              >
                <img
                  src={step.img}
                  alt={step.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>
        )
      })}

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
