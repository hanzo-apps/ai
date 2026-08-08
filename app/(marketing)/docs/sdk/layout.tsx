import { pageMeta } from '@/lib/page-meta'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'One API. Every language.',
  description: 'The Hanzo API is drop-in compatible with both the OpenAI SDK and the Anthropic SDK. Keep the client you already use, change one line, the base URL.',
  path: '/docs/sdk',
})
