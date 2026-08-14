import { pageMeta } from '@/lib/page-meta'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'A Python SDK for agents that work together',
  description: 'An agent is a model, a set of instructions, and the tools it may call. A network is several of them behind a router that decides which one gets the turn.',
  path: '/agents',
})
