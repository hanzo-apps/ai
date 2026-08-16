'use client'


import React, { useState, useEffect } from "react";
import { motion } from "@/components/motion";
import { Github } from "lucide-react";
import { Button } from "@hanzo/ui";

const OpenSource = () => {
  const [isInView, setIsInView] = useState(false);
  
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-neutral-900/20 relative">
      <div className="absolute inset-0 hz-grid" style={{ '--hz-grid-size': '30px', '--hz-grid-opacity': '0.02' } as React.CSSProperties}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Open Source at Our Core</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Hanzo Analytics is fully open-source, fostering innovation and collaboration among thousands of global developers.
            </p>
            
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Github className="h-4 w-4" />
                <a href="https://docs.hanzo.ai" target="_blank" rel="noopener noreferrer">
                  View Docs
                </a>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Github className="h-4 w-4" />
                <a href="https://github.com/hanzoai" target="_blank" rel="noopener noreferrer">
                  View Repository
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-neutral-900 to-background rounded-xl overflow-hidden border border-neutral-800 shadow-xl"
          >
            <div className="flex items-center p-4 bg-neutral-900 border-b border-neutral-800">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-primary/10"></div>
                <div className="w-3 h-3 rounded-full bg-primary/10"></div>
                <div className="w-3 h-3 rounded-full bg-primary/10"></div>
              </div>
              <div className="flex-1 text-center text-foreground/80 text-sm">analytics.js</div>
            </div>
            
            <div className="p-6 text-left font-mono text-sm text-muted-foreground overflow-x-auto">
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">1</div>
                <div>
                  <span className="text-foreground">import</span> <span className="text-foreground/70">{'{'}</span> <span className="text-foreground/60">HanzoAnalytics</span> <span className="text-foreground/70">{'}'}</span> <span className="text-foreground">from</span> <span className="text-foreground/70">'hanzo-analytics'</span>;
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">2</div>
                <div></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">3</div>
                <div><span className="text-muted-foreground">// Initialize analytics with your project ID</span></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">4</div>
                <div>
                  <span className="text-foreground">const</span> analytics <span className="text-[var(--white)]">=</span> <span className="text-foreground">new</span> <span className="text-foreground/60">HanzoAnalytics</span><span className="text-[var(--white)]">(</span><span className="text-foreground/70">'YOUR_PROJECT_ID'</span><span className="text-[var(--white)]">);</span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">5</div>
                <div></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">6</div>
                <div><span className="text-muted-foreground">// Track page views automatically</span></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">7</div>
                <div>
                  <span className="text-[var(--white)]">analytics.trackPageViews();</span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">8</div>
                <div></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">9</div>
                <div><span className="text-muted-foreground">// Track custom events</span></div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">10</div>
                <div>
                  <span className="text-[var(--white)]">analytics.track(</span><span className="text-foreground/70">'button_click'</span><span className="text-[var(--white)]">, {'{'}</span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">11</div>
                <div>
                  <span className="text-[var(--white)]">  buttonId: </span><span className="text-foreground/70">'signup_button'</span><span className="text-[var(--white)]">,</span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">12</div>
                <div>
                  <span className="text-[var(--white)]">  page: </span><span className="text-foreground/70">'/home'</span>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-muted-foreground/60">13</div>
                <div>
                  <span className="text-[var(--white)]">{'}'});</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default OpenSource;
