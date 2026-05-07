"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GitBranch,
  Lock,
  ScrollText,
  Search,
  Shield,
  Workflow,
} from "lucide-react"

export default function LedgerPage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <ScrollText className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Double-Entry Ledger</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Ledger</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Programmable double-entry ledger for fintech apps
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Atomic, balanced transactions across millions of accounts. Idempotent posting, immutable history, real-time balances. The accounting backbone for wallets, marketplaces, and banking products.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Atomic</div><div className="text-sm text-muted-foreground">Postings</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Immutable</div><div className="text-sm text-muted-foreground">History</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">10K TPS</div><div className="text-sm text-muted-foreground">Throughput</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">GAAP</div><div className="text-sm text-muted-foreground">Ready</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/ledger" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/ledger" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Money Movement, Done Right</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Every cent accounted for. Every transaction balanced. Always.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Double-Entry Core", description: "Every transaction debits and credits balanced accounts. Mathematically impossible to lose money. GAAP-compliant out of the box." },
              { icon: CheckCircle2, title: "Idempotency", description: "Safe retries with idempotency keys. Submit the same transaction twice — only one posts. Critical for distributed systems." },
              { icon: Lock, title: "Immutable History", description: "Append-only ledger. No edits, no deletes — only reversing entries. Full audit trail for SOC 2, PCI, and bank examiners." },
              { icon: Workflow, title: "Programmable Rules", description: "Define complex flows: split-payments, escrow, fee distribution, FX. Composable transaction primitives evaluated server-side." },
              { icon: GitBranch, title: "Multi-Currency", description: "Native support for fiat, crypto, points, credits, and custom assets. Per-asset precision rules. FX rate snapshotting at posting time." },
              { icon: Search, title: "Real-Time Balances", description: "Sub-millisecond balance reads at any scale. Time-travel queries — see any account's balance at any point in history." },
            ].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-600 transition-colors">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10"><feature.icon className="h-6 w-6 text-foreground" /></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Atomic. Balanced. Auditable.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">posting.ts</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import { Ledger } from '@hanzo/ledger';

const ledger = new Ledger({ apiKey: process.env.HANZO_API_KEY });

// Atomic split-payment: customer pays vendor + 5% platform fee
await ledger.transactions.create({
  idempotency_key: 'order_42_payout',
  postings: [
    { account: 'customer:alice',   amount: -10500, asset: 'USD' },
    { account: 'vendor:bob',       amount:  10000, asset: 'USD' },
    { account: 'platform:revenue', amount:    500, asset: 'USD' },
  ],
  metadata: { order_id: 'ord_42', type: 'split_payment' },
});`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Ledger</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/ledger" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/ledger" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
