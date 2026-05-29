'use client'

import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from '@/components/MobileNav'
import { useIsMobile } from '@/hooks/useIsMobile'

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

export default function HowItWorksClient() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div style={{ backgroundColor: 'var(--cream)', minHeight: '100dvh', paddingBottom: '41px' }}>

        {/* Logo header */}
        <Link href="/" style={{ display: 'block', padding: '20px 16px 16px', textAlign: 'center' }}>
          <img src="/figma/other-logo-yellow.png" alt="OTHER" style={{ height: '44px', width: 'auto' }} />
        </Link>

        {/* Intro */}
        <div style={{ padding: '24px 24px 32px', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--blue)',
            lineHeight: 1.4,
            letterSpacing: '0.2px',
          }}>
            We allocate by ballot to give everyone an equal shot.{' '}
            Register once, and if you are drawn on 14 June you will receive a checkout link with 48 hours to complete your purchase.
          </p>
        </div>

        {/* Step cards — stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', padding: '0 16px 24px' }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{
              border: '2.22px solid var(--red)',
              borderRadius: '40px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              marginTop: i > 0 ? '-2.22px' : 0,
              backgroundColor: 'var(--cream)',
            }}>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 300,
                fontSize: '14px',
                color: 'var(--red)',
                letterSpacing: '-0.75px',
                textTransform: 'uppercase',
                lineHeight: 2,
                margin: 0,
              }}>
                Step {step.num}
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: 'var(--blue)',
                letterSpacing: '0.2px',
                textTransform: 'uppercase',
                lineHeight: 1.3,
                margin: '0 0 8px',
              }}>
                {step.title}
              </p>
              <p style={{
                fontFamily: 'Vulf Sans, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: 'var(--blue)',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <MobileNav />
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
          We allocate by ballot to give everyone an equal shot.{' '}
          <br />
          Register once, and if you are drawn on 14 June you will receive a checkout link with 48 hours to complete your purchase.
        </p>
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
