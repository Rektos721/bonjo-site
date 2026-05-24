import { motion } from 'framer-motion'

/* ── Hero photo — right-side action shot dissolving into background ── */
function HeroPhoto() {
  return (
    <motion.div
      aria-hidden="true"
      className="hero-photo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '56%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Actual photo — slow Ken Burns zoom-out */}
      <motion.img
        src="https://images.unsplash.com/photo-1578060124065-41f863eb9ebe?w=1100&h=1500&fit=crop&q=88"
        alt=""
        initial={{ scale: 1.07 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 2.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 22%',
          filter: 'saturate(0.82) brightness(0.62)',
          display: 'block',
        }}
      />

      {/* Left fade — topi się w ciemne tło hero */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #07162a 0%, rgba(7,22,42,0.88) 12%, rgba(7,22,42,0.55) 26%, rgba(7,22,42,0.15) 48%, transparent 68%)',
      }} />

      {/* Bottom fade — przejście w fale */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, #07162a 0%, rgba(7,22,42,0.80) 16%, rgba(7,22,42,0.3) 36%, transparent 58%)',
      }} />

      {/* Top vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(7,22,42,0.55) 0%, transparent 20%)',
      }} />

      {/* Subtelny cyan color-grade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, transparent 40%, rgba(0,100,200,0.10) 100%)',
        mixBlendMode: 'screen',
      }} />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#07162a',
      overflow: 'hidden',
    }}>

      {/* ── Sky gradient ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, #0d2f5e 0%, #112f5f 28%, #0c2450 62%, #07182e 100%)',
      }} />

      {/* ── Stars ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: [
          'radial-gradient(1.2px 1.2px at  8%  6%, rgba(255,255,255,0.55) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 72%  9%, rgba(255,255,255,0.45) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 38%  3%, rgba(255,255,255,0.40) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 88% 14%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 22% 18%, rgba(255,255,255,0.30) 0%, transparent 100%)',
          'radial-gradient(1.2px 1.2px at 58% 11%, rgba(255,255,255,0.28) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 95% 20%, rgba(255,255,255,0.22) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at  3% 26%, rgba(255,255,255,0.20) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 80% 32%, rgba(255,255,255,0.18) 0%, transparent 100%)',
          'radial-gradient(1px   1px   at 30% 35%, rgba(255,255,255,0.16) 0%, transparent 100%)',
        ].join(','),
      }} />

      {/* ── Golden sun ── */}
      <div style={{ position:'absolute',pointerEvents:'none', width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(244,196,48,0.22) 0%, rgba(244,160,20,0.09) 38%, transparent 62%)',
        top:'-10%', left:'-8%', filter:'blur(38px)', animation:'orb3 32s ease-in-out infinite' }} />
      <div style={{ position:'absolute',pointerEvents:'none', width:340, height:340, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,218,72,0.38) 0%, rgba(244,196,48,0.16) 50%, transparent 72%)',
        top:'-1%', left:'0%', filter:'blur(18px)', animation:'orb3 32s ease-in-out infinite' }} />
      <div style={{ position:'absolute',pointerEvents:'none', width:130, height:130, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,240,130,0.65) 0%, rgba(255,218,72,0.35) 55%, transparent 80%)',
        top:'4%', left:'5%', filter:'blur(7px)', animation:'orb3 32s ease-in-out infinite' }} />

      {/* Cyan ambient glow */}
      <div style={{ position:'absolute',pointerEvents:'none', width:700, height:700, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(6,214,247,0.11) 0%, transparent 65%)',
        bottom:-100, right:-120, animation:'orb2 18s ease-in-out infinite' }} />

      {/* ── Hero photo ── */}
      <HeroPhoto />

      {/* ── Main content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(80px,12vh,140px) 24px 290px',
      }}>
        <div className="hero-text-wrap">

          {/* Credential pill */}
          <motion.div
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.1 }}
            style={{ marginBottom:24 }}
          >
            <span className="mono" style={{
              background:'rgba(0,216,255,0.08)',
              border:'1px solid rgba(0,216,255,0.22)',
              color:'rgba(0,216,255,0.85)',
              fontSize:'0.6rem', letterSpacing:'0.2em',
              padding:'5px 14px', borderRadius:20,
            }}>
              ✦ CERTYFIKOWANA SZKOŁA IKO
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="display"
            initial={{ opacity:0, y:56 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1.05, delay:0.22, ease:[0.16,1,0.3,1] }}
            style={{
              fontWeight: 900,
              fontSize: 'clamp(64px,9.5vw,124px)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              marginBottom: 24,
            }}
          >
            Poczuj wiatr.<br />
            <span style={{ color:'var(--accent-cyan)' }}>Opanuj wodę.</span>
          </motion.h1>

          {/* Subheadline — 1 linia */}
          <motion.p
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.65, delay:0.52 }}
            style={{
              color: 'var(--text-muted)',
              fontSize: 'clamp(15px,1.25vw,17px)',
              lineHeight: 1.5,
              marginBottom: 44,
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            Certyfikowani instruktorzy IKO · Jastarnia & Tenerife · Pierwsza lekcja gratis
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.65, delay:0.68 }}
            style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}
          >
            <a href="#contact" className="btn-hero-primary">
              Zarezerwuj lekcję →
            </a>
            <a
              href="https://www.windfinder.com/forecast/hel"
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize:'0.92rem', padding:'14px 24px', opacity:0.82 }}
            >
              🌬 Sprawdź wiatr
            </a>
          </motion.div>

          {/* Social proof micro-line */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:0.95 }}
            style={{ display:'flex', alignItems:'center', gap:8, marginTop:26, flexWrap:'wrap' }}
          >
            <span style={{ color:'var(--accent-gold)', fontSize:'0.85rem', letterSpacing:'2px' }}>★★★★★</span>
            <span style={{ color:'rgba(140,185,215,0.55)', fontSize:'0.73rem' }}>
              5.0 · 48 opinii Google · Sprzęt Duotone & Airush w cenie
            </span>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.3 }}
        style={{
          position:'absolute', bottom:38, left:'50%', transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2,
        }}
      >
        <span className="mono" style={{ fontSize:'0.58rem', letterSpacing:'0.22em', color:'var(--text-muted)' }}>PRZEWIŃ</span>
        <div style={{
          width:22, height:34, borderRadius:11,
          border:'1.5px solid rgba(6,214,247,0.35)',
          display:'flex', justifyContent:'center', paddingTop:6,
        }}>
          <div style={{ width:3, height:8, borderRadius:2, background:'var(--accent-cyan)', animation:'scroll-bounce 2s ease-in-out infinite' }} />
        </div>
      </motion.div>

      {/* ── Wave divider — wyższe, gładkie kopuły, szeroka maska ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:280,
        overflow:'hidden', zIndex:1,
        WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        maskImage:'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
      }}>
        {/* Ocean base fill */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:220,
          background:'linear-gradient(to top, rgba(0,12,48,0.97) 0%, rgba(0,28,90,0.74) 50%, transparent 100%)' }} />

        {/* Swell 1 — najwolniejszy, najgłębszy, blur 6px */}
        {/* Kopuły symetryczne: dołki przy x=0,720,1440 (y=220), szczyty przy x=360,1080 (y=155) */}
        <div className="wave-1" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(6px)' }}>
          {[0,1].map(i=>(
            <svg key={i} viewBox="0 0 1440 280" preserveAspectRatio="none"
              style={{ width:'50%', height:280, display:'inline-block' }}>
              <path
                d="M0,220 C120,220 240,155 360,155 C480,155 600,220 720,220 C840,220 960,155 1080,155 C1200,155 1320,220 1440,220 L1440,280 L0,280 Z"
                fill="rgba(0,22,95,0.72)"/>
            </svg>
          ))}
        </div>

        {/* Swell 2 — średni, z linią grzbietu */}
        {/* Dołki y=230, szczyty y=172 */}
        <div className="wave-2" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(3px)' }}>
          {[0,1].map(i=>(
            <svg key={i} viewBox="0 0 1440 280" preserveAspectRatio="none"
              style={{ width:'50%', height:280, display:'inline-block' }}>
              <path
                d="M0,230 C120,230 240,172 360,172 C480,172 600,230 720,230 C840,230 960,172 1080,172 C1200,172 1320,230 1440,230 L1440,280 L0,280 Z"
                fill="rgba(0,55,158,0.52)"/>
              {/* Linia grzbietu — cyan glow */}
              <path
                d="M0,230 C120,230 240,172 360,172 C480,172 600,230 720,230 C840,230 960,172 1080,172 C1200,172 1320,230 1440,230"
                stroke="rgba(0,216,255,0.58)" strokeWidth="2.5" fill="none"/>
            </svg>
          ))}
        </div>

        {/* Foam — najszybszy, płytki, wiele małych kopuł */}
        {/* Dołki y=256, szczyty y=240 */}
        <div className="wave-3" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(1.5px)' }}>
          {[0,1].map(i=>(
            <svg key={i} viewBox="0 0 1440 280" preserveAspectRatio="none"
              style={{ width:'50%', height:280, display:'inline-block' }}>
              {/* Główna pianka */}
              <path
                d="M0,256 C80,256 160,240 240,240 C320,240 400,256 480,256 C560,256 640,240 720,240 C800,240 880,256 960,256 C1040,256 1120,240 1200,240 C1280,240 1360,256 1440,256 L1440,280 L0,280 Z"
                fill="rgba(0,105,190,0.36)"/>
              {/* Biała pianka — highlight */}
              <path
                d="M0,258 C60,258 120,247 180,247 C240,247 300,258 360,258 C420,258 480,247 540,247 C600,247 660,258 720,258 C780,258 840,247 900,247 C960,247 1020,258 1080,258 C1140,258 1200,247 1260,247 C1320,247 1380,258 1440,258 L1440,268 L0,268 Z"
                fill="rgba(185,240,255,0.13)"/>
            </svg>
          ))}
        </div>
      </div>

      <style>{`
        .hero-text-wrap { max-width: 580px; }
        @media (max-width: 860px) {
          .hero-text-wrap { max-width: 100%; text-align: center; }
          .hero-text-wrap > div { justify-content: center; }
          .hero-text-wrap p { margin-left: auto; margin-right: auto; }
          .hero-photo { display: none; }
        }
        @media (max-width: 680px) {
          .hero-text-wrap h1 { font-size: clamp(52px, 14vw, 80px) !important; }
        }
      `}</style>
    </section>
  )
}
