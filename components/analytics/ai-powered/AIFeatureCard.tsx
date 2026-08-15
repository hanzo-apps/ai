'use client'


import React from "react";
import { motion } from "@/components/motion";
import { LucideIcon } from "lucide-react";

interface AIFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

const AIFeatureCard = ({ icon, title, description, delay, index }: AIFeatureCardProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-neutral-900/60 to-neutral-900/40 rounded-xl p-8 border border-neutral-800 hover:border-white/30 transition-colors group"
    >
      <div className="mb-5 transition-transform group-hover:scale-110 duration-300 transform-gpu">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default AIFeatureCard;
