/**
 * Hanzo Cloud — primitive taxonomy (single source of truth).
 *
 * The cloud is organized like a console, not a product list: ten categories of
 * cloud primitives. Every primitive has an open-source runtime, a cryptographic
 * identity, usage metering, and on-chain settlement underneath.
 *
 *   Positioning: The open-source AI cloud — one API for every capability.
 *
 * Mega-menu layout (two rows of five):
 *
 *   AI        Compute     Data        Network     Security
 *   Dev       Deploy      Observe     Web3        Apps
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
  Activity,
  BadgeCheck,
  Bell,
  Bot,
  Braces,
  Brain,
  Boxes,
  Clapperboard,
  Cloud,
  Code2,
  Coins,
  Container,
  Cpu,
  Database,
  FileClock,
  FileKey,
  FileText,
  FolderGit2,
  Globe,
  Hammer,
  HardDrive,
  Key,
  KeyRound,
  Landmark,
  Layers,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Package,
  PlayCircle,
  Radio,
  Receipt,
  Rocket,
  Route,
  Scale,
  ScrollText,
  Search,
  Server,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  UserCheck,
  Wallet,
  Webhook,
  Workflow,
  Zap,
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
  /** Exactly six primary primitives. */
  items: Primitive[]
}

export const POSITIONING = 'The open-source AI cloud — one API for every capability. Open source. On-chain.'

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
      { title: 'Models', href: '/models', icon: Brain },
      { title: 'Agents', href: '/agents', icon: Bot },
      { title: 'Inference', href: '/engine', icon: Cpu },
      stub({
        slug: 'fine-tuning', title: 'Fine-tuning', icon: SlidersHorizontal, status: 'beta',
        tagline: 'Adapt open models to your domain.',
        description: 'LoRA and full fine-tuning for Zen and open-weight models with managed datasets, checkpoints, and one-click promotion to Inference. Every run is metered and attestable on-chain.',
        features: ['LoRA + full fine-tuning', 'Managed datasets & checkpoints', 'Promote straight to Inference', 'On-chain run attestations'],
      }),
      stub({
        slug: 'embeddings', title: 'Embeddings', icon: Sparkles, status: 'ga',
        tagline: 'Turn anything into vectors.',
        description: 'Open embedding models for text, code, and images behind one API, wired straight into Vector for retrieval. Batch or realtime, metered per token.',
        features: ['Text, code & image models', 'One API, many models', 'Pairs with Vector search', 'Token-metered billing'],
      }),
      stub({
        slug: 'evals', title: 'Evals', icon: BadgeCheck, status: 'beta',
        tagline: 'Measure model and agent quality.',
        description: 'Benchmark, grade, and regression-test models and agents. LLM-as-judge, golden sets, and drift detection with reproducible scorecards anchored on-chain.',
        features: ['LLM-as-judge & golden sets', 'Regression gates in CI', 'Drift detection', 'Anchored scorecards'],
      }),
    ],
  },
  {
    title: 'Compute',
    icon: Cpu,
    tagline: 'GPUs, containers, and functions that scale to zero.',
    items: [
      stub({
        slug: 'gpus', title: 'GPUs', icon: Cpu, status: 'ga',
        tagline: 'On-demand accelerators by the second.',
        description: 'Rent A10G to H100 GPUs by the second with spot pricing, fast checkpointing, and SSH. Schedule single cards or multi-node clusters for training and inference.',
        features: ['A10G → H100', 'Per-second + spot pricing', 'Multi-node clusters', 'Metered + on-chain settled'],
      }),
      { title: 'Machines', href: '/machines', icon: Server },
      stub({
        slug: 'containers', title: 'Containers', icon: Container, status: 'ga',
        tagline: 'Run any image, scale to zero.',
        description: 'Deploy OCI containers with autoscaling, scale-to-zero, and zero-config TLS. GitOps from a push, multi-tenant namespaces, and KMS-mounted secrets.',
        features: ['Any OCI image', 'Scale to zero', 'GitOps deploy', 'KMS secret mounts'],
      }),
      { title: 'Functions', href: '/functions', icon: Zap },
      { title: 'Edge', href: '/edge', icon: Globe },
      stub({
        slug: 'jobs', title: 'Jobs', icon: ListTodo, status: 'ga',
        tagline: 'Batch and scheduled compute.',
        description: 'Run one-shot, parallel, and cron-scheduled jobs with retries, timeouts, and exactly-once semantics. Backed by Tasks for durable execution.',
        features: ['Batch & parallel', 'Cron scheduling', 'Retries + timeouts', 'Durable, exactly-once'],
      }),
    ],
  },
  {
    title: 'Data',
    icon: Database,
    tagline: 'Every persistence primitive, from vectors to objects.',
    items: [
      { title: 'Vector', href: '/vector', icon: Sparkles },
      { title: 'SQL', href: '/sql', icon: Database },
      { title: 'KV', href: '/kv', icon: Key },
      { title: 'Object Storage', href: '/storage', icon: HardDrive },
      { title: 'Datastore', href: '/datastore', icon: Boxes },
      { title: 'DocDB', href: '/docdb', icon: FileText },
    ],
  },
  {
    title: 'Network',
    icon: Network,
    tagline: 'Connect, route, and protect every service.',
    items: [
      { title: 'Gateway', href: '/gateway', icon: Network },
      { title: 'VPC', href: '/network', icon: Workflow },
      { title: 'DNS', href: '/dns', icon: Globe },
      stub({
        slug: 'cdn', title: 'CDN', icon: Radio, status: 'beta',
        tagline: 'Cache at the edge.',
        description: 'Pull-through content delivery in front of Object Storage and Gateway. Global points of presence, instant purge, signed URLs, and per-request metering.',
        features: ['Global edge PoPs', 'Instant purge', 'Signed URLs', 'Origin: Storage + Gateway'],
      }),
      { title: 'Load Balancer', href: '/ingress', icon: Scale },
      stub({
        slug: 'service-mesh', title: 'Service Mesh', icon: Route, status: 'beta',
        tagline: 'mTLS between every service.',
        description: 'Identity-aware service mesh with automatic mTLS, traffic policy, and retries. Workload identity is issued by IAM and rooted on-chain.',
        features: ['Automatic mTLS', 'Traffic policy & retries', 'IAM workload identity', 'On-chain trust root'],
      }),
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    tagline: 'Identity, keys, and audit for the whole cloud.',
    items: [
      { title: 'IAM', href: '/iam', icon: UserCheck },
      { title: 'Authz', href: '/authz', icon: ShieldCheck },
      { title: 'KMS', href: '/kms', icon: KeyRound },
      { title: 'HSM', href: '/hsm', icon: Lock },
      stub({
        slug: 'secrets', title: 'Secrets', icon: FileKey, status: 'ga',
        tagline: 'Store and sync secrets.',
        description: 'Versioned secret storage with KMS-backed encryption, dynamic leases, and Kubernetes sync via KMSSecret CRDs. Audited reads, scoped tokens, zero plaintext.',
        features: ['KMS-backed encryption', 'Dynamic leases & rotation', 'K8s KMSSecret sync', 'Fully audited reads'],
      }),
      stub({
        slug: 'audit', title: 'Audit', icon: FileClock, status: 'ga',
        tagline: 'A tamper-evident trail.',
        description: 'Immutable, hash-chained audit logs for every identity, key, and API action. Export to Logs, alert on policy violations, and anchor digests on-chain.',
        features: ['Hash-chained events', 'Every IAM / KMS / API action', 'Policy-violation alerts', 'On-chain anchoring'],
      }),
    ],
  },
  {
    title: 'Dev',
    icon: Terminal,
    tagline: 'Build against the cloud from anywhere.',
    items: [
      { title: 'CLI', href: '/cli', icon: Terminal },
      stub({
        slug: 'sdks', title: 'SDKs', icon: Braces, status: 'ga',
        tagline: 'Typed clients, every language.',
        description: 'Idiomatic SDKs for TypeScript, Python, Go, and Rust covering the whole cloud — models, data, compute, chain. Generated from one OpenAPI spec.',
        features: ['TypeScript, Python, Go, Rust', 'One spec, many clients', 'Auth + retries built in', 'Open source'],
      }),
      stub({
        slug: 'api', title: 'API', icon: Webhook, status: 'ga',
        tagline: 'One REST + streaming surface.',
        description: 'A single, versioned API across every Hanzo primitive. OpenAI-compatible where it counts, OIDC-secured, usage-metered, and on-chain settleable.',
        features: ['One versioned surface', 'OpenAI-compatible', 'OIDC + scoped keys', 'Metered per call'],
      }),
      { title: 'Playground', href: '/playground', icon: PlayCircle },
      { title: 'IDE', href: '/code', icon: Code2 },
      { title: 'Desktop', href: '/desktop', icon: MonitorSmartphone },
    ],
  },
  {
    title: 'Platform',
    icon: Layers,
    tagline: 'Source to production as declared state.',
    items: [
      { title: 'Projects', href: '/platform', icon: FolderGit2 },
      stub({
        slug: 'environments', title: 'Environments', icon: Layers, status: 'ga',
        tagline: 'Dev, staging, prod — isolated.',
        description: 'Promote the same build across isolated environments, each with its own secrets, domains, and scaling. Ephemeral preview environments per pull request.',
        features: ['Per-env secrets & domains', 'PR preview environments', 'Promote, don’t rebuild', 'Instant rollback'],
      }),
      stub({
        slug: 'builds', title: 'Builds', icon: Hammer, status: 'ga',
        tagline: 'Source to signed image.',
        description: 'The self-hosted arcd build farm turns a git push into a signed, multi-arch image. Reproducible, cached, and SBOM-attested — no third-party builders.',
        features: ['Push → signed image', 'Multi-arch', 'Build cache', 'SBOM + provenance'],
      }),
      { title: 'Registry', href: '/registry', icon: Package },
      stub({
        slug: 'releases', title: 'Releases', icon: Rocket, status: 'beta',
        tagline: 'Ship with confidence.',
        description: 'Progressive delivery with canary and blue-green rollouts, health gates, and one-click rollback. Every release is versioned and attested.',
        features: ['Canary + blue-green', 'Health-gated rollout', 'One-click rollback', 'Versioned + attested'],
      }),
      stub({
        slug: 'pipelines', title: 'Pipelines', icon: Workflow, status: 'beta',
        tagline: 'CI/CD as declared state.',
        description: 'Declarative pipelines wire builds, tests, and releases end to end. Semver images flow to the universe declared tag and the operator reconciles.',
        features: ['Declarative stages', 'Build → test → release', 'Semver image flow', 'GitOps reconcile'],
      }),
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
        description: 'High-throughput log aggregation with structured queries, live tail, and retention policies. Correlate logs with Traces and Metrics in one pane.',
        features: ['Structured + full-text', 'Live tail', 'Retention policies', 'Trace correlation'],
      }),
      { title: 'Metrics', href: '/metrics', icon: LineChart },
      { title: 'Traces', href: '/telemetry', icon: Activity },
      { title: 'Dashboards', href: '/dashboards', icon: LayoutDashboard },
      { title: 'Alerts', href: '/sentry', icon: Bell },
      stub({
        slug: 'cost', title: 'Cost', icon: Receipt, status: 'beta',
        tagline: 'See and settle spend.',
        description: 'Real-time cost attribution by project, model, and token. Budgets, alerts, and on-chain settlement so every unit of usage is paid for and provable.',
        features: ['Per-project / per-model', 'Budgets + alerts', 'Usage metering', 'On-chain settlement'],
      }),
    ],
  },
  {
    // Web3 is the Lux Network settlement layer. Every leaf hands off to
    // lux.cloud under the Lux brand — retargeted off the old Hanzo-hosted
    // /blockchain/* pages so the two brands stay strictly separate.
    title: 'Web3',
    icon: Landmark,
    tagline: 'The settlement layer under every resource — powered by Lux Network.',
    brand: 'lux',
    items: [
      // Settlement + Attestations keep their slug so the existing overview
      // pages resolve them via getPrimitive(); the href points at lux.cloud.
      {
        slug: 'settlement', title: 'Settlement', href: LUX, icon: Landmark, blurb: 'On-chain settlement',
        external: true, brand: 'lux', github: LUX_ORG, docs: LUX_DOCS, status: 'beta',
        tagline: 'The trust layer under the cloud.',
        description: 'On-chain settlement for every metered unit — models, GPUs, storage, API calls. Deterministic billing, programmable payouts, and provable usage, settled on Lux Network.',
        features: ['Meter → settle on-chain', 'Programmable payouts', 'Deterministic billing', 'Provable usage'],
      },
      { title: 'Chains', href: LUX_SERVICES, icon: Boxes, blurb: 'Launch L1 / L2 rollups', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Wallets', href: LUX_SERVICES, icon: Wallet, blurb: 'MPC custody & keys', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Tokens', href: LUX_SERVICES, icon: Coins, blurb: 'Tokenization & assets', external: true, brand: 'lux', github: LUX_ORG },
      { title: 'Indexer', href: LUX_SERVICES, icon: Search, blurb: 'Explorer & chain data', external: true, brand: 'lux', github: LUX_ORG },
      {
        slug: 'attestations', title: 'Attestations', href: LUX_SERVICES, icon: BadgeCheck, blurb: 'Verifiable provenance',
        external: true, brand: 'lux', github: LUX_ORG, docs: LUX_DOCS, status: 'beta',
        tagline: 'Sign what happened.',
        description: 'Cryptographic attestations for models, datasets, builds, and inference runs. Verifiable provenance anchored on Lux Network for audit and compliance.',
        features: ['Model + dataset provenance', 'Build + run attestations', 'Verifiable on-chain', 'Audit & compliance ready'],
      },
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
      { title: 'Studio', href: '/studio', icon: Clapperboard, blurb: 'Creative studio' },
      { title: 'Console', href: '/console', icon: LayoutDashboard, blurb: 'The cloud console' },
    ],
  },
]

