'use client'

import { ShieldCheck } from 'lucide-react'
import { Page, PageHero, Section, Prose, CardGrid, Cta, type CardItem } from '@/components/marketing/page-kit'

/**
 * The trust page.
 *
 * Every card below names a mechanism that was read in the source before it was
 * written here, and nothing is on this page that could not be pointed at.
 *
 * It leads with what a reviewer can GET — a questionnaire answered, a working
 * session, the control detail, a framework scoped to their engagement — because
 * that is the useful half and it is all available. The frameworks we do not hold
 * are stated too, once, in a section that says so plainly. Opening with the
 * denial made the page argue against itself: a reviewer establishes that fact in
 * one email either way, so it costs nothing to say and everything to lead with.
 *
 * The banned claim is not a word, it is a shape: anything that lets a reader
 * conclude a report exists. `e2e/gates/trust-copy.spec.ts` holds the page to
 * that against the rendered DOM, because this is the page where a claim that
 * drifts is a claim somebody relied on.
 */

const ACCESS: CardItem[] = [
  {
    title: 'Signing in is a redirect, not a form',
    description:
      'An application hands you to Hanzo IAM and gets back a code. A client with no registered secret — anything running in a browser or on a laptop — must present a PKCE challenge, and only S256 is accepted. Offer the plain method and the request is refused rather than quietly downgraded.',
  },
  {
    title: 'Passwords are hashed, and the digest says how',
    description:
      'New passwords are argon2id at 64 MiB and two passes, with a random salt. The cost parameters ride inside the stored digest, so raising them later does not lock anyone out. Verification reads the scheme off the row instead of assuming one, and an unrecognised scheme fails closed.',
  },
  {
    title: 'A token is trusted for what it cryptographically is',
    description:
      'Bearer tokens verify against a closed list of signing algorithms: RSA, the NIST curves, and ML-DSA-65. HMAC and alg:none are absent from it, and the key lookup resolves a key id to a public key held by the platform — so there is no symmetric path for a forged header to select.',
  },
  {
    title: 'A replayed refresh token ends the whole chain',
    description:
      'Refresh tokens are single-use. Spending one marks it and mints a successor in the same family, and the spent row stays behind as a tripwire. Present it a second time and every token in that family is deleted, including the successor that still worked — because a replay means the token left your hands.',
  },
  {
    title: 'Changing a second factor signs out everywhere else',
    description:
      'A second factor is an authenticator app, or a code by SMS or email, with recovery codes shown once and stored hashed. Adding one, removing one, or changing which is preferred drops every other session and clears the remember-me window. A session that outlives the change is the same as not having made it.',
  },
  {
    title: 'Your directory creates and removes the accounts',
    description:
      'SCIM 2.0 provisions users from your identity provider — create, update, replace, deactivate, delete, with filter and patch. Someone you remove from your directory loses their Hanzo account by that act rather than by somebody remembering. Groups are not implemented, so role assignment is not driven from your IdP today.',
  },
]

const REACH: CardItem[] = [
  {
    title: 'Access is a grant at a place',
    description:
      'A resource has a path: organization, then workspace, then project, then whatever sits under those. A grant covers a path and everything below it. One check asks whether some grant the caller holds covers the target and admits the verb — and org-wide access, one workspace, an invite-only project, and a narrowed credential handed to an agent all fall out of that with no special case for any of them.',
  },
  {
    title: 'The prefix test walks segments, not characters',
    description:
      'A grant on acme/prod does not cover acme/production. The comparison is segment-wise, because a string prefix test there is a read across two tenants. An empty path covers nothing, so a scope that arrived missing or malformed denies rather than matching everything.',
  },
  {
    title: 'The decision travels, the grant set stays put',
    description:
      'The edge resolves the scope once and writes what the token proved. Nothing behind it asks a permission service, so a check is a function call with no network on the path — nothing to time out, nothing to fail open when it does.',
  },
]

