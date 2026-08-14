'use client'

import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Code2, Eye, Zap, ExternalLink, Brain, Shield,
  Globe, Cpu, Layers, Clock, Github, Sparkles, Mic, FileCode,
} from "lucide-react";
import { allModels } from "@zenlm/models";

import { ProductFooter } from "@/components/products/ProductFooter"
const PRICING_API = 'https://api.hanzo.ai/v1/pricing'

interface ModelStats {
  total: number
  maxContext: string
  cheapest: string
  families: { name: string; count: number; icon: any; description: string }[]
}

function useModelStats(): ModelStats {
  const [stats, setStats] = useState<ModelStats>({
    total: 0, maxContext: '—', cheapest: '—', families: [],
  })
  useEffect(() => {
    fetch(PRICING_API)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => {
        const zen = data.hanzoModels || []
        const cheapest = zen.reduce((min: number, m: any) => {
          const p = m.pricing?.input ?? Infinity
          return p < min ? p : min
        }, Infinity)
        const maxCtx = zen.reduce((max: number, m: any) => Math.max(max, m.context || 0), 0)
        const maxCtxStr = maxCtx >= 1_000_000 ? `${Math.round(maxCtx / 1_000_000)}M` : `${Math.round(maxCtx / 1000)}K`
        const iconMap: Record<string, any> = { Sparkles: Brain, Code: Code2, Eye: Eye, Shield: Shield, Search: Brain, Image: Eye, Mic: Brain, Brain, Rocket: Zap, Network: Cpu }
        const families = (data.families || [])
          .filter((f: any) => f.models?.length > 0)
          .map((f: any) => ({
            name: f.name,
            count: f.models.filter((id: string) => zen.some((m: any) => m.name === id)).length,
            icon: iconMap[f.icon] || Brain,
            description: f.description,
          }))
          .filter((f: any) => f.count > 0)
        setStats({ total: zen.length, maxContext: maxCtxStr, cheapest: cheapest < Infinity ? `$${cheapest >= 1 ? cheapest.toFixed(2) : cheapest.toFixed(cheapest >= 0.01 ? 2 : 3)}` : '—', families })
      })
      .catch(() => {})
  }, [])
  return stats
}

// Display model shape for this page — derived from @zenlm/models at import time
interface ZenModel {
  id: string
  label: string
  params: string
  active?: string
  ctx?: string
  tier: "edge" | "pro" | "max" | "ultra" | "vision" | "multimodal"
  tag?: string
  /** Served via the API only — no public weights, so nothing to link on HF. */
  cloudOnly: boolean
  hf?: string
}

function fmtCtx(context: number): string {
  if (!context) return ''
  if (context >= 1_000_000) return `${Math.round(context / 1_000_000)}M`
  if (context >= 1000) return `${Math.round(context / 1000)}K`
  return String(context)
}

function mapTier(tier: string, modalities: string[]): ZenModel['tier'] {
  if (modalities.includes('vision') && !modalities.includes('text')) return 'vision'
  if (modalities.includes('vision') && modalities.includes('audio')) return 'multimodal'
  if (tier === 'ultra max' || tier === 'ultra') return 'ultra'
  if (tier === 'pro max') return 'max'
  return 'pro'
}

// Derived from @zenlm/models — single source of truth
const ZEN_MODELS: ZenModel[] = allModels.map(m => ({
  id: m.id,
  label: m.id,
  params: m.spec.params || 'TBA',
  active: m.spec.activeParams ?? undefined,
  ctx: fmtCtx(m.spec.context),
  tier: mapTier(m.tier, m.modalities),
  tag: m.features[0]?.toLowerCase().slice(0, 20) ?? undefined,
  // `cloud-only` is @zenlm/models' word for "served via the API, no public
  // weights", and it is exactly the set whose `huggingface` is null. This card
  // used to test `coming-soon`/`contact-sales`, which the status union does not
  // contain, so the branch was dead in both directions: no badge ever rendered
  // and all 8 weightless models linked to a fabricated huggingface.co/zenlm/<id>
  // that 404s. The link now only exists when there is something to link to.
  cloudOnly: m.status === 'cloud-only',
  hf: m.huggingface?.replace('https://huggingface.co/', ''),
}))

