'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2, Brain, Sparkles } from 'lucide-react'
import { EnsoLogo } from '@/components/enso/EnsoLogo'

interface ModelCard {
  icon: typeof Code2
  name: string
  tag: string
  body: string
  href: string
}

// The open-weight Zen family — free to self-host. Enso is featured separately
// as the router that sits over everything.
const ZEN: ModelCard[] = [
  {
    icon: Code2,
    name: 'Zen Coder',
    tag: 'Open weights',
    body: 'The coding model behind the CLI, IDE, and agents — repository-scale context and tool use.',
    href: '/zen',
  },
  {
    icon: Brain,
    name: 'Zen',
    tag: 'Open weights',
    body: 'Open-weight frontier reasoning and chat. Run it on Hanzo Cloud or self-host it for free.',
    href: '/zen',
  },
  {
    icon: Sparkles,
    name: 'Zen Embeddings',
    tag: 'Open weights',
    body: 'Open embedding models for text, code, and images — wired straight into Vector for retrieval.',
    href: '/cloud/embeddings',
  },
]

export default function ModelsSection() {
  return (
    <section className="border-t border-neutral-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-neutral-500">Models</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Open weights, one router
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            The open-weight Zen family stays free to self-host. Enso sits on top and routes every request across
            200+ open and frontier models — dialing savings against quality automatically.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Enso — the router. Spans two columns on desktop. */}
          <motion.a
            href="/enso"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
            className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 transition-colors hover:border-neutral-700 lg:col-span-2"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: 'radial-gradient(120% 120% at 80% 0%, rgba(255,255,255,0.10) 0%, transparent 55%)' }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <EnsoLogo size={26} className="text-white" />
              <span className="text-sm font-medium text-neutral-400">Enso · the router</span>
            </div>
            <div className="relative z-10 mt-10">
              <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">One model to command 200+</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-400">
                Enso routes every request to the best model for the job across the whole catalog, dialing savings
                against quality — Flash, Pro, and Ultra presets, one OpenAI-compatible API. Proprietary, on Hanzo Cloud.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Explore Enso
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="text-xs text-neutral-500">200+ models · savings ↔ quality dial</span>
              </div>
            </div>
          </motion.a>

          {/* Zen family stack. */}
          <div className="grid gap-5">
            {ZEN.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.a
                  key={m.name}
                  href={m.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                  className="group rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-base font-semibold text-white">{m.name}</span>
                    </div>
                    <span className="rounded-full border border-neutral-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-500">
                      {m.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{m.body}</p>
                </motion.a>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8"
        >
          <a href="/models" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white">
            Browse all models
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
