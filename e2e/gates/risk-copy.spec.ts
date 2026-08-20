import { test, expect } from '@playwright/test'
import { indexable, UNAPPROVED } from '../../lib/publish'
import { read, serveExport } from './export'

/**
 * What the Risk page is allowed to claim.
 *
 * Every assertion here is a claim that was on the page and was not true of the
 * build that answers api.hanzo.ai today. Copy is not usually testable, but
 * these are not matters of taste: each one is a statement about a system,
 * checkable against that system, and each was wrong.
 *
 * The system is `ghcr.io/luxfi/aml`, pinned at v0.3.8 on the live deployment.
 * The claims were checked against v0.3.7 and hold unchanged: v0.3.7..v0.3.8 is
 * the console typeface and the Go builder image, with nothing under `pkg/`.
 */

const NOW = 'Available now'
const SOON = 'Coming soon'

/**
 * The page as a reader sees it, read out of the RENDERED DOM.
 *
 * It used to be a regex that stripped `<[^>]+>` from raw markup, which is not
 * a parser: any attribute value carrying a `>` leaks, and every class token
 * lands in the "rendered words" the assertions run against. This export already
 * ships utility classes containing a `%` (`h-[30%]` on /analytics), so the day
 * one lands on this page the percentage assertion below fails on a class name
 * rather than on copy — and a gate that fails for the wrong reason is a gate
 * somebody deletes. The browser is already here; ask it.
 *
 * Scoped to the kit's own `<main>`, not the layout's: the marketing shell says
 * "Open-source" about Hanzo in its footer, which is true of Hanzo and is not
 * the claim under test.
 */
interface Rendered {
  text: string
  /** Every block the kit renders. `level` is 'H1' for the hero, 'H2' otherwise. */
  sections: { heading: string; level: string; text: string }[]
}

let rendered: Rendered

test.beforeAll(async ({ browser }) => {
  const server = await serveExport()
  const tab = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  try {
    await tab.goto(server.url + '/risk', { waitUntil: 'load' })
    rendered = await tab.evaluate(() => {
      // The kit renders its own <main> inside the layout's, so the innermost —
      // last in document order — is the page and not the shell.
      const main = [...document.querySelectorAll('main')].at(-1)
      if (!main) throw new Error('the kit page rendered no <main>')
      return {
        text: (main as HTMLElement).innerText,
        sections: [...main.querySelectorAll('section')].map((s) => {
          const h = s.querySelector('h1, h2')
          return {
            heading: (h?.textContent ?? '').trim(),
            level: h?.tagName ?? '',
            text: (s as HTMLElement).innerText,
          }
        }),
      }
    })
  } finally {
    await tab.close()
    await server.close()
  }
})

const words = () => rendered.text

test('the rendered page is the page, and not an empty read of it', () => {
  // The floor, and it is load-bearing. Most assertions below are of the form
  // "the copy never says Y", and every one of those is true of an empty string
  // — so an extraction that quietly returned nothing would not fail a gate, it
  // would switch two thirds of this file off and report green. Silence is the
  // failure mode a copy gate has, so it is the one thing stated first.
  expect(rendered, 'the extraction must have run').toBeTruthy()
  expect(words().length, 'the page is several thousand words of copy').toBeGreaterThan(4000)
  expect(rendered.sections.length, 'the page is built from kit sections').toBeGreaterThan(8)
  const heroes = rendered.sections.filter((s) => s.level === 'H1')
  expect(heroes.length, 'exactly one block carries the h1, and it is the hero').toBe(1)
  expect(
    rendered.sections.filter((s) => s.heading).length,
    'most blocks carry a heading — the status contract keys on it',
  ).toBeGreaterThan(8)
  // And the extraction reads COPY, not markup: no tag or attribute may survive.
  expect(words(), 'innerText, not stripped markup').not.toMatch(/<[a-z/]|class=|style=/i)
})

