'use client'

import { Code2, MessageSquare, Boxes, Binary, Waypoints, ShieldCheck } from 'lucide-react'
import { Page, PageHero, Section, CardGrid, Prose, type CardItem } from '@/components/marketing/page-kit'

const ENDPOINTS: CardItem[] = [
  {
    title: '/v1/chat/completions',
    meta: 'POST',
    description:
      'A completion from any model your organization can reach, streamed or buffered. Model ids come from the catalog, so the list is a request rather than a page in the docs.',
  },
  {
    title: '/v1/models',
    meta: 'GET',
    description:
      'What your organization may call right now — the models we serve plus any provider account you have connected, with their identifiers.',
  },
  {
    title: '/v1/embeddings',
    meta: 'POST',
    description: 'Vectors for search, retrieval and clustering, from the same key and the same bill as generation.',
  },
  {
    title: '/v1/agents',
    meta: 'GET · POST',
    description:
      'Define an agent once, run it by reference, and read its runs afterwards. The definition lives here, so every surface that runs it runs the same one.',
  },
  {
    title: '/v1/billing/balance · /v1/billing/usage',
    meta: 'GET',
    description:
      'What is left, and what was spent. Usage is recorded per call and attributed to the organization on the token, so a bill can be traced back to the request that caused it.',
  },
  {
    title: '/v1/tools',
    meta: 'GET',
    description:
      'The tools your organization can call. An agent picks from this list, and so can you — it is the same catalog either way.',
  },
]

const CONCEPTS: CardItem[] = [
  {
    icon: ShieldCheck,
    title: 'One key, one bill',
    description:
      'A single key authenticates every endpoint, and usage meters to the organization it belongs to. Spend is attributed in one place instead of once per service.',
  },
  {
    icon: Waypoints,
    title: 'Identity is the gateway’s to state',
    description:
      'Every request passes a gateway that throws away the identity headers a client sent and writes them again from the verified token. Nothing downstream has to wonder whether an org id came from a token or from a curl flag.',
  },
  {
    icon: Binary,
    title: 'Generated, not hand-written',
    description:
      'The clients come from the OpenAPI document this API serves, and their method names are its operation ids. A client is checkable against a release rather than against somebody’s memory.',
  },
]

export default function ApiPage() {
  return (
    <Page>
      <PageHero
        eyebrow="API"
        icon={Code2}
        title="One API for models, agents and tools"
        lede="Every Hanzo capability answers under one base URL, behind one key. There is no per-service host to look up and no second version to migrate to later."
      />

      <Section title="Base URL">
        <Prose>
          <p>
            <strong>https://api.hanzo.ai/v1</strong>
          </p>
          <p>
            Authenticate with a bearer token: <strong>Authorization: Bearer &lt;your key&gt;</strong>. Keys are created
            and revoked in the <a href="https://console.hanzo.ai/keys">console</a>, and revoking one there is what
            stops it working.
          </p>
          <p>
            Every route lives under <strong>/v1</strong>, and every service answers on the same host — there is no
            second base URL to configure and no v2 waiting to break the first one. Rate limits are applied per caller
            and across the edge as a whole; a rejected request comes back as a <strong>429</strong> with a
            <strong> Retry-After</strong> rather than a dropped connection.
          </p>
        </Prose>
      </Section>

      <Section title="Core endpoints" lede="A few of the ones people reach for first. Every parameter and error shape is in the reference.">
        <CardGrid items={ENDPOINTS} columns={2} />
      </Section>

      <Section title="How it fits together">
        <CardGrid items={CONCEPTS} columns={3} />
      </Section>

      <Section title="Next">
        <CardGrid
          columns={3}
          items={[
            {
              icon: MessageSquare,
              title: 'API reference',
              description: 'Every endpoint, parameter and response shape.',
              href: 'https://docs.hanzo.ai/docs/api',
            },
            {
              icon: Boxes,
              title: 'Getting started',
              description: 'An empty project to a first call that works.',
              href: 'https://docs.hanzo.ai/docs/getting-started',
            },
            {
              icon: Code2,
              title: 'CLI',
              description: 'The same API as a command tree, generated from the same document.',
              href: 'https://docs.hanzo.ai/docs/services/platform/getting-started/cli',
            },
          ]}
        />
      </Section>
    </Page>
  )
}
