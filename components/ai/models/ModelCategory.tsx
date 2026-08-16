import React from "react";
import ModelCategoryCard from "./ModelCategoryCard";
import { Box } from '@hanzo/ui'

interface ModelData {
  name: string;
  provider: string;
  features: string[];
  description?: string;
}

interface ModelCategoryProps {
  category: {
    name: string;
    description: string;
    models: ModelData[];
  };
  categoryIndex: number;
}

const ModelCategory = ({ category, categoryIndex }: ModelCategoryProps) => {
  return (
    <Box key={categoryIndex} className="mb-20">
      <h3 className="text-2xl font-bold text-[var(--white)] mb-4">{category.name}</h3>
      <p className="text-foreground/80 mb-8">{category.description}</p>
      
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.models.map((model, modelIndex) => (
          <ModelCategoryCard 
            key={modelIndex} 
            model={model} 
            modelIndex={modelIndex} 
            categoryIndex={categoryIndex}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ModelCategory;