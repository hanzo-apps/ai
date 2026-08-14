'use client'


import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Bot, Code, Server, Database, Shield, Sparkles, Cpu, Microscope, Activity, Scale } from 'lucide-react';

const Features = () => {
  const featuresList = [
    {
      icon: Brain,
      title: 'The model catalog',
      description: 'The Zen family we train ourselves, and frontier models from elsewhere. Change the model name in the request; nothing else changes.'
    },
    {
      icon: Bot,
      title: 'Agents',
      description: 'A Python SDK where an agent is a model, instructions and tools. Put several behind a router when one prompt stops being enough.'
    },
    {
      icon: Cpu,
      title: 'Inference',
      description: 'Batching and caching happen on our side. You send a request and read a stream back; the throughput work is not yours to do.'
    },
    {
      icon: Database,
      title: 'Vectors',
      description: 'Embeddings stored and indexed where the rest of your data already is, so retrieval is a query rather than a second service to run.'
    },
    {
      icon: Microscope,
      title: 'Evals',
      description: 'Run a set of cases against a model, keep the results, and compare them after you change the prompt — the only way to know a change helped.'
    },
    {
      icon: Activity,
      title: 'What every call did',
      description: 'Model, latency, tokens and cost per request, per key. A bill that surprises you is a bill you could not see coming.'
    },
    {
      icon: Shield,
      title: 'Guardrails',
      description: 'zen3-guard classifies content before or after a turn. Scope which tools an agent may reach, and keep code execution inside a sandbox.'
    },
    {
      icon: Scale,
      title: 'Load',
      description: 'The same endpoint answers one request a day and a sustained burst. Set a rate limit per key so one client cannot spend another one\'s headroom.'
    },
    {
      icon: Code,
      title: 'SDKs',
      description: 'Python, TypeScript, Go and Rust clients, plus a plain HTTP API for everything else. Same endpoints, same request shape.'
    },
    {
      icon: Server,
      title: 'Your own weights',
      description: 'Bring a model you trained and serve it behind the same API, with the same keys, limits and cost reporting as everything else in the catalog.'
    },
    {
      icon: Sparkles,
      title: 'Fine-tuning',
      description: 'Start from an open-weight Zen model, train on your data, and get back a model name you can call like any other.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
              What is in the cloud
            </h2>
            <p className="text-xl text-foreground/80">
              The pieces an AI application needs, already wired to each other and reached with the same key
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/50 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--white)] mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
