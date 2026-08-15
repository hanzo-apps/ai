'use client'

import React from "react";
import { motion } from "@/components/motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@hanzo/ui";
import ChromeText from "@/components/ui/chrome-text";

const MainCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-white/30 to-white/10 rounded-2xl border border-border overflow-hidden"
      >
        <div className="h-64 bg-gradient-to-r from-white/30 to-white/10 flex items-center justify-center">
          <ChromeText as="h2" className="text-3xl font-bold">
            Capabilities
          </ChromeText>
        </div>
        <div className="p-8">
          <p className="text-foreground/80 mb-6">
            The work Hanzo takes on, by use case — AI engineering, cloud infrastructure, data and
            analytics, and the products built on top of them.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-sm text-foreground border border-white/30">
              AI Engineering
            </span>
            <span className="px-3 py-1 bg-primary/20 rounded-full text-sm text-foreground/70 border border-white/30">
              Cloud Infrastructure
            </span>
            <span className="px-3 py-1 bg-primary/15 rounded-full text-sm text-foreground border border-white/25">
              Data Analytics
            </span>
            <span className="px-3 py-1 bg-primary/15 rounded-full text-sm text-foreground/70 border border-white/25">
              Digital Experiences
            </span>
          </div>
          <Button asChild className="w-full">
            <Link href="/solutions/capabilities">
              See the capabilities <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gradient-to-br from-white/20 to-white/10 rounded-2xl border border-border overflow-hidden"
      >
        <div className="h-64 bg-gradient-to-r from-white/20 to-white/30 flex items-center justify-center">
          <ChromeText as="h2" className="text-3xl font-bold">
            Industries
          </ChromeText>
        </div>
        <div className="p-8">
          <p className="text-foreground/80 mb-6">
            The same platform seen from inside a sector — financial services, healthcare, retail,
            technology. What changes is the data and the compliance surface, not the stack underneath.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-3 py-1 bg-primary/20 rounded-full text-sm text-foreground/70 border border-white/30">
              Financial Services
            </span>
            <span className="px-3 py-1 bg-primary/20 rounded-full text-sm text-foreground border border-white/30">
              Healthcare
            </span>
            <span className="px-3 py-1 bg-primary/15 rounded-full text-sm text-foreground/70 border border-white/25">
              Retail
            </span>
            <span className="px-3 py-1 bg-primary/15 rounded-full text-sm text-foreground border border-white/25">
              Technology
            </span>
          </div>
          <Button asChild className="w-full">
            <Link href="/solutions/industries">
              See the industries <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default MainCards;
