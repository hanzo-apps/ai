'use client'


import React, { useRef } from "react";
import { motion } from "@/components/motion";
import { useScroll, useTransform } from "framer-motion";
import { ShoppingCart, DollarSign, CreditCard, Zap } from "lucide-react";
import { Box } from '@hanzo/ui'

const CommerceAnalytics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden"
    >
      {/* Background gradient */}
      <Box className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/10 opacity-50"></Box>
      
      {/* Content */}
      <Box className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">If you sell something</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Revenue is a report here, not an integration you buy on top.
          </p>
        </motion.div>
        
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Revenue beside the traffic",
                description: "Send an amount and a currency with the event and it lands in the same reports as everything else. Totals, order values and the sessions behind them."
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Which campaign paid for itself",
                description: "Attribution splits revenue across the channels and campaigns that touched the session, so spend can be argued with numbers rather than instinct."
              },
              {
                icon: <CreditCard className="h-6 w-6" />,
                title: "The checkout, step by step",
                description: "Cart to payment as a funnel, with the abandonment rate per step. Add a goal for the one step you would defend in a meeting."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex"
              >
                <Box className="mr-4 p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/10 border border-border text-foreground">
                  {feature.icon}
                </Box>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            style={{ scale, opacity }}
            className="rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 to-background border border-neutral-800 shadow-xl"
          >
            <Box className="p-4 border-b border-neutral-800">
              <Box className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-foreground mr-2" />
                <span className="text-[var(--white)] font-medium">Commerce Dashboard</span>
              </Box>
            </Box>
            
            <Box className="p-6">
              <Box className="mb-6">
                <h4 className="text-lg font-medium mb-4">Sales Performance</h4>
                <Box className="h-40 bg-neutral-800/50 rounded-lg relative overflow-hidden">
                  {/* Bar chart */}
                  <Box className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                    {[65, 80, 55, 90, 70, 85, 60].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-6 bg-gradient-to-t from-white to-white/10 rounded-t"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      ></motion.div>
                    ))}
                  </Box>
                </Box>
              </Box>
              
              <Box className="grid grid-cols-2 gap-4 mb-6">
                <Box className="bg-neutral-800/30 p-4 rounded-lg">
                  <Box className="text-sm text-muted-foreground">Conversion Rate</Box>
                  <Box className="text-2xl font-bold mt-2">4.78%</Box>
                  <Box className="text-foreground/70 text-sm flex items-center mt-1">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +0.6%
                  </Box>
                </Box>
                <Box className="bg-neutral-800/30 p-4 rounded-lg">
                  <Box className="text-sm text-muted-foreground">Avg. Order Value</Box>
                  <Box className="text-2xl font-bold mt-2">$87.32</Box>
                  <Box className="text-foreground/70 text-sm flex items-center mt-1">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +2.4%
                  </Box>
                </Box>
              </Box>
              
              <Box className="border-t border-neutral-800 pt-4">
                <h4 className="text-lg font-medium mb-4">Product Recommendations</h4>
                <div className="space-y-3">
                  {[
                    { name: "Premium Headphones", score: 98 },
                    { name: "Wireless Keyboard", score: 85 },
                    { name: "Smart Watch", score: 79 }
                  ].map((product, i) => (
                    <Box key={i} className="flex items-center justify-between">
                      <span className="text-foreground/80">{product.name}</span>
                      <Box className="flex items-center">
                        <Box className="w-24 h-2 bg-neutral-800 rounded-full mr-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${product.score}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                          ></motion.div>
                        </Box>
                        <span className="text-sm text-foreground">{product.score}%</span>
                      </Box>
                    </Box>
                  ))}
                </div>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default CommerceAnalytics;