// Verified-live docs target per primitive, keyed by marketing href. Every
// value is a 200 page on docs.hanzo.ai today — where a primitive has no
// dedicated page yet (or its page is temporarily unhealthy), it points at the
// nearest real one so a leaf is NEVER a 404. (`/docs/services` is the catalog
// fallback for anything not listed.)
const DOCS_PATH: Record<string, string> = {
  // AI
  '/models': 'services/ml', '/agents': 'services/bot', '/engine': 'services/engine',
  '/cloud/fine-tuning': 'services/ml', '/cloud/embeddings': 'services/vector', '/cloud/evals': 'services/o11y',
  // Compute
  '/cloud/gpus': 'services/engine', '/machines': 'services/paas', '/cloud/containers': 'services/functions',
  '/functions': 'services/functions', '/edge': 'services/edge', '/cloud/jobs': 'services/tasks',
  // Data
  '/vector': 'services/vector', '/sql': 'services/db', '/kv': 'services/kv',
  '/storage': 'services/s3', '/datastore': 'services/db', '/docdb': 'services/db',
  // Network
  '/gateway': 'services/gateway', '/network': 'services/ingress', '/dns': 'services/dns',
  '/cloud/cdn': 'services/edge', '/ingress': 'services/ingress', '/cloud/service-mesh': 'services/gateway',
  // Security  (iam/kms/platform service pages are origin-flaky → nearest healthy synonym)
  '/iam': 'services/identity', '/authz': 'services/zt', '/kms': 'services/sign',
  '/hsm': 'services/mpc', '/cloud/secrets': 'services/zt', '/cloud/audit': 'services/guard',
  // Dev
  '/cli': 'sdks', '/cloud/sdks': 'sdks', '/cloud/api': 'services/nexus',
  '/playground': 'services/studio', '/code': 'services/studio', '/desktop': 'sdks',
  // Deploy
  '/platform': 'services/paas', '/cloud/environments': 'services/paas', '/cloud/builds': 'services/registry',
  '/registry': 'services/registry', '/cloud/releases': 'services/operative', '/cloud/pipelines': 'services/flow',
  // Observe
  '/cloud/logs': 'services/o11y', '/metrics': 'services/insights', '/telemetry': 'services/o11y',
  '/dashboards': 'services/insights', '/sentry': 'services/guard', '/cloud/cost': 'services/pricing',
  // Web3
  '/blockchain/settlement': 'services/web3', '/blockchain/wallets': 'services/web3', '/blockchain/tokens': 'services/web3',
  '/blockchain/indexer': 'services/web3', '/blockchain/oracle': 'services/web3', '/blockchain/attestations': 'services/web3',
  // Apps
  '/chat': 'services/chat', '/bot': 'services/bot', '/search': 'services/search',
  '/crawl': 'services/search', '/studio': 'services/studio', '/console': 'services/console',
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
