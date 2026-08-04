import type { MetadataRoute } from 'next'
import { DISALLOW } from '@/lib/publish'

// Static export: emits /robots.txt at build.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    // DISALLOW, not the route prefixes: lib/publish turns one prefix into the
    // pair of RFC 9309 patterns that mean it, and this surface cannot spell a
    // bare prefix. `Disallow: /auth` reads as a string and takes /authz with
    // it; `/auth$` + `/auth/` is the same segment written in the crawler's own
    // grammar.
    //
    // Private routes only. An unapproved route is deliberately fetchable, so
    // that the `noindex` it carries is read — a Disallow here would be the one
    // thing that prevents it.
    rules: [{ userAgent: '*', allow: '/', disallow: [...DISALLOW] }],
    sitemap: 'https://hanzo.ai/sitemap.xml',
    host: 'https://hanzo.ai',
  }
}
