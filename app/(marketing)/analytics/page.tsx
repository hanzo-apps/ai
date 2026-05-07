'use client'


import React from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/analytics/HeroSection";
import TrustedBy from "@/components/analytics/TrustedBy";
import WebAnalytics from "@/components/analytics/WebAnalytics";
import BuildForGrowth from "@/components/analytics/BuildForGrowth";
import CommerceAnalytics from "@/components/analytics/CommerceAnalytics";
import OpenSource from "@/components/analytics/OpenSource";
import DeveloperFirst from "@/components/analytics/DeveloperFirst";
import AIPowered from "@/components/analytics/AIPowered";
import Security from "@/components/analytics/Security";
import Community from "@/components/analytics/Community";
import CallToAction from "@/components/analytics/CallToAction";
import { OSSRevenueBanner } from "@/components/oss/OSSRevenueBanner";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">

      <main>
        <HeroSection />
        <TrustedBy />
        <WebAnalytics />
        <BuildForGrowth />
        <CommerceAnalytics />
        <OpenSource />
        <DeveloperFirst />
        <AIPowered />
        <Security />
        <Community />
        <OSSRevenueBanner upstreamName="Umami" />
        <CallToAction />
        <section className="py-16 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started with Analytics</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://docs.hanzo.ai/analytics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-sm font-medium">
                Read the docs <ArrowRight className="h-4 w-4" />
              </a>
              <a href="https://github.com/hanzoai/analytics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-md text-sm font-medium">
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Analytics;
