import { motion } from 'framer-motion'

/**
 * GlobalClouds v2 — SVG ellipses + CSS filter:blur
 *
 * Podejście:
 *   Każda chmura = <motion.div> z inline <svg> białych elips.
 *   CSS filter:blur() per div → miękkie, naturalne krawędzie.
 *   Brak mix-blend-mode, brak gradient layers, brak GPU texture artifacts.
 *   Białe elipsy na ciemnym tle (#1b3f6a) → widoczne chmury bez żadnych trików.
 *   willChange:transform → każda chmura = swój mały, niezależny compositing layer.
 *
 * Kształty:
 *   0 — classic cumulus     380 × 160
 *   1 — wide stratus        580 × 145
 *   2 — tall cumulonimbus   320 × 220
 *   3 — storm mass          520 × 195
 *   4 — small puff          280 × 120
 */

// Każdy shape: lista elips [cx, cy, rx, ry] w px we własnym viewport (w × h)
const SHAPES = [
  { w: 380, h: 160, e: [           // 0 — classic cumulus
    [190, 125, 130,  40],          //   płaska podstawa
    [ 95,  95,  65,  52],          //   lewy kop
    [295,  98,  58,  48],          //   prawy kop
    [185,  58,  72,  60],          //   środkowy szczyt
    [280,  60,  48,  42],          //   prawo-środkowy kop
  ]},
  { w: 580, h: 145, e: [           // 1 — wide stratus
    [290, 118, 162,  36],          //   szeroka baza
    [ 75,  86,  58,  50],          //   lewy kop
    [195,  70,  62,  56],          //   lewo-środkowy
    [390,  68,  58,  54],          //   prawo-środkowy
    [510,  88,  52,  44],          //   prawy kop
    [290,  44,  50,  38],          //   centrum górne
  ]},
  { w: 320, h: 220, e: [           // 2 — tall cumulonimbus
    [160, 192,  98,  35],          //   baza
    [160, 148,  74,  54],          //   dolny środek
    [160,  94,  82,  62],          //   górny środek
    [160,  40,  62,  46],          //   kopuła wierzchnia
    [108, 138,  46,  34],          //   lewe wybrzuszenie
    [212, 134,  40,  32],          //   prawe wybrzuszenie
  ]},
  { w: 520, h: 195, e: [           // 3 — storm mass
    [260, 158, 168,  44],          //   masywna baza
    [ 80, 118,  64,  54],          //   lewa wieża
    [440, 120,  56,  50],          //   prawa wieża
    [190,  72,  76,  62],          //   lewa kopuła
    [350,  68,  72,  58],          //   prawa kopuła
    [260,  38,  58,  50],          //   apex
  ]},
  { w: 280, h: 120, e: [           // 4 — small puff
    [140,  88,  86,  36],          //   baza
    [ 65,  68,  48,  42],          //   lewy kop
    [215,  70,  44,  38],          //   prawy kop
    [140,  46,  52,  44],          //   szczyt
  ]},
]

function Cloud({ s, top, left, opacity = 0.82, blur = 11, dx = 70, dy = 8, dur = 24 }) {
  const { w, h, e } = SHAPES[s]
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position:      'absolute',
        top,
        left,
        pointerEvents: 'none',
        opacity,
        filter:        `blur(${blur}px)`,
        willChange:    'transform',
      }}
      animate={{ x: [0, dx, 0], y: [0, dy, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ display: 'block' }}
        aria-hidden="true"
      >
        {e.map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="white" />
        ))}
      </svg>
    </motion.div>
  )
}

export default function GlobalClouds() {
  return (
    <div
      aria-hidden="true"
      style={{
        position:      'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex:        1,
        pointerEvents: 'none',
      }}
    >
      {/* ── Hero 0–100vh: brak chmur ─────────────────────────── */}

      {/* ── HowItWorks + About: ~100–260vh ── */}
      <Cloud s={0} top="105vh" left="-2vw"  opacity={0.78} blur={11} dx={ 90} dy={-10} dur={27} />
      <Cloud s={3} top="138vh" left="52vw"  opacity={0.72} blur={14} dx={-80} dy={ 12} dur={24} />
      <Cloud s={1} top="182vh" left="66vw"  opacity={0.75} blur={10} dx={ 76} dy={-11} dur={29} />
      <Cloud s={2} top="222vh" left="4vw"   opacity={0.70} blur={13} dx={-88} dy={  9} dur={23} />

      {/* ── Instructors + Locations: ~260–405vh ── */}
      <Cloud s={4} top="262vh" left="44vw"  opacity={0.74} blur={ 8} dx={ 84} dy={ -9} dur={22} />
      <Cloud s={1} top="298vh" left="69vw"  opacity={0.68} blur={10} dx={-72} dy={ 11} dur={26} />
      <Cloud s={3} top="340vh" left="-1vw"  opacity={0.76} blur={14} dx={ 92} dy={-12} dur={25} />
      <Cloud s={0} top="378vh" left="54vw"  opacity={0.71} blur={11} dx={-86} dy={ 10} dur={24} />

      {/* ── Courses: ~410–498vh ── */}
      <Cloud s={2} top="415vh" left="72vw"  opacity={0.69} blur={13} dx={ 80} dy={-10} dur={21} />
      <Cloud s={4} top="455vh" left="10vw"  opacity={0.73} blur={ 8} dx={-78} dy={  9} dur={23} />

      {/* ── Gallery: ~500–598vh ── */}
      <Cloud s={1} top="498vh" left="55vw"  opacity={0.74} blur={10} dx={ 88} dy={-11} dur={27} />
      <Cloud s={3} top="540vh" left="2vw"   opacity={0.70} blur={14} dx={-90} dy={ 10} dur={28} />

      {/* ── Reviews: ~578–650vh ── */}
      <Cloud s={0} top="580vh" left="50vw"  opacity={0.72} blur={11} dx={ 82} dy={-10} dur={25} />
      <Cloud s={2} top="620vh" left="71vw"  opacity={0.67} blur={13} dx={-76} dy={  9} dur={22} />

      {/* ── Pricing: ~656–730vh ── */}
      <Cloud s={4} top="658vh" left="8vw"   opacity={0.75} blur={ 8} dx={ 86} dy={-11} dur={24} />
      <Cloud s={1} top="698vh" left="54vw"  opacity={0.71} blur={10} dx={-84} dy={ 11} dur={26} />

      {/* ── FAQ: ~736–810vh ── */}
      <Cloud s={3} top="738vh" left="-2vw"  opacity={0.73} blur={14} dx={ 90} dy={-10} dur={27} />
      <Cloud s={0} top="778vh" left="52vw"  opacity={0.69} blur={11} dx={-80} dy={ 10} dur={25} />

      {/* ── FinalCTA + Contact: ~816–908vh ── */}
      <Cloud s={2} top="818vh" left="70vw"  opacity={0.67} blur={13} dx={ 78} dy={ -9} dur={23} />
      <Cloud s={4} top="858vh" left="6vw"   opacity={0.74} blur={ 8} dx={-82} dy={  9} dur={24} />
      <Cloud s={1} top="897vh" left="53vw"  opacity={0.72} blur={10} dx={ 88} dy={-11} dur={28} />
    </div>
  )
}