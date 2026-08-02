import { readdirSync, type Dirent } from 'node:fs'
import { join } from 'node:path'

/**
 * The App Router tree, read as routes.
 *
 * One walk, in one place, because the two callers drift the moment there are
 * two of them: `app/sitemap.ts` OFFERS what the tree contains, and a gate
 * MEASURES what a hand-written list in a spec told it about. A page the walk
 * finds and the list has never heard of is a page that ships unmeasured —
 * which is how the longest title on the site came to be the one title no gate
 * looked at. Derive the list; do not maintain it.
 *
 * Build-time only: it reads the source tree, so nothing that reaches a client
 * bundle may import it.
 */

/** A route, and the directory that answers it. */
export interface Route {
  /** The URL path, always leading-slash, `/` for the root. */
  path: string
  /** The directory holding its `page.*` and any component beside it. */
  dir: string
}

const PAGE = /^page\.(tsx|ts|jsx|js|mdx)$/
const SOURCE = /\.(tsx|ts|jsx|js|mdx)$/
const isGroup = (name: string) => name.startsWith('(') && name.endsWith(')')
/** Dynamic segments and private directories are not routes anything can address. */
const skip = (name: string) => name.startsWith('[') || name.startsWith('_')

/** Every route the tree answers, sorted, with the root included. */
export function routes(appDir: string): Route[] {
  const found = new Map<string, Route>()
  const root: Route = { path: '/', dir: appDir }
  found.set('/', root)
  for (const route of walk(appDir, [])) found.set(route.path, route)
  return [...found.values()].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
}

/**
 * The source a route is written in: its own directory's files.
 *
 * Not recursive — a nested directory is its own route. That boundary is what
 * makes "which pages are built on the kit" answerable: `/risk` renders the kit
 * through `risk-client.tsx`, a sibling of `page.tsx`, and a scan that read only
 * `page.tsx` would miss every page written that way.
 */
export function sources(route: Route): string[] {
  return readdir(route.dir)
    .filter((e) => e.isFile() && SOURCE.test(e.name))
    .map((e) => join(route.dir, e.name))
}

/** Missing or unreadable is empty, not a throw: the walk describes what is there. */
function readdir(dir: string): Dirent[] {
  try {
    // Encoding is explicit: without it @types/node resolves the Buffer overloads
    // — Dirent<NonSharedBuffer> — and every `.name` below stops being a string.
    return readdirSync(dir, { withFileTypes: true, encoding: 'utf8' })
  } catch {
    return []
  }
}

function walk(dir: string, seg: string[]): Route[] {
  const out: Route[] = []
  for (const e of readdir(dir)) {
    if (!e.isDirectory() || skip(e.name)) continue
    // A route group — `(marketing)` — contributes no URL segment.
    const next = isGroup(e.name) ? seg : [...seg, e.name]
    const child = join(dir, e.name)
    if (readdir(child).some((f) => f.isFile() && PAGE.test(f.name))) {
      out.push({ path: '/' + next.join('/'), dir: child })
    }
    out.push(...walk(child, next))
  }
  return out
}
