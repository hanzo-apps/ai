'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { EnsoLogo } from '@/components/enso/EnsoLogo'
import { CHAT } from './nav-data'

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
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 68%)', filter: 'blur(120px)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.a
          href="/enso"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-2 transition-colors hover:border-neutral-600"
        >
          <EnsoLogo size={16} className="text-white" />
          <span className="text-sm font-medium text-neutral-200">Introducing Enso · Hanzo Cloud</span>
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

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
            Enso, our frontier model
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 sm:text-xl"
        >
          Hanzo’s flagship AI — one model that orchestrates the world’s best models into a single
          API to tackle complex, multi-step work. Available on Hanzo Cloud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/enso"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Explore Enso <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={CHAT}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            <MessageSquare className="h-4 w-4" /> Try in Hanzo Chat
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-neutral-500"
        >
          {['Flash', 'Pro', 'Ultra'].map((t) => (
            <span key={t} className="text-neutral-300">{t}</span>
          ))}
          <span aria-hidden>·</span>
          <span>one OpenAI-compatible API</span>
        </motion.div>
      </div>
    </section>
  )
}
