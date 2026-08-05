import type { Metadata } from 'next'
import { ogImages, twitterImages } from '@/lib/constants/og'

export const metadata: Metadata = {
  title: 'Integrations — Hanzo AI',
  description:
    'Use Hanzo AI with any SDK, framework, or language. OpenAI SDK, LangChain, LlamaIndex, Vercel AI SDK, AutoGen, CrewAI, DSPy, Docker, Kubernetes, Python, TypeScript, Go, Rust, and more.',
  openGraph: {
    title: 'Integrations — Hanzo AI',
    description:
      'Use Hanzo AI with any SDK, framework, or language. OpenAI SDK, LangChain, Vercel AI SDK, AutoGen, and more.',
    url: 'https://hanzo.ai/integrations',
    siteName: 'Hanzo AI',
    type: 'website',
    images: ogImages('Hanzo AI Integrations'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations — Hanzo AI',
    description: 'Use Hanzo AI with any SDK, framework, or language.',
    images: twitterImages,
  },
}

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
