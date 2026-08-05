'use client'


import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The eyebrow above the heading is the SAME pill every other hero on this site
 * uses — dark, hairline-bordered, `text-xs` (CloudLanding's "Open-source ·
 * Self-host or managed", AboutHero's "Our Journey"). It used to be its own
 * thing, and being its own thing is what made it the single light slab on an
 * all-black site: `bg-primary/20` over `#0a0a0a` reads as `#3b3b3b`, under a
 * `border-white/50` twice as bright as any other border in the tree.
 *
 * It also carried a `::before` sweep on `animation: glow 2s infinite`, painting
 * +0.3 white over the LABEL as well as the pill. At rest the text measured
 * 6.3:1; at the peak of every two-second cycle it measured 3.18:1, so a 13px
 * label dropped below AA and back twice a second, forever, with no
 * `prefers-reduced-motion` guard and no way to stop it (WCAG 2.2.2). A
 * marketing eyebrow is not worth an animation that never ends.
 */
interface ChromeTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  className?: string;
  preHeading?: string;
  preHeadingClassName?: string;
  style?: CSSProperties;
}

const ChromeText = ({ 
  children, 
  as: Component = "h1", 
  className,
  preHeading,
  preHeadingClassName,
  style
}: ChromeTextProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Use a more generic ref type that works with any HTML element
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
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
    <div className={cn("flex flex-col", preHeading ? "items-center" : "items-start")}>
      {preHeading && (
        <div className={cn(
          "mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs font-medium text-neutral-300",
          preHeadingClassName
        )}>
          {preHeading}
        </div>
      )}
      <div ref={textRef} className="inline-block">
        <Component
          className={cn("chrome-gradient leading-relaxed py-1", className)}
          style={{
            backgroundPosition: `${(mousePosition.x / (textRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (textRef.current?.offsetHeight || 1)) * 100}%`,
            ...style
          }}
        >
          {children}
        </Component>
        <style>{`
          .chrome-gradient {
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
            transition: background-position 0.1s ease;
            line-height: 1.3;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChromeText;
