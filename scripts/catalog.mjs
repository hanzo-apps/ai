/**
 * The commerce catalog, and whether api.hanzo.ai serves what it advertises.
 *
 * ONE probe, two callers, because there is one question underneath both:
 * does this product exist? `audit-catalog.mjs` asks it to GATE the build on new
 * drift; `sync-catalog.mjs` asks it to decide what the site renders. Writing the
 * predicate twice is how the gate and the menu come to disagree — the gate says
 * a product is missing while the menu still advertises it, which is the exact
 * shape of every drift this repo has already paid for.
 *
 * The authority is the SERVED DOCUMENT, not an HTTP probe of each path.
 * `/v1/openapi.json` is a projection of the routers cloud mounted, so a path in
 * it exists by construction and a path absent from it answers 404. Reading it
 * once is also the only form of this measurement that needs no credential, hits
 * no rate limit, and gives the same answer from any network — an HTTP probe
 * returns 401/403 for a path that exists and 404 for one that does not, which
 * is the same verdict obtained 84 times over with auth in the way.
 */

export const API = process.env.CATALOG_API ?? "https://api.hanzo.ai";
export const CATALOG_URL = `${API}/v1/commerce/catalog?brand=hanzo`;
export const DOCUMENT_URL = `${API}/v1/openapi.json`;

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
 *
 * The audit holds this as a RATCHET that may only shrink. The sync reads it for
 * one thing only — the word it prints beside an excluded product — so an
 * exclusion is always reported with its reason rather than as a bare count.
 */
export const KNOWN_UNSERVED = {
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
  // `tokens` was here, exempted as absent. It answers now — cloud serves
  // /v1/tokens/{chain}/{address} — so the ratchet demanded its own line back,
  // which is the whole point of it. The site renders the product.
  attestations: { why: "absent" },
  datasets: { why: "absent" },
  scores: { why: "absent" },
  "score-configs": { why: "absent" },
  "annotation-queues": { why: "absent" },
};

export const REASONS = ["renamed", "client", "external", "absent"];

/**
 * A product answers if the document carries its apiPath exactly, or carries any
 * path beneath it. The prefix case is not a loophole: `/v1/wallets` with only
 * `/v1/wallets/{id}` served still means a reader following that product reaches
 * a real operation, which is the whole claim an apiPath makes.
 */
export const serves = (paths, apiPath) => {
  if (!apiPath) return null;
  if (paths.has(apiPath)) return "exact";
  const under = apiPath.replace(/\/$/, "") + "/";
  for (const p of paths) if (p.startsWith(under)) return "prefix";
  return null;
};

const get = async (url) => {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
};

/**
 * Both documents, or the reason neither arrived.
 *
 * Returns `{ error }` rather than throwing: an unreachable API is a fact each
 * caller answers differently — the audit declines to judge, the sync keeps the
 * committed snapshot — and neither of those is an exception.
 */
export async function read() {
  try {
    const [catalog, document] = await Promise.all([get(CATALOG_URL), get(DOCUMENT_URL)]);
    return { catalog, paths: new Set(Object.keys(document?.paths ?? {})) };
  } catch (e) {
    return { error: e.message };
  }
}
