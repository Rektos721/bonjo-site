import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Constants ──────────────────────────────────────── */
const W = 800, H = 310
const GROUND = 238
const GRAVITY = 0.44       // niskie gravity = wyższy, dłuższy łuk
const JUMP_VY = -16.5      // wysoki skok
const PX = 110
const P_W = 48, P_H = 72
const SCORE_WIN = 400      // łatwiejszy próg
const VOUCHER = 'BONJO10'
const SPEED_BASE = 2.2
const SPEED_MAX = 7.5

/* ─── Wave sizes ─────────────────────────────────────── */
const WAVE_SIZES = {
  small:  { h: 22, w: 36, hitH: 18 },
  medium: { h: 32, w: 44, hitH: 28 },
  large:  { h: 44, w: 54, hitH: 38 },
}

/* ─── Drawing ────────────────────────────────────────── */
function drawBg(ctx) {
  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND - 20)
  sky.addColorStop(0, '#07162a')
  sky.addColorStop(0.55, '#0c2040')
  sky.addColorStop(1, '#112a50')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GROUND - 20)

  // Stars
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ;[[50,16],[128,7],[218,22],[332,8],[448,18],[564,5],[672,26],[738,13],[785,34],
    [68,40],[380,36],[492,11],[618,30],[165,30],[278,14]].forEach(([x,y]) => {
    ctx.beginPath()
    ctx.arc(x, y, y < 20 ? 1.1 : 0.7, 0, Math.PI * 2)
    ctx.fill()
  })

  // Horizon glow
  const hg = ctx.createLinearGradient(0, GROUND - 55, 0, GROUND - 5)
  hg.addColorStop(0, 'transparent')
  hg.addColorStop(1, 'rgba(0,180,230,0.10)')
  ctx.fillStyle = hg
  ctx.fillRect(0, GROUND - 55, W, 50)

  // Ocean
  const sea = ctx.createLinearGradient(0, GROUND - 5, 0, H)
  sea.addColorStop(0, '#0e2a48')
  sea.addColorStop(1, '#071828')
  ctx.fillStyle = sea
  ctx.fillRect(0, GROUND - 5, W, H - GROUND + 5)

  // Ocean shimmer
  ctx.globalAlpha = 0.10
  ctx.fillStyle = 'rgba(0,216,255,1)'
  ;[[90,GROUND+14,55,4],[275,GROUND+28,82,3],[455,GROUND+18,48,3],[620,GROUND+38,66,4],[745,GROUND+24,38,3]].forEach(([x,y,w,h]) => {
    ctx.beginPath(); ctx.ellipse(x,y,w/2,h/2,0,0,Math.PI*2); ctx.fill()
  })
  ctx.globalAlpha = 1
}

