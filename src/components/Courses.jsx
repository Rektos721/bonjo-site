import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Tematyczne SVG ikony — spójne z designem
const IcoGift = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5" rx="1"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
)
const IcoWave = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M2 10c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
    <path d="M2 16c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>
  </svg>
)
const IcoCert = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="12" y2="17"/>
    <circle cx="17" cy="18" r="3"/>
    <path d="M14.65 19.65L13 22l1-3M19.35 19.65L21 22l-1-3"/>
  </svg>
)
const IcoPerson = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
  </svg>
)
const IcoKite = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L22 12L12 22L2 12Z"/>
    <line x1="12" y1="12" x2="12" y2="22"/>
    <path d="M10 20 Q12 16 14 20"/>
  </svg>
)
const IcoVoucher = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="2"/>
    <path d="M16 7v10M8 7v10M12 11h2M12 14h2"/>
  </svg>
)

const COURSES = [
  {
    Icon: IcoGift,
    tag: 'GRATIS',
    title: 'Darmowa lekcja intro',
    desc: 'Nie wiesz czy kite jest dla Ciebie? Przyjdź sprawdzić — bez kosztów, bez zobowiązań. Godzina z instruktorem na plaży.',
    details: [{ v: '~1 godzina' }, { v: 'Jastarnia / Tenerife' }, { v: 'Absolutny start' }, { v: '1 osoba' }],
    price: 'GRATIS',
    priceNote: 'bez warunków',
    image: 'https://images.unsplash.com/photo-1643240260139-d27d5a899d13?w=600&h=400&fit=crop&q=80',
    accent: '#ff6b35',
    featured: false,
    cta: 'Chcę darmową lekcję',
  },
  {
    Icon: IcoWave,
    tag: 'KURS GRUPOWY',
    title: 'Kite Start',
    desc: 'Kompleksowy kurs dla początkujących — zasady bezpieczeństwa, sterowanie latawcem, pierwsze body dragi i wodny start.',
    details: [{ v: '3 godziny' }, { v: 'Jastarnia / Tenerife' }, { v: 'Beginners' }, { v: 'Max 4 os.' }],
    price: '€200',
    priceNote: 'sprzęt w cenie',
    image: 'https://images.unsplash.com/photo-1627068477565-3a66d5f76d5e?w=600&h=400&fit=crop&q=80',
    accent: 'var(--accent-cyan)',
    featured: false,
    cta: 'Zapisz się →',
  },
  {
    Icon: IcoCert,
    tag: 'IKO CERTYFIKAT',
    title: 'Kite Start PRO',
    desc: '5 godzin (3h + 2h) pełnego programu IKO zakończone egzaminem i oficjalnym certyfikatem — honorowanym przez szkoły na całym świecie.',
    details: [{ v: '5 godzin (3h+2h)' }, { v: 'Jastarnia / Tenerife' }, { v: 'IKO Level 1' }, { v: 'Max 3 os.' }],
    price: '€350',
    priceNote: 'z certyfikatem IKO',
    image: 'https://images.unsplash.com/photo-1768639400733-45d6cead226a?w=600&h=400&fit=crop&q=80',
    accent: 'var(--accent-cyan)',
    featured: true,
    cta: 'Zapisz się →',
  },
  {
    Icon: IcoPerson,
    tag: 'INDYWIDUALNIE',
    title: 'Lekcja prywatna',
    desc: 'Instruktor wyłącznie dla Ciebie. Dowolny poziom, dowolny termin. Szybszy progres, pełna uwaga, technika szyta na miarę.',
    details: [{ v: 'Elastyczny czas' }, { v: 'Jastarnia / Tenerife' }, { v: 'Każdy poziom' }, { v: '1 na 1' }],
    price: 'Zapytaj',
    priceNote: 'indywidualnie',
    image: 'https://images.unsplash.com/photo-1691593629564-b33587fee6ed?w=600&h=400&fit=crop&q=80',
    accent: 'var(--accent-cyan)',
    featured: false,
    cta: 'Zapytaj o cenę →',
  },
  {
    Icon: IcoKite,
    tag: 'WYPOŻYCZALNIA',
    title: 'Wynajem sprzętu',
    desc: 'Już umiesz jeździć? Wypożycz sprzęt Duotone lub Airush i korzystaj ze spotu samodzielnie. Latawce, deski, trapezy, pianki.',
    details: [{ v: 'Duotone & Airush' }, { v: 'Jastarnia / Tenerife' }, { v: 'Min. IKO Level 2' }, { v: 'Indywidualnie' }],
    price: 'Zapytaj',
    priceNote: 'zestaw lub osobno',
    image: 'https://images.unsplash.com/photo-1620152174993-40a74a7e24c2?w=600&h=400&fit=crop&q=80',
    accent: 'var(--accent-cyan)',
    featured: false,
    cta: 'Sprawdź dostępność →',
  },
  {
    Icon: IcoVoucher,
    tag: 'VOUCHER PDF',
    title: 'Voucher prezentowy',
    desc: 'Podaruj bliskiej osobie niezapomniane wrażenia. Elegancki PDF gotowy do druku lub wysyłki. Ważny 12 miesięcy.',
    details: [{ v: 'Wysyłka e-mail PDF' }, { v: 'Ważność 12 miesięcy' }, { v: 'Dowolna kwota' }],
    price: 'od 1 zł',
    priceNote: 'dowolna wartość',
    image: 'https://images.unsplash.com/photo-1530091902417-c9c5d9b0bce4?w=600&h=400&fit=crop&q=80',
    accent: 'var(--accent-cyan)',
    featured: false,
    cta: 'Kup voucher →',
  },
]

