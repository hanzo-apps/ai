/**
 * The subscription catalog, in one place, for every pricing surface.
 *
 * THERE ARE TWO CATALOGS AND THEY ARE DIFFERENT PRODUCTS. Confusing them is
 * what this module exists to prevent:
 *
 *   GET /v1/billing/plans   THIS ONE. commerce's subscription authority — the
 *                           same rows that charge. 17 plans across categories
 *                           personal/team/enterprise/world/social/dns, each
 *                           with `features`. Bare ARRAY, `slug`, `price` in
 *                           CENTS.
 *   GET /v1/plans           Cloud VM tiers — vcpus, memoryGB, diskGB. 11 rows,
 *                           NO `features` on any of them. Shaped `{plans:[…]}`.
 *
 * They collide on the words "pro" and "enterprise" and on nothing else: `pro`
 * the subscription is $20/mo, `pro` the VM tier is $25/mo for 2 vCPU. Reading
 * the VM catalog to render subscriptions is not a wrong number, it is a wrong
 * product — and it crashed this page. The team/enterprise view filtered /v1/plans
 * for `category === "enterprise"`, matched the $429 VM row, replaced the real
 * Team/Enterprise cards with it, and handed a card `features: undefined`. The
 * `.map()` over it took the whole pricing page down to "Something went wrong."
 * for anyone who clicked the tab.
 *
 * So the catalog is named once, mapped once, and guarded once, here.
 */

import { subscriptionPlans } from "@hanzo/plans";

/** A row exactly as GET /v1/billing/plans returns it. */
interface BillingPlan {
  slug: string;
  name: string;
  description: string;
  price: number | null;
  priceAnnual?: number | null;
  category: string;
  features?: string[];
  limits?: Record<string, number | null>;
  popular?: boolean;
  contactSales?: boolean;
  pricePerUser?: boolean;
  checkoutUrl?: string;
  checkoutId?: string;
}

/** A plan as the pricing cards render it: dollars, and features always present. */
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number | null;
  priceAnnual?: number | null;
  category: string;
  popular?: boolean;
  contactSales?: boolean;
  pricePerUser?: boolean;
  features: string[];
  limits?: Record<string, number | null>;
  payouts?: { idleResalePercent: number; description: string };
  checkoutUrl?: string;
  checkoutId?: string;
}

export const PLANS_API = "https://api.hanzo.ai/v1/billing/plans";

/**
 * Billing speaks CENTS; these pages render dollars. Converting here, once, at
 * the boundary — a price that is 100x wrong on a checkout page is the worst
 * possible rounding bug, so it converts in exactly one place and nowhere else.
 *
 * `features` defaults to [] because a card maps over it. A plan that arrives
 * without features should render as a plan with no features listed, never as a
 * blank page.
 */
function fromBillingPlan(p: BillingPlan): SubscriptionPlan {
  return {
    id: p.slug,
    name: p.name,
    description: p.description,
    priceMonthly: p.price == null ? null : p.price / 100,
    priceAnnual: p.priceAnnual == null ? null : p.priceAnnual / 100,
    category: p.category,
    popular: p.popular,
    contactSales: p.contactSales,
    pricePerUser: p.pricePerUser,
    features: p.features ?? [],
    limits: p.limits,
    checkoutUrl: p.checkoutUrl,
    checkoutId: p.checkoutId,
  };
}

/**
 * The plans in one category, live. Resolves to [] on any failure — every caller
 * holds a static fallback and keeps it rather than rendering an empty page, so
 * an empty result must be indistinguishable from "the fetch did not happen".
 */
export async function loadPlans(category: string): Promise<SubscriptionPlan[]> {
  try {
    const res = await fetch(PLANS_API);
    if (!res.ok) return [];
    const body = await res.json();
    // The catalog answers with a bare array. Tolerate {plans:[…]} so a proxy
    // that wraps it cannot silently yield zero rows.
    const rows: BillingPlan[] = Array.isArray(body) ? body : (body?.plans ?? []);
    return rows.filter((p) => p?.category === category).map(fromBillingPlan);
  } catch {
    return [];
  }
}

/**
 * The first-paint fallback, read from @hanzo/plans — the SAME package commerce
 * embeds and seeds its catalog from.
 *
 * This used to be an array hand-copied into each pricing component, which is how
 * the page came to advertise a ladder the catalog no longer sold: the copy has no
 * way to know the source moved. Reading the package makes the site and the biller
 * wrong together or right together, never separately, and a `pnpm update` is the
 * whole act of resyncing.
 *
 * It is still only a FALLBACK. Commerce is the authority — admin.hanzo.ai edits
 * rows the package does not know about — so `loadPlans` replaces this wholesale on
 * load. What it buys is that the pre-fetch paint is last-published rather than
 * last-remembered.
 */
export function fallbackPlans(category: string): SubscriptionPlan[] {
  return (subscriptionPlans as CatalogPlan[])
    .filter((p) => p.category === category)
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      // The package publishes DOLLARS; the wire publishes CENTS. These pages
      // render dollars, so this is the one conversion the package path needs and
      // fromBillingPlan is the one the wire path needs. Both land on dollars.
      priceMonthly: p.priceMonthly,
      priceAnnual: p.priceAnnual ?? undefined,
      category: p.category,
      popular: p.popular,
      contactSales: p.contactSales,
      pricePerUser: Boolean(p.price_ref?.recurring?.per_seat),
      features: p.features ?? [],
      limits: p.limits as Record<string, number | null> | undefined,
    }));
}

/** The published catalog row, as @hanzo/plans ships it. */
interface CatalogPlan {
  id: string;
  name: string;
  description?: string;
  priceMonthly: number | null;
  priceAnnual?: number | null;
  category: string;
  popular?: boolean;
  contactSales?: boolean;
  features?: string[];
  limits?: Record<string, unknown>;
  price_ref?: { recurring?: { per_seat?: boolean } };
}
