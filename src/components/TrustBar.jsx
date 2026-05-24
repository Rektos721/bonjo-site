import { motion } from 'framer-motion'

const ITEMS = [
  { icon: '🏅', label: 'IKO Certified', sub: 'Oficjalna szkoła' },
  { icon: '🏄', label: '500+ kursantów', sub: 'Sezony 2019–2026' },
  { icon: '⭐', label: '5.0 Google', sub: '48 opinii' },
  { icon: '🪁', label: 'Duotone & Airush', sub: 'Sprzęt premium' },
]

export default function TrustBar() {
  return (
    <section style={{
      background: 'rgba(7,22,42,0.97)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '18px 24px',
    }}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 16,
        }}
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && (
              <div style={{
                width: 1, height: 26,
                background: 'rgba(255,255,255,0.1)',
                margin: '0 clamp(18px,4vw,52px)',
                flexShrink: 0,
              }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: '1.22rem', lineHeight: 1 }}>{item.icon}</span>
              <div>
                <div style={{
                  fontSize: '0.8rem', fontWeight: 600,
                  color: 'rgba(240,250,255,0.92)',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: '0.6rem', color: 'rgba(140,185,215,0.6)',
                  textTransform: 'uppercase', letterSpacing: '0.09em',
                }}>
                  {item.sub}
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
