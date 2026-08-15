'use client'

import { useEffect } from 'react'
import { YStack } from '@hanzo/gui'
import { Section, Cta } from '@/components/marketing/page-kit'

/**
 * Money lives at billing.hanzo.ai. This site sells; it does not charge.
 *
 * The three /account routes that used to render a balance, a plan picker and a
 * credit purchase are hand-offs to that surface. They keep their addresses so a
 * bookmark still lands somewhere, and they send the visitor on immediately.
 *
 * `plan` rides through as `?plan=`, so arriving from a pricing card selects the
 * card that was clicked instead of dropping the visitor at the top of a ladder
 * they have already read.
 */
export const BILLING_URL = 'https://billing.hanzo.ai'

export default function Handoff({
  title,
  plan,
}: {
  title: string
  plan?: string
}) {
  const href = plan ? `${BILLING_URL}/?plan=${plan}#pricing` : BILLING_URL

  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return (
    <Section title={title} lede="Billing is at billing.hanzo.ai. Taking you there.">
      <YStack marginTop="$5">
        <Cta href={href}>Continue to billing</Cta>
      </YStack>
    </Section>
  )
}
