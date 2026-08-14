'use client'

import {
  Code2,
  Terminal,
  Workflow,
  Cloud,
  Rocket,
  GitPullRequest,
  Globe,
  Plug,
  ShieldCheck,
  Eye,
  Gauge,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const SH = 'https://hanzo.sh'
const DOCS = 'https://docs.hanzo.ai/docs/dev'
const GITHUB = 'https://github.com/hanzoai/dev'
const CONSOLE = 'https://console.hanzo.ai'

const INSTALL = `# Install Hanzo Dev
curl -fsSL hanzo.sh | bash

# ...or from your package manager
npm install -g @hanzo/dev      # or: npx -y @hanzo/dev
cargo install hanzo-dev

# Open an AI coding session in the current repo
hanzo dev

# ...or hand it a task and let Auto Drive run it
hanzo dev "add rate limiting to the /v1/chat endpoint"`

export default function DevLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Dev · Coding agent"
        badgeIcon={Code2}
        title="A coding agent in your terminal"
        lede="It works on the files you already have, in the repo you're already in. Tell it what you want. It opens the files, makes the change, runs the tests, and reads what came back."
        ctas={[
          { label: 'Get Hanzo Dev', href: SH, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source, Apache-2.0. Works with the tools you already use — Claude Code, Codex, Gemini, and Qwen run through the same command.' }}
        availableThrough={['Terminal', 'VS Code', 'JetBrains', 'CI']}
        what={{
          eyebrow: 'What is Hanzo Dev',
          title: 'It writes the code and runs it',
          sub: 'Say what you want in plain words. Dev reads the repo, makes the change across files, runs commands to check its work, and shows you the diff.',
          pillars: [
            {
              icon: Terminal,
              title: 'Runs in your shell',
              body: 'Type hanzo dev in any repo. Give it a task and it works on its own — or hand it the task up front and let it run headless.',
            },
            {
              icon: Workflow,
              title: 'Splits the work',
              body: 'Big jobs go to several agents at once. Auto Drive breaks the goal into steps and keeps going until the work is done.',
            },
            {
              icon: Cloud,
              title: 'Our best model, or any model',
              body: 'Enso is our frontier model, and it leads several public benchmarks. One login also gets you every other model on the gateway, cloud agents for long jobs, and a way to deploy.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'Open a terminal' },
          lang: 'bash',
          source: INSTALL,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'What you get',
          items: [
            { icon: ShieldCheck, title: 'Commands run in a sandbox', body: 'Opening a repo means running its scripts, so it runs them in a sandbox every time. Drop it for one run with --no-sandbox. It never gets saved.' },
            { icon: GitPullRequest, title: 'It reviews its own work', body: 'A watcher checks every change in a separate worktree and hands you fixes you can apply. It never blocks the session.' },
            { icon: Eye, title: 'Nothing hidden', body: 'You see the model, the whole prompt, and the context window on every request. No silent model swaps. No quiet compression.' },
            { icon: Globe, title: 'It can use a browser', body: 'Native browser control over CDP, with screenshots inline — so it can check the change that only shows up on a page.' },
            { icon: Plug, title: 'Your tools', body: 'Add MCP tools for files, databases, APIs, or anything you write yourself. The repo’s own tools stay off until you ask for them.' },
            { icon: Gauge, title: 'Think harder when it matters', body: 'Set how hard it thinks per task — medium, high, or xhigh. Trade speed for depth only when the work needs it.' },
          ],
        }}
        finalCta={{
          icon: Code2,
          title: 'Open a terminal',
          sub: 'Install it, sign in, and type hanzo dev in any repo.',
          buttons: [
            { label: 'Install from hanzo.sh', href: SH, icon: Rocket },
            { label: 'Sign in to Hanzo Cloud', href: CONSOLE },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="dev" name="Dev" />
    </>
  )
}