function drawWaterLine(ctx, offset) {
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0,216,255,0.42)'
  ctx.lineWidth = 2
  for (let x = 0; x <= W; x += 3) {
    const y = GROUND + Math.sin(x * 0.033 + offset) * 5 + Math.sin(x * 0.068 + offset * 1.4) * 2.5
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0,216,255,0.15)'
  ctx.lineWidth = 1
  for (let x = 0; x <= W; x += 4) {
    const y = GROUND + 9 + Math.sin(x * 0.042 + offset * 0.7 + 1) * 3
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawWave(ctx, ob) {
  const sz = WAVE_SIZES[ob.size]
  const x = ob.x, wh = sz.h, ww = sz.w
  const cx = x + ww / 2  // center x of wave crest

  // Base fill
  const grad = ctx.createLinearGradient(x, GROUND - wh, x, GROUND + 10)
  grad.addColorStop(0, 'rgba(0,160,220,0.22)')
  grad.addColorStop(1, 'rgba(0,100,180,0.08)')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.moveTo(x - 8, GROUND + 2)
  ctx.bezierCurveTo(x - 4, GROUND - wh * 0.6, cx - ww * 0.3, GROUND - wh, cx, GROUND - wh)
  ctx.bezierCurveTo(cx + ww * 0.3, GROUND - wh, x + ww + 4, GROUND - wh * 0.6, x + ww + 8, GROUND + 2)
  ctx.lineTo(x + ww + 8, GROUND + 16)
  ctx.lineTo(x - 8, GROUND + 16)
  ctx.closePath()
  ctx.fill()

  // Crest curve (glowing cyan)
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(0,216,255,0.9)'
  ctx.lineWidth = ob.size === 'large' ? 2.5 : 2
  ctx.shadowColor = 'rgba(0,216,255,0.7)'; ctx.shadowBlur = 10
  ctx.moveTo(x - 4, GROUND)
  ctx.bezierCurveTo(x + ww * 0.15, GROUND - wh * 1.05, cx - ww * 0.1, GROUND - wh * 1.1, cx, GROUND - wh)
  ctx.bezierCurveTo(cx + ww * 0.1, GROUND - wh * 1.1, x + ww - ww * 0.15, GROUND - wh * 1.05, x + ww + 4, GROUND)
  ctx.stroke()
  ctx.shadowBlur = 0

  // Foam at crest
  ctx.fillStyle = 'rgba(200,240,255,0.65)'
  ctx.beginPath()
  ctx.ellipse(cx, GROUND - wh + 2, ww * 0.22, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Side spray dots
  if (ob.size !== 'small') {
    ctx.fillStyle = 'rgba(180,230,255,0.4)'
    ;[[-ww*0.3, -wh*0.7, 3], [ww*0.3, -wh*0.75, 2.5], [-ww*0.15, -wh*0.85, 2]].forEach(([dx, dy, r]) => {
      ctx.beginPath(); ctx.arc(cx+dx, GROUND+dy, r, 0, Math.PI*2); ctx.fill()
    })
  }
}

function drawPlayer(ctx, py, isDead) {
  if (isDead) ctx.globalAlpha = 0.4

  const cx = PX + P_W / 2
  const by = py

  // ── Board (on water — at the bottom of the player) ──
  ctx.save()
  ctx.translate(cx, by + P_H + 2)
  ctx.rotate(-0.06)
  ctx.fillStyle = '#00d8ff'
  ctx.shadowColor = 'rgba(0,216,255,0.55)'
  ctx.shadowBlur = 10
  ctx.beginPath(); ctx.roundRect(-30, -5, 60, 9, 4.5); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(255,255,255,0.25)'
  ctx.beginPath(); ctx.roundRect(-25, -3.5, 50, 3, 2); ctx.fill()
  ctx.fillStyle = 'rgba(0,216,255,0.38)'
  ctx.beginPath(); ctx.moveTo(-22, 4); ctx.lineTo(-28, 14); ctx.lineTo(-14, 4); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(20, 4); ctx.lineTo(26, 14); ctx.lineTo(12, 4); ctx.closePath(); ctx.fill()
  ctx.restore()

  // ── Legs ── (from board up to hips, bent knees)
  ctx.strokeStyle = '#b8d8f0'; ctx.lineWidth = 5; ctx.lineCap = 'round'
  // L leg: foot on board → knee → hip
  ctx.beginPath(); ctx.moveTo(cx-10, by+P_H-2); ctx.lineTo(cx-18, by+P_H-20); ctx.lineTo(cx-8, by+P_H-36); ctx.stroke()
  // R leg
  ctx.beginPath(); ctx.moveTo(cx+6, by+P_H-2); ctx.lineTo(cx+16, by+P_H-20); ctx.lineTo(cx+4, by+P_H-36); ctx.stroke()

  // ── Torso (leans BACK — left) ──
  ctx.lineWidth = 11; ctx.strokeStyle = '#c2ddf0'
  ctx.beginPath(); ctx.moveTo(cx-2, by+P_H-38); ctx.lineTo(cx-16, by+P_H-62); ctx.stroke()
  // Wetsuit stripe
  ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,216,255,0.5)'
  ctx.beginPath(); ctx.moveTo(cx-4, by+P_H-42); ctx.lineTo(cx-16, by+P_H-60); ctx.stroke()

  // ── Arms (forward-right toward bar) ──
  ctx.lineWidth = 4.5; ctx.strokeStyle = '#c2ddf0'
  ctx.beginPath(); ctx.moveTo(cx-14, by+P_H-60); ctx.lineTo(cx+8, by+P_H-68); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx-12, by+P_H-56); ctx.lineTo(cx+22, by+P_H-66); ctx.stroke()

  // ── Control bar ──
  ctx.lineWidth = 3; ctx.strokeStyle = '#9acce8'
  ctx.beginPath(); ctx.moveTo(cx+2, by+P_H-70); ctx.lineTo(cx+26, by+P_H-67); ctx.stroke()

  // ── Kite lines ──
  ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(0,216,255,0.55)'
  ctx.beginPath(); ctx.moveTo(cx+4, by+P_H-70); ctx.lineTo(cx+40, by-8); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx+26, by+P_H-67); ctx.lineTo(cx+52, by-5); ctx.stroke()

  // ── Kite (forward-right, at angle) ──
  const kx = cx+46, ky = by-14
  ctx.fillStyle = '#00d8ff'
  ctx.shadowColor = 'rgba(0,216,255,0.75)'; ctx.shadowBlur = 14
  ctx.beginPath(); ctx.moveTo(kx, ky-17); ctx.lineTo(kx+18, ky); ctx.lineTo(kx, ky+17); ctx.lineTo(kx-16, ky); ctx.closePath(); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(255,255,255,0.2)'
  ctx.beginPath(); ctx.moveTo(kx, ky-17); ctx.lineTo(kx+18, ky); ctx.lineTo(kx, ky); ctx.closePath(); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(kx-16, ky); ctx.lineTo(kx+18, ky); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(kx, ky-17); ctx.lineTo(kx, ky+17); ctx.stroke()

  // ── Head ──
  const hx = cx-22, hy = by+P_H-72
  ctx.fillStyle = '#f0d0ae'
  ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI*2); ctx.fill()
  ctx.fillStyle = '#00d8ff'
  ctx.beginPath(); ctx.arc(hx, hy, 11, Math.PI*1.1, Math.PI*2.05); ctx.fill()
  ctx.fillStyle = 'rgba(4,12,28,0.68)'
  ctx.beginPath(); ctx.arc(hx, hy, 8, Math.PI*1.3, Math.PI*1.85); ctx.fill()

  ctx.globalAlpha = 1
}

