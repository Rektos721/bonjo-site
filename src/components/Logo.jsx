/**
 * Logo Surf Bonjo — brush lettering "Free Spirit"
 *
 * Gdy dostaniesz finalny plik SVG/PNG od designera, podmień całą funkcję na:
 *
 *   export default function Logo({ height = 44 }) {
 *     return (
 *       <img
 *         src="/logo.svg"
 *         alt="Surf Bonjo"
 *         style={{ height, filter: 'invert(1) brightness(1.8)' }}
 *       />
 *     )
 *   }
 *
 * Uwaga: jeśli logo jest czarne (wersja "Free Spirit"), dodaj filter: invert(1)
 * żeby działało na ciemnym tle.
 */

export default function Logo({ height = 44, showTagline = true }) {
  const brushSize  = height
  const tagSize    = Math.max(8, Math.round(height * 0.235))
  const tagSpacing = Math.round(height * 0.07)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      {/* ── "BoNJo" w brush letteringu ── */}
      <span style={{
        fontFamily: "'Permanent Marker', cursive",
        fontSize: brushSize,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        <span style={{ color: 'var(--text-primary)' }}>Bo</span>
        <span style={{
          color: 'var(--accent-cyan)',
          /* Lekki text-shadow żeby NJ "latało" jak w oryginale */
          textShadow: '0 0 20px rgba(6,214,247,0.45)',
        }}>NJ</span>
        <span style={{ color: 'var(--text-primary)' }}>o</span>
      </span>

      {/* ── "— SURF & KITE —" ── */}
      {showTagline && (
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: tagSize,
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          marginTop: tagSpacing,
          paddingLeft: 2,
          userSelect: 'none',
        }}>
          — SURF & KITE —
        </span>
      )}
    </div>
  )
}
