/**
 * Hanzo Cloud — primitive taxonomy (single source of truth).
 *
 * The cloud is organized like a console, not a product list: ten categories of
 * cloud primitives. Every primitive has an open-source runtime, a cryptographic
 * identity, usage metering, and on-chain settlement underneath.
 *
 *   Positioning: The AI cloud — one API for every capability.
 *
 * Mega-menu layout (two rows of five):
 *
 *   AI        Compute     Data        Network     Security
 *   Payments  Platform    Observe     Web3        Apps
 *
 * Category depth is UNEVEN (7-15) because the taxonomy describes the product
 * rather than a grid. The mega-menu therefore shows each category's first five
 * leaves and an "All <n>" link; the `/products/<slug>` page and the product
 * showcase list every leaf, so nothing is reachable only through the menu.
 *
 * Every leaf carries two deep links resolved once at the bottom of this file:
 * a console quick-launch (console.hanzo.ai) and a docs page (docs.hanzo.ai).
 *
 * This file is the ONLY place the taxonomy lives. `lib/constants/navigation-data.ts`
 * derives `productsNav` from it, the homepage overview + hero read `capabilityCount`
 * / `categoryCount` from it, and `app/(marketing)/cloud/[slug]` + the two
 * `/blockchain` overview pages render generated pages from the same entries —
 * so a leaf can never become a dead link and no count can drift.
 *
 * Future: `capabilityCount` / `cloudCategories` can be hydrated at runtime from
 * `GET /v1/commerce/catalog` (the live capability catalog). That fetch is NOT
 * wired yet — this static taxonomy is the source until the catalog API ships;
 * the swap is a single hydration point (replace the `rawCategories` seed).
 */

import type { ComponentType } from 'react'
import {
  Activity, ArrowLeftRight, ArrowUpDown, AudioLines, BadgeCheck, Bell, Blocks,
  BookOpen, Bot, Boxes, Brain, Building2, Cloud, Coins, Container, Cpu,
  CreditCard, Database, FileClock, FileKey, FileSignature, FileSpreadsheet,
  FileText, FolderGit2, FolderLock, GitBranch, Globe, HardDrive, Image, Inbox,
  Key, KeyRound, Landmark, Layers, LayoutDashboard, LineChart, ListTodo, Lock,
  Megaphone, MessageSquare, Network, Package, Radio, Receipt, Repeat, Rocket,
  Route, Scale, ScrollText, Search, Server, Shield, ShieldCheck, ShoppingCart,
  SlidersHorizontal, Sparkles, Split, Star, Tags, Terminal, Users, Video,
  Wallet, Workflow, Zap,
} from 'lucide-react'

export type PrimitiveStatus = 'ga' | 'beta' | 'coming'
export type CloudIcon = ComponentType<{ className?: string; size?: number | string }>

export interface Primitive {
  /** Display name shown in the mega-menu and as the overview <h1>. */
  title: string
  /** Resolved link — an existing product page, or a generated overview route. */
  href: string
  icon: CloudIcon
  /**
   * Present only for primitives without a bespoke page. These render a real,
   * unique overview page (hero, positioning, features) so the leaf is never a
   * 404 and never an empty stub.
   */
  slug?: string
  tagline?: string
  description?: string
  features?: string[]
  status?: PrimitiveStatus
  github?: string
  /** Verified-live docs page (resolved at the bottom of this file). */
  docs?: string
  /** Short menu descriptor shown under the leaf title. */
  blurb?: string
  /** Console quick-launch deep link (resolved at the bottom of this file). */
  console?: string
  /** Resolved menu descriptor: blurb ?? tagline (resolved at the bottom). */
  desc?: string
  /**
   * True for a leaf that links OUT to another surface (the Web3 leaves point at
   * lux.cloud). External leaves get no Hanzo console deep-link and their docs
   * resolve to the external brand's docs, not docs.hanzo.ai.
   */
  external?: boolean
  /** White-label brand for a leaf that is NOT a Hanzo surface (e.g. 'lux'). */
  brand?: 'lux'
}

