import { test, expect } from '@playwright/test'
import { indexable, UNAPPROVED } from '../../lib/publish'
import { read } from './export'

/**
 * What the Risk page is allowed to claim.
 *
 * Every assertion here is a claim that was on the page and was not true of the
 * build that answers api.hanzo.ai today (ghcr.io/luxfi/aml:v0.3.7). Copy is not
 * usually testable, but these are not matters of taste: each one is a statement
 * about a system, checkable against that system, and each was wrong.
 */

const NOW = 'Available now'
const SOON = 'Coming soon'

/**
 * The page's OWN markup — the kit's `<main>`, not the layout's.
 *
 * The marketing layout wraps every page in a nav and a footer that say
 * "Open-source" about Hanzo, which is true of Hanzo and is not the claim under
 * test. A gate scoped to the whole document would read the footer and report
 * the page.
 */
function body(): string {
  const html = read('risk.html')
  const parts = html.split('<main')
  const inner = parts[parts.length - 1]
  const end = inner.indexOf('</main>')
  expect(parts.length, 'the kit page must render its own <main>').toBeGreaterThan(2)
  expect(end, 'the page <main> must close').toBeGreaterThan(0)
  return inner.slice(0, end)
}

/** The rendered words, without markup, class names or attribute values. */
function words(): string {
  return body()
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, "'")
    .replace(/\s+/g, ' ')
}

test('the page follows the publication list, whichever way the list reads', () => {
  // The mechanism, not the current answer. Absence from the nav was the old
  // "gate" and was never one — the sitemap walk publishes what the tree
  // contains, so the page's own state has to track the list in both directions.
  // Written this way, approving the copy is one line in lib/publish and this
  // still passes.
  const withheld = !indexable('/risk')
  const html = read('risk.html')
  // noindex is the only one of the three controls that removes a page a crawler
  // reached by some other path.
  const noindexed = /<meta name="robots" content="[^"]*noindex/.test(html)
  expect(noindexed, 'the page carries noindex exactly when the list withholds it').toBe(withheld)
  const listed = read('sitemap.xml').includes('<loc>https://hanzo.ai/risk</loc>')
  expect(listed, 'the sitemap offers it exactly when the list does not withhold it').toBe(!withheld)
  expect(html, 'and it must be the real page, not an empty shell').toContain('<h1')
})

test('the copy is unapproved, and this test is where that is recorded', () => {
  // The pin. A list entry that anyone can delete in silence is a convention,
  // and the finding this page exists to answer is that a convention is not a
  // control. Approving the copy is therefore two deliberate lines: drop '/risk'
  // from lib/publish's UNAPPROVED, and delete this test. Nothing else changes,
  // and neither line can be mistaken for housekeeping.
  expect(UNAPPROVED, 'no owner has approved this copy').toContain('/risk')
})

test('the page never calls the engine open source', () => {
  // luxfi/aml is under the Lux Ecosystem License v1.2 — the patent-protected
  // tier. Free for research and on Lux networks; commercial use anywhere else
  // is licensed separately. That is source-available, and "open source" is a
  // term with a meaning this licence does not meet.
  const text = words().toLowerCase()
  for (const m of text.matchAll(/open[-\s]?source/g)) {
    // The phrase may appear, and only in its denial.
    const before = text.slice(Math.max(0, m.index - 12), m.index)
    expect(before, `"${text.slice(m.index - 40, m.index + 40)}" must be a denial`).toMatch(/\bnot\s+$/)
  }
  expect(text, 'the false claim, verbatim').not.toContain('the engine underneath it is open source')
  expect(text, 'the card that repeated it').not.toContain('the engine, open source')
  expect(text, 'the licence must be named').toContain('lux ecosystem license')
  expect(text, 'and the restriction stated').toContain('licensed separately')
})

test('the engine link is labelled by what it is', () => {
  const html = read('risk.html')
  expect(html).toContain('https://github.com/luxfi/aml')
  expect(words().toLowerCase()).toContain('the engine, source available')
})

test('the retention claim matches what the deployed build keeps', () => {
  const text = words()
  // v0.3.7 retains four record classes on a five-year clock whose trigger is a
  // field of the record, and disposes daily. Cases, their timelines and alerts
  // are durable and carry no clock — so a flat "records are kept five years"
  // over the whole product was false, and the boundary has to be on the page.
  expect(text).toContain('five-year clock')
  expect(text, 'the three triggers, because the clock is not one date').toMatch(
    /end of the relationship, by the occasional transaction, or by the refusal/,
  )
  expect(text, 'disposal is proven, not asserted').toContain('proves what it destroyed')
  expect(text, 'the boundary of the clock must be stated').toMatch(
    /Alerts and case timelines are durable, and are not on that clock/,
  )
  // The sentence that was there, which claimed one trigger and no boundary.
  expect(text).not.toContain('Records are kept five years from the end of the business relationship')
})

