import { createServer, type Server } from 'node:http'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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

export const OUT = join(root(), 'out')

export function requireExport(): string {
  if (!existsSync(join(OUT, 'index.html'))) {
    throw new Error(`no static export at ${OUT}: run \`pnpm build\` before \`pnpm test\``)
  }
  return OUT
}

/** Read one exported file, failing loudly rather than returning empty. */
export function read(relative: string): string {
  const path = join(requireExport(), relative)
  if (!existsSync(path)) throw new Error(`the export has no ${relative}`)
  return readFileSync(path, 'utf8')
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
