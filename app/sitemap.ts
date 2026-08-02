import type { MetadataRoute } from 'next'
import { join } from 'node:path'
import { indexable } from '@/lib/publish'
import { routes } from '@/lib/routes'

// Static export: emits /sitemap.xml at build by walking the App Router tree.
export const dynamic = 'force-static'

const BASE = 'https://hanzo.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  // The walk finds every page in the tree, including the ones nothing links to
  // — which is what a sitemap is for, and why "it is not in the nav" was never
  // a gate. Whether a route may be PUBLISHED is a separate question with one
  // answer, in lib/publish.
  return routes(join(process.cwd(), 'app'))
    .map(({ path }) => path)
    .filter(indexable)
    .map((route) => ({
      url: BASE + (route === '/' ? '' : route),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.7,
    }))
}
