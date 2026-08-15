import Frame from '@hanzo/frame'
import { cloudCategories, layerCount, spell, tour } from '@/lib/data/cloud-primitives'

/**
 * The fold: the film, and the sentence that says what it is.
 *
 * THE FILM IS THE PICTURE NOW. It was the globe — thousands of points with live
 * conversations arching between them, and still the best abstract thing we draw
 * — but abstract is what it is: a visitor who had never heard of Hanzo watched a
 * sphere and learned nothing about the product. The film is the product, in the
 * product's own chrome: the model catalog, an afternoon of real calls, and the
 * ten layers underneath. It is ASSETS: `film/hero` composes it and `make`
 * publishes the six files, so there is no component here to hold it and nothing
 * to register.
 *
 * The globe is not deleted and is not homeless — `HanzoNetworkSection` still
 * draws it on /overview, which is where an abstract picture of a network belongs.
 * A page gets ONE picture, and this page's is now the film.
 *
 * A MONTAGE WAS THE OTHER CANDIDATE and it stays rejected for the reason it was
 * rejected before: hanzo.agency's case-study films are third-party YouTube
 * embeds at 480p with no masters in any repo, so cutting a hero from them would
 * put someone else's compression and someone else's rights on our front door.
 * The objection was never to film — it was to footage we cannot re-render. A
 * rendered master has neither problem, and @hanzo/frame answers the other one
 * by shipping two of them: a phone is 0.46 wide-to-tall and a laptop 1.6, and
 * one master covering both shows the middle quarter of itself on one of them.
 *
 * `<Frame>` IS THE WHOLE CALL SITE. Two props: `src` is the shared prefix of the
 * six rendered files and the names are the contract, and `alt` is what the film
 * says for anyone not watching it. There is no third prop and there must not be
 * — a knob here is a second way to hang a film at the top of a page.
 *
 * THE HEADING CANNOT RIDE IN THE FILM, so it does not. Type baked into pixels
 * cannot be selected, translated, reflowed or read aloud, and correcting it
 * costs a re-render: the previous apex film had its headline in the master and a
 * sidebar that named seven categories while the section under it named ten, and
 * the page contradicted itself until the video was rebuilt. The sentence lives
 * here, in the DOM, directly under the film and visible on the first scroll —
 * cloud.hanzo.ai shipped a live page with ZERO `<h1>` by taking this step for
 * granted. The film never draws it, so nothing is said twice.
 *
 * The `alt` is COMPOSED, never typed. It names the layers the film's last
 * movement lists and quotes the tour's own story, from the same catalog the film
 * reads — an alt written by hand goes on describing a sequence the film has
 * stopped having.
 */
const ALT = [
  'The Hanzo console, in three moves.',
  'The model catalog — the house Enso family beside every model the gateway serves.',
  `${tour.story} Every step of it a real call on api.hanzo.ai/v1.`,
  `And the ${spell(layerCount).toLowerCase()} layers underneath: ${cloudCategories.map((c) => c.title).join(', ')}.`,
].join(' ')

export default function Fold() {
  return (
    <>
      <Frame src="/hero" alt={ALT} />

      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
        {/* Research first, product second. This is the company's front door,
            and a reader arriving at it is asking who we are before what we
            sell -- the API, the layers and the pricing all have their own
            pages and every one of them is a click away. What is true of us and
            of almost nobody else is that we train the models AND run the cloud
            under them, and publish the weights and the papers. That is the
            sentence. */}
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          We train the models and run the cloud under them.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-neutral-400">
          Zen is open weights, from something that fits on a laptop up to frontier. Enso is
          ours, and it routes across them. The papers, the methods and the results that did
          not work are public.
        </p>
      </section>
    </>
  )
}
