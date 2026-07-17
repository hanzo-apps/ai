'use client'

import {
  Bot,
  Cloud,
  Code2,
  Workflow,
  Plug,
  BrainCircuit,
  LineChart,
  ShieldCheck,
  Boxes,
  Network,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const DOCS = 'https://docs.hanzo.ai/agents'
const GITHUB = 'https://github.com/hanzoai/agent'
const CONSOLE = 'https://console.hanzo.ai'

export default function AgentsPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Agents · Build"
        badgeIcon={Bot}
        title="Ship agents that do the work"
        lede="A multi-agent SDK, runtime, and tool harness with OpenAI compatibility. Build, orchestrate, and run autonomous agents that call tools, use memory, and coordinate — in Python or TypeScript."
        ctas={[
          { label: 'Read the docs', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (Apache-2.0). Run it locally, self-host, or deploy on Hanzo Cloud.' }}
        availableThrough={['Python SDK', 'TypeScript SDK', 'OpenAI-compatible API', 'MCP']}
        what={{
          eyebrow: 'What is Hanzo Agents',
          title: 'One SDK for the whole agent loop',
          sub: 'The pieces you would otherwise stitch together — model calls, tools, memory, and coordination — as one coherent, debuggable system.',
          pillars: [
            {
              icon: Code2,
              title: 'SDK',
              body: 'Define agents, tools, and handoffs in a few lines — a typed API in Python and TypeScript that reads like the mental model.',
            },
            {
              icon: Workflow,
              title: 'Runtime',
              body: 'A durable runtime that executes tool calls, retries, and multi-step plans — with tracing you can actually debug.',
            },
            {
              icon: Plug,
              title: 'Tool harness',
              body: 'Give agents real capabilities — MCP tools, code execution, browser, and your own functions — behind one safe, uniform interface.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'From prototype to production agents',
          items: [
            { icon: Network, title: 'OpenAI-compatible', body: 'Point the SDK at any OpenAI-compatible endpoint — Enso, Zen, or frontier models — with no rewrites.' },
            { icon: Workflow, title: 'Multi-agent orchestration', body: 'Coordinate specialists with handoffs, roles, and shared memory instead of one overloaded prompt.' },
            { icon: Plug, title: 'MCP-native tools', body: 'Every Model Context Protocol tool is available to your agents out of the box.' },
            { icon: BrainCircuit, title: 'Memory', body: 'Short- and long-term memory backed by Hanzo Vector for retrieval-grounded agents.' },
            { icon: LineChart, title: 'Tracing & evals', body: 'See every step, token, and tool call; evaluate runs to catch regressions before users do.' },
            { icon: ShieldCheck, title: 'Guardrails', body: 'Scope tools, sandbox code, and gate actions so autonomy stays inside the lines.' },
          ],
        }}
        finalCta={{
          icon: Boxes,
          title: 'Build your first agent today',
          sub: 'Start from the docs, or deploy an agent on Hanzo Cloud in minutes.',
          buttons: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'Deploy on Hanzo Cloud', href: CONSOLE },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="agents" name="Agents" />
    </>
  )
}
