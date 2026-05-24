import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Marta Kowalska',
    initials: 'MK',
    color: '#e67e22',
    date: '2 tygodnie temu',
    quote: 'Po 3 dniach kursu jeździłam już samodzielnie. Instruktor Piotr — niesamowita cierpliwość i pasja.',
  },
  {
    name: 'Tomasz Wiśniewski',
    initials: 'TW',
    color: '#2980b9',
    date: '1 miesiąc temu',
    quote: 'Wróciłem z certyfikatem IKO Level 1. Sprzęt premium, instruktorzy z prawdziwą pasją. Wracam na Teneryfę zimą.',
  },
  {
    name: 'Agnieszka Malinowska',
    initials: 'AM',
    color: '#8e44ad',
    date: '3 tygodnie temu',
    quote: 'Jastarnia to idealne miejsce do nauki — świetny wiatr i znakomita ekipa. Darmowa lekcja intro to strzał w dziesiątkę!',
  },
  {
    name: 'Michał Baranowski',
    initials: 'MB',
    color: '#16a085',
    date: '5 dni temu',
    quote: 'Profesjonalna szkoła, sprzęt Duotone w świetnym stanie. Kurs dopasowany do mojego tempa. Szczerze polecam.',
  },
]

const Stars = () => (
  <div style={{ display:'flex', gap:3, marginBottom:16 }}>
    {Array.from({ length:5 }).map((_,i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f4c430">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
)

const fadeUp = {
  hidden:  { opacity:0, y:28 },
  visible: { opacity:1, y:0, transition:{ duration:0.65, ease:[0.16,1,0.3,1] } },
}
const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } }

export default function Reviews() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once:true, margin:'-8%' })

  return (
    <section id="testimonials" style={{ background:'var(--bg-primary)', padding:'100px 24px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={isInView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.7 }}
          style={{ textAlign:'center', marginBottom:64 }}
        >
          <div style={{ display:'flex', justifyContent:'center', marginBottom:18 }}>
            <span className="section-tag">Opinie kursantów</span>
          </div>
          <h2 className="display" style={{
            fontWeight:900, fontSize:'clamp(36px,5.5vw,68px)',
            lineHeight:1.0, letterSpacing:'-0.025em', color:'var(--text-primary)',
          }}>
            Co mówią <span style={{ color:'var(--accent-cyan)' }}>kursanci</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {REVIEWS.map(r => (
            <motion.div
              key={r.name}
              variants={fadeUp}
              style={{
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(0,216,255,0.10)',
                borderRadius:16,
                padding:'32px 28px',
                display:'flex', flexDirection:'column',
              }}
            >
              {/* Big quote mark */}
              <div style={{
                fontFamily:"'Big Shoulders Display', sans-serif",
                fontSize:'4rem', lineHeight:1,
                color:'rgba(0,216,255,0.12)',
                marginBottom:14,
                fontWeight:900,
                userSelect:'none',
              }}>
                "
              </div>

              {/* Quote text */}
              <p style={{
                color:'rgba(210,235,250,0.88)',
                lineHeight:1.72,
                fontSize:'0.93rem',
                flex:1,
                marginBottom:24,
                fontStyle:'italic',
              }}>
                {r.quote}
              </p>

              {/* Stars */}
              <Stars />

              {/* Author */}
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{
                  width:38, height:38, borderRadius:'50%', flexShrink:0,
                  background:r.color,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontWeight:700, fontSize:'0.72rem', color:'#fff',
                }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:'0.82rem', color:'var(--text-primary)' }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', marginTop:1 }}>
                    {r.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google link */}
        <motion.div
          initial={{ opacity:0 }}
          animate={isInView ? { opacity:1 } : {}}
          transition={{ delay:0.55 }}
          style={{ textAlign:'center', marginTop:44 }}
        >
          <a
            href="https://www.google.com/search?q=Surf+Bonjo+kiteboarding+opinie"
            target="_blank" rel="noopener noreferrer"
            style={{ color:'var(--text-muted)', fontSize:'0.82rem', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color='var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color='var(--text-muted)')}
          >
            <span style={{ color:'var(--accent-gold)', marginRight:6 }}>★★★★★</span>
            Zobacz wszystkie opinie Google →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
