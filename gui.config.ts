/**
 * The ONE gui configuration for hanzo.ai.
 *
 * `@hanzo/gui` is the rendering substrate; this file is where the Hanzo design
 * language enters it. Design VALUES are not authored here — they come from
 * `@hanzo/design`, the CSS custom-property token set shared by every Hanzo
 * surface. gui's tokens are `var()` references INTO that set, so a `$4` in a gui
 * prop and a `var(--space-4)` in a stylesheet are one value, not two that drift,
 * and a light/dark flip retunes gui components through the same cascade that
 * retunes everything else.
 *
 * The exception is every SINGLE-WORD colour name. gui publishes each token key
 * as a bare `--<key>` custom property at `:root`, so any key spelled the same as
 * a @hanzo/design token points at itself, and CSS drops both sides of a cycle —
 * the property computes EMPTY. Those names are mirrored from @hanzo/design's
 * exported literals rather than referenced. Hyphenated names never collide
 * (`--cardForeground` vs `--card-foreground`) and stay live references.
 */
import { defaultConfig } from '@hanzogui/config/v4'
import { createGui, createVariable } from '@hanzo/gui'
import { colors } from '@hanzo/design'

/** A reference to a @hanzo/design token. */
const t = (name: string) => `var(--${name})`

/**
 * The same reference, for a FONT SIZE.
 *
 * Every other token category takes the `var()` string above, but gui types a
 * font size as `number | Variable` — so `size: { 3: 'var(--text-base)' }` is a
 * type error even though gui renders it correctly. That one failed constraint
 * used to cost the whole surface: `createGui<Conf extends CreateGuiProps>`
 * falls back to its CONSTRAINT when the argument does not satisfy it, so
 * `GuiConfig['shorthands']` degraded from the real shorthand map to
 * `CreateShorthands` = `{ [key: string]: string }`. `WithShorthands` maps over
 * `keyof Shorthands`, and over a string index that yields `{ [key: string]:
 * undefined }` on EVERY gui component's props — which is why `className`,
 * `onClick`, `paddingHorizontal` and friends all resolved to `undefined`.
 * Measured: 743 project type errors, 704 of them from this.
 *
 * A `Variable` is gui's own spelling for "this value IS a CSS custom property",
 * and gui publishes font sizes as `--f-size-<key>` — the exact name it emits
 * for a plain value, so app/gui.css comes out byte-identical (31,023 bytes)
 * while the type is now true. Keeping the reference rather than baking px is
 * not cosmetic: `--text-*` are rem, so a browser text-size preference and a
 * tenant density retune both still move gui-rendered type.
 */
const fontSize = (key: string | number, name: string) =>
  createVariable({ key: `f-size-${key}`, name: `f-size-${key}`, val: t(name) }, true)

/** Spacing / sizing ramp — @hanzo/design `--space-*`. Published as `--c-space-*`. */
const space = {
  0: 0,
  1: t('space-1'),
  2: t('space-2'),
  3: t('space-3'),
  4: t('space-4'),
  5: t('space-5'),
  6: t('space-6'),
  8: t('space-8'),
  10: t('space-10'),
  12: t('space-12'),
  14: t('space-14'),
  16: t('space-16'),
  20: t('space-20'),
  24: t('space-24'),
  32: t('space-32'),
  true: t('space-4'),
}

/** Radii — @hanzo/design `--radius-*`. */
const radius = {
  0: 0,
  1: t('radius-sm'),
  2: t('radius-md'),
  3: t('radius-lg'),
  4: t('radius-xl'),
  5: t('radius-2xl'),
  9: t('radius-full'),
  true: t('radius-md'),
}

/**
 * The semantic colour surface. These live in TOKENS rather than in a theme
 * precisely so gui does not republish `--foreground`, `--border`, … at `:root`
 * and shadow the stylesheet they come from; `$foreground` resolves here.
 *
 * The whole category is authored here. There is nothing to inherit: the v4
 * defaultConfig ships `radius`, `zIndex`, `space` and `size` tokens only, so
 * the `...defaultConfig.tokens.color` that used to open this object spread
 * `undefined` at runtime and failed the config's type at compile time — see
 * `fontSize` above for what a failed constraint here costs.
 */
