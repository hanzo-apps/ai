import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"
import { ogImages, twitterImages } from '@/lib/constants/og'
import { cloudCategories, layerCount, spell } from '@/lib/data/cloud-primitives'

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
// A description is baked at BUILD time and read by scrapers months later, so it
// is the one place a model count cannot be kept true — the catalog's providers
// are switched on and off between builds. The page states the number where it
// can ask for it (see `useModelCount`); the metadata states the breadth without
// asserting an arithmetic it has no way to recheck.
//
// The LAYER count is a different kind of fact and is stated here, because it is
// settled at exactly the moment this string is written: the same build that
// bakes this description reads the catalog that decides how many there are. It
// is derived rather than typed for the same reason the headline is — a share
// card that says ten while the page shows nine is a lie nobody would notice.
const COUNT = spell(layerCount).toLowerCase()
const NAMES = cloudCategories.map((c) => c.title).join(', ')
const TITLE = `Hanzo Cloud — ${COUNT} integrated layers, one bill, no assembly tax`
const SUMMARY = `AI infrastructure, inference, data, and agents built into one platform. Every layer answers on one origin, to one key, against one balance — so the code that would hold ${COUNT} vendors together is code you never write. Run it managed, or run the same open-source image yourself.`

export const metadata: Metadata = {
  title: TITLE,
  description:
    `${spell(layerCount)} integrated layers — ${NAMES} — on one origin, one identity and one bill. The assembly tax is the accounts, keys, SDKs, invoices and glue code that stitching ${COUNT} vendors together costs you every year; integrated means those joins are already made. Run it managed on Hanzo Cloud, or self-host the same open-source image on your own Kubernetes.`,
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
