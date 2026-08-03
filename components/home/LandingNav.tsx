'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HanzoLogo } from '@hanzo/logo/react'
import { Search, ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV, LOGIN, START, goToChat, type NavItem } from './nav-data'

/**
 * Ask Hanzo — ONE affordance with one meaning on every host. The apex landing
 * has a composer in the hero, so the magnifying glass drops you into it; every
 * other page (cloud.hanzo.ai included) has none, and there the same control
 * hands the question to hanzo.chat, which is where a question gets answered.
 * Previously it focused an `#ask` element that only the apex ever rendered, so
 * on cloud.hanzo.ai the button did nothing at all.
 */
function askHanzo() {
  if (typeof document === 'undefined') return
  const el = document.getElementById('ask') as HTMLTextAreaElement | null
  if (!el) {
    goToChat()
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
  el.focus()
}

/**
 * The FULL-WIDTH mega panel — an openai.com-style dropout below the header bar,
 * spanning the viewport, with a big "Explore <section>" links column on the left
 * and secondary link columns on the right.
 */
function MegaPanel({ item }: { item: NavItem }) {
  const explore = item.explore ?? []
  const columns = item.columns ?? []
  // An item with no `explore` block is a pure category menu — Products, whose
  // ten cloud primitives lay out as two rows of five across the full width.
  // The shape falls out of the data; there is no flag to keep in sync.
  const wide = explore.length === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-neutral-800 bg-black shadow-2xl"
    >
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:px-8 ${
          wide ? '' : 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]'
        }`}
      >
        {/* Explore — big links. Absent on a pure category menu, header and all:
            an "Explore Products" label above nothing is a heading for an empty
            column, and it pushes the grid down by the height of one. */}
        {explore.length > 0 && (
        <div>
          <div className="mb-5 text-xs font-medium uppercase tracking-widest text-neutral-400">Explore {item.label}</div>
          <ul className="space-y-0.5">
            {explore.map((l) => (
              <li key={l.label}>
                {/* items-start + text-left + no-underline are load-bearing, not
                    decoration. @hanzo/design's tokens/base.css carries BARE element
                    selectors — `a:hover{text-decoration:underline}` — and an
                    unlayered rule outranks every layered utility regardless of
                    specificity, so a nav link picks up a body-copy underline on
                    hover unless it says otherwise. The alignment is explicit for
                    the same reason: `flex flex-col` sets no text-align, so the
                    labels inherit whatever an ancestor happens to say. */}
                <a
                  href={l.href}
                  className="group flex flex-col items-start text-left rounded-lg px-2 py-1.5 -mx-2 no-underline transition-colors hover:bg-neutral-900 hover:no-underline"
                >
                  <span className="text-2xl font-medium text-white">{l.label}</span>
                  {l.desc && <span className="text-xs text-neutral-400">{l.desc}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
        )}

        {/* Secondary columns — one per category when wide, else beside Explore. */}
        {columns.length > 0 && (
          <div
            className={wide ? 'grid gap-x-8 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5' : 'grid gap-8'}
            style={wide ? undefined : { gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))` }}
          >
            {columns.map((col) => (
              <div key={col.title}>
                {/* A category header is a link to its own page, not a label. */}
                {col.href ? (
                  <a
                    href={col.href}
                    className="group -mx-2 mb-3 block rounded-lg px-2 py-1 no-underline transition-colors hover:bg-neutral-900 hover:no-underline"
                  >
                    <span className="text-sm font-semibold text-white">{col.title}</span>
                    {col.desc && <span className="mt-0.5 block text-xs text-neutral-500">{col.desc}</span>}
                  </a>
                ) : (
                  <div className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">{col.title}</div>
                )}
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="block rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-neutral-900">
                        <span className="text-sm font-medium text-neutral-100">{link.label}</span>
                        {link.desc && <span className="mt-0.5 block text-xs text-neutral-400">{link.desc}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function LandingNav() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  // Collapse the "Hanzo AI" wordmark to just the H mark once you scroll (matches
  // cloud.hanzo.ai, which collapses "Hanzo Cloud" → H).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(label)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 120)
  }

  const activeItem = NAV.find((i) => i.label === open && !i.href) ?? null

  return (
    <>
      {/* The header owns the full-width panel: hovering a top item opens it below the
          bar, and leaving the whole header (bar + panel) closes it. */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/80 bg-black/70 backdrop-blur-md"
        onMouseLeave={scheduleClose}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
          {/* Left: logo + desktop nav */}
          <a href="/" className="flex flex-shrink-0 items-center" aria-label="Hanzo home">
            <HanzoLogo variant="white" size={22} />
            <motion.span
              initial={false}
              animate={{ opacity: scrolled ? 0 : 1, width: scrolled ? 0 : 'auto', marginLeft: scrolled ? 0 : 8 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap text-[15px] font-semibold tracking-tight text-white"
            >
              Hanzo AI
            </motion.span>
          </a>

          <div className="ml-4 hidden items-center lg:flex">
            {NAV.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-0.5 rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />
                </a>
              ) : (
                <button
                  key={item.label}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors hover:text-white ${open === item.label ? 'text-white' : 'text-neutral-300'}`}
                  aria-expanded={open === item.label}
                  onMouseEnter={() => openMenu(item.label)}
                  onFocus={() => openMenu(item.label)}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
                </button>
              ),
            )}
          </div>

          {/* Right: ask + the two console actions. No dropdowns — there is one
              place to log in, so a menu of places would be a menu of one. */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              onClick={askHanzo}
              aria-label="Ask Hanzo"
              className="hidden rounded-full p-2 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white sm:inline-flex"
            >
              <Search className="h-4 w-4" />
            </button>

            <a
              href={LOGIN.href}
              className="hidden rounded-full px-3 py-2 text-sm text-neutral-300 no-underline transition-colors hover:text-white hover:no-underline sm:inline-flex"
            >
              {LOGIN.label}
            </a>

            <a
              href={START.href}
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 hover:no-underline"
            >
              {START.label}
            </a>

            <button onClick={() => setMobile(true)} aria-label="Open menu" className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-900 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Full-width mega panel (desktop). */}
        <div className="hidden lg:block">
          <AnimatePresence>{activeItem && <MegaPanel item={activeItem} />}</AnimatePresence>
        </div>
      </header>

      {/* Mobile drawer — sibling of <header> (see original note: the header's
          backdrop-blur traps position:fixed children). */}
      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ zIndex: 60 }} className="fixed inset-0 bg-black lg:hidden">
            <div className="flex h-16 items-center justify-between border-b border-neutral-800/80 px-4">
              <a href="/" className="flex items-center gap-2" aria-label="Hanzo home">
                <HanzoLogo variant="white" size={22} />
                <span className="ml-2 text-[15px] font-semibold tracking-tight text-white">Hanzo AI</span>
              </a>
              <button onClick={() => setMobile(false)} aria-label="Close menu" className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-6">
              <a href={START.href} className="mb-6 inline-flex w-full items-center justify-center gap-1 rounded-full bg-white px-4 py-3 text-sm font-medium text-black no-underline hover:no-underline">
                {START.label} <ArrowUpRight className="h-4 w-4" />
              </a>

              {NAV.map((item) => (
                <MobileSection key={item.label} item={item} />
              ))}

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <a href={LOGIN.href} className="flex min-h-11 items-center text-[15px] font-medium text-neutral-100">
                  {LOGIN.label}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MobileSection({ item }: { item: NavItem }) {
  const [expanded, setExpanded] = useState(false)

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer noopener" className="flex items-center justify-between border-b border-neutral-900 py-3.5 text-[15px] font-medium text-neutral-100">
        {item.label}
        <ArrowUpRight className="h-4 w-4 text-neutral-500" />
      </a>
    )
  }

  return (
    <div className="border-b border-neutral-900">
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium text-neutral-100" aria-expanded={expanded}>
        {item.label}
        <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="pb-3">
              {(item.explore ?? []).map((l) => (
                <a key={l.label} href={l.href} className="block py-1.5 pl-2 text-[15px] font-medium text-neutral-100">
                  {l.label}
                </a>
              ))}
              {(item.columns ?? []).map((col) => (
                <div key={col.title} className="mb-3 mt-3">
                  {col.href ? (
                    <a href={col.href} className="mb-1 flex min-h-11 items-center text-[15px] font-medium text-neutral-100">
                      {col.title}
                    </a>
                  ) : (
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">{col.title}</div>
                  )}
                  {col.links.map((link) => (
                    <a key={link.label} href={link.href} className="block py-1.5 pl-2 text-sm text-neutral-300">
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
