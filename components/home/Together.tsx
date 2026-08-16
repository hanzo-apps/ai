'use client'

import { ArrowUpRight } from 'lucide-react'
import { YStack, XStack, Text } from '@hanzo/gui'
import { Cta, Section } from '@/components/marketing/page-kit'
import { APP, CHAT } from './nav-data'

/**
 * The close.
 *
 * It replaces a three-step section — start with Enso, build the app around it,
 * run it on Hanzo Cloud — which was right when the page was still arguing that
 * an AI app needs a backend, and wrong now. After eleven sections establishing
 * one operating system, ending on three numbered steps shrinks the whole thing
 * back to an app builder. It also opened every step with an ordinal, which is a
 * tic rather than a structure: the steps were not a sequence anyone follows.
 *
 * What replaces it is the same list read as simultaneous rather than serial.
 * Nothing here is new — every line names a section the reader has already
 * passed — because a closing section should let the page land, not introduce.
 */

const TOGETHER: [string, string][] = [
  ['Think', 'with Enso'],
  ['Build', 'with App and Dev'],
  ['Work', 'in Team'],
  ['Learn', 'with Insights'],
  ['Run', 'on Hanzo Cloud'],
]

export function Together() {
  return (
    <Section title="Everything works better together.">
      <YStack gap="$3">
        {TOGETHER.map(([verb, rest]) => (
          <XStack key={verb} alignItems="baseline" gap="$2" flexWrap="wrap">
            <Text fontSize="$5" fontWeight="500" color="$foreground">
              {verb}
            </Text>
            <Text fontSize="$5" color="$mutedForeground">
              {rest}.
            </Text>
          </XStack>
        ))}
      </YStack>

      <XStack marginTop="$6" gap="$4" flexWrap="wrap">
        <Cta href={CHAT} icon={ArrowUpRight}>
          Try Hanzo
        </Cta>
        <Cta href={APP} icon={ArrowUpRight}>
          Build an app
        </Cta>
      </XStack>
    </Section>
  )
}

export default Together
