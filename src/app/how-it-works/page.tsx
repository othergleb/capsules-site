import PageShell from '@/components/PageShell'
import Link from 'next/link'

export const metadata = { title: 'How it Works — Capsules by OTHER' }

export default function HowItWorksPage() {
  return (
    <PageShell
      label="Capsule 01"
      title="How it Works"
      subtitle="A ballot, a short window, and a companion. Here's the full mechanic."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <Link
          href="/how-it-works/the-ballot"
          className="group p-6 rounded-2xl border transition-colors hover:border-[var(--red)]"
          style={{ borderColor: 'var(--blue)' }}
        >
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ letterSpacing: '0.14em' }}>
            The process
          </p>
          <h2 className="text-xl font-bold">The Ballot</h2>
          <p className="mt-1 text-sm opacity-60">Step by step</p>
        </Link>

        <Link
          href="/how-it-works/the-companion"
          className="group p-6 rounded-2xl border transition-colors hover:border-[var(--red)]"
          style={{ borderColor: 'var(--blue)' }}
        >
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ letterSpacing: '0.14em' }}>
            The pairing
          </p>
          <h2 className="text-xl font-bold">The Companion</h2>
          <p className="mt-1 text-sm opacity-60">Linked fate mechanic</p>
        </Link>
      </div>

      {/* Simplified step overview */}
      <ol className="mt-12 space-y-6 max-w-lg">
        {[
          ['Register', 'Enter your email. You get a member number and a personal link.'],
          ['Invite a companion', 'Send your unique link to someone to join alongside you.'],
          ['Ballot runs', "OTHER allocates members. You'll hear within the ballot window."],
          ['48-hour window', 'If allocated, you get a Shopify checkout link. 48 hours to complete purchase.'],
          ['Done', 'Your box ships. Companion\'s fate is linked to yours.'],
        ].map(([step, desc], i) => (
          <li key={i} className="flex gap-5">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ backgroundColor: 'var(--blue)', color: 'var(--cream)' }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{step}</p>
              <p className="text-sm opacity-60 mt-0.5">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageShell>
  )
}
