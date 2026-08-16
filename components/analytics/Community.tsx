'use client'


import React, { useState, useEffect, useRef } from "react";
import { motion } from "@/components/motion";
import { Github, ExternalLink, Users, BookOpen } from "lucide-react";
import { Button } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const statsItems = [
  { 
    icon: <Github className="h-6 w-6" />,
    value: 17,
    suffix: "M+",
    label: "Downloads",
    countUpDuration: 2
  },
  { 
    icon: <Github className="h-6 w-6" />,
    value: 25,
    suffix: "K+",
    label: "GitHub Stars",
    countUpDuration: 2.2
  },
  { 
    icon: <Users className="h-6 w-6" />,
    value: 280,
    suffix: "+",
    label: "Contributors",
    countUpDuration: 1.8
  }
];

/**
 * The observer here COUNTS, it does not conceal.
 *
 * It used to do both: one `IntersectionObserver` started the tallies AND drove
 * an `animate={controls}` that held both card grids at `opacity: 0` until it
 * fired — so a reader the observer missed got the stats section as a blank
 * 872px. Starting a count when the number comes into view is a real thing to
 * watch for; deciding whether the copy exists is not, and the two had no
 * business on the same trigger. The reveal is `whileInView` now, like every
 * other on the site, which cannot hide anything (`components/motion.tsx`).
 */
const Community = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-neutral-900/30 relative overflow-hidden">
      <div className="absolute inset-0 hz-grid" style={{ '--hz-grid-size': '20px', '--hz-grid-opacity': '0.02' } as React.CSSProperties}></div>
      
      <Box className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Powered by Community, Improved by Collaboration</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Join thousands of developers building the future of analytics together.
          </p>
        </motion.div>
        
        <div ref={ref}>
          <motion.div
            variants={containerVariants}
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {statsItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-neutral-900/50 rounded-xl p-8 border border-neutral-800 text-center"
              >
                <Box className="flex justify-center mb-4">
                  <Box className="p-3 bg-primary/10 rounded-full border border-border text-foreground">
                    {item.icon}
                  </Box>
                </Box>
                
                <Box className="text-4xl font-bold mb-2">
                  {isInView ? (
                    <CountUp end={item.value} duration={item.countUpDuration} />
                  ) : (
                    0
                  )}
                  <span>{item.suffix}</span>
                </Box>
                
                <Box className="text-muted-foreground">{item.label}</Box>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-8"
            >
              <Box className="flex items-center mb-6">
                <Github className="h-6 w-6 text-foreground mr-3" />
                <h3 className="text-2xl font-bold">Open Source</h3>
              </Box>
              
              <p className="text-muted-foreground mb-6">
                Hanzo Analytics is fully open source, with a vibrant community of developers contributing from around the world. Join us on GitHub to collaborate on the future of analytics.
              </p>
              
              <div className="space-y-4 mb-8">
                <Box className="flex items-center">
                  <Box className="w-8 h-8 rounded-full bg-neutral-700 mr-3"></Box>
                  <Box className="flex-1">
                    <Box className="h-2 w-3/4 bg-neutral-700 rounded"></Box>
                    <Box className="h-2 w-1/2 bg-neutral-700 rounded mt-2"></Box>
                  </Box>
                </Box>
                <Box className="flex items-center">
                  <Box className="w-8 h-8 rounded-full bg-neutral-700 mr-3"></Box>
                  <Box className="flex-1">
                    <Box className="h-2 w-3/4 bg-neutral-700 rounded"></Box>
                    <Box className="h-2 w-1/2 bg-neutral-700 rounded mt-2"></Box>
                  </Box>
                </Box>
                <Box className="flex items-center">
                  <Box className="w-8 h-8 rounded-full bg-neutral-700 mr-3"></Box>
                  <Box className="flex-1">
                    <Box className="h-2 w-3/4 bg-neutral-700 rounded"></Box>
                    <Box className="h-2 w-1/2 bg-neutral-700 rounded mt-2"></Box>
                  </Box>
                </Box>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Repo
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-8"
            >
              <Box className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-foreground/70 mr-3" />
                <h3 className="text-2xl font-bold">Resources</h3>
              </Box>
              
              <p className="text-muted-foreground mb-6">
                Access comprehensive documentation, tutorials, and examples to help you make the most of Hanzo Analytics.
              </p>
              
              <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { 
                    title: "Documentation", 
                    description: "Comprehensive guides and API references",
                    link: "#documentation" 
                  },
                  { 
                    title: "Community Forum", 
                    description: "Join discussions with developers and AI experts",
                    link: "#forum" 
                  },
                  { 
                    title: "Examples", 
                    description: "Sample projects showcasing Hanzo Analytics",
                    link: "#examples" 
                  },
                  { 
                    title: "Support", 
                    description: "Get help from our team and community",
                    link: "#support" 
                  }
                ].map((resource, i) => (
                  <a 
                    key={i} 
                    href={resource.link || "#"} 
                    className="block p-4 bg-neutral-800/50 hover:bg-neutral-800 rounded-lg border border-neutral-700 transition-colors"
                  >
                    <h4 className="font-medium text-[var(--white)] mb-1">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </a>
                ))}
              </Box>
              
              <Button variant="outline" className="flex items-center gap-2">
                Browse All Resources
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Box>
    </section>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);
  
  return <>{count}</>;
};

export default Community;
