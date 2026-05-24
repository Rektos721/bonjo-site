import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Czy potrzebuję wcześniejszego doświadczenia?',
    a: 'Nie — zaczynamy od absolutnego zera. Darmowa lekcja intro jest właśnie po to, żebyś poczuł/a czy kite jest dla Ciebie, bez żadnego ryzyka i kosztów.',
  },
  {
    q: 'Czy muszę umieć pływać?',
    a: 'Tak, podstawowo. Nasz spot w Jastarni ma maksymalnie 1 metr głębokości podczas kursów, ale podstawowe umiejętności pływania są wymagane ze względów bezpieczeństwa.',
  },
  {
    q: 'Co jest wliczone w cenę kursu?',
    a: 'Cały sprzęt (latawiec, deska, trapez, pianka, kask) marki Duotone lub Airush. Certyfikowany instruktor IKO. Ubezpieczenie na czas kursu. Bez ukrytych kosztów.',
  },
  {
    q: 'Ile czasu zajmuje nauka kitesurfingu?',
    a: 'Pierwsze samodzielne jazdy osiągasz już po 5–8 godzinach z instruktorem. Kite Start PRO (5h) kończy się certyfikatem IKO Level 1 — honorowanym przez szkoły kite na całym świecie.',
  },
  {
    q: 'Kiedy i gdzie odbywają się kursy?',
    a: 'Latem (maj–wrzesień) w Jastarni na Półwyspie Helskim — jednym z najlepszych spotów w Europie. Zimą (grudzień–marzec) w El Médano na Teneryfie — tu wieje przez cały rok.',
  },
  {
    q: 'Czy mogę kupić voucher prezentowy?',
    a: 'Tak. Voucher PDF wysyłamy na e-mail od razu po zakupie. Ważny 12 miesięcy, do wykorzystania na dowolny kurs w obu lokalizacjach. Napisz przez formularz kontaktowy.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ background: 'var(--bg-primary)', padding: '100px 24px' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <span className="section-tag">Najczęstsze pytania</span>
          </div>
          <h2 className="display" style={{
            fontWeight: 900,
            fontSize: 'clamp(34px,5vw,62px)',
            lineHeight: 1.0, letterSpacing: '-0.025em',
            color: 'var(--text-primary)',
          }}>
            Masz pytania?{' '}
            <span style={{ color: 'var(--accent-cyan)' }}>Mamy odpowiedzi.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '22px 0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: 20,
                }}
              >
                <span style={{
                  fontWeight: 500, fontSize: '1.0rem',
                  color: open === i ? 'var(--text-primary)' : 'rgba(210,235,248,0.85)',
                  lineHeight: 1.45, transition: 'color 0.2s',
                }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: '50%',
                  border: `1px solid ${open === i ? 'var(--accent-cyan)' : 'rgba(0,216,255,0.25)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: open === i ? 'var(--accent-cyan)' : 'rgba(0,216,255,0.5)',
                  fontSize: '1.1rem', fontWeight: 300, lineHeight: 1,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.28s ease, border-color 0.2s, color 0.2s',
                }}>
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      paddingBottom: 26,
                      color: 'var(--text-muted)', lineHeight: 1.78,
                      fontSize: '0.93rem',
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.9rem' }}>
            Masz inne pytanie? Napisz bezpośrednio.
          </p>
          <a href="#contact" className="btn-outline">Napisz do nas →</a>
        </motion.div>

      </div>
    </section>
  )
}
