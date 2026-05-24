import { motion } from 'framer-motion'

/* ── Sky clouds — 3 shape variants, animated wrapper div (reliable), SVG blur inside ── */

// shape=0: klasyczna — szeroka podstawa + dwie kopuły
// shape=1: wydłużona — pozioma, jedna kopuła po lewej
// shape=2: puchata — trzy równe kopuły, bardziej okrągła
function cloudSVG(w, h, op, uid, shape) {
  const f = (v) => v.toFixed(2)
  const o = op, o9 = f(op*.90), o8 = f(op*.82), o7 = f(op*.74)
  const blur = [
    <filter key="f" id={uid} x="-55%" y="-90%" width="210%" height="280%">
      <feGaussianBlur stdDeviation={shape === 1 ? '14 7' : shape === 2 ? '10 10' : '12 9'} />
    </filter>
  ]
  if (shape === 1) return (
    <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block', overflow:'visible' }}>
      <defs>{blur}</defs>
      <ellipse cx={w*.52} cy={h*.70} rx={w*.46} ry={h*.26} fill={`rgba(255,255,255,${o})`}  filter={`url(#${uid})`}/>
      <ellipse cx={w*.22} cy={h*.36} rx={w*.16} ry={h*.24} fill={`rgba(255,255,255,${o9})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.74} cy={h*.44} rx={w*.13} ry={h*.18} fill={`rgba(255,255,255,${o7})`} filter={`url(#${uid})`}/>
    </svg>
  )
  if (shape === 2) return (
    <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block', overflow:'visible' }}>
      <defs>{blur}</defs>
      <ellipse cx={w*.45} cy={h*.68} rx={w*.40} ry={h*.30} fill={`rgba(255,255,255,${o})`}  filter={`url(#${uid})`}/>
      <ellipse cx={w*.24} cy={h*.32} rx={w*.19} ry={h*.30} fill={`rgba(255,255,255,${o9})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.54} cy={h*.26} rx={w*.17} ry={h*.26} fill={`rgba(255,255,255,${o8})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.74} cy={h*.46} rx={w*.14} ry={h*.20} fill={`rgba(255,255,255,${o7})`} filter={`url(#${uid})`}/>
    </svg>
  )
  // shape 0 (default)
  return (
    <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display:'block', overflow:'visible' }}>
      <defs>{blur}</defs>
      <ellipse cx={w*.46} cy={h*.70} rx={w*.42} ry={h*.30} fill={`rgba(255,255,255,${o})`}  filter={`url(#${uid})`}/>
      <ellipse cx={w*.28} cy={h*.30} rx={w*.22} ry={h*.28} fill={`rgba(255,255,255,${o9})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.62} cy={h*.46} rx={w*.18} ry={h*.20} fill={`rgba(255,255,255,${o8})`} filter={`url(#${uid})`}/>
    </svg>
  )
}

function SkyCloud({ top, left, w, h, op, anim, dur, del, shape = 0 }) {
  const uid = `cb${del.replace(/[^0-9]/g, '')}`
  return (
    // div wrapper — CSS animations on div are rock-solid; SVG transform animations can glitch
    <div aria-hidden="true" style={{
      position: 'absolute', top, left, width: w, height: h,
      pointerEvents: 'none',
      animation: `${anim} ${dur} ease-in-out infinite ${del}`,
      willChange: 'transform',
    }}>
      {cloudSVG(w, h, op, uid, shape)}
    </div>
  )
}

/* ── Hero photo — right-side, dissolves via CSS mask (true transparency) ── */
function HeroPhoto() {
  // mask-image = prawdziwa przezroczystość, zero color mismatch z tłem
  const maskLR = [
    'transparent 0%',
    'rgba(0,0,0,0.02) 7%',
    'rgba(0,0,0,0.09) 15%',
    'rgba(0,0,0,0.24) 25%',
    'rgba(0,0,0,0.50) 37%',
    'rgba(0,0,0,0.78) 50%',
    'black 63%',
  ].join(', ')

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
        width: '58%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Mask lewo-prawo: prawdziwa przezroczystość, nie kolorowa nakładka
        WebkitMaskImage: `linear-gradient(to right, ${maskLR})`,
        maskImage:        `linear-gradient(to right, ${maskLR})`,
      }}
    >
      {/* Zdjęcie — Ken Burns zoom-out */}
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
          filter: 'saturate(0.80) brightness(0.60)',
          display: 'block',
        }}
      />
      {/* Bottom — ciemna nakładka w stronę fal (kolor-agnostyczna, rgba) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 18%, rgba(0,0,0,0.08) 36%, transparent 54%)',
      }} />
      {/* Top vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, transparent 18%)',
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
      background: '#1b3f6a',
      overflow: 'hidden',
    }}>

      {/* ── Sky gradient ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, #1e4e98 0%, #224e96 28%, #1c4484 62%, #1b3f6a 100%)',
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

      {/* ── Horyzont — ciepła poświata, bez animacji, bez orba ── */}
      <div style={{
        position:'absolute', pointerEvents:'none',
        width:680, height:320, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(255,210,90,0.10) 0%, rgba(255,185,55,0.03) 55%, transparent 75%)',
        top:'-6%', right:'10%',
        filter:'blur(55px)',
      }} />

      {/* Cyan ambient glow */}
      <div style={{
        position:'absolute', pointerEvents:'none', width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(6,214,247,0.09) 0%, transparent 65%)',
        bottom:-80, right:-100,
      }} />

      {/* ── Chmury — inside hero, clip by overflow:hidden, before photo so photo paints on top ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {/* Row 1 — very top ~0-6% */}
        <SkyCloud top="1%"  left="-2%"  w={680} h={160} op={0.58} anim="drift-a" dur="22s" del="0s"   shape={0} />
        <SkyCloud top="3%"  left="36%"  w={520} h={130} op={0.54} anim="drift-b" dur="28s" del="-9s"  shape={1} />
        <SkyCloud top="0%"  left="68%"  w={560} h={140} op={0.56} anim="drift-c" dur="20s" del="-5s"  shape={2} />
        {/* Row 2 — mid-top ~10-18% */}
        <SkyCloud top="11%" left="5%"   w={440} h={112} op={0.52} anim="drift-d" dur="25s" del="-14s" shape={2} />
        <SkyCloud top="13%" left="44%"  w={560} h={136} op={0.54} anim="drift-a" dur="30s" del="-7s"  shape={0} />
        <SkyCloud top="9%"  left="80%"  w={380} h={96}  op={0.50} anim="drift-b" dur="18s" del="-12s" shape={1} />
        {/* Row 3 — lower sky ~22-38% */}
        <SkyCloud top="24%" left="-1%"  w={620} h={150} op={0.50} anim="drift-c" dur="24s" del="-18s" shape={1} />
        <SkyCloud top="28%" left="40%"  w={480} h={120} op={0.48} anim="drift-d" dur="27s" del="-4s"  shape={2} />
        <SkyCloud top="22%" left="74%"  w={500} h={124} op={0.49} anim="drift-a" dur="22s" del="-10s" shape={0} />
      </div>

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
              style={{ fontSize:'0.92rem', padding:'14px 24px', opacity:0.82, display:'inline-flex', alignItems:'center', gap:7 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" style={{ flexShrink:0 }}><path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M11.41 19.41A2 2 0 1 0 14 16H2"/><path d="M15.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/></svg>
              Sprawdź wiatr
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
          /* Mobile: foto jako full-bleed bg zamiast side panel */
          .hero-photo {
            width: 100% !important;
            left: 0 !important;
            opacity: 0.45;
            -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%) !important;
            mask-image: linear-gradient(to bottom, black 0%, black 55%, transparent 100%) !important;
          }
        }
        @media (max-width: 680px) {
          .hero-text-wrap h1 { font-size: clamp(52px, 14vw, 80px) !important; }
        }
      `}</style>
    </section>
  )
}
