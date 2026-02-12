import type { Industry } from "./types";

import Legal1 from "@/assets/Real Estate/Real1.png";
import Legal2 from "@/assets/Real Estate/Real2.png";
import Legal3 from "@/assets/Real Estate/Real3.png";
import Legal4 from "@/assets/Real Estate/Real4.png";
import Legal5 from "@/assets/Real Estate/Real5.png";
import Legal6 from "@/assets/Real Estate/Real6.png";

// import Legal1 from "@/assets/Legal Professional/Legal1.png";
// import Legal2 from "@/assets/Legal Professional/Legal2.png";
// import Legal3 from "@/assets/Legal Professional/Legal3.png";
// import Legal4 from "@/assets/Legal Professional/Legal4.png";
// import Legal5 from "@/assets/Legal Professional/Legal5.png";
// import Legal6 from "@/assets/Legal Professional/Legal6.png";

export const legalProfessionalImages: Record<string, string> = {
  legalProfessional1: Legal1,
  legalProfessional2: Legal2,
  legalProfessional3: Legal3,
  legalProfessional4: Legal4,
  legalProfessional5: Legal5,
  legalProfessional6: Legal6,
};

export const legalProfessional: Industry = {
  iconKey: "Scale",
  name: "Legal & Professional",
  description: "Industry providing legal services, consulting, and professional advice.",
  useCases: [
    {
      title: "Automated Client Retainer Management & Case Filing",
      scenario:
        '"Lexicon Legal Partners," a mid-sized law firm, faces three critical risks: Version Control Errors: Associates often use outdated versions of the "Master Services Agreement" (MSA), exposing the firm to liability. Slow Onboarding: Generating a comprehensive Retainer Agreement involves manually merging data from the Client Intake form, the specific Case details, and the Fee Structure, taking hours of non-billable time. Negotiation Friction: Partners often have to redraft entire PDFs just to change one clause during a client meeting.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius optimizes the workflow for attorneys and paralegals:",
      steps: [
        {
          title: "1. Practice Area Template Organization",
          featureUsed:
            "Folder-based Template Management.",
          workflow:
            'Law firms handle different types of law (Corporate, Family, Litigation). The firm uses Folders to separate templates. The "Corporate" folder contains "M&A Agreements" and "Shareholder Resolutions," while the "Litigation" folder contains "Affidavits" and "Court Filings." This ensures an associate never accidentally selects a Family Law template for a Corporate client.',
          imageKey: "legalProfessional1",
        },
        {
          title: "2. Assembling the 'Perfect' Contract (The Merge)",
          featureUsed: "Merge 2 Templates.",
          workflow:
            'Every client needs a specific "Engagement Letter" (outlining the scope of this specific case) and a standard "Terms of Business" (standard firm policies). Instead of managing one giant, unmanageable template, the firm keeps them separate. When generating the document, the Attorney selects the specific Engagement Letter and DocGenius automatically Merges the standard Terms of Business to the end. The client receives one seamless 20-page PDF.',
          imageKey: "legalProfessional2",
        },
        {
          title: "3. Detailed Case Data without Code",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'A "Case Brief" needs to list all involved parties (Plaintiffs, Defendants, Witnesses) which are stored as separate records in Salesforce. Using the Child Object Table, the paralegal maps the "Case Parties" object to the document. DocGenius generates a structured table listing Name, Role, and Contact Info for every person involved in the case, ensuring no one is missed.',
          imageKey: "legalProfessional3",
        },
        {
          title: "4. The 'Boardroom' Negotiation (Redlining)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'A Partner is in a meeting with a high-profile client who agrees to sign the retainer if the "Termination Notice" period is changed from 30 days to 15 days. The Partner opens the DocGenius Preview. Using the Real-time Editor, they modify the text of that specific clause instantly. They do not need to go back to Salesforce data or edit the master template. The change applies only to this specific contract.',
          imageKey: "legalProfessional4",
        },
        {
          title: "5. Secure Execution (E-Signature)",
          featureUsed: "Signature Function.",
          workflow:
            'Once the clause is updated, the Partner hits "Generate." The document is sent to the client via the Signature Key feature. The client signs on their smartphone, and the executed contract is immediately routed back to Salesforce.',
          imageKey: "legalProfessional5",
        },
        {
          title: "6. Compliance & Ethical Walls",
          featureUsed:
            "Role-Based Access.",
          workflow:
            'To prevent "Unauthorized Practice of Law" or data breaches, the firm implements role-based access. Admin: The Managing Partner controls the master templates. Standard User: Senior Attorneys can edit templates and generate documents. Base User: Paralegals can generate documents for review but are restricted from editing the legal language of the templates themselves.',
          imageKey: "legalProfessional6",
        },
        {
          title: "7. Automated Archiving (Matter Management)",
          featureUsed:
            "External Storage Integration & Dynamic Naming.",
          workflow:
            'The firm uses OneDrive to organize files by "Matter Number." DocGenius automatically names the file: [Case Number] - Retainer - [Client Name] - [Date].pdf. The file is automatically saved to the specific OneDrive folder for that Case Number, ensuring the firm maintains a compliant audit trail outside of Salesforce.',
          imageKey: "legalProfessional6",
        },
      ],
    },
  ],
};
