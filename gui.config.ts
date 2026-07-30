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
 * The one exception is `background`. gui publishes each THEME key as a bare
 * `--<key>` custom property at `:root`, and `background` is the single name that
 * collides with a @hanzo/design token — pointing it at `var(--background)` would
 * make the property reference itself and CSS would drop both. So that one value
 * is mirrored from @hanzo/design's exported literals (`colors.background`)
 * rather than referenced. Every other colour is a live reference.
 */
import { defaultConfig } from '@hanzogui/config/v4'
import { createGui } from '@hanzo/gui'
import { colors } from '@hanzo/design'

/** A reference to a @hanzo/design token. */
const t = (name: string) => `var(--${name})`

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
 */
const color = {
  ...defaultConfig.tokens.color,
  background: t('background'),
  foreground: t('foreground'),
  card: t('card'),
  cardForeground: t('card-foreground'),
  popover: t('popover'),
  popoverForeground: t('popover-foreground'),
  primary: t('primary'),
  primaryForeground: t('primary-foreground'),
  secondary: t('secondary'),
  secondaryForeground: t('secondary-foreground'),
  muted: t('muted'),
  mutedForeground: t('muted-foreground'),
  accent: t('accent'),
  accentForeground: t('accent-foreground'),
  destructive: t('destructive'),
  destructiveForeground: t('destructive-foreground'),
  border: t('border'),
  input: t('input'),
  ring: t('ring'),
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
  1: t('text-xs'),
  2: t('text-sm'),
  3: t('text-base'),
  4: t('text-base'),
  5: t('text-lg'),
  6: t('text-xl'),
  7: t('text-2xl'),
  8: t('text-3xl'),
  9: t('text-4xl'),
  10: t('text-5xl'),
  11: t('text-6xl'),
  12: t('text-7xl'),
  13: t('text-8xl'),
  14: t('text-9xl'),
  15: t('text-9xl'),
  16: t('text-9xl'),
  true: t('text-base'),
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
