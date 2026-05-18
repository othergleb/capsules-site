import Nav from '@/components/Nav'

export const metadata = { title: 'The Wine — Capsules by OTHER' }

const DETAILS = [
  ['Producer', 'Domaine de la Zouina'],
  ['Region', 'Meknes, Morocco'],
  ['Grape', 'Grenache Gris'],
  ['Vintage', '2023'],
  ['Method', 'Amphora aged'],
  ['Format', '75cl · natural cork'],
  ['Price', '£89 incl. delivery'],
]

const divider = (color: string) => (
  <div style={{ width: '100%', height: 'clamp(2rem, 2.6vw, 45px)', backgroundColor: color }} />
)

export default function TheWinePage() {
  return (
    <div style={{ backgroundColor: 'var(--red)' }}>
      <Nav color="#00006A" />

      {/* ── Cream top: bottles + yellow info card ───────────────── */}
      <section style={{
        backgroundColor: 'var(--cream)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'clamp(500px, 63.6vw, 1100px)',
      }}>
        {/* Left — two wine bottles */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          padding: 'clamp(5rem, 7.5vw, 130px) clamp(2rem, 4vw, 4rem) 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <img
              src="/bottle-1.png"
              alt="Capsule 01 wine bottle"
              style={{
                width: 'clamp(100px, 16.7vw, 289px)',
                height: 'auto',
                display: 'block',
              }}
            />
            <img
              src="/bottle-2.png"
              alt="Capsule 01 wine bottle"
              style={{
                width: 'clamp(100px, 16.7vw, 289px)',
                height: 'auto',
                display: 'block',
                marginLeft: 'clamp(-2rem, -2.8vw, -3rem)',
              }}
            />
          </div>
        </div>

        {/* Right — yellow info card */}
        <div style={{
          backgroundColor: 'var(--yellow)',
          padding: 'clamp(5rem, 7.5vw, 130px) clamp(2rem, 3.5vw, 60px) clamp(2rem, 3.5vw, 60px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'Vulf Sans, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(0.6rem, 0.75vw, 13px)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--blue)',
            marginBottom: '1rem',
          }}>
            Capsule 01
          </p>
          <div style={{ borderTop: '1.5px solid var(--blue)' }}>
            {DETAILS.map(([label, val]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '0.65rem 0',
                borderBottom: '1.5px solid var(--blue)',
                gap: '1rem',
              }}>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.7rem, 0.85vw, 14px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(0.7rem, 0.85vw, 14px)',
                  color: 'var(--blue)',
                  textAlign: 'right',
                }}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meknes, Morocco ─────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(2rem, 3vw, 52px) 0 clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: 'clamp(320px, 89vw, 1540px)',
          aspectRatio: '1325 / 973',
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
        <h2 className="capsules-wordmark" style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 95px)',
          WebkitTextStrokeColor: 'var(--cream)',
          fontStyle: 'italic',
          marginBottom: 'clamp(1.5rem, 2.5vw, 43px)',
          textAlign: 'center',
        }}>
          Meknes, Morocco
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'Nestled at the foot of the Middle Atlas mountains, Meknes is one of the oldest wine-producing regions in the world. The high altitude and dramatic temperature swings between day and night preserve natural acidity, giving the wine a freshness that is rare at this latitude.',
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

      {/* ── Navy divider ────────────────────────────────────────── */}
      {divider('var(--blue)')}

      {/* ── Amphora aged ────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(2rem, 3vw, 52px) 0 clamp(3rem, 5vw, 86px)',
      }}>
        <div style={{
          width: 'clamp(320px, 89vw, 1540px)',
          aspectRatio: '1325 / 973',
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
        <h2 className="capsules-wordmark" style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 95px)',
          WebkitTextStrokeColor: 'var(--cream)',
          fontStyle: 'italic',
          marginBottom: 'clamp(1.5rem, 2.5vw, 43px)',
          textAlign: 'center',
        }}>
          Amphora aged
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 52px)',
          maxWidth: 'clamp(600px, 75vw, 1300px)',
          padding: '0 clamp(1.5rem, 4vw, 4rem)',
        }}>
          {[
            'The wine rests in unlined clay vessels — qvevri-style amphorae — buried in the cellar floor. Clay is porous enough to allow a slow micro-oxidation, but neutral enough to leave the fruit unmasked. The result has a texture and minerality that glass and steel cannot replicate.',
            'No fining. No filtration. 480 bottles filled by hand.',
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

      {/* ── Navy divider ────────────────────────────────────────── */}
      {divider('var(--blue)')}

      {/* ── In The Box ──────────────────────────────────────────── */}
      <section style={{
        backgroundColor: 'var(--red)',
        padding: 'clamp(3rem, 5vw, 86px) clamp(2rem, 5.5vw, 95px) clamp(4rem, 7vw, 120px)',
      }}>
        <p style={{
          fontFamily: 'Vulf Sans, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.6rem, 0.75vw, 13px)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--cream)',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          In The Box
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(1rem, 2vw, 34px)',
        }}>
          {[
            {
              img: '/bottle-box-1.png',
              name: 'Amphora Aged Grenache Gris',
              qty: '1 bottle · 75cl',
              desc: 'The centrepiece. Copper-coloured, textured, and alive with minerality from the Atlas foothills.',
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
              desc: 'Cold-pressed from olive trees sharing the same soil as the vines.',
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
