/**
 * Put /.well-known into the export, and refuse to finish the build without it.
 *
 * `public/.well-known/security.txt` is committed, the deploy was current, and
 * the URL still answered with the app shell — because this site is
 * `output: 'export'` and a static export plus a SPA fallback answers EVERY path
 * with index.html. So a missing file does not 404. It returns 200, with HTML,
 * and looks fine to anything that checks a status code.
 *
 * That is the whole reason this script exists rather than a copy step: the
 * failure it guards against is invisible from the outside. RFC 9116 fixes the
 * address at /.well-known/security.txt, so if the file is not there the file
 * does not exist, no matter what the server returns.
 *
 * Loud, never partial, like noindex.mjs beside it: it copies, then reads back
 * what it wrote, and exits non-zero if the bytes are not there. A build that
 * quietly ships without a disclosure address is worse than a build that stops.
 */
import { readdirSync, mkdirSync, copyFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = "public/.well-known";
const DST = "out/.well-known";

if (!existsSync(SRC)) {
  console.error(`[well-known] ${SRC} does not exist — nothing to publish.`);
  process.exit(1);
}

mkdirSync(DST, { recursive: true });

const names = readdirSync(SRC).filter((n) => !n.startsWith("."));
if (names.length === 0) {
  console.error(`[well-known] ${SRC} is empty.`);
  process.exit(1);
}

for (const name of names) copyFileSync(join(SRC, name), join(DST, name));

// Read back rather than trust the copy. The point is to prove the bytes are at
// the address, which is the one thing nobody could confirm from outside.
let bad = 0;
for (const name of names) {
  const out = join(DST, name);
  if (!existsSync(out)) {
    console.error(`[well-known] ${out} missing after copy`);
    bad++;
    continue;
  }
  const body = readFileSync(out, "utf8");
  if (name === "security.txt" && !/^\s*(#|Contact:)/m.test(body)) {
    console.error(`[well-known] ${out} does not look like RFC 9116 — no Contact: field`);
    bad++;
  }
}

if (bad) process.exit(1);
console.log(`[well-known] published ${names.length} file(s): ${names.join(", ")}`);
