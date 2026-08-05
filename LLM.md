# hanzo.ai

## Project

Main Hanzo AI marketing site. **Next.js 14 App Router** (NOT Vite — migrated).

- URL: https://hanzo.ai
- Stack: Next.js 15 + React 19 + TypeScript + `@hanzo/ui` 8.x on `@hanzo/gui`
  + `@hanzo/design` tokens + Framer Motion. Tailwind v4 is still in the build
  and is being retired — see "UI substrate" below.
- Node: **>=22.18**, stated in `.nvmrc` and `engines` and nowhere else. Two
  things force it: wrangler 4 refuses to start below 22, and `pnpm build`'s
  second half (`scripts/noindex.mjs`) imports `lib/publish.ts` directly, which
  needs the type stripping Node does for itself from 22.18. The alternative was
  a second copy of that list in JavaScript, which is the thing the script
  exists to prevent.
- Dev: `pnpm dev`
- Build: `pnpm build`
- Typecheck: `pnpm typecheck` — `tsc` here IS TypeScript 7, the native Go
  compiler, published under the stable `typescript` name with per-platform
  binaries in `@typescript/typescript-<platform>-<arch>`. The whole tree in
  ~1.4s at ~400% CPU. Do NOT add `@typescript/native-preview`: that is the
  pre-release channel of this same binary (it names it `tsgo`), it is behind
  stable, and installing it would mean two copies of one compiler.
