import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Real Unsplash kitesurfing photos fetched from unsplash.com/s/photos/kitesurfing
const ITEMS = [
  { src: 'https://images.unsplash.com/photo-1578060124065-41f863eb9ebe?w=800&h=600&fit=crop&q=80',  caption: 'Big air — Jastarnia',              rows: 2, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1622194558808-31201656a85e?w=800&h=500&fit=crop&q=80',  caption: 'Pierwsze kroki z latawcem',          rows: 1, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1675589161163-79c5bf916e0b?w=800&h=500&fit=crop&q=80',  caption: 'El Médano, Tenerife — wiatr 25 kn',  rows: 1, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1643004867757-cfd1eafd007b?w=1200&h=500&fit=crop&q=80', caption: 'Zachód słońca nad Zatoką Pucką',      rows: 1, cols: 2 },
  { src: 'https://images.unsplash.com/photo-1690681200064-0302728b3572?w=800&h=600&fit=crop&q=80',  caption: 'Lekcja prywatna — 100% uwagi',       rows: 2, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1627906126892-cbfcebac02d7?w=800&h=500&fit=crop&q=80',  caption: 'Kite Start PRO w akcji',             rows: 1, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1691156805108-1c501e208ded?w=800&h=500&fit=crop&q=80',  caption: 'Kurs grupowy — Kite Start',          rows: 1, cols: 1 },
  { src: 'https://images.unsplash.com/photo-1611517533081-a74f3d409ce9?w=800&h=500&fit=crop&q=80',  caption: 'Sprzęt Duotone w terenie',           rows: 1, cols: 1 },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="gallery" style={{ background: 'var(--bg-primary)', padding: '88px 24px' }}>
      <div className="max-w-7xl mx-auto">

        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6" style={{ marginBottom: 44 }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: 18 }}>Galeria</div>
            <h2 className="display" style={{ fontWeight: 800, fontSize: 'clamp(38px,5.5vw,68px)', lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--text-primary)' }}>
              Uchwyć <span style={{ color: 'var(--accent-cyan)' }}>moment</span>
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', maxWidth: 320, lineHeight: 1.72, fontSize: '0.97rem' }}>
            Jastarnia latem, Tenerife zimą — dwa miejsca, jedna pasja.
            Dołącz do naszych kursantów.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '200px', gap: 10 }}>
          {ITEMS.map((item, i) => (
            <motion.div key={i} className="gallery-item"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.065, ease: [0.16,1,0.3,1] }}
              style={{ gridRow: item.rows > 1 ? `span ${item.rows}` : 'span 1', gridColumn: item.cols > 1 ? `span ${item.cols}` : 'span 1' }}
            >
              <img src={item.src} alt={item.caption} />
              <div className="gallery-caption">
                <span style={{ color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 500 }}>{item.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: 44 }}
        >
          <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontSize: '0.9rem' }}>
            Więcej zdjęć i relacji na Instagramie
          </p>
          <a href="https://www.instagram.com/surfbonjokiteboarding/" target="_blank" rel="noopener noreferrer"
            className="btn-outline" style={{ display: 'inline-block' }}>
            @surfbonjokiteboarding →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
