import type { Industry } from "./types";

// import FinancialServices1 from "@/assets/Financial Services/FinancialServices1.png";
// import FinancialServices2 from "@/assets/Financial Services/FinancialServices2.png";
// import FinancialServices3 from "@/assets/Financial Services/FinancialServices3.png";
// import FinancialServices4 from "@/assets/Financial Services/FinancialServices4.png";
// import FinancialServices5 from "@/assets/Financial Services/FinancialServices5.png";
// import FinancialServices6 from "@/assets/Financial Services/FinancialServices6.png";

import FinancialServices1 from "@/assets/Real Estate/Real1.png";
import FinancialServices2 from "@/assets/Real Estate/Real1.png";
import FinancialServices3 from "@/assets/Real Estate/Real1.png";
import FinancialServices4 from "@/assets/Real Estate/Real1.png";
import FinancialServices5 from "@/assets/Real Estate/Real1.png";
import FinancialServices6 from "@/assets/Real Estate/Real1.png";

export const financialServicesImages: Record<string, string> = {
  financialServices1: FinancialServices1,
  financialServices2: FinancialServices2,
  financialServices3: FinancialServices3,
  financialServices4: FinancialServices4,
  financialServices5: FinancialServices5,
  financialServices6: FinancialServices6,
};

export const financialServices: Industry = {
  iconKey: "Landmark",
  name: "Financial Services",
  description: "Industry providing banking, investment, and insurance services.",
  useCases: [
    {
      title: "Automated Wealth Management Reporting & Loan Processing",
      scenario:
        '"Summit Financial Solutions" offers wealth management and loan services. They are struggling with two major issues: 1.Quarterly Reporting: It takes weeks to manually compile investment performance reports for thousands of clients, often leading to data entry errors. 2. Loan Closings: The loan approval process is slow because creating the final "Loan Agreement" requires merging data from multiple sources (Credit Score, Collateral, Co-borrower details), and getting physical signatures is tedious.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius automates the workflow for financial advisors and loan officers:",
      steps: [
        {
          title: "1. Compliance & Template Security (Admin Setup)",
          featureUsed: "Role-Based Access.",
          workflow:
            'In finance, regulatory disclaimers cannot be changed by just anyone. The Admin User creates the locked "Master Loan Agreement" and "Quarterly Statement" templates. Standard Users (Senior Financial Advisors) can edit specific clauses if authorized. Base Users (Junior Analysts) can only generate the documents to send to clients but cannot alter the legal wording, ensuring strict compliance.',
          additionalInfo: [
            {
              label: "Outcome",
              content:
                "Templates stay consistent across the firm while still allowing controlled edits where permitted.",
            },
          ],
          imageKey: "financialServices1",
        },
        {
          title: "2. Complex Portfolio Reporting",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'For the "Quarterly Investment Report," the system needs to list every stock transaction made in the last 3 months.',
          additionalInfo: [
            {
              label: "Automation",
              content:
                'Using the Child Object Table feature, the advisor maps the "Transactions" object (Child) to the "Account" object (Parent). DocGenius automatically pulls a neat table of 50+ transactions (Date, Ticker, Buy/Sell, Amount) into the PDF without writing a single line of code or SOQL query.',
            },
          ],
          imageKey: "financialServices2",
        },
        {
          title: '3. The "Closing Table" Negotiation',
          featureUsed: "Real-time Document Editor.",
          workflow:
            "A Loan Officer is reviewing a mortgage contract with a high-net-worth client. The client agrees to sign if the origination fee is reduced by 0.5%. Instead of delaying the closing to redraft the contract, the Loan Officer uses the Real-time Editor during the preview stage and adjusts the fee amount directly in the document.",
          additionalInfo: [
            {
              label: "Result",
              content:
                "The change is reflected instantly, and the deal proceeds immediately.",
            },
          ],
          imageKey: "financialServices3",
        },
        {
          title: "4. Securing the Deal (E-Signature)",
          featureUsed: "Signature Function.",
          workflow:
            "Once the fee is adjusted, the document is generated. The Signature Key feature triggers the signature pad. The client signs digitally on a tablet in the office (or via email).",
          additionalInfo: [
            {
              label: "Storage",
              content:
                "The signed PDF is instantly saved back to the Salesforce Opportunity record.",
            },
          ],
          imageKey: "financialServices4",
        },
        {
          title: "5. High-Volume Monthly Statements",
          featureUsed: "Bulk Generation, Scheduling & CSV Export.",
          workflow:
            'Scheduling: The operations team sets a Schedule for the 1st of every month to generate "Account Statements." Bulk Action: DocGenius processes 10,000+ client records automatically in the background. Format: It generates a formatted PDF for the client to read and a corresponding CSV export (supporting up to 1,000,000 records) for the internal auditing team to analyze data trends.',
          additionalInfo: [
            {
              label: "Scale",
              content:
                "Bulk generation runs asynchronously so teams can produce large batches without manual effort or timeouts.",
            },
          ],
          imageKey: "financialServices5",
        },
        {
          title: "6. Secure Archiving for Audits",
          featureUsed: "External Storage Integration.",
          workflow:
            "Financial regulations often require off-site backups. As soon as the statements are generated, DocGenius automatically routes a copy to a secure AWS S3 Bucket or OneDrive folder dedicated to “Compliance Audits 2025,” keeping Salesforce storage limits in check while maintaining a permanent audit trail.",
          additionalInfo: [
            {
              label: "Compliance",
              content:
                "Creates a reliable, searchable audit trail outside Salesforce while staying within storage limits.",
            },
          ],
          imageKey: "financialServices6",
        },
      ],
    },
  ],
};
