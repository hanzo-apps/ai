'use client'

import { HanzoLogo } from '@hanzo/logo/react'
import { Github } from 'lucide-react'
import { FOOTER, GITHUB } from './nav-data'

export default function LandingFooter() {
  return (
    <footer className="border-t border-neutral-900 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2" aria-label="Hanzo home">
              <HanzoLogo variant="white" size={22} />
              <span className="text-[15px] font-semibold tracking-tight text-white">Hanzo</span>
            </a>
            <p className="mt-3 max-w-[16rem] text-sm text-neutral-500">
              The AI cloud for agents and apps.
            </p>
          </div>

          {FOOTER.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Hanzo AI, Inc. All rights reserved.
          </p>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Hanzo on GitHub"
            className="text-neutral-500 transition-colors hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
