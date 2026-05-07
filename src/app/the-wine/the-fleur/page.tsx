import PageShell from '@/components/PageShell'

export const metadata = { title: 'The Fleur — Capsules by OTHER' }

export default function TheFleurPage() {
  return (
    <PageShell
      label="The Wine / Provenance"
      title="The Fleur"
      subtitle="Where it comes from, who made it, and why it matters. Video and full producer story."
    >
      {/* TODO: embed video, producer story, tasting notes */}
      <div className="rounded-2xl aspect-video w-full max-w-2xl flex items-center justify-center text-sm opacity-30"
           style={{ border: '1px solid var(--blue)' }}>
        Video placeholder
      </div>
    </PageShell>
  )
}
