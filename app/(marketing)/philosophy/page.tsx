import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ZenBackground from "@/components/zen/ZenBackground";
import HexagramExplorer from "@/components/zen/HexagramExplorer";
import { Box } from '@hanzo/ui'

export const metadata: Metadata = {
  title: "The Zen of Hanzo — 64 patterns for intelligent systems",
  description:
    "The I Ching read as a systems philosophy for artificial intelligence. Sixty-four patterns for building intelligence that stays open, understandable, adaptable and controlled by the people who use it.",
};

const TRADITIONS = [
  {
    name: "I Ching",
    lead: "Understand the condition.",
    body: "The 64 hexagrams form a language for recognizing recurring states of change. Before acting, understand what kind of situation the system is in. Creation requires a different response than obstruction. Abundance requires a different response than scarcity. Completion requires a different response than beginning.",
  },
  {
    name: "Zen",
    lead: "See without attachment.",
    body: "Approach every system with beginner's mind. Do not defend an abstraction simply because it already exists. Do not confuse complexity with sophistication. Observe reality directly, remove what is unnecessary and remain willing to begin again.",
  },
  {
    name: "Curry",
    lead: "Compose from primitives.",
    body: "Haskell Curry's combinatory logic demonstrates how expressive systems can emerge from a small foundation of composable operations. Build small components. Give each a precise meaning. Compose them without hidden coupling. Let finite primitives produce unbounded capability.",
  },
  {
    name: "Hickey",
    lead: "Untangle complexity.",
    body: "Rich Hickey distinguishes what is genuinely simple from what is merely easy to access. Convenience can conceal entanglement. Hanzo separates identity from state, policy from execution, data from process and capability from interface. Systems become understandable when independent concerns remain independent.",
  },
  {
    name: "Pike",
    lead: "Cover the space with fewer ideas.",
    body: "Rob Pike's engineering philosophy favors small sets of orthogonal features that interact predictably. The objective is not the smallest feature count. The objective is the smallest coherent basis capable of expressing the whole system.",
  },
];

const LAWS = [
  { lead: "See the system clearly", body: "Understand the current condition before prescribing action." },
  { lead: "Separate what changes independently", body: "Do not bind together concepts that evolve for different reasons." },
  { lead: "Compose capability from complete primitives", body: "Small components should combine without central coordination or hidden behavior." },
  { lead: "Preserve the user's authority", body: "The user should control their models, data, keys, infrastructure and economic participation." },
  { lead: "Design for the next transformation", body: "Every completed system is already approaching its next condition." },
];

const METHOD = [
  { step: "Observe", body: "Identify the actual condition of the system." },
  { step: "Separate", body: "Untangle concerns that change for different reasons." },
  { step: "Reduce", body: "Find the smallest complete set of concepts." },
  { step: "Compose", body: "Combine orthogonal primitives into greater capability." },
  { step: "Verify", body: "Measure behavior instead of trusting intention." },
  { step: "Adapt", body: "Respond to evidence without abandoning the foundation." },
  { step: "Distribute", body: "Place data, computation and authority where they belong." },
  { step: "Continue", body: "Treat every completion as the beginning of another cycle." },
];

const PRODUCTS = [
  { name: "Hanzo Models", href: "/models", body: "Open and adaptable intelligence across language, vision, audio, code, tools and physical systems." },
  { name: "Hanzo Cloud", href: "/cloud", body: "A unified control plane assembled from interoperable services rather than a closed, inseparable platform." },
  { name: "Hanzo Engine", href: "/engine", body: "Efficient execution built around measurable performance, hardware awareness and composable runtimes." },
  { name: "Hanzo Router", href: "/gateway", body: "Model choice treated as a changing systems problem—balancing capability, latency, cost, privacy and availability." },
  { name: "Hanzo Network", href: "/network", body: "Distributed intelligence designed to reduce centralized dependence and share value with those who contribute compute, models, code and knowledge." },
  { name: "Hanzo Open Source", href: "/open-source", body: "Infrastructure that can be inspected, operated, modified and carried forward by the people who depend upon it." },
];

const QUESTIONS = [
  "Is it understandable?",
  "Is it composable?",
  "Is it verifiable?",
  "Can it operate privately?",
  "Can the user leave?",
  "Can it survive failure?",
  "Can it evolve without being destroyed?",
  "Does it increase human agency?",
];

const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90";
const btnSecondary =
  "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary";

