import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Industry Solutions',
  description: 'We deliver specialized solutions across a wide range of industries, tailored to address your unique challenges and opportunities.',
  path: '/solutions/industries',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
