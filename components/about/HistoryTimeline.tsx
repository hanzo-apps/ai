'use client'


import React, { useRef } from "react";
import { motion } from "@/components/motion";
import { useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Code, Rocket, Stars, Coins, Trophy, Lightbulb, Bot, User2 } from "lucide-react";
import { Button } from "@hanzo/ui";

const timelineEvents = [
  {
    year: "2014-2016",
    title: "Origins: Verus Media & Crowdstart",
    description: "Verus Media launched Crowdstart, which used crowd data and AI to run product launches and crowdfunding campaigns.",
    icon: <Rocket className="text-foreground" />,
    highlight: "Record-breaking product launches and significant crowdfunding success.",
    link: { text: "Learn about our platform", url: "/platform" }
  },
  {
    year: "2016",
    title: "Reimagining as Hanzo",
    description: "The company formally incorporated as Hanzo AI, Inc., focusing on AI-powered marketing and development platforms.",
    icon: <Stars className="text-foreground" />,
    highlight: "Helped launch some of the most successful crowdsales in history.",
    link: { text: "View Hanzo AI", url: "/ai" }
  },
  {
    year: "2017",
    title: "Techstars Acceleration",
    description: "Selected for the inaugural Techstars Kansas City accelerator cohort, sharpening focus on e-commerce SaaS.",
    icon: <Trophy className="text-foreground" />,
    highlight: "23 beta users and $42M in client sales by Demo Day.",
    link: { text: "Explore Commerce", url: "/commerce" }
  },
  {
    year: "2018-2020",
    title: "AI Marketing & Blockchain",
    description: "Pivoted to AI marketing platform and blockchain technology, supporting tokenized crowdfunding.",
    icon: <Coins className="text-foreground" />,
    highlight: "Co-founded the first SEC-approved crowdfunding token offering.",
    link: { text: "See our analytics", url: "/analytics" }
  },
  {
    year: "2021-2023",
    title: "Product Innovation",
    description: "Launched Hanzo Dev, a code editor and app builder that turns a plain-language task into running software.",
    icon: <Code className="text-foreground" />,
    highlight: "Open-sourced Hanzo Base, a powerful backend framework.",
    link: { text: "Try Hanzo Dev", url: "/dev" }
  },
  {
    year: "2024-Present",
    title: "Strategic Partnerships",
    description: "Partnered with Personas Social Inc. to grow Keek's user base with Hanzo's AI.",
    icon: <User2 className="text-foreground" />,
    highlight: "Driven over $1B in revenues to clients using AI-powered marketing.",
    link: { text: "Meet Hanzo Bot", url: "/bot" }
  },
];

/**
 * One stop on the line.
 *
 * The entrance is deliberately the plain vertical nudge and nothing more.
 * `@/components/motion` grounds the start state — opacity, x and scale never
 * reach the DOM on a `whileInView` element — because `initial` is written into
 * the EXPORTED HTML, and a reveal that needs an observer to become readable has
 * blanked this page before (4,380px of it). A sideways enter is dropped for a
 * second reason: it is wider than a 390px viewport while it plays.
 *
 * So the sense of travelling THROUGH the timeline is not carried by the cards
 * at all. It is the rail, below, which is decorative and hides nothing.
 *
 * `viewport.margin` fires slightly BEFORE the card reaches centre: a reveal
 * keyed to dead centre plays after the reader is already looking at it.
 */
const TimelineEvent = ({ event, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      <div className="md:w-1/2">
        <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-8 h-full">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-accent mr-4">
              {event.icon}
            </div>
            <div>
              <span className="text-sm text-foreground font-semibold">{event.year}</span>
              <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{event.description}</p>
          <div className="bg-primary/10 border border-border rounded-lg p-4 mb-6">
            <p className="text-foreground/80 italic">&ldquo;{event.highlight}&rdquo;</p>
          </div>
          <Button variant="outline" className="border-border text-foreground hover:bg-accent">
            <a href={event.link.url || "#"}>{event.link.text}</a>
          </Button>
        </div>
      </div>

      {/* The marker only. The RAIL is drawn once by the section, not once per
          event — six stacked columns with their own margins never met end to
          end, so the line the eye follows had a gap at every card.

          Absolutely centred on the ROW rather than inside its half-column: the
          halves are (width - gap)/2, so anything aligned to a column edge sits
          half a gap off the midline and the rail misses it by 16px, alternating
          sides. The empty half below still reserves the space it always did. */}
      <div className="hidden md:block md:w-1/2" aria-hidden />
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary items-center justify-center ring-8 ring-background"
      >
        <span className="text-primary-foreground font-bold">{index + 1}</span>
      </motion.div>
    </motion.div>
  );
};

const HistoryTimeline = () => {
  // ONE rail for the whole section, drawn here rather than once per event.
  // Six stacked columns with their own margins never met end to end, so the
  // line the eye is meant to follow had a gap at every card.
  //
  // It FILLS with scroll: `useScroll` over this section maps the reader's
  // position to the height of a lit overlay on top of a dim track, so the line
  // grows downward as they descend and the passage of time is something you
  // watch rather than infer. Spring-smoothed, because a raw scroll value
  // twitches with every wheel tick.
  //
  // Decorative and additive: the track is always visible, the fill is an
  // overlay on top of it, and no content anywhere depends on this. That is what
  // makes it safe where a `whileInView` reveal is not.
  const rail = useRef<HTMLDivElement>(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ['start 65%', 'end 55%'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const height = useTransform(smooth, (v) => `${v * 100}%`)

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The timeline</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every pivot, and what came out of it. The through-line is building the tools we
            needed ourselves, then giving them away.
          </p>
        </motion.div>

        <div ref={rail} className="mt-16 relative">
          {/* The track, and the part of it that has been travelled. Both sit
              behind the cards and neither is announced — this is a picture of
              the scroll position, and a screen reader already has the years. */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border"
          />
          <motion.div
            aria-hidden
            style={{ height: still ? '100%' : height }}
            className="hidden md:block absolute left-1/2 top-0 w-px -translate-x-1/2 bg-foreground/60"
          />

          {timelineEvents.map((event, index) => (
            <TimelineEvent key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
