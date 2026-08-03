/**
 * Landing nav — the single source of truth for the header and footer of EVERY
 * host this one static export serves: the apex hanzo.ai landing (`app/page.tsx`)
 * and, through `app/(marketing)/layout.tsx`, cloud.hanzo.ai and every deep
 * marketing page beneath it. One chrome, one IA, so the two hosts cannot drift.
 *
 * Deep links are same-origin relative paths (`/vector`, `/base`, `/cli`, …), so
 * they resolve on whichever host is serving the export. The only absolute links
 * are the external product apps (hanzo.chat / hanzo.app / studio / team), the
 * install host (hanzo.sh), docs / blog / GitHub, the Foundation that governs
 * Hanzo (Zoo Labs, zoo.ngo), and the CONSOLE.
 *
 * Login is ONE action. This site is marketing only — it runs no OAuth of its
 * own and owns no session. Every sign-in / log-in affordance goes to
 * console.hanzo.ai, which owns auth; a bare hanzo.id link carries no client_id,
 * redirect_uri or PKCE, so it can only strand the visitor at a portal with
 * nowhere to return to. There is no second "log in to X" list, because there is
 * only one place to log in.
 *
 * The Products menu is DERIVED from `lib/data/cloud-primitives.ts` — the same
 * taxonomy behind the `/products/<slug>` category pages and the product
 * showcase — so the menu, the pages, and the routes are one thing.
 */

import { categorySlug, cloudCategories } from '@/lib/data/cloud-primitives'

export const CHAT = 'https://hanzo.chat'
export const APP = 'https://hanzo.app'
export const STUDIO = 'https://studio.hanzo.ai'
export const TEAM = 'https://hanzo.team'
export const SH = 'https://hanzo.sh'
export const CLOUD = 'https://cloud.hanzo.ai'
export const CONSOLE = 'https://console.hanzo.ai'
export const DOCS = 'https://docs.hanzo.ai'
export const BLOG = 'https://blog.hanzo.ai'
export const GITHUB = 'https://github.com/hanzoai'
export const FOUNDATION = 'https://zoo.ngo'

/** The ONE chat hand-off. hanzo.chat is the chat product; hanzo.ai never
 *  reimplements a chat client, it forwards the prompt — `?q=` lands in the
 *  hanzo.chat composer ready to send.
 *
 *  `hz_ref=site` is the funnel join. hanzo.ai and hanzo.chat are separate
 *  origins, so a logged-out visitor has a DIFFERENT anonymousId on each — no
 *  per-person funnel can span them. Carrying the source surface in the URL lets
 *  hanzo.chat stamp `referrerProduct:'site'` on its own chat_started, which makes
 *  the handoff drop-off measurable in aggregate without any cross-domain
 *  identity (see FUNNELS.siteToChat in @hanzo/event). */
export function goToChat(prompt = '') {
  const q = prompt.trim()
  const params = new URLSearchParams({ hz_ref: 'site' })
  if (q) params.set('q', q)
  window.location.href = `${CHAT}/?${params.toString()}`
}

export interface NavLink {
  label: string
  href: string
  desc?: string
}

export interface NavColumn {
  title: string
  /** Column header link — a product category header opens its `/products/<slug>` page. */
  href?: string
  /** One-line column subtitle (a category's tagline). */
  desc?: string
  links: NavLink[]
}

export interface NavItem {
  label: string
  /** Simple link (no mega-menu) — e.g. Foundation → zoo.ngo. */
  href?: string
  /** Big "Explore <section>" links, rendered large in the left column (openai-style). */
  explore?: NavLink[]
  /** Secondary mega-menu columns. */
  columns?: NavColumn[]
}

