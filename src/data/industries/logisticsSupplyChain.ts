import type { Industry } from "./types";

import Logistics1 from "@/assets/Real Estate/Real1.png";
import Logistics2 from "@/assets/Real Estate/Real2.png";
import Logistics3 from "@/assets/Real Estate/Real3.png";
import Logistics4 from "@/assets/Real Estate/Real4.png";
import Logistics5 from "@/assets/Real Estate/Real5.png";
import Logistics6 from "@/assets/Real Estate/Real6.png";

// import Logistics1 from "@/assets/Logistics Supply Chain/Logistics1.png";
// import Logistics2 from "@/assets/Logistics Supply Chain/Logistics2.png";
// import Logistics3 from "@/assets/Logistics Supply Chain/Logistics3.png";
// import Logistics4 from "@/assets/Logistics Supply Chain/Logistics4.png";
// import Logistics5 from "@/assets/Logistics Supply Chain/Logistics5.png";
// import Logistics6 from "@/assets/Logistics Supply Chain/Logistics6.png";

export const logisticsSupplyChainImages: Record<string, string> = {
  logistics1: Logistics1,
  logistics2: Logistics2,
  logistics3: Logistics3,
  logistics4: Logistics4,
  logistics5: Logistics5,
  logistics6: Logistics6,
};

export const logisticsSupplyChain: Industry = {
  iconKey: "Truck",
  name: "Logistics & Supply Chain",
  description: "Industry managing the transportation and distribution of goods.",
  useCases: [
    {
      title: "Automated Freight Management & Proof of Delivery (POD)",
      scenario:
        '"GlobalLink Logistics" manages a fleet of 200 trucks and a busy distribution center. They face three major operational headaches: Dock Delays: Trucks wait 30+ minutes while admin staff manually type out "Bills of Lading" (BOL) and "Packing Lists," leading to overtime costs. Manifest Errors: If a pallet is removed at the last minute because it was damaged, the printed manifest is wrong, causing inventory discrepancies. Lost Paperwork: Drivers lose physical delivery receipts, meaning the company can\'t bill the customer because they lack "Proof of Delivery."',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius digitizes the workflow from the Warehouse Dock to the Customer's Doorstep:",
      steps: [
        {
          title: "1. Instant Bill of Lading (BOL) Creation",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'A dispatcher assigns a shipment to a specific Load. They select the "Standard Bill of Lading" template. DocGenius automatically pulls the list of "Shipment Line Items" (Pallets, Weight, Hazmat Class) into a perfectly formatted table. It maps the Consignor (Shipper) and Consignee (Receiver) details directly from the Account records, ensuring the addresses are 100% accurate without manual typing.',
          imageKey: "logistics1",
        },
        {
          title: "2. Visual Customs Documentation",
          featureUsed: "Image Support.",
          workflow:
            'For cross-border shipments, customs inspectors need to see what is inside the crates. The "Commercial Invoice" template is configured to pull Product Images stored in Salesforce. The generated PDF includes clear photos of the cargo next to the description, speeding up customs clearance significantly.',
          imageKey: "logistics2",
        },
        {
          title: "3. The 'Dockside' Correction (Agility)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'The truck is loaded, but the forklift driver realizes one pallet of "Electronics" won\'t fit and must be left behind. The generated manifest is now wrong. Instead of cancelling the record and starting over, the Dispatcher opens the Real-time Editor in the preview. They delete the "Electronics" line item from the document table instantly and hit print. The truck leaves on time with accurate paperwork.',
          imageKey: "logistics3",
        },
        {
          title: "4. Driver Handoff & Sign-Off",
          featureUsed: "Signature Function.",
          workflow:
            'Before the driver leaves the dock, they need to accept liability for the cargo. The Dispatcher triggers the Signature Key. The driver signs on the Dispatcher\'s tablet. The "Signed Manifest" is immediately saved to the Shipment record in Salesforce.',
          imageKey: "logistics4",
        },
        {
          title: "5. Automated 'Proof of Delivery' (POD)",
          featureUsed: "Record Triggering Flow.",
          workflow:
            'The driver arrives at the customer\'s warehouse and marks the shipment status as "Delivered" on their mobile app. This status change triggers a Salesforce Flow. DocGenius runs in the background, generates a "Delivery Receipt," and emails it to the customer automatically. The customer gets their receipt seconds after the truck arrives.',
          imageKey: "logistics5",
        },
        {
          title: "6. Fleet-Wide Morning Dispatch",
          featureUsed: "Bulk Document Generation.",
          workflow:
            'Every morning at 6:00 AM, 50 trucks need their "Route Sheets." The Operations Manager uses Bulk Generation. They select the view "Today\'s Active Routes" and click one button. DocGenius generates all 50 Route Sheets in one ZIP file (or merges them into one PDF) for the printer, ready for the drivers\' morning briefing.',
          imageKey: "logistics6",
        },
        {
          title: "7. Archiving for Claims & Liability",
          featureUsed: "External Storage Integration (AWS/OneDrive).",
          workflow:
            'Logistics documents are heavy (scans, photos) and must be kept for legal reasons in case of damaged goods claims. DocGenius is set to automatically route all "Signed PODs" and "BOLs" to a folder in AWS S3 labeled by [Truck Number] / [Date]. This keeps Salesforce storage costs low while ensuring the legal team can find any document from 2024 instantly.',
          imageKey: "logistics6",
        },
      ],
    },
  ],
};
