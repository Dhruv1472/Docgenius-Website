import type { Industry } from "./types";

import Manufacturing1 from "@/assets/Manufacturing/Manu1.png";
import Manufacturing2 from "@/assets/Manufacturing/Manu2.png";
import Manufacturing3 from "@/assets/Manufacturing/Manu3.png";
import Manufacturing4 from "@/assets/Manufacturing/Manu4.png";
import Manufacturing5 from "@/assets/Manufacturing/Manu5.png";
import Manufacturing6 from "@/assets/Manufacturing/Manu6.png";

export const manufacturingImages: Record<string, string> = {
  manufacturing1: Manufacturing1,
  manufacturing2: Manufacturing2,
  manufacturing3: Manufacturing3,
  manufacturing4: Manufacturing4,
  manufacturing5: Manufacturing5,
  manufacturing6: Manufacturing6,
};

export const manufacturing: Industry = {
  iconKey: "Factory",
  name: "Manufacturing",
  description:
    "Industry involved in the production of goods, managing bills of materials, logistics, and quality assurance.",
  useCases: [
    {
      title: "Automated Supply Chain & Quality Assurance (QA)",
      scenario:
        '"PrecisionParts Mfg" produces custom machinery components. They are facing three major bottlenecks: Complex Quoting (accurate Bills of Materials and product images), Shipping Delays (manual packing slips for 500+ daily orders), and Audit Failures (paper-based safety inspection reports).',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius automates the workflow from the factory floor to the loading dock:",
      steps: [
        {
          title: "1. Visual Quotes with Bill of Materials (BOM)",
          featureUsed: "Child Object Table & Image Support.",
          workflow:
            "When a client requests a quote for a custom engine assembly, the Sales Engineer selects the 'Quote' template. DocGenius pulls the 'Order Products' list into a detailed table showing Part Number, Unit Price, and Quantity.",
          additionalInfo: [
            {
              label: "Automation",
              content:
                "Child Objects: Line items are inserted automatically without queries, ensuring the BOM in the quote matches the order.",
            },
            {
              label: "Visuals",
              content:
                "Product images from the Product record are embedded so the client sees a photo of the finished assembly, improving close rates.",
            },
          ],
          imageKey: "manufacturing1",
        },
        {
          title: "2. Production Work Orders (The No-Code Advantage)",
          featureUsed: "Zero-Query Mapping & Drag-and-Drop.",
          workflow:
            "After signing, the job moves to production. The Production Manager generates a 'Work Order' that merges Opportunity delivery dates with Account client specs using the mapping UI—no developer or queries required.",
          additionalInfo: [
            {
              label: "Result",
              content:
                "Clear instruction sheets are created for the assembly team quickly and reliably.",
            },
          ],
          imageKey: "manufacturing2",
        },
        {
          title: "3. Quality Control (QA) Sign-Off",
          featureUsed: "Signature Function & Real-time Editor.",
          workflow:
            "An inspector evaluates finished machinery and notes a minor cosmetic scratch. Using the Real-time Editor on a tablet, the inspector adds: 'Approved with minor cosmetic blemish on side panel.' They then sign digitally with the Signature Pad.",
          additionalInfo: [
            {
              label: "Storage",
              content:
                "The signed QA Certificate is instantly attached to the asset record for traceability.",
            },
          ],
          imageKey: "manufacturing3",
        },
        {
          title: "4. High-Volume Logistics (Packing Slips)",
          featureUsed: "Bulk Document Generation & Scheduling.",
          workflow:
            "Every day at 3:30 PM DocGenius runs a scheduled Bulk Generation for all orders with status 'Ready to Ship', producing 300 packing slips in one ZIP or a single merged PDF ready for printing at 4:00 PM.",
          additionalInfo: [
            {
              label: "Scale",
              content:
                "Bulk generation prevents manual errors and speeds up warehouse throughput for hundreds of daily shipments.",
            },
          ],
          imageKey: "manufacturing4",
        },
        {
          title: "5. Invoicing & Archiving",
          featureUsed: "External Storage Integration & CSV Export.",
          workflow:
            "When an order is marked 'Shipped' DocGenius generates the Invoice and signed delivery receipts, then pushes them to AWS S3 (e.g., 'Year_2025/Invoices') to preserve Salesforce storage. Finance exports CSVs of line items for ERP analysis.",
          additionalInfo: [
            {
              label: "Compliance",
              content:
                "Long-term retention for tax audits while keeping Salesforce storage optimized; supports exports of 1,000,000+ line items.",
            },
          ],
          imageKey: "manufacturing5",
        },
        {
          title: "6. Safety Compliance (Role-Based)",
          featureUsed: "Role-Based Access & Template Security.",
          workflow:
            "The Plant Safety Officer (Admin) creates and locks the 'Incident Report' template. Floor Supervisors (Standard Users) can generate and sign reports; Base Users cannot edit sensitive templates, ensuring tamper-proof safety logs.",
          additionalInfo: [
            {
              label: "Outcome",
              content:
                "Ensures incident records remain auditable and secure while enabling rapid on-site reporting.",
            },
          ],
          imageKey: "manufacturing6",
        },
      ],
    },
  ],
};