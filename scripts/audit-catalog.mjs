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
 * The site taxonomy is now DERIVED from the catalog (scripts/sync-catalog.mjs
 * writes lib/data/catalog.json, cloud-primitives.ts reads it), so the first link
 * holds by construction and e2e/catalog-agreement.spec.ts checks that the
 * committed snapshot still matches the live catalog rather than that two hand
 * lists agree.
 *
 * The second link is what this script holds. Each catalog product declares an
 * `apiPath`, and an `apiPath` is a promise: it says a reader who follows the
 * marketing page reaches an operation. Measured against the document
 * api.hanzo.ai actually serves, 31 of 84 products break that promise — every one
 * of them marked `"status": "enabled"`, every one of them a live 404.
 * `/v1/containers`, `/v1/cdn`, `/v1/hsm`, `/v1/attestations`, `/v1/settlement`,
 * `/v1/tokens`, `/v1/edge` are advertised and absent; `/v1/vpc`, `/v1/wallet`,
 * `/v1/alerts`, `/v1/dashboards`, `/v1/indexer` are real capabilities whose
 * apiPath is simply misspelled (`vpcs`, `wallets`, `o11y/alerts`,
 * `o11y/dashboards`, `indexers`); `/v1/cli`, `/v1/sdks`, `/v1/ide`,
 * `/v1/desktop`, `/v1/console`, `/v1/studio` are CLIENTS and were never going to
 * be HTTP operations at all.
 *
 * Those 31 are not rendered — the sync drops them — so this gate is no longer
 * what stands between a reader and a 404. It is what stops the catalog drifting
 * FURTHER from what is served, and therefore what stops the menu quietly
 * shrinking: every entry here is a product the site would otherwise be selling.
 *
 * RATCHET, NOT A WALL. Failing on all 31 today would make the gate un-adoptable,
 * so `KNOWN_UNSERVED` (scripts/catalog.mjs) records the ones we already know
 * about, each with the reason it is unserved. The list may only SHRINK — a
 * product that is not in it and does not answer fails the run, and an entry that
 * starts answering fails the run too, so a fix is forced to delete its own
 * exemption. That is the same shape as ALLOWED in scripts/audit-price-literals.mjs,
 * for the same reason.
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

import { KNOWN_UNSERVED, REASONS, read, serves } from "./catalog.mjs";

const JSON_OUT = process.argv.includes("--json");

async function main() {
  const { catalog, paths, error } = await read();
  if (error) {
    // The designed fallback, matching sync-pricing.mjs: no network is not a
    // verdict about the catalog, and a marketing page must not need the API up
    // to deploy.
    console.warn(`[catalog] SKIPPED — could not reach the API: ${error}`);
    return 0;
  }

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
