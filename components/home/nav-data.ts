/**
 * The cross-property destinations, in one place.
 *
 * This file used to also carry the header and footer menus for a hand-written
 * nav. That nav is gone: both faces of this export now wear the shared
 * `@hanzogui/shell` chrome (see `components/home/shell.tsx`), which owns its own
 * structure, and the ten-category Products menu is derived from
 * `lib/data/cloud-primitives.ts`. What is left is the set of hosts the site
 * links OUT to, named once so no page hard-codes a URL.
 *
 * Login is not among them by accident: this is a marketing site, it owns no
 * session and runs no OAuth, and console.hanzo.ai owns auth. `CONSOLE` is the
 * one door.
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
