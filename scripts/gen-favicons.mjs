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
//
// THE MARK IS DRAWN IN ITS DARK-SCHEME INK, ALWAYS.
//
// public/favicon.svg carries one layer whose ink flips with the scheme: `#000`
// by default, `#fff` under `prefers-color-scheme: dark`. Headless Chromium
// reports `light`, so every raster this script wrote came out BLACK on the
// black page it painted them on — a uniform opaque tile, 36,864 of 36,864
// pixels `0,0,0,255` at 192px. Both manifests declare
// `background_color: "#000000"`, so the mark was invisible against the surface
// its own manifest asks for, and Android drew a solid black square on the home
// screen. `emulateMedia` is what settles the scheme, and it has to be said out
// loud: the default is a colour nobody chose.
//
// GROUND AND INSET ARE THE TWO FACTS THAT SEPARATE THE PURPOSES.
//
// A `purpose: "any"` icon is used as it is, so it carries NO ground and stands
// on whatever surface the host draws — that is the whole reason it is
// transparent. A `purpose: "maskable"` icon is cropped by the OS to a platform
// shape, so it must be opaque and full-bleed with the mark inside the safe
// zone. One file cannot be both: transparent bytes under `maskable` get
// composited onto a ground the launcher picks. So the maskable pair is RENDERED
// SEPARATELY, on the ground the manifest declares. Never point both purposes at
// one file.

import { chromium } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const pub = join(root, 'public')

// Inner paths of the canonical mark (viewBox 0 0 67 67), so every raster is a
// faithful scale of the vector rather than a re-rasterized bitmap.
const svg = readFileSync(join(pub, 'favicon.svg'), 'utf8')
const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').trim()

// The opaque rasters stand on the surface the manifest promises, read from the
// manifest so the two cannot drift into the mismatch this file exists to fix.
const GROUND = JSON.parse(readFileSync(join(pub, 'site.webmanifest'), 'utf8')).background_color

// The maskable safe zone is a centred circle of diameter 0.8 × the icon. Our
// mark is a square whose four CORNERS are ink — the H's corner blocks reach
// (0,0) — so it has to fit the square INSCRIBED in that circle, not the 80% box
// a rounded-rect mask would allow. Any larger and a circular launcher bites the
// corners off the glyph.
const SAFE = 0.8 / Math.SQRT2

// name -> edge length (px), the ground it stands on, and the fraction of the
// canvas the mark fills. No ground means transparent: `purpose: "any"`.
const targets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48.png', 48], // intermediate for the .ico, removed afterwards
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  // iOS composites a transparent home-screen icon onto black and rounds the
  // corners itself, so this one is opaque and full-bleed by construction.
  ['apple-touch-icon.png', 180, GROUND],
  ['icon-maskable-192.png', 192, GROUND, SAFE],
  ['icon-maskable-512.png', 512, GROUND, SAFE],
]

const browser = await chromium.launch()
const page = await browser.newPage({ deviceScaleFactor: 1 })
await page.emulateMedia({ colorScheme: 'dark' })
for (const [name, size, ground, fit = 1] of targets) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;padding:0}` +
      `html,body{width:${size}px;height:${size}px}` +
      `body{display:flex;align-items:center;justify-content:center${ground ? `;background:${ground}` : ''}}` +
      `svg{display:block}</style></head><body>` +
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 67" width="${size * fit}" height="${size * fit}">${inner}</svg>` +
      `</body></html>`,
    { waitUntil: 'load' },
  )
  await page.screenshot({
    path: join(pub, name),
    clip: { x: 0, y: 0, width: size, height: size },
    omitBackground: !ground,
  })
  console.log(`rendered ${name} (${size}x${size}${ground ? ` on ${ground}` : ', transparent'})`)
}
await browser.close()
console.log('done — now run: python3 scripts/gen-favicon-ico.py')
