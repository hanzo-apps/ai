import { SiteHeader, SiteFooter } from './shell'
import EnsoHero from './EnsoHero'
import CloudCategories from './CloudCategories'
import BuildStory from './BuildStory'
import ChatHero from './ChatHero'
import LocalStack from './LocalStack'

/**
 * The apex hanzo.ai landing. LEADS with the chat front door (ChatHero composer →
 * hanzo.chat) — the top-of-page action is "ask Hanzo anything", with the 3 core
 * activities (chat with Enso · build with the Hanzo app · deploy on Hanzo Cloud)
 * right beneath it. Then `LocalStack`, the Enso flagship, the cloud taxonomy,
 * and the cross-site build story.
 *
 * `LocalStack` sits SECOND, above the flagship, and that placement is the point:
 * this page previously never said that Hanzo runs on your own hardware, and
 * never named desktop / engine / ml anywhere outside the footer. Running the
 * cloud locally from one binary is the claim no hosted competitor can match, so
 * it is stated before anything we sell.
 *
 * `CloudCategories` sits between the flagship and the story on purpose: it is the
 * one place the apex answers "what else is here". It renders the ten categories
 * from `lib/data/cloud-primitives.ts` — the same source as the mega-menu and the
 * `/products/<slug>` pages — so the front page cannot drift from the product.
 *
 * Chrome is now the SHARED shell on both faces (`components/home/shell`), header
 * as well as footer. The old local `LandingNav` was kept here on the grounds
 * that the shell header was flat and swapping it would downgrade the apex; that
 * stopped being true once `HanzoHeader` gained `productsTaxonomy` and opened the
 * rich ten-category mega-menu, which is strictly more than the hand-written nav
 * offered. The composer is untouched.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader surface="ai" />
      <main>
        <ChatHero />
        <LocalStack />
        <EnsoHero />
        <CloudCategories />
        <BuildStory />
      </main>
      <SiteFooter surface="ai" />
    </div>
  )
}
