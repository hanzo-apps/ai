import type { MetadataRoute } from 'next'

// Static export: emits /robots.txt at build.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/auth/', '/account/'] }],
    sitemap: 'https://hanzo.ai/sitemap.xml',
    host: 'https://hanzo.ai',
  }
}
