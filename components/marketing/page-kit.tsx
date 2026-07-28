'use client'

/**
 * page-kit — the shared shapes every simple marketing page is made of.
 *
 * Pages in `app/(marketing)` used to open with a byte-identical hero block, each
 * with its own copy of the same badge/title/subtitle markup and motion config.
 * This module is that block, once. A page supplies content; the kit owns layout,
 * spacing, type scale and motion.
 *
 * It is built on `@hanzo/gui` — the same substrate as @hanzo/ui's product layer,
 * so these shapes render from the SAME tokens as the rest of the ecosystem
 * (`gui.config.ts` binds gui's token namespace to @hanzo/design). Pages
 * therefore MUST NOT reach around the kit with their own styling: pass content,
 * not styling.
 */

import React from 'react'
import Link from 'next/link'
import { YStack, XStack, Text, View } from '@hanzo/gui'
import { useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import './prose.css'

/** Fade-and-rise, honouring the OS reduced-motion setting. */
function useRise(delay = 0) {
  const still = useReducedMotion()
  return still
    ? {}
    : ({
        animation: 'medium',
        enterStyle: { opacity: 0, y: 16 },
        opacity: 1,
        y: 0,
        style: { animationDelay: `${delay}s` },
      } as const)
}

/** The page gutter + centred measure every block shares. */
const GUTTER = { paddingHorizontal: '$4', $gtSm: { paddingHorizontal: '$8' } } as const
const MEASURE = { width: '100%', maxWidth: 896, marginHorizontal: 'auto' } as const

/* ── hero ──────────────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  icon: Icon,
  title,
  lede,
  children,
}: {
  eyebrow: string
  icon?: LucideIcon
  title: string
  lede?: string
  children?: React.ReactNode
}) {
  return (
    <YStack render="section" paddingTop="$24" paddingBottom="$12" {...GUTTER}>
      <YStack {...MEASURE}>
        <XStack
          {...useRise()}
          alignSelf="flex-start"
          alignItems="center"
          gap="$2"
          marginBottom="$6"
          paddingHorizontal="$3"
          paddingVertical="$1"
          borderRadius="$9"
          backgroundColor="color-mix(in srgb, var(--primary) 15%, transparent)"
        >
          {Icon ? <Icon size={14} color="var(--primary)" /> : null}
          <Text fontSize="$1" fontWeight="500" color="var(--primary)">
            {eyebrow}
          </Text>
        </XStack>
        <Text
          render="h1"
          {...useRise(0.05)}
          marginBottom="$4"
          fontSize="$9"
          $gtSm={{ fontSize: '$10' }}
          fontWeight="500"
          lineHeight={1.1}
          letterSpacing="var(--tracking-tight)"
          color="$foreground"
        >
          {title}
        </Text>
        {lede ? (
          <Text
            render="p"
            {...useRise(0.1)}
            maxWidth={672}
            fontSize="$5"
            lineHeight="var(--leading-relaxed)"
            color="$mutedForeground"
          >
            {lede}
          </Text>
        ) : null}
        {children ? <YStack marginTop="$8">{children}</YStack> : null}
      </YStack>
    </YStack>
  )
}

/* ── section ───────────────────────────────────────────────────────────────── */

export function Section({
  title,
  lede,
  children,
}: {
  title?: string
  lede?: string
  children: React.ReactNode
}) {
  return (
    <YStack render="section" paddingVertical="$10" {...GUTTER}>
      <YStack {...MEASURE}>
        {title ? (
          <Text
            render="h2"
            marginBottom="$2"
            fontSize="$7"
            fontWeight="500"
            letterSpacing="var(--tracking-tight)"
            color="$foreground"
          >
            {title}
          </Text>
        ) : null}
        {lede ? (
          <Text render="p" marginBottom="$6" maxWidth={672} fontSize="$3" color="$mutedForeground">
            {lede}
          </Text>
        ) : null}
        {children}
      </YStack>
    </YStack>
  )
}

/* ── cards ─────────────────────────────────────────────────────────────────── */

export interface CardItem {
  title: string
  description: string
  href?: string
  icon?: LucideIcon
  /** Shown right-aligned in the title row — e.g. a date or an endpoint verb. */
  meta?: string
}

function CardBody({ item }: { item: CardItem }) {
  const { title, description, icon: Icon, meta } = item
  return (
    <>
      <XStack marginBottom="$2" alignItems="center" gap="$2">
        {Icon ? <Icon size={16} color="var(--muted-foreground)" /> : null}
        <Text fontSize="$3" fontWeight="500" color="$foreground">
          {title}
        </Text>
        {meta ? (
          <Text marginLeft="auto" flexShrink={0} fontSize="$1" color="$mutedForeground">
            {meta}
          </Text>
        ) : null}
      </XStack>
      <Text fontSize="$3" lineHeight="var(--leading-relaxed)" color="$mutedForeground">
        {description}
      </Text>
    </>
  )
}

/**
 * One-, two- or three-up card grid. Single column on small screens — a real
 * grid, so tiles in a row share a height rather than each sizing to its own copy.
 */
export function CardGrid({ items, columns = 2 }: { items: CardItem[]; columns?: 1 | 2 | 3 }) {
  const wide =
    columns === 3 ? 'repeat(3, minmax(0, 1fr))' : columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))'
  return (
    <View
      display="grid"
      gap="$4"
      gridTemplateColumns="1fr"
      $gtSm={{ gridTemplateColumns: columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))' }}
      $gtLg={{ gridTemplateColumns: wide }}
    >
      {items.map((item) => {
        const frame = {
          padding: '$5',
          borderWidth: 1,
          borderColor: '$border',
          borderRadius: '$4',
          hoverStyle: { borderColor: '$borderStrong' },
        } as const
        return item.href ? (
          <Link
            key={item.title}
            href={item.href}
            style={{ textDecoration: 'none', display: 'flex' }}
            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
          >
            <YStack {...frame} flex={1}>
              <CardBody item={item} />
            </YStack>
          </Link>
        ) : (
          <YStack key={item.title} {...frame}>
            <CardBody item={item} />
          </YStack>
        )
      })}
    </View>
  )
}

