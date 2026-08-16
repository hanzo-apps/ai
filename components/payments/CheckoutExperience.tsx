'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Globe, Smartphone, Paintbrush } from "lucide-react";

const CheckoutExperience = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Customizable Checkout Experiences</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Create beautiful, high-converting checkout flows that drive revenue growth and customer satisfaction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-neutral-900/30 border border-neutral-800 rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Global Payment Methods</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Cards, wallets, bank debits, buy-now-pay-later and crypto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Local methods handled by whichever processor supports them best</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>The method someone expects to see, in the country they are in</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-2 mt-4">
                {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay', 'iDEAL', 'Bancontact', 'SOFORT', '+190 more'].map((method, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-neutral-800 rounded-full text-sm text-foreground/80">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between bg-neutral-900/30 border border-neutral-800 rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Checkout Interface</h3>
              <p className="text-muted-foreground mb-6">
                Fully customizable checkout UI that matches your brand and maximizes conversions.
              </p>
              
              <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 mb-4">
                <div className="h-8 w-32 bg-neutral-800 rounded mb-3"></div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="h-10 bg-neutral-800 rounded"></div>
                  <div className="h-10 bg-neutral-800 rounded"></div>
                </div>
                <div className="h-10 bg-neutral-800 rounded mb-3"></div>
                <div className="h-10 bg-primary rounded"></div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-2 text-center">Customizable checkout flow</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg"
          >
            <div className="bg-neutral-800/50 p-3 rounded-full w-fit mb-4">
              <Globe className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
            <p className="text-muted-foreground">
              Regional processors are connectors like any other, so entering a market is a routing rule rather than a new integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg"
          >
            <div className="bg-neutral-800/50 p-3 rounded-full w-fit mb-4">
              <Smartphone className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
            <p className="text-muted-foreground">
              Responsive checkout flows designed for high conversion on all devices and screen sizes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-neutral-900/30 border border-neutral-800 p-6 rounded-lg"
          >
            <div className="bg-neutral-800/50 p-3 rounded-full w-fit mb-4">
              <Paintbrush className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
            <p className="text-muted-foreground">
              Customize every aspect of the checkout experience to match your brand identity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutExperience;
