'use client'

import {
  Boxes,
  Fingerprint,
  KeyRound,
  Lock,
  Network,
  ScrollText,
  ShieldCheck,
  Waypoints,
} from 'lucide-react'
import { YStack, Text } from '@hanzo/gui'
import { CardGrid, Cta, Section, type CardItem } from '@/components/marketing/page-kit'

/**
 * Security, on the front page.
 *
 * An agentic company runs work that no person watched start. That makes the
 * governing question not "is the platform secure" but "whose authority did that
 * action run under" — so the section leads with identity and answers it with
 * mechanisms rather than posture.
 *
 * EVERY CARD BELOW IS ALREADY ON /trust OR /security, in those pages' words.
 * That is a rule, not a convenience. Both pages were written against the source
 * — each mechanism was read in the code before it was written there — and both
 * are held to what they say (`e2e/gates/trust-copy.spec.ts` checks /trust
 * against the rendered DOM). A landing page that re-derives a security claim in
 * fresher language is a second claim that starts drifting the day it ships, and
 * the drift always runs one direction: toward stronger than the code.
 *
 * So this section may SELECT from those pages and compress; it may not add. If
 * a claim here is wrong, it is wrong there too, and both move together.
 *
 * NO FRAMEWORK IS NAMED, deliberately. `ci/bin/certclaims` fails any line that
 * names one beside a certificate word or a hedge, and the failure it exists to
 * catch is a real one: four framework names once rendered on /security with
 * green checkmarks while the qualifiers that made them honest sat in a field the
 * markup never printed. The position on frameworks has exactly one home, /trust,
 * and this page links there rather than restating it. Two pages answering that
 * question is how the qualifier got lost the first time.
 */
const MECHANISMS: CardItem[] = [
  {
    title: 'One service issues every credential',
    icon: Fingerprint,
    description:
      'Hanzo IAM is the only thing that holds a password or runs a login, and nothing else in the stack has its own. An application hands you to IAM and gets back a code. A client with no registered secret — anything running in a browser or on a laptop — must present a PKCE challenge, and only S256 is accepted.',
  },
  {
    title: 'A token is trusted for what it cryptographically is',
    icon: ShieldCheck,
    description:
      'Bearer tokens verify against a closed list of signing algorithms: RSA, the NIST curves, and ML-DSA-65. HMAC and alg:none are absent from it. A refresh token is single-use, and presenting a spent one deletes its whole family rather than the one token.',
  },
  {
    title: 'Authorization is a grant at a place',
    icon: Waypoints,
    description:
      'A resource has a path: organization, then workspace, then project. One check asks whether some grant the caller holds covers the path and admits the verb. A grant is matched exactly rather than by prefix, so acme/prod does not cover acme/production, and the decision is a function call rather than a service that can be down.',
  },
  {
    title: 'A key is derived, not stored',
    icon: KeyRound,
    description:
      'Each database takes its key from one master through HKDF-SHA256, bound to the namespace that owns it, so no two databases share a key and a file reopens after a restart with nothing kept beside it. A master of the wrong length is an error, not a quiet fall back to no key. Secrets never reach a manifest — services fetch them from Hanzo KMS at boot.',
  },
  {
    title: 'One organization, one file',
    icon: Boxes,
    description:
      'A tenancy boundary that only exists in a WHERE clause is one bug from being nothing. On Hanzo Base an organization’s data is its own database file, opened under its own derived key, so a query cannot reach across two. Workloads sit in hardware-virtualised machines, one tenant to a boundary.',
  },
  {
    title: 'The edge deletes what a caller claims to be',
    icon: Network,
    description:
      'Headers naming an organization, a user, an email or a role are stripped at the gateway before a handler reads one, and identity is written back only from a verified token. Inside the cluster, services reach each other over a binary protocol rather than the public internet.',
  },
  {
    title: 'One row per request',
    icon: ScrollText,
    description:
      'The trail records the organization and the user who acted, the address they came from, the method and the URI they called, the action, the status the server returned, and the time. Rows recording a consent answer, or a credential issued or revoked, are reserved: the API refuses to create, correct or delete one. Evidence the subject of the evidence can write is not evidence.',
  },
  {
    title: 'Encrypted at rest, and on the wire',
    icon: Lock,
    description:
      'At rest, every tenant’s data sits under a key derived for that tenant alone and sealed with AES-256-GCM, and backups are encrypted with age. In transit it is TLS 1.3, and the edge offers hybrid ML-KEM-768 key exchange, so traffic captured today is not readable by a quantum computer later.',
  },
]

export default function Security() {
  return (
    <Section
      title="Every agent has an identity."
      lede="Every action is authorized. Every secret is scoped. Every execution is isolated. Every approval is attributable. Every change is auditable."
    >
      <CardGrid items={MECHANISMS} columns={2} />
      <YStack marginTop="$5" gap="$3">
        <Text render="p" maxWidth={672} fontSize="$3" color="$mutedForeground">
          Identity, authorization, KMS, zero trust, private networking, policy and audit are part of
          the operating system, not integrations added afterward. Built for regulated, private and
          sovereign environments.
        </Text>
        <Cta href="/security">Read the mechanisms</Cta>
        <Cta href="/trust">Check them yourself</Cta>
      </YStack>
    </Section>
  )
}
