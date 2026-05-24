import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const LINKS = [
  { label: 'O Nas',       href: '#about'     },
  { label: 'Lokalizacje', href: '#locations' },
  { label: 'Kursy',       href: '#courses'   },
  { label: 'Cennik',      href: '#pricing'   },
  { label: 'Galeria',     href: '#gallery'   },
  { label: 'Kontakt',     href: '#contact'   },
]


export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-solid' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 76 }}>
        <a href="#" style={{ textDecoration: 'none' }}>
          <Logo height={30} showTagline={true} />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <a
              key={l.href} href={l.href}
              style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
            Zapisz się
          </a>
        </div>

        {/* Burger */}
        <button onClick={() => setMenuOpen(o => !o)} className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9" aria-label="Menu">
          {[
            menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            null,
            menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          ].map((transform, i) => i === 1 ? (
            <span key={i} style={{ display: 'block', height: 2, borderRadius: 2, background: 'var(--text-primary)', width: '70%', opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
          ) : (
            <span key={i} style={{ display: 'block', height: 2, borderRadius: 2, background: 'var(--text-primary)', width: '100%', transition: 'all 0.3s', transform }} />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden nav-solid"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 500, textDecoration: 'none', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>
                Zapisz się na kurs
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
