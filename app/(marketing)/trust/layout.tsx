import type { Metadata } from 'next'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede.
//
// It used to name the certifications we do NOT hold, on the theory that someone
// searching "hanzo soc 2" is asking exactly that and deserves the answer without
// a click. True, and it put a sentence listing three absences directly under our
// name in the results. The same reader is served better by what IS the case:
// controls built to the framework, audited continually, report on request.
export const metadata: Metadata = pageMeta({
  title: 'Security you can read',
  description:
    'The controls behind the product — how you get in, what a credential reaches, what is logged, and where keys live. Continual internal audits, with the report on request.',
  path: '/trust',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