export interface CloudCategory {
  /** Category label — one of the ten cloud primitives. */
  title: string
  /** Category icon — shown on the homepage overview grid. */
  icon: CloudIcon
  /** One-line category positioning — also the mega-menu column subtitle. */
  tagline: string
  /**
   * White-label brand for the whole category. Web3 is a Lux Network surface —
   * the category page + mega-menu render the Lux brand and hand off to
   * lux.cloud, never showing the Hanzo mark on a Lux surface.
   */
  brand?: 'lux'
  /**
   * A short qualifier shown beside the category everywhere it appears — the
   * scope caveat a reader needs before clicking. "fiat only" on Payments is not
   * decoration: it is the difference between that category and Web3.
   */
  note?: string
  /**
   * The category's primitives. Counts are UNEVEN by design (7-15) — the
   * taxonomy describes the product, it is not padded to fit a grid. The
   * mega-menu shows the first few and links to the category page for the rest;
   * the category page and the product showcase list every one.
   */
  items: Primitive[]
}

export const POSITIONING = 'The AI cloud — one API for every capability. Open models. On-chain.'

const ORG = 'https://github.com/hanzoai'
const DOCS = 'https://docs.hanzo.ai'
const CONSOLE = 'https://console.hanzo.ai'
const DOCS_BASE = 'https://docs.hanzo.ai/docs'

// Lux Network surfaces (the Web3 category). These are NOT Hanzo products: they
// live at lux.cloud under the Lux brand. White-label separation is absolute —
// a Lux leaf never carries a Hanzo console link, Hanzo docs, or the Hanzo mark.
const LUX = 'https://lux.cloud'
const LUX_SERVICES = 'https://lux.cloud/services'
const LUX_DOCS = 'https://docs.lux.cloud'
const LUX_ORG = 'https://github.com/luxfi'

// Shared defaults for generated overview pages: source is the org (always 200,
// open source) and docs home (separate site). Keeps every link live.
const stub = ({
  base = '/cloud',
  ...p
}: Omit<Primitive, 'href' | 'github' | 'docs'> & { slug: string; base?: '/cloud' | '/blockchain' }): Primitive => ({
  ...p,
  href: `${base}/${p.slug}`,
  github: ORG,
  docs: DOCS,
})

