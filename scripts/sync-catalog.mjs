#!/usr/bin/env node
/**
 * Refresh the committed product snapshot from the catalog that owns it.
 *
 * WHICH products exist has one owner — the commerce catalog at
 * api.hanzo.ai/v1/commerce/catalog. This site used to keep its own answer: a
 * hand-typed taxonomy of ten categories that had drifted into disagreeing with
 * commerce about the categories themselves (the site sold "Payments", commerce
 * sells "Dev") and about roughly half the leaves. Two lists, no reconciliation,
 * and the e2e agreement test red for both directions at once.
 *
 * So the catalog is now the source and this script is the one hydration point.
 * It cannot be a browser fetch: `output: 'export'` ships static HTML, and the
 * API pins `access-control-allow-origin` to https://hanzo.ai exactly, so every
 * preview deploy and every local render would get nothing and the menu would be
 * empty. It runs at BUILD time, writes lib/data/catalog.json, and the taxonomy
 * reads that file.
 *
 * REACHABILITY IS THE INCLUSION GATE, and it is what makes hydration safe.
 * Every product the catalog advertises declares an `apiPath`; 31 of the 84 name
 * a path api.hanzo.ai does not serve, all 31 marked `"status": "enabled"`, all
 * 31 a live 404 (scripts/audit-catalog.mjs measures this and gates the build on
 * it getting worse). Rendering the catalog raw would therefore have made the
 * site WORSE than the hand list it replaces. A product is written to the
 * snapshot iff the served document carries its apiPath — which is what "this
 * product exists" means — so the menu is dynamic AND structurally unable to
 * advertise something that does not answer.
 *
 * A CLIENT is judged differently, and it is not an exception to that rule but
 * the same rule applied to a different kind of thing. The CLI, the SDKs, the
 * desktop app and the API reference consume the API; no apiPath can ever be
 * right for them, which is why every one of them lands in the unserved 31. They
 * exist iff this site has a page for them, so that is what is checked. Products
 * carry `kind: "client"` in commerce; until that field lands they simply fail
 * the apiPath test and are excluded, which is the safe direction.
 *
 * The DESTINATION is resolved here too, against the filesystem, because that is
 * the only place the answer is knowable: a product links to its bespoke page
 * when this repo has one and to a generated /cloud/<slug> overview when it does
 * not. `cloudPrimitiveSlugs` builds a page for every one of the latter, so a
 * rendered leaf cannot be a 404 in either branch.
 *
 * Three rules make it safe to run unattended, the same three as
 * scripts/sync-pricing.mjs and for the same reasons:
 *
 *   NEVER FAIL THE BUILD on an unreachable API. The committed snapshot is the
 *   designed fallback; a marketing site must not need the API up to deploy.
 *
 *   NEVER REGRESS. A payload that is not a catalog, or that renders FEWER
 *   products than the committed snapshot, is far more likely to be a degraded
 *   response than a product line being retired — and writing it would silently
 *   empty the menu. It is kept out, and what it would have dropped is printed.
 *   A genuine retirement is accepted by deleting that product from the
 *   committed snapshot: the next run then sees no shrink and writes.
 *
 *   NEVER GO QUIET. Every run prints what it fetched, what it rendered, and
 *   what it excluded grouped by reason — because the failure this repo actually
 *   had was not a wrong list, it was a stale one that nothing announced.
 *
 * Usage:
 *   node scripts/sync-catalog.mjs
 *   node scripts/sync-catalog.mjs --dry-run
 */

import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { CATALOG_URL, DOCUMENT_URL, KNOWN_UNSERVED, read, serves } from "./catalog.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SNAPSHOT = resolve(ROOT, "lib/data/catalog.json");
const DRY_RUN = process.argv.includes("--dry-run");

const load = (path) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
};

/**
 * The bespoke page this repo publishes for a route, or null.
 *
 * Read off the filesystem rather than declared beside the product: a table of
 * "which routes have a page" is a second copy of what `app/` already says, and
 * the copy is what goes stale. One segment only — every catalog route is one,
 * and a nested one would need a matching route group to be resolvable here.
 */
