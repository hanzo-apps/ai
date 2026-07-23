'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { CLOUD, DOCS } from './nav-data'

const INSTALL = 'curl -fsSL hanzo.sh | bash'

export default function FinalCTA() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative overflow-hidden border-t border-neutral-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start building on Hanzo</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">
          One API, one bill, zero lock-in. Open the console, or install the CLI and ship in minutes.
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-between gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 py-2.5 pl-5 pr-2.5 font-mono text-sm">
          <code className="truncate text-neutral-300">{INSTALL}</code>
          <button onClick={copy} aria-label="Copy install command" className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={CLOUD}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:w-auto"
          >
            Open Console
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={DOCS}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-500 sm:w-auto"
          >
            Read the docs
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
