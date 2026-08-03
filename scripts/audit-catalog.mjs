#!/usr/bin/env node
/**
 * Does every product we ADVERTISE actually answer?
 *
 * There is a chain of three lists, and until this script existed only two links
 * of it were checked:
 *
 *   site taxonomy  ->  commerce catalog  ->  the served OpenAPI document
 *   (cloud-primitives.ts)  (/v1/commerce/catalog)   (/v1/openapi.json)
 *   \________ e2e/catalog-agreement.spec.ts ______/
 *                                          \____ THIS SCRIPT ____/
 *
 * The first link is asserted by e2e/catalog-agreement.spec.ts: the site's
 * categories must equal the catalog's, and every routed product must exist in
 * commerce. That test passes today and is not the problem.
 *
 * The second link was asserted by NOTHING, and it is where the drift lives. Each
 * catalog product declares an `apiPath`, and an `apiPath` is a promise: it says
 * a reader who follows the marketing page reaches an operation. Measured against
 * the document api.hanzo.ai actually serves, 32 of 84 products broke that
 * promise — every one of them marked `"status": "enabled"`, every one of them a
 * live 404. `/v1/containers`, `/v1/cdn`, `/v1/hsm`, `/v1/attestations`,
 * `/v1/settlement`, `/v1/tokens`, `/v1/edge` are advertised and absent;
 * `/v1/vpc`, `/v1/wallet`, `/v1/alerts`, `/v1/dashboards`, `/v1/indexer` are
 * real capabilities whose apiPath is simply misspelled (`vpcs`, `wallets`,
 * `o11y/alerts`, `o11y/dashboards`, `indexers`); `/v1/cli`, `/v1/sdks`,
 * `/v1/ide`, `/v1/desktop`, `/v1/console`, `/v1/studio` are CLIENTS and were
 * never going to be HTTP operations at all.
 *
 * The document is the authority and needs no defending: it is a projection of
 * the routers cloud actually mounted, so a path in it is a path that exists by
 * construction. The catalog is the hand-maintained side, and this script is the
 * gate that stops it drifting further from what is served.
 *
 * RATCHET, NOT A WALL. Failing on all 32 today would make the gate un-adoptable,
 * so `KNOWN_UNSERVED` records the ones we already know about, each with the
 * reason it is unserved. The list may only SHRINK — a product that is not in it
 * and does not answer fails the run, and an entry that starts answering fails
 * the run too, so a fix is forced to delete its own exemption. That is the same
 * shape as ALLOWED in scripts/audit-price-literals.mjs, for the same reason.
 *
 * NEVER FAIL ON AN UNREACHABLE API. Identical to scripts/sync-pricing.mjs: a
 * marketing site must not need the API to be up in order to deploy. No network,
 * no verdict, exit 0, say so loudly.
 *
 * Usage:
 *   node scripts/audit-catalog.mjs
 *   node scripts/audit-catalog.mjs --json
 *   CATALOG_API=https://api.hanzo.ai node scripts/audit-catalog.mjs
 */

const API = process.env.CATALOG_API ?? "https://api.hanzo.ai";
const CATALOG_URL = `${API}/v1/commerce/catalog?brand=hanzo`;
const DOCUMENT_URL = `${API}/v1/openapi.json`;
const JSON_OUT = process.argv.includes("--json");

/**
 * Every product whose `apiPath` is known not to answer, and WHY. Four reasons,
 * and only one of them is a hole in the cloud:
 *
 *   renamed  — the capability is served, the apiPath is just the wrong spelling.
 *              `served` names the path that does answer. These are pure catalog
 *              bugs and the cheapest thing on this list to clear.
 *   client   — a CLI, SDK, IDE, desktop or web client. It consumes the API and
 *              is not an operation, so no apiPath can ever be right. These want
 *              a different field, not a different path.
 *   external — served by another network (Lux), not by api.hanzo.ai.
 *   absent   — ADVERTISED AND NOT BUILT. This is the only bucket that is a
 *              commercial problem, and the only one a code change here cannot
 *              fix. Clearing it means shipping the product.
 */
const KNOWN_UNSERVED = {
  // --- renamed: the capability exists, the apiPath does not ------------------
  vpc: { why: "renamed", served: "/v1/vpcs" },
  "load-balancer": { why: "renamed", served: "/v1/balancers" },
  wallet: { why: "renamed", served: "/v1/wallets" },
  alerts: { why: "renamed", served: "/v1/o11y/alerts" },
  dashboards: { why: "renamed", served: "/v1/o11y/dashboards" },
  indexer: { why: "renamed", served: "/v1/indexers" },
  "zero-trust": { why: "renamed", served: "/v1/networks" },
  "service-mesh": { why: "renamed", served: "/v1/mesh/services" },
  providers: { why: "renamed", served: "/v1/ai/providers" },
  containers: { why: "renamed", served: "/v1/platform/projects" },
  applications: { why: "renamed", served: "/v1/platform/projects" },
  kubernetes: { why: "renamed", served: "/v1/platform/fleet" },
  status: { why: "renamed", served: "/v1/platform/health" },

  // --- client: consumes the API, is not an operation -------------------------
  cli: { why: "client" },
  sdks: { why: "client" },
  ide: { why: "client" },
  desktop: { why: "client" },
  console: { why: "client" },
  studio: { why: "client" },
  api: { why: "client", note: "the API itself — /v1/api was never a route" },

  // --- external: another network serves it -----------------------------------
  nodes: { why: "external", note: "luxfi/node — Lux Network, not api.hanzo.ai" },

  // --- absent: advertised, enabled, and nothing serves it ---------------------
  edge: { why: "absent", note: "hanzoai/edge is real Rust, never mounted into cloud" },
  cdn: { why: "absent", note: "hanzoai/cdn is our own asset bucket, not a tenant product" },
  hsm: { why: "absent", note: "hanzoai/hsm is a Go library behind /v1/kms, not a surface" },
  mpc: { why: "absent" },
  settlement: { why: "absent", note: "only /v1/x402/settlements/{id} exists — no quote, no pay" },
  tokens: { why: "absent", note: "/v1/iam/tokens is auth tokens; there is no token product" },
  attestations: { why: "absent" },
  datasets: { why: "absent" },
  scores: { why: "absent" },
  "score-configs": { why: "absent" },
  "annotation-queues": { why: "absent" },
};

