/**
 * Hanzo Cloud — the product taxonomy.
 *
 * WHICH products exist, what they are called, which category they sit in and in
 * what order is the commerce catalog's answer, read at build time by
 * `scripts/sync-catalog.mjs` into `lib/data/catalog.json`. This file turns that
 * snapshot into the shape every surface renders. It holds no list of products
 * and no list of categories: the previous version did, and the two answers had
 * drifted far enough apart that the site sold a "Payments" category commerce
 * does not carry while missing the "Dev" one it does.
 *
 * The split is by KIND OF FACT, not by convenience:
 *
 *   the catalog owns   membership · name · slug · order · icon · docs · repo ·
 *                      the apiPath that proves the product exists
 *   this file owns     the prose — a category's tagline, a leaf's blurb, and the
 *                      long-form copy a generated overview page renders
 *
 * A product with no prose here still renders; it reads as its name plus the
 * facts the catalog states about it. Prose for a product the catalog has
 * dropped renders nowhere. Neither can resurrect a product or bury one, which
 * is what makes this a copy deck rather than a second taxonomy.
 *
 * NOTHING UNREACHABLE REACHES THIS FILE. The snapshot only carries products
 * whose apiPath the served OpenAPI document answers (or, for a client, that
 * this repo has a page for) — 53 of the 84 advertised, measured on every build.
 * So the menu is hydrated from the catalog AND cannot advertise a 404. See
 * `scripts/sync-catalog.mjs` for the gate and `scripts/audit-catalog.mjs` for
 * the ratchet that stops the other 31 growing.
 *
 * Every leaf's `href` was resolved against the filesystem by the same sync: a
 * bespoke page where this repo publishes one, `/cloud/<slug>` otherwise, and
 * `cloudPrimitiveSlugs` below builds a page for every one of the latter — so a
 * leaf cannot be a dead link in either branch.
 *
 * The mega-menu shows each category's first few leaves and links to the
 * category page for the rest; `/products/<id>` and the product showcase list
 * every leaf, so nothing is reachable only through the menu.
 */

import type { ComponentType } from 'react'
import { policy } from '@/lib/publish'
import {
  Activity, ArrowLeftRight, BarChart3, Bell, Blocks, Bot, Box, Boxes, Brain,
  Cable, ClipboardList, Cloud, Code, Code2, Coins, Container, Cpu, CreditCard,
  Database, FileText, Fingerprint, FolderGit2, FunctionSquare, Gauge, GitBranch,
  Globe, Hammer, HardDrive, Key, KeyRound, KeySquare, Landmark, Layers,
  LayoutDashboard, LineChart, ListChecks, Lock, MessageSquare, Monitor, Network,
  NotebookPen, Package, Play, Radio, Rocket, Ruler, ScrollText, Search, Server,
  Shield, ShieldCheck, Sparkles, Spline, Store, Tag, Terminal, Wallet, Waypoints,
  Workflow, Zap,
} from 'lucide-react'
// The attribute is not decoration: Next's bundler infers the type from the
// extension, but Node's own ESM loader refuses a JSON import without it — and
// Node is what runs the Playwright specs that import this taxonomy. Without it
// e2e/catalog-agreement.spec.ts cannot even load.
import snapshot from './catalog.json' with { type: 'json' }
// Depth, base to crown — the one fact the catalog does not carry. See
// `cloudLayers` below for what it means and who else reads it.
import depth from './stack.json' with { type: 'json' }

export type PrimitiveStatus = 'ga' | 'beta' | 'coming'
export type CloudIcon = ComponentType<{ className?: string; size?: number | string }>

export interface Primitive {
  /** Display name shown in the mega-menu and as the overview <h1>. */
  title: string
  /** Resolved link — a bespoke product page, or a generated overview route. */
  href: string
  /** The catalog's product slug. Also the `/cloud/<slug>` route when generated. */
  slug: string
  icon: CloudIcon
  /** The operation that proves this product exists (`/v1/vector`). */
  api?: string
  /** The Google Cloud service a reader may know this by. */
  gcp?: string
  /** The catalog's own docs page for this product. */
  docs?: string
  /** Source — the product's repo when the catalog names one, else the org. */
  github?: string
  tagline?: string
  description?: string
  features?: string[]
  status?: PrimitiveStatus
  /** Short menu descriptor shown under the leaf title. */
  blurb?: string
  /** Resolved menu descriptor: blurb ?? tagline. */
  desc?: string
}

