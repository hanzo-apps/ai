import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"

// Standalone Hanzo Cloud marketing site served at cloud.hanzo.ai ROOT.
// Lives OUTSIDE the (marketing) route group so it is wrapped only by the
// root layout (no site Navbar/Footer) — CloudLanding ships its own minimal
// nav + footer. The Dockerfile promotes out/cloud-site.html to the web root.

export const metadata: Metadata = {
  title: "Hanzo Cloud — open-source cloud for AI agents & apps",
  description:
    "The open-source cloud for AI agents and applications. One API for 51 live models, Base backends, IAM, KMS, vector search, and full-text search — with pay-as-you-go, per-organization billing. Self-host or use the managed cloud.",
  openGraph: {
    title: "Hanzo Cloud — open-source cloud for AI agents & apps",
    description:
      "One API for 51 live models, Base backends, IAM, KMS, vector + search, and pay-as-you-go per-org billing. Open-source. Self-host or use the cloud.",
    url: "https://cloud.hanzo.ai",
    siteName: "Hanzo Cloud",
    type: "website",
  },
}

export default function CloudSitePage() {
  return <CloudLanding />
}
