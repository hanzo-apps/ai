'use client'

import React from "react";
import { Button } from "@hanzo/ui";
import { Check, Search, Globe, Database, ArrowRight } from "lucide-react";
import { useServiceCard, formatServicePrice, type ServiceCard } from "@/lib/plans"
import Link from "next/link";
import { Box } from '@hanzo/ui'

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  popular?: boolean;
  contactSales?: boolean;
}

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`rounded-xl p-7 border flex flex-col h-full ${
        tier.popular
          ? "bg-primary/5 border-primary/40"
          : "bg-neutral-900/30 border-neutral-800/50"
      }`}
    >
      {tier.popular && (
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full self-start mb-3">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
      <p className="text-muted-foreground text-sm mb-5">{tier.description}</p>

      <Box className="mb-1">
        <span className="text-4xl font-bold">{tier.price}</span>
        {tier.period && (
          <span className="text-muted-foreground text-sm">{tier.period}</span>
        )}
      </Box>

      <ul className="space-y-2 text-sm text-muted-foreground my-6 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        size="lg"
        variant={tier.popular ? "default" : "outline"}
        className="w-full"
        asChild
      >
        {tier.contactSales ? (
          <Link href="/contact">{tier.cta}</Link>
        ) : (
          <a href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
            {tier.cta}
          </a>
        )}
      </Button>
    </div>
  );
}







interface ProductSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tiers: PricingTier[];
}

function ProductSection({ title, subtitle, icon, tiers }: ProductSectionProps) {
  return (
    <Box className="mb-16">
      <Box className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-3xl font-bold">{title}</h2>
      </Box>
      <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>

      <div
        className={`grid grid-cols-1 gap-6 ${
          tiers.length === 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-3"
        }`}
      >
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </Box>
  );
}

// Search and Crawl tiers come from the catalog (@hanzo/plans first paint, GET
// /v1/pricing/services live). Vector is deliberately absent — it is priced once,
// on the Infrastructure tab; this file used to carry a second, contradictory
// ladder for it.
function toTiers(card: ServiceCard | undefined): PricingTier[] {
  return (card?.tiers ?? []).map((t) => ({
    name: t.name,
    price: formatServicePrice(t.priceMonthly),
    period: t.priceMonthly == null ? "" : "/mo",
    description: t.description ?? "",
    features: t.features ?? [],
    popular: t.popular,
    cta: t.priceMonthly == null ? "Contact Sales" : "Start Free Trial",
    ctaHref: "https://console.hanzo.ai",
  }));
}

export default function SearchDataPricing() {
  const searchTiers = toTiers(useServiceCard("search"));
  const crawlTiers = toTiers(useServiceCard("crawl"));
  return (
    <Box className="max-w-7xl mx-auto mb-16">
      <ProductSection
        title="Hanzo Search"
        subtitle="AI-powered hybrid search for documentation, help centers, and knowledge bases. Deploy with a single publishable key."
        icon={<Search className="h-8 w-8 text-foreground" />}
        tiers={searchTiers}
      />

      <ProductSection
        title="Hanzo Crawl"
        subtitle="Web crawling and content extraction with AI-powered structured data pipelines."
        icon={<Globe className="h-8 w-8 text-foreground" />}
        tiers={crawlTiers}
      />

      {/* Hanzo Vector is priced ONCE, on the Infrastructure tab. This section used
          to carry its own ladder — Starter $29 / Growth $299 / Enterprise — against
          Infrastructure's Free $0 / Pro $25 / Business $99. Same product, same
          description, two prices, both live: one tab said 1M vectors cost $29/mo
          while the other said 1M vectors was free. A visitor who opened both tabs
          saw us contradict ourselves about what we charge.

          Pointing at the canonical section instead of restating it is the only
          arrangement in which that cannot happen again. */}
      <Box className="mb-16 rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-8">
        <Box className="flex items-center gap-3 mb-3">
          <Database className="h-7 w-7 text-foreground" />
          <h2 className="text-2xl font-bold">Hanzo Vector</h2>
        </Box>
        <p className="text-muted-foreground text-sm">
          Store the embeddings Crawl produces and Search queries. Vector is priced
          with the rest of the managed infrastructure — see the{" "}
          <span className="text-foreground font-medium">Infrastructure</span> tab
          for its tiers and usage rates.
        </p>
      </Box>

      {/* Integration note */}
      <Box className="bg-neutral-900/30 rounded-xl p-8 border border-neutral-800/50 mb-12">
        <h3 className="text-xl font-semibold mb-4">
          All products work together
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Crawl your docs with Hanzo Crawl, store embeddings in Hanzo Vector,
          and serve instant search results with Hanzo Search. All managed through
          a single API key and dashboard.
        </p>
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
          <div>IAM SSO authentication</div>
          <div>Usage-based billing via Commerce</div>
          <div>Publishable keys for browser use</div>
          <div>KMS-managed secrets</div>
        </Box>
      </Box>

      <Box className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-neutral-100 px-8"
          asChild
        >
          <a
            href="https://console.hanzo.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="px-8" asChild>
          <Link href="/contact">Talk to Sales</Link>
        </Button>
      </Box>
    </Box>
  );
}
