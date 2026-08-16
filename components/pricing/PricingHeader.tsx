
import React from "react";
import ChromeText from "@/components/ui/chrome-text";
import { Box } from '@hanzo/ui'

const PricingHeader = () => {
  return (
    <Box className="text-center max-w-3xl mx-auto mb-12">
      <ChromeText 
        as="h1"
        className="mb-6"
        preHeading="Simple & Transparent"
      >
        Pricing
      </ChromeText>
    </Box>
  );
};

export default PricingHeader;
