"use client"

import { useEffect, useState } from "react"
import { useAnalytics } from "@hanzo/event/react"
import { EVENTS } from "@hanzo/event"
import PricingHeader from "@/components/pricing/PricingHeader"
import PersonalPlans from "@/components/pricing/PersonalPlans"
import TeamEnterpriseStrip from "@/components/pricing/TeamEnterpriseStrip"
import WorldPricing from "@/components/pricing/WorldPricing"
import APIPricing from "@/components/pricing/APIPricing"
import SearchDataPricing from "@/components/pricing/SearchDataPricing"
import BlockchainPricing from "@/components/pricing/BlockchainPricing"
import InfrastructurePricing from "@/components/pricing/InfrastructurePricing"
import PricingFAQ from "@/components/pricing/PricingFAQ"
import BillingManagement from "@/components/pricing/BillingManagement"
import PricingCallouts from "@/components/pricing/PricingCallouts"

// "Team & Enterprise" is gone as a tab. It was eight comparison cards for a
// choice that is two sentences, and it made the page's first question "which of
// seven audiences am I" instead of "which plan". Team and Enterprise now sit
// under the plans as a two-item strip, so the page opens on the one decision a
// visitor is actually here to make.
//
// "API" is now "API & Models" because that tab already carries the live
// per-model rate table (input / output / cache-write, fetched from
// api.hanzo.ai/v1/models) and the old label hid it.
const tabs = [
  { id: "personal", label: "Plans" },
  { id: "api", label: "API & Models" },
  { id: "search", label: "Search & Data" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "blockchain", label: "Blockchain" },
  { id: "world", label: "World" },
]

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("personal")
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.capture(EVENTS.PRICING_VIEWED)
  }, [analytics])

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <PersonalPlans />
            <TeamEnterpriseStrip />
            <PricingFAQ />
            <BillingManagement />
          </>
        )
      case "world":
        return <WorldPricing />
      case "api":
        return <APIPricing />
      case "search":
        return <SearchDataPricing />
      case "infrastructure":
        return <InfrastructurePricing />
      case "blockchain":
        return <BlockchainPricing />
      default:
        return <PersonalPlans />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <PricingHeader />

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-center">
            <div className="bg-neutral-900/50 rounded-full p-1 border border-neutral-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-white text-black"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Callouts */}
        <PricingCallouts />
      </div>
    </div>
  )
}