export default function PhilosophyPage() {
  return (
    <>
      <ZenBackground />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 md:px-8">
        <Box className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div
            className="absolute -top-40 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-[0.10]"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)", filter: "blur(120px)" }}
          />
        </Box>
        <Box className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The Zen of Hanzo
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">64 patterns for intelligent systems</p>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-left text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>
              The <span className="text-foreground">I Ching</span> is a map of change. Its 64 hexagrams describe
              recurring conditions: creation, resistance, conflict, growth, decay, transformation, completion and
              renewal.
            </p>
            <p>Hanzo interprets these patterns for the age of artificial intelligence.</p>
            <p className="text-foreground/90">
              Not as fortune-telling. Not as decoration. As a systems philosophy — a framework for building
              intelligence that remains open, understandable, adaptable and controlled by the people who use it.
            </p>
          </div>

          <Box className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#patterns" className={btnPrimary}>
              Explore the 64 patterns <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://cloud.hanzo.ai" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              Build with Hanzo
            </a>
          </Box>
        </Box>
      </section>

      {/* Intelligence is always changing */}
      <section className="px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">The premise</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Intelligence is always changing
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>No intelligent system remains fixed.</p>
            <p>
              Models learn. Data changes. Infrastructure fails. Organizations grow. Interfaces become dependencies.
              Successful architectures eventually meet conditions they were never designed to handle.
            </p>
            <p>
              The goal is not to prevent change. The goal is to build systems capable of changing without losing their
              integrity.
            </p>
            <p className="text-foreground">That is the Zen of Hanzo.</p>
          </div>
        </Box>
      </section>

      {/* Five traditions */}
      <section className="border-t border-border/60 px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-6xl">
          <Box className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">Five traditions</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ancient patterns, modern engineering
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Hanzo brings together five complementary traditions.
            </p>
          </Box>
          <Box className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TRADITIONS.map((t) => (
              <Box key={t.name} className="rounded-xl border border-border bg-secondary/20 p-6">
                <h3 className="text-base font-semibold text-foreground">{t.name}</h3>
                <p className="mt-1 text-sm font-medium text-foreground/70">{t.lead}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </Box>
            ))}
          </Box>
        </Box>
      </section>

      {/* Synthesis */}
      <section className="border-t border-border/60 px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-4xl">
          <Box className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">The synthesis</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Five operating laws
            </h2>
          </Box>
          <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-border">
            {LAWS.map((l, i) => (
              <li key={l.lead} className="flex gap-5 bg-secondary/20 p-6">
                <span className="font-mono text-sm text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{l.lead}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Box>
      </section>

      {/* The 64 patterns */}
      <section id="patterns" className="scroll-mt-20 border-t border-border/60 px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-7xl">
          <Box className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">The 64 patterns</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Every hexagram is active
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Each represents a condition that can appear in a model, an application, a company, a network or an entire
              technological ecosystem. The classical title names the condition. The Hanzo principle defines how we
              respond.
            </p>
          </Box>
          <Box className="mt-10">
            <HexagramExplorer />
          </Box>
        </Box>
      </section>

      {/* How we build */}
      <section className="border-t border-border/60 px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-6xl">
          <Box className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">The method</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">How we build</h2>
          </Box>
          <Box className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <Box key={m.step} className="rounded-xl border border-border bg-secondary/20 p-5">
                <span className="font-mono text-xs text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{m.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </Box>
            ))}
          </Box>
        </Box>
      </section>

      {/* Products */}
      <section className="border-t border-border/60 px-4 py-20 md:px-8">
        <Box className="mx-auto max-w-6xl">
          <Box className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground/50">Across the stack</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">One philosophy</h2>
          </Box>
          <Box className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.name}
                href={p.href}
                className="group rounded-xl border border-border bg-secondary/20 p-6 transition-colors hover:border-white/20 hover:bg-secondary/40"
              >
                <Box className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Box>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Link>
            ))}
          </Box>
        </Box>
      </section>

      {/* Closing */}
      <section className="border-t border-border/60 px-4 py-24 md:px-8">
        <Box className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Build systems that can change
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>
              The purpose of a philosophy is not to decorate a company. It is to make difficult decisions clearer.
            </p>
            <p>When we design a model, an API, an agent, a database or a network, we return to the same questions:</p>
          </div>

          <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {QUESTIONS.map((q) => (
              <li key={q} className="flex items-start gap-2 text-[15px] text-foreground/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {q}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            The Zen of Hanzo is not a promise that systems will remain still. It is a method for building systems that
            remain whole while everything changes.
          </p>

          <blockquote className="mt-10 border-l border-border pl-6">
            <p className="space-y-1 font-mono text-sm leading-7 text-foreground/80">
              <span className="block">From one line, two forces.</span>
              <span className="block">From two forces, eight patterns.</span>
              <span className="block">From eight patterns, sixty-four conditions.</span>
              <span className="block">From small primitives, unbounded intelligence.</span>
            </p>
          </blockquote>

          <Box className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className={btnPrimary}>
              Explore Hanzo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://papers.hanzo.ai" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              Read the research
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              View the source
            </a>
          </Box>
        </Box>
      </section>
    </>
  );
}
