// Reproducible favicon generator.
//
// Renders the canonical Hanzo mark (public/favicon.svg, monochrome ▼/H) into the
// full modern favicon set at native resolution via headless Chromium, then
// hands the 16/32/48 rasters to a tiny Pillow step (scripts/gen-favicon-ico.py)
// that assembles the multi-resolution favicon.ico.
//
//   node scripts/gen-favicons.mjs
//
// Vector source is the single source of truth — never hand-edit the PNGs.

import { chromium } from '@playwright/test'
import { readFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const pub = join(root, 'public')

// Inner paths of the canonical mark (viewBox 0 0 67 67), so every raster is a
// faithful scale of the vector rather than a re-rasterized bitmap.
const svg = readFileSync(join(pub, 'favicon.svg'), 'utf8')
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').trim()

const mark = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" width="${size}" height="${size}">${inner}</svg>`

// name -> edge length (px). Square mark; black bg is intentional (Apple masks corners).
const targets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['favicon-48.png', 48], // intermediate for the .ico, removed afterwards
]

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })
for (const [name, size] of targets) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}html,body{width:${size}px;height:${size}px;background:#000}svg{display:block}</style></head><body>${mark(size)}</body></html>`,
    { waitUntil: 'load' },
  )
  await page.screenshot({ path: join(pub, name), clip: { x: 0, y: 0, width: size, height: size } })
  console.log(`rendered ${name} (${size}x${size})`)
}
await browser.close()
console.log('done — now run: python3 scripts/gen-favicon-ico.py')