// Monochrome tier badges — opacity carries the rank, not hue.
const TIER_STYLE: Record<string, string> = {
  edge:       "bg-white/5 text-white/70 border-white/10",
  pro:        "bg-white/10 text-white/85 border-white/15",
  max:        "bg-white/15 text-white/90 border-white/20",
  ultra:      "bg-white/20 text-white border-white/30",
  vision:     "bg-white/10 text-white/85 border-white/15",
  multimodal: "bg-white/12 text-white/85 border-white/15",
}
const TIER_LABEL: Record<string, string> = {
  edge: "Edge", pro: "Pro", max: "Max", ultra: "Ultra", vision: "Vision", multimodal: "Multimodal",
}

const BENEFITS = [
  { icon: Clock,  title: "Same request shape",  description: "Change the model name in a call you already wrote. Nothing else about the request changes." },
  { icon: Globe,  title: "Weights you can take", description: "Most Zen models are published on HuggingFace, so you can serve them yourself. A few are API-only; the catalog above marks which." },
  { icon: Layers, title: "0.6B to frontier",    description: "Small enough to run on a laptop, or large enough to reason. Text, code, vision, audio, image and video, one API." },
  { icon: Cpu,    title: "Sparse where it counts", description: "The Mixture-of-Diverse-Experts models hold a large parameter count but activate a small slice of it per token, so capacity is not what you pay for." },
]

