'use client'

import { motion } from 'framer-motion'
import { HanzoLogo } from '@hanzo/logo/react'
import { ArrowRight } from 'lucide-react'
import { EnsoLogo } from '@/components/enso/EnsoLogo'
import { CLOUD } from './nav-data'

/**
 * The two flagship cards under the apex hero: Enso (the proprietary flagship model,
 * Hanzo Cloud only) and Hanzo Cloud (the platform). Enso carries the fully-closed
 * ensō ring; Cloud carries the Hanzo mark.
 */
export default function FeatureCards() {
  return (
    <section className="px-4 pb-24 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
        {/* Flagship — Enso (spans two columns on desktop). */}
        <motion.a
          href="/enso"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 transition-colors hover:border-neutral-700 lg:col-span-2"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: 'radial-gradient(120% 120% at 80% 0%, rgba(255,255,255,0.10) 0%, transparent 55%)' }}
          />
          <div className="relative z-10 flex items-center gap-3">
            <EnsoLogo size={28} className="text-white" />
            <span className="text-sm font-medium text-neutral-400">Enso · Hanzo Cloud</span>
          </div>
          <div className="relative z-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Introducing Enso
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">
              One model to command them all. Enso orchestrates the world’s best models — Flash, Pro, and Ultra —
              into a single API. Proprietary, available only on Hanzo Cloud.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white">
              Explore Enso
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </motion.a>

        {/* Secondary — Hanzo Cloud. */}
        <motion.a
          href={CLOUD}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/70 to-black p-8 transition-colors hover:border-neutral-700"
        >
          <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-neutral-400">
            <HanzoLogo variant="white" size={22} />
            Hanzo Cloud
          </div>
          <div className="relative z-10 mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              The open-source cloud for AI agents
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
              Zen open models, Base backends, IAM, KMS, and vector search behind one API. Pay-as-you-go, or
              self-host the whole stack.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white">
              Start building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
