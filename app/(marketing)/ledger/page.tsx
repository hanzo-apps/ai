"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
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
            A double-entry ledger you post to over HTTP
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Money here only ever moves: a posting names a source account, a destination account, an amount and an asset. There is no way to write a debit without its credit, because a one-sided entry is not something the API can express. Every account but one has to stay at or above zero, so a transfer that would overdraw is refused instead of recorded.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Atomic</div><div className="text-sm text-muted-foreground">Postings</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Reverts</div><div className="text-sm text-muted-foreground">Never edits</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">USD/2</div><div className="text-sm text-muted-foreground">Assets carry precision</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Numscript</div><div className="text-sm text-muted-foreground">Money-movement DSL</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-ledger" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Every cent lands somewhere</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A posting has two ends. There is no call that writes only one of them.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: "Balanced by construction", description: "A posting is a movement from one account to another, so an unbalanced entry is not rejected by a check — it cannot be written down. New money enters through one account named world; every other account must stay at or above zero, and a transaction that would push one under is refused whole." },
              { icon: CheckCircle2, title: "Safe to retry", description: "Send an Idempotency-Key and a repeat returns the original rather than posting again. The ledger also fingerprints what you sent, so reusing a key with different postings is caught instead of quietly accepted — which is the failure that makes retries dangerous in the first place." },
              { icon: Lock, title: "Nothing is edited", description: "No endpoint changes a posted transaction. A mistake is corrected by a reversing transaction that points back at the original, so what happened and what you meant both survive. Entries can also be SHA-256 chained, each hashed over the one before it, which makes a later edit in the database detectable rather than invisible." },
              { icon: Workflow, title: "Numscript", description: "Describe the movement instead of computing it. Send an amount from an account and split it across destinations by percentage, nesting splits inside splits. The whole flow posts as one transaction, so a fee that cannot be taken takes the payment with it." },
              { icon: GitBranch, title: "Assets carry their own precision", description: "An asset is a code plus the number of decimal places it uses — USD/2 for cents, and the same shape for points, credits or a token with eighteen. Amounts are whole numbers in the asset's smallest unit, so nothing rounds on the way in." },
              { icon: Search, title: "Balances arrive with the transaction", description: "Each transaction records the balances it produced for the accounts it touched, so a balance is read rather than recomputed from the whole history. Aggregate across a subtree of accounts in one query." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">One transaction, however many parties</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">payout.sh</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`# A split payment: the vendor is paid and the platform takes its cut,
# in one transaction that lands whole or not at all.

curl -X POST http://localhost:3068/v2/main/transactions \\
  -H 'Content-Type: application/json' \\
  -H 'Idempotency-Key: order_42_payout' \\
  -d '{
    "postings": [
      { "source": "users:001", "destination": "merchants:042", "amount": 9500, "asset": "USD/2" },
      { "source": "users:001", "destination": "platform:fees", "amount":   500, "asset": "USD/2" }
    ],
    "metadata": { "order": "ord_42" }
  }'

# Or say it once in Numscript and let the ledger do the arithmetic:
#
#   send [USD/2 10000] (
#     source = @users:001
#     destination = { 95% to @merchants:042
#                      5% to @platform:fees }
#   )`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Ledger</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/skills/hanzo-ledger" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="ledger" name="Ledger" />
</div>
      </section>
    </>
  )
}
