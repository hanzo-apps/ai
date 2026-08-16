'use client'


import React from "react";
import { motion } from "@/components/motion";
import { CreditCard, Calendar, Send, CreditCard as CardIcon, Coins } from "lucide-react";

const suiteItems = [
  {
    icon: <CreditCard className="h-6 w-6 text-foreground" />,
    title: "Smart routing",
    description: "Choose the processor per payment on cost, success rate or latency. The rule lives here, so tuning it is a config change rather than a deploy."
  },
  {
    icon: <Calendar className="h-6 w-6 text-foreground" />,
    title: "Cascading retries",
    description: "A soft decline is often a fact about one processor, not about the card. Failed attempts fall through to a backup automatically, and the customer sees one outcome."
  },
  {
    icon: <Send className="h-6 w-6 text-foreground" />,
    title: "Normalized webhooks",
    description: "Every processor announces a settlement differently. You subscribe to one event shape and keep it when you add or drop a provider."
  },
  {
    icon: <CardIcon className="h-6 w-6 text-foreground" />,
    title: "Issuing",
    description: "Create and manage physical and virtual cards for your teams or customers."
  },
  {
    icon: <Coins className="h-6 w-6 text-foreground" />,
    title: "Capital",
    description: "Access financing options to fuel your growth."
  }
];

const PaymentsSuite = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--black)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What sits behind the one integration</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Each processor has its own API, its own idea of an error, and its own webhook
            format. This normalises all three, so your code sees one shape whichever of them
            took the payment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Unified Payments Suite</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suiteItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg"
              >
                <div className="bg-neutral-800/50 p-3 rounded-full w-fit mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-neutral-900/50 to-white/10 border border-neutral-800 rounded-xl p-8 overflow-hidden"
        >
          <div className="absolute inset-0 hz-grid [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">What you can see once it is one pipe</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Approval rates, cost and latency compared across processors, on one screen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>3D Secure where the issuer asks for it, without a second integration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Open source, so the routing logic is readable before you trust it.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 bg-neutral-900/70 border border-neutral-700 rounded-lg p-5">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-3">Payment Growth</h4>
                <div className="flex items-end justify-center space-x-2 h-32 mb-4">
                  {[20, 35, 28, 45, 60, 75, 90].map((height, i) => (
                    <div 
                      key={i} 
                      className="bg-gradient-to-t from-white to-white/10 rounded-t w-6"
                      style={{height: `${height}%`}}
                    ></div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">Last 7 days</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentsSuite;
