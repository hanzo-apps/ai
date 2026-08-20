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
const FAMILIES = resolve(ROOT, "lib/data/families.json");
const TOUR = resolve(ROOT, "lib/data/tour.json");
const DRY_RUN = process.argv.includes("--dry-run");

const VERBS = new Set(["get", "post", "put", "patch", "delete", "head", "options"]);

/** The family a path belongs to — the first segment after `/v1/`, or null. */
const family = (path) => (String(path ?? "").match(/^\/v1\/([^/]+)/) ?? [])[1] ?? null;

/**
 * A tag's description as one line about the family.
 *
 * The document writes these as Go package docs — "Package vector is …" — so the
 * opening names a package rather than the family the line already names, and
 * the sentences after the first are addressed to someone reading that package
 * rather than calling it. Both come off; nothing else is touched, because past
 * this point it is the API describing itself and not this repo describing it.
 */
const summarize = (description = "") => {
  const first = description.trim().split(/(?<=\.)\s+/)[0] ?? "";
  const body = first.replace(/^Package\s+\S+\s+(?:is\s+)?/, "");
  return body ? body[0].toUpperCase() + body.slice(1) : "";
};

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

/**
 * The families, out of the same document, into their own snapshot.
 *
 * A family is the first segment after `/v1/`, which is exactly what the document
 * tags its operations by — so the document STATES its families, one tag each,
 * with a sentence saying what the family is for. That makes "everything Hanzo
 * serves" a READ rather than a list somebody keeps, which is the whole reason
 * `/skill.md` can be handed to an agent and left alone (`scripts/skill.mjs`).
 *
 * BESIDE the catalog, not inside it, for two reasons. `lib/data/catalog.json` is
 * imported by the mega-menu and ships in the browser bundle, where a hundred and
 * eighty API summaries are dead weight. And the two answers have different
 * authorities: a product shrinking is a catalog fact and trips the ratchet
 * below, but a family is a fact about the DOCUMENT and must not be withheld
 * because a product line moved. One probe, two snapshots, two gates.
 *
 * The category is the catalog's, read off every advertised product rather than
 * the reachable ones: which category a product sits in is true whether or not
 * that particular path answers today.
 */
function writeFamilies(catalog, document) {
  const category = new Map();
  for (const p of catalog.products) {
    const f = family(p.apiPath);
    if (f && !category.has(f)) {
      category.set(f, catalog.categories.find((c) => c.label === p.category)?.id ?? p.category);
    }
  }

  const operations = new Map();
  for (const item of Object.values(document?.paths ?? {})) {
    for (const [method, op] of Object.entries(item)) {
      if (!VERBS.has(method)) continue;
      for (const tag of op?.tags ?? []) operations.set(tag, (operations.get(tag) ?? 0) + 1);
    }
  }

  const families = (document?.tags ?? []).map((t) => ({
    name: t.name,
    category: category.get(t.name) ?? null,
    operations: operations.get(t.name) ?? 0,
    summary: summarize(t.description),
  }));

  const held = load(FAMILIES)?.families?.length ?? 0;
  console.log(
    `[families] ${families.length} declared · ${families.filter((f) => f.category).length} the catalog places · ` +
      `${families.reduce((n, f) => n + f.operations, 0)} operations` +
      (held ? ` (committed snapshot holds ${held})` : "")
  );

  // A sentence on many families describes the PACKAGE that mounts them, not any
  // one of them, so `/v1/models` ends up reading as a note about how hanzoai/ai
  // is wired into the binary. Rewriting it here would be this repo inventing an
  // API description; the fix is the package's own doc comment. So it is printed
  // instead — the manifest ships what the document says, and what the document
  // says badly is named on every build until someone fixes it at the source.
  const shared = new Map();
  for (const f of families) if (f.summary) shared.set(f.summary, (shared.get(f.summary) ?? 0) + 1);
  for (const [summary, n] of [...shared].filter(([, n]) => n > 3).sort((a, b) => b[1] - a[1])) {
    console.warn(`[families] ${n} families share one sentence — ${summary.slice(0, 60)}…`);
  }
  // Same ratchet as the catalog's, for the same reason: a document that declares
  // fewer families than the one on disk is far likelier to be a degraded read
  // than a hundred families being retired at once, and writing it would quietly
  // shorten the manifest an agent trusts.
  if (families.length < held) {
    console.warn(
      `[families] keeping the committed snapshot — the document declares ${families.length}, fewer than ${held}`
    );
    return;
  }
  if (DRY_RUN) {
    console.log(`[families] --dry-run: would write ${FAMILIES}`);
    return;
  }

  writeFileSync(
    FAMILIES,
    JSON.stringify({ document: DOCUMENT_URL, fetched: new Date().toISOString(), families }, null, 2) + "\n"
  );
  console.log(`[families] wrote ${FAMILIES}`);
}

async function main() {
  const current = load(SNAPSHOT);

  console.log(`[catalog] fetching ${CATALOG_URL}`);
  console.log(`[catalog] probing  ${DOCUMENT_URL}`);
  const { catalog, document, paths, error } = await read();

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

  writeFamilies(catalog, document);

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
  // ── The tour, judged by the same document ────────────────────────────────
  //
  // The hero tells one story in a dozen beats, and every beat names a real
  // operation. It is resolved HERE, against the document that was just used to
  // decide which products exist, so a beat cannot outlive the operation it
  // describes: an unserved path is dropped with its reason printed, exactly as
  // an unreachable product is. The prose is ours; the verb, the path and the
  // one-line description are the API's own words, read out of the document.
  const declared = JSON.parse(readFileSync(TOUR, "utf8"));
  const beats = [];
  const droppedBeats = [];
  for (const b of declared.beats) {
    const op = document?.paths?.[b.path]?.[b.method.toLowerCase()];
    if (!op) {
      droppedBeats.push(b.path);
      continue;
    }
    beats.push({ ...b, summary: (op.summary ?? "").trim() });
  }
  if (droppedBeats.length) {
    console.log(`  tour: dropped ${droppedBeats.length} beat(s) the document does not serve — ${droppedBeats.join(", ")}`);
  }
  console.log(`[tour] ${beats.length}/${declared.beats.length} beats answer`);

  const next = {
    source: CATALOG_URL,
    document: DOCUMENT_URL,
    fetched: new Date().toISOString(),
    categories: [...categories].sort((a, b) => a.order - b.order),
    products: rendered.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order),
    excluded: excluded.sort((a, b) => a.id.localeCompare(b.id)),
    tour: { story: declared.story, beats },
  };

  if (DRY_RUN) {
    console.log(`[catalog] --dry-run: would write ${SNAPSHOT} and ${FAMILIES}`);
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
