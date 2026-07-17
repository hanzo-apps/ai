'use client'

/**
 * ProductLanding — the ONE shared kit every featured Hanzo product page renders
 * through, so the detailed pages that the apex nav now links into (on hanzo.ai
 * itself) look first-class and identical in style to the flagship Enso landing.
 *
 * Design language is lifted verbatim from components/enso/EnsoLanding.tsx:
 * always-dark (bg-black / white / neutral), radial-gradient hero,
 * `rounded-2xl border border-neutral-800 bg-neutral-900/50` cards, framer-motion
 * (0.5s, ~0.06s stagger), rounded-full white/black + neutral-outline buttons,
 * Geist. Content is data — each page passes ONE typed props object; this file
 * owns the layout. Honest by construction: pass only real copy, real links, and
 * real (measured) stats — never fabricated benchmarks.
 */

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export interface CTA {
  label: string
  href: string
  icon?: LucideIcon
}

export interface Pillar {
  icon: LucideIcon
  title: string
  body: string
}

export interface Feature {
  icon: LucideIcon
  title: string
  body: string
}

export interface Stat {
  icon?: LucideIcon
  value: string
  label: string
  sub?: string
}

export interface Step {
  n: string
  title: string
  body: string
}

export interface SectionCopy {
  eyebrow: string
  title: string
  sub?: string
}

export interface ProductLandingProps {
  /** Hero */
  badge?: string
  badgeIcon?: LucideIcon
  title: ReactNode
  lede: string
  /** First CTA renders as the solid white primary; the rest as neutral outlines. */
  ctas: CTA[]
  note?: { icon?: LucideIcon; text: string }
  availableThrough?: string[]
  /** What-it-is — numbered pillar grid. */
  what: SectionCopy & { pillars: Pillar[] }
  /** Feature grid. */
  features?: SectionCopy & { items: Feature[] }
  /** How-it-works — numbered steps. */
  steps?: SectionCopy & { items: Step[] }
  /** Measured stats row. */
  stats?: Partial<SectionCopy> & { items: Stat[]; footnote?: string }
  /** Terminal-style code block. */
  code?: { head?: SectionCopy; lang: string; source: string; ctas?: CTA[] }
  /** Final CTA card. */
  finalCta: { title: string; sub: string; buttons: CTA[]; icon?: LucideIcon }
}

function SectionHead({ eyebrow, title, sub }: SectionCopy) {
  return (
    <motion.div {...fade} transition={{ duration: 0.5 }} className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">{eyebrow}</div>
      <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-neutral-400">{sub}</p>}
    </motion.div>
  )
}

function PrimaryButton({ cta }: { cta: CTA }) {
  const Icon = cta.icon ?? ArrowRight
  return (
    <a
      href={cta.href}
      className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-black transition-opacity hover:opacity-90"
    >
      {cta.label} <Icon className="h-4 w-4" />
    </a>
  )
}

function OutlineButton({ cta }: { cta: CTA }) {
  const Icon = cta.icon
  return (
    <a
      href={cta.href}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-8 py-3 font-medium text-white transition-colors hover:border-neutral-400"
    >
      {Icon && <Icon className="h-4 w-4" />} {cta.label}
    </a>
  )
}

