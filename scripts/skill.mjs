#!/usr/bin/env node
/**
 * /skill.md — the file an agent reads before its first call to Hanzo.
 *
 * Two parts, and only one of them is written by hand. `public/skill.md` carries
 * the operating rules, the credential, the install and the MCP door: prose, and
 * prose belongs to whoever writes it. Everything Hanzo SERVES is appended here
 * out of `lib/data/families.json`, which `scripts/sync-catalog.mjs` reads from
 * the document api.hanzo.ai publishes about itself. So the list is never behind
 * the API and nobody has to remember it exists.
 *
 * The same shape as `scripts/llms.mjs` beside it — a committed header, a
 * generated body, one file at a fixed address in the export — and loud like
 * `scripts/wellknown.mjs`, for the reason that script gives: this is a static
 * export, every path answers with the app shell, and a file that failed to
 * write returns 200 with HTML rather than a 404 anyone would notice.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FRAME = "public/skill.md";
const SNAPSHOT = "lib/data/families.json";
const CATALOG = "lib/data/catalog.json";
const OUT = "out/skill.md";
const HEADING = "## Families";

const die = (why) => {
  console.error(`[skill] ${why}`);
  process.exit(1);
};

const frame = readFileSync(FRAME, "utf8").trimEnd();
// The one seam between the two halves. Typing the heading into the frame would
// publish two of this section, one of them stale, and nothing else would say so.
if (frame.includes(HEADING)) die(`${FRAME} carries "${HEADING}" — that section is generated here.`);

const { document, fetched, families } = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
if (!families?.length) die(`${SNAPSHOT} carries no families — run scripts/sync-catalog.mjs.`);

// Headings are the catalog's categories, in its order, and then everything it
// does not sell on its own. A group with no family in it is not printed.
const { categories } = JSON.parse(readFileSync(CATALOG, "utf8"));
const groups = [...categories.map((c) => [c.id, c.label]), [null, "Rest"]];

const count = (n) => `${n} ${n === 1 ? "operation" : "operations"}`;
const line = (f) =>
  `- \`/v1/${f.name}\`${f.summary ? ` — ${f.summary}` : ""} (${count(f.operations)})`;

const body = groups
  .map(([id, label]) => {
    const rows = families.filter((f) => (f.category ?? null) === id);
    return rows.length ? `### ${label}\n\n${rows.map(line).join("\n")}\n` : "";
  })
  .filter(Boolean)
  .join("\n");

const operations = families.reduce((n, f) => n + f.operations, 0);
const day = String(fetched).slice(0, 10);

writeFileSync(
  OUT,
  `${frame}

${HEADING}

The document tags every operation by the first segment after \`/v1/\`, and that
segment is the family. Each line below is a tag the document declares, the
sentence is its own, and the count is how many operations carry it. Headings are
the categories Hanzo's catalog places a family in; \`Rest\` holds every family the
catalog sells no product for, and they answer exactly the same way.

${families.length} families, ${count(operations)}, read from ${document} on ${day}.

${body}`
);

// Read back rather than trust the write, for the reason at the top of this file.
const written = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
if (!written.includes(HEADING) || written.length <= frame.length) die(`${OUT} did not survive the write`);
console.log(
  `[skill] ${OUT} — ${families.length} families · ${count(operations)} · ` +
    `${(written.length / 1024).toFixed(0)} KB · document read ${day}`
);
