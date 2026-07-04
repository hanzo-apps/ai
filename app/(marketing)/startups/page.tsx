'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Rocket,
  ArrowRight,
  CheckCircle2,
  Coins,
  Cpu,
  Gift,
  Building2,
  Globe,
  User,
  Mail,
  Briefcase,
  Users,
  Banknote,
  Boxes,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Canonical cloud intake endpoint (public startup-program application).
const APPLY_ENDPOINT =
  (process.env.NEXT_PUBLIC_HANZO_API_URL || 'https://api.hanzo.ai') +
  '/v1/crm/applications'

const STAGES = [
  { id: 'idea', label: 'Idea' },
  { id: 'pre-seed', label: 'Pre-seed' },
  { id: 'seed', label: 'Seed' },
  { id: 'series-a', label: 'Series A' },
  { id: 'series-b-plus', label: 'Series B+' },
]

// Tier-1 funds recognized for the credits program. Free-text field captures any others.
const TIER1_FUNDS = [
  'Andreessen Horowitz (a16z)',
  'Sequoia',
  'Benchmark',
  'Greylock',
  'Accel',
  'Founders Fund',
  'Lightspeed',
  'Index Ventures',
  'Bessemer',
  'Khosla Ventures',
  'GV (Google Ventures)',
  'Techstars',
]

const USE_CASES = [
  { id: 'ai', label: 'AI & inference', description: 'Models, agents, RAG, the LLM gateway' },
  { id: 'deploy', label: 'Deploy', description: 'Apps, functions, edge, machines' },
  { id: 'data', label: 'Data', description: 'Vector, SQL, KV, object storage' },
  { id: 'compute', label: 'Compute', description: 'GPUs, training, batch jobs' },
]

const HEARD_OPTIONS = [
  'Search',
  'X / Twitter',
  'LinkedIn',
  'A friend or colleague',
  'A Techstars connection',
  'An investor',
  'An event or conference',
  'Hanzo docs or GitHub',
  'Other',
]

interface FormData {
  company: string
  website: string
  contactName: string
  email: string
  role: string
  stage: string
  investors: string
  tier1Investors: string[]
  amountRaised: string
  teamSize: string
  building: string
  useCases: string[]
  infraSpend: string
  byoCompute: boolean
  byoHardware: string
  techstarsBatch: string
  heardVia: string
  // Honeypot: must stay empty. Real users never see or fill this.
  hp: string
}

const INITIAL_FORM: FormData = {
  company: '',
  website: '',
  contactName: '',
  email: '',
  role: '',
  stage: '',
  investors: '',
  tier1Investors: [],
  amountRaised: '',
  teamSize: '',
  building: '',
  useCases: [],
  infraSpend: '',
  byoCompute: false,
  byoHardware: '',
  techstarsBatch: '',
  heardVia: '',
  hp: '',
}

