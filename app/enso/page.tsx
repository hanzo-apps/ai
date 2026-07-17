import type { Metadata } from 'next'
import EnsoLanding from '@/components/enso/EnsoLanding'

// Hanzo Enso — the proprietary model-orchestration product. Lives at the app ROOT
// (outside the (marketing) route group) so only the root layout wraps it; it ships
// the apex full-width hovering header (LandingNav) + LandingFooter, like the apex
// home and cloud-site. Served at /enso on both hanzo.ai and cloud.hanzo.ai.

const TITLE = 'Hanzo Enso — one model to command them all'
const DESCRIPTION =
  'Enso orchestrates the world’s best models into one OpenAI-compatible API — Flash, Pro, and Ultra presets. A multi-agent system delivered as one model. Proprietary, available only on Hanzo Cloud; the open-weights Zen family stays free to self-host.'

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
