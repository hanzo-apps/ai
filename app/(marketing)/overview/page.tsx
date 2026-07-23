import type { Metadata } from 'next'
import HeroSection from '@/components/landing/HeroSection'
import TrustedBySection from '@/components/landing/TrustedBySection'
import PlatformOverviewSection from '@/components/landing/PlatformOverviewSection'
import UseCasesSection from '@/components/landing/UseCasesSection'
import MultiAgentSection from '@/components/landing/MultiAgentSection'
import DeveloperExperienceSection from '@/components/landing/DeveloperExperienceSection'
import NativeSurfacesSection from '@/components/landing/NativeSurfacesSection'
import UsagePlaneSection from '@/components/landing/UsagePlaneSection'
import ProviderGridSection from '@/components/landing/ProviderGridSection'
import SmartRoutingSection from '@/components/landing/SmartRoutingSection'
import OpenSourceSection from '@/components/landing/OpenSourceSection'
import HanzoNetworkSection from '@/components/landing/HanzoNetworkSection'
import PricingPreviewSection from '@/components/landing/PricingPreviewSection'
import FinalCTASection from '@/components/landing/FinalCTASection'

// Platform overview — the full detailed Hanzo homepage. It moved off the apex
// `/` (now the chat-centric landing) to `/overview` so it stays part of the
// detailed cloud.hanzo.ai site, wrapped by the (marketing) Navbar/Footer.

const TITLE = 'Hanzo — the AI cloud for agents and apps'
const DESCRIPTION =
  'Build, deploy, and govern AI agents with unified access to models, MCP tools, memory, vector search, secure sandboxes, IAM, KMS, and audit logs. Open-source. Self-host or use the cloud.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://cloud.hanzo.ai/overview',
    siteName: 'Hanzo',
    type: 'website',
  },
}

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <TrustedBySection />
      <PlatformOverviewSection />
      <UseCasesSection />
      <MultiAgentSection />
      <DeveloperExperienceSection />
      <NativeSurfacesSection />
      <UsagePlaneSection />
      <ProviderGridSection />
      <SmartRoutingSection />
      <OpenSourceSection />
      <HanzoNetworkSection />
      <PricingPreviewSection />
      <FinalCTASection />
    </div>
  )
}