/* ── call to action ────────────────────────────────────────────────────────── */

/**
 * A standalone action. `minHeight={44}` is the minimum comfortable touch target,
 * which padding alone does not reach at this font size. Inline links inside
 * `Prose` are deliberately not this; they belong in the text flow.
 */
export function Cta({
  href,
  children,
  icon: Icon,
}: {
  href: string
  children: React.ReactNode
  icon?: LucideIcon
}) {
  const external = href.startsWith('http')
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
    >
      <XStack
        minHeight={44}
        alignItems="center"
        gap="$2"
        paddingHorizontal="$5"
        borderWidth={1}
        borderColor="$border"
        borderRadius="$9"
        hoverStyle={{ borderColor: '$borderStrong' }}
      >
        <Text fontSize="$3" fontWeight="500" color="$foreground">
          {children}
        </Text>
        {Icon ? <Icon size={14} color="var(--foreground)" /> : null}
      </XStack>
    </Link>
  )
}

/* ── prose ─────────────────────────────────────────────────────────────────── */

/**
 * Long-form body copy (policies, explanations). Headings come from `Section`.
 *
 * This one shape stays a plain element tree with a stylesheet rule rather than
 * gui props: gui's `Text` is `white-space: pre-wrap`, which is right for a label
 * and wrong for a paragraph authored across several source lines — and prose is
 * exactly where that shows. The rule lives in `prose.css` beside this file, so
 * it is still one definition in one place.
 */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="hz-prose">{children}</div>
}

/* ── page wrapper ──────────────────────────────────────────────────────────── */

/** The outer frame; the marketing layout already supplies nav + footer. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <YStack minHeight="100vh" backgroundColor="$background">
      <YStack render="main" paddingBottom="$16">
        {children}
      </YStack>
    </YStack>
  )
}
