# hanzo.ai

## Project

Main Hanzo AI marketing site. **Next.js 14 App Router** (NOT Vite — migrated).

- URL: https://hanzo.ai
- Stack: Next.js 15 + React 19 + TypeScript + Tailwind v4 + Framer Motion
- Node: v20+ (`.nvmrc`)
- Dev: `pnpm dev`
- Build: `pnpm build`
- Deploy: Static export (`output: export` in `next.config.ts`) → Cloudflare Pages
  (`.github/workflows/deploy.yml`, project `hanzo-ai`, CF creds from KMS)

## Two faces, one export

This ONE static export (`out/`) serves TWO sites — split by host, not by build:

1. **hanzo.ai apex** (Cloudflare Pages) — the clean, openai.com-style
   **chat-centric landing**. Route: `app/page.tsx` → `components/home/HomeLanding`.
   It lives at the app ROOT (outside `(marketing)`) so only the root layout
   wraps it; it ships its OWN nav + footer (`components/home/*`). "What can I
   help with?" composer forwards to `hanzo.chat/?q=…`; nav deep-links to
   cloud.hanzo.ai; **Foundation → zoo.ngo** (Zoo Labs governs Hanzo).
2. **cloud.hanzo.ai** (k8s `cloud-site` image, `ghcr.io/hanzoai/cloud-site`,
   `hanzoai/static`) — the **detailed product/marketing site**. `Dockerfile.production`
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

## Brand Colors (Monochrome)

- Primary: `#ffffff` (white)
- Secondary: `#d4d4d4` (neutral-300)
- Hover: `#a3a3a3` (neutral-400)
- Brand CSS var: `--brand: #e4e4e7`
- Centralized in `lib/constants/brand.ts`

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

- Hero: radial gradient bg (800px, blur 100px, 15% opacity)
- Cards: `bg-neutral-900/50 border border-neutral-800 rounded-xl`
- Animation: framer-motion, 0.4s base, 0.05s stagger
- Buttons: rounded-full, brand primary + neutral-700 border secondary
- Font: Geist Sans (`next/font/google`)

## Static Export

`next.config.ts` uses `output: 'export'` for static deploy to GitHub Pages.
SPA routing works via the static export's automatic 404.html fallback.

## Telemetry (one client, one door)

All telemetry is the ONE `@hanzo/event` client, wired once in `app/providers.tsx`:
`<AnalyticsProvider config={{ product: 'site', host: analytics.hanzo.ai, ingestKey,
getToken, enabled }}>` → `POST https://analytics.hanzo.ai/v1/event`. The host is the
first-party **analytics.hanzo.ai** property (Umami fork) — the SAME dashboard the
two static sites (hanzo.app, hanzo.chat) feed via the `analytics.hanzo.ai/hz.js`
tag, so every Hanzo surface streams to one door. `ANALYTICS_HOST` is its own env
(`NEXT_PUBLIC_ANALYTICS_URL`), decoupled from the API base. No per-lens client tags
on this Next app for ANALYTICS (the old direct `script.js` and inline PostHog
snippets were removed, `components/HanzoAnalytics.tsx` deleted).

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
  an earlier revision of this file said that and it was wrong.
- **Logged-out marketing** ingests via a publishable key
  `NEXT_PUBLIC_HANZO_INGEST_KEY` (pk_, write-only, safe in the bundle) when the
  analytics.hanzo.ai ingest requires one; otherwise anonymous events fail closed.
- **Consent**: honors Do Not Track / Global Privacy Control (via `enabled`).
- **Product moments**: `EVENTS.CHAT_STARTED` (apex composer + nav "Try Hanzo"),
  `EVENTS.FEATURE_USED` (home pills); the funnel events
  (pricing/signup/waitlist/referral) live in their own pages.

## Certification Claims (Honest)

- SOC 2: "Audit in Progress" (not "Certified")
- HIPAA: "HIPAA Ready" / "BAA Available" (not "Compliant")
- ISO 27001: removed (not yet certified)
- No specific datacenter locations; use "Global High-Performance Edge"
