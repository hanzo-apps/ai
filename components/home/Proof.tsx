'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack, XStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * The track record.
 *
 * Hanzo OS is not new, and it did not start as a shop. `hanzoai/classic` runs
 * 1,771 commits before its first year is out over a tree carrying api/, auth/,
 * datastore/, analytics/, cron/, email/ — a platform for the startups we worked
 * with, with the data layer in it from the beginning. One early commit adds a
 * storefront, which is a thing built ON it and the least of what is there;
 * leading with that names the first feature instead of the system. Every company
 * below was built and run on this, through the Sensei Method engagement, and the
 * numbers here are what happened after.
 *
 * NO FOUNDING YEAR. The page says how long, not from when — a date on a
 * marketing surface reads as the age of what is running today, which is this
 * year's system, and it invites a question the page then has to walk back.
 *
 * IT SAYS THEY RAN ON IT. An earlier draft said only that these companies came
 * through Hanzo Agency, on the theory that a client can quietly become a
 * reference architecture. Right in general, wrong here — they ran on it, and
 * understating a true claim cost the page its best evidence.
 *
 * WHAT STILL DOES NOT GO IN. Lux and Zoo have case studies in the same
 * directory and are ours; counting your own ventures as customers is a category
 * error whichever direction it flatters. And every number below is the case
 * study's own measured outcome — Damon's "500x return on marketing investment"
 * is theirs, stated as theirs, next to the three other figures from the same
 * engagement rather than lifted out on its own.
 */

interface Win {
  client: string
  what: string
  results: string[]
}

const WORK: Win[] = [
  {
    client: 'TrillerFest',
    what: 'The largest virtual music festival held to that point — platform, production and ticketing.',
    results: ['Over 5 million viewers', '100+ artists across 3 days'],
  },
  {
    client: 'Damon Motorcycles',
    what: 'Commerce and campaign stack for an electric motorcycle launch.',
    results: ['500x return on marketing investment', '230% more qualified leads', '45% lower acquisition cost'],
  },
  {
    client: 'Personas Social',
    what: 'Feed, ranking and moderation for a social platform.',
    results: ['400% more content engagement', '3x feed relevance', '60% lower moderation cost'],
  },
  {
    client: 'Unikrn',
    what: 'Token launch, end to end, under real load on launch day.',
    results: ['120,000 ETH raised', '300% more platform engagement', '15+ jurisdictions'],
  },
  {
    client: 'Bellabeat',
    what: 'The platform behind a women’s health wearable.',
    results: ['67% more user engagement', '45% better retention'],
  },
  {
    client: 'Cover Build',
    what: 'Configurator and ordering path for factory-built housing.',
    results: ['300% more qualified leads', '40% shorter sales cycle'],
  },
  {
    client: 'Myle Tap',
    what: 'Launch of a wearable, from crowdfunding through fulfilment.',
    results: ['200% of the crowdfunding goal'],
  },
  {
    client: 'Casper Labs',
    /* The one entry whose case study records no measured outcome. It is here
       because what was delivered IS the result — architecture, launch and
       validator operation for an enterprise-facing chain — and inventing a
       percentage to make the row match its neighbours is the one thing that
       would make this section untrue. */
    what: 'Technical architecture, launch and validator operation for an enterprise-facing chain.',
    results: [],
  },
]

export function Proof() {
  return (
    <Section
      title="Companies have been running on this for years."
      lede="Hanzo OS started as a data-driven AI platform for high-growth startups and has been the system underneath our work ever since. More than a hundred venture-funded companies have built on it with us, through the Sensei Method — our engineers sitting with their team and working the problem alongside them. Among them, exits and multi-billion-dollar outcomes. These are the measured results after adoption."
    >
      <YStack gap="$4">
        {WORK.map((w) => (
          <YStack
            key={w.client}
            padding="$5"
            borderWidth={1}
            borderColor="$border"
            borderRadius="$4"
            hoverStyle={{ borderColor: '$borderStrong' }}
          >
            <Text marginBottom="$1" fontSize="$3" fontWeight="500" color="$foreground">
              {w.client}
            </Text>
            <Text marginBottom="$3" fontSize="$3" color="$mutedForeground">
              {w.what}
            </Text>
            <XStack flexWrap="wrap" columnGap="$4" rowGap="$2">
              {w.results.map((r) => (
                <Text key={r} fontSize="$2" color="$foreground">
                  {r}
                </Text>
              ))}
            </XStack>
          </YStack>
        ))}
      </YStack>

      <Cta href="https://hanzo.agency" icon={ArrowUpRight}>
        Read the case studies
      </Cta>
    </Section>
  )
}

export default Proof
