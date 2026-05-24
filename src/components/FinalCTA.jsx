import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section style={{
      position: 'relative',
      padding: '130px 24px 150px',
      overflow: 'hidden',
      background: 'linear-gradient(140deg, #060f22 0%, #091a3a 45%, #060f22 100%)',
      textAlign: 'center',
    }}>
      {/* Ambient glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 25% 55%, rgba(0,216,255,0.13) 0%, transparent 52%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 75% 45%, rgba(255,107,53,0.09) 0%, transparent 52%)',
      }} />

      {/* Top divider */}
      <div className="h-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="max-w-4xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 44 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.16,1,0.3,1] }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
            <span className="section-tag">Zacznij już dziś</span>
          </div>

          <h2 className="display" style={{
            fontWeight: 900,
            fontSize: 'clamp(56px,9vw,120px)',
            lineHeight: 0.88,
            letterSpacing: '-0.038em',
            color: 'var(--text-primary)',
            marginBottom: 32,
          }}>
            Gotowy<br />
            na <span style={{ color: 'var(--accent-cyan)' }}>pierwszy lot?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(15px,1.4vw,18px)',
            color: 'var(--text-muted)',
            lineHeight: 1.72,
            maxWidth: 420,
            margin: '0 auto 56px',
          }}>
            Pierwsza lekcja gratis. Sprzęt premium w cenie.
            Certyfikowany instruktor IKO — w Jastarni lub na Teneryfie.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <a
              href="#contact"
              className="btn-primary"
              style={{ fontSize: '1.08rem', padding: '18px 48px', display: 'inline-block' }}
            >
              Zarezerwuj lekcję →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: 36,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: 10, flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.95rem', letterSpacing: '2px' }}>★★★★★</span>
            <span style={{ color: 'rgba(140,185,215,0.55)', fontSize: '0.75rem' }}>
              5.0 · 48 opinii Google · Certyfikowana szkoła IKO
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
