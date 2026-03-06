import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const CTA_LINKS = {
  bookDemo: "https://mvclouds.com/contact-us",
  freeTrial: "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tgK0000009r6j",
  privacyPolicy: "https://mvclouds.com/privacypolicy",
  termsOfUse: "https://mvclouds.com/privacypolicy",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