function drawHUD(ctx, score, speed) {
  ctx.fillStyle = 'rgba(0,216,255,0.82)'
  ctx.font = 'bold 15px "DM Mono", monospace'
  ctx.textAlign = 'right'
  ctx.fillText(`${score} pkt`, W - 16, 26)
  ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.font = '9px "DM Mono",monospace'
  ctx.fillText(`prędkość x${speed.toFixed(1)}`, W - 16, 40)

  // Progress bar
  const pct = Math.min(score / SCORE_WIN, 1)
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  ctx.beginPath(); ctx.roundRect(W-178, 48, 162, 4, 2); ctx.fill()
  ctx.fillStyle = pct >= 1 ? '#f59e0b' : '#00d8ff'
  ctx.shadowColor = pct >= 1 ? '#f59e0b' : '#00d8ff'; ctx.shadowBlur = pct > 0 ? 5 : 0
  ctx.beginPath(); ctx.roundRect(W-178, 48, 162*pct, 4, 2); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = 'rgba(0,216,255,0.45)'; ctx.font = '8px "DM Mono",monospace'
  ctx.fillText(`VOUCHER ${Math.round(pct*100)}%`, W-16, 62)

  ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(255,255,255,0.16)'; ctx.font = '8px "DM Mono",monospace'
  ctx.fillText('SPACJA / KLIK = SKOK', 12, 24)
}

