'use client'

import { useState, useRef, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowRight, ArrowUpRight } from 'lucide-react'
import { CHAT, CLOUD, SURFACES } from './nav-data'

/** The composer is a subtle front door to hanzo.chat: submit forwards the prompt. */
function goToChat(prompt: string) {
  const q = prompt.trim()
  window.location.href = q ? `${CHAT}/?q=${encodeURIComponent(q)}` : CHAT
}

/**
 * The unified apex hero. The pitch leads — "The open-source AI cloud" — with the
 * primary (Open Console) and secondary (Browse products) CTAs. The chat composer
 * is kept as ONE subtle element that forwards to hanzo.chat, not the whole page.
 * A surfaces strip routes out to the flagship product homes.
 */
export default function Hero() {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    goToChat(value)
  }

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:px-8">
      {/* Ambient glow — the site radial-gradient hero. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-[34%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.a
          href="/products"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3.5 py-1.5 text-xs text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          Model + cloud APIs · one gateway · on-chain
          <ArrowRight className="h-3 w-3" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
        >
          The open-source AI cloud
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-neutral-400"
        >
          One unified surface over Hanzo&rsquo;s models and cloud — every service behind one
          OpenAI-compatible gateway at <span className="text-neutral-200">api.hanzo.ai/v1</span>. Chat, build,
          and ship on open models, then route out to the right product: Console, Builder, Studio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={CLOUD}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 sm:w-auto"
          >
            Open Console
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/products"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neutral-500 sm:w-auto"
          >
            Browse products
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Subtle chat entry — ONE element, forwards to hanzo.chat. */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={submit}
          className="mx-auto mt-10 w-full max-w-xl"
        >
          <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 py-2 pl-5 pr-2 text-left transition-colors focus-within:border-neutral-600">
            <textarea
              id="ask"
              ref={inputRef}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) submit(e)
              }}
              placeholder="Ask Hanzo anything"
              aria-label="Ask Hanzo anything"
              className="max-h-32 min-h-[24px] flex-1 resize-none bg-transparent py-1 text-[15px] text-white placeholder-neutral-500 outline-none"
            />
            <button
              type="submit"
              aria-label="Send to Hanzo Chat"
              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-90"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2.5 text-xs text-neutral-500">
            Runs on open Zen models — free to start on{' '}
            <a href={CHAT} target="_blank" rel="noreferrer noopener" className="text-neutral-300 underline-offset-4 hover:underline">
              hanzo.chat
            </a>
            .
          </p>
        </motion.form>
      </div>

      {/* Surfaces strip — route out to each product's own home. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.26 }}
        className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {SURFACES.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3.5 transition-colors hover:border-neutral-700"
          >
            <span>
              <span className="block text-sm font-medium text-white">{s.label}</span>
              <span className="mt-0.5 block text-xs text-neutral-500">{s.desc}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-neutral-600 transition-colors group-hover:text-white" />
          </a>
        ))}
      </motion.div>
    </section>
  )
}
