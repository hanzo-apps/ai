'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HanzoLogo } from '@hanzo/logo/react'
import { Search, ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { NAV, LOGIN_LINKS, CHAT, type NavItem } from './nav-data'

/** Focus the hero composer (openai's magnifying glass drops you into the ask box). */
function focusComposer() {
  if (typeof document === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
  const el = document.getElementById('ask') as HTMLTextAreaElement | null
  el?.focus()
}

function MegaPanel({ item }: { item: NavItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.15 }}
      className="absolute left-0 top-full pt-3"
    >
      <div className="grid gap-x-8 gap-y-6 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-6 shadow-2xl backdrop-blur-xl"
        style={{ gridTemplateColumns: `repeat(${item.columns!.length}, minmax(11rem, 1fr))` }}
      >
        {item.columns!.map((col) => (
          <div key={col.title}>
            <div className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
              {col.title}
            </div>
            <ul className="space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-neutral-900"
                  >
                    <span className="text-sm font-medium text-neutral-100">{link.label}</span>
                    {link.desc && (
                      <span className="mt-0.5 block text-xs text-neutral-500">{link.desc}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function LandingNav() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [login, setLogin] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(label)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(null), 120)
  }

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-800/80 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6 lg:px-8">
        {/* Left: logo + desktop nav */}
        <a href="/" className="flex flex-shrink-0 items-center gap-2" aria-label="Hanzo home">
          <HanzoLogo variant="white" size={22} />
          <span className="text-[15px] font-semibold tracking-tight text-white">Hanzo</span>
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
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
                  aria-expanded={open === item.label}
                  onFocus={() => openMenu(item.label)}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
                </button>
                <AnimatePresence>
                  {open === item.label && <MegaPanel item={item} />}
                </AnimatePresence>
              </div>
            )
          )}
        </div>

        {/* Right: search + login + try chat */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            onClick={focusComposer}
            aria-label="Search"
            className="hidden rounded-full p-2 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white sm:inline-flex"
          >
            <Search className="h-4 w-4" />
          </button>

          <div
            className="relative hidden sm:block"
            onMouseEnter={() => setLogin(true)}
            onMouseLeave={() => setLogin(false)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
              aria-expanded={login}
            >
              Log in
              <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
            </button>
            <AnimatePresence>
              {login && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full min-w-[12rem] pt-3"
                >
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl">
                    {LOGIN_LINKS.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-900"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={CHAT}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            <span className="hidden sm:inline">Try Hanzo Chat</span>
            <span className="sm:hidden">Chat</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile drawer — rendered OUTSIDE <header>: the header's backdrop-blur
          establishes a containing block that would trap a position:fixed child
          (clipping it to the 64px bar), so the full-screen drawer must be a
          sibling of the header to resolve inset-0 against the viewport. */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 60 }}
            className="fixed inset-0 bg-black lg:hidden"
          >
            <div className="flex h-16 items-center justify-between border-b border-neutral-800/80 px-4">
              <a href="/" className="flex items-center gap-2" aria-label="Hanzo home">
                <HanzoLogo variant="white" size={22} />
                <span className="text-[15px] font-semibold tracking-tight text-white">Hanzo</span>
              </a>
              <button
                onClick={() => setMobile(false)}
                aria-label="Close menu"
                className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-6">
              <a
                href={CHAT}
                target="_blank"
                rel="noreferrer noopener"
                className="mb-6 inline-flex w-full items-center justify-center gap-1 rounded-full bg-white px-4 py-3 text-sm font-medium text-black"
              >
                Try Hanzo Chat <ArrowUpRight className="h-4 w-4" />
              </a>

              {NAV.map((item) => (
                <MobileSection key={item.label} item={item} />
              ))}

              <div className="mt-6 border-t border-neutral-800 pt-6">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Log in
                </div>
                {LOGIN_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block py-2 text-[15px] text-neutral-200"
                  >
                    {l.label}
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
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center justify-between border-b border-neutral-900 py-3.5 text-[15px] font-medium text-neutral-100"
      >
        {item.label}
        <ArrowUpRight className="h-4 w-4 text-neutral-500" />
      </a>
    )
  }

  return (
    <div className="border-b border-neutral-900">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-[15px] font-medium text-neutral-100"
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {item.columns!.map((col) => (
                <div key={col.title} className="mb-3">
                  <div className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
                    {col.title}
                  </div>
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block py-1.5 pl-2 text-sm text-neutral-300"
                    >
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
