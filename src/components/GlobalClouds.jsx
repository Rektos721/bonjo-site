import { motion } from 'framer-motion'

/**
 * Clouds made from overlapping radial-gradient ovals — NO filter:blur (that caused
 * gray halos), NO per-element mix-blend-mode. Just white gradients that fade to
 * transparent naturally. The container has mix-blend-mode:screen so they glow
 * bright-white on every dark section background.
 *
 * Each cloud: several large white ellipses stacked to form a bumpy silhouette.
 * A wider, very-low-opacity ellipse beneath each cloud adds the "poświata" haze.
 */

// e(cx%, cy%, rx%, ry%, op) → style object for one gradient oval (% relative to cloud div)
const e = (cx, cy, rx, ry, op) => ({
  position: 'absolute',
  left:   `${cx - rx}%`,
  top:    `${cy - ry}%`,
  width:  `${rx * 2}%`,
  height: `${ry * 2}%`,
  background: `radial-gradient(ellipse at 50% 55%, rgba(255,255,255,${op}) 0%, rgba(255,255,255,${+(op*.45).toFixed(2)}) 42%, transparent 70%)`,
})

// Glow haze around entire cloud
const glow = (op = 0.11) => ({
  position: 'absolute', inset: '-28%',
  background: `radial-gradient(ellipse at 50% 58%, rgba(255,255,255,${op}) 0%, transparent 62%)`,
})

function CloudShape({ w, h, s }) {
  if (s === 1) return ( // wide flat — 4 even bumps spread horizontally
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={e(50, 78, 48, 28, 0.91)}/>
      <div style={e(22, 50, 19, 30, 0.86)}/>
      <div style={e(45, 38, 21, 34, 0.90)}/>
      <div style={e(68, 44, 19, 29, 0.85)}/>
      <div style={e(88, 62, 15, 22, 0.80)}/>
      <div style={glow(0.09)}/>
    </div>
  )

  if (s === 2) return ( // tall cumulonimbus — narrow base, very tall central dome
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={e(50, 82, 42, 22, 0.92)}/>
      <div style={e(30, 56, 18, 32, 0.86)}/>
      <div style={e(50, 32, 23, 46, 0.94)}/>
      <div style={e(70, 60, 18, 30, 0.84)}/>
      <div style={glow(0.12)}/>
    </div>
  )

  if (s === 3) return ( // large storm — 5 overlapping masses, dramatic
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={e(50, 80, 48, 24, 0.92)}/>
      <div style={e(20, 52, 20, 34, 0.88)}/>
      <div style={e(44, 34, 23, 42, 0.94)}/>
      <div style={e(66, 38, 22, 40, 0.91)}/>
      <div style={e(86, 58, 17, 28, 0.83)}/>
      <div style={glow(0.13)}/>
    </div>
  )

  if (s === 4) return ( // small compact — two tight round domes
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={e(50, 74, 44, 28, 0.90)}/>
      <div style={e(34, 46, 21, 32, 0.86)}/>
      <div style={e(62, 48, 20, 31, 0.87)}/>
      <div style={glow(0.08)}/>
    </div>
  )

  // s === 0  classic medium cumulus — 3 domes, tallest in centre
  return (
    <div style={{ position: 'relative', width: w, height: h }}>
      <div style={e(50, 76, 46, 28, 0.92)}/>
      <div style={e(26, 52, 22, 33, 0.87)}/>
      <div style={e(50, 40, 24, 38, 0.94)}/>
      <div style={e(74, 58, 20, 29, 0.85)}/>
      <div style={glow(0.10)}/>
    </div>
  )
}

function Cloud({ top, left, w, h, s, dx, dy, dur }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', top, left, pointerEvents: 'none' }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <CloudShape w={w} h={h} s={s} />
    </motion.div>
  )
}

/**
 * Absolute overlay — scrolls with page, clouds appear at their page position.
 * mix-blend-mode:screen on container: additive white on dark sections = bright clouds,
 * zero impact on fully transparent areas. No overflow:hidden (that caused blue bar).
 */
export default function GlobalClouds() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 1, pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      {/* ── screen 1: Hero (0–70vh) ── */}
      <Cloud top="1vh"   left="-3vw" w={480} h={170} s={0} dx={125}  dy={-14} dur={22} />
      <Cloud top="7vh"   left="52vw" w={400} h={145} s={1} dx={-108} dy={10}  dur={29} />
      <Cloud top="40vh"  left="10vw" w={360} h={158} s={2} dx={98}   dy={-12} dur={20} />
      <Cloud top="60vh"  left="62vw" w={440} h={168} s={3} dx={-128} dy={13}  dur={27} />

      {/* ── screen 2: HowItWorks + About (80–168vh) ── */}
      <Cloud top="88vh"  left="1vw"  w={500} h={180} s={1} dx={118}  dy={-12} dur={25} />
      <Cloud top="128vh" left="46vw" w={380} h={155} s={4} dx={-102} dy={11}  dur={22} />
      <Cloud top="162vh" left="72vw" w={420} h={160} s={0} dx={108}  dy={-13} dur={26} />

      {/* ── screen 3: Instructors + Locations (195–275vh) ── */}
      <Cloud top="200vh" left="6vw"  w={460} h={172} s={3} dx={-124} dy={11}  dur={28} />
      <Cloud top="245vh" left="42vw" w={390} h={158} s={2} dx={102}  dy={-14} dur={21} />
      <Cloud top="272vh" left="74vw" w={340} h={142} s={1} dx={-92}  dy={10}  dur={23} />

      {/* ── screen 4: Courses + Gallery (305–388vh) ── */}
      <Cloud top="308vh" left="-1vw" w={510} h={185} s={0} dx={132}  dy={-12} dur={25} />
      <Cloud top="362vh" left="48vw" w={415} h={162} s={4} dx={-112} dy={12}  dur={24} />

      {/* ── screen 5: Reviews + Pricing (412–468vh) ── */}
      <Cloud top="418vh" left="15vw" w={455} h={170} s={2} dx={118}  dy={-13} dur={22} />
      <Cloud top="465vh" left="60vw" w={380} h={152} s={1} dx={-103} dy={11}  dur={20} />

      {/* ── screen 6: FAQ + CTA + Contact + Footer (520–640vh) ── */}
      <Cloud top="524vh" left="2vw"  w={480} h={178} s={3} dx={122}  dy={-12} dur={27} />
      <Cloud top="588vh" left="44vw" w={420} h={162} s={0} dx={-116} dy={12}  dur={25} />
      <Cloud top="638vh" left="76vw" w={360} h={148} s={4} dx={104}  dy={-10} dur={23} />
    </div>
  )
}
