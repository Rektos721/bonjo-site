import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const IcoList = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
    <circle cx="3" cy="6" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="3" cy="12" r="1.2" fill="currentColor" stroke="none"/>
    <circle cx="3" cy="18" r="1.2" fill="currentColor" stroke="none"/>
  </svg>
)
const IcoWave = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 10c1.5-2.5 3-3.5 4.5-3.5s3 2 4.5 2 3-3 4.5-3 3 1 4.5 3.5"/>
    <path d="M2 17c1.5-2.5 3-3.5 4.5-3.5s3 2 4.5 2 3-3 4.5-3 3 1 4.5 3.5"/>
  </svg>
)
const IcoKite = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L22 12 L12 22 L2 12 Z"/>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const STEPS = [
  {
    num: '01',
    Icon: IcoList,
    title: 'Wybierz kurs',
    desc: 'Intro za darmo lub pełny program IKO. Dobierzemy termin i lokalizację do Twoich planów.',
  },
  {
    num: '02',
    Icon: IcoWave,
    title: 'Przyjdź na spot',
    desc: 'Sprzęt Duotone czeka gotowy. Certyfikowany instruktor IKO prowadzi Cię od pierwszej sekundy.',
  },
  {
    num: '03',
    Icon: IcoKite,
    title: 'Jedź samodzielnie',
    desc: 'Po kursie masz latawiec pod kontrolą i ruszasz na wodę. Opcjonalnie z certyfikatem IKO Level 1.',
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16,1,0.3,1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '100px 24px' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <span className="section-tag">Jak to działa</span>
          </div>
          <h2 className="display" style={{
            fontWeight: 900,
            fontSize: 'clamp(36px,5.5vw,68px)',
            lineHeight: 1.0, letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
          }}>
            Trzy kroki do <span style={{ color: 'var(--accent-cyan)' }}>wolności</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-3 gap-12"
          style={{ position: 'relative' }}
        >
          {STEPS.map((step, i) => (
            <motion.div key={step.num} variants={fadeUp} style={{ textAlign: 'center', position: 'relative' }}>

              {/* Connector line (between steps) */}
              {i < STEPS.length - 1 && (
                <div style={{
                  display: 'none',  // shown via CSS below
                  position: 'absolute', top: 36, left: '60%', width: '80%',
                  height: 1,
                  background: 'linear-gradient(90deg, rgba(0,216,255,0.3), rgba(0,216,255,0.05))',
                }} className="step-connector" />
              )}

              {/* Big ghost number */}
              <div className="display" style={{
                fontSize: 'clamp(80px,12vw,128px)', fontWeight: 900, lineHeight: 1,
                color: 'rgba(0,216,255,0.05)', letterSpacing: '-0.04em',
                marginBottom: -20, position: 'relative', zIndex: 0,
                userSelect: 'none',
              }}>
                {step.num}
              </div>

              {/* Icon circle */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(0,216,255,0.07)',
                border: '1px solid rgba(0,216,255,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                color: 'rgba(240,250,255,0.85)',
              }}>
                <step.Icon />
              </div>

              <h3 className="display" style={{
                fontWeight: 800, fontSize: '1.6rem',
                color: 'var(--text-primary)', marginBottom: 14, lineHeight: 1,
              }}>
                {step.title}
              </h3>

              <p style={{
                color: 'var(--text-muted)', lineHeight: 1.75,
                fontSize: '0.93rem', maxWidth: 260, margin: '0 auto',
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <a href="#contact" className="btn-primary" style={{ fontSize: '0.95rem', padding: '15px 38px' }}>
            Zacznij od darmowej lekcji →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .step-connector { display: block !important; }
        }
      `}</style>
    </section>
  )
}
