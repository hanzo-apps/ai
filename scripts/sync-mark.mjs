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
import { copyFileSync, readFileSync } from "node:fs";
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
console.log(`  mark: public/favicon.svg from ${FROM.split("node_modules/").pop()}`);
