"use client"

import { motion } from "@/components/motion"
import { Gift, Heart, ArrowRight } from "lucide-react"
import { Box } from '@hanzo/ui'

export default function PricingCallouts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <Box className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Referral Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-secondary/50 border border-border rounded-xl p-8 overflow-hidden hover:border-neutral-600 transition-colors"
        >
          <Box className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <Box className="relative z-10">
            <Box className="h-10 w-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
              <Gift className="h-5 w-5 text-foreground" />
            </Box>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Earn While You Build
            </h3>
            {/* No amount, because a referral pays none: claiming a code records
                an attribution edge, and the sweep that qualifies it moves no
                money. This said $20 of credit, which nothing grants, and "5% at
                Partner tier" — the level-2 rate read as a headline. What a
                referral is worth is an affiliate commission on margin, at a rate
                the affiliate program owns, so link that door rather than keep a
                second copy of its number here. */}
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Refer a developer. Once they start spending, you earn commission through the affiliate program.
            </p>
            <a
              href="/affiliate"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-white transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </a>
          </Box>
        </motion.div>

        {/* Open Source Fund */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative bg-secondary/50 border border-border rounded-xl p-8 overflow-hidden hover:border-neutral-600 transition-colors"
        >
          <Box className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <Box className="relative z-10">
            <Box className="h-10 w-10 rounded-lg flex items-center justify-center mb-4 bg-primary/10">
              <Heart className="h-5 w-5 text-foreground" />
            </Box>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Up to 5% Goes to Open Source
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Up to 5% of platform revenue goes directly to the open source developers whose work powers Hanzo infrastructure.
            </p>
            <a
              href="/open-source-fund"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-foreground hover:text-white transition-colors"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </a>
          </Box>
        </motion.div>
      </Box>
    </section>
  )
}
