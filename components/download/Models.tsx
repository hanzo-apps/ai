import { TOTAL_MODELS, TOTAL_PROVIDERS } from '@/lib/data/model-count'
import { SECTION, HOLD, HEAD, LEAD, MORE } from './style'

/**
 * The catalog, in one line.
 *
 * It was a full-width panel of fourteen provider tiles, each naming three model
 * families by hand — a second, staler copy of /models that had to be edited
 * every time a provider shipped, sitting on a page about downloading an app.
 * The counts here are derived from the same pricing snapshot every price on this
 * site is derived from, so they cannot go stale or disagree with the page they
 * link to.
 */
const Models = () => (
  <section className={SECTION}>
    <div className={HOLD}>
      <h2 className={HEAD}>Every model, one API</h2>
      <p className={LEAD}>
        {TOTAL_MODELS} models from {TOTAL_PROVIDERS} providers, plus the Zen models we train
        ourselves. Switch between them without changing a line.
      </p>
      <a className={`${MORE} mt-5`} href="/models">
        View all {TOTAL_MODELS} models →
      </a>
    </div>
  </section>
)

export default Models
