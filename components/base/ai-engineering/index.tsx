
import React from "react";
import AIEngineeringHeader from "./AIEngineeringHeader";
import ExpandableFeatureCard from "../../ai/engineering-platform/ExpandableFeatureCard";
import { featureData } from "./featureData";
import { Box } from '@hanzo/ui'

const AIEngineering = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--black)]">
      <Box className="max-w-7xl mx-auto">
        <AIEngineeringHeader />
        
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featureData.map((feature, index) => (
            <ExpandableFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              featurePoints={feature.featurePoints}
              delay={feature.delay}
              iconBgClass={feature.iconBgClass}
              iconTextClass={feature.iconTextClass}
              bulletColor={feature.bulletColor}
            />
          ))}
        </Box>
      </Box>
    </section>
  );
};

export default AIEngineering;
