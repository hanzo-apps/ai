import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// Its own title. Without one this page inherits its PARENT's, so the pair reads
// as one page listed twice — in a tab, in a bookmark and in a search result.
export const metadata: Metadata = pageMeta({
  title: 'Talk to Sales',
  description: 'Tell us what you are building and we will map it to the right plan, quota and support.',
  path: '/contact/sales',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
