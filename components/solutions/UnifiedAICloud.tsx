'use client'


import React from "react";
import { motion } from "@/components/motion";
import { ChevronRight, Users, BookOpen, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@hanzo/ui";
import SectionHeader from "@/components/zen/SectionHeader";

const UnifiedAICloud: React.FC = () => {
  return (
    <div className="mb-24">
      <SectionHeader
        title="Unified AI Cloud"
        description="One API for the models, the data, and the machines underneath them"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-white/20 to-white/5 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300"
        >
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Enterprise Infrastructure</h3>
          <p className="text-foreground/80">
            GPUs and machines by the second, object storage, a database per tenant, and a gateway in
            front of all of it. Run it managed, or run the same binaries in your own cluster.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-gradient-to-br from-white/15 to-white/5 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300"
        >
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6 text-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Developer Experience</h3>
          <p className="text-foreground/80">
            One CLI, one key, SDKs in the languages you already use, and a coding agent that works in
            your repo. The endpoints on localhost are the endpoints in production.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-gradient-to-br from-white/20 to-white/10 p-6 rounded-xl border border-border hover:border-white/40 transition-all duration-300"
        >
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-foreground/70" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--white)]">Expert Services</h3>
          <p className="text-foreground/80">
            Hanzo Agency and Sensei Group take a seat on your team — scoping the problem, building the
            first version, and staying until it runs.
          </p>
        </motion.div>
      </div>
      
      <div className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/cloud">
            See the cloud <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UnifiedAICloud;
