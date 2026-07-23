import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"

// The umbrella "Explore Cloud" landing — the same CloudLanding that roots
// cloud.hanzo.ai (see app/cloud-site/page.tsx), served here under hanzo.ai's
// shared (marketing) LandingNav + LandingFooter. This is the cloud SITE door,
// not a single product page, so it stays the umbrella rather than a
// ProductLanding. This server component owns the per-page SEO below.

export const metadata: Metadata = {
  title: "Hanzo Cloud — the infrastructure behind your agents and apps",
  description:
    "Provision, deploy, secure, and bill everything your AI agents and apps run on: one API for 400+ models, Base app backends, IAM and KMS, and vector plus full-text search — metered pay-as-you-go and billed per organization. Run it managed on Hanzo Cloud, or self-host the open-source components on your own Kubernetes.",
  openGraph: {
    title: "Hanzo Cloud — the infrastructure behind your agents and apps",
    description:
      "One cloud to provision, secure, and bill your AI stack — 400+ models, Base backends, IAM, KMS, and vector + full-text search, metered per organization. Self-host the open-source components or run it managed.",
    url: "https://cloud.hanzo.ai",
    siteName: "Hanzo Cloud",
    type: "website",
  },
}

export default function CloudPage() {
  return <CloudLanding />
}
