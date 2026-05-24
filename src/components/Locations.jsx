import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// SVG icons
const IconWave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M2 11c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
    <path d="M2 16c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>
  </svg>
)
const IconWind = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M9.6 7A2 2 0 0 1 11 5a2 2 0 0 1 2 2 2 2 0 0 1-2 2H2"/>
    <path d="M12.6 17a2 2 0 0 0 1.4 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2H2"/>
    <path d="M2 12h20"/>
  </svg>
)
const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
)
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const LOCATIONS = [
  {
    id: 'jastarnia',
    name: 'Jastarnia',
    country: 'Półwysep Helski, Polska',
    season: 'Maj – Wrzesień',
    seasonLabel: 'SEZON LETNI',
    tagline: 'Jedno z najlepszych miejsc do nauki kitesurfingu w Polsce',
    desc: 'Płytka Zatoka Pucka, szeroka plaża i stabilne wiatry tworzą idealne warunki — szczególnie dla początkujących. Spokojne, bezpieczne wody z wiatrem znad lądu sprawiają, że postępy przychodzą szybciej.',
    chips: [
      { icon: <IconWave />, label: 'Płytka woda zatoki' },
      { icon: <IconWind />, label: 'Stabilny wiatr' },
      { icon: <IconPin  />, label: 'Plaża w Jastarni' },
      { icon: <IconSun  />, label: 'Maj – Wrzesień' },
    ],
    features: ['Idealne warunki dla początkujących', 'Instrukcja po polsku', 'Sprzęt na miejscu', 'Centrum polskiego kite'],
    image: 'https://images.unsplash.com/photo-1564499504739-bc4fc2ae8cba?w=900&h=700&fit=crop&q=80',
    mapsUrl: 'https://www.google.com/maps/search/Jastarnia+kitesurfing+Hel+Peninsula',
    accent: 'var(--accent-cyan)',
    gradFrom: 'rgba(6,214,247,0.18)',
  },
  {
    id: 'tenerife',
    name: 'El Médano',
    country: 'Tenerife, Hiszpania',
    season: 'Cały rok',
    seasonLabel: 'SEZON ZIMOWY',
    tagline: 'Jeden z najsłynniejszych spotów kitesurfingowych w Europie',
    desc: 'El Médano to mekka kitesurferów z całego świata. Przewidywalny wiatr, ciepły Atlantyk i szeroka plaża działają przez 12 miesięcy w roku. Idealne dla tych, którzy chcą uciec od polskiej zimy i poczuć wiatr na pełnym oceanie.',
    chips: [
      { icon: <IconWind />, label: 'Wiatr cały rok' },
      { icon: <IconWave />, label: 'Ciepły Atlantyk' },
      { icon: <IconPin  />, label: 'El Médano, Tenerife' },
      { icon: <IconSun  />, label: 'Rok okrągły' },
    ],
    features: ['Top spot w Europie', 'Ciepła woda + wiatr rok-round', 'Polski instruktor', 'Otwarty ocean'],
    image: 'https://images.unsplash.com/photo-1614205846383-5f2c86e5c126?w=900&h=700&fit=crop&q=80',
    mapsUrl: 'https://www.google.com/maps/search/El+Medano+Tenerife+kitesurfing',
    accent: '#ff6b35',
    gradFrom: 'rgba(255,107,53,0.15)',
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Locations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="locations" style={{ background: 'var(--bg-primary)', padding: '88px 24px', position: 'relative' }}>
      <div className="h-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <span className="section-tag">Lokalizacje</span>
          </div>
          <h2 className="display" style={{
            fontWeight: 800, fontSize: 'clamp(38px, 5.5vw, 68px)',
            lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--text-primary)', marginBottom: 16,
          }}>
            Dwa spoty,<br /><span style={{ color: 'var(--accent-cyan)' }}>jeden poziom</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', lineHeight: 1.72 }}>
            Latem szkolimy na Półwyspie Helskim, zimą przenosimy się na Wyspy Kanaryjskie.
            Kite przez cały rok — ty decydujesz kiedy.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative',
                border: `1px solid ${loc.accent === '#ff6b35' ? 'rgba(255,107,53,0.18)' : 'var(--glass-border)'}`,
              }}
            >
              {/* Background image */}
              <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.75) brightness(0.7)', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${loc.gradFrom} 0%, rgba(4,13,20,0.85) 100%)` }} />

                {/* Season badge */}
                <div style={{ position: 'absolute', top: 18, left: 18 }}>
                  <span className="mono" style={{
                    background: 'rgba(4,13,20,0.7)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${loc.accent}44`, color: loc.accent,
                    fontSize: '0.6rem', letterSpacing: '0.16em',
                    padding: '5px 12px', borderRadius: 20,
                  }}>
                    {loc.seasonLabel}
                  </span>
                </div>

                {/* Location name on image — clickable → Google Maps */}
                <a
                  href={loc.mapsUrl}
                  target="_blank" rel="noopener noreferrer"
                  style={{ position: 'absolute', bottom: 22, left: 24, textDecoration: 'none' }}
                >
                  <div className="display" style={{
                    fontWeight: 900, fontSize: '2.6rem', color: '#fff', lineHeight: 1,
                    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = loc.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                  >
                    {loc.name} ↗
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <IconPin />
                    {loc.country} — kliknij aby zobaczyć na mapie
                  </div>
                </a>
              </div>

              {/* Content */}
              <div style={{ padding: '26px 28px 28px', background: 'var(--bg-secondary)' }}>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: loc.accent, marginBottom: 12, fontWeight: 500 }}>
                  "{loc.tagline}"
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 20 }}>
                  {loc.desc}
                </p>

                {/* Chips */}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
                  {loc.chips.map(c => (
                    <span key={c.label} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: '0.75rem', color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '6px 11px', borderRadius: 8,
                    }}>
                      <span style={{ color: loc.accent }}>{c.icon}</span>
                      {c.label}
                    </span>
                  ))}
                </div>

                {/* Features list */}
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                  {loc.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <span style={{ color: loc.accent, flexShrink: 0 }}><IconCheck /></span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="btn-primary" style={{
                  display: 'block', textAlign: 'center', marginTop: 24,
                  background: loc.accent === '#ff6b35' ? '#ff6b35' : 'var(--accent-cyan)',
                }}>
                  Zapisz się — {loc.name} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
