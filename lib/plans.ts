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

import { useEffect, useState } from "react";
import { subscriptionPlans, blockchainPlans, servicePricing } from "@hanzo/plans";

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

/**
 * What a paid plan actually grants each month, and whether that covers its price.
 *
 * The credit is the strongest thing this page can say and it sat buried as the
 * last bullet in a feature list. It belongs beside the price — but only at the
 * amount the biller really pays out, which is NOT the field the feature strings
 * were written from.
 *
 * READ THE FIELD THE GRANT READS. commerce's IncludedMonthlyCents
 * (api/billing/plans.go) resolves the monthly allotment in this order:
 * includedCloudCredits, then includedCloudCreditsPerUser, then
 * includedCreditUsd. The order matters because plans set more than one: a plan
 * advertising includedCreditUsd while carrying a smaller includedCloudCredits
 * is granted the SMALLER number, and a page reading the advertised field states
 * a figure no account ever receives. Mirroring the precedence here means the
 * card and the ledger cannot disagree — whatever commerce decides to grant is
 * what the page claims, with no second opinion to keep in sync.
 *
 * `whole` is measured, not declared. It says the credit covers the whole
 * subscription price, so "every dollar back" appears only where that is
 * arithmetic rather than aspiration.
 */
export interface Credit {
  /** Dollars of spendable credit granted each month. */
  amount: number;
  /** The credit covers the whole subscription price. */
  whole: boolean;
}

export function credit(plan: SubscriptionPlan): Credit | null {
  const l = plan.limits;
  const amount =
    l?.includedCloudCredits ?? l?.includedCloudCreditsPerUser ?? l?.includedCreditUsd;
  if (amount == null || amount <= 0) return null;
  const monthly = plan.priceMonthly;
  return { amount, whole: monthly != null && monthly > 0 && amount >= monthly };
}

/**
 * The feature lines minus the one that restates the monthly credit.
 *
 * Every plan carries a bullet like "$49 of credit each month", written from the
 * advertised field rather than the granted one. Beside a block that states the
 * granted amount, that bullet is both a duplicate and a contradiction — one
 * card claiming two different numbers for the same thing, which is worse than
 * either number alone.
 *
 * The credit is stated ONCE, in the block, at the amount that is paid.
 *
 * The line is written three ways across the catalog and the published package —
 * "$5 of credit each month", "250 compute/API credits per month", "$5 of
 * foundational API gateway credits included" — so matching the month alone left
 * the third one sitting under its own box. It has to say CREDIT, and then
 * either name a month or name a figure.
 *
 * Checked against every row commerce serves: it takes those four lines and
 * nothing else. "Centralized, KMS-backed credentials" is not a credit, and
 * Team's "$25 per user per month" never claims to be one.
 */
export function featuresBeside(credit: Credit | null, features: string[]): string[] {
  if (!credit) return features;
  return features.filter(
    (f) => !(/credit/i.test(f) && (/\$\d/.test(f) || /month/i.test(f)))
  );
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

/* ── Blockchain (RPC + data APIs) ───────────────────────────────────────────
 *
 * A second catalog, same contract as the subscription one above: @hanzo/plans is
 * the source, GET /v1/pricing/blockchain is the live read, and the package is the
 * first-paint fallback. The rows are shaped differently — an RPC tier carries a
 * monthly price and compute-unit limits, a data API carries its own request
 * tiers — so they are normalized here rather than in each component.
 */

/** An RPC plan as the catalog publishes it. */
export interface RpcPlan {
  id: string;
  name: string;
  description: string;
  /** null means the price is a conversation, not free. */
  priceMonthly: number | null;
  features: string[];
  /** Overage in dollars per million compute units, when the plan meters it. */
  overagePerMillion?: number;
}

/** A data API and its request tiers. */
export interface DataApi {
  id: string;
  name: string;
  description: string;
  tiers: { name: string; priceMonthly: number; requestsMonthly: number }[];
}

export interface BlockchainCatalog {
  rpc: RpcPlan[];
  data: DataApi[];
}

const BLOCKCHAIN_API = "https://api.hanzo.ai/v1/pricing/blockchain";

interface CatalogBlockchainRow {
  id: string;
  name: string;
  type?: string;
  description?: string;
  priceMonthly?: number | null;
  features?: string[];
  limits?: { overagePerMillion?: number };
  tiers?: { name: string; priceMonthly: number; requestsMonthly: number }[];
}

function normalizeBlockchain(rows: CatalogBlockchainRow[]): BlockchainCatalog {
  return {
    rpc: rows
      .filter((r) => r.type === "rpc")
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? "",
        priceMonthly: r.priceMonthly ?? null,
        features: r.features ?? [],
        overagePerMillion: r.limits?.overagePerMillion,
      })),
    data: rows
      .filter((r) => r.type === "data")
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description ?? "",
        tiers: r.tiers ?? [],
      })),
  };
}

