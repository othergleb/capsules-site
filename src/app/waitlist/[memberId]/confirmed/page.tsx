// ── /waitlist/[memberId]/confirmed ────────────────────────────────
// Shown after a member successfully joins the waitlist.

export default function WaitlistConfirmedPage() {
  return (
    <div
      style={{
        minHeight: '100svh',
        backgroundColor: '#F2EDE6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: "'Vulf Sans', sans-serif",
      }}
    >
      <div style={{ marginBottom: '3rem', opacity: 0.6 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="OTHER" style={{ height: '2rem' }} />
      </div>

      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Vulf Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            marginBottom: '1rem',
          }}
        >
          You&apos;re on the list
        </h1>
        <p
          style={{
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#444',
          }}
        >
          We&apos;ll reach out if a Capsule 01 slot opens up. Keep an eye on your inbox —
          Capsule 02 is coming, and members who engaged with Capsule 01 get first look.
        </p>
      </div>

      <p
        style={{
          position: 'fixed',
          bottom: '2rem',
          fontWeight: 300,
          fontSize: '0.75rem',
          color: '#999',
          letterSpacing: '0.03em',
        }}
      >
        CAPSULE 01 — OTHER WINE
      </p>
    </div>
  )
}
