/**
 * Product shots — the generated index the site reads screenshots through.
 *
 * GENERATED from the capture manifest by scripts/optimize-shots.py. Do not
 * hand-edit: the plates, their intrinsic dimensions and this file have to agree
 * or <ProductShot> reserves the wrong aspect ratio and the page shifts as the
 * bytes land.
 *
 * Shots the manifest flags `ship: false` are ABSENT here by construction — a
 * chat view whose bubble is a billing notice, the real prod status board, and a
 * real repo inventory each misrepresent the product or leak internals, so the
 * generator refuses to emit them rather than trusting anyone to remember.
 */

export interface ShotPlate {
  src: string
  width: number
  height: number
  dpr: number
}

export interface ProductShotEntry {
  name: string
  /** The `/products/<category>` slug this shot illustrates, or 'hero'. */
  category: string
  primary: boolean
  alt: string
  desktop: ShotPlate
  mobile?: ShotPlate
}

export const productShots: ProductShotEntry[] = [
  {
    name: 'chat',
    category: 'ai',
    primary: true,
    alt: 'Hanzo Chat in its empty state: the prompt "What can I help with?" centred over a composer reading "Ask anything" with attach, Build an app, settings and microphone controls, Chat / Search / News mode tabs above it, and suggestion chips for Summarize, Write code, Explain, Brainstorm and Build an app.',
    desktop: { src: '/shots/chat-1440.webp', width: 2400, height: 1500, dpr: 2 },
    mobile: { src: '/shots/chat-390.webp', width: 1170, height: 2532, dpr: 3 },
  },
  {
    name: 'app-builder',
    category: 'apps',
    primary: true,
    alt: 'Hanzo App builder hero: a "Sites, wired to real data & AI" pill above the headline "Describe your app. Hanzo builds and ships it.", a large prompt box reading "Ask Hanzo to build a customer portal with login and a dashboard" with Build and Base mode selectors, example chips for Internal admin dashboard, AI support chatbot, SaaS app with billing, Marketplace with auth and Realtime chat app, and a template row showing Circle, Kinetic, Savor and Matrix.',
    desktop: { src: '/shots/app-builder-1440.webp', width: 2400, height: 1500, dpr: 2 },
    mobile: { src: '/shots/app-builder-390.webp', width: 1170, height: 2532, dpr: 3 },
  },
  {
    name: 'docs-api',
    category: 'platform',
    primary: true,
    alt: 'Hanzo API reference page in dark mode: a left sidebar with an All Services picker, a page filter and nav entries for Start here, Introduction, Install, API Keys, API, AI API, Models, Pricing, Embeddings, Agents, Prompts, SDKs, MCP and API Reference; the main column headed "API" describes one base URL and one bearer key at api.hanzo.ai/v1 with Copy Markdown and Open controls, followed by "Build Anything with Hanzo" and three route cards — Build with App, Build with Dev and Build with API; an on-this-page rail sits at the right.',
    desktop: { src: '/shots/docs-api-1440.webp', width: 2400, height: 1500, dpr: 2 },
    mobile: { src: '/shots/docs-api-390.webp', width: 1170, height: 2532, dpr: 3 },
  },
]

/** The primary shot for a `/products/<slug>` category, if one was captured. */
export const shotForCategory = (slug: string): ProductShotEntry | undefined =>
  productShots.find((s) => s.category === slug && s.primary)

/**
 * The landing hero shot — a shot of the CONSOLE, and nothing else.
 *
 * No fallback on purpose. Falling back to 'the first primary' would drop a
 * category shot onto the front door, and the substitute that was actually
 * captured for this slot was cloud.hanzo.ai's own landing page — i.e. the very
 * page the hero sits on. An empty slot is honest; a page illustrated with
 * itself is not.
 */
export const heroShot: ProductShotEntry | undefined =
  productShots.find((s) => s.category === 'hero')
