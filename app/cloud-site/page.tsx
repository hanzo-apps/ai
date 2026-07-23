import type { Metadata } from "next"
import CloudLanding from "@/components/cloud/CloudLanding"
import LandingNav from "@/components/home/LandingNav"
import LandingFooter from "@/components/home/LandingFooter"

// Standalone Hanzo Cloud marketing site served at cloud.hanzo.ai ROOT.
// Lives OUTSIDE the (marketing) route group so it is wrapped only by the
// root layout (no site Navbar/Footer) — CloudLanding ships its own minimal
// nav + footer. The Dockerfile promotes out/cloud-site.html to the web root.

export const metadata: Metadata = {
  title: "Hanzo Cloud — the AI cloud for agents & apps",
  description:
    "The AI cloud for agents and applications. One API for 400+ models, Base backends, IAM, KMS, vector search, and full-text search — with pay-as-you-go, per-organization billing. Self-host or use the managed cloud.",
  openGraph: {
    title: "Hanzo Cloud — the AI cloud for agents & apps",
    description:
      "One API for 400+ models, Base backends, IAM, KMS, vector + search, and pay-as-you-go per-org billing. Self-host the open-source components or use the managed cloud.",
    url: "https://cloud.hanzo.ai",
    siteName: "Hanzo Cloud",
    type: "website",
  },
}

export default function CloudSitePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <CloudLanding />
      </main>
      <LandingFooter />
    </div>
  )
}
