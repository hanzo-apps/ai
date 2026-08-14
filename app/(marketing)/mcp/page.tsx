'use client'

import {
  Plug,
  Cloud,
  Shield,
  Terminal,
  Code2,
  Globe,
  BrainCircuit,
  Layers,
  Sparkles,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'
import { OSSRevenueBanner } from '@/components/oss/OSSRevenueBanner'

const DOCS = 'https://docs.hanzo.ai/docs/mcp'
const GITHUB = 'https://github.com/hanzoai/mcp'
const CONSOLE = 'https://console.hanzo.ai'

const CONFIG = `// .mcp.json — add Hanzo MCP to any MCP client
{
  "mcpServers": {
    "hanzo": {
      "command": "npx",
      "args": ["-y", "--package=@hanzo/mcp", "hanzo-mcp", "serve"]
    }
  }
}

// Or install it and run the server yourself:
//   npm install -g @hanzo/mcp && hanzo-mcp serve
//   hanzo-mcp list-tools
//   hanzo-mcp install-desktop`

export default function MCPPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo MCP · Tool server"
        badgeIcon={Plug}
        title="An MCP server with thirteen tools"
        lede="It gives a model a shell, a filesystem, a code index, git, HTTP, and your project's own context, over stdio or streamable HTTP. Point any MCP client at it and the tools show up."
        ctas={[
          { label: 'Read the docs', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source, MIT. Same tool names and schemas in TypeScript, Python, and Rust — one surface, three runtimes.' }}
        availableThrough={['Claude Desktop', 'Claude Code', 'Cursor', 'Any MCP client']}
        what={{
          eyebrow: 'What is Hanzo MCP',
          title: 'A catalog of 260 collapsed into 13',
          sub: 'A tool list is a prompt. Two hundred entries crowd out the work, and a model picks badly among near-duplicates. So each tool here is one noun with a set of verbs: you call fs with read, or exec with run, and the schema tells the model what the verb needs.',
          pillars: [
            {
              icon: Plug,
              title: 'Seven nouns, always on',
              body: 'fs for bytes and paths. exec for processes. code for symbols. git for history. fetch for HTTP. workspace for the project you are in. ui for components. Six more — think, memory, plan, tasks, mode, and the Hanzo platform itself — are there when you want them.',
            },
            {
              icon: Shield,
              title: 'Nothing runs that you did not enable',
              body: 'Community tools shell out to binaries someone else wrote, so they are off until you name them: hanzo-mcp serve --enable-community-cryptuon. Drop tools you do not want with --disable-tools. The default surface is the thirteen and nothing else.',
            },
            {
              icon: Cloud,
              title: 'The same surface everywhere',
              body: 'npm, PyPI, and a Rust crate carry the identical tool names and action schemas, so an agent written against one runtime moves to another without relearning its tools.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'One config block', sub: 'Use the --package= form. Without it npx resolves "serve" as a separate package and runs an unrelated static-file server instead — on every platform.' },
          lang: 'json',
          source: CONFIG,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'The tools',
          title: 'What each one does',
          sub: 'Every tool takes an action and the arguments that action needs. These are the verbs.',
          items: [
            { icon: Layers, title: 'fs', body: 'read, write, stat, list, mkdir, rm, mv, apply_patch, search_text. Bytes and paths, including the patch verb an agent needs to edit a file it did not write whole.' },
            { icon: Terminal, title: 'exec', body: 'run, background, ps, kill, logs. A command that outlives the call goes to background and you read it back through logs, so a dev server does not hold the turn open.' },
            { icon: Code2, title: 'code', body: 'parse, search, transform, summarize. Search by symbol rather than by string, so renaming a function finds the callers and not the comments that mention it.' },
            { icon: Globe, title: 'git and fetch', body: 'git does status, diff, log, commit, branch, stash. fetch does get, post, put, delete, download — the ordinary HTTP verbs, plus the one that writes the body to a file.' },
            { icon: BrainCircuit, title: 'workspace, think, memory', body: 'workspace answers info, config, env, dependencies about the project you are actually in. think records structured reasoning. memory persists past the session.' },
            { icon: Sparkles, title: 'ui, plan, tasks, mode, hanzo', body: 'ui lists, searches, fetches and installs components. plan and tasks hold the work. mode switches presets. hanzo reaches IAM, KMS, PaaS, and Commerce.' },
          ],
        }}
        finalCta={{
          icon: Plug,
          title: 'Add it to your client',
          sub: 'One block in .mcp.json, or install the binary and run hanzo-mcp serve yourself.',
          buttons: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'GitHub', href: GITHUB },
            { label: 'Hanzo Cloud', href: CONSOLE },
          ],
        }}
      />
      <OSSRevenueBanner />
      <ProductFooter slug="mcp" name="MCP" />
    </>
  )
}