export interface CloudCategory {
  /** The catalog's category id — the `/products/<id>` route. */
  id: string
  /** Category label — the mega-menu column header. */
  title: string
  /** Category icon — shown on the homepage overview grid. */
  icon: CloudIcon
  /** One-line category positioning — also the mega-menu column subtitle. */
  tagline: string
  /**
   * The category's primitives, in the catalog's order. Depths are UNEVEN
   * because they are measured, not padded to fit a grid: a category holds
   * exactly the products that answer.
   */
  items: Primitive[]
}

export const POSITIONING = 'The AI cloud — one API for every capability. Open models. On-chain.'

const ORG = 'https://github.com/hanzoai'
const DOCS = 'https://docs.hanzo.ai'

/**
 * The catalog names an icon; this resolves the name to a component.
 *
 * Every key the catalog uses today is here, including the ones on products that
 * do not currently answer — a renamed apiPath landing in commerce should light
 * the product up on the next build, not draw it with a placeholder. An unknown
 * name falls back rather than throwing: a marketing page missing one glyph is a
 * blemish, a build that will not render is an outage.
 */
const ICON: Record<string, CloudIcon> = {
  Activity, ArrowLeftRight, BarChart3, Bell, Blocks, Bot, Box, Boxes, Brain,
  Cable, ClipboardList, Code, Code2, Coins, Container, Cpu, CreditCard, Database,
  FileText, Fingerprint, FolderGit2, FunctionSquare, Gauge, GitBranch, Globe,
  Hammer, HardDrive, Key, KeyRound, KeySquare, Layers, LineChart, ListChecks,
  Lock, MessageSquare, Monitor, Network, NotebookPen, Package, Play, Radio,
  Rocket, Ruler, ScrollText, Search, Server, Shield, ShieldCheck, Sparkles,
  Spline, Store, Tag, Terminal, Wallet, Waypoints, Workflow, Zap,
}

/**
 * The prose for a category. The catalog carries an id, a label and an order —
 * no icon and no positioning line, because those are how this site talks about
 * the category rather than facts about the product line.
 */
const CATEGORY: Record<string, { icon: CloudIcon; tagline: string }> = {
  ai: { icon: Brain, tagline: 'Models, agents, and inference — open weights, one API.' },
  compute: { icon: Cpu, tagline: 'GPUs, machines, and functions that scale to zero.' },
  data: { icon: Database, tagline: 'Every persistence primitive — at rest and in motion.' },
  network: { icon: Network, tagline: 'Connect, route, and protect every service.' },
  security: { icon: Shield, tagline: 'Identity, keys, and audit for the whole cloud.' },
  dev: { icon: Terminal, tagline: 'Clients, SDKs, and keys for the whole API.' },
  // `infrastructure`, not `platform`. The catalog renamed this category — the
  // section it sits in is called Platform and a category cannot nest inside a
  // section of its own name — and the key here was left on the old id, so the
  // lookup missed and the category rendered with the fallback Cloud icon and NO
  // tagline at all. It was the one tile on the front door with nothing written
  // under it, on every surface that reads this map: the mega-menu column, the
  // homepage grid, the orbit's centre, and the `/products/<id>` landing.
  infrastructure: { icon: Layers, tagline: 'Source to production as declared state.' },
  observe: { icon: Activity, tagline: 'Logs, metrics, traces, and cost in one pane.' },
  web3: { icon: Landmark, tagline: 'On-chain infrastructure for the cloud.' },
  apps: { icon: LayoutDashboard, tagline: 'Production apps built on the cloud.' },
}

interface Copy {
  /** Short menu descriptor. */
  blurb?: string
  tagline?: string
  description?: string
  features?: string[]
  status?: PrimitiveStatus
}

