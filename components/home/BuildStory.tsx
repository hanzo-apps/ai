'use client'

import { motion } from 'framer-motion'
import { HanzoLogo } from '@hanzo/logo/react'
import { ArrowRight, ArrowUpRight, Blocks } from 'lucide-react'
import { EnsoLogo } from '@/components/enso/EnsoLogo'
import { APP, CLOUD } from './nav-data'

/**
 * The cross-site story under the Enso lead: how the pieces fit together, in the
 * order Hanzo leads with — the frontier model, then the app builder, then the cloud
 * it runs on. Three numbered cards, each linking out to the right host via the
 * shared nav-data constants (never hardcoded). Same monochrome card style as the
 * apex flagship cards, with hanzo.app in the middle so the journey is complete.
 */

interface Step {
  n: string
  mark: React.ReactNode
  title: string
  body: string
  cta: string
  href: string
  /** External hosts get the up-right arrow; the internal /enso route gets the forward arrow. */
  external?: boolean
}

const STEPS: Step[] = [
  {
    n: '01',
    mark: <EnsoLogo size={22} className="text-white" />,
    title: 'Start with Enso',
    body: 'Build on Hanzo’s frontier model — one OpenAI-compatible API to the world’s best models, orchestrated per task. Flash, Pro, and Ultra presets.',
    cta: 'Explore Enso',
    href: '/enso',
  },
  {
    n: '02',
    mark: <Blocks className="h-[22px] w-[22px] text-white" />,
    title: 'Build & ship your app',
    body: 'Go from idea to production in Hanzo App — the AI app builder. Wire up agents, data, and UI, then launch your agentic company.',
    cta: 'Open hanzo.app',
    href: APP,
    external: true,
  },
  {
    n: '03',
    mark: <HanzoLogo variant="white" size={22} />,
    title: 'Run it on Hanzo Cloud',
    body: 'Ship on the open-source AI cloud — Zen open models, Base backends, IAM, KMS, and vector search behind one API. Pay-as-you-go or self-host.',
    cta: 'Explore Cloud',
    href: CLOUD,
    external: true,
  },
]

export default function BuildStory() {
  return (
    <section className="border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Enso → hanzo.app → Hanzo Cloud
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">From frontier model to shipped product</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Start with the model, build your app, and run it on the cloud — one continuous path.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Arrow = s.external ? ArrowUpRight : ArrowRight
            return (
              <motion.a
                key={s.n}
                href={s.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-colors hover:border-neutral-700"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{ background: 'radial-gradient(120% 120% at 80% 0%, rgba(255,255,255,0.08) 0%, transparent 55%)' }}
                />
                <div className="relative z-10 mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">{s.mark}</div>
                  <span className="text-sm font-semibold text-neutral-600">{s.n}</span>
                </div>
                <h3 className="relative z-10 text-xl font-semibold text-white">{s.title}</h3>
                <p className="relative z-10 mt-2 text-[15px] leading-relaxed text-neutral-400">{s.body}</p>
                <span className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  {s.cta}
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
