/**
 * The Hanzo mark in the export root, taken from the package that owns it.
 *
 * `public/favicon.svg` is the one Hanzo glyph a reader sees on every tab, and
 * it is also what console.hanzo.ai resolves an org's logo to. It had been
 * hand-drawn from the canonical paths into a TWO-LAYER arrangement — a stroked
 * `.rim` behind a `.core` — and the two media queries then set both layers to
 * the same ink: black core over black rim in light, white over white in dark.
 * A 5.58px stroke shared with the fill has nothing to contrast against, so it
 * bridged the gaps between the mark's five shapes and served a solid blob in
 * both schemes anyone actually reports. Only the no-preference default drew a
 * mark, and no browser says that.
 *
 * LLM.md states the rule the file broke: never draw a logo, take it from the
 * canonical source, never hand-edit the copy. So the copy is derived here
 * instead of maintained — @hanzo/brand ships the mark as one layer of five
 * paths in one ink that flips with the scheme, which is the only construction
 * that cannot bridge itself.
 */
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "public", "favicon.svg");
const FROM = createRequire(import.meta.url).resolve(
  "@hanzo/brand/assets/logo/favicon.svg",
);

const mark = readFileSync(FROM, "utf8");

// One layer, one ink. A second painted copy of the same geometry is the defect
// this script exists to prevent, and a stroke wide enough to halo is what makes
// it fatal rather than merely redundant.
const layers = (mark.match(/<path/g) ?? []).length;
if (layers !== 5) throw new Error(`the mark should be five paths, found ${layers}`);
if (/stroke/.test(mark)) throw new Error("the mark carries a stroke, which bridges its gaps");

copyFileSync(FROM, OUT);

/*
 * A CHANGED MARK IS A CHANGED URL.
 *
 * The icons are served from the edge with a 24h TTL and `app/layout.tsx` asked
 * for them by bare path, so the cache key never moved when the bytes did: the
 * corrected mark shipped and every visitor kept the old one for a day
 * (measured: `cf-cache-status: HIT`, `age: 61066`, the previous file byte for
 * byte). That is a property of the whole icon set and not of the one file this
 * script rewrites, so all five are stamped.
 *
 * The stamp is DERIVED from the bytes. A hand-kept version constant is the
 * thing everybody forgets to bump, which is the same failure wearing a
 * different hat. Eight hex of sha256 separates two versions of one file, and it
 * moves only when the file does — so an icon nobody touched keeps its URL and
 * stays cached.
 *
 * The bare path still works. The query governs what `<link rel="icon">` asks
 * for and nothing else.
 */
const STAMPED = [
  "favicon.svg",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "favicon.ico",
  "apple-touch-icon.png",
];

const icons = Object.fromEntries(
  STAMPED.map((name) => {
    let bytes;
    try {
      bytes = readFileSync(join(here, "..", "public", name));
    } catch {
      // The layout names this icon, so a missing file is a broken tab rather
      // than a missed optimisation. Fail here instead of stamping a 404.
      throw new Error(`public/${name} is named by app/layout.tsx and is not on disk`);
    }
    return [`/${name}`, createHash("sha256").update(bytes).digest("hex").slice(0, 8)];
  }),
);

writeFileSync(
  join(here, "..", "lib", "data", "mark.json"),
  `${JSON.stringify({ source: FROM.split("node_modules/").pop(), icons }, null, 2)}\n`,
);

console.log(
  `  mark: public/favicon.svg from ${FROM.split("node_modules/").pop()} — ${Object.keys(icons).length} icons stamped (favicon.svg ${icons["/favicon.svg"]})`,
);
