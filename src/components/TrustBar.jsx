import { motion } from 'framer-motion'

const IcoShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const IcoUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IcoStar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const IcoKite = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L22 12 L12 22 L2 12 Z"/>
    <line x1="12" y1="7" x2="12" y2="17"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
)

const ITEMS = [
  { Icon: IcoShield, label: 'IKO Certified',    sub: 'Oficjalna szkoła' },
  { Icon: IcoUsers,  label: '500+ kursantów',   sub: 'Sezony 2019–2026' },
  { Icon: IcoStar,   label: '5.0 Google',       sub: '48 opinii' },
  { Icon: IcoKite,   label: 'Duotone & Airush', sub: 'Sprzęt premium' },
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
              <span style={{ color: 'rgba(240,250,255,0.75)', lineHeight: 1, display: 'flex' }}>
                <item.Icon />
              </span>
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
