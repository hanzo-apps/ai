import { test, expect } from '@playwright/test'
import { serveExport } from './export'

/**
 * Focus on the front door is ONE ring, and it arrives.
 *
 * The bar is 576px of perimeter at the bottom of every page, so anything drawn
 * around it is drawn across the fold. It has carried three focus signals at once
 * — an outline at an offset, the spectrum band lifting, and the border
 * brightening — which is not a ring but a flare, and the outline arrived WHITE:
 * `outline-color`'s initial value is `currentColor`, Tailwind's
 * `transition-colors` animates outline-color, so a control wearing that utility
 * interpolates its ring from alpha 1.0 down to its real alpha. Measured on the
 * composer's [+] before the fix: 1.0 in the first frame, 0.72 settled.
 *
 * None of that is visible in a build, a typecheck, or a screenshot taken after
 * it settles. It is visible in computed style, which is what this reads.
 */

/** The floor WCAG 1.4.11 puts under a focus indicator. */
const FLOOR = 3

/** sRGB relative luminance, WCAG 2.x. */
function luminance([r, g, b]: number[]): number {
  const channel = (value: number) => {
    const s = value / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(a: number[], b: number[]): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (lighter + 0.05) / (darker + 0.05)
}

/** `rgb(a)` as numbers. Alpha defaults to 1, which is what an opaque ground is. */
function parse(color: string): number[] {
  const values = color.match(/[\d.]+/g)?.map(Number) ?? []
  return [values[0] ?? 0, values[1] ?? 0, values[2] ?? 0, values[3] ?? 1]
}

/** Source-over, the way the compositor does it. */
function over(top: number[], ground: number[]): number[] {
  const a = top[3]
  return [0, 1, 2].map((i) => top[i] * a + ground[i] * (1 - a))
}

test('the composer answers focus with one ring, and it can never flash', async ({ page }) => {
  const site = await serveExport()
  try {
    await page.goto(site.url)
    await page.waitForSelector('.hz-composer input')

    const read = () =>
      page.evaluate(() => {
        const pill = document.querySelector('.hz-composer') as HTMLElement
        const panel = pill.querySelector(':scope > div') as HTMLElement
        const style = getComputedStyle(panel)
        return {
          ring: style.boxShadow,
          outline: style.outlineStyle,
          border: style.borderTopColor,
          band: getComputedStyle(pill, '::before').opacity,
          page: getComputedStyle(document.body).backgroundColor,
          ground: style.backgroundColor,
        }
      })

    const rest = await read()

    // Programmatic focus, never a click: a pointer over the pill is HOVERING,
    // and hover lifts the band on purpose. Mixing the two would measure both and
    // could not tell which one answered.
    //
    // Focusing ONCE is not enough. `load` fires well before React has hydrated
    // the export, and hydration takes the caret with it — so a single `focus()`
    // measures an unfocused pill, which passes half of what is below and means
    // nothing. Ask until it holds, then measure.
    await expect
      .poll(async () => {
        await page.locator('.hz-composer input').focus()
        return page.evaluate(
          () => document.querySelector('.hz-composer input')?.matches(':focus-visible') ?? false,
        )
      })
      .toBe(true)

    // It ARRIVES rather than appears, so the first frame after focus is the
    // start of the ease and not the answer — reading once here measures a ring
    // at almost no alpha and fails on a value that is about to be right. Waiting
    // for the requirement is also the assertion: the ring becomes legible
    // against the page outside it, and against the pill's glass inside it.
    const legible = async (against: 'page' | 'ground') => {
      const now = await read()
      const ground = over(parse(now.ground), parse(now.page))
      const ring = over(parse(now.ring), ground)
      return contrast(ring, against === 'page' ? parse(now.page) : ground)
    }
    await expect.poll(() => legible('page')).toBeGreaterThanOrEqual(FLOOR)
    await expect.poll(() => legible('ground')).toBeGreaterThanOrEqual(FLOOR)

    const focused = await read()

    // ONE ring. A shadow is the ring; an outline beside it is the second border
    // this whole arrangement exists to remove.
    expect(focused.outline).toBe('none')
    expect(rest.ring).not.toBe('none') // …and it rests at zero alpha, or it cannot ease
    expect(parse(rest.ring)[3]).toBe(0)

    // Nothing else moves. The band is the pill's own decoration, not a second
    // way of saying "focused", and the border keeps one value.
    expect(focused.band).toBe(rest.band)
    expect(focused.border).toBe(rest.border)

    // The flash is a TRANSITION, so it is killed at the resting value rather
    // than in the focus rule: a control whose outline-color already IS the ring's
    // has nothing to interpolate from. Read on a control that transitions colour,
    // which is the only kind that could flash.
    const flashable = await page.evaluate(() => {
      const plus = document.querySelector('.hz-composer button') as HTMLElement
      const style = getComputedStyle(plus)
      return {
        transitions: style.transitionProperty,
        resting: style.outlineColor,
        text: style.color,
      }
    })
    expect(flashable.transitions).toContain('outline-color')
    expect(parse(flashable.resting)[3]).toBeLessThan(1)
    expect(flashable.resting).not.toBe(flashable.text)
  } finally {
    await site.close()
  }
})
