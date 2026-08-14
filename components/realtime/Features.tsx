'use client'


import React from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Globe, Users, Clock, Lock, Workflow, Shield } from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-neutral-900 to-background border border-neutral-800 rounded-xl p-6"
    >
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--white)] mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Activity,
      title: "One stream, server-sent",
      description: "A single long-lived HTTP response carries every update, so nothing special has to sit in front of it. The browser notices a dropped network and reconnects on its own."
    },
    {
      icon: Workflow,
      title: "A collection, or one record",
      description: "Watch a whole collection and hear about everything that lands in it, or watch one record and hear only about that one. Change what you are watching without dropping the stream."
    },
    {
      icon: Globe,
      title: "One broker per tenant",
      description: "An org's subscribers attach to that org's own broker, reading that org's own data. Two tenants using the same collection name are not sharing a topic, so there is no cross-tenant fan-out to get wrong."
    },
    {
      icon: Users,
      title: "Deletes are checked too",
      description: "A delete is announced only to the subscribers whose rule would have let them read the record. Something you were never allowed to see does not reveal itself on the way out."
    },
    {
      icon: Clock,
      title: "The same data, not a copy of it",
      description: "The stream reads from the store the API reads. There is no separate event bus to keep in step, and nothing that can be current in one place and stale in the other."
    },
    {
      icon: Zap,
      title: "The rule is the filter",
      description: "What reaches a subscriber is decided by the collection's access rule, evaluated against the identity that opened the stream. It is the same predicate that guards the API, not a second one written for the stream."
    },
    {
      icon: Lock,
      title: "A grant, not your token",
      description: "A browser cannot put a header on the request that opens a stream. So you mint a short-lived grant on an ordinary authenticated call and spend it once, within thirty seconds — rather than putting a token that opens every service into a URL that every proxy and access log will keep."
    },
    {
      icon: Shield,
      title: "Limits belong to the deployment",
      description: "How many streams and how many requests are settings on the deployment and counted once for the process, not copied onto each tenant — so a limit of two means two."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">
            What the stream gives you
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            One connection, and the rules you already wrote deciding what goes down it
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