test('the page follows the publication list, whichever way the list reads', () => {
  // The mechanism, not the current answer. Absence from the nav was the old
  // "gate" and was never one — the sitemap walk publishes what the tree
  // contains, so the page's own state has to track the list in both directions.
  // Written this way, approving the copy is one line in lib/publish and this
  // still passes.
  const withheld = !indexable('/risk')
  const html = read('risk.html')
  // noindex is the only one of the three controls that removes a page a crawler
  // reached by some other path — and the reason /risk is UNAPPROVED rather than
  // PRIVATE is that a Disallow would stop the crawler ever reading it.
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

test('the hero says which half is live, in the sentence most likely to be quoted', () => {
  // The hero was the hole. The status contract covered every prose section and
  // every card, and skipped the one block with an h1 — so the page's strongest
  // present-tense claim about the unbuilt plane ("Hanzo Risk scores an entity …
  // and returns a decision you can explain") sat in the one place no gate
  // looked, and it is the sentence a screenshot crops to.
  const hero = rendered.sections.find((s) => s.level === 'H1')!.text
  expect(hero, `the hero must carry "${NOW}"`).toContain(NOW)
  expect(hero, `the hero must carry "${SOON}"`).toContain(SOON)
  expect(hero, 'the live half is the compliance face').toMatch(/Available now[\s\S]{0,80}compliance face/)
  expect(hero, 'the unbuilt half is future tense, not present').toMatch(/Coming soon[\s\S]{0,60}decide plane/)
  expect(hero, 'the claim as it read').not.toContain('Hanzo Risk scores an entity')
  expect(hero, 'nothing unbuilt is claimed in the present tense here').not.toMatch(
    /decide plane[^.]{0,40}\b(scores|returns|reads|decides)\b/,
  )
})

test('an alert carries a citation, and the page never says it carries the text', () => {
  // Alert.Citations is []standard.Citation{Authority, Document, Locator, URL} —
  // a reference a reviewer follows, not the statute. Nothing under pkg/standard
  // or pkg/rules holds the text itself; pkg/rules/citation.go says so outright
  // ("read from the primary text at the URL each names"). A compliance buyer
  // told "the primary text travels with the alert" expects the statutory
  // language in the payload for their audit file, and gets a URL.
  const text = words()
  expect(text, 'the alert carries the citation, and the citation is named by its parts').toMatch(
    /citation behind it[\s\S]{0,80}authority[\s\S]{0,60}locator/i,
  )
  // The RULE, not the one sentence that broke it, and scoped to a sentence
  // rather than to a character distance — a bound of "within 90 characters" is
  // satisfied by rewording, which is not the same as being true. The primary
  // text may be named on this page only where the citation that locates it is
  // named in the same breath, because the citation is the only one of the two
  // that is in the payload.
  const loose = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => /primary text|statutory (text|language)/i.test(s) && !/\bcitation\b/i.test(s))
  expect(loose, `the primary text named without the citation that points at it:\n${loose.join('\n')}`).toEqual([])
  expect(text, 'and no verbatim or excerpt claim anywhere').not.toMatch(/\b(verbatim|excerpt|full text)\b/i)
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
  expect(read('risk.html')).toContain('https://github.com/luxfi/aml')
  expect(words().toLowerCase()).toContain('the engine, source available')
})

test('the retention claim matches what the deployed build keeps', () => {
  const text = words()
  // The engine retains four record classes on a five-year clock whose trigger is
  // a field of the record, and disposes daily. Cases, their timelines and alerts
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
  // The engine answers `GET /v1/aml/rules` and `POST /v1/aml/rules/test`. There
  // is no route that activates a rule a tenant wrote, so "before you turn it on"
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

test('the relationship lookback answers one party, and is credited with nothing else', () => {
  // `POST /v1/aml/relationships/search` resolves the name to a pseudonym and calls
  // retention.Ledger.Lookback(purpose, org, party, now). That reads the records
  // indexed under ONE party, keeps the ones whose Class is a relationship, and
  // answers AMLR Art. 78: Maintained, Current, the Natures found, the record ids,
  // the window, and Examined — which the ledger carries precisely to show the
  // answer came from an index rather than a scan.
  //
  // It never reads a transaction. So the card's "look back across the
  // relationships around a subject … which is where structuring across several
  // accounts becomes visible" credited this route with two things it does not do:
  // a walk over the relationships AROUND a party (there is no counterparty graph
  // anywhere in the engine), and a detection. Structuring across a customer's own
  // accounts IS caught, by a different plane — the `structuring-accounts` rule at
  // ingest — and attributing it here is the kind of claim that reaches support as
  // "your product said it would show me this".
  const text = words()
  expect(text, 'the question it answers').toMatch(/business relationship with a named party/i)
  expect(text, 'the window Art. 78 sets').toMatch(/last five years/i)
  expect(text, 'and the nature, which the answer carries alongside existence').toMatch(/what its nature was/i)
  expect(text, 'an index lookup, which is what "speedily" needs').toMatch(/does not grow with the ledger/i)
  expect(text, 'and the boundary: it reads one plane, not both').toMatch(/reads relationships and not transactions/i)
  // The RULE, not the one sentence that broke it, and scoped to a sentence rather
  // than to a character distance — a bound of "within N characters" is satisfied by
  // rewording, which is not the same as being true. A detection or a graph may not
  // be named in the same breath as the lookback, because the lookback does neither.
  const credited = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => /\brelationships?\b/i.test(s) && /structur|counterpart|graph|link analys|network analys/i.test(s))
  expect(credited, `the lookback credited with work it does not do:\n${credited.join('\n')}`).toEqual([])
  // The sentence as it read.
  expect(text, 'the claim, verbatim').not.toContain('structuring across several accounts becomes visible')
})

test('the unmet requirements are named here, and no reader is sent to a stale list', () => {
  // The page used to say "read it before you plan around this", pointing at
  // GET /v1/aml/catalog's `gaps`. That list is a static literal in the engine
  // and three of its nine entries no longer describe the deployed build: they
  // still say retention is not implemented, that alerts are held in memory and
  // evicted, and that closed cases are discarded after ninety days — all of
  // which the durable ledger, the durable alert collection and the unbounded
  // case shelf disprove. Removing the pointer was not enough: advertising that
  // "the engine names the requirements it does not meet" is the same
  // instruction with the URL taken out, and it still lands a reader on an
  // engine denying this page's own Retention card. The page names them.
  const text = words()
  expect(text).toContain('no report workflow')
  expect(text).toContain('no filing clock')
  expect(text).toContain('no confidentiality marking on a case')
  expect(text, 'the page must not defer to the published list while it is stale').not.toContain(
    'Read it before you plan around this',
  )
  expect(text, 'nor advertise it without naming it').not.toMatch(
    /engine names the requirements it does not meet/i,
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

test('every block that states a capability says which of the two it is', () => {
  // The structural hole this closes: cards carried the status in their `meta`
  // slot and prose sections had nowhere to put it, so three unbuilt
  // capabilities were written in the present tense between two correctly
  // labelled card grids. The hero used to be exempt as well, by looking for an
  // h2 — which is exactly how the strongest claim on the page ended up with no
  // gate over it. h1 or h2: if a block has a heading and states a capability,
  // it says which half it is.
  const framing = ['Where this is today', 'What this is not', 'Next']
  const unmarked = rendered.sections
    .filter((s) => s.heading && !framing.includes(s.heading))
    .filter((s) => !s.text.includes(NOW) && !s.text.includes(SOON))
    .map((s) => s.heading)
  expect(unmarked, `blocks that state a capability with no status: ${unmarked.join(' | ')}`).toEqual([])
})

test('the three sections that were present-tense now read as unbuilt', () => {
  for (const heading of ['Your data, your model', 'Agents are not bots', 'Platforms and marketplaces']) {
    const section = rendered.sections.find((s) => s.heading === heading)
    expect(section, `${heading} must be a section on the page`).toBeTruthy()
    expect(section!.text.includes(SOON), `${heading} must be marked "${SOON}"`).toBe(true)
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

test('the learning plane is /v1/risk, and /v1/ml belongs to another product', () => {
  // /v1/ml is LIVE and is a different product: a Kubernetes/KServe model
  // SERVING plane (`/v1/ml/models`, `/v1/ml/models/{name}/predict`), declared
  // in the live api.hanzo.ai openapi under tag `ml` and answering today. The
  // risk stack's decide-and-learn face is /v1/risk. One prefix, one meaning —
  // a page that pointed learning at /v1/ml would be naming somebody else's
  // customers' endpoint.
  const text = words()
  expect(text, 'the decide and learn face').toContain('/v1/risk')
  expect(text, '/v1/ml is the serving plane, and is not this').not.toContain('/v1/ml')
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
