'use client'

import { motion } from 'framer-motion'
import { Github, Boxes, ArrowUpRight, ArrowRight } from 'lucide-react'
import { GITHUB } from './nav-data'

/**
 * What makes it different: every primitive is open source, and every resource is
 * settled on-chain. Two panels, monochrome, matching the site card system.
 */
export default function Differentiators() {
  return (
    <section className="border-t border-neutral-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
        {/* Open source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-8"
        >
          <div className="inline-flex w-fit rounded-lg border border-neutral-800 bg-black p-2.5">
            <Github className="h-5 w-5 text-white" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">Open source, end to end</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
            Every primitive — models, gateway, IAM, KMS, data, compute — is open source. Self-host the whole cloud
            on your own hardware, or let us run it. Read the code, fork it, ship it. No black boxes, no lock-in.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
          >
            github.com/hanzoai
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* On-chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-8"
        >
          <div className="inline-flex w-fit rounded-lg border border-neutral-800 bg-black p-2.5">
            <Boxes className="h-5 w-5 text-white" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">On-chain by default</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">
            Every resource carries a cryptographic identity and settles on-chain. Usage is metered, attestable, and
            provable — models, datasets, builds, and inference runs all get verifiable provenance, powered by Lux.
          </p>
          <a
            href="/products/web3"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
          >
            Explore settlement
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
