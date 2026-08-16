"use client"

import { useEffect, useState, type ReactNode } from "react"
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

// Three tabs, because there are three buyers and they want different pages.
// Someone buying for themselves needs a ladder; someone buying for a company
// needs seats and a conversation; someone building against the API needs rates.
// Sorting by BUYER rather than by product means a visitor reads one answer
// instead of skipping five.
const tabs = [
  { id: "individual", label: "Individual" },
  { id: "business", label: "Business & Enterprise" },
  { id: "api", label: "API" },
]

// One service's rates under its name. The rate tables already carry their own
// max-w-7xl and bottom margin, so a section adds only the label and the rule
// that separates it from the service above.
function Service({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto pt-16 border-t border-neutral-800">
      <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-neutral-500">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("individual")
  const analytics = useAnalytics()

  useEffect(() => {
    analytics.capture(EVENTS.PRICING_VIEWED)
  }, [analytics])

  const renderTabContent = () => {
    switch (activeTab) {
      case "business":
        return (
          <>
            <TeamEnterpriseStrip />
            <PricingFAQ />
          </>
        )
      case "api":
        return (
          <>
            <Service title="API & Models">
              <APIPricing />
            </Service>
            <Service title="Search & Data">
              <SearchDataPricing />
            </Service>
            <Service title="Infrastructure">
              <InfrastructurePricing />
            </Service>
            <Service title="Blockchain">
              <BlockchainPricing />
            </Service>
            <Service title="World">
              <WorldPricing />
            </Service>
          </>
        )
      default:
        return (
          <>
            <PersonalPlans />
            <PricingFAQ />
            <BillingManagement />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <PricingHeader />

        {/* Tab Navigation */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-muted-foreground mb-6">
            Start free. Move up for the best models, higher limits and more
            compute.
          </p>
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
