'use client'

import Link from "next/link";

import React from "react";
import { motion } from "@/components/motion";
import {
  Shield,
  Lock,
  CheckCircle,
  Server,
  Eye,
  Key,
  FileCheck,
  Globe,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Fingerprint,
  Database,
  Network,
  Clock,
  Users,
  FileText,
  Bug
} from "lucide-react";
import { Box } from '@hanzo/ui'

/*
 * There was a badge row here: four names — SOC 2 Type II, GDPR, CCPA, HIPAA —
 * each rendered with a green checkmark. The qualifiers that made them honest
 * ("assessment planned", "BAA available") were carried in a `description` field
 * the markup never rendered, so what shipped was four certifications with a tick
 * beside them and nothing anywhere saying we hold none of them.
 *
 * The certification question now has exactly one answer, at /trust: continual
 * internal audits, the report on request, and a scoping conversation for a
 * reviewer who runs on a named framework. This page describes mechanisms; that
 * one holds the position. Two pages answering it is how the qualifier got lost
 * the first time.
 */

const SECURITY_FEATURES = [
  {
    icon: Lock,
    title: "Encryption at Rest and in Transit",
    description:
      "At rest, every tenant's data sits under a key derived for that tenant alone and sealed with AES-256-GCM, and backups are encrypted with age, which carries a post-quantum option. In transit it is TLS 1.3, and the edge offers hybrid ML-KEM-768 key exchange, so traffic captured today is not readable by a quantum computer later.",
  },
  {
    icon: Fingerprint,
    title: "Second Factors",
    description:
      "An authenticator app, a code by SMS or email, or a passkey. Enrolment hands out the material and demands it back before it writes anything, and adding or dropping a factor signs the account out of every other browser — a stolen session that outlives the change is the same as not having the factor.",
  },
  {
    icon: Key,
    title: "Keys and Tokens",
    description:
      "A key is told apart from a token by its prefix, so nothing has to guess what it was handed. Tokens are refused outright if they carry an HMAC signature or no algorithm at all, and a refresh token is single-use — presenting a spent one revokes its whole family rather than the one token.",
  },
  {
    icon: Users,
    title: "Who May Reach What",
    description:
      "Access is a grant at a place: an organization, a workspace under it, a project under that. A check asks whether some grant the caller holds covers the path and admits the verb. One rule, no special cases, and the decision is a function call rather than a service that can be down.",
  },
  {
    icon: Network,
    title: "The Edge Throws Identity Away",
    description:
      "Anything that arrives claiming to be an org, a user or an email is deleted at the gateway before a single handler reads it. Identity is written back only from a verified token. Inside the cluster, services reach each other over a binary protocol rather than the public internet.",
  },
  {
    icon: Database,
    title: "Where It Sits",
    description:
      "An organization is a tenancy boundary, and on Hanzo Base it is a physical one — a different organization is a different database file, opened under a different key, so no query can reach across two. Dedicated and self-hosted deployments pin that file to a region you choose.",
  },
];

const ENTERPRISE_FEATURES = [
  "Single sign-on through Hanzo IAM",
  "Federation to your own OpenID Connect issuer",
  "SCIM 2.0 provisioning from your directory",
  "A named engineer who knows your deployment",
  "Priority incident response",
  "Retention set by you, not by us",
  "Audit records exported where you want them",
  "Security questionnaire support",
];

const EDGE_FEATURES = [
  { name: "Run it where you like", description: "Our cloud, your cluster, your rack" },
  { name: "Scales to nothing", description: "Idle should cost what idle is worth" },
  { name: "Your region", description: "Pin the data and keep it there" },
];

