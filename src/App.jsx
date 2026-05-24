import Nav            from './components/Nav'
import Hero           from './components/Hero'
import TrustBar       from './components/TrustBar'
import HowItWorks     from './components/HowItWorks'
import About          from './components/About'
import Instructors    from './components/Instructors'
import Locations      from './components/Locations'
import Courses        from './components/Courses'
import Gallery        from './components/Gallery'
import Reviews        from './components/Reviews'
import Pricing        from './components/Pricing'
import FAQ            from './components/FAQ'
import FinalCTA       from './components/FinalCTA'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

/**
 * Cloud — zawsze na ekranie, delikatny drift (nie cross-screen).
 * left/top to pozycja w dokumencie; anim to jedna z drift-a/b/c/d.
 */
function Cloud({ top, left, dur, del, anim, w, h, rgb, op, rx }) {
  const blur = Math.round(h * 0.22)
  return (
    <div style={{
      position:'absolute', top, left,
      width:w, height:h,
      animation:`${anim} ${dur} ease-in-out infinite ${del}`,
      willChange:'transform',
    }}>
      {/* Główne ciało chmury */}
      <div style={{
        position:'absolute', inset:0,
        background:`rgba(${rgb},${op})`,
        borderRadius: rx || '62% 38% 56% 44% / 46% 54% 46% 54%',
        filter:`blur(${blur}px)`,
      }} />
      {/* Górna bańka */}
      <div style={{
        position:'absolute',
        width: Math.round(w * 0.50), height: Math.round(h * 1.10),
        background:`rgba(${rgb},${op * 0.80})`,
        borderRadius:'50%',
        filter:`blur(${Math.round(blur * 0.72)}px)`,
        top: Math.round(-h * 0.40), left: Math.round(w * 0.18),
      }} />
      {/* Boczny wisp */}
      <div style={{
        position:'absolute',
        width: Math.round(w * 0.56), height: Math.round(h * 0.38),
        background:`rgba(${rgb},${op * 0.48})`,
        borderRadius:'50%',
        filter:`blur(${Math.round(blur * 1.25)}px)`,
        top: Math.round(h * 0.30), left: Math.round(w * 0.56),
      }} />
    </div>
  )
}

function GlobalClouds() {
  // 22 chmury z fixed pozycjami + drift — zawsze widoczne przy scrollu
  const C = Cloud
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, bottom:0, zIndex:1,
      pointerEvents:'none', mixBlendMode:'screen', overflow:'hidden',
    }}>
      {/* ── Hero area (0–18% page) ── */}
      <C top="1%"  left="2%"   dur="22s" del="0s"   anim="drift-a" w={680} h={155} rgb="238,248,255" op={0.55} />
      <C top="4%"  left="36%"  dur="28s" del="-9s"  anim="drift-b" w={500} h={125} rgb="230,244,255" op={0.50} rx="55%45%60%40%/48%52%48%52%" />
      <C top="0%"  left="62%"  dur="20s" del="-5s"  anim="drift-c" w={580} h={135} rgb="235,246,255" op={0.52} />
      <C top="9%"  left="14%"  dur="25s" del="-14s" anim="drift-d" w={420} h={105} rgb="228,242,255" op={0.48} rx="60%40%55%45%/44%56%44%56%" />
      <C top="11%" left="58%"  dur="30s" del="-7s"  anim="drift-a" w={540} h={128} rgb="232,246,255" op={0.50} />
      <C top="7%"  left="80%"  dur="18s" del="-12s" anim="drift-b" w={360} h={90}  rgb="225,240,255" op={0.46} />

      {/* ── Górna środkowa część (18–38%) ── */}
      <C top="18%" left="0%"   dur="24s" del="-18s" anim="drift-c" w={620} h={145} rgb="235,246,255" op={0.52} />
      <C top="20%" left="42%"  dur="27s" del="-4s"  anim="drift-d" w={460} h={112} rgb="228,242,255" op={0.48} />
      <C top="22%" left="72%"  dur="22s" del="-10s" anim="drift-a" w={500} h={118} rgb="232,244,255" op={0.50} rx="58%42%52%48%/46%54%46%54%" />
      <C top="30%" left="8%"   dur="26s" del="-16s" anim="drift-b" w={560} h={132} rgb="230,244,255" op={0.50} />
      <C top="33%" left="52%"  dur="21s" del="-8s"  anim="drift-c" w={400} h={98}  rgb="225,240,255" op={0.46} />

      {/* ── Środek strony (38–60%) ── */}
      <C top="38%" left="20%"  dur="29s" del="-20s" anim="drift-d" w={600} h={140} rgb="235,246,255" op={0.52} />
      <C top="41%" left="65%"  dur="23s" del="-6s"  anim="drift-a" w={480} h={115} rgb="228,242,255" op={0.48} />
      <C top="50%" left="3%"   dur="25s" del="-13s" anim="drift-b" w={540} h={128} rgb="232,246,255" op={0.50} rx="56%44%58%42%/50%50%48%52%" />
      <C top="53%" left="48%"  dur="20s" del="-3s"  anim="drift-c" w={420} h={102} rgb="225,240,255" op={0.46} />

      {/* ── Dolna część (60–100%) ── */}
      <C top="60%" left="18%"  dur="27s" del="-17s" anim="drift-d" w={580} h={136} rgb="230,244,255" op={0.50} />
      <C top="63%" left="62%"  dur="22s" del="-9s"  anim="drift-a" w={460} h={110} rgb="235,246,255" op={0.48} />
      <C top="72%" left="5%"   dur="24s" del="-11s" anim="drift-b" w={520} h={122} rgb="228,242,255" op={0.50} />
      <C top="75%" left="50%"  dur="29s" del="-5s"  anim="drift-c" w={500} h={118} rgb="232,244,255" op={0.48} rx="60%40%55%45%/44%56%44%56%" />
      <C top="82%" left="22%"  dur="21s" del="-15s" anim="drift-d" w={560} h={130} rgb="230,244,255" op={0.50} />
      <C top="86%" left="68%"  dur="26s" del="-7s"  anim="drift-a" w={440} h={106} rgb="225,240,255" op={0.46} />
      <C top="92%" left="8%"   dur="23s" del="-19s" anim="drift-b" w={500} h={118} rgb="232,246,255" op={0.48} />
    </div>
  )
}

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="noise" aria-hidden="true" />
      <GlobalClouds />
      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <About />
      <Instructors />
      <Locations />
      <Courses />
      <Gallery />
      <Reviews />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
