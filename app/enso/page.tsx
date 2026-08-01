import type { Metadata } from 'next'
import EnsoLanding from '@/components/enso/EnsoLanding'

// Hanzo Enso — the proprietary model-orchestration product. Lives at the app ROOT
// (outside the (marketing) route group) so only the root layout wraps it; it ships
// the apex full-width hovering header (LandingNav) + LandingFooter, like the apex
// home and the apex root. Served at /enso on both hanzo.ai and cloud.hanzo.ai.

const TITLE = 'Hanzo Enso — the agentic language model'
const DESCRIPTION =
  'Never compromise on performance. Or price. Enso reads every request and puts the right models on it — frontier accuracy when the work is hard, a fraction of the cost when it isn’t. One OpenAI- and Anthropic-compatible API, in Flash, Pro and Ultra. Proprietary, on Hanzo Cloud; the open-weights Zen family stays free to self-host.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://hanzo.ai/enso' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://hanzo.ai/enso',
    siteName: 'Hanzo',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function EnsoRoutePage() {
  return <EnsoLanding />
}
