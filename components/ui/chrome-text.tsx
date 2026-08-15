import React, { type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * The display heading, and the eyebrow that can sit above it.
 *
 * SOLID INK. The heading used to be painted with a horizontal
 * grey→white→grey gradient clipped to the glyphs, which cost more than it
 * looked like it did:
 *
 *   - the ends of every headline were `rgb(180,180,180)` while the middle was
 *     `rgb(240,240,240)`, so the last word of each one was its dimmest and the
 *     line read as a render that had not finished;
 *   - the gradient's offset tracked the POINTER, through a `mousemove`
 *     listener on `window` that called `setState` and `getBoundingClientRect`
 *     on every event — a React re-render and a forced layout per mouse move,
 *     on 33 surfaces, for an effect most readers never noticed;
 *   - the rule shipped inside the component, so a page with six headings put
 *     six identical `<style>` blocks in the DOM.
 *
 * Hanzo is monochrome and its ink is paper-white. A confident heading is that
 * white, once, at a tight display leading — which is also the one treatment a
 * reader can rely on meaning "this is the heading" rather than "this heading
 * is decorated".
 *
 * The API is unchanged, so all 33 call sites keep their own size classes: this
 * owns the INK and the LEADING, and the page owns the scale.
 */
interface ChromeTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
  className?: string
  preHeading?: string
  preHeadingClassName?: string
  style?: CSSProperties
}

/**
 * Display leading and tracking, stated here so every heading agrees.
 *
 * 1.08 rather than the `leading-relaxed` (1.625) it carried: a display line
 * set at body leading reads as a paragraph that happens to be large, and two
 * lines of it drift so far apart they stop being one sentence. The negative
 * tracking is what large type needs to keep its word shapes — the same
 * correction the rest of the site's heroes make by hand.
 */
const DISPLAY: CSSProperties = {
  lineHeight: 1.08,
  letterSpacing: '-0.02em',
  textWrap: 'balance',
}

const ChromeText = ({
  children,
  as: Component = 'h1',
  className,
  preHeading,
  preHeadingClassName,
  style,
}: ChromeTextProps) => (
  <div className={cn('flex flex-col', preHeading ? 'items-center' : 'items-start')}>
    {preHeading && (
      <div
        className={cn(
          'mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300',
          preHeadingClassName
        )}
      >
        {preHeading}
      </div>
    )}
    <Component
      className={cn('text-foreground', className)}
      style={{ ...DISPLAY, ...style }}
    >
      {children}
    </Component>
  </div>
)

export default ChromeText
