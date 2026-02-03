import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Landmark,
  Code,
  HeartPulse,
  Users,
  Factory,
  Scale,
  GraduationCap,
  ShoppingCart,
  Truck,
  Building,
  HeadphonesIcon,
} from "lucide-react";

import type { Industry } from "./types";
import { realEstate, realEstateImages } from "./realEstate";
import { financialServices } from "./financialServices";
import { itSoftware } from "./itSoftware";
import { healthcare } from "./healthcare";
import { hrTeams } from "./hrTeams";
import { manufacturing } from "./manufacturing";
import { legalProfessional } from "./legalProfessional";
import { educationTraining } from "./educationTraining";
import { retailEcommerce } from "./retailEcommerce";
import { logisticsSupplyChain } from "./logisticsSupplyChain";
import { governmentPublic } from "./governmentPublic";
import { customerSupport } from "./customerSupport";

// Re-export types
export type { Industry, UseCase, UseCaseStep, AdditionalInfo } from "./types";

// Combined industries list (order shown on the page)
export const industries: Industry[] = [
  realEstate,
  financialServices,
  itSoftware,
  healthcare,
  hrTeams,
  manufacturing,
  legalProfessional,
  educationTraining,
  retailEcommerce,
  logisticsSupplyChain,
  governmentPublic,
  customerSupport,
];

// Icons
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Landmark,
  Code,
  HeartPulse,
  Users,
  Factory,
  Scale,
  GraduationCap,
  ShoppingCart,
  Truck,
  Building,
  HeadphonesIcon,
};

export function getIndustryIcon(iconKey: string): LucideIcon | undefined {
  return iconMap[iconKey];
}

// Images: merge per-industry image maps (no placeholder)
const allImages: Record<string, string> = {
  ...realEstateImages,
  // Add more when other industries have images: ...financialServicesImages, etc.
};

export function getIndustryImage(imageKey: string): string | undefined {
  return allImages[imageKey];
}
