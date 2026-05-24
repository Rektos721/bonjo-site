import { motion } from 'framer-motion'

/**
 * Cloud shapes — overlapping circles composited as a GROUP, then one shared
 * feGaussianBlur to blend intersections. Result: cohesive cloud silhouette,
 * not separate blobs. stdDeviation just smooths circle joints (3-7px), NOT
 * the whole cloud, so no gray halo.
 *
 * vb = viewBox string (fixed coordinate space for circle positions)
 * c  = [[cx, cy, r], ...] — circle definitions
 * sd = feGaussianBlur stdDeviation
 */
const SHAPES = [
  { // 0: classic medium cumulus — wide base, two domes
    vb: '0 0 280 112', sd: 5,
    c: [[140,90,64],[78,90,48],[200,90,48],[106,61,46],[170,55,50],[140,39,35]],
  },
  { // 1: wide flat cirrus — horizontal streak, low profile
    vb: '0 0 400 78', sd: 7,
    c: [[200,58,47],[100,60,39],[300,59,41],[40,62,31],[360,59,31],[155,44,33],[245,41,31]],
  },
  { // 2: small compact puffy — three round bumps
    vb: '0 0 190 97', sd: 4,
    c: [[95,74,47],[52,75,37],[140,74,37],[74,47,39],[118,43,41],[96,31,29]],
  },
  { // 3: large dramatic cumulus — tall, many domes
    vb: '0 0 420 138', sd: 7,
    c: [[210,108,76],[114,108,61],[310,108,58],[52,108,44],[370,108,41],
        [155,71,56],[260,65,60],[200,49,46],[300,82,40]],
  },
]

function Cloud({ id, top, left, w, h, op, s, dx, dy, dur }) {
  const { vb, c, sd } = SHAPES[s]
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', top, left, width: w, height: h, pointerEvents: 'none' }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <svg viewBox={vb} width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          {/* Filter on group — all circles blur together into one shape */}
          <filter id={`cf${id}`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation={sd} />
          </filter>
        </defs>
        <g filter={`url(#cf${id})`}>
          {c.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={`rgba(255,255,255,${op})`} />
          ))}
        </g>
      </svg>
    </motion.div>
  )
}

/**
 * Absolute-positioned (not fixed) — clouds are part of the page, not the
 * viewport. They scroll naturally with content at the same speed as the page.
 * mix-blend-mode:screen makes them additive on dark backgrounds, invisible
 * on light ones, without covering any UI.
 *
 * Spread: 0–620vh → covers ~6 full screens of content at typical viewport.
 * dx/dy = mirror ping-pong travel in px via Framer Motion.
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
      {/* ─── screen 1: Hero + TrustBar (0–70vh) ─── */}
      <Cloud id={0}  top="2vh"   left="-3vw" w={310} h={122} op={0.30} s={0} dx={125}  dy={-13} dur={20} />
      <Cloud id={1}  top="10vh"  left="52vw" w={270} h={104} op={0.26} s={1} dx={-100} dy={9}   dur={27} />
      <Cloud id={2}  top="38vh"  left="14vw" w={200} h={90}  op={0.24} s={2} dx={90}   dy={-10} dur={18} />
      <Cloud id={3}  top="55vh"  left="65vw" w={295} h={118} op={0.27} s={3} dx={-115} dy={11}  dur={25} />

      {/* ─── screen 2: HowItWorks + About (80–175vh) ─── */}
      <Cloud id={4}  top="88vh"  left="4vw"  w={330} h={130} op={0.26} s={1} dx={110}  dy={-10} dur={22} />
      <Cloud id={5}  top="115vh" left="44vw" w={240} h={96}  op={0.24} s={2} dx={-90}  dy={10}  dur={20} />
      <Cloud id={6}  top="155vh" left="72vw" w={280} h={112} op={0.25} s={0} dx={100}  dy={-11} dur={23} />

      {/* ─── screen 3: Instructors + Locations (185–280vh) ─── */}
      <Cloud id={7}  top="195vh" left="8vw"  w={315} h={124} op={0.26} s={3} dx={-120} dy={9}   dur={26} />
      <Cloud id={8}  top="238vh" left="38vw" w={255} h={102} op={0.24} s={0} dx={95}   dy={-12} dur={19} />
      <Cloud id={9}  top="268vh" left="68vw" w={220} h={88}  op={0.23} s={1} dx={-85}  dy={8}   dur={21} />

      {/* ─── screen 4: Courses + Gallery (290–390vh) ─── */}
      <Cloud id={10} top="300vh" left="-1vw" w={345} h={134} op={0.26} s={2} dx={130}  dy={-10} dur={24} />
      <Cloud id={11} top="345vh" left="48vw" w={285} h={114} op={0.25} s={3} dx={-105} dy={11}  dur={22} />

      {/* ─── screen 5: Reviews + Pricing (400–490vh) ─── */}
      <Cloud id={12} top="405vh" left="18vw" w={300} h={120} op={0.25} s={0} dx={110}  dy={-11} dur={20} />
      <Cloud id={13} top="455vh" left="60vw" w={260} h={104} op={0.24} s={2} dx={-95}  dy={9}   dur={18} />

      {/* ─── screen 6: FAQ + CTA + Contact + Footer (510–620vh) ─── */}
      <Cloud id={14} top="515vh" left="5vw"  w={325} h={128} op={0.26} s={1} dx={115}  dy={-12} dur={25} />
      <Cloud id={15} top="580vh" left="42vw" w={295} h={118} op={0.25} s={3} dx={-110} dy={10}  dur={23} />
      <Cloud id={16} top="620vh" left="74vw" w={240} h={96}  op={0.23} s={0} dx={95}   dy={-9}  dur={21} />
    </div>
  )
}
