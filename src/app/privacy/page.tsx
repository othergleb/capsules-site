export const metadata = {
  title: 'Privacy Policy — OTHER Capsules',
}

export default function PrivacyPage() {
  return (
    <main
      style={{
        backgroundColor: 'var(--cream)',
        color: 'var(--blue)',
        fontFamily: 'Vulf Sans, sans-serif',
        minHeight: '100vh',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '48px',
          }}
        >
          Privacy Policy
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.85 }}>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Who we are</p>
            <p>
              Other World Wines Ltd, trading as OTHER, operates capsules.otherwine.co.uk. We are a UK-based
              wine company. You can reach us at{' '}
              <a href="mailto:gleb@otherwine.co.uk" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
                gleb@otherwine.co.uk
              </a>.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>What we collect and why</p>
            <p>
              When you register for Capsule 01, we collect your email address and, optionally, your
              name. We use this to manage your place on the access list, send you updates about
              Capsule 01, and notify you when the purchase window opens. We also record how you
              found us (referral link or source channel) so we can understand what's working.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Legal basis</p>
            <p>
              We process your data on the basis of your consent, given when you register. You can
              withdraw that consent at any time by emailing us or clicking unsubscribe in any email
              we send you.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Who we share it with</p>
            <p>
              We use the following third-party services to operate this site. Each acts as a data
              processor on our behalf:
            </p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Supabase</strong> — database (EU region)</li>
              <li><strong>Klaviyo</strong> — email delivery</li>
              <li><strong>Vercel</strong> — hosting and analytics</li>
            </ul>
            <p style={{ marginTop: '8px' }}>
              We do not sell your data or share it with any other third parties.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>How long we keep it</p>
            <p>
              We keep your data for as long as Capsule 01 is active and for a reasonable period
              afterwards for our records. If you ask us to delete your data, we will do so promptly.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Your rights</p>
            <p>
              Under UK GDPR you have the right to access, correct, or delete your personal data, to
              object to or restrict its processing, and to data portability. To exercise any of these
              rights, email us at{' '}
              <a href="mailto:gleb@otherwine.co.uk" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
                gleb@otherwine.co.uk
              </a>. You also have the right to lodge a complaint with the ICO at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
                ico.org.uk
              </a>.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Cookies</p>
            <p>
              This site uses minimal analytics (Vercel Analytics) which does not use cookies or
              fingerprinting. No cookie consent banner is required.
            </p>
          </section>

          <section>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Changes</p>
            <p>
              If we make material changes to this policy we will notify registered members by email.
            </p>
          </section>

          <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '16px' }}>
            Last updated June 2026
          </p>

        </div>
      </div>
    </main>
  )
}
