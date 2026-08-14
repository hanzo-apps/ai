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

  **The gates run BEFORE the upload, so a red gate freezes the SITE.** They are
  steps in the publishing job, which is the placement that makes "nothing ships
  ungated" true — and the cost is that a failing gate is indistinguishable from a
  broken deploy unless you look. It happened: four gates went red (111 pages
  inheriting the root layout's title, six redirect shells offered for indexing)
  and hanzo.ai published nothing for a day while pushes kept succeeding.

  Read the STEPS, never hunt for the log — logs live in object storage, not on
  the git pod:

      SELECT s."index", s.name,
             CASE s.status WHEN 1 THEN 'success' WHEN 2 THEN 'failure'
                           WHEN 4 THEN 'skipped' ELSE s.status::text END,
             (s.stopped - s.started) AS secs
        FROM action_task_step s
       WHERE s.task_id = (SELECT t.id FROM action_task t WHERE t.job_id = <job>)
       ORDER BY s."index";

  A step's DURATION is the diagnosis. `Publish to the Sites plane | failure | 1s`
  cannot be an upload of 850 pages; `Gates | failure | 92s` is a real run that
  found something. And a later step reading `skipped` HIDES its own failure —
  fixing the gates is what revealed that the publish had been broken all along.
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
2. **cloud.hanzo.ai** (`ghcr.io/hanzoai/cloud-www` on `hanzoai/static`) — the
   **detailed product/marketing site**. `Dockerfile` takes `ARG SITE_ROOT` and
   `.hanzo/workflows/cloud.yml` passes `SITE_ROOT=cloud`, so it copies
   `out/cloud.html` over `out/index.html` and this host's ROOT is
   **`app/(marketing)/cloud/page.tsx`** (`components/cloud/CloudLanding`) while
   every deep `(marketing)/*` page (docdb, vector, kv, iam, …) serves beneath
   it. The apex `/` change never touches this host (its root is decoupled via
   that `cp`). Traefik router `cloud-hanzo-ai` (universe
   `infra/k8s/ingress/routes.yaml`) → Service `www` → the image.
   Deploy cloud.hanzo.ai = **two hand steps, there is no push-to-deploy**:
   run `cloud.yml` (`workflow_dispatch` only, hand-typed `tag` = next patch
   over the live pin), then bump BOTH `image.tag` and `image.digest` in
   `charts/app/values/hanzo/www.yaml` on the **forge** copy of universe
   (git.hanzo.ai/hanzo/universe — the GitHub mirror is not what CD reads).
   Hanzo CD rolls it from there. Miss the digest and nothing moves.
   The old `infra/k8s/operator/crs/www.yaml` path is retired.

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
Two consumers: `ChatHero` and `HanzoNetworkSection`. It was three — the cloud
hero is a film now (below), and a page gets ONE picture, not two.

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

## A hero film is assets, not code

`cloud.hanzo.ai`'s fold is a film of the console — the real chrome, the real
categories, the model count read from `lib/data/pricing.json`, the Playground
answering a prompt — and it ends on that console running, not on a wordmark the
visitor already sees in the header. The badge, headline, paragraph and the
separate `ProductShot` still it replaced are GONE rather than laid over it: the
film says all four, and what stays beside it is only what a film cannot do —
the three actions and a command to copy.

Two homes, and they do not mix:

| | |
|---|---|
| **`hanzoai/frames`** | the renderer — our fork of the OSS local HTML→mp4 renderer. Headless Chrome, no keys, no service. |
| **`@hanzo/frame`** | the player — the ONE `<Frame>` primitive every Hanzo surface embeds. `hanzoai/frame`. |

`<Frame src="/cloud-hero" alt="…" />` is the whole call site. Two props, no
options: `src` is the shared PREFIX of six rendered files and the names are the
contract — `-tall.mp4` / `-wide.mp4` and a `-first` + `-last` still for each.
The component picks the master by ORIENTATION (a 768×1024 tablet is portrait,
and the wide master would lose 555px off each side), serves the still from
`<picture>` so it is right in SSR with no JavaScript, gives a reduced-motion
viewer the FINAL frame — the finished product — and creates no `<video>` at all
for them, and never loops.

**To give another page a film:** copy `film/cloud`, edit the copy's `film.mjs`,
`make`, then add one `<Frame>`. There is no per-page component and nothing to
register. `film/cloud/film.mjs` writes BOTH masters from one source, because a
phone is 0.56 wide-to-tall and a laptop 1.78 and hand-keeping two HTML files
drifts the first time a line of copy changes; `make` composes, renders, cuts the
stills with ffmpeg and publishes all six into `public/`. `tall/` and `wide/` are
generated and gitignored — the generator and `assets/` are the source.

House rules, learned the expensive way:

- **Film the real product.** Real chrome, real copy, real numbers. The film
  reads its model count from the same snapshot every price on this site comes
  from, so it cannot disagree with the page around it — and
  `scripts/audit-model-counts.mjs` already fails the build on a hand-typed one.
  No invented metric: the Playground rail shows CONTROLS (model, temperature,
  max tokens, stream), never a throughput or a cost this film made up.
- **Geist and Geist Mono only** — `@hanzo/design` allows no third face. True
  black. The dimmest grey that passes `hyperframes check`'s WCAG AA pass is
  `#777`; `#6e6e6e` fails at 4:1.
- **Mind the cover crop.** A 1080-wide master on a 390×844 phone loses ~96px
  off EACH side, so nothing that matters may sit outside the middle 862px.
- **End on the product**, held still for the last few seconds. That final frame
  is what every reduced-motion viewer is served, so it has to look used.
- **Give the `<h1>` a new home in the same commit.** Taking the copy off the
  fold takes the heading with it, and a film cannot hold one — its message is
  the `alt`. cloud.hanzo.ai shipped a live page with ZERO `<h1>` this way. The
  heading moves to the first section that has words, and stays VISIBLE: a
  heading only a screen reader can reach is the message said twice, once badly.
  Nothing catches this — the export is valid, the build is green, and `<h1>`
  count is not one of the four things `e2e/gates` asserts. Check it by hand:
  `grep -c '<h1' out/<page>.html` must be exactly 1.

**Still to film.** Each of these takes its own `film/<name>` and one `<Frame>`:
the ten category pages `/products/{ai,compute,data,network,security,dev,platform,observe,web3,apps}`,
and the 25 generated `/cloud/<slug>` primitive pages. None of them has a film
yet, and none needs new code to get one.

## Key Files

```
app/(marketing)/<slug>/page.tsx   # Flat product pages — /dev, /chat, /vector, etc.
app/(marketing)/cloud/[slug]/     # Generated primitive overviews, from cloudPrimitiveSlugs
app/(marketing)/products/[categoryId]/   # Category landings, from categorySlugs
lib/data/
  catalog.json                    # The committed product snapshot (written by prebuild)
  cloud-primitives.ts             # Reads it; owns the prose and nothing else
scripts/
  catalog.mjs                     # The ONE probe — catalog + served document
  sync-catalog.mjs                # prebuild: fetch, gate on reachability, write the snapshot
  audit-catalog.mjs               # hanzo.yml gate: the drift ratchet
components/home/shell.tsx         # The header/footer chrome; PRODUCTS_TAXONOMY for the mega-menu
lib/constants/brand.ts            # Brand tokens
```

`lib/constants/navigation-data.ts` still derives `productsNav` from the taxonomy
but nothing imports it — the chrome is `@hanzogui/shell` driven by
`components/home/shell.tsx`. `components/navigation/` does not exist.

## Header Menu (canonical) — hydrated from the commerce catalog

**WHICH products exist is commerce's answer, not this repo's.** The chain runs:

    commerce catalog          scripts/sync-catalog.mjs        lib/data/catalog.json
    /v1/commerce/catalog  ->  reachability + href resolve  ->  the committed snapshot
                                        |                              |
                              /v1/openapi.json (the gate)     lib/data/cloud-primitives.ts
                                                                       |
                                              mega-menu · /products/<id> · /cloud/<slug> · showcases

`prebuild` runs the sync, so the snapshot is re-fetched on every build or it is
not shipped at all. It CANNOT be a browser fetch: `output: 'export'` ships static
HTML and the API pins `access-control-allow-origin` to `https://hanzo.ai`
exactly, so a preview deploy or a local render would get nothing and the menu
would be empty.

**Reachability is the inclusion gate.** A product is written to the snapshot iff
`/v1/openapi.json` carries its `apiPath` — exactly, or any path beneath it —
which is what "this product exists" means, since the document is a projection of
the routers cloud mounted. A product marked `kind: "client"` (the CLI, the SDKs,
the API reference) is judged instead by whether this repo has a page for it,
because it consumes the API and no `apiPath` can ever be right for it. So the
menu is dynamic AND structurally unable to advertise a 404.

Measured 2026-08-13: **84 advertised · 53 rendered · 31 excluded**
(13 renamed · 7 client · 1 external · 10 absent — see the audit below).

**The href is resolved against the filesystem by the same sync**: a bespoke page
where this repo publishes one (28 of the 53), `/cloud/<slug>` otherwise (25),
and `cloudPrimitiveSlugs` builds a page for every one of the latter — so a leaf
cannot be a dead link in either branch. Read off `app/` rather than declared
beside the product, because a table of "which routes have a page" is a second
copy of what `app/` already says, and the copy is what goes stale.

**The split is by kind of fact.** The catalog owns membership, name, slug,
order, icon, docs and repo. `cloud-primitives.ts` owns the PROSE — a category's
tagline, a leaf's blurb, and the long-form copy a generated overview renders.
A product with no prose still renders (as its name plus the facts the catalog
states); prose for a product the catalog dropped renders nowhere. Neither can
resurrect a product or bury one, which is what makes `COPY` a copy deck rather
than a second taxonomy.

**Top level**: Meet Hanzo · Products · Learn · Docs · Pricing

**Products dropdown** — the catalog's ten categories, two rows of five. Their
membership is measured per build and is NOT listed here: a table of leaves in a
markdown file is exactly the hand list this change deleted. Run
`pnpm sync:catalog` and read `lib/data/catalog.json`.

| Category | `/products/<id>` |
|---|---|
| AI · Compute · Data · Network · Security | `/products/{ai,compute,data,network,security}` |
| Dev · Platform · Observe · Web3 · Apps | `/products/{dev,platform,observe,web3,apps}` |

- Each mega-menu **category header links to its `/products/<id>` page**
  (`app/(marketing)/products/[categoryId]/page.tsx`, generated from
  `categorySlugs`); the page is `components/cloud/CloudCategoryOverview.tsx`.
- The category id is a VALUE the catalog states, not a slugify of the label.
  `categorySlug()` is gone: computing `'ai'` from `'AI'` was deriving something
  we are already told.
- **Counts appear nowhere in copy.** `capabilityCount` and `categoryCount` are
  deleted (they had no call sites left), the mega-menu's handoff reads
  "All Observe →" rather than "All 10 →", and the category cards dropped their
  leaf-count badge. Membership is now whatever answered at build time, so a
  number on the page is a fact about the API's morning.
- Product ↔ `/v1/<svc>` ↔ plan/usage mapping: **`docs/product-service-map.md`**
  (reconciled against `~/work/hanzo/cloud/subsystems/subsystems.go`).

> `lib/data/product-taxonomy.ts` is a SEPARATE, legacy catalog still used by
> `components/products/ProductPageTemplate` (the ~80 bespoke `/<slug>` product
> pages) and the orphaned `solutions/` pages — it is NOT the products-nav source.

### What hydration cost, and who fixes it

The hand list and the catalog had drifted far enough that reconciling them is a
visible content change, not a refactor. **28 destinations left the products nav
and 19 arrived.** Four of the departures (`/cloud/{cost,finetune,jobs,rerank}`)
were the known orphans the old agreement test allowlisted — they described
products commerce does not sell, and they are gone for that reason.

The rest leave because **commerce's catalog does not carry them**: `/analytics`,
`/automations`, `/captable`, `/code`, `/commerce`, `/dataroom`, `/guard`,
`/ingress`, `/insights`, `/ledger`, `/mq`, `/payments`, `/pricing`, `/pubsub`,
`/sentinel`, `/sign`, `/solutions/rag`, `/team`, `/telemetry`, `/tunnel`, and
the eight `web3.hanzo.ai` leaves. **Every one of those pages still builds,
answers on its URL and sits in sitemap.xml** — only the products menu stopped
advertising them. Whole "Payments" category included: commerce files `billing`
under Observe and has no payments category at all, which is why the agreement
test was red in both directions before this.

**None of that is fixable here.** A product belongs in the menu when commerce
carries it; the repair is a row in the catalog, and this site will pick it up on
the next build. The reverse also holds — `/dashboards`, `/hsm`, `vpc` and the
other 12 renamed/absent rows come back the moment the catalog is corrected, with
no change to this repo.

## The audit: 31 of what we advertise does not answer

`scripts/audit-catalog.mjs` gates the build on the catalog drifting FURTHER from
what is served. It no longer stands between a reader and a 404 — the sync
already drops the unreachable — so what it now protects is the MENU: every entry
on its ratchet is a product the site would otherwise be selling.

There are five lists, and no two agree:

| List | Where | Count |
|---|---|---|
| Site taxonomy | `lib/data/catalog.json` | **53** — the catalog, filtered to what answers |
| Legacy taxonomy | `lib/data/product-taxonomy.ts` | **9** categories |
| Docs prose | `hanzo-docs/docs` (7 files) | **67** capabilities / 8 movements |
| Curation manifest | `hanzoai/openapi` `capabilities.yaml` | 8 domains over **180** tags |
| Commerce catalog | `GET /v1/commerce/catalog?brand=hanzo` | **84** products |
| **The served document** | `GET /v1/openapi.json` | **1,809 paths** |

Only the last one is authority: a path in it exists by construction. Everything
above it is editorial — including the catalog, which is why the site reads the
two together rather than either alone.

Measured 2026-08-13, `node scripts/audit-catalog.mjs`:

```
84 products advertised · 53 answer (63%) · 31 do not
  renamed 13 · client 7 · external 1 · absent 10
```

**Every one of those 31 is marked `"status": "enabled"` and every one is a live
404.** Four different problems were hiding in one number:

- **renamed (13)** — the capability is real, the `apiPath` is misspelt. `vpc`
  vs `/v1/vpcs`, `wallet` vs `/v1/wallets`, `alerts` vs `/v1/o11y/alerts`,
  `indexer` vs `/v1/indexers`, `zero-trust` vs `/v1/networks`. Pure catalog
  bugs, cheapest thing on the list, and each one is a menu leaf we are not
  selling until it lands.
- **client (7)** — `cli`, `sdks`, `ide`, `desktop`, `console`, `studio`, and
  `api` itself. These CONSUME the API; no `apiPath` can ever be right. They
  need a `kind` field, not a path. A category error, not a gap. The sync
  already honours `kind: "client"`: six of the seven have a page here and light
  up the day commerce sets the field — `ide` does not, and stays out.
- **external (1)** — `nodes` is `luxfi/node`, served by Lux, not api.hanzo.ai.
- **absent (10)** — advertised, enabled, and nothing serves it. This is the
  only bucket that is a commercial problem and the only one no code change in
  this repo can fix: `edge`, `cdn`, `hsm`, `mpc`, `settlement`,
  `attestations`, `datasets`, `scores`, `score-configs`, `annotation-queues`.
  (`tokens` left this list — cloud serves `/v1/tokens/{chain}/{address}` now,
  and the ratchet demanded its own line back, which is the whole point of it.)

Three of those have real repos that were simply never mounted into cloud —
`hanzoai/edge` (Rust, 13 crates), `hanzoai/hsm` (a Go library that belongs
*behind* `/v1/kms`, not beside it), `hanzoai/cdn` (our own asset bucket, never
a tenant product). Shipping them is a mount, not a build.

### The chain, and where each link is held

    site taxonomy  ->  commerce catalog  ->  served document
    (catalog.json)     (/v1/commerce/catalog)   (/v1/openapi.json)
    \___ built BY sync-catalog.mjs ___/
    \___________ e2e/catalog-agreement.spec.ts ___________/
                                     \___ scripts/audit-catalog.mjs ___/

The first link is no longer an agreement between two hand lists — it is a
derivation, so it cannot be got wrong. What replaced that question is the one a
build-time snapshot actually raises: **is the snapshot still true?** A committed
file goes stale silently, and the whole point of it is that the site deploys
without the API — exactly the condition under which nobody would notice. So
`e2e/catalog-agreement.spec.ts` reads the LIVE catalog and the LIVE document and
holds the snapshot to both, re-measuring the inclusion gate rather than trusting
it from build time.

`scripts/catalog.mjs` is the ONE probe, imported by the sync and the audit. The
predicate — does the document carry this apiPath — is written once, because a
second copy is how the gate comes to say a product is missing while the menu
still advertises it.

Three rules make the sync safe to run unattended, the same three as
`sync-pricing.mjs`, and all four refusal paths are measured rather than
reasoned about:

- **Never fail the build on an unreachable API.** No network → keep the
  committed snapshot, exit 0. A marketing site must not need the API up to
  deploy. (The one fatal case is no snapshot on disk AND no API, which can only
  happen before the first sync — the taxonomy imports that file.)
- **Never regress.** A payload that is not a catalog, a document with no paths,
  or a catalog rendering FEWER products than the committed snapshot is far more
  likely to be a degraded response than a product line being retired, and
  writing it would silently empty the menu. It is refused, and what it would
  have dropped is printed. A genuine retirement is accepted by deleting those
  rows from `lib/data/catalog.json` — the next run then sees no shrink.
- **Never go quiet.** Every run prints advertised/rendered/excluded and the
  exclusions grouped by reason.

The audit keeps its own two rules: never fail on an unreachable API, and its
`KNOWN_UNSERVED` ratchet **may only shrink**. A product that fails and is not on
the list fails the run; an entry that starts answering fails the run too, so a
fix is forced to delete its own exemption. Do not add entries to make it pass.

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

Anonymous traffic REQUIRES the key. The reserved `$public` tenant that once
caught credential-less beacons is retired (cloud `apps/analytics/public.go`):
an event lands in the org a credential names, or is refused. A keyless bundle
has every logged-out pageview and error answered `401 ingest_key_required` — a
console error on every visit, which is how the defect surfaced live — so BOTH
build lanes refuse to ship without the key: `deploy.yml` exits before the build,
and the Dockerfile refuses the empty ARG and then proves the key is actually in
`out/_next/static` after the build.

The `pk-` key resolves the traffic to the real org under the projected anonymous
policy: `pageview`, `error` and the closed autocapture vocabulary land; `identify`
/ `group` / custom events ride an authenticated bearer only; per-IP rate limits
apply (<=50 events, <=64 KiB), and nothing is stored under `DNT: 1` /
`Sec-GPC: 1`. The prefix is `pk-` (`cloud.PublishablePrefix`); no other prefix is
read as a key. A presented-but-unresolvable key fails closed with 403.

Mint with `POST /v1/keys` `{"type":"publishable"}`, store as `deploy/PUBLISHABLE_KEY`
in KMS. `/v1/keys` is the one key surface: one noun, the method carries the
operation, and the class is a field.

ONE name and ONE location, shared with hanzo.chat and hanzo.app, matching the
default path of the shared `hanzoai/ci` reusable's `build_secrets`. The key is
per-ORG, not per-property — one `pk-` resolves the org for every property, and the
SDK's `product` field (`site` here) is what separates them in the warehouse. The
env var carries only the prefix its bundler requires: `NEXT_PUBLIC_` for Next here,
`VITE_` for Vite in hanzo.chat, over the same `PUBLISHABLE_KEY` suffix.
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
  AUTHENTICATED session only — the projected anonymous lane drops `identify`
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
- **A family wears the mark of the lab that MAKES it.** Enso is ours, the ensō
  CLOSED because the router completes the circle. Zen is Zoo Labs Foundation's,
  which the hero copy already says, so it wears Zoo's venn like every other
  maker here — `zen -> zoo` in OF. `@hanzo/logo` carries Hanzo's marks and
  nobody else's; it once shipped a `ZEN_MARK` beside `ENSO_MARK`, which drew our
  house glyph on someone else's models. The venn's disc is cut by an SVG
  `<clipPath>` in USER units: a CSS `clip-path: circle(11.5px …)` measures the
  rendered box, so it cuts at 96px and not at all at 18px.
  `e2e/gates/marks.spec.ts` holds all of it.
- **No chip.** Marks render bare at the current text colour. The predecessor
  painted a CSS mask inside a `rounded-lg` box, which clipped the corners off
  every square mark — the H worst of all. Every source declares
  `fill-rule="evenodd"` on its root, so the wrapper repeats it: without it
  Mistral's inner square fills in and the mark is quietly wrong.

`public/logos/*.svg` is a SECOND representation of eight of these, and it exists
for exactly one reason: `AccuracyCostScatter` draws them through `<image href>`,
which needs a URL. Same canonical source, regenerate from it, never redraw.

An SVG behind `<image>` is its own document with no CSS context, so
`currentColor` resolves to BLACK and **the host page can never tint it** — the
chart's marks rendered black-on-light or vanished on dark, and no CSS could
reach them. `public/logos/color/*.svg` is the answer: the same canonical bodies
with each lab's brand hex substituted for `currentColor` at generation time,
because the one thing the host cannot supply is the one thing an `<image>` must
carry itself. Regenerate them from the fork exactly like the mono set; never
hand-edit either. The five labs with no mark in the fork (NVIDIA, Meta, Zhipu,
Xiaomi, MiniMax) fall back to a monogram in their brand colour — the documented
last resort — and drop a real file in and the monogram gives way to it.

The disc is now ALWAYS light behind a mark, so **provenance rides the RING**:
solid white for Hanzo-measured, dashed grey for vendor-reported. It used to ride
the disc colour as well, and that dark `reported` disc is precisely what
swallowed every near-black mark. One distinction, one carrier — and the ring has
to be legible on its own, so measured is 2px and reported has real gaps.
`/logos/partners/` is a different set and unrelated.

**Label placement is ONE rule, not several.** Every obstacle a label can hit —
the other discs AND the other labels — is a box in one list, tested by one
rectangle overlap, in `settle()`. Splitting it produced two defects in a row:
labels de-collided per side against other *labels* cleared a neighbour's label
by the required gap and ran straight through that neighbour's *dot*; handling
dots in a second, separate pass then let a right-anchored label meet a
left-anchored one — a pair that belonged to neither pass. Verify by measuring
boxes in the rendered DOM over ALL pairs: a check that filters by side
reproduces the very blind spot that caused the bug, and will report clean.


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
