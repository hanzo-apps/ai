'use client'

import { ShieldCheck } from 'lucide-react'
import { Page, PageHero, Section, Prose, CardGrid, Cta, type CardItem } from '@/components/marketing/page-kit'

/**
 * The trust page.
 *
 * Every card below names a mechanism that was read in the source before it was
 * written here, and nothing is on this page that could not be pointed at. The
 * controls a reviewer asks about are the ones we have; the certifications they
 * ask for are the ones we do not, and both are said in the same voice.
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

export default function TrustPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Trust"
        icon={ShieldCheck}
        title="The controls, not a badge"
        lede="Hanzo does not hold SOC 2, ISO 27001, or FedRAMP. There is no report behind this page. What there is instead is the code — how you get in, what a credential reaches, what gets written down, and where the keys live."
      />

      <Section title="Where we stand">
        <Prose>
          <p>
            A page like this usually opens with logos. Ours cannot, because we have not earned them, and a
            security reviewer finds that out in one email. So the argument here is the other one: we run the
            controls those audits examine, and you can read most of them.
          </p>
          <p>
            Formal certification is scoped per enterprise engagement. Tell us which framework your process
            requires and what your reviewer needs to see, and we will tell you what it takes. We would rather
            have that conversation than put a checkmark next to a word.
          </p>
          <p>
            Everything below was read in the source before it was written here. If a control you need is not
            on this page, that is because we could not point at it, and the honest answer is to ask.
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

      <Section title="What we do not claim">
        <Prose>
          <p>
            <strong>No certification.</strong> We do not hold SOC 2, ISO 27001, FedRAMP, PCI DSS, or HITRUST.
            There is no report, and there is no audit platform behind this page mirroring one.
          </p>
          <p>
            <strong>No FIPS validation.</strong> Our code implements published standards, ML-KEM and ML-DSA
            among them. Implementing a standard is not holding a certificate, and a 140-3 validation belongs
            to the vendor of a module, not to us.
          </p>
          <p>
            <strong>No passkey sign-in.</strong> Passkey credentials can be stored and managed, but nothing
            challenges one, so a passkey cannot complete a sign-in on the build running today. The login
            screen does not offer it — which is the only honest thing a login screen can do about a method
            the server cannot perform.
          </p>
          <p>
            <strong>No availability figure here.</strong> An uptime number is a contractual commitment. Ours
            lives in the agreement, where it has consequences, rather than on a marketing page where it does
            not.
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
        title="Ask us the hard questions"
        lede="Bring your questionnaire, your architecture review, and the framework your process runs on. We will answer what we can and say so where we cannot."
      >
        <Cta href="/contact-sales">Talk to us about an enterprise deployment</Cta>
      </Section>
    </Page>
  )
}
