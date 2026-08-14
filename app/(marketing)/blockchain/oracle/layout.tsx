import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Hanzo Oracle',
  description: 'A comprehensive oracle service providing price feeds, randomness, weather data, and custom attestations for smart contracts.',
  path: '/blockchain/oracle',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
