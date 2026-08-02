#!/usr/bin/env node
/**
 * Fail if a model price is typed into source.
 *
 * A per-token price has ONE owner — the catalog in commerce.hanzo.ai, edited in
 * admin and published through api.hanzo.ai/v1/pricing. Every other copy is a
 * copy, and copies go stale silently: this repo advertised Enso at 3/12 while
 * the service charged 4/20, another copy said 20/60, and the public catalog
 * carried no Enso at all. Nobody noticed, because a wrong number renders exactly
 * as convincingly as a right one.
 *
 * So the rule is not "keep the numbers up to date". It is: don't hold a second
 * copy. Read the catalog, or commit a snapshot a script fetched and stamped.
 *
 * WHAT COUNTS AS A LITERAL: the shapes a per-MTok rate actually takes in this
 * codebase — a rate field assigned a number (`input: 4`, `priceOut: 20`), and a
 * rendered price band (`'$4 → $20'`). Both are checked, because the first pass
 * of this guard only knew the first shape and reported the marketing pages
 * clean while they carried six hardcoded bands.
 *
 * WHAT IT DELIBERATELY DOES NOT COVER: a bare `price:` number. Subscription
 * plans, DNS, vector and blockchain pricing all use that field for something
 * that is not a token rate — requiring it would flag twelve unrelated files, and
 * a guard that cries wolf gets switched off. lib/data/leaderboard.json carries
 * benchmark rows under a bare `price`, and is out of scope for the same reason.
 * The shapes above are the ones an Enso rate is actually written in, which is
 * what this is defending.
 *
 * THE LIST BELOW IS A RATCHET. It records the copies that exist TODAY, each with
 * the reason it is still allowed. It may only SHRINK. Adding a file to it is
 * adding a fourth owner to a number that already has one too many — fix the file
 * instead. When a converted file drops off, delete its line.
 *
 * Usage: node scripts/audit-price-literals.mjs
 */

import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// This file, and the one file the scan must not read: the shapes a rate is
// written in have to be WRITTEN DOWN somewhere, and the place they are written
// down is here — in the doc comment above and in the patterns below. Scanning
// itself, it found `input: 4` and `'$4 → $20'` in its own explanation of what
// those mean and exited 1 on every run, so the step could never pass and said
// nothing about the repo. Derived from `import.meta.url` rather than typed as a
// path, so renaming the file cannot quietly re-break it.
const SELF = relative(ROOT, fileURLToPath(import.meta.url));

// A per-MTok rate as this codebase writes one: a rate field with a number, or a
// rendered "$in → $out" band.
const RATE_FIELD =
  /(?:^|[^\w])"?(input|output|priceIn|priceOut|price_in|price_out|cacheRead|cacheWrite)"?\s*:\s*"?\$?\d+(?:\.\d+)?/;
const PRICE_BAND = /\$\d+(?:\.\d+)?\s*(?:→|->|—>)\s*\$\d+(?:\.\d+)?/;
const PRICE = { test: (s) => RATE_FIELD.test(s) || PRICE_BAND.test(s) };

const EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".mdx", ".md"]);

// Snapshots a script fetches and stamps. These are NOT hand-typed copies — they
// are the build-time materialisation the one owner publishes, which is why they
// are allowed by kind rather than by name.
const GENERATED = [
  "data/pricing.json",
  "lib/data/pricing.json",
];

// The ratchet. Path → why it still holds a literal. SHRINK ONLY.
const ALLOWED = {
  "lib/leaderboard.ts":
    "Enso rates as priceIn/priceOut. Currently the ONLY public surface stating the correct 4/20-2/4-5/25, so it converts to a reader AFTER /v1/pricing is authoritative — flipping it first would replace correct numbers with an empty feed.",
  "components/enso/EnsoLanding.tsx":
    "Enso price cards as '$in → $out' bands, same correct values and the same ordering constraint as lib/leaderboard.ts.",
};

// Only TRACKED files. A guard checks what is committed; ignored paths (build
// output, local agent worktrees) are not this repo's copies of anything.
function tracked() {
  return execFileSync("git", ["ls-files", "-z"], { cwd: ROOT, maxBuffer: 64 << 20 })
    .toString()
    .split("\0")
    .filter((p) => p && EXT.has(p.slice(p.lastIndexOf("."))));
}

const offenders = [];
for (const rel of tracked()) {
  if (rel === SELF || GENERATED.includes(rel) || ALLOWED[rel]) continue;
  const lines = readFileSync(resolve(ROOT, rel), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (PRICE.test(line)) offenders.push(`${rel}:${i + 1}: ${line.trim().slice(0, 100)}`);
  });
}

if (offenders.length) {
  console.error(
    `\nA model price is typed into ${offenders.length} place(s) that should be reading it.\n\n` +
      offenders.map((o) => `  ${o}`).join("\n") +
      `\n\nA per-token price is owned by the catalog in commerce.hanzo.ai and published\n` +
      `at api.hanzo.ai/v1/pricing. Read it, or commit a snapshot fetched by\n` +
      `scripts/sync-pricing.mjs. Do not add a line to ALLOWED in this script —\n` +
      `that list only shrinks.\n`
  );
  process.exit(1);
}

const stale = Object.keys(ALLOWED).filter((p) => {
  try {
    return !PRICE.test(readFileSync(resolve(ROOT, p), "utf8"));
  } catch {
    return true;
  }
});
if (stale.length) {
  console.error(
    `\nThese are on the ratchet but no longer hold a price literal:\n\n` +
      stale.map((p) => `  ${p}`).join("\n") +
      `\n\nDelete them from ALLOWED — the list is meant to shrink, and an entry that\n` +
      `no longer describes anything hides the ones that still do.\n`
  );
  process.exit(1);
}

console.log(
  `price literals: ${Object.keys(ALLOWED).length} known holder(s) remaining, ${GENERATED.length} generated snapshot(s), no new copies.`
);
