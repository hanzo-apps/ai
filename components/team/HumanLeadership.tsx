'use client'

import { motion } from "framer-motion";

interface Leader {
  name: string;
  title: string;
  bio: string;
  image: string;
}

// Real Hanzo human leadership — source of truth: hanzo.industries.
// Humans render first; the autonomous AI team follows below on the page.
const leaders: Leader[] = [
  {
    name: "Zach Kelling",
    title: "Founding CTO",
    bio: "Technical founder driving Hanzo's mission to build frontier AI. Leads architecture, product vision, and technical strategy across the full stack.",
    image: "/leadership/zach-kelling.png",
  },
  {
    name: "Dave Lorenzini",
    title: "Chief Strategy Officer",
    bio: "Strategy visionary with decades of experience in immersive computing and AI. Leads strategic planning, partnerships, and long-term company direction.",
    image: "/leadership/dave-lorenzini.jpg",
  },
  {
    name: "Michael Kelling",
    title: "President",
    bio: "Strategic operations leader overseeing commercial expansion and enterprise partnerships. Expert in scaling AI solutions for global impact.",
    image: "/leadership/michael-kelling.png",
  },
  {
    name: "Antje Worring",
    title: "Chief Operating Officer",
    bio: "Operational excellence leader ensuring seamless execution across all divisions. Drives strategic initiatives and organizational effectiveness.",
    image: "/leadership/antje-worring.png",
  },
  {
    name: "Vincent Butta",
    title: "Chief Revenue Officer",
    bio: "Driving revenue growth and commercial strategy. Expert in scaling enterprise sales and building high-performance go-to-market organizations.",
    image: "/leadership/vincent-butta.jpg",
  },
  {
    name: 'Major "Dream" Williams',
    title: "Chief Visionary Officer",
    bio: "Visionary leader with diverse talents in finance, entrepreneurship, and technology. Inspires and collaborates with international thought leaders to transform challenges into opportunities.",
    image: "/leadership/major-williams.png",
  },
  {
    name: "Danielle Savage",
    title: "Chief Brand Officer",
    bio: "Brand visionary elevating Hanzo's global presence and market positioning. Expert in creating compelling brand narratives and customer experiences.",
    image: "/leadership/danielle-savage.png",
  },
  {
    name: "Ashley Kathleen Christie",
    title: "Chief of Staff",
    bio: "Strategic advisor ensuring organizational alignment and leadership effectiveness. Expert in executive operations and cross-functional coordination.",
    image: "/leadership/ashley-christie.png",
  },
  {
    name: "Anastasia Zacharaoff",
    title: "VP Engineering",
    bio: "Engineering leader driving technical excellence and innovation. Expert in building high-performing engineering teams and scalable systems.",
    image: "/leadership/anastasia-zacharaoff.png",
  },
  {
    name: "Rob Ruiz",
    title: "VP Strategy",
    bio: "Strategic planning expert developing business intelligence and growth initiatives. Focused on market analysis and strategic partnerships.",
    image: "/leadership/rob-ruiz.png",
  },
  {
    name: "Marcus White",
    title: "VP Research",
    bio: "Research leader advancing AI capabilities and innovation. Expert in applied research and bringing cutting-edge technology to production.",
    image: "/leadership/marcus-white.png",
  },
  {
    name: "Jackson Mori",
    title: "VP Engineering",
    bio: "Engineering leader building scalable distributed systems. Focused on performance, reliability, and developer experience.",
    image: "/leadership/jackson-mori.png",
  },
  {
    name: "Ole Brereton",
    title: "Executive VP",
    bio: "Senior executive driving strategic initiatives and high-impact partnerships across the organization.",
    image: "/leadership/ole-brereton.png",
  },
];

const HumanLeadership = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Leadership &amp; Core Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            The people behind Hanzo. World-class human leaders directing an
            autonomous AI workforce that ships around the clock.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="text-center group"
            >
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-2 bg-card ring-border group-hover:ring-ring transition-all duration-300">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">
                {leader.name}
              </h3>
              <p className="text-sm font-medium mb-3 text-muted-foreground">
                {leader.title}
              </p>
              <p className="text-sm text-muted-foreground">{leader.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HumanLeadership;
