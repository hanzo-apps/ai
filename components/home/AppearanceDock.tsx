'use client'

/**
 * Help and preferences, from a small mark in the corner of every page.
 *
 * Two things a person wants from a corner of a site they are reading: a way to
 * get unstuck, and a way to make it read the way they want. They are one panel
 * because they are one moment — you look down here when the page is not doing
 * what you need — and a site with a help bubble AND a settings bubble has asked
 * the reader to guess which corner holds which.
 *
 * The preferences are `@hanzo/appearance`, not written here: it is the design
 * system's own control, and the knobs it writes are the ones @hanzo/design
 * multiplies into every ramp, so a change reaches the whole page rather than the
 * handful of places that happen to read a token directly.
 *
 * Theme is the ONE thing this file owns, because next-themes already owns it for
 * the site (`ThemeProvider`, app/layout.tsx). A second theme system would be two
 * answers to which one is in effect.
 *
 * Closed it is a 28px mark. Nothing inside is mounted until it is asked for.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { Appearance } from '@hanzo/appearance'

/** Where a reader goes when the page is not enough. Real destinations only. */
const HELP = [
  { label: 'Docs', href: 'https://docs.hanzo.ai' },
  { label: 'Get help', href: 'https://docs.hanzo.ai/support' },
  { label: 'Contact us', href: '/contact' },
]

const THEMES = [
  { label: 'Auto', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="hz-help-section">
      <h2 className="hz-help-title">{title}</h2>
      {children}
    </section>
  )
}

export default function AppearanceDock() {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  // next-themes resolves on the client, so the selected option is unknown on the
  // server. Rendering one as selected anyway hydrates wrong and React replaces
  // the row; waiting one paint costs nothing on a control nobody has opened.
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

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
    <div ref={box} className="hz-help-dock">
      {open && (
        <div className="hz-help-panel" role="dialog" aria-label="Help and preferences">
          <div className="hz-help-head">
            <h2 className="hz-help-title">Help</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="hz-help-close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="hz-help-links">
            {HELP.map((l) => {
              const away = l.href.startsWith('http')
              return (
                <a
                  key={l.label}
                  href={l.href}
                  {...(away ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="hz-help-link"
                >
                  {l.label}
                  {/* The marker is the promise that this leaves the page. */}
                  {away ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  ) : null}
                </a>
              )
            })}
          </nav>

          <Section title="Preferences">
            <div className="hz-help-row">
              <span>Theme</span>
              <div className="hz-help-track">
                {THEMES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    aria-pressed={ready ? theme === t.value : undefined}
                    data-on={ready && theme === t.value ? '' : undefined}
                    onClick={() => setTheme(t.value)}
                    className="hz-help-choice"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <Appearance />
          </Section>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Help and preferences"
        className="hz-help-button"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M9.1 9a3 3 0 1 1 4.2 2.7c-.8.4-1.3 1.1-1.3 2v.3" />
          <path d="M12 17.5v.01" />
        </svg>
      </button>
    </div>
  )
}
