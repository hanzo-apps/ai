/**
 * Hanzo Cloud — primitive taxonomy (single source of truth).
 *
 * The cloud is organized like a console, not a product list: ten categories of
 * cloud primitives, each mapped to its Google Cloud equivalent. Every primitive
 * has an open-source runtime, a cryptographic identity, usage metering, and
 * on-chain settlement underneath.
 *
 *   Positioning: Open AI Cloud — GCP-compatible. Open source. On-chain.
 *
 * Mega-menu layout (two rows of five):
 *
 *   AI        Compute     Data        Network     Security
 *   Dev       Deploy      Observe     Chain       Apps
 *
 * This file is the ONLY place the taxonomy lives. `lib/constants/navigation-data.ts`
 * derives `productsNav` from it, and `app/(marketing)/cloud/[slug]` + the two
 * `/blockchain` overview pages render generated pages from the same entries —
 * so a leaf can never become a dead link.
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
  /** Google Cloud equivalent (sells the GCP-compatible story). */
  gcp?: string
  /**
   * Present only for primitives without a bespoke page. These render a real,
   * unique overview page (hero, GCP-equivalent, positioning, features) so the
   * leaf is never a 404 and never an empty stub.
   */
  slug?: string
  tagline?: string
  description?: string
  features?: string[]
  status?: PrimitiveStatus
  github?: string
  docs?: string
}

export interface CloudCategory {
  /** Category label — one of the ten cloud primitives. */
  title: string
  /** GCP-equivalent product(s) — shown as the menu column subtitle. */
  gcp: string
  /** One-line category positioning. */
  tagline: string
  /** Exactly six primary primitives. */
  items: Primitive[]
}

export const POSITIONING = 'Open AI Cloud — GCP-compatible. Open source. On-chain.'

const ORG = 'https://github.com/hanzoai'
const DOCS = 'https://docs.hanzo.ai'

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

