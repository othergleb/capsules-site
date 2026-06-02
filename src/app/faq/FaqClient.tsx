'use client'

import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const GENERAL: [string, string][] = [
  ['What is Capsules?', 'Capsules is a limited edition wine series by OTHER. Each Capsule is a single wine, sold in small quantities through a members-only ballot.'],
  ['How do I register?', "Enter your email on the home page. You'll receive a confirmation and your name enters the ballot."],
  ['Is there a cost to register?', "No. Registration is free. You only pay if you're allocated wine in the ballot."],
  ['Can I register more than once?', 'No — one email, one entry.'],
  ['When does Capsule 01 launch?', 'The ballot runs on 14 June 2026. Registered members will be notified by email.'],
  ['Will there be future Capsules?', 'Yes. Members who purchase Capsule 01 get priority access to Capsule 02 and beyond.'],
  ['Who is OTHER?', 'OTHER is a wine company focused on distinctive, low-intervention wines. Learn more at otherwine.co.uk.'],
  ['How do I contact you?', 'Email capsules@otherwine.co.uk for anything not covered here.'],
]

const BALLOT: [string, string][] = [
  ['How does the ballot work?', "Once the ballot runs on 14 June, a random draw determines which members can purchase. You'll receive a personal checkout link by email if selected."],
  ['How long do I have to purchase?', 'You have 48 hours from the moment your allocation email is sent. After that, your spot passes to the next person.'],
  ['What if I am not allocated?', "You'll be on the waitlist. If any allocated members don't purchase within 48 hours, the offer passes down the list."],
  ['Does inviting a Companion affect my chances?', "Yes — companions are linked. If you're allocated, your companion is too."],
]

const rowText = {
  fontFamily: 'Vulf Sans, sans-serif',
  fontSize: 'clamp(14px, 1.16vw, 20px)',
  color: 'var(--blue)',
  letterSpacing: '-0.2px',
  lineHeight: 1.55,
  margin: 0,
}

function AccordionSection({ label, items, firstOpen = false, mobile = false }: {
  label: string
  items: [string, string][]
  firstOpen?: boolean
  mobile?: boolean
}) {
  const border = mobile ? '1px solid var(--blue)' : '2.22px solid var(--blue)'
  return (
    <div style={{ marginBottom: mobile ? '32px' : '1.74vw' }}>
      <p style={{ ...rowText, fontWeight: 300, textTransform: 'uppercase', paddingLeft: mobile ? '16px' : '2.26vw', fontSize: mobile ? '18px' : undefined }}>
        {label}
      </p>
      <div style={{ borderBottom: border }}>
        {items.map(([q, a], idx) => (
          <details key={q} open={idx === 0 && firstOpen} style={{ borderTop: border }}>
            <summary style={{ display: 'flex', cursor: 'pointer', userSelect: 'none' }}>
              <span style={{ ...rowText, fontWeight: 400, flex: mobile ? '1' : '0 0 50%', paddingLeft: mobile ? '16px' : '2.26vw', fontSize: mobile ? '18px' : undefined, padding: mobile ? '6px 16px' : undefined }}>
                {q}
              </span>
              {!mobile && (
                <span className="faq-toggle" style={{ ...rowText, fontWeight: 400, flex: '0 0 50%' }}>+</span>
              )}
              {mobile && (
                <span className="faq-toggle" style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: '18px', color: 'var(--blue)', padding: '6px 16px', lineHeight: 1 }}>+</span>
              )}
            </summary>
            <div style={{ display: 'flex', padding: mobile ? '4px 16px 12px' : undefined }}>
              {!mobile && <div style={{ flex: '0 0 50%' }} />}
              <p style={{ ...rowText, fontWeight: 300, flex: mobile ? undefined : '0 0 50%', lineHeight: 1.35, paddingBottom: mobile ? undefined : '0.87vw', fontSize: mobile ? '18px' : undefined }}>
                {a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

export default function FaqClient() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div style={{ backgroundColor: '#fffff5', minHeight: '100svh', paddingBottom: '41px', position: 'relative', overflow: 'hidden' }}>

        {/* Large red logo bleeding from top-left */}
        <div style={{ position: 'absolute', left: '-23.15vw', top: '-60.3vw', width: '144.8vw', height: '144.8vw', pointerEvents: 'none', zIndex: 0 }}>
          <img src="/figma/other-logo-red.png" alt="" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Intro */}
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '160px', paddingLeft: '32px', paddingRight: '32px', paddingBottom: '28px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 700, fontSize: '18px', color: '#00006A', lineHeight: '20px', letterSpacing: '0.18px', margin: '0 auto', maxWidth: '330px' }}>
            Everything we&apos;ve been asked.{' '}If something&apos;s missing,{' '}email capsules@otherwine.co.uk.
          </p>
        </div>

        {/* Yellow accordion */}
        <div style={{ backgroundColor: '#EDFF00', margin: '0 11px', position: 'relative', zIndex: 1 }}>
          <AccordionSection label="General"    items={GENERAL} firstOpen mobile />
          <AccordionSection label="The Ballot" items={BALLOT}  mobile />
        </div>

        <MobileNav />
      </div>
    )
  }

  // Desktop layout (unchanged)
  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)', minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <Nav />

      <div style={{ paddingTop: 'clamp(5rem, 10.62vw, 12rem)', paddingBottom: 'clamp(2rem, 5.12vw, 6rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(14px, 1.16vw, 20px)', color: 'var(--blue)', lineHeight: 1.29, letterSpacing: '0.2px', margin: '0 auto' }}>
          Everything we&apos;ve been asked. If something&apos;s missing,{' '}
          <br />
          email capsules@otherwine.co.uk.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--yellow)', marginLeft: '20.17vw', marginRight: '20.17vw', marginBottom: 'clamp(3rem, 8vw, 10rem)', paddingTop: '1.21vw', paddingBottom: '2.37vw' }}>
        <AccordionSection label="General"    items={GENERAL} firstOpen />
        <AccordionSection label="The Ballot" items={BALLOT} />
      </div>

      <img src="/sunflower.svg" alt="" style={{ position: 'absolute', right: '6.66vw', bottom: '20.34vw', width: '6.48vw', height: 'auto', pointerEvents: 'none' }} />
    </div>
  )
}
