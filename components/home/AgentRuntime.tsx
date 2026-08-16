/**
 * The two layers between Enso and the company: what an agent DOES, and where
 * people meet it. Neither had a section, which is why the page could describe a
 * model and a cloud but not the thing in between them that does the work.
 *
 * "Agents with hands" is the whole distinction and it is worth being blunt
 * about: a model that returns text is not what is being sold here. The sandbox
 * is the part that makes it safe to mean it, so it is named rather than implied.
 *
 * The company section deliberately does NOT invent AI executives. A page that
 * lists an "AI CFO" is making a claim about a job title; showing work moving
 * through shared projects is a claim about a system, and only the second one is
 * demonstrable.
 */
export default function AgentRuntime() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Agent runtime
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">Agents with hands.</h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Hanzo agents do more than answer. They use tools, operate software, browse, write
            code, work with files, run workflows and hand off to each other — inside isolated
            execution environments. Tabs gives each agent a secure place to work.
          </p>
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://tabs.hanzo.ai"
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
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Hanzo Team
          </p>
          <h2 className="hz-display text-4xl sm:text-5xl">Where people and AI work together.</h2>
          <p className="mx-auto mt-5 text-lg leading-relaxed text-neutral-400">
            Goals, projects, conversations, knowledge, tasks, decisions and approvals — shared
            by your people and your AI coworkers. Agents work inside the company, not outside
            it in another chat window.
          </p>
        </div>
        <div className="mt-9 flex justify-center">
          <a
            href="https://hanzo.team"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-700 px-7 text-sm font-medium text-white transition-colors hover:border-neutral-400"
          >
            Open Hanzo Team
          </a>
        </div>
      </section>
    </>
  )
}
