import PageShell from '@/components/PageShell'
import Link from 'next/link'

export const metadata = { title: 'FAQ — Capsules by OTHER' }

const generalFAQs = [
  ['What is Capsules?', 'Capsules is a limited edition wine series by OTHER. Each Capsule is a single wine, sold in small quantities through a members-only ballot.'],
  ['How do I register?', 'Enter your email on the home page. You\'ll receive a member number and a personal link to your member page.'],
  ['Is there a cost to register?', 'No. Registration is free. You only pay if you\'re allocated wine in the ballot.'],
  ['Can I register more than once?', 'No — one email, one membership.'],
  ['When does Capsule 01 launch?', 'TBC. Registered members will be notified by email.'],
  ['Will there be future Capsules?', 'Yes. Members who purchase Capsule 01 get priority access to Capsule 02 and beyond.'],
  ['Who is OTHER?', 'OTHER is a wine company focused on distinctive, low-intervention wines. Learn more at otherwine.co.uk.'],
  ['How do I contact you?', 'Email capsules@otherwine.co.uk for anything not covered here.'],
]

const ballotFAQs = [
  ['How does the ballot work?', 'Once the ballot runs, a random allocation determines which members can purchase. You\'ll receive an email with a Shopify checkout link if you\'re selected.'],
  ['How long do I have to purchase?', 'You have 48 hours from the moment your allocation email is sent. After that, your spot passes to the waitlist.'],
  ['What if I\'m not allocated?', 'You\'ll be placed on the waitlist. If any allocated members don\'t purchase within their 48-hour window, the offer passes down the list.'],
  ['Does inviting a Companion affect my chances?', 'Yes — companions are linked. If you\'re allocated, your companion is too.'],
]

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="py-4 group cursor-pointer" style={{ borderBottom: '1px solid rgba(0,0,106,0.15)' }}>
      <summary className="font-medium list-none flex items-center justify-between select-none">
        {q}
        <span className="text-lg opacity-40 ml-4 group-open:rotate-45 transition-transform">+</span>
      </summary>
      <p className="mt-3 text-sm opacity-60 leading-relaxed max-w-lg">{a}</p>
    </details>
  )
}

export default function FAQPage() {
  return (
    <PageShell
      label="Capsule 01"
      title="FAQ"
      subtitle="Everything we've been asked. If something's missing, email capsules@otherwine.co.uk."
    >
      <div className="max-w-2xl">
        <h2 className="font-bold text-lg mb-2 mt-8">General</h2>
        {generalFAQs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}

        <h2 className="font-bold text-lg mb-2 mt-10">The Ballot</h2>
        {ballotFAQs.map(([q, a]) => <FAQItem key={q} q={q} a={a} />)}
      </div>
    </PageShell>
  )
}
