'use client'

import React from "react"
import { Button } from "@hanzo/ui"
import { Check } from "lucide-react"
import { useServiceCard, formatServicePrice, formatUsageRate } from "@/lib/plans"
import { Box } from '@hanzo/ui'

// Tiers and the overage rate come from the catalog (@hanzo/plans first paint,
// GET /v1/pricing/services live) rather than two arrays here. A price only this
// component knows is a price nothing can charge against and nothing can check.

export default function ObservabilityPricing() {
  const card = useServiceCard("observability");
  const tiers = (card?.tiers ?? []).map((t) => ({
    name: t.name,
    price: formatServicePrice(t.priceMonthly),
    period: t.priceMonthly == null ? "" : "/mo",
    description: t.description ?? "",
    features: t.features ?? [],
    highlighted: Boolean(t.popular),
    cta: t.priceMonthly == null ? "Contact Sales" : "Get Started",
  }));
  const u = card?.usage?.[0];
  const overage = {
    rate: u ? formatUsageRate(u.rate) : "",
    unit: u?.unit ?? "",
    note: u?.note ?? "",
  };
  return (
    <Box className="mb-20">
      <h2 className="text-3xl font-bold mb-2">Hanzo Console</h2>
      <p className="text-muted-foreground text-lg mb-8">
        Observability for AI applications. Traces, evals, cost tracking, and prompt management
        for LLM-powered products. Open-source core with enterprise features.
      </p>

      {/* Tier cards */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl p-6 border flex flex-col ${
              tier.highlighted
                ? "border-white bg-primary/5"
                : "border-neutral-800 bg-neutral-900/30"
            }`}
          >
            {tier.highlighted && (
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>

            <Box className="mb-6">
              <span className="text-3xl font-bold">{tier.price}</span>
              <span className="text-muted-foreground">{tier.period}</span>
            </Box>

            <ul className="space-y-3 mb-6 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                tier.highlighted
                  ? "bg-primary hover:bg-[#cccccc] text-primary-foreground"
                  : "bg-primary text-primary-foreground hover:bg-neutral-100"
              }`}
              onClick={() => {
                if (tier.price === "Custom") {
                  window.location.href = "/contact/sales"
                } else {
                  window.open("https://console.hanzo.ai", "_blank")
                }
              }}
            >
              {tier.cta}
            </Button>
          </div>
        ))}
      </Box>

      {/* Overage */}
      <Box className="bg-neutral-900/30 rounded-xl p-6 border border-neutral-800/50 inline-block mb-8">
        <h3 className="text-lg font-semibold mb-2">Overage pricing</h3>
        <Box className="text-2xl font-bold mb-1">
          {overage.rate}<span className="text-base font-normal text-muted-foreground">{overage.unit}</span>
        </Box>
        <p className="text-muted-foreground text-sm">{overage.note}</p>
      </Box>

      {/* Included */}
      <Box className="bg-neutral-900/30 rounded-xl p-8 border border-neutral-800/50">
        <h3 className="text-xl font-semibold mb-4">Included with every plan</h3>
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
          <div>OpenTelemetry native</div>
          <div>OpenAI SDK integration</div>
          <div>LangChain integration</div>
          <div>REST & SDK ingestion</div>
          <div>Prompt versioning</div>
          <div>Model cost tracking</div>
          <div>Public API</div>
          <div>Self-hosted option</div>
        </Box>
      </Box>
    </Box>
  )
}
