"use client"

import HeroSection from "@/components/landing/HeroSection"
import TrustedBySection from "@/components/landing/TrustedBySection"
import PlatformOverviewSection from "@/components/landing/PlatformOverviewSection"
import UseCasesSection from "@/components/landing/UseCasesSection"
import MultiAgentSection from "@/components/landing/MultiAgentSection"
import DeveloperExperienceSection from "@/components/landing/DeveloperExperienceSection"
import NativeSurfacesSection from "@/components/landing/NativeSurfacesSection"
import UsagePlaneSection from "@/components/landing/UsagePlaneSection"
import ProviderGridSection from "@/components/landing/ProviderGridSection"
import SmartRoutingSection from "@/components/landing/SmartRoutingSection"
import OpenSourceSection from "@/components/landing/OpenSourceSection"
import HanzoNetworkSection from "@/components/landing/HanzoNetworkSection"
import PricingPreviewSection from "@/components/landing/PricingPreviewSection"
import FinalCTASection from "@/components/landing/FinalCTASection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
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
      </main>
    </div>
  )
}
