#!/usr/bin/env node
/**
 * How many models Hanzo serves is ONE fact, so it is stated in ONE place.
 *
 * This site quoted it eighteen times in three different numbers — "100+", "130+"
 * and "400+" — and none was reached by editing the others. The estate was worse:
 * 85+, 200+ and a bare 340 on other surfaces. A reader comparing two pages saw us
 * disagree about our own catalog, and no build ever noticed.
 *
 * The count now derives from lib/data/pricing.json (the same snapshot every price
 * comes from, refreshed by scripts/sync-pricing.mjs) via lib/data/model-count.ts.
 * This gate fails the build on a new hand-typed one, the way
 * audit-price-literals.mjs does for a rate.
 *
 * Sibling of that script by design — same ratchet, same shrink-only ALLOWED, same
 * self-exemption. It states the rule, so its own prose is the specification.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { code, isCode } from "./source.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx"]);
const SELF = "scripts/audit-model-counts.mjs";

// A bare two-to-four digit count immediately followed by "model(s)". Deliberately
// narrow: "100+ capabilities" and "260+ MCP tools" are different facts with
// different owners, and widening this to every number would make the gate noise.
// "Model Context Protocol" is a proper noun, not a count of models — "260+ MCP
// tools" is a different fact with a different owner, and matching it would make
// this gate cry wolf on the one thing it must be trusted about.
const COUNT = /\b\d{2,4}\s*\+?\s*(?:AI |frontier |premium )?models?\b(?!\s+Context\s+Protocol)/i;

// Derived at build time, not typed — nothing to drift from.
const GENERATED = ["lib/data/pricing.json", "lib/data/model-count.ts"];

// The ratchet. Path → why it still holds a literal. SHRINK ONLY.
const ALLOWED = {
  "app/(marketing)/blog/page.tsx":
    "Dated post titles and blurbs ('Zen MoDE: 47 Models', 'One API, 391 Models'). A published post is a record of what was true when it ran; rewriting its title to today's number would rewrite history and break every inbound link's expectation. These must NOT be converted.",
  "app/(marketing)/press/page.tsx":
    "Dated press-release titles and blurbs (Feb 27 2026, '100+ Models, Zero Markup'). A press release is a record of what was said on a day, not a live claim — rewriting the number would falsify the artifact. These must NOT be converted.",
};

function tracked() {
  return execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, maxBuffer: 64 << 20 })
    .toString()
    .split("\0")
    .filter((p) => p && EXT.has(p.slice(p.lastIndexOf("."))));
}

/** The lines as a reader of the site sees them: comments are not copy. */
const copy = (rel) => {
  const text = readFileSync(resolve(ROOT, rel), "utf8");
  return (isCode(rel) ? code(text) : text).split("\n");
};

const offenders = [];
for (const rel of tracked()) {
  if (rel === SELF || GENERATED.includes(rel) || ALLOWED[rel]) continue;
  copy(rel).forEach((line, i) => {
    if (COUNT.test(line)) offenders.push(`${rel}:${i + 1}: ${line.trim().slice(0, 100)}`);
  });
}

if (offenders.length) {
  console.error(
    `\nThe model count is typed into ${offenders.length} place(s) that should be reading it.\n\n` +
      offenders.map((o) => `  ${o}`).join("\n") +
      `\n\nImport MODELS_PHRASE (the catalog) or BENCHMARKED_PHRASE (the leaderboard)\n` +
      `from lib/data/model-count.ts. They are different facts and neither is typed:\n` +
      `the first derives from the pricing snapshot, the second from lib/leaderboard.\n` +
      `Do not add a line to ALLOWED — that list only shrinks.\n`
  );
  process.exit(1);
}

// An entry that no longer holds a literal is a rule protecting nothing.
const stale = Object.keys(ALLOWED).filter((p) => {
  try {
    return !copy(p).some((l) => COUNT.test(l));
  } catch {
    return true;
  }
});
if (stale.length) {
  console.error(
    `\n${stale.length} ALLOWED entr(y/ies) no longer hold a model count:\n\n` +
      stale.map((p) => `  ${p}`).join("\n") +
      `\n\nDelete them from ALLOWED — the list is meant to shrink, and an entry that\n` +
      `protects nothing hides the next real copy.\n`
  );
  process.exit(1);
}

console.log(
  `model counts: ${Object.keys(ALLOWED).length} known holder(s) remaining, ${GENERATED.length} derived source(s), no new copies.`
);
