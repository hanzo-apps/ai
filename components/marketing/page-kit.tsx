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
import './prose.css'

/**
 * Any icon the kit can render.
 *
 * Typed by what the kit USES — it only ever sets `size` and `color` — not by the
 * icon vendor. `LucideIcon` was the wrong shape for the slot: it is lucide's own
 * `ForwardRefExoticComponent`, so a structurally identical icon from anywhere
 * else (the `CloudIcon` in `lib/data/cloud-primitives.ts`, say) failed on
 * `$$typeof` despite rendering perfectly. Every lucide icon still satisfies this.
 */
export type KitIcon = React.ComponentType<{ size?: number | string; color?: string }>

/**
 * Fade-and-rise, honouring the OS reduced-motion setting.
 *
 * `css` is merged rather than left to the caller because this hook owns the
 * `style` prop (it carries the stagger delay), and a second `style=` on the
 * same element would silently replace it.
 */
function useRise(delay = 0, css?: React.CSSProperties) {
  const still = useReducedMotion()
  return still
    ? { style: css }
    : {
        // `transition`, not `animation`: gui 8 renamed the prop, and the old name
        // is not rejected in a JSX spread, so the rise silently had no easing.
        transition: 'medium' as const,
        enterStyle: { opacity: 0, y: 16 },
        opacity: 1,
        y: 0,
        style: { animationDelay: `${delay}s`, ...css },
      }
}

/**
 * The page gutter + centred measure every block shares.
 *
 * `$sm`, not `$gtSm`: the v4 media set is mobile-first, so a bare breakpoint
 * name IS the min-width query and the `gt`-prefixed v3 names no longer exist.
 * They are not rejected inside a spread, so the wider gutter simply never
 * applied — the page ran at the 16px mobile gutter on every viewport.
 */
const GUTTER = { paddingHorizontal: '$4', $sm: { paddingHorizontal: '$8' } } as const
const MEASURE = { width: '100%', maxWidth: 896, marginHorizontal: 'auto' } as const

/**
 * Values with no gui token behind them.
 *
 * gui types its style PROPS against its own token namespace (`gui.config.ts`),
 * so a literal `var(--tracking-tight)` is not a legal `letterSpacing` prop even
 * though gui emits it correctly. These are not tokens and must not be faked as
 * tokens: a named font key in `gui.config.ts` breaks `createGui`'s constraint,
 * which degrades EVERY gui component's props to `undefined` (measured: 726
 * errors). They ride the `style` prop instead — gui's escape hatch for exactly
 * this — and land in the same generated rule. Named here so the intent reads.
 */
const TIGHT: React.CSSProperties = { letterSpacing: 'var(--tracking-tight)' }
const RELAXED: React.CSSProperties = { lineHeight: 'var(--leading-relaxed)' }
/**
 * The page title's line height, which is a RATIO and not a length.
 *
 * It rode gui's `lineHeight` prop as a bare `1.1`, and gui reads a bare number as
 * pixels — so every page-kit page shipped `line-height: 1.1px` and drew each line
 * of a wrapped title on the same baseline. A one-line title hides it entirely,
 * which is how it survived: invisible at 1280px, unreadable at 390px, and the
 * longer the title the worse it gets.
 *
 * Moving it to `style` is not on its own the fix — gui appends px to a bare
 * number THERE TOO, prop or style alike. The ratio has to be spelled as a string
 * so it reaches CSS as the unitless value it is.
 */
const DISPLAY: React.CSSProperties = { ...TIGHT, lineHeight: '1.1' }
const PRIMARY_TINT: React.CSSProperties = {
  backgroundColor: 'color-mix(in srgb, var(--primary) 15%, transparent)',
}
/** CSS grid — gui's `display` union is React-Native-derived and stops at flex. */
const GRID: React.CSSProperties = { display: 'grid' }

/* ── hero ──────────────────────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  icon: Icon,
  title,
  lede,
  children,
}: {
  eyebrow: string
  icon?: KitIcon
  title: string
  lede?: string
  children?: React.ReactNode
}) {
  // Hoisted because `useRise` calls `useReducedMotion`, a real hook, and the
  // lede's copy of it sat inside `{lede ? … : null}`. A PageHero without a lede
  // therefore ran one hook fewer than one with it — the hook ORDER changed with
  // a prop. It survived because a mounted hero's lede does not usually appear
  // or vanish, which is exactly the kind of latent violation that only breaks
  // once something makes the copy dynamic.
  const badgeRise = useRise(0, PRIMARY_TINT)
  const titleRise = useRise(0.05, DISPLAY)
  const ledeRise = useRise(0.1, RELAXED)
  return (
    <YStack render="section" paddingTop="$24" paddingBottom="$12" {...GUTTER}>
      <YStack {...MEASURE}>
        <XStack
          {...badgeRise}
          alignSelf="flex-start"
          alignItems="center"
          gap="$2"
          marginBottom="$6"
          paddingHorizontal="$3"
          paddingVertical="$1"
          borderRadius="$9"
        >
          {Icon ? <Icon size={14} color="var(--primary)" /> : null}
          <Text fontSize="$1" fontWeight="500" color="var(--primary)">
            {eyebrow}
          </Text>
        </XStack>
        <Text
          render="h1"
          {...titleRise}
          marginBottom="$4"
          fontSize="$9"
          $sm={{ fontSize: '$10' }}
          fontWeight="500"
          color="$foreground"
        >
          {title}
        </Text>
        {lede ? (
          <Text
            render="p"
            {...ledeRise}
            maxWidth={672}
            fontSize="$5"
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
            style={TIGHT}
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
  icon?: KitIcon
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
      <Text fontSize="$3" style={RELAXED} color="$mutedForeground">
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
      style={GRID}
      gap="$4"
      gridTemplateColumns="1fr"
      $sm={{ gridTemplateColumns: columns === 1 ? '1fr' : 'repeat(2, minmax(0, 1fr))' }}
      $lg={{ gridTemplateColumns: wide }}
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
  icon?: KitIcon
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
