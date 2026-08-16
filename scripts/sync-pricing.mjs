#!/usr/bin/env node
/**
 * Refresh the committed pricing snapshot from the catalog that owns it.
 *
 * A per-token price has ONE owner — the catalog in commerce.hanzo.ai, published
 * at api.hanzo.ai/v1/pricing (see scripts/audit-price-literals.mjs, which fails
 * the build on any second copy). The page reads that catalog live, but a live
 * read cannot be the only path: the API sets `access-control-allow-origin` to
 * https://hanzo.ai exactly, so every preview deploy, every local run and every
 * reader whose request fails renders the committed snapshot instead.
 *
 * That snapshot is therefore load-bearing, and it rotted precisely because
 * nothing refreshed it: this script existed but was never invoked, so
 * lib/data/pricing.json sat at a hand-run fetch while the catalog moved on.
 * `prebuild` now runs it, which is the whole fix — the snapshot is re-fetched
 * on every build or it is not shipped at all.
 *
 * Three rules make it safe to run unattended:
 *
 *   NEVER FAIL THE BUILD on an unreachable API. The committed snapshot is the
 *   designed fallback; refusing to build without a network would make a
 *   marketing page depend on an API being up to deploy.
 *
 *   NEVER REGRESS. The endpoint currently serves a snapshot OLDER than the one
 *   committed here. Writing it would quietly delete four months of catalog. A
 *   payload is only written when it is genuinely newer.
 *
 *   NEVER GO QUIET. Every run prints what it fetched, how old it is, and
 *   whether Enso is in it — because the failure this repo actually had was not
 *   a wrong number, it was an absent one that nothing announced.
 *
 * Usage:
 *   node scripts/sync-pricing.mjs
 *   node scripts/sync-pricing.mjs --dry-run
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// ONE snapshot: the file the page actually imports. There used to be a second
// copy at data/pricing.json that nothing read — a stale duplicate of a file
// whose whole problem is duplicated prices.
const SNAPSHOT = resolve(ROOT, "lib/data/pricing.json");
const API = process.env.PRICING_API_URL || "https://api.hanzo.ai/v1/pricing";
// The SERVING catalog, which is a different question from the priced one and is
// the question the copy asks. `/v1/pricing` lists what has a published rate (432);
// `/v1/models` lists what the gateway will actually answer for (527, zen and enso
// included). The site said "400+" off the first while a caller could reach a
// hundred more — under-reporting our own catalog by a full hundred.
const MODELS_API = process.env.MODELS_API_URL || "https://api.hanzo.ai/v1/models";
const DRY_RUN = process.argv.includes("--dry-run");

// Enso is the flagship family and the reason this script now runs on every
// build: the public price list showed no Enso at all, and nothing said so.
const ENSO = /^enso(-|$)/;

const read = (path) => {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
};

const stamp = (v) => {
  const t = Date.parse(v ?? "");
  return Number.isNaN(t) ? null : t;
};

const ensoIn = (doc) =>
  (doc?.hanzoModels ?? []).filter((m) => ENSO.test(String(m?.name ?? ""))).map((m) => m.name);

// `ok: false` is a reason to keep what we have, never a reason to stop the build.
/** How many models the gateway will answer for. `null` on any failure — this
 *  must never fail a build, exactly like the catalog fetch above it. */
