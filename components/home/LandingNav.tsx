'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HanzoLogo } from '@hanzo/logo/react'
import { ChevronDown, ArrowUpRight, ArrowRight, Menu, X } from 'lucide-react'
import { cloudCategories, categorySlug, POSITIONING } from '@/lib/data/cloud-primitives'
import { NAV, SURFACES, CHAT, CLOUD, isExternalHref, type NavItem, type NavLink } from './nav-data'

/** A top-nav / mega-menu link — external hrefs open in a new tab with a glyph. */
function Anchor({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  const ext = isExternalHref(href)
  return (
    <a href={href} className={className} {...(ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
      {children}
    </a>
  )
}

/**
 * Platform mega-menu — the umbrella. Built from the ten cloud-primitive
 * categories (the ONE taxonomy). Each category header links to its
 * `/products/<slug>` page; each leaf routes OUT to its own canonical home
 * (`home` subdomain when it has one, else its `href`). A feature rail at the
 * foot links to the flagship surfaces.
 */
function PlatformPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-x-0 top-full border-b border-neutral-800 bg-black shadow-2xl"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-neutral-900 pb-4">
          <div>
            <div className="text-sm font-medium text-white">The Open AI Cloud</div>
            <div className="text-xs text-neutral-500">{POSITIONING}</div>
          </div>
          <a href="/products" className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-medium text-neutral-300 hover:text-white">
            View all products
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
          {cloudCategories.map((cat) => (
            <div key={cat.title}>
              <a
                href={`/products/${categorySlug(cat.title)}`}
                className="group mb-2 flex items-center gap-1 text-[13px] font-semibold text-white"
              >
                {cat.title}
                <ArrowRight className="h-3 w-3 text-neutral-600 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-300" />
              </a>
              <ul className="space-y-0.5">
                {cat.items.map((item) => {
                  const Icon = item.icon
                  // Route OUT to the product's own subdomain home when it has one.
                  const href = item.home ?? item.href
                  const ext = Boolean(item.external) || isExternalHref(href)
                  return (
                    <li key={item.title}>
                      <Anchor
                        href={href}
                        className="flex items-center gap-1.5 rounded-md px-1.5 py-1 -mx-1.5 text-[13px] text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
                      >
                        <Icon className="h-3.5 w-3.5 flex-shrink-0 text-neutral-600" />
                        <span className="truncate">{item.title}</span>
                        {ext && <ArrowUpRight className="h-2.5 w-2.5 flex-shrink-0 text-neutral-600" />}
                      </Anchor>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature rail — route out to the flagship surfaces. */}
        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-neutral-900 pt-6 lg:grid-cols-4">
          {SURFACES.map((s) => (
            <Anchor
              key={s.label}
              href={s.href}
              className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 transition-colors hover:border-neutral-700"
            >
              <span>
                <span className="block text-[13px] font-medium text-white">{s.label}</span>
                <span className="block text-xs text-neutral-500">{s.desc}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-600 transition-colors group-hover:text-white" />
            </Anchor>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/** Meet Hanzo mega-menu — big "Explore" links + secondary columns. */
function MegaPanel({ item }: { item: NavItem }) {
  const explore = item.explore ?? []
  const columns = item.columns ?? []
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-x-0 top-full border-b border-neutral-800 bg-black shadow-2xl"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:px-8">
        <div>
          <div className="mb-5 text-xs font-medium uppercase tracking-widest text-neutral-500">Explore</div>
          <ul className="space-y-0.5">
            {explore.map((l) => (
              <li key={l.label}>
                <Anchor href={l.href} className="group flex flex-col rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-neutral-900">
                  <span className="text-2xl font-medium text-white">{l.label}</span>
                  {l.desc && <span className="text-xs text-neutral-500">{l.desc}</span>}
                </Anchor>
              </li>
            ))}
          </ul>
        </div>

        {columns.length > 0 && (
          <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0,1fr))` }}>
            {columns.map((col) => (
              <div key={col.title}>
                <div className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500">{col.title}</div>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Anchor href={link.href} className="block rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-neutral-900">
                        <span className="text-sm font-medium text-neutral-100">{link.label}</span>
                        {link.desc && <span className="mt-0.5 block text-xs text-neutral-500">{link.desc}</span>}
                      </Anchor>
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

  // Collapse the "Hanzo AI" wordmark to the H mark once scrolled.
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
                <Anchor
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center gap-0.5 rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
                >
                  {item.label}
                  {isExternalHref(item.href) && <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" />}
                </Anchor>
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

          {/* Right: Chat (secondary) + Open Console (primary) */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <a
              href={CHAT}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white sm:inline-flex"
            >
              Chat
            </a>
            <a
              href={CLOUD}
              className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Open Console
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button onClick={() => setMobile(true)} aria-label="Open menu" className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-900 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Full-width panels (desktop). */}
        <div className="hidden lg:block">
          <AnimatePresence>
            {activeItem && (activeItem.kind === 'platform' ? <PlatformPanel /> : <MegaPanel item={activeItem} />)}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile drawer — sibling of <header> (the header's backdrop-blur traps
          position:fixed children). */}
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
              <div className="mb-6 grid grid-cols-2 gap-2">
                <a href={CLOUD} className="inline-flex items-center justify-center gap-1 rounded-full bg-white px-4 py-3 text-sm font-medium text-black">
                  Open Console <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href={CHAT} target="_blank" rel="noreferrer noopener" className="inline-flex items-center justify-center gap-1 rounded-full border border-neutral-700 px-4 py-3 text-sm font-medium text-white">
                  Chat <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {NAV.map((item) => (
                <MobileSection key={item.label} item={item} />
              ))}

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">Surfaces</div>
                {SURFACES.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="flex items-center justify-between py-2 text-[15px] text-neutral-200">
                    {s.label}
                    <ArrowUpRight className="h-4 w-4 text-neutral-500" />
                  </a>
                ))}
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
    const ext = isExternalHref(item.href)
    return (
      <a
        href={item.href}
        {...(ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="flex items-center justify-between border-b border-neutral-900 py-3.5 text-[15px] font-medium text-neutral-100"
      >
        {item.label}
        {ext && <ArrowUpRight className="h-4 w-4 text-neutral-500" />}
      </a>
    )
  }

  const platform = item.kind === 'platform'

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
              {platform ? (
                cloudCategories.map((cat) => (
                  <a
                    key={cat.title}
                    href={`/products/${categorySlug(cat.title)}`}
                    className="flex items-center justify-between py-1.5 pl-2 text-[15px] font-medium text-neutral-100"
                  >
                    {cat.title}
                    <span className="pr-2 text-xs text-neutral-600">{cat.items.length}</span>
                  </a>
                ))
              ) : (
                <>
                  {(item.explore ?? []).map((l) => (
                    <MobileLink key={l.label} link={l} strong />
                  ))}
                  {(item.columns ?? []).map((col) => (
                    <div key={col.title} className="mb-3 mt-3">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-600">{col.title}</div>
                      {col.links.map((link) => (
                        <MobileLink key={link.label} link={link} />
                      ))}
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileLink({ link, strong }: { link: NavLink; strong?: boolean }) {
  const ext = isExternalHref(link.href)
  return (
    <a
      href={link.href}
      {...(ext ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className={`flex items-center justify-between py-1.5 pl-2 ${strong ? 'text-[15px] font-medium text-neutral-100' : 'text-sm text-neutral-300'}`}
    >
      {link.label}
      {ext && <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600" />}
    </a>
  )
}
