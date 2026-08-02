import { createServer, type Server } from 'node:http'
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { routes, sources } from '../../lib/routes'

/**
 * The real static export, as the tests' subject.
 *
 * These gates assert against `out/` — the bytes that ship — and not against the
 * source that produced them. Both defects they exist to catch were invisible in
 * the source: `lineHeight={1.1}` reads correctly and compiles to
 * `line-height: 1.1px`, and a page absent from the nav is still written into
 * sitemap.xml. A gate that reads the source would have passed on both.
 *
 * There is no fallback if `out/` is missing. A gate that skips itself when its
 * subject is absent is not a gate.
 */
/** The repo root, found rather than counted in `..`s, so moving a spec cannot break it. */
function root(): string {
  let dir = fileURLToPath(new URL('.', import.meta.url))
  for (let up = 0; up < 8; up++) {
    if (existsSync(join(dir, 'package.json'))) return dir
    dir = resolve(dir, '..')
  }
  throw new Error('no package.json above the test file')
}

export const ROOT = root()
export const OUT = join(ROOT, 'out')
export const APP = join(ROOT, 'app')

/**
 * The floor under every gate: the subject is the WHOLE site.
 *
 * `output: export` writing a short `out/` is the failure mode that silently
 * blanks hanzo.ai, and it is worse than a blank page here — every assertion in
 * this suite is of the form "no page in the export does X", and each of those
 * is trivially true of an export with three pages in it. A truncated subject
 * does not fail a gate; it disarms the whole suite and reports green. So the
 * floor is stated once, loudly, and it is the export's own size against the
 * tree that produced it: every addressable route must have shipped a page.
 */
export function requireExport(): string {
  if (!existsSync(join(OUT, 'index.html'))) {
    throw new Error(`no static export at ${OUT}: run \`pnpm build\` before \`pnpm test\``)
  }
  const shipped = new Set(exported().map(({ route }) => route))
  const missing = routes(APP)
    .map(({ path }) => path)
    .filter((route) => !shipped.has(route))
  if (missing.length > 0) {
    throw new Error(
      `the export is short ${missing.length} of ${shipped.size + missing.length} routes, so every ` +
        `gate below it would measure a smaller site and pass: ${missing.slice(0, 10).join(', ')}`,
    )
  }
  return OUT
}

/**
 * The routes built on `components/marketing/page-kit`, read from the tree.
 *
 * Derived, never listed. A spec that names its pages measures the pages
 * somebody remembered, and the page most worth measuring is always the newest
 * one. A route counts when any source in its own directory reaches the kit —
 * `/risk` renders it through `risk-client.tsx`, so scanning `page.tsx` alone
 * would miss it.
 */
export function kit(): string[] {
  return routes(APP)
    .filter((route) => sources(route).some((file) => readFileSync(file, 'utf8').includes(KIT)))
    .map(({ path }) => path)
}

const KIT = 'components/marketing/page-kit'

/** Read one exported file, failing loudly rather than returning empty. */
export function read(relative: string): string {
  const path = join(requireExport(), relative)
  if (!existsSync(path)) throw new Error(`the export has no ${relative}`)
  return readFileSync(path, 'utf8')
}

/**
 * Every route the export ships a page for, with the file that answers it.
 *
 * The subject of a gate over publication is the whole site, not one page a
 * spec happened to name: an assertion pinned to `risk.html` says nothing about
 * the next route added to a list. `/404` and `/_not-found` are Next's own
 * pages rather than routes of ours — they carry a `noindex` the framework
 * writes — and the App Router skips `_`-prefixed directories, so both are out.
 */
export function pages(): { route: string; file: string }[] {
  requireExport()
  return exported()
}

/**
 * The same walk, without the floor above it.
 *
 * `requireExport` measures the export against the tree and so has to read the
 * export — and a floor that called `pages()` would call itself. This is the
 * read; `pages()` is the read WITH the floor, and it is the one every spec uses.
 */
function exported(): { route: string; file: string }[] {
  const found: { route: string; file: string }[] = []
  const walk = (dir: string, seg: string[]) => {
    for (const e of readdirSync(dir, { withFileTypes: true, encoding: 'utf8' })) {
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
  walk(OUT, [])
  return found
}

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
}

/**
 * Serve `out/` on an ephemeral port.
 *
 * The export references `/_next/…` by absolute path, so `file://` cannot load a
 * stylesheet and every computed style would come back from an unstyled
 * document — which is to say the test would measure nothing and pass.
 */
export async function serveExport(): Promise<{ url: string; close: () => Promise<void> }> {
  const root = requireExport()
  const server: Server = createServer((req, res) => {
    const rel = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^(\.\.[/\\])+/, '')
    const base = join(root, rel)
    // `out/api.html` AND `out/api/` both exist — the second holds the nested
    // routes and has no index of its own. Resolving the directory first is how
    // /api came back 404 and every computed style was measured on an unstyled
    // error page, which is a test that measures nothing and passes.
    const file = [base, base + '.html', join(base, 'index.html')].find(
      (p) => existsSync(p) && statSync(p).isFile(),
    )
    if (!file) {
      res.writeHead(404).end('not found')
      return
    }
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  await new Promise<void>((ok) => server.listen(0, '127.0.0.1', ok))
  const { port } = server.address() as { port: number }
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((ok) => server.close(() => ok())),
  }
}
