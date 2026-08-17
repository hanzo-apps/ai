
import { Box } from '@hanzo/ui'/**
 * Learning, drawn as a cycle — because drawing it as a stage would be a lie.
 *
 * Every instinct on a landing page is to put "Learn" in a row between "Build"
 * and "Scale", which quietly says learning is a phase that completes. It does
 * not complete; it is the loop the other five steps run inside, and a company
 * that learns from an outcome is a different claim from a company that has a
 * learning feature. So the section is a ring, and the return edge is drawn.
 *
 * THE CLAIM IS DELIBERATELY THE SMALLER ONE. "A company that learns from every
 * outcome" is checkable — the traces, evaluations and experiments behind it
 * exist. "A company that rewrites and improves itself" is a different promise
 * that would need safety evidence this page cannot show, and the weaker sentence
 * we can stand behind beats the stronger one we cannot.
 */
const STEPS = [
  { name: 'Sense', body: 'Events, customer behaviour, company data, product usage.' },
  { name: 'Understand', body: 'Memory, context, retrieval, analysis.' },
  { name: 'Decide', body: 'Enso, routing, planning, policy.' },
  { name: 'Act', body: 'Agents, tools, Tabs, sandboxes, workflows.' },
  { name: 'Measure', body: 'Traces, cost, evaluations, experiments, business outcomes.' },
  { name: 'Adapt', body: 'Memory, prompts, workflows, routing, policy, allocation.' },
]

export default function LearnLoop() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-2xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Hanzo Insights
        </p>
        <h2 className="hz-display text-4xl sm:text-5xl">A company that learns from every outcome.</h2>
        <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
          See what customers did. See what agents did. See which decisions produced results —
          then improve the memory, the workflow, the routing or the policy that produced them.
        </p>
      </Box>

      <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <li
            key={step.name}
            className="rounded-2xl border border-neutral-800 bg-white/[0.02] px-6 py-5"
          >
            <Box className="flex items-baseline gap-3">
              <span className="text-base font-medium text-white">{step.name}</span>
              {/* The last step names where it returns to, so the ring closes in
                  words as well as in layout — the return edge is the whole idea
                  and a grid cannot draw it. */}
              {i === STEPS.length - 1 ? (
                <span className="text-sm text-neutral-400">→ back to Sense</span>
              ) : null}
            </Box>
            <Box className="mt-1 text-sm leading-relaxed text-neutral-400">{step.body}</Box>
          </li>
        ))}
      </ol>

      <Box className="mt-10 text-center">
        <a
          href="https://insights.hanzo.ai"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
        >
          Explore Insights
        </a>
      </Box>
    </section>
  )
}