function CTARow({ ctas }: { ctas: CTA[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {ctas.map((c, i) => (i === 0 ? <PrimaryButton key={c.label} cta={c} /> : <OutlineButton key={c.label} cta={c} />))}
    </div>
  )
}

export function ProductLanding(p: ProductLandingProps) {
  const Badge = p.badgeIcon
  const NoteIcon = p.note?.icon
  const FinalIcon = p.finalCta.icon

  return (
    <div className="bg-black pt-16 text-white">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 68%)', filter: 'blur(110px)' }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {p.badge && (
            <motion.div
              {...fade}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2"
            >
              {Badge && <Badge className="h-4 w-4 text-white" />}
              <span className="text-sm font-medium text-neutral-200">{p.badge}</span>
            </motion.div>
          )}

          <motion.h1
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-5xl font-bold leading-[1.05] md:text-7xl"
          >
            <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">{p.title}</span>
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-6 max-w-3xl text-xl text-neutral-300 md:text-2xl"
          >
            {p.lede}
          </motion.p>

          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.22 }} className="mt-10">
            <CTARow ctas={p.ctas} />
          </motion.div>

          {p.note && (
            <motion.p
              {...fade}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-6 inline-flex max-w-xl items-center justify-center gap-2 text-sm text-neutral-500"
            >
              {NoteIcon && <NoteIcon className="h-4 w-4" />} {p.note.text}
            </motion.p>
          )}

          {p.availableThrough && p.availableThrough.length > 0 && (
            <motion.div
              {...fade}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500"
            >
              <span>Available through</span>
              {p.availableThrough.map((s) => (
                <span key={s} className="text-neutral-300">{s}</span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── What it is ─────────────────────────────────────────────────────── */}
      <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={p.what.eyebrow} title={p.what.title} sub={p.what.sub} />
          <div className="grid gap-6 md:grid-cols-3">
            {p.what.pillars.map((pl, i) => (
              <motion.div
                key={pl.title}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                    <pl.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-600">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{pl.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{pl.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      {p.features && (
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHead eyebrow={p.features.eyebrow} title={p.features.title} sub={p.features.sub} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {p.features.items.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ───────────────────────────────────────────────────── */}
      {p.steps && (
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionHead eyebrow={p.steps.eyebrow} title={p.steps.title} sub={p.steps.sub} />
            <div className="grid gap-6 md:grid-cols-3">
              {p.steps.items.map((s, i) => (
                <motion.div
                  key={s.n}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7"
                >
                  <div className="mb-4 text-3xl font-bold text-neutral-700">{s.n}</div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      {p.stats && (
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {p.stats.eyebrow && p.stats.title && (
              <SectionHead eyebrow={p.stats.eyebrow} title={p.stats.title} sub={p.stats.sub} />
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {p.stats.items.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fade}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-7 text-center"
                >
                  {s.icon && <s.icon className="mx-auto mb-4 h-6 w-6 text-neutral-400" />}
                  <div className="text-4xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-neutral-300">{s.label}</div>
                  {s.sub && <div className="mt-0.5 text-xs text-neutral-500">{s.sub}</div>}
                </motion.div>
              ))}
            </div>
            {p.stats.footnote && (
              <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-neutral-600">{p.stats.footnote}</p>
            )}
          </div>
        </section>
      )}

      {/* ── Code ───────────────────────────────────────────────────────────── */}
      {p.code && (
        <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {p.code.head && <SectionHead eyebrow={p.code.head.eyebrow} title={p.code.head.title} sub={p.code.head.sub} />}
            <motion.div
              {...fade}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60"
            >
              <div className="flex items-center gap-2 border-b border-neutral-800 bg-neutral-900/80 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                <span className="ml-2 font-mono text-xs text-neutral-500">{p.code.lang}</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-neutral-300">
                <code>{p.code.source}</code>
              </pre>
            </motion.div>
            {p.code.ctas && p.code.ctas.length > 0 && (
              <div className="mt-8">
                <CTARow ctas={p.code.ctas} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            {...fade}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-10 text-center md:p-14"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            </div>
            <div className="relative z-10">
              {FinalIcon && <FinalIcon className="mx-auto mb-4 h-10 w-10 text-white" />}
              <h2 className="text-3xl font-bold text-white md:text-4xl">{p.finalCta.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">{p.finalCta.sub}</p>
              <div className="mt-8">
                <CTARow ctas={p.finalCta.buttons} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

/** Small inline helper for pages that want a checklist inside custom sections. */
export function CheckList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="space-y-2 text-sm text-neutral-300">
      {items.map((x) => (
        <li key={x} className="flex items-center gap-2">
          <Check className={`h-4 w-4 shrink-0 ${muted ? 'text-neutral-400' : 'text-white'}`} /> {x}
        </li>
      ))}
    </ul>
  )
}

export { fade, SectionHead, ArrowUpRight }
