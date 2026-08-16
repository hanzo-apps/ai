'use client'


import React from "react";
import { motion } from "@/components/motion";
import {
  Video,
  Monitor,
  MessageSquare,
  Lightbulb,
  Workflow,
  Users
} from "lucide-react";
import { Card, CardContent } from "@hanzo/ui";
import { Box } from '@hanzo/ui'

const HumanAIIntegration = () => {
  const features = [
    {
      icon: <Video className="h-10 w-10" />,
      title: "Train via Zoom",
      description: "Join a Zoom call with your AI agents. They watch the screen and listen to the call, and what they pick up they keep."
    },
    {
      icon: <Monitor className="h-10 w-10" />,
      title: "Watch Them Work",
      description: "View your AI agents' work in real-time through a virtual desktop. Provide feedback and guidance as needed."
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Integrated Communication",
      description: "Chat with your AI team members through your existing communication channels like Slack, Teams, or email."
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Proactive Suggestions",
      description: "AI agents will proactively offer insights and suggestions based on their observations of your workflow."
    },
    {
      icon: <Workflow className="h-10 w-10" />,
      title: "Workflow Automation",
      description: "Agents learn your repetitive tasks and offer to automate them, saving you time for more creative work."
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Human Escalation",
      description: "When tasks require human judgment, agents automatically escalate to the appropriate team member."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <Box className="max-w-7xl mx-auto">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Box
              className="inline-flex p-2 rounded-full mb-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)", color: "var(--primary)" }}
            >
              <Users className="h-6 w-6" />
            </Box>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Human-AI Integration
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our AI agents are designed to work alongside your human team,
              creating a natural integration that enhances productivity and creativity.
            </p>

            <Box
              className="relative aspect-video rounded-xl overflow-hidden bg-card/50"
              style={{ border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}
            >
              <Box className="absolute inset-0 flex items-center justify-center">
                {/* This would be a real video in production */}
                <Box className="text-center p-8">
                  <Video className="h-16 w-16 mx-auto mb-4 opacity-70" />
                  <p className="text-muted-foreground">Interactive demo video would be here</p>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card border border-border backdrop-blur-sm overflow-hidden"
                >
                  <CardContent className="p-6">
                    <Box
                      className="p-3 rounded-lg inline-flex mb-4"
                      style={{ backgroundColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                    >
                      {feature.icon}
                    </Box>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </section>
  );
};

export default HumanAIIntegration;
