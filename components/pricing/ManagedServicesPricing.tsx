'use client'

import React from "react"
import { Button } from "@hanzo/ui"
import { useServiceCard } from "@/lib/plans"
import { Box } from '@hanzo/ui'

// The service table comes from the catalog (@hanzo/plans first paint, GET
// /v1/pricing/services live) rather than an array here — the same reason every
// other pricing surface moved: a price stated only in a component is one nothing
// else can read, check, or charge against.

export default function ManagedServicesPricing() {
  const card = useServiceCard("managed");
  const services = (card?.table ?? []).map((r) => ({
    name: r.name,
    description: r.description,
    freeTier: r.freeTier,
    pro: r.price,
    note: r.note,
  }));
  return (
    <Box className="mb-20">
      <h2 className="text-3xl font-bold mb-2">Managed Services</h2>
      <p className="text-muted-foreground text-lg mb-8">
        Fully managed infrastructure services. One-click provisioning, automated backups,
        and zero-downtime scaling. All services include IAM SSO and KMS-managed secrets.
      </p>

      <Box className="overflow-x-auto rounded-xl border border-neutral-800/50">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-900/30">
              <th className="py-3 px-5 text-muted-foreground font-medium">Service</th>
              <th className="py-3 px-5 text-muted-foreground font-medium">Free Tier</th>
              <th className="py-3 px-5 text-muted-foreground font-medium">Pro</th>
              <th className="py-3 px-5 text-muted-foreground font-medium hidden md:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => (
              <tr key={svc.name} className="border-b border-neutral-800/50 hover:bg-neutral-900/20 transition-colors">
                <td className="py-4 px-5">
                  <Box className="font-medium">{svc.name}</Box>
                  <Box className="text-xs text-muted-foreground">{svc.description}</Box>
                </td>
                <td className="py-4 px-5 text-sm text-green-400 font-medium">{svc.freeTier}</td>
                <td className="py-4 px-5 text-sm font-mono">{svc.pro}</td>
                <td className="py-4 px-5 text-muted-foreground text-sm hidden md:table-cell">{svc.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <p className="text-sm text-muted-foreground mt-6">
        All managed services run on Hanzo Cloud with automated failover, end-to-end encryption,
        and multi-region replication available on Business and Enterprise plans.
      </p>

      <Box className="flex justify-center mt-8">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-neutral-100 px-8 py-3"
          onClick={() => window.open("https://cloud.hanzo.ai", "_blank")}
        >
          Deploy Now
        </Button>
      </Box>
    </Box>
  )
}
