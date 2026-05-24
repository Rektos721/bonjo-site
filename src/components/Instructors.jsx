import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TEAM = [
  {
    name: 'Piotr Makowski',
    role: 'Head Instructor · IKO Level 2',
    years: 9,
    students: 280,
    spot: 'El Médano',
    quote: 'Kite zmienił moje życie. Teraz pomagam zmieniać Twoje.',
    certs: ['IKO Level 2', 'WOPR Ratownik'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=620&fit=crop&q=80',
  },
  {
    name: 'Ania Wiśniewska',
    role: 'Instruktor · IKO Level 1',
    years: 5,
    students: 130,
    spot: 'Jastarnia',
    quote: 'Każdy kursant to nowa historia pierwszego lotu.',
    certs: ['IKO Level 1', 'First Aid'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=620&fit=crop&q=80',
  },
  {
    name: 'Mateusz Dąbrowski',
    role: 'Instruktor · IKO Level 1',
    years: 4,
    students: 95,
    spot: 'Jastarnia & Tenerife',
    quote: 'Bezpieczeństwo przede wszystkim — potem adrenalina.',
    certs: ['IKO Level 1'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=620&fit=crop&q=80',
  },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16,1,0.3,1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

export default function Instructors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="team" style={{ background: 'var(--bg-primary)', padding: '100px 24px' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div style={{ marginBottom: 16 }}>
                <span className="section-tag">Nasz zespół</span>
              </div>
              <h2 className="display" style={{
                fontWeight: 900,
                fontSize: 'clamp(36px,5.5vw,68px)',
                lineHeight: 1.0, letterSpacing: '-0.028em',
                color: 'var(--text-primary)',
              }}>
                Uczymy, bo sami<br />
                <span style={{ color: 'var(--accent-cyan)' }}>to kochamy.</span>
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: 340, lineHeight: 1.72, fontSize: '0.97rem' }}>
              Certyfikowani instruktorzy IKO z prawdziwą pasją do kitesurfingu.
              Każdy z nich spędził setki godzin na wodzie — zanim trafił na plaże.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid md:grid-cols-3 gap-6"
        >
          {TEAM.map(inst => (
            <motion.div
              key={inst.name}
              variants={fadeUp}
              style={{
                borderRadius: 18, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'var(--glass-bg)',
              }}
            >
              {/* Photo */}
              <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={inst.image} alt={inst.name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'saturate(0.72) brightness(0.78)',
                    transition: 'transform 0.6s ease, filter 0.4s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.filter = 'saturate(0.9) brightness(0.88)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'saturate(0.72) brightness(0.78)' }}
                />
                {/* Gradient overlay */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,13,30,0.96) 0%, transparent 55%)' }}/>

                {/* Name + role */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px 22px' }}>
                  <div className="mono" style={{
                    fontSize:'0.58rem', color:'var(--accent-cyan)',
                    letterSpacing:'0.18em', marginBottom:6,
                  }}>
                    {inst.role}
                  </div>
                  <div className="display" style={{ fontWeight:800, fontSize:'1.45rem', color:'#fff', lineHeight:1 }}>
                    {inst.name}
                  </div>
                </div>
              </div>

              {/* Info below photo */}
              <div style={{ padding:'22px 22px 26px' }}>
                {/* Quote */}
                <p style={{
                  color:'rgba(200,230,248,0.72)',
                  fontSize:'0.88rem',
                  fontStyle:'italic',
                  lineHeight:1.65,
                  marginBottom:18,
                  borderLeft:'2px solid rgba(0,216,255,0.28)',
                  paddingLeft:12,
                }}>
                  "{inst.quote}"
                </p>

                {/* Cert badges */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:18 }}>
                  {inst.certs.map(c => (
                    <span key={c} className="mono" style={{
                      fontSize:'0.57rem', letterSpacing:'0.1em',
                      color:'var(--accent-cyan)',
                      background:'rgba(0,216,255,0.08)',
                      border:'1px solid rgba(0,216,255,0.2)',
                      padding:'4px 10px', borderRadius:20,
                    }}>
                      {c}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div style={{ display:'flex', gap:0 }}>
                  <div style={{ flex:1 }}>
                    <div className="display" style={{ fontWeight:800, fontSize:'1.5rem', color:'var(--text-primary)', lineHeight:1 }}>
                      {inst.years}
                    </div>
                    <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>
                      Lat na wodzie
                    </div>
                  </div>
                  <div style={{ width:1, background:'rgba(255,255,255,0.07)', margin:'0 18px' }}/>
                  <div style={{ flex:1 }}>
                    <div className="display" style={{ fontWeight:800, fontSize:'1.5rem', color:'var(--text-primary)', lineHeight:1 }}>
                      {inst.students}+
                    </div>
                    <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>
                      Kursantów
                    </div>
                  </div>
                  <div style={{ width:1, background:'rgba(255,255,255,0.07)', margin:'0 18px' }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'0.8rem', color:'var(--text-primary)', fontWeight:600, lineHeight:1.3 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink:0, display:'inline-block', verticalAlign:'middle', marginRight:4, marginBottom:1 }}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>{inst.spot}
                    </div>
                    <div style={{ fontSize:'0.6rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:4 }}>
                      Spot
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