/** The published blockchain catalog, for first paint. */
export function fallbackBlockchain(): BlockchainCatalog {
  return normalizeBlockchain(blockchainPlans as unknown as CatalogBlockchainRow[]);
}

/**
 * The live blockchain catalog. Resolves to null on any failure so the caller
 * keeps its fallback — an empty tab is worse than a last-published one.
 */
export async function loadBlockchain(): Promise<BlockchainCatalog | null> {
  try {
    const res = await fetch(BLOCKCHAIN_API);
    if (!res.ok) return null;
    const body = await res.json();
    const rows: CatalogBlockchainRow[] = Array.isArray(body) ? body : (body?.plans ?? []);
    if (!rows.length) return null;
    return normalizeBlockchain(rows);
  } catch {
    return null;
  }
}

/** Dollars as the cards render them: 0 is Free, null is a conversation. */
export function formatCatalogPrice(v: number | null | undefined): string {
  if (v == null) return "Custom";
  if (v === 0) return "Free";
  return `$${v}`;
}

/* ── Managed services (Search, Crawl, Vector, Console, Managed) ─────────────
 *
 * Third catalog, same contract: @hanzo/plans paints first, GET
 * /v1/pricing/services replaces it on load. These are DISPLAY rate cards — what
 * a product costs — carrying no entitlement or limit fields, because nothing
 * bills off them and a number here must never become a grant.
 */

export interface ServiceTier {
  name: string;
  /** null means the price is a conversation, not free. */
  priceMonthly: number | null;
  description?: string;
  features?: string[];
  popular?: boolean;
  /** e.g. "+ usage" — rendered after the period. */
  periodNote?: string;
}

export interface ServiceUsageRate {
  resource: string;
  rate: number;
  unit: string;
  note?: string;
}

/** A row of the Managed Services comparison table. */
export interface ServiceTableRow {
  name: string;
  description: string;
  freeTier: string;
  price: string;
  note: string;
}

export interface ServiceCard {
  id: string;
  name: string;
  description: string;
  tiers?: ServiceTier[];
  usage?: ServiceUsageRate[];
  table?: ServiceTableRow[];
}

const SERVICES_API = "https://api.hanzo.ai/v1/pricing/services";

function servicesFrom(doc: unknown): ServiceCard[] {
  const list = (doc as { services?: ServiceCard[] })?.services;
  return Array.isArray(list) ? list : [];
}

/** The published service rate cards, for first paint. */
export function fallbackServices(): ServiceCard[] {
  return servicesFrom(servicePricing);
}

/** One service by catalog id, live-with-fallback, for a single-product tab. */
export function useServiceCard(id: string): ServiceCard | undefined {
  const [cards, setCards] = useState<ServiceCard[]>(fallbackServices);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(SERVICES_API);
        if (!res.ok) return;
        const live = servicesFrom(await res.json());
        if (live.length) setCards(live);
      } catch {
        /* keep the fallback — an empty tab is worse than a last-published one */
      }
    })();
  }, []);
  return cards.find((c) => c.id === id);
}

/** Dollars as the service cards render them: $2,499, not $2499. */
export function formatServicePrice(v: number | null | undefined): string {
  if (v == null) return "Custom";
  return `$${v.toLocaleString("en-US")}`;
}

/**
 * A usage rate as money. A sub-dollar rate needs at least two decimals to read as
 * a price at all — 0.1 is $0.10, not $0.1 — while keeping the precision the
 * catalog states, so $0.015/1K vectors does not round away to a cent.
 */
export function formatUsageRate(v: number): string {
  if (v >= 1) return `$${v.toLocaleString("en-US")}`;
  const decimals = (String(v).split(".")[1] ?? "").length;
  return `$${v.toFixed(Math.max(2, decimals))}`;
}
