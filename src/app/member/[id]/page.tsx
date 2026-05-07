import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'

interface Props {
  params: { id: string }
}

export default async function MemberPage({ params }: Props) {
  // TODO: fetch member from Supabase
  // const supabase = createClient()
  // const { data: member } = await supabase
  //   .from('members')
  //   .select('*, companion:companion_id(*)')
  //   .eq('id', params.id)
  //   .single()
  // if (!member) notFound()

  // Placeholder while Supabase is not yet set up
  const member = {
    id: params.id,
    member_number: '—',
    email: '',
    status: 'registered' as const,
    companion: null,
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)', color: 'var(--blue)' }}>
      <Nav />

      <section className="flex-1 px-6 pt-36 pb-20 max-w-2xl mx-auto w-full">
        <p className="text-xs font-medium tracking-widest uppercase mb-6 opacity-50" style={{ letterSpacing: '0.18em' }}>
          Member
        </p>

        {/* Member card */}
        <div
          className="rounded-2xl p-8 mb-8"
          style={{ backgroundColor: 'var(--blue)', color: 'var(--cream)' }}
        >
          <p className="text-xs opacity-50 tracking-widest uppercase mb-2" style={{ letterSpacing: '0.14em' }}>
            Capsule 01
          </p>
          <p className="text-4xl font-bold mb-1">#{member.member_number}</p>
          <p className="text-sm opacity-60">{member.email || 'your@email.com'}</p>

          <div className="mt-6 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div>
              <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Status</p>
              <p className="text-sm capitalize">{member.status}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Companion</p>
              <p className="text-sm">{member.companion ? 'Linked' : 'Not yet invited'}</p>
            </div>
          </div>
        </div>

        {/* Companion invite section */}
        {!member.companion && (
          <div className="rounded-2xl p-6" style={{ border: '1px solid var(--blue)', opacity: 0.8 }}>
            <h2 className="font-bold mb-2">Invite a Companion</h2>
            <p className="text-sm opacity-60 mb-4">
              Your companion joins the ballot alongside you — your allocation is linked.
              Share your unique invite link.
            </p>
            {/* TODO: generate + display unique invite link */}
            <div
              className="rounded-full px-4 py-2 text-sm opacity-40 select-all font-mono"
              style={{ backgroundColor: 'var(--blue)', color: 'var(--cream)' }}
            >
              capsule.otherwine.co.uk/invite/[your-code]
            </div>
          </div>
        )}

        {/* Loyalty — Capsule 02 onwards */}
        <div className="mt-6 rounded-2xl p-6" style={{ border: '1px solid var(--blue)', opacity: 0.4 }}>
          <p className="text-xs uppercase tracking-widest opacity-60 mb-1" style={{ letterSpacing: '0.14em' }}>Coming — Capsule 02</p>
          <h2 className="font-bold text-sm">Loyalty Card</h2>
          <p className="text-xs opacity-60 mt-1">Members who purchase Capsule 01 get priority access to future drops.</p>
        </div>
      </section>
    </main>
  )
}
