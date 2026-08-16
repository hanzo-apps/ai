'use client'

import React, { useEffect, useState } from "react";
import PricingPlan from "./PricingPlan";
import { Code, Zap, Users, Rocket, Sparkles } from "lucide-react";
import { loadPlans, fallbackPlans, sellableFeatures, type SubscriptionPlan } from "@/lib/plans";
import { Box } from '@hanzo/ui'

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

// Where an account is made. The same door the rest of the site sends people to.
const SIGNUP_URL = "https://console.hanzo.ai";

/**
 * The free tier, stated once.
 *
 * Free is NOT a billing row. It has no price, no checkout and no credit, so it
 * is not in the price catalog and does not pretend to be — putting a $0 row in
 * a catalog of things that charge would make every consumer of that catalog
 * filter it back out again, which is what `isSellable` was already doing.
 *
 * What it is, is the first rung, and it belongs first: an account, our free
 * models, a limited amount of use each day. The bullets say "limited" without a
 * number on purpose — the daily allowance is set by the free-model pool and
 * moves with it, and a number printed here would be a promise the pool has
 * never made.
 */
const FREE = {
  name: "Free",
  // Kept no longer than the longest catalog description (Go, 82 chars). The
  // card reserves a fixed block for this so every button lands on one line, and
  // a description that outruns the reserve pushes only its own card's button
  // down — which is what a 103-character first draft did at 1024.
  description: "An account, the free models, and a little compute to try Hanzo properly.",
  features: [
    "The free models, with a daily limit",
    "A small amount of sandbox compute",
    "Chat, the desktop app, and web search",
    "Community support",
    "Every open source release and model, free to self-host",
  ],
};

// What the CATALOG may contribute to the paid lineup: a row that charges.
//
// A zero here does not mean free — Enterprise is served at 0 to mean "ask us" —
// so a $0 row rendered as a plan card would print "Free" over a tier that is
// the most expensive thing we sell. Free is its own card above, written by
// hand because it has no billing row to read.
//
// The filter runs on the fetched list as well as the seeded one, because the
// live response replaces the array wholesale and a filter on only one path is
// a filter that does not hold.
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
    <Box className="max-w-6xl mx-auto mb-12">
      {/* The question a reader arrives with, answered before the prices.

          The measured funnel says they land here, see a monthly price next to
          AI they can get for nothing, and leave — 120 arrivals to 3 plan
          clicks. They leave because the page never answered it, so it is
          answered first, plainly, and in terms of what a plan actually buys:
          better models, higher limits, more compute. Nothing else is on offer
          and the page should not imply there is. */}
      <p className="max-w-2xl mx-auto mb-10 text-center text-base text-muted-foreground">
        <span className="text-foreground font-medium">Why pay when the AI is free?</span>{" "}
        Free gets you the free models with a daily limit and a little sandbox
        compute. Paid gets you the best models, higher limits, and real compute.
      </p>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Free leads. Everyone starts here, so it is the first thing read. */}
        <PricingPlan
          name={FREE.name}
          icon={<Sparkles className="h-6 w-6 text-muted-foreground" />}
          price="$0"
          billingPeriod="/month"
          description={FREE.description}
          features={FREE.features}
          checkoutUrl={SIGNUP_URL}
          ctaLabel="Get started free"
        />
        {plans.map((plan) => (
          <PricingPlan
            key={plan.id}
            name={plan.name}
            icon={PLAN_ICONS[plan.id] || iconFallback}
            price={formatPrice(plan)}
            billingPeriod={billingPeriod(plan)}
            description={plan.description}
            features={sellableFeatures(plan.features)}
            popular={plan.popular}
            checkoutUrl={planCheckoutUrl(plan)}
            ctaLabel={planCtaLabel()}
          />
        ))}
      </Box>

      {/* The free path is now a card, not a footnote, so this line carries the
          part a card cannot: the source is open, and running it yourself costs
          nothing at all. */}
      <p className="text-center text-sm text-muted-foreground">
        Every paid plan is month to month, cancel any time.{" "}
        <a
          href="https://github.com/hanzoai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 hover:no-underline"
        >
          Everything open source
        </a>{" "}
        is free to download and run yourself.
      </p>
    </Box>
  );
};

export default PersonalPlans;
