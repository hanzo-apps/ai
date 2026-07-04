'use client'


import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  scrolled: boolean;
}

const ScrollToTopButton = ({ scrolled }: ScrollToTopButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: scrolled ? 1 : 0 }}
      className={`fixed bottom-8 right-8 bg-neutral-800/80 backdrop-blur-md p-3 rounded-full border border-neutral-700/30 hover:bg-neutral-700/80 transition-all z-50 ${
        !scrolled ? 'pointer-events-none' : ''
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="h-5 w-5 text-[var(--white)]" />
    </motion.button>
  );
};

export default ScrollToTopButton;
