import Nav from '@/components/Nav'

export const metadata = { title: 'How it Works — Capsules by OTHER' }

const STEPS = [
  {
    num: '1',
    title: 'Register',
    body: 'Enter your email address. No payment details, no account. You will receive a confirmation and your name enters the ballot.',
  },
  {
    num: '2',
    title: 'The Ballot',
    body: 'On 14 June, we run the ballot. Every registered email has an equal chance. There are 480 bottles and one per person. The draw is final.',
  },
  {
    num: '3',
    title: '48-Hour Window',
    body: 'If you are drawn, you receive a personal checkout link by email. You have 48 hours to complete your purchase. After that the allocation moves on.',
  },
  {
    num: '4',
    title: 'Your Box Ships',
    body: 'Your Capsule 01 box ships directly to you — one amphora-aged Grenache, two estate rosés, and a vial of cold-pressed olive oil. Delivery included.',
  },
]

export default function HowItWorksPage() {
  return (
    <div style={{
      backgroundColor: 'var(--cream)',
      color: 'var(--blue)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
    }}>
      <Nav />

      {/* Intro paragraph — pushed down to roughly the same vertical position as in Figma */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 'clamp(6rem, 23vw, 24rem)',
        paddingLeft: 'clamp(2rem, 5vw, 4rem)',
        paddingRight: 'clamp(2rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2rem, 5vw, 5rem)',
      }}>
        <p style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.5vw, 26px)',
          color: 'var(--blue)',
          textAlign: 'center',
          lineHeight: 1.45,
          maxWidth: '640px',
        }}>
          We allocate by ballot to give everyone an equal shot.
          Register once, and if you are drawn on 14 June you will receive
          a checkout link with 48 hours to complete your purchase.
        </p>
      </div>

      {/* Step cards — pinned to bottom */}
      <div style={{
        marginTop: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        padding: '0 clamp(2rem, 4.6vw, 80px) clamp(2rem, 2.3vw, 40px)',
      }}>
        {STEPS.map(step => (
          <div key={step.num} style={{
            border: '2px solid var(--red)',
            borderRadius: 'clamp(1rem, 2.1vw, 36px)',
            padding: 'clamp(1.5rem, 2.8vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.6rem, 0.8vw, 14px)',
              color: 'var(--red)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Step {step.num}
            </p>
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.16vw, 20px)',
              color: 'var(--blue)',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
            }}>
              {step.title}
            </p>
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 0.95vw, 16px)',
              color: 'var(--blue)',
              lineHeight: 1.6,
            }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
