'use client'

import { motion } from '@/components/motion'
import { ArrowRight } from 'lucide-react'
import { EnsoLogo } from '@/components/enso/EnsoLogo'

/**
 * The apex LEAD — Enso, Hanzo's flagship frontier model, front and center at the
 * very top of hanzo.ai (before the build story and the chat composer). Mirrors the
 * /enso hero (animated ensō ring, gradient headline, rounded-full CTAs) so the two
 * read as one brand. Honest by construction: the primary CTA is "Explore Enso" →
 * /enso (the Enso landing) — NOT a "technical report" (none is published). Positions
 * Enso as the flagship frontier model without quoting any specific benchmark number.
 */
export default function EnsoHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:px-8">
      {/* Ambient ensō glow — the same living radial the /enso hero breathes. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[42%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--pure-white) 12%, transparent) 0%, transparent 68%)',
            filter: 'blur(120px)',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.a
          href="/platform"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 transition-colors hover:border-neutral-600"
        >
          <EnsoLogo size={16} className="text-white" />
          <span className="text-sm font-medium text-neutral-200">The AI-native cloud</span>
          <ArrowRight className="h-3.5 w-3.5 text-neutral-500" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 flex justify-center"
        >
          <EnsoLogo size={80} className="text-white" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Everything AI needs. Built together.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl"
        >
          From Enso to the infrastructure beneath it, Hanzo unifies models, agents, compute, data,
          security, and observability in one open-source platform. Start on your machine. Scale
          across a cluster. Keep the same API.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://cloud.hanzo.ai"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start building <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/platform"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Explore the platform
          </a>
        </motion.div>

        <motion.a
          href="/platform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hz-tap group mt-8 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          <span className="text-neutral-300 group-hover:text-white">Enso</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span className="text-neutral-300 group-hover:text-white">Full-stack observability</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span className="text-neutral-300 group-hover:text-white">One API</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span className="text-neutral-300 group-hover:text-white">Open source</span>
          <span aria-hidden className="text-neutral-700">·</span>
          <span>Techstars ’17</span>
        </motion.a>
      </div>
    </section>
  )
}
