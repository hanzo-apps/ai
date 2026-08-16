import { test, expect } from '@playwright/test'
import { read, serveExport } from './export'

/**
 * What the trust page is allowed to claim.
 *
 * Copy is not usually testable. This page is the exception, because every
 * sentence on it is a statement about a system that either exists or does not,
 * and because it is the page a security reviewer reads hardest — a claim that
 * drifts here is a claim somebody procured on.
 *
 * The failure this guards against has already happened once on our own
 * surfaces: two sites gave two different answers about the same framework on
 * the same day, and neither had an artifact behind either one. The /security
 * badge row was the same defect in a quieter form — four framework names, each
 * with a green checkmark, and the qualifiers that made them honest sat in a
 * `description` field the markup never rendered.
 *
 * So the assertions below are written as RULES, not as searches for the
 * sentence that broke last time. A framework may be named where the sentence is
 * about control alignment or about a document we do send; "certified" may not
 * appear at all. Neither can be satisfied by implying.
 *
 * The rule used to be the opposite: a framework could be named ONLY in a
 * sentence denying we held it. That produced true copy with a second problem —
 * the denial went into this page's meta description, which is what a search
 * engine prints for someone searching whether we are certified, so the answer
 * opened by listing three absences. A hedge fails for the same reason it always
 * did, and now so does a denial: both are answers to a question nobody asked.
 */

const FRAMEWORKS = /\b(SOC ?2|ISO ?27001|FedRAMP|PCI ?DSS|HITRUST)\b/gi
const DENIAL = /\b(no|not|never|without|neither|nor)\b/i
/** The sentence shapes that make naming a framework legitimate. */
const ALIGNED = /\b(compatible with|compliant with|built to|aligned (to|with)|available (up)?on request|on request|internal audits?)\b/i
/** Claims to a certificate. No phrasing rescues one of these. */
const CERTIFICATE = /\b(certified|certification|accredited|attestation)\b/i
/** Hedges. Each reads as a claim to a skimming buyer and dates itself on ship. */
const HEDGE = /\b(in ?progress|in ?audit|assessment planned|planned|readiness|ready|scoped|towards?|underway|scheduled)\b/i

interface Rendered {
  text: string
  headings: string[]
}

let rendered: Rendered

test.beforeAll(async ({ browser }) => {
  const server = await serveExport()
  const tab = await browser.newPage({ viewport: { width: 1280, height: 900 } })
  try {
    await tab.goto(server.url + '/trust', { waitUntil: 'load' })
    rendered = await tab.evaluate(() => {
      // The kit renders its own <main> inside the layout's, so the innermost —
      // last in document order — is the page and not the shell.
      const main = [...document.querySelectorAll('main')].at(-1)
      if (!main) throw new Error('the trust page rendered no <main>')
      return {
        text: (main as HTMLElement).innerText,
        headings: [...main.querySelectorAll('h1, h2')].map((h) => (h.textContent ?? '').trim()),
      }
    })
  } finally {
    await tab.close()
    await server.close()
  }
})

const words = () => rendered.text
/** The page's sentences, for the rules that must hold within one breath. */
const sentences = () => words().split(/(?<=[.!?])\s+/)

test('the rendered page is the page, and not an empty read of it', () => {
  // The floor, and it is load-bearing. Most assertions below are of the form
  // "the copy never says Y", and every one of those is true of an empty string
  // — so an extraction that quietly returned nothing would switch this file off
  // and report green. Silence is the failure mode a copy gate has.
  expect(rendered, 'the extraction must have run').toBeTruthy()
  expect(words().length, 'the page is a document, not a stub').toBeGreaterThan(3000)
  expect(rendered.headings.length, 'it is built from the kit’s sections').toBeGreaterThan(6)
  expect(words(), 'innerText, not stripped markup').not.toMatch(/<[a-z/]|class=|style=/i)
})

test('a framework is named only to describe controls or offer a document', () => {
  // The RULE, scoped to a sentence rather than to a character distance — a bound
  // of "within N characters" is satisfied by rewording, which is not the same as
  // being true. Written this way, no paraphrase of a certification claim can
  // come back, which a `not.toContain` of last time's sentence could not promise.
  const loose = sentences().filter(
    (s) => FRAMEWORKS.test(s) && !ALIGNED.test(s) && !DENIAL.test(s),
  )
  expect(loose, `a framework named as neither alignment nor offer:\n${loose.join('\n')}`).toEqual([])
  // And the page must actually take a position, rather than pass by saying nothing.
  expect(words(), 'the position must be stated').toMatch(/compatible with SOC 2/i)
  expect(words(), 'and the document offered').toMatch(/available upon request/i)
})

