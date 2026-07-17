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

const DOCS = 'https://docs.hanzo.ai/mcp'
const GITHUB = 'https://github.com/hanzoai/mcp'
const CONSOLE = 'https://console.hanzo.ai'

const CONFIG = `// Add Hanzo MCP to any MCP client (Claude, Cursor, VS Code…)
{
  "mcpServers": {
    "hanzo": {
      "command": "uvx",
      "args": ["hanzo-mcp"]
    }
  }
}`

export default function MCPPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo MCP · 260+ tools"
        badgeIcon={Plug}
        title="The Model Context Protocol, hosted"
        lede="One MCP server that gives any agent 260+ real tools — shell, files, code intelligence, browser, memory, and integrations — with managed hosting, secure sandboxes, and edge deployment on Hanzo Cloud."
        ctas={[
          { label: 'Read the docs', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0). Run the server locally, or host it managed on Hanzo Cloud.' }}
        availableThrough={['Claude', 'Cursor', 'VS Code', 'Any MCP client']}
        what={{
          eyebrow: 'What is Hanzo MCP',
          title: 'Tools your agents can actually use',
          sub: 'MCP is the open standard for connecting models to the outside world. Hanzo MCP implements it with a large, batteries-included tool set behind one server.',
          pillars: [
            {
              icon: Plug,
              title: 'A universal tool layer',
              body: 'The open protocol for connecting models to tools, implemented with 260+ tools behind a single server your agents can call.',
            },
            {
              icon: Shield,
              title: 'Secure sandboxing',
              body: 'Every shell command, code run, and file operation executes in an isolated sandbox with resource limits.',
            },
            {
              icon: Cloud,
              title: 'Managed hosting',
              body: 'Run it yourself, or let Hanzo host and auto-scale your MCP server at the edge — persistent state included.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'One config block, every tool' },
          lang: 'json',
          source: CONFIG,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'The tool set',
          title: 'Far more than filesystem and git',
          items: [
            { icon: Terminal, title: 'Shell & code execution', body: 'Run commands and packages (zsh, npx, uvx) in a sandbox, with logs and process control.' },
            { icon: Code2, title: 'Code intelligence', body: 'LSP and AST-aware search, refactoring, and diagnostics across Go, Python, TypeScript, Rust, and more.' },
            { icon: Globe, title: 'Browser & computer', body: 'Playwright browser automation and native OS control for real end-to-end tasks.' },
            { icon: BrainCircuit, title: 'Memory & knowledge', body: 'Persistent memory and knowledge bases that survive across sessions.' },
            { icon: Layers, title: 'Integrations', body: 'Git, GitHub, PostgreSQL, Redis, Slack, Notion, Google Drive, AWS, Kubernetes — federated behind one interface.' },
            { icon: Sparkles, title: 'Reasoning tools', body: 'Structured think, critic, and review tools for planning and self-checking.' },
          ],
        }}
        finalCta={{
          icon: Plug,
          title: 'Give your agents real tools',
          sub: 'Add Hanzo MCP to your client in one config block, or host it on Hanzo Cloud.',
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
