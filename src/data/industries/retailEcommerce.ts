import type { Industry } from "./types";

import ReatilEcom1 from "@/assets/Real Estate/Real1.png";
import ReatilEcom2 from "@/assets/Real Estate/Real2.png";
import ReatilEcom3 from "@/assets/Real Estate/Real3.png";
import ReatilEcom4 from "@/assets/Real Estate/Real4.png";
import ReatilEcom5 from "@/assets/Real Estate/Real5.png";
import ReatilEcom6 from "@/assets/Real Estate/Real6.png";

// import ReatilEcom1 from "@/assets/Retail Ecommerce/ReatilEcom1.png";
// import ReatilEcom2 from "@/assets/Retail Ecommerce/ReatilEcom2.png";
// import ReatilEcom3 from "@/assets/Retail Ecommerce/ReatilEcom3.png";
// import ReatilEcom4 from "@/assets/Retail Ecommerce/ReatilEcom4.png";
// import ReatilEcom5 from "@/assets/Retail Ecommerce/ReatilEcom5.png";
// import ReatilEcom6 from "@/assets/Retail Ecommerce/ReatilEcom6.png";

export const retailEcommerceImages: Record<string, string> = {
  retailEcommerce1: ReatilEcom1,
  retailEcommerce2: ReatilEcom2,
  retailEcommerce3: ReatilEcom3,
  retailEcommerce4: ReatilEcom4,
  retailEcommerce5: ReatilEcom5,
  retailEcommerce6: ReatilEcom6,
};

export const retailEcommerce: Industry = {
  iconKey: "ShoppingCart",
  name: "Retail & E-Commerce",
  description: "Industry involved in the sale of goods and services to consumers.",
  useCases: [
    {
      title: "High-Volume Fulfillment & Wholesale B2B Ordering",
      scenario:
        '"UrbanStyle Global," a fashion retailer, operates on two fronts: D2C (Direct to Consumer): They ship 500+ individual orders daily from their website. B2B (Wholesale): They sell bulk inventory to boutique stores. The Pain Points: Shipping Bottlenecks: The warehouse team manually prints packing slips one by one, causing delays. Boring B2B Quotes: Their wholesale catalogs are just text lists without images, failing to impress boutique buyers. Returns Chaos: Generating Return Merchandise Authorization (RMA) forms takes too long for customer support agents.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius automates the workflow from the warehouse floor to the boutique showroom:",
      steps: [
        {
          title: "1. The 'Visual' Wholesale Quote",
          featureUsed: "Child Object Table & Image Support.",
          workflow:
            'A boutique buyer requests a quote for the "Summer Collection." The Sales Rep selects the "Visual Quote" template. DocGenius maps the "Opportunity Products" (Child) to the Quote. Crucially, the system pulls the Product Image URL from the Salesforce Product record. The buyer receives a stunning PDF catalog where every line item includes a thumbnail photo of the dress or shirt, the SKU, and the bulk price, significantly increasing the conversion rate.',
          imageKey: "retailEcommerce1",
        },
        {
          title: "2. Negotiating the Bulk Deal",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'The boutique buyer loves the catalog but says, "I\'ll sign right now if you give me an extra 2% discount on the Denim line." The Sales Rep doesn\'t need to recalculate and re-upload. They open the Real-time Editor in the preview, manually adjust the "Total Price" field to reflect the discount, and hit send. The deal is closed instantly.',
          imageKey: "retailEcommerce2",
        },
        {
          title: "3. High-Speed Warehouse Fulfillment (Packing Slips)",
          featureUsed: "Bulk Document Generation & Scheduling.",
          workflow:
            'Every day at 2:00 PM, the shipping truck arrives to pick up online orders. The Warehouse Manager uses the Schedule function. Trigger: At 1:30 PM daily, DocGenius scans for all Orders with status "Ready to Pick." Action: It runs a Bulk Generation of 500+ "Packing Slips." Output: The manager gets a single ZIP file containing all 500 PDFs (or one merged PDF). They print them in one batch, saving hours of manual clicking.',
          imageKey: "retailEcommerce3",
        },
        {
          title: "4. One-Click RMA (Returns Management)",
          featureUsed: "Default Document Process Button.",
          workflow:
            'A customer calls support to return a damaged shirt. Speed is key to customer satisfaction. The support agent stays on the Case record and clicks the custom "Generate RMA" button. DocGenius instantly runs the pre-defined process: it selects the "Return Label" template, generates the PDF, saves it to the Case, and emails it to the customer—all in a single click.',
          imageKey: "retailEcommerce4",
        },
        {
          title: "5. Inventory Planning & Analytics",
          featureUsed: "CSV Export.",
          workflow:
            'The Inventory Planner needs to know exactly which SKUs sold the most last month to plan for next season. Instead of asking IT for a report, they use DocGenius to Export the "Order Line Items" (up to 1,000,000 rows) into a CSV. They can now pivot this data in Excel to see that "Red Summer Dresses" were the top seller.',
          imageKey: "retailEcommerce5",
        },
        {
          title: "6. Archiving for Tax Audits",
          featureUsed: "External Storage Integration.",
          workflow:
            'Invoices must be kept for 7 years. DocGenius automatically routes every generated "Tax Invoice" to a specific Dropbox folder named "FY2025_Invoices." This keeps the Salesforce file storage limit from hitting its cap while ensuring compliance.',
          imageKey: "retailEcommerce6",
        },
      ],
    },
  ],
};
