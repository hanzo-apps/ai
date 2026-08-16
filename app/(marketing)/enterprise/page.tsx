'use client'

import Link from "next/link";

import React from "react";
import { motion } from "@/components/motion";
import {
  Building2,
  Shield,
  Users,
  Zap,
  Globe,
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  HeadphonesIcon,
  Server,
  Lock,
  Sparkles
} from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const features = [
  {
    icon: Shield,
    title: "Security",
    description: "Secrets live in KMS, never in your code or your config. Data is encrypted at rest per organization, and every privileged action is logged."
  },
  {
    icon: Users,
    title: "User Management",
    description: "Sign in through your own identity provider over OIDC. SCIM provisioning, org-scoped roles, and one account across every Hanzo product."
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Multi-region deployment with automatic failover, and a support channel that reaches our engineers instead of a queue."
  },
  {
    icon: Zap,
    title: "Custom AI Resources",
    description: "Dedicated compute, your own fine-tuned models, and a credit balance sized to what you actually run."
  }
];

const benefits = [
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Priority support with dedicated account managers, guaranteed response times, and direct access to our engineering team.",
    gradient: "from-white/20 to-white/10",
    border: "border-white/30"
  },
  {
    icon: Server,
    title: "Custom Integrations",
    description: "We connect Hanzo to what you already run — your identity provider, your existing services, and the systems your teams work in every day.",
    gradient: "from-white/15 to-white/10",
    border: "border-white/30"
  },
  {
    icon: Lock,
    title: "Flexible Deployment",
    description: "Our cloud, your cloud, or your own hardware. It is the same open-source software either way, so moving between them is a deployment decision rather than a migration.",
    gradient: "from-white/15 to-white/10",
    border: "border-white/30"
  }
];

const stats = [
  { value: "Custom", label: "SLA" },
  { value: "< 1hr", label: "Response Time" },
  { value: "Global", label: "Deployment" },
  { value: "24/7", label: "Support" },
];

const Enterprise = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden">
          <Box className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <Box
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
              style={{
                background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
            <Box
              className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
              style={{
                background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                filter: "blur(80px)",
              }}
            />
          </Box>

          <Box className="max-w-5xl mx-auto relative z-10">
            <Box className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
              >
                <Building2 className="w-3.5 h-3.5" />
                Enterprise Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
              >
                <span className="text-foreground">Run it in our cloud.</span>
                <br />
                <span className="text-muted-foreground">Or run it in yours.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto"
              >
                Hanzo Cloud is open source, so an enterprise deployment isn&apos;t a different product —
                it&apos;s the same binaries, in your cluster or ours. Identity, secrets, audit logging and
                per-organization data isolation come with it. What you add is a contract: an SLA, a named
                team, and pricing that fits your volume.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-12"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Sales
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-sm text-foreground"
                >
                  View Pricing
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {stats.map((stat) => (
                  <Box
                    key={stat.label}
                    className="bg-secondary/50 border border-border rounded-xl p-4"
                  >
                    <Box className="text-2xl font-bold text-foreground">{stat.value}</Box>
                    <Box className="text-xs text-muted-foreground">{stat.label}</Box>
                  </Box>
                ))}
              </motion.div>
            </Box>
          </Box>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-background to-neutral-900/30">
          <Box className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Enterprise Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The parts of the platform that start mattering once other people depend on you.
              </p>
            </motion.div>

            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-white/30 transition-colors"
                  >
                    <Box
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
                    >
                      <Icon className="w-6 h-6" />
                    </Box>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </section>

        {/* Why Enterprise Section */}
        <section className="py-16 px-4 md:px-8">
          <Box className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">What else comes with it</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Support, integration, and where the software actually runs.
              </p>
            </motion.div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${benefit.gradient} rounded-xl p-8 border ${benefit.border}`}
                  >
                    <Box className="flex items-start gap-4">
                      <Box
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
                      >
                        <Icon className="w-6 h-6" />
                      </Box>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                        <p className="text-foreground/80">{benefit.description}</p>
                      </div>
                    </Box>
                  </motion.div>
                );
              })}
            </div>
          </Box>
        </section>

        {/* Compliance Section */}
        <section className="py-16 px-4 md:px-8 bg-secondary/30">
          <Box className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-8 h-8 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Security & Compliance</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                What a security review asks for, and where to get it.
              </p>

              <Box className="flex flex-wrap justify-center gap-3">
                {[
                  "Continual internal audits",
                  "Audit report on request",
                  "GDPR",
                  "CCPA",
                  "HIPAA BAA available",
                  "Enterprise SSO",
                ].map((badge) => (
                  <Box
                    key={badge}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border"
                  >
                    <CheckCircle className="w-4 h-4 text-foreground/70" />
                    <span className="text-sm font-medium text-foreground">{badge}</span>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-900/30 to-background relative overflow-hidden">
          <Box className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <Box className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <Box className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Talk to us about your deployment
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Tell us what you&apos;re running and where it has to run. We&apos;ll come back with a
              deployment plan, an SLA, and a price.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all hover:opacity-90 text-base bg-primary text-primary-foreground"

              >
                Schedule a demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="mailto:enterprise@hanzo.ai"
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-base text-foreground"
              >
                enterprise@hanzo.ai
              </a>
            </motion.div>
          </Box>
        </section>
      </main>

      
    </Box>
  );
};

export default Enterprise;
