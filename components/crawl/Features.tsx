'use client'

import React from "react";
import { motion } from "@/components/motion";
import { FileText, Monitor, Braces, Zap, Search, Shield } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "The readable part, not the page",
    description:
      "Deciding which subtree is the article is the hard problem, and it is the one this solves. You get the content and what the page says about itself, without the chrome around it.",
  },
  {
    icon: Monitor,
    title: "A browser only when needed",
    description:
      "Most pages are a fetch and a parse. Headless Chromium is a separate service it escalates to for the ones that genuinely need rendering, so you do not pay browser cost for a documentation page.",
  },
  {
    icon: Braces,
    title: "Markdown, and the metadata",
    description:
      "Headings stay headings and links keep their targets, resolved against the page they came from. Title, description and canonical URL come back alongside — including the URL after redirects, which is the one worth citing.",
  },
  {
    icon: Zap,
    title: "It cannot be pointed at your cluster",
    description:
      "The caller supplies the URL, which makes any crawler a request-forgery primitive. Loopback, link-local and multicast are refused — including the cloud metadata endpoint on 169.254.169.254 that hands out credentials.",
  },
  {
    icon: Search,
    title: "Every redirect is checked too",
    description:
      "Blocking the first address is not enough, because a public URL can redirect to a private one. The guard sits on the dialer, so a 302 toward metadata is refused at the hop that matters.",
  },
  {
    icon: Shield,
    title: "A tool an agent can call",
    description:
      "It answers on MCP as well as over HTTP, so a model can read a page mid-conversation without you building the plumbing for it.",
  },
];

const Features = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three steps, and a boundary
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fetch, extract, render. Then the part that matters when the URL comes from a stranger.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-neutral-500 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 bg-primary/5">
                <feature.icon className="h-6 w-6 text-foreground/70" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
