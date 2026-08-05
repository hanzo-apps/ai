import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

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
    images: ogImages('Hanzo True Savings'),
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
