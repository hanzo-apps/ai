'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'
import { papers, PAPERS, type Paper } from '@/lib/data/papers'

/**
 * The research, on the front page.
 *
 * Hanzo publishes its reasoning, and hanzo.ai said so nowhere a visitor would
 * find it: the library was one line in a footer column and one `/research` page
 * nothing on the apex linked to. This is that work, surfaced where the claims it
 * backs are made.
 *
 * EVERY WORD HERE IS THE LIBRARY'S. Titles, subtitles and dates come from
 * `lib/data/papers.json`, which `scripts/sync-papers.mjs` re-fetches from
 * papers.hanzo.ai on every build — the same shape as the pricing and catalog
 * snapshots, and for the same reason: `output: 'export'` cannot read the library
 * at request time, so the read happens at build time or the page is a hand copy
 * that starts wrong the first time a paper lands.
 *
 * The abstract is deliberately NOT carried over. A paragraph written for a
 * library card is not a paragraph for a landing page, and three clipped lines of
 * one is how a summary drifts from the paper it summarises. The subtitle is the
 * one-line statement the author already wrote for exactly this purpose.
 *
 * THREE OF THEM RENDER, and the choice is this repo's rather than the library's
 * — the library does not rank its own papers, so `FEATURED` is an editorial
 * decision and is written down as one. All twelve used to render, which is a
 * page of cards where the point is that the reasoning is public; the count says
 * that in four words and the library is one tap away.
 *
 * The count is `PAPERS.length`, never typed. A number on a page is a fact about
 * the morning it was written, and this one moves when the library moves.
 *
 * A slug that stops resolving drops out rather than rendering a hole, and an
 * empty selection falls back to the library's own order — so a renamed paper
 * costs a card, never a broken section.
 */
const FEATURED = ['hanzo-unified-tenant-cloud', 'hanzo-router', 'hanzo-continuous-learning-privacy']

const CHOSEN: Paper[] = FEATURED.map((slug) => PAPERS.find((p) => p.slug === slug)).filter(
  (p): p is Paper => p !== undefined,
)

const ITEMS: CardItem[] = (CHOSEN.length ? CHOSEN : PAPERS.slice(0, 3)).map((paper) => ({
  title: paper.title,
  description: paper.subtitle,
  meta: paper.date,
  href: `${papers.source}/${paper.slug}/`,
}))

export default function Research() {
  return (
    <Section
      title="The research is public"
      lede="The methods, the measurements, and the results that did not work."
    >
      <CardGrid items={ITEMS} columns={3} />
      <YStack marginTop="$5">
        <Cta href={papers.source} icon={ArrowUpRight}>
          {`${PAPERS.length} papers published`}
        </Cta>
      </YStack>
    </Section>
  )
}