export const cloudCategories: CloudCategory[] = [
  {
    title: 'AI',
    gcp: 'Vertex AI · Gemini · Agent Builder',
    tagline: 'Models, agents, and inference — open weights, one API.',
    items: [
      { title: 'Models', href: '/models', icon: Brain, gcp: 'Model Garden' },
      { title: 'Agents', href: '/agents', icon: Bot, gcp: 'Agent Builder' },
      { title: 'Inference', href: '/engine', icon: Cpu, gcp: 'Vertex AI Prediction' },
      stub({
        slug: 'fine-tuning', title: 'Fine-tuning', icon: SlidersHorizontal, gcp: 'Vertex AI Training', status: 'beta',
        tagline: 'Adapt open models to your domain.',
        description: 'LoRA and full fine-tuning for Zen and open-weight models with managed datasets, checkpoints, and one-click promotion to Inference. Every run is metered and attestable on-chain.',
        features: ['LoRA + full fine-tuning', 'Managed datasets & checkpoints', 'Promote straight to Inference', 'On-chain run attestations'],
      }),
      stub({
        slug: 'embeddings', title: 'Embeddings', icon: Sparkles, gcp: 'Vertex AI Embeddings', status: 'ga',
        tagline: 'Turn anything into vectors.',
        description: 'Open embedding models for text, code, and images behind one API, wired straight into Vector for retrieval. Batch or realtime, metered per token.',
        features: ['Text, code & image models', 'One API, many models', 'Pairs with Vector search', 'Token-metered billing'],
      }),
      stub({
        slug: 'evals', title: 'Evals', icon: BadgeCheck, gcp: 'Vertex AI Eval', status: 'beta',
        tagline: 'Measure model and agent quality.',
        description: 'Benchmark, grade, and regression-test models and agents. LLM-as-judge, golden sets, and drift detection with reproducible scorecards anchored on-chain.',
        features: ['LLM-as-judge & golden sets', 'Regression gates in CI', 'Drift detection', 'Anchored scorecards'],
      }),
    ],
  },
  {
    title: 'Compute',
    gcp: 'Compute Engine · Cloud Run · GKE · Functions',
    tagline: 'GPUs, containers, and functions that scale to zero.',
    items: [
      stub({
        slug: 'gpus', title: 'GPUs', icon: Cpu, gcp: 'Compute Engine GPUs', status: 'ga',
        tagline: 'On-demand accelerators by the second.',
        description: 'Rent A10G to H100 GPUs by the second with spot pricing, fast checkpointing, and SSH. Schedule single cards or multi-node clusters for training and inference.',
        features: ['A10G → H100', 'Per-second + spot pricing', 'Multi-node clusters', 'Metered + on-chain settled'],
      }),
      { title: 'Machines', href: '/machines', icon: Server, gcp: 'Compute Engine' },
      stub({
        slug: 'containers', title: 'Containers', icon: Container, gcp: 'Cloud Run', status: 'ga',
        tagline: 'Run any image, scale to zero.',
        description: 'Deploy OCI containers with autoscaling, scale-to-zero, and zero-config TLS. GitOps from a push, multi-tenant namespaces, and KMS-mounted secrets.',
        features: ['Any OCI image', 'Scale to zero', 'GitOps deploy', 'KMS secret mounts'],
      }),
      { title: 'Functions', href: '/functions', icon: Zap, gcp: 'Cloud Functions' },
      { title: 'Edge', href: '/edge', icon: Globe, gcp: 'Cloud Run (edge)' },
      stub({
        slug: 'jobs', title: 'Jobs', icon: ListTodo, gcp: 'Cloud Run Jobs / Batch', status: 'ga',
        tagline: 'Batch and scheduled compute.',
        description: 'Run one-shot, parallel, and cron-scheduled jobs with retries, timeouts, and exactly-once semantics. Backed by Tasks for durable execution.',
        features: ['Batch & parallel', 'Cron scheduling', 'Retries + timeouts', 'Durable, exactly-once'],
      }),
    ],
  },
  {
    title: 'Data',
    gcp: 'Cloud SQL · Bigtable · Firestore · GCS',
    tagline: 'Every persistence primitive, from vectors to objects.',
    items: [
      { title: 'Vector', href: '/vector', icon: Sparkles, gcp: 'Vertex Vector Search' },
      { title: 'SQL', href: '/sql', icon: Database, gcp: 'Cloud SQL / AlloyDB' },
      { title: 'KV', href: '/kv', icon: Key, gcp: 'Memorystore' },
      { title: 'Object Storage', href: '/storage', icon: HardDrive, gcp: 'Cloud Storage' },
      { title: 'Datastore', href: '/datastore', icon: Boxes, gcp: 'Bigtable' },
      { title: 'DocDB', href: '/docdb', icon: FileText, gcp: 'Firestore' },
    ],
  },
  {
    title: 'Network',
    gcp: 'VPC · Cloud Load Balancing · CDN · Cloud DNS',
    tagline: 'Connect, route, and protect every service.',
    items: [
      { title: 'Gateway', href: '/gateway', icon: Network, gcp: 'API Gateway' },
      { title: 'VPC', href: '/network', icon: Workflow, gcp: 'VPC' },
      { title: 'DNS', href: '/dns', icon: Globe, gcp: 'Cloud DNS' },
      stub({
        slug: 'cdn', title: 'CDN', icon: Radio, gcp: 'Cloud CDN', status: 'beta',
        tagline: 'Cache at the edge.',
        description: 'Pull-through content delivery in front of Object Storage and Gateway. Global points of presence, instant purge, signed URLs, and per-request metering.',
        features: ['Global edge PoPs', 'Instant purge', 'Signed URLs', 'Origin: Storage + Gateway'],
      }),
      { title: 'Load Balancer', href: '/ingress', icon: Scale, gcp: 'Cloud Load Balancing' },
      stub({
        slug: 'service-mesh', title: 'Service Mesh', icon: Route, gcp: 'Anthos Service Mesh', status: 'beta',
        tagline: 'mTLS between every service.',
        description: 'Identity-aware service mesh with automatic mTLS, traffic policy, and retries. Workload identity is issued by IAM and rooted on-chain.',
        features: ['Automatic mTLS', 'Traffic policy & retries', 'IAM workload identity', 'On-chain trust root'],
      }),
    ],
  },
  {
    title: 'Security',
    gcp: 'IAM · Cloud KMS · Secret Manager · Cloud Armor',
    tagline: 'Identity, keys, and audit for the whole cloud.',
    items: [
      { title: 'IAM', href: '/iam', icon: UserCheck, gcp: 'Cloud IAM' },
      { title: 'Authz', href: '/authz', icon: ShieldCheck, gcp: 'IAM Conditions' },
      { title: 'KMS', href: '/kms', icon: KeyRound, gcp: 'Cloud KMS' },
      { title: 'HSM', href: '/hsm', icon: Lock, gcp: 'Cloud HSM' },
      stub({
        slug: 'secrets', title: 'Secrets', icon: FileKey, gcp: 'Secret Manager', status: 'ga',
        tagline: 'Store and sync secrets.',
        description: 'Versioned secret storage with KMS-backed encryption, dynamic leases, and Kubernetes sync via KMSSecret CRDs. Audited reads, scoped tokens, zero plaintext.',
        features: ['KMS-backed encryption', 'Dynamic leases & rotation', 'K8s KMSSecret sync', 'Fully audited reads'],
      }),
      stub({
        slug: 'audit', title: 'Audit', icon: FileClock, gcp: 'Cloud Audit Logs', status: 'ga',
        tagline: 'A tamper-evident trail.',
        description: 'Immutable, hash-chained audit logs for every identity, key, and API action. Export to Logs, alert on policy violations, and anchor digests on-chain.',
        features: ['Hash-chained events', 'Every IAM / KMS / API action', 'Policy-violation alerts', 'On-chain anchoring'],
      }),
    ],
  },
  {
    title: 'Dev',
    gcp: 'Cloud SDK · APIs · Cloud Code · Console',
    tagline: 'Build against the cloud from anywhere.',
    items: [
      { title: 'CLI', href: '/cli', icon: Terminal, gcp: 'gcloud CLI' },
      stub({
        slug: 'sdks', title: 'SDKs', icon: Braces, gcp: 'Cloud Client Libraries', status: 'ga',
        tagline: 'Typed clients, every language.',
        description: 'Idiomatic SDKs for TypeScript, Python, Go, and Rust covering the whole cloud — models, data, compute, chain. Generated from one OpenAPI spec.',
        features: ['TypeScript, Python, Go, Rust', 'One spec, many clients', 'Auth + retries built in', 'Open source'],
      }),
      stub({
        slug: 'api', title: 'API', icon: Webhook, gcp: 'Google Cloud APIs', status: 'ga',
        tagline: 'One REST + streaming surface.',
        description: 'A single, versioned API across every Hanzo primitive. OpenAI-compatible where it counts, OIDC-secured, usage-metered, and on-chain settleable.',
        features: ['One versioned surface', 'OpenAI-compatible', 'OIDC + scoped keys', 'Metered per call'],
      }),
      { title: 'Playground', href: '/playground', icon: PlayCircle, gcp: 'Vertex AI Studio' },
      { title: 'IDE', href: '/code', icon: Code2, gcp: 'Cloud Code' },
      { title: 'Desktop', href: '/desktop', icon: MonitorSmartphone, gcp: 'Cloud Workstations' },
    ],
  },
  {
    title: 'Deploy',
    gcp: 'Cloud Build · Artifact Registry · Cloud Deploy',
    tagline: 'Source to production as declared state.',
    items: [
      { title: 'Projects', href: '/platform', icon: FolderGit2, gcp: 'Resource Manager' },
      stub({
        slug: 'environments', title: 'Environments', icon: Layers, gcp: 'Deploy targets', status: 'ga',
        tagline: 'Dev, staging, prod — isolated.',
        description: 'Promote the same build across isolated environments, each with its own secrets, domains, and scaling. Ephemeral preview environments per pull request.',
        features: ['Per-env secrets & domains', 'PR preview environments', 'Promote, don’t rebuild', 'Instant rollback'],
      }),
      stub({
        slug: 'builds', title: 'Builds', icon: Hammer, gcp: 'Cloud Build', status: 'ga',
        tagline: 'Source to signed image.',
        description: 'The self-hosted arcd build farm turns a git push into a signed, multi-arch image. Reproducible, cached, and SBOM-attested — no third-party builders.',
        features: ['Push → signed image', 'Multi-arch', 'Build cache', 'SBOM + provenance'],
      }),
      { title: 'Registry', href: '/registry', icon: Package, gcp: 'Artifact Registry' },
      stub({
        slug: 'releases', title: 'Releases', icon: Rocket, gcp: 'Cloud Deploy', status: 'beta',
        tagline: 'Ship with confidence.',
        description: 'Progressive delivery with canary and blue-green rollouts, health gates, and one-click rollback. Every release is versioned and attested.',
        features: ['Canary + blue-green', 'Health-gated rollout', 'One-click rollback', 'Versioned + attested'],
      }),
      stub({
        slug: 'pipelines', title: 'Pipelines', icon: Workflow, gcp: 'Cloud Build / Deploy', status: 'beta',
        tagline: 'CI/CD as declared state.',
        description: 'Declarative pipelines wire builds, tests, and releases end to end. Semver images flow to the universe declared tag and the operator reconciles.',
        features: ['Declarative stages', 'Build → test → release', 'Semver image flow', 'GitOps reconcile'],
      }),
    ],
  },
  {
    title: 'Observe',
    gcp: 'Cloud Logging · Monitoring · Trace · Billing',
    tagline: 'Logs, metrics, traces, and cost in one pane.',
    items: [
      stub({
        slug: 'logs', title: 'Logs', icon: ScrollText, gcp: 'Cloud Logging', status: 'ga',
        tagline: 'Search every line.',
        description: 'High-throughput log aggregation with structured queries, live tail, and retention policies. Correlate logs with Traces and Metrics in one pane.',
        features: ['Structured + full-text', 'Live tail', 'Retention policies', 'Trace correlation'],
      }),
      { title: 'Metrics', href: '/metrics', icon: LineChart, gcp: 'Cloud Monitoring' },
      { title: 'Traces', href: '/telemetry', icon: Activity, gcp: 'Cloud Trace' },
      { title: 'Dashboards', href: '/dashboards', icon: LayoutDashboard, gcp: 'Monitoring Dashboards' },
      { title: 'Alerts', href: '/sentry', icon: Bell, gcp: 'Cloud Alerting' },
      stub({
        slug: 'cost', title: 'Cost', icon: Receipt, gcp: 'Cloud Billing', status: 'beta',
        tagline: 'See and settle spend.',
        description: 'Real-time cost attribution by project, model, and token. Budgets, alerts, and on-chain settlement so every unit of usage is paid for and provable.',
        features: ['Per-project / per-model', 'Budgets + alerts', 'Usage metering', 'On-chain settlement'],
      }),
    ],
  },
  {
    title: 'Chain',
    gcp: 'On-chain settlement & trust layer',
    tagline: 'The settlement layer under every resource.',
    items: [
      stub({
        slug: 'settlement', base: '/blockchain', title: 'Settlement', icon: Landmark, gcp: 'No GCP equivalent', status: 'beta',
        tagline: 'The trust layer under the cloud.',
        description: 'On-chain settlement for every metered unit — models, GPUs, storage, API calls. Deterministic billing, programmable payouts, and provable usage.',
        features: ['Meter → settle on-chain', 'Programmable payouts', 'Deterministic billing', 'Provable usage'],
      }),
      { title: 'Wallets', href: '/blockchain/wallets', icon: Wallet },
      { title: 'Tokens', href: '/blockchain/tokens', icon: Coins },
      { title: 'Indexer', href: '/blockchain/indexer', icon: Search },
      { title: 'Oracles', href: '/blockchain/oracle', icon: Radio },
      stub({
        slug: 'attestations', base: '/blockchain', title: 'Attestations', icon: BadgeCheck, gcp: 'No GCP equivalent', status: 'beta',
        tagline: 'Sign what happened.',
        description: 'Cryptographic attestations for models, datasets, builds, and inference runs. Verifiable provenance anchored on-chain for audit and compliance.',
        features: ['Model + dataset provenance', 'Build + run attestations', 'Verifiable on-chain', 'Audit & compliance ready'],
      }),
    ],
  },
  {
    title: 'Apps',
    gcp: 'Ready-to-use apps on the cloud',
    tagline: 'Production apps built on the primitives.',
    items: [
      { title: 'Chat', href: '/chat', icon: MessageSquare, gcp: 'Vertex AI Search & Conversation' },
      { title: 'Bot', href: '/bot', icon: Bot },
      { title: 'Search', href: '/search', icon: Search, gcp: 'Vertex AI Search' },
      { title: 'Crawl', href: '/crawl', icon: Globe },
      { title: 'Studio', href: '/studio', icon: Clapperboard },
      { title: 'Console', href: '/console', icon: LayoutDashboard, gcp: 'Cloud Console' },
    ],
  },
]

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

/** Category a primitive belongs to (for the overview breadcrumb / GCP context). */
export function getPrimitiveCategory(slug: string): CloudCategory | undefined {
  return cloudCategories.find((c) => c.items.some((i) => i.slug === slug))
}
