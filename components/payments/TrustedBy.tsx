'use client'


import React from "react";
import { motion } from "framer-motion";

const clients = [
  { name: "Damon", delay: 0 },
  { name: "Triller", delay: 0.1 },
  { name: "Zoo", delay: 0.2 },
  { name: "Skully", delay: 0.3 },
  { name: "Bellabeat", delay: 0.4 },
  { name: "Lifemed AI", delay: 0.5 }
];

const testimonial = {
  quote: "Hanzo accelerated our innovation beyond what we thought possible, helping us launch groundbreaking AI applications at scale.",
  author: "Jay Giraud",
  role: "Founder & CEO, Damon Motorcycles"
};

const TrustedBy = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-neutral-900/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted Globally</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Industry leaders trust Hanzo Payments to manage their complex financial operations.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 px-4 mb-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: client.delay }}
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-neutral-400 to-neutral-300 bg-clip-text text-transparent"
            >
              {client.name}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl text-foreground mb-4">"</div>
            <p className="text-xl text-neutral-200 italic mb-6">
              {testimonial.quote}
            </p>
            <div className="mt-4">
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-muted-foreground text-sm">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
