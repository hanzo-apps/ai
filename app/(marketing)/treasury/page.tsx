"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ArrowRight,
  Banknote,
  GitMerge,
  Landmark,
  RefreshCw,
  Shield,
  Vault,
  Wallet,
} from "lucide-react"
import { Box } from '@hanzo/ui'

export default function TreasuryPage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <Landmark className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Treasury Operations</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Treasury</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            A double-entry ledger for money moving inside your product
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every movement is postings between accounts, so the books balance by construction
            rather than by a nightly job that hopes. Marketplace splits, held funds, refunds
            and fees are written as transactions you can replay — which is what you need the
            day someone asks where a particular dollar went.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 gap-4 mb-12 max-w-md max-w-3xl mx-auto">
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Auto</Box><Box className="text-sm text-muted-foreground">Sweep</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Real-time</Box><Box className="text-sm text-muted-foreground">Recon</Box></Box>
            </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-treasury" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </Box>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What it is made of</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A ledger, a language for writing transactions, and the machinery around them.</p>
          </motion.div>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Banknote, title: "Double-entry ledger", description: "A transaction is a set of postings with a source and a destination, and it is rejected unless it balances. Entries are immutable — a correction is another transaction, so history stays true." },
              { icon: GitMerge, title: "Reconciliation", description: "Match what the ledger believes against what a payment provider reports, and surface the rows that disagree. The breaks are the output; agreeing totals need no attention." },
              { icon: Wallet, title: "Accounts and balances", description: "Hold balances per account and per currency, and move between them as ledger transactions. What an account settles against is configured per deployment." },
              { icon: RefreshCw, title: "Wallets with holds", description: "Multi-currency virtual wallets that can hold an amount and release it later. That is how you take money at checkout and pay a seller on delivery without the balance lying in between." },
              { icon: Shield, title: "Flows and webhooks", description: "Longer sequences — capture, split, pay out, retry — run as orchestrated flows, and every change of financial state is delivered as an event you can subscribe to." },
            ].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-600 transition-colors">
                <Box className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10"><feature.icon className="h-6 w-6 text-foreground" /></Box>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </Box>
        </Box>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Write the transaction, not the bookkeeping</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <Box className="flex items-center gap-2 px-4 py-2 border-b border-border"><Box className="flex gap-1.5"><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /></Box><span className="text-xs text-muted-foreground ml-2">split.num</span></Box>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`// A $100 order, split three ways, written once.
// Numscript refuses to run this if the amounts do not add up.

send [USD/2 10000] (
  source = @users:001
  destination = {
    90% to @merchants:042
    5%  to @fees:processing
    remaining to @platform:revenue
  }
)`}</code></pre>
          </motion.div>
        </Box>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Post your first transaction</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-treasury" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
                <ProductFooter slug="treasury" name="Treasury" />
</Box>
      </section>
    </>
  )
}
