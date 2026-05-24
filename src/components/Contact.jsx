import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const IcoMail  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
const IcoPin   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IcoPalm  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h11z"/><path d="M13 8c0-2.76 2.24-5 5-5a4.95 4.95 0 0 1 5 5H13z"/><path d="M13 21V8"/><path d="M9 21h8"/></svg>
const IcoClock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
const IcoPhone = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>

const INFO = [
  { Icon: IcoMail,  label: 'Email',    val: 'kontakt@surfbonjo.com',             href: 'mailto:kontakt@surfbonjo.com' },
  { Icon: IcoPhone, label: 'WhatsApp', val: 'Dostępni przez WhatsApp',           href: 'https://wa.me/48000000000' },
  { Icon: IcoPin,   label: 'Lato',     val: 'Jastarnia, Półwysep Helski',        href: null },
  { Icon: IcoPalm,  label: 'Zima',     val: 'El Médano, Tenerife',              href: null },
  { Icon: IcoClock, label: 'Sezon',    val: 'Maj–Wrz: Jastarnia | Gru–Mar: Tenerife', href: null },
]

const SELECT_OPTIONS = [
  'Darmowa lekcja intro (GRATIS)',
  'Kite Start — kurs grupowy',
  'Kite Start PRO — 5h z IKO',
  'Lekcja prywatna',
  'Wynajem sprzętu',
  'Voucher prezentowy',
  'Inne pytanie',
]

/* ── Ciemny styl inputów — pasuje do dark ocean theme ── */
const inp = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(0,216,255,0.16)',
  borderRadius: '8px',
  color: 'var(--text-primary)',
  padding: '13px 16px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.92rem',
  outline: 'none',
  transition: 'border-color 0.25s, background 0.25s',
  appearance: 'none',
}

const lbl = {
  display: 'block',
  fontFamily: "'DM Mono', monospace",
  fontSize: '0.66rem',
  letterSpacing: '0.16em',
  color: 'var(--text-muted)',
  marginBottom: '7px',
  textTransform: 'uppercase',
}

