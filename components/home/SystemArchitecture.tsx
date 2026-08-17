
import { Box } from '@hanzo/ui'/**
 * The system, drawn as layers — the section the page's whole argument rests on.
 *
 * The claim everywhere else is "designed together". A reader cannot check that
 * against a list of product names, and a catalog is what the page reached for
 * before this section existed: ten cards, each true, none of them showing that
 * the layers touch. So this draws the stack, and the stack is the evidence.
 *
 * It reads UPWARD deliberately. Infrastructure is the floor, intelligence sits
 * on it, execution on that, and the company interface on top — the direction a
 * request actually travels, and the opposite of how an org chart is drawn. The
 * two side planes are not a fifth and sixth layer: learning and governance cut
 * ACROSS every layer, which is the difference between a property of the system
 * and another product in it, and drawing them as columns beside the stack is the
 * only honest way to say so.
 *
 * The arrows are real glyphs in the DOM rather than an image, so the diagram
 * translates, reflows, selects and reads aloud. A picture of a sentence is not a
 * sentence.
 */
const LAYERS = [
  {
    name: 'Company',
    body: 'Hanzo Team — people and AI coworkers, goals, projects, knowledge, decisions and approvals.',
    href: 'https://hanzo.team',
  },
  {
    name: 'Intelligence',
    body: 'Enso and Zen — reasoning, company context, policy, routing across models.',
    href: '/enso',
  },
  {
    name: 'Execution',
    body: 'Agents, memory, tools, MCP, durable workflows, Tabs and isolated sandboxes.',
    href: 'https://tabs.hanzo.ai',
  },
  {
    name: 'Infrastructure',
    body: 'Hanzo Cloud — Kubernetes, Visor across clouds, compute, data, networking, deployment and APIs.',
    href: 'https://cloud.hanzo.ai',
  },
]

const PLANES = [
  {
    name: 'Learn & adapt',
    body: 'Insights, traces, evaluations, experiments and outcomes — a rail across every layer, not a layer of its own.',
    href: 'https://insights.hanzo.ai',
  },
  {
    name: 'Trust & govern',
    body: 'Identity for every human and every agent, permissions, secrets, boundaries, approvals, audit and post-quantum.',
    href: '/security',
  },
]

export default function SystemArchitecture() {
  return (
    <section id="system" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-2xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
          The system
        </p>
        <h2 className="hz-display text-4xl sm:text-5xl">One OS. Every layer of the company.</h2>
        <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
          Most companies assemble AI, communication, project management, analytics,
          infrastructure, identity, security and billing from separate vendors, then pay to
          make them behave as one thing. Hanzo was designed as one system — four layers, and
          two rails that cut across all of them.
        </p>
      </Box>

      {/* Declared top-down (Company first) and reversed for layout, so the DOM
          reads bottom-up — infrastructure first, the way the system is built —
          while the eye reads top-down, the way a reader arrives at it. */}
      <Box className="mt-14 flex flex-col-reverse gap-3">
        {[...LAYERS].reverse().map((layer, i) => (
          <div key={layer.name}>
            <a
              href={layer.href}
              className="block rounded-2xl border border-neutral-800 bg-white/[0.02] px-6 py-5 transition-colors hover:border-neutral-600"
            >
              <Box className="text-base font-medium text-white">{layer.name}</Box>
              <Box className="mt-1 text-sm leading-relaxed text-neutral-400">{layer.body}</Box>
            </a>
            {/* An arrow between layers, never after the last one. */}
            {i < LAYERS.length - 1 ? (
              <Box aria-hidden className="flex justify-center py-1 text-neutral-600">
                ↑
              </Box>
            ) : null}
          </div>
        ))}
      </Box>

      <Box className="mt-10 grid gap-3 sm:grid-cols-2">
        {PLANES.map((plane) => (
          <a
            key={plane.name}
            href={plane.href}
            className="rounded-2xl border border-dashed border-neutral-800 px-6 py-5 transition-colors hover:border-neutral-600"
          >
            <Box className="text-base font-medium text-white">{plane.name}</Box>
            <Box className="mt-1 text-sm leading-relaxed text-neutral-400">{plane.body}</Box>
          </a>
        ))}
      </Box>

      {/* What "one system" actually buys, in the terms an engineer can verify.
          Not a benefit list — each line names a thing that exists once. */}
      <Box className="mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed text-neutral-300">
        <p>One company context.</p>
        <p>One intelligence layer.</p>
        <p>One agent runtime.</p>
        <p>One policy plane.</p>
        <p>One operational record.</p>
      </Box>
    </section>
  )
}
