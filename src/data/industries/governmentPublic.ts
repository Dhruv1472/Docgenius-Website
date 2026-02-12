import type { Industry } from "./types";

import Gov1 from "@/assets/Real Estate/Real1.png";
import Gov2 from "@/assets/Real Estate/Real2.png";
import Gov3 from "@/assets/Real Estate/Real3.png";
import Gov4 from "@/assets/Real Estate/Real4.png";
import Gov5 from "@/assets/Real Estate/Real5.png";
import Gov6 from "@/assets/Real Estate/Real6.png";

// import Gov1 from "@/assets/Government Public/Gov1.png";
// import Gov2 from "@/assets/Government Public/Gov2.png";
// import Gov3 from "@/assets/Government Public/Gov3.png";
// import Gov4 from "@/assets/Government Public/Gov4.png";
// import Gov5 from "@/assets/Government Public/Gov5.png";
// import Gov6 from "@/assets/Government Public/Gov6.png";

export const governmentPublicImages: Record<string, string> = {
  government1: Gov1,
  government2: Gov2,
  government3: Gov3,
  government4: Gov4,
  government5: Gov5,
  government6: Gov6,
};

export const governmentPublic: Industry = {
  iconKey: "Building",
  name: "Government & Public",
  description: "Industry involving government services and public administration.",
  useCases: [
    {
      title: "Citizen Permitting, Licensing & Grant Management",
      scenario:
        'The "Department of Public Works (DPW)" for a large city is struggling with a backlog of building permits and business license renewals. The Bottleneck: Clerks are manually typing permits, leading to typos in addresses and legal descriptions. Compliance Risk: Junior staff sometimes accidentally delete mandatory legal disclaimers from permit templates. Storage Costs: Storing millions of historical permit PDFs in Salesforce is blowing their budget.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius modernizes the workflow from the service counter to the archive:",
      steps: [
        {
          title: "1. Security & Template Control (Role-Based Access)",
          featureUsed: "Role-Based Access & Folder Management.",
          workflow:
            'Government documents are legal instruments. Admin User: The Senior Compliance Officer creates the "Master Building Permit" and "Grant Award Letter" templates. They lock the legal disclaimers so no one can edit them. Folder Management: Templates are sorted into strict folders: "Business Licensing," "Construction Permits," and "Social Services," ensuring a clerk never picks the wrong form. Base User: The front-desk clerks can generate the documents to serve citizens but cannot alter the underlying template structure.',
          imageKey: "government1",
        },
        {
          title: "2. Complex Permit Generation (No-Code Mapping)",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'A citizen applies for a "Restaurant Renovation Permit." This document must list the property details (Parent Object) and every specific "Code Variance" or "Inspection Requirement" (Child Objects) associated with the application. Using the Child Object Table, DocGenius automatically pulls a neat list of all 15 required inspections into the permit PDF without the IT department needing to write SQL queries.',
          imageKey: "government2",
        },
        {
          title: "3. Over-the-Counter Service (The 'Live' Correction)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'A citizen is at the counter to pick up their Business License. The clerk generates the preview, but the citizen notices their Suite Number is listed as "100" instead of "100-B." Instead of rejecting the application and restarting a 2-day process, the clerk uses the Real-time Editor. They correct the Suite Number instantly in the preview, and the license is ready to print immediately.',
          imageKey: "government3",
        },
        {
          title: "4. Immediate Ratification (Signature)",
          featureUsed: "Signature Function.",
          workflow:
            'The permit requires the applicant to acknowledge local noise ordinances. The clerk triggers the Signature Key. The applicant signs on the tablet at the government counter. The signed PDF is instantly saved as the "Official Record" in Salesforce.',
          imageKey: "government4",
        },
        {
          title: "5. Automated Approval Workflows",
          featureUsed: "Record Triggering Flow.",
          workflow:
            'When a "Grant Application" status is changed to "Approved" by the City Council in Salesforce, a Flow triggers DocGenius to automatically generate the "Grant Acceptance Contract," attach it to the record, and email it to the non-profit organization receiving the funds—zero manual effort required.',
          imageKey: "government5",
        },
        {
          title: "6. Mass Tax/Renewal Notices",
          featureUsed: "Bulk Document Generation & Scheduling.",
          workflow:
            'It is January, and the city needs to send "Business License Renewal Notices" to 15,000 local businesses. The Department Head selects the list view of "Active Businesses." They schedule the job for Friday night. DocGenius generates 15,000 personalized PDF notices and delivers them in a ZIP file to the mailroom for printing and posting.',
          imageKey: "government6",
        },
        {
          title: "7. Archiving & Freedom of Information (FOIA) Compliance",
          featureUsed: "External Storage Integration (AWS/GovCloud).",
          workflow:
            'Public records must be kept for 7-10 years. Salesforce storage is expensive for this volume. DocGenius is configured to automatically route every generated Permit and License to a secure AWS S3 Bucket (or SharePoint/OneDrive). Dynamic Naming: Files are named systematically (e.g., Permit_2025_[LicenseID]_[Date].pdf) so they can be easily retrieved if a citizen files a Freedom of Information Act (FOIA) request.',
          imageKey: "government6",
        },
      ],
    },
  ],
};
