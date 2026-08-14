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
 * It used to follow a film of the console, which is gone. That film had its
 * headline and its command RENDERED INTO THE PIXELS, and a sidebar naming seven
 * categories while the list under it named ten — so the page contradicted itself
 * and the contradiction could only be fixed by re-rendering a video. Type that
 * cannot be selected, translated, reflowed or read aloud is not type. What the
 * film introduced, `CloudCategories` already states, from the catalog.
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
        <CloudCategories />
        <Research />
        <BuildStory />
        <Composer />
      </main>
      <SiteFooter surface="ai" />
    </div>
  )
}
