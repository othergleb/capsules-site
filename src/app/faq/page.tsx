import Nav from '@/components/Nav'

export const metadata = { title: 'FAQ — Capsules by OTHER' }

const GENERAL: [string, string][] = [
  ['What is Capsules?', 'Capsules is a limited edition wine series by OTHER. Each Capsule is a single wine, sold in small quantities through a members-only ballot.'],
  ['How do I register?', 'Enter your email on the home page. You\'ll receive a confirmation and your name enters the ballot.'],
  ['Is there a cost to register?', 'No. Registration is free. You only pay if you\'re allocated wine in the ballot.'],
  ['Can I register more than once?', 'No — one email, one entry.'],
  ['When does Capsule 01 launch?', 'The ballot runs on 14 June 2026. Registered members will be notified by email.'],
  ['Will there be future Capsules?', 'Yes. Members who purchase Capsule 01 get priority access to Capsule 02 and beyond.'],
  ['Who is OTHER?', 'OTHER is a wine company focused on distinctive, low-intervention wines. Learn more at otherwine.co.uk.'],
  ['How do I contact you?', 'Email capsules@otherwine.co.uk for anything not covered here.'],
]

const BALLOT: [string, string][] = [
  ['How does the ballot work?', 'Once the ballot runs on 14 June, a random draw determines which members can purchase. You\'ll receive a personal checkout link by email if selected.'],
  ['How long do I have to purchase?', 'You have 48 hours from the moment your allocation email is sent. After that, your spot passes to the next person.'],
  ['What if I am not allocated?', 'You\'ll be on the waitlist. If any allocated members don\'t purchase within 48 hours, the offer passes down the list.'],
  ['Does inviting a Companion affect my chances?', 'Yes — companions are linked. If you\'re allocated, your companion is too.'],
]

function AccordionSection({ label, items }: { label: string; items: [string, string][] }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 300,
        fontSize: 'clamp(0.6rem, 0.75vw, 13px)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--blue)',
        marginBottom: '0.5rem',
      }}>
        {label}
      </p>
      <div style={{ borderTop: '1.5px solid var(--blue)' }}>
        {items.map(([q, a]) => (
          <details key={q} style={{ borderBottom: '1.5px solid var(--blue)' }}>
            <summary style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.85rem 0',
              cursor: 'pointer',
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(0.8rem, 0.95vw, 16px)',
              color: 'var(--blue)',
              userSelect: 'none',
            }}>
              <span>{q}</span>
              <span className="faq-toggle" style={{ fontSize: '1.3rem', fontWeight: 300 }}>+</span>
            </summary>
            <p style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.75rem, 0.9vw, 15px)',
              color: 'var(--blue)',
              lineHeight: 1.65,
              padding: '0.25rem 0 1rem',
              maxWidth: '520px',
            }}>
              {a}
            </p>
          </details>
        ))}
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div style={{
      backgroundColor: 'var(--cream)',
      color: 'var(--blue)',
      minHeight: '100dvh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Nav />

      {/* Header */}
      <div style={{
        paddingTop: 'clamp(5rem, 9vw, 10rem)',
        paddingBottom: 'clamp(1.5rem, 3vw, 52px)',
        textAlign: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}>
        <p style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.4vw, 24px)',
          color: 'var(--blue)',
          lineHeight: 1.4,
          maxWidth: '580px',
          margin: '0 auto',
        }}>
          Everything we&apos;ve been asked. If something&apos;s missing,{' '}
          email capsules@otherwine.co.uk.
        </p>
      </div>

      {/* Yellow accordion box */}
      <div style={{
        backgroundColor: 'var(--yellow)',
        maxWidth: '820px',
        marginLeft: 'clamp(2rem, 16.4vw, 284px)',
        marginRight: 'clamp(2rem, 5vw, 4rem)',
        marginBottom: 'clamp(5rem, 12vw, 13rem)',
        padding: 'clamp(1.5rem, 3vw, 52px) clamp(1.5rem, 3.5vw, 60px)',
      }}>
        <AccordionSection label="General" items={GENERAL} />
        <AccordionSection label="The Ballot" items={BALLOT} />
      </div>

      {/* Sunflower decoration */}
      <img
        src="/figma/sunflower.svg"
        alt=""
        style={{
          position: 'absolute',
          right: 'clamp(-1rem, -1.5vw, -1.5rem)',
          bottom: 'clamp(5rem, 15vw, 15rem)',
          width: 'clamp(80px, 8vw, 138px)',
          height: 'auto',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
