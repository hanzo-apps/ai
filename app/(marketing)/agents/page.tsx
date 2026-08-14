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

const DOCS = 'https://docs.hanzo.ai/docs/agents'
const GITHUB = 'https://github.com/hanzoai'
const CONSOLE = 'https://console.hanzo.ai'

const AGENT_CODE = `pip install hanzo-agent

from agents import Agent
from agents.network import create_network, SemanticRouter

researcher = Agent(
    name="Researcher",
    instructions="You find and analyze information.",
    tools=[search_tool, analyze_tool],
)

writer = Agent(
    name="Writer",
    instructions="You create content based on research.",
    tools=[format_tool],
)

network = create_network(agents=[researcher, writer], router=SemanticRouter())

result = await network.run("Research and write about quantum computing")`

export default function AgentsPage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Agents · Python SDK"
        badgeIcon={Bot}
        title="A Python SDK for agents that work together"
        lede="An agent is a model, a set of instructions, and the tools it may call. A network is several of them behind a router that decides which one gets the turn. Both are a few lines."
        ctas={[
          { label: 'Read the docs', href: DOCS, icon: Rocket },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source, MIT. pip install hanzo-agent. Works against any endpoint that speaks the Chat Completions format, so it runs on Hanzo or on your own serving stack.' }}
        availableThrough={['Python', 'MCP tools', 'Hanzo Cloud']}
        what={{
          eyebrow: 'What is Hanzo Agents',
          title: 'One agent, or several with a router between them',
          sub: 'The hard part of multi-agent work is not the prompting. It is deciding who answers, keeping what they learn where the next one can read it, and being able to see afterwards what actually ran.',
          pillars: [
            {
              icon: Code2,
              title: 'Agents',
              body: 'Agent(name, instructions, tools=[...]) and Runner.run_sync(agent, "…"). The result carries final_output plus every step it took to get there.',
            },
            {
              icon: Workflow,
              title: 'Networks',
              body: 'create_network(agents=[researcher, writer], router=SemanticRouter()) puts specialists behind one call. Route on meaning, on rules you write, or by load — and swap the router without touching the agents.',
            },
            {
              icon: Plug,
              title: 'Tools',
              body: 'A tool is a Python function with a signature. Every Hanzo MCP tool is one too, so an agent gets a shell, a filesystem, a code index and HTTP without you writing wrappers for them.',
            },
          ],
        }}
        code={{
          head: { eyebrow: 'Get started', title: 'Two agents and a router' },
          lang: 'python',
          source: AGENT_CODE,
          ctas: [
            { label: 'Read the docs', href: DOCS, icon: Rocket },
            { label: 'View on GitHub', href: GITHUB },
          ],
        }}
        features={{
          eyebrow: 'What comes with it',
          title: 'The parts you would otherwise write yourself',
          items: [
            { icon: Network, title: 'Routing you can choose', body: 'SemanticRouter reads the request and picks. Rule-based routing does what you say. Load-balanced routing spreads turns across equals. Same network object either way.' },
            { icon: Workflow, title: 'Workflows, not just chat', body: 'Steps that run in parallel, branch on a condition, or loop until something holds — for the work where the order matters and a prompt cannot express it.' },
            { icon: Plug, title: 'Shared state', body: 'Agents in a network read and write one state object, so the writer sees what the researcher found without you pasting it into the next prompt.' },
            { icon: BrainCircuit, title: 'Memory with retrieval', body: 'A store, a retriever, and vector search over both, so an agent recalls the relevant part of a long history instead of replaying all of it.' },
            { icon: LineChart, title: 'Tracing', body: 'Spans and traces around every model call, tool call and handoff, through a processor interface you can point at your own collector.' },
            { icon: ShieldCheck, title: 'Extras you opt into', body: 'pip install "hanzo-agent[tee]" adds attestation for confidential runs. [web3] adds wallets and on-chain identity. [cli] adds the command line. Nothing you skip is loaded.' },
          ],
        }}
        finalCta={{
          icon: Boxes,
          title: 'Write the first one',
          sub: 'pip install hanzo-agent, give it instructions and a tool, and run it.',
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
