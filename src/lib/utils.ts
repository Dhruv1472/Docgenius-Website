import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const CTA_LINKS = {
  bookDemo: "https://mvclouds.com/contact-us",
  freeTrial: "https://mvclouds.com/",
  privacyPolicy: "https://mvclouds.com/products/docgenius/privacy-policy",
  termsOfUse: "https://mvclouds.com/products/docgenius/privacy-policy",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
