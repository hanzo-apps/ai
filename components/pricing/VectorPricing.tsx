'use client'

import React from "react"
import { Button } from "@hanzo/ui"
import { Check } from "lucide-react"
import { useServiceCard, formatServicePrice, formatUsageRate } from "@/lib/plans"

// The tiers and usage rates come from the catalog (@hanzo/plans first paint,
// GET /v1/pricing/services live). They used to be two arrays here, which is how
// this product came to be advertised at two different prices: the Search & Data
// tab carried its own Vector ladder — Starter $29 / Growth $299 — against this
// one, and a visitor who opened both tabs saw us contradict ourselves. That tab
// now points here instead of restating.

export default function VectorPricing() {
  const card = useServiceCard("vector");
  const tiers = (card?.tiers ?? []).map((t) => ({
    name: t.name,
    price: formatServicePrice(t.priceMonthly),
    period: t.priceMonthly == null ? "" : `/mo${t.periodNote ? " " + t.periodNote : ""}`,
    description: t.description ?? "",
    features: t.features ?? [],
    highlighted: Boolean(t.popular),
    cta: t.priceMonthly == null ? "Contact Sales" : "Get Started",
  }));
  const usageRates = (card?.usage ?? []).map((u) => ({
    resource: u.resource,
    rate: formatUsageRate(u.rate),
    unit: u.unit,
    note: u.note ?? "",
  }));
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-2">Hanzo Vector</h2>
      <p className="text-muted-foreground text-lg mb-8">
        Managed vector database for semantic search, RAG, and recommendation systems.
        S3-compatible snapshots. Zero-downtime scaling.
      </p>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

            <div className="mb-6">
              <span className="text-3xl font-bold">{tier.price}</span>
              <span className="text-muted-foreground">{tier.period}</span>
            </div>

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
      </div>

      {/* Usage-based pricing */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2">Usage-based pricing</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Metered on top of your base tier. Pro and Business plans include generous free allocations.
        </p>
        <div className="overflow-x-auto rounded-xl border border-neutral-800/50">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/30">
                <th className="py-3 px-5 text-muted-foreground font-medium">Resource</th>
                <th className="py-3 px-5 text-muted-foreground font-medium text-right">Rate</th>
                <th className="py-3 px-5 text-muted-foreground font-medium hidden md:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {usageRates.map((row) => (
                <tr key={row.resource} className="border-b border-neutral-800/50 hover:bg-neutral-900/20 transition-colors">
                  <td className="py-4 px-5 font-medium">{row.resource}</td>
                  <td className="py-4 px-5 text-right font-mono">
                    {row.rate}<span className="text-muted-foreground text-xs ml-1">{row.unit}</span>
                  </td>
                  <td className="py-4 px-5 text-muted-foreground text-sm hidden md:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
