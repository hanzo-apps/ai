'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from '@/components/motion'
import {
  Play,
  Sparkles,
  Code,
  Zap,
  Bot,
  Brain,
  Plug,
  Terminal,
  ArrowRight,
  GitBranch,
  Layers,
  MessageSquare,
} from 'lucide-react'
import ChromeText from '@/components/ui/chrome-text'

import { ProductFooter } from "@/components/products/ProductFooter"
const tryOut = [
  {
    icon: Brain,
    title: 'Zen models',
    blurb: 'The family we train ourselves — 0.6B you can run on a laptop up to frontier. Most are open weight; read the specs and the price per million tokens.',
    href: '/zen',
    cta: 'See the models',
  },
  {
    icon: Bot,
    title: 'Bot',
    blurb: 'Bots as backend services: routing, async runs that last hours, durable state, and an identity per bot instead of a shared key.',
    href: '/bot',
    cta: 'Read about Bot',
  },
  {
    icon: Plug,
    title: 'MCP',
    blurb: 'Thirteen tools — shell, files, code, git, HTTP — behind one server. One block in .mcp.json and your client has them.',
    href: '/mcp',
    cta: 'Set up MCP',
  },
  {
    icon: Terminal,
    title: 'Hanzo Dev',
    blurb: 'A coding agent in your terminal. It opens the files, makes the change, runs the tests, and shows you the diff.',
    href: '/dev',
    cta: 'Install Dev',
  },
  {
    icon: MessageSquare,
    title: 'Chat',
    blurb: 'One thread with every model, your MCP tools, your files and a code sandbox. Free to try at hanzo.chat.',
    href: '/chat',
    cta: 'Open Chat',
  },
  {
    icon: Layers,
    title: 'Agents',
    blurb: 'A Python SDK where an agent is a model, instructions and tools — and several of them can sit behind one router.',
    href: '/agents',
    cta: 'Read the SDK',
  },
]

const examples = [
  { lang: 'curl', label: 'One request', code: `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{"model":"zen5","messages":[{"role":"user","content":"Hello"}]}'` },
  { lang: 'python', label: 'An agent', code: `pip install hanzo-agent

from agents import Agent, Runner
agent = Agent(name="Assistant", instructions="You are a helpful assistant")
print(Runner.run_sync(agent, "Write a haiku about recursion").final_output)` },
  { lang: 'bash', label: 'Tools for your editor', code: `npm install -g @hanzo/mcp
hanzo-mcp list-tools
hanzo-mcp install-desktop`, },
]

const Playground = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-sm flex items-center gap-2">
                <Play className="w-4 h-4" /> Playground
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <ChromeText>Where to start</ChromeText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Six ways into Hanzo, and what each one is actually for. Some are
              a page you read, some are a command you run. None of them need a
              sales call first.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/zen" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Open Zen playground <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                <GitBranch className="h-4 w-4" /> Browse open source
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pick what to try</h2>
            <p className="text-muted-foreground">Reach for the one that matches the problem in front of you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tryOut.map((t, i) => {
              const Icon = t.icon
              return (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-white/30 transition-colors"
                >
                  <Icon className="h-7 w-7 mb-3 text-foreground/80" />
                  <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{t.blurb}</p>
                  <Link href={t.href} className="text-sm font-medium inline-flex items-center gap-1 group">
                    {t.cta} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Or copy-paste a starter</h2>
            <p className="text-muted-foreground">A key, a model name, and a message is the whole first request.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {examples.map((e, i) => (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/70 overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{e.lang}</span>
                  <span className="text-xs text-foreground/70">{e.label}</span>
                </div>
                <pre className="px-4 py-4 text-xs leading-relaxed overflow-x-auto"><code>{e.code}</code></pre>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Read the code first if you want</h2>
          <p className="text-muted-foreground mb-8">
            Dev, MCP, the agent SDK, the CLI, the editor extensions and the
            clients in four languages are all on GitHub. So are most of the
            model weights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-playground" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
            <ProductFooter slug="playground" name="Playground" />
</div>
  )
}

export default Playground
