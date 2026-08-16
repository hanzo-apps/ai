'use client'


import React from 'react';
import { motion } from '@/components/motion';
import { Quote } from 'lucide-react';
import { Box } from '@hanzo/ui'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Hanzo gave us the infrastructure backbone to move fast without rebuilding from scratch. The platform let our team focus on the product, not the plumbing.",
      author: "Jay Giraud",
      title: "CEO, Damon Motorcycles"
    },
    {
      quote: "We needed a platform that could handle real-time data at scale without sacrificing developer experience. Hanzo delivered on both fronts.",
      author: "Marcus Weller",
      title: "CEO, SKULLY Technologies"
    },
    {
      quote: "Hanzo's AI infrastructure helped us personalize experiences for millions of users while keeping our stack lean and our team focused on what matters.",
      author: "Sandro Mur",
      title: "CEO, Bellabeat"
    }
  ];

  const getInitials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden">
      {/* Background elements */}
      <Box className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Box className="absolute -bottom-64 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></Box>
      </Box>

      <Box className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-6">
            Experiences from Our Community
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Hear from engineering teams who are building the next generation of AI-powered applications
          </p>
        </motion.div>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/20 border border-neutral-800 rounded-xl p-8 hover:bg-neutral-900/30 transition-colors relative"
            >
              <Quote className="absolute top-6 right-6 h-6 w-6 text-foreground/40" />
              <p className="text-foreground/80 mb-8 mt-4">"{testimonial.quote}"</p>
              <Box className="flex items-center">
                <Box className="h-12 w-12 rounded-full bg-primary/20 border border-white/30 flex items-center justify-center text-[var(--white)] font-semibold">
                  {getInitials(testimonial.author)}
                </Box>
                <Box className="ml-4">
                  <Box className="text-[var(--white)] font-medium">{testimonial.author}</Box>
                  <Box className="text-muted-foreground text-sm">{testimonial.title}</Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-neutral-900/30 border border-neutral-800 rounded-xl p-8 md:p-12"
        >
          <Box className="flex flex-col md:flex-row items-center justify-between">
            <Box className="mb-8 md:mb-0 md:mr-8 md:w-2/3">
              <h3 className="text-2xl font-bold text-[var(--white)] mb-4">
                The AI Engineering Community
              </h3>
              <p className="text-foreground/80 mb-6">
                Build with the engineers shipping production AI.
                Share experiences, get support, and collaborate on best practices.
              </p>
              <Box className="flex flex-wrap gap-4">
                <Box className="flex items-center bg-neutral-800/50 rounded-full px-4 py-2">
                  <Box className="w-2 h-2 rounded-full bg-primary/10 mr-2"></Box>
                  <span className="text-foreground/80 text-sm">Active developer community</span>
                </Box>
                <Box className="flex items-center bg-neutral-800/50 rounded-full px-4 py-2">
                  <Box className="w-2 h-2 rounded-full bg-primary/10 mr-2"></Box>
                  <span className="text-foreground/80 text-sm">Weekly office hours</span>
                </Box>
                <Box className="flex items-center bg-neutral-800/50 rounded-full px-4 py-2">
                  <Box className="w-2 h-2 rounded-full bg-primary mr-2"></Box>
                  <span className="text-foreground/80 text-sm">Dedicated support team</span>
                </Box>
              </Box>
            </Box>
            <Box className="md:w-1/3 flex justify-center md:justify-end">
              <div className="flex -space-x-4">
                {[...Array(5)].map((_, i) => (
                  <Box 
                    key={i} 
                    className="h-12 w-12 rounded-full bg-primary/30 border-2 border-neutral-900 flex items-center justify-center text-foreground/70 text-sm font-medium"
                  >
                    {["JS", "MK", "AL", "TN", "RW"][i]}
                  </Box>
                ))}
                <Box className="h-12 w-12 rounded-full bg-primary/20 border-2 border-neutral-900 flex items-center justify-center text-[var(--white)] text-sm font-medium">
                  +
                </Box>
              </div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default Testimonials;
