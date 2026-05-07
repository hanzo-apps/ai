"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Database,
  Gauge,
  Layers,
  Server,
  Shield,
  Zap,
} from "lucide-react"

export default function DatabasePage() {
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
            <span className="text-sm font-medium text-foreground/80">Real-Time Analytics</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Database</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Real-time analytics database
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Sub-second queries over billions of rows. Columnar storage, vectorized execution, and incremental materialized views. Built for product analytics, observability, and customer-facing dashboards.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Columnar</div><div className="text-sm text-muted-foreground">Storage</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Sub-sec</div><div className="text-sm text-muted-foreground">Latency</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Billions</div><div className="text-sm text-muted-foreground">Rows</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Postgres</div><div className="text-sm text-muted-foreground">Wire</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/database" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/database" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Analytics, Not Compromised by It</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Time-series, events, metrics, traces — one engine.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Vectorized Execution", description: "SIMD-accelerated columnar engine. Scan billions of rows per second per core. Push-down predicates and projection-only reads." },
              { icon: Layers, title: "Incremental Materialized Views", description: "Define rollups, aggregations, and joins as views. Hanzo Database keeps them fresh on every insert. No batch ETL." },
              { icon: Gauge, title: "High-Cardinality Metrics", description: "Million-tag dimensions without downsampling. Per-user, per-device, per-experiment slicing — interactive at any scale." },
              { icon: Server, title: "Tiered Storage", description: "Hot data on NVMe, warm on SSD, cold on object storage. Transparent migration based on age and access patterns. Pay for what you query." },
              { icon: BarChart3, title: "PostgreSQL Wire", description: "Drop-in for any psql-compatible client, BI tool, or ORM. Tableau, Metabase, Superset, dbt — they all just work." },
              { icon: Shield, title: "Zero-Downtime Schema", description: "Add columns, change types, alter partitioning live. Backfill in the background. Online DDL without read-your-write surprises." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Standard SQL. Real-Time Reads.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">events.sql</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`-- Wide event table, partitioned by hour
CREATE TABLE events (
  ts          TIMESTAMPTZ NOT NULL,
  user_id     UUID,
  event       TEXT,
  properties  JSONB
) PARTITION BY RANGE (ts);

-- Always-fresh per-user daily counts
CREATE INCREMENTAL MATERIALIZED VIEW dau AS
SELECT
  date_trunc('day', ts) AS day,
  user_id,
  count(*)              AS events
FROM events
GROUP BY 1, 2;

-- Sub-second over a billion rows
SELECT day, count(distinct user_id) AS dau
FROM dau
WHERE day >= now() - interval '30 days'
GROUP BY 1 ORDER BY 1;`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get started with Database</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/database" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai/database" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
