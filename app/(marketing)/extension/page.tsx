import { ArrowRight } from "lucide-react"
import HanzoExtensionHero from "@/components/extension/HanzoExtensionHero"
import HanzoExtensionFeatures from "@/components/extension/HanzoExtensionFeatures"
import HanzoExtensionBrowsers from "@/components/extension/HanzoExtensionBrowsers"
import HanzoExtensionUseCases from "@/components/extension/HanzoExtensionUseCases"
import HanzoExtensionCTA from "@/components/extension/HanzoExtensionCTA"

export const metadata = {
  title: "Hanzo Extension - Browser AI Assistant",
  description:
    "AI-powered browser extension for enhanced web productivity.",
}

export default function ExtensionPage() {
  return (
    <>
      <HanzoExtensionHero />
      <HanzoExtensionFeatures />
      <HanzoExtensionBrowsers />
      <HanzoExtensionUseCases />
      <HanzoExtensionCTA />
      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Extension</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/extension" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/extension" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