async function fetchServed() {
  try {
    const res = await fetch(MODELS_API, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const doc = await res.json();
    const rows = Array.isArray(doc?.data) ? doc.data : null;
    return rows && rows.length > 0 ? rows.length : null;
  } catch {
    return null;
  }
}

async function fetchCatalog() {
  try {
    const res = await fetch(API, { headers: { accept: "application/json" } });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const doc = await res.json();
    if (!doc || typeof doc !== "object" || !Array.isArray(doc.hanzoModels)) {
      return { error: "payload is not a catalog (no hanzoModels array)" };
    }
    return { doc };
  } catch (e) {
    return { error: e.message };
  }
}

const keep = (why, current, servedModels) => {
  console.warn(`[pricing] keeping the committed snapshot — ${why}`);
  // HOW MANY MODELS ANSWER is a different fact from WHAT THEY COST, and it moves
  // on its own schedule. Gating it on the priced catalog's `updated` stamp is why
  // the site kept saying 400+ while the gateway served 527: the rates had not
  // changed, so the count that had nothing to do with them was never written.
  if (current && servedModels !== undefined && servedModels !== current.servedModels) {
    writeFileSync(SNAPSHOT, JSON.stringify({ ...current, servedModels }, null, 2) + "\n");
    console.log(`[pricing] updated servedModels to ${servedModels}`);
  }
  return 0;
};

async function main() {
  const current = read(SNAPSHOT);
  if (!current) {
    // No fallback on disk at all: the page would ship with nothing, so this is
    // the one case where a failed fetch is fatal.
    console.error(`[pricing] no snapshot at ${SNAPSHOT}`);
  }

  console.log(`[pricing] fetching ${API}`);
  const { doc, error } = await fetchCatalog();

  const served = await fetchServed();
  if (served === null) {
    console.log(`[pricing] ${MODELS_API} unreachable — keeping the committed servedModels`);
  } else {
    console.log(`[pricing] gateway serves ${served} models`);
  }
  // Never regress a count: a smaller answer is far more likely a degraded
  // response than a hundred models being withdrawn, and writing it would quietly
  // shrink every claim on the site.
  const heldServed = current?.servedModels ?? 0;
  if (served !== null && served < heldServed) {
    console.log(`[pricing] REFUSED servedModels ${served} < committed ${heldServed}`);
  }
  const servedModels =
    served !== null && served >= heldServed ? served : current?.servedModels;

  if (error) {
    if (!current) throw new Error(`no snapshot on disk and the catalog is unreachable: ${error}`);
    return keep(error, current, servedModels);
  }

  const fresh = stamp(doc.updated);
  const held = stamp(current?.updated);
  const enso = ensoIn(doc);

  console.log(
    `[pricing] catalog says updated=${doc.updated ?? "(none)"} ` +
      `hanzoModels=${doc.hanzoModels.length} thirdParty=${doc.thirdPartyModels?.length ?? 0} ` +
      `enso=${enso.length ? enso.join(",") : "NONE"}`
  );

  if (current && fresh !== null && held !== null && fresh <= held) {
    return keep(
      `the catalog is serving ${doc.updated}, which is not newer than the committed ${current.updated}`,
      current,
      servedModels
    );
  }
  if (current && (fresh === null || held === null)) {
    return keep(
      "either the catalog or the snapshot has no usable `updated` stamp to compare",
      current,
      servedModels
    );
  }

  // Provenance travels WITH the data: where it came from and when it was taken.
  // A snapshot that cannot say how old it is rots invisibly, which is how this
  // file reached four months stale without anyone noticing.
  const next = {
    ...doc,
    ...(servedModels === undefined ? {} : { servedModels }),
    source: API,
    fetched: new Date().toISOString(),
  };

  if (DRY_RUN) {
    console.log(`[pricing] --dry-run: would write ${SNAPSHOT}`);
    return 0;
  }

  writeFileSync(SNAPSHOT, JSON.stringify(next, null, 2) + "\n");
  console.log(`[pricing] wrote ${SNAPSHOT}`);
  return 0;
}

main()
  .then((code) => {
    const doc = read(SNAPSHOT);
    const enso = ensoIn(doc);
    if (enso.length) {
      console.log(`[pricing] snapshot carries Enso: ${enso.join(", ")}`);
    } else {
      // Loud, and on every single build, until commerce publishes it. The cards
      // render Enso first when the rows exist (components/pricing/APIPricing.tsx
      // sorts on ENSO_ORDER) — there is nothing to fix here but the catalog.
      console.warn(
        `[pricing] NO ENSO in the snapshot (${doc?.updated ?? "unknown"}). The public\n` +
          `          price list will not show the flagship family until commerce publishes\n` +
          `          it to ${API}. Do not hand-type the rates — re-run this script once it lands.`
      );
    }
    process.exit(code);
  })
  .catch((err) => {
    console.error(`[pricing] ${err.message}`);
    process.exit(1);
  });
