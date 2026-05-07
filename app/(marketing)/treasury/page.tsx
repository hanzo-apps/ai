"use client"

import { motion } from "framer-motion"
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

export default function TreasuryPage() {
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
            <Landmark className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Treasury Operations</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Treasury</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Treasury management — sweep, reconcile, custody
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Move money across bank accounts, custodians, and crypto wallets. Automated sweeps, real-time reconciliation, MPC custody. Built for finance teams that hate spreadsheets.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Auto</div><div className="text-sm text-muted-foreground">Sweep</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Real-time</div><div className="text-sm text-muted-foreground">Recon</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">MPC</div><div className="text-sm text-muted-foreground">Custody</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">SOC 2</div><div className="text-sm text-muted-foreground">In-Audit</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/treasury" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/treasury" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cash and Crypto, One View</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Every account, every balance, every movement — orchestrated.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Banknote, title: "Automated Sweeps", description: "Move excess cash to high-yield accounts on a schedule. Threshold rules, target balances, multi-leg routing across operating, reserve, and investment accounts." },
              { icon: GitMerge, title: "Reconciliation", description: "Match bank statements to ledger entries automatically. Pluggable Plaid, Teller, and direct bank-feed connectors. Flag breaks for review." },
              { icon: Vault, title: "MPC Custody", description: "Threshold-signed crypto custody via luxfi/mpc. No single point of compromise. Approval workflows with quorum policies and HSM signers." },
              { icon: Wallet, title: "Multi-Bank", description: "Native integrations with JPMorgan, Mercury, Brex, Modern Treasury, Wise. ACH, wire, RTP, FedNow. SWIFT for international." },
              { icon: RefreshCw, title: "Cash Flow Forecasting", description: "Project balances 30/60/90 days out. Model receivables, payables, payroll, and tax obligations. Alert on projected shortfalls." },
              { icon: Shield, title: "Approval Workflows", description: "Per-account spending limits, dual control, multi-sig approvals. Slack and email approvals with audit trail. Configurable per role and amount." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sweep Cash. Hold Keys. Sleep Easy.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">sweep.ts</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import { Treasury } from '@hanzo/treasury';

const treasury = new Treasury({ apiKey: process.env.HANZO_API_KEY });

// Auto-sweep operating cash above $250k to T-bill ladder
await treasury.policies.create({
  source: 'bank:jpmc:operating',
  target: 'investment:tbill_ladder',
  trigger: { type: 'balance_above', amount: 250_000_00 },
  retain: 250_000_00,
  schedule: 'daily@16:00 America/New_York',
  approval: { quorum: 2, roles: ['cfo', 'controller'] },
});`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Treasury</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/treasury" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/treasury" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
