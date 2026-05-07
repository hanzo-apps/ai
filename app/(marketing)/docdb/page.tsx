"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  FileText,
  GitBranch,
  Layers,
  Network,
  Search,
  Shield,
  Zap,
} from "lucide-react"

export default function DocDBPage() {
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
            <FileText className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Document Database</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">DocDB</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            MongoDB-compatible document database
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Drop-in MongoDB wire-protocol compatibility on top of PostgreSQL. Same drivers, same queries, same aggregation pipeline — with ACID transactions and SQL access for analytics.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Mongo Wire</div><div className="text-sm text-muted-foreground">Compatible</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">ACID</div><div className="text-sm text-muted-foreground">Transactions</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">PostgreSQL</div><div className="text-sm text-muted-foreground">Engine</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">SQL</div><div className="text-sm text-muted-foreground">Access</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docdb" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/docdb" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Documents Without Lock-In</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Your existing MongoDB code, running on open PostgreSQL.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Network, title: "Mongo Wire Protocol", description: "Native MongoDB 6+ wire compatibility. Plug in your existing pymongo, mongoose, or mongo-go-driver client. No code changes." },
              { icon: Layers, title: "Aggregation Pipeline", description: "Full $match, $group, $lookup, $unwind, $facet support. Window functions and complex analytics over JSONB documents." },
              { icon: Shield, title: "ACID Transactions", description: "Multi-document, multi-collection transactions backed by PostgreSQL MVCC. Real serializable isolation, no eventual consistency surprises." },
              { icon: Search, title: "Hybrid Indexing", description: "GIN indexes for arbitrary JSONB queries. B-tree for sorted scans. pg_trgm for fuzzy text. Compound indexes that just work." },
              { icon: GitBranch, title: "SQL Side-Door", description: "Query the same collections via SQL/JSONB for reporting and analytics. No ETL — your operational store is your warehouse." },
              { icon: Zap, title: "PostgreSQL Power", description: "Inherits everything: streaming replication, point-in-time recovery, logical replication, role-based access. Enterprise from day one." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Drop-In MongoDB Replacement</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">app.ts</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import { MongoClient } from 'mongodb';

// Same driver. Different connection string. That's it.
const client = new MongoClient(process.env.HANZO_DOCDB_URI);
await client.connect();

const orders = client.db('shop').collection('orders');

// Aggregation pipelines run unchanged
const top = await orders.aggregate([
  { $match: { status: 'paid' } },
  { $group: { _id: '$customer_id', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]).toArray();`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with DocDB</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/docdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
