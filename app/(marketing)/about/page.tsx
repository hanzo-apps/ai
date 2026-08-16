import AboutHero from "@/components/about/AboutHero"
import HistoryTimeline from "@/components/about/HistoryTimeline"
import ZenPrinciples from "@/components/about/ZenPrinciples"
import SenseiMethod from "@/components/about/SenseiMethod"
import OurStory from "@/components/about/OurStory"
import { Box } from '@hanzo/ui'

export const metadata = {
  title: "About Hanzo AI — the history",
  description:
    "Hanzo began as Crowdstart, a marketing platform. It incorporated as Hanzo AI in 2016, went through Techstars the next year, and now builds the AI cloud. Every pivot, and what came out of it.",
  openGraph: {
    title: "About Hanzo AI — the history",
    description:
      "Hanzo began as Crowdstart, a marketing platform. It incorporated as Hanzo AI in 2016, went through Techstars the next year, and now builds the AI cloud.",
    url: "https://hanzo.ai/about",
    siteName: "Hanzo AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hanzo AI — the history",
    description:
      "Hanzo began as Crowdstart, a marketing platform. It incorporated as Hanzo AI in 2016, went through Techstars the next year, and now builds the AI cloud.",
  },
}

export default function AboutPage() {
  return (
    <Box className="min-h-screen bg-background text-foreground">
      <main className="pt-20">
        <AboutHero />
        <OurStory />
        <HistoryTimeline />
        <ZenPrinciples />
        <SenseiMethod />
      </main>
    </Box>
  )
}
