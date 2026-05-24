import { motion } from 'framer-motion'

/* Four distinct cloud shapes rendered via SVG feGaussianBlur.
   Blur is contained inside the SVG filter region → zero gray halo on page. */
function CloudShape({ w, h, op, uid, s }) {
  const a = op.toFixed(2)
  const b = (op * .82).toFixed(2)
  const c = (op * .64).toFixed(2)
  const d = (op * .46).toFixed(2)
  const blk = { display: 'block', overflow: 'visible' }

  // s=0  classic cumulus — wide base, 4 stacked lobes
  if (s === 0) return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={blk}>
      <defs>
        <filter id={uid} x="-50%" y="-90%" width="200%" height="280%">
          <feGaussianBlur stdDeviation="13 9" />
        </filter>
      </defs>
      <ellipse cx={w*.47} cy={h*.70} rx={w*.44} ry={h*.28} fill={`rgba(255,255,255,${a})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.26} cy={h*.32} rx={w*.24} ry={h*.30} fill={`rgba(255,255,255,${b})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.60} cy={h*.26} rx={w*.20} ry={h*.26} fill={`rgba(255,255,255,${c})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.76} cy={h*.46} rx={w*.16} ry={h*.18} fill={`rgba(255,255,255,${d})`} filter={`url(#${uid})`}/>
    </svg>
  )

  // s=1  wispy cirrus — very flat horizontal streak
  if (s === 1) return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={blk}>
      <defs>
        <filter id={uid} x="-40%" y="-120%" width="180%" height="340%">
          <feGaussianBlur stdDeviation="22 7" />
        </filter>
      </defs>
      <ellipse cx={w*.50} cy={h*.62} rx={w*.48} ry={h*.22} fill={`rgba(255,255,255,${a})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.26} cy={h*.40} rx={w*.18} ry={h*.16} fill={`rgba(255,255,255,${c})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.76} cy={h*.38} rx={w*.15} ry={h*.14} fill={`rgba(255,255,255,${d})`} filter={`url(#${uid})`}/>
    </svg>
  )

  // s=2  small puffy — compact round trio
  if (s === 2) return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={blk}>
      <defs>
        <filter id={uid} x="-50%" y="-80%" width="200%" height="260%">
          <feGaussianBlur stdDeviation="9 9" />
        </filter>
      </defs>
      <ellipse cx={w*.50} cy={h*.65} rx={w*.42} ry={h*.28} fill={`rgba(255,255,255,${a})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.28} cy={h*.35} rx={w*.20} ry={h*.28} fill={`rgba(255,255,255,${b})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.54} cy={h*.28} rx={w*.18} ry={h*.26} fill={`rgba(255,255,255,${b})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.76} cy={h*.45} rx={w*.14} ry={h*.20} fill={`rgba(255,255,255,${c})`} filter={`url(#${uid})`}/>
    </svg>
  )

  // s=3  large stormy base — very wide, ultra-soft
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={blk}>
      <defs>
        <filter id={uid} x="-40%" y="-80%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="26 15" />
        </filter>
      </defs>
      <ellipse cx={w*.50} cy={h*.68} rx={w*.48} ry={h*.28} fill={`rgba(255,255,255,${a})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.30} cy={h*.36} rx={w*.24} ry={h*.30} fill={`rgba(255,255,255,${b})`} filter={`url(#${uid})`}/>
      <ellipse cx={w*.64} cy={h*.30} rx={w*.20} ry={h*.26} fill={`rgba(255,255,255,${c})`} filter={`url(#${uid})`}/>
    </svg>
  )
}

/* Single animated cloud. dx/dy = travel in px (mirror ping-pong). */
function Cloud({ id, top, left, w, h, op, s, dx, dy, dur }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', top, left, width: w, height: h, pointerEvents: 'none' }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: dur, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      <CloudShape w={w} h={h} op={op} uid={`g${id}`} s={s} />
    </motion.div>
  )
}

/* Fixed overlay across entire viewport. mix-blend-mode:screen punches through
   section solid backgrounds — additive on dark, invisible on light. */
export default function GlobalClouds() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        zIndex: 2, pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    >
      {/* top viewport band 0-15vh */}
      <Cloud id={0}  top="1vh"  left="-2vw" w={600} h={145} op={0.28} s={0} dx={130}  dy={-13} dur={20} />
      <Cloud id={1}  top="4vh"  left="50vw" w={440} h={110} op={0.24} s={1} dx={-105} dy={9}   dur={25} />
      <Cloud id={2}  top="11vh" left="68vw" w={360} h={92}  op={0.22} s={2} dx={90}   dy={-9}  dur={17} />

      {/* mid-upper band 18-35vh */}
      <Cloud id={3}  top="18vh" left="6vw"  w={500} h={125} op={0.26} s={3} dx={-125} dy={11}  dur={27} />
      <Cloud id={4}  top="22vh" left="44vw" w={380} h={96}  op={0.22} s={0} dx={100}  dy={-10} dur={21} />
      <Cloud id={5}  top="28vh" left="76vw" w={320} h={82}  op={0.20} s={1} dx={-85}  dy={8}   dur={19} />

      {/* mid-lower band 40-58vh */}
      <Cloud id={6}  top="40vh" left="-1vw" w={540} h={134} op={0.24} s={1} dx={115}  dy={-11} dur={23} />
      <Cloud id={7}  top="44vh" left="38vw" w={400} h={100} op={0.22} s={2} dx={-95}  dy={10}  dur={22} />
      <Cloud id={8}  top="50vh" left="70vw" w={460} h={115} op={0.23} s={3} dx={110}  dy={-9}  dur={26} />

      {/* lower band 62-80vh */}
      <Cloud id={9}  top="63vh" left="10vw" w={480} h={120} op={0.22} s={0} dx={-120} dy={8}   dur={20} />
      <Cloud id={10} top="67vh" left="55vw" w={350} h={88}  op={0.20} s={2} dx={95}   dy={-12} dur={24} />
      <Cloud id={11} top="78vh" left="24vw" w={420} h={105} op={0.21} s={1} dx={-100} dy={9}   dur={22} />
    </div>
  )
}
