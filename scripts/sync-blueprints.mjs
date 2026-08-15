/**
 * The OSS stacks, and what each costs to run — read from the cloud that prices
 * them, committed so the site builds without it.
 *
 *   GET /v1/blueprint/sbom   every blueprint's bill of images + its compute cost
 *
 * The estimate is NOT ours to invent. `apps/blueprint` parses each stack's own
 * docker-compose, sums the CPU and memory its services reserve, and prices that
 * through one rate card it states with the answer. So every figure on the
 * comparison page is a number the API produced from a file anyone can read, and
 * this script's whole job is to fetch it and refuse a bad one.
 *
 * `output: 'export'` cannot read the API at request time and the API pins CORS
 * to https://hanzo.ai exactly, so a preview deploy or a local render would get
 * nothing. The read happens here, at build time, or the page is a hand copy that
 * starts wrong the first time a rate moves.
 *
 * Three rules, the same three sync-pricing and sync-catalog hold:
 *
 *   never fail the build   no network -> keep the snapshot, exit 0. A marketing
 *                          page must not need the API up to deploy.
 *   never regress          fewer blueprints than the snapshot is far likelier to
 *                          be a degraded response than a retirement, and writing
 *                          it would silently empty the page.
 *   never go quiet         print what was written, and what it refused.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "lib", "data", "blueprints.json");
const API = "https://api.hanzo.ai/v1/blueprint/sbom";

const snapshot = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
const keep = (why) => {
  console.log(`  blueprints: ${why} — keeping the committed snapshot`);
  if (!snapshot) {
    // The page imports this file, so there is nothing to fall back to. Only
    // reachable before the first successful sync.
    console.error("  blueprints: and there is no snapshot on disk");
    process.exit(1);
  }
  process.exit(0);
};

let payload;
try {
  const res = await fetch(API, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) keep(`GET ${API} answered ${res.status}`);
  payload = await res.json();
} catch (err) {
  keep(String(err?.message ?? err));
}

const rows = Array.isArray(payload?.data) ? payload.data : null;
if (!rows) keep("the payload is not a blueprint list");
if (!rows.length) keep("the API returned no blueprints");

const priced = rows.filter(
  (r) => r?.templateId && Array.isArray(r.sbom) && Number(r.estCentsPerMonth) > 0,
);
if (!priced.length) keep("no blueprint came back with a price");

if (snapshot && priced.length < snapshot.blueprints.length) {
  const gone = snapshot.blueprints
    .map((b) => b.id)
    .filter((id) => !priced.some((r) => r.templateId === id));
  keep(`${priced.length} blueprints against ${snapshot.blueprints.length} committed (would drop ${gone.join(", ")})`);
}

const doc = {
  source: API,
  fetched: new Date().toISOString(),
  // The rate card travels WITH the numbers. A cost with no stated basis is a
  // number a reader cannot check, and this one is an estimate — it says so.
  rateCard: priced[0].rateCard ?? null,
  blueprints: priced
    .map((r) => ({
      id: r.templateId,
      images: r.sbom.map((s) => s.image),
      services: r.sbom.length,
      vcpuHr: r.vcpuHr,
      gbHr: r.gbHr,
      centsPerMonth: r.estCentsPerMonth,
    }))
    .sort((a, b) => a.centsPerMonth - b.centsPerMonth),
};

writeFileSync(OUT, `${JSON.stringify(doc, null, 2)}\n`);
const total = doc.blueprints.reduce((n, b) => n + b.centsPerMonth, 0);
console.log(
  `  blueprints: ${doc.blueprints.length} priced, $${(total / 100).toFixed(2)}/mo to run all of them`,
);