test('the position is stated positively, never as a list of absences', () => {
  // The regression this replaces: "Hanzo does not hold SOC 2, ISO 27001, or
  // FedRAMP" was this page's own meta description for months. It was true, and
  // it was the sentence Google printed under our name for that exact search.
  const denials = sentences().filter((s) => FRAMEWORKS.test(s) && /\b(do not|does not|don't|no longer|hold no)\b/i.test(s))
  expect(denials, `a framework named to say we lack it:\n${denials.join('\n')}`).toEqual([])
})

test('the page never claims a certificate', () => {
  const text = words()
  expect(text, 'a certificate is a document we do not have').not.toMatch(/\bcertified\b/i)
  expect(text, 'nor an accreditation').not.toMatch(/\baccredited\b/i)
  expect(text, 'nor a formal attestation').not.toMatch(/\battestation\b/i)
  // "compliant with X" used to be banned here as the same claim wearing a
  // different coat. It is not the same claim: it describes our controls, where
  // "certified" describes a document an auditor issued. The certificate words
  // above are the ones no context can make true.
  //
  // "audit report" is likewise allowed now — we run continual INTERNAL audits
  // and send that report. What stays banned is the shape that implies a third
  // party performed it, which is the thing we cannot produce.
  expect(text, 'no auditor of ours').not.toMatch(/\bour (auditor|assessor)\b/i)
  expect(text, 'nor the certificate artifact by name').not.toMatch(/\bType (I|II) report\b/i)
  expect(text, "and our audits are ours, not a third party's").not.toMatch(
    /\b(independent|third.?party|external)\s+(audit|auditor|assessment|assessor)/i,
  )
})

test('no timeline is promised, and no certification is said to be coming', () => {
  const text = words()
  // "assessment planned" was the hanzo.ai half of the contradiction this page
  // replaces. A date is a promise; "scoped per engagement" is a fact.
  expect(text).not.toMatch(/\b(assessment|audit|certification|report)\s+(is\s+)?(planned|underway|in progress|scheduled|coming)\b/i)
  expect(text).not.toMatch(/\bwe (will|expect to|plan to|aim to)\s+(be|become|obtain|achieve|complete)\b/i)
  // And no hedge beside a framework in any spelling. "SOC 2 ready" and "Type II
  // readiness" were the two that kept coming back, each reading as a claim to
  // anyone skimming and each stale the month after it shipped.
  const hedged = sentences().filter((s) => FRAMEWORKS.test(s) && HEDGE.test(s))
  expect(hedged, `a framework named beside a hedge:\n${hedged.join('\n')}`).toEqual([])
})

test('no availability figure, because that number is contractual', () => {
  const text = words()
  expect(text, 'no percentage anywhere — an uptime claim reads as an SLA').not.toMatch(/\d+(\.\d+)?\s?%/)
  expect(text, 'and the reason is stated rather than left as a gap').toMatch(
    /uptime number is a contractual commitment/i,
  )
})

test('FIPS is named only as a denial', () => {
  // A FIPS 140-3 claim was removed from /hsm for having no evidence. Naming a
  // standard we implement (ML-KEM, ML-DSA) is fine; a validation belongs to a
  // module's vendor. The word must not reappear as a claim in any form.
  for (const s of sentences().filter((s) => /\bFIPS\b/i.test(s))) {
    expect(s, `FIPS named without a denial: ${s}`).toMatch(DENIAL)
  }
  expect(words(), 'no validation claim in any spelling').not.toMatch(/\bFIPS[- ]?(140|validated)/i)
})

test('the controls it does claim are the ones it can point at', () => {
  const text = words()
  // Each of these was read in the source before it was written on the page.
  // They are asserted so that deleting the evidence deletes the claim with it.
  expect(text, 'PKCE, and only the strong method').toMatch(/only S256 is accepted/)
  expect(text, 'argon2id, with the parameters in the digest').toMatch(/argon2id at 64 MiB and two passes/)
  expect(text, 'refresh rotation with family revocation').toMatch(/every token in that family is deleted/)
  expect(text, 'the grant model').toMatch(/A grant covers a path and everything below it/)
  expect(text, 'and the segment-wise test that makes it safe').toMatch(
    /acme\/prod does not cover acme\/production/,
  )
  expect(text, 'the edge re-deriving identity').toMatch(/stripped at the gateway/)
  expect(text, 'per-tenant file').toMatch(/Two organizations are two files/)
  expect(text, 'the audit trail’s reserved rows').toMatch(/refuses to create, correct or delete one/)
  expect(text, 'the key derivation that is actually in the build').toMatch(/through HKDF-SHA256/)
  expect(text, 'and a signing key that stays in its module').toMatch(/takes a key id and some bytes/)
})

test('the keys section describes live code, not an archived repo', () => {
  // hanzoai/kms is archived — its README and DEPRECATED.md both say the
  // canonical KMS is luxfi/kms, which is an MPC service for validator keys and
  // does not carry the customer-secret chain at all. So the passphrase →
  // Argon2id → HKDF → AES-GCM story, and the hybrid-HPKE key sharing beside it,
  // describe a repo nobody runs. Both were on the first draft of this page.
  //
  // What IS in the running build is hanzoai/cek: HKDF-SHA256 per namespace and
  // subsystem, pinned in base's go.mod and called on every org Base open. That
  // is what the page says, and this keeps the deleted claims from drifting back.
  const text = words()
  expect(text, 'the archived passphrase KDF').not.toMatch(/Argon2id at 256 MiB/)
  expect(text, 'the archived key-sharing story').not.toMatch(/ML-KEM-768 together|hybrid HPKE/i)
  expect(text, 'and no claim that a key never reaches us').not.toMatch(/never leaves (the|your) (client|browser|device)/i)
})

test('encryption at rest is described as configured, not as universal', () => {
  // base/plugins/org/org_db.go: an EMPTY master key is dev mode and the org Base
  // opens plaintext. A wrong-length key is an error — that half is unconditional
  // — but "every file is encrypted" would be false of a deployment that set no
  // master. The file boundary is the claim that holds either way.
  const text = words()
  expect(text, 'the unconditional half is the file boundary').toMatch(/Two organizations are two files/)
  expect(text, 'and the key is qualified by being configured').toMatch(
    /Where a master key is configured/,
  )
  expect(text, 'no unconditional at-rest claim').not.toMatch(
    /\b(all|every) (data|file|database)s? (is|are) encrypted\b/i,
  )
})

test('the controls it cannot point at are named as absent', () => {
  const text = words()
  // internal/webauthn stores passkey credentials and holds no assertion
  // ceremony; pkg/schema/passkey.go returns PasskeySignin() == false outright.
  // The prompt for this page asked for passkeys. The code says otherwise, and
  // the code wins — this asserts the page kept saying so.
  expect(text, 'passkey sign-in is not implemented and must be disclaimed').toMatch(
    /a passkey cannot complete a sign-in/i,
  )
  expect(text, 'nor may it be claimed anywhere on the page').not.toMatch(
    /\b(sign in|log in|authenticate)\s+with\s+a?\s?passkey/i,
  )
  // SCIM provisions Users; there is no /Groups resource type.
  expect(text, 'SCIM groups are not implemented').toMatch(/Groups are\s+not implemented/)
})

test('a reader is told where to send a vulnerability', () => {
  const text = words()
  const html = read('trust.html')
  expect(text, 'the address').toContain('security@hanzo.ai')
  expect(html, 'as a mailto, not just as prose').toContain('mailto:security@hanzo.ai')
  expect(html, 'and the RFC 9116 location a scanner reads instead').toContain('/.well-known/security.txt')
  expect(html, 'the mechanisms in more detail').toContain('/security')
  expect(html, 'and one door for an enterprise conversation').toContain('/contact-sales')
})

test('the file a scanner asks for is in the export, not the fallback', () => {
  // The lesson `scripts/wellknown.mjs` exists for: a static export behind a SPA
  // fallback answers EVERY path with index.html, so a missing file returns 200
  // with HTML and looks fine to anything checking a status code. The page links
  // this address; the bytes have to be at it.
  expect(read('.well-known/security.txt')).toMatch(/^\s*Contact:\s*mailto:security@hanzo\.ai/m)
})

test('the banned register never gets in', () => {
  // Security copy is the worst offender for abstraction. These are the words
  // that describe a feeling instead of a mechanism, and every one of them was
  // in the first draft of some page in this repo.
  const banned = [
    'seamless', 'robust', 'enterprise-grade', 'military-grade', 'bank-grade',
    'peace of mind', 'unlock', 'empower', 'leverage', 'best-in-class',
    'world-class', 'cutting-edge', 'state-of-the-art', 'battle-tested',
    'iron-clad', 'ironclad', 'bulletproof', 'unbreakable', 'uncompromising',
  ]
  const lower = words().toLowerCase()
  const found = banned.filter((w) => lower.includes(w))
  expect(found, `abstraction in place of a mechanism: ${found.join(', ')}`).toEqual([])
})

test('/soc2 forwards to /trust and asserts nothing on the way', async ({ browser }) => {
  // People type this. It must not be a page that implies a report exists — and
  // the safest page is the one carrying no claim at all, forwarding to the
  // single place the position is stated.
  //
  // Asserted by FOLLOWING it, not by reading the markup. `_redirect` navigates
  // from an effect, so the target is compiled into a JS chunk and appears
  // nowhere in the exported HTML — a `toContain('/trust')` over soc2.html fails
  // against a redirect that works perfectly, and would have been "fixed" by
  // weakening it into a test of nothing.
  const html = read('soc2.html')
  expect(html, 'the page exists as its own file, not as a SPA fallback').toContain('<html')
  expect(html, 'and claims nothing itself').not.toMatch(/\bSOC ?2 (Type|report|certified|compliant)/i)

  const server = await serveExport()
  const tab = await browser.newPage()
  try {
    await tab.goto(server.url + '/soc2', { waitUntil: 'load' })
    await tab.waitForURL('**/trust', { timeout: 15_000 })
    expect(new URL(tab.url()).pathname, 'it lands on the page that answers the question').toBe('/trust')
  } finally {
    await tab.close()
    await server.close()
  }
})
