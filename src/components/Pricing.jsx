import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import KiteGame from './KiteGame'

/**
 * Cennik oparty na realnej ofercie Surf Bonjo:
 * – Lekcja intro (darmowa)
 * – Kite Start (kurs grupowy)
 * – Kite Start PRO (5h, certyfikat IKO)
 * – Lekcje indywidualne
 *
 * Ceny "na zapytanie" bo nie znamy dokładnych stawek —
 * do uzupełnienia po kontakcie ze szkołą.
 */
const PLANS = [
  {
    name: 'INTRO',
    subtitle: 'Pierwsze kroki bez ryzyka',
    price: '0',
    currency: 'zł',
    per: 'za darmo',
    badge: 'GRATIS',
    featured: false,
    features: [
      'Ok. 1 godzina z instruktorem',
      'Nauka obsługi latawca na plaży',
      'Teoria wiatru i bezpieczeństwa',
      'Sprzęt szkolny w zestawie',
      'Brak zobowiązań',
    ],
    cta: 'Chcę darmową lekcję',
    ctaHref: '#contact',
  },
  {
    name: 'KITE START',
    subtitle: 'Kompleksowy kurs grupowy',
    price: '★',
    currency: '',
    per: 'Zapytaj o cenę',
    badge: 'GRUPOWY',
    featured: false,
    features: [
      'Kilka dni szkolenia',
      'Teoria wiatru, morza i latawców',
      'Ćwiczenia na lądzie i wodzie',
      'Wodny start krok po kroku',
      'Certyfikowany instruktor IKO',
      'Sprzęt Duotone / Airush w cenie',
    ],
    cta: 'Zapytaj o termin',
    ctaHref: '#contact',
  },
  {
    name: 'KITE START PRO',
    subtitle: 'Kurs z certyfikatem IKO',
    price: '★',
    currency: '',
    per: 'Zapytaj o cenę',
    badge: 'POLECANY',
    featured: true,
    features: [
      '5 godzin szkolenia',
      'Pełny program Kite Start',
      'Certyfikat IKO Level 1',
      'Uznawany przez szkoły na świecie',
      'Certyfikowany instruktor IKO',
      'Sprzęt premium w zestawie',
      'Nauka kontroli latawca w powietrzu',
      'Wodny start i samodzielna jazda',
    ],
    cta: 'Zapisz się na PRO',
    ctaHref: '#contact',
  },
  {
    name: 'PRIVATE',
    subtitle: 'Lekcja jeden na jeden',
    price: '★',
    currency: '',
    per: 'Zapytaj o cenę',
    badge: null,
    featured: false,
    features: [
      'Instruktor tylko dla Ciebie',
      'Dopasowany poziom i tempo',
      'Elastyczny termin',
      'Każdy poziom zaawansowania',
      'Szybszy progres niż w grupie',
      'Sprzęt Duotone / Airush',
    ],
    cta: 'Umów lekcję prywatną',
    ctaHref: '#contact',
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const [gameOpen, setGameOpen] = useState(false)

  return (
    <section id="pricing" style={{ background: 'var(--bg-secondary)', padding: '88px 24px', position: 'relative' }}>
      <div className="h-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span className="section-tag">Cennik</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="display" style={{
            fontWeight: 800,
            fontSize: 'clamp(38px, 5.5vw, 68px)',
            lineHeight: 1.0, letterSpacing: '-0.025em',
            color: 'var(--text-primary)', marginBottom: 16,
          }}>
            Wybierz swój <span style={{ color: 'var(--accent-cyan)' }}>pakiet</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', lineHeight: 1.72 }}>
            Zaczynamy od darmowej lekcji — bez ryzyka. Sprzęt zawsze wliczony w cenę kursu.
          </motion.p>
        </motion.div>

        {/* Cards — 2 kolumny na górze, 2 na dole */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start"
        >
          {PLANS.map(plan => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.badge && (
                <div className="mono" style={{
                  position: 'absolute', top: -13, left: '50%',
                  transform: 'translateX(-50%)',
                  background: plan.featured ? 'var(--accent-cyan)' : plan.badge === 'GRATIS' ? 'rgba(255,107,53,0.9)' : 'rgba(255,255,255,0.12)',
                  color: plan.featured ? '#040d14' : '#fff',
                  fontSize: '0.58rem', fontWeight: 700,
                  letterSpacing: '0.16em',
                  padding: '5px 14px', borderRadius: 20,
                  whiteSpace: 'nowrap',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Name */}
              <div className="mono" style={{
                fontSize: '0.65rem', letterSpacing: '0.2em',
                color: plan.featured ? 'var(--accent-cyan)' : 'var(--text-muted)',
                marginBottom: 4,
              }}>
                {plan.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                {plan.subtitle}
              </div>

              {/* Price */}
              <div style={{
                paddingBottom: 20, marginBottom: 20,
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                {plan.price === '0' ? (
                  <div className="display" style={{ fontWeight: 900, fontSize: '3rem', color: '#ff6b35', lineHeight: 1 }}>
                    GRATIS
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ fontSize: '1.4rem', color: 'var(--accent-cyan)' }}>✦</span>
                    <br />
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{plan.per}</span>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', marginBottom: 24 }}>
                {plan.features.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 10,
                  }}>
                    <span style={{ color: 'var(--accent-cyan)', fontSize: '0.65rem', marginTop: 4, flexShrink: 0 }}>✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={plan.featured ? 'btn-primary' : 'btn-outline'}
                style={{ display: 'block', textAlign: 'center', fontSize: '0.85rem' }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          style={{ textAlign: 'center', marginTop: 36 }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Masz inne pytania?{' '}
            <a href="#contact" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
              Napisz do nas
            </a>{' '}
            — odpiszemy szybko.
          </p>
        </motion.div>

        {/* Subtle easter egg hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          style={{ marginTop: 44, textAlign: 'center' }}
        >
          <button
            onClick={() => setGameOpen(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Mono', monospace", fontSize: '0.68rem',
              letterSpacing: '0.14em', color: 'rgba(6,214,247,0.35)',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(6,214,247,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(6,214,247,0.35)'}
          >
            🎮 psst — jest tu ukryta gra. wygraj −10% na kurs.
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {gameOpen && <KiteGame onClose={() => setGameOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
