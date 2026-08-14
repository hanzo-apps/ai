'use client'

import { FlaskConical } from 'lucide-react'
import { Page, PageHero, Section, CardGrid, Prose, type CardItem } from '@/components/marketing/page-kit'
import { papers, PAPERS } from '@/lib/data/papers'

/**
 * The way in to the library. papers.hanzo.ai is where a paper is published; this
 * page is the door, and it states nothing of its own.
 *
 * It used to hold six hand-typed titles under a comment reading "Titles mirror
 * what is published on papers.hanzo.ai — add a paper there, then here". They did
 * not mirror it. Not one of the six was a title the library serves, every card
 * pointed at the library's ROOT rather than at its paper, and the instruction to
 * update two places in step is exactly the arrangement that guarantees they
 * drift. The list is now derived from `lib/data/papers.json`, which
 * `scripts/sync-papers.mjs` re-fetches on every build — so adding a paper to the
 * library is the whole of adding it here, and a card cannot name a paper that
 * does not exist or link to a page that does not answer.
 */
const ITEMS: CardItem[] = PAPERS.map((paper) => ({
  title: paper.title,
  description: paper.subtitle,
  meta: paper.date,
  href: `${papers.source}/${paper.slug}/`,
}))

export default function ResearchPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Research"
        icon={FlaskConical}
        title="Work we publish"
        lede="Hanzo builds infrastructure that has to hold up under audit, regulation and adversaries. The reasoning behind it is published rather than kept internal."
      />

      <Section title="Papers" lede="Each one links to its page on papers.hanzo.ai, where the PDF and the LaTeX live.">
        <CardGrid items={ITEMS} columns={2} />
      </Section>

      <Section title="Open source">
        <Prose>
          <p>
            The systems described in these papers are open source. The cloud, the gateway, the agent runtime and the
            infrastructure around them are developed in the open at{' '}
            <a href="https://github.com/hanzoai">github.com/hanzoai</a>, and the platform pays the open-source authors
            whose work runs on it.
          </p>
        </Prose>
      </Section>
    </Page>
  )
}
