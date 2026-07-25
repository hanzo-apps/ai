'use client'

import { FlaskConical, FileText, ShieldCheck, Landmark, Bot, Cloud } from 'lucide-react'
import { Page, PageHero, Section, CardGrid, Prose, type CardItem } from '@/components/marketing/page-kit'

/**
 * Titles mirror what is published on papers.hanzo.ai — the library is the
 * source of truth, this page is the way in. Add a paper there, then here.
 */
const PAPERS: CardItem[] = [
  {
    icon: ShieldCheck,
    title: 'Automated, Agentic Security Auditing at Estate Scale',
    description: 'Running continuous security review across a whole estate with agents rather than sampling by hand.',
    href: 'https://papers.hanzo.ai/',
  },
  {
    icon: Cloud,
    title: 'An OSS Cloud Built to Pass the Audit',
    description: 'Designing an open-source cloud so that compliance falls out of the architecture instead of being bolted on.',
    href: 'https://papers.hanzo.ai/',
  },
  {
    icon: Bot,
    title: 'Owned, Self-Hostable AI Versus a Centralized Cloud Chat',
    description: 'What changes — for cost, privacy and control — when the model and its context belong to you.',
    href: 'https://papers.hanzo.ai/',
  },
  {
    icon: Landmark,
    title: 'Building a Post-Quantum, FHE-Native Securities Platform',
    description: 'Post-quantum cryptography and fully homomorphic encryption applied to regulated securities infrastructure.',
    href: 'https://papers.hanzo.ai/',
  },
  {
    icon: FileText,
    title: 'A Regulated Capital-Markets Migration Case Study',
    description: 'Moving a regulated capital-markets workload without a gap in custody, audit or settlement.',
    href: 'https://papers.hanzo.ai/',
  },
  {
    icon: FlaskConical,
    title: 'An FHE-Native Chain and Agent Runtime',
    description: 'A chain and agent runtime where encrypted state is the default rather than an add-on.',
    href: 'https://papers.hanzo.ai/',
  },
]

export default function ResearchPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Research"
        icon={FlaskConical}
        title="Work we publish"
        lede="Hanzo builds infrastructure that has to hold up under audit, regulation and adversaries. The reasoning behind it is published rather than kept internal."
      />

      <Section title="Papers" lede="The full library, with PDFs, is at papers.hanzo.ai.">
        <CardGrid items={PAPERS} columns={2} />
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
