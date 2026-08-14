/**
 * The conversation spectrum.
 *
 * Colour on this site means exactly one thing: something is talking. The chrome
 * is monochrome and stays that way, so when four hues appear they are always
 * carrying traffic — the globe draws agents talking to each other, the cloud
 * orbit draws a request leaving the one API for one of the ten categories.
 *
 * That is one fact drawn twice, which is why it is one value here rather than a
 * literal in each picture: a palette copied is a palette that drifts, and the
 * drift would break the rule silently — two different blues on one page reads as
 * decoration, and decoration is what this colour is not.
 *
 * GL wants floats and the DOM wants a string, so both forms live here and the
 * second is derived from the first. Neither is the original.
 */

/** The four, in the order a run of them cycles through. */
export const SPECTRUM: ReadonlyArray<readonly [number, number, number]> = [
  [0.31, 0.55, 1.0], // blue
  [0.6, 0.42, 1.0], // violet
  [1.0, 0.44, 0.71], // pink
  [1.0, 0.71, 0.33], // amber
]

const byte = (f: number) => Math.round(f * 255)

/** The same four as CSS, for anything drawn in the DOM rather than in GL. */
export const SPECTRUM_CSS: readonly string[] = SPECTRUM.map(
  ([r, g, b]) => `rgb(${byte(r)} ${byte(g)} ${byte(b)})`,
)

/** The hue at `i`, cycling — so a list of any length is coloured without a gap. */
export const hueAt = (i: number): string => SPECTRUM_CSS[i % SPECTRUM_CSS.length]
