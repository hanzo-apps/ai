'use client'


import React from "react";
import { motion } from "framer-motion";
import { Activity, Radio, Zap, ArrowRight } from "lucide-react";
import { Button } from "@hanzo/ui";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-white/30 mb-6"
            >
              <Activity className="h-4 w-4 text-foreground mr-2" />
              <span className="text-sm text-foreground/70">Live record updates</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--white)]"
            >
              Your screen updates <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10">
                when the data does
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl"
            >
              Open one stream and records reach the browser as they change — created, updated, deleted — with no polling loop and no timer deciding how stale a page is allowed to get. A subscription is a collection, or a single record inside it, and the access rule already guarding that collection decides what any given subscriber is allowed to receive.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-neutral-700 text-[var(--white)] hover:bg-neutral-800"
              >
                View Documentation
              </Button>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[var(--black)]/60 border border-neutral-800 p-6 rounded-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-primary/10 mr-3 animate-pulse" />
                  <span className="text-foreground/80 text-sm">Live connection</span>
                </div>
                <div className="flex items-center">
                  <Radio className="h-4 w-4 text-foreground mr-2" />
                  <span className="text-foreground/80 text-sm">One open stream</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-14 bg-gradient-to-r from-white/20 to-white/10 rounded-lg border border-white/30 p-4 flex items-center">
                  <Zap className="h-5 w-5 text-foreground mr-3" />
                  <span className="text-neutral-200">Records arrive as they change</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="h-24 rounded-lg border border-neutral-800 p-4 flex flex-col justify-center items-center bg-gradient-to-br from-neutral-900 to-neutral-950"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary mb-2 animate-pulse" />
                      <span className="text-xs text-muted-foreground text-center">Client {i}</span>
                      <span className="text-xs text-muted-foreground text-center">Connected</span>
                    </div>
                  ))}
                </div>
                
                <div className="h-36 bg-neutral-900 rounded-lg border border-neutral-800 p-3 overflow-hidden font-mono text-xs">
                  <div className="text-foreground/70">// Watch a collection</div>
                  <div className="text-foreground/80">const stop = await base</div>
                  <div className="text-foreground/80 pl-4">.collection('messages')</div>
                  <div className="text-foreground/80 pl-4">.subscribe('*', (e) =&gt; {`{`}</div>
                  <div className="text-foreground/80 pl-8">console.log(e.action, e.record.id);</div>
                  <div className="text-foreground/80 pl-8">render(e.record);</div>
                  <div className="text-foreground/80 pl-4">{`}`});</div>
                  <div className="text-foreground/80">// create | update | delete</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
