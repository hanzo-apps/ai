'use client'

/**
 * page-kit — the shared shapes every simple marketing page is made of.
 *
 * Seventeen pages in `app/(marketing)` open with a byte-identical hero block,
 * each with its own copy of the same badge/title/subtitle markup and motion
 * config. This module is that block, once. A page supplies content; the kit
 * owns layout, spacing, type scale and motion.
 *
 * It is also the seam for the gui migration: when these shapes move to
 * `@hanzogui/*` primitives, the change lands here rather than in every page
 * that renders one. Pages therefore MUST NOT reach around the kit with their
 * own utility classes for layout — pass content, not styling.
 */

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

/** Fade-and-rise, honouring the OS reduced-motion setting. */
function useRise(delay = 0) {
  const still = useReducedMotion()
  return still
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay },
      }
}

/* ── hero ──────────────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  icon: Icon,
  title,
  lede,
  children,
}: {
  eyebrow: string
  icon?: LucideIcon
  title: string
  lede?: string
  children?: React.ReactNode
}) {
  return (
    <section className="px-4 pt-24 pb-12 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          {...useRise()}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
            color: 'var(--primary)',
          }}
        >
          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
          {eyebrow}
        </motion.div>
        <motion.h1
          {...useRise(0.05)}
          className="mb-4 text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        {lede ? (
          <motion.p {...useRise(0.1)} className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {lede}
          </motion.p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}

/* ── section ───────────────────────────────────────────────────────────────── */

export function Section({
  title,
  lede,
  children,
}: {
  title?: string
  lede?: string
  children: React.ReactNode
}) {
  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        {title ? (
          <h2 className="mb-2 text-xl font-medium tracking-tight text-foreground sm:text-2xl">{title}</h2>
        ) : null}
        {lede ? <p className="mb-6 max-w-2xl text-sm text-muted-foreground sm:text-base">{lede}</p> : null}
        {children}
      </div>
    </section>
  )
}

/* ── cards ─────────────────────────────────────────────────────────────────── */

export interface CardItem {
  title: string
  description: string
  href?: string
  icon?: LucideIcon
  /** Shown right-aligned in the title row — e.g. a date or an endpoint verb. */
  meta?: string
}

function CardBody({ item }: { item: CardItem }) {
  const { title, description, icon: Icon, meta } = item
  return (
    <>
      <div className="mb-2 flex items-center gap-2">
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
        <span className="text-sm font-medium text-foreground">{title}</span>
        {meta ? <span className="ml-auto shrink-0 text-xs text-muted-foreground">{meta}</span> : null}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </>
  )
}

/** One-, two- or three-up card grid. Single column on small screens. */
export function CardGrid({ items, columns = 2 }: { items: CardItem[]; columns?: 1 | 2 | 3 }) {
  const cols = columns === 1 ? '' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
  return (
    <div className={`grid grid-cols-1 gap-4 ${cols}`}>
      {items.map((item) => {
        const shared = 'block rounded-xl border border-border p-5 transition-colors'
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            className={`${shared} hover:border-foreground/30`}
            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
          >
            <CardBody item={item} />
          </Link>
        ) : (
          <div key={item.title} className={shared}>
            <CardBody item={item} />
          </div>
        )
      })}
    </div>
  )
}

/* ── prose ─────────────────────────────────────────────────────────────────── */

/** Long-form body copy (policies, explanations). Headings come from `Section`. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-foreground">
      {children}
    </div>
  )
}

/* ── page wrapper ──────────────────────────────────────────────────────────── */

/** The outer frame; the marketing layout already supplies nav + footer. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-16">{children}</main>
    </div>
  )
}
