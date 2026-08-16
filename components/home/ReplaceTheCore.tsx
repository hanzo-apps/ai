'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack, XStack, Text, View } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'

/**
 * The strategic claim, and the one most likely to be argued with — so it is
 * written to survive the argument.
 *
 * TWO NUMBERS WERE PROPOSED FOR THIS SECTION AND BOTH ARE ABSENT.
 *
 * "The average company uses 400 SaaS products" has no single true value: the
 * count depends entirely on company size and on whether the survey discovers
 * shadow IT. Published 2025-26 figures range from ~106 per organization, to 152
 * for companies under 500 people against 660 for those over 10,000, to 831 once
 * broad discovery is included. Quoting any one of them as "the average" invites
 * a reader to check it and find a different number. "More than a hundred, and
 * several hundred at enterprise scale" is true across all of them.
 *
 * "99% of what a business needs" invites the immediate question: 99% of which
 * workflows, for which companies, measured how? There is no measurement behind
 * it. What IS defensible is naming the categories we ship first-party, which a
 * reader can check against the product pages, one by one.
 *
 * The two-part strategy is the honest version of vertical integration, and it
 * is stronger than claiming to replace everything: the core is ours, the
 * specialized edge is connected. Saying so also makes the integration layer
 * read as deliberate rather than as a gap.
 *
 * "Apple-like" and "Heroku for AI" are useful analogies in a room, and they are
 * not on this page. An analogy asks the reader to hold someone else's brand in
 * mind while deciding about ours.
 */

/** Categories we ship first-party. Each has a product page a reader can open. */
const CORE: { label: string; href: string }[] = [
  { label: 'Communication', href: '/team' },
  { label: 'Projects and tasks', href: '/team' },
  { label: 'AI and agents', href: '/agents' },
  { label: 'Software development', href: '/dev' },
  { label: 'Product analytics', href: '/insights' },
  { label: 'Observability', href: '/o11y' },
  { label: 'Infrastructure', href: '/cloud' },
  { label: 'Identity and security', href: '/security' },
  { label: 'Data services', href: '/database' },
  { label: 'Billing and commerce', href: '/commerce' },
]

const ONE = [
  'One identity',
  'One project model',
  'One policy plane',
  'One data context',
  'One operational trace',
  'One bill',
]

export function ReplaceTheCore() {
  return (
    <Section
      title="Replace the core. Integrate the rest."
      lede="Modern companies run on more than a hundred applications, and several hundred at enterprise scale. Most platforms add one more. Hanzo removes the need for whole categories of them: the applications a company shares all sit on the same company context, and the specialized systems that remain are reached through the integration layer."
    >
      <YStack gap="$5">
        <YStack>
          <Text marginBottom="$3" fontSize="$2" color="$mutedForeground">
            Shipped first-party, each with a page you can open.
          </Text>
          <XStack flexWrap="wrap" columnGap="$2" rowGap="$2">
            {CORE.map((c) => (
              <View
                key={c.label}
                paddingVertical="$2"
                paddingHorizontal="$3"
                borderWidth={1}
                borderColor="$border"
                borderRadius="$10"
              >
                <Text fontSize="$2" color="$foreground">
                  {c.label}
                </Text>
              </View>
            ))}
          </XStack>
        </YStack>

        <YStack>
          <Text marginBottom="$3" fontSize="$2" color="$mutedForeground">
            What they share, and the reason the seams are not yours to maintain.
          </Text>
          <XStack flexWrap="wrap" columnGap="$4" rowGap="$2">
            {ONE.map((o) => (
              <Text key={o} fontSize="$3" color="$foreground">
                {o}
              </Text>
            ))}
          </XStack>
        </YStack>

        <Cta href="/integrations" icon={ArrowUpRight}>
          See what connects
        </Cta>
      </YStack>
    </Section>
  )
}

export default ReplaceTheCore
