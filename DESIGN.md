# DESIGN.md — hanzo.ai design system

A short, opinionated design spec. Every product page on hanzo.ai obeys these
rules — uniform feel, zero decorative color, all signal carried by typography
and opacity. Mirrors the spirit of Material 3 / Google Web Design Spec but
collapses to a strictly monochrome surface that suits an AI infrastructure
brand.

This file lives next to `LLM.md` — `LLM.md` describes what's built, this file
describes how it should look.

---

## 1. Foundation

### 1.1 Voice
Direct, technical, understated. Never advertise; describe. No exclamation
marks, no emoji in copy, no superlatives without numbers attached. One
sentence per idea.

### 1.2 Brand atom
Monochrome. Black background, white type, neutral grays. No hue except
where state requires it (see § 3 Color tokens / Semantic).

### 1.3 Layout grid
- Max content width: `max-w-7xl` (1280px) for grids, `max-w-3xl` (768px)
  for centered text blocks
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Vertical rhythm: `py-20 lg:py-32` for hero sections, `py-16` to `py-20`
  for content sections, `py-16` for the final CTA

### 1.4 Density
Generous. The brand reads quiet. If a section feels crowded, remove a
component before reducing spacing.

---

## 2. Color tokens

### 2.1 Source of truth
All color tokens live in `lib/constants/brand.ts`. CSS variables are
declared in `app/globals.css`/`themes.css`. Never hardcode hex literals
in component files. Two exceptions: the `/brand` page color swatches
themselves, and the SVG logo source.

### 2.2 Palette

| Token | Value | Use |
|---|---|---|
| `--background` | `#000000` | Page surface |
| `--foreground` | `#ffffff` | Primary type |
| `--brand` | `#e4e4e7` | Active accent (rare) |
| `--brand-muted` | `#a3a3a3` | Hover / muted accent |
| `text-white` | `rgb(255 255 255)` | Headings, primary copy |
| `text-white/80` | white @ 80% opacity | Secondary copy |
| `text-white/60` | white @ 60% | Tertiary copy / captions |
| `text-muted-foreground` | neutral-400 | Helper text |
| `border-border` | neutral-800 | Default border |
| `border-white/10` to `/30` | borders w/ opacity | Card / pill borders |

### 2.3 Opacity scale (the real palette)
Hanzo's color palette is **a single hue rendered through an opacity
ladder**. Use these steps and only these steps:

```
white/5   white/10   white/15   white/20   white/30   white/40   white/60   white/80   white
 ▒▒        ▒▒▒        ▒▒▒▒       ▒▒▒▒▒      ▒▒▒▒▒▒    ▒▒▒▒▒▒▒    ▒▒▒▒▒▒▒▒   ▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒
```

Higher opacity = higher rank. A "ultra" tier badge is `bg-white/20`,
"pro" is `bg-white/15`, "edge" is `bg-white/5`. Never reach for hue to
communicate rank.

### 2.4 Semantic colors (the *only* hued exceptions)

| Where | Color | Reason |
|---|---|---|
| Error / destructive states | `red-500/10` bg + `red-300/400` text | User-blocking error or destructive confirmation |
| Success / online indicator | `green-400/500` (often a tiny dot) | Live-status pulse, "online" affordance |
| Pricing — "Free" / "Save N%" callouts | `green-400` text | Positive financial callout (UX convention) |
| macOS window-chrome dots | `red-500/60` `yellow-500/60` `green-500/60` | OS-affordance reproduction in code-window mocks |
| External brand logos (Discord blue, LinkedIn blue, Instagram pink, etc.) | brand's official hex | Recognizing third-party identity |

These are the ONLY places where hue is permitted. Anything else
decorative — tier badges, language pills, category accents — must use
the opacity scale (§ 2.3).

---

## 3. Typography

### 3.1 Family
`font-sans` is **Geist Sans** (loaded via `next/font/google`). Mono blocks
use `font-mono` (system mono fallback). No third typeface.

### 3.2 Type scale (Tailwind classes)

| Class | Use |
|---|---|
| `text-5xl lg:text-7xl font-bold` | Hero `<h1>` |
| `text-4xl font-bold` | Section `<h2>` |
| `text-2xl font-bold` | Subsection `<h3>` |
| `text-xl text-muted-foreground` | Hero tagline, lead paragraph |
| `text-sm text-muted-foreground` | Body |
| `text-xs text-muted-foreground` | Helper, footnote, badge label |
| `text-[10px] font-semibold uppercase tracking-wider text-muted-foreground` | Category eyebrow |

### 3.3 Hero h1 treatment
Wrap hero h1 text in `<ChromeText>` for the canonical chrome gradient
(`from-white via-white/80 to-white/60 bg-clip-text text-transparent`).
Never use a saturated rainbow gradient.

---

## 4. Components

### 4.1 Card

```tsx
<div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50">
  <Icon className="h-6 w-6 mb-3 text-foreground/80" />
  <h3 className="font-semibold mb-2">Title</h3>
  <p className="text-sm text-muted-foreground">Body…</p>
</div>
```

Variants: `bg-neutral-900/50` for grid items, `bg-neutral-900/80` for
emphasis, `bg-gradient-to-br from-neutral-800/60 to-neutral-900/60` for
hero/featured tiles.

### 4.2 Button (primary / secondary)

