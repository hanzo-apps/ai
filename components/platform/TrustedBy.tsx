'use client'


import React, { useState, useEffect, useRef } from "react";
import { motion } from "@/components/motion";
import { testimonials } from "@/lib/data/testimonials";


const getInitials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();

const TrustedBy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--black)]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-3xl md:text-4xl font-medium mb-6"
            style={{
              backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
            }}
          >
            Trusted by the best in business
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Industry leaders across various sectors rely on Hanzo for their technological needs. Here's what they have to say.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--black)]/50 backdrop-blur-sm rounded-xl p-8 border border-border/20"
            >
              <div className="mb-4">
                <h3 
                  className="text-xl font-medium"
                  style={{
                    backgroundPosition: `${(mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100}%`,
                  }}
                >
                  {testimonial.company}
                </h3>
              </div>
              
              <p className="text-foreground/80 mb-6 leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 border border-white/30 text-[var(--white)] flex items-center justify-center font-semibold">
                    {getInitials(testimonial.author)}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--white)]">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
