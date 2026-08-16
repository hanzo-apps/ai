import React, { type CSSProperties } from 'react'

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
 * And it owns the WHOLE display type rather than half of it. Ink and leading
 * here while the page owned the scale is the split that let six measured
 * pages state four mobile scales, three laptop scales, three weights and two
 * whites for one `h1`. `.hz-display` in globals.css is the one statement of
 * all of it, off @hanzo/design's `--type-hero` and the rungs of its ramp. A
 * call site passes CONTENT and spacing, never type.
 */
interface ChromeTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p'
  className?: string
  preHeading?: string
  preHeadingClassName?: string
  style?: CSSProperties
}

const ChromeText = ({
  children,
  as: Component = 'h1',
  className,
  preHeading,
  preHeadingClassName,
  style,
}: ChromeTextProps) => (
  <div className={`flex flex-col ${preHeading ? 'items-center' : 'items-start'}`}>
    {preHeading && (
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300${preHeadingClassName ? ` ${preHeadingClassName}` : ''}`}
      >
        {preHeading}
      </div>
    )}
    <Component className={className ? `hz-display ${className}` : 'hz-display'} style={style}>
      {children}
    </Component>
  </div>
)

export default ChromeText
