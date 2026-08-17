import { Box } from '@hanzo/ui'

/**
 * What an agent DOES — the layer between Enso and the company. The page could
 * describe a model and a cloud but not the thing in between them that does the
 * work, and this is that thing.
 *
 * "Agents with hands" is the whole distinction and it is worth being blunt
 * about: a model that returns text is not what is being sold here.
 *
 * THE LEDE IS AN ORDER, and that is its job. Enso decides, agents coordinate,
 * Tabs is where they act — so the three are ranked in one sentence instead of
 * competing as equals, which is what the paragraph under them used to do by
 * naming tools, sandboxes, workflows and Tabs in a row. Anything added here has
 * to fit somewhere in that order or it does not belong on this page.
 *
 * This file used to render a SECOND section after this one — "Where people and
 * AI work together", the Hanzo Team block. That is now `./Team`, built from the
 * page kit like the rest of the page. One section, one component: two claims in
 * one file meant the company layer could only be restyled by editing the agent
 * layer, and the heading nothing could find was the one in here.
 */
export default function AgentRuntime() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Box className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
            Agent runtime
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">Agents with hands.</h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Enso decides. Agents coordinate. Tabs gives them somewhere secure to act.
          </p>
          <p className="mx-auto mt-3 text-lg leading-relaxed text-neutral-400">
            They use tools, operate software, write code, run workflows and hand off to each
            other — in isolated environments.
          </p>
        </Box>
        <Box className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/tabs"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Explore Tabs
          </a>
          <a
            href="/agents"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Explore agents
          </a>
        </Box>
      </section>
    </>
  )
}
