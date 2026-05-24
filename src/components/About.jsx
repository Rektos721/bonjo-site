import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { num: 'IKO',  title: 'Certyfikat',   desc: 'uznawany na całym świecie', link: null },
  { num: '2',    title: 'Lokalizacje',  desc: 'Jastarnia & El Médano',      link: null },
  { num: '5★',   title: 'Google',       desc: 'kliknij → opinie kursantów', link: 'https://www.google.com/search?q=Surf+Bonjo+kiteboarding+opinie' },
  { num: '∞',    title: 'Pasja',        desc: 'kite to styl życia',          link: null },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="about" style={{ background: 'var(--bg-secondary)', position: 'relative', padding: '88px 24px' }}>
      <div className="h-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <motion.div variants={fadeUp} className="section-tag" style={{ marginBottom: 20 }}>O szkole</motion.div>

            <motion.h2 variants={fadeUp} className="display" style={{
              fontWeight: 800, fontSize: 'clamp(38px, 5.5vw, 68px)',
              lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: 22,
            }}>
              Więcej niż<br /><span style={{ color: 'var(--accent-cyan)' }}>szkoła kite</span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', lineHeight: 1.82, marginBottom: 14, fontSize: '1.02rem' }}>
              Surf Bonjo to szkoła kitesurfingu z certyfikatem <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>IKO</strong>.
              Działamy sezonowo — latem jesteśmy na plaży w{' '}
              <a href="https://www.google.com/maps/search/Jastarnia+kitesurfing" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent-cyan)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(0,216,255,0.35)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,216,255,0.35)')}
              >Jastarni ↗</a>,
              zimą szkolimy na{' '}
              <a href="https://www.google.com/maps/search/El+Medano+Tenerife+kitesurfing" target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--accent-warm)', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(255,107,53,0.35)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-warm)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,107,53,0.35)')}
              >Teneryfie ↗</a>.
              Dwa spoty, jeden standard jakości.
            </motion.p>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', lineHeight: 1.82, marginBottom: 38, fontSize: '1.02rem' }}>
              Uczymy na sprzęcie marek{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Duotone</strong> i{' '}
              <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Airush</strong>.
              Małe grupy, polscy instruktorzy, pełne bezpieczeństwo i realny progres.
              Chcesz sprawdzić czy kite jest dla Ciebie?{' '}
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Pierwsza lekcja gratis</span> — bez żadnych zobowiązań.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#courses" className="btn-primary">Nasze kursy →</a>
              <a href="#contact" className="btn-outline">Darmowa lekcja</a>
            </motion.div>

          </div>

          {/* Right: image */}
          <div style={{ position: 'relative' }}>
            <motion.div variants={fadeUp} style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/5', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1607537825952-48c2142007ae?w=800&h=1000&fit=crop&q=80"
                alt="Instruktor Surf Bonjo na wodzie"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.8) brightness(0.82)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(6,214,247,0.18) 0%, transparent 55%)' }} />
              <div className="glass" style={{ position: 'absolute', bottom: 22, left: 22, borderRadius: 14, padding: '14px 18px' }}>
                <div className="display" style={{ fontWeight: 900, fontSize: '2rem', color: 'var(--accent-cyan)', lineHeight: 1 }}>IKO</div>
                <div className="mono" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: 4 }}>CERTIFIED SCHOOL</div>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ marginTop: 80 }}
        >
          {STATS.map(s => {
            const El = s.link ? motion.a : motion.div
            return (
              <El
                key={s.title}
                variants={fadeUp}
                className="glass"
                href={s.link || undefined}
                target={s.link ? '_blank' : undefined}
                rel={s.link ? 'noopener noreferrer' : undefined}
                style={{
                  borderRadius: 14, padding: '26px 22px', textAlign: 'center',
                  textDecoration: 'none', display: 'block',
                  cursor: s.link ? 'pointer' : 'default',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={s.link ? e => { e.currentTarget.style.borderColor = 'rgba(6,214,247,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' } : undefined}
                onMouseLeave={s.link ? e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = '' } : undefined}
              >
                <div className="display" style={{ fontWeight: 900, fontSize: s.num.length > 3 ? '1.6rem' : '3rem', color: 'var(--accent-cyan)', lineHeight: 1 }}>{s.num}</div>
                <div className="display" style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: 6 }}>{s.title}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 5 }}>{s.desc}</div>
              </El>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
