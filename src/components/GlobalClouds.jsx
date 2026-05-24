import { motion } from 'framer-motion'

/**
 * Cloud shapes defined as SVG arc paths.
 *
 * Each arc: A rx,ry 0 0 0 x,y  (sweep=0 = counterclockwise = bulges UP)
 * When chord = 2*rx the arc is a perfect semi-ellipse.
 *
 * All bumps sit on a common baseline y, then the path closes flat at the bottom.
 * One feGaussianBlur (sd=4) on the whole path softens edges only — the cloud
 * SHAPE comes from the geometry, not the blur.
 *
 * Bump peaks for each shape (y measured from top of viewBox):
 *   s=0  classic 3-bump:         y=48, 33, 50   (medium / tall / medium)
 *   s=1  wide 5-bump flat:       y=48, 36, 44, 34, 52
 *   s=2  tall central dome:      y=81, 33, 83   (dramatic thunderhead)
 *   s=3  large 4-bump dramatic:  y=93, 67, 63, 73  (storm cloud)
 *   s=4  small compact 2-bump:   y=39, 27
 */
const SHAPES = [
  { // 0 — classic 3-bump cumulus
    vW: 300, vH: 100,
    d: 'M 15,88 A 40,40 0 0 0 95,88 A 55,55 0 0 0 205,88 A 38,38 0 0 0 281,88 L 283,96 L 12,96 Z',
  },
  { // 1 — wide 5-bump flat cirrus-ish
    vW: 420, vH: 88,
    d: 'M 8,76 A 30,28 0 0 0 68,76 A 44,40 0 0 0 156,76 A 34,32 0 0 0 224,76 A 46,42 0 0 0 316,76 A 26,24 0 0 0 368,76 L 370,84 L 6,84 Z',
  },
  { // 2 — tall central dome + small side bumps (cumulonimbus)
    vW: 290, vH: 130,
    d: 'M 16,112 A 34,31 0 0 0 84,112 A 61,79 0 0 0 206,112 A 31,29 0 0 0 268,112 L 270,120 L 12,120 Z',
  },
  { // 3 — large dramatic 4-bump storm cloud
    vW: 500, vH: 155,
    d: 'M 8,134 A 44,41 0 0 0 96,134 A 56,67 0 0 0 208,134 A 50,71 0 0 0 308,134 A 54,61 0 0 0 416,134 L 418,146 L 4,146 Z',
  },
  { // 4 — small 2-bump compact cloud
    vW: 200, vH: 88,
    d: 'M 12,74 A 37,35 0 0 0 86,74 A 41,47 0 0 0 168,74 L 170,82 L 8,82 Z',
  },
]

/** Single animated cloud. mix-blend-mode:screen is on the parent container. */
function Cloud({ id, top, left, w, h, op, s, dx, dy, dur }) {
  const { vW, vH, d } = SHAPES[s]
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', top, left, width: w, height: h, pointerEvents: 'none' }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <svg
        viewBox={`0 0 ${vW} ${vH}`}
        width={w} height={h}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* sdDeviation=4 — softens path pixel edges only, contained in filter region */}
          <filter id={`cf${id}`} x="-8%" y="-28%" width="116%" height="156%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <path d={d} fill={`rgba(255,255,255,${op})`} filter={`url(#cf${id})`} />
      </svg>
    </motion.div>
  )
}

/**
 * Absolute-positioned overlay — scrolls WITH the page (not fixed).
 * Clouds appear at their page position, you scroll past them.
 * mix-blend-mode:screen → additive on dark backgrounds, zero impact on light.
 * 17 clouds across ~6.5 screens of page height.
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
      {/* ── screen 1: Hero + TrustBar (0–70vh) ── */}
      <Cloud id={0}  top="2vh"   left="-2vw" w={360} h={116} op={0.40} s={0} dx={125}  dy={-12} dur={20} />
      <Cloud id={1}  top="9vh"   left="50vw" w={320} h={90}  op={0.36} s={1} dx={-100} dy={9}   dur={27} />
      <Cloud id={2}  top="42vh"  left="14vw" w={270} h={110} op={0.38} s={2} dx={95}   dy={-10} dur={19} />
      <Cloud id={3}  top="60vh"  left="62vw" w={320} h={100} op={0.36} s={3} dx={-115} dy={11}  dur={24} />

      {/* ── screen 2: HowItWorks + About (80–170vh) ── */}
      <Cloud id={4}  top="88vh"  left="2vw"  w={350} h={112} op={0.38} s={1} dx={110}  dy={-10} dur={22} />
      <Cloud id={5}  top="122vh" left="46vw" w={260} h={104} op={0.36} s={4} dx={-92}  dy={10}  dur={20} />
      <Cloud id={6}  top="160vh" left="70vw" w={310} h={98}  op={0.37} s={0} dx={102}  dy={-11} dur={23} />

      {/* ── screen 3: Instructors + Locations (185–275vh) ── */}
      <Cloud id={7}  top="198vh" left="6vw"  w={345} h={110} op={0.38} s={3} dx={-122} dy={9}   dur={26} />
      <Cloud id={8}  top="238vh" left="42vw" w={270} h={108} op={0.36} s={2} dx={98}   dy={-12} dur={19} />
      <Cloud id={9}  top="270vh" left="74vw" w={240} h={94}  op={0.35} s={1} dx={-88}  dy={8}   dur={21} />

      {/* ── screen 4: Courses + Gallery (295–390vh) ── */}
      <Cloud id={10} top="305vh" left="-1vw" w={375} h={118} op={0.38} s={0} dx={130}  dy={-10} dur={24} />
      <Cloud id={11} top="358vh" left="48vw" w={310} h={98}  op={0.37} s={4} dx={-105} dy={11}  dur={22} />

      {/* ── screen 5: Reviews + Pricing (405–465vh) ── */}
      <Cloud id={12} top="412vh" left="18vw" w={335} h={106} op={0.37} s={2} dx={112}  dy={-11} dur={20} />
      <Cloud id={13} top="460vh" left="60vw" w={280} h={108} op={0.36} s={1} dx={-97}  dy={9}   dur={18} />

      {/* ── screen 6: FAQ + CTA + Contact + Footer (515–640vh) ── */}
      <Cloud id={14} top="520vh" left="3vw"  w={360} h={114} op={0.38} s={3} dx={118}  dy={-12} dur={25} />
      <Cloud id={15} top="584vh" left="42vw" w={310} h={98}  op={0.37} s={0} dx={-112} dy={10}  dur={23} />
      <Cloud id={16} top="635vh" left="74vw" w={260} h={104} op={0.36} s={4} dx={100}  dy={-9}  dur={21} />
    </div>
  )
}
