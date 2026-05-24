import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const COURSES = [
  {
    level: 'PIERWSZY RAZ',
    levelColor: '#ff6b35',
    title: 'Lekcja Intro',
    duration: '~60 min',
    outcome: 'Czujesz latawiec w rękach. Zero ryzyka, zero kosztów.',
    price: 'GRATIS',
    priceColor: '#ff6b35',
    image: 'https://images.unsplash.com/photo-1643240260139-d27d5a899d13?w=700&h=420&fit=crop&q=80',
    cta: 'Zarezerwuj intro',
    featured: false,
  },
  {
    level: 'POCZĄTKUJĄCY',
    levelColor: 'var(--accent-cyan)',
    title: 'Kite Start',
    duration: '3 godziny',
    outcome: 'Wchodzisz do wody z latawcem. Pierwsze body dragi i poczucie wiatru.',
    price: '€200',
    priceColor: 'var(--accent-cyan)',
    image: 'https://images.unsplash.com/photo-1627068477565-3a66d5f76d5e?w=700&h=420&fit=crop&q=80',
    cta: 'Zapisz się',
    featured: false,
  },
  {
    level: 'POLECANY',
    levelColor: 'var(--accent-cyan)',
    title: 'Kite Start PRO',
    duration: '5 godzin',
    outcome: 'Jedziesz samodzielnie po wodzie. Certyfikat IKO Level 1 w kieszeni.',
    price: '€350',
    priceColor: 'var(--accent-cyan)',
    image: 'https://images.unsplash.com/photo-1768639400733-45d6cead226a?w=700&h=420&fit=crop&q=80',
    cta: 'Zapisz się na PRO',
    featured: true,
  },
  {
    level: 'KAŻDY POZIOM',
    levelColor: 'var(--accent-cyan)',
    title: 'Lekcja Prywatna',
    duration: 'Elastycznie',
    outcome: 'Twoje tempo, Twoje warunki. Instruktor dedykowany tylko Tobie.',
    price: 'Zapytaj',
    priceColor: 'var(--accent-cyan)',
    image: 'https://images.unsplash.com/photo-1691593629564-b33587fee6ed?w=700&h=420&fit=crop&q=80',
    cta: 'Zapytaj o cenę',
    featured: false,
  },
  {
    level: 'MIN. IKO LVL 2',
    levelColor: 'rgba(150,192,220,0.9)',
    title: 'Wynajem Sprzętu',
    duration: 'Godzinowo / dzień',
    outcome: 'Duotone & Airush gotowe do jazdy. Niezależna sesja na wodzie.',
    price: 'Zapytaj',
    priceColor: 'var(--accent-cyan)',
    image: 'https://images.unsplash.com/photo-1620152174993-40a74a7e24c2?w=700&h=420&fit=crop&q=80',
    cta: 'Sprawdź dostępność',
    featured: false,
  },
  {
    level: 'PREZENT',
    levelColor: 'var(--accent-gold)',
    title: 'Voucher',
    duration: 'Ważny 12 mies.',
    outcome: 'Podaruj komuś kite. Elegancki PDF gotowy od razu po zakupie.',
    price: 'od 1 zł',
    priceColor: 'var(--accent-gold)',
    image: 'https://images.unsplash.com/photo-1530091902417-c9c5d9b0bce4?w=700&h=420&fit=crop&q=80',
    cta: 'Kup voucher',
    featured: false,
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16,1,0.3,1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function Courses() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="courses" style={{ background: 'var(--bg-primary)', padding: '100px 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          style={{ marginBottom: 64 }}
        >
          <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
            <span className="section-tag">Oferta</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.h2 variants={fadeUp} className="display" style={{
              fontWeight: 900, fontSize: 'clamp(38px,5.5vw,72px)',
              lineHeight: 1.0, letterSpacing: '-0.028em', color: 'var(--text-primary)',
            }}>
              Co <span style={{ color:'var(--accent-cyan)' }}>oferujemy</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color:'var(--text-muted)', maxWidth:380, lineHeight:1.72, fontSize:'0.97rem' }}>
              Od pierwszego kontaktu z latawcem po samodzielną jazdę.
              Sprzęt Duotone & Airush zawsze w cenie kursu.
            </motion.p>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-7"
        >
          {COURSES.map(c => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                background: 'var(--glass-bg)',
                border: c.featured
                  ? '1px solid rgba(0,216,255,0.32)'
                  : '1px solid rgba(255,255,255,0.07)',
                boxShadow: c.featured ? '0 0 48px rgba(0,216,255,0.07)' : 'none',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s',
                position: 'relative', zIndex: 2,
              }}
              whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(0,0,0,0.35)' }}
            >
              {/* Image */}
              <div style={{ height: c.featured ? 210 : 180, overflow:'hidden', position:'relative' }}>
                <img
                  src={c.image} alt={c.title}
                  style={{
                    width:'100%', height:'100%', objectFit:'cover',
                    filter:'saturate(0.72) brightness(0.78)',
                    transition:'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform='scale(1.06)'; e.currentTarget.style.filter='saturate(0.9) brightness(0.88)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.filter='saturate(0.72) brightness(0.78)' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,13,20,0.88) 0%, transparent 58%)' }} />

                {/* Level badge — bottom of image */}
                <div style={{ position:'absolute', bottom:14, left:14 }}>
                  <span className="mono" style={{
                    background:'rgba(4,13,20,0.76)', backdropFilter:'blur(10px)',
                    border:`1px solid ${c.levelColor}50`,
                    color: c.levelColor,
                    fontSize:'0.57rem', letterSpacing:'0.14em',
                    padding:'4px 11px', borderRadius:20,
                  }}>
                    {c.level}
                  </span>
                </div>

                {c.featured && (
                  <div style={{ position:'absolute', top:14, right:14 }}>
                    <span className="mono" style={{
                      background:'var(--accent-cyan)', color:'#040d14',
                      fontSize:'0.57rem', fontWeight:700,
                      letterSpacing:'0.14em', padding:'4px 11px', borderRadius:20,
                    }}>★ POLECANY</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding:'26px 26px 28px' }}>

                {/* Duration chip */}
                <div style={{ marginBottom:14 }}>
                  <span style={{
                    fontSize:'0.67rem', color:'var(--text-muted)',
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.09)',
                    padding:'4px 11px', borderRadius:6,
                    letterSpacing:'0.04em',
                  }}>
                    ⏱ {c.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="display" style={{
                  fontWeight:800, fontSize:'1.55rem',
                  color:'var(--text-primary)', lineHeight:1, marginBottom:16,
                }}>
                  {c.title}
                </h3>

                {/* Outcome — highlighted with left border */}
                <div style={{
                  borderLeft:`2.5px solid ${c.levelColor}`,
                  paddingLeft:14, marginBottom:26,
                  color:'rgba(220,240,252,0.88)',
                  fontWeight:500, fontSize:'0.9rem', lineHeight:1.58,
                }}>
                  {c.outcome}
                </div>

                {/* Price + CTA */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                  <div>
                    <div className="display" style={{
                      fontWeight:900, fontSize:'1.5rem',
                      color: c.priceColor, lineHeight:1,
                    }}>
                      {c.price}
                    </div>
                  </div>
                  <a
                    href="#contact"
                    className="btn-primary"
                    style={{
                      fontSize:'0.8rem', padding:'11px 20px', flexShrink:0,
                      background: c.priceColor === '#ff6b35' ? '#ff6b35'
                        : c.priceColor === 'var(--accent-gold)' ? '#d4a800'
                        : 'var(--accent-cyan)',
                    }}
                  >
                    {c.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ delay:0.65 }}
          style={{ textAlign:'center', marginTop:44 }}
        >
          <p style={{ color:'var(--text-muted)', fontSize:'0.88rem' }}>
            Nie wiesz który kurs wybrać?{' '}
            <a href="#contact" style={{ color:'var(--accent-cyan)', textDecoration:'none' }}>
              Napisz do nas
            </a>{' '}
            — dobierzemy program do Twojego poziomu.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
