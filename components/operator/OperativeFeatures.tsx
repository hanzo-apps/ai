'use client'


import React from "react";
import { motion } from "@/components/motion";
import { Github, Globe, Zap, ShieldCheck, Compass, Database, Cpu, Cloud } from "lucide-react";
import { Box } from '@hanzo/ui'

const OperativeFeatures = () => {
  const features = [
    {
      icon: Globe,
      title: "A desktop in the image",
      description: "Xvfb and X11 give the container a screen with no monitor attached, so a real window manager and real applications run inside it."
    },
    {
      icon: Zap,
      title: "Watch it work",
      description: "VNC on 5900 for a native client, noVNC on 6080 in a browser, and the control page on 8501. You see the cursor move as it moves."
    },
    {
      icon: Compass,
      title: "Say what you want",
      description: "Type an objective and it plans, acts, looks at the result, and goes again. You can interrupt at any point."
    },
    {
      icon: Database,
      title: "Bash and a file editor too",
      description: "Not only the screen. It can run a command or edit a file directly when that is the shorter path, instead of typing into a GUI text editor."
    },
    {
      icon: ShieldCheck,
      title: "Blast radius is the container",
      description: "Stop it and everything it touched goes with it. Give it the narrowest privileges and an allowlist of domains, and keep credentials that matter out of the image."
    },
    {
      icon: Cpu,
      title: "Where the model comes from",
      description: "The API directly, AWS Bedrock, or Google Vertex — chosen with an environment variable. The container is the same in all three cases."
    }
  ];

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background gradient */}
      <Box className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/2 bg-primary/10 rounded-full blur-3xl"></Box>
      
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Box className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
              What is in the container
            </h2>
            <p className="text-xl text-foreground/80">
              A screen, a way to watch it, and the tools the model drives it with
            </p>
          </motion.div>
        </Box>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/50 transition-colors"
            >
              <Box className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-foreground" />
              </Box>
              <h3 className="text-xl font-semibold text-[var(--white)] mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </Box>

        <Box className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center space-x-3 bg-neutral-900/50 border border-neutral-800 rounded-full px-6 py-3"
          >
            <Github className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground/80">Open Source on</span>
            <a href="https://github.com/hanzo-ai/operative" className="text-[var(--white)] font-semibold hover:text-foreground transition-colors">GitHub</a>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default OperativeFeatures;
