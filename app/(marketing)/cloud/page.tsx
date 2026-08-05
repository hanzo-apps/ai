import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"
import { MODELS_PHRASE } from '@/lib/data/model-count'
import { ogImages, twitterImages } from '@/lib/constants/og'

// The umbrella "Explore Cloud" landing and the single canonical /cloud route —
// the CloudLanding served under the shared (marketing) site header +
// footer, and promoted to the cloud.hanzo.ai root via /overview in
// Dockerfile. This is the cloud SITE door,
// not a single product page, so it stays the umbrella rather than a
// ProductLanding. This server component owns the per-page SEO below.

// One title, three places. This page is cloud.hanzo.ai's ROOT (Dockerfile
// `SITE_ROOT=cloud` copies cloud.html over index.html), and it declared only an
// openGraph block — so `twitter:title` fell through to the ROOT layout and a
// share of this host announced two different products depending on which
// scraper read it. A `twitter` block that restates the page title is not
// duplication: it is what stops the inherited one from speaking for this page.
const TITLE = "Hanzo Cloud — the infrastructure behind your agents and apps"
const SUMMARY = `One cloud to provision, secure, and bill your AI stack — ${MODELS_PHRASE}, Base backends, IAM, KMS, and vector + full-text search, metered per organization. Self-host the open-source components or run it managed.`

export const metadata: Metadata = {
  title: TITLE,
  description:
    `Provision, deploy, secure, and bill everything your AI agents and apps run on: one API for ${MODELS_PHRASE}, Base app backends, IAM and KMS, and vector plus full-text search — metered pay-as-you-go and billed per organization. Run it managed on Hanzo Cloud, or self-host the open-source components on your own Kubernetes.`,
  openGraph: {
    title: TITLE,
    description: SUMMARY,
    url: "https://cloud.hanzo.ai",
    siteName: "Hanzo Cloud",
    type: "website",
    images: ogImages(TITLE),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SUMMARY,
    images: twitterImages,
  },
}

export default function CloudPage() {
  return <CloudLanding />
}
