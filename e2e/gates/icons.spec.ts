import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { inflateSync } from 'node:zlib'
import { join } from 'node:path'
import { ROOT } from './export'

/**
 * The mark has to be VISIBLE on the surface its own manifest declares.
 *
 * This defect is invisible on a dark page and obvious only on a light one, so
 * nothing that renders the site can catch it — the icons are never drawn by a
 * page. It shipped: `scripts/gen-favicons.mjs` composites the mark in headless
 * Chromium, the mark's ink is scheme-conditional (`#000` by default, `#fff`
 * under `prefers-color-scheme: dark`), headless Chromium reports `light`, and
 * the page it painted on was `background:#000`. Every raster came out a
 * UNIFORM opaque black tile — 36,864 of 36,864 pixels `0,0,0,255` at 192px —
 * and Android drew a black square on the home screen. A build, a typecheck and
 * every other gate were green throughout.
 *
 * So the assertion is on PIXELS, and the subject is the committed bytes rather
 * than a screenshot of them. Its siblings read `out/` because their subject is
 * compiled from source and the two can disagree; a PNG in `public/` is copied
 * into the export verbatim, so `public/` IS what ships and reading it lets this
 * gate fail on a clean checkout instead of after 883 pages have rendered.
 *
 * WHICH icons is read off the manifest, never listed here. The manifest is the
 * thing that declares a surface and a purpose for each file, so a gate that
 * named its own files could pass while the manifest advertised something else.
 */

/** WCAG 1.4.11: a graphical object needs 3:1 against what it sits on. */
const CONTRAST = 3

/**
 * The mark covers about two thirds of its box full-bleed and about a fifth
 * inset into the maskable safe zone. Either way an icon that is ALL ink or NO
 * ink is not a mark, it is a square — which is the whole failure, from both
 * directions at once.
 */
const INK = { min: 0.1, max: 0.9 }

/**
 * The maskable safe zone: a centred circle of diameter 0.8 × the icon. The OS
 * crops to a shape it chooses and only this circle survives every shape.
 */
const SAFE = 0.4

type Icon = { src: string; sizes: string; type?: string; purpose?: string }

const manifest = JSON.parse(
  readFileSync(join(ROOT, 'public', 'site.webmanifest'), 'utf8'),
) as { background_color: string; icons: Icon[] }

/** `#rrggbb` → channels. The manifest states the surface; nothing else may. */
function rgb(hex: string): [number, number, number] {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) throw new Error(`the manifest's background_color is not #rrggbb: ${hex}`)
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function luminance([r, g, b]: number[]): number {
  const f = (v: number) => (v / 255 <= 0.03928 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrast(a: number[], b: number[]): number {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/**
 * PNG → RGBA, from zlib and the spec's five filters.
 *
 * Chromium writes RGB for an opaque screenshot and RGBA for a transparent one,
 * so the reader has to handle both — and the difference between them is itself
 * one of the things under test.
 */
function decode(file: string): { size: number; at: (x: number, y: number) => number[] } {
  const buf = readFileSync(file)
  const idat: Buffer[] = []
  let off = 8
  let w = 0
  let h = 0
  let depth = 0
  let colour = 0
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off)
    const type = buf.toString('ascii', off + 4, off + 8)
    const data = buf.subarray(off + 8, off + 8 + len)
    if (type === 'IHDR') {
      w = data.readUInt32BE(0)
      h = data.readUInt32BE(4)
      depth = data[8]
      colour = data[9]
      if (data[12] !== 0) throw new Error(`${file} is interlaced`)
    } else if (type === 'IDAT') idat.push(data)
    else if (type === 'IEND') break
    off += 12 + len
  }
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colour as 0 | 2 | 4 | 6]
  if (depth !== 8 || !channels) throw new Error(`${file}: depth ${depth}, colour type ${colour}`)
  if (w !== h) throw new Error(`${file} is ${w}x${h}, and an icon is square`)

  const raw = inflateSync(Buffer.concat(idat))
  const stride = w * channels
  const px = Buffer.alloc(h * stride)
  for (let y = 0; y < h; y++) {
    const filter = raw[y * (stride + 1)]
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1))
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? px[y * stride + i - channels] : 0
      const b = y > 0 ? px[(y - 1) * stride + i] : 0
      const c = i >= channels && y > 0 ? px[(y - 1) * stride + i - channels] : 0
      let v = line[i]
      if (filter === 1) v += a
      else if (filter === 2) v += b
      else if (filter === 3) v += (a + b) >> 1
      else if (filter === 4) {
        const p = a + b - c
        const [pa, pb, pc] = [Math.abs(p - a), Math.abs(p - b), Math.abs(p - c)]
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c
      }
      px[y * stride + i] = v & 255
    }
  }
  const at = (x: number, y: number) => {
    const i = y * stride + x * channels
    if (channels === 4) return [px[i], px[i + 1], px[i + 2], px[i + 3]]
    if (channels === 3) return [px[i], px[i + 1], px[i + 2], 255]
    if (channels === 2) return [px[i], px[i], px[i], px[i + 1]]
    return [px[i], px[i], px[i], 255]
  }
  return { size: w, at }
}

