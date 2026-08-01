import type { MetadataRoute } from 'next'
import { readdirSync, type Dirent } from 'node:fs'
import { join } from 'node:path'
import { indexable } from '@/lib/publish'

// Static export: emits /sitemap.xml at build by walking the App Router tree.
export const dynamic = 'force-static'

const BASE = 'https://hanzo.ai'
const PAGE = /^page\.(tsx|ts|jsx|js|mdx)$/

function walk(dir: string, seg: string[] = []): string[] {
  const routes: string[] = []
  // Encoding is explicit on BOTH reads. Without it @types/node resolves the Buffer
  // overloads — Dirent<NonSharedBuffer> and Buffer[] — and every `.name.startsWith`
  // below stops type-checking against a string.
  let entries: Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true, encoding: 'utf8' })
  } catch {
    return routes
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue
    const name = e.name
    if (name.startsWith('[') || name.startsWith('_')) continue // skip dynamic + private dirs
    // Route groups like (marketing) contribute no URL segment.
    const isGroup = name.startsWith('(') && name.endsWith(')')
    const nextSeg = isGroup ? seg : [...seg, name]
    const child = join(dir, name)
    let files: string[] = []
    try {
      files = readdirSync(child, { encoding: 'utf8' })
    } catch {}
    if (files.some((f) => PAGE.test(f))) routes.push('/' + nextSeg.join('/'))
    routes.push(...walk(child, nextSeg))
  }
  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), 'app')
  const routes = new Set<string>(['/'])
  for (const r of walk(appDir)) {
    const route = r === '' ? '/' : r
    // The walk finds every page in the tree, including the ones nothing links
    // to. Whether a route is PUBLISHED is a separate question, answered in one
    // place: lib/publish.
    if (!indexable(route)) continue
    routes.add(route)
  }
  return [...routes].sort().map((route) => ({
    url: BASE + (route === '/' ? '' : route),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