const APART: CardItem[] = [
  {
    title: 'The edge deletes what a client claims to be',
    description:
      'Headers naming an organization, a user, an email, or a role are stripped at the gateway before a handler reads one, and identity is written back only from a verified token. The organization a caller asks to act in is honoured only where the signed membership already admits it; asking for one they are not in falls back to their own rather than through.',
  },
  {
    title: 'One organization, one file',
    description:
      'On Hanzo Base an organization’s data is its own SQLite file. Two organizations are two files, so a query cannot reach across them — there is no second file open to reach into. Where a master key is configured, each file is also opened under a key derived for that organization alone, which makes a leaked key worth one tenant instead of the estate.',
  },
]

const RECORD: CardItem[] = [
  {
    title: 'One row per request',
    description:
      'The trail records the organization and the user who acted, the address they came from, the method and the URI they called, the action, the request body with passwords masked, the status the server returned, and the time. Who did what, when, from where, and what the system answered.',
  },
  {
    title: 'The platform’s own actions cannot be authored',
    description:
      'Your systems can file their activity in the same trail. They cannot write our half of it. Rows recording a consent answer, or a credential issued or revoked, are reserved — the API refuses to create, correct or delete one. Evidence the subject of the evidence can write is not evidence.',
  },
  {
    title: 'Indexed for the questions that get asked',
    description:
      'Organization, user, action and time each carry an index. Everything one person did, or every time one action was taken, is a lookup rather than a walk through the whole trail — which is the difference between answering a reviewer and promising to.',
  },
]

const KEYS: CardItem[] = [
  {
    title: 'A tenant key is derived, not stored',
    description:
      'Each database gets its key from one master through HKDF-SHA256, bound to the namespace that owns it and to what it holds. It is a pure function of those inputs, so a file reopens after a restart with nothing kept beside it, and no two databases share a key. A master of the wrong length is an error, not a quiet fall back to no key.',
  },
  {
    title: 'A signing key is a handle',
    description:
      'The signing interface takes a key id and some bytes and gives back a signature. The implementations behind it reach AWS KMS, Google Cloud KMS, Azure Key Vault, and Zymbit modules. The private key is made inside the module and stays there, so there is no moment when it exists in our process to be logged, leaked, or written into a crash dump.',
  },
]

/**
 * What a reviewer can actually get, and how fast.
 *
 * Deliberately no framework names here. The copy gate refuses any sentence that
 * names one without denying we hold it, and that rule exists because a badge row
 * on /security once rendered four framework names with green checkmarks while the
 * qualifiers that made them honest sat in a field the markup never printed. A row
 * of logos is the shape of that defect, so this row offers artifacts instead —
 * every one of which we can send.
 */
const REQUEST: CardItem[] = [
  {
    title: 'A security questionnaire, answered',
    description:
      'Send the one your process uses — SIG, CAIQ, VSA, or your own spreadsheet. We answer it against the code, and where an answer is a mechanism rather than a yes, we point at the mechanism.',
  },
  {
    title: 'An architecture review',
    description:
      'A working session with the engineers who wrote it. Identity, tenancy, the audit trail, key custody — whichever part your reviewer wants to press on, in as much depth as they want to go.',
  },
  {
    title: 'The control detail behind this page',
    description:
      'Everything summarised below, at the level a reviewer needs: the algorithms, the parameters, the failure behaviour, and what happens at each boundary. Under NDA where your process requires one.',
  },
  {
    title: 'A framework scoped to your engagement',
    description:
      'Tell us what your process runs on and what your reviewer needs to see. We scope the work with you as part of the enterprise agreement rather than pointing at a checkmark.',
  },
]

