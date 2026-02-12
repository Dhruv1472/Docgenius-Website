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
import { financialServices, financialServicesImages } from "./financialServices";
import { itSoftware } from "./itSoftware";
import { healthcare, healthcareImages } from "./healthcare";
import { hrTeams, hrTeamsImages } from "./hrTeams";
import { manufacturing } from "./manufacturing";
import { legalProfessional, legalProfessionalImages } from "./legalProfessional";
import { educationTraining, EducationTrainingImages } from "./educationTraining";
import { retailEcommerce, retailEcommerceImages } from "./retailEcommerce";
import { logisticsSupplyChain, logisticsSupplyChainImages } from "./logisticsSupplyChain";
import { governmentPublic, governmentPublicImages} from "./governmentPublic";
import { customerSupport, customerSupportImages } from "./customerSupport";

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
  ...financialServicesImages,
  ...healthcareImages,
  ...hrTeamsImages,
  ...legalProfessionalImages,
  ...EducationTrainingImages,
  ...retailEcommerceImages,
  ...logisticsSupplyChainImages,
  ...governmentPublicImages,
  ...customerSupportImages,
  // Add more when other industries have images: ...financialServicesImages, etc.
};

export function getIndustryImage(imageKey: string): string | undefined {
  return allImages[imageKey];
}
