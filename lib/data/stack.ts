/**
 * Depth: what each layer of the cloud stands on.
 *
 * The catalog states an ORDER and it is the menu's — what the Products dropdown
 * shows first, which is AI because AI is the headline. A stack asks a different
 * question, and reading the menu order as depth put settlement near the top with
 * AI underneath everything, which is not how any of it is built.
 *
 * So depth is declared here, once, and only the depth. Labels, membership and
 * every product name stay the catalog's. This is the ONE list; the hero reads it
 * and so does every film (film/stack and film/layer parse it), because a second
 * copy is how the page and the picture come to disagree about the same cloud.
 *
 * Value settles on the chain. Compute, data and network are the substrate over
 * it; security and the deploy plane are how it is operated; observe and dev are
 * how it is watched and driven; AI is what it is for; apps are what a person
 * opens — the crown, standing on nine layers it does not have to think about.
 */
export const STACK = [
  'web3',
  'compute',
  'data',
  'network',
  'security',
  'infrastructure',
  'observe',
  'dev',
  'ai',
  'apps',
] as const

export type LayerId = (typeof STACK)[number]

/**
 * The categories, base to crown.
 *
 * A category the taxonomy carries that STACK does not place is a layer the
 * picture would silently omit, so it is appended rather than dropped — a visible
 * anomaly beats a missing one, and the anomaly is exactly what tells you to add
 * it here.
 */
export function inDepth<T extends { id: string }>(categories: readonly T[]): T[] {
  const placed = STACK.map((id) => categories.find((c) => c.id === id)).filter(
    (c): c is T => Boolean(c),
  )
  const rest = categories.filter((c) => !STACK.includes(c.id as LayerId))
  return [...placed, ...rest]
}
