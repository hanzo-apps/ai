'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Handshake,
  DollarSign,
  Globe,
  Shield,
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Wallet,
} from 'lucide-react'
import ChromeText from '@/components/ui/chrome-text'

const tiers = [
  {
    name: 'Standard',
    rate: '20%',
    description: 'Recurring revenue share on every customer you refer',
    features: ['20% lifetime commission', 'Real-time dashboard', 'Monthly payouts', 'Self-serve API'],
  },
  {
    name: 'Pro',
    rate: '30%',
    description: 'For agencies and high-volume partners',
    features: ['30% lifetime commission', 'Co-marketing budget', 'Dedicated partner manager', 'Custom landing pages'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    rate: 'Custom',
    description: 'Strategic partners and resellers',
    features: ['Negotiated revenue share', 'Co-selling', 'White-label options', 'Direct integration support'],
  },
]

const benefits = [
  { icon: DollarSign, title: 'Lifetime commissions', description: 'Get paid for every renewal, not just the first sale.' },
  { icon: BarChart3, title: 'Real-time tracking', description: 'See clicks, conversions, and earnings in your partner dashboard.' },
  { icon: Wallet, title: 'Fast payouts', description: 'Monthly payments via wire, ACH, or USDC.' },
  { icon: Globe, title: 'Global reach', description: 'Hanzo customers in 150+ countries — refer from anywhere.' },
  { icon: Shield, title: 'Transparent attribution', description: 'Cookie-based + first-party tracking with 90-day window.' },
  { icon: Sparkles, title: 'Marketing assets', description: 'Logos, screenshots, copy, video — everything you need to convert.' },
]

const Affiliate = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="bg-primary/10 border border-border rounded-full px-4 py-1 inline-block mb-4">
              <span className="text-sm flex items-center gap-2">
                <Handshake className="w-4 h-4" /> Affiliate Program
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <ChromeText>Earn with Hanzo</ChromeText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Recurring revenue share for agencies, creators, and developers who refer
              customers to Hanzo&apos;s AI cloud, models, and developer tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact/sales" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Become a partner <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/referral" className="inline-flex items-center justify-center gap-2 border border-border bg-transparent hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                Individual referral program
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Partner tiers</h2>
            <p className="text-muted-foreground">Pick the tier that matches your reach.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-xl border ${tier.highlight ? 'border-white/40 bg-neutral-900/80' : 'border-neutral-800 bg-neutral-900/50'}`}
              >
                <div className="text-sm text-muted-foreground">{tier.name}</div>
                <div className="text-5xl font-bold my-3">{tier.rate}</div>
                <p className="text-muted-foreground mb-6 text-sm">{tier.description}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-foreground/70 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact/sales" className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${tier.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-border hover:bg-accent'}`}>
                  Apply
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why partner with Hanzo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50"
                >
                  <Icon className="h-6 w-6 mb-3 text-foreground/80" />
                  <h3 className="font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="h-10 w-10 mx-auto mb-4 text-foreground/70" />
          <h2 className="text-3xl font-bold mb-4">Build with us</h2>
          <p className="text-muted-foreground mb-8">
            Strategic partners ship faster. Co-engineering, go-to-market support, and
            integration help — direct from the Hanzo team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact/sales" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Talk to partnerships <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://docs.hanzo.ai/affiliate" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border bg-transparent hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              Read the program docs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Affiliate