/**
 * What this site says about a product, keyed by the catalog's product id.
 *
 * Two depths, and the difference is which page the words are for. A `blurb` is
 * the one line under a leaf in the menu. A `tagline` + `description` +
 * `features` set is the body of a generated `/cloud/<slug>` overview, and only
 * a product without a bespoke page needs one — a product with its own page
 * already has all the copy it will ever have, in that page.
 */
const COPY: Record<string, Copy> = {
  // --- AI --------------------------------------------------------------------
  models: { blurb: 'Open-weight model garden' },
  agents: { blurb: 'Build & run agents' },
  embeddings: {
    status: 'ga',
    blurb: 'Turn anything into vectors',
    tagline: 'Turn anything into vectors.',
    description:
      'Open embedding models for text, code, and images behind one API, wired straight into Vector for retrieval. Batch or realtime, metered per token.',
    features: ['Text, code & image models', 'One API, many models', 'Pairs with Vector search', 'Token-metered billing'],
  },

  // --- Compute ---------------------------------------------------------------
  gpus: {
    status: 'ga',
    blurb: 'On-demand accelerators',
    tagline: 'On-demand accelerators, by the second.',
    description:
      'H100, A100, and consumer-class GPUs on demand — attach to a machine, a container, or a training job. Per-second billing, no reservations, no idle spend.',
    features: ['H100 / A100 / L40S', 'Per-second metering', 'Attach to any workload', 'No reservation required'],
  },
  machines: { blurb: 'VMs by the second' },
  functions: { blurb: 'Serverless handlers' },
  tasks: { blurb: 'Durable scheduled work' },

  // --- Data ------------------------------------------------------------------
  vector: { blurb: 'Embeddings & retrieval' },
  sql: { blurb: 'Relational, per tenant' },
  kv: { blurb: 'Cache & queues' },
  s3: { blurb: 'Object storage' },
  datastore: { blurb: 'Analytical columnar store' },
  base: { blurb: 'Instant app backend' },
  docdb: { blurb: 'MongoDB wire protocol' },

  // --- Network ---------------------------------------------------------------
  gateway: { blurb: 'One API front door' },
  dns: { blurb: 'Authoritative DNS + DNSSEC' },

  // --- Security --------------------------------------------------------------
  iam: { blurb: 'OIDC identity & orgs' },
  authz: { blurb: 'Fine-grained access' },
  kms: { blurb: 'Managed keys' },
  secrets: {
    status: 'ga',
    blurb: 'Store once, sync everywhere',
    tagline: 'Store once, sync everywhere.',
    description:
      'Versioned secrets with per-environment scoping, synced into Kubernetes as native resources. Nothing is ever written in plaintext, and every read is audited.',
    features: ['Versioned & environment-scoped', 'Kubernetes sync', 'Never stored in plaintext', 'Every read audited'],
  },
  audit: {
    status: 'ga',
    blurb: 'A tamper-evident trail',
    tagline: 'A tamper-evident trail.',
    description:
      'Every privileged action across the cloud, recorded append-only and anchored on-chain. Query by actor, resource, or time window; export for your auditors.',
    features: ['Append-only by construction', 'On-chain anchoring', 'Query by actor or resource', 'Auditor-ready export'],
  },

  // --- Platform --------------------------------------------------------------
  projects: { blurb: 'The deploy unit' },
  registry: { blurb: 'Your container registry' },
  environments: {
    status: 'ga',
    blurb: 'Dev, staging, prod — isolated',
    tagline: 'Dev, staging, prod — isolated.',
    description:
      'Every project gets isolated environments with their own secrets, data, and domains. Promote a build between them rather than rebuilding it.',
    features: ['Isolated secrets & data', 'Per-environment domains', 'Promote, do not rebuild', 'Preview environments per branch'],
  },
  builds: {
    status: 'ga',
    blurb: 'Source to signed image',
    tagline: 'Source to signed image.',
    description:
      'Reproducible container builds from a git push, cached and signed, pushed to your own registry. No build logic per repo — one declared pipeline.',
    features: ['Build on push', 'Layer caching', 'Signed images', 'Multi-architecture'],
  },
  releases: {
    status: 'ga',
    blurb: 'Ship with confidence',
    tagline: 'Ship with confidence.',
    description:
      'A release is an immutable pin of image plus configuration. Roll forward or back to any previous one in a single operation, with a full history of who shipped what.',
    features: ['Immutable pins', 'One-step rollback', 'Full ship history', 'Progressive rollout'],
  },
  pipelines: {
    status: 'ga',
    blurb: 'CI/CD as declared state',
    tagline: 'CI/CD as declared state.',
    description:
      'One declarative file describes build, test, and deploy for every repo in the org. Runs on your own runners; no per-repo workflow logic to keep in sync.',
    features: ['One declarative file', 'Self-hosted runners', 'Shared across every repo', 'Deploy gated on tests'],
  },

  // --- Observe ---------------------------------------------------------------
  logs: {
    status: 'ga',
    blurb: 'Search every line',
    tagline: 'Search every line.',
    description:
      'Structured logs from every service in one searchable store, retained per plan and scoped per organization. No agent to install and no second log vendor.',
    features: ['Structured & searchable', 'Per-organization scoping', 'No agent to install', 'Retention per plan'],
  },
  evals: {
    status: 'beta',
    blurb: 'Measure model & agent quality',
    tagline: 'Measure model and agent quality.',
    description:
      'Benchmark, grade, and regression-test models and agents. LLM-as-judge, golden sets, and drift detection with reproducible scorecards anchored on-chain.',
    features: ['LLM-as-judge & golden sets', 'Regression gates in CI', 'Drift detection', 'Anchored scorecards'],
  },
  metrics: { blurb: 'Time series & SLOs' },
  billing: { blurb: 'Usage-based billing' },

  // --- Apps ------------------------------------------------------------------
  chat: { blurb: 'Conversational AI' },
  bot: { blurb: 'Multi-agent platform' },
  search: { blurb: 'Retrieval & answers' },
  crawl: { blurb: 'Web crawler' },
}

