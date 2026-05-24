import Logo from './Logo'

const NAV_LINKS = [
  { label: 'O Nas',       href: '#about'     },
  { label: 'Lokalizacje', href: '#locations' },
  { label: 'Kursy',       href: '#courses'   },
  { label: 'Cennik',      href: '#pricing'   },
  { label: 'Galeria',     href: '#gallery'   },
  { label: 'Kontakt',     href: '#contact'   },
]

const SOCIALS = [
  { abbr: 'IG', label: 'Instagram', href: 'https://www.instagram.com/surfbonjokiteboarding/' },
  { abbr: 'FB', label: 'Facebook',  href: 'https://www.facebook.com/surfbonjo' },
  { abbr: 'YT', label: 'YouTube',   href: 'https://www.youtube.com/@surfbonjokiteboarding' },
]

export default function Footer() {
  return (
    <footer style={{ background:'#081f3a', position:'relative', paddingTop:0 }}>

      {/* Top accent line */}
      <div style={{ height:1, background:'linear-gradient(90deg, transparent, rgba(0,216,255,0.4) 30%, rgba(0,216,255,0.4) 70%, transparent)' }}/>

      {/* Subtle top glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:600, height:160,
        background:'radial-gradient(ellipse at top, rgba(0,216,255,0.07) 0%, transparent 70%)', pointerEvents:'none' }}/>

      <div className="max-w-7xl mx-auto" style={{ padding:'60px 24px 28px', position:'relative' }}>

        <div className="grid md:grid-cols-12 gap-10" style={{ marginBottom:48 }}>

          {/* Brand — col span 5 */}
          <div className="md:col-span-5">
            <div style={{ marginBottom:18 }}>
              <Logo height={42} showTagline={true} />
            </div>
            <p style={{ color:'rgba(180,210,232,0.75)', lineHeight:1.78, maxWidth:320, fontSize:'0.88rem', marginBottom:22 }}>
              Szkoła kitesurfingu z certyfikatem IKO.
              Kursy dla każdego poziomu — od zupełnych początków po zaawansowane techniki.
              Sprzęt Duotone &amp; Airush w cenie.
            </p>

            {/* Locations pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
              {[
                { flag:'🇵🇱', loc:'Jastarnia', season:'maj–wrzesień' },
                { flag:'🇪🇸', loc:'El Médano', season:'grudzień–marzec' },
              ].map(l=>(
                <div key={l.loc} style={{
                  display:'inline-flex', alignItems:'center', gap:7,
                  background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)',
                  borderRadius:20, padding:'6px 14px', fontSize:'0.8rem',
                }}>
                  <span>{l.flag}</span>
                  <span style={{ color:'rgba(240,250,255,0.9)', fontWeight:500 }}>{l.loc}</span>
                  <span style={{ color:'rgba(150,195,220,0.65)', fontSize:'0.72rem' }}>{l.season}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div style={{ display:'flex', gap:8 }}>
              {SOCIALS.map(s => (
                <a key={s.abbr} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{
                    width:38, height:38, borderRadius:10,
                    border:'1px solid rgba(255,255,255,0.14)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'rgba(150,195,220,0.7)', fontSize:'0.62rem',
                    fontFamily:"'DM Mono', monospace", fontWeight:500,
                    textDecoration:'none', transition:'all 0.2s',
                    background:'rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-cyan)'; e.currentTarget.style.color='var(--accent-cyan)'; e.currentTarget.style.background='rgba(0,216,255,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.14)'; e.currentTarget.style.color='rgba(150,195,220,0.7)'; e.currentTarget.style.background='rgba(255,255,255,0.05)' }}
                >{s.abbr}</a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="md:col-span-1"/>

          {/* Nav — col span 3 */}
          <div className="md:col-span-3">
            <h4 style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.62rem', letterSpacing:'0.2em',
              color:'var(--accent-cyan)', marginBottom:20, textTransform:'uppercase' }}>
              Nawigacja
            </h4>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                style={{ display:'block', color:'rgba(160,200,225,0.75)', fontSize:'0.88rem', marginBottom:12,
                  textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='rgba(240,252,255,1)')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(160,200,225,0.75)')}
              >{l.label}</a>
            ))}
          </div>

          {/* Contact — col span 3 */}
          <div className="md:col-span-3">
            <h4 style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.62rem', letterSpacing:'0.2em',
              color:'var(--accent-cyan)', marginBottom:20, textTransform:'uppercase' }}>
              Kontakt
            </h4>
            <a href="mailto:kontakt@surfbonjo.com"
              style={{ display:'block', color:'rgba(160,200,225,0.75)', fontSize:'0.88rem', marginBottom:16,
                textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(160,200,225,0.75)')}
            >kontakt@surfbonjo.com</a>
            {[
              { title:'Lato', loc:'Jastarnia, Polska' },
              { title:'Zima', loc:'El Médano, Tenerife' },
            ].map(l => (
              <div key={l.title} style={{ marginBottom:14 }}>
                <div style={{ fontSize:'0.63rem', color:'rgba(120,165,195,0.6)', letterSpacing:'0.12em',
                  marginBottom:2, textTransform:'uppercase' }}>{l.title}</div>
                <div style={{ color:'rgba(210,235,248,0.85)', fontSize:'0.88rem', fontWeight:500 }}>{l.loc}</div>
              </div>
            ))}
            <a href="https://www.google.com/search?q=Surf+Bonjo+kiteboarding+opinie"
              target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:10,
                textDecoration:'none', color:'rgba(160,200,225,0.7)', fontSize:'0.82rem', transition:'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='rgba(240,250,255,0.95)')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(160,200,225,0.7)')}
            >
              <span style={{ color:'#f4c430' }}>★★★★★</span> Opinie Google
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:22,
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12,
        }}>
          <span style={{ color:'rgba(130,170,200,0.55)', fontSize:'0.77rem' }}>
            © 2026 Surf Bonjo Kiteboarding School · Wszelkie prawa zastrzeżone.
          </span>
          <div style={{ display:'flex', gap:22 }}>
            {['Polityka prywatności', 'Regulamin'].map(l => (
              <a key={l} href="#"
                style={{ color:'rgba(130,170,200,0.55)', fontSize:'0.77rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color='rgba(200,230,248,0.9)')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(130,170,200,0.55)')}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
