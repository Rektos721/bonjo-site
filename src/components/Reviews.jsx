import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Marta Kowalska',
    initials: 'MK',
    color: '#e67e22',
    date: '2 tygodnie temu',
    text: 'Niesamowite doświadczenie! Instruktor Piotr był super cierpliwy. Po 3 dniach kursu jeździłam już samodzielnie. Zdecydowanie polecam!',
  },
  {
    name: 'Tomasz Wiśniewski',
    initials: 'TW',
    color: '#2980b9',
    date: '1 miesiąc temu',
    text: 'Byłem totalnym żółtodziobem, a wróciłem z certyfikatem IKO Level 1. Sprzęt premium, instruktorzy z pasją. Wracam na Teneryfę już zimą.',
  },
  {
    name: 'Agnieszka Malinowska',
    initials: 'AM',
    color: '#8e44ad',
    date: '3 tygodnie temu',
    text: 'Jastarnia to idealne miejsce do nauki — świetny wiatr, piękna plaża i znakomita ekipa. Darmowa lekcja intro to strzał w dziesiątkę!',
  },
  {
    name: 'Michał Baranowski',
    initials: 'MB',
    color: '#16a085',
    date: '5 dni temu',
    text: 'Profesjonalna szkoła, sprzęt Duotone w świetnym stanie. Kurs dopasowany do mojego tempa, bez zbędnego pośpiechu. Szczerze polecam!',
  },
]

const Stars = () => (
  <div style={{ display:'flex', gap:2, marginBottom:10 }}>
    {Array.from({ length:5 }).map((_,i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f4c430">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
)

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.10 } } }
const cardVariant = {
  hidden: { opacity:0, y:22 },
  visible: { opacity:1, y:0, transition:{ duration:0.55, ease:[0.16,1,0.3,1] } },
}

export default function Reviews() {
  return (
    <section style={{ background:'var(--bg-primary)', padding:'0 24px 0', position:'relative', zIndex:5 }}>
      {/* Pulls the card strip up so it overlaps the hero wave bottom */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          transform: 'translateY(-44px)',
        }}
        className="reviews-grid"
      >
        {REVIEWS.map(r => (
          <motion.div
            key={r.name}
            variants={cardVariant}
            style={{
              background: 'rgba(255,255,255,0.042)',
              border: '1px solid rgba(0,216,255,0.13)',
              borderRadius: 14,
              padding: '20px 20px 18px',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {/* Header row */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              {/* Avatar */}
              <div style={{
                width:36, height:36, borderRadius:'50%', flexShrink:0,
                background:r.color, display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:"'DM Sans', sans-serif", fontWeight:700, fontSize:'0.72rem', color:'#fff',
              }}>
                {r.initials}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:600, fontSize:'0.82rem', color:'var(--text-primary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {r.name}
                </div>
                <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', marginTop:1 }}>{r.date}</div>
              </div>
              {/* Google icon */}
              <div style={{ flexShrink:0, opacity:0.75 }}>
                <GoogleIcon />
              </div>
            </div>

            <Stars />

            <p style={{ fontSize:'0.82rem', color:'var(--text-muted)', lineHeight:1.65, margin:0 }}>
              {r.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile scrollable override */}
      <style>{`
        @media (max-width: 900px) {
          .reviews-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .reviews-grid {
            grid-template-columns: 1fr !important;
            transform: translateY(-20px) !important;
          }
        }
      `}</style>
    </section>
  )
}