export const NAV: NavItem[] = [
  {
    label: 'Research',
    explore: [
      { label: 'Overview', href: '/overview', desc: 'The Hanzo platform, end to end' },
      { label: 'Enso', href: '/enso', desc: 'Model orchestration — one model to command them all' },
      { label: 'Zen models', href: '/zen', desc: 'Open-weight frontier models' },
      { label: 'Philosophy', href: '/philosophy', desc: 'How we build' },
    ],
    columns: [
      {
        title: 'Latest',
        links: [
          { label: 'Enso Flash', href: '/enso' },
          { label: 'Enso Pro', href: '/enso' },
          { label: 'Enso Ultra', href: '/enso' },
          { label: 'Blog', href: BLOG },
        ],
      },
    ],
  },
  {
    // The ten cloud primitives, straight from the taxonomy — two rows of five,
    // each header a door to its `/products/<slug>` page. Nothing is retyped
    // here, so a leaf cannot go stale or become a dead link.
    label: 'Products',
    columns: cloudCategories.map((category) => ({
      title: category.title,
      href: `/products/${categorySlug(category.title)}`,
      desc: category.tagline,
      links: category.items.map((item) => ({ label: item.title, href: item.href })),
    })),
  },
  {
    label: 'Business',
    explore: [
      { label: 'Overview', href: '/enterprise', desc: 'Security, scale, and support' },
      { label: 'Solutions', href: '/solutions', desc: 'By use case and industry' },
      { label: 'Pricing', href: '/pricing', desc: 'Pay only for what you use' },
      { label: 'Contact sales', href: '/contact/sales', desc: 'Talk to the team' },
    ],
    columns: [
      {
        title: 'For business',
        links: [
          { label: 'Enterprise', href: '/enterprise' },
          { label: 'Startups', href: '/startups' },
          { label: 'Enso for teams', href: '/enso' },
          { label: 'Security', href: '/security' },
        ],
      },
    ],
  },
  {
    label: 'Developers',
    explore: [
      { label: 'hanzo.sh', href: SH, desc: 'One line to install — get started fast' },
      { label: 'hanzo CLI', href: '/cli', desc: 'Run dev or any coding agent; log in to Cloud' },
      { label: 'API Platform', href: '/cloud/api', desc: 'One OpenAI-compatible API' },
      { label: 'MCP', href: '/mcp', desc: 'Model Context Protocol tools' },
    ],
    columns: [
      {
        title: 'Build',
        links: [
          { label: 'Agents', href: '/agents' },
          { label: 'ZAP', href: '/zap' },
          { label: 'SDKs', href: '/cloud/sdks' },
          { label: 'Playground', href: '/playground' },
        ],
      },
      {
        // The four dev surfaces docs.hanzo.ai puts in ITS top nav — API, CLI,
        // MCP, SDKs. Naming them the same on both sites, one click apart, is
        // the point: a reader who knows the word from one site finds it on the
        // other. Deep links, because docs.hanzo.ai/ is the docs marketing home
        // and the tree lives under /docs.
        title: 'Documentation',
        links: [
          { label: 'Docs home', href: `${DOCS}/docs` },
          { label: 'API reference', href: `${DOCS}/docs/openapi` },
          { label: 'CLI', href: `${DOCS}/docs/services/platform/getting-started/cli` },
          { label: 'MCP', href: `${DOCS}/docs/mcp` },
          { label: 'SDKs', href: `${DOCS}/docs/sdks` },
          { label: 'GitHub', href: GITHUB },
          { label: 'Blog', href: BLOG },
        ],
      },
    ],
  },
  {
    label: 'Company',
    explore: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'News', href: '/press' },
      { label: 'Leadership', href: '/leadership' },
    ],
    columns: [
      {
        title: 'Resources',
        links: [
          { label: 'Brand', href: '/brand' },
          { label: 'Security', href: '/security' },
          { label: 'Status', href: '/status' },
        ],
      },
    ],
  },
  {
    // Zoo Labs Foundation Inc governs Hanzo. External.
    label: 'Foundation',
    href: FOUNDATION,
  },
]

/**
 * The two header actions, in order. `Log in` and `Start building` are the same
 * destination on purpose: console.hanzo.ai is both the sign-in door and the
 * place you land to build, and stating it twice serves the returning user and
 * the new one without asking either to choose from a menu.
 */
export const LOGIN = { label: 'Log in', href: CONSOLE }
export const START = { label: 'Start building', href: CONSOLE }

/** Minimal footer columns. */
export const FOOTER: NavColumn[] = [
  {
    title: 'Product',
    links: [
      // `/products` is the full catalog of the ten cloud primitives, and it
      // resolves on whichever host is serving this export — so it is the one
      // door to the cloud from either site, never a link back to where you are.
      { label: 'Products', href: '/products' },
      { label: 'Enso', href: '/enso' },
      { label: 'Chat', href: CHAT },
      { label: 'App', href: APP },
      { label: 'Studio', href: STUDIO },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'hanzo.sh', href: SH },
      { label: 'Docs', href: `${DOCS}/docs` },
      { label: 'API reference', href: `${DOCS}/docs/openapi` },
      { label: 'CLI', href: '/cli' },
      { label: 'GitHub', href: GITHUB },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'News', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Foundation', href: FOUNDATION },
      { label: 'Brand', href: '/brand' },
      { label: 'Status', href: '/status' },
      { label: 'Security', href: '/security' },
    ],
  },
]
