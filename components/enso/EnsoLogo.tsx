/**
 * Enso mark — the CLOSED ensō (◯): a single PERFECT ring, the completed twin of
 * Zen's OPEN ensō (a brush ensō with a deliberate gap, `@hanzo/logo` / zen/logo).
 * Where Zen's loop is left open, Enso's is closed and clean — one continuous stroke
 * that resolves into a flawless circle, signalling the one model that closes over
 * all the others. Perfectly centered in the 100×100 viewBox, round caps, a single
 * weight, monochrome. Uses `currentColor` so it inherits text color.
 */
export function EnsoLogo({ size = 24, className, title = 'Enso' }: { size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      {/* the closed ensō — one perfect ring, centered (cx=cy=50; outer edge 10↔90, symmetric) */}
      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

export default EnsoLogo
