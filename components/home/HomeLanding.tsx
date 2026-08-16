import { fetchModels } from '@/lib/models'
import { SiteHeader, SiteFooter } from './shell'
import Fold from './Fold'
import ProofStrip from './ProofStrip'
import SystemArchitecture from './SystemArchitecture'
import EnsoHero from './EnsoHero'
import AgentRuntime from './AgentRuntime'
import Team from './Team'
import LearnLoop from './LearnLoop'
import OneInterface from './OneInterface'
import Infrastructure from './Infrastructure'
import CloudCategories from './CloudCategories'
import Research from './Research'
import Proof from './Proof'
import Security from './Security'
import ReplaceTheCore from './ReplaceTheCore'
import Observability from './Observability'
import BuildStory from './BuildStory'
import Composer from './Composer'
import LocalStack from './LocalStack'
import { Box } from '@hanzo/ui'

/**
 * The apex hanzo.ai landing.
 *
 * TWO THINGS CHANGED SHAPE HERE, and they are one change: the fold and the front
 * door swapped places. The page used to open on a composer with a picture dimmed
 * behind it — the picture serving as a backdrop for a text field. Now `Fold` is
 * the picture at full contrast, and the composer is `Composer`, docked to the
 * bottom of the viewport where it rides the whole page and comes to rest above
 * the footer. Every section between them is unchanged. Both halves are stated
 * where they live: see `Fold` for what the picture is and why the heading sits
 * beneath it rather than inside it, and `Composer` for why it is one line and
 * what each of its three controls honestly does.
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
 * It is also the section the fold's film hands off to, and the two agree by
 * construction: this reads the catalog through `cloud-primitives.ts` and
 * `film/hero` reads `lib/data/catalog.json` itself, so the ten layers the film
 * ends on are the ten cards here, named identically. An earlier apex film had a
 * sidebar naming seven categories over a section naming ten, and the
 * contradiction could only be fixed by re-rendering a video — which is why
 * nothing in `film/hero` is typed and no word of it is a heading.
 *
 * `Research` follows it, and the order is an argument: the categories say what we
 * sell, the papers say why it is built the way it is, and they are next to each
 * other so the second is read as evidence for the first. Its content is the
 * library's own, re-fetched every build.
 */
export default async function HomeLanding() {
  /* The strip's number is derived here rather than typed there — one build,
     one read of the registry, and the page cannot drift from it. */
  const { total: modelCount } = await fetchModels()

  return (
    <Box className="min-h-screen bg-black text-white">
      <SiteHeader surface="ai" />
      <main>
        {/* The page descends the stack. It states the category, shows the
            architecture, then proves it a layer at a time — intelligence,
            execution, the company, what it learns, what it runs on — before it
            ever shows a catalog. Research moved DOWN from second for the same
            reason: papers are evidence for a claim, and a reader has to have
            been given the claim first. The catalog and the library are the last
            two things on the page because they are the proof, not the pitch. */}
        <Fold />
        <ProofStrip modelCount={modelCount} />
        <ReplaceTheCore />
        <SystemArchitecture />
        <Team />
        <EnsoHero />
        <AgentRuntime />
        <Infrastructure />
        <LearnLoop />
        <Observability />
        <Security />
        <OneInterface />
        <CloudCategories />
        <LocalStack />
        <Research />
        <Proof />
        <BuildStory />
        <Composer />
      </main>
      <SiteFooter surface="ai" />
    </Box>
  )
}
