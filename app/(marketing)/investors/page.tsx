'use client'

import { Building2, FileText, Landmark, Mail, Scale, Users } from 'lucide-react'
import { CardGrid, Cta, Page, PageHero, Prose, Section } from '@/components/marketing/page-kit'


/**
 * Investor relations.
 *
 * WHAT IS NOT HERE IS THE POINT. Hanzo is privately held: there is no round
 * size, no valuation, no revenue figure, no investor roster and no forward
 * projection on this page, because none of those is a thing a marketing site
 * can state truthfully without an owner stating it first. A number invented
 * here is not a rough edge — an investor is entitled to rely on it, and the
 * rest of this site has already had to be cleaned of exactly that habit
 * (a "50+ employees" and a "10,000+ customers" that nothing corroborated).
 *
 * So the page states only what is already public and checkable: the entity,
 * that the company came through Techstars in 2017 — the same claim /startups
 * has carried for as long as it has existed — the leadership, the licences the
 * work ships under, and one address to write to. When there is more to say, it
 * is added here as fact, with a source.
 *
 * `ir@hanzo.ai` is a NEW alias and has to exist before this ships. Every
 * other address on this site resolves; a dead one here answers an investor with
 * a bounce, which is worse than no page at all.
 */
export default function InvestorsPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Investor relations"
        icon={Landmark}
        title="Hanzo Industries Inc."
        lede="We build frontier models, the agents that use them, and the cloud underneath. Most of it is open source. This page is where company information and investor contact live."
      />

      <Section title="The company">
        <CardGrid
          columns={2}
          items={[
            {
              icon: Building2,
              title: 'Entity',
              description:
                'Hanzo Industries Inc. The operating company behind hanzo.ai and every Hanzo product.',
            },
            {
              icon: Users,
              title: 'Backing',
              description: 'Techstars ’17. The company is privately held.',
            },
          ]}
        />
      </Section>

      <Section
        title="What we do"
        lede="Three things, and they are one product from the customer’s side."
      >
        <CardGrid
          columns={3}
          items={[
            {
              title: 'Models',
              description:
                'Enso is our frontier model. One API also serves every other major lab’s models at the same endpoint, billed per organization.',
              href: '/models',
            },
            {
              title: 'Agents',
              description:
                'Hanzo Dev writes and runs code from a terminal, an editor or CI. Hanzo App builds and ships applications from a sentence.',
              href: '/dev',
            },
            {
              title: 'Cloud',
              description:
                'The platform underneath — identity, data, secrets, vector search, compute. Run it managed, or run the same binary on your own hardware.',
              href: 'https://cloud.hanzo.ai',
            },
          ]}
        />
      </Section>

      <Section
        title="Governance"
        lede="The terms the work is published under."
      >
        <CardGrid
          columns={2}
          items={[
            {
              icon: Scale,
              title: 'Legal',
              description:
                'Terms of service, privacy policy and the licences our open-source work ships under.',
              href: '/terms',
            },
            {
              icon: FileText,
              title: 'Security',
              description:
                'Our security posture, disclosure process and the audit report available upon request.',
              href: '/security',
            },
          ]}
        />
      </Section>

      <Section title="Press">
        <Prose>
          <p>
            Announcements, company facts and brand assets — including the logo pack and partner
            marks — are on the <a href="/press">press page</a>. Media enquiries go to{' '}
            <a href="mailto:press@hanzo.ai">press@hanzo.ai</a>.
          </p>
        </Prose>
      </Section>

      <Section title="Contact">
        <Prose>
          {/* No form. A form here would be a queue nobody has agreed to staff,
              and an investor writing to a private company expects to reach a
              person, from their own address, with an attachment if they want
              one. */}
          <p>
            Investor enquiries: <a href="mailto:ir@hanzo.ai">ir@hanzo.ai</a>.
          </p>
          <p>
            Hanzo is privately held and does not publish financial statements. Requests for
            information beyond what is on this page are answered case by case at the address above.
          </p>
        </Prose>
      </Section>

      <Cta href="mailto:ir@hanzo.ai" icon={Mail}>
        Contact investor relations
      </Cta>
    </Page>
  )
}
