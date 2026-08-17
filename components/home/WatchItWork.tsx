import { Mockup } from '@/components/product/Mockup'

/**
 * One afternoon of the API, shown rather than claimed.
 *
 * It sits BELOW the fold on purpose. The hero is the orbit, and that was decided
 * on evidence rather than taste — a film there competes with the headline for the
 * first second of attention and loses the sentence. Here a reader has already
 * been told what Hanzo is and can afford twenty-six seconds of watching it be
 * true.
 *
 * The film quotes the catalog's own tour, so the calls on screen are the calls
 * `/products` documents and the ones sync-catalog.mjs held against the served
 * document. `film/promo/film.mjs` throws if the tour stops running any of them,
 * which is what keeps this section from outliving the API it advertises.
 *
 * `Mockup` carries the playback rules already — plays when it scrolls into view,
 * never downloads for a reduced-motion reader, poster sized to the film so the
 * box exists before the video does. Restating them here would be a second copy
 * of a decision that has one home.
 */
export function WatchItWork() {
  return (
    <section className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          An afternoon on the API
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-base text-white/55">
          An agent, three capabilities, and a storefront that did not exist this
          morning. Every call it makes is one the API answers.
        </p>

        <div className="mt-12">
          <Mockup
            base="/promo"
            ratio="aspect-[9/10]"
            alt="An agent is given sandboxes, vector and sites, asked for a storefront, and builds one — sandboxes, memory, deploy, publish."
          />
        </div>
      </div>
    </section>
  )
}
