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
        title="Build software with Hanzo"
        lede="The open-source coding agent that runs where you already work — your terminal and your editor. Describe a change in plain language and Dev grounds itself in your repository, plans the work, writes and edits across files, then reviews its own diffs before you merge. It defaults to the Hanzo gateway, so any model, cloud agents, and deploys are one login away."
        ctas={[
          { label: 'Get Hanzo Dev', href: SH, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0). Install in one command from hanzo.sh — runs on macOS, Linux, and in CI.' }}
        availableThrough={['Terminal', 'VS Code', 'JetBrains', 'CI']}
        what={{
          eyebrow: 'What is Hanzo Dev',
          title: 'An AI engineer in your editor and terminal',
          sub: 'Describe the outcome; Dev does the engineering. It reads your code and conventions, plans the change, edits across files, runs commands to verify, and reviews the result — all in the tools you already use.',
          pillars: [
            {
              icon: Terminal,
              title: 'Terminal-native',
              body: 'A fast, local coding agent that lives in your shell. Run hanzo dev to open a session in the current repo, then hand it a task and it plans, edits, and verifies on its own.',
            },
            {
              icon: Workflow,
              title: 'Auto Drive',
              body: 'Multi-agent orchestration that breaks a goal into steps and coordinates specialists with /plan, /code, and /solve — self-healing until the task is actually done.',
            },
            {
              icon: Cloud,
              title: 'Backed by Hanzo Cloud',
              body: 'One login connects Dev to any model through the Hanzo gateway, cloud agents for long-running work, and a direct line to deploy — the same identity across every Hanzo surface.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'Install once, then talk to your repo' },
          lang: 'bash',
          source: INSTALL,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Built for real developer work',
          items: [
            { icon: GitPullRequest, title: 'Auto Review', body: 'A background watcher reviews every change in a separate worktree, flags issues, and hands you ready-to-apply fixes — without blocking the session.' },
            { icon: Eye, title: 'Nothing hidden', body: 'No silent auto-model and no quiet context compression. You see the model, the full prompt, and the context window on every request.' },
            { icon: Globe, title: 'Browser built in', body: 'Native browser control over CDP — headless navigation and inline screenshots — so the agent can exercise and verify what it builds.' },
            { icon: Plug, title: 'MCP tools', body: 'Extend Dev with Model Context Protocol tools: filesystem, databases, APIs, or your own — every tool the Hanzo MCP exposes.' },
            { icon: ShieldCheck, title: 'Safety modes', body: 'Read-only, approval, and workspace-sandboxed modes keep the agent inside the lines on the code you care about.' },
            { icon: Gauge, title: 'Reasoning control', body: 'Dial reasoning effort per task — medium, high, or xhigh — trading latency for depth exactly when it matters.' },
          ],
        }}
        finalCta={{
          icon: Code2,
          title: 'Start building in one command',
          sub: 'Install Dev from hanzo.sh and open a coding session in your repo — or sign in to Hanzo Cloud to run agents and deploy.',
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
