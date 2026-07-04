'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@hanzo/ui";
import DatastorePricing from "@/components/pricing/DatastorePricing";
import VectorPricing from "@/components/pricing/VectorPricing";
import ObservabilityPricing from "@/components/pricing/ObservabilityPricing";
import ManagedServicesPricing from "@/components/pricing/ManagedServicesPricing";

const CLOUD_API = "https://pricing.hanzo.ai/v1/cloud";
const GPU_API = "https://pricing.hanzo.ai/v1/gpu";

interface CloudPlan {
  id: string;
  name: string;
  description: string;
  vcpus: number;
  memoryGB: number;
  diskGB: number;
  cpuType: string;
  maxVMs: number;
  priceMonthly: number;
  priceHourly: number;
  features: string[];
  popular?: boolean;
  freeTier?: boolean;
}

interface Region {
  id: string;
  name: string;
  location: string;
  flag: string;
}

interface BlockStorage {
  pricePerGBMonthly: number;
  minSizeGB: number;
  maxSizeGB: number;
}

interface GpuTier {
  name: string;
  gpu: string;
  vram: string;
  price: number;
}

interface CloudData {
  plans: CloudPlan[];
  regions: Region[];
  blockStorage: BlockStorage;
}

// Static fallback so the section renders instantly even if the public
// pricing API is slow or unreachable. Mirrors pricing.hanzo.ai/v1/cloud.
const STATIC_CLOUD_DATA: CloudData = {
  plans: [
    { id: "starter", name: "Starter", description: "Get started for free. Perfect for side projects, bots, and learning.", vcpus: 1, memoryGB: 1, diskGB: 20, cpuType: "shared", maxVMs: 1, priceMonthly: 5, priceHourly: 0.0069, features: ["1 VM", "1 vCPU", "1 GB RAM", "20 GB SSD", "500 GB transfer", "Free $5 credit"], freeTier: true },
    { id: "builder", name: "Builder", description: "For developers shipping real products. Run bots, APIs, and automation.", vcpus: 2, memoryGB: 2, diskGB: 40, cpuType: "shared", maxVMs: 5, priceMonthly: 10, priceHourly: 0.0139, features: ["Up to 5 VMs", "2 vCPU", "2 GB RAM", "40 GB SSD", "1 TB transfer"] },
    { id: "dev", name: "Dev", description: "The sweet spot. Full dev environment with room to grow.", vcpus: 2, memoryGB: 8, diskGB: 25, cpuType: "shared", maxVMs: 25, priceMonthly: 15, priceHourly: 0.0208, features: ["Up to 25 VMs", "2 vCPU", "8 GB RAM", "25 GB SSD", "3 TB transfer"], popular: true },
    { id: "pro", name: "Pro", description: "Dedicated CPU. Zero noisy neighbors. Consistent performance, always.", vcpus: 2, memoryGB: 8, diskGB: 80, cpuType: "dedicated", maxVMs: 25, priceMonthly: 25, priceHourly: 0.0347, features: ["Up to 25 VMs", "2 dedicated vCPU", "8 GB RAM", "80 GB SSD", "2 TB transfer"] },
    { id: "turbo", name: "Turbo", description: "4x the power. Browser automation, CI/CD, and heavy workloads.", vcpus: 4, memoryGB: 16, diskGB: 160, cpuType: "shared", maxVMs: 25, priceMonthly: 39, priceHourly: 0.0542, features: ["Up to 25 VMs", "4 vCPU", "16 GB RAM", "160 GB SSD", "4 TB transfer"] },
    { id: "business", name: "Business", description: "Team-scale compute. Run production services, staging environments, and fleets.", vcpus: 8, memoryGB: 32, diskGB: 240, cpuType: "dedicated", maxVMs: 50, priceMonthly: 219, priceHourly: 0.3042, features: ["Up to 50 VMs", "8 dedicated vCPU", "32 GB RAM", "240 GB SSD", "20 TB transfer"] },
    { id: "enterprise", name: "Enterprise", description: "Mission-critical infrastructure. Full isolation, maximum throughput.", vcpus: 16, memoryGB: 64, diskGB: 360, cpuType: "dedicated", maxVMs: 100, priceMonthly: 429, priceHourly: 0.5958, features: ["Up to 100 VMs", "16 dedicated vCPU", "64 GB RAM", "360 GB SSD", "40 TB transfer"] },
    { id: "scale", name: "Scale", description: "Platform-scale compute. Run hundreds of services across global regions.", vcpus: 32, memoryGB: 128, diskGB: 600, cpuType: "dedicated", maxVMs: 250, priceMonthly: 849, priceHourly: 1.1792, features: ["Up to 250 VMs", "32 dedicated vCPU", "128 GB RAM", "600 GB SSD", "50 TB transfer"] },
  ],
  regions: [
    { id: "us-east", name: "US East", location: "Ashburn, VA", flag: "us" },
    { id: "us-west", name: "US West", location: "Hillsboro, OR", flag: "us" },
    { id: "eu-central", name: "Europe", location: "Frankfurt, DE", flag: "de" },
    { id: "ap-southeast", name: "Asia Pacific", location: "Singapore", flag: "sg" },
  ],
  blockStorage: { pricePerGBMonthly: 0.08, minSizeGB: 1, maxSizeGB: 16384 },
};