NEVER use `<Button asChild>` — it expects exactly one child element and
breaks the build under React 18 strict children. Use plain `<a>` or
`<Link>` with className strings:

```tsx
{/* Primary */}
<Link href="/x" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
  Get started <ArrowRight className="h-4 w-4" />
</Link>

{/* Secondary */}
<Link href="/y" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
  Learn more
</Link>
```

### 4.3 Badge / pill

```tsx
<div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block">
  <span className="text-sm flex items-center gap-2">
    <Icon className="w-4 h-4" /> Label
  </span>
</div>
```

For tier / language / category badges, use § 2.3 opacity scale.

### 4.4 Hero pattern (every product page starts with this)

```tsx
<section className="py-20 lg:py-32 relative">
  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center max-w-3xl mx-auto mb-16">
      {/* eyebrow badge */}
      <h1 className="text-5xl lg:text-7xl font-bold mb-6">
        <ChromeText>Product Title</ChromeText>
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        One-sentence value prop, ≤140 chars.
      </p>
      {/* Primary + secondary CTA row */}
    </div>
  </div>
</section>
```

### 4.5 Final resources block (every product page ends with this)

```tsx
<section className="py-16 border-t border-neutral-800">
  <div className="max-w-3xl mx-auto px-4 text-center">
    <h2 className="text-2xl font-bold mb-4">Get started with <Product></h2>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a href="https://docs.hanzo.ai/<slug>" target="_blank" rel="noopener noreferrer" className="...primary button classes...">
        Read the docs <ArrowRight className="h-4 w-4" />
      </a>
      <a href="https://github.com/hanzoai/<slug>" target="_blank" rel="noopener noreferrer" className="...secondary button classes...">
        View on GitHub
      </a>
    </div>
  </div>
</section>
```

This block is **mandatory** on every product page — `e2e/products.spec.ts`
asserts both links exist and resolve.

---

## 5. Motion

- Library: `framer-motion`
- Hero entry: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5 }}` and per-element `delay: 0.05 * index` stagger
- Hover: pure CSS via `transition-colors`, never JS-animated
- Background motion: a single radial gradient pulse, 8s ease-in-out infinite
- No bouncy springs. No carousel auto-play. No parallax.

---

## 6. Iconography

- Library: `lucide-react`. No other icon set.
- Sizing: `h-3 w-3` (inline next to body text), `h-4 w-4` (CTA button),
  `h-6 w-6` (card eyebrow), `h-10 w-10` (section accent)
- Color: inherit, or `text-foreground/80` for emphasis, `text-muted-foreground` for inline body icons
- Stroke: default

Allow-listed semantic icons (used consistently across pages):
- Primary action: `ArrowRight`
- Code / SDK: `Code`, `Terminal`
- Docs: `FileText`
- Settings / config: `Settings`
- Identity / user: `UserCheck`
- Security / locks: `Shield`, `ShieldCheck`, `Lock`, `KeyRound`

---

## 7. Page rules

### 7.1 Every product page MUST
1. Live at `/<slug>` under `app/(marketing)/<slug>/page.tsx`
2. Have a unique `<h1>` — no two product pages share the same title
3. Have a unique first-600-char body signature (asserted by `e2e/products.spec.ts`)
4. End with the resources block (§ 4.5)
5. Carry **only** the colors permitted by § 2.3 / § 2.4

### 7.2 Every product MUST be in the menu
- Listed in `productsNav` (`lib/constants/navigation-data.ts`)
- Carries `github:` field linking to a real `https://github.com/hanzoai/<repo>` URL (or org root if private/non-existent)
- Carries `docs:` field linking to `https://docs.hanzo.ai/<slug>`

### 7.3 Forbidden
- `<Button asChild>` — breaks build
- Hardcoded hex literals (use CSS vars or Tailwind tokens)
- Decorative hue (only § 2.4 semantic uses permitted)
- Multiple typefaces
- Multiple URL schemes for the same product (no more `/products/<cat>/<x>` and `/<x>`; pick `/<x>`)
- `:latest` / `:main` / `:dev` image tag references on cluster pins (semver only — see `~/work/hanzo/CLAUDE.md`)

---

## 8. Accessibility (non-negotiable)

- Contrast: every body-text on background combination clears WCAG AA at 16px
- Focus rings: visible — never `outline-none` without a custom ring
- Keyboard: every dropdown / dialog / mobile menu reachable via Tab; closeable via Escape
- Reduced motion: honor `prefers-reduced-motion` — disable infinite gradient pulses
- Alt text: every `<img>` and decorative SVG either has alt or `aria-hidden="true"`

---

## 9. Verification

Before shipping a new page or design change:

```bash
# Build clean
pnpm build

# Serve static export
(cd out && python3 -m http.server 8086) &

# Run product e2e (uniqueness + GitHub-link + page-live tests)
BASE_URL=http://localhost:8086 pnpm test e2e/products.spec.ts
```

The e2e suite gates: page lives, h1 unique, body unique, GitHub link non-404.
If any of those fail, the design isn't done.

---

## 10. When in doubt

Look at `/cloud`, `/iam`, `/insights`, `/dev` — these four pages are the
shape every other product page should match. If your page reads visibly
different from those four, something is wrong.

The brand looks black, white, and quiet. That's the whole spec.
