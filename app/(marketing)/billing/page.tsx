"use client"

import { motion } from "@/components/motion"
import { ProductFooter } from "@/components/products/ProductFooter"
import {
  ArrowRight,
  CreditCard,
  FileText,
  Gauge,
  Layers,
  Receipt,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react"
import { Box } from '@hanzo/ui'

export default function BillingPage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <Box className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: "radial-gradient(circle, var(--white-08) 0%, transparent 70%)", filter: "blur(100px)" }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </Box>
        <Box className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-border mb-8">
            <CreditCard className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium text-foreground/80">Billing & Metering</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">Hanzo</span>{" "}
            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Billing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-2xl md:text-3xl font-medium text-foreground mb-4">
            Subscriptions, usage, invoices
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Charge a fixed price, charge for what someone used, or charge for both on the
            same invoice. Plans, prices, meters, coupons and credits are separate objects,
            so a pricing change is a new price rather than a migration — and your servers
            never hold a card number to do any of it.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Any Model</Box><Box className="text-sm text-muted-foreground">Pricing</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Real-time</Box><Box className="text-sm text-muted-foreground">Metering</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">SOX</Box><Box className="text-sm text-muted-foreground">Compliant</Box></Box>
            <Box className="bg-secondary/50 border border-border rounded-xl p-4"><Box className="text-2xl font-bold text-foreground">Multi-Currency</Box><Box className="text-sm text-muted-foreground">Native</Box></Box>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <a href="https://docs.hanzo.ai/docs/billing" className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-accent text-primary-foreground font-medium rounded-full transition-colors">Get Started <ArrowRight className="w-4 h-4" /></a>
            <a href="https://github.com/hanzoai" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-border hover:border-neutral-500 text-foreground font-medium rounded-full transition-colors">GitHub</a>
          </motion.div>
        </Box>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <Box className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The objects you bill with</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Small pieces that compose, rather than one plan type that has to cover every case.</p>
          </motion.div>
          <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: "Plans and prices", description: "A plan says what someone gets. A price says what it costs. Keeping them apart is what lets you change a price without touching anyone already on the old one." },
              { icon: Gauge, title: "Meters", description: "Post an event when something is used and the meter aggregates it. The invoice reads the meter at the end of the period, so nobody has to add up rows by hand." },
              { icon: Receipt, title: "Invoices", description: "Line items assembled from the subscription and the meters, with tax calculated on the invoice itself. Preview one before it is issued, which is when a pricing mistake is still cheap." },
              { icon: RefreshCw, title: "Credits and refunds", description: "Issue credit against a balance, or refund a payment that already settled. Both leave a record, because a customer arguing about a bill is really arguing about a history." },
              { icon: Shield, title: "Coupons and discounts", description: "Apply one to a subscription or to a single invoice. A discount is an object on the invoice rather than an adjusted number, so the reason the total changed is still legible." },
              { icon: Zap, title: "Webhooks", description: "The provider tells us a payment settled and we tell you. One endpoint per provider, so adding a second processor does not mean a second integration on your side." },
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Report the use, then charge for it</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-secondary border border-border rounded-xl overflow-hidden">
            <Box className="flex items-center gap-2 px-4 py-2 border-b border-border"><Box className="flex gap-1.5"><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /><Box className="w-3 h-3 rounded-full bg-neutral-700" /></Box><span className="text-xs text-muted-foreground ml-2">meter.ts</span></Box>
            <pre className="p-4 overflow-x-auto text-sm"><code className="text-foreground/80">{`import { Hanzo } from '@hanzo/billing';

const billing = new Hanzo({ apiKey: process.env.HANZO_API_KEY });

// Report usage in real time
await billing.usage.record({
  customer: 'cus_abc123',
  meter: 'api_requests',
  value: 1,
  timestamp: new Date(),
});

// Subscribe with metered pricing
await billing.subscriptions.create({
  customer: 'cus_abc123',
  items: [{ price: 'price_api_metered' }],
  payment_behavior: 'default_incomplete',
});`}</code></pre>
          </motion.div>
        </Box>
      </section>

      <section className="py-16 border-t border-neutral-800">
        <Box className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Send your first meter event</h2>
          <Box className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://docs.hanzo.ai/docs/billing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
              Read the docs <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
              View on GitHub
            </a>
          </Box>
                <ProductFooter slug="billing" name="Billing" />
</Box>
      </section>
    </>
  )
}
