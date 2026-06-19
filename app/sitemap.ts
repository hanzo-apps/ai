import type { MetadataRoute } from 'next'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

// Static export: emits /sitemap.xml at build by walking the App Router tree.
export const dynamic = 'force-static'

const BASE = 'https://hanzo.ai'
const PAGE = /^page\.(tsx|ts|jsx|js|mdx)$/
// Don't index private/auth surfaces.
const EXCLUDE = ['/auth', '/account', '/login']

function walk(dir: string, seg: string[] = []): string[] {
  const routes: string[] = []
  let entries: ReturnType<typeof readdirSync>
  try {
    entries = readdirSync(dir, { withFileTypes: true })
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
      files = readdirSync(child)
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
    if (EXCLUDE.some((p) => route === p || route.startsWith(p + '/'))) continue
    routes.add(route)
  }
  return [...routes].sort().map((route) => ({
    url: BASE + (route === '/' ? '' : route),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
