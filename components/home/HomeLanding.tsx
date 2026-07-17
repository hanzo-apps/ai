import LandingNav from './LandingNav'
import ChatHero from './ChatHero'
import FeatureCards from './FeatureCards'
import LandingFooter from './LandingFooter'

/**
 * The apex hanzo.ai landing — openai.com-style: chat front and center, a
 * flagship + secondary card, minimal chrome. Ships its own nav + footer (it
 * lives outside the (marketing) route group, so the detailed-site Navbar/Footer
 * never wrap it) — the same pattern as CloudLanding for cloud.hanzo.ai.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <ChatHero />
        <FeatureCards />
      </main>
      <LandingFooter />
    </div>
  )
}
