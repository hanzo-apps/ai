import Frame from '@hanzo/frame'
import { SiteHeader, SiteFooter } from './shell'
import Fold from './Fold'
import EnsoHero from './EnsoHero'
import CloudCategories from './CloudCategories'
import Research from './Research'
import BuildStory from './BuildStory'
import Composer from './Composer'
import LocalStack from './LocalStack'

/**
 * The apex hanzo.ai landing.
 *
 * TWO THINGS CHANGED SHAPE HERE, and they are one change: the fold and the front
 * door swapped places. The page used to open on a composer with the globe dimmed
 * behind it — the picture serving as a backdrop for a text field. Now `Fold` is
 * the globe, at full contrast, and the composer is `Composer`, docked to the
 * bottom of the viewport where it rides the whole page and comes to rest above
 * the footer. Every section between them is unchanged. Both halves are stated
 * where they live: see `Fold` for why the globe won the fold over a montage, and
 * `Composer` for why it is one line and what each of its three controls honestly
 * does.
 *
 * THE COMPOSER MUST STAY THE LAST CHILD OF `<main>`. `.hz-dock` is
 * `position: sticky`, and a sticky box is held inside its containing block and
 * pins only while its own flow position is below the viewport — move it up and it
 * stops riding, put it after the footer and it comes to rest below one. It must
 * also stay OUTSIDE any transformed ancestor, since a transform makes its subject
 * the containing block for everything positioned inside it, which would trap the
 * `+` menu's popover with it.
 *
 * `LocalStack` sits SECOND, above the flagship, and that placement is the point:
 * this page previously never said that Hanzo runs on your own hardware, and never
 * named desktop / engine / ml anywhere outside the footer. Running the cloud
 * locally from one binary is the claim no hosted competitor can match, so it is
 * stated before anything we sell.
 *
 * `CloudCategories` sits between the flagship and the story on purpose: it is the
 * one place the apex answers "what else is here". It renders the ten categories
 * from `lib/data/cloud-primitives.ts` — the same source as the mega-menu and the
 * `/products/<slug>` pages — so the front page cannot drift from the product.
 *
 * `Research` follows it, and the order is an argument: the categories say what we
 * sell, the papers say why it is built the way it is, and they are next to each
 * other so the second is read as evidence for the first. Its content is the
 * library's own, re-fetched every build.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader surface="ai" />
      <main>
        <Fold />
        <LocalStack />
        <EnsoHero />
        {/* The cloud, shown rather than described — the same film cloud.hanzo.ai
            opens on, from the same six files. One command brings an org up and
            the console runs; `CloudCategories` immediately below then names what
            is in it, so the film introduces the thing the list enumerates.

            It sits HERE and not at the top because the film carries no HTML over
            it — that is `@hanzo/frame`'s one rule — and the fold is the globe,
            which is this page's one picture at the top. Nothing is repeated
            either way: the film speaks in the console's own chrome, and the
            sections around it say what a film cannot. */}
        <Frame
          src="/cloud-hero"
          alt="One command brings up a Hanzo Cloud org. The console lists the model catalog — the house Enso family beside every model the gateway serves — and the Playground answers a prompt against it."
        />
        <CloudCategories />
        <Research />
        <BuildStory />
        <Composer />
      </main>
      <SiteFooter surface="ai" />
    </div>
  )
}
