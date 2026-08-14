import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// Its own title. Without one this page inherits its PARENT's ("Products"), so
// the pair reads as one page listed twice — in a tab, in a bookmark and in a
// search result.
//
// Qualified by the shelf because /integrations exists too and is the same
// subject from the other direction. Two pages covering one topic is worth
// merging; until someone does, they must at least be distinguishable.
export const metadata: Metadata = pageMeta({
  title: 'Integrations — Products',
  description:
    'Connect Hanzo to the tools you already run — data stores, identity, payments, messaging and the rest.',
  path: '/products/integrations',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
