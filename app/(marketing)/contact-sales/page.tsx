"use client"

/**
 * /contact-sales — legacy slug kept for inbound links only.
 *
 * Canonical enterprise sales page is /contact/sales. This stub redirects
 * there client-side (static export — no server redirects) and shows a
 * fallback link for crawlers and no-JS visitors.
 */

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Calendar, Building2 } from "lucide-react"

export default function ContactSalesPage() {
  // Client-side redirect for users who land here through internal nav.
  // Crawlers and direct visits still see the content below.
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.replace("/contact/sales")
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-2 border mb-6 border-white/20 text-white/80">
            <Building2 className="w-4 h-4" />
            Enterprise sales
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] mb-5">
            Talk to Hanzo sales.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Higher API limits, private deployment, SLAs, dedicated support, compliance, and custom infrastructure. We will help you scope, deploy, and operate Hanzo for your team.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
            <Link
              href="/contact/sales"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact form
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="mailto:sales@hanzo.ai"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-white/25 hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              <Mail className="mr-2 h-4 w-4" />
              sales@hanzo.ai
            </a>
            <a
              href="https://cal.com/hanzo/sales"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-sm border border-border hover:bg-secondary hover:border-neutral-600 transition-all"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a meeting
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground/70">
            Redirecting to /contact/sales in a moment.
          </p>
        </div>
      </section>
    </div>
  )
}
