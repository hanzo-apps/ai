'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Zap, Scale, Shield, Grid, DatabaseIcon, Activity } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="bg-neutral-900/20 border border-neutral-800 rounded-xl p-8"
  >
    <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6">
      <Icon className="h-6 w-6 text-foreground/70" />
    </div>
    <ChromeText as="h3" className="text-xl font-bold mb-4">
      {title}
    </ChromeText>
    <p className="text-muted-foreground">
      {description}
    </p>
  </motion.div>
);

const KeyFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Columns, not rows",
      description: "A table is stored one column at a time, so a query reads only the columns it names. Each column gets a codec suited to what it holds — deltas for a rising timestamp, dictionaries for a repeated label, general compression over the result."
    },
    {
      icon: Scale,
      title: "Shard it and it keeps up",
      description: "Tables are partitioned and spread across nodes; add nodes and both the storage and the scan spread with them. Parts merge in the background, so ingest never stops for a compaction window."
    },
    {
      icon: Shield,
      title: "Replicas that agree",
      description: "Replicated tables coordinate through a Raft quorum running inside the server itself — there is no separate coordination service to stand up beside the database. A replica that falls behind catches up part by part."
    },
    {
      icon: Grid,
      title: "Local disks, or object storage",
      description: "Run a shared-nothing cluster on local NVMe, or put the table's data on object storage and scale query nodes on their own. Old partitions expire on a TTL you write into the schema."
    },
    {
      icon: DatabaseIcon,
      title: "Events, metrics and logs are one shape",
      description: "Append-heavy, partitioned by time, queried by range — the same engine serves all three. Materialized views keep rollups current as rows land, so the summary exists before anyone asks for it."
    },
    {
      icon: Activity,
      title: "SQL, and several doors in",
      description: "Query over HTTP on 8123, on the native protocol on 9000, or through the MySQL and PostgreSQL wire ports — which is how BI tools and drivers that know nothing about it still connect. A CSV, a Parquet file or a JSON stream loads without a conversion step first."
    }
  ];

  return (
    <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 bg-[var(--black)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <ChromeText as="h2" className="text-3xl md:text-5xl font-bold mb-6">
            What it does
          </ChromeText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Scan a great many rows. Return a small answer. Do it while the rows are still arriving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
