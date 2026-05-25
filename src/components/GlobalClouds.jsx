import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────
   GlobalClouds v3.3 — canvas + value-noise FBM
   • 55 chmur pokrywających 104vh–1400vh (~14 viewport heights)
   • Mix szybkich (dur 12-16s) i wolnych (22-30s) animacji
   • threshold 0.32, opacity 0.88–0.96, blur 10–14px
   ───────────────────────────────────────────────────────────────────── */

function ihash(n) {
  let x = (n | 0) ^ 0x12345678
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b)
  return (x >>> 0) / 4294967296
}
function vnoise(x, y, s) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy)
  const A = ihash(ix     + iy * 1619       + s * 6271)
  const B = ihash(ix + 1 + iy * 1619       + s * 6271)
  const C = ihash(ix     + (iy + 1) * 1619 + s * 6271)
  const D = ihash(ix + 1 + (iy + 1) * 1619 + s * 6271)
  return A*(1-u)*(1-v) + B*u*(1-v) + C*(1-u)*v + D*u*v
}
function fbm(x, y, seed) {
  return (
    vnoise(x,       y,       seed)     * 0.5000 +
    vnoise(x*2.1,   y*2.1,   seed+1)  * 0.2500 +
    vnoise(x*4.3,   y*4.3,   seed+2)  * 0.1250 +
    vnoise(x*8.7,   y*8.7,   seed+3)  * 0.0625 +
    vnoise(x*17.5,  y*17.5,  seed+4)  * 0.0312
  ) / 0.9687
}

const TW = 80, TH = 40

function paintTile(data, t, seed, op) {
  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const n  = fbm(x / TW * 4 + t, y / TH * 2.5, seed)
      const dx = (x / TW - 0.5) * 2, dy = (y / TH - 0.5) * 2
      const m  = Math.max(0, 1 - (dx*dx + dy*dy*1.4))
      const ms = m * m * (3 - 2 * m)
      let a    = Math.max(0, (n - 0.32) / 0.68)
      a        = a * a * (3 - 2 * a) * ms * op
      const i  = (y * TW + x) << 2
      data[i] = data[i+1] = data[i+2] = 255
      data[i+3] = a * 255
    }
  }
}

