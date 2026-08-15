'use client'

import { useEffect, useState } from 'react'
import { motion } from '@/components/motion'
import { Download } from 'lucide-react'
import { Mockup } from '@/components/product/Mockup'
import { PLATFORMS, platformHere, type Target } from './installs'
import { PRIMARY } from './style'

/**
 * The fold: what it is, and the one button that gets it.
 *
 * ONE action, named for the platform under the reader. It used to be two
 * side-by-side buttons — Apple Silicon and Intel — which made the first thing
 * on the page a question about your own hardware, and neither of them was a
 * link: both were bare <button> elements with no href and no handler, so the
 * page's primary action did nothing at all. Every other platform lives one
 * scroll down, in the list that is the page's only download moment.
 */
const DownloadHero = () => {
  // Ships naming the most common target; corrects after mount if it is wrong.
  const [target, setTarget] = useState<Target>(PLATFORMS[0])
  useEffect(() => setTarget(platformHere()), [])

  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      {/* One glow, centred behind the copy. The fold used to carry three, at
          three sizes, which is a wash rather than a light. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
          <span className="text-white">Everything you love,</span>
          <br />
          <span className="text-neutral-400">across every app.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 lg:text-lg">
          Your AI workspace for building AI products and AI-powered companies.
        </p>

        <div className="mt-10">
          <a className={PRIMARY} href={target.href}>
            <Download className="h-4 w-4" />
            Download for {target.name}
          </a>
        </div>

        {/* The film fills the hero's column, so it and the copy share one
            measure. `Mockup` is the site's one way to place a product film and
            draws no frame around one: the film IS the device — its own window,
            titlebar, sidebar and conversation, on its own ground — and a border
            here would be a second window drawn around the first. */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Mockup
            slug="desktop"
            alt="The Hanzo desktop app: a conversation beside the workspace it acts on."
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default DownloadHero
