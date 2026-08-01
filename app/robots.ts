import type { MetadataRoute } from 'next'
import { WITHHELD } from '@/lib/publish'

// Static export: emits /robots.txt at build.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    // A robots.txt path is a PREFIX, so `/account` covers `/account`,
    // `/account/` and everything beneath it — which the previous `/account/`
    // did not, and `/login` was not listed at all. The list is lib/publish's,
    // so a route withheld from the sitemap is disallowed here by construction
    // rather than by someone remembering to write it in a second place.
    rules: [{ userAgent: '*', allow: '/', disallow: [...WITHHELD] }],
    sitemap: 'https://hanzo.ai/sitemap.xml',
    host: 'https://hanzo.ai',
  }
}
