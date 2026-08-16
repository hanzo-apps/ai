
import React from "react";
import ModelHeader from "./models/ModelHeader";
import ModelCard from "./models/ModelCard";
import ModelFooter from "./models/ModelFooter";
import { operatorModels } from "./models/operatorModelData";
import { Box } from '@hanzo/ui'

const OperativeModels = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <Box className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-background"></Box>
      
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ModelHeader />
        
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {operatorModels.map((model, index) => (
            <ModelCard 
              key={index}
              model={model} 
              index={index} 
            />
          ))}
        </Box>
        
        <ModelFooter />
      </Box>
    </section>
  );
};

export default OperativeModels;
