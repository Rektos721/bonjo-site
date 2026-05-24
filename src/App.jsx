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
 * GlobalClouds — 7 distinct cloud formations drifting linearly across the sky.
 */
function Cloud({ top, dir, dur, del, w, h, rgb, op, rx }) {
  const anim = dir === 'ltr' ? 'cloud-cross-ltr' : 'cloud-cross-rtl'
  const blur = Math.round(h * 0.24)
  return (
    <div style={{
      position:'absolute', top, left:0, width:0, height:0,
      animation:`${anim} ${dur} linear infinite ${del}`,
      willChange:'transform',
    }}>
      <div style={{
        position:'absolute', width:w, height:h,
        background:`rgba(${rgb},${op})`,
        borderRadius: rx || '60% 40% 58% 42% / 44% 56% 44% 56%',
        filter:`blur(${blur}px)`,
      }} />
      <div style={{
        position:'absolute',
        width: Math.round(w * 0.48), height: Math.round(h * 1.05),
        background:`rgba(${rgb},${op * 0.78})`,
        borderRadius:'50%', filter:`blur(${Math.round(blur * 0.8)}px)`,
        top: Math.round(-h * 0.35), left: Math.round(w * 0.2),
      }} />
      <div style={{
        position:'absolute',
        width: Math.round(w * 0.6), height: Math.round(h * 0.42),
        background:`rgba(${rgb},${op * 0.45})`,
        borderRadius:'50%', filter:`blur(${Math.round(blur * 1.3)}px)`,
        top: Math.round(h * 0.25), left: Math.round(w * 0.58),
      }} />
    </div>
  )
}

function GlobalClouds() {
  return (
    <div style={{
      position:'absolute', top:0, left:0, right:0, bottom:0, zIndex:1,
      pointerEvents:'none', mixBlendMode:'screen', overflow:'hidden',
    }}>
      <Cloud top="7%"  dir="ltr" dur="88s"  del="-70s" w={500} h={120} rgb="218,234,250" op={0.14} />
      <Cloud top="16%" dir="rtl" dur="115s" del="-47s" w={380} h={95}  rgb="210,228,246" op={0.11} />
      <Cloud top="29%" dir="ltr" dur="100s" del="-55s" w={540} h={108} rgb="215,232,250" op={0.12} rx="52% 48% 60% 40% / 42% 58% 42% 58%" />
      <Cloud top="42%" dir="rtl" dur="72s"  del="-13s" w={320} h={82}  rgb="208,226,244" op={0.10} />
      <Cloud top="55%" dir="ltr" dur="130s" del="-92s" w={580} h={132} rgb="212,230,248" op={0.12} rx="58% 42% 55% 45% / 48% 52% 48% 52%" />
      <Cloud top="67%" dir="rtl" dur="95s"  del="-24s" w={420} h={98}  rgb="210,228,246" op={0.11} />
      <Cloud top="80%" dir="ltr" dur="108s" del="-95s" w={460} h={104} rgb="214,230,248" op={0.10} />
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
