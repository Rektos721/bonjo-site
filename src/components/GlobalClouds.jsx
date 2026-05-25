import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────
   GlobalClouds v3.2 — canvas + value-noise FBM, wyraźne chmury

   threshold obniżony 0.42 → 0.32 (więcej białych pikseli)
   opacity podniesione 0.73–0.85 → 0.88–0.96
   blur zmniejszony 13–19px → 10–14px
   ───────────────────────────────────────────────────────────────────── */

function ihash(n) {
  let x = (n | 0) ^ 0x12345678
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  return (x >>> 0) / 4294967296
}

function vnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix,        fy = y - iy
  const u  = fx * fx * (3 - 2 * fx)
  const v  = fy * fy * (3 - 2 * fy)
  const A  = ihash(ix     + iy * 1619       + s * 6271)
  const B  = ihash(ix + 1 + iy * 1619       + s * 6271)
  const C  = ihash(ix     + (iy + 1) * 1619 + s * 6271)
  const D  = ihash(ix + 1 + (iy + 1) * 1619 + s * 6271)
  return A * (1 - u) * (1 - v) + B * u * (1 - v) + C * (1 - u) * v + D * u * v
}

function fbm(x, y, seed) {
  return (
    vnoise(x,        y,        seed)     * 0.5000 +
    vnoise(x * 2.1,  y * 2.1,  seed + 1) * 0.2500 +
    vnoise(x * 4.3,  y * 4.3,  seed + 2) * 0.1250 +
    vnoise(x * 8.7,  y * 8.7,  seed + 3) * 0.0625 +
    vnoise(x * 17.5, y * 17.5, seed + 4) * 0.0312
  ) / 0.9687
}

const TW = 80
const TH = 40

function paintTile(data, t, seed, op) {
  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const n  = fbm(x / TW * 4 + t, y / TH * 2.5, seed)
      const dx = (x / TW - 0.5) * 2
      const dy = (y / TH - 0.5) * 2
      const r  = dx * dx + dy * dy * 1.4
      const m  = Math.max(0, 1 - r)
      const ms = m * m * (3 - 2 * m)
      // próg 0.32 zamiast 0.42 → więcej białej masy w chmurze
      let a    = Math.max(0, (n - 0.32) / 0.68)
      a        = a * a * (3 - 2 * a) * ms * op
      const i  = (y * TW + x) << 2
      data[i] = data[i + 1] = data[i + 2] = 255
      data[i + 3] = a * 255
    }
  }
}