const STATIC_GPU_TIERS: GpuTier[] = [
  { name: "GPU Basic", gpu: "1x H100", vram: "80 GB", price: 3.48 },
  { name: "GPU Pro", gpu: "2x H100", vram: "160 GB", price: 6.96 },
  { name: "GPU Max", gpu: "4x H100", vram: "320 GB", price: 13.92 },
];

// The public /v1/gpu payload uses `gpus`/`priceHourly`; normalize to the
// GpuTier shape this component renders so live data is render-safe.
function normalizeGpuTiers(raw: unknown): GpuTier[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((t): GpuTier => ({
      name: String(t?.name ?? ""),
      gpu: String(t?.gpu ?? t?.gpus ?? ""),
      vram: String(t?.vram ?? ""),
      price: Number(t?.price ?? t?.priceHourly ?? 0),
    }))
    .filter((t) => t.name && Number.isFinite(t.price));
}

function CloudComputePricing() {
  const [showAll, setShowAll] = useState(false);
  // Initialize with static data immediately -- no loading flash, no error state.
  const [cloudData, setCloudData] = useState<CloudData>(STATIC_CLOUD_DATA);
  const [gpuTiers, setGpuTiers] = useState<GpuTier[]>(STATIC_GPU_TIERS);

  useEffect(() => {
    Promise.all([
      fetch(CLOUD_API).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
      fetch(GPU_API).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      }),
    ])
      .then(([cloud, gpu]) => {
        if (cloud?.plans?.length) setCloudData(cloud);
        const tiers = normalizeGpuTiers(gpu?.tiers);
        if (tiers.length) setGpuTiers(tiers);
      })
      .catch(() => {
        // keep static data already set
      });
  }, []);

  const { plans, regions, blockStorage } = cloudData;
  const visiblePlans = showAll ? plans : plans.slice(0, 6);

  function formatPrice(price: number) {
    if (price >= 100) return `$${price.toLocaleString()}`;
    return `$${price}`;
  }

  function formatMemory(gb: number) {
    if (gb >= 1024) return `${(gb / 1024).toFixed(1)} TB`;
    return `${gb} GB`;
  }

  function formatDisk(gb: number) {
    if (gb >= 1024) return `${(gb / 1024).toFixed(1)} TB`;
    return `${gb} GB`;
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">Hanzo Cloud</h2>
        <p className="text-muted-foreground text-lg mb-8">
          The developer cloud that doesn't nickel-and-dime you.
          No egress fees. No hidden costs. DDoS protection included.
        </p>
      </div>

      {/* Cloud VM Plans */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-2">Cloud Compute</h3>
        <p className="text-muted-foreground text-sm mb-6">
          From ${plans[0]?.priceMonthly}/mo to ${plans[plans.length - 1]?.priceMonthly.toLocaleString()}/mo. {regions.length} global regions. Consistent pricing everywhere.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {visiblePlans.map((plan) => (
            <div key={plan.id} className={`rounded-xl p-6 border transition-colors ${
              plan.popular
                ? "bg-primary/5 border-primary/30"
                : "bg-neutral-900/30 border-neutral-800/50"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{plan.name}</h4>
                <div className="flex gap-1.5">
                  {plan.popular && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Most Popular</span>
                  )}
                  {plan.freeTier && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Free ${plan.priceMonthly} Credit</span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
              <div className="text-2xl font-bold mb-1">{formatPrice(plan.priceMonthly)}<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mb-4">${plan.priceHourly.toFixed(4)}/hr</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>{plan.vcpus} {plan.cpuType === "dedicated" ? "dedicated " : ""}vCPU &middot; {formatMemory(plan.memoryGB)} RAM</div>
                <div>{formatDisk(plan.diskGB)} SSD</div>
                <div>Up to {plan.maxVMs.toLocaleString()} VM{plan.maxVMs > 1 ? 's' : ''}</div>
              </div>
            </div>
          ))}
        </div>
        {!showAll && plans.length > 6 && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Show all {plans.length} plans (up to {plans[plans.length - 1].vcpus} vCPU / {formatMemory(plans[plans.length - 1].memoryGB)})
            </button>
          </div>
        )}
        {showAll && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowAll(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Show fewer plans
            </button>
          </div>
        )}
        {regions.length > 0 && (
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Regions:</span>
            {regions.map((r) => (
              <span key={r.id} className="bg-neutral-900/50 px-3 py-1 rounded-full border border-neutral-800/50">
                {r.name} ({r.location})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Block Storage */}
      {blockStorage && blockStorage.pricePerGBMonthly > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-2">Block Storage</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Attach additional SSD volumes to any VM. Resize on the fly.
          </p>
          <div className="bg-neutral-900/30 rounded-xl p-6 border border-neutral-800/50 inline-block">
            <div className="text-3xl font-bold mb-1">${blockStorage.pricePerGBMonthly}<span className="text-lg font-normal text-muted-foreground">/GB/mo</span></div>
            <p className="text-muted-foreground text-sm">{blockStorage.minSizeGB} GB to {formatDisk(blockStorage.maxSizeGB)} per volume. SSD-backed, all regions.</p>
          </div>
        </div>
      )}

      {/* GPU Instances */}
      {gpuTiers.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">GPU Instances</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="py-3 px-4 text-muted-foreground font-medium">Tier</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">GPUs</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium">VRAM</th>
                  <th className="py-3 px-4 text-muted-foreground font-medium text-right">Hourly</th>
                </tr>
              </thead>
              <tbody>
                {gpuTiers.map((tier) => (
                  <tr key={tier.name} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                    <td className="py-4 px-4 font-medium">{tier.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{tier.gpu}</td>
                    <td className="py-4 px-4 text-muted-foreground">{tier.vram}</td>
                    <td className="py-4 px-4 text-right font-medium">${tier.price.toFixed(2)}/hr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">Contact sales for multi-GPU configurations and reserved pricing.</p>
        </div>
      )}

      {/* Included */}
      <div className="mb-12 bg-neutral-900/30 rounded-xl p-8 border border-neutral-800/50">
        <h3 className="text-xl font-semibold mb-4">Included with every deployment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
          <div>DDoS protection</div>
          <div>Automated backups</div>
          <div>IPv4 + IPv6</div>
          <div>Zero-trust networking</div>
          <div>KMS-managed secrets</div>
          <div>IAM SSO authentication</div>
          <div>Automated TLS certificates</div>
          <div>Git-based CI/CD</div>
        </div>
      </div>

      <div className="flex justify-center mb-20">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-neutral-100 px-8 py-3"
          onClick={() => window.open('https://cloud.hanzo.ai', '_blank')}
        >
          Deploy Now
        </Button>
      </div>
    </>
  );
}

const InfrastructurePricing = () => {
  return (
    <div className="max-w-7xl mx-auto mb-16">
      {/* Cloud Compute, Block Storage, GPUs */}
      <CloudComputePricing />

      {/* Datastore */}
      <DatastorePricing />

      {/* Vector Search */}
      <VectorPricing />

      {/* Observability / Console */}
      <ObservabilityPricing />

      {/* Managed Services */}
      <ManagedServicesPricing />
    </div>
  );
};

export default InfrastructurePricing;
