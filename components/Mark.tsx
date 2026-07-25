// The ONE monochrome mark. Every logo tile on the site renders through this:
// the provider grid ("Every provider. One cloud.") and the surface grid
// ("Hanzo AI, native in every tool you use.") — so the two grids can never
// drift into two icon languages again.
//
// The logo is drawn as a CSS mask filled with the CURRENT text color, so ANY
// source SVG — colored, near-black, white, or `currentColor` — normalizes to one
// monochrome silhouette that follows the theme and the hover state. Where no
// mark exists (a brand that publishes none, or one we hold no redistribution
// licence for), the SAME tile falls back to a monogram plate: uniform size,
// uniform weight, never a stand-in pictograph.

export function Mark({ src, name }: { src: string | null; name: string }) {
  if (!src) {
    return (
      <span
        aria-hidden
        className="w-6 h-6 shrink-0 rounded-md bg-foreground/10 text-[11px] font-semibold text-foreground/70 flex items-center justify-center transition-colors duration-200 group-hover:text-foreground"
      >
        {name.slice(0, 1)}
      </span>
    )
  }
  return (
    <span
      aria-hidden
      className="w-6 h-6 shrink-0 bg-current text-foreground/70 transition-colors duration-200 group-hover:text-foreground"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
