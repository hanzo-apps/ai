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
- Deploy: Static export (`output: export` in `next.config.ts`) → Cloudflare Pages
  (`.hanzo/workflows/deploy.yml`, project `hanzo-ai`, CF creds from KMS)

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
- **44px is the touch floor**, for `button`, `[role=button]` and every control
  in the header/footer. It is a POLICY, not a per-button decision: it had been
  written as a `min-h-11` utility per footer link and consequently forgotten on
  the wordmark (24px), the search button (36px) and the GitHub icon (20px) of
  the same page. @hanzo/ui's own size ramp tops out at `h-10` (40px), so the
  floor has to be stated by the host.
- Verify at 390px with Playwright before claiming mobile works.

## Static Export

`next.config.ts` uses `output: 'export'` for static deploy to GitHub Pages.
SPA routing works via the static export's automatic 404.html fallback.

## Telemetry (one client, one door)

All telemetry is the ONE `@hanzo/event` client, wired once in `app/providers.tsx`:
`<AnalyticsProvider config={{ product: 'site', host: EVENT_HOST, ingestKey,
getToken, enabled }}>` → `POST https://api.hanzo.ai/v1/event`.

**The door is `api.hanzo.ai`, and only `api.hanzo.ai`.** Every endpoint request
goes there; there is no second API host. Both `api.hanzo.ai` and
`analytics.hanzo.ai` expose a path spelled `/v1/event`, but they are DIFFERENT
protocols and pointing the SDK at the wrong one fails silently in the browser:

- `api.hanzo.ai/v1/event` — the cloud front door. Body `{ batch: [Event…] }`.
  Cloud fans the one stream out to the web (analytics), product (insights) and
  error (sentry) lenses server-side.
- `analytics.hanzo.ai/v1/event` — the Umami tracker door. Body is a BARE ARRAY of
  `hz.js` envelopes and rejects anything else with
  `400 "Invalid input: expected array, received object"`.

That 400 was live on hanzo.ai on every page load. No client tag on ANY Hanzo
surface: `analytics.hanzo.ai/hz.js` is gone from hanzo.app and hanzo.chat too —
each mounts its own `@hanzo/event` client, so a tag could only double-count the
pageviews that client already posts. (The older direct `script.js` and inline
PostHog snippets were removed earlier, `components/HanzoAnalytics.tsx` deleted.)

Anonymous/logged-out views are ADMITTED without a key. `api.hanzo.ai/v1/event` is
the ONE door for every auth context, anonymous included: a request with no bearer
and no key is admitted and attributed SERVER-SIDE to a reserved public tenant
(`$public`), never to a real org and never to anything the request names.

**But admitted is not the same as useful, so this site DOES want a `pk-` key.** An
earlier revision of this file said "do not add a publishable `pk-` key for this."
That was defensible while pageviews were the only signal; it is wrong now that
`@hanzo/observe` is mounted, for two reasons that both follow from the narrowness
documented just below:

- `$public` is a partition **our own org cannot read**, so anonymous pageviews land
  somewhere our funnels can't see.
- The anonymous allowlist stores ONLY `pageview` and `error`. Every interaction
  observe emits (`$click`/`$input`/`$change`/`$submit`/`$view`) is a `type:"event"`
  and is **dropped**. hanzo.ai is almost entirely logged-out traffic, so with no key
  the interaction capture we just mounted collects essentially nothing.

Provision `site/HANZO_INGEST_KEY` in KMS (read at build time by
`.github/workflows/deploy.yml`; `POST /v1/ingest/keys` to mint). **The prefix is
`pk-`** (hyphen — `cloud.PublishablePrefix`). A `pk_…` value is not recognized as a
publishable key and is not "presented" either, so it does not 403 — it falls through
to the anonymous lane and misfiles to `$public`. Wrong prefix fails silently.