// dur: 12-16s = szybkie, 17-21s = średnie, 22-30s = wolne
const DEFS = [
  // ── HowItWorks / About  104–260vh ──────────────────────────────
  { top:'104vh', left:'-2vw',  dw:580, dh:230, seed: 7,  op:0.93, blur:11, spd:0.00028, anim:'drift-a', dur:14 },
  { top:'118vh', left:'58vw',  dw:500, dh:200, seed:41,  op:0.90, blur:10, spd:0.00032, anim:'drift-c', dur:12 },
  { top:'140vh', left:'32vw',  dw:460, dh:185, seed:73,  op:0.92, blur:12, spd:0.00022, anim:'drift-b', dur:19 },
  { top:'158vh', left:'70vw',  dw:620, dh:210, seed:29,  op:0.88, blur:14, spd:0.00018, anim:'drift-d', dur:25 },
  { top:'178vh', left:'5vw',   dw:540, dh:195, seed:57,  op:0.95, blur:10, spd:0.00030, anim:'drift-a', dur:13 },
  { top:'198vh', left:'50vw',  dw:500, dh:200, seed:13,  op:0.89, blur:12, spd:0.00020, anim:'drift-c', dur:22 },
  { top:'220vh', left:'22vw',  dw:580, dh:215, seed:89,  op:0.91, blur:11, spd:0.00015, anim:'drift-b', dur:28 },
  { top:'238vh', left:'68vw',  dw:460, dh:185, seed:35,  op:0.88, blur:10, spd:0.00033, anim:'drift-d', dur:15 },

  // ── Instructors / Locations  260–410vh ─────────────────────────
  { top:'258vh', left:'-1vw',  dw:540, dh:205, seed:61,  op:0.92, blur:11, spd:0.00026, anim:'drift-a', dur:16 },
  { top:'275vh', left:'45vw',  dw:600, dh:210, seed:19,  op:0.89, blur:13, spd:0.00018, anim:'drift-c', dur:24 },
  { top:'296vh', left:'72vw',  dw:480, dh:190, seed:83,  op:0.91, blur:10, spd:0.00031, anim:'drift-b', dur:13 },
  { top:'315vh', left:'15vw',  dw:560, dh:200, seed:47,  op:0.88, blur:12, spd:0.00022, anim:'drift-d', dur:20 },
  { top:'336vh', left:'55vw',  dw:520, dh:195, seed:11,  op:0.93, blur:11, spd:0.00016, anim:'drift-a', dur:27 },
  { top:'357vh', left:'-2vw',  dw:500, dh:200, seed:67,  op:0.90, blur:11, spd:0.00029, anim:'drift-c', dur:14 },
  { top:'378vh', left:'38vw',  dw:560, dh:210, seed:31,  op:0.89, blur:14, spd:0.00019, anim:'drift-b', dur:23 },

  // ── Courses / Gallery  410–580vh ───────────────────────────────
  { top:'410vh', left:'71vw',  dw:500, dh:195, seed:53,  op:0.90, blur:10, spd:0.00028, anim:'drift-d', dur:15 },
  { top:'428vh', left:'8vw',   dw:560, dh:205, seed:97,  op:0.92, blur:11, spd:0.00021, anim:'drift-a', dur:18 },
  { top:'450vh', left:'48vw',  dw:480, dh:190, seed:23,  op:0.88, blur:10, spd:0.00034, anim:'drift-c', dur:12 },
  { top:'470vh', left:'75vw',  dw:540, dh:200, seed:79,  op:0.91, blur:13, spd:0.00017, anim:'drift-b', dur:26 },
  { top:'492vh', left:'18vw',  dw:580, dh:215, seed: 3,  op:0.93, blur:11, spd:0.00025, anim:'drift-d', dur:16 },
  { top:'515vh', left:'57vw',  dw:500, dh:195, seed:43,  op:0.89, blur:12, spd:0.00019, anim:'drift-a', dur:21 },
  { top:'538vh', left:'-1vw',  dw:560, dh:210, seed:71,  op:0.90, blur:13, spd:0.00030, anim:'drift-c', dur:13 },
  { top:'560vh', left:'40vw',  dw:520, dh:200, seed:17,  op:0.88, blur:10, spd:0.00022, anim:'drift-b', dur:19 },

  // ── Reviews / Pricing  580–740vh ───────────────────────────────
  { top:'582vh', left:'68vw',  dw:480, dh:190, seed:59,  op:0.91, blur:11, spd:0.00027, anim:'drift-d', dur:14 },
  { top:'602vh', left:'5vw',   dw:560, dh:205, seed:37,  op:0.92, blur:11, spd:0.00020, anim:'drift-a', dur:22 },
  { top:'622vh', left:'50vw',  dw:540, dh:195, seed:91,  op:0.88, blur:12, spd:0.00032, anim:'drift-c', dur:13 },
  { top:'644vh', left:'72vw',  dw:500, dh:200, seed:15,  op:0.90, blur:10, spd:0.00018, anim:'drift-b', dur:25 },
  { top:'664vh', left:'12vw',  dw:580, dh:210, seed:49,  op:0.93, blur:11, spd:0.00026, anim:'drift-d', dur:15 },
  { top:'686vh', left:'45vw',  dw:520, dh:195, seed:85,  op:0.89, blur:13, spd:0.00021, anim:'drift-a', dur:20 },
  { top:'706vh', left:'-2vw',  dw:560, dh:205, seed:27,  op:0.91, blur:11, spd:0.00016, anim:'drift-c', dur:28 },
  { top:'726vh', left:'62vw',  dw:500, dh:190, seed:63,  op:0.88, blur:10, spd:0.00031, anim:'drift-b', dur:12 },

  // ── FAQ / FinalCTA / Contact  740–920vh ────────────────────────
  { top:'746vh', left:'20vw',  dw:560, dh:210, seed: 9,  op:0.90, blur:11, spd:0.00024, anim:'drift-d', dur:16 },
  { top:'768vh', left:'65vw',  dw:520, dh:195, seed:55,  op:0.88, blur:12, spd:0.00019, anim:'drift-a', dur:23 },
  { top:'790vh', left:'-1vw',  dw:580, dh:205, seed:33,  op:0.92, blur:12, spd:0.00029, anim:'drift-c', dur:14 },
  { top:'812vh', left:'42vw',  dw:500, dh:195, seed:77,  op:0.89, blur:10, spd:0.00022, anim:'drift-b', dur:18 },
  { top:'834vh', left:'70vw',  dw:540, dh:200, seed:21,  op:0.91, blur:11, spd:0.00016, anim:'drift-d', dur:26 },
  { top:'856vh', left:'8vw',   dw:560, dh:210, seed:93,  op:0.90, blur:11, spd:0.00033, anim:'drift-a', dur:13 },
  { top:'878vh', left:'52vw',  dw:500, dh:195, seed:45,  op:0.88, blur:13, spd:0.00020, anim:'drift-c', dur:21 },
  { top:'900vh', left:'25vw',  dw:580, dh:210, seed: 5,  op:0.92, blur:11, spd:0.00027, anim:'drift-b', dur:15 },

  // ── Dolna część strony  920vh–1400vh ───────────────────────────
  { top:'925vh', left:'68vw',  dw:520, dh:195, seed:64,  op:0.90, blur:12, spd:0.00022, anim:'drift-d', dur:17 },
  { top:'950vh', left:'-1vw',  dw:560, dh:210, seed:38,  op:0.91, blur:11, spd:0.00030, anim:'drift-a', dur:13 },
  { top:'975vh', left:'44vw',  dw:500, dh:195, seed:82,  op:0.88, blur:10, spd:0.00019, anim:'drift-c', dur:24 },
  { top:'1000vh', left:'72vw', dw:540, dh:205, seed:16,  op:0.92, blur:12, spd:0.00028, anim:'drift-b', dur:15 },
  { top:'1025vh', left:'10vw', dw:580, dh:215, seed:58,  op:0.89, blur:11, spd:0.00021, anim:'drift-d', dur:19 },
  { top:'1050vh', left:'50vw', dw:520, dh:195, seed:94,  op:0.91, blur:13, spd:0.00015, anim:'drift-a', dur:27 },
  { top:'1075vh', left:'-2vw', dw:560, dh:205, seed:26,  op:0.88, blur:10, spd:0.00034, anim:'drift-c', dur:12 },
  { top:'1100vh', left:'60vw', dw:500, dh:195, seed:72,  op:0.90, blur:11, spd:0.00023, anim:'drift-b', dur:18 },
  { top:'1125vh', left:'28vw', dw:580, dh:210, seed:44,  op:0.92, blur:12, spd:0.00018, anim:'drift-d', dur:22 },
  { top:'1150vh', left:'75vw', dw:520, dh:195, seed: 8,  op:0.89, blur:10, spd:0.00031, anim:'drift-a', dur:14 },
  { top:'1175vh', left:'5vw',  dw:560, dh:205, seed:66,  op:0.91, blur:11, spd:0.00020, anim:'drift-c', dur:20 },
  { top:'1200vh', left:'48vw', dw:500, dh:200, seed:32,  op:0.88, blur:13, spd:0.00026, anim:'drift-b', dur:16 },
  { top:'1230vh', left:'-1vw', dw:580, dh:215, seed:88,  op:0.92, blur:11, spd:0.00017, anim:'drift-d', dur:25 },
  { top:'1260vh', left:'64vw', dw:540, dh:200, seed:54,  op:0.90, blur:10, spd:0.00029, anim:'drift-a', dur:13 },
  { top:'1290vh', left:'22vw', dw:560, dh:205, seed:18,  op:0.89, blur:12, spd:0.00022, anim:'drift-c', dur:18 },
  { top:'1330vh', left:'70vw', dw:500, dh:195, seed:76,  op:0.91, blur:11, spd:0.00025, anim:'drift-b', dur:15 },
  { top:'1370vh', left:'8vw',  dw:580, dh:210, seed:42,  op:0.88, blur:13, spd:0.00019, anim:'drift-d', dur:21 },
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