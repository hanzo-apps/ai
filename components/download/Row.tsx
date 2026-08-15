import { ROW, QUIET } from './style'

/**
 * A name, and the one thing you can do with it.
 *
 * The page's body is lists — platforms, browsers, editors, tools — and this is
 * what one line of any of them looks like. Written once so a row cannot be
 * heavier in one section than another, which is what the four tile grids did to
 * each other.
 */
export function Row({
  name,
  note,
  href,
  verb = 'Download',
}: {
  name: string
  /** One line, when the name alone does not say it. */
  note?: string
  href: string
  verb?: string
}) {
  // An off-property destination opens in a new tab, read off the URL rather
  // than declared twice.
  const away = /^https?:\/\//.test(href)
  return (
    <div className={ROW}>
      <div className="min-w-0">
        <div className="truncate text-sm text-white">{name}</div>
        {note ? <div className="mt-0.5 truncate text-sm text-neutral-500">{note}</div> : null}
      </div>
      <a
        className={QUIET}
        href={href}
        {...(away ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={`${verb} ${name}`}
      >
        {verb}
      </a>
    </div>
  )
}