const fadeUp = { hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16,1,0.3,1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

export default function Courses() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="courses" style={{ background: 'var(--bg-primary)', padding: '88px 24px' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger} style={{ marginBottom: 60 }}>
          <motion.div variants={fadeUp} className="section-tag" style={{ marginBottom: 18 }}>Oferta</motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2 variants={fadeUp} className="display" style={{
              fontWeight: 800, fontSize: 'clamp(38px,5.5vw,68px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--text-primary)',
            }}>
              Co <span style={{ color: 'var(--accent-cyan)' }}>oferujemy</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: 'var(--text-muted)', maxWidth: 380, lineHeight: 1.72, fontSize: '0.97rem' }}>
              Od pierwszego kontaktu z latawcem po samodzielną jazdę.
              Sprzęt Duotone & Airush zawsze wliczony w cenę kursu.
            </motion.p>
          </div>
        </motion.div>

        <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={stagger}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {COURSES.map(c => (
            <motion.div key={c.title} variants={fadeUp}
              className="course-card"
              style={c.featured ? { borderColor: 'rgba(6,214,247,0.3)', boxShadow: '0 0 40px rgba(6,214,247,0.08)' } : {}}
            >
              {/* Image */}
              <div style={{ height: c.featured ? 220 : 185, position: 'relative', overflow: 'hidden' }}>
                <img src={c.image} alt={c.title} className="card-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,13,20,0.95) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', top: 14, left: 14 }}>
                  <span className="mono" style={{
                    background: 'rgba(4,13,20,0.72)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${c.accent}44`, color: c.accent,
                    fontSize: '0.58rem', letterSpacing: '0.14em', padding: '4px 10px', borderRadius: 20,
                  }}>{c.tag}</span>
                </div>
                {c.featured && (
                  <div style={{ position: 'absolute', top: 14, right: 14 }}>
                    <span className="mono" style={{
                      background: 'var(--accent-cyan)', color: '#040d14',
                      fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', padding: '4px 10px', borderRadius: 20,
                    }}>★ POLECANY</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '22px 24px 24px' }}>
                {/* Icon + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${c.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.accent,
                  }}>
                    <c.Icon />
                  </div>
                  <h3 className="display" style={{ fontWeight: 700, fontSize: '1.45rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                    {c.title}
                  </h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16, fontSize: '0.87rem' }}>{c.desc}</p>

                {/* Meta chips */}
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 }}>
                  {c.details.map(m => (
                    <span key={m.v} style={{
                      fontSize: '0.73rem', color: 'var(--text-muted)',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                      padding: '5px 10px', borderRadius: 6,
                    }}>{m.v}</span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div className="display" style={{ fontWeight: 800, fontSize: '1.4rem', color: c.accent, lineHeight: 1 }}>{c.price}</div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 2 }}>{c.priceNote}</div>
                  </div>
                  <a href="#contact" className="btn-primary" style={{
                    fontSize: '0.8rem', padding: '10px 18px', flexShrink: 0,
                    background: c.accent === '#ff6b35' ? '#ff6b35' : 'var(--accent-cyan)',
                  }}>{c.cta}</a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom hint */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
          className="glass" style={{ borderRadius: 14, padding: '20px 28px', marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
        >
          <div style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}><IcoGift /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Nie wiesz który kurs wybrać?</strong>{' '}
            Napisz do nas — dobierzemy program do Twojego poziomu.
            A jeśli dopiero zaczynasz — <strong style={{ color: 'var(--accent-cyan)' }}>pierwsza lekcja gratis</strong>.
          </p>
          <a href="#contact" className="btn-outline" style={{ flexShrink: 0, fontSize: '0.85rem', padding: '10px 20px' }}>Zapytaj →</a>
        </motion.div>
      </div>
    </section>
  )
}
