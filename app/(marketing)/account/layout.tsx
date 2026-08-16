'use client'

import type { ReactNode } from 'react'
import { YStack, Text } from '@hanzo/gui'
import { Button } from '@hanzo/ui'
import { useIam } from '@hanzo/iam/react'

/**
 * The frame every /account page shares, and the one place that asks who you are.
 *
 * Each page drew its own before this. One supplied a whole page chrome —
 * background, a second `<main>` inside the marketing layout's own, its own
 * measure — and four supplied nothing, so their content ran flush against the
 * viewport edge with the heading tucked under the header. The question "is
 * anyone signed in" had four answers too: a bare sentence, a form with the
 * fields blanked, and two pages that never asked.
 *
 * Gutter, measure and rhythm are properties of the SECTION, so they are stated
 * once here; a page under /account is for a signed-in reader, so that is settled
 * here too and a page is only its content.
 */

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { user, isLoading, login } = useIam()

  return (
    // One `$sm`, stated inline. Held in a spread const beside a `$sm=` prop it
    // replaces the prop outright rather than merging with it, and the half that
    // loses says nothing about the loss.
    <YStack
      paddingHorizontal="$4"
      paddingVertical="$8"
      $sm={{ paddingHorizontal: '$8', paddingVertical: '$10' }}
    >
      {/* Wider than the marketing measure, which is set for prose. These pages
          are forms and tables, and a form caps itself well inside this. */}
      <YStack width="100%" maxWidth={1024} marginHorizontal="auto">
        {/* Nothing while IAM resolves: a sign-in prompt shown to someone who is
            already signed in reads as being signed out. */}
        {isLoading ? null : user ? children : <SignIn onSignIn={login} />}
      </YStack>
    </YStack>
  )
}

function SignIn({ onSignIn }: { onSignIn: () => void }) {
  return (
    <YStack alignItems="center" gap="$4" paddingVertical="$10">
      <Text render="h1" fontSize="$8" fontWeight="500" color="$foreground">
        Your account
      </Text>
      <Text
        render="p"
        maxWidth={420}
        fontSize="$4"
        color="$mutedForeground"
        textAlign="center"
      >
        Sign in to see your profile, usage and billing.
      </Text>
      <Button onPress={() => onSignIn()}>Sign in</Button>
    </YStack>
  )
}
