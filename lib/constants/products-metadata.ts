/**
 * Single source of truth for per-product OSS metadata.
 *
 * Every product page consumes this — the OSS attribution block, the Deploy
 * CTA, and the playwright audit all reference this map. No string lives in
 * two places.
 *
 * Keys are product slugs as they appear in `app/(marketing)/<slug>/page.tsx`
 * (i.e. the routing path). Web3 slugs that live under `app/(marketing)/blockchain/`
 * use the bare slug here (e.g. `chains`); pages compose the `/blockchain/`
 * prefix themselves.
 *
 * Brand-neutral: the field names are vendor-free. The values do reference the
 * canonical Hanzo registries (ghcr.io/hanzoai, github.com/hanzoai) because
 * that's the one-and-only-one-way for this site. License strings follow SPDX.
 */

export type ProductMetadata = {
  /** Product slug — matches route under app/(marketing)/ */
  slug: string;
  /** One-line product summary used in hero tagline placeholders */
  tagline: string;
  /** SPDX license identifier (e.g. "Apache-2.0", "MIT", "BSL-1.1") */
  license: string;
  /** Canonical GitHub repo, full URL */
  github_repo: string;
  /** If this product is a fork of an upstream OSS project, the upstream name */
  upstream_fork?: string;
  /** SPDX license of the upstream project (if a fork) */
  upstream_license?: string;
  /** Optional URL to the upstream project (homepage or repo) */
  upstream_url?: string;
  /** Deploy slug for console.hanzo.ai/deploy/<slug> — defaults to slug */
  deploy_slug?: string;
  /**
   * Path under docs.hanzo.ai/docs/ — defaults to the product slug. Set it
   * whenever the docs page is not at /docs/<slug>: docs groups most pages
   * under `services/`, `skills/`, `apps/` or `projects/hanzoai/`, and only a
   * minority sit at the top level. Every value must be a real page in
   * hanzo-docs/docs `apps/docs/content/docs/` — a directory without an
   * index.mdx is a 404, not a page.
   *
   * `null` means docs publishes nothing for this product yet. Say that rather
   * than aiming at a near-miss page: `docsUrl` then returns null and the caller
   * drops the link, which beats sending a reader to the wrong product.
   */
  docs_slug?: string | null;
};

const G = 'https://github.com/hanzoai';

