/**
 * Enso mark — the CLOSED ensō (◯), the completed twin of Zen's OPEN ensō.
 *
 * Zen's mark is a brush ensō with a deliberate gap (`@hanzo/logo` / zen/logo).
 * Enso closes the loop: a full brush circle with a short overshoot tail where the
 * stroke completes — the hand-drawn "one continuous stroke that finished," signalling
 * one model that closes over all the others. Round caps + a single weight keep it in
 * the monochrome brand. Uses `currentColor` so it inherits text color.
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
      {/* the closed brush circle */}
      <circle cx="50" cy="51" r="35" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      {/* the overshoot tail where the stroke completes (~1 o'clock) — the ensō's brush finish */}
      <path d="M63 19 q 12 3 15 17" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

export default EnsoLogo