export default function StartupsPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleInArray = (key: 'tier1Investors' | 'useCases', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  const validate = (): string | null => {
    if (!formData.company.trim()) return 'Company name is required.'
    if (!formData.contactName.trim()) return 'Your name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'A valid email is required.'
    if (!formData.stage) return 'Please select your company stage.'
    if (!formData.building.trim()) return 'Tell us what you are building.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch(APPLY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
      })
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`)
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white transition-all'
  const labelClass =
    'flex items-center gap-2 text-sm font-medium text-foreground mb-2'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-10 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground border border-border">
                <Rocket className="w-3 h-3" />
                Techstars &rsquo;17 &mdash; built for founders
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-5"
            >
              The Hanzo Startup Program
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            >
              Build frontier AI on the same infrastructure we run in production.
              Everyone starts free. Venture-backed teams get up to $150,000 in
              credits. Bring your own compute and we meter the platform, not your
              iron.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
                <Link href="#apply">
                  Apply for credits
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                <a href="https://console.hanzo.ai">Start free &mdash; $5 credit</a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Pillars */}
        <section className="pb-8 px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-secondary/20 p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Coins className="w-5 h-5 text-foreground/80" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Everyone starts free</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                $5 in credit the moment you sign up. No card required. Pay as you
                go only when you outgrow it.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/20 p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-foreground/80" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bring your own compute</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect your own GPUs and machines. Run cheap on hardware you
                already have &mdash; we meter the platform, not your iron.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-secondary/20 p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Gift className="w-5 h-5 text-foreground/80" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Up to $150,000 in credits</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For venture-backed startups. Application required, and tier-1 VC
                backing is required for the credits program.
              </p>
            </div>
          </div>

          {/* Techstars note */}
          <div className="max-w-5xl mx-auto mt-4">
            <div className="rounded-xl border border-border bg-primary/5 p-5 flex items-start gap-3">
              <Rocket className="w-4 h-4 mt-0.5 text-foreground/70 flex-shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Techstars founders:</span>{' '}
                Hanzo is a Techstars company. We offer perks tailored to each
                portfolio brand &mdash; mention your batch when you apply and we
                will match it.
              </p>
            </div>
          </div>
        </section>

        {/* Application form */}
        <section id="apply" className="py-14 px-4 md:px-8 lg:px-12 scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Apply to the program
              </h2>
              <p className="text-muted-foreground">
                We review applications weekly. The more you share, the faster we
                can match you to the right tier.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="p-10 rounded-xl border border-border bg-primary/5 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-foreground/70" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  Application received
                </h2>
                <p className="text-muted-foreground mb-2">
                  Thanks &mdash; we review applications weekly and will be in touch
                  by email.
                </p>
                <p className="text-muted-foreground text-sm mb-8">
                  Want to start building today? Everyone gets $5 in free credit,
                  no card required.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
                    <a href="https://console.hanzo.ai">
                      Start free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary"
                  >
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                {/* Company + website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className={labelClass}>
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="Acme AI"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className={labelClass}>
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://acme.ai"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Contact name + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactName" className={labelClass}>
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      Your name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      Work email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@acme.ai"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Role + stage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className={labelClass}>
                      <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
                      Your role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Co-founder & CEO"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="stage" className={labelClass}>
                      <Rocket className="w-3.5 h-3.5 text-muted-foreground" />
                      Company stage
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select stage
                      </option>
                      {STAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Investors free text */}
                <div>
                  <label htmlFor="investors" className={labelClass}>
                    <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                    Who are your investors?{' '}
                    <span className="text-muted-foreground font-normal">(funds, angels)</span>
                  </label>
                  <input
                    type="text"
                    id="investors"
                    name="investors"
                    value={formData.investors}
                    onChange={handleChange}
                    placeholder="e.g. Sequoia, plus a few angels"
                    className={inputClass}
                  />
                </div>

                {/* Tier-1 checkboxes */}
                <div>
                  <label className={labelClass}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
                    Backed by any of these?{' '}
                    <span className="text-muted-foreground font-normal">
                      (tier-1 backing unlocks the credits program)
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIER1_FUNDS.map((fund) => {
                      const selected = formData.tier1Investors.includes(fund)
                      return (
                        <button
                          key={fund}
                          type="button"
                          onClick={() => toggleInArray('tier1Investors', fund)}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all ${
                            selected
                              ? 'border-white/40 bg-primary/10'
                              : 'border-border bg-secondary/30 hover:bg-secondary/60'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                              selected ? 'bg-foreground border-foreground' : 'border-muted-foreground/40'
                            }`}
                          >
                            {selected && (
                              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span className="text-sm text-foreground">{fund}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Raised + team size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amountRaised" className={labelClass}>
                      <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                      Amount raised{' '}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="amountRaised"
                      name="amountRaised"
                      value={formData.amountRaised}
                      onChange={handleChange}
                      placeholder="$2M"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="teamSize" className={labelClass}>
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      Team size
                    </label>
                    <input
                      type="text"
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      placeholder="5"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Building */}
                <div>
                  <label htmlFor="building" className={labelClass}>
                    <Boxes className="w-3.5 h-3.5 text-muted-foreground" />
                    What are you building?
                  </label>
                  <textarea
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your product, who it is for, and where you are today..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Use cases */}
                <div>
                  <label className={labelClass}>
                    <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                    How will you use Hanzo?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {USE_CASES.map((uc) => {
                      const selected = formData.useCases.includes(uc.id)
                      return (
                        <button
                          key={uc.id}
                          type="button"
                          onClick={() => toggleInArray('useCases', uc.id)}
                          className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                            selected
                              ? 'border-white/40 bg-primary/10'
                              : 'border-border bg-secondary/30 hover:bg-secondary/60'
                          }`}
                        >
                          <span
                            className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                              selected ? 'bg-foreground border-foreground' : 'border-muted-foreground/40'
                            }`}
                          >
                            {selected && (
                              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span>
                            <span className="text-sm font-medium text-foreground">{uc.label}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{uc.description}</p>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Infra spend */}
                <div>
                  <label htmlFor="infraSpend" className={labelClass}>
                    <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                    Current infra / compute spend per month{' '}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="infraSpend"
                    name="infraSpend"
                    value={formData.infraSpend}
                    onChange={handleChange}
                    placeholder="$3,000 / mo"
                    className={inputClass}
                  />
                </div>

                {/* BYO compute */}
                <div className="rounded-xl border border-border bg-secondary/20 p-5 space-y-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, byoCompute: !p.byoCompute }))
                    }
                    className="flex items-start gap-3 text-left w-full"
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all ${
                        formData.byoCompute
                          ? 'bg-foreground border-foreground'
                          : 'border-muted-foreground/40'
                      }`}
                    >
                      {formData.byoCompute && (
                        <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span>
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                        I want to bring my own compute
                      </span>
                      <span className="block text-xs text-muted-foreground mt-1">
                        Connect your own GPUs or machines and run on hardware you
                        already own.
                      </span>
                    </span>
                  </button>
                  {formData.byoCompute && (
                    <div>
                      <label htmlFor="byoHardware" className="block text-xs font-medium text-muted-foreground mb-2">
                        What hardware do you have?
                      </label>
                      <input
                        type="text"
                        id="byoHardware"
                        name="byoHardware"
                        value={formData.byoHardware}
                        onChange={handleChange}
                        placeholder="e.g. 8x H100, a few Mac Studios, on-prem cluster"
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>

                {/* Techstars + heard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="techstarsBatch" className={labelClass}>
                      <Rocket className="w-3.5 h-3.5 text-muted-foreground" />
                      Techstars affiliation{' '}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="techstarsBatch"
                      name="techstarsBatch"
                      value={formData.techstarsBatch}
                      onChange={handleChange}
                      placeholder="Batch / program, e.g. NYC W17"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="heardVia" className={labelClass}>
                      <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      How did you hear about us?
                    </label>
                    <select
                      id="heardVia"
                      name="heardVia"
                      value={formData.heardVia}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select one</option>
                      {HEARD_OPTIONS.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Honeypot: visually hidden, off-screen, not tab-reachable. */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="hp">Do not fill this in</label>
                  <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={formData.hp}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-accent disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit application
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground/60">
                  By submitting, you agree to Hanzo&rsquo;s{' '}
                  <Link href="/privacy" className="underline hover:text-muted-foreground transition-colors">
                    Privacy Policy
                  </Link>
                  . We use your information only to review this application.
                </p>
              </motion.form>
            )}
          </div>
        </section>

        {/* Fallback CTA for everyone */}
        <section className="pb-24 px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-secondary/20 p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Not venture-backed yet?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              You do not need to qualify to build. Every account starts with $5 in
              free credit and no card &mdash; ship first, apply for credits when you
              raise.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-accent">
              <a href="https://console.hanzo.ai">
                Start free
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
