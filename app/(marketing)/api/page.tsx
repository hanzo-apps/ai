'use client'

import { Code2, MessageSquare, Boxes, Binary, Waypoints, ShieldCheck } from 'lucide-react'
import { Page, PageHero, Section, CardGrid, Prose, type CardItem } from '@/components/marketing/page-kit'

const ENDPOINTS: CardItem[] = [
  {
    title: '/v1/chat/completions',
    meta: 'POST',
    description:
      'Chat completions across every model on the platform, streaming or buffered. OpenAI-compatible, so existing clients work by changing the base URL.',
  },
  {
    title: '/v1/models',
    meta: 'GET',
    description: 'The models available to your organization, with their identifiers and capabilities.',
  },
  {
    title: '/v1/embeddings',
    meta: 'POST',
    description: 'Vector embeddings for search, retrieval and clustering.',
  },
  {
    title: '/v1/agents',
    meta: 'GET · POST',
    description: 'The canonical agent registry — define an agent once and run it from any surface.',
  },
]

const CONCEPTS: CardItem[] = [
  {
    icon: ShieldCheck,
    title: 'One key, one bill',
    description:
      'A single API key authenticates every endpoint. Usage meters to your organization, so spend is attributed in one place rather than per service.',
  },
  {
    icon: Waypoints,
    title: 'OpenAI-compatible',
    description:
      'The chat and embeddings surfaces follow the OpenAI request and response shapes. Point an existing SDK at api.hanzo.ai and it works.',
  },
  {
    icon: Binary,
    title: 'Open source',
    description:
      'The gateway and the services behind it are open source. Run the same API yourself, or use the hosted one.',
  },
]

export default function ApiPage() {
  return (
    <Page>
      <PageHero
        eyebrow="API"
        icon={Code2}
        title="One API for models, agents and tools"
        lede="Every Hanzo capability is reachable from a single base URL with a single key. If you have used the OpenAI API, you already know most of this."
      />

      <Section title="Base URL">
        <Prose>
          <p>
            <strong>https://api.hanzo.ai/v1</strong>
          </p>
          <p>
            Authenticate with a bearer token: <strong>Authorization: Bearer &lt;your key&gt;</strong>. Keys are created
            and revoked in the <a href="https://console.hanzo.ai/keys">console</a>.
          </p>
        </Prose>
      </Section>

      <Section title="Core endpoints" lede="The full reference, including parameters and error shapes, lives in the docs.">
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
              description: 'Every endpoint, parameter and response.',
              href: 'https://docs.hanzo.ai/docs/api',
            },
            {
              icon: Boxes,
              title: 'Getting started',
              description: 'From an empty project to a first call.',
              href: 'https://docs.hanzo.ai/docs/getting-started',
            },
            {
              icon: Code2,
              title: 'CLI',
              description: 'The same API from your terminal.',
              href: 'https://docs.hanzo.ai/docs/cli',
            },
          ]}
        />
      </Section>
    </Page>
  )
}
