# hanzo.ai

## Project

Main Hanzo AI marketing site. **Next.js 14 App Router** (NOT Vite — migrated).

- URL: https://hanzo.ai
- Stack: Next.js 15 + React 19 + TypeScript + `@hanzo/ui` 8.x on `@hanzo/gui`
  + `@hanzo/design` tokens + Framer Motion. Tailwind v4 is still in the build
  and is being retired — see "UI substrate" below.
- Node: v20+ (`.nvmrc`)
- Dev: `pnpm dev`
- Build: `pnpm build`
- Deploy: Static export (`output: export`) → Cloudflare Pages, project `hanzo-ai`,
  via **`.github/workflows/deploy.yml`** — a STOPGAP that exists because the native
  path cannot run. `.hanzo/workflows/deploy.yml` is only read by the forge, and
  `hanzoai/hanzo.ai` there is `"mirror": true` — read-only, its Actions never fire,
  and there is no writable `hanzo/hanzo.ai` tenant repo (404). So for weeks every
  commit landed where nothing built; that is why the white-border defect and the
  centred nav each survived several fixes. Delete the `.github` file the day a
  writable forge repo exists.
- **The GitHub repo is `hanzo-apps/ai`.** `hanzoai/hanzo.ai` only redirects there.
  Push to the real name — a redirect is why `gh` reports runs under one repo while
  you push to another.
- CF creds are NOT from KMS on this path. The KMS scoped token is DEAD (`code:
  9109`), and `hanzo-apps` carries an org-level `CLOUDFLARE_API_TOKEN` that is the
  same dead value and SHADOWS the repo. A Pages-scoped token is set at repo level,
  which overrides it. Two traps worth keeping: an absent GitHub secret still
  DEFINES the env var as `""`, and wrangler prefers `CLOUDFLARE_API_TOKEN` whenever
  defined — so it will authenticate with nothing rather than fall back; and
  wrangler 4 refuses to start below Node 22 while `.nvmrc` says 20.

## Two faces, one export

This ONE static export (`out/`) serves TWO sites — split by host, not by build:

1. **hanzo.ai apex** (Cloudflare Pages) — the clean, openai.com-style
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
- **`render=`, not `tag=`** — that is how a gui component picks its host
  element. `tag` is not a gui prop: it leaks through as a DOM attribute and the
  page silently ships with zero `<h1>`/`<section>`.
- **Provider**: `components/GuiProvider.tsx` hands gui's generated CSS to the
  prerender via `useServerInsertedHTML`. Without it a statically exported page
  ships markup whose classes have no rules until hydration.
- **Tailwind is NOT gone**: 62,085 utility class tokens across 486 files still
  need converting to gui props. `tailwind.config.ts` (dead — v4 is CSS-first
  and never read it), `tailwindcss-animate` and `components.json` ARE gone.
  Convert files to gui props; do not add new utility classes.

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
| Web3     | `/products/web3`     | Settlement, Chains, Wallets, Tokens, Indexer, Oracles — **Lux** → lux.cloud |
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

`next.config.ts` uses `output: 'export'` for static deploy to GitHub Pages.
SPA routing works via the static export's automatic 404.html fallback.

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


## Certification Claims (Honest)

- SOC 2: "Audit in Progress" (not "Certified")
- HIPAA: "HIPAA Ready" / "BAA Available" (not "Compliant")
- ISO 27001: removed (not yet certified)
- No specific datacenter locations; use "Global High-Performance Edge"