const bespoke = (route) => {
  const seg = String(route ?? "").replace(/^\//, "");
  if (!seg || seg.includes("/")) return null;
  const has = [`app/(marketing)/${seg}/page.tsx`, `app/${seg}/page.tsx`].some((p) =>
    existsSync(resolve(ROOT, p))
  );
  return has ? `/${seg}` : null;
};

const keep = (why) => {
  console.warn(`[catalog] keeping the committed snapshot — ${why}`);
  return 0;
};

async function main() {
  const current = load(SNAPSHOT);

  console.log(`[catalog] fetching ${CATALOG_URL}`);
  console.log(`[catalog] probing  ${DOCUMENT_URL}`);
  const { catalog, paths, error } = await read();

  if (error) {
    // No fallback on disk at all: the taxonomy imports this file, so the build
    // would fail at the import. That is the one case where a failed fetch is
    // fatal, and it can only happen before the first successful sync.
    if (!current) throw new Error(`no snapshot at ${SNAPSHOT} and the catalog is unreachable: ${error}`);
    return keep(error);
  }

  const categories = catalog?.categories ?? [];
  const products = catalog?.products ?? [];
  if (!Array.isArray(categories) || !Array.isArray(products) || !products.length || !categories.length) {
    if (!current) throw new Error("the catalog served no products and there is no snapshot on disk");
    return keep("the payload is not a catalog (no categories/products)");
  }
  if (!paths.size) {
    if (!current) throw new Error("the served document has no paths and there is no snapshot on disk");
    return keep("the served document carries no paths, so nothing could be judged reachable");
  }

  const rendered = [];
  const excluded = [];
  for (const p of products) {
    const client = p.kind === "client";
    const page = bespoke(p.route);
    const how = client ? (page ? "page" : null) : serves(paths, p.apiPath);
    if (!how) {
      excluded.push({
        id: p.id,
        category: p.category,
        api: p.apiPath ?? null,
        // The audit already names the reason for every one of these; repeating
        // its judgement here would be a second opinion about one fact.
        why: KNOWN_UNSERVED[p.id]?.why ?? (client ? "client" : "undeclared"),
      });
      continue;
    }
    rendered.push({
      id: p.id,
      name: p.name,
      // The category ID, not its label: the label is display copy and the ID is
      // what /products/<id> is keyed by, and slugifying the label to recover the
      // ID is a computation over a value the catalog already states.
      category: categories.find((c) => c.label === p.category)?.id ?? p.category,
      slug: p.slug,
      href: page ?? `/cloud/${p.slug}`,
      icon: p.iconKey ?? null,
      // A client's apiPath is the one field on it that is never true — every
      // one of them names a route that 404s, which is why they are judged by
      // their page instead. Carrying it forward would put a dead path on a
      // marketing page under the heading "API".
      api: client ? null : (p.apiPath ?? null),
      docs: p.docsUrl ?? null,
      repo: p.repo ?? null,
      gcp: p.gcp ?? null,
      order: p.order ?? 0,
      ...(p.kind ? { kind: p.kind } : {}),
    });
  }

  const held = current?.products?.length ?? 0;
  console.log(
    `[catalog] ${products.length} advertised · ${rendered.length} reachable · ${excluded.length} excluded` +
      (current ? ` (committed snapshot holds ${held})` : "")
  );
  const byReason = {};
  for (const e of excluded) (byReason[e.why] ??= []).push(e.id);
  for (const [why, ids] of Object.entries(byReason).sort()) {
    console.log(`  ${why.padEnd(10)} ${ids.length}  ${ids.sort().join(", ")}`);
  }

  if (current && rendered.length < held) {
    const gone = rendered.map((p) => p.id);
    return keep(
      `it renders ${rendered.length}, fewer than the committed ${held}. Would have dropped: ` +
        `${current.products.map((p) => p.id).filter((id) => !gone.includes(id)).join(", ")}.\n` +
        `          If that is a real retirement, delete those rows from ${SNAPSHOT} and re-run.`
    );
  }

  // Provenance travels WITH the data: both sources, and when they were read. A
  // snapshot that cannot say how old it is rots invisibly, which is how this
  // repo's pricing snapshot reached four months stale without anyone noticing.
  // `excluded` is provenance too — without it the file cannot say why it holds
  // 53 rows rather than the 84 the catalog advertises.
  const next = {
    source: CATALOG_URL,
    document: DOCUMENT_URL,
    fetched: new Date().toISOString(),
    categories: [...categories].sort((a, b) => a.order - b.order),
    products: rendered.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order),
    excluded: excluded.sort((a, b) => a.id.localeCompare(b.id)),
  };

  if (DRY_RUN) {
    console.log(`[catalog] --dry-run: would write ${SNAPSHOT}`);
    return 0;
  }

  writeFileSync(SNAPSHOT, JSON.stringify(next, null, 2) + "\n");
  console.log(`[catalog] wrote ${SNAPSHOT}`);
  return 0;
}

main()
  .then((code) => {
    const doc = load(SNAPSHOT);
    const generated = (doc?.products ?? []).filter((p) => p.href?.startsWith("/cloud/"));
    console.log(
      `[catalog] snapshot: ${doc?.categories?.length ?? 0} categories · ` +
        `${doc?.products?.length ?? 0} products (${generated.length} on generated overviews) · ` +
        `fetched ${doc?.fetched ?? "unknown"}`
    );
    process.exit(code);
  })
  .catch((err) => {
    console.error(`[catalog] ${err.message}`);
    process.exit(1);
  });
