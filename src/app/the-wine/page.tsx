import PageShell from '@/components/PageShell'
import Link from 'next/link'

export const metadata = { title: 'The Wine — Capsules by OTHER' }

export default function TheWinePage() {
  return (
    <PageShell
      label="Capsule 01"
      title="The Wine"
      subtitle="Everything you need to know about what's in the box — the provenance, the producer, and why we chose it."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <Link
          href="/the-wine/the-fleur"
          className="group p-6 rounded-2xl border transition-colors hover:border-[var(--red)]"
          style={{ borderColor: 'var(--blue)', borderOpacity: 0.2 }}
        >
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ letterSpacing: '0.14em' }}>
            Provenance
          </p>
          <h2 className="text-xl font-bold" style={{ color: 'var(--blue)' }}>
            The Fleur
          </h2>
          <p className="mt-1 text-sm opacity-60">Video · Story · Producer</p>
        </Link>

        <Link
          href="/the-wine/box-and-price"
          className="group p-6 rounded-2xl border transition-colors hover:border-[var(--red)]"
          style={{ borderColor: 'var(--blue)', borderOpacity: 0.2 }}
        >
          <p className="text-xs tracking-widest uppercase opacity-50 mb-2" style={{ letterSpacing: '0.14em' }}>
            What you get
          </p>
          <h2 className="text-xl font-bold" style={{ color: 'var(--blue)' }}>
            Box & Price
          </h2>
          <p className="mt-1 text-sm opacity-60">Contents · £85</p>
        </Link>
      </div>
    </PageShell>
  )
}
