import LandingNav from './LandingNav'
import EnsoHero from './EnsoHero'
import BuildStory from './BuildStory'
import ChatHero from './ChatHero'
import LandingFooter from './LandingFooter'

/**
 * The apex hanzo.ai landing. Leads with Enso — Hanzo's flagship frontier model —
 * then the cross-site story (Enso → hanzo.app → Hanzo Cloud), then the chat front
 * door. Ships its own nav + footer (it lives outside the (marketing) route group,
 * so the detailed-site Navbar/Footer never wrap it) — the same pattern as
 * CloudLanding for cloud.hanzo.ai.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <EnsoHero />
        <BuildStory />
        <ChatHero />
      </main>
      <LandingFooter />
    </div>
  )
}
