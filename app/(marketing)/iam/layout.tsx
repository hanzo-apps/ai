import type { Metadata } from 'next'
import { goImport } from '@/lib/go-modules'
import { pageMeta } from '@/lib/page-meta'

// The page is 'use client', which cannot export metadata — so its title and
// description live here, beside it. Both are the page's OWN words: the title is
// its <h1> and the description its lede, so a tab, a search result and the page
// itself say the same thing.
export const metadata: Metadata = pageMeta({
  title: 'Hanzo IAM',
  description: 'Identity and access management for every service. OIDC SSO, fine-grained RBAC, organization scoping, and audit logs.',
  path: '/iam',
  other: goImport('iam'),
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
