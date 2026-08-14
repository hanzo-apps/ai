import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Zen 5 Research Preview',
  description: 'Sign up free, then climb the waitlist for access to the Zen model family and hundreds of models behind one API.',
  path: '/research-access',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
