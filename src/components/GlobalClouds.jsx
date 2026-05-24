import { motion } from 'framer-motion'

/**
 * Single-div clouds — each cloud is ONE div with multiple radial-gradient
 * background layers (no nested abs-positioned children).
 *
 * Why: nested positioned children inside a mix-blend-mode:screen container
 * create a separate GPU compositing sub-layer per child → sub-pixel rounding
 * artifacts = "pixeloza". One div = one compositing layer = clean render.
 *
 * Hero (0–100vh) is intentionally cloud-free so the photo is never covered.
 *
 * 5 geometrically distinct shapes — different aspect ratios reinforce the
 * visual difference:
 *   0 classic cumulus   w≈420  h≈165
 *   1 wide flat         w≈600  h≈145   very wide, shallow
 *   2 tall tower        w≈300  h≈215   narrow & tall
 *   3 storm complex     w≈548  h≈200   massive, 5 masses
 *   4 wispy             w≈500  h≈112   thin elongated
 */

// One gradient oval as background-image/size/position strings
function oval(cx, cy, rx, ry, op) {
  const fade = +(op * 0.30).toFixed(2)
  return {
    img: `radial-gradient(ellipse at 50% 54%, rgba(255,255,255,${op}) 0%, rgba(255,255,255,${fade}) 35%, transparent 62%)`,
    sz:  `${rx * 2}% ${ry * 2}%`,
    // "left X% top Y%" positions the image's left/top edge at X%/Y% of the element
    pos: `left ${cx - rx}% top ${cy - ry}%`,
  }
}

const glowOval = op => ({
  img: `radial-gradient(ellipse at 50% 56%, rgba(255,255,255,${op}) 0%, transparent 55%)`,
  sz:  '100% 100%',
  pos: 'left 0% top 0%',
})

function mkShape(ovals, glowOpacity) {
  const ls = [...ovals.map(([cx, cy, rx, ry, op]) => oval(cx, cy, rx, ry, op)), glowOval(glowOpacity)]
  return {
    backgroundImage:    ls.map(l => l.img).join(','),
    backgroundSize:     ls.map(l => l.sz).join(','),
    backgroundPosition: ls.map(l => l.pos).join(','),
    backgroundRepeat:   'no-repeat',
  }
}

const S = [
  // 0 — classic cumulus: 3 rounded domes, centre tallest
  mkShape([
    [50, 74, 46, 30, 0.86],
    [24, 50, 22, 35, 0.80],
    [50, 36, 25, 40, 0.90],
    [76, 56, 21, 30, 0.78],
  ], 0.10),

  // 1 — wide flat: 5 very shallow bumps along low horizon
  mkShape([
    [50, 82, 50, 22, 0.82],
    [10, 64, 16, 24, 0.74],
    [32, 54, 18, 28, 0.78],
    [68, 52, 17, 27, 0.76],
    [90, 66, 13, 20, 0.68],
  ], 0.08),

  // 2 — tall tower: narrow base, single soaring dome (negative top = clips at top)
  mkShape([
    [50, 86, 32, 18, 0.80],
    [38, 62, 14, 28, 0.74],
    [50, 28, 22, 48, 0.92],
    [62, 64, 14, 26, 0.72],
  ], 0.12),

  // 3 — storm complex: 5 overlapping masses, dramatic and large
  mkShape([
    [50, 82, 50, 22, 0.86],
    [16, 52, 21, 38, 0.82],
    [42, 28, 22, 48, 0.92],
    [68, 32, 21, 46, 0.88],
    [90, 58, 16, 28, 0.76],
  ], 0.13),

  // 4 — wispy: thin, elongated, faint — looks like cirrus
  mkShape([
    [50, 64, 52, 20, 0.70],
    [18, 52, 22, 24, 0.63],
    [80, 50, 18, 22, 0.62],
  ], 0.07),
]

function Cloud({ top, left, w, h, s, dx, dy, dur }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute', top, left,
        width: w, height: h,
        pointerEvents: 'none',
        ...S[s],
      }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  )
}

/**
 * Absolute overlay — scrolls with page.
 * mix-blend-mode:screen on container: additive white on dark = bright cloud,
 * transparent areas = zero impact. No overflow:hidden (causes blue bar).
 * Clouds intentionally absent from Hero (0–100vh).
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
      {/* ── Hero 0–100vh — BRAK CHMUR — zdjęcie wolne ─────────────────── */}

      {/* ── HowItWorks + About (100–195vh) ── */}
      <Cloud top="103vh" left="-4vw"  w={600} h={145} s={1} dx={ 118} dy={-11} dur={28} />
      <Cloud top="134vh" left="50vw"  w={548} h={200} s={3} dx={-108} dy={ 12} dur={25} />
      <Cloud top="182vh" left="67vw"  w={420} h={165} s={0} dx={ 100} dy={-13} dur={22} />

      {/* ── Instructors + Locations (198–285vh) ── */}
      <Cloud top="200vh" left="4vw"   w={300} h={215} s={2} dx={-120} dy={ 11} dur={30} />
      <Cloud top="246vh" left="42vw"  w={500} h={112} s={4} dx={ 108} dy={-10} dur={23} />
      <Cloud top="278vh" left="66vw"  w={590} h={143} s={1} dx={-96}  dy={ 12} dur={26} />

      {/* ── Courses + Gallery (305–400vh) ── */}
      <Cloud top="308vh" left="-2vw"  w={548} h={202} s={3} dx={ 126} dy={-12} dur={27} />
      <Cloud top="360vh" left="50vw"  w={422} h={168} s={0} dx={-114} dy={ 12} dur={24} />
      <Cloud top="393vh" left="73vw"  w={302} h={218} s={2} dx={ 104} dy={-11} dur={21} />

      {/* ── Reviews + Pricing (418–480vh) ── */}
      <Cloud top="420vh" left="10vw"  w={500} h={112} s={4} dx={-106} dy={ 10} dur={22} />
      <Cloud top="468vh" left="55vw"  w={608} h={142} s={1} dx={ 116} dy={-13} dur={25} />

      {/* ── FAQ + CTA + Contact + Footer (528–645vh) ── */}
      <Cloud top="530vh" left="2vw"   w={548} h={202} s={3} dx={-122} dy={ 11} dur={28} />
      <Cloud top="586vh" left="46vw"  w={424} h={168} s={0} dx={ 112} dy={-12} dur={26} />
      <Cloud top="640vh" left="71vw"  w={300} h={216} s={2} dx={-102} dy={ 10} dur={23} />
    </div>
  )
}
