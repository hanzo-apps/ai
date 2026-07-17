/**
 * Enso mark — the FULLY CLOSED ensō ring.
 *
 * The Zen brand mark is an ensō (◯) drawn as an OPEN circle with a deliberate gap
 * (`@hanzo/logo` / zen/logo) — intentional, "not broken." Enso is the closed twin:
 * a complete ring, signalling a finished, fully-orchestrated whole (one model that
 * closes the loop over all the others). Uses `currentColor` so it inherits text color.
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
      <circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
    </svg>
  )
}

export default EnsoLogo
