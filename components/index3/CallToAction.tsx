'use client'


import React from "react";
import { motion } from "@/components/motion";
import ChromeText from "@/components/ui/chrome-text";

const CallToAction = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <ChromeText as="h2" className="text-3xl md:text-5xl font-bold mb-6 mx-auto text-center">
            Build Your Vision, Shape the Future
          </ChromeText>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Join the revolution of AI-driven development. Hanzo gives your team the tools, platform, and support needed to innovate fearlessly, deploy instantly, and scale infinitely.
          </p>
          
          {/* One element, one control. This was an <a> nested inside a Button:
              the button painted 225x70 and only the 160x20 anchor inside it
              navigated, so most of the CTA was dead pixels — and interactive
              content inside a button is invalid markup besides. The anchor
              carries the look, so the whole pill is the link. */}
          <a
            href="https://dashboard.hanzo.cloud"
            className="hz-tap inline-flex items-center justify-center bg-[var(--white)] hover:bg-neutral-100 text-primary-foreground px-8 py-6 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Get Started with Hanzo
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