- Lint: `pnpm lint` — plain `eslint .`, parsed by `@babel/eslint-parser`
  because typescript-eslint refuses TS 7 outright (typescript-eslint#10940).
- Deploy: Static export (`output: export`) → the **PaaS Sites plane**, project slug
  `hanzo-ai`, via **`.hanzo/workflows/deploy.yml`** on the forge. Cloudflare Pages
  is GONE — the workflow, the wrangler call and the credentials with it.
  `.github/workflows/` is empty and stays that way.

  The claim that killed the native path for weeks — "`hanzoai/hanzo.ai` is a
  mirror, read-only, its Actions never fire" — is FALSE, and it is why a
  Cloudflare stopgap kept being re-added. Measured against the forge API: the repo
  is `"mirror": true` AND `has_actions: true`, with **1325 runs**, `deploy.yml`
  green on push 5/5. A pull mirror on this Gitea runs its Actions perfectly well.
  Do not restore a second pipeline on the strength of that sentence.

  The publish itself is `bin/sitedeploy` in **hanzoai/ci**, used through
  `hanzoai/ci/.github/actions/sitedeploy@v1` — hanzo.app, hips and computer make
  the identical three calls, so the contract lives in one place. ONE credential:
  `HANZO_DEPLOY_TOKEN` (forge org secret, mirrored from KMS `deploy/`). The 202
  hands back a prefix-scoped 30-minute presigned POST grant, so CI holds no bucket
  key — never add `SITES_S3_*`.
- **The GitHub repo is `hanzo-apps/ai`.** `hanzoai/hanzo.ai` only redirects there.
  Push to the real name — a redirect is why `gh` reports runs under one repo while
  you push to another. Push to `hanzogit` too: that remote is what the forge
  builds from.
- **Not yet the live origin.** The apex still resolves to Cloudflare Pages, so the
  Sites deploy publishes to `hanzo-ai.hanzo.app` and hanzo.ai keeps serving its
  last Pages build until DNS moves. Two things gate the cutover, both outside this
  repo: point `hanzo.ai` / `www.hanzo.ai` at the sites edge, and roll out the
  cloud build carrying the `<rel>.html` candidate in `apps/sites` (without it the
  edge finds `index.html` and 404s every other route, because `output: export`
  writes `pricing.html`, not `pricing/index.html`).

## Two faces, one export

This ONE static export (`out/`) serves TWO sites — split by host, not by build:

1. **hanzo.ai apex** (Sites plane, slug `hanzo-ai`) — the clean, openai.com-style
   **chat-centric landing**. Route: `app/page.tsx` → `components/home/HomeLanding`.
   It lives at the app ROOT (outside `(marketing)`) so only the root layout
   wraps it; it ships its OWN nav + footer (`components/home/*`). "What can I
   help with?" composer forwards to `hanzo.chat/?q=…`; nav deep-links to
   cloud.hanzo.ai; **Foundation → zoo.ngo** (Zoo Labs governs Hanzo).
2. **cloud.hanzo.ai** (k8s `cloud-site` image, `ghcr.io/hanzoai/cloud-site`,
   `hanzoai/static`) — the **detailed product/marketing site**. `Dockerfile`
   does `cp out/cloud-site.html out/index.html`, so this host's ROOT is
   `app/cloud-site/page.tsx` (`components/cloud/CloudLanding`) while every deep
   `(marketing)/*` page (docdb, vector, kv, iam, …) serves beneath it. The apex
   `/` change never touches this host (its root is decoupled via that `cp`).
   Traefik router `cloud-hanzo-ai` (universe `infra/k8s/ingress/routes.yaml`) →
   Service `www` → the image; App CR `infra/k8s/operator/crs/www.yaml` pins the tag.
   Deploy cloud.hanzo.ai = rebuild the image (on-cluster BuildKit, NOT local) +
   bump the `www` CR tag.

- The old apex homepage (`app/(marketing)/page.tsx`, the `components/landing/*`
  sections) was relocated to **`/overview`** (`app/(marketing)/overview/page.tsx`)
  — kept on the detailed site, wrapped by the `(marketing)` Navbar/Footer.
  Surfaced in the landing nav under Research → Overview.

## UI substrate — @hanzo/ui 8.x on @hanzo/gui

ONE component library, ONE token source, ONE way to style.

- **Components**: `@hanzo/ui` (root export) for the component surface;
  `@hanzo/ui/product` for the gui-backed product layer (`DataTable`,
  `StatusTag`, `PageHeader`, `SiteNav`, `MetricCard`, …); `@hanzo/gui` for the
  primitives (`YStack` / `XStack` / `Text` / `View` / `Sheet` / `Accordion`).
- **v5 → v8 map**: every `@hanzo/ui/<component>` subpath is gone. `tabs`,
  `progress`, `select`, `dropdown-menu`, `dialog` → the package ROOT.
  `accordion` and `sheet` have no v8 equivalent → gui's own. `Table*` has none
  → `DataTable` from `@hanzo/ui/product`.
- **Config**: `gui.config.ts` binds gui's token namespace to @hanzo/design's
  CSS custom properties, so `$4` and `var(--space-4)` are one value.
  The semantic colours are gui TOKENS, not a gui THEME: gui republishes every
  theme key as a bare `--<key>` at `:root`, and for `background` that would
  make the property reference itself (CSS drops both sides of a cycle).
  `background` is therefore the ONE value mirrored from @hanzo/design's
  exported literals; everything else is a live `var()` reference.
- **ONE `@hanzogui/web`, always.** `@hanzo/gui` and every `@hanzogui/*` are one
  release train published in lockstep; they must resolve to ONE version, because
  `@hanzogui/web` holds the config and theme singletons that `createGui` writes
  at import. Two copies means the copy a component reads from was never
  configured. Bumping `@hanzo/gui` alone is therefore never a bump — it is a
  split, and it fails twice over:

  - **At type level, disguised as an API change.** `defaultConfig` came from the
    old copy, so its `AnimationDriver` was a different declaration than the one
    the new `createGui` expects. `createGui<Conf extends CreateGuiProps>` then
    falls back to its CONSTRAINT — the same degradation this file already
    records under the font-size note — and the fallout reads like a library
    rewrite: `AnimationsConfigObject` demands a `default` key, `GuiConfig`
    circularly references itself, and `Accordion` "no longer accepts" `width` or
    `children`. None of that was real. gui's own `apps/demos/src/AccordionDemo.tsx`
    composes Accordion with exactly the props ours does. **Do not adapt call
    sites to these errors** — they are one dependency defect wearing four masks,
    and every "fix" would be damage.
  - **At runtime, where the type gate cannot see it.** `Missing theme.` on
    prerender — `@hanzo/ui` pulled its own old `@hanzogui/toast`/`telemetry`
    island, so `/leadership` read a config singleton nobody set. A green
    typecheck does not prove one copy; only the lockfile does.

  `pnpm.overrides` pins `@hanzogui/{web,toast,telemetry}` for this reason:
  `@hanzo/ui` still carries stale exact pins beneath caret ranges, and pnpm keeps
  a satisfied lockfile entry rather than re-resolving it. Verify with
  `grep -c "@hanzogui/web': 8\.0\.0" pnpm-lock.yaml` — the answer is 0, and
  `node_modules/.pnpm` will still show an orphaned dir, which is not a copy.
- **`render=`, not `tag=`** — that is how a gui component picks its host
  element. `tag` is not a gui prop: it leaks through as a DOM attribute and the
  page silently ships with zero `<h1>`/`<section>`.
- **Provider**: `components/GuiProvider.tsx` hands gui's generated CSS to the
  prerender via `useServerInsertedHTML`. Without it a statically exported page
  ships markup whose classes have no rules until hydration.
- **Tailwind is NOT gone**: 63,151 utility class tokens (1,560 distinct)
  across 485 files still need converting to gui props. `tailwind.config.ts`
  (dead — v4 is CSS-first and never read it), `tailwindcss-animate`,
  `components.json`, `@tailwindcss/typography` and `autoprefixer` ARE gone, as
  are shadcn and `@radix-ui/*` (0 lockfile references). Convert files to gui
  props; do not add new utility classes.

  **Why the remaining conversion is not a codemod.** gui silently ignores a
  prop it does not know — in a JSX spread there is no error and no type
  failure, just an element that is not styled. This file already records five
  separate defects with that exact shape (`animation` vs `transition`, `$gtSm`
  vs `$sm`, `tag` vs `render`, `lineHeight={1.1}` → `1.1px`, `letterSpacing`
  as a prop). A mechanical className→prop pass would therefore produce a build
  that is green and a site that is wrong, and this repo has **no visual
  regression coverage** to catch it: `e2e/gates` asserts four specific
  invariants over the export, and there is not one `toHaveScreenshot` in the
  suite. Screenshot baselines are the precondition for the rest of the
  migration, not an optional extra. Convert by route, verify by rendering.

- **A Tailwind class that does not exist fails silently too**, which is its own
  bug family — `bg-grid-white`, `scrollbar-hide`, `prose`,
  `hover:border-white/30/50` all emitted nothing while looking like styling.
  To find them: extract every class token from source, extract every class
  selector from `out/_next/static/css/*.css`, subtract. Read the difference
  rather than applying it — `ts-*` and `text-gradient-steel` are real, and
  live in local `<style>` blocks.

- **Plain CSS goes in the `hz-` namespace** (`.hz-prose`, `.hz-grid`,
  `.hz-scrollbar-none`), parameterised by CSS custom properties. This is where
  styling lands when it is neither a gui prop nor a token. Do NOT invent
  utility classes — a utility vocabulary of our own is just Tailwind wearing
  our name.

## Brand Colors (Monochrome)

The values live in **`@hanzo/design`** (`tokens/colors.css`), imported by
`app/globals.css`. This site does NOT define them — a local `:root`/`.dark`
copy is how hanzo.ai drifted from console/chat/app.

- Primary: `#ffffff` (white)
- Secondary: `#d4d4d4` (neutral-300)
- Hover: `#a3a3a3` (neutral-400)
- Brand CSS var: `--brand: #e4e4e7`
- @hanzo/design is DARK-FIRST: `:root` is dark, `.light` retunes. next-themes
  writes the theme name as a class on `<html>`, so `.light` lands where the
  stylesheet expects it.
- `tokens/base.css` is imported into `layer(base)`. Bare, its element
  selectors (`a { color: … }`) outrank EVERY layered utility — unlayered wins
  regardless of specificity — and the header CTA rendered white-on-white.
- Naming: `lib/constants/brand.ts` still carries the JS-side constants.

## The globe is the one place colour is allowed

`components/webgl/PointGlobe.tsx` is the site's only WebGL motif — raw GL and
inline GLSL, no dependency, code-split behind `next/dynamic({ ssr:false })`.
Three consumers: the cloud hero, `ChatHero`, `HanzoNetworkSection`.

The chrome stays monochrome. What carries hue is CONVERSATIONS — great-circle
paths between agents, spawned and retired continuously, each with a travelling
head — in blue → violet → pink → amber. That split is the rule: if a viewer
sees colour on this site, something is talking.

Two traps cost a full rebuild of this component, and neither announces itself:

- **WebGL clamps `lineWidth` to one DEVICE pixel.** At DPR 2 that is half a CSS
  pixel, so a coloured `LINE_STRIP` on black is invisible — which is exactly how
  the previous globe's arcs and its nearest-neighbour mesh disappeared. Paths
  are drawn as runs of POINTS, whose size we control. Never reach for a line.
- **`WEBGL_lose_context` in an effect's cleanup is permanent for that canvas.**
  React hands the SAME element back on a remount, so `getContext` returns the
  dead one, every shader reports a compile failure, and the component's own
  guard hides the canvas for good. Strict mode remounts everything once, so the
  globe was invisible in `next dev` while prod was fine. The explicit
  `deleteBuffer`/`deleteProgram` calls are what free the memory; the context
  dies with the element.

Sizing lives at the CALL SITE, and it is height, not width: the sphere's
on-screen diameter is a fixed fraction of the canvas height (48° vertical FOV at
a fixed camera distance) and owes nothing to how wide the canvas is. Fitting the
canvas to a wide, short hero therefore yields a small globe adrift in black —
overflow the section's height instead.

## Key Files

```
app/(marketing)/<slug>/page.tsx   # Flat product pages — /dev, /chat, /vector, etc.
app/(marketing)/blockchain/<x>/   # Web3 pages
lib/constants/
  navigation-data.ts              # Single source of truth for header + footer menus
  brand.ts                        # Brand tokens
components/navigation/
  DesktopNav.tsx                  # Header layout (Meet Hanzo / Products / Learn / Docs / Pricing)
  products-menu/index.tsx         # Reads productsNav from navigation-data
  resources-menu/                 # Reads resourcesNav from navigation-data
```

## Header Menu (canonical)

Single source: **`lib/data/cloud-primitives.ts`** → `cloudCategories`. It drives
`lib/constants/navigation-data.ts` (`productsNav`), the mega-menu, the
`/products/<slug>` category landing pages, and the generated `/cloud/[slug]`
overview pages — so the nav, the pages, and the routes can never drift.

**Top level**: Meet Hanzo · Products · Learn · Docs · Pricing

**Products dropdown** — 10 cloud-primitive categories (two rows of five),
positioned "Open AI Cloud — GCP-compatible. Open source. On-chain.":

| Category | `/products/<slug>` | Items |
|---|---|---|
| AI       | `/products/ai`       | Models, Agents, Inference, Fine-tuning, Embeddings, Evals |
| Compute  | `/products/compute`  | GPUs, Machines, Containers, Functions, Edge, Jobs |
| Data     | `/products/data`     | Vector, SQL, KV, Object Storage, Datastore, DocDB |
| Network  | `/products/network`  | Gateway, VPC, DNS, CDN, Load Balancer, Service Mesh |
| Security | `/products/security` | IAM, Authz, KMS, HSM, Secrets, Audit |
| Dev      | `/products/dev`      | CLI, SDKs, API, Playground, IDE, Desktop |
| Platform | `/products/platform` | Projects, Environments, Builds, Registry, Releases, Pipelines |
| Observe  | `/products/observe`  | Logs, Metrics, Traces, Dashboards, Alerts, Cost |
| Web3     | `/products/web3`     | Settlement, Chains, Wallets, Tokens, Indexer, Attestations — **Lux** → lux.cloud |
| Apps     | `/products/apps`     | Chat, Bot, Search, Crawl, Studio, Console |

- Each mega-menu **category header links to its `/products/<slug>` page**
  (`app/(marketing)/products/[categoryId]/page.tsx`, generated from
  `categorySlugs`); the page is `components/cloud/CloudCategoryOverview.tsx`.
- **Web3 = Lux Network.** Those leaves hand off to **lux.cloud** under the
  **Lux** brand (white-label: never the Hanzo mark on a Lux surface); no Hanzo
  console link, docs → docs.lux.cloud.
- Product ↔ `/v1/<svc>` ↔ plan/usage mapping: **`docs/product-service-map.md`**
  (reconciled against `~/work/hanzo/cloud/subsystems/subsystems.go`).

> `lib/data/product-taxonomy.ts` is a SEPARATE, legacy catalog still used by
> `components/products/ProductPageTemplate` (the ~80 bespoke `/<slug>` product
> pages) and the orphaned `solutions/` pages — it is NOT the products-nav source.

## "60 capabilities" is a layout constant, and 32 of what we sell does not answer

`capabilityCount` (`lib/data/cloud-primitives.ts:485`) is derived, not typed —
but it derives from `rawCategories` (`:168`), which is 10 categories of exactly
6. The interface says so out loud: `CloudCategory.items` is commented *"Exactly
six primary primitives."* So 60 is the product of a mega-menu that wants two
rows of five with six leaves each. It is a **layout constraint wearing the
costume of a measurement**, and it is not the number of anything we serve.

There are five lists, and no two agree:

| List | Where | Count |
|---|---|---|
| Site taxonomy | `lib/data/cloud-primitives.ts` | 10 categories × 6 = **60** |
| Legacy taxonomy | `lib/data/product-taxonomy.ts` | **9** categories |
| Docs prose | `hanzo-docs/docs` (7 files) | **67** capabilities / 8 movements |
| Curation manifest | `hanzoai/openapi` `capabilities.yaml` | 8 domains over **180** tags |
| Commerce catalog | `GET /v1/commerce/catalog?brand=hanzo` | **84** products |
| **The served document** | `GET /v1/openapi.json` | **1,679 paths · 2,307 operations · 179 tags** |

Only the last one is authority: it is a projection of the routers cloud
mounted, so a path in it exists by construction. Everything above it is
editorial.

Measured 2026-08-03, `node scripts/audit-catalog.mjs`:

```
84 products advertised · 52 answer (62%) · 32 do not
  renamed 13 · client 7 · external 1 · absent 11
```

**Every one of those 32 is marked `"status": "enabled"` and every one is a live
404.** Four different problems were hiding in one number:

- **renamed (13)** — the capability is real, the `apiPath` is misspelt. `vpc`
  vs `/v1/vpcs`, `wallet` vs `/v1/wallets`, `alerts` vs `/v1/o11y/alerts`,
  `indexer` vs `/v1/indexers`, `zero-trust` vs `/v1/networks`. Pure catalog
  bugs, cheapest thing on the list.
- **client (7)** — `cli`, `sdks`, `ide`, `desktop`, `console`, `studio`, and
  `api` itself. These CONSUME the API; no `apiPath` can ever be right. They
  need a `kind` field, not a path. A category error, not a gap.
- **external (1)** — `nodes` is `luxfi/node`, served by Lux, not api.hanzo.ai.
- **absent (11)** — advertised, enabled, and nothing serves it. This is the
  only bucket that is a commercial problem and the only one no code change in
  this repo can fix: `edge`, `cdn`, `hsm`, `mpc`, `settlement`, `tokens`,
  `attestations`, `datasets`, `scores`, `score-configs`, `annotation-queues`.

Three of those have real repos that were simply never mounted into cloud —
`hanzoai/edge` (Rust, 13 crates), `hanzoai/hsm` (a Go library that belongs
*behind* `/v1/kms`, not beside it), `hanzoai/cdn` (our own asset bucket, never
a tenant product). Shipping them is a mount, not a build.

### The chain, and the link that was missing

    site taxonomy  ->  commerce catalog  ->  served document
    (cloud-primitives)   (/v1/commerce/catalog)   (/v1/openapi.json)
    \___ e2e/catalog-agreement.spec.ts ___/
                                     \___ scripts/audit-catalog.mjs ___/

The first link was already asserted and passes. The second was asserted by
nothing, which is exactly where the drift accumulated. `scripts/audit-catalog.mjs`
closes it, wired as the `catalog answers` gate in `hanzo.yml`.

Same two rules as `sync-pricing.mjs`, for the same reasons: it **never fails the
build on an unreachable API** (a marketing page must not need the API up to
deploy — no network, no verdict, exit 0), and its `KNOWN_UNSERVED` ratchet **may
only shrink**. A product that fails and is not on the list fails the run; an
entry that starts answering fails the run too, so a fix is forced to delete its
own exemption. Do not add entries to make it pass.

### Do not hydrate the menu from the catalog yet

`cloud-primitives.ts:24-27` anticipates replacing `rawCategories` with a live
read of `/v1/commerce/catalog`. **That swap would make the site worse today**:
it renders 84 products of which 32 are 404s, against the current 60 that are at
least hand-checked. Hydration is correct only once `audit-catalog.mjs` reports
zero `renamed` and the `client` rows carry a `kind` instead of an `apiPath`.
Clear the ratchet first, then hydrate — the gate is the precondition, not the
sequel.

Three-way drift is already visible in one row. The Web3 six: this file said
*Oracles* where the code says *Attestations* (fixed above), while the catalog
carries **eight** Web3 products including `referrals` and `networks`. That is
the drift in miniature, and it is why the gate reads the document rather than
any list a human keeps.

## Removed (2026-05-07 cleanup)

- **Solutions dropdown** — every link pointed to non-existent
  `/industries/*` and `/solutions/*` pages (50+ dead links). Component
  `components/navigation/SolutionsMenu.tsx` and the `solutions-menu/`
  directory deleted; `capabilitiesNav` / `industriesNav` exports removed.
- **`/products/<cat>/<x>` URLs** — menu now points to flat `/<slug>` URLs
  matching the actual route layout under `app/(marketing)/`.
- **`/runtime`** menu item — no live page or published image; removed
  pending Runtime product launch.

## Cruft sweep (done)

- Removed `components/shadcn-v4/` (unrouted Tailwind-migration demo) plus
  ~245 other provably-dead Vite→Next migration components — old homepage
  iterations (`index3`–`index6`, `hero/`, `landing/`, `features-showcase/`,
  `animations/`), replaced product/section trees (`balancer`, `zen`,
  `observability`, `open-source`, `hanzoapp`, `hanzodev`, the old `pricing`
  subset, …), and orphan utils (`contexts/Web3Context`, `hooks/use-mobile`,
  `lib/og-image`, `ui/{code-block,masonry-grid,radix-button}`). Each was
  confirmed unreachable by a full static import-graph walk from the App
  Router entrypoints (no dynamic imports exist, so the graph is complete).
- Already resolved before this sweep: `products-menu/product-data.ts`
  (deleted; `landing/FeatureShowcase.tsx` reads `navigation-data.ts`),
  `/home2`, `/referrals`, `/referral-program`. `/referral` is the single
  surviving referrals page — keep it.

## One known duplication (load-bearing — do NOT blind-delete)

- `lib/constants/navigation.ts` (NOT `navigation-data.ts`) and
  `lib/constants/solutions-data.ts` back the `/solutions` section, which is
  still LIVE: linked from `Footer.tsx`, `CommandPalette.tsx`, `Features.tsx`,
  `PlatformHeader.tsx`, `IndustriesSection.tsx`, and the `[...slug]` page
  serves real footer links (`/solutions/agents`, `/solutions/rag`, …).
  Collapsing onto `navigation-data.ts` means migrating those pages and
  scrubbing those links first; until then both files stay.

## Design System

- Page shapes: `components/marketing/page-kit.tsx` (gui-native) — `PageHero`,
  `Section`, `CardGrid`, `Cta`, `Prose`, `Page`. Pages pass CONTENT, not
  styling. `Prose` deliberately stays an element tree + `prose.css`: gui's
  `Text` is `white-space: pre-wrap`, right for a label and wrong for a
  paragraph authored across several source lines.
- Hero: radial gradient bg (800px, blur 100px, 15% opacity)
- Animation: framer-motion, 0.4s base, 0.05s stagger
- Font: Geist Sans (`next/font/google`), bound to @hanzo/design's
  `--font-sans` in `app/globals.css` — one binding, one place.

### Mobile invariants (stated once, in `app/globals.css`)

- **The page never scrolls sideways.** `overflow-x: clip` on `html` AND
  `body` — the scrollport is the documentElement, so clipping body alone still
  let a 4px sideways scroll through on /about (a `whileInView` x:20 enter is
  20px wider than a 390px viewport for the length of the animation).
- **The touch floor is pointer-conditional**: 24px always (WCAG 2.5.8 AA), 44px
  under `@media (pointer: coarse)` (Apple HIG / WCAG 2.5.5 AAA — a thumb target).
  Still a POLICY, not a per-button decision: it had been written as a `min-h-11`
  utility per footer link and consequently forgotten on the wordmark (24px), the
  search button (36px) and the GitHub icon (20px) of the same page. But stating
  44px for EVERY pointer was the wrong policy — it stretched ten of the eleven
  controls on the homepage, turning the 21px "Chat with Enso" pills into 44px
  slabs. A mouse does not need a thumb target.
- Verify at 390px with Playwright before claiming mobile works.

## Static Export

`next.config.ts` uses `output: 'export'`. GitHub Pages has never been the target
and is not a deploy surface on this estate — the export goes to the Sites plane.

`output: export` without `trailingSlash` writes a route as the FLAT file
`pricing.html`, not `pricing/index.html`. That is why `apps/sites` in hanzoai/cloud
has to try `<rel>.html` as a resolution candidate, and why a Next export served
only its homepage before it did. Do not "fix" that by setting `trailingSlash: true`
here: it rewrites every canonical URL to work around a server that now handles both
conventions.

There is no SPA fallback and there must not be one. Every dynamic segment ships
`generateStaticParams`, so the export emits real HTML per route. Do NOT reintroduce
`cp out/index.html out/404.html` — that clobbers the export's real 404 with the
homepage, so every broken inbound link answers 404 while rendering "What can I help
with?", which is indistinguishable from a good visit.

## Telemetry

All telemetry is one client, `@hanzo/event`, wired once in `app/providers.tsx`:

    <AnalyticsProvider config={{ product: 'site', host: EVENT_HOST,
                                 ingestKey, getToken, enabled }}>
      -> POST https://api.hanzo.ai/v1/event   body { batch: [Event...] }

Cloud resolves every dashboard as a lens over that one stream, so there is no
second client and no tag on any Hanzo surface:

| Lens | Host | Reads |
|---|---|---|
| Errors | `sentry.hanzo.ai` | `GET /v1/errors` — the `type:'error'` events in `hanzo.events` |
| Web analytics | `analytics.hanzo.ai` | pageviews, referrers, sessions |
| Product insights | `insights.hanzo.ai` | funnels, retention, feature usage |

`analytics.hanzo.ai/v1/event` is a different protocol — the Umami tracker door,
whose body is a bare array of `hz.js` envelopes. Pointing the SDK there answers
`400 "expected array, received object"`. The door is `api.hanzo.ai`.

**There is no Sentry DSN.** `@hanzo/event` accepts one, and it authenticates a
separate send to `/v1/sentry/<projectId>`. `sentry.hanzo.ai` does not read that
store — it reads `GET /v1/errors`, which the event stream already writes
(universe `infra/k8s/ingress/routes.yaml`). One credential covers every lens.

### The ingest key

Anonymous traffic is admitted without a credential and filed under the reserved
`$public` tenant. That lane stores only `pageview` and `error`, drops `identify`
/ `group` / custom events, keeps only allowlisted fields, is per-IP rate limited
(<=50 events, <=64 KiB), and stores nothing under `DNT: 1` / `Sec-GPC: 1`. Our
own org cannot read `$public`.

The `pk-` key resolves the same traffic to the real org at full capability, which
on a logged-out marketing site is the difference between having interaction
analytics and having none. The prefix is `pk-` (`cloud.PublishablePrefix`);
another prefix is not read as a key and misfiles to `$public` without a 403. A
presented-but-unresolvable key fails closed with 403.

Mint with `POST /v1/keys` `{"type":"publishable"}`, store as `deploy/EVENT_INGEST_KEY`
in KMS. `/v1/keys` is the one key surface: one noun, the method carries the
operation, and the class is a field.

ONE name and ONE location, shared with hanzo.chat and hanzo.app, matching the
default path of the shared `hanzoai/ci` reusable's `build_secrets`. The key is
per-ORG, not per-property — one `pk-` resolves the org for every property, and the
SDK's `product` field (`site` here) is what separates them in the warehouse. The
env var carries only the prefix its bundler requires: `NEXT_PUBLIC_` for Next here,
`VITE_` for Vite in hanzo.chat, over the same `EVENT_INGEST_KEY` suffix.
`.hanzo/workflows/deploy.yml` reads it before the build, because `NEXT_PUBLIC_*`
is inlined into the bundle at build time.

### Capture

- `AnalyticsProvider` fires the first pageview and captures errors;
  `<Pageview/>` counts route changes; `ErrorBoundary` catches React render
  errors, which never reach `window.onerror`.
- `<ObserveProvider>` rides the same client through context for interaction
  capture (`$click`/`$input`/`$change`/`$submit`/`$view`), input values redacted.
  `nav={false}` leaves history alone, since `<Pageview/>` already counts routes.
- Consent honors Do Not Track and Global Privacy Control. Neither `@hanzo/event`
  nor `@hanzo/observe` reads those signals, so `telemetryEnabled()` in
  `app/providers.tsx` passes `enabled` and every surface must do the same.
- The client never sends the org; cloud stamps the tenant from the bearer. That
  is the one identity rule that still holds: a tenant a client can name is a
  tenant a client can get wrong.
- `identify(sub, {email, name})` — the subject joins the person across
  properties, and the traits are what make that subject legible. This reverses
  an earlier "never an email, PII-free by construction" rule, which was the
  wrong goal for first-party data about our own users: it wrote a warehouse of
  opaque subjects where every funnel could count people and none could say
  which person. Both traits come from the same hanzo.id userinfo response the
  subject is read from, so nothing new is collected. Traits ride an
  AUTHENTICATED session only — the anonymous `$public` lane drops `identify`
  outright — and consent still gates everything through `telemetryEnabled()`.
  Secret redaction in the SDK is unconditional and is not affected.


## Brand marks: real logos only, and one place they come from

`components/models/ProviderMark.tsx` is the ONE mark table. Bodies are copied
UNMODIFIED from `hanzoai/icons` `packages/static-svg/icons/<slug>.svg` (our MIT
lobe-icons fork) — mono `currentColor` on a 24-unit viewBox. The fork is not on
npm and its barrel drags `antd` + `@lobehub/ui` in for a picture, so the subset
is vendored, the same call `hanzo.app` and `hanzo-docs` made. **Never draw a
logo.** A monogram is the documented last resort and only for a lab genuinely
absent from the fork (14 of 59 today — community fine-tuners and brand-new
labs); everything else has a real mark, so reach for the fork before inventing.

Three rules the page cost us before they were written down:

- **The model's family beats the lab that trained it.** Our gateway namespace
  puts `gpt-5`, `claude-opus-4.8`, `zen5` and `enso` all under `hanzo`, so
  reading the lab first drew the Hanzo H on every one of them. `markOf` takes
  the leading run of letters in the id first and falls back to the lab.
- **`enso` and `zen` are NOT the same glyph.** Zen is the ensō left OPEN (the
  gap sits where a Q's tail would go); Enso is the router that completes the
  circle, so its ring is CLOSED. Geometry is `hanzo.app`'s verified pair.
- **No chip.** Marks render bare at the current text colour. The predecessor
  painted a CSS mask inside a `rounded-lg` box, which clipped the corners off
  every square mark — the H worst of all. Every source declares
  `fill-rule="evenodd"` on its root, so the wrapper repeats it: without it
  Mistral's inner square fills in and the mark is quietly wrong.

`public/logos/*.svg` is a SECOND representation of eight of these, and it exists
for exactly one reason: `AccuracyCostScatter` draws them through `<image href>`,
which needs a URL. Same canonical source, regenerate from it, never redraw. An
SVG behind `<image>` is its own document with no CSS context, so `currentColor`
resolves to BLACK — fine on the light `measured` disc, near-invisible on the
dark `reported` one. That is unfixed and unfixable from CSS; the fix is the disc
colour, not the mark. `/logos/partners/` is a different set and unrelated.


## Certification Claims (Honest)

- SOC 2: "Audit in Progress" (not "Certified")
- HIPAA: "HIPAA Ready" / "BAA Available" (not "Compliant")
- ISO 27001: removed (not yet certified)
- No specific datacenter locations; use "Global High-Performance Edge"


## Model prices have one owner, and the snapshot is not a copy of it

A per-token rate is owned by the catalog in commerce.hanzo.ai and published at
`api.hanzo.ai/v1/pricing`. `scripts/audit-price-literals.mjs` (run from
`hanzo.yml`) fails the build on any second copy; its `ALLOWED` ratchet may only
shrink. It skips its own file — it states the rule, so its docstring examples
are the specification, not a violation, and scanning itself made it fail on its
own prose from the moment it was committed.

`components/pricing/APIPricing.tsx` reads `/v1/pricing/models` live, but that is
NOT the path most readers take: the API pins `access-control-allow-origin` to
`https://hanzo.ai` exactly, so every preview deploy and local run renders
`lib/data/pricing.json` instead. That file is therefore load-bearing, and it
rotted to four months stale because `scripts/sync-pricing.mjs` existed but was
never invoked. `prebuild` now runs it. It:

- **never fails the build** on an unreachable API — the committed snapshot is
  the designed fallback, and a marketing page must not need an API to deploy;
- **never regresses** — the endpoint currently serves an OLDER catalog
  (2026-03-14) than the committed snapshot (2026-05-05), and writing it would
  silently delete four months. Only a genuinely newer payload is written;
- **stamps provenance** — `source` + `fetched` travel with the data, because a
  snapshot that cannot say how old it is rots invisibly;
- **says so on every build** when Enso is missing.

**Enso is still absent from the public price list, and no code change fixes
that.** The catalog itself carries zero Enso rows, so there is nothing to
render. The cards already sort Enso first (`ENSO_ORDER`) and the pipeline is
wired end-to-end — verified against a synthetic newer catalog, which wrote,
stamped and reported all three rows. Re-run `pnpm sync:pricing` once commerce
publishes; do NOT hand-type the rates. (`enso-vl` / `enso-vl-pro` are internal
SKUs and must never appear here — the sync prints every Enso name it sees, so a
leak shows up in the build log.)

`STATIC_DATA` takes EVERY field from that one snapshot. `hanzoModels` used to
come from `@zenlm/models` instead, which made the component disagree with
itself — the package's 55 hand-maintained rows for a failed fetch, the API's 41
for a successful one — and meant refreshing the snapshot could not have helped,
because the rows it refreshed were not the rows being rendered.

`lib/leaderboard.ts` and `components/enso/EnsoLanding.tsx` still hold correct
literals on purpose. They are the only public surfaces stating the true
4/20 · 2/4 · 5/25, so they convert to readers AFTER the catalog is authoritative
— flipping them first replaces right numbers with an empty feed.
