"use client"

import { motion } from "@/components/motion"
import {
  Database,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Layers,
  Radio,
  Server,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"
import OSSComputeDividends from "@/components/oss/OSSComputeDividends"

import { ProductFooter } from "@/components/products/ProductFooter"
export default function KVPage() {
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
            <span className="text-sm font-medium text-foreground/80">In-memory data store</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">KV</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            In-memory key-value store
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Values live in memory, so a read is a network hop and a hash lookup — nothing waits on a disk. KV speaks RESP2 and RESP3 on port 6379, so the client library you already have connects to it. Reach for it for caches, sessions, rate limits, job queues and leaderboards.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">RESP</div><div className="text-sm text-muted-foreground">2 and 3</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Sentinel</div><div className="text-sm text-muted-foreground">Failover</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">AOF</div><div className="text-sm text-muted-foreground">Persistence</div></div>
            <div className="bg-secondary/50 border border-border rounded-xl p-4"><div className="text-2xl font-bold text-foreground">Cluster</div><div className="text-sm text-muted-foreground">Sharding</div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/kv" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/kv" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Pick a structure, not a schema</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A leaderboard is a sorted set. A rate limit is a counter with an expiry. A queue is a list.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Nothing touches a disk", description: "Reads and writes are answered out of memory, so the time you spend is the network and a hash lookup. That is the whole reason to put a cache in front of a database." },
              { icon: Layers, title: "The structures do the work", description: "Strings, hashes, lists, sets, sorted sets, streams, bitmaps, HyperLogLog and geospatial indexes — each with the commands that make sense for it. Lua scripts run several commands as one atomic step when a single command is not enough." },
              { icon: Radio, title: "Pub/Sub", description: "Publish to a channel and every subscriber has it, including subscribers matching a pattern like orders.*. Keyspace notifications turn a key expiring into a message something else can act on." },
              { icon: Clock, title: "Keys that expire", description: "Put a TTL on any key and it goes away by itself. When memory fills, you choose what leaves first — least recently used, least frequently used, shortest time to live, or only keys that already carry an expiry." },
              { icon: Server, title: "Two ways to survive a restart", description: "An RDB snapshot writes the whole dataset on an interval; the append-only file records every write as it happens. Run either or both, and check a file before you trust it with kv-check-rdb and kv-check-aof." },
              { icon: Shield, title: "ACLs on commands and keys", description: "A user is granted specific commands and specific key patterns, so the service that only reads cache keys cannot reach FLUSHALL. TLS on the wire." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Any RESP client connects</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /><div className="w-3 h-3 rounded-full bg-neutral-700" /></div><span className="text-xs text-muted-foreground ml-2">cache.ts</span></div>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import Redis from "ioredis"

const kv = new Redis("redis://kv.hanzo.ai:6379")

// Caching
await kv.set("user:123", JSON.stringify(user), "EX", 3600)
const cached = await kv.get("user:123")

// Rate limiting
const count = await kv.incr("ratelimit:api:usr_123")
await kv.expire("ratelimit:api:usr_123", 60)

// Pub/Sub
kv.subscribe("events")
kv.on("message", (channel, message) => {
  console.log(channel, message)
})`}</code></pre>
          </motion.div>
        </div>
      </section>

      <OSSRevenueBanner upstreamName="Valkey" />
      <OSSComputeDividends variant="banner" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative bg-secondary/50 border border-border rounded-2xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden"><div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /><div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Put it in front of the database</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">Free tier includes 256 MB. Provision in seconds.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://docs.hanzo.ai/docs/kv" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
                <a href="https://github.com/hanzoai/kv" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">View on GitHub</a>
              </div>
            </div>
          </motion.div>
                <ProductFooter slug="kv" name="KV" />
</div>
      </section>
    </>
  )
}
