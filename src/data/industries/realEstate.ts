import type { Industry } from "./types";

import Real1 from "@/assets/Real Estate/Real1.png";
import Real2 from "@/assets/Real Estate/Real2.png";
import Real3 from "@/assets/Real Estate/Real3.png";
import Real4 from "@/assets/Real Estate/Real4.png";
import Real5 from "@/assets/Real Estate/Real5.png";
import Real6 from "@/assets/Real Estate/Real6.png";

export const realEstateImages: Record<string, string> = {
  realEstate1: Real1,
  realEstate2: Real2,
  realEstate3: Real3,
  realEstate4: Real4,
  realEstate5: Real5,
  realEstate6: Real6,
};

export const realEstate: Industry = {
  iconKey: "Building2",
  name: "Real Estate",
  description: "Industry focused on property development, sales, and management.",
  useCases: [
    {
      title: "Automated Lease Agreements & Property Sales Contracts",
      scenario:
        'Prime Estates," a real estate agency using Salesforce, struggles with the manual creation of Lease Agreements and Sales Contracts. Their agents waste time copy-pasting client names, property addresses, and terms into Word documents. They often forget to attach property photos, make errors in rental amounts, and face delays in getting signatures.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius streamlines the entire lifecycle of a property transaction:",
      steps: [
        {
          title: "1. Template Creation & Organization (Admin Setup)",
          featureUsed:
            "Template Editor (Google Doc/Internal Editor) & Folder-based Management.",
          workflow:
            'The Admin creates a master "Residential Lease Agreement" template. They use the Folder-based management to keep "Commercial Leases," "Residential Sales," and "Renewal Notices" organized separately.',
          additionalInfo: [
            {
              label: "Mapping",
              content:
                'Using the Drag and Drop mapping (Point 1), they map fields from the Property (Parent Object) and Tenant (Contact Object). They specifically map the "Rent Amount," "Lease Start Date," and "Security Deposit" fields without writing any complex queries.',
            },
          ],
          imageKey: "realEstate1",
        },
        {
          title: "2. Visuals & Dynamic Content",
          featureUsed: "Image Support & Child Object Mapping.",
          workflow:
            "The template is configured to automatically pull the primary photo of the house from Salesforce (or an external URL) and place it at the top of the contract.",
          additionalInfo: [
            {
              label: "Complex Data",
              content:
                "If there are multiple co-tenants, the Child Object Table feature automatically lists all names and contact details in a neat table within the document.",
            },
          ],
          imageKey: "realEstate2",
        },
        {
          title: "3. One-Click Generation for Agents",
          featureUsed: "Default Document Process / Button Generation.",
          workflow:
            'An agent is on a Property Record page in Salesforce. Instead of manually typing a contract, they simply click a custom "Generate Lease" button.',
          additionalInfo: [
            {
              label: "Automation",
              content:
                "DocGenius automatically selects the correct template, pulls the live data, and prepares the PDF.",
            },
          ],
          imageKey: "realEstate3",
        },
        {
          title: '4. The "Negotiation" Phase (Crucial Differentiator)',
          featureUsed: "Real-time Document Editor.",
          workflow:
            "During the preview, the agent realizes the client negotiated a slightly lower rent or a different move-in date. Instead of going back to Salesforce to update the record and re-generate the whole document, the agent uses the Real-time Document Editor. They modify the specific rent value directly in the preview.",
          additionalInfo: [
            {
              label: "Result",
              content:
                "The specific document is updated instantly for the client without altering the master template.",
            },
          ],
          imageKey: "realEstate4",
        },
        {
          title: "5. Closing the Deal: Integrated E-Signature",
          featureUsed: "Signature Function.",
          workflow:
            "Once the document is perfect, the agent uses the Signature Key mapping. The document is sent directly to the tenant's email. The tenant opens it, signs using the user-friendly signature pad, and the signed document is instantly routed back to Salesforce.",
          imageKey: "realEstate5",
        },
        {
          title: "6. Storage, Distribution & Bulk Operations",
          featureUsed:
            "External Storage Integration & Email",
          workflow:
            'Internal: The signed PDF is automatically attached to the Salesforce Opportunity record under "Files." || External: A copy is simultaneously pushed to the agency’s Google Drive or Dropbox into a folder named after the property address (using the Dynamic Naming feature). || Client Copy: The agent emails the final PDF to the tenant directly from the DocGenius interface.',
          // additionalInfo: [
          //   {
          //     label: "Storage Options and Client Distribution",
          //     content:
          //       'The signed PDF is automatically attached to the Salesforce Opportunity record under "Files."',
          //   },
          // ],
          imageKey: "realEstate6",
        },
        {
          title: "7. Bulk Renewal Notices (Seasonal Activity)",
          featureUsed:
            "Bulk Document Generation",
          workflow:
            'At the end of the month, the Property Manager selects 50 tenants whose leases are expiring. Using Bulk Generation, they select the "Lease Renewal Offer" template. DocGenius generates all 50 letters in one click and delivers them as a ZIP file (or individual downloads) to be mailed or emailed out.',
          // additionalInfo: [
          //   {
          //     label: "Storage Options and Client Distribution",
          //     content:
          //       'The signed PDF is automatically attached to the Salesforce Opportunity record under "Files."',
          //   },
          // ],
          imageKey: "realEstate6",
        },
      ],
    },
  ],
};
