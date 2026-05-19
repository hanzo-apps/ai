'use client'

import React from "react";
import HeroSection from "@/components/hanzoapp/HeroSection";
import WhyHanzoApp from "@/components/hanzoapp/WhyHanzoApp";
import HowItWorks from "@/components/hanzoapp/HowItWorks";
import FAQSection from "@/components/hanzoapp/FAQSection";
import FooterCTA from "@/components/hanzoapp/FooterCTA";

import { ProductFooter } from "@/components/products/ProductFooter"
const HanzoApp = () => {
  return (
    <div className="min-h-screen bg-[var(--black)] text-[var(--white)]">
            
      <main>
        <HeroSection />
        <WhyHanzoApp />
        <HowItWorks />
        <FAQSection />
        <FooterCTA />
              <ProductFooter slug="app" name="App" />
</main>
      
    </div>
  );
};

export default HanzoApp;
