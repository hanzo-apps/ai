'use client'

import {
  Terminal,
  Cloud,
  Bot,
  Workflow,
  Code2,
  Bug,
  Rocket,
  GitBranch,
  KeyRound,
  ScrollText,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const DOCS = 'https://docs.hanzo.ai/docs/cli'
const GITHUB = 'https://github.com/hanzoai/cli'
const CONSOLE = 'https://console.hanzo.ai'

const INSTALL = `# Install the Hanzo CLI
curl -fsSL hanzo.sh | bash

# Log in to Hanzo Cloud
hanzo login

# Run a coding agent against your repo
hanzo dev "add rate limiting to the /v1/chat endpoint"

# Build and deploy the current project
hanzo deploy`

export default function CliPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo CLI · Developers"
        badgeIcon={Terminal}
        title="A senior engineer in your shell"
        lede="One CLI for the whole stack. Plan, edit, and ship code with a model in your terminal — then build, deploy, and tail logs on Hanzo Cloud without leaving the shell."
        ctas={[
          { label: 'Install the CLI', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0). One binary — macOS, Linux, and CI.' }}
        what={{
          eyebrow: 'What is Hanzo CLI',
          title: 'Your terminal, now agentic',
          sub: 'The same command line you already live in, with a model that understands your repo and a direct line to Hanzo Cloud.',
          pillars: [
            {
              icon: Bot,
              title: 'AI pair programmer',
              body: 'Natural language in, working diffs out — every step explained. The CLI grounds itself in your repo before it writes a line.',
            },
            {
              icon: Cloud,
              title: 'Deploy from the shell',
              body: 'One command from your branch to production on Hanzo Cloud — build, deploy, tail logs, and roll back.',
            },
            {
              icon: Workflow,
              title: 'Scriptable by design',
              body: 'Pipes, exit codes, and JSON output. Drop it into Makefiles, CI jobs, and git hooks like any other Unix tool.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'From install to deploy in four lines' },
          lang: 'bash',
          source: INSTALL,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Everything the stack needs, one command away',
          items: [
            { icon: Code2, title: 'Repo-aware', body: 'Reads your code, conventions, and tests before it writes — no copy-paste prompts.' },
            { icon: Bug, title: 'Debug, don’t guess', body: 'Stack trace in, root cause out. Reproduce, narrow, patch, and verify without leaving your shell.' },
            { icon: Bot, title: 'Any coding agent', body: 'Run dev or any coding agent from the terminal, grounded in the current repository.' },
            { icon: Rocket, title: 'Build & deploy', body: 'Build images and deploy to Hanzo Cloud; tail logs and roll back with a single command.' },
            { icon: KeyRound, title: 'Cloud login', body: 'Authenticate once; the CLI carries your Hanzo identity to every command and surface.' },
            { icon: ScrollText, title: 'Automation-ready', body: 'Structured output and stable exit codes make it a first-class citizen in CI.' },
          ],
        }}
        finalCta={{
          icon: GitBranch,
          title: 'Install once. Use it everywhere.',
          sub: 'Local repos, CI, remote machines, hot fixes at 2am — the CLI comes with you.',
          buttons: [
            { label: 'Install the CLI', href: DOCS, icon: Rocket },
            { label: 'GitHub', href: GITHUB },
            { label: 'Hanzo Cloud', href: CONSOLE },
          ],
        }}
      />
      <ProductFooter slug="cli" name="CLI" />
    </>
  )
}
