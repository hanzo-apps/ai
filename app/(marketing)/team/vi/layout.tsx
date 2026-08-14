import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Meet Vi, Your Visionary Leader',
  description: 'Your innovative AI visionary leader, guiding the team towards excellence with strategic insights and forward-thinking leadership.',
  path: '/team/vi',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
