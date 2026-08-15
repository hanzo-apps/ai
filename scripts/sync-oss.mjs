/**
 * How many repositories we publish, read once per build instead of once per
 * visitor.
 *
 *   GET https://api.github.com/orgs/<org>   public_repos, per org
 *
 * The page used to ask this from the BROWSER, in a `useEffect`, six times, on
 * every load. Unauthenticated github.com allows 60 requests an hour per IP, so
 * six per view rate-limits a reader after ten pages and answers 403 for the
 * rest of the hour — and a 403 is exactly the case the page's own fallback
 * could not tell from a real answer. It is also the wrong question to ask a
 * reader's browser: how many repos an org has is the same for all of them, it
 * changes about as fast as a build, and it is a fact about US.
 *
 * Three rules, the same three every sync in this directory holds:
 *
 *   never fail the build   no network -> keep the snapshot, exit 0. A marketing
 *                          page must not need github.com up to deploy.
 *   never regress          a total below the snapshot's is far likelier to be a
 *                          rate-limited response counted as zero than a mass
 *                          deletion, and writing it would shrink the number the
 *                          page leads with.
 *   never go quiet         print every org, and print what it refused.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "lib", "data", "oss.json");
const API = "https://api.github.com/orgs";

/** The orgs we publish under. The page reads the snapshot, never this list. */
const ORGS = ["hanzoai", "luxfi", "zenlm", "hanzo-js", "hanzo-apps", "zoo-labs"];

const snapshot = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
const keep = (why) => {
  console.log(`  oss: ${why} — keeping the committed snapshot`);
  if (!snapshot) {
    // The page imports this file, so there is nothing to fall back to. Only
    // reachable before the first successful sync.
    console.error("  oss: and there is no snapshot on disk");
    process.exit(1);
  }
  process.exit(0);
};

const counted = [];
for (const name of ORGS) {
  try {
    const res = await fetch(`${API}/${name}`, {
      headers: { accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) keep(`GET ${API}/${name} answered ${res.status}`);
    const org = await res.json();
    const repos = Number(org?.public_repos);
    if (!Number.isFinite(repos) || repos <= 0) keep(`${name} reported no public repositories`);
    counted.push({ name, repos });
  } catch (err) {
    keep(String(err?.message ?? err));
  }
}

const repos = counted.reduce((n, o) => n + o.repos, 0);
if (snapshot && repos < snapshot.repos) {
  keep(`${repos} repositories against ${snapshot.repos} committed`);
}

const doc = { source: API, fetched: new Date().toISOString(), repos, orgs: counted };
writeFileSync(OUT, `${JSON.stringify(doc, null, 2)}\n`);
console.log(
  `  oss: ${repos} repositories across ${counted.length} orgs — ${counted
    .map((o) => `${o.name} ${o.repos}`)
    .join(", ")}`,
);
