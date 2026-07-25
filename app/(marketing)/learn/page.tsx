'use client'

import { GraduationCap, Rocket, Terminal, Code2, Boxes, Bot, Waypoints, FileText } from 'lucide-react'
import { Page, PageHero, Section, CardGrid, type CardItem } from '@/components/marketing/page-kit'

const START: CardItem[] = [
  {
    icon: Rocket,
    title: 'Getting started',
    description: 'Install, authenticate, and make your first call. The shortest path from nothing to a working request.',
    href: 'https://docs.hanzo.ai/docs/getting-started',
  },
  {
    icon: Terminal,
    title: 'CLI',
    description: 'Drive the platform from your terminal — projects, deploys, keys and logs.',
    href: 'https://docs.hanzo.ai/docs/cli',
  },
  {
    icon: Code2,
    title: 'API reference',
    description: 'Every endpoint, parameter and response shape.',
    href: 'https://docs.hanzo.ai/docs/api',
  },
]

const BUILD: CardItem[] = [
  {
    icon: Bot,
    title: 'Agents',
    description: 'Define an agent once and run it from chat, the API, or your own application.',
    href: 'https://docs.hanzo.ai/docs/agents',
  },
  {
    icon: Waypoints,
    title: 'MCP',
    description: 'Connect tools and data to models over the Model Context Protocol.',
    href: 'https://docs.hanzo.ai/docs/mcp',
  },
  {
    icon: Boxes,
    title: 'Open-source templates',
    description: 'Over a thousand applications you can deploy in one click and then edit.',
    href: 'https://oss.hanzo.ai/',
  },
]

export default function LearnPage() {
  return (
    <Page>
      <PageHero
        eyebrow="Learn"
        icon={GraduationCap}
        title="Learn Hanzo"
        lede="Start with a working request, then go as deep as you need. Everything here is part of the documentation — this page is the map."
      />

      <Section title="Start here">
        <CardGrid items={START} columns={3} />
      </Section>

      <Section title="Go further">
        <CardGrid items={BUILD} columns={3} />
      </Section>

      <Section title="Read the thinking">
        <CardGrid
          columns={2}
          items={[
            {
              icon: FileText,
              title: 'Research papers',
              description: 'The reasoning behind the architecture, published in full.',
              href: '/research',
            },
            {
              icon: Code2,
              title: 'Source',
              description: 'The platform is open source — read it, run it, change it.',
              href: 'https://github.com/hanzoai',
            },
          ]}
        />
      </Section>
    </Page>
  )
}
