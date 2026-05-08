'use client'

import { useState } from 'react'

export default function BallotModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger — "+" button sits at the right edge of the left sidebar */}
      <button
        onClick={() => setOpen(true)}
        aria-label="How the ballot works"
        className="flex items-center justify-center hover:opacity-70 transition-opacity"
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgba(0,0,106,0.25)',
          borderRadius: '50%',
          color: 'var(--blue)',
          fontFamily: 'Vulf Sans, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 300,
          cursor: 'pointer',
          backgroundColor: 'transparent',
          flexShrink: 0,
        }}
      >
        +
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,106,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={() => setOpen(false)}
        >
          {/* Modal panel */}
          <div
            className="relative w-full max-w-md mx-6 p-8"
            style={{ backgroundColor: 'var(--cream)', borderRadius: '2px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 hover:opacity-50 transition-opacity text-lg"
              style={{ color: 'var(--blue)', fontFamily: 'Vulf Sans, sans-serif', fontWeight: 300 }}
            >
              ×
            </button>

            <p
              className="text-xs tracking-widest uppercase mb-5"
              style={{ color: 'var(--red)', letterSpacing: '0.16em' }}
            >
              How it works
            </p>

            <p className="text-base font-light leading-relaxed mb-6" style={{ color: 'var(--blue)' }}>
              The ballot is open to anyone. Register with your email — one entry per person.
              On 9 June we draw the allocation at random and notify everyone by email.
            </p>

            <ol className="space-y-4 mb-8">
              {[
                ['Register', 'Enter your email in the left panel. You'll receive a member number immediately.'],
                ['Ballot runs — 9 June', 'We draw at random. Everyone hears the same day.'],
                ['48-hour window', 'If you're drawn, you get a checkout link. 48 hours to purchase.'],
                ['Box ships', 'Your amphora rosé is on its way.'],
              ].map(([step, desc], i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="flex-shrink-0 text-xs font-medium"
                    style={{ color: 'var(--red)', paddingTop: '2px' }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--blue)' }}>{step}</p>
                    <p className="text-sm font-light mt-0.5" style={{ color: 'rgba(0,0,106,0.6)' }}>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-xs font-light" style={{ color: 'rgba(0,0,106,0.4)' }}>
              Ballot closes 8 June. One entry per person. £89 including delivery.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
