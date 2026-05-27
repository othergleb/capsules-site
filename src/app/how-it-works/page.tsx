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

const textBase = {
  fontFamily: 'Vulf Sans, sans-serif',
  fontSize: 'clamp(14px, 1.33vw, 23px)',
  color: 'var(--blue)',
  letterSpacing: '0.23px',
  lineHeight: 1.29,
  margin: 0,
}

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

      {/* Intro paragraph */}
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
          fontSize: 'clamp(14px, 1.16vw, 20px)',
          color: 'var(--blue)',
          textAlign: 'center',
          lineHeight: 1.29,
          letterSpacing: '0.2px',
          maxWidth: '640px',
        }}>
          We allocate by ballot to give everyone an equal shot.{' '}
          <br />
          Register once, and if you are drawn on 14 June you will receive a checkout link with 48 hours to complete your purchase.
        </p>
      </div>

      {/* Step cards — pinned to bottom */}
      <div style={{
        marginTop: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        padding: '0 clamp(10px, 1.04vw, 18px) clamp(1.5rem, 2.3vw, 40px)',
      }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{
            border: '2.22px solid var(--red)',
            borderRadius: 'clamp(40px, 4.63vw, 80px)',
            padding: 'clamp(28px, 3.15vw, 54px) clamp(12px, 1.74vw, 30px) clamp(24px, 3vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            marginLeft: i > 0 ? '-2.22px' : 0,
          }}>
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(14px, 1.45vw, 25px)',
              color: 'var(--red)',
              letterSpacing: '-0.75px',
              textTransform: 'uppercase',
              lineHeight: 2.5,
              margin: 0,
              fontFeatureSettings: "'cv10' 1, 'ss03' 1, 'ss05' 1, 'case' 1, 'ordn' 1, 'dlig' 1",
            }}>
              Step {step.num}
            </p>
            <p style={{ ...textBase, fontWeight: 700, textTransform: 'uppercase' }}>
              {step.title}
            </p>
            <p style={{ ...textBase, fontWeight: 400 }}>&nbsp;</p>
            <p style={{ ...textBase, fontWeight: 400 }}>
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
