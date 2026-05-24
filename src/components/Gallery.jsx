import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ITEMS = [
  { src: 'https://images.unsplash.com/photo-1578060124065-41f863eb9ebe?w=800&h=1000&fit=crop&q=80', caption: 'Big air — Jastarnia' },
  { src: 'https://images.unsplash.com/photo-1622194558808-31201656a85e?w=800&h=550&fit=crop&q=80',  caption: 'Pierwsze kroki z latawcem' },
  { src: 'https://images.unsplash.com/photo-1675589161163-79c5bf916e0b?w=800&h=550&fit=crop&q=80',  caption: 'El Médano, Tenerife — 25 kn' },
  { src: 'https://images.unsplash.com/photo-1643004867757-cfd1eafd007b?w=800&h=460&fit=crop&q=80',  caption: 'Zachód słońca nad Zatoką Pucką' },
  { src: 'https://images.unsplash.com/photo-1690681200064-0302728b3572?w=800&h=920&fit=crop&q=80',  caption: 'Lekcja prywatna' },
  { src: 'https://images.unsplash.com/photo-1627906126892-cbfcebac02d7?w=800&h=530&fit=crop&q=80',  caption: 'Kite Start PRO w akcji' },
  { src: 'https://images.unsplash.com/photo-1691156805108-1c501e208ded?w=800&h=530&fit=crop&q=80',  caption: 'Kurs grupowy' },
  { src: 'https://images.unsplash.com/photo-1611517533081-a74f3d409ce9?w=800&h=530&fit=crop&q=80',  caption: 'Sprzęt Duotone w terenie' },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="gallery" style={{ background: 'var(--bg-secondary)', padding: '100px 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 52 }}
        >
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <span className="section-tag">Galeria</span>
            <h2 className="display" style={{
              fontWeight: 900,
              fontSize: 'clamp(38px,5.5vw,72px)',
              lineHeight: 1.0, letterSpacing: '-0.028em',
              color: 'var(--text-primary)',
            }}>
              Uchwyć <span style={{ color:'var(--accent-cyan)' }}>moment</span>
            </h2>
            <p style={{ color:'var(--text-muted)', maxWidth:360, lineHeight:1.72, fontSize:'0.97rem' }}>
              Jastarnia latem, Tenerife zimą — dwa miejsca, jedna pasja.
            </p>
          </div>
        </motion.div>

        {/* Masonry grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ columns: '3 240px', columnGap: 10 }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16,1,0.3,1] }}
              style={{
                breakInside: 'avoid',
                marginBottom: 10,
                borderRadius: 10,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <img
                src={item.src}
                alt={item.caption}
                style={{
                  width: '100%',
                  display: 'block',
                  filter: 'saturate(0.78) brightness(0.84)',
                  transition: 'filter 0.5s ease, transform 0.5s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = 'saturate(1.05) brightness(1.0)'
                  e.currentTarget.style.transform = 'scale(1.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = 'saturate(0.78) brightness(0.84)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
              {/* Caption on hover */}
              <div className="gallery-caption">
                <span style={{ color:'var(--text-primary)', fontSize:'0.8rem', fontWeight:500 }}>
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign:'center', marginTop:48 }}
        >
          <p style={{ color:'var(--text-muted)', marginBottom:16, fontSize:'0.9rem' }}>
            Więcej zdjęć i relacji na Instagramie
          </p>
          <a
            href="https://www.instagram.com/surfbonjokiteboarding/"
            target="_blank" rel="noopener noreferrer"
            className="btn-outline"
            style={{ display:'inline-block' }}
          >
            @surfbonjokiteboarding →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
