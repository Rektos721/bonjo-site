import { motion } from 'framer-motion'

/**
 * Chmury jako single-div z wieloma warstwami background-image.
 *
 * BLUR FIX: gradient trzyma wysoką opacność do ~48% promienia zanim spada
 * (stara wersja: op*0.30 już przy 35% → rozmyta mgła).
 * Nowa: op → op*0.78 przy 48% → op*0.13 przy 74% → transparent przy 88%
 * = solidne białe ciało chmury z miękką ale wyraźną krawędzią.
 *
 * COVERAGE: 23 chmury od 103vh do ~908vh — cała strona.
 * Hero (0–100vh) intentionally cloud-free (zdjęcie surfera).
 * Karty zdjęć (Instructors/Courses/Gallery) mają z-index:2 → są nad chmurami.
 */

function oval(cx, cy, rx, ry, op) {
  const mid  = +(op * 0.78).toFixed(2)
  const edge = +(op * 0.13).toFixed(2)
  return {
    img: `radial-gradient(ellipse at 50% 54%, rgba(255,255,255,${op}) 0%, rgba(255,255,255,${mid}) 48%, rgba(255,255,255,${edge}) 74%, transparent 88%)`,
    sz:  `${rx * 2}% ${ry * 2}%`,
    pos: `left ${cx - rx}% top ${cy - ry}%`,
  }
}

const glowL = op => ({
  img: `radial-gradient(ellipse at 50% 56%, rgba(255,255,255,${op}) 0%, rgba(255,255,255,${+(op*0.4).toFixed(2)}) 48%, transparent 68%)`,
  sz:  '100% 100%',
  pos: 'left 0% top 0%',
})

function mkShape(ovals, glowOp) {
  const ls = [...ovals.map(([cx, cy, rx, ry, op]) => oval(cx, cy, rx, ry, op)), glowL(glowOp)]
  return {
    backgroundImage:    ls.map(l => l.img).join(','),
    backgroundSize:     ls.map(l => l.sz).join(','),
    backgroundPosition: ls.map(l => l.pos).join(','),
    backgroundRepeat:   'no-repeat',
  }
}

const S = [
  // 0 — classic cumulus: 4 kopuły, środkowa najwyższa   [w≈420, h≈165]
  mkShape([
    [50, 74, 46, 30, 0.87],
    [24, 50, 22, 35, 0.81],
    [50, 36, 25, 40, 0.91],
    [76, 56, 21, 30, 0.79],
  ], 0.11),

  // 1 — wide flat: 5 kopuł rozłożonych szeroko, wyraźnie wyższych [w≈620, h≈188]
  mkShape([
    [50, 82, 50, 22, 0.83],
    [10, 56, 18, 32, 0.77],
    [32, 42, 20, 38, 0.82],
    [68, 40, 19, 36, 0.80],
    [90, 60, 15, 27, 0.71],
  ], 0.10),

  // 2 — tall tower: szeroka podstawa, wysoka jednotopowa kopuła [w≈360, h≈228]
  mkShape([
    [50, 86, 38, 20, 0.83],
    [36, 60, 17, 32, 0.77],
    [50, 26, 28, 52, 0.94],
    [65, 62, 17, 30, 0.75],
  ], 0.13),

  // 3 — storm complex: 5 nakładających się brył, dramatyczna [w≈548, h≈202]
  mkShape([
    [50, 82, 50, 22, 0.87],
    [16, 52, 21, 38, 0.83],
    [42, 28, 22, 48, 0.93],
    [68, 32, 21, 46, 0.89],
    [90, 58, 16, 28, 0.77],
  ], 0.14),

  // 4 — compact three-dome: 4 kopuły, zwarta i wyraźna         [w≈480, h≈168]
  mkShape([
    [50, 78, 46, 26, 0.81],
    [24, 52, 24, 36, 0.75],
    [76, 50, 20, 34, 0.73],
    [50, 36, 22, 32, 0.77],
  ], 0.10),
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
      {/* ── Hero 0–100vh: intentionally cloud-free ───────────── */}

      {/* ── HowItWorks + About ~100–260vh ── */}
      <Cloud top="103vh" left="-4vw"  w={620} h={188} s={1} dx={ 116} dy={-11} dur={28} />
      <Cloud top="136vh" left="51vw"  w={548} h={202} s={3} dx={-106} dy={ 12} dur={25} />
      <Cloud top="178vh" left="68vw"  w={420} h={165} s={0} dx={ 100} dy={-13} dur={22} />
      <Cloud top="218vh" left="3vw"   w={360} h={228} s={2} dx={-118} dy={ 11} dur={30} />

      {/* ── Instructors + Locations ~265–405vh ── */}
      <Cloud top="258vh" left="43vw"  w={480} h={168} s={4} dx={ 106} dy={-10} dur={23} />
      <Cloud top="296vh" left="67vw"  w={620} h={188} s={1} dx={-96}  dy={ 12} dur={27} />
      <Cloud top="336vh" left="-2vw"  w={548} h={202} s={3} dx={ 124} dy={-12} dur={26} />
      <Cloud top="374vh" left="52vw"  w={420} h={165} s={0} dx={-112} dy={ 11} dur={23} />

      {/* ── Courses ~410–498vh ── */}
      <Cloud top="412vh" left="71vw"  w={360} h={228} s={2} dx={ 102} dy={-11} dur={21} />
      <Cloud top="452vh" left="9vw"   w={480} h={168} s={4} dx={-104} dy={ 10} dur={24} />

      {/* ── Gallery ~500–598vh ── */}
      <Cloud top="496vh" left="53vw"  w={620} h={188} s={1} dx={ 114} dy={-12} dur={26} />
      <Cloud top="538vh" left="1vw"   w={548} h={202} s={3} dx={-120} dy={ 11} dur={28} />

      {/* ── Reviews ~600–678vh ── */}
      <Cloud top="578vh" left="48vw"  w={420} h={165} s={0} dx={ 110} dy={-12} dur={25} />
      <Cloud top="618vh" left="70vw"  w={360} h={228} s={2} dx={-100} dy={ 10} dur={22} />

      {/* ── Pricing ~680–755vh ── */}
      <Cloud top="656vh" left="7vw"   w={480} h={168} s={4} dx={ 108} dy={-11} dur={24} />
      <Cloud top="696vh" left="52vw"  w={620} h={188} s={1} dx={-114} dy={ 12} dur={27} />

      {/* ── FAQ ~758–825vh ── */}
      <Cloud top="736vh" left="-1vw"  w={548} h={202} s={3} dx={ 122} dy={-11} dur={26} />
      <Cloud top="776vh" left="50vw"  w={420} h={165} s={0} dx={-108} dy={ 12} dur={24} />

      {/* ── FinalCTA + Contact ~828–932vh ── */}
      <Cloud top="816vh" left="69vw"  w={360} h={228} s={2} dx={ 100} dy={-10} dur={22} />
      <Cloud top="856vh" left="5vw"   w={480} h={168} s={4} dx={-106} dy={ 11} dur={25} />
      <Cloud top="895vh" left="51vw"  w={620} h={188} s={1} dx={ 112} dy={-12} dur={28} />
    </div>
  )
}
