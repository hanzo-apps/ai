'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@hanzo/ui";
import { Check, Server, Search, Wallet, Shield, Zap, Bell, Database, Layers } from "lucide-react";
import { loadBlockchain, fallbackBlockchain, formatCatalogPrice, type BlockchainCatalog } from "@/lib/plans";
import Link from 'next/link'
import { Box } from '@hanzo/ui'

// Icons are presentation, so they stay here — the catalog prices a product, it
// does not choose a glyph. Keyed by catalog id so a renamed product keeps its icon
// and a NEW one gets a sensible default rather than a blank.
const API_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "data-token": Database,
  "data-nft": Layers,
  "data-wallet": Wallet,
  "data-indexer": Search,
};

const BlockchainPricing = () => {
  // Same contract as the plans ladder: @hanzo/plans paints first, the live
  // catalog replaces it. The tiers used to be a hand-typed array here, which is
  // how a page comes to advertise a price nothing charges.
  const [catalog, setCatalog] = useState<BlockchainCatalog>(fallbackBlockchain);
  useEffect(() => {
    loadBlockchain().then((live) => { if (live) setCatalog(live); });
  }, []);

  const rpcPricing = catalog.rpc.map((p) => ({
    name: p.name,
    description: p.description,
    price: formatCatalogPrice(p.priceMonthly),
    period: p.priceMonthly && p.priceMonthly > 0 ? "/mo" : "",
    // Stated by the catalog when the plan meters overage. A plan priced by
    // conversation says so instead of quoting a rate it has not agreed.
    cuRate: p.overagePerMillion != null
      ? `$${p.overagePerMillion}/M CU overage`
      : p.priceMonthly == null ? "Volume discounts" : "",
    features: p.features,
    highlighted: p.id === "rpc-growth",
  }));

  const apiPricing = catalog.data.map((a) => ({
    name: a.name,
    icon: API_ICONS[a.id] ?? Database,
    description: a.description,
    pricing: a.tiers.map((t) => ({
      tier: t.name,
      requests: t.requestsMonthly >= 1_000_000
        ? `${t.requestsMonthly / 1_000_000}M/mo`
        : `${t.requestsMonthly / 1_000}K/mo`,
      price: t.priceMonthly === 0 ? "$0" : `$${t.priceMonthly}/mo`,
    })),
  }));

  const premiumFeatures = [
    {
      name: "Smart Wallets (ERC-4337)",
      icon: Shield,
      description: "Account abstraction, gasless transactions, social recovery",
      price: "$0.05/UserOp",
      note: "First 1,000 UserOps free/month",
    },
    {
      name: "Gas API",
      icon: Zap,
      description: "Real-time gas estimates, priority fees, EIP-1559 data",
      price: "Included",
      note: "With any paid RPC plan",
    },
    {
      name: "Webhooks",
      icon: Bell,
      description: "Address activity, token transfers, contract events",
      price: "$19/mo",
      note: "Up to 100 webhooks, 1M deliveries",
    },
  ];

  const supportedChains = [
    "Ethereum", "Polygon", "Arbitrum", "Optimism", "Base",
    "Solana", "Avalanche", "BNB Chain", "Lux", "zkSync",
    "Starknet", "Linea", "Scroll", "Fantom", "Moonbeam",
    "Celo", "Gnosis", "Aurora", "Harmony", "Cronos",
  ];

  return (
    <Box className="max-w-7xl mx-auto mb-16">
      {/* RPC Plans */}
      <Box className="mb-20">
        <h2 className="text-3xl font-bold mb-4">RPC Node Access</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Multi-chain RPC endpoints with 100+ chains, archive data, and enterprise-grade reliability
        </p>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {rpcPricing.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 border ${
                plan.highlighted
                  ? "border-white bg-primary/5"
                  : "border-neutral-800 bg-neutral-900/30"
              }`}
            >
              {plan.highlighted && (
                <Box className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Most Popular
                </Box>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

              <Box className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                {plan.cuRate && (
                  <Box className="text-xs text-muted-foreground mt-1">{plan.cuRate}</Box>
                )}
              </Box>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-primary hover:bg-[#cccccc] text-primary-foreground"
                    : "bg-primary text-primary-foreground hover:bg-neutral-100"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </Box>

        <p className="text-sm text-muted-foreground text-center">
          All plans include WebSocket support, JSON-RPC & REST APIs, and auto-scaling.
          <Link href="/blockchain" className="text-foreground hover:underline ml-1">Compare all features →</Link>
        </p>
      </Box>

      {/* Data APIs */}
      <Box className="mb-20">
        <h2 className="text-3xl font-bold mb-4">Data APIs</h2>
        <p className="text-muted-foreground text-lg mb-8">
          High-level APIs for tokens, NFTs, wallets, and blockchain indexing
        </p>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {apiPricing.map((api) => {
            const Icon = api.icon;
            return (
              <Box key={api.name} className="rounded-xl p-6 border border-neutral-800 bg-neutral-900/30">
                <Box className="flex items-start gap-4 mb-4">
                  <Box className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-foreground" />
                  </Box>
                  <div>
                    <h3 className="text-xl font-semibold">{api.name}</h3>
                    <p className="text-muted-foreground text-sm">{api.description}</p>
                  </div>
                </Box>

                <Box className="grid grid-cols-3 gap-4 text-sm">
                  {api.pricing.map((tier) => (
                    <Box key={tier.tier} className="text-center p-3 rounded-lg bg-background/20">
                      <Box className="text-muted-foreground text-xs mb-1">{tier.tier}</Box>
                      <Box className="font-semibold">{tier.price}</Box>
                      <Box className="text-xs text-muted-foreground">{tier.requests}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Premium Features */}
      <Box className="mb-20">
        <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Advanced capabilities for production applications
        </p>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {premiumFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Box key={feature.name} className="rounded-xl p-6 border border-neutral-800 bg-neutral-900/30">
                <Box className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-foreground" />
                </Box>
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <Box className="text-xl font-bold text-foreground">{feature.price}</Box>
                <Box className="text-xs text-muted-foreground mt-1">{feature.note}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Supported Chains */}
      <Box className="mb-20">
        <h2 className="text-3xl font-bold mb-4 text-center">100+ Supported Chains</h2>
        <p className="text-muted-foreground text-lg mb-8 text-center">
          EVM, Solana, Cosmos, and more
        </p>

        <Box className="flex flex-wrap justify-center gap-3">
          {supportedChains.map((chain) => (
            <Box
              key={chain}
              className="px-4 py-2 rounded-full border border-border bg-secondary/50 text-sm text-foreground/80"
            >
              {chain}
            </Box>
          ))}
          <Box className="px-4 py-2 rounded-full border border-white/30 bg-primary/10 text-sm text-foreground">
            +80 more
          </Box>
        </Box>
      </Box>

      {/* CTA */}
      <Box className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to build on Web3?</h2>
        <p className="text-muted-foreground mb-6">
          Start free and scale as you grow. No credit card required.
        </p>
        <Box className="flex justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Start Building Free
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:border-neutral-600">
            Talk to Sales
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BlockchainPricing;
