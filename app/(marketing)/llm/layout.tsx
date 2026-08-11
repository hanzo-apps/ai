import { pageMeta } from '@/lib/page-meta'
import { MODELS_PHRASE } from '@/lib/data/model-count'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'Hanzo AI — one API for every model',
  description: `The AI cloud: ${MODELS_PHRASE} behind a single API. OpenAI- and Anthropic-compatible, with observability, cost controls, and rate limits built in.`,
  path: '/llm',
})
