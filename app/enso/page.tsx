import type { Metadata } from 'next'
import EnsoLanding from '@/components/enso/EnsoLanding'
import { fetchModels } from '@/lib/models'

// Hanzo Enso — the proprietary model-orchestration product. Lives at the app ROOT
// (outside the (marketing) route group) so only the root layout wraps it; it ships
// the shared site chrome, like the apex
// home and the apex root. Served at /enso on both hanzo.ai and cloud.hanzo.ai.

const TITLE = 'Enso — the intelligence layer of Hanzo OS'
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

export default async function EnsoRoutePage() {
  /* Same source as the homepage strip, so the two figures cannot disagree. */
  const { total } = await fetchModels()
  const models = total >= 100 ? `${Math.floor(total / 100) * 100}+` : String(total)

  return <EnsoLanding models={models} />
}
