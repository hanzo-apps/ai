# hanzo.ai

## Project

Main Hanzo AI marketing site. **Next.js 14 App Router** (NOT Vite — migrated).

- URL: https://hanzo.ai
- Stack: Next.js 14 + React 18 + TypeScript + Tailwind CSS + Framer Motion
- Node: v20+ (`.nvmrc`)
- Dev: `pnpm dev`
- Build: `pnpm build`
- Deploy: Static export (`output: export` in `next.config.ts`) → GitHub Pages

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

Defined in `lib/constants/navigation-data.ts`. Single source — every menu surface
(desktop, mobile, footer) reads from the exports here.

**Top level**: Meet Hanzo · Products · Learn · Docs · Pricing

**Products dropdown** (9 categories, 50 items, all linking to live `/<slug>` pages):

| Category       | Items |
|----------------|-------|
| AI & Agents    | Zen Models, Agents, AI Studio, MCP, ZAP, LLM Gateway |
| Developer      | Dev, Code, Extension, Operative |
| Apps           | Chat, Search, Crawl, Base, Commerce, Captable, Dataroom, Sign |
| Compute        | Cloud, Functions, Machines, Edge, Realtime |
| Data           | Vector, SQL, KV, Datastore, Storage, S3 |
| Async          | Flow, Auto, Tasks, Pubsub, MQ, Stream |
| Platform       | IAM, KMS, Platform, DNS, Identity, Console |
| Observability  | Insights, Analytics, Status, Dashboards |
| Web3           | Chains, Exchange, Wallets, Indexer, NFT, Tokens, Pay, Bridge |

Every product item carries a `github:` field linking to its canonical
`https://github.com/hanzoai/<repo>` repo (one-and-only-one-way).

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

## Certification Claims (Honest)

- SOC 2: "Audit in Progress" (not "Certified")
- HIPAA: "HIPAA Ready" / "BAA Available" (not "Compliant")
- ISO 27001: removed (not yet certified)
- No specific datacenter locations; use "Global High-Performance Edge"
