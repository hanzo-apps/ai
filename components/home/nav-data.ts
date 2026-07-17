/**
 * Landing nav — single source of truth for the openai.com-style header and the
 * minimal footer on the apex hanzo.ai landing (`app/page.tsx`).
 *
 * The apex is the clean, chat-centric front door. The DETAILED product /
 * marketing pages live on cloud.hanzo.ai (the same static export, served by the
 * cloud-site image), so every deep link here is an absolute cloud.hanzo.ai URL —
 * clicking "Products → Vector" takes you to the detailed site. Chat is the
 * product front door (hanzo.chat); the Foundation that governs Hanzo is Zoo Labs
 * (zoo.ngo). Every href resolves to a live surface — no dead links.
 */

export const CHAT = 'https://hanzo.chat'
export const CLOUD = 'https://cloud.hanzo.ai'
export const CONSOLE = 'https://console.hanzo.ai'
export const DOCS = 'https://docs.hanzo.ai'
export const BLOG = 'https://blog.hanzo.ai'
export const GITHUB = 'https://github.com/hanzoai'
export const FOUNDATION = 'https://zoo.ngo'

/** Detailed pages now live under cloud.hanzo.ai. */
const cloud = (path: string) => `${CLOUD}${path}`

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
  /** Mega-menu columns (openai-style). */
  columns?: NavColumn[]
}

export const NAV: NavItem[] = [
  {
    label: 'Research',
    columns: [
      {
        title: 'Research',
        links: [
          { label: 'Overview', href: cloud('/overview'), desc: 'The Hanzo platform, end to end' },
          { label: 'Zen models', href: cloud('/zen'), desc: 'Open frontier models' },
          { label: 'Philosophy', href: cloud('/philosophy'), desc: 'How we build' },
          { label: 'Blog', href: BLOG, desc: 'Notes and releases' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    columns: [
      {
        title: 'AI',
        links: [
          { label: 'Models', href: cloud('/models') },
          { label: 'Agents', href: cloud('/agents') },
          { label: 'Inference', href: cloud('/engine') },
          { label: 'Fine-tuning', href: cloud('/cloud/fine-tuning') },
          { label: 'Embeddings', href: cloud('/cloud/embeddings') },
        ],
      },
      {
        title: 'Data & Compute',
        links: [
          { label: 'Vector', href: cloud('/vector') },
          { label: 'SQL', href: cloud('/sql') },
          { label: 'GPUs', href: cloud('/cloud/gpus') },
          { label: 'Functions', href: cloud('/functions') },
          { label: 'Machines', href: cloud('/machines') },
        ],
      },
      {
        title: 'Security',
        links: [
          { label: 'IAM', href: cloud('/iam') },
          { label: 'KMS', href: cloud('/kms') },
          { label: 'Authz', href: cloud('/authz') },
          { label: 'Secrets', href: cloud('/cloud/secrets') },
        ],
      },
      {
        title: 'Apps',
        links: [
          { label: 'Hanzo Chat', href: CHAT },
          { label: 'Bot', href: cloud('/bot') },
          { label: 'Search', href: cloud('/search') },
          { label: 'Studio', href: cloud('/studio') },
        ],
      },
    ],
  },
  {
    label: 'Business',
    columns: [
      {
        title: 'For business',
        links: [
          { label: 'Enterprise', href: cloud('/enterprise'), desc: 'Security, scale, and support' },
          { label: 'Solutions', href: cloud('/solutions'), desc: 'By use case and industry' },
          { label: 'Startups', href: cloud('/startups'), desc: 'Credits and go-to-market' },
          { label: 'Pricing', href: cloud('/pricing'), desc: 'Pay only for what you use' },
          { label: 'Contact sales', href: cloud('/contact/sales'), desc: 'Talk to the team' },
        ],
      },
    ],
  },
  {
    label: 'Developers',
    columns: [
      {
        title: 'Build',
        links: [
          { label: 'API Platform', href: cloud('/cloud/api') },
          { label: 'Agents', href: cloud('/agents') },
          { label: 'Open Models', href: cloud('/models') },
          { label: 'SDKs', href: cloud('/cloud/sdks') },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'CLI', href: cloud('/cli') },
          { label: 'Playground', href: cloud('/playground') },
          { label: 'MCP', href: cloud('/mcp') },
          { label: 'Docs', href: DOCS },
        ],
      },
    ],
  },
  {
    label: 'Company',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'About', href: cloud('/about') },
          { label: 'Careers', href: cloud('/careers') },
          { label: 'News', href: cloud('/press') },
          { label: 'Leadership', href: cloud('/leadership') },
          { label: 'Brand', href: cloud('/brand') },
          { label: 'Security', href: cloud('/security') },
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

/** Minimal footer columns. */
export const FOOTER: NavColumn[] = [
  {
    title: 'Product',
    links: [
      { label: 'Chat', href: CHAT },
      { label: 'Cloud', href: CLOUD },
      { label: 'API Platform', href: cloud('/cloud/api') },
      { label: 'Models', href: cloud('/models') },
      { label: 'Pricing', href: cloud('/pricing') },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Docs', href: DOCS },
      { label: 'SDKs', href: cloud('/cloud/sdks') },
      { label: 'CLI', href: cloud('/cli') },
      { label: 'GitHub', href: GITHUB },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: cloud('/about') },
      { label: 'Careers', href: cloud('/careers') },
      { label: 'News', href: cloud('/press') },
      { label: 'Contact', href: cloud('/contact') },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Foundation', href: FOUNDATION },
      { label: 'Brand', href: cloud('/brand') },
      { label: 'Status', href: cloud('/status') },
      { label: 'Security', href: cloud('/security') },
    ],
  },
]
