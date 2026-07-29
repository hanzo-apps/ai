import type { Metadata } from 'next'

const TITLE = 'True Savings — Hanzo'
const DESCRIPTION =
  'An interactive operating-cost model for the assembly tax: price the SaaS, cloud and integration engineering a company can eliminate by consolidating 107 vendors onto one platform. Two-axis grading separates coverage from evidence, every assumption is editable, and nothing is presented as a quote.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.ai/calculator',
    siteName: 'Hanzo AI',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hanzo True Savings' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
