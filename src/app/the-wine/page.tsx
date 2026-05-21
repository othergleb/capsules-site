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

const marqueeStrip = (bg: string, word: string) => (
  <div style={{
    backgroundColor: bg,
    height: 'clamp(28px, 2.6vw, 45px)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTop: '2.22px solid #EDFF00',
    borderBottom: '2.22px solid #EDFF00',
  }}>
    {Array.from({ length: 12 }, (_, i) => (
      <span key={i} style={{
        fontFamily: 'Vulf Sans, sans-serif',
        fontWeight: 300,
        fontSize: 'clamp(12px, 1.45vw, 25px)',
        color: '#EDFF00',
        textTransform: 'uppercase',
        letterSpacing: '-0.75px',
        fontFeatureSettings: "'case' on, 'dlig' on, 'ss03' on, 'ss05' on, 'cv10' on",
        lineHeight: 1,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        {word}
      </span>
    ))}
  </div>
)

const sideLabel = {
  position: 'absolute' as const,
  top: '50%',
  transform: 'translateY(-50%)',
  fontFamily: 'Vulf Sans, sans-serif',
  fontWeight: 300,
  fontSize: 'clamp(10px, 1.45vw, 25px)',
  color: 'var(--yellow)',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.03em',
  lineHeight: 1,
}

const sectionHeading = (text: string, leftLabel: string, rightLabel: string) => (
  <div style={{
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    marginBottom: 'clamp(1.5rem, 2.5vw, 43px)',
  }}>
    <span style={{ ...sideLabel, left: 'clamp(1rem, 3.47vw, 60px)' }}>{leftLabel}</span>
    <h2 className="capsules-wordmark" style={{
      fontSize: 'clamp(2.5rem, 5.53vw, 95px)',
      fontWeight: 900,
      letterSpacing: '0.02em',
    }}>
      {text}
    </h2>
    <span style={{ ...sideLabel, right: 'clamp(1rem, 3.47vw, 60px)' }}>{rightLabel}</span>
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
          aspectRatio: '857 / 482',
          borderRadius: '486.5px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            src="/farmer-right.mp4"
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '486.5px',
            boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset',
            pointerEvents: 'none',
          }} />
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
          aspectRatio: '857 / 482',
          borderRadius: '486.5px',
          overflow: 'hidden',
          border: '2.22px solid #EDFF00',
          position: 'relative',
          marginTop: '-2.22px',
          marginBottom: 'clamp(2rem, 3.5vw, 60px)',
        }}>
          <video
            src="/farmer-left.mp4"
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '486.5px',
            boxShadow: '15px 4px 15px 0 rgba(0,0,0,0.42) inset',
            pointerEvents: 'none',
          }} />
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
        paddingTop: 'clamp(2rem, 3vw, 52px)',
        paddingBottom: 'clamp(4rem, 7vw, 120px)',
      }}>
        {sectionHeading('In the Box', 'PRODUCT', 'PRODUCT')}

        <div style={{
          width: '100%',
          display: 'flex',
          padding: '0 clamp(7px, 0.81vw, 14px)',
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
          ].map((item, i) => (
            <div key={item.name} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginLeft: i > 0 ? '-2.22px' : 0,
            }}>
              {/* Arch */}
              <div style={{
                border: '2.22px solid #00006A',
                borderRadius: 'clamp(100px, 16.44vw, 284px) clamp(100px, 16.44vw, 284px) 0 0',
                backgroundColor: 'var(--red)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 'clamp(12px, 2.03vw, 35px)',
                aspectRatio: '568 / 715',
              }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '37%', height: 'auto', display: 'block' }}
                />
              </div>
              {/* Text panel */}
              <div style={{
                backgroundColor: 'var(--yellow)',
                border: '2.22px solid #00006A',
                marginTop: '-2.22px',
                padding: 'clamp(14px, 1.79vw, 31px)',
                paddingBottom: 'clamp(20px, 2.5vw, 43px)',
              }}>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 1.33vw, 23px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  marginBottom: '0.5em',
                }}>
                  {item.name}
                </p>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(11px, 1.33vw, 23px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  marginBottom: '0.75em',
                }}>
                  {item.desc}
                </p>
                <p style={{
                  fontFamily: 'Vulf Sans, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(10px, 1.1vw, 19px)',
                  color: 'var(--blue)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
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
