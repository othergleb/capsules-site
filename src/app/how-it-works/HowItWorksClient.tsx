'use client'

import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

const STEPS = [
  {
    num: '1',
    title: 'Register',
    body: "Enter your email address. No payment details, no account. You will receive a confirmation and you'll be on the list.",
  },
  {
    num: '2',
    title: '23 June: Purchase Day',
    body: "On the 23rd June, we'll email a purchase link to all registered members. Capsule 01 is £89. 480 are available, first come first served.",
  },
  {
    num: '4',
    title: 'Your Box Ships',
    body: 'Your Capsule 01 box ships directly to you — one amphora-aged Grenache, two estate rosés, and a vial of cold-pressed olive oil. Delivery included.',
  },
]

export default function HowItWorksClient() {
  const isMobile = useIsMobile()

  if (isMobile) {
    const T: React.CSSProperties = {
      fontFamily: 'Vulf Sans, sans-serif',
      fontSize: '18px',
      color: '#00006A',
      lineHeight: '20px',
      letterSpacing: '0.18px',
      margin: 0,
    }
    return (
      <div style={{ backgroundColor: '#fffff5', minHeight: '100svh', paddingBottom: '41px', position: 'relative', overflow: 'hidden' }}>

        {/* Large red logo bleeding from top-left */}
        <Link href="/" style={{ position: 'absolute', left: '-23.15vw', top: '-60.3vw', width: '144.8vw', height: '144.8vw', zIndex: 1, display: 'block' }}>
          <img src="/figma/other-logo-red.png" alt="" style={{ width: '100%', height: '100%' }} />
        </Link>

        {/* Intro */}
        <div style={{ position: 'relative', zIndex: 1, paddingTop: '160px', paddingLeft: '32px', paddingRight: '32px', paddingBottom: '32px', textAlign: 'center' }}>
          <p style={{ ...T, fontWeight: 700, maxWidth: '330px', margin: '0 auto' }}>
            Capsules by OTHER are about bringing small-batch wine producers to the fore - finding one-off, special wines and making them widely available. Capsule 01, a package from northern Morocco, features an amphora aged grenache - only 480 of which remain in existence.
          </p>
        </div>

        {/* Step cards */}
        <div style={{ position: 'relative', zIndex: 1, padding: '0 11px 32px' }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{
              border: '1px solid #ff3c00',
              borderRadius: '50px',
              padding: '21px 22px',
              textAlign: 'center',
              marginTop: i > 0 ? '-1px' : 0,
              backgroundColor: '#fffff5',
            }}>
              <p style={{ ...T, fontWeight: 300, color: '#ff3c00', letterSpacing: '-0.54px', textTransform: 'uppercase' }}>
                Step {step.num}
              </p>
              <p style={{ ...T, fontWeight: 700, textTransform: 'uppercase', margin: '20px 0' }}>
                {step.title}
              </p>
              <p style={{ ...T, fontWeight: 400 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Email */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 32px 40px' }}>
          <a href="mailto:info@otherwine.co.uk" style={{ ...T, fontWeight: 400, color: '#00006A', textDecoration: 'none' }}>info@otherwine.co.uk</a>
        </div>

        <MobileNav bg="#ff3c00" />
      </div>
    )
  }

  // Desktop layout (unchanged)
  const textBase = {
    fontFamily: 'Vulf Sans, sans-serif',
    fontSize: 'clamp(14px, 1.33vw, 23px)',
    color: 'var(--blue)',
    letterSpacing: '0.23px',
    lineHeight: 1.29,
    margin: 0,
  }

  return (
    <div style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)', display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <Nav />

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'clamp(6rem, 23vw, 24rem)', paddingLeft: 'clamp(2rem, 5vw, 4rem)', paddingRight: 'clamp(2rem, 5vw, 4rem)', paddingBottom: 'clamp(2rem, 5vw, 5rem)' }}>
        <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(14px, 1.16vw, 20px)', color: 'var(--blue)', textAlign: 'center', lineHeight: 1.29, letterSpacing: '0.2px', maxWidth: '640px' }}>
          Capsules by OTHER are about bringing small-batch wine producers to the fore - finding one-off, special wines and making them widely available. Capsule 01, a package from northern Morocco, features an amphora aged grenache - only 480 of which remain in existence.
        </p>
      </div>

      <div style={{ textAlign: 'center', paddingBottom: 'clamp(1rem, 2vw, 32px)' }}>
        <a href="mailto:info@otherwine.co.uk" style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(14px, 1.16vw, 20px)', color: 'var(--blue)', textDecoration: 'none', letterSpacing: '0.2px' }}>info@otherwine.co.uk</a>
      </div>

      <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, padding: '0 clamp(10px, 1.04vw, 18px) clamp(1.5rem, 2.3vw, 40px)' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{ border: '2.22px solid var(--red)', borderRadius: 'clamp(40px, 4.63vw, 80px)', padding: 'clamp(28px, 3.15vw, 54px) clamp(12px, 1.74vw, 30px) clamp(24px, 3vw, 52px)', display: 'flex', flexDirection: 'column', textAlign: 'center', marginLeft: i > 0 ? '-2.22px' : 0 }}>
            <p style={{ fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(14px, 1.45vw, 25px)', color: 'var(--red)', letterSpacing: '-0.75px', textTransform: 'uppercase', lineHeight: 2.5, margin: 0 }}>Step {step.num}</p>
            <p style={{ ...textBase, fontWeight: 700, textTransform: 'uppercase' }}>{step.title}</p>
            <p style={{ ...textBase, fontWeight: 400 }}>&nbsp;</p>
            <p style={{ ...textBase, fontWeight: 400 }}>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
