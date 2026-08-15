"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
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
            The store behind dashboards, product analytics and observability. Columns live in separate files, so a query reads only the ones it names. Rows are sorted and grouped into parts by time, so a query bounded by a range reads a run of adjacent blocks instead of hunting for them. Rollups are materialized views updated as rows land, which is why the number on the dashboard is the current one rather than last night's.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Columnar</div><div className="text-sm text-muted-foreground">Storage</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Sorted</div><div className="text-sm text-muted-foreground">Parts by time</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Rollups</div><div className="text-sm text-muted-foreground">Current on insert</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Postgres</div><div className="text-sm text-muted-foreground">Wire</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/sql" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Events, metrics and traces are one shape</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Append-heavy, partitioned by time, queried by range. One engine serves all three.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Vectorised execution", description: "Values from one column sit next to each other in memory in a single representation, so a sum or a filter runs across a block of them with vector instructions instead of once per row — and only the columns the query names come off the disk at all." },
              { icon: Layers, title: "Rollups that keep themselves current", description: "Write the aggregate as a materialized view and it is maintained as rows arrive, holding partial aggregate states that merge when you read them. No nightly batch, and no window in which the dashboard is showing yesterday." },
              { icon: Gauge, title: "High cardinality is not a special case", description: "Per-user, per-device and per-experiment dimensions stay as they are — nothing downsampled, no labels dropped to keep an index small. Repeated values are stored as dictionary references, and the sorting key decides how much of a scan a range can skip." },
              { icon: Server, title: "Data ages out on a rule you wrote", description: "A TTL clause in the table definition moves old partitions to slower storage or removes them outright, and a table's data can sit on object storage while query nodes scale on their own. Retention is part of the schema rather than a cron job somebody has to remember." },
              { icon: BarChart3, title: "Several doors, one engine", description: "It answers over HTTP, on its own native protocol, and on the MySQL and PostgreSQL wire ports — which is how a BI tool or a driver that has never heard of it connects anyway." },
              { icon: Shield, title: "Adding a column is a metadata change", description: "The ALTER returns at once and the column is materialised as parts get rewritten in the background, so reads carry on throughout. Partitions are dropped whole, which is why removing a month costs almost nothing." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The schema says how it will be read</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">events.sql</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`-- One part per month, sorted the way it will be filtered,
-- and ninety days of retention written into the table itself.
CREATE TABLE events (
  ts         DateTime64(3),
  user_id    UUID,
  event      LowCardinality(String),
  properties String
) ENGINE = MergeTree
PARTITION BY toYYYYMM(ts)
ORDER BY (event, ts)
TTL toDateTime(ts) + INTERVAL 90 DAY;

-- A rollup maintained as rows land, not a job that runs at 3am.
CREATE MATERIALIZED VIEW dau
ENGINE = AggregatingMergeTree ORDER BY day AS
SELECT toDate(ts) AS day, uniqState(user_id) AS users
FROM events GROUP BY day;

-- Reading it merges the partial states. events is never scanned.
SELECT day, uniqMerge(users) AS dau
FROM dau
WHERE day >= today() - 30
GROUP BY day ORDER BY day;`}</code></pre>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Load a month of events and ask it something</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/sql" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </div>
                <ProductFooter slug="database" name="Database" />
</div>
      </section>
    </>
  )
}
