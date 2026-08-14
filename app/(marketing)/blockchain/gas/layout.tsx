import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Gas Manager',
  description: 'Paymaster-as-a-Service for account abstraction. Sponsor gas fees for your users, set spending policies, and create seamless gasless experiences across chains.',
  path: '/blockchain/gas',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
