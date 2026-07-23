/**
 * Landing nav + surface data — single source of truth for the UNIFIED apex
 * hanzo.ai header/footer (`app/page.tsx`) and the `/enso` landing (both ship
 * LandingNav + LandingFooter).
 *
 * hanzo.ai is the unified top-level surface over Hanzo's model + cloud APIs
 * (one gateway, api.hanzo.ai/v1). The header routes OUT to each product's own
 * home. **Platform is the umbrella**: its mega-menu is built from the ten
 * cloud-primitive categories in `lib/data/cloud-primitives.ts` — the ONE
 * taxonomy — so the nav, the `/products/<slug>` category pages, and the routes
 * can never drift. Each product leaf links to its OWN canonical home (the
 * taxonomy `home` subdomain when one exists, else its `href`); category headers
 * link to `/products/<slug>`.
 *
 * Top nav: Meet Hanzo · Platform · Docs · Pricing
 * CTAs:    Chat (secondary) · Open Console (primary)
 *
 * Everything else is a same-origin marketing route on this static export, or a
 * flagship surface subdomain (Console, Builder, Studio, Chat, Team, Install).
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

/** Absolute (cross-origin) href → opens in a new tab with an external glyph. */
export const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href)

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
  /** Simple link — Docs (external) / Pricing (internal). */
  href?: string
  /** Umbrella mega-menu built from the ten cloud-primitive categories. */
  kind?: 'platform'
  /** Big "Explore" links, rendered large in the left column. */
  explore?: NavLink[]
  /** Secondary mega-menu columns. */
  columns?: NavColumn[]
}

export const NAV: NavItem[] = [
  {
    label: 'Meet Hanzo',
    explore: [
      { label: 'Overview', href: '/overview', desc: 'The unified AI cloud, end to end' },
      { label: 'Enso', href: '/enso', desc: 'One model to command 200+ — the router' },
      { label: 'Zen models', href: '/zen', desc: 'Open-weight frontier models, free to self-host' },
      { label: 'Philosophy', href: '/philosophy', desc: 'One way to do everything' },
    ],
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'News', href: '/press' },
          { label: 'Brand', href: '/brand' },
        ],
      },
      {
        title: 'Open source',
        links: [
          { label: 'GitHub', href: GITHUB },
          { label: 'Blog', href: BLOG },
          { label: 'Security', href: '/security' },
          { label: 'Status', href: '/status' },
        ],
      },
      {
        title: 'Governance',
        links: [
          { label: 'Zoo Labs Foundation', href: FOUNDATION, desc: 'The non-profit that governs Hanzo' },
        ],
      },
    ],
  },
  // Platform — the umbrella. Its panel is rendered from `cloudCategories`.
  { label: 'Platform', kind: 'platform' },
  { label: 'Docs', href: DOCS },
  { label: 'Pricing', href: '/pricing' },
]

/**
 * Flagship surfaces — hanzo.ai routes OUT to each product's own home. Console
 * is the primary; Builder (hanzo.app) and Studio (studio.hanzo.ai) are the
 * featured build surfaces; Chat is the front door to the models.
 */
export const SURFACES: NavLink[] = [
  { label: 'Open Console', href: CLOUD, desc: 'Cloud dashboard — deploy & manage' },
  { label: 'Builder', href: APP, desc: 'Build & ship AI apps — hanzo.app' },
  { label: 'Studio', href: STUDIO, desc: 'Visual AI-app studio — studio.hanzo.ai' },
  { label: 'Chat', href: CHAT, desc: 'Chat with frontier models — hanzo.chat' },
]

/** Minimal footer columns (brand cell + four columns → the lg:grid-cols-5 row). */
export const FOOTER: NavColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Enso', href: '/enso' },
      { label: 'Zen models', href: '/zen' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Open Console', href: CLOUD },
    ],
  },
  {
    title: 'Surfaces',
    links: [
      { label: 'Chat', href: CHAT },
      { label: 'Builder', href: APP },
      { label: 'Studio', href: STUDIO },
      { label: 'Team', href: TEAM },
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
      { label: 'Foundation', href: FOUNDATION },
    ],
  },
]
