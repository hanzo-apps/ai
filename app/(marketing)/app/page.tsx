import type { Metadata } from "next"
import AppLanding from "@/components/app/AppLanding"

export const metadata: Metadata = {
  title: "Hanzo App — build and ship AI apps from a prompt",
  description:
    "Describe the app or website you want in plain language and Hanzo builds it — UI, database, auth, and API — then ships it to a live URL on Hanzo Cloud with database, auth, AI, and storage already wired in. Open source (MIT).",
  openGraph: {
    title: "Hanzo App — build and ship AI apps from a prompt",
    description:
      "From a sentence to a shipped app: Hanzo generates the UI, database schema, auth, and API, refines with you in a live in-browser editor, and deploys to a live URL on Hanzo Cloud — database, auth, AI, and storage wired in.",
    url: "https://hanzo.app",
    siteName: "Hanzo App",
    type: "website",
  },
}

export default function AppPage() {
  return <AppLanding />
}
