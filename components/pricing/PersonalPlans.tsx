'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Code, Zap, Users, Rocket } from "lucide-react";
import { loadPlans, fallbackPlans, type SubscriptionPlan } from "@/lib/plans";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  go: <Rocket className="h-6 w-6 text-muted-foreground" />,
  dev: <Code className="h-6 w-6 text-muted-foreground" />,
  pro: <Zap className="h-6 w-6 text-muted-foreground" />,
  max: <Users className="h-6 w-6 text-muted-foreground" />,
};

// Canonical checkout. The billing shell reads the "#pricing" hash and opens the
// subscription portal for the signed-in user (auto OIDC via hanzo.id when
// needed), where selecting a plan starts the subscription. If /v1/plans ever
// supplies a checkout link/id we honor it; otherwise we deep-link by plan id.
const BILLING_URL = "https://billing.hanzo.ai";

function planCheckoutUrl(plan: SubscriptionPlan): string {
  if (plan.checkoutUrl) return plan.checkoutUrl;
  const id = plan.checkoutId || plan.id;
  return `${BILLING_URL}/?plan=${encodeURIComponent(id)}#pricing`;
}

function planCtaLabel(): string {
  return "Get started";
}

// There is NO free plan. The free path is the open source: every OSS release and
// OSS model is downloadable and self-hostable at no cost, which is a different
// offer from a $0 tier of the hosted product and should not be dressed up as
// one. A "Free" card sitting in the paid lineup read as the entry tier and
// buried the actual entry tier.
//
// So a plan priced at 0 is DROPPED here rather than removed from the catalog:
// /v1/billing/plans still serves `developer`, and the live response replaces
// this array wholesale on load. Filtering only the static list would be
// cosmetic — the fetched list has to be filtered too, which is why the filter
// lives in one function both paths run through.
const isSellable = (p: SubscriptionPlan) =>
  p.priceMonthly != null && p.priceMonthly > 0;

// There is no static ladder here any more. It used to be a hand-copied array of
// plan rows, which is precisely how this page came to publish Pro at one price
// while billing charged another: a copy cannot know its source moved. The
// first-paint fallback now comes from @hanzo/plans — the same package commerce
// seeds its catalog from — and the live catalog replaces it on load.

const PersonalPlans = () => {
  // Commerce is the price authority — /v1/billing/plans, fetched on load. The
  // static array is a first-paint fallback so the page never flashes empty, not
  // a second source of truth: whatever commerce returns replaces it wholesale.
  const [plans, setPlans] = useState<SubscriptionPlan[]>(fallbackPlans("personal").filter(isSellable));

  useEffect(() => {
    loadPlans("personal").then((live) => {
      const sellable = live.filter(isSellable);
      if (sellable.length) setPlans(sellable);
    });
  }, []);

  function formatPrice(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "Custom";
    return `$${plan.priceMonthly}`;
  }

  function billingPeriod(plan: SubscriptionPlan) {
    if (plan.contactSales || plan.priceMonthly == null) return "";
    return "/month";
  }

  const iconFallback = <Rocket className="h-6 w-6 text-muted-foreground" />;

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <PricingPlan
            key={plan.id}
            name={plan.name}
            icon={PLAN_ICONS[plan.id] || iconFallback}
            price={formatPrice(plan)}
            billingPeriod={billingPeriod(plan)}
            description={plan.description}
            features={plan.features}
            popular={plan.popular}
            checkoutUrl={planCheckoutUrl(plan)}
            ctaLabel={planCtaLabel()}
          />
        ))}
      </div>

      {/* The free path, stated as what it is. Not a plan — there is no $0 tier
          of the hosted product — but the OSS releases and OSS models are free to
          download and run yourself, and that is the honest answer to "is there a
          free option". Kept as one line under the plans so it cannot be mistaken
          for a fourth card. */}
      <p className="text-center text-sm text-muted-foreground">
        No free tier — but everything open source is free.{" "}
        <a
          href="https://github.com/hanzoai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Download the OSS releases and models
        </a>{" "}
        and run them yourself.
      </p>
    </div>
  );
};

export default PersonalPlans;
