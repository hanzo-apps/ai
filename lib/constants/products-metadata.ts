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
  /** Optional override for docs.hanzo.ai/<slug> */
  docs_slug?: string;
};

const G = 'https://github.com/hanzoai';

// Catalog. One row per product. Order is alphabetical by slug for diff sanity.
export const productsMetadata: Record<string, ProductMetadata> = {
  agents:       { slug: 'agents',     tagline: 'Multi-agent SDK + runtime + tool harness', license: 'Apache-2.0', github_repo: `${G}/agent` },
  'ai-studio':  { slug: 'ai-studio',  tagline: 'Build AI apps visually', license: 'Apache-2.0', github_repo: G },
  analytics:    { slug: 'analytics',  tagline: 'Product analytics on your data', license: 'Apache-2.0', github_repo: `${G}/analytics`, upstream_fork: 'Umami', upstream_license: 'MIT', upstream_url: 'https://umami.is' },
  app:          { slug: 'app',        tagline: 'Mobile + desktop client', license: 'Apache-2.0', github_repo: `${G}/app` },
  authz:        { slug: 'authz',      tagline: 'Fine-grained authorization', license: 'Apache-2.0', github_repo: `${G}/authz` },
  auto:         { slug: 'auto',       tagline: 'Workflow automations', license: 'Apache-2.0', github_repo: `${G}/auto`, upstream_fork: 'Activepieces', upstream_license: 'MIT', upstream_url: 'https://www.activepieces.com' },
  base:         { slug: 'base',       tagline: 'Embedded data backend with IAM-native auth', license: 'MIT', github_repo: `${G}/base`, upstream_fork: 'PocketBase', upstream_license: 'MIT', upstream_url: 'https://pocketbase.io' },
  billing:      { slug: 'billing',    tagline: 'Metered billing engine', license: 'Apache-2.0', github_repo: `${G}/billing` },
  bot:          { slug: 'bot',        tagline: 'Multi-agent simulation framework', license: 'Apache-2.0', github_repo: `${G}/bot` },
  captable:     { slug: 'captable',   tagline: 'Cap table + equity management', license: 'Apache-2.0', github_repo: `${G}/captable` },
  chat:         { slug: 'chat',       tagline: 'AI chat with MCP tools', license: 'Apache-2.0', github_repo: `${G}/chat`, upstream_fork: 'LibreChat', upstream_license: 'MIT', upstream_url: 'https://librechat.ai' },
  cli:          { slug: 'cli',        tagline: 'One CLI for the whole stack', license: 'Apache-2.0', github_repo: `${G}/cli` },
  cloud:        { slug: 'cloud',      tagline: 'AI cloud infrastructure', license: 'Apache-2.0', github_repo: `${G}/cloud` },
  code:         { slug: 'code',       tagline: 'Open source AI code editor', license: 'Apache-2.0', github_repo: `${G}/code` },
  commerce:     { slug: 'commerce',   tagline: 'Headless commerce + AI recommendations', license: 'Apache-2.0', github_repo: `${G}/commerce` },
  computer:     { slug: 'computer',   tagline: 'Computer-use for AI', license: 'Apache-2.0', github_repo: `${G}/computer` },
  console:      { slug: 'console',    tagline: 'Operator console for the cloud', license: 'Apache-2.0', github_repo: `${G}/console` },
  crawl:        { slug: 'crawl',      tagline: 'Crawl, scrape, and embed', license: 'Apache-2.0', github_repo: G },
  dashboards:   { slug: 'dashboards', tagline: 'Composable dashboards', license: 'Apache-2.0', github_repo: `${G}/dashboards` },
  database:     { slug: 'database',   tagline: 'Unified database', license: 'Apache-2.0', github_repo: `${G}/database` },
  dataroom:     { slug: 'dataroom',   tagline: 'Secure data room', license: 'AGPL-3.0', github_repo: `${G}/dataroom`, upstream_fork: 'Papermark', upstream_license: 'AGPL-3.0', upstream_url: 'https://www.papermark.com' },
  datastore:    { slug: 'datastore',  tagline: 'Document datastore', license: 'Apache-2.0', github_repo: `${G}/datastore` },
  desktop:      { slug: 'desktop',    tagline: 'Desktop client', license: 'Apache-2.0', github_repo: `${G}/desktop` },
  dev:          { slug: 'dev',        tagline: 'AI engineer that ships PRs from a sentence', license: 'Apache-2.0', github_repo: `${G}/dev` },
  dns:          { slug: 'dns',        tagline: 'DNS as code', license: 'Apache-2.0', github_repo: `${G}/dns` },
  docdb:        { slug: 'docdb',      tagline: 'Document DB over PostgreSQL', license: 'Apache-2.0', github_repo: `${G}/docdb`, upstream_fork: 'FerretDB', upstream_license: 'Apache-2.0', upstream_url: 'https://www.ferretdb.com' },
  edge:         { slug: 'edge',       tagline: 'Edge compute', license: 'Apache-2.0', github_repo: `${G}/edge` },
  engine:       { slug: 'engine',     tagline: 'AI inference engine', license: 'Apache-2.0', github_repo: `${G}/engine` },
  enso:         { slug: 'enso',       tagline: 'Composable infinite canvas', license: 'Apache-2.0', github_repo: `${G}/enso` },
  extension:    { slug: 'extension',  tagline: 'Browser extension + MCP bridge', license: 'Apache-2.0', github_repo: `${G}/extension` },
  flow:         { slug: 'flow',       tagline: 'Visual workflow builder', license: 'Apache-2.0', github_repo: `${G}/flow`, upstream_fork: 'Langflow', upstream_license: 'MIT', upstream_url: 'https://langflow.org' },
  functions:    { slug: 'functions',  tagline: 'Serverless functions', license: 'Apache-2.0', github_repo: `${G}/functions` },
  gallery:      { slug: 'gallery',    tagline: 'Image + video gallery', license: 'Apache-2.0', github_repo: `${G}/gallery` },
  gateway:      { slug: 'gateway',    tagline: 'API gateway', license: 'Apache-2.0', github_repo: `${G}/gateway`, upstream_fork: 'KrakenD', upstream_license: 'Apache-2.0', upstream_url: 'https://www.krakend.io' },
  guard:        { slug: 'guard',      tagline: 'AI guardrails', license: 'Apache-2.0', github_repo: `${G}/guard` },
  gui:          { slug: 'gui',        tagline: 'React UI library', license: 'Apache-2.0', github_repo: `${G}/gui` },
  hsm:          { slug: 'hsm',        tagline: 'Hardware security module', license: 'Apache-2.0', github_repo: `${G}/hsm` },
  iam:          { slug: 'iam',        tagline: 'Identity + access (hanzo.id)', license: 'Apache-2.0', github_repo: `${G}/iam`, upstream_fork: 'Casdoor', upstream_license: 'Apache-2.0', upstream_url: 'https://casdoor.org' },
  idv:          { slug: 'idv',        tagline: 'Identity verification', license: 'Apache-2.0', github_repo: `${G}/idv` },
  ingress:      { slug: 'ingress',    tagline: 'K8s ingress + static plugin', license: 'Apache-2.0', github_repo: `${G}/ingress` },
  insights:     { slug: 'insights',   tagline: 'Product insights + experiments', license: 'MIT', github_repo: `${G}/insights`, upstream_fork: 'PostHog', upstream_license: 'MIT', upstream_url: 'https://posthog.com' },
  jin:          { slug: 'jin',        tagline: 'Multimodal foundation model', license: 'Apache-2.0', github_repo: `${G}/jin` },
  kms:          { slug: 'kms',        tagline: 'Secrets + key management', license: 'Apache-2.0', github_repo: `${G}/kms` },
  kv:           { slug: 'kv',         tagline: 'Distributed key-value store', license: 'BSD-3-Clause', github_repo: `${G}/kv`, upstream_fork: 'Valkey', upstream_license: 'BSD-3-Clause', upstream_url: 'https://valkey.io' },
  ledger:       { slug: 'ledger',     tagline: 'Double-entry accounting ledger', license: 'Apache-2.0', github_repo: `${G}/ledger` },
  llm:          { slug: 'llm',        tagline: 'LLM gateway for 100+ providers', license: 'Apache-2.0', github_repo: G },
  machines:     { slug: 'machines',   tagline: 'Long-running compute machines', license: 'Apache-2.0', github_repo: G },
  mcp:          { slug: 'mcp',        tagline: 'Model Context Protocol — 260+ tools', license: 'Apache-2.0', github_repo: `${G}/mcp` },
  metrics:      { slug: 'metrics',    tagline: 'Time-series metrics', license: 'Apache-2.0', github_repo: `${G}/metrics` },
  mq:           { slug: 'mq',         tagline: 'Message queue', license: 'Apache-2.0', github_repo: `${G}/mq` },
  network:      { slug: 'network',    tagline: 'Decentralized compute network', license: 'Apache-2.0', github_repo: G },
  node:         { slug: 'node',       tagline: 'Standalone Hanzo node', license: 'Apache-2.0', github_repo: `${G}/node` },
  o11y:         { slug: 'o11y',       tagline: 'Observability suite', license: 'Apache-2.0', github_repo: `${G}/o11y` },
  operative:    { slug: 'operative',  tagline: 'Computer-use harness', license: 'Apache-2.0', github_repo: `${G}/operative`, upstream_fork: 'Anthropic Computer Use', upstream_license: 'MIT', upstream_url: 'https://github.com/anthropics/anthropic-quickstarts' },
  operator:     { slug: 'operator',   tagline: 'K8s operator', license: 'Apache-2.0', github_repo: `${G}/operator` },
  payments:     { slug: 'payments',   tagline: 'Payments processor', license: 'Apache-2.0', github_repo: `${G}/payments` },
  platform:     { slug: 'platform',   tagline: 'PaaS — deploy from git', license: 'Apache-2.0', github_repo: `${G}/platform`, upstream_fork: 'Dokploy', upstream_license: 'Apache-2.0', upstream_url: 'https://dokploy.com' },
  playground:   { slug: 'playground', tagline: 'Hands-on sandbox for every product', license: 'Apache-2.0', github_repo: G },
  pubsub:       { slug: 'pubsub',     tagline: 'Pub/sub messaging', license: 'Apache-2.0', github_repo: `${G}/pubsub` },
  realtime:     { slug: 'realtime',   tagline: 'Realtime channels + presence', license: 'Apache-2.0', github_repo: G },
  registry:     { slug: 'registry',   tagline: 'OCI image registry', license: 'Apache-2.0', github_repo: `${G}/registry` },
  search:       { slug: 'search',     tagline: 'AI-powered search', license: 'Apache-2.0', github_repo: `${G}/search`, upstream_fork: 'Meilisearch', upstream_license: 'MIT', upstream_url: 'https://www.meilisearch.com' },
  sentry:       { slug: 'sentry',     tagline: 'Error tracking', license: 'BSL-1.1', github_repo: `${G}/sentry`, upstream_fork: 'Sentry', upstream_license: 'BSL-1.1', upstream_url: 'https://sentry.io' },
  sign:         { slug: 'sign',       tagline: 'E-signature', license: 'AGPL-3.0', github_repo: `${G}/sign`, upstream_fork: 'Documenso', upstream_license: 'AGPL-3.0', upstream_url: 'https://documenso.com' },
  skills:       { slug: 'skills',     tagline: 'Reusable agent skills', license: 'Apache-2.0', github_repo: `${G}/skills` },
  sql:          { slug: 'sql',        tagline: 'Managed PostgreSQL', license: 'PostgreSQL', github_repo: `${G}/sql` },
  status:       { slug: 'status',     tagline: 'Status pages', license: 'Apache-2.0', github_repo: `${G}/status` },
  storage:      { slug: 'storage',    tagline: 'S3-compatible object storage', license: 'Apache-2.0', github_repo: `${G}/s3`, upstream_fork: 'SeaweedFS', upstream_license: 'Apache-2.0', upstream_url: 'https://github.com/seaweedfs/seaweedfs' },
  stream:       { slug: 'stream',     tagline: 'Event stream', license: 'Apache-2.0', github_repo: `${G}/stream` },
  studio:       { slug: 'studio',     tagline: 'Visual builder studio', license: 'GPL-3.0', github_repo: `${G}/studio`, upstream_fork: 'ComfyUI', upstream_license: 'GPL-3.0', upstream_url: 'https://www.comfy.org' },
  tasks:        { slug: 'tasks',      tagline: 'Durable workflows + scheduling', license: 'MIT', github_repo: `${G}/tasks` },
  telemetry:    { slug: 'telemetry',  tagline: 'OpenTelemetry ingest', license: 'Apache-2.0', github_repo: `${G}/telemetry` },
  treasury:     { slug: 'treasury',   tagline: 'Treasury management', license: 'Apache-2.0', github_repo: `${G}/treasury` },
  tunnel:       { slug: 'tunnel',     tagline: 'Secure tunnels', license: 'Apache-2.0', github_repo: `${G}/tunnel` },
  ui:           { slug: 'ui',         tagline: 'Headless UI primitives', license: 'MIT', github_repo: `${G}/ui` },
  vector:       { slug: 'vector',     tagline: 'Vector database', license: 'Apache-2.0', github_repo: `${G}/vector`, upstream_fork: 'Qdrant', upstream_license: 'Apache-2.0', upstream_url: 'https://qdrant.tech' },
  visor:        { slug: 'visor',      tagline: 'Cluster visualizer', license: 'Apache-2.0', github_repo: `${G}/visor` },
  world:        { slug: 'world',      tagline: '3D world building', license: 'Apache-2.0', github_repo: `${G}/world` },
  zap:          { slug: 'zap',        tagline: 'Zero-config app deploy', license: 'Apache-2.0', github_repo: `${G}/zap` },
  zen:          { slug: 'zen',        tagline: 'Open-weight frontier models', license: 'Apache-2.0', github_repo: 'https://github.com/zenlm/zen', docs_slug: 'zen' },

  // Web3 — these live under /blockchain/<slug>
  bridge:       { slug: 'bridge',     tagline: 'Cross-chain bridge', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/bridge', deploy_slug: 'bridge', docs_slug: 'blockchain/bridge' },
  chains:       { slug: 'chains',     tagline: 'Multi-chain platform', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/node', deploy_slug: 'chains', docs_slug: 'blockchain/chains' },
  exchange:     { slug: 'exchange',   tagline: 'DEX exchange surface', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/exchange', deploy_slug: 'exchange', docs_slug: 'blockchain/exchange' },
  indexer:      { slug: 'indexer',    tagline: 'Blockchain indexer', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/indexer', deploy_slug: 'indexer', docs_slug: 'blockchain/indexer' },
  nft:          { slug: 'nft',        tagline: 'NFT marketplace', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/nft', deploy_slug: 'nft', docs_slug: 'blockchain/nft' },
  pay:          { slug: 'pay',        tagline: 'Crypto payments', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/pay', deploy_slug: 'pay', docs_slug: 'blockchain/pay' },
  tokens:       { slug: 'tokens',     tagline: 'Token launchpad', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/tokens', deploy_slug: 'tokens', docs_slug: 'blockchain/tokens' },
  wallets:      { slug: 'wallets',    tagline: 'Multi-chain wallets', license: 'Apache-2.0', github_repo: 'https://github.com/luxfi/wallet', deploy_slug: 'wallets', docs_slug: 'blockchain/wallets' },

  // identity is an alias for IAM under /identity (legacy slug)
  identity:     { slug: 'identity',   tagline: 'Identity surface', license: 'Apache-2.0', github_repo: `${G}/iam`, docs_slug: 'iam' },
  // S3-compatible storage is an alias under /s3
  s3:           { slug: 's3',         tagline: 'S3-compatible object storage', license: 'Apache-2.0', github_repo: `${G}/s3`, upstream_fork: 'SeaweedFS', upstream_license: 'Apache-2.0', upstream_url: 'https://github.com/seaweedfs/seaweedfs', docs_slug: 'storage' },
};

export function getProductMetadata(slug: string): ProductMetadata | undefined {
  return productsMetadata[slug];
}

export function deployUrl(slug: string): string {
  const meta = productsMetadata[slug];
  const target = meta?.deploy_slug ?? slug;
  return `https://console.hanzo.ai/deploy/${target}`;
}

export function docsUrl(slug: string): string {
  const meta = productsMetadata[slug];
  const target = meta?.docs_slug ?? slug;
  return `https://docs.hanzo.ai/${target}`;
}
