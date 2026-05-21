import Nav from '@/components/Nav'

export const metadata = { title: 'The Wine — Capsules by OTHER' }

const DETAILS = [
  ['Producer', 'Domaine de la Zouina'],
  ['Region', 'Meknes, Morocco'],
  ['Grape', 'Grenache Gris'],
  ['Vintage', '2023'],
  ['Method', 'Amphora aged'],
  ['Format', '75cl · natural cork'],
]

const MARQUEE_TEXT: Record<string, string> = {
  ORIGIN: 'ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN          ORIGIN',
  METHOD: 'METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD          METHOD',
  BOX:    'BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX          BOX',
}

const marqueeStrip = (bg: string, word: keyof typeof MARQUEE_TEXT) => (
  <div style={{
    backgroundColor: bg,
    height: 'clamp(28px, 2.6vw, 45px)',
    lineHeight: 'clamp(28px, 2.6vw, 45px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  }}>
    <span style={{
      fontFamily: 'Vulf Sans, sans-serif',
      fontWeight: 300,
      fontSize: 'clamp(12px, 1.45vw, 25px)',
      color: 'var(--yellow)',
      textTransform: 'uppercase',
      letterSpacing: '-0.03em',
      verticalAlign: 'middle',
    }}>
      {MARQUEE_TEXT[word]}
    </span>
  </div>
)

const labelStyle = {
  flexShrink: 0,
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: 'clamp(10px, 1.45vw, 25px)',
  color: 'var(--yellow)',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.03em',
  lineHeight: 1,
  width: 'clamp(3rem, 5vw, 86px)',
}

const sectionHeading = (text: string, leftLabel: string, rightLabel: string) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 'clamp(1.5rem, 2.5vw, 43px)',
  }}>
    <span style={{ ...labelStyle }}>{leftLabel}</span>
    <h2 className="capsules-wordmark" style={{
      flex: 1,
      fontSize: 'clamp(2.5rem, 5.53vw, 95px)',
      WebkitTextStrokeColor: 'var(--cream)',
      fontStyle: 'italic',
      fontWeight: 900,
      letterSpacing: '0.02em',
      textAlign: 'center',
    }}>
      {text}
    </h2>
    <span style={{ ...labelStyle, textAlign: 'right' }}>{rightLabel}</span>
  </div>
)