const rawCategories: CloudCategory[] = [
  {
    title: 'AI',
    icon: Brain,
    tagline: 'Models, agents, and inference — open weights, one API.',
    items: [
      { title: 'Models', href: '/models', icon: Brain, blurb: 'Open-weight model garden' },
      { title: 'Chat', href: '/chat', icon: MessageSquare, blurb: 'Conversational AI' },
      { title: 'Agents', href: '/agents', icon: Bot, blurb: 'Build & run agents' },
      stub({
        slug: 'embeddings', title: 'Embeddings', icon: Sparkles, status: 'ga',
        tagline: 'Turn anything into vectors.',
        description: 'Open embedding models for text, code, and images behind one API, wired straight into Vector for retrieval. Batch or realtime, metered per token.',
        features: ['Text, code & image models', 'One API, many models', 'Pairs with Vector search', 'Token-metered billing'],
      }),
      stub({
        slug: 'rerank', title: 'Rerank', icon: ArrowUpDown, status: 'ga',
        tagline: 'Put the right result first.',
        description: 'Cross-encoder reranking that reorders candidate documents by true relevance to the query. Drop it in after Vector or any search step to sharpen retrieval before the model spends a token on the wrong context.',
        features: ['Cross-encoder relevance scoring', 'Sharpens Vector & RAG retrieval', 'One API, open rerank models', 'Token-metered billing'],
      }),
      stub({
        slug: 'finetune', title: 'Finetune', icon: SlidersHorizontal, status: 'beta',
        tagline: 'Adapt open models to your domain.',
        description: 'LoRA and full fine-tuning for Zen and open-weight models with managed datasets, checkpoints, and one-click promotion to Inference. Every run is metered and attestable on-chain.',
        features: ['LoRA + full fine-tuning', 'Managed datasets & checkpoints', 'Promote straight to Inference', 'On-chain run attestations'],
      }),
      stub({
        slug: 'evals', title: 'Evals', icon: BadgeCheck, status: 'beta',
        tagline: 'Measure model and agent quality.',
        description: 'Benchmark, grade, and regression-test models and agents. LLM-as-judge, golden sets, and drift detection with reproducible scorecards anchored on-chain.',
        features: ['LLM-as-judge & golden sets', 'Regression gates in CI', 'Drift detection', 'Anchored scorecards'],
      }),
      { title: 'Annotations', href: '/products/ai', icon: Tags },
      { title: 'Scores', href: '/products/ai', icon: Star },
      { title: 'RAG', href: '/solutions/rag', icon: BookOpen, blurb: 'Retrieval-augmented generation' },
      { title: 'Memory', href: '/products/ai', icon: Boxes },
      { title: 'Judge', href: '/products/ai', icon: Scale },
      { title: 'Audio', href: '/products/ai', icon: AudioLines },
      { title: 'Images', href: '/products/ai', icon: Image },
      { title: 'Video', href: '/products/ai', icon: Video },
    ],
  },
  {
    title: 'Compute',
    icon: Cpu,
    tagline: 'GPUs, machines, and sandboxes that scale to zero.',
    items: [
      stub({
        slug: 'gpus', title: 'GPUs', icon: Cpu, status: 'ga',
        tagline: 'On-demand accelerators, by the second.',
        description: 'H100, A100, and consumer-class GPUs on demand — attach to a machine, a container, or a training job. Per-second billing, no reservations, no idle spend.',
        features: ['H100 / A100 / L40S', 'Per-second metering', 'Attach to any workload', 'No reservation required'],
      }),
      { title: 'Machines', href: '/machines', icon: Server, blurb: 'VMs by the second' },
      { title: 'Clusters', href: '/products/compute', icon: Boxes },
      { title: 'K8s', href: '/products/compute', icon: Container },
      { title: 'Fleet', href: '/products/compute', icon: Layers },
      { title: 'Functions', href: '/functions', icon: Zap, blurb: 'Serverless handlers' },
      { title: 'Exec', href: '/products/compute', icon: Terminal },
      stub({
        slug: 'jobs', title: 'Jobs', icon: ListTodo, status: 'ga',
        tagline: 'Batch and scheduled compute.',
        description: 'Run a container to completion on a schedule or a queue — training runs, ETL, evals, nightly reports. Retries, concurrency limits, and per-second metering built in.',
        features: ['Cron + queue triggers', 'Retries & concurrency caps', 'GPU or CPU', 'Per-second metering'],
      }),
    ],
  },
  {
    title: 'Data',
    icon: Database,
    tagline: 'Every persistence primitive — at rest and in motion.',
    items: [
      { title: 'Vector', href: '/vector', icon: Sparkles, blurb: 'Embeddings & retrieval' },
      { title: 'SQL', href: '/sql', icon: Database, blurb: 'Relational, per tenant' },
      { title: 'KV', href: '/kv', icon: Key, blurb: 'Cache & queues' },
      { title: 'S3', href: '/s3', icon: HardDrive, blurb: 'Object storage' },
      { title: 'Search', href: '/search', icon: Search, blurb: 'Full-text & hybrid' },
      { title: 'DocDB', href: '/docdb', icon: FileText, blurb: 'MongoDB wire protocol' },
      { title: 'Datastore', href: '/datastore', icon: Boxes, blurb: 'Analytical columnar store' },
      { title: 'Base', href: '/base', icon: Layers, blurb: 'Instant app backend' },
      { title: 'Pubsub', href: '/pubsub', icon: Radio, blurb: 'Fan-out messaging' },
      { title: 'MQ', href: '/mq', icon: Inbox, blurb: 'Durable queues' },
    ],
  },
  {
    title: 'Network',
    icon: Network,
    tagline: 'Connect, route, and protect every service.',
    items: [
      { title: 'Gateway', href: '/gateway', icon: Network, blurb: 'One API front door' },
      { title: 'Ingress', href: '/ingress', icon: Route, blurb: 'K8s-native routing' },
      { title: 'DNS', href: '/dns', icon: Globe, blurb: 'Authoritative DNS + DNSSEC' },
      { title: 'VPCs', href: '/network', icon: Workflow, blurb: 'Private networking' },
      { title: 'Balancers', href: '/products/network', icon: Split },
      { title: 'ZT', href: '/products/network', icon: ShieldCheck },
      { title: 'Cloudflare', href: '/tunnel', icon: Cloud, blurb: 'Tunnels & edge integration' },
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    tagline: 'Identity, keys, and audit for the whole cloud.',
    items: [
      { title: 'IAM', href: '/iam', icon: Users, blurb: 'OIDC identity & orgs' },
      { title: 'Authz', href: '/authz', icon: ShieldCheck, blurb: 'Fine-grained access' },
      { title: 'KMS', href: '/kms', icon: KeyRound, blurb: 'Managed keys' },
      stub({
        slug: 'secrets', title: 'Secrets', icon: FileKey, status: 'ga',
        tagline: 'Store once, sync everywhere.',
        description: 'Versioned secrets with per-environment scoping, synced into Kubernetes as native resources. Nothing is ever written in plaintext, and every read is audited.',
        features: ['Versioned & environment-scoped', 'Kubernetes sync', 'Never stored in plaintext', 'Every read audited'],
      }),
      stub({
        slug: 'audit', title: 'Audit', icon: FileClock, status: 'ga',
        tagline: 'A tamper-evident trail.',
        description: 'Every privileged action across the cloud, recorded append-only and anchored on-chain. Query by actor, resource, or time window; export for your auditors.',
        features: ['Append-only by construction', 'On-chain anchoring', 'Query by actor or resource', 'Auditor-ready export'],
      }),
      { title: 'Compliance', href: '/guard', icon: BadgeCheck, blurb: 'Policy & guardrails' },
      { title: 'MPC', href: '/products/security', icon: Lock },
      { title: 'HSM', href: '/hsm', icon: Lock, blurb: 'Hardware-backed keys' },
    ],
  },
  {
    title: 'Payments',
    icon: CreditCard,
    tagline: 'Sell, charge, and reconcile.',
    note: 'fiat only',
    items: [
      { title: 'Payments', href: '/payments', icon: CreditCard, blurb: 'Take payments' },
      { title: 'Commerce', href: '/commerce', icon: ShoppingCart, blurb: 'Catalog & checkout' },
      { title: 'Billing', href: '/billing', icon: Receipt, blurb: 'Usage-based billing' },
      { title: 'Finance', href: '/ledger', icon: Landmark, blurb: 'Double-entry ledger' },
      { title: 'Pricing', href: '/pricing', icon: LineChart, blurb: 'Rates & metering' },
      { title: 'Plans', href: '/products/payments', icon: Layers },
      { title: 'Invoicing', href: '/products/payments', icon: FileText },
    ],
  },
  {
    title: 'Platform',
    icon: Layers,
    tagline: 'Source to production as declared state.',
    items: [
      { title: 'Projects', href: '/platform', icon: Package, blurb: 'The deploy unit' },
      { title: 'Sites', href: '/products/platform', icon: Globe },
      stub({
        slug: 'environments', title: 'Environments', icon: Layers, status: 'ga',
        tagline: 'Dev, staging, prod — isolated.',
        description: 'Every project gets isolated environments with their own secrets, data, and domains. Promote a build between them rather than rebuilding it.',
        features: ['Isolated secrets & data', 'Per-environment domains', 'Promote, do not rebuild', 'Preview environments per branch'],
      }),
      stub({
        slug: 'builds', title: 'Builds', icon: Rocket, status: 'ga',
        tagline: 'Source to signed image.',
        description: 'Reproducible container builds from a git push, cached and signed, pushed to your own registry. No build logic per repo — one declared pipeline.',
        features: ['Build on push', 'Layer caching', 'Signed images', 'Multi-architecture'],
      }),
      stub({
        slug: 'releases', title: 'Releases', icon: BadgeCheck, status: 'ga',
        tagline: 'Ship with confidence.',
        description: 'A release is an immutable pin of image plus configuration. Roll forward or back to any previous one in a single operation, with a full history of who shipped what.',
        features: ['Immutable pins', 'One-step rollback', 'Full ship history', 'Progressive rollout'],
      }),
      stub({
        slug: 'pipelines', title: 'Pipelines', icon: Workflow, status: 'ga',
        tagline: 'CI/CD as declared state.',
        description: 'One declarative file describes build, test, and deploy for every repo in the org. Runs on your own runners; no per-repo workflow logic to keep in sync.',
        features: ['One declarative file', 'Self-hosted runners', 'Shared across every repo', 'Deploy gated on tests'],
      }),
      { title: 'Registry', href: '/registry', icon: Container, blurb: 'Your container registry' },
      { title: 'Deploy', href: '/products/platform', icon: Rocket },
      { title: 'Git', href: '/code', icon: GitBranch, blurb: 'Source control & review' },
    ],
  },
  {
    title: 'Observe',
    icon: Activity,
    tagline: 'Logs, metrics, traces, and cost in one pane.',
    items: [
      stub({
        slug: 'logs', title: 'Logs', icon: ScrollText, status: 'ga',
        tagline: 'Search every line.',
        description: 'Structured logs from every service in one searchable store, retained per plan and scoped per organization. No agent to install and no second log vendor.',
        features: ['Structured & searchable', 'Per-organization scoping', 'No agent to install', 'Retention per plan'],
      }),
      { title: 'Metrics', href: '/metrics', icon: LineChart, blurb: 'Time series & SLOs' },
      { title: 'Traces', href: '/telemetry', icon: Activity, blurb: 'Distributed tracing' },
      { title: 'Dashboards', href: '/dashboards', icon: LayoutDashboard, blurb: 'One pane per team' },
      { title: 'Alerts', href: '/products/observe', icon: Bell },
      { title: 'Sentinel', href: '/sentinel', icon: Bell, blurb: 'Error tracking' },
      { title: 'Insights', href: '/insights', icon: Sparkles, blurb: 'Product analytics' },
      { title: 'Analytics', href: '/analytics', icon: LineChart, blurb: 'Web analytics' },
      stub({
        slug: 'cost', title: 'Cost', icon: Receipt, status: 'ga',
        tagline: 'See and settle spend.',
        description: 'Every metered call attributed to an organization, a project, and an environment, in real time. The same records that bill you are the ones you query.',
        features: ['Attribution per project', 'Real-time accrual', 'Same records as the invoice', 'Budgets & alerts'],
      }),
    ],
  },
  {
    title: 'Web3',
    icon: Landmark,
    tagline: 'Nodes, wallets, and on-chain infrastructure — powered by Lux.',
    note: 'powered by Lux',
    brand: 'lux',
    items: [
      { title: 'Nodes', href: LUX_SERVICES, icon: Server, blurb: 'Run a chain node', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Wallets', href: LUX_SERVICES, icon: Wallet, blurb: 'MPC custody & keys', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Transfers', href: LUX_SERVICES, icon: ArrowLeftRight, blurb: 'Move value on-chain', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Indexers', href: LUX_SERVICES, icon: Search, blurb: 'Explorer & chain data', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Oracles', href: LUX_SERVICES, icon: Radio, blurb: 'Off-chain data feeds', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Validators', href: LUX_SERVICES, icon: ShieldCheck, blurb: 'Secure the network', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Staking', href: LUX_SERVICES, icon: Coins, blurb: 'Delegate & earn', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'DEX', href: LUX_SERVICES, icon: ArrowLeftRight, blurb: 'On-chain exchange', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Marketplace', href: LUX_SERVICES, icon: ShoppingCart, blurb: 'Assets & collectibles', external: true, brand: 'lux', github: LUX_ORG },
    ],
  },
  {
    title: 'Apps',
    icon: LayoutDashboard,
    tagline: 'Production apps built on the primitives.',
    items: [
      { title: 'Chat', href: '/chat', icon: MessageSquare, blurb: 'Conversational AI' },
      { title: 'Bot', href: '/bot', icon: Bot, blurb: 'Multi-agent platform' },
      { title: 'Search', href: '/search', icon: Search, blurb: 'Retrieval & answers' },
      { title: 'Crawl', href: '/crawl', icon: Globe, blurb: 'Web crawler' },
      { title: 'Dataroom', href: '/dataroom', icon: FolderLock, blurb: 'Secure document rooms' },
      { title: 'Team', href: '/team', icon: Users, blurb: 'Shared AI workspace' },
      { title: 'eSign', href: '/sign', icon: FileSignature, blurb: 'Electronic signatures' },
      { title: 'CRM', href: '/products/apps', icon: Users },
      { title: 'Captable', href: '/captable', icon: FileSpreadsheet, blurb: 'Equity & ownership' },
      { title: 'Company', href: '/products/apps', icon: Building2 },
      { title: 'Marketing', href: '/products/apps', icon: Megaphone },
      { title: 'Guide', href: '/products/apps', icon: BookOpen },
      { title: 'Framework', href: '/products/apps', icon: Blocks },
      { title: 'Automations', href: '/automations', icon: Repeat, blurb: 'Event-driven workflows' },
      { title: 'Tasks', href: '/tasks', icon: ListTodo, blurb: 'Durable scheduled work' },
    ],
  },
]

// Docs target per primitive, keyed by marketing href. Each value is the page
// docs.hanzo.ai publishes for THAT product — not a synonym that happens to
// resolve. A primitive with no page of its own points at the page that covers
// it (Fine-tuning lives inside the ML guide); it never points at an unrelated
// product to avoid a 404. (`/docs/services` is the catalog fallback for
// anything not listed.) Every value is checked against the docs content tree —
// see the cross-site link check in the docs repo.
const DOCS_PATH: Record<string, string> = {
  // AI
  '/models': 'services/models', '/chat': 'services/chat', '/agents': 'agents',
  '/cloud/embeddings': 'embeddings', '/cloud/finetune': 'services/ml', '/cloud/evals': 'experiments',
  '/solutions/rag': 'vector',
  // Compute
  '/cloud/gpus': 'gpus', '/machines': 'machines', '/functions': 'functions', '/cloud/jobs': 'tasks',
  // Data
  '/vector': 'vector', '/sql': 'sql', '/kv': 'kv', '/s3': 'storage', '/search': 'services/search',
  '/docdb': 'docdb', '/datastore': 'datastore', '/base': 'services/base', '/pubsub': 'services/pubsub',
  '/mq': 'services/mq',
  // Network
  '/gateway': 'gateway', '/ingress': 'services/ingress', '/dns': 'services/dns',
  '/network': 'network', '/tunnel': 'edge',
  // Security
  '/iam': 'iam', '/authz': 'authz', '/kms': 'kms', '/cloud/secrets': 'services/kms',
  '/cloud/audit': 'services/guard', '/guard': 'services/guard', '/hsm': 'mpc',
  // Payments
  '/payments': 'services/payments', '/commerce': 'services/commerce', '/billing': 'billing',
  '/ledger': 'services/ledger', '/pricing': 'billing',
  // Platform
  '/platform': 'services/platform', '/cloud/environments': 'services/platform',
  '/cloud/builds': 'registry', '/cloud/releases': 'deploy', '/cloud/pipelines': 'pipelines',
  '/registry': 'registry', '/code': 'dev',
  // Observe
  '/cloud/logs': 'logs', '/metrics': 'metrics', '/telemetry': 'traces', '/dashboards': 'dashboards',
  '/sentinel': 'skills/hanzo-sentry', '/insights': 'services/insights', '/analytics': 'services/analytics',
  '/cloud/cost': 'billing',
  // Apps
  '/bot': 'services/bot', '/crawl': 'services/search', '/dataroom': 'services/dataroom',
  '/team': 'services/team', '/sign': 'services/sign', '/captable': 'services/captable',
  '/automations': 'services/automations', '/tasks': 'tasks',
}

// Console quick-launch slug — reuse the canonical product slug from the
// marketing href (dropping the /cloud and /blockchain overview prefixes), so a
// leaf launches the SAME product console hosts at /deploy/<slug>.
const launchSlug = (href: string): string =>
  href.replace(/^\/(?:cloud|blockchain)\//, '').replace(/^\//, '')

// Resolve every leaf's two deep links + menu descriptor exactly once.
//  - console: a product-specific quick-launch into console.hanzo.ai. The query
//    form resolves 200 today (never a 404) and lights up the moment console
//    ships per-product /deploy/<slug> routes.
//  - docs: a verified-live docs page (see DOCS_PATH).
//  - desc: the short menu descriptor (blurb override, else the leaf tagline).
const resolve = (p: Primitive): Primitive =>
  p.external
    ? // Lux (Web3) leaf: hand off to lux.cloud. No Hanzo console deep-link; docs
      // resolve to the Lux docs, never docs.hanzo.ai (white-label separation).
      { ...p, console: undefined, docs: p.docs ?? LUX_DOCS, desc: p.blurb ?? p.tagline }
    : {
        ...p,
        console: `${CONSOLE}/?deploy=${launchSlug(p.href)}`,
        docs: `${DOCS_BASE}/${DOCS_PATH[p.href] ?? 'services'}`,
        desc: p.blurb ?? p.tagline,
      }

// The ten cloud categories, with every leaf's console + docs deep links and
// descriptor resolved. Single source of truth for the mega-menu, the generated
// overview pages, and the route table — they can never drift apart.
export const cloudCategories: CloudCategory[] = rawCategories.map((c) => ({
  ...c,
  items: c.items.map(resolve),
}))

/** Number of categories — the ONE count the homepage + hero read (never hard-coded). */
export const categoryCount: number = cloudCategories.length

/** Total capabilities across every category — derived, so no displayed count can drift. */
export const capabilityCount: number = cloudCategories.reduce((n, c) => n + c.items.length, 0)

// All primitives that render a generated overview page, keyed by slug.
const generated: Primitive[] = cloudCategories
  .flatMap((c) => c.items)
  .filter((i) => Boolean(i.slug))

/** Slugs hosted by the `/cloud/[slug]` dynamic route (excludes /blockchain ones). */
export const cloudPrimitiveSlugs: string[] = generated
  .filter((i) => i.href.startsWith('/cloud/'))
  .map((i) => i.slug as string)

/** Look up a generated primitive by slug, regardless of host route. */
export function getPrimitive(slug: string): Primitive | undefined {
  return generated.find((i) => i.slug === slug)
}

/** Category a primitive belongs to (for the overview breadcrumb). */
export function getPrimitiveCategory(slug: string): CloudCategory | undefined {
  return cloudCategories.find((c) => c.items.some((i) => i.slug === slug))
}

// Category slug — the ONE slugify used by both the mega-menu category headers
// and the `/products/<slug>` category landing routes, so a header always links
// to a page that exists. "AI" → "ai", "Web3" → "web3", "Observe" → "observe".
export const categorySlug = (title: string): string =>
  title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Every category slug — the `generateStaticParams` set for `/products/[categoryId]`. */
export const categorySlugs: string[] = cloudCategories.map((c) => categorySlug(c.title))

/** Look up a category by its slug (the `/products/<slug>` landing page). */
export function getCategoryBySlug(slug: string): CloudCategory | undefined {
  return cloudCategories.find((c) => categorySlug(c.title) === slug)
}
