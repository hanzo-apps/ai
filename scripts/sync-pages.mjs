/**
 * The site's own pages, as the ⌘K palette's index.
 *
 * A palette that indexes only products answers "no results" about /pricing —
 * a page the header links three inches above it. So the pages go in, and they
 * are DERIVED rather than listed: this walks the App Router tree, keeps what
 * `lib/publish` publishes, and writes the result. A hand-written list of "pages
 * worth finding" is a second opinion about what the site is, and it goes stale
 * the first time someone adds a route.
 *
 * TOP LEVEL only. Everything deeper is the cloud taxonomy — /cloud/<slug> and
 * /products/<id> — which the palette already indexes from `catalog.json` with
 * the names commerce gives them. Walking those here would put every primitive
 * in the list twice, once under the name it is sold as and once under a
 * title-cased URL slug.
 *
 * It imports the TypeScript sources directly, which Node strips types from on
 * its own from 22.18 — the floor `.nvmrc` and `engines` already name, and the
 * same call `scripts/noindex.mjs` makes. The alternative is a second copy of
 * the policy in JavaScript, which is what these scripts exist to prevent.
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { policy } from '../lib/publish.ts'
import { routes } from '../lib/routes.ts'

const ROOT = join(import.meta.dirname, '..')
const OUT = join(ROOT, 'lib', 'data', 'pages.json')

/**
 * How a slug is spelled when title-casing gets it wrong.
 *
 * An ORTHOGRAPHY table, not a taxonomy: it says how to write a word this site
 * already uses, and it can neither add a page nor withhold one. "Api" is simply
 * a misspelling of API, and no walk can know that.
 */
const SPELLING = {
  ai: 'AI',
  api: 'API',
  authz: 'Authorization',
  captable: 'Cap table',
  cli: 'CLI',
  dns: 'DNS',
  docdb: 'DocDB',
  docs: 'Documentation',
  faq: 'FAQ',
  gpu: 'GPUs',
  gui: 'GUI',
  hsm: 'HSM',
  iam: 'IAM',
  idv: 'Identity verification',
  in: 'in',
  kms: 'KMS',
  kv: 'KV',
  llm: 'LLM',
  llms: 'LLMs',
  mcp: 'MCP',
  mq: 'MQ',
  o11y: 'Observability',
  oss: 'Open source',
  sdk: 'SDKs',
  sdks: 'SDKs',
  sms: 'SMS',
  sql: 'SQL',
  ui: 'UI',
}

const label = (slug) =>
  SPELLING[slug] ??
  slug
    .split('-')
    .map((word) => SPELLING[word] ?? word[0].toUpperCase() + word.slice(1))
    .join(' ')

const pages = routes(join(ROOT, 'app'))
  .map(({ path }) => path)
  .filter((path) => path !== '/' && path.indexOf('/', 1) < 0 && policy(path) === 'public')
  .map((path) => ({ id: path.slice(1), title: label(path.slice(1)), href: path }))

if (pages.length === 0) {
  throw new Error('no published top-level routes: app/ is the tree this reads')
}

writeFileSync(OUT, JSON.stringify(pages, null, 2) + '\n')
console.log(`pages: ${pages.length} published top-level routes -> lib/data/pages.json`)
