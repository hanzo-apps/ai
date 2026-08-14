'use client'

import {
  Sparkles,
  Wand2,
  Code2,
  Rocket,
  Cloud,
  Database,
  ShieldCheck,
  Bot,
  KeyRound,
  Zap,
} from 'lucide-react'
import { ProductLanding } from '@/components/product/ProductLanding'
import { ProductFooter } from '@/components/products/ProductFooter'
import { MODELS_PHRASE } from '@/lib/data/model-count'

const APP = 'https://hanzo.app'
const DOCS = 'https://docs.hanzo.ai'
const GITHUB = 'https://github.com/hanzoai/app'

export default function AppLanding() {
  return (
    <>
      <ProductLanding
        badge="Hanzo App · AI app builder"
        badgeIcon={Sparkles}
        title="From a prompt to a shipped app"
        lede="Describe the app or website you want in plain language and Hanzo builds it — generating the UI, database schema, auth, and API, then refining with you in a live editor as you chat. One click ships it to a real URL on Hanzo Cloud, with the database, auth, AI, and storage already wired in. Not a mockup — a running app."
        ctas={[
          { label: 'Start building', href: APP, icon: Rocket },
          { label: 'Read the docs', href: DOCS },
          { label: 'View on GitHub', href: GITHUB },
        ]}
        note={{ icon: Cloud, text: 'Open source (MIT). Build in your browser and deploy on Hanzo Cloud, or self-host anywhere.' }}
        what={{
          eyebrow: 'What is Hanzo App',
          title: 'Describe it, refine it, ship it',
          sub: 'A sentence becomes a running app: schema, pages, sign-in and API. Then you keep talking to it, or open the editor and change the code yourself — the thing previewing is the thing that deploys.',
          pillars: [
            {
              icon: Wand2,
              title: 'Prompt to app',
              body: 'Type what you want to build in plain English — or import an existing GitHub repo — and Hanzo generates the UI, database schema, auth, and API to match.',
            },
            {
              icon: Code2,
              title: 'Refine in a live editor',
              body: 'Keep chatting to change anything, or edit the code directly in an in-browser editor with live preview. What you see running is the app you ship.',
            },
            {
              icon: Rocket,
              title: 'Ship on Hanzo Cloud',
              body: 'One click deploys to a live URL with your database, auth, AI, and storage already running — no Dockerfile and no pipeline to wire up.',
            },
          ],
        }}
        features={{
          eyebrow: 'Wired in',
          title: 'More than a UI — a full app on Hanzo Cloud',
          items: [
            { icon: Cloud, title: 'Deploy to a live URL', body: 'One click ships your app to real infrastructure on Hanzo Cloud — your-app.hanzo.app — with no Dockerfile or pipeline to set up.' },
            { icon: Database, title: 'Database, built in', body: 'Every app gets Hanzo Base — an embedded datastore with realtime queries and a schema generated from your prompt.' },
            { icon: ShieldCheck, title: 'Auth, built in', body: 'Sign-in arrives wired to Hanzo IAM over OIDC, with sessions and org-scoped access already in place. Nothing here stores a password, because nothing here hosts identity.' },
            { icon: Bot, title: 'AI, built in', body: `Call ${MODELS_PHRASE} — Zen alongside Anthropic, OpenAI, Google, and Mistral — from your app through one gateway.` },
            { icon: KeyRound, title: 'Secrets and files', body: 'An API key goes to Hanzo KMS and is read from there, so it is never a string in your source. Uploads go to object storage on the same account.' },
            { icon: Zap, title: 'Server logic', body: 'The parts that cannot run in a browser run as functions the platform deploys and routes for you. There is nothing to configure until you want to.' },
          ],
        }}
        finalCta={{
          icon: Rocket,
          title: 'Ship your first app today',
          sub: 'Describe it, watch it come up, then change the parts that are wrong. Deploying is one click, and the URL is real.',
          buttons: [
            { label: 'Open the builder', href: APP, icon: Rocket },
            { label: 'Read the docs', href: DOCS },
            { label: 'GitHub', href: GITHUB },
          ],
        }}
      />
      <ProductFooter slug="app" name="App" />
    </>
  )
}