const color = {
  // ── The colliding names ────────────────────────────────────────────────────
  // gui republishes every token key as a bare `--<key>` at :root. For any key
  // whose name is IDENTICAL to a @hanzo/design token, `var(--<key>)` therefore
  // resolves to itself — and CSS drops both sides of a cycle, leaving the
  // property EMPTY rather than falling back to the stylesheet's value.
  //
  // The header above used to say `background` was "the single name that
  // collides". It is not: every single-word key collides, and the cost was
  // visible on hanzo.ai. Measured on the live pricing page: `--border` is
  // declared `#1f1f1f` in :root and computes to EMPTY on <html>, so Tailwind's
  // `border-border` had no colour and fell back to `currentColor` — a pure
  // white 1px border on every card.
  //
  // So these are MIRRORED from @hanzo/design's exported literals, not
  // referenced. A literal cannot cycle. The camelCase keys below stay
  // references: gui publishes `--cardForeground` while design defines
  // `--card-foreground`, so those names never meet.
  background: colors.background,
  foreground: colors.foreground,
  card: colors.card,
  popover: colors.popover,
  primary: colors.primary,
  secondary: colors.secondary,
  muted: colors.muted,
  accent: colors.accent,
  destructive: colors.destructive,
  border: colors.border,
  input: colors.input,
  ring: colors.ring,

  // ── The non-colliding names — live references, as everything else is ───────
  cardForeground: t('card-foreground'),
  popoverForeground: t('popover-foreground'),
  primaryForeground: t('primary-foreground'),
  secondaryForeground: t('secondary-foreground'),
  mutedForeground: t('muted-foreground'),
  accentForeground: t('accent-foreground'),
  destructiveForeground: t('destructive-foreground'),
  brand: t('brand'),
  brandForeground: t('brand-foreground'),
  surfaceCard: t('surface-card'),
  surfaceCardEmphasis: t('surface-card-emphasis'),
  surfaceCardQuiet: t('surface-card-quiet'),
  surfaceHeader: t('surface-header'),
  surfaceOverlay: t('surface-overlay'),
  surfaceScrim: t('surface-scrim'),
  borderHairline: t('border-hairline'),
  borderCard: t('border-card'),
  borderStrong: t('border-strong'),
  textPrimary: t('text-primary'),
  textSecondary: t('text-secondary'),
  textTertiary: t('text-tertiary'),
  textDisabled: t('text-disabled'),
  transparent: 'transparent',
}

/** The Hanzo type scale — @hanzo/design `--text-*` / `--leading-*`. */
const size = {
  1: fontSize(1, 'text-xs'),
  2: fontSize(2, 'text-sm'),
  3: fontSize(3, 'text-base'),
  4: fontSize(4, 'text-base'),
  5: fontSize(5, 'text-lg'),
  6: fontSize(6, 'text-xl'),
  7: fontSize(7, 'text-2xl'),
  8: fontSize(8, 'text-3xl'),
  9: fontSize(9, 'text-4xl'),
  10: fontSize(10, 'text-5xl'),
  11: fontSize(11, 'text-6xl'),
  12: fontSize(12, 'text-7xl'),
  13: fontSize(13, 'text-8xl'),
  14: fontSize(14, 'text-9xl'),
  15: fontSize(15, 'text-9xl'),
  16: fontSize(16, 'text-9xl'),
  true: fontSize('true', 'text-base'),
}

const weight = {
  1: t('weight-normal'),
  4: t('weight-normal'),
  5: t('weight-medium'),
  6: t('weight-semibold'),
  7: t('weight-bold'),
  true: t('weight-normal'),
}

const font = (family: string) => ({
  ...defaultConfig.fonts.body,
  family,
  size,
  weight,
})

export const config = createGui({
  ...defaultConfig,
  settings: { ...defaultConfig.settings, onlyAllowShorthands: false },
  fonts: {
    ...defaultConfig.fonts,
    body: font('var(--font-sans)'),
    heading: font('var(--font-display, var(--font-sans))'),
    mono: font('var(--font-mono)'),
  },
  tokens: {
    ...defaultConfig.tokens,
    space,
    size: { ...defaultConfig.tokens.size, ...space },
    radius,
    color,
  },
  themes: {
    // gui's own built-in components read `$background`/`$color`/`$borderColor`
    // from the theme; the rest of the Hanzo surface reads the tokens above.
    dark: {
      ...defaultConfig.themes.dark,
      background: colors.background,
      color: colors.foreground,
      borderColor: colors.border,
      placeholderColor: colors['muted-foreground'],
      outlineColor: colors.ring,
    },
    light: {
      ...defaultConfig.themes.light,
      // The one mirrored pair — see the note at the top of this file.
      background: '#ffffff',
      color: '#0a0a0a',
      borderColor: '#e5e5e5',
      placeholderColor: '#525252',
      outlineColor: colors.ring,
    },
  },
})

export type GuiConfig = typeof config

declare module '@hanzo/gui' {
  interface GuiCustomConfig extends GuiConfig {}
}

export default config
