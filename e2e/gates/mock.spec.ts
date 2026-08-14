import { test, expect } from '@playwright/test'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { APP, OUT, ROOT, requireExport } from './export'

/**
 * Every mockup film a page asks for is in the export.
 *
 * The films are rendered by film/mock and committed, so a build is hermetic:
 * `pnpm build` copies public/ and never runs a renderer. That is exactly the
 * failure this gate exists for. A page can name a slug whose three files were
 * never rendered, or were rendered into public/ and never committed, and
 * nothing anywhere complains — Next does not resolve a <video src> at build
 * time, a typecheck cannot see inside a string, and the page ships with a
 * poster that 404s and a player with nothing to play. The generator running
 * green on the machine that wrote the page proves nothing about the export.
 *
 * So the wiring is read out of the app source, not from a list kept here. A
 * list would carry the same gap as the thing it is checking: add a mockup to a
 * page, forget the list, and the gate passes while the page is broken.
 */

/**
 * The slugs `/cloud/<slug>` renders a film for.
 *
 * That route wires its mockup from a variable — `<Mockup slug={primitive.slug}>`
 * — so the source scan below cannot see it, and one page there stands for 42
 * products. It selects them the way `cloudPrimitiveSlugs` does, out of the same
 * catalog the route reads, so a product that gains a `/cloud/` href is covered
 * here without this file being edited.
 */
function generated(): string[] {
  const path = join(ROOT, 'lib/data/catalog.json')
  const { products } = JSON.parse(readFileSync(path, 'utf8')) as {
    products: { slug: string; href: string }[]
  }
  return products.filter((p) => p.href.startsWith('/cloud/')).map((p) => p.slug)
}

/** Every slug a page wires a mockup to, read from the app source. */
function wired(): string[] {
  const slugs = new Set<string>(generated())
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(path)
      } else if (entry.name.endsWith('.tsx')) {
        for (const [, slug] of readFileSync(path, 'utf8').matchAll(
          /mockup=\{\{[^}]*?slug:\s*'([^']+)'/g,
        )) {
          slugs.add(slug)
        }
      }
    }
  }
  walk(APP)
  return [...slugs].sort()
}

/** The three files one prefix resolves to, the shape @hanzo/frame uses. */
const parts = (slug: string) => [
  `${slug}-wide.mp4`,
  `${slug}-wide-first.jpg`,
  `${slug}-wide-last.jpg`,
]

test('every wired mockup ships all three of its files', () => {
  requireExport()
  const slugs = wired()
  expect(slugs.length, 'no page wires a mockup — this gate is watching nothing').toBeGreaterThan(0)

  const missing = slugs.flatMap((slug) =>
    parts(slug)
      .filter((file) => !existsSync(join(OUT, 'mock', file)))
      .map((file) => `mock/${file}`),
  )
  expect(missing, `wired: ${slugs.join(', ')}`).toEqual([])
})

test('no shipped mockup file is a stub', () => {
  requireExport()
  // A truncated or zero-byte copy resolves, plays nothing, and looks like a
  // network fault rather than a missing asset.
  const small = wired()
    .flatMap(parts)
    .map((file) => join(OUT, 'mock', file))
    .filter((path) => existsSync(path) && statSync(path).size < 4096)
  expect(small).toEqual([])
})
