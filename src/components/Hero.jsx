import { motion } from 'framer-motion'

/* ── Kitesurfer SVG ─── */
function KitesurferSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', right: '3%', bottom: '0px',
        zIndex: 2, pointerEvents: 'none',
        filter: [
          'blur(0.4px)',
          'drop-shadow(0 0 64px rgba(0,200,255,0.72))',
          'drop-shadow(0 14px 44px rgba(0,10,50,0.96))',
          'drop-shadow(0 0 22px rgba(26,107,160,0.55))',
        ].join(' '),
      }}
    >
      <motion.svg
        width="400" height="580" viewBox="0 0 200 290" fill="none"
        animate={{ y: [0, -7, 0], rotate: [-0.6, 0.9, -0.6] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        {/* ══ KITE ══ */}
        <ellipse cx="155" cy="42" rx="52" ry="44" fill="rgba(0,140,220,0.07)" />
        <path d="M118,52 Q136,7 155,8 Q174,7 192,52 Q182,74 155,76 Q128,74 118,52Z"
          fill="#0085c8" opacity="0.92"/>
        <path d="M118,52 Q128,16 142,13 Q137,62 120,68Z" fill="rgba(0,15,90,0.44)"/>
        <path d="M192,52 Q182,16 168,13 Q173,62 190,68Z" fill="rgba(0,15,90,0.44)"/>
        {/* Leading edge */}
        <path d="M118,52 Q136,7 155,8 Q174,7 192,52"
          stroke="#70e5ff" strokeWidth="8.5" strokeLinecap="round" fill="none" opacity="0.92"/>
        <path d="M128,38 Q155,12 182,38"
          stroke="rgba(210,250,255,0.35)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        {/* Struts */}
        <line x1="142" y1="13" x2="137" y2="72" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1"/>
        <line x1="155" y1="8"  x2="155" y2="76" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1"/>
        <line x1="168" y1="13" x2="173" y2="72" stroke="rgba(255,255,255,0.18)" strokeWidth="1.1"/>
        <path d="M118,52 Q130,74 155,76 Q180,74 192,52"
          stroke="rgba(0,150,210,0.30)" strokeWidth="1.5" fill="none"/>

        {/* ══ CONTROL LINES ══ */}
        <line x1="128" y1="70" x2="72" y2="172" stroke="rgba(110,210,240,0.55)" strokeWidth="1.4"/>
        <line x1="182" y1="70" x2="108" y2="172" stroke="rgba(110,210,240,0.55)" strokeWidth="1.4"/>

        {/* ══ CONTROL BAR ══ */}
        <rect x="65" y="169" width="50" height="5.5" rx="2.75" fill="#235f80"/>
        <circle cx="65"  cy="171.5" r="3.5" fill="#194a60"/>
        <circle cx="115" cy="171.5" r="3.5" fill="#194a60"/>
        <line x1="90" y1="175" x2="90" y2="182" stroke="#235f80" strokeWidth="2.5" strokeLinecap="round"/>

        {/* ══ HEAD ══ */}
        <circle cx="24" cy="121" r="15" fill="#0c2448"/>
        <ellipse cx="27" cy="126" rx="11.5" ry="11" fill="#c8895a"/>
        <path d="M12,118 Q22,110 38,115" stroke="#0c2448" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        {/* Goggles */}
        <rect x="16" y="120" width="23" height="8.5" rx="4.25" fill="rgba(4,10,40,0.90)"/>
        <ellipse cx="21.5" cy="124" rx="5" ry="4" fill="rgba(0,155,220,0.28)"/>
        <ellipse cx="33.5" cy="124" rx="5" ry="4" fill="rgba(0,155,220,0.28)"/>
        <path d="M17,121 Q20,119 24,121" stroke="rgba(200,242,255,0.65)" strokeWidth="1.1" fill="none"/>
        <path d="M16,126 Q22,136 27,138 Q34,136 38,128" stroke="#0c2448" strokeWidth="1.8" fill="none" opacity="0.6"/>

        {/* ══ TORSO — ocean-blue wetsuit ══ */}
        {/* Drop shadow layer */}
        <path d="M40,137 Q66,155 100,183" stroke="rgba(0,20,60,0.70)" strokeWidth="19" strokeLinecap="round"/>
        {/* Main body — medium ocean blue */}
        <path d="M40,137 Q66,155 100,183" stroke="#1a6ba0" strokeWidth="14" strokeLinecap="round"/>
        {/* Highlight sheen */}
        <path d="M43,140 Q65,156 96,182" stroke="#2e90c6" strokeWidth="5" strokeLinecap="round" opacity="0.55"/>
        {/* Chest panel */}
        <path d="M46,143 Q62,152 82,163" stroke="#15558a" strokeWidth="11" strokeLinecap="round"/>
        <path d="M49,145 Q62,153 80,163" stroke="#2282ba" strokeWidth="4" strokeLinecap="round" opacity="0.45"/>

        {/* ── Harness — orange ── */}
        <path d="M50,158 Q72,168 96,180" stroke="#ff6b35" strokeWidth="7.5" strokeLinecap="round" opacity="0.93"/>
        <path d="M52,158 Q74,168 97,180" stroke="rgba(255,170,80,0.60)" strokeWidth="2.8" strokeLinecap="round"/>
        <circle cx="74" cy="164" r="4.2" fill="#cc4a10" opacity="0.90"/>
        <circle cx="74" cy="164" r="2.1" fill="rgba(255,205,100,0.80)"/>

        {/* ══ ARMS ══ */}
        <path d="M42,141 Q56,152 72,172" stroke="rgba(0,20,60,0.60)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M50,148 Q82,163 116,172" stroke="rgba(0,20,60,0.60)" strokeWidth="7.5" strokeLinecap="round"/>
        <path d="M42,141 Q56,152 72,172" stroke="#1a6ba0" strokeWidth="5.5" strokeLinecap="round"/>
        <path d="M50,148 Q82,163 116,172" stroke="#1a6ba0" strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx="72"  cy="173" rx="5.5" ry="4.2" fill="#07192e"/>
        <ellipse cx="116" cy="172" rx="5.5" ry="4.2" fill="#07192e"/>

        {/* ══ LEGS ══ */}
        <path d="M99,184 Q113,210 125,233" stroke="rgba(0,20,60,0.60)" strokeWidth="10" strokeLinecap="round"/>
        <path d="M107,189 Q122,217 148,236" stroke="rgba(0,20,60,0.60)" strokeWidth="9.5" strokeLinecap="round"/>
        <path d="M99,184 Q113,210 125,233" stroke="#1a6ba0" strokeWidth="7" strokeLinecap="round"/>
        <path d="M107,189 Q122,217 148,236" stroke="#1a6ba0" strokeWidth="6.5" strokeLinecap="round"/>
        <ellipse cx="125" cy="234" rx="9.5" ry="4.8" fill="#050e1e" transform="rotate(-4,125,234)"/>
        <ellipse cx="149" cy="237" rx="10" ry="4.2" fill="#050e1e" transform="rotate(-4,149,237)"/>

        {/* ══ BOARD ══ */}
        <ellipse cx="140" cy="247" rx="50" ry="6.5" fill="rgba(0,0,0,0.28)"/>
        <path d="M97,239 Q100,232 118,231 Q140,230 162,231 Q180,232 183,239 Q180,246 162,247 Q140,248 118,247 Q100,246 97,239Z"
          fill="#cde8f8" opacity="0.97"/>
        <path d="M101,238 Q106,233 120,232 Q140,231 160,232 Q176,233 179,238 Q176,244 160,245 Q140,246 120,245 Q106,244 101,238Z"
          fill="#eaf5ff" opacity="0.68"/>
        <line x1="118" y1="233" x2="162" y2="233" stroke="#00b8e8" strokeWidth="2.2" opacity="0.65"/>
        <rect x="117" y="232" width="15" height="9" rx="3" fill="rgba(0,70,155,0.50)"/>
        <rect x="148" y="231" width="15" height="9" rx="3" fill="rgba(0,70,155,0.50)"/>
        <path d="M117,231 Q124,229 132,231" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none"/>
        <path d="M148,231 Q155,229 163,231" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none"/>
        <path d="M106,241 L100,259 L114,241Z" fill="rgba(0,130,200,0.62)"/>
        <path d="M175,239 L181,257 L168,239Z" fill="rgba(0,130,200,0.58)"/>

        {/* ══ WATER SPRAY & WAKE ══ */}
        {/* Wake foam arc */}
        <path d="M88,250 C112,262 168,262 192,250"
          stroke="rgba(0,210,255,0.20)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Left spray arc */}
        <path d="M94,253 Q98,244 107,255"
          stroke="rgba(180,235,255,0.62)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* Right spray arc */}
        <path d="M170,251 Q176,242 182,253"
          stroke="rgba(180,235,255,0.62)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* Spray droplets */}
        <circle cx="87"  cy="261" r="2.2" fill="rgba(160,225,255,0.44)"/>
        <circle cx="99"  cy="269" r="1.5" fill="rgba(160,225,255,0.32)"/>
        <circle cx="138" cy="265" r="1.2" fill="rgba(160,225,255,0.26)"/>
        <circle cx="186" cy="260" r="2.0" fill="rgba(160,225,255,0.44)"/>
        <circle cx="177" cy="267" r="1.5" fill="rgba(160,225,255,0.30)"/>
      </motion.svg>
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

      {/* ── Kitesurfer ── */}
      <KitesurferSVG />

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
        }
        @media (max-width: 680px) {
          .hero-text-wrap h1 { font-size: clamp(52px, 14vw, 80px) !important; }
        }
      `}</style>
    </section>
  )
}
