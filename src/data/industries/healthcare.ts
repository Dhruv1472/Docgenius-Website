import type { Industry } from "./types";

// import Healthcare1 from "@/assets/Healthcare/Healthcare1.png";
// import Healthcare2 from "@/assets/Healthcare/Healthcare2.png";
// import Healthcare3 from "@/assets/Healthcare/Healthcare3.png";
// import Healthcare4 from "@/assets/Healthcare/Healthcare4.png";
// import Healthcare5 from "@/assets/Healthcare/Healthcare5.png";
// import Healthcare6 from "@/assets/Healthcare/Healthcare6.png";

import Healthcare1 from "@/assets/Real Estate/Real1.png";
import Healthcare2 from "@/assets/Real Estate/Real1.png";
import Healthcare3 from "@/assets/Real Estate/Real1.png";
import Healthcare4 from "@/assets/Real Estate/Real1.png";
import Healthcare5 from "@/assets/Real Estate/Real1.png";
import Healthcare6 from "@/assets/Real Estate/Real1.png";

export const healthcareImages: Record<string, string> = {
  healthcare1: Healthcare1,
  healthcare2: Healthcare2,
  healthcare3: Healthcare3,
  healthcare4: Healthcare4,
  healthcare5: Healthcare5,
  healthcare6: Healthcare6,
};

export const healthcare: Industry = {
  iconKey: "HeartPulse",
  name: "Healthcare",
  description: "Industry dedicated to medical services, health management, and patient care.",
  useCases: [
    {
      title: "Patient Onboarding, Consent & Discharge Automation",
      scenario:
        '"CarePlus Medical Center" manages thousands of patients and faces three critical challenges: Check-in delays (patients wait too long to sign manual consent forms), doctor burnout (physicians spend hours typing referral letters and discharge summaries, often copying and pasting medication lists manually), and data security (administrative staff must not be able to alter the legal wording of consent forms).',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius transforms the patient journey from admission to discharge:",
      steps: [
        {
          title: "1. Secure & Standardized Template Management (Admin Setup)",
          featureUsed:
            "Role-Based Access & Folder-Based Management.",
          workflow:
            'Admin User: The Compliance Officer creates the "HIPAA Consent Form" and "Surgical Authorization" templates and locks them so no one else can change the legal text. Folder Management: Templates are organized into folders like "Patient Intake," "Referrals," and "Billing" for easy access. Base User: Front Desk staff are assigned "Base User" roles; they can generate forms for signature but are blocked from editing the template itself, ensuring compliance.',
          additionalInfo: [
            {
              label: "Security",
              content:
                "Prevents unauthorized edits to legal/consent language while still enabling fast document generation at the front desk.",
            },
          ],
          imageKey: "healthcare1",
        },
        {
          title: "2. Fast Patient Admission (Check-In)",
          featureUsed: "Signature Function & Default Document Process.",
          workflow:
            'When a patient arrives, front desk staff clicks the "Check-In" button on the Patient record. DocGenius automatically generates the "General Consent Form" pre-filled with the patient’s name, DOB, and insurance details. The staff triggers the Signature Key; the patient signs digitally on a tablet. The signed PDF is instantly saved to Salesforce.',
          additionalInfo: [
            {
              label: "Automation",
              content:
                "Eliminates printing/scanning and reduces check-in time with prefilled data and immediate saving back to the record.",
            },
          ],
          imageKey: "healthcare2",
        },
        {
          title: "3. The Specialist Referral (Doctor's Workflow)",
          featureUsed: "Child Object Table & Image Support.",
          workflow:
            "Dr. Smith needs to refer a patient to a Cardiologist and send a letter that includes the patient’s medication history and a recent ECG image. She selects the “Referral Letter” template; DocGenius pulls the required data automatically.",
          additionalInfo: [
            {
              label: "Child Objects",
              content:
                'DocGenius automatically inserts a table of the patient’s "Current Medications" (Child Object) so the doctor doesn’t need to re-type lists manually.',
            },
            {
              label: "Images",
              content:
                "The latest ECG image stored on the Salesforce record is embedded directly into the document.",
            },
          ],
          imageKey: "healthcare3",
        },
        {
          title: "4. Doctor’s Custom Notes (The Human Touch)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'Before sending the referral, Dr. Smith adds a personal note for the specialist (e.g., "Please look specifically at the QRS complex in the 2nd lead.") using the Real-time Editor in preview. The note appears on the final PDF without altering the permanent medical record.',
          additionalInfo: [
            {
              label: "Control",
              content:
                "Doctors can customize per-document messaging while preserving structured clinical data integrity in Salesforce.",
            },
          ],
          imageKey: "healthcare4",
        },
        {
          title: "5. Automated Discharge Summary",
          featureUsed: "Flow Integration & External Storage.",
          workflow:
            'When the nurse updates Patient Status to "Discharged" in Salesforce, a Flow triggers DocGenius in the background to generate a "Discharge Packet" (instructions, prescriptions, follow-up dates). Because records must be retained for 7 years without clogging Salesforce storage, DocGenius routes the final PDF to a secure, HIPAA-compliant AWS S3 bucket or OneDrive folder.',
          additionalInfo: [
            {
              label: "Retention",
              content:
                "Supports long-term storage requirements and reduces Salesforce file/storage pressure while keeping records accessible for audits.",
            },
          ],
          imageKey: "healthcare5",
        },
        {
          title: "6. Insurance Claims Bulk Processing",
          featureUsed: "Bulk Document Generation & CSV Export.",
          workflow:
            "At the end of the week, Billing selects the week’s patient records and uses Bulk Generation to create 200 individual “CMS-1500 Claim Forms” in one click. Simultaneously, they export a CSV of these claims to import into accounting/billing systems.",
          additionalInfo: [
            {
              label: "Efficiency",
              content:
                "Batch output reduces manual prep work and provides structured exports for downstream processing.",
            },
          ],
          imageKey: "healthcare6",
        },
      ],
    },
  ],
};