The anonymous lane is deliberately narrow. Only `type:"pageview"` and
`type:"error"` are stored — `identify`, `group`, and custom events are dropped and
counted in the `{accepted,dropped}` receipt. The stored event name is server-chosen
(`$pageview` / `$error`), and only allowlisted fields are kept: the client property
bag, `personId`, `groupId`, and every commerce field are dropped, so an anonymous
caller can neither name a tenant nor persist a key it chose. Anonymous ingest is
per-IP rate-limited and bounded (≤50 events, ≤64 KiB — over either is rejected, not
truncated), and `DNT: 1` / `Sec-GPC: 1` store nothing.

A PRESENTED-but-unresolvable key still fails closed with
`403 "valid bearer or a resolvable ingest key required"` — that 403 now means a
broken credential, not a logged-out visitor. Events sent WITH a valid bearer are
unchanged: real org, full capability.

### THREE telemetry planes — orthogonal, never collapsed
Analytics is NOT error capture. Each plane has its own first-party host:

| Plane | Host | What it holds |
|---|---|---|
| **Errors** | **`sentry.hanzo.ai`** | error capture, **full AST**, **session replay**, the detailed error dashboard. Self-hosted Sentry — WE STILL USE IT. |
| **Web analytics** | `analytics.hanzo.ai` | "boring web analytics" — pageviews, referrers, sessions (Umami fork). |
| **Product insights** | `insights.hanzo.ai` | product analytics — funnels, retention, feature usage, flags. |

All three must be **live and wired ZERO-CONFIG** for every template site and every
`@hanzo/ui` / `@hanzo/gui` based app — shipped in the shared UI layer, never
copy-pasted per repo. A new site gets errors + analytics + insights with no setup.

- **Auto pageview** on load + route change (`usePageview(usePathname())`).
- **Errors go to `sentry.hanzo.ai`** (AST + session replay), with `<ErrorBoundary>`
  for React render errors. Do NOT describe analytics as "the Sentry replacement" —
  an earlier revision of this file said that and it was wrong. Nor is there any
  server-side fan-out from `/v1/event` into Sentry: the error plane is a SECOND,
  independent send (a Sentry envelope to the DSN host) and it requires
  `NEXT_PUBLIC_HANZO_EVENT_DSN`. **With no DSN the plane is inert and the dashboard
  gets nothing** — the site read that var for a while with nothing setting it, which
  is precisely how it reported zero errors. Provisioned as `site/HANZO_EVENT_DSN` in
  KMS, fetched pre-build by `.github/workflows/deploy.yml`.
- **Logged-out marketing** is ADMITTED without a credential (anonymous pageviews and
  errors land under `$public`), but wants the `pk-` ingest key anyway — `$public` is
  unreadable by our org and the anonymous allowlist drops every observe interaction.
  See the ingest-key section above.
- **Interaction autocapture**: `<ObserveProvider>` (`@hanzo/observe`) rides the SAME
  client via context, inside `AnalyticsProvider`. `nav={false}` here on purpose —
  `<Pageview/>` already counts route changes, and letting observe patch history too
  would double-count every navigation. Input values are redacted by default.
- **Consent**: honors Do Not Track / Global Privacy Control (via `enabled`), gating
  BOTH planes and the observe engine. Note this is implemented HERE
  (`telemetryEnabled()` in `app/providers.tsx`), not in the SDK: neither
  `@hanzo/event` nor `@hanzo/observe` reads `navigator.globalPrivacyControl` /
  `doNotTrack`, so every surface must pass `enabled` itself. Do not delete it
  assuming the library covers it.
- **The client never sends the org.** No `group()` call: cloud stamps the tenant from
  the validated bearer. `identify(user.id)` is the only identity sent, never an email.
- **Product moments**: `EVENTS.CHAT_STARTED` (apex composer + nav "Try Hanzo"),
  `EVENTS.FEATURE_USED` (home pills); the funnel events
  (pricing/signup/waitlist/referral) live in their own pages.

## Certification Claims (Honest)

- SOC 2: "Audit in Progress" (not "Certified")
- HIPAA: "HIPAA Ready" / "BAA Available" (not "Compliant")
- ISO 27001: removed (not yet certified)
- No specific datacenter locations; use "Global High-Performance Edge"
