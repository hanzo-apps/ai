import type { ReactNode } from 'react'

/**
 * Passthrough layout body for client-component marketing pages that need static
 * <head> metadata.
 *
 * It renders children unchanged — no element, no wrapper, nothing in the DOM —
 * so a route can gain a `layout.tsx` purely to carry `metadata` without any
 * chance of shifting what the page looks like. That property is the whole point:
 * adding a title should be invisible on the page and visible only in the tab.
 */
export default function MetaLayout({ children }: { children: ReactNode }) {
  return children
}
