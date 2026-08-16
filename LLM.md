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

  The publish itself is `bin/site` in **hanzoai/ci**, used through
  `hanzoai/ci/.github/actions/site@v1` — hips, logo, flow and gallery make the
  identical calls, so the contract lives in one place. ONE credential, read from
  KMS: the job passes `KMS_CLIENT_ID` / `KMS_CLIENT_SECRET` and the action reads
  the deploy key from there, so it rotates by resealing. The 202 hands back a
  prefix-scoped 30-minute presigned POST grant, so CI holds no bucket key — never
  add `SITES_S3_*`.

  **`v1` is a FLOATING tag, and that is the whole risk surface.** It is a branch
  wearing a version's name: `hanzoai/ci` moves it forward, and every consumer
  takes the new tree on its next run without editing anything. So a rename in
  that repo lands here whether or not this repo is ready for it — `sitedeploy`
  became `site`, the tag moved, and six repos' publishes broke at once.

  **Its signature is unmistakable once you have seen it: EVERY step `cancelled`
  at `0s` while the JOB reads `failure`.** `act` resolves every step's action
  before it runs step 0, so an action path that no longer exists kills the job
  before any step can start. Nothing ran, so nothing can be blamed — it looks
  exactly like a broken runner or a red gate and is neither. Read the job log
  (`GET /v1/repos/{owner}/{repo}/actions/jobs/{JOB_ID}/logs`, the **job** id from
  `action_run_job` — not the run number, not a task id) and the last line names
  the missing `action.yml` outright.

  **The gates run BEFORE the upload, so a red gate freezes the SITE.** They are
  steps in the publishing job, which is the placement that makes "nothing ships
  ungated" true — and the cost is that a failing gate is indistinguishable from a
  broken deploy unless you look. It happened: four gates went red (111 pages
  inheriting the root layout's title, six redirect shells offered for indexing)
  and hanzo.ai published nothing for a day while pushes kept succeeding.

  **A 520 on `/` while every named route answers 200 is STORAGE, not the site.**
  The `s3` deployment runs master + filer + gateway in ONE pod (`weed server
  -filer -s3`, `Recreate`, 1 replica). Every restart of it drops the master's
  volume map, the volume servers reconnect without fully re-registering, and any
  object whose chunk lives on a volume that did not come back reads as
  `volume N not found`. When that volume happens to hold
  `hanzo-sites/hanzo/hanzo-ai/index.html`, the apex root 520s and nothing else
  does — `/models` and `/comparison` keep serving, which is what makes it look
  like a page bug.

  Confirm it in one command, and do not guess from the browser:

      kubectl -n hanzo logs deploy/s3 --since=60s | grep -oE 'failed to stream [^ ]+' | sort -u

  **The fix is a RE-PUBLISH, not a restart.** Dispatching `deploy.yml` rewrites
  the object with fresh chunks and the root comes back within the run. Restarting
  s3 or the volume servers is the tempting move and it does not converge — the
  master will resolve the volume to the correct live pod IP while the filer's own
  lookup still refuses it, so you can cycle storage all day and change nothing.
  Restarting the master is also what CAUSES the next occurrence, so reaching for
  it is strictly negative.

  Same signature, same cure, for any single page: `/comparison` returned `200`
  with an empty body after 15s from this, and a re-publish fixed it. A publish
  that runs while storage is degraded is how the object gets stranded in the
  first place — `sitedeploy` sends a manifest and the server deletes keys absent
  from it, so an upload that fails mid-publish takes the live page with it.

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
- **The apex IS the live origin.** `hanzo.ai` and `hanzo-ai.hanzo.app` serve the
  same Sites-plane build; the DNS cutover this file used to gate on has happened.
  Measured: a green `deploy.yml` run, and both hosts immediately serving a header
  menu that existed only in that commit — which is the only honest check, because
  a route that predates the build proves nothing. Do NOT read `server: cloudflare`
  as evidence otherwise: Cloudflare fronts the sites edge too, so that header is
  byte-identical on both hosts and distinguishes nothing.

## The apex is Hanzo OS, and it descends the stack

`components/home/HomeLanding.tsx` is a SERVER component and orders its sections
as a descent: the company at the top, the machines at the bottom, the evidence
after both, the ask last.

    Fold                 the promise, then the category
    ProofStrip           scope, in numbers that are derived
    ReplaceTheCore       the strategic claim
    SystemArchitecture   the layers, drawn as layers
    Team → EnsoHero → AgentRuntime → Infrastructure
    LearnLoop → Observability → OneInterface
    CloudCategories → LocalStack
    Research → Proof
    BuildStory → Composer

Research moved DOWN from second. A paper is evidence for a claim, and a reader
has to be given the claim first; the catalog and the library are the last two
things on the page because they are the proof, not the pitch.

### The numbers are derived, never typed

`ProofStrip` takes `modelCount` as a PROP. `HomeLanding` awaits `fetchModels()`,
which reads models.hanzo.ai/v1/models at build time and falls back to the
bundled catalog, so the figure is re-derived by every build and the page cannot
drift from the registry it describes. It is rounded DOWN to the hundred: `500+`
from 529 is a promise the catalog keeps, `529` is wrong the moment one model is
deprecated.

Three numbers were proposed for that strip and are deliberately absent, each for
its own reason:

- **600+ integrations.** `lib/integrations.ts` holds 19, and the build emits 19
  pages. Off by more than an order of magnitude.
- **260+ MCP tools.** Closer to real, and it argues against our own product:
  `/mcp`'s thesis is "a catalog of 260 collapsed into 13", because a tool list is
  a prompt and two hundred near-duplicates make a model choose badly. The
  thirteen ARE the achievement; advertising the 260 sells the problem.
- **"the average company uses 400 SaaS products".** There is no single true
  value — published 2025-26 figures run from ~106 per organization, to 152 under
  500 employees against 660 over 10,000, to 831 once shadow IT is discovered.
  `ReplaceTheCore` says "more than a hundred, and several hundred at enterprise
  scale", which is true across all of them.

Also absent: **"99% of what a business needs"**, which invites "99% of which
workflows, measured how?" and has no measurement behind it. The section names
the categories we ship first-party instead, each linked to a page a reader can
open and check.

### Proof is the agency's track record, and it is a different claim

`Proof` names Triller, Bellabeat, Casper Labs, Unikrn, Damon and Cover Build —
every one has a case study in `hanzo/agency/src/data/case-studies/`. These
companies came through Hanzo Agency, which built and shipped their products.
That is NOT the sentence "these companies run Hanzo OS in production", and
writing the second one would repeat the error `lib/constants/partner-logos.ts`
was split up to prevent: a mixed list that quietly upgrades a vendor into a
customer. Lux and Zoo are deliberately absent — counting your own ventures as
customers is the same category error in a friendlier coat. No multiplier claims:
the Damon study carries a "500X ROI" line, and a return figure without its
methodology is one a reader cannot check.

### Analogies stay out of the page

"Heroku for the age of AI" and "Apple-like vertical integration" explain the
platform well in a room and are not on the site. An analogy asks a reader to
hold someone else's brand in mind while deciding about ours. The page says the
thing itself: the intelligence, applications, runtime, data and cloud are
designed together.

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
- **Tailwind is NOT gone**: **58,424 utility class tokens, 1,293 distinct,
  across 456 files** — counted from `git ls-files` sources by pulling every
  `className`/`class` attribute AND every string literal inside a
  `className={…}` expression, since `cn('text-xs', …)` hides classes from a
  plain attribute scan. `tailwind.config.ts` (dead — v4 is CSS-first and never
  read it), `tailwindcss-animate`, `components.json`,
  `@tailwindcss/typography` and `autoprefixer` ARE gone. Convert files to gui
  props; do not add new utility classes.

  The earlier figures here (63,151 / 1,560 / 485) were high and are corrected
  above. A count taken from a build directory drifts the moment source moves.

- **Radix is GONE, and the primitives it used to serve now come from
  `@hanzo/ui`.** Zero by four independent probes — `package.json`,
  `pnpm-lock.yaml`, `node_modules/.pnpm` (so nothing transitive either), and
  source imports. `class-variance-authority`, `cmdk` and shadcn are absent the
  same way; the only survivors of that era are `clsx` and `tailwind-merge` in
  one file each. What proves the migration landed rather than merely that the
  dependency left: the radix-shaped names this site imports — `Dialog`,
  `DropdownMenu`, `Select`, `Tabs`, `Avatar`, `Progress`, `Popover` — resolve
  through the `@hanzo/ui` root barrel, and all 30 of them are on it.
  `Accordion` comes from gui's own, as this file already says it must.

  Adoption is deeper than a class count suggests: **139 files import
  `@hanzo/ui`** and 18 import `@hanzo/gui`. The one real second system left is
  icons — **400 files import `lucide-react` directly against 2 on
  `@hanzogui/lucide-icons-2`**, which is the same "two vocabularies for one
  job" shape as the utility classes and is not tracked anywhere else.

- **No Tailwind class on this site is dead.** All 1,293 resolve, measured
  against a FRESH compile of current source (`@tailwindcss/postcss` over
  `app/globals.css`, 204,712 bytes) plus every authored stylesheet, every
  inline `<style>` block, and the `@hanzo/design` tokens. `bg-grid-white` and
  `scrollbar-hide` were deleted from source; `hover:border-white/30` and `/50`
  do emit; `prose` survives only as `hz-prose`. The bug family named here is
  closed — but keep the technique, because it is how the next one is found.

  **Four traps manufacture false positives, and each one cost a wrong answer.**
  Never subtract against a committed `out/` — a build 56 seconds older than an
  edit reported `sm:pb-28` dead when a fresh compile emits it. Tailwind escapes
  a leading digit as a hex code with a trailing space (`2xl:` is `.\32 xl\:`),
  so a naive `\\(.)` unescaper truncates the class; unescape properly or parse
  selectors. `space-y-*` emits with a `>:not(:last-child)` suffix rather than
  `{`. And stripping a variant to test its base is invalid — `border-white/30`
  existing says nothing about `hover:border-white/30`.

- **Interpolated classes: 19 stem sites in source, and only two are classes.**
  `ts-c-${cov[i]}` and `ts-e-${r.ev}` in `app/(marketing)/calculator/page.tsx`,
  both safe — that is the page's LOCAL `ts-` namespace in its own `<style>`
  block, and every union member is enumerated (four `Cov` values against four
  rules, five `Ev` against four, `internal` and `repo` sharing one). The other
  seventeen are React keys, ids and `htmlFor`, which Tailwind never had to see.
  `text-${color}` and `from-${color}` in `components/commerce/UseCases.tsx` are
  inside the comment documenting that bug's fix — the grep hits prose, not code.

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

  **A breakpoint object is REPLACED by a spread, never merged with one.**
  `$sm={{ paddingVertical: '$10' }} {...GUTTER}` where `GUTTER` carries its own
  `$sm` leaves only the gutter's half; JSX assigns whole keys, and `$sm` is one
  key. The base props sit beside it and land, so the element is right at 390px
  and quietly wrong at 640 — the sixth defect of the same shape. State one `$sm`
  per element, inline. Read the shipped markup to check: gui writes each
  breakpoint property as its own class (`_pt-_sm_c-space-10`) under
  `@media (min-width: 640px)`, so a property that lost has no class at all.

- **`Box` and `tw` from `@hanzo/ui` are the intended path, and it is BLOCKED
  on two of the properties it needs most.** `tw` maps a class to a gui style
  prop and hands back what it does not know in `rest`, so nothing is dropped
  by the adapter; `Box` renders that onto a gui element and passes `rest`
  through as a class name. Coverage over this site's vocabulary is real —
  **1,040 of 1,293 distinct classes convert, 97.5% of all uses** — and the
  remainder is mostly gradients (`bg-gradient-to-*`, `from-*`, `to-*`), the
  local `hz-` and `ts-` namespaces, and `group`/`container`.

  Measured on `/pricing` at 1280x900, converting one 20-line component with
  four classes: geometry held EXACTLY (768px wide, 224px auto side margins,
  48px beneath, page height 3891 both ways) while **two computed properties
  regressed**. `textAlign` reached the DOM as the raw attribute
  `textalign="center"` with no atomic class behind it and computed `start`
  instead of `center`; `display` never applied and the element became
  flex-column. The change was reverted.

  Both are the silent-drop shape again, one level down — the ADAPTER is honest
  and the element underneath cannot express the value. This is why geometry
  and a screenshot are not enough on their own: the picture was unchanged
  because a child happened to centre itself, and only reading computed style
  showed the loss. `display` (3,150 uses) and `textAlign` (807 uses) are the
  third and eighth most common properties `tw` emits, so this is roughly four
  thousand call sites, not an edge.

  The `display` half is substrate drift and is already fixed upstream: the
  INSTALLED `@hanzo/ui` 8.0.86 spreads props straight onto `YStack`, while the
  canonical tree states `display="block"` on it and records what taking the
  Stack's flex default instead cost — 77 of 225 elements on one page becoming
  flex containers nobody asked for. `textAlign` is NOT fixed there; canonical
  spreads it the same way, so an upgrade alone is unlikely to help and must be
  re-measured rather than assumed. Pin `@hanzo/ui` exactly before converting
  anything — the range here is `^8.0.83` and it currently floats to 8.0.86,
  which means the substrate can move underneath a migration mid-flight.

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
ONE consumer now: `HanzoNetworkSection`, on `/overview`. It was three — the cloud
hero and then the apex fold both became films (below), and a page gets ONE
picture, not two. The sphere is the right picture for a section about a network
and the wrong one for a front door: it is the best abstract thing we draw, and a
visitor who has not heard of Hanzo watched it and learned nothing about the
product. It is not deleted and it is not homeless.

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

**The apex fold is a film too, and it is a TRAILER rather than a product tour.**
`film/hero` → one `<Frame src="/hero" …/>` in `components/home/Fold.tsx`. Three
movements of one console over 21s: the model catalog, the catalog's own tour told
as the calls that build a business in an afternoon, and the ten layers those
calls land on — held there for the last 3.3s, because that frame is what every
reduced-motion reader is served. It reads what it shows from the files the page
beside it reads (`pricing.json` for the models and the two counts,
`catalog.json` for the tour and the categories), so the film and
`CloudCategories` structurally cannot name different tens.

**The heading did not go into the master; it moved down the page.** It is real
type in the section directly under the film, visible on the first scroll. The
apex film this replaces had its headline in the pixels next to a sidebar naming
seven categories over a section naming ten, so the page contradicted itself and
every correction cost a re-render. `film/hero` therefore draws no sentence at all
— its whole message in words is the `alt`, and that is COMPOSED from the catalog
rather than typed, because an alt written by hand goes on describing a sequence
the film has stopped having.

**Still to film.** Each of these takes its own `film/<name>` and one `<Frame>`:
the ten category pages `/products/{ai,compute,data,network,security,dev,infrastructure,observe,web3,apps}`,
and the 25 generated `/cloud/<slug>` primitive pages. None of them has a film
yet, and none needs new code to get one.

## cloud.hanzo.ai runs an argument, and `/products` keeps the index

The front door used to open on "The AI cloud for agents and apps", show the ten
categories, and then spend four thousand pixels listing every product as a card.
All of it was true and none of it was a REASON: it described the inventory and
left the reader to work out why owning one of these beats owning ten. The page
is now an argument, one claim to a screen — headline, the cost avoided, the
evidence, the ten layers, the terms — and it is 6.8k pixels instead of 7.2k
desktop, 9.4k instead of 14k on a phone.

- **The pitch is "Ten integrated layers. One bill. No assembly tax."** The
  assembly tax is the accounts, keys, SDKs, consoles, invoices, security reviews
  and glue code that stitching ten vendors together costs every year. The page
  COUNTS it in a table (n vs 1, seven rows) rather than asserting it, and then
  settles it with the tour: one org, one bearer, twelve real operations across
  six layers, no integration between them.
- **`components/cloud/Layers.tsx`** is the ten, as rows off one spine, under the
  `film/stack` film of the same ten assembling. Each row is its number, its name
  (which IS the link to `/products/<id>`), its tagline, and every product in it
  named and linked as prose. Nothing is lost by dropping the card grid — every
  leaf is still one click from the front door.
- **Depth is `lib/data/stack.json`, and only there.** The catalog's `order` is
  the MENU's — AI first, because AI is the headline — and reading it as depth
  puts settlement ninth and AI under everything. The stack order was declared
  inside `film/stack/film.mjs`, which the PAGE cannot read: the list beside the
  film started at AI while the film stood on the chain, and `film/layer` got at
  it by regex-parsing its sibling's source. One file now, three readers —
  `cloudLayers` in `cloud-primitives.ts`, and both film generators. The film's
  `alt` is composed from the same order rather than typed, which is how it came
  to name a sequence the film no longer had.
- **`components/cloud/Ladder.tsx`** renders the SHAPE of the bill from
  `lib/plans.ts` (GET /v1/billing/plans, @hanzo/plans as first paint). Prices and
  the credit each plan returns are read, never typed. "Predictable pricing" is
  only worth writing above the rows that charge.
- **`CloudCategoryShowcase` is still the index and still lives at `/products`.**
  It is no longer rendered by `CloudLanding`. Do not put it back: the front door
  and the catalogue browser are two different jobs.
- **Every count on that page is counted.** `layerCount` and `spell()` in
  `lib/data/cloud-primitives.ts` give the headline, the section heading and the
  page metadata their number from the catalog — including the `<title>`, which is
  baked at build time and is exactly when the catalog is read. The model count
  stays a read-time question (`useModelCount`), and the sentence that would quote
  it is not drawn at all until the gateway answers.
- **The category prose map is keyed by the catalog's CURRENT id.** `CATEGORY` in
  `cloud-primitives.ts` was still keyed `platform` after commerce renamed that
  category to `infrastructure`, so the lookup missed and the category rendered
  with the fallback icon and NO tagline — on the mega-menu column, the homepage
  grid, the orbit's centre and its own `/products/infrastructure` landing. A
  missing key is silent by construction here (`?? Cloud`, `?? ''`), which is the
  right behaviour for a build and the reason nothing reported it.

## A scroll reveal may not hide the content it reveals

`initial={{ opacity: 0 }}` IS RENDERED — framer-motion writes it into the
`style` attribute of the exported HTML — so the shipped page states that a
section is transparent and the only thing that can take it back is an
IntersectionObserver firing after hydration. Every way that observer can be late
or absent leaves real copy at zero forever. Measured live at 1440x900 before the
fix: **4,380px of /about, 2,229px of the homepage, 972px of /solutions**, and a
blank band inside all ten sections of /cloud.

The tell was that reduced-motion and no-JS readers saw MORE than everyone else.
`app/globals.css` already forces the start state visible under
`prefers-reduced-motion` and under `html.no-js` (both rules are still there and
still correct) — so the two audiences with a rescue rule were the two the page
worked for, and nobody had asked why they needed rescuing.

**`components/motion.tsx` is now the only door to `motion`.** It is a Proxy over
framer's, and it grounds the start state once: for any element carrying
`whileInView`, `opacity`, `x` and `scale` never reach the DOM and `y` is clamped
to 8px. The element ships opaque and in position; what is left of `initial` is a
nudge the entrance closes. Call sites keep their props, durations and stagger —
253 of them changed one import line and nothing else.

Horizontal offsets are DROPPED rather than clamped, because an `x: -20` enter is
wider than a 390px viewport for the length of the animation, which is the
sideways scroll `overflow-x: clip` exists to swallow.

`eslint.config.js` holds the door shut: `no-restricted-imports` on the `motion`
NAME from `framer-motion`, with `components/motion.tsx` the one exemption.
Everything else framer exports still comes from framer.

**The proxy cannot reach a component that was WIRED to stay hidden**, and four
on `/analytics` were. It grounds `initial`, so it can only help something whose
end state is visible; `AIFeatureCard` read `initial="hidden" animate="hidden"`
and animated TO the hidden state, which meant three 234px cards were invisible
on every visit, scrolled to or not. `Community` ran ONE IntersectionObserver
doing two jobs — starting the CountUp tallies AND holding 872px of cards at
opacity 0 — so the rule is: **an observer may start a count; it may not decide
whether the copy exists.** Those two triggers stay separate. When auditing, grep
for `animate=` with a variant NAME and for `useAnimation`/`controls.start`, not
just for `whileInView`.

## ⌘K searches the SITE, and the page list is derived

The palette is `@hanzogui/shell`'s (`HanzoCommandPalette`), and it indexes three
things merged into one ranked list: the doors (`TRY_HANZO_GROUPS`), **this
site's own pages**, and the cloud taxonomy. It used to index the taxonomy alone,
so typing `pricing` answered "No results for pricing" about a page the header
links three inches above it.

    app/ tree ── scripts/sync-pages.mjs ──> lib/data/pages.json ──> components/home/shell.tsx
                 (walks routes(), filters          120 routes         commands={SITE_PAGES}
                  policy(route) === 'public')                        on <HanzoHeader>

**Derived, never listed.** The sync runs at `prebuild` through the same
`policy()` that writes the sitemap, so the palette cannot miss a published page
or offer a withheld one, and nobody maintains a list. Top level only —
everything deeper is the taxonomy, which the palette already indexes from
`catalog.json` under the names commerce gives it. `SPELLING` in that script is an
ORTHOGRAPHY table (`api` → API), not a taxonomy: it cannot add a page or
withhold one.

Ranking lives in the package (`search.ts`, `score`): a contiguous run beats a
scattered one, a word start beats a word middle, a name beats a description, and
a scattered match must ANCHOR where a word does — without that anchor "docs"
matches half the sentences on the site, since `d·o·c·s` walks through most
prose. Descriptions are matched whole or not at all; only names are forgiving,
which is what lets "machins" find Machines. Every query ends in an Ask row, so
none of them dead-ends.

`e2e/gates/palette.spec.ts` drives the real export for all of it, plus a ceiling
on the doors card. The palette needs HYDRATION, so `open()` retries the chord
rather than pressing it once — `load` fires well before the ⌘K listener is
attached, and a single press makes the whole suite flaky for a reason that is
not the palette.

## Key Files

```
app/(marketing)/<slug>/page.tsx   # Flat product pages — /dev, /chat, /vector, etc.
app/(marketing)/cloud/[slug]/     # Generated primitive overviews, from cloudPrimitiveSlugs
app/(marketing)/products/[categoryId]/   # Category landings, from categorySlugs
components/motion.tsx             # The ONE door to framer's `motion` (see above)
components/ui/chrome-text.tsx     # The display heading — solid ink, 33 surfaces
lib/data/
  catalog.json                    # The committed product snapshot (written by prebuild)
  pages.json                      # The published top-level routes (written by prebuild)
  cloud-primitives.ts             # Reads it; owns the prose and nothing else
scripts/
  catalog.mjs                     # The ONE probe — catalog + served document
  sync-catalog.mjs                # prebuild: fetch, gate on reachability, write the snapshot
  sync-pages.mjs                  # prebuild: walk app/, filter by policy(), write pages.json
  audit-catalog.mjs               # hanzo.yml gate: the drift ratchet
components/home/shell.tsx         # The header/footer chrome; PRODUCTS_TAXONOMY + SITE_PAGES
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

**Top level**: Meet Hanzo · Products · Solutions · Resources · Developers

**Resources is a MENU**, and it is the only local-nav entry that is. What we
publish is five pages — Learn · Research · Open Source · Blog · Customers — and
four of them were reachable from nowhere in the bar while sitting in the sitemap
and the palette. Nine flat links do not fit: measured at 1440 the row has 606px
of slack and at 960 it has 126px, against ~340px of new labels.

The menu is `@hanzogui/shell` 8.1.14's `items` on a nav entry (`HanzoNav`) — a
card under the label on the desktop, the sheet's existing disclosure on a phone
— and the entry keeps `href`, so "Resources" is still a real link to `/learn`
before hydration and without JavaScript. Each `hint` is the page's own sentence
shortened; a menu that describes a page in words the page does not use is a
second copy that drifts. `e2e/gates/chrome.spec.ts` opens the card by HOVER (a
click that lands before hydration follows the label's href and moves the test to
another page) and walks every row to its page.

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

> There is no second catalog. `lib/data/product-taxonomy.ts` held a nine-id
> taxonomy (`data`, `compute`, `async`, `ml`, `observability`, `platform`,
> `apps`, `growth`, `cx`) that no page rendered — it, and the three components
> that read it, are deleted. The bespoke `/<slug>` product pages import
> `components/products/ProductFooter`, not a template built on that list.

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
- **The display heading is `.hz-display`**, in `app/globals.css`, and
  `components/ui/chrome-text.tsx` is the component that wears it. It states the
  WHOLE type — `--type-hero` for the role (600, 1.05, display face) and one rung
  of the same ramp per breakpoint, `--text-4xl` / `--text-5xl` / `--text-6xl` =
  32 / 40 / 52. Splitting it — ink and leading in the component, scale at the
  call site — is how six measured pages came to state four mobile scales (one of
  them 41.6px, no rung of anything), three laptop scales, three weights and two
  whites for one `h1`. The rule sits in `base`, so a page that still writes its
  own `text-*` keeps winning and converts on its own schedule; a converted page
  passes CONTENT and spacing, never type.
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
- **A floor needs a box, and it applies to the SMALLER SIDE.** `min-height`
  does nothing to a non-replaced inline box, so every mark that claims a tap
  target — `.hz-tap` and header/footer links alike — is given `inline-flex`
  unconditionally and the 44px minimum only under a coarse pointer. Stating the
  minimum without the box is the defect that reads as fixed and measures 17px;
  stating only the height leaves "Bot" at 21x44. Prose links are deliberately
  outside all of it: stretching a link inside a sentence tears the line.
- **The drawer carries the bottom inset**, as the header carries the top one.
  It is `position: fixed`, so `body`'s inset cannot reach it, and it runs the
  full height below the bar. The spacer is an `::after` of
  `env(safe-area-inset-bottom)` rather than padding, because the panel states
  its own padding inline and a stylesheet can only replace that, not add to it.
- Verify at 390px with Playwright before claiming mobile works.

## No authoring widget ships

`hanzo.app/edit.js` used to load in `app/layout.tsx` on all 883 pages. It is an
authoring tool, and this is a published static site: it mounted a launcher in a
shadow root at z-index 2147483000, which on a phone covered 43x32px of the
drawer's "Try Hanzo" — the one primary action — so the edge of the CTA opened an
editor. Two rules in `app/globals.css` existed only to live beside it (a z-index
clamp on `[data-hanzo-edit]`, and 64px of `.hz-dock` clearance to keep the
composer above the launcher) and went with it. Do not put it back; the door for
editing this site is this repo.

## /account is a section, and its layout owns the frame

`app/(marketing)/account/layout.tsx` states the gutter, the measure and the
rhythm once, and asks who is reading before a page renders. A page under it is
its content and nothing else — no background, no `<main>`, no measure of its
own, and no check of its own for a session.

- **The frame**: 16px gutter, 32px from `$sm`; measure 1024, centred. Wider than
  page-kit's 896 because these are forms and tables rather than prose, and each
  form caps itself at 576 through `components/account/form.tsx`.
- **`Form` and `Field`** are the two shapes every page here is made of. They
  carry the measure and the label-to-control spacing so a page never guesses at
  either; four pages had guessed differently, and one had reached for a
  `<div className="space-y-2">` per field.
- **The session is settled ONCE.** `useIam()` in the layout: nothing while it
  resolves, the sign-in door with no user, the page with one. A page that still
  narrows `user` writes `if (!user) return null` — that is a type narrowing, not
  a second answer to the question.
- **Sizes are gui props, because `@hanzo/ui` 8 reads props and not classes.**
  `<Avatar className="h-24 w-24">` renders at the component's default 32, and
  `space-x-4` on a row of gui Buttons stacks them: a gui Button is a
  block-level flex box, so the margin utility never applies. Use `size={96}` and
  an `XStack gap`. This is the same silent-drop family the UI substrate section
  catalogues, met from the other direction.
- **`/account` is in `PRIVATE`** (`lib/publish.ts`), so the export ships the
  frame with an empty measure and fills it after hydration. That is the honest
  static answer — a file cannot know who fetched it — and nothing indexes it.

**The three routes that reach it are one screen.** `/login`, `/signup` and
`/auth/callback` say where the reader is going and go — IAM owns the form — so
they share `components/auth/waiting.tsx` and differ only in their words. It
sizes to the message (360px) rather than asking for `min-h-screen` inside a
layout that already has a header and a footer, which is what made a page with
one line of text scroll 513px. The callback's Suspense fallback is a `Waiting`
too: as an empty box it shipped the landing route with no heading at all.

**Measure these with JavaScript ON.** react-native-web injects its stylesheet at
runtime, so with scripting off the Spinner's `r-height`/`r-width` classes have no
rules and its SVG falls back to the 300x300 default for a replaced element with
no intrinsic size. Tailwind classes come from the external stylesheet and do
apply, so a JS-off measurement looks authoritative and silently inflates
anything gui sizes — it read a 36px spinner as 300 and put 264px of phantom
height into every number around it.

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

**The favicon is DERIVED, not drawn.** `scripts/sync-mark.mjs` copies
`@hanzo/brand/assets/logo/favicon.svg` into `public/` in `prebuild` and refuses
a mark that arrives stroked or with the wrong number of shapes. The
hand-maintained copy it replaced painted the five shapes twice — a stroked
`.rim` behind a `.core` — and then set both layers to one colour in each scheme
a browser actually reports, so a 5.58px stroke bridged the gaps and served a
solid blob everywhere except the no-preference default. One layer, one ink that
flips with the scheme, is the only construction that cannot do that.
`console.hanzo.ai` resolves an org's logo to this same URL.

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


## What we say about frameworks

Two sentences get confused, and only one is a lie. "SOC 2 certified" claims a
certificate from an auditor. "Compatible with SOC 2" claims our controls are
built to that framework. The second is true and is what we say.

- Say: "compatible with SOC 2", "built to", "continual internal audits",
  "audit report available upon request", "BAA available".
- Never: "certified", "certification", "accredited", "attestation", "audited by
  independent/third-party auditors".
- Never hedge: "audit in progress", "assessment planned", "SOC 2 ready",
  "readiness", "scoped per engagement", "working toward". A hedge reads as a
  claim to a buyer skimming, and it dates itself the day it ships.
- Never state the negative either. Saying what we lack is what put "Hanzo does
  not hold SOC 2, ISO 27001, or FedRAMP" into /trust's meta description — the
  line a search engine prints for anyone searching whether we are certified.

`ci/bin/certclaims` enforces exactly this and runs in the build. It reads one
line at a time, so keep a framework name and a document offer on separate lines
or in separate entries.

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

And it takes the API's NORMALIZATION with it: `STATIC_DATA` maps the file
through the same `apiToHanzo` the live fetch uses. The snapshot is the API's
payload, so its fields are optional where `HanzoModel` is required — 12 of the
35 rows carry no `specs` at all (every embedding, rerank, image, audio and
video model), while the card renders `model.specs.params` unconditionally.
Reading the file as `HanzoModel[]` asserted a field that is not there, and the
assertion threw on first paint and took the entire tab with it.

**A tab the prerender never opens has no build coverage.** `/pricing` renders
one tab, so `pnpm build` prerendered the plans and never once ran the rate
tables — the API tab was dead on the live site and every gate was green.
Whatever a page shows only after a click has to be clicked, in a browser,
before it is believed.

`lib/leaderboard.ts` and `components/enso/EnsoLanding.tsx` still hold correct
literals on purpose. They are the only public surfaces stating the true
4/20 · 2/4 · 5/25, so they convert to readers AFTER the catalog is authoritative
— flipping them first replaces right numbers with an empty feed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
