'use client'

import { Spinner, Text, YStack } from '@hanzo/gui'

/**
 * What a route shows while it is handing the reader somewhere else.
 *
 * IAM owns the sign-in form, so /login, /signup and /auth/callback each do one
 * thing: say where you are going, and go. All three drew that screen from their
 * own copy of the same markup, and each asked for a whole viewport of it inside
 * a layout that already supplies a header and a footer — so a page carrying one
 * line of text scrolled, and the line sat below the middle of it.
 *
 * It takes the space a short message needs and leaves the rest to the layout.
 */
export function Waiting({ title, lede }: { title: string; lede?: string }) {
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      gap="$5"
      minHeight={360}
      paddingHorizontal="$4"
      paddingVertical="$10"
    >
      <Spinner size="large" color="$foreground" />
      <Text
        render="h1"
        fontSize="$7"
        fontWeight="500"
        color="$foreground"
        textAlign="center"
      >
        {title}
      </Text>
      {lede ? (
        <Text fontSize="$4" color="$mutedForeground" textAlign="center">
          {lede}
        </Text>
      ) : null}
    </YStack>
  )
}