const REASONS = ["renamed", "client", "external", "absent"];

const get = async (url) => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
};

/**
 * A product answers if the document carries its apiPath exactly, or carries any
 * path beneath it. The prefix case is not a loophole: `/v1/wallets` with only
 * `/v1/wallets/{id}` served still means a reader following that product reaches
 * a real operation, which is the whole claim an apiPath makes.
 */
const serves = (paths, apiPath) => {
  if (!apiPath) return null;
  if (paths.has(apiPath)) return "exact";
  const under = apiPath.replace(/\/$/, "") + "/";
  for (const p of paths) if (p.startsWith(under)) return "prefix";
  return null;
};

async function main() {
  let catalog, document;
  try {
    [catalog, document] = await Promise.all([get(CATALOG_URL), get(DOCUMENT_URL)]);
  } catch (e) {
    // The designed fallback, matching sync-pricing.mjs: no network is not a
    // verdict about the catalog, and a marketing page must not need the API up
    // to deploy.
    console.warn(`[catalog] SKIPPED — could not reach the API: ${e.message}`);
    return 0;
  }

  const paths = new Set(Object.keys(document.paths ?? {}));
  const products = catalog.products ?? [];
  if (!products.length) throw new Error("catalog served no products");

  const served = [];
  const unserved = [];
  for (const p of products) {
    const how = serves(paths, p.apiPath);
    (how ? served : unserved).push({ ...p, how });
  }

  // A product that fails and is NOT on the ratchet: new drift, fail.
  const undeclared = unserved.filter((p) => !KNOWN_UNSERVED[p.id]);
  // A ratchet entry that now answers, or that names a product the catalog
  // dropped: stale exemption, fail. The list may only shrink.
  const servedIds = new Set(served.map((p) => p.id));
  const productIds = new Set(products.map((p) => p.id));
  const stale = Object.keys(KNOWN_UNSERVED).filter(
    (id) => servedIds.has(id) || !productIds.has(id)
  );

  const byReason = Object.fromEntries(REASONS.map((r) => [r, []]));
  for (const p of unserved) {
    const known = KNOWN_UNSERVED[p.id];
    if (known) byReason[known.why].push({ ...p, ...known });
  }

  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        { products: products.length, served: served.length, unserved: unserved.length, byReason, undeclared, stale },
        null,
        2
      )
    );
  } else {
    const pct = Math.round((served.length / products.length) * 100);
    console.log(
      `[catalog] ${products.length} products advertised · ${served.length} answer (${pct}%) · ${unserved.length} do not`
    );
    for (const r of REASONS) {
      const rows = byReason[r];
      if (!rows.length) continue;
      console.log(`\n  ${r} (${rows.length})`);
      for (const p of rows.sort((a, b) => a.id.localeCompare(b.id))) {
        const to = p.served ? ` -> ${p.served}` : p.note ? ` — ${p.note}` : "";
        console.log(`    ${p.category.padEnd(9)} ${p.id.padEnd(20)} ${String(p.apiPath).padEnd(28)}${to}`);
      }
    }
    console.log(
      `\n  Only "absent" is a hole in the cloud. "renamed" is ${byReason.renamed.length} one-line\n` +
        `  catalog fixes; "client" wants a kind field, not an apiPath; "external" is Lux.`
    );
  }

  if (undeclared.length) {
    console.error(
      `\n[catalog] FAIL — ${undeclared.length} product(s) advertise an apiPath nothing serves and\n` +
        `are not on the ratchet:\n` +
        undeclared.map((p) => `  ${p.id} (${p.category}) -> ${p.apiPath}`).join("\n") +
        `\n\nFix the catalog in commerce so the path matches what cloud mounts. Adding an\n` +
        `entry to KNOWN_UNSERVED is not the fix — that list is meant to shrink.`
    );
    return 1;
  }
  if (stale.length) {
    console.error(
      `\n[catalog] FAIL — ${stale.length} stale exemption(s): ${stale.join(", ")}\n` +
        `They now answer, or the catalog no longer carries them. Delete them from\n` +
        `KNOWN_UNSERVED — a fix must remove its own exemption.`
    );
    return 1;
  }

  console.log(
    `\n[catalog] OK — no new drift. ${Object.keys(KNOWN_UNSERVED).length} known exemption(s) remaining, ` +
      `${byReason.absent.length} of them advertised-and-absent.`
  );
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`[catalog] ${err.message}`);
    process.exit(1);
  });
