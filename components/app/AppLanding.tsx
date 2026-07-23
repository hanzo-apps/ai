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
          sub: 'Hanzo turns a plain-language prompt into a real, running web app — then hands you a live editor to shape it and a one-click deploy to put it online. From a sentence to a shipped app, without leaving the browser.',
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
            { icon: ShieldCheck, title: 'Auth, built in', body: 'Sign-in ships wired to Hanzo IAM — OIDC, sessions, and org-scoped access with zero config.' },
            { icon: Bot, title: 'AI, built in', body: 'Call 400+ models — Zen alongside Anthropic, OpenAI, Google, and Mistral — from your app through one gateway.' },
            { icon: KeyRound, title: 'Secrets & storage', body: 'API keys land in Hanzo KMS, never in your code, and files go to S3-compatible object storage.' },
            { icon: Zap, title: 'Functions & edge', body: 'Server logic runs as serverless functions at the edge, scaled and routed by the platform automatically.' },
          ],
        }}
        finalCta={{
          icon: Rocket,
          title: 'Ship your first app today',
          sub: 'Describe what you want to build and watch it come to life — then deploy it live on Hanzo Cloud in one click.',
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