export default function TheWinePage() {
  return (
    <div style={{ backgroundColor: 'var(--red)' }}>
      <Nav color="#00006A" />

      {/* ── Cream top: bottles + yellow info card ───────────────── */}
      <section style={{
        backgroundColor: 'var(--cream)',
        position: 'relative',
        height: 'clamp(500px, 63.6vw, 1100px)',
        overflow: 'hidden',
      }}>
        {/* Bottles: anchored to bottom-left */}
        <div style={{
          position: 'absolute',
          left: 'clamp(1rem, 9.4vw, 162px)',
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <img
            src="/bottle-1.png"
            alt="Capsule 01 wine bottle"
            style={{ width: 'clamp(80px, 16.7vw, 289px)', height: 'auto', display: 'block' }}
          />
          <img
            src="/bottle-2.png"
            alt="Capsule 01 wine bottle"
            style={{
              width: 'clamp(80px, 16.7vw, 289px)',
              height: 'auto',
              display: 'block',
              marginLeft: 'clamp(-1.5rem, -2.84vw, -49px)',
            }}
          />
        </div>

        {/* Yellow info card: compact, positioned right-centre */}
        <div style={{
          position: 'absolute',
          left: '55.67vw',
          top: '22.86vw',
          width: 'clamp(260px, 30.03vw, 519px)',
          backgroundColor: 'var(--yellow)',
          padding: 'clamp(0.75rem, 2.26vw, 39px)',
          paddingBottom: 'clamp(4rem, 8.97vw, 155px)',
        }}>
          <div style={{ borderTop: '1.5px solid var(--blue)' }}>
            {DETAILS.map(([label, val]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(0.4rem, 0.9vw, 15px) 0',
                borderBottom: '1.5px solid var(--blue)',
                gap: '1rem',
              }}>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.65rem, 1.16vw, 20px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(0.65rem, 1.16vw, 20px)',
                  color: 'var(--blue)',
                  textAlign: 'right',
                  textTransform: 'uppercase',
                }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORIGIN strip ────────────────────────────────────────── */}
      {marqueeStrip('var(--red)', 'ORIGIN')}

      {/* ── Meknes, Morocco ─────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '1728 / 973',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            src="/farmer-right.mp4"
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {sectionHeading('Meknes, Morocco', 'ORIGIN', 'ORIGIN')}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare in this latitude.',
            'In 2023, a Berber tribe and a team of French winemakers set out to make something new from something ancient. Grenache Gris — a pale, copper-skinned grape — fermented and aged in clay amphorae, the same vessels used across the Mediterranean for thousands of years.',
          ].map((t, i) => (
            <p key={i} style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1vw, 17px)',
              color: 'var(--cream)',
              lineHeight: 1.65,
            }}>{t}</p>
          ))}
        </div>
      </section>

      {/* ── METHOD strip ────────────────────────────────────────── */}
      {marqueeStrip('var(--blue)', 'METHOD')}

      {/* ── Amphora aged ────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 'clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '1728 / 973',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            src="/farmer-left.mp4"
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {sectionHeading('Amphora aged', 'method', 'method')}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation but neutral enough to leave the fruit unmasked.',
            'The result has a texture and minerality that glass and steel cannot replicate.\nNo fining. No filtration. 480 bottles filled by hand.',
          ].map((t, i) => (
            <p key={i} style={{
              fontFamily: 'Vulf Sans, sans-serif',
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1vw, 17px)',
              color: 'var(--cream)',
              lineHeight: 1.65,
            }}>{t}</p>
          ))}
        </div>
      </section>

      {/* ── BOX strip ───────────────────────────────────────────── */}
      {marqueeStrip('var(--blue)', 'BOX')}

      {/* ── In the Box ──────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(2rem, 3vw, 52px) clamp(2rem, 5.5vw, 95px) clamp(4rem, 7vw, 120px)',
      }}>
        {sectionHeading('In the Box', 'PRODUCT', 'PRODUCT')}

        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(1rem, 2vw, 34px)',
        }}>
          {[
            {
              img: '/bottle-box-1.png',
              name: 'Amphora Aged Grenache',
              qty: '1 bottle · 75cl',
              desc: 'The centrepiece. Gris de grenache, 2023 vintage. Copper-coloured, textured, alive.',
            },
            {
              img: '/bottle-box-2.png',
              name: 'Estate Rosé',
              qty: '2 bottles · 75cl each',
              desc: 'Made from the same vines, same harvest. A paler, more delicate expression of the same fruit.',
            },
            {
              img: '/bottle-box-3.png',
              name: 'Estate Olive Oil',
              qty: '1 vial · 100ml',
              desc: 'Cold-pressed from olive trees that share the same soil as the vines. A companion to the wine.',
            },
          ].map(item => (
            <div key={item.name} style={{ backgroundColor: 'var(--yellow)', display: 'flex', flexDirection: 'column' }}>
              <img
                src={item.img}
                alt={item.name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: 'clamp(1rem, 1.5vw, 26px)' }}>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(0.75rem, 0.9vw, 15px)',
                  color: 'var(--blue)',
                  marginBottom: '0.4rem',
                }}>
                  {item.name}
                </p>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.7rem, 0.85vw, 14px)',
                  color: 'var(--blue)',
                  lineHeight: 1.6,
                  marginBottom: '0.5rem',
                }}>
                  {item.desc}
                </p>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.65rem, 0.8vw, 13px)',
                  color: 'rgba(0,0,106,0.55)',
                  letterSpacing: '0.04em',
                }}>
                  {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
