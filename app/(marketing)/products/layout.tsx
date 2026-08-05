import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Products — Hanzo AI',
  description: 'The complete Hanzo AI product suite: one API for every model, 260+ MCP tools, agent orchestration, vector database, managed cloud, IAM, KMS, and blockchain integration.',
  openGraph: {
    title: 'Products — Hanzo AI',
    description: 'The complete Hanzo AI product suite: one API for every model, 260+ MCP tools, agent orchestration, vector database, managed cloud, IAM, KMS, and blockchain integration.',
    url: 'https://hanzo.ai/products',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Products'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products — Hanzo AI',
    description: 'The complete Hanzo AI product suite: one API for every model, 260+ MCP tools, agent orchestration, vector database, managed cloud, IAM, KMS, and blockchain integration.',
    images: twitterImages,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
