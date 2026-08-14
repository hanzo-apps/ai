import { pageMeta } from '@/lib/page-meta'
export { default } from '@/lib/meta-layout'

export const metadata = pageMeta({
  title: 'Hanzo Vector — a database for embeddings',
  description: 'Store embeddings and get back the ones nearest a query. Payload filters are applied inside the search, so a filtered query still returns a full page of results. Dense and sparse together, three quantization modes, shards and snapshots.',
  path: '/vector',
})
