import PageShell from '@/components/PageShell'

export const metadata = { title: 'The Companion — Capsules by OTHER' }

export default function TheCompanionPage() {
  return (
    <PageShell
      label="How it Works / The Pairing"
      title="The Companion"
      subtitle="Invite someone to join alongside you. Your fates in the ballot are linked."
    >
      {/* TODO: companion mechanic explanation, invite flow diagram */}
      <p className="text-sm opacity-40 italic">Content coming — designer to spec this section.</p>
    </PageShell>
  )
}
