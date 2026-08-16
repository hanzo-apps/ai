'use client'

import Link from 'next/link'
import { XStack, Text } from '@hanzo/gui'

/**
 * The scope line, directly under the category line.
 *
 * The hero says what Hanzo OS IS. This says how far it reaches, and it is the
 * one place on the page carrying numbers — so every number here has to be
 * derived rather than typed.
 *
 * THE MODEL COUNT IS A PROP, not a literal, and that is the whole design. It
 * comes from `fetchModels()` in the server component above, which reads
 * models.hanzo.ai/v1/models at build time and falls back to the bundled
 * catalog. A hardcoded "500+" is true on the day it is written and silently
 * wrong afterwards; this one is re-derived by every build, so the page cannot
 * drift from the registry it describes.
 *
 * WHAT IS DELIBERATELY NOT HERE, and why, because each was proposed and each
 * failed its own check:
 *
 *   "600+ integrations" — the site publishes 19 integration pages. The number
 *   has no registry behind it.
 *
 *   "260+ MCP tools" — closer to real, and it argues against our own product.
 *   /mcp's thesis is "a catalog of 260 collapsed into 13", because a tool list
 *   is a prompt and two hundred near-duplicates make a model choose badly. The
 *   thirteen ARE the achievement; advertising the 260 sells the problem.
 *
 * Isolation names are the runtime's own: `create-sandbox-dto.ts` enumerates
 * gvisor and firecracker, and `pkg/docker/isolation.go` resolves the runsc and
 * Kata shims. Kubernetes-native is the `hanzo.ai/v1alpha1` operator CRDs.
 */

interface Item {
  label: string
  href?: string
}

export function ProofStrip({ modelCount }: { modelCount: number }) {
  /* Rounded DOWN to the hundred, so the claim stays true between builds even if
     the registry loses a model. `500+` from 529 is a promise the catalog keeps;
     `529` is a number that is wrong the moment one is deprecated. */
  const models = modelCount >= 100 ? `${Math.floor(modelCount / 100) * 100}+ models` : `${modelCount} models`

  const items: Item[] = [
    { label: models, href: '/models' },
    { label: '13 MCP tools', href: '/mcp' },
    { label: 'Functions, containers, gVisor, Firecracker', href: '/cloud' },
    { label: 'Kubernetes-native', href: '/operator' },
    { label: 'Full-stack observability', href: '/o11y' },
    { label: 'Open source', href: '/open-source' },
  ]

  return (
    <XStack
      render="nav"
      aria-label="What Hanzo OS covers"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      columnGap="$3"
      rowGap="$2"
      paddingHorizontal="$4"
      paddingBottom="$7"
      maxWidth={880}
      marginHorizontal="auto"
    >
      {items.map((item, i) => (
        <XStack key={item.label} alignItems="center" columnGap="$3">
          {i > 0 ? (
            <Text fontSize="$2" color="$mutedForeground" aria-hidden>
              ·
            </Text>
          ) : null}
          {item.href ? (
            <Link href={item.href} style={{ textDecoration: 'none' }}>
              <Text fontSize="$2" color="$mutedForeground" hoverStyle={{ color: '$foreground' }}>
                {item.label}
              </Text>
            </Link>
          ) : (
            <Text fontSize="$2" color="$mutedForeground">
              {item.label}
            </Text>
          )}
        </XStack>
      ))}
    </XStack>
  )
}

export default ProofStrip
