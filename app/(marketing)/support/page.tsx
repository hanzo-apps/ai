import type { Metadata } from 'next'
import { LifeBuoy, BookOpen, Activity, Mail, MessagesSquare, Github, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support — Hanzo',
  description: 'Get help with Hanzo — the Help Center, documentation, live system status, and a way to reach a human.',
}

const CHANNELS = [
  {
    icon: LifeBuoy,
    title: 'Help Center',
    body: 'Search answers, browse guides, and open a support ticket. The fastest path to a resolution.',
    href: 'https://help.hanzo.ai',
    cta: 'Open Help Center',
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    body: 'Guides, API references, and quickstarts for every product across the Hanzo Cloud.',
    href: 'https://docs.hanzo.ai',
    cta: 'Read the docs',
  },
  {
    icon: Activity,
    title: 'System Status',
    body: 'Live uptime and incident history for every Hanzo service. Check here first if something feels off.',
    href: 'https://status.hanzo.ai',
    cta: 'View status',
  },
  {
    icon: MessagesSquare,
    title: 'Community',
    body: 'Ask questions and share what you build with other developers on the Hanzo Discord.',
    href: 'https://discord.gg/hanzoai',
    cta: 'Join the community',
  },
  {
    icon: Github,
    title: 'GitHub',
    body: 'Report a bug, request a feature, or contribute — our SDKs and tooling are open source.',
    href: 'https://github.com/hanzoai',
    cta: 'Open an issue',
  },
  {
    icon: Mail,
    title: 'Email us',
    body: 'Prefer email? Reach the team directly and we’ll get back to you.',
    href: 'mailto:support@hanzo.ai',
    cta: 'support@hanzo.ai',
  },
]

export default function SupportPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center px-4 pb-8 pt-28 text-center sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 68%)', filter: 'blur(100px)' }}
        />
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-white/5 px-4 py-1.5 text-sm text-neutral-300">
          <LifeBuoy className="h-4 w-4" /> Support
        </span>
        <h1 className="text-balance text-4xl font-bold leading-[1.05] md:text-6xl">
          <span className="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">How can we help?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-300 md:text-xl">
          Answers, docs, live status, and a direct line to the team — everything you need to get unblocked with Hanzo.
        </p>
      </section>

      {/* Channels */}
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c) => {
            const Icon = c.icon
            const external = c.href.startsWith('http')
            return (
              <a
                key={c.title}
                href={c.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:border-neutral-600"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-white/5 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mb-1.5 text-lg font-semibold text-white">{c.title}</h2>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">{c.body}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-opacity group-hover:opacity-80">
                  {c.cta} <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            )
          })}
        </div>

        {/* Enterprise footer note */}
        <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center">
          <p className="text-sm text-neutral-400">
            On an enterprise plan or need a dedicated channel?{' '}
            <a href="mailto:support@hanzo.ai" className="font-medium text-white underline-offset-4 hover:underline">
              Email support@hanzo.ai
            </a>{' '}
            and we’ll route you to your team.
          </p>
        </div>
      </section>
    </main>
  )
}
