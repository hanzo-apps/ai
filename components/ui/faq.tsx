'use client'

/**
 * Faq — a question/answer list, once.
 *
 * Two pages shipped byte-identical accordion markup (the download page and the
 * pricing page) differing only in their question list. This is that markup, in
 * one place, on the `@hanzo/gui` Accordion: a page supplies questions, the
 * component owns disclosure behaviour, spacing and type.
 */

import { Accordion, YStack, XStack, Text } from '@hanzo/gui'
import { ChevronDown } from '@hanzogui/lucide-icons-2'

export interface FaqItem {
  question: string
  answer: string
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="multiple" width="100%" overflow="hidden" gap="$3">
      {items.map((item, i) => (
        <Accordion.Item key={item.question} value={`q-${i}`}>
          <Accordion.Trigger
            unstyled
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="$4"
            // 44px minimum touch target — the whole row is the control.
            minHeight={44}
            paddingVertical="$4"
            paddingHorizontal="$1"
            backgroundColor="transparent"
            borderWidth={0}
            borderBottomWidth={1}
            borderColor="$border"
            cursor="pointer"
          >
            {({ open }: { open: boolean }) => (
              <>
                <Text
                  flex={1}
                  textAlign="left"
                  fontSize="$5"
                  fontWeight="500"
                  color="$foreground"
                >
                  {item.question}
                </Text>
                <XStack rotate={open ? '180deg' : '0deg'} animation="quick">
                  <ChevronDown size={16} color="var(--muted-foreground)" />
                </XStack>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="medium">
            <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }} unstyled>
              <YStack paddingHorizontal="$1" paddingBottom="$5">
                <Text fontSize="$4" lineHeight={22} color="$mutedForeground">
                  {item.answer}
                </Text>
              </YStack>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default Faq
