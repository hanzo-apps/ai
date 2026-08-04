import { readdirSync, type Dirent } from 'node:fs'
import { join } from 'node:path'

/**
 * The two trees a route lives in, read as routes.
 *
 * `routes()` reads the App Router tree — what the site ANSWERS. `shipped()`
 * reads `out/` — what the export SHIPS. They are separate questions and the
 * gap between them is the interesting one, so both walks live here, once,
 * because the callers drift the moment there are two of them: `app/sitemap.ts`
 * OFFERS what the tree contains, and a gate MEASURES what a hand-written list
 * in a spec told it about. A page the walk finds and the list has never heard
 * of is a page that ships unmeasured — which is how the longest title on the
 * site came to be the one title no gate looked at. Derive the list; do not
 * maintain it.
 *
 * Build-time only: they read the filesystem, so nothing that reaches a client
 * bundle may import this.
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

/** A route the export ships a page for, and the file that answers it. */
export interface Page {
  /** The URL path the file is served at, always leading-slash. */
  route: string
  /** The `.html` file in the export. */
  file: string
}

/**
 * Every route the export ships a page for.
 *
 * `/404` and `/_not-found` are Next's own pages rather than routes of ours —
 * they carry a `noindex` the framework writes — and the App Router skips
 * `_`-prefixed directories, so both are out. A file and a directory of the
 * same name both exist (`out/api.html` beside `out/api/`), which is why the
 * route comes from the file and not from the directory walk.
 */
export function shipped(outDir: string): Page[] {
  const found: Page[] = []
  const walk = (dir: string, seg: string[]) => {
    for (const e of readdir(dir)) {
      const path = join(dir, e.name)
      if (e.isDirectory()) {
        if (!e.name.startsWith('_')) walk(path, [...seg, e.name])
        continue
      }
      if (!e.name.endsWith('.html')) continue
      const name = e.name.slice(0, -'.html'.length)
      if (name.startsWith('_') || name === '404') continue
      const route = name === 'index' ? '/' + seg.join('/') : '/' + [...seg, name].join('/')
      found.push({ route: route === '/' ? '/' : route.replace(/\/$/, ''), file: path })
    }
  }
  walk(outDir, [])
  return found.sort((a, b) => (a.route < b.route ? -1 : a.route > b.route ? 1 : 0))
}

/**
 * The words an exported page renders, without markup.
 *
 * Scoped to the page's own `<main>` — the innermost, since the kit renders one
 * inside the layout's — because the shell's nav and footer are the same on
 * every page and would drown the thing being measured.
 *
 * Attribute VALUES go before the tags do. Stripping `<[^>]+>` is not a parser:
 * any attribute holding a `>` ends the match early and the rest of it lands in
 * the "words", which for a measurement inflates a page that has nothing on it
 * into one that looks like it has something. Removing quoted values first —
 * every attribute Next emits is double-quoted — leaves that unreachable.
 *
 * This is a measurement over the whole export, cheap enough to run on every
 * page. Asserting what one page SAYS is a different job with a different
 * subject: the browser's `innerText`, which is what a reader gets.
 */
export function copy(html: string): string {
  const parts = html.split('<main')
  const inner = parts[parts.length - 1]
  const end = inner.indexOf('</main>')
  if (parts.length < 2 || end < 0) return ''
  return inner
    .slice(0, end)
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/="[^"]*"/g, '=""')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
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
