/**
 * How many models Hanzo serves — stated ONCE, derived, never typed.
 *
 * Eighteen places on this site quoted a count, in three different numbers:
 * "100+", "130+" and "400+". None was reached by editing the others, so they
 * drifted apart the moment one was updated, and a reader comparing two pages saw
 * us disagree about our own catalog. The estate was worse: 85+, 200+ and a bare
 * 340 elsewhere.
 *
 * The number comes from `lib/data/pricing.json` — the same snapshot every price
 * on this site comes from, refreshed by `scripts/sync-pricing.mjs` on prebuild.
 * So the count moves when the catalog moves, and it cannot disagree with the
 * prices printed beside it.
 *
 * `scripts/audit-price-literals.mjs` fails the build on a new hand-typed count,
 * the same way it does for a hand-typed rate.
 */
import pricing from './pricing.json';

/** Exact model count in the published catalog (zen + third-party). */
export const TOTAL_MODELS: number = pricing.summary.totalModels;

/** Distinct upstream providers behind them. */
export const TOTAL_PROVIDERS: number = pricing.summary.providers;

/** Models Hanzo trains and serves itself. */
export const ZEN_MODELS: number = pricing.summary.zenModels;

/** Models callable at no cost. */
export const FREE_MODELS: number = pricing.summary.freeModels;

/**
 * Floor to the nearest hundred, so marketing copy says "400+" for 413 and keeps
 * saying it at 444. Rounding UP would advertise models we do not serve; flooring
 * is the only direction that stays true as the catalog grows between snapshots.
 */
function floorToHundred(n: number): number {
  return Math.floor(n / 100) * 100;
}

/** The claim body copy makes: "400+". Always true, never ahead of the catalog. */
export const MODEL_COUNT_LABEL = `${floorToHundred(TOTAL_MODELS)}+`;

/** "400+ models" — the whole phrase, so the noun cannot drift from the number. */
export const MODELS_PHRASE = `${MODEL_COUNT_LABEL} models`;

/** "400+ AI models", where the copy calls them AI models. */
export const AI_MODELS_PHRASE = `${MODEL_COUNT_LABEL} AI models`;

/** "60+ providers", floored the same way and for the same reason. */
export const PROVIDER_COUNT_LABEL = `${floorToHundred(TOTAL_PROVIDERS) || TOTAL_PROVIDERS}+`;

/**
 * How many models the LEADERBOARD has actually benchmarked — a different fact
 * from how many the catalog sells, and it must not be stated with the catalog's
 * number. `lib/leaderboard.ts` owns the measurements, so the count comes from
 * there; saying "400+" about the benchmark set would claim we measured models we
 * have not.
 */
import { MODELS as BENCHMARKED } from '@/lib/leaderboard';

/** Exact number of models with measured scores. */
export const BENCHMARKED_MODELS: number = BENCHMARKED.length;

/** "130+" for 134 — floored, for the same reason as the catalog label. */
export const BENCHMARKED_COUNT_LABEL = `${Math.floor(BENCHMARKED_MODELS / 10) * 10}+`;

/** "130+ models", the phrase the Enso page makes its comparison claim with. */
export const BENCHMARKED_PHRASE = `${BENCHMARKED_COUNT_LABEL} models`;