test('the rule library claims replay, and does not claim activation', () => {
  // v0.3.7 answers `GET /v1/aml/rules` and `POST /v1/aml/rules/test`. There is
  // no route that activates a rule a tenant wrote, so "before you turn it on"
  // promised a switch that is not there. The replay is real, and is bounded to
  // one at a time per tenant (a second gets 429), which is worth saying because
  // it is the shape every expensive operation here has.
  const text = words()
  expect(text).toContain('one replay at a time per organization')
  expect(text, 'the boundary of what is live must be stated').toContain(
    'Activating a rule of your own belongs to the decide plane and is not here yet',
  )
  expect(text, 'the sentence that implied an activation switch').not.toContain('before you turn it on')
})

test('the unmet requirements are named, not delegated to a list that is stale', () => {
  // The page used to say "read it before you plan around this", pointing at
  // GET /v1/aml/catalog's `gaps`. That list is a static literal in the engine
  // and three of its entries no longer describe v0.3.7: it still says retention
  // is not implemented, that alerts are held in memory and evicted, and that
  // closed cases are discarded after ninety days — all of which the durable
  // ledger, the durable alert collection and the unbounded case shelf disprove.
  // Sending a reader there made the page contradict its own Retention card, so
  // the three requirements that DO hold are named here instead.
  const text = words()
  expect(text).toContain('no report workflow')
  expect(text).toContain('no filing clock')
  expect(text).toContain('no confidentiality marking on a case')
  expect(text, 'the page must not defer to the published list while it is stale').not.toContain(
    'Read it before you plan around this',
  )
  // And it must never repeat the stale claim itself.
  expect(text.toLowerCase()).not.toContain('retention is not implemented')
})

test('the event surface is a shared store, described as one', () => {
  const text = words()
  expect(text, 'a shared multi-tenant warehouse is not "your own"').not.toContain('your own warehouse')
  expect(text).toContain('rows scoped to your organization')
  expect(text).toContain('a warehouse Hanzo runs and every tenant shares')
})

test('the behavioural model is described as the shadow it runs in', () => {
  const text = words()
  expect(text).toContain('shadow')
  expect(text).toContain('contributes nothing to any transaction')
})

test('every capability section says which of the two it is', () => {
  // The structural hole: cards carried the status in their `meta` slot and
  // prose sections had nowhere to put it, so three unbuilt capabilities were
  // written in the present tense between two correctly-labelled card grids.
  const sections = body().split(/<section\b/).slice(1)
  expect(sections.length, 'the page must be built from kit sections').toBeGreaterThan(8)

  // The sections that carry no status because they describe no capability.
  // The hero is excluded by looking for an h2: the kit gives a Section an h2 and
  // the hero an h1, so "a section that states a capability" is exactly "a
  // section with an h2".
  const framing = ['Where this is today', 'What this is not', 'Next']
  const unmarked: string[] = []
  for (const section of sections) {
    const heading = /<h2[^>]*>([^<]*)</.exec(section)?.[1]?.trim() ?? ''
    if (!heading) continue
    if (framing.includes(heading)) continue
    if (!section.includes(NOW) && !section.includes(SOON)) unmarked.push(heading)
  }
  expect(unmarked, `sections that state a capability with no status: ${unmarked.join(' | ')}`).toEqual([])
})

test('the three sections that were present-tense now read as unbuilt', () => {
  const html = read('risk.html')
  for (const heading of ['Your data, your model', 'Agents are not bots', 'Platforms and marketplaces']) {
    const at = html.indexOf(heading)
    expect(at, `${heading} must be on the page`).toBeGreaterThan(-1)
    const section = html.slice(at, at + 4000)
    expect(section.includes(SOON), `${heading} must be marked "${SOON}"`).toBe(true)
  }
  const text = words()
  // The specific present-tense assertions that described nothing running.
  expect(text).not.toContain('Those doors are live today.')
  expect(text).not.toContain('We do not read one.')
  expect(text).not.toContain('Traffic carrying them is an agent and gets the agent policy')
  expect(text).not.toContain('The boundary is hard, and it is enforced in the code')
})

test('the decide plane is never described as live', () => {
  const text = words()
  expect(text).toContain('/v1/risk')
  expect(text).toMatch(/decide plane[\s\S]{0,120}being built/)
  expect(text).not.toMatch(/\/v1\/risk[^.]{0,40}is live/)
})

test('no fabricated metric and no other company', () => {
  // What red praised, kept under a gate so it cannot come back. The copy this
  // page descends from was a competitor's marketing with the names replaced.
  const text = words()
  expect(text, 'no percentage claim').not.toMatch(/\d+(\.\d+)?\s?%/)
  expect(text, 'no currency figure').not.toMatch(/[$€£]\s?\d/)
  expect(text, 'no multiplier claim').not.toMatch(/\b\d+(\.\d+)?x\b/i)
  // Whole words: "verified identity" is ours, "Verifi" is Visa's.
  const others = ['stripe', 'radar', 'verifi', 'ethoca', 'smart disputes', 'siteminder', 'jube', 'sift', 'sardine', 'unit21']
  const lower = text.toLowerCase()
  const found = others.filter((name) => new RegExp(`\\b${name}\\b`).test(lower))
  expect(found, `another company's name on our page: ${found.join(', ')}`).toEqual([])
})

test('the live half is described with the endpoint that answers it', () => {
  const text = words()
  expect(text).toContain('api.hanzo.ai/v1/aml')
  expect(text).toContain(NOW)
})