interface Row {
  id: string
  name: string
  category: string
  slug: string
  href: string
  icon: string
  api: string | null
  docs: string | null
  repo: string | null
  gcp: string | null
  order: number
}

interface Snapshot {
  source: string
  document: string
  fetched: string
  categories: { id: string; label: string; order: number }[]
  products: Row[]
  excluded: { id: string; category: string; api: string | null; why: string }[]
}

const catalog = snapshot as Snapshot

const toPrimitive = (row: Row): Primitive => {
  const copy = COPY[row.id] ?? {}
  return {
    ...copy,
    title: row.name,
    href: row.href,
    slug: row.slug,
    icon: ICON[row.icon] ?? Boxes,
    api: row.api ?? undefined,
    gcp: row.gcp ?? undefined,
    docs: row.docs ?? DOCS,
    // The product's own repo when the catalog names one. It names 36 of the 53;
    // the org is where a reader lands for the rest, and it is never a 404.
    github: row.repo ? `https://github.com/${row.repo}` : ORG,
    desc: copy.blurb ?? copy.tagline,
  }
}

/**
 * Every category with every leaf resolved — including withdrawn ones. The
 * generated `/cloud/<slug>` pages and the `/products/<id>` landings derive from
 * THIS set, because a withdrawn page still builds and answers on its URL
 * (lib/publish's own contract); only its links disappear.
 */
const allCategories: CloudCategory[] = catalog.categories.map((c) => ({
  id: c.id,
  title: c.label,
  icon: CATEGORY[c.id]?.icon ?? Cloud,
  tagline: CATEGORY[c.id]?.tagline ?? '',
  items: catalog.products.filter((p) => p.category === c.id).map(toPrimitive),
}))

/**
 * The taxonomy SHOWS a primitive iff its page is PUBLISHED — the same
 * `policy()` that writes the sitemap and the noindex tags, applied at the one
 * source every display surface reads: the mega-menu, the homepage category
 * grid, the `/products/<id>` landings and the product showcases all derive
 * from this export, so withdrawing a surface in lib/publish empties it out of
 * all of them in the same commit. A category whose every leaf is withdrawn
 * vanishes whole — an empty tile is not a tile.
 */
