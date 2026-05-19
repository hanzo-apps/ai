'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
    title: 'Zen Models',
    blurb: 'Run prompts against 390+ open-weight models. Compare side-by-side.',
    href: '/zen',
    cta: 'Try a model',
  },
  {
    icon: Bot,
    title: 'Bot',
    blurb: 'Spin up a multi-agent simulation in the browser. No setup.',
    href: '/bot',
    cta: 'Launch a bot',
  },
  {
    icon: Plug,
    title: 'MCP',
    blurb: 'Connect tools to Claude/Cursor/Hanzo Dev with one click.',
    href: '/mcp',
    cta: 'Browse MCP servers',
  },
  {
    icon: Terminal,
    title: 'Hanzo Dev',
    blurb: 'AI engineer that ships PRs from a sentence.',
    href: '/dev',
    cta: 'Run Dev',
  },
  {
    icon: MessageSquare,
    title: 'Chat',
    blurb: 'Talk to 14 Zen models + 100+ third-party LLMs with MCP tools.',
    href: '/chat',
    cta: 'Open Chat',
  },
  {
    icon: Layers,
    title: 'Agents',
    blurb: 'Multi-agent SDK with tool use, planning, memory.',
    href: '/agents',
    cta: 'Read the SDK',
  },
]

const examples = [
  { lang: 'curl', label: 'Hello Zen', code: `curl https://api.hanzo.ai/v1/chat/completions \\
  -H "Authorization: Bearer $HANZO_API_KEY" \\
  -d '{"model":"zen-2","messages":[{"role":"user","content":"Hello"}]}'` },
  { lang: 'python', label: 'Agents SDK', code: `from hanzo import Agent
agent = Agent(model="zen-2", tools=["search", "browser"])
print(agent.run("Find the latest AI papers and summarize"))` },
  { lang: 'typescript', label: 'MCP client', code: `import { Client } from '@hanzo/mcp'
const c = new Client({ server: 'hanzo://search' })
const r = await c.call('search', { query: 'rust async runtime' })` },
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
              <ChromeText>Try Hanzo in your browser</ChromeText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Hands-on sandbox for every Hanzo product. No install, no signup
              for read-only flows. Run models, prompt agents, wire up MCP.
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
            <p className="text-muted-foreground">Each card is a working sandbox.</p>
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
            <p className="text-muted-foreground">Three ways in. All open source.</p>
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
          <h2 className="text-2xl font-bold mb-4">Open source DX, end to end</h2>
          <p className="text-muted-foreground mb-8">
            Playground · Dev (CLI agent) · MCP · Hanzo CLI · Extensions ·
            SDKs in 4 languages. All on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/playground" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
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