// Catalog. One row per product. Order is alphabetical by slug for diff sanity.
export const productsMetadata: Record<string, ProductMetadata> = {
  agents:       { slug: 'agents',     tagline: 'Multi-agent SDK + runtime + tool harness', license: 'Apache-2.0', github_repo: G },
  'ai-studio':  { slug: 'ai-studio',  tagline: 'Build AI apps visually', license: 'Apache-2.0', github_repo: G },
  analytics:    { slug: 'analytics',  tagline: 'Product analytics on your data', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Umami', upstream_license: 'MIT', upstream_url: 'https://umami.is' },
  app:          { slug: 'app',        tagline: 'Mobile + desktop client', license: 'Apache-2.0', github_repo: `${G}/app`, docs_slug: 'apps' },
  authz:        { slug: 'authz',      tagline: 'Fine-grained authorization', license: 'Apache-2.0', github_repo: `${G}/authz` },
  auto:         { slug: 'auto',       tagline: 'Workflow automations', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Activepieces', upstream_license: 'MIT', upstream_url: 'https://www.activepieces.com', docs_slug: 'services/auto' },
  base:         { slug: 'base',       tagline: 'Embedded data backend with IAM-native auth', license: 'MIT', github_repo: `${G}/base`, upstream_fork: 'PocketBase', upstream_license: 'MIT', upstream_url: 'https://pocketbase.io' },
  billing:      { slug: 'billing',    tagline: 'Metered billing engine', license: 'Apache-2.0', github_repo: G },
  bot:          { slug: 'bot',        tagline: 'Connect your AI agents to every messaging channel', license: 'MIT', github_repo: `${G}/bot`, docs_slug: 'services/bot' },
  captable:     { slug: 'captable',   tagline: 'Cap table + equity management', license: 'Apache-2.0', github_repo: `${G}/captable`, docs_slug: 'services/captable' },
  chat:         { slug: 'chat',       tagline: 'AI chat with MCP tools', license: 'Apache-2.0', github_repo: `${G}/chat`, upstream_fork: 'LibreChat', upstream_license: 'MIT', upstream_url: 'https://librechat.ai' },
  cli:          { slug: 'cli',        tagline: 'One CLI for the whole stack', license: 'Apache-2.0', github_repo: `${G}/cli` },
  cloud:        { slug: 'cloud',      tagline: 'AI cloud infrastructure', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/cloud' },
  code:         { slug: 'code',       tagline: 'Open source AI code editor', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-code' },
  commerce:     { slug: 'commerce',   tagline: 'Headless commerce + AI recommendations', license: 'Apache-2.0', github_repo: G },
  computer:     { slug: 'computer',   tagline: 'Computer-use for AI', license: 'Apache-2.0', github_repo: `${G}/computer`, docs_slug: 'skills/hanzo-computer' },
  console:      { slug: 'console',    tagline: 'Operator console for the cloud', license: 'Apache-2.0', github_repo: G },
  crawl:        { slug: 'crawl',      tagline: 'Crawl, scrape, and embed', license: 'Apache-2.0', github_repo: G },
  dashboards:   { slug: 'dashboards', tagline: 'Composable dashboards', license: 'Apache-2.0', github_repo: `${G}/dashboards` },
  database:     { slug: 'database',   tagline: 'Unified database', license: 'Apache-2.0', github_repo: G, docs_slug: 'sql' },
  dataroom:     { slug: 'dataroom',   tagline: 'Secure data room', license: 'AGPL-3.0', github_repo: `${G}/dataroom`, upstream_fork: 'Papermark', upstream_license: 'AGPL-3.0', upstream_url: 'https://www.papermark.com', docs_slug: 'services/dataroom' },
  datastore:    { slug: 'datastore',  tagline: 'Document datastore', license: 'Apache-2.0', github_repo: `${G}/datastore` },
  desktop:      { slug: 'desktop',    tagline: 'Desktop client', license: 'Apache-2.0', github_repo: G, docs_slug: 'apps/desktop' },
  dev:          { slug: 'dev',        tagline: 'AI engineer that ships PRs from a sentence', license: 'Apache-2.0', github_repo: `${G}/dev` },
  dns:          { slug: 'dns',        tagline: 'DNS as code', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/dns' },
  docdb:        { slug: 'docdb',      tagline: 'Document DB over Hanzo SQL', license: 'Apache-2.0', github_repo: G, upstream_fork: 'FerretDB', upstream_license: 'Apache-2.0', upstream_url: 'https://www.ferretdb.com' },
  edge:         { slug: 'edge',       tagline: 'Edge compute', license: 'Apache-2.0', github_repo: G },
  engine:       { slug: 'engine',     tagline: 'AI inference engine', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/engine' },
  enso:         { slug: 'enso',       tagline: 'Flagship model orchestration — Flash, Pro, Ultra', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/models' },
  extension:    { slug: 'extension',  tagline: 'Browser extension + MCP bridge', license: 'Apache-2.0', github_repo: `${G}/extension`, docs_slug: 'projects/hanzoai/extension' },
  flow:         { slug: 'flow',       tagline: 'Visual workflow builder', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Langflow', upstream_license: 'MIT', upstream_url: 'https://langflow.org', docs_slug: 'services/flow' },
  functions:    { slug: 'functions',  tagline: 'Serverless functions', license: 'Apache-2.0', github_repo: G },
  gallery:      { slug: 'gallery',    tagline: 'Image + video gallery', license: 'Apache-2.0', github_repo: `${G}/gallery`, docs_slug: 'ai-studio' },
  gateway:      { slug: 'gateway',    tagline: 'API gateway', license: 'Apache-2.0', github_repo: G, upstream_fork: 'KrakenD', upstream_license: 'Apache-2.0', upstream_url: 'https://www.krakend.io' },
  guard:        { slug: 'guard',      tagline: 'AI guardrails', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/guard' },
  gui:          { slug: 'gui',        tagline: 'React UI library', license: 'Apache-2.0', github_repo: `${G}/gui`, docs_slug: null },
  hsm:          { slug: 'hsm',        tagline: 'Hardware security module', license: 'Apache-2.0', github_repo: G, docs_slug: 'mpc' },
  iam:          { slug: 'iam',        tagline: 'Identity + access (hanzo.id)', license: 'Apache-2.0', github_repo: `${G}/iam` },
  idv:          { slug: 'idv',        tagline: 'Identity verification', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/iam/provider/idv/overview' },
  ingress:      { slug: 'ingress',    tagline: 'K8s ingress + static plugin', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/ingress' },
  insights:     { slug: 'insights',   tagline: 'Product insights + experiments', license: 'MIT', github_repo: `${G}/insights`, upstream_fork: 'PostHog', upstream_license: 'MIT', upstream_url: 'https://posthog.com' },
  jin:          { slug: 'jin',        tagline: 'Multimodal foundation model', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-jin' },
  kms:          { slug: 'kms',        tagline: 'Secrets + key management', license: 'Apache-2.0', github_repo: `${G}/kms` },
  kv:           { slug: 'kv',         tagline: 'Distributed key-value store', license: 'BSD-3-Clause', github_repo: `${G}/kv`, upstream_fork: 'Valkey', upstream_license: 'BSD-3-Clause', upstream_url: 'https://valkey.io' },
  ledger:       { slug: 'ledger',     tagline: 'Double-entry accounting ledger', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-ledger' },
  llm:          { slug: 'llm',        tagline: 'One API for every model', license: 'Apache-2.0', github_repo: G },
  machines:     { slug: 'machines',   tagline: 'Long-running compute machines', license: 'Apache-2.0', github_repo: G },
  mcp:          { slug: 'mcp',        tagline: 'Model Context Protocol — 260+ tools', license: 'Apache-2.0', github_repo: `${G}/mcp` },
  metrics:      { slug: 'metrics',    tagline: 'Time-series metrics', license: 'Apache-2.0', github_repo: `${G}/metrics` },
  mq:           { slug: 'mq',         tagline: 'Message queue', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/mq' },
  network:      { slug: 'network',    tagline: 'Decentralized compute network', license: 'Apache-2.0', github_repo: G },
  node:         { slug: 'node',       tagline: 'Standalone Hanzo node', license: 'Apache-2.0', github_repo: G, docs_slug: 'proof-of-ai/node-operator' },
  o11y:         { slug: 'o11y',       tagline: 'Observability suite', license: 'Apache-2.0', github_repo: `${G}/o11y` },
  operative:    { slug: 'operative',  tagline: 'Computer-use harness', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Anthropic Computer Use', upstream_license: 'MIT', upstream_url: 'https://github.com/anthropics/anthropic-quickstarts', docs_slug: 'services/operative' },
  operator:     { slug: 'operator',   tagline: 'K8s operator', license: 'Apache-2.0', github_repo: G, docs_slug: 'projects/hanzoai/operator' },
  payments:     { slug: 'payments',   tagline: 'Payments processor', license: 'Apache-2.0', github_repo: `${G}/payments`, docs_slug: 'services/commerce' },
  platform:     { slug: 'platform',   tagline: 'PaaS — deploy from git', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Dokploy', upstream_license: 'Apache-2.0', upstream_url: 'https://dokploy.com', docs_slug: 'services/platform' },
  playground:   { slug: 'playground', tagline: 'Hands-on sandbox for every product', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-playground' },
  pubsub:       { slug: 'pubsub',     tagline: 'Pub/sub messaging', license: 'Apache-2.0', github_repo: `${G}/pubsub` },
  realtime:     { slug: 'realtime',   tagline: 'Realtime channels + presence', license: 'Apache-2.0', github_repo: G, docs_slug: 'pubsub' },
  registry:     { slug: 'registry',   tagline: 'OCI image registry', license: 'Apache-2.0', github_repo: G },
  search:       { slug: 'search',     tagline: 'AI-powered search', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Meilisearch', upstream_license: 'MIT', upstream_url: 'https://www.meilisearch.com' },
  sentinel:     { slug: 'sentinel',   tagline: 'Error tracking', license: 'BSL-1.1', github_repo: G, upstream_fork: 'Sentry', upstream_license: 'BSL-1.1', upstream_url: 'https://sentry.io', docs_slug: 'skills/hanzo-sentry' },
  sign:         { slug: 'sign',       tagline: 'E-signature', license: 'AGPL-3.0', github_repo: `${G}/sign`, upstream_fork: 'Documenso', upstream_license: 'AGPL-3.0', upstream_url: 'https://documenso.com', docs_slug: 'services/sign' },
  skills:       { slug: 'skills',     tagline: 'Reusable agent skills', license: 'Apache-2.0', github_repo: G },
  sql:          { slug: 'sql',        tagline: 'Managed relational database', license: 'PostgreSQL', github_repo: `${G}/sql` },
  status:       { slug: 'status',     tagline: 'Status pages', license: 'Apache-2.0', github_repo: `${G}/status`, docs_slug: null },
  storage:      { slug: 'storage',    tagline: 'Distributed object storage', license: 'Apache-2.0', github_repo: `${G}/s3`, upstream_fork: 'SeaweedFS', upstream_license: 'Apache-2.0', upstream_url: 'https://github.com/seaweedfs/seaweedfs' },
  stream:       { slug: 'stream',     tagline: 'Event stream', license: 'Apache-2.0', github_repo: `${G}/stream`, docs_slug: 'services/stream' },
  studio:       { slug: 'studio',     tagline: 'Visual builder studio', license: 'GPL-3.0', github_repo: `${G}/studio`, upstream_fork: 'ComfyUI', upstream_license: 'GPL-3.0', upstream_url: 'https://www.comfy.org', docs_slug: 'services/studio' },
  tasks:        { slug: 'tasks',      tagline: 'Durable workflows + scheduling', license: 'MIT', github_repo: `${G}/tasks` },
  team:         { slug: 'team',       tagline: 'Team workspace — channels, projects, tasks, docs, HR', license: 'EPL-2.0', github_repo: G, upstream_fork: 'Huly', upstream_license: 'EPL-2.0', upstream_url: 'https://huly.io', docs_slug: null },
  telemetry:    { slug: 'telemetry',  tagline: 'OpenTelemetry ingest', license: 'Apache-2.0', github_repo: G, docs_slug: 'projects/hanzoai/telemetry' },
  treasury:     { slug: 'treasury',   tagline: 'Treasury management', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-treasury' },
  tunnel:       { slug: 'tunnel',     tagline: 'Secure tunnels', license: 'Apache-2.0', github_repo: G, docs_slug: 'skills/hanzo-tunnel' },
  ui:           { slug: 'ui',         tagline: 'Headless UI primitives', license: 'MIT', github_repo: `${G}/ui`, docs_slug: 'projects/hanzoai/ui' },
  vector:       { slug: 'vector',     tagline: 'Vector database', license: 'Apache-2.0', github_repo: G, upstream_fork: 'Qdrant', upstream_license: 'Apache-2.0', upstream_url: 'https://qdrant.tech' },
  visor:        { slug: 'visor',      tagline: 'Machines, volumes, and clusters', license: 'Apache-2.0', github_repo: G, docs_slug: 'services/visor' },
  world:        { slug: 'world',      tagline: '3D world building', license: 'Apache-2.0', github_repo: `${G}/world`, docs_slug: 'projects/hanzoai/world' },
  zap:          { slug: 'zap',        tagline: 'Zero-copy application protocol', license: 'Apache-2.0', github_repo: G },
  zen:          { slug: 'zen',        tagline: 'Open-weight frontier models', license: 'Apache-2.0', github_repo: 'https://github.com/zenlm/zen', docs_slug: 'services/models' },

  // Web3 — these live under /blockchain/<slug>
  bridge:       { slug: 'bridge',     tagline: 'Cross-chain bridge', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/bridge', deploy_slug: 'bridge', docs_slug: 'blockchain' },
  chains:       { slug: 'chains',     tagline: 'Multi-chain platform', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/node', deploy_slug: 'chains', docs_slug: 'blockchain' },
  exchange:     { slug: 'exchange',   tagline: 'DEX exchange surface', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/exchange', deploy_slug: 'exchange', docs_slug: 'blockchain' },
  indexer:      { slug: 'indexer',    tagline: 'Blockchain indexer', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/indexer', deploy_slug: 'indexer', docs_slug: 'blockchain' },
  nft:          { slug: 'nft',        tagline: 'NFT marketplace', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/nft', deploy_slug: 'nft', docs_slug: 'blockchain' },
  pay:          { slug: 'pay',        tagline: 'Crypto payments', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/pay', deploy_slug: 'pay', docs_slug: 'blockchain' },
  tokens:       { slug: 'tokens',     tagline: 'Token launchpad', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/tokens', deploy_slug: 'tokens', docs_slug: 'blockchain' },
  wallets:      { slug: 'wallets',    tagline: 'Multi-chain wallets', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/wallet', deploy_slug: 'wallets', docs_slug: 'services/web3' },

  // identity is an alias for IAM under /identity (legacy slug)
  identity:     { slug: 'identity',   tagline: 'Identity surface', license: 'Apache-2.0', github_repo: `${G}/iam`, docs_slug: 'services/identity' },
  // S3-compatible storage is an alias under /s3
  s3:           { slug: 's3',         tagline: 'Distributed object storage', license: 'Apache-2.0', github_repo: `${G}/s3`, upstream_fork: 'SeaweedFS', upstream_license: 'Apache-2.0', upstream_url: 'https://github.com/seaweedfs/seaweedfs', docs_slug: 'services/s3' },
};

export function getProductMetadata(slug: string): ProductMetadata | undefined {
  return productsMetadata[slug];
}

/**
 * The console's App Platform, which is where a deploy actually starts.
 *
 * This used to return `/deploy/<product>`, and every one of those 158 links
 * resolved to the console's 404 view. Nothing could see it: console.hanzo.ai is
 * a client-rendered SPA that answers 200 with byte-identical HTML for any path,
 * so status-code and body checks are both blind. It is only visible by reading
 * the console's own resolver:
 *
 *   `deploy` is an ALIAS for the `app-platform` module (its own test asserts
 *   canonicalSlug(['deploy']) === ['app-platform']), so `/deploy/vector`
 *   canonicalizes to ['app-platform','vector']. `app-platform` declares only
 *   `path: ''` routes and no subpages, and `vector` is not one of the shared
 *   base sub-pages (settings/status/logs/metrics) — so resolveProductView falls
 *   through every branch to { kind: 'notfound' }.
 *
 * Bare `/deploy` resolves, so that is where these point until the console grows
 * a per-product deploy route. `deploy_slug` stays in the type: it is still the
 * right shape for that link, and it costs nothing to keep the curated values.
 */
export function deployUrl(_slug: string): string {
  return 'https://console.hanzo.ai/deploy';
}

export function docsUrl(slug: string): string | null {
  const meta = productsMetadata[slug];
  // An UNDECLARED product gets no link, rather than a guess. `?? slug` used to
  // apply here too, which meant a product this map had never heard of still
  // asserted that /docs/<its own slug> existed — and for eleven web3 pages it
  // did not, so the "Self-host" button 404ed. The fallback below is still right
  // for the 80 DECLARED products that genuinely sit at /docs/<slug>; the
  // difference is that being in this map is a claim someone made, and not being
  // in it is not a claim at all.
  //
  // Nothing is lost by staying silent: the button says "Self-host", and a
  // product with no entry here has no repo to self-host from.
  if (!meta) return null;
  if (meta.docs_slug === null) return null;
  const target = meta.docs_slug ?? slug;
  // docs.hanzo.ai serves its content tree under /docs. The bare form
  // (docs.hanzo.ai/<slug>) 404s: the vanity aliases that once covered it live
  // in the docs repo's public/_redirects, a Cloudflare Pages file, and the site
  // is served by hanzoai/static now — which does not read it.
  return `https://docs.hanzo.ai/docs/${target}`;
}
