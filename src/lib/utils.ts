import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const CTA_LINKS = {
  bookDemo: "https://mvclouds.com/contact-us",
  freeTrial: "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tgK0000009iJZ",
  privacyPolicy: "https://mvclouds.com/products/docgenius/privacy-policy",
  termsOfUse: "https://mvclouds.com/products/docgenius/privacy-policy",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
