/**
 * A provider's brand mark, painted in the current text colour.
 *
 * These files declare `fill="currentColor"` — but an SVG loaded through
 * `<img>`/`next/image` is a separate document with no CSS context, so
 * `currentColor` resolves to the spec default, BLACK. On hanzo.ai's near-black
 * cards that rendered six brand marks black-on-black; they read as missing
 * assets, and only Hanzo's showed because it is drawn white.
 *
 * Masking the shape and painting it with `background-color: currentColor` gives
 * these files the semantics they already declare, so they inherit the
 * surrounding text colour and stay legible in BOTH themes. Inlining the SVG
 * would also work and costs a fetch-and-inject per mark for no extra fidelity.
 *
 * ONE component, because the same bug shipped on three pages.
 */
export function ProviderMark({
  src,
  label,
  className = 'h-8 w-8',
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`block shrink-0 rounded-lg bg-current ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
      }}
    />
  );
}
