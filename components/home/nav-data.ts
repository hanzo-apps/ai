/**
 * Landing nav — single source of truth for the openai.com-style header and the
 * minimal footer on the apex hanzo.ai landing (`app/page.tsx`).
 *
 * The apex is the clean, chat-centric front door. The DETAILED product /
 * marketing pages are part of THIS static export, so they resolve on hanzo.ai
 * itself — every deep link here is a same-origin relative path (`/vector`,
 * `/base`, `/cli`, …) that stays on hanzo.ai. The only absolute links are the
 * external product apps (hanzo.chat / hanzo.app / studio / team), the install
 * host (hanzo.sh), docs / blog / GitHub, the console you sign in to, the
 * Foundation that governs Hanzo (Zoo Labs, zoo.ngo), and the single
 * "Explore Cloud" umbrella door to the cloud-product site (cloud.hanzo.ai).
 * Every href resolves to a live surface — no dead links.
 */

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

export interface NavLink {
  label: string
  href: string
  desc?: string
}

export interface NavColumn {
  title: string
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
    label: 'Products',
    explore: [
      { label: 'Enso', href: '/enso', desc: 'Flagship model orchestration · Hanzo Cloud' },
      { label: 'Hanzo Chat', href: CHAT, desc: 'Chat with frontier models' },
      { label: 'Hanzo App', href: APP, desc: 'Build & ship AI apps' },
      { label: 'Hanzo Studio', href: STUDIO, desc: 'The creative AI studio' },
    ],
    columns: [
      {
        title: 'AI Cloud',
        links: [
          { label: 'Enso', href: '/enso', desc: 'Proprietary · Cloud only' },
          { label: 'Zen', href: '/zen', desc: 'Open weights' },
          { label: 'Hanzo Base', href: '/base' },
          { label: 'Vector search', href: '/vector' },
          { label: 'Explore Cloud', href: CLOUD },
        ],
      },
      {
        title: 'Apps',
        links: [
          { label: 'Chat', href: CHAT },
          { label: 'App', href: APP },
          { label: 'Studio', href: STUDIO },
          { label: 'Team', href: TEAM },
          { label: 'Bot', href: '/bot' },
          { label: 'Search', href: '/search' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { label: 'hanzo.sh — install', href: SH },
          { label: 'hanzo CLI', href: '/cli' },
          { label: 'MCP', href: '/mcp' },
          { label: 'ZAP', href: '/zap' },
          { label: 'Dev', href: '/dev' },
          { label: 'SDKs', href: '/cloud/sdks' },
        ],
      },
    ],
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
        title: 'Resources',
        links: [
          { label: 'Docs', href: DOCS },
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

/** "Log in" dropdown — the surfaces you can sign in to. */
export const LOGIN_LINKS: NavLink[] = [
  { label: 'Hanzo Chat', href: CHAT },
  { label: 'API Platform', href: CONSOLE },
  { label: 'Cloud', href: CLOUD },
]

/** "Try Hanzo" dropdown — the ONE uniform primary CTA, shared by hanzo.ai + cloud.hanzo.ai. */
export const TRY_LINKS: NavLink[] = [
  { label: 'Hanzo Chat', href: CHAT, desc: 'Chat with frontier models' },
  { label: 'Enso', href: '/enso', desc: 'One model to command them all' },
  { label: 'Hanzo App', href: APP, desc: 'Build & ship AI apps' },
  { label: 'Hanzo Studio', href: STUDIO, desc: 'The creative AI studio' },
  { label: 'Hanzo Cloud', href: CLOUD, desc: 'The full open-source AI cloud' },
]

/** Minimal footer columns. */
export const FOOTER: NavColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Enso', href: '/enso' },
      { label: 'Chat', href: CHAT },
      { label: 'App', href: APP },
      { label: 'Studio', href: STUDIO },
      { label: 'Cloud', href: CLOUD },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'hanzo.sh', href: SH },
      { label: 'Docs', href: DOCS },
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
