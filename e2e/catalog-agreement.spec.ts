// The site's product taxonomy must agree with commerce's catalog.
//
// It used to be TWO hand-kept lists, and this file asked whether they matched.
// They did not: the site sold a "Payments" category commerce does not carry and
// had no column for the "Dev" one it does, so the categories test was red in
// both directions at once.
//
// The taxonomy is now DERIVED from the catalog — `scripts/sync-catalog.mjs`
// fetches it at build time and writes `lib/data/catalog.json`, which
// `lib/data/cloud-primitives.ts` reads — so "do the two lists match" is no
// longer a question anyone can answer wrongly. The question that replaced it is
// the one a build-time snapshot actually raises: IS THE SNAPSHOT STILL TRUE?
// A committed file goes stale silently, and the whole point of the snapshot is
// that the site can deploy without the API, which is exactly the condition
// under which nobody would notice.
//
// So this reads the LIVE catalog and the LIVE served document, and holds the
// committed snapshot to both:
//
//   1. the categories the site renders are the categories commerce carries
//   2. every product the site renders is still in the catalog
//   3. every product the site renders still ANSWERS — the inclusion gate is
//      re-measured here rather than trusted from build time
//   4. the catalog files nothing under a category the site has no column for
//
// (3) is the load-bearing one. The snapshot's promise is that nothing on this
// site advertises a capability that 404s; a promise kept only at build time is
// kept only until the API changes.
//
//   pnpm exec playwright test e2e/catalog-agreement.spec.ts
//   CATALOG_API=https://api.hanzo.ai pnpm exec playwright test e2e/catalog-agreement.spec.ts

import { test, expect } from "@playwright/test";
import { cloudCategories, categorySlugs } from "../lib/data/cloud-primitives";

const CATALOG_API = process.env.CATALOG_API ?? "https://api.hanzo.ai";
const CATALOG_URL = `${CATALOG_API}/v1/commerce/catalog?brand=hanzo`;
const DOCUMENT_URL = `${CATALOG_API}/v1/openapi.json`;

interface Catalog {
  brand: string;
  categories: { id: string; label: string; order: number }[];
  products: { id: string; slug: string; name: string; category: string; apiPath?: string; kind?: string }[];
}

async function json<T>(url: string): Promise<T> {
  const res = await fetch(url);
  // Deliberately NOT skipped on failure. These endpoints are public and
  // unauthenticated — the build itself reads them — so an unreachable API is a
  // finding, not a reason to pass quietly.
  expect(res.ok, `${url} answered ${res.status}`).toBe(true);
  return (await res.json()) as T;
}

/** Every product the site renders, flattened out of the derived taxonomy. */
const rendered = cloudCategories.flatMap((c) => c.items);

test.describe("site taxonomy vs commerce catalog", () => {
  test("categories match exactly", async () => {
    const catalog = await json<Catalog>(CATALOG_URL);
    const live = [...new Set(catalog.categories.map((c) => c.id))].sort();
    const site = [...new Set(categorySlugs)].sort();

    // Reported as two directions, because they mean different things: a category
    // commerce added is a family the site has no route for; one only the site has
    // is a menu column selling nothing. Both now mean the same CAUSE — a stale
    // lib/data/catalog.json — and the fix is `pnpm sync:catalog`.
    expect(
      live.filter((c) => !site.includes(c)),
      "commerce has categories the site does not route — the snapshot is stale",
    ).toEqual([]);
    expect(
      site.filter((c) => !live.includes(c)),
      "the site routes categories commerce does not carry — the snapshot is stale",
    ).toEqual([]);
  });

  test("every product the site renders is still in the catalog", async () => {
    const catalog = await json<Catalog>(CATALOG_URL);
    const live = new Set(catalog.products.map((p) => p.slug));

    expect(
      rendered.map((i) => i.slug).filter((s) => !live.has(s)),
      "the site renders products commerce no longer carries — re-run `pnpm sync:catalog`",
    ).toEqual([]);
  });

  test("every product the site renders still answers", async () => {
    const document = await json<{ paths: Record<string, unknown> }>(DOCUMENT_URL);
    const paths = Object.keys(document.paths ?? {});
    expect(paths.length, "the served document carries no paths").toBeGreaterThan(0);

    // The same predicate scripts/catalog.mjs applies at build time: the exact
    // path, or any path beneath it. Stated once there and once here because a
    // test that imports the thing it is checking proves only that the thing
    // agrees with itself.
    const serves = (api: string) =>
      paths.includes(api) || paths.some((p) => p.startsWith(api.replace(/\/$/, "") + "/"));

    // A leaf with no `api` is a CLIENT — a CLI, an SDK, the API reference.
    // Those consume the API and are judged by having a page, which
    // e2e/products.spec.ts measures; there is no operation to probe.
    const dead = rendered.filter((i) => i.api && !serves(i.api));
    expect(
      dead.map((i) => `${i.slug} -> ${i.api}`),
      "the site advertises capabilities api.hanzo.ai no longer serves",
    ).toEqual([]);
  });

  test("the catalog is grouped by categories the site renders", async () => {
    const catalog = await json<Catalog>(CATALOG_URL);
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
