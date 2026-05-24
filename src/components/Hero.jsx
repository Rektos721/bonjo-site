import { motion } from 'framer-motion'
import Logo from './Logo'

const STATS = [
  { num: 'IKO',  label: 'Certyfikowana szkoła' },
  { num: '2',    label: 'Lokalizacje' },
  { num: '100%', label: 'Bezpieczeństwo' },
  { num: '5★',   label: 'Google Reviews' },
]

/* ── Kitesurfer SVG — realistic posture, dark wetsuit ─── */
function KitesurferSVG() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', right: '3%', bottom: '0px',
        zIndex: 2, pointerEvents: 'none',
        filter: 'blur(0.9px) drop-shadow(0 0 45px rgba(0,200,255,0.55)) drop-shadow(0 10px 32px rgba(0,15,60,0.92))',
      }}
    >
      <motion.svg
        width="360" height="522" viewBox="0 0 200 290" fill="none"
        animate={{ y: [0, -7, 0], rotate: [-0.6, 0.9, -0.6] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        {/* ══ KITE — bow/C-kite ══ */}
        <ellipse cx="155" cy="42" rx="52" ry="44" fill="rgba(0,140,220,0.06)" />
        <path d="M118,52 Q136,7 155,8 Q174,7 192,52 Q182,74 155,76 Q128,74 118,52Z"
          fill="#0085c8" opacity="0.90"/>
        <path d="M118,52 Q128,16 142,13 Q137,62 120,68Z" fill="rgba(0,15,90,0.42)"/>
        <path d="M192,52 Q182,16 168,13 Q173,62 190,68Z" fill="rgba(0,15,90,0.42)"/>
        {/* Leading edge tube */}
        <path d="M118,52 Q136,7 155,8 Q174,7 192,52"
          stroke="#70e5ff" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.90"/>
        <path d="M128,38 Q155,12 182,38"
          stroke="rgba(210,250,255,0.32)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Struts */}
        <line x1="142" y1="13" x2="137" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.1"/>
        <line x1="155" y1="8"  x2="155" y2="76" stroke="rgba(255,255,255,0.15)" strokeWidth="1.1"/>
        <line x1="168" y1="13" x2="173" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.1"/>
        <path d="M118,52 Q130,74 155,76 Q180,74 192,52"
          stroke="rgba(0,150,210,0.28)" strokeWidth="1.5" fill="none"/>

        {/* ══ CONTROL LINES ══ */}
        <line x1="128" y1="70" x2="72" y2="172" stroke="rgba(110,205,235,0.48)" strokeWidth="1.2"/>
        <line x1="182" y1="70" x2="108" y2="172" stroke="rgba(110,205,235,0.48)" strokeWidth="1.2"/>

        {/* ══ CONTROL BAR ══ */}
        <rect x="65" y="169" width="50" height="5.5" rx="2.75" fill="#3a7090"/>
        <circle cx="65"  cy="171.5" r="3.5" fill="#2a5a70"/>
        <circle cx="115" cy="171.5" r="3.5" fill="#2a5a70"/>
        <line x1="90" y1="175" x2="90" y2="182" stroke="#3a7090" strokeWidth="2.5" strokeLinecap="round"/>

        {/* ══ HEAD — helmet + goggles ══ */}
        {/* Helmet shell */}
        <circle cx="24" cy="121" r="15" fill="#0d2238"/>
        {/* Face skin */}
        <ellipse cx="27" cy="126" rx="11.5" ry="11" fill="#c8895a"/>
        {/* Helmet visor brim */}
        <path d="M12,118 Q22,110 38,115" stroke="#0d2238" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Goggles */}
        <rect x="16" y="120" width="23" height="8.5" rx="4.25" fill="rgba(4,10,38,0.88)"/>
        <ellipse cx="21.5" cy="124" rx="5" ry="4" fill="rgba(0,155,220,0.22)"/>
        <ellipse cx="33.5" cy="124" rx="5" ry="4" fill="rgba(0,155,220,0.22)"/>
        {/* Goggle glare */}
        <path d="M17,121 Q20,119 24,121" stroke="rgba(200,242,255,0.55)" strokeWidth="1" fill="none"/>
        {/* Chin */}
        <path d="M16,126 Q22,136 27,138 Q34,136 38,128" stroke="#0d2238" strokeWidth="1.8" fill="none" opacity="0.6"/>

        {/* ══ TORSO — dark wetsuit + bright harness ══ */}
        {/* Main torso body */}
        <path d="M40,137 Q66,155 100,183" stroke="#0d2240" strokeWidth="15" strokeLinecap="round"/>
        {/* Wetsuit colour stripe */}
        <path d="M42,141 Q66,157 98,183" stroke="#0094cc" strokeWidth="3.5" strokeLinecap="round" opacity="0.75"/>
        {/* Chest */}
        <path d="M46,143 Q62,152 82,163" stroke="#122840" strokeWidth="11" strokeLinecap="round"/>
        {/* ── Harness — bright orange belt, main visual anchor ── */}
        <path d="M50,158 Q72,168 96,180" stroke="#ff6b35" strokeWidth="7" strokeLinecap="round" opacity="0.90"/>
        <path d="M52,158 Q74,168 97,180" stroke="rgba(255,170,80,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Hook */}
        <circle cx="74" cy="164" r="4" fill="#cc4a10" opacity="0.85"/>
        <circle cx="74" cy="164" r="2" fill="rgba(255,200,100,0.7)"/>

        {/* ══ ARMS ══ */}
        <path d="M42,141 Q56,152 72,172" stroke="#0d2240" strokeWidth="5.5" strokeLinecap="round"/>
        <path d="M50,148 Q82,163 116,172" stroke="#0d2240" strokeWidth="5" strokeLinecap="round"/>
        {/* Gloves */}
        <ellipse cx="72"  cy="173" rx="5" ry="4" fill="#091824"/>
        <ellipse cx="116" cy="172" rx="5" ry="4" fill="#091824"/>

        {/* ══ LEGS — bent stance ══ */}
        <path d="M99,184 Q113,210 125,233" stroke="#0d2240" strokeWidth="7" strokeLinecap="round"/>
        <path d="M107,189 Q122,217 148,236" stroke="#0d2240" strokeWidth="6.5" strokeLinecap="round"/>
        {/* Booties */}
        <ellipse cx="125" cy="234" rx="9" ry="4.5" fill="#060e1a" transform="rotate(-4,125,234)"/>
        <ellipse cx="149" cy="237" rx="9.5" ry="4" fill="#060e1a" transform="rotate(-4,149,237)"/>

        {/* ══ BOARD — white kiteboard ══ */}
        {/* Board shadow */}
        <ellipse cx="140" cy="246" rx="44" ry="5.5" fill="rgba(0,0,0,0.22)"/>
        {/* Main board */}
        <path d="M97,239 Q100,232 118,231 Q140,230 162,231 Q180,232 183,239 Q180,246 162,247 Q140,248 118,247 Q100,246 97,239Z"
          fill="#cde8f8" opacity="0.96"/>
        {/* Top sheet gloss */}
        <path d="M101,238 Q106,233 120,232 Q140,231 160,232 Q176,233 179,238 Q176,244 160,245 Q140,246 120,245 Q106,244 101,238Z"
          fill="#eaf5ff" opacity="0.60"/>
        {/* Brand line */}
        <line x1="118" y1="233" x2="162" y2="233" stroke="#00b0e0" strokeWidth="2" opacity="0.55"/>
        {/* Foot pads */}
        <rect x="117" y="232" width="15" height="9" rx="3" fill="rgba(0,70,150,0.45)"/>
        <rect x="148" y="231" width="15" height="9" rx="3" fill="rgba(0,70,150,0.45)"/>
        {/* Strap highlight */}
        <path d="M117,231 Q124,229 132,231" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
        <path d="M148,231 Q155,229 163,231" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none"/>
        {/* Fins */}
        <path d="M106,241 L100,258 L114,241Z" fill="rgba(0,130,200,0.55)"/>
        <path d="M175,239 L181,256 L168,239Z" fill="rgba(0,130,200,0.50)"/>
      </motion.svg>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{
      position: 'relative', minHeight: '88svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#07162a', overflow: 'hidden',
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

      {/* ── Golden sun — upper left ── */}
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
      <div style={{ position:'absolute',pointerEvents:'none', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,214,247,0.11) 0%, transparent 65%)', bottom:-100, right:-120, animation:'orb2 18s ease-in-out infinite' }} />

      {/* ── Kitesurfer ── */}
      <KitesurferSVG />

      {/* ── Main content ── */}
      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'0 24px', maxWidth:980 }}>

        <motion.div
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6, delay:0.15 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:14, marginBottom:22 }}
        >
          <span className="section-tag">Szkoła Kitesurfingu</span>
          <span className="mono" style={{ background:'rgba(6,214,247,0.1)', border:'1px solid rgba(6,214,247,0.28)', color:'var(--accent-cyan)', fontSize:'0.62rem', letterSpacing:'0.15em', padding:'4px 12px', borderRadius:20 }}>IKO CERTIFIED</span>
        </motion.div>

        <motion.div
          initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:0.3, ease:[0.16,1,0.3,1] }}
          style={{ marginBottom:26 }}
        >
          <Logo height={118} showTagline={true} />
        </motion.div>

        <motion.p
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.6 }}
          style={{ color:'var(--text-muted)', fontSize:'clamp(15px,1.4vw,18px)', lineHeight:1.75, maxWidth:480, margin:'0 auto 36px', fontWeight:300 }}
        >
          Poczuj wiatr i wolność — latem w{' '}
          <span style={{ color:'var(--text-primary)', fontWeight:500 }}>Jastarni</span>,
          zimą na{' '}
          <span style={{ color:'var(--text-primary)', fontWeight:500 }}>Teneryfie</span>.
          Pierwsza lekcja{' '}
          <span style={{ color:'var(--accent-cyan)', fontWeight:600 }}>za darmo</span>.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, delay:0.75 }}
          style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}
        >
          <a href="#contact" className="btn-primary" style={{ fontSize:'0.95rem', padding:'15px 34px' }}>Zapisz się →</a>
          <a href="#locations" className="btn-outline" style={{ fontSize:'0.95rem', padding:'15px 34px' }}>Nasze spoty</a>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ duration:0.7, delay:1.05 }}
          style={{ display:'flex', justifyContent:'center', gap:'clamp(20px,5vw,60px)', marginTop:60, flexWrap:'wrap' }}
        >
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div className="display" style={{ fontWeight:800, color: s.num === '5★' ? 'var(--accent-gold)' : 'var(--accent-cyan)', lineHeight:1, fontSize:s.num.length>3?'clamp(14px,2vw,22px)':'clamp(20px,2.8vw,28px)' }}>{s.num}</div>
              <div style={{ fontSize:'0.7rem', color:'var(--text-muted)', marginTop:6, letterSpacing:'0.05em' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.3 }}
        style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2 }}
      >
        <span className="mono" style={{ fontSize:'0.58rem', letterSpacing:'0.22em', color:'var(--text-muted)' }}>PRZEWIŃ</span>
        <div style={{ width:22, height:34, borderRadius:11, border:'1.5px solid rgba(6,214,247,0.35)', display:'flex', justifyContent:'center', paddingTop:6 }}>
          <div style={{ width:3, height:8, borderRadius:2, background:'var(--accent-cyan)', animation:'scroll-bounce 2s ease-in-out infinite' }} />
        </div>
      </motion.div>

      {/* ── Wave divider — blurred ocean swells, faded at edges ── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:220, overflow:'hidden', zIndex:1,
        WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        maskImage:'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
      }}>
        {/* Ocean base */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:170,
          background:'linear-gradient(to top, rgba(0,15,52,0.96) 0%, rgba(0,30,95,0.70) 48%, transparent 100%)' }} />

        {/* Swell 1 — slowest, biggest, heavy blur */}
        <div className="wave-1" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(6px)' }}>
          {[0,1].map(i=><svg key={i} viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ width:'50%',height:220,display:'inline-block' }}>
            <path d="M0,182 C180,168 360,186 540,172 C720,158 900,178 1080,162 C1220,150 1380,143 1440,140 L1440,220 L0,220 Z"
              fill="rgba(0,30,115,0.65)"/>
          </svg>)}
        </div>

        {/* Swell 2 — medium speed, teal, medium blur + crest line */}
        <div className="wave-2" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(3px)' }}>
          {[0,1].map(i=><svg key={i} viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ width:'50%',height:220,display:'inline-block' }}>
            <path d="M0,188 C200,173 400,192 600,176 C800,161 1000,184 1200,165 C1320,154 1400,146 1440,143 L1440,220 L0,220 Z"
              fill="rgba(0,70,170,0.50)"/>
            <path d="M0,188 C200,173 400,192 600,176 C800,161 1000,184 1200,165 C1320,154 1400,146 1440,143"
              stroke="rgba(6,214,247,0.55)" strokeWidth="3" fill="none"/>
          </svg>)}
        </div>

        {/* Foam — fastest, light blur */}
        <div className="wave-3" style={{ width:'200%', position:'absolute', bottom:0, filter:'blur(1.5px)' }}>
          {[0,1].map(i=><svg key={i} viewBox="0 0 1440 110" preserveAspectRatio="none" style={{ width:'50%',height:110,display:'inline-block' }}>
            <path d="M0,82 C180,72 360,84 540,74 C720,64 900,80 1080,68 C1220,58 1380,53 1440,50 L1440,110 L0,110 Z"
              fill="rgba(0,120,205,0.32)"/>
            <path d="M0,84 C140,80 280,86 420,82 C560,78 700,84 840,80 C980,76 1160,80 1340,74 C1400,72 1430,72 1440,70 L1440,92 L0,92 Z"
              fill="rgba(180,238,255,0.11)"/>
          </svg>)}
        </div>
      </div>
    </section>
  )
}
