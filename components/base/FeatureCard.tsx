'use client'


import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "@/components/motion";
import { Box } from '@hanzo/ui'
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

// Monochrome: every card shares one neutral treatment (true-black + white),
// distinguished by its icon and copy, never by hue.
const classes = {
  bg: "bg-primary/10",
  text: "text-foreground",
  border: "border-white/30",
} as const;

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  features,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`${classes.bg} border ${classes.border} rounded-lg p-6 h-full`}
    >
      <Box className="flex items-center mb-4">
        <Box className="mr-3">
          <Icon className={`h-6 w-6 ${classes.text}`} />
        </Box>
        <h3 className="text-xl font-semibold text-[var(--white)]">{title}</h3>
      </Box>
      <p className="text-foreground/80 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className={`mr-2 ${classes.text}`}>•</span>
            <span className="text-foreground/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FeatureCard;
