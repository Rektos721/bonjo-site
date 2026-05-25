import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────
   GlobalClouds v3 — canvas + value-noise FBM

   Jak to działa:
   • Każda chmura = mały canvas (TW × TH = 80 × 40 px)
   • Każdy piksel obliczany przez fraktalny szum wartościowy (FBM, 5 oktaw)
   • Gdzie szum > próg → biały piksel (z wygładzonym alphą)
   • Elipsa radialnej maski ogranicza chmurę do owalu
   • Canvas skalowany CSS do docelowego rozmiaru + filter:blur()
   • Parametr t przesuwa się powoli → kształt morfuje organicznie w czasie
   • Jeden wspólny RAF dla wszystkich chmur, aktualizacja co ~100ms
   • CSS drift-a/b/c/d z index.css = delikatne kołysanie

   Brak gradientów CSS. Brak SVG elips. Brak mix-blend-mode.
   ───────────────────────────────────────────────────────────────────── */

// ── Szum wartościowy ─────────────────────────────────────────────────

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
    vnoise(x,         y,         seed)     * 0.5000 +
    vnoise(x * 2.1,   y * 2.1,   seed + 1) * 0.2500 +
    vnoise(x * 4.3,   y * 4.3,   seed + 2) * 0.1250 +
    vnoise(x * 8.7,   y * 8.7,   seed + 3) * 0.0625 +
    vnoise(x * 17.5,  y * 17.5,  seed + 4) * 0.0312
  ) / 0.9687
}

// ── Rasteryzacja kafelka chmury ──────────────────────────────────────

const TW = 80   // szerokość kafelka [px]
const TH = 40   // wysokość kafelka  [px]

function paintTile(data, t, seed, op) {
  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      // Współrzędne szumu — oś x dryfuje wraz z t (shape morphing)
      const n = fbm(x / TW * 4 + t, y / TH * 2.5, seed)

      // Radialny gradient maski — chmura zamknięta w miękkiej elipsie
      const dx = (x / TW - 0.5) * 2
      const dy = (y / TH - 0.5) * 2
      const r  = dx * dx + dy * dy * 1.4   // lekko spłaszczona oś Y
      const m  = Math.max(0, 1 - r)
      const ms = m * m * (3 - 2 * m)       // smoothstep maski

      // Próg + kontrast
      let a = Math.max(0, (n - 0.42) / 0.58)
      a = a * a * (3 - 2 * a)              // smoothstep kontrastu
      a *= ms * op

      const i = (y * TW + x) << 2
      data[i]     = 255   // R
      data[i + 1] = 255   // G
      data[i + 2] = 255   // B
      data[i + 3] = a * 255
    }
  }
}

// ── Definicje chmur ──────────────────────────────────────────────────
// top, left  — pozycja CSS
// dw, dh     — rozmiar wyświetlania (kafelek skalowany do tego)
// seed       — ziarno szumu
// op         — opacity [0-1]
// blur       — filter:blur w px
// spd        — prędkość ewolucji szumu (jednostki/klatkę)
// anim       — animacja CSS z index.css (drift-a/b/c/d)
// dur        — czas animacji w s

const DEFS = [
  // HowItWorks + About
  { top:'105vh', left:'-1vw',  dw:560, dh:220, seed: 7, op:0.80, blur:16, spd:0.00020, anim:'drift-a', dur:28 },
  { top:'142vh', left:'50vw',  dw:640, dh:195, seed:29, op:0.72, blur:20, spd:0.00015, anim:'drift-b', dur:24 },
  { top:'186vh', left:'67vw',  dw:500, dh:190, seed:53, op:0.75, blur:14, spd:0.00025, anim:'drift-c', dur:30 },
  { top:'226vh', left:'3vw',   dw:440, dh:210, seed:11, op:0.70, blur:18, spd:0.00022, anim:'drift-d', dur:23 },
  // Instructors + Locations
  { top:'268vh', left:'45vw',  dw:520, dh:195, seed:61, op:0.73, blur:16, spd:0.00018, anim:'drift-a', dur:26 },
  { top:'306vh', left:'71vw',  dw:580, dh:185, seed:37, op:0.68, blur:20, spd:0.00020, anim:'drift-b', dur:29 },
  { top:'346vh', left:'-2vw',  dw:540, dh:200, seed:83, op:0.74, blur:16, spd:0.00024, anim:'drift-c', dur:25 },
  { top:'382vh', left:'54vw',  dw:480, dh:190, seed:17, op:0.70, blur:18, spd:0.00019, anim:'drift-d', dur:22 },
  // Courses + Gallery
  { top:'418vh', left:'70vw',  dw:520, dh:200, seed:43, op:0.69, blur:16, spd:0.00021, anim:'drift-a', dur:21 },
  { top:'458vh', left:'9vw',   dw:460, dh:185, seed:71, op:0.72, blur:14, spd:0.00023, anim:'drift-b', dur:24 },
  { top:'500vh', left:'52vw',  dw:560, dh:195, seed:23, op:0.71, blur:20, spd:0.00017, anim:'drift-c', dur:27 },
  { top:'542vh', left:'1vw',   dw:540, dh:200, seed:97, op:0.68, blur:18, spd:0.00022, anim:'drift-d', dur:28 },
  // Reviews + Pricing
  { top:'582vh', left:'50vw',  dw:500, dh:190, seed:31, op:0.70, blur:16, spd:0.00020, anim:'drift-a', dur:25 },
  { top:'625vh', left:'69vw',  dw:460, dh:185, seed:59, op:0.67, blur:18, spd:0.00019, anim:'drift-b', dur:22 },
  { top:'660vh', left:'7vw',   dw:520, dh:195, seed:47, op:0.72, blur:14, spd:0.00023, anim:'drift-c', dur:24 },
  { top:'700vh', left:'52vw',  dw:580, dh:200, seed:13, op:0.70, blur:20, spd:0.00018, anim:'drift-d', dur:26 },
  // FAQ + FinalCTA + Contact
  { top:'740vh', left:'-1vw',  dw:540, dh:195, seed:79, op:0.71, blur:16, spd:0.00021, anim:'drift-a', dur:27 },
  { top:'780vh', left:'51vw',  dw:500, dh:190, seed:41, op:0.68, blur:18, spd:0.00020, anim:'drift-b', dur:25 },
  { top:'820vh', left:'68vw',  dw:520, dh:195, seed:67, op:0.67, blur:16, spd:0.00022, anim:'drift-c', dur:23 },
  { top:'860vh', left:'5vw',   dw:460, dh:185, seed:89, op:0.70, blur:14, spd:0.00019, anim:'drift-d', dur:24 },
  { top:'898vh', left:'52vw',  dw:560, dh:200, seed: 3, op:0.69, blur:20, spd:0.00023, anim:'drift-a', dur:28 },
]

// ── Komponent ────────────────────────────────────────────────────────

export default function GlobalClouds() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Tworzymy canvas dla każdej chmury imperatoryjnie (zero re-renderów React)
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

      // Pierwszy render — losowy start na osi t
      const t0 = Math.random() * 100
      paintTile(img.data, t0, def.seed, def.op)
      ctx.putImageData(img, 0, 0)

      return { def, ctx, img, t: t0, lastPaint: 0 }
    })

    // Jeden wspólny RAF — chmury aktualizowane co ~100ms
    const UPDATE_MS = 100
    let raf

    function frame(now) {
      for (const c of clouds) {
        if (now - c.lastPaint >= UPDATE_MS) {
          const dt  = (now - c.lastPaint) / 1000
          c.t      += c.def.spd * dt * 60
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