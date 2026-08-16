'use client'

/**
 * A person's own reading of the site — text size, density, accent — reachable
 * from every page.
 *
 * The panel is `@hanzo/appearance`, not written here: it is the design system's
 * own control, and the knobs it writes (`--type-scale`, `--density`,
 * `--accent`) are the ones @hanzo/design multiplies into every ramp. So a
 * change reaches the whole page rather than the handful of places that happen
 * to read a token directly.
 *
 * It sits bottom-right, out of the reading column and away from the composer
 * docked bottom-centre. Closed it is one 44px button; nothing is mounted until
 * it is asked for.
 */
import { useEffect, useRef, useState } from 'react'
import { Appearance } from '@hanzo/appearance'

export default function AppearanceDock() {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  // Close on outside press and on Escape — a panel that traps you is worse
  // than no panel.
  useEffect(() => {
    if (!open) return
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false)
    }
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', away)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('mousedown', away)
      document.removeEventListener('keydown', key)
    }
  }, [open])

  return (
    <div ref={box} className="hz-appearance-dock">
      {open && (
        <div className="hz-appearance-panel" role="dialog" aria-label="Appearance">
          <Appearance />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Appearance"
        className="hz-appearance-button hz-tap"
      >
        {/* Two sliders — the control says what it adjusts. */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
          <circle cx="16" cy="8" r="2" />
          <circle cx="10" cy="16" r="2" />
        </svg>
      </button>
    </div>
  )
}
