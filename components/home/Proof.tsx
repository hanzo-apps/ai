'use client'

import { ArrowUpRight } from 'lucide-react'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'

/**
 * The track record, and it is a DIFFERENT claim from the rest of the page.
 *
 * Everything above says what Hanzo OS does. This says who we have already
 * shipped for, which is the only section on the page a reader can check against
 * the outside world.
 *
 * The distinction that has to survive every future edit: these companies came
 * through Hanzo Agency, which built and shipped their products. That is not the
 * same sentence as "these companies run Hanzo OS in production", and writing the
 * second one would be the exact error `lib/constants/partner-logos.ts` was split
 * up to prevent — a mixed list that quietly upgrades a vendor into a customer,
 * or a client into a reference architecture. Say the true one; it is stronger,
 * because it explains why we know what shipping actually costs.
 *
 * Every name here has a case study in `hanzo/agency/src/data/case-studies/`.
 * Lux and Zoo are deliberately ABSENT: they are ours, and counting your own
 * ventures as customers is the same category error in a friendlier coat.
 *
 * No multiplier claims. The Damon study carries a "500X ROI" line; a return
 * figure without its methodology is a number a reader cannot check, and this
 * site spent a long time removing those. What was built is checkable.
 */

const WORK: CardItem[] = [
  {
    title: 'Triller',
    description: 'The largest virtual music festival held to that point, from the streaming platform to the ticketing under it.',
  },
  {
    title: 'Bellabeat',
    description: 'The platform behind a women’s health wearable — devices, app and the data service between them.',
  },
  {
    title: 'Casper Labs',
    description: 'Launch of an enterprise-facing proof-of-stake blockchain, and the developer surface around it.',
  },
  {
    title: 'Unikrn',
    description: 'A 120,000 ETH token launch, end to end, under real load on launch day.',
  },
  {
    title: 'Damon Motorcycles',
    description: 'The commerce and campaign stack for an electric motorcycle launch.',
  },
  {
    title: 'Cover Build',
    description: 'The configurator and ordering path for factory-built housing.',
  },
]

export function Proof() {
  return (
    <Section
      title="We have shipped this before."
      lede="Hanzo Agency has built and launched products with more than a hundred venture-funded startups, among them companies that went on to exits and to multi-billion-dollar valuations. Hanzo OS is the system we wanted while doing it."
    >
      <CardGrid items={WORK} columns={3} />
      <Cta href="https://hanzo.agency" icon={ArrowUpRight}>
        Read the case studies
      </Cta>
    </Section>
  )
}

export default Proof