const Security = () => {
  return (
    <Box className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      
      

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-4 md:px-8 lg:px-12 overflow-hidden">
          {/* Background gradient */}
          <Box className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <Box
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
              style={{
                background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                filter: "blur(100px)",
              }}
            />
          </Box>

          <Box className="max-w-5xl mx-auto relative z-10">
            <Box className="text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
              >
                <Shield className="w-3.5 h-3.5" />
                We hold no certification — see what we do claim
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
              >
                <span className="text-foreground">What protects your data,</span>
                <br />
                <span className="text-muted-foreground">and how.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto"
              >
                Security copy usually describes a feeling. This page describes mechanisms: which key encrypts
                what, who holds it, where the tenancy boundary is enforced, and which claims we have not earned
                yet. If something here is vague, assume we could not verify it and ask us.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex flex-wrap items-center justify-center gap-4 mb-12"
              >
                <Link
                  href="/contact"
                  className="hz-tap inline-flex items-center px-6 py-3 rounded-full font-medium transition-all hover:opacity-90 text-sm bg-primary text-primary-foreground"

                >
                  Talk to Security Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href="https://docs.hanzo.ai/docs/zero-trust"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hz-tap inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-sm text-foreground"
                >
                  Security Documentation
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-sm text-muted-foreground"
              >
                Continual internal audits, with the report on request.{" "}
                <Link href="/trust" className="text-foreground underline underline-offset-4">
                  The controls, and how to check them
                </Link>
                .
              </motion.p>
            </Box>
          </Box>
        </section>

        {/* Security Features Grid */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-neutral-900/50">
          <Box className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Controls, Named
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each of these is a decision in code you can point at, not a posture.
              </p>
            </motion.div>

            <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SECURITY_FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/80 border border-border rounded-xl p-6 hover:border-border transition-colors"
                  >
                    <Box
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                      <Icon className="w-6 h-6" />
                    </Box>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </Box>
          </Box>
        </section>

        {/* Infrastructure Security */}
        <section className="py-24 px-4 md:px-8">
          <Box className="max-w-6xl mx-auto">
            <Box className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
                >
                  Infrastructure
                </Box>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  What runs underneath
                </h2>
                <p className="text-muted-foreground mb-8">
                  Workloads sit in hardware-virtualised machines on managed Kubernetes, in data centres with
                  physical access control and redundant power. Secrets never reach a manifest — they are fetched
                  from Hanzo KMS at boot, and outside development a service refuses to start without a verified
                  issuer, audience and key set rather than falling back to running open.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Server, text: "Hardware-virtualised machines, one tenant to a boundary" },
                    { icon: Eye, text: "Errors, traces and release health watched around the clock" },
                    { icon: Clock, text: "Replicated, with failover that does not need a person" },
                    { icon: FileCheck, text: "Every image pinned to a version, every deploy reconciled" },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Box key={index} className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground/80">{item.text}</span>
                      </Box>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-900/50 rounded-xl p-8 border border-border"
              >
                <Globe className="w-10 h-10 text-muted-foreground mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Or none of our infrastructure at all</h3>
                <p className="text-muted-foreground mb-6">
                  Every piece named on this page is a binary you can run yourself. The strongest answer to a
                  question about our infrastructure is that you do not have to use it.
                </p>

                <div className="space-y-4">
                  {EDGE_FEATURES.map((feature) => (
                    <Box
                      key={feature.name}
                      className="bg-neutral-800/50 rounded-lg p-4 border border-border"
                    >
                      <Box className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{feature.name}</span>
                      </Box>
                      <span className="text-sm text-muted-foreground">{feature.description}</span>
                    </Box>
                  ))}
                </div>
              </motion.div>
            </Box>
          </Box>
        </section>

        {/* Enterprise Security */}
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-900/50 to-background">
          <Box className="max-w-6xl mx-auto">
            <Box className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <Box className="bg-gradient-to-br from-white/10 to-transparent rounded-xl p-8 border border-border">
                  <Shield className="w-10 h-10 mb-6" />
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    What comes with Enterprise
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    An engineer who has read your deployment, retention you set rather than inherit, and
                    somebody to answer the questionnaire your procurement team is about to send.
                  </p>

                  <Box className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ENTERPRISE_FEATURES.map((feature) => (
                      <Box key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-foreground/70 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </Box>
                    ))}
                  </Box>

                  <Link
                    href="/contact"
                    className="hz-tap inline-flex items-center mt-8 text-sm font-medium transition-colors"

                  >
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-1 lg:order-2"
              >
                <Box
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", color: "var(--primary)" }}
                >
                  Enterprise
                </Box>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  If you are the one who has to sign off
                </h2>
                <p className="text-muted-foreground mb-6">
                  Bring the control you are required to demonstrate and we will show you the code that
                  implements it, or tell you plainly that it does not exist yet. A control we cannot point at is
                  one you should not put your name to.
                </p>
                <p className="text-muted-foreground">
                  Where a requirement is not met, the honest options are usually self-hosting, a dedicated
                  deployment, or waiting. Our engineers will say which one applies rather than selling you the
                  gap.
                </p>
              </motion.div>
            </Box>
          </Box>
        </section>

        {/* Vulnerability Disclosure */}
        <section className="py-24 px-4 md:px-8">
          <Box className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/20 to-transparent rounded-xl p-8 border border-border"
            >
              <Box className="flex items-start gap-4">
                <Box className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bug className="w-6 h-6 text-foreground/60" />
                </Box>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Found something
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Email us rather than opening a public issue, and include a reproduction if you have one. A
                    real report from a stranger is worth more than an internal review, and we answer quickly.
                  </p>
                  <a
                    href="mailto:security@hanzo.ai"
                    className="hz-tap inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground/60 transition-colors"
                  >
                    security@hanzo.ai
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
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
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            >
              Ask us the hard question
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Bring the requirement you cannot get past, and we will show you the code or tell you it is not
              built. Both answers are more useful than a brochure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/signup"
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-all hover:opacity-90 text-base bg-primary text-primary-foreground"

              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-full font-medium transition-colors border border-border bg-transparent hover:bg-secondary text-base text-foreground"
              >
                Schedule Security Review
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <a
                href="https://docs.hanzo.ai/docs/zero-trust"
                target="_blank"
                rel="noreferrer noopener"
                className="hz-tap inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Read the security documentation
              </a>
            </motion.div>
          </Box>
        </section>
      </main>

      
    </Box>
  );
};

export default Security;
