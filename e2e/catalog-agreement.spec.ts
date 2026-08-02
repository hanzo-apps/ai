// The site's product taxonomy must agree with commerce's catalog.
//
// Everything else about the taxonomy is already covered: mega-menu.spec proves it
// RENDERS, products.spec proves every leaf serves a real page, products-audit
// proves each page has a hero and a deploy CTA. All three ask whether the site is
// coherent WITH ITSELF. None asks whether it still agrees with the system that
// actually sells these products.
//
// That gap is not hypothetical. Every other place this site stated a price or a
// product independently had drifted by the time anyone looked: the pricing page
// published Pro at $49 while billing charged $20, the Blockchain tab carried a
// Wallet API ladder the catalog contradicted, and Hanzo Vector was advertised at
// two different prices on two tabs of the same page.
//
// The CATEGORIES are the part that must match exactly. They are the taxonomy's
// spine — they name the mega-menu's columns, generate the /products/<id> routes,
// and are what commerce groups its own products by. A category commerce adds and
// the site does not know about is a product family with no route.
//
// The PRODUCTS deliberately do NOT have to match. The mega-menu shows a curated
// handful per category (six, for a two-row layout) out of the ~84 commerce
// carries; that is an editorial decision about a menu, not drift. What IS checked
// is the direction that can only be a mistake: a product the SITE routes to that
// commerce does not carry at all.
//
//   pnpm exec playwright test e2e/catalog-agreement.spec.ts
//   CATALOG_API=https://api.hanzo.ai pnpm exec playwright test e2e/catalog-agreement.spec.ts

import { test, expect } from "@playwright/test";
import { cloudCategories, categorySlugs } from "../lib/data/cloud-primitives";

const CATALOG_API = process.env.CATALOG_API ?? "https://api.hanzo.ai";
const CATALOG_URL = `${CATALOG_API}/v1/commerce/catalog?brand=hanzo`;

interface Catalog {
  brand: string;
  categories: { id: string; label: string; order: number }[];
  products: { id: string; slug: string; name: string; category: string }[];
}

async function fetchCatalog(): Promise<Catalog> {
  const res = await fetch(CATALOG_URL);
  // Deliberately NOT skipped on failure. This endpoint is public and unauthenticated
  // — the site itself would read it — so an unreachable catalog is a finding, not a
  // reason to pass quietly.
  expect(res.ok, `${CATALOG_URL} answered ${res.status}`).toBe(true);
  return (await res.json()) as Catalog;
}

test.describe("site taxonomy vs commerce catalog", () => {
  test("categories match exactly", async () => {
    const catalog = await fetchCatalog();
    const live = [...new Set(catalog.categories.map((c) => c.id))].sort();
    const site = [...new Set(categorySlugs)].sort();

    // Reported as two directions, because they mean different things: a category
    // commerce added is a family the site has no route for; one only the site has
    // is a menu column selling nothing.
    expect(
      live.filter((c) => !site.includes(c)),
      "commerce has categories the site does not route",
    ).toEqual([]);
    expect(
      site.filter((c) => !live.includes(c)),
      "the site routes categories commerce does not carry",
    ).toEqual([]);
  });

  test("every product the site routes to exists in the catalog", async () => {
    const catalog = await fetchCatalog();
    const live = new Set(catalog.products.map((p) => p.slug));

    // Only the leaves that resolve to a GENERATED overview page. A bespoke page
    // may legitimately describe something the catalog does not sell as a product
    // (a concept page, a comparison); a generated one is rendered FROM the
    // product, so it has to have one.
    const routed = cloudCategories
      .flatMap((c) => c.items)
      .filter((i) => i.slug && i.href?.startsWith("/cloud/"))
      .map((i) => i.slug as string);

    // KNOWN ORPHANS, pinned rather than ignored. Each is a page this site
    // generates for something commerce's catalog does not carry, and each is an
    // open product question rather than a bug to silently paper over:
    //
    //   jobs  — commerce carries `tasks` in the same category. Almost certainly
    //           the same capability renamed on one side only.
    //   cost  — commerce carries `billing` under Observe. Same shape of rename.
    //   fine-tuning — commerce's AI category has no counterpart at all
    //           (agents, embeddings, inference, models, playground, prompts,
    //           providers). Either it is a product the catalog is missing, or a
    //           page for something we do not sell as one.
    //
    // Listing them keeps this test honest AND useful: it goes green on the drift
    // that already exists and red the moment a FOURTH appears. Resolving one means
    // deleting its line here — which is the point, because an allowlist nobody has
    // to shrink is an allowlist that grows.
    const KNOWN_ORPHANS = new Set(["jobs", "cost", "fine-tuning"]);

    const orphans = [...new Set(routed)].filter((s) => !live.has(s));
    expect(
      orphans.filter((s) => !KNOWN_ORPHANS.has(s)),
      "the site generates overview pages for products commerce does not carry",
    ).toEqual([]);

    // And the allowlist must not outlive its entries: if commerce starts carrying
    // one, the line goes stale and this says so rather than quietly protecting it.
    expect(
      [...KNOWN_ORPHANS].filter((s) => live.has(s)),
      "these are no longer orphans — remove them from KNOWN_ORPHANS",
    ).toEqual([]);
  });

  test("the catalog is grouped by categories the site renders", async () => {
    const catalog = await fetchCatalog();
    // products[].category carries the LABEL ("AI"), categories[].id the slug
    // ("ai"). Comparing one to the other reports every category as missing — a
    // false alarm about field NAMES rather than a real disagreement about values.
    const labels = new Set(catalog.categories.map((c) => c.label));
    const stray = [...new Set(catalog.products.map((p) => p.category))].filter(
      (c) => !labels.has(c),
    );
    expect(
      stray,
      "commerce files products under categories the site has no column for",
    ).toEqual([]);
  });
});
