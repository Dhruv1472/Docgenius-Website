import type { Industry } from "./types";

import Support1 from "@/assets/Real Estate/Real1.png";
import Support2 from "@/assets/Real Estate/Real2.png";
import Support3 from "@/assets/Real Estate/Real3.png";
import Support4 from "@/assets/Real Estate/Real4.png";
import Support5 from "@/assets/Real Estate/Real5.png";
import Support6 from "@/assets/Real Estate/Real6.png";

// import Support1 from "@/assets/Customer Support/Support1.png";
// import Support2 from "@/assets/Customer Support/Support2.png";
// import Support3 from "@/assets/Customer Support/Support3.png";
// import Support4 from "@/assets/Customer Support/Support4.png";
// import Support5 from "@/assets/Customer Support/Support5.png";
// import Support6 from "@/assets/Customer Support/Support6.png";

export const customerSupportImages: Record<string, string> = {
  customerSupport1: Support1,
  customerSupport2: Support2,
  customerSupport3: Support3,
  customerSupport4: Support4,
  customerSupport5: Support5,
  customerSupport6: Support6,
};

export const customerSupport: Industry = {
  iconKey: "HeadphonesIcon",
  name: "Customer Support",
  description: "Industry focused on customer service and support operations.",
  useCases: [
    {
      title: "Automated Service Recovery & Warranty Management",
      scenario:
        '"TechGuard Support" handles thousands of tickets for electronics repairs. They face three major challenges: Slow RMA Process: Agents spend 15 minutes manually creating "Return Merchandise Authorization" (RMA) forms, copying data from the Case to a Word doc. Inconsistent Communication: Junior agents often send emails with typos or forget to attach the "Warranty Terms," leading to legal disputes. Field Service Delays: When a technician is dispatched, they often arrive without a clear "Work Order" detailing the customer\'s specific issue.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius streamlines the workflow from the initial complaint to the final resolution:",
      steps: [
        {
          title: "1. One-Click RMA Generation (Speed)",
          featureUsed: "Default Document Process / Button Generation.",
          workflow:
            'A customer calls to return a defective laptop. The agent stays on the Case record and simply clicks the "Generate RMA" button. DocGenius instantly runs a pre-defined process: Selects the "RMA Form" template, Pulls the Customer Name, Shipping Address, and Case Number, Generates the PDF, Attaches it to the Case, Emails it to the customer. Time Saved: Reduced from 15 minutes to 5 seconds.',
          imageKey: "customerSupport1",
        },
        {
          title: "2. Visual Troubleshooting Guides",
          featureUsed: "Image Support.",
          workflow:
            'A customer is struggling to install a part. The agent wants to send a guide. The agent selects the "Installation Guide" template. DocGenius automatically pulls the Product Image and "Diagram" stored in the Product object in Salesforce and embeds them into the document. The customer receives a PDF with clear, high-quality photos specific to the exact model they purchased.',
          imageKey: "customerSupport2",
        },
        {
          title: "3. On-Site Work Orders (Field Service)",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'The support agent needs to dispatch a technician. The technician needs a list of all reported "Defects" and "Required Parts." Using the Child Object Table, the "Work Order" document automatically lists every comment and defect logged on the Case (Child Object) in a neat table. The technician gets a clear, easy-to-read list of what to fix without the agent needing to type it out.',
          imageKey: "customerSupport3",
        },
        {
          title: "4. The 'Apology' Letter (Personalization)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'A VIP customer is angry because their repair was delayed. A standard form letter will make them angrier. The Support Manager generates the "Apology Letter" template. Before sending, they use the Real-time Editor in the preview window to add a personal note: "Dear John, I am personally tracking this shipment to ensure it arrives by Tuesday." This personal touch saves the relationship.',
          imageKey: "customerSupport4",
        },
        {
          title: "5. Service Acknowledgement (Sign-Off)",
          featureUsed: "Signature Function.",
          workflow:
            'The technician finishes the repair at the customer\'s house. The technician opens the "Service Report" on their iPad using DocGenius. The customer signs the screen using the Signature Pad to confirm the work is done. The signed PDF is instantly uploaded to Salesforce, closing the ticket.',
          imageKey: "customerSupport5",
        },
        {
          title: "6. Bulk Recall Notices",
          featureUsed: "Bulk Document Generation.",
          workflow:
            'A specific batch of batteries is found to be defective. "TechGuard" needs to notify 5,000 customers immediately. The Support Lead selects the list of affected Cases/Assets. Using Bulk Generation, they create 5,000 personalized "Safety Recall Notices" in minutes and email them out automatically.',
          imageKey: "customerSupport6",
        },
        {
          title: "7. Knowledge Base Archiving",
          featureUsed: "External Storage Integration.",
          workflow:
            'To prevent Salesforce storage limits from exploding with thousands of PDF attachments, DocGenius automatically pushes all closed "RMA Forms" and "Service Reports" to a Google Drive folder named "Support_Archives_2025," keeping the CRM fast and lightweight.',
          imageKey: "customerSupport6",
        },
      ],
    },
  ],
};