function drawOverlay(ctx, line1, line2, color) {
  ctx.fillStyle = color || 'rgba(0,216,255,0.22)'
  ctx.font = `bold 36px "Big Shoulders Display", sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText(line1, W/2, H/2 - 8)
  if (line2) {
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '12px "DM Mono",monospace'
    ctx.fillText(line2, W/2, H/2 + 18)
  }
}

/* ─── Component ──────────────────────────────────────── */
export default function KiteGame({ onClose }) {
  const canvasRef = useRef(null)
  const s = useRef({
    phase: 'idle',
    py: GROUND - P_H,
    vy: 0,
    onGround: true,
    score: 0,
    speed: SPEED_BASE,
    waveOff: 0,
    obstacles: [],
    nextSpawn: 130,
    frame: 0,
    animId: null,
  })
  const [phase, setPhase] = useState('idle')
  const [finalScore, setFinalScore] = useState(0)
  const [copied, setCopied] = useState(false)

  const doJump = useCallback(() => {
    const g = s.current
    if (g.phase === 'idle') { g.phase = 'playing'; setPhase('playing'); return }
    if (g.phase === 'playing' && g.onGround) { g.vy = JUMP_VY; g.onGround = false }
    if (g.phase === 'dead') {
      Object.assign(g, { phase:'playing', py:GROUND-P_H, vy:0, onGround:true, score:0, speed:SPEED_BASE, obstacles:[], nextSpawn:130, frame:0 })
      setPhase('playing'); setFinalScore(0)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const g = s.current

    const pickSize = () => {
      const r = Math.random()
      if (r < 0.5) return 'small'
      if (r < 0.82) return 'medium'
      return 'large'
    }

    const spawn = () => {
      const size = pickSize()
      const sz = WAVE_SIZES[size]
      g.obstacles.push({ type: 'wave', x: W + 40, size, w: sz.w })
      // Gap: longer at start, shrinks a bit with speed but has a floor
      g.nextSpawn = Math.max(80, 130 + Math.floor(Math.random() * 60) - g.score * 0.05)
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      drawBg(ctx)
      g.waveOff += 0.048
      drawWaterLine(ctx, g.waveOff)

      if (g.phase === 'idle') {
        drawPlayer(ctx, g.py, false)
        drawOverlay(ctx, 'KITE RUNNER', 'SPACJA lub KLIK żeby startować')
        drawHUD(ctx, 0, SPEED_BASE)
        g.animId = requestAnimationFrame(tick)
        return
      }

      if (g.phase === 'playing') {
        // Physics
        g.vy += GRAVITY
        g.py = Math.min(g.py + g.vy, GROUND - P_H)
        if (g.py >= GROUND - P_H) { g.vy = 0; g.onGround = true } else { g.onGround = false }

        // Move obstacles
        g.obstacles.forEach(ob => { ob.x -= g.speed })
        g.obstacles = g.obstacles.filter(ob => ob.x > -120)

        // Spawn
        if (--g.nextSpawn <= 0) spawn()

        // Collision — tight horizontal range, generous vertical
        const px1 = PX + 12, px2 = PX + P_W - 12
        const py2 = g.py + P_H + 1  // feet bottom (just above board)
        for (const ob of g.obstacles) {
          const sz = WAVE_SIZES[ob.size]
          const ox1 = ob.x + 4, ox2 = ob.x + sz.w - 4
          const oy1 = GROUND - sz.hitH
          if (px2 > ox1 && px1 < ox2 && py2 > oy1) {
            g.phase = 'dead'; setPhase('dead'); setFinalScore(g.score); break
          }
        }

        // Score + speed
        g.frame++
        if (g.frame % 9 === 0) {
          g.score++
          if (g.score % 120 === 0) g.speed = Math.min(g.speed + 0.35, SPEED_MAX)
          if (g.score >= SCORE_WIN) { g.phase = 'won'; setPhase('won'); setFinalScore(g.score) }
        }
      }

      // Draw
      g.obstacles.forEach(ob => drawWave(ctx, ob))
      drawPlayer(ctx, g.py, g.phase === 'dead')
      drawHUD(ctx, g.score, g.speed)

      if (g.phase === 'dead') {
        ctx.fillStyle = 'rgba(4,12,28,0.42)'; ctx.fillRect(0,0,W,H)
        drawOverlay(ctx, 'WYTAR£EŚ SIĘ', 'SPACJA lub KLIK — spróbuj ponownie', 'rgba(255,100,50,0.75)')
      }

      if (g.phase !== 'won') { g.animId = requestAnimationFrame(tick) }
      else {
        ctx.fillStyle = 'rgba(4,12,28,0.36)'; ctx.fillRect(0,0,W,H)
      }
    }

    g.animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(g.animId)
  }, [])

  useEffect(() => {
    const k = e => { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); doJump() } }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [doJump])

  const copy = () => navigator.clipboard.writeText(VOUCHER).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2800) })

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(4,12,28,0.9)', backdropFilter:'blur(14px)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ y:40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, ease:[0.16,1,0.3,1] }} style={{ width:'100%', maxWidth:856 }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.57rem', letterSpacing:'0.22em', color:'var(--accent-cyan)', marginBottom:4 }}>MINI GRA · EASTER EGG</div>
            <h3 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontSize:'1.5rem', fontWeight:800, color:'var(--text-primary)', margin:0 }}>
              Kite Runner <span style={{ color:'var(--accent-cyan)' }}>→ Wygraj −10%</span>
            </h3>
          </div>
          <button onClick={onClose} style={{ width:34, height:34, border:'1px solid rgba(0,216,255,0.2)', borderRadius:8, background:'transparent', color:'var(--text-muted)', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        {/* Canvas */}
        <div style={{ position:'relative', borderRadius:12, overflow:'hidden', border:'1px solid rgba(0,216,255,0.18)' }}>
          <canvas ref={canvasRef} width={W} height={H} onClick={doJump} style={{ display:'block', width:'100%', cursor:'pointer', userSelect:'none' }} />

          <AnimatePresence>
            {phase === 'won' && (
              <motion.div
                initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                style={{ position:'absolute', inset:0, background:'rgba(4,12,28,0.88)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14 }}
              >
                <div style={{ fontSize:'2.8rem' }}>🏄‍♂️</div>
                <h4 style={{ fontFamily:"'Big Shoulders Display',sans-serif", fontSize:'2rem', fontWeight:900, color:'#fff', margin:0, textAlign:'center', lineHeight:1.1 }}>
                  Jesteś prawdziwym<br /><span style={{ color:'var(--accent-cyan)' }}>kite'erem!</span>
                </h4>
                <p style={{ color:'var(--text-muted)', margin:0, fontSize:'0.86rem', textAlign:'center' }}>
                  <strong style={{ color:'#fff' }}>{finalScore} punktów</strong> — odblokowałeś voucher <strong style={{ color:'var(--accent-cyan)' }}>−10% na kurs</strong>!
                </p>
                <div onClick={copy}
                  style={{ border:'2px dashed rgba(0,216,255,0.4)', borderRadius:12, padding:'13px 34px', textAlign:'center', cursor:'pointer', transition:'border-color 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,216,255,0.85)'; e.currentTarget.style.transform='scale(1.02)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,216,255,0.4)'; e.currentTarget.style.transform='scale(1)' }}
                >
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'0.55rem', letterSpacing:'0.2em', color:'var(--text-muted)', marginBottom:6 }}>KOD RABATOWY — KLIKNIJ ABY SKOPIOWAĆ</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:'2.1rem', fontWeight:700, color:'var(--accent-cyan)', letterSpacing:'0.14em' }}>{VOUCHER}</div>
                  <div style={{ fontSize:'0.68rem', color:'var(--text-muted)', marginTop:5 }}>{copied ? '✓ Skopiowano!' : 'Wklej przy rejestracji na kurs'}</div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop:2 }}>
                  <button onClick={() => { Object.assign(s.current,{phase:'playing',py:GROUND-P_H,vy:0,onGround:true,score:0,speed:SPEED_BASE,obstacles:[],nextSpawn:130,frame:0}); setPhase('playing'); setFinalScore(0) }}
                    style={{ padding:'9px 20px', borderRadius:8, border:'1px solid rgba(0,216,255,0.22)', background:'transparent', color:'var(--text-muted)', cursor:'pointer', fontSize:'0.82rem' }}>
                    Zagraj ponownie
                  </button>
                  <a href="#contact" onClick={onClose} style={{ padding:'9px 20px', borderRadius:8, background:'var(--accent-cyan)', color:'#07162a', textDecoration:'none', fontWeight:700, fontSize:'0.82rem' }}>
                    Zapisz się →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{ color:'var(--text-muted)', fontSize:'0.68rem', textAlign:'center', marginTop:9 }}>
          Spacja / klik = skok &nbsp;·&nbsp; Unikaj fal &nbsp;·&nbsp; {SCORE_WIN} punktów = voucher &nbsp;·&nbsp; ESC aby wyjść
        </p>
      </motion.div>
    </motion.div>
  )
}
