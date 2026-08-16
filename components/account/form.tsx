'use client'

import type { FormEvent, ReactNode } from 'react'
import { YStack } from '@hanzo/gui'
import { Label } from '@hanzo/ui'

/**
 * The two shapes every /account form is made of.
 *
 * The measure is the FORM's, not the page's: a text field wider than this is
 * harder to read back, and each of these pages had reached for its own guess at
 * it. The vertical rhythm is stated once here so a label sits closer to its own
 * control than to the field above it.
 */

/** A form, and the rhythm its fields sit on. */
export function Form({
  onSubmit,
  children,
}: {
  onSubmit: (e: FormEvent) => void
  children: ReactNode
}) {
  return (
    <form onSubmit={onSubmit}>
      <YStack gap="$6" maxWidth={576}>
        {children}
      </YStack>
    </form>
  )
}

/**
 * A label and its control, which are one thing and are spaced as one.
 *
 * `grow` puts the field in a row that wraps: it takes half the width where the
 * viewport has room for two and the whole of it where it does not, so a pair of
 * short fields needs no breakpoint of its own.
 */
export function Field({
  id,
  label,
  children,
  grow,
}: {
  id: string
  label: string
  children: ReactNode
  grow?: boolean
}) {
  return (
    <YStack gap="$2" {...(grow ? { flexGrow: 1, flexBasis: 220 } : null)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </YStack>
  )
}
