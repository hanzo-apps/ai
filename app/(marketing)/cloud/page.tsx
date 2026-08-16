import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"
import { ogImages, twitterImages } from '@/lib/constants/og'

// The umbrella "Explore Cloud" landing and the single canonical /cloud route —
// the CloudLanding served under the shared (marketing) site header + footer,
// and promoted to the cloud.hanzo.ai root via /overview in Dockerfile. This is
// the cloud SITE door, not a single product page, so it stays the umbrella
// rather than a ProductLanding. This server component owns the per-page SEO
// below.
//
// One title, three places. This page is cloud.hanzo.ai's ROOT (Dockerfile
// `SITE_ROOT=cloud` copies cloud.html over index.html), and it declared only an
// openGraph block — so `twitter:title` fell through to the ROOT layout and a
// share of this host announced two different products depending on which
// scraper read it. A `twitter` block that restates the page title is not
// duplication: it is what stops the inherited one from speaking for this page.
//
// IT SELLS THE ABSTRACTION, NOT THE INVENTORY. The description used to count
// the catalog's categories and argue an assembly tax, which was the page's
// argument at the time. The page argues the abstraction now — put a model, an
// agent, a database and a production application somewhere without assembling
// a hyperscaler out of parts first — so the card says that. A share card that
// sells a section the page no longer has is a lie nobody would notice.
//
// NO NUMBER IS BAKED HERE. A description is written at BUILD time and read by
// scrapers months later, which makes it the one place a count cannot be kept
// true: the served catalog's providers are switched on and off between builds.
// The page states its one number where it can ASK for it (`useModelCount`), and
// the metadata states the breadth without asserting an arithmetic it has no way
// to recheck.
const TITLE = 'Hanzo Cloud — the AI-native cloud'
const SUMMARY =
  'Run models, agents, applications, data and infrastructure through one operating plane. Kubernetes-native, fully observable, open source — on Hanzo infrastructure or infrastructure you control.'

export const metadata: Metadata = {
  title: TITLE,
  description:
    'The AI-native cloud: models and agents, functions, containers, sandboxes, machines, GPUs and Kubernetes, every data primitive an AI application needs, networking, identity and one trace end to end. One API, one organization, one usage ledger — from code to production without assembling the cloud first. Run it managed on Hanzo Cloud, attach your own account or cluster, or self-host the same open-source image.',
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
