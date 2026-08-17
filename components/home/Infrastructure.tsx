/**
 * The floor — and the section the page did not have.
 *
 * "AI-native cloud" was being asserted a layer above this and never shown. What
 * makes it true is unglamorous and specific: Kubernetes underneath, Visor
 * scheduling across clouds rather than one, and isolation that goes all the way
 * to a hardware boundary when the work warrants it. None of that was on the page,
 * so a reader had to take the phrase on faith.
 *
 * THE MODEL COUNT IS DERIVED, never typed. `MODELS_PHRASE` reads the snapshot
 * that every price on this site reads, and the count now comes from the SERVING
 * catalog rather than the priced one — those are different questions and reading
 * the wrong one under-reported us by a hundred models. It floors to the hundred,
 * so it is never ahead of what a caller can actually reach.
 *
 * WHAT IS NOT HERE, deliberately: a count of integrations. The endpoints that
 * would answer it (`/v1/integrations`, `/v1/tools`, `/v1/mcp/servers`) all
 * require a principal, so a build cannot count them the way it counts models,
 * and a number nothing can check is exactly the kind this site already deleted
 * eighteen of. It says what the surface IS until something can count it.
 */
import { MODELS_PHRASE } from '@/lib/data/model-count'
import { Box } from '@hanzo/ui'

const RUNTIMES = [
  {
    name: 'Kubernetes',
    body: 'The substrate everything runs on — your cluster or ours, same operator, same resources.',
  },
  {
    name: 'Visor',
    body: 'Schedules across clouds rather than inside one. Tier-1 and tier-2 providers are first-class, not adapters.',
  },
  {
    name: 'Firecracker',
    body: 'microVM isolation with a hardware boundary, for work that must not share a kernel.',
  },
  {
    name: 'gVisor',
    body: 'A user-space kernel where the boundary matters more than the last microsecond of start-up.',
  },
  {
    name: 'Functions',
    body: 'Short-lived workloads that scale to zero and bill by what they used.',
  },
  {
    name: 'Sandboxes',
    body: 'Where an agent is given hands — a filesystem, a terminal, a browser and a network it cannot leave.',
  },
]

export default function Infrastructure() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <Box className="mx-auto max-w-2xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
          Hanzo Cloud
        </p>
        <h2 className="hz-display text-4xl sm:text-5xl">AI-native all the way down.</h2>
        <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
          {MODELS_PHRASE} behind one endpoint. Compute, GPUs, functions, SQL, vector, KV,
          document, object and analytical data, messaging, durable tasks, networking, identity,
          secrets, deployment, metering and billing — built together, reached the same way.
        </p>
      </Box>

      <Box className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {RUNTIMES.map((r) => (
          <Box
            key={r.name}
            className="rounded-2xl border border-neutral-800 bg-white/[0.02] px-6 py-5"
          >
            <Box className="text-base font-medium text-white">{r.name}</Box>
            <Box className="mt-1 text-sm leading-relaxed text-neutral-400">{r.body}</Box>
          </Box>
        ))}
      </Box>

      {/* The sentence that keeps both nouns legible: OS is the category, Cloud is
          a deployment product, and neither replaces the other. */}
      <p className="mx-auto mt-14 max-w-2xl text-center text-xl leading-snug text-neutral-200">
        Run Hanzo OS on Hanzo Cloud or your own infrastructure.
      </p>

      <Box className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="https://cloud.hanzo.ai"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Explore Hanzo Cloud
        </a>
        <a
          href="/visor"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
        >
          How Visor schedules it
        </a>
      </Box>
    </section>
  )
}