const DEFS = [
  // HowItWorks / About  100–260vh
  { top:'104vh', left:'-2vw',  dw:580, dh:230, seed: 7,  op:0.93, blur:11, spd:0.00020, anim:'drift-a', dur:28 },
  { top:'118vh', left:'58vw',  dw:500, dh:200, seed:41,  op:0.90, blur:10, spd:0.00023, anim:'drift-c', dur:22 },
  { top:'140vh', left:'32vw',  dw:460, dh:185, seed:73,  op:0.92, blur:12, spd:0.00018, anim:'drift-b', dur:31 },
  { top:'158vh', left:'70vw',  dw:620, dh:210, seed:29,  op:0.88, blur:14, spd:0.00015, anim:'drift-d', dur:25 },
  { top:'178vh', left:'5vw',   dw:540, dh:195, seed:57,  op:0.95, blur:10, spd:0.00025, anim:'drift-a', dur:27 },
  { top:'198vh', left:'50vw',  dw:500, dh:200, seed:13,  op:0.89, blur:12, spd:0.00022, anim:'drift-c', dur:23 },
  { top:'220vh', left:'22vw',  dw:580, dh:215, seed:89,  op:0.91, blur:11, spd:0.00019, anim:'drift-b', dur:29 },
  { top:'238vh', left:'68vw',  dw:460, dh:185, seed:35,  op:0.88, blur:10, spd:0.00024, anim:'drift-d', dur:21 },

  // Instructors / Locations  260–410vh
  { top:'258vh', left:'-1vw',  dw:540, dh:205, seed:61,  op:0.92, blur:11, spd:0.00021, anim:'drift-a', dur:26 },
  { top:'275vh', left:'45vw',  dw:600, dh:210, seed:19,  op:0.89, blur:13, spd:0.00017, anim:'drift-c', dur:30 },
  { top:'296vh', left:'72vw',  dw:480, dh:190, seed:83,  op:0.91, blur:10, spd:0.00023, anim:'drift-b', dur:24 },
  { top:'315vh', left:'15vw',  dw:560, dh:200, seed:47,  op:0.88, blur:12, spd:0.00020, anim:'drift-d', dur:27 },
  { top:'336vh', left:'55vw',  dw:520, dh:195, seed:11,  op:0.93, blur:11, spd:0.00018, anim:'drift-a', dur:22 },
  { top:'357vh', left:'-2vw',  dw:500, dh:200, seed:67,  op:0.90, blur:11, spd:0.00025, anim:'drift-c', dur:28 },
  { top:'378vh', left:'38vw',  dw:560, dh:210, seed:31,  op:0.89, blur:14, spd:0.00022, anim:'drift-b', dur:25 },

  // Courses / Gallery  410–600vh
  { top:'410vh', left:'71vw',  dw:500, dh:195, seed:53,  op:0.90, blur:10, spd:0.00020, anim:'drift-d', dur:23 },
  { top:'428vh', left:'8vw',   dw:560, dh:205, seed:97,  op:0.92, blur:11, spd:0.00019, anim:'drift-a', dur:27 },
  { top:'450vh', left:'48vw',  dw:480, dh:190, seed:23,  op:0.88, blur:10, spd:0.00023, anim:'drift-c', dur:21 },
  { top:'470vh', left:'75vw',  dw:540, dh:200, seed:79,  op:0.91, blur:13, spd:0.00016, anim:'drift-b', dur:29 },
  { top:'492vh', left:'18vw',  dw:580, dh:215, seed: 3,  op:0.93, blur:11, spd:0.00021, anim:'drift-d', dur:26 },
  { top:'515vh', left:'57vw',  dw:500, dh:195, seed:43,  op:0.89, blur:12, spd:0.00024, anim:'drift-a', dur:24 },
  { top:'538vh', left:'-1vw',  dw:560, dh:210, seed:71,  op:0.90, blur:13, spd:0.00018, anim:'drift-c', dur:28 },
  { top:'560vh', left:'40vw',  dw:520, dh:200, seed:17,  op:0.88, blur:10, spd:0.00022, anim:'drift-b', dur:22 },
  { top:'580vh', left:'68vw',  dw:480, dh:190, seed:59,  op:0.91, blur:11, spd:0.00020, anim:'drift-d', dur:25 },

  // Reviews / Pricing  580–740vh
  { top:'600vh', left:'5vw',   dw:560, dh:205, seed:37,  op:0.92, blur:11, spd:0.00019, anim:'drift-a', dur:27 },
  { top:'620vh', left:'50vw',  dw:540, dh:195, seed:91,  op:0.88, blur:12, spd:0.00023, anim:'drift-c', dur:23 },
  { top:'642vh', left:'72vw',  dw:500, dh:200, seed:13,  op:0.90, blur:10, spd:0.00021, anim:'drift-b', dur:26 },
  { top:'662vh', left:'12vw',  dw:580, dh:210, seed:49,  op:0.93, blur:11, spd:0.00017, anim:'drift-d', dur:30 },
  { top:'684vh', left:'45vw',  dw:520, dh:195, seed:85,  op:0.89, blur:13, spd:0.00025, anim:'drift-a', dur:24 },
  { top:'704vh', left:'-2vw',  dw:560, dh:205, seed:27,  op:0.91, blur:11, spd:0.00020, anim:'drift-c', dur:28 },
  { top:'725vh', left:'62vw',  dw:500, dh:190, seed:63,  op:0.88, blur:10, spd:0.00022, anim:'drift-b', dur:22 },

  // FAQ / FinalCTA / Contact  740–910vh
  { top:'745vh', left:'20vw',  dw:560, dh:210, seed: 9,  op:0.90, blur:11, spd:0.00019, anim:'drift-d', dur:25 },
  { top:'768vh', left:'65vw',  dw:520, dh:195, seed:55,  op:0.88, blur:12, spd:0.00023, anim:'drift-a', dur:27 },
  { top:'790vh', left:'-1vw',  dw:580, dh:205, seed:33,  op:0.92, blur:12, spd:0.00018, anim:'drift-c', dur:23 },
  { top:'812vh', left:'42vw',  dw:500, dh:195, seed:77,  op:0.89, blur:10, spd:0.00021, anim:'drift-b', dur:26 },
  { top:'834vh', left:'70vw',  dw:540, dh:200, seed:21,  op:0.91, blur:11, spd:0.00024, anim:'drift-d', dur:29 },
  { top:'856vh', left:'8vw',   dw:560, dh:210, seed:93,  op:0.90, blur:11, spd:0.00020, anim:'drift-a', dur:24 },
  { top:'880vh', left:'52vw',  dw:500, dh:195, seed:45,  op:0.88, blur:13, spd:0.00022, anim:'drift-c', dur:27 },
  { top:'900vh', left:'25vw',  dw:580, dh:210, seed: 5,  op:0.92, blur:11, spd:0.00019, anim:'drift-b', dur:22 },
]

export default function GlobalClouds() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const clouds = DEFS.map(def => {
      const canvas = document.createElement('canvas')
      canvas.width  = TW
      canvas.height = TH
      canvas.setAttribute('aria-hidden', 'true')
      Object.assign(canvas.style, {
        position:      'absolute',
        top:           def.top,
        left:          def.left,
        width:         `${def.dw}px`,
        height:        `${def.dh}px`,
        pointerEvents: 'none',
        filter:        `blur(${def.blur}px)`,
        animation:     `${def.anim} ${def.dur}s ease-in-out infinite`,
        willChange:    'transform',
      })
      container.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      const img = ctx.createImageData(TW, TH)
      const t0  = Math.random() * 100
      paintTile(img.data, t0, def.seed, def.op)
      ctx.putImageData(img, 0, 0)

      return { def, ctx, img, t: t0, lastPaint: 0 }
    })

    const UPDATE_MS = 100
    let raf

    function frame(now) {
      for (const c of clouds) {
        if (now - c.lastPaint >= UPDATE_MS) {
          const dt    = (now - c.lastPaint) / 1000
          c.t        += c.def.spd * dt * 60
          c.lastPaint = now
          paintTile(c.img.data, c.t, c.def.seed, c.def.op)
          c.ctx.putImageData(c.img, 0, 0)
        }
      }
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      clouds.forEach(c => c.ctx.canvas.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex:        1,
        pointerEvents: 'none',
      }}
    />
  )
}