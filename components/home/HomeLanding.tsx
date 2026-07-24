import LandingNav from './LandingNav'
import EnsoHero from './EnsoHero'
import BuildStory from './BuildStory'
import ChatHero from './ChatHero'
import { HanzoFooter } from '@hanzogui/shell'

/**
 * The apex hanzo.ai landing. LEADS with the chat front door (ChatHero composer →
 * hanzo.chat) — the top-of-page action is "ask Hanzo anything", with the 3 core
 * activities (chat with Enso · build with the Hanzo app · deploy on Hanzo Cloud)
 * right beneath it. Then the Enso flagship + the cross-site build story.
 *
 * Shell adoption is LIGHT here by design: the chat-centric, openai-style
 * `LandingNav` (its Explore mega-panels + Try/Log-in dropdowns + composer search)
 * stays — swapping it for the flat shell header would downgrade the apex — while
 * the footer unifies onto the shared `HanzoFooter` (same footer as the
 * cloud.hanzo.ai face). The composer is untouched.
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
      <HanzoFooter />
    </div>
  )
}
