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

const rowText = {
  fontFamily: 'Vulf Sans, sans-serif',
  fontSize: 'clamp(14px, 1.16vw, 20px)',
  color: 'var(--blue)',
  letterSpacing: '-0.2px',
  lineHeight: 1.55,
  margin: 0,
}

function AccordionSection({ label, items, firstOpen = false }: {
  label: string
  items: [string, string][]
  firstOpen?: boolean
}) {
  return (
    <div style={{ marginBottom: '1.74vw' }}>
      <p style={{ ...rowText, fontWeight: 300, textTransform: 'uppercase', paddingLeft: '2.26vw' }}>
        {label}
      </p>
      <div style={{ borderBottom: '2.22px solid var(--blue)' }}>
        {items.map(([q, a], idx) => (
          <details
            key={q}
            open={idx === 0 && firstOpen}
            style={{ borderTop: '2.22px solid var(--blue)' }}
          >
            <summary style={{ display: 'flex', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ ...rowText, fontWeight: 400, flex: '0 0 50%', paddingLeft: '2.26vw' }}>
                {q}
              </span>
              <span className="faq-toggle" style={{ ...rowText, fontWeight: 400, flex: '0 0 50%' }}>
                +
              </span>
            </summary>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '0 0 50%' }} />
              <p style={{ ...rowText, fontWeight: 300, flex: '0 0 50%', lineHeight: 1.35, paddingBottom: '0.87vw' }}>
                {a}
              </p>
            </div>
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

      {/* Intro text */}
      <div style={{
        paddingTop: 'clamp(5rem, 10.62vw, 12rem)',
        paddingBottom: 'clamp(2rem, 5.12vw, 6rem)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(14px, 1.16vw, 20px)',
          color: 'var(--blue)',
          lineHeight: 1.29,
          letterSpacing: '0.2px',
          margin: '0 auto',
        }}>
          Everything we&apos;ve been asked. If something&apos;s missing,{' '}
          <br />
          email capsules@otherwine.co.uk.
        </p>
      </div>

      {/* Yellow accordion box */}
      <div style={{
        backgroundColor: 'var(--yellow)',
        marginLeft: '20.17vw',
        marginRight: '20.17vw',
        marginBottom: 'clamp(3rem, 8vw, 10rem)',
        paddingTop: '1.21vw',
        paddingBottom: '2.37vw',
      }}>
        <AccordionSection label="General" items={GENERAL} firstOpen />
        <AccordionSection label="The Ballot" items={BALLOT} />
      </div>

      {/* Sunflower decoration */}
      <img
        src="/sunflower.svg"
        alt=""
        style={{
          position: 'absolute',
          right: '6.66vw',
          bottom: '20.34vw',
          width: '6.48vw',
          height: 'auto',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
