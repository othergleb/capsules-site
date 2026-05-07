import PageShell from '@/components/PageShell'

export const metadata = { title: 'Box & Price — Capsules by OTHER' }

export default function BoxAndPricePage() {
  return (
    <PageShell
      label="The Wine / What you get"
      title="Box & Price"
      subtitle="Everything in the Capsule 01 box, and what you'll pay if you're allocated."
    >
      {/* TODO: box contents list, price breakdown, imagery */}
      <div className="space-y-4 max-w-sm">
        <div className="flex justify-between py-3 text-sm" style={{ borderBottom: '1px solid var(--blue)', opacity: 0.4 }}>
          <span>6 × bottle — The Fleur</span>
          <span>TBC</span>
        </div>
        <div className="flex justify-between py-3 font-bold">
          <span>Total</span>
          <span>£85</span>
        </div>
        <p className="text-xs opacity-40 pt-2">
          Price includes delivery. Payment only if allocated via ballot.
        </p>
      </div>
    </PageShell>
  )
}
