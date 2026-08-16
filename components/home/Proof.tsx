'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack, XStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * The track record, and the oldest claim on the site.
 *
 * Hanzo OS is not new. `hanzoai/classic` opens on 2014-09-29 with "Initial
 * commit." and "Add storefront.", 1,771 commits before that year is out, and a
 * tree carrying api/, auth/, datastore/, analytics/, cron/, email/ — a platform,
 * not a fork of one. Every company below was built and run on it, through the
 * Sensei Method engagement, and the numbers here are what happened after.
 *
 * An earlier draft of this file hedged: it said these companies came through
 * Hanzo Agency and pointedly did NOT say they ran on Hanzo OS, on the theory
 * that a client can quietly become a reference architecture. The caution was
 * right in general and wrong here — they ran on it. Understating a true claim
 * is its own kind of inaccuracy, and this one cost the page its best evidence.
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
      title="Companies have been running on this since 2014."
      lede="Hanzo OS started as one storefront in September 2014 and has been the system underneath our work ever since. More than a hundred venture-funded companies have built on it with us, through the Sensei Method — our engineers sitting with their team and working the problem alongside them. Among them, exits and multi-billion-dollar outcomes. These are the measured results after adoption."
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
