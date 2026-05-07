import PageShell from '@/components/PageShell'

export const metadata = { title: 'The Ballot — Capsules by OTHER' }

export default function TheBallotPage() {
  return (
    <PageShell
      label="How it Works / The Process"
      title="The Ballot"
      subtitle="How members are allocated, what the 48-hour window means, and what happens if you're waitlisted."
    >
      {/* TODO: detailed ballot explanation, timeline graphic */}
      <p className="text-sm opacity-40 italic">Content coming — designer to spec this section.</p>
    </PageShell>
  )
}