const Zen = () => {
  const stats = useModelStats()
  const QUICK_STATS = [
    { label: "Models",      value: stats.total > 0 ? `${stats.total}+` : `${ZEN_MODELS.length}+` },
    { label: "Max Params",  value: "1.04T" },
    { label: "Max Context", value: stats.maxContext !== '—' ? stats.maxContext : "2M" },
    { label: "From",        value: stats.cheapest },
  ]

  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
      <main>
        {/* Hero */}
        <section className="relative pt-24 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`, filter: "blur(100px)" }} />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground border border-border">
                    <Zap className="w-3 h-3" />
                    {ZEN_MODELS.length}+ Zen Models
                  </span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
                  <span className="text-foreground">Zen Models</span><br />
                  <span className="text-muted-foreground">Language · Code · Vision · Audio</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  {ZEN_MODELS.length}+ open-weight models from 0.6B to 1T+, built by{' '}
                  <a href="https://zoo.industries" target="_blank" rel="noopener noreferrer"
                    className="underline hover:no-underline text-foreground">Zoo Labs Foundation</a>{' '}
                  and served on the Hanzo API. Zen MoDE (Mixture of Diverse Experts) architecture.
                  {stats.cheapest !== '—' ? ` From ${stats.cheapest}/MTok.` : ''} All models on HuggingFace.

                </motion.p>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
                  className="flex flex-wrap items-center gap-4 mb-8">
                  <Link href="/zen/models" className="inline-flex items-center px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all text-sm">
                    Explore All Models <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="/pricing" className="inline-flex items-center px-6 py-3 rounded-full font-medium border border-border bg-transparent hover:bg-secondary text-sm text-foreground transition-colors">
                    View Pricing
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex flex-wrap gap-3">
                  <a href="https://console.hanzo.ai" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all">
                    <Globe className="w-4 h-4" /> Get API Key
                  </a>
                  <a href="https://huggingface.co/zenlm" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all">
                    <Sparkles className="w-4 h-4" /> HuggingFace
                  </a>
                  <a href="https://github.com/zenlm/zen" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </motion.div>
              </div>

              {/* Stats panel */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                <div className="rounded-xl border border-border bg-secondary/95 backdrop-blur-sm overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-primary/10" />
                      <div className="w-3 h-3 rounded-full bg-primary/10" />
                      <div className="w-3 h-3 rounded-full bg-primary/10" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">zen-models</span>
                  </div>
                  <div className="p-6 bg-background">
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {QUICK_STATS.map((stat) => (
                        <div key={stat.label} className="p-3 bg-secondary/50 rounded-lg border border-border text-center">
                          <div className="text-xl font-bold text-foreground mb-0.5">{stat.value}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { icon: Brain,    label: "Language, code, vision, audio, video" },
                        { icon: Code2,    label: "Zen MoDE — Mixture of Diverse Experts" },
                        { icon: Shield,   label: "One endpoint, one key" },
                        { icon: Github,   label: "Weights published for most of them" },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-foreground/70 flex-shrink-0" />
                          <span className="text-foreground/80">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Model Catalog */}
        <section className="py-16 px-4 md:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Full Model Catalog</h2>
                  <p className="text-muted-foreground text-sm">{ZEN_MODELS.length}+ models · Available via API and HuggingFace</p>
                </div>
                <a href="https://huggingface.co/zenlm" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-border text-muted-foreground hover:text-foreground transition-colors">
                  <Sparkles className="w-3.5 h-3.5" /> Browse on HuggingFace <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Tier legend */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(TIER_LABEL).map(([k, v]) => (
                <span key={k} className={`text-xs px-2 py-1 rounded-full border font-medium ${TIER_STYLE[k]}`}>{v}</span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ZEN_MODELS.map((m, i) => {
                const { cloudOnly } = m;
                return (
                <motion.a
                  key={m.id}
                  href={cloudOnly ? "/zen/models" : `https://huggingface.co/${m.hf}`}
                  target={cloudOnly ? undefined : "_blank"}
                  rel={cloudOnly ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: (i % 6) * 0.04 }}
                  className="group p-4 rounded-xl border border-border/40 bg-secondary/20 hover:bg-secondary/50 hover:border-border transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-sm font-semibold text-foreground">{m.label}</span>
                    {cloudOnly ? (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium flex-shrink-0">Cloud API</span>
                    ) : (
                      <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-muted-foreground flex-shrink-0 transition-colors mt-0.5" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${TIER_STYLE[m.tier]}`}>
                      {TIER_LABEL[m.tier]}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{m.params}</span>
                    {m.active && <span className="text-[10px] text-muted-foreground/60">{m.active} active</span>}
                    {m.ctx && <span className="text-[10px] text-muted-foreground/60">{m.ctx} ctx</span>}
                    {m.tag && <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground">{m.tag}</span>}
                  </div>
                </motion.a>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/zen/models" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all">
                View Full Specs & Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://github.com/zenlm/zen" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors">
                <Github className="w-4 h-4" /> Open Source on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Model Families (dynamic from API) */}
        {stats.families.length > 0 && (
          <section className="py-16 px-4 md:px-8 bg-background/50">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stats.total || ZEN_MODELS.length}+ Models Across {stats.families.length} Families
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.families.slice(0, 8).map((family, idx) => {
                  const Icon = family.icon;
                  return (
                    <motion.div key={family.name}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                      className="p-5 bg-background border border-border rounded-xl text-center hover:border-white/20 transition-all hover:-translate-y-0.5">
                      <div className="mx-auto w-11 h-11 mb-3 flex items-center justify-center rounded-xl bg-primary/10 border border-border">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1">{family.name}</h3>
                      <p className="text-sm text-foreground/70 mb-1">{family.count} {family.count === 1 ? 'model' : 'models'}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{family.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Why Zen */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">What you get by using ours</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {BENEFITS.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <motion.div key={b.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                    className="p-5 bg-background border border-border rounded-xl text-center hover:border-white/20 transition-all">
                    <div className="mx-auto w-11 h-11 mb-3 flex items-center justify-center rounded-xl bg-primary/10 border border-border">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">{b.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Modalities showcase */}
        <section className="py-16 px-4 md:px-8 bg-background/30 border-y border-border/30">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Pick by what you are doing</h2>
              <p className="text-muted-foreground">Different models, one endpoint. The name in the request is the only thing that changes</p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Brain,    label: "Language",    desc: "Chat, reasoning, retrieval", models: ["zen5","zen5-pro","zen5-max"] },
                { icon: FileCode, label: "Code",        desc: "A million tokens of it",     models: ["zen5-coder","zen5-mini","zen-sql"] },
                { icon: Eye,      label: "Vision",      desc: "Read a screen, draw a thing", models: ["zen3-vl","zen3-omni","zen3-image"] },
                { icon: Mic,      label: "Audio",       desc: "Listen, speak, compose",     models: ["zen3-asr","zen3-tts","zen-music"] },
              ].map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <motion.div key={mod.label}
                    initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/40 transition-all">
                    <Icon className="w-6 h-6 text-foreground mb-3" />
                    <h3 className="font-semibold text-foreground text-sm mb-1">{mod.label}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{mod.desc}</p>
                    <div className="space-y-1">
                      {mod.models.map(m => (
                        <div key={m} className="text-[10px] font-mono text-muted-foreground/60 truncate">{m}</div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Zen5 Teaser */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative p-8 md:p-12 rounded-2xl border border-border bg-background/80 overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground">
                In Training
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-foreground" />
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Next Generation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Zen 5 Ultra</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                A 2T-parameter MoDE, training now inside NVIDIA TEE
                confidential compute on{" "}
                <a href="https://hanzo.network" target="_blank" rel="noopener noreferrer"
                  className="underline hover:no-underline text-foreground">hanzo.network</a>.
                The point of doing it that way is that the run attests to
                itself: what data went in and what came out is checkable
                afterwards rather than taken on our word.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { v: "2T+", l: "Parameters" },
                  { v: "MoDE", l: "Mixture of Diverse Experts" },
                  { v: "TEE", l: "On-Chain Verifiable Training" },
                ].map(s => (
                  <div key={s.l} className="p-4 rounded-lg bg-primary/5 border border-border/40">
                    <div className="text-2xl font-bold text-foreground mb-1">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/research-access"
                  className="inline-flex items-center px-5 py-2.5 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 text-sm gap-2">
                  Zen 5 Research Preview <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://hanzo.network" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 rounded-full font-medium border border-border text-foreground hover:bg-secondary text-sm gap-2 transition-colors">
                  <Globe className="w-4 h-4" /> On-Chain Training
                </a>
                <Link href="/zen/models"
                  className="inline-flex items-center px-5 py-2.5 rounded-full font-medium border border-border text-foreground hover:bg-secondary text-sm gap-2 transition-colors">
                  Current Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Started */}
        <section className="py-16 px-4 md:px-8 border-t border-border/30">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Get Started</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { href: "/zen/models", icon: Brain,   title: "The catalog",  desc: "Every model, with its parameters, context window and what it is for", internal: true },
                { href: "/pricing",   icon: Layers,  title: "What it costs", desc: "Price per million tokens, per model, with nothing rounded in our favour", internal: true },
                { href: "https://console.hanzo.ai", icon: Globe, title: "A key", desc: "Sign in, take a key, send the first request", internal: false },
              ].map((card, i) => {
                const Icon = card.icon;
                const inner = (
                  <div className="p-6 bg-background border border-border rounded-xl text-center hover:border-white/20 transition-all hover:-translate-y-0.5 h-full">
                    <Icon className="w-7 h-7 mx-auto mb-3 text-foreground" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-muted-foreground text-sm">{card.desc}</p>
                  </div>
                );
                return card.internal ? (
                  <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link href={card.href} className="block">{inner}</Link>
                  </motion.div>
                ) : (
                  <motion.a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="block">{inner}</motion.a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Philosophy Bridge */}
        <section className="py-16 px-4 md:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-4xl tracking-widest text-foreground/20 mb-6 select-none">
                ䷀ ䷸ ䷹ ䷺ ䷻ ䷼ ䷽ ䷾ ䷿ ䷡
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Why they are named this way</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm">
                {/* EIGHT, and "among them" is doing real work in that sentence.
                    It read "ten" and then named five, so the paragraph argued
                    with itself and a reader who counts stopped believing it.

                    Eight is corroborated twice, independently: the curation
                    manifest (hanzoai/openapi capabilities.yaml) declares eight
                    DOMAINS, and the docs are grouped by the "eight movements".
                    It is NOT the five on /philosophy — those are operating laws,
                    how we work, a different list that happens to sit nearby.
                    Conflating the two is how this line got corrected to five
                    before it got corrected to eight.

                    The five qualities are a SAMPLE and now say so. A count and
                    a list that disagree is the defect; naming a subset openly
                    is not. Ten is the CATEGORY count (lib/data/cloud-primitives,
                    the mega-menu's ten) — a real number about a different
                    thing, which is the likeliest reason it wandered in here. */}
                These models are built on eight engineering principles drawn from the 64 hexagrams of the I-Ching —
                orthogonality, smallness, completeness, clarity and composability among them.
                Ancient pattern language for systems that last.

              </p>
              <Link
                href="/philosophy"
                className="inline-flex items-center px-6 py-3 rounded-full font-medium border border-border bg-transparent hover:bg-secondary text-sm text-foreground transition-colors gap-2"
              >
                易經 · Explore the Full Philosophy <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 md:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-3">Call one and see</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Start with zen5-mini because it is fast and cheap, and move up
                only where a harder question needs it.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/zen/models"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium bg-primary text-primary-foreground hover:opacity-90 text-sm gap-2 transition-all">
                  Explore All Models <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/dev"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium border border-border bg-transparent hover:bg-secondary text-sm text-foreground transition-colors">
                  Try Hanzo Dev
                </Link>
                <a href="https://console.hanzo.ai" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full font-medium border border-border bg-transparent hover:bg-secondary text-sm text-foreground transition-colors">
                  <Globe className="mr-2 h-4 w-4" /> Get API Key
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Read the specs, or read the code</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/docs/services/models" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
              <ProductFooter slug="zen" name="Zen Models" />
</main>
    </div>
  );
};

export default Zen;
