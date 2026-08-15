import DownloadHero from '@/components/download/DownloadHero'
import Platforms from '@/components/download/Platforms'
import Surfaces from '@/components/download/Surfaces'
import Capabilities from '@/components/download/Capabilities'
import Models from '@/components/download/Models'
import Integrations from '@/components/download/Integrations'
import FAQ from '@/components/download/FAQ'
import HanzoDev from '@/components/download/HanzoDev'

/**
 * /download — get the app, in one pass down the page.
 *
 * The order is the order the questions arrive: what it is, how to get it, where
 * else it runs, what it does, what it thinks with, what it reaches, what you
 * were still wondering, and the same thing from a terminal. Every section is one
 * subject and every subject appears once — the page previously ran eleven
 * sections and asked for the download twice, at the top and again at the very
 * bottom, with four empty preview boxes between them.
 */
const Download = () => (
  <div className="min-h-screen bg-black text-white">
    <DownloadHero />
    <Platforms />
    <Surfaces />
    <Capabilities />
    <Models />
    <Integrations />
    <FAQ />
    <HanzoDev />
  </div>
)

export default Download
