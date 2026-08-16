"use client"

import { motion } from "@/components/motion"
import {
  Radio,
  ArrowRight,
  Zap,
  Shield,
  Server,
  GitBranch,
  BarChart3,
  Layers,
} from "lucide-react"
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner"
import OSSComputeDividends from "@/components/oss/OSSComputeDividends"

import { ProductFooter } from "@/components/products/ProductFooter"
import { Box } from '@hanzo/ui'
export default function StreamPage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, var(--white-08) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <Radio className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Kafka Wire Protocol</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Stream</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            A Kafka port in front of Hanzo PubSub
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stream speaks the Kafka binary protocol on 9092 and stores nothing itself. A produce becomes a message in a durable PubSub stream — topic orders, partition 0, is the stream kafka-orders-0 — and a fetch reads it back out. Your producers and consumers connect unchanged, and it runs inside your cluster, next to the store it fronts.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Kafka</Box><Box className="text-sm text-muted-foreground">Wire protocol</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">PubSub</Box><Box className="text-sm text-muted-foreground">Holds the log</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Stateless</Box><Box className="text-sm text-muted-foreground">No broker disk</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Durable</Box><Box className="text-sm text-muted-foreground">At-least-once</Box></Box>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/services/stream" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai/stream" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </Box>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your clients, our store</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Keep the producers and consumers you have. Drop the cluster underneath them.</p>
          </motion.div>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "It speaks Kafka", description: "Produce, Fetch, ListOffsets, Metadata, OffsetCommit, OffsetFetch, FindCoordinator, JoinGroup, SyncGroup, Heartbeat, CreateTopics and ApiVersions, at the versions modern clients negotiate. kafka-python, sarama, confluent-kafka and franz-go all connect." },
              { icon: Zap, title: "The log lives in PubSub", description: "One topic partition is one durable PubSub stream. Retention, replicas and disk are that stream's settings, so the thing actually holding your events is a system you already run and already back up." },
              { icon: Server, title: "Nothing to operate", description: "One Go binary that keeps no state of its own. Restart it, run several, roll it mid-deploy — the log is somewhere else, so the gateway is never the piece you are afraid to touch." },
              { icon: GitBranch, title: "Offsets survive a restart", description: "A group's committed offsets live in a PubSub key-value bucket, so a consumer that dies comes back where it left off instead of at the top. Ask for an offset that has aged out and you get OFFSET_OUT_OF_RANGE, so the client resets rather than hangs." },
              { icon: BarChart3, title: "Offsets are stamped, not inferred", description: "Every Kafka offset is written into the record batch header when the batch is produced, and read straight back from there. Deriving them from the store's own sequence numbers works right up until the sequence has gaps in it — and then one record can make every fetch after it unreadable." },
              { icon: Shield, title: "Bad batches stop at the door", description: "A produce whose batch chain does not line up is refused with INVALID_RECORD instead of being written and discovered later by a consumer that cannot get past it. The scan that recovers a partition's bounds is capped, so a damaged topic degrades rather than stalls." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">One line changes: the bootstrap server</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <Box className="flex items-center gap-2 px-4 py-2 border-b border-border"><Box className="flex gap-1.5"><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /></Box><span className="text-xs text-muted-foreground ml-2">producer.py</span></Box>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import json
from kafka import KafkaProducer, KafkaConsumer

# The only line that changes
producer = KafkaProducer(
    bootstrap_servers=["stream.hanzo.ai:9092"],
    value_serializer=lambda v: json.dumps(v).encode(),
)

producer.send("events", {"type": "user.signup", "user_id": "usr_123"})

# Consumer groups work identically
consumer = KafkaConsumer(
    "events",
    bootstrap_servers=["stream.hanzo.ai:9092"],
    group_id="my-service",
    auto_offset_reset="earliest",
)

for message in consumer:
    process(message.value)`}</code></pre>
          </motion.div>
        </Box>
      </section>

      <OSSRevenueBanner upstreamName="franz-go" />
      <OSSComputeDividends variant="banner" />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <Box className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative bg-secondary/50 border border-border rounded-2xl p-8 md:p-12 text-center overflow-hidden">
            <Box className="absolute inset-0 overflow-hidden"><Box className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /><Box className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" /></Box>
            <Box className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Point the bootstrap server at it</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">The clients stay as they are. The cluster underneath them goes away.</p>
              <Box className="flex flex-wrap justify-center gap-4">
                <a href="https://docs.hanzo.ai/docs/services/stream" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Read the Docs <ArrowRight className="w-4 h-4" /></a>
                <a href="https://github.com/hanzoai/stream" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">View on GitHub</a>
              </Box>
            </Box>
          </motion.div>
                <ProductFooter slug="stream" name="Stream" />
</Box>
      </section>
    </>
  )
}
