'use client'

import {
  ArrowRight,
  Bell,
  Brain,
  Coins,
  Layers,
  ListChecks,
  MessageSquare,
  Server,
  Workflow,
} from 'lucide-react'
import { YStack } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'

/**
 * The observability layer, stated as a flagship rather than a footnote.
 *
 * A company that runs on agents is a company whose work happens where nobody is
 * looking. The claim this section makes is that the work is legible: one trace
 * carries the request, the services it crossed, the model calls it made, the
 * tool calls beneath them, and what each one cost. That is a different claim
 * from "we have a logs product", which is why this is a section and not a card
 * under `observe` in the catalog.
 *
 * EVERY CAPABILITY NAMED HERE WAS READ OUT OF `hanzoai/o11y` FIRST. That
 * sourcing pass deleted four things a first draft wanted to say, and the
 * deletions are the useful part of this comment — they will be tempting again:
 *
 *   - "evaluation datasets" — there is no dataset type, table, route or
 *     migration in the repo. `lib/data/catalog.json` lists a `datasets` service
 *     against `/v1/evals/datasets`, so the catalog and the code disagree; the
 *     code wins on a marketing page.
 *   - "experiment comparisons" — likewise absent from o11y. Experiments are real
 *     in `hanzoai/insights`, which is a different product with a different page,
 *     and borrowing one product's feature for another's section is how a page
 *     starts lying by adjacency.
 *   - "approvals" — zero occurrences in the repo. The nearest real thing is an
 *     annotation queue with a PENDING status, which is post-hoc review and NOT a
 *     blocking gate. It is described here as what it is.
 *   - "agent handoffs" and "model routing" — `gen_ai.agent.*` appears only in a
 *     test fixture, and routing is Enso's job, not o11y's. Nested spans and
 *     tool-type observations are the honest version and are what is written.
 *
 * "Objectives" and "intentions" are not entities in o11y either, so the lede
 * says "the request that started the work" — which is what a root span actually
 * is — rather than promising a company goal graph nothing implements.
 *
 * The wording deliberately echoes the `/o11y` page's own copy where they cover
 * the same ground (the one-store pivot, the alert rule that is a saved query),
 * so the front page and the product page cannot drift into two descriptions of
 * one system.
 *
 * Cards carry no `href`. The o11y sub-products live at `/cloud/<slug>` behind a
 * dynamic route, and a link that depends on a slug surviving in a generated
 * catalog is a link that rots quietly. One `Cta` to `/o11y`, which is a real
 * directory. `/observability` is not one and must never be linked.
 *
 * Shapes come from `components/marketing/page-kit`, so this section carries no
 * styling of its own and stays in step with every other marketing surface.
 */
const SURFACE: CardItem[] = [
  {
    title: 'One trace, end to end',
    icon: Workflow,
    description:
      'Follow one request across services, queues and databases, then open the span that spent the time. Child spans nest under their parent, so a model call and the tool calls beneath it read as one tree.',
  },
  {
    title: 'One store, one query',
    icon: Layers,
    description:
      'OpenTelemetry lands in a single column store and comes back as APM, logs, traces, metrics and exceptions. A span carries the id its log lines were written with, so the pivot is a click.',
  },
  {
    title: 'Every model call',
    icon: Brain,
    description:
      'Each generation records its model, its provider, and its prompt, completion and total tokens. A tool call is an observation of its own type, under the call that made it.',
  },
  {
    title: 'Every cost',
    icon: Coins,
    description:
      'Cost is stamped on the span as it arrives, from per-model pricing rules you edit — input, output, cache read and cache write. It totals per call, per trace, per conversation and per end user.',
  },
  {
    title: 'Sessions',
    icon: MessageSquare,
    description:
      'A conversation is every trace and observation that shares a session id, carrying its own token and cost total. The same rollup lands per end user.',
  },
  {
    title: 'Scores and review',
    icon: ListChecks,
    description:
      'Eval scores and human feedback attach to a whole trace or to a single observation, numeric or categorical. Human notes carry a queue and a status, so a judgement is recorded where the work is.',
  },
  {
    title: 'Infrastructure underneath',
    icon: Server,
    description:
      'Hosts, processes, pods, volumes, nodes, namespaces and clusters, beside the deployments, jobs and stateful sets running on them — in the same store as the traces they served.',
  },
  {
    title: 'Dashboards and alerts',
    icon: Bell,
    description:
      'An alert rule is a saved query, so what fires at three in the morning is something you already looked at. It reaches PagerDuty, Opsgenie, Slack, Teams, email or a webhook.',
  },
]

export default function Observability() {
  return (
    <Section
      title="See the whole company think."
      lede="One trace carries the whole path: the request that started the work, the services, queues and databases it crossed, the model calls it made, the tool calls under them, and what each one cost. It is one store, so a span and the log line it produced are one query rather than two tabs and a copied timestamp. Every panel scopes to your org from the token."
    >
      <CardGrid items={SURFACE} columns={2} />
      <YStack marginTop="$5">
        <Cta href="/o11y" icon={ArrowRight}>
          Explore Hanzo O11y
        </Cta>
      </YStack>
    </Section>
  )
}
