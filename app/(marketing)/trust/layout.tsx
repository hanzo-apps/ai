import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede.
//
// The description names the certifications we do NOT hold, on purpose. Someone
// searching "hanzo soc 2" is asking exactly that question, and a search result
// that answers it is better for both of us than one they have to click to find
// out. It is also the wording that cannot rot into an implied claim.
export const metadata: Metadata = pageMeta({
  title: 'The controls, not a badge',
  description:
    'Hanzo does not hold SOC 2, ISO 27001, or FedRAMP. This page names the controls behind the product instead — how you get in, what a credential reaches, what is logged, and where keys live.',
  path: '/trust',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
