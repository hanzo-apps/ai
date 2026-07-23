'use client'

import {
  Database,
  Cloud,
  Fingerprint,
  Radio,
  FileStack,
  ShieldCheck,
  Boxes,
  Server,
  Zap,
  Rocket,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'

const DOCS = 'https://docs.hanzo.ai/docs/base'
const GITHUB = 'https://github.com/hanzoai/base'
const CONSOLE = 'https://console.hanzo.ai'

export default function BasePage() {
  return (
    <>
      <ProductLanding
        badge="Hanzo Base · App backend"
        badgeIcon={Database}
        title="The backend in one file"
        lede="Everything your app or business needs on the backend — database, auth, file storage, realtime, and server-side logic — in one embedded, deployable file, with Hanzo IAM wired in natively. Multi-tenant by design: every org gets its own encrypted database, streamed continuously to object storage, so one file scales from your laptop to a global fleet."
        ctas={[
          { label: 'Start free', href: CONSOLE, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (MIT). Runs as one binary — self-host or deploy managed on Hanzo Cloud.' }}
        what={{
          eyebrow: 'What is Hanzo Base',
          title: 'Everything an app backend needs, embedded',
          sub: 'Stop stitching together a database, auth, storage, and realtime for every project. Base ships them as one cohesive, multi-tenant backend that grows with you — from a single file on your laptop to a replicated production fleet, with no rewrite.',
          pillars: [
            {
              icon: Database,
              title: 'Database',
              body: 'A real database with schema, migrations, and a typed REST API generated for you. Per-tenant SQLite by default — instant and isolated per org — with Postgres when you need multi-primary writes.',
            },
            {
              icon: Fingerprint,
              title: 'Auth via Hanzo IAM',
              body: 'Users, sessions, and OAuth handled by Hanzo IAM — one identity across every Hanzo surface, with no bespoke auth to build or maintain.',
            },
            {
              icon: Radio,
              title: 'Files & realtime',
              body: 'Object storage with access rules and live subscriptions over websockets — the pieces every app reinvents, built in from day one.',
            },
          ],
        }}
        features={{
          eyebrow: 'Capabilities',
          title: 'Batteries included, nothing hidden',
          items: [
            { icon: Zap, title: 'Instant REST API', body: 'Every collection gets a typed CRUD API and an admin UI the moment you define it.' },
            { icon: Radio, title: 'Realtime subscriptions', body: 'Subscribe to records over websockets and push changes to clients without polling.' },
            { icon: ShieldCheck, title: 'Rules-based access', body: 'Per-collection read/write rules evaluated on the edge of every request.' },
            { icon: FileStack, title: 'File storage', body: 'Upload, transform, and serve files under the same access rules as your data.' },
            { icon: Server, title: 'Scales horizontally', body: 'Every org runs its own encrypted database with continuous replication to object storage — durability, point-in-time restore, and read replicas from a laptop to a global fleet. Postgres for multi-primary writes.' },
            { icon: Boxes, title: 'IAM-native SSO', body: 'Sign-in, org and tenant scoping, and audit come from Hanzo IAM out of the box.' },
          ],
        }}
        finalCta={{
          icon: Database,
          title: 'Stand up your backend in minutes',
          sub: 'Deploy Base on Hanzo Cloud, or run the single binary anywhere you like.',
          buttons: [
            { label: 'Deploy on Hanzo Cloud', href: CONSOLE, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="base" name="Base" />
    </>
  )
}
