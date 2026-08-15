'use client'

import React from "react";
import { motion } from "@/components/motion";
import { Activity, BarChart, Clock, ShoppingCart, Shield, Lightbulb, Signal, LineChart, Gamepad2, Cpu, Network, Users } from "lucide-react";
import ChromeText from "@/components/ui/chrome-text";

const UseCasesSection = () => {
  const useCases = [
    { name: "Web and app analytics", icon: BarChart },
    { name: "E-commerce and finance", icon: ShoppingCart },
    { name: "Time series", icon: Clock },
    { name: "Advertising networks and RTB", icon: Network },
    { name: "Information security", icon: Shield },
    { name: "Business intelligence", icon: Lightbulb },
    { name: "Telecommunications", icon: Signal },
    { name: "Monitoring and telemetry", icon: LineChart },
    { name: "Online games", icon: Gamepad2 },
    { name: "Internet of Things (IoT)", icon: Cpu },
    { name: "Observability", icon: Activity },
    { name: "User behavior analytics", icon: Users }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <ChromeText as="h2" className="text-3xl md:text-5xl font-bold mb-6">
            What people point it at
          </ChromeText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Different industries, the same shape of problem: a great many rows in, a small answer out, asked again a second later.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-neutral-900/20 border border-neutral-800 rounded-lg p-6 text-center flex flex-col items-center hover:bg-neutral-900/40 hover:border-neutral-700 transition-all"
              >
                <Icon className="h-8 w-8 text-foreground/70 mb-3" />
                <p className="text-foreground/80">{useCase.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
