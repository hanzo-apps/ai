import { pageMeta } from '@/lib/page-meta'
import { MODELS_PHRASE } from '@/lib/data/model-count'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: `One API, ${MODELS_PHRASE}`,
  description: 'Send a request to api.hanzo.ai and name a model. Change the name and the same request reaches a different one. One key, one bill, and a spend ceiling you set.',
  path: '/llm',
})
