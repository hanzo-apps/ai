
import React from "react";
import { productsNav, type NavSection, type NavItem } from "@/lib/constants/navigation-data";
import type { LucideIcon } from "lucide-react";
import { ProductItem } from "../navigation/products-menu/types";
import MainSection from "./feature-showcase/MainSection";
import AICloudSection from "./feature-showcase/AICloudSection";
import DXPlatformSection from "./feature-showcase/DXPlatformSection";
import IndustriesSection from "./feature-showcase/IndustriesSection";
import ServiceCards from "./feature-showcase/ServiceCards";

const section = (title: string): NavSection =>
  productsNav.find((s) => s.title === title) ?? { title, items: [] };

const toProductItems = (items: NavItem[]): ProductItem[] =>
  items.map((item) => ({
    name: item.title,
    icon: item.icon as LucideIcon,
    description: item.description ?? "",
    link: item.href,
    id: item.href,
  }));

const FeatureShowcase: React.FC = () => {
  const cloudItems = toProductItems([
    ...section("AI & Agents").items,
    ...section("Compute").items,
    ...section("Data").items,
  ]).slice(0, 11);

  const platformItems = toProductItems(section("Developer").items).slice(0, 11);

  return (
    <MainSection>
      <AICloudSection products={cloudItems} />
      <DXPlatformSection products={platformItems} />
      <IndustriesSection />
      <ServiceCards />
    </MainSection>
  );
};

export default FeatureShowcase;