/**
 * What the icon looks like once it is standing on `surface`.
 *
 * Alpha is not decoration here: a black mark at full alpha and a white mark at
 * zero alpha are both invisible on black, and only compositing tells them
 * apart. Every measurement below is of the composited result, because that is
 * what a person sees.
 */
function measure(file: string, surface: number[]) {
  const { size, at } = decode(file)
  const centre = (size - 1) / 2
  let ink = 0
  let opaque = 0
  let clear = 0
  let strayInk = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const p = at(x, y)
      if (p[3] === 255) opaque++
      else if (p[3] === 0) clear++
      const on = [0, 1, 2].map((i) => (p[i] * p[3] + surface[i] * (255 - p[3])) / 255)
      if (contrast(on, surface) >= CONTRAST) {
        ink++
        if (Math.hypot(x - centre, y - centre) > SAFE * size) strayInk++
      }
    }
  }
  const area = size * size
  return { size, ink: ink / area, opaque: opaque / area, clear: clear / area, strayInk }
}

const pngs = manifest.icons.filter((icon) => icon.src.endsWith('.png'))
const surface = rgb(manifest.background_color)

test('the manifest offers a maskable icon, and never the same file for both purposes', () => {
  const maskable = pngs.filter((i) => (i.purpose ?? '').split(/\s+/).includes('maskable'))
  expect(maskable.length, 'no maskable icon, so the launcher composites a transparent one').toBeGreaterThan(0)
  for (const icon of maskable) {
    const others = pngs.filter((i) => i !== icon && i.src === icon.src)
    expect(
      others.map((i) => i.purpose),
      `${icon.src} is offered as maskable AND as something else; one file cannot be both`,
    ).toEqual([])
    expect(icon.purpose!.trim(), `${icon.src} declares extra purposes beside maskable`).toBe('maskable')
  }
})

for (const icon of pngs) {
  const maskable = (icon.purpose ?? '').split(/\s+/).includes('maskable')

  test(`${icon.src} reads as a mark on ${maskable ? 'its own ground' : manifest.background_color}`, () => {
    const m = measure(join(ROOT, 'public', icon.src), surface)

    expect(`${m.size}x${m.size}`, `${icon.src} is not the size the manifest declares`).toBe(icon.sizes)

    // The bug, stated as a number. A uniform tile has no ink against the
    // surface it is declared against; an over-inked one has nothing but.
    expect(m.ink, `${icon.src} is ${(100 * m.ink).toFixed(1)}% ink — a square, not a mark`).toBeGreaterThan(INK.min)
    expect(m.ink, `${icon.src} is ${(100 * m.ink).toFixed(1)}% ink — a square, not a mark`).toBeLessThan(INK.max)

    if (maskable) {
      // The OS crops this one, so it supplies its own ground and keeps the mark
      // where every crop shape can reach it.
      expect(m.opaque, `${icon.src} is maskable and lets the launcher pick its ground`).toBe(1)
      expect(m.strayInk, `${icon.src} puts ink outside the safe circle, where a crop eats it`).toBe(0)
    } else {
      // Transparent by design: it stands on the host's surface, not on one of
      // its own. Assert the property, not a corner pixel — the mark's own
      // corners are ink, and a gate that named (0,0) would be measuring the
      // glyph's geometry rather than its ground.
      expect(m.clear, `${icon.src} is offered as "any" and carries a ground of its own`).toBeGreaterThan(0.1)
    }
  })
}
