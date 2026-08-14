
import React from "react";
import ChromeText from "@/components/ui/chrome-text";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-white/20 to-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <ChromeText as="h1" className="text-4xl font-bold mb-2">
          Hanzo AI Studio
        </ChromeText>
        <p className="text-foreground/80 max-w-xl">
          A workspace for the part before you write the client. Send a prompt,
          switch the model under it, read the response, keep what worked. Chat,
          a playground, and a terminal over the same session — so the thing you
          tested is the thing you ship.
        </p>
      </div>
    </div>
  );
};

export default Hero;
