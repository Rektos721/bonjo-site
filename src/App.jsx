import Nav       from './components/Nav'
import Hero      from './components/Hero'
import Reviews   from './components/Reviews'
import About     from './components/About'
import Locations from './components/Locations'
import Courses   from './components/Courses'
import Pricing   from './components/Pricing'
import Gallery   from './components/Gallery'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

/**
 * GlobalClouds — 7 distinct cloud formations drifting linearly across the sky.
 * Each has a unique: vertical position, speed, size, direction, and start phase
 * (via negative animation-delay = "the animation started N seconds ago").
 *
 * LTR delay formula for desired start position X% of viewport:
 *   delay = -(dur * (X + 110) / 220)   e.g. X=65% on 88s → -70s
 * RTL:
 *   delay = -(dur * (110 - X) / 220)   e.g. X=20% on 115s → -47s
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
      {/* Main horizontal body */}
      <div style={{
        position:'absolute', width:w, height:h,
        background:`rgba(${rgb},${op})`,
        borderRadius: rx || '60% 40% 58% 42% / 44% 56% 44% 56%',
        filter:`blur(${blur}px)`,
      }} />
      {/* Upper puff — gives cloud volume */}
      <div style={{
        position:'absolute',
        width: Math.round(w * 0.48), height: Math.round(h * 1.05),
        background:`rgba(${rgb},${op * 0.78})`,
        borderRadius:'50%', filter:`blur(${Math.round(blur * 0.8)}px)`,
        top: Math.round(-h * 0.35), left: Math.round(w * 0.2),
      }} />
      {/* Trailing wisp */}
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
      position:'fixed', inset:0, zIndex:80,
      pointerEvents:'none', mixBlendMode:'screen', overflow:'hidden',
    }}>
      {/* C1 — top strip, drifts L→R, large, slow (start at ~65% of viewport) */}
      <Cloud top="7%"  dir="ltr" dur="88s"  del="-70s" w={500} h={120} rgb="218,234,250" op={0.14} />

      {/* C2 — upper zone, drifts R→L, medium-fast (start at ~20%) */}
      <Cloud top="16%" dir="rtl" dur="115s" del="-47s" w={380} h={95}  rgb="210,228,246" op={0.11} />

      {/* C3 — quarter height, drifts L→R, wide (start at ~10%) */}
      <Cloud top="29%" dir="ltr" dur="100s" del="-55s" w={540} h={108} rgb="215,232,250" op={0.12} rx="52% 48% 60% 40% / 42% 58% 42% 58%" />

      {/* C4 — mid page, drifts R→L, fast small cloud (start at ~75%) */}
      <Cloud top="42%" dir="rtl" dur="72s"  del="-13s" w={320} h={82}  rgb="208,226,244" op={0.10} />

      {/* C5 — just below half, drifts L→R, biggest, very slow (start at ~45%) */}
      <Cloud top="55%" dir="ltr" dur="130s" del="-92s" w={580} h={132} rgb="212,230,248" op={0.12} rx="58% 42% 55% 45% / 48% 52% 48% 52%" />

      {/* C6 — lower third, drifts R→L, medium (start at ~55%) */}
      <Cloud top="67%" dir="rtl" dur="95s"  del="-24s" w={420} h={98}  rgb="210,228,246" op={0.11} />

      {/* C7 — near bottom, drifts L→R, medium-fast (start at ~80%) */}
      <Cloud top="80%" dir="ltr" dur="108s" del="-95s" w={460} h={104} rgb="214,230,248" op={0.10} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <GlobalClouds />
      <Nav />
      <Hero />
      <Reviews />
      <About />
      <Locations />
      <Courses />
      <Pricing />
      <Gallery />
      <Contact />
      <Footer />
    </>
  )
}
