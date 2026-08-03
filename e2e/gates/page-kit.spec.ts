import { test, expect } from '@playwright/test'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { kit, OUT, read, requireExport, serveExport } from './export'

/**
 * The page kit's title, in the export that ships.
 *
 * gui reads a bare number as PIXELS — on its `lineHeight` prop and inside its
 * `style` escape hatch alike — so `lineHeight={1.1}`, which reads as a ratio,
 * shipped `line-height: 1.1px` and drew every line of a wrapped title on one
 * baseline. It was live on hanzo.ai/api, and it survived review because a title
 * that fits on one line hides it completely: invisible at 1280px, unreadable at
 * 390px, and worse the longer the title.
 *
 * Two gates, because either alone is weak. The first is the defect itself,
 * stated as the value: no line-height in the shipped CSS or markup may be a
 * length shorter than a line. The second measures the box a browser actually
 * draws, which is what a reader loses.
 */

/**
 * The pages built on the kit — DERIVED from the tree, never listed.
 *
 * It was a literal of five routes, and the page with the longest title on the
 * site (the worst case for a collapsed line height, and the newest kit page)
 * was not one of them. A gate that names its subjects measures the ones
 * somebody remembered to add, which is the opposite of what a gate is for.
 */
const KIT = kit()

/** Every `line-height:<value>` in a file, declaration by declaration. */
function lineHeights(css: string): string[] {
  return [...css.matchAll(/line-height\s*:\s*([^;}"']+)/gi)].map((m) => m[1].trim())
}

function shipped(): { file: string; value: string }[] {
  requireExport()
  const files: string[] = []
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.(css|html)$/.test(e.name)) files.push(p)
    }
  }
  walk(OUT)
  return files.flatMap((f) =>
    lineHeights(readFileSync(f, 'utf8')).map((value) => ({ file: f.replace(OUT + '/', ''), value })),
  )
}

test('the kit pages are derived from the tree, and the derivation finds them', () => {
  // The floor under every assertion below. Each one loops over KIT, and a loop
  // over an empty list passes — so a derivation that silently finds nothing
  // would not fail a gate, it would switch all four of them off and report
  // green. The five that were the hand-written list are the pin.
  for (const route of ['/api', '/cookies', '/customers', '/learn', '/research']) {
    expect(KIT, `${route} is built on the kit and must be measured`).toContain(route)
  }
})

test('no line-height in the export is a length shorter than a line', () => {
  // A ratio (`1.1`), a keyword (`normal`), a var() or a real length are all
  // fine. `1.1px` is the defect, and so is any absolute length small enough to
  // collapse a line — the exact failure, stated as a value rather than as a
  // string match on the one number that happened to be wrong.
  const collapsed = shipped().filter(({ value }) => {
    const px = /^(-?[\d.]+)px$/.exec(value)
    return px !== null && Number(px[1]) < 4
  })
  expect(
    collapsed,
    `line-height declarations that collapse a line:\n${collapsed.map((c) => `${c.file}: ${c.value}`).join('\n')}`,
  ).toEqual([])
})

test('the kit hero title carries a unitless ratio', () => {
  const missing = KIT.filter((route) => {
    const h1 = /<h1[^>]*>/.exec(read(route.slice(1) + '.html'))?.[0] ?? ''
    // Unitless: a bare number, which is what CSS calls a ratio.
    return !/line-height:\s*[\d.]+\s*[;"]/.test(h1)
  })
  expect(missing, `kit pages whose <h1> has no unitless line-height: ${missing.join(', ')}`).toEqual([])
})

test('every kit hero title occupies at least one full line', async ({ page }) => {
  const server = await serveExport()
  try {
    const bad: string[] = []
    // 390px is where a title wraps and the defect becomes visible; 1280px is
    // where it hid. Both, so a fix that only holds on one is not enough.
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      for (const route of KIT) {
        await page.goto(server.url + route, { waitUntil: 'load' })
        const h1 = page.locator('h1').first()
        await expect(h1).toBeVisible()
        const box = await h1.evaluate((el) => {
          const s = getComputedStyle(el)
          return {
            lineHeight: parseFloat(s.lineHeight),
            fontSize: parseFloat(s.fontSize),
            height: el.getBoundingClientRect().height,
          }
        })
        // A line box is never shorter than the type in it.
        if (!(box.lineHeight >= box.fontSize)) {
          bad.push(`${width}px ${route}: line-height ${box.lineHeight}px < font-size ${box.fontSize}px`)
        }
        if (!(box.height >= box.fontSize)) {
          bad.push(`${width}px ${route}: h1 box ${box.height}px < one line (${box.fontSize}px)`)
        }
      }
    }
    expect(bad, `collapsed titles:\n${bad.join('\n')}`).toEqual([])
  } finally {
    await server.close()
  }
})

/**
 * Geist, and no serif fallback.
 *
 * The AML console shipped with no font-family at all and browsers fell back to
 * Times. The site binds next/font's subsetted, self-hosted Geist to
 * @hanzo/design's `--font-sans` / `--font-mono` in one place, and this is what
 * says that binding still resolves in the export rather than in the source.
 */
test('the type stack is Geist, and nothing in it falls back to a serif', async ({ page }) => {
  const server = await serveExport()
  try {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto(server.url + '/api', { waitUntil: 'load' })
    const stack = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement)
      const h1 = document.querySelector('h1')
      return {
        sans: root.getPropertyValue('--font-sans'),
        mono: root.getPropertyValue('--font-mono'),
        title: h1 ? getComputedStyle(h1).fontFamily : '',
      }
    })
    expect(stack.sans.toLowerCase(), '--font-sans must name Geist').toContain('geist')
    expect(stack.mono.toLowerCase(), '--font-mono must name Geist Mono').toContain('geist')
    expect(stack.title.toLowerCase(), 'the page title must resolve to the Geist stack').toContain('geist')
    for (const [name, value] of Object.entries(stack)) {
      // `sans-serif` and `ui-sans-serif` are sans faces and are fine. A family
      // that is exactly `serif`, or Times, is the fallback the AML console
      // shipped by accident.
      const families = value.toLowerCase().split(',').map((f) => f.trim().replace(/^['"]|['"]$/g, ''))
      expect(families, `${name} must not fall back to a serif`).not.toContain('serif')
      for (const family of families) {
        expect(family, `${name} must not fall back to Times`).not.toContain('times')
      }
    }
  } finally {
    await server.close()
  }
})
