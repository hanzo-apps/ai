/**
 * The one gui config, and it is not this repo's.
 *
 * `@hanzo/ui/gui-config` is the fleet's token table — the same object hanzo.app
 * and console mount — so a Button, an Input or a shell menu is the same size on
 * every Hanzo surface. This site used to carry a 244-line copy of that job,
 * built on `@hanzogui/config/v4` while the fleet had moved to v5, and it
 * disagreed with the canon on nearly every rung it defined: `$4` 14 against 15,
 * `$9` 32 against 26, `$12` 64 against 48, `$14` 112 against 64, and a spacing
 * ramp that read `$N = 4N` where the canon reads a t-shirt scale.
 *
 * That is not a preference two surfaces may hold separately. Every `@hanzo/ui`
 * component asks the HOST's config for its sizes, so one copy of the library
 * rendered at two sizes depending on which site it was on, and nothing said so.
 *
 * MONOCHROME, which is a brand fact and not an optimisation. This site renders
 * no hue: the one place colour appears is the WebGL globe, which is GLSL and
 * owes gui nothing. `monochrome` is the same table with the eight chromatic
 * families dropped — 150 themes instead of 390 — from the same scale, so
 * nothing in it can drift from `config`, only be absent from it. A theme table
 * is DATA that ships (a theme is selected by string at run time, so it cannot
 * be tree-shaken), and the sheet it emits is 356KB against 137KB.
 *
 * `createGui()` registers the token and media tables in module-global state; it
 * runs once, in the package, and `GuiProvider` hands the same object down.
 *
 * The rungs this repo's own 63 call sites used were renamed to the canon rung of
 * the SAME pixel value in the commit that landed this, so the swap moved no
 * type and no gap. What it moved is who decides.
 */
import { css as sheet, monochrome } from '@hanzo/ui/gui-config'

export default monochrome

/** The sheet for the table above — `scripts/gen-gui-css.mjs` writes this to
 *  `app/gui.css`. It is the package's emitter, never `getCSS()`: gui declares
 *  `--background`, `--black` and `--white` on its root themes, which ties
 *  design's `:root` and wins on load order, so the raw sheet ships gui's grey
 *  over design's black and no CSS in this repo can reach it. */
export const css = () => sheet(monochrome)
