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

const DOCS = 'https://docs.hanzo.ai/docs/services/platform/getting-started/cli'
const GITHUB = 'https://github.com/hanzoai/cli'
const CONSOLE = 'https://console.hanzo.ai'

const INSTALL = `# Install the CLI — the same line every Hanzo surface prints
curl -fsSL https://hanzo.sh | sh

# Sign in. Interactive picker, or name a provider.
hanzo auth login

# Bare hanzo IS a coding session in this repo
hanzo

# ...or hand it the task and let it run headless
hanzo "add rate limiting to the /v1/chat endpoint"

# What did that cost, and what is left
hanzo usage summary
hanzo billing balance`

export default function CliPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo CLI · Developers"
        badgeIcon={Terminal}
        title="An AI engineer in your terminal"
        lede="Type hanzo in a repo and you get a coding session. Type hanzo and a noun and you get the rest of the cloud — identity, usage, billing, clusters, machines, networks — typed straight from the API's own document."
        ctas={[
          { label: 'Install from hanzo.sh', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (MIT). One static Rust binary — macOS and Linux on amd64 and arm64, Windows on amd64. No runtime, no daemon.' }}
        mockup={{
          slug: 'cli',
          alt: 'A shell session: commands run against Hanzo Cloud and their output streams back.',
        }}
        what={{
          eyebrow: 'What is Hanzo CLI',
          title: 'A resource tree, not a pile of flags',
          sub: 'hanzo <resource> <command>. The resources beyond the hand-written ones are generated from the OpenAPI documents, so the CLI can only ask for things the API has.',
          pillars: [
            {
              icon: Bot,
              title: 'A coding session, metered',
              body: 'Bare hanzo runs our dev agent with the Hanzo toolset attached and the model calls billed to your organization. Point it at claude or codex instead and it drives an agent you already have.',
            },
            {
              icon: Cloud,
              title: 'Run the cloud on your machine',
              body: 'hanzo up cloud starts the whole API locally, or name one service — iam, kms, gateway, storage, pubsub. hanzo engine serve puts a model on a local endpoint.',
            },
            {
              icon: Workflow,
              title: 'No raw-path escape hatch',
              body: 'There is no hanzo api verb and no URL to hand-write. Every cloud capability arrives as a typed subcommand, which is what keeps the CLI and the API from disagreeing.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'Install, sign in, start working' },
          lang: 'bash',
          source: INSTALL,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'What the binary carries',
          items: [
            { icon: KeyRound, title: 'Several identities at once', body: 'Hold as many principals as you need and switch between them. A second login never clobbers the first, and hanzo auth show says which one is answering right now.' },
            { icon: Code2, title: 'Secrets arrive on stdin', body: 'Pass --token - and the credential is read from the pipe, never from argv — so nothing lands in shell history, ps, or a CI log. It is stored in the OS keychain, or an owner-only file where there is none.' },
            { icon: Rocket, title: 'A public URL for a local port', body: 'hanzo share 3000 publishes a service over the zero-trust fabric while the port stays bound to localhost. Pass --name to keep the same subdomain next time.' },
            { icon: Bug, title: 'Find the secret before the commit', body: 'hanzo scan walks a path for exposed credentials and exits non-zero when it finds one, which is what makes it usable as a hook rather than a habit.' },
            { icon: ScrollText, title: 'The whole cloud, unhealthy first', body: 'hanzo status leads with what is broken, then clusters, applications and the machines on your fleet. The thing you needed to know is the first line, not the last.' },
            { icon: Bot, title: 'Put this shell on the fabric', body: 'hanzo link publishes the terminal you are in so the console can watch it — or drive it. --read-only when you would rather be watched than typed at.' },
          ],
        }}
        finalCta={{
          icon: GitBranch,
          title: 'Install once. It comes with you.',
          sub: 'A local repo, a CI job, a machine you sshed into, a fix at 2am. Same binary, same identity, same commands.',
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
