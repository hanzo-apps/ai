import LandingNav from './LandingNav'
import Hero from './Hero'
import PlatformSection from './PlatformSection'
import ProductsGrid from './ProductsGrid'
import ModelsSection from './ModelsSection'
import Differentiators from './Differentiators'
import FinalCTA from './FinalCTA'
import LandingFooter from './LandingFooter'

/**
 * The apex hanzo.ai landing — the UNIFIED, claude.com-direction front door to
 * the whole Hanzo AI cloud. The pitch leads ("The open-source AI cloud"); a
 * subtle composer forwards to hanzo.chat. Beneath the hero: the Platform story
 * (one gateway / identity / bill, managed or self-hosted, on-chain), the ten
 * cloud-primitive categories, the models (Zen family + Enso router), the
 * open-source + on-chain differentiators, and a final Console/Docs CTA.
 *
 * Ships its own nav + footer (it lives outside the (marketing) route group, so
 * the detailed-site Navbar/Footer never wrap it) — the same LandingNav/Footer
 * shared with /enso.
 */
export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <main>
        <Hero />
        <PlatformSection />
        <ProductsGrid />
        <ModelsSection />
        <Differentiators />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
