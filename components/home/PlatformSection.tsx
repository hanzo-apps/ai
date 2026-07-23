'use client'

import { motion } from 'framer-motion'
import { Network, UserCheck, Server, Landmark } from 'lucide-react'
import { CLOUD } from './nav-data'

interface Feature {
  icon: typeof Network
  title: string
  body: string
}

const FEATURES: Feature[] = [
  {
    icon: Network,
    title: 'One gateway',
    body: 'Every model and service behind one OpenAI-compatible API at api.hanzo.ai/v1 — one key, one SDK, one bill. Enso routes each request to the best model underneath.',
  },
  {
    icon: UserCheck,
    title: 'One identity',
    body: 'Hanzo IAM issues identity for every user, service, and agent. KMS-backed secrets, scoped tokens, and a tamper-evident audit trail across the whole cloud.',
  },
  {
    icon: Server,
    title: 'Managed or self-hosted',
    body: 'Run it on Hanzo Cloud, or self-host the entire open-source stack on your own hardware. Same API, same primitives — no lock-in, no rewrite.',
  },
  {
    icon: Landmark,
    title: 'On-chain settlement',
    body: 'Every metered unit — tokens, GPU-seconds, storage, API calls — settles on-chain via Lux. Deterministic billing, programmable payouts, provable usage.',
  },
]

// Honest certification claims (no "Certified", no fake datacenters).
const COMPLIANCE = ['SOC 2 — Audit in progress', 'HIPAA Ready', 'BAA Available', 'Global high-performance edge']

export default function PlatformSection() {
  return (
    <section id="platform" className="scroll-mt-20 border-t border-neutral-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-neutral-500">Platform</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">One platform. One bill.</h2>
          <p className="mt-4 text-lg text-neutral-400">
            The primitives share one identity, one gateway, and one meter — so the pieces compose instead of colliding.
            Managed for you, or self-hosted on your own terms.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
              >
                <div className="inline-flex rounded-lg border border-neutral-800 bg-black p-2.5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{f.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Honest compliance strip. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-6 py-4"
        >
          {COMPLIANCE.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 text-xs text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
              {c}
            </span>
          ))}
          <a href={`${CLOUD}/security`} target="_blank" rel="noreferrer noopener" className="ml-auto text-xs text-neutral-300 underline-offset-4 hover:underline">
            Trust &amp; security
          </a>
        </motion.div>
      </div>
    </section>
  )
}
