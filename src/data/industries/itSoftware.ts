import type { Industry } from "./types";

import ItSoftware1 from "@/assets/It Software/ItSoftware1.png";
import ItSoftware2 from "@/assets/It Software/ItSoftware2.png";
import ItSoftware3 from "@/assets/It Software/ItSoftware3.png";
import ItSoftware4 from "@/assets/It Software/ItSoftware4.png";
import ItSoftware5 from "@/assets/It Software/ItSoftware5.png";
import ItSoftware6 from "@/assets/It Software/ItSoftware6.png";
import ItSoftware7 from "@/assets/It Software/ItSoftware7.png";

export const itSoftwareImages: Record<string, string> = {
  itSoftware1: ItSoftware1,
  itSoftware2: ItSoftware2,
  itSoftware3: ItSoftware3,
  itSoftware4: ItSoftware4,
  itSoftware5: ItSoftware5,
  itSoftware6: ItSoftware6,
  itSoftware7: ItSoftware7,
};

export const itSoftware: Industry = {
  iconKey: "Code",
  name: "IT & Software (SaaS)",
  description:
    "Industry specializing in software platforms, subscription billing, and customer lifecycle management.",
  useCases: [
    {
      title: "The \"Quote-to-Cash\" & Automated Onboarding Cycle",
      scenario:
        '"NextGen Cloud," a growing B2B SaaS company, faces bottlenecks: Contract Complexity (Order Form, MSA, SLA sent separately), Negotiation Friction (last-minute term changes), and Onboarding Gaps (CS teams forgetting Day 1 setup guides).',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius automates the entire lifecycle from the Quote to the Customer Success launch:",
      steps: [
        {
          title: "1. Complex Subscription Quotes (Child Object Mapping)",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            "The AE selects the 'Enterprise Quote' template. DocGenius pulls Opportunity Products (line items) into a branded table, calculates Total ARR, and lists subscription start/end dates automatically.",
          additionalInfo: [
            {
              label: "Automation",
              content:
                "Maps subscription line items directly from Salesforce to prevent billing errors and ensure ARR accuracy.",
            },
          ],
          imageKey: "itSoftware1",
        },
        {
          title: "2. The 'One-Packet' Contract (Template Merging)",
          featureUsed: "Merge 2 Templates.",
          workflow:
            "Instead of multiple attachments, the AE merges the dynamic Order Form with the standard MSA and DPA into a single PDF using the Merge Template function.",
          additionalInfo: [
            {
              label: "Result",
              content:
                "Prospects receive a single professional packet that’s easy to review and sign.",
            },
          ],
          imageKey: "itSoftware2",
        },
        {
          title: "3. Closing the Deal: Live Negotiation",
          featureUsed: "Real-time Document Editor.",
          workflow:
            "On a call, the AE edits terms (e.g., change Net-30 to Net-45) directly in the DocGenius Preview via the Real-time Editor and immediately sends the updated document for signature.",
          additionalInfo: [
            {
              label: "Velocity",
              content:
                "Removes end-of-quarter friction and shortens close times without regenerating templates.",
            },
          ],
          imageKey: "itSoftware3",
        },
        {
          title: "4. Seamless E-Signature",
          featureUsed: "Signature Function.",
          workflow:
            "The packet is sent via the Signature Key; the prospect signs digitally and the signed file is saved to the Opportunity, triggering stage change to 'Closed Won'.",
          additionalInfo: [
            {
              label: "Storage",
              content:
                "Signed contracts are archived on the Opportunity record for auditability.",
            },
          ],
          imageKey: "itSoftware4",
        },
        {
          title: "5. Automated Customer Success Handoff",
          featureUsed: "Record Triggering Flow.",
          workflow:
            "When Opportunity Stage becomes 'Closed Won', a Salesforce Flow triggers DocGenius to generate a personalized 'Welcome & Onboarding Guide' and email it to the client and assigned CSM.",
          additionalInfo: [
            {
              label: "Benefit",
              content:
                "Ensures consistent Day 1 experience without manual intervention from Customer Success.",
            },
          ],
          imageKey: "itSoftware5",
        },
        {
          title: "6. Mass Renewals & Price Uplifts",
          featureUsed: "Bulk Document Generation.",
          workflow:
            "Renewals Manager selects expiring contracts and Bulk Generates 200 personalized renewal notices with a standard price uplift (Zip or individual PDFs) for distribution.",
          additionalInfo: [
            {
              label: "Scale",
              content:
                "Enables mass personalization and delivery for renewals at enterprise scale.",
            },
          ],
          imageKey: "itSoftware6",
        },
        {
          title: "7. Compliance Archiving",
          featureUsed: "External Storage Integration.",
          workflow:
            "DocGenius routes every signed MSA to Google Drive folder 'Executed Contracts/2026' automatically so Legal can access executed contracts outside Salesforce.",
          additionalInfo: [
            {
              label: "Compliance",
              content:
                "Centralized archival meets legal requirements without adding Salesforce storage overhead.",
            },
            {
              label: "Why this wins",
              content:
                "Velocity, professionalism, scalability, and billing accuracy combine to reduce time-to-revenue and minimize post-sale churn.",
            },
          ],
          imageKey: "itSoftware7",
        },
      ],
    },
  ],
};
