import LandingNav from './LandingNav'
import EnsoHero from './EnsoHero'
import BuildStory from './BuildStory'
import ChatHero from './ChatHero'
import LandingFooter from './LandingFooter'

/**
 * The apex hanzo.ai landing. LEADS with the chat front door (ChatHero composer →
 * hanzo.chat) — the top-of-page action is "ask Hanzo anything", with the 3 core
 * activities (chat with Enso · build with the Hanzo app · deploy on Hanzo Cloud)
 * right beneath it. Then the Enso flagship + the cross-site build story. Ships its
 * own nav + footer (outside the (marketing) route group) — same pattern as
 * CloudLanding for cloud.hanzo.ai.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <ChatHero />
        <EnsoHero />
        <BuildStory />
      </main>
      <LandingFooter />
    </div>
  )
}
