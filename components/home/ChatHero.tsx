'use client'

import { useState, useRef, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useAnalytics } from '@hanzo/event/react'
import { EVENTS } from '@hanzo/event'
import { ArrowUp, MessageSquare, Boxes, Cloud } from 'lucide-react'
import { CHAT, APP, CLOUD } from './nav-data'

/** The composer is the front door to hanzo.chat: submit forwards the prompt. */
function goToChat(prompt: string) {
  const q = prompt.trim()
  window.location.href = q ? `${CHAT}/?q=${encodeURIComponent(q)}` : CHAT
}

interface Pill {
  label: string
  icon: typeof MessageSquare
  /** chat: submit the current composer value to hanzo.chat (carries the input). */
  chat?: boolean
  /** Or link out to a surface (carries the composer value as ?q= when set). */
  href?: string
}

// The 3 core activities out of hanzo.ai: chat with Enso, build with the Hanzo app,
// deploy on Hanzo Cloud. The chat pill carries whatever is in the composer.
const PILLS: Pill[] = [
  { label: 'Chat with Enso', icon: MessageSquare, chat: true },
  { label: 'Build with the Hanzo app', icon: Boxes, href: APP },
  { label: 'Deploy on Hanzo Cloud', icon: Cloud, href: CLOUD },
]

export default function ChatHero() {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const analytics = useAnalytics()

  // Submitting the composer hands off to hanzo.chat (a cross-origin navigation a
  // pageview can't see), so capture the intent here; the beacon-on-unload flush
  // delivers it as the browser leaves.
  const submit = (e: FormEvent) => {
    e.preventDefault()
    analytics.capture(EVENTS.CHAT_STARTED, { source: 'composer', hasPrompt: value.trim().length > 0 })
    goToChat(value)
  }

  const onPill = (pill: Pill) => {
    analytics.capture(EVENTS.FEATURE_USED, { feature: 'home-pill', label: pill.label })
    if (pill.chat) {
      // carry whatever is in the composer straight into hanzo.chat
      analytics.capture(EVENTS.CHAT_STARTED, { source: 'pill', hasPrompt: value.trim().length > 0 })
      goToChat(value)
      return
    }
    if (pill.href) {
      window.location.href = pill.href
      return
    }
    inputRef.current?.focus()
  }

  return (
    <section className="relative overflow-hidden border-t border-neutral-900 px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8">
      {/* Ambient glow (matches the site's radial-gradient hero). */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-[38%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16]"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl"
        >
          What can I help with?
        </motion.h1>

        {/* Composer */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          onSubmit={submit}
          className="mx-auto mt-8 w-full"
        >
          <div className="flex items-end gap-2 rounded-[28px] border border-neutral-700 bg-neutral-900/70 p-2.5 pl-5 shadow-2xl transition-colors focus-within:border-neutral-500">
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
              className="max-h-40 min-h-[28px] flex-1 resize-none bg-transparent py-1.5 text-[15px] text-white placeholder-neutral-500 outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-90"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </motion.form>

        {/* Quick-action pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {PILLS.map((pill) => {
            const Icon = pill.icon
            return (
              <button
                key={pill.label}
                onClick={() => onPill(pill)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
              >
                <Icon className="h-4 w-4 text-neutral-400" />
                {pill.label}
              </button>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-center text-sm text-neutral-500"
        >
          Hanzo Chat runs on open models. Free to start —{' '}
          <a href={CHAT} target="_blank" rel="noreferrer noopener" className="text-neutral-300 underline-offset-4 hover:underline">
            open hanzo.chat
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