export const cloudCategories: CloudCategory[] = allCategories
  .map((c) => ({ ...c, items: c.items.filter((item) => policy(item.href) === 'public') }))
  .filter((c) => c.items.length > 0)

/**
 * The same categories, in DEPTH order — what each one stands on.
 *
 * The catalog's `order` is the MENU order: what the Products dropdown offers
 * first, which is AI because AI is the headline. A stack asks a different
 * question, and answering it with the menu's answer puts settlement ninth and
 * AI underneath everything, which is not how any of it is built.
 *
 * Depth is therefore its own fact, declared once in `lib/data/stack.json` and
 * only there. `film/stack` composes the ten slabs from that file and
 * `film/layer` lifts one out of them; this is the same order in DOM text, so
 * the film on cloud.hanzo.ai and the list under it are one picture. It used to
 * be a const inside `film/stack/film.mjs`, which the page had no way to read —
 * so the page listed the ten in menu order and the picture above it stood on
 * the chain while the list beside it started at AI.
 *
 * The chain is the ground: value settles on it, and everything above it is
 * something we run. Compute, data and network are the substrate over that;
 * security and the deploy plane are how it is operated; observe and dev are how
 * it is watched and driven; AI is what it is for; apps are what a person opens.
 * Apps is the crown — the layer someone touches, standing on nine they do not
 * have to think about.
 *
 * A category `stack.json` does not place falls to the END rather than
 * disappearing: this is what a page RENDERS, and a layer silently missing from
 * the front door is worse than one standing in the wrong place. The films, which
 * are composed for an exact count, throw instead — the right answer there, and
 * the wrong one here.
 */
export const cloudLayers: CloudCategory[] = [...cloudCategories].sort((a, b) => {
  const at = depth.indexOf(a.id)
  const bt = depth.indexOf(b.id)
  return (at < 0 ? depth.length : at) - (bt < 0 ? depth.length : bt)
})

/** Slugs hosted by the `/cloud/[slug]` dynamic route — every leaf without a page of its own. */
export const cloudPrimitiveSlugs: string[] = allCategories
  .flatMap((c) => c.items)
  .filter((i) => i.href.startsWith('/cloud/'))
  .map((i) => i.slug)

/** Look up a primitive by slug. */
export function getPrimitive(slug: string): Primitive | undefined {
  return allCategories.flatMap((c) => c.items).find((i) => i.slug === slug)
}

/** Category a primitive belongs to (for the overview breadcrumb). */
export function getPrimitiveCategory(slug: string): CloudCategory | undefined {
  return allCategories.find((c) => c.items.some((i) => i.slug === slug))
}

/** Every category id — the `generateStaticParams` set for `/products/[categoryId]`. */
// From ALL categories: a withdrawn landing still builds and answers.
export const categorySlugs: string[] = allCategories.map((c) => c.id)

/** Look up a category by its id (the `/products/<id>` landing page). */
export function getCategoryBySlug(slug: string): CloudCategory | undefined {
  return allCategories.find((c) => c.id === slug)
}

// ── The hero tour ────────────────────────────────────────────────────────────

/** One beat of the hero's story: our line, and the API's own words for it. */
export interface Beat {
  /** The line the hero types. Prose, and the only part of a beat we write. */
  line: string
  method: string
  path: string
  /** The served document's own one-line description of that operation. */
  summary: string
}

/**
 * The story the hero tells, resolved at build time against the SAME served
 * document that decides which products exist (`scripts/sync-catalog.mjs`).
 *
 * A beat survives iff `/v1/openapi.json` carries its path AND its verb, so the
 * hero cannot narrate an operation the platform does not serve — an invented
 * path and a real path with the wrong verb are both dropped, with the reason
 * printed. That is what keeps a scenario from becoming marketing fiction in a
 * terminal font: the prose is ours, the verb, the path and the description are
 * the API's.
 */
export const tour: { story: string; beats: Beat[] } = snapshot.tour ?? { story: '', beats: [] }
