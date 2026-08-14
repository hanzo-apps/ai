'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'
import { papers, PAPERS } from '@/lib/data/papers'

/**
 * The research, on the front page.
 *
 * Hanzo publishes its reasoning, and hanzo.ai said so nowhere a visitor would
 * find it: the library was one line in a footer column and one `/research` page
 * nothing on the apex linked to. This is that work, surfaced where the claims it
 * backs are made — the cloud economics paper sits under the cloud taxonomy, the
 * engine and inference papers under the section that says you can run this on
 * your own hardware.
 *
 * EVERY WORD HERE IS THE LIBRARY'S. Titles, subtitles and dates come from
 * `lib/data/papers.json`, which `scripts/sync-papers.mjs` re-fetches from
 * papers.hanzo.ai on every build — the same shape as the pricing and catalog
 * snapshots, and for the same reason: `output: 'export'` cannot read the library
 * at request time, so the read happens at build time or the page is a hand copy
 * that starts wrong the first time a paper lands. Add a paper to the library and
 * it appears here; there is nothing to edit in this repo.
 *
 * The abstract is deliberately NOT carried over. A paragraph written for a
 * library card is not a paragraph for a landing page, and three clipped lines of
 * one is how a summary drifts from the paper it summarises. The subtitle is the
 * one-line statement the author already wrote for exactly this purpose.
 *
 * ALL of them render, and that is a rule rather than a layout preference: the
 * library does not rank its own papers, so any "featured six" would be a ranking
 * this repo invented. No count appears in the copy either — membership is
 * whatever answered at build time, and a number on a page is a fact about that
 * morning.
 */
const ITEMS: CardItem[] = PAPERS.map((paper) => ({
  title: paper.title,
  description: paper.subtitle,
  meta: paper.date,
  href: `${papers.source}/${paper.slug}/`,
}))

export default function Research() {
  return (
    <Section
      title="The reasoning is published"
      lede="Measured campaigns, negative results and formal work behind the stack — written up, with the PDFs and the LaTeX in the open."
    >
      <CardGrid items={ITEMS} columns={2} />
      <YStack marginTop="$6">
        <Cta href={papers.source} icon={ArrowUpRight}>
          Read the papers
        </Cta>
      </YStack>
    </Section>
  )
}
