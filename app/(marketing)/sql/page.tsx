"use client"

import { motion } from "@/components/motion"
import {
  Database,
  ArrowRight,
  Shield,
  Zap,
  GitBranch,
  Layers,
  BarChart3,
  Server,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function SQLPage() {
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
            <Database className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Managed PostgreSQL</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">SQL</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            PostgreSQL 18, run for you
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            This is Postgres itself, not a reimplementation of it, so your driver, your ORM and psql connect the way they always have. Five extensions are enabled before you get the connection string — pgvector for embeddings, pg_trgm for fuzzy text, btree_gin for mixed indexes, uuid-ossp for keys, and pg_stat_statements so the slow query is already recorded when you go looking for it.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">PG 18</div><div className="text-sm text-muted-foreground">Version</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">ACID</div><div className="text-sm text-muted-foreground">Transactions</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">pgvector</div><div className="text-sm text-muted-foreground">Already on</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">WAL</div><div className="text-sm text-muted-foreground">Restore to a second</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/sql" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/sql" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Postgres, without the pager duty</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">You write the queries. We take the upgrades, the archiving and the replicas.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "pgvector", description: "An embedding is a column beside the row it describes, so nearest-neighbour search and a WHERE clause are one query against one store. HNSW and IVFFlat indexes, cosine, L2 or inner product." },
              { icon: Zap, title: "Connection Pooling", description: "Built-in PgBouncer. Handle thousands of connections without overloading PostgreSQL." },
              { icon: GitBranch, title: "Branching", description: "Create database branches for development and testing. Instant copy-on-write clones." },
              { icon: Shield, title: "Backups you don’t schedule", description: "The write-ahead log is archived as it is written, so recovery targets a second rather than the last nightly dump. Name a timestamp and the database comes back as it stood." },
              { icon: BarChart3, title: "Query Insights", description: "pg_stat_statements is on from first boot, so the query that got slow last Tuesday was already being counted. Calls, total and mean time, rows and buffer hits, per normalised statement." },
              { icon: Server, title: "Read replicas", description: "Streaming replication keeps a second copy in step with the primary, byte for byte. Send reports and dashboards there and leave the primary to the writes." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">It is Postgres. That is the feature.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">schema.sql</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Store embeddings alongside your data
CREATE TABLE documents (
  id         BIGSERIAL PRIMARY KEY,
  content    TEXT NOT NULL,
  embedding  vector(1536),
  metadata   JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HNSW index for fast similarity search
CREATE INDEX ON documents
  USING hnsw (embedding vector_cosine_ops);

-- Query with standard SQL
SELECT content, 1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1
LIMIT 10;`}</code></pre>
          </motion.div>
        </div>
      </section>

      <OSSRevenueBanner upstreamName="PostgreSQL" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative bg-secondary/50 border border-border rounded-2xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden"><div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /><div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Point a connection string at it</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">Free tier includes 1 GB storage and 1M row reads/month.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://docs.hanzo.ai/docs/sql" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Provision a Database <ArrowRight className="w-4 h-4" /></a>
                <a href="https://github.com/hanzoai/sql" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">View on GitHub</a>
              </div>
            </div>
          </motion.div>
                <ProductFooter slug="sql" name="SQL" />
</div>
      </section>
    </>
  )
}