const fadeUp = { hidden: { opacity:0, y:36 }, visible: { opacity:1, y:0, transition: { duration:0.8, ease:[0.16,1,0.3,1] } } }
const stagger = { hidden:{}, visible:{ transition:{ staggerChildren:0.09 } } }

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once:true, margin:'-8%' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const focusStyle = key => ({
    ...inp,
    ...(focused === key ? { borderColor:'var(--accent-cyan)', background:'rgba(0,216,255,0.07)' } : {}),
  })

  const handleSubmit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 5000) }

  return (
    <section id="contact" style={{ position:'relative', padding:'96px 24px 100px', overflow:'hidden',
      background:'linear-gradient(160deg, #183d68 0%, #1e4a80 60%, #1b3f68 100%)' }}>

      {/* Decorative glow */}
      <div style={{ position:'absolute', top:'-10%', left:'-5%', width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(0,216,255,0.10) 0%, transparent 65%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-5%', right:'-5%', width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%)', pointerEvents:'none' }}/>
      <div className="h-divider" style={{ position:'absolute', top:0, left:0, right:0 }}/>

      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView?'visible':'hidden'} variants={stagger}
          className="grid lg:grid-cols-2 gap-14 items-start"
        >
          {/* ── Left: info ── */}
          <div>
            <motion.div variants={fadeUp} className="section-tag" style={{ marginBottom:20 }}>Kontakt</motion.div>
            <motion.h2 variants={fadeUp} className="display" style={{
              fontWeight:800, fontSize:'clamp(38px,5vw,64px)',
              lineHeight:1.0, letterSpacing:'-0.025em',
              color:'var(--text-primary)', marginBottom:18,
            }}>
              Lecimy<br /><span style={{ color:'var(--accent-cyan)' }}>razem?</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color:'var(--text-muted)', lineHeight:1.78, marginBottom:38, fontSize:'1rem' }}>
              Napisz do nas — dobierzemy kurs, lokalizację i termin.
              Odpiszemy szybko. Możesz też napisać przez WhatsApp.
            </motion.p>

            {INFO.map(item => (
              <motion.div key={item.label} variants={fadeUp}
                style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:18 }}
              >
                <div style={{
                  width:44, height:44, borderRadius:12, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(0,216,255,0.12)', border:'1px solid rgba(0,216,255,0.22)',
                  color:'var(--accent-cyan)',
                }}>
                  <item.Icon />
                </div>
                <div>
                  <div style={{ fontSize:'0.64rem', color:'var(--text-muted)', letterSpacing:'0.14em', marginBottom:3 }}>
                    {item.label.toUpperCase()}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color:'var(--text-primary)', fontWeight:500, fontSize:'0.92rem', textDecoration:'none', transition:'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color='var(--accent-cyan)')}
                      onMouseLeave={e => (e.currentTarget.style.color='var(--text-primary)')}
                    >{item.val}</a>
                  ) : (
                    <div style={{ color:'var(--text-primary)', fontWeight:500, fontSize:'0.92rem', lineHeight:1.4 }}>{item.val}</div>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeUp} style={{ display:'flex', gap:10, marginTop:32 }}>
              {[
                { label:'Instagram', href:'https://www.instagram.com/surfbonjokiteboarding/' },
                { label:'Facebook',  href:'https://www.facebook.com/surfbonjo' },
                { label:'YouTube',   href:'https://www.youtube.com/@surfbonjokiteboarding' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display:'inline-block', padding:'9px 16px', borderRadius:10,
                    fontSize:'0.82rem', color:'var(--text-muted)', textDecoration:'none',
                    border:'1px solid rgba(255,255,255,0.12)', background:'rgba(255,255,255,0.05)',
                    transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--accent-cyan)'; e.currentTarget.style.borderColor='rgba(0,216,255,0.4)'; e.currentTarget.style.background='rgba(0,216,255,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
                >{s.label}</a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: dark glass form card ── */}
          <motion.div variants={fadeUp} style={{
            borderRadius: 24,
            background: 'rgba(6,18,52,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,216,255,0.13)',
            padding: '40px 36px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Cyan accent strip */}
            <div style={{ position:'absolute', top:0, left:0, right:0, height:3,
              background:'linear-gradient(90deg, #00d8ff, #0066aa)' }}/>

            {/* Subtle inner glow */}
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
              width:300, height:120, pointerEvents:'none',
              background:'radial-gradient(ellipse at top, rgba(0,216,255,0.08) 0%, transparent 70%)' }}/>

            {sent ? (
              <div style={{ textAlign:'center', padding:'52px 0' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:16 }}>🪁</div>
                <h3 className="display" style={{ fontWeight:800, fontSize:'2rem', color:'var(--accent-cyan)', marginBottom:10 }}>
                  Gotowe!
                </h3>
                <p style={{ color:'var(--text-muted)', lineHeight:1.7, fontSize:'0.95rem' }}>
                  Odpiszemy w ciągu 24 godzin.<br />Do zobaczenia na spocie!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="display" style={{ fontWeight:800, fontSize:'1.55rem', color:'var(--text-primary)', marginBottom:6 }}>
                  Napisz do nas
                </h3>
                <p style={{ color:'var(--text-muted)', fontSize:'0.84rem', marginBottom:26 }}>
                  Pierwsza lekcja intro — gratis, bez zobowiązań.
                </p>

                <div style={{ marginBottom:16 }}>
                  <label style={lbl}>Imię i nazwisko</label>
                  <input type="text" placeholder="Jan Kowalski" required
                    className="contact-inp"
                    style={focusStyle('name')}
                    onFocus={()=>setFocused('name')} onBlur={()=>setFocused(null)}/>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={lbl}>Email</label>
                  <input type="email" placeholder="twoj@email.com" required
                    className="contact-inp"
                    style={focusStyle('email')}
                    onFocus={()=>setFocused('email')} onBlur={()=>setFocused(null)}/>
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={lbl}>Telefon / WhatsApp <span style={{ opacity:0.5, fontWeight:400 }}>(opcjonalnie)</span></label>
                  <input type="tel" placeholder="+48 600 000 000"
                    className="contact-inp"
                    style={focusStyle('phone')}
                    onFocus={()=>setFocused('phone')} onBlur={()=>setFocused(null)}/>
                </div>

                <div style={{ marginBottom:24 }}>
                  <label style={lbl}>Wiadomość</label>
                  <textarea rows={4} placeholder="Twój poziom, preferowane terminy, pytania..."
                    className="contact-inp"
                    style={{ ...focusStyle('msg'), resize:'none' }}
                    onFocus={()=>setFocused('msg')} onBlur={()=>setFocused(null)}/>
                </div>

                <button type="submit" className="btn-primary"
                  style={{ width:'100%', fontSize:'0.95rem', padding:'15px', textAlign:'center' }}>
                  Wyślij wiadomość →
                </button>
                <p style={{ textAlign:'center', fontSize:'0.7rem', color:'rgba(140,180,210,0.45)', marginTop:12 }}>
                  Możesz też napisać przez WhatsApp — odpiszemy jeszcze szybciej.
                </p>
              </form>
            )}

            {/* Placeholder + option styling dla dark inputs */}
            <style>{`
              .contact-inp::placeholder { color: rgba(150,192,220,0.40); }
              .contact-inp option { background: #071530; color: rgba(210,235,250,0.92); }
            `}</style>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
