'use client'

import { ArrowRight } from 'lucide-react'
import { YStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * The observability layer, stated as a flagship rather than a footnote.
 *
 * A company that runs on agents is a company whose work happens where nobody is
 * looking. The claim is that the work is legible end to end, and the chain line
 * IS the claim — one trace, from what was asked to what it cost.
 *
 * THE DETAIL LIVES ON /o11y. Eight cards used to stand here (one trace end to
 * end · one store one query · every model call · every cost · sessions · scores
 * and review · infrastructure underneath · dashboards and alerts), each read out
 * of `hanzoai/o11y` before it was written. That is documentation, and the
 * product page is where documentation belongs; /o11y states all eight in the
 * same words, so the two cannot drift.
 *
 * WHAT THE SOURCE REFUSED, kept here because each was proposed once and will be
 * proposed again: there is no dataset type, table, route or migration in o11y
 * (`lib/data/catalog.json` lists one against /v1/evals/datasets — the code
 * wins); experiment comparison is `hanzoai/insights`, a different product;
 * "approvals" appear nowhere in o11y, the nearest real thing being an annotation
 * queue with a PENDING status, which is post-hoc review; and `gen_ai.agent.*`
 * exists only in a test fixture, so agent handoffs and model routing are not
 * o11y's to claim — routing is Enso's.
 *
 * "Objective" in the lede is the page's own framing, set by the Enso section
 * above. o11y's root span is a REQUEST and there is no objective entity behind
 * it, so nothing downstream of this line may promise a company goal graph.
 *
 * One `Cta`, to /o11y, which is a real directory. The sub-products live at
 * /cloud/<slug> behind a dynamic route, and a link that depends on a slug
 * surviving in a generated catalog is a link that rots quietly. `/observability`
 * is not a directory and must never be linked.
 */
export default function Observability() {
  return (
    <Section
      title="See the whole company think."
      lede="One trace connects the objective that started the work to the models, agents, tools, services, infrastructure, cost, evaluation and outcome that followed."
    >
      <YStack gap="$4" maxWidth={672}>
        <Text render="p" fontSize="$5" fontWeight="500" color="$foreground">
          Models → agents → tools → infrastructure → result → cost → evaluation
        </Text>
        <Text render="p" fontSize="$3" color="$mutedForeground">
          Logs, metrics, traces, sessions and scores share the same operational context.
        </Text>
        <Cta href="/o11y" icon={ArrowRight}>
          Explore Observability
        </Cta>
      </YStack>
    </Section>
  )
}
