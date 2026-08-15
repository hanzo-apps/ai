"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
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
            Documents on the MongoDB wire, stored in PostgreSQL
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            DocDB answers the MongoDB wire protocol on 27017 and stores nothing itself: it translates each command into SQL and runs it against PostgreSQL. Your driver connects, your documents go in as documents — and the same data is sitting in a database you can also point a SQL client at, back up and replicate the way you already do.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">27017</div><div className="text-sm text-muted-foreground">Wire protocol</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">ACID</div><div className="text-sm text-muted-foreground">Transactions</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">PostgreSQL</div><div className="text-sm text-muted-foreground">Engine</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">HTTP</div><div className="text-sm text-muted-foreground">And MCP</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/docdb" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">A document store with a SQL database under it</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Write documents. Keep every operational habit you already have.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Network, title: "The wire protocol, not a REST shim", description: "DocDB speaks MongoDB 5.0 and later on the wire, so pymongo, mongoose, the Go driver and mongosh connect to it directly. Around sixty commands are implemented — find, insert, update, delete, findAndModify, distinct, count, createIndexes, explain and the rest." },
              { icon: Layers, title: "Aggregation runs in the database", description: "A pipeline is translated to SQL and executed where the data is, not pulled across the wire and reduced in your process. explain returns the plan the query actually took — a PostgreSQL plan, for something you wrote as a pipeline." },
              { icon: Shield, title: "Transactions, and someone else's durability", description: "Multi-document writes commit or roll back together under PostgreSQL's MVCC. Backups, point-in-time recovery and replicas belong to the database — DocDB holds no state of its own, so there is nothing here that can be lost separately." },
              { icon: Search, title: "Indexes are real indexes", description: "createIndex from the driver builds a PostgreSQL index, and listIndexes reads back what is actually there. Nothing is emulated in a layer above the planner, so an index you create is one the planner can use." },
              { icon: GitBranch, title: "The SQL side door", description: "The documents are rows in PostgreSQL, so a reporting tool, a dbt model or a psql session can read them where they sit. The reporting copy and the operational copy are the same copy." },
              { icon: Zap, title: "An HTTP door and an agent door", description: "The same collections answer over plain HTTP — /action/find, /action/insertOne, /action/aggregate and the rest, with an OpenAPI document to generate from — and over the Model Context Protocol, so an agent can list databases and query them with no driver at all." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Connect the driver you already have</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">app.ts</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import { MongoClient } from 'mongodb';

// Same driver. New connection string.
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
            <a href="https://docs.hanzo.ai/docs/docdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="docdb" name="DocDB" />
</div>
      </section>
    </>
  )
}