export default function TrustPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Trust"
        icon={ShieldCheck}
        title="Security you can read"
        lede="How you get in, what a credential reaches, what gets written down, and where the keys live — each one a mechanism you can point at in the source. Ask for the detail your review needs and we will send it."
      />

      <Section
        title="What you can ask us for"
        lede="Most reviews want the same four things. All four are available now, and the first three come back the same week."
      >
        <CardGrid items={REQUEST} columns={2} />
      </Section>

      <Section title="Where we stand today">
        <Prose>
          <p>
            We run the controls those audits examine, and this page is the evidence — every mechanism below
            was read in the source before it was written here. Bring your questionnaire and we will answer it
            against the code rather than against a summary of it.
          </p>
          <p>
            On the frameworks themselves, plainly, because a security reviewer establishes this in one email
            and it should not cost you the email: Hanzo does not hold SOC 2, ISO 27001, or FedRAMP today.
            Formal certification is scoped per enterprise engagement — tell us which framework your process
            runs on and what your reviewer needs to see, and we will scope it with you.
          </p>
          <p>
            If a control you need is not on this page, ask. Where we have it we will show you the code, and
            where we do not you will get a straight answer the same day.
          </p>
        </Prose>
      </Section>

      <Section
        title="Getting in"
        lede="One service issues every credential. Hanzo IAM is the only thing that holds a password or runs a login, and nothing else in the stack has its own."
      >
        <CardGrid items={ACCESS} columns={2} />
      </Section>

      <Section
        title="What a credential reaches"
        lede="Naming a resource and authorizing it are separate questions. Containment names; grants authorize."
      >
        <CardGrid items={REACH} columns={3} />
      </Section>

      <Section
        title="Keeping organizations apart"
        lede="A tenancy boundary that only exists in a WHERE clause is one bug from being nothing."
      >
        <CardGrid items={APART} columns={2} />
      </Section>

      <Section
        title="What gets written down"
        lede="An audit trail is the one control a reviewer can test rather than take on faith, so it is worth saying exactly what is in it."
      >
        <CardGrid items={RECORD} columns={3} />
      </Section>

      <Section title="Keys" lede="Where a key comes from, and who is able to hold one.">
        <CardGrid items={KEYS} columns={2} />
      </Section>

      <Section
        title="Status, stated plainly"
        lede="So your reviewer can establish this here rather than by asking, and so nothing on this page can be relied on that should not be."
      >
        <Prose>
          <p>
            <strong>Frameworks.</strong> We do not hold SOC 2, ISO 27001, FedRAMP, PCI DSS, or HITRUST today,
            and this page mirrors no audit platform. Certification is scoped per engagement — the fourth card
            above is how that conversation starts.
          </p>
          <p>
            {/* No full stop after this label. The copy gate reads the page one
                SENTENCE at a time and requires the word FIPS to appear in one
                that also denies holding a validation — and `FIPS.` IS a
                sentence, so the term sat orphaned from its own denial one
                clause away, and the page failed a rule it was obeying. */}
            <strong>FIPS:</strong> our code implements published standards, ML-KEM and ML-DSA among them, but
            implementing a standard is not the same as holding a validation, and a 140-3 validation belongs to
            the vendor of a module rather than to us. Where your deployment needs validated modules, the
            signing interface already reaches AWS KMS, Google Cloud KMS, Azure Key Vault and Zymbit — ask and
            we will map yours.
          </p>
          <p>
            <strong>Passkeys.</strong> Passkey credentials can be stored and managed, but{' '}
            <strong>a passkey cannot complete a sign-in</strong> — the assertion ceremony is not in the build
            running today, so the login screen does not offer it, which is the only honest thing a login
            screen can do about a method the server cannot yet perform. Second factors that do work: an
            authenticator app, SMS, and email, with recovery codes.
          </p>
          <p>
            <strong>Availability.</strong> An uptime number is a contractual commitment, so ours lives in the
            agreement where it has consequences rather than on a marketing page where it does not. Ask for
            the number your agreement would carry and we will put it in writing.
          </p>
        </Prose>
      </Section>

      <Section title="Found something">
        <Prose>
          <p>
            Send it to <a href="mailto:security@hanzo.ai">security@hanzo.ai</a>. The same address is published
            at <a href="/.well-known/security.txt">/.well-known/security.txt</a> under RFC 9116, so a scanner
            finds it without reading this page. Tell us what you did and what came back; we do not need a
            proof-of-concept exploit to take a report seriously, and we will not threaten anyone who sends one
            in good faith.
          </p>
          <p>
            For the mechanisms in more detail — encryption, infrastructure, what an enterprise agreement adds
            — see <a href="/security">the security page</a>.
          </p>
        </Prose>
      </Section>

      <Section
        title="Bring us the hard questions"
        lede="Your questionnaire, your architecture review, your framework. We answer against the code, we move at the speed of your review, and you will always know which of those two you are getting."
      >
        <Cta href="/contact-sales">Request a review or an enterprise deployment</Cta>
      </Section>
    </Page>
  )
}
