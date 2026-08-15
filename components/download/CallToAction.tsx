'use client'

import { motion } from "@/components/motion";
import { Apple, Monitor, Chrome } from "lucide-react";
import { CTA_PRIMARY, CTA_OUTLINE } from "./cta";

// Canonical Hanzo desktop download targets (same GitHub Releases source the
// desktop banner uses — one place for the URLs, no fabricated asset names).
const RELEASES = "https://github.com/hanzoai/dev/releases";
const desktopDownloads = [
  { label: "Download for Mac (Apple Silicon)", href: `${RELEASES}/latest/download/Hanzo-Dev-darwin-arm64.dmg`, Icon: Apple },
  { label: "Download for Mac (Intel)", href: RELEASES, Icon: Apple },
  { label: "Download for Windows", href: RELEASES, Icon: Monitor },
];

const extensions = ["Chrome Extension", "Safari Extension", "Firefox Add-on", "Edge Extension"];

const CallToAction = () => {
  return (
    <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--black)] relative overflow-hidden">
      {/* Subtle corner glows — no flat white wash over the whole section. */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-steel">
            Hanzo, everywhere you work
          </h2>

          <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto">
            The native desktop app for macOS and Windows — plus browser extensions for
            Chrome, Safari, Firefox, and Edge — give Hanzo the context of what you&apos;re
            working on, so its models can help right where you already work.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            {desktopDownloads.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={CTA_PRIMARY}>
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {extensions.map((label) => (
              <a key={label} href="https://hanzo.sh" target="_blank" rel="noopener noreferrer" className={CTA_OUTLINE}>
                <Chrome className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>
        {`
        .text-gradient-steel {
          background: linear-gradient(
            90deg,
            rgb(180, 180, 180),
            rgb(240, 240, 240),
            rgb(180, 180, 180)
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 6s ease infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </section>
  );
};

export default CallToAction;
