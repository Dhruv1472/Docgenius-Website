import type { Industry } from "./types";

import EduTrain1 from "@/assets/Real Estate/Real1.png";
import EduTrain2 from "@/assets/Real Estate/Real2.png";
import EduTrain3 from "@/assets/Real Estate/Real3.png";
import EduTrain4 from "@/assets/Real Estate/Real4.png";
import EduTrain5 from "@/assets/Real Estate/Real5.png";
import EduTrain6 from "@/assets/Real Estate/Real6.png";

// import EduTrain1 from "@/assets/Education Training/EduTrain1.png";
// import EduTrain2 from "@/assets/Education Training/EduTrain2.png";
// import EduTrain3 from "@/assets/Education Training/EduTrain3.png";
// import EduTrain4 from "@/assets/Education Training/EduTrain4.png";
// import EduTrain5 from "@/assets/Education Training/EduTrain5.png";
// import EduTrain6 from "@/assets/Education Training/EduTrain6.png";

export const EducationTrainingImages: Record<string, string> = {
  EducationTraining1: EduTrain1,
  EducationTraining2: EduTrain2,
  EducationTraining3: EduTrain3,
  EducationTraining4: EduTrain4,
  EducationTraining5: EduTrain5,
  EducationTraining6: EduTrain6,
};

export const educationTraining: Industry = {
  iconKey: "GraduationCap",
  name: "Education & Training",
  description: "Industry focused on learning, training, and educational services.",
  useCases: [
    {
      title: "Automated Admissions, Transcripts & Certification",
      scenario:
        '"Horizon University" manages 10,000 students and thousands of applicants. The Registrar\'s office is overwhelmed: Admissions Lag: Acceptance letters are sent manually, delaying the enrollment of top students. Transcript Errors: Creating transcripts requires pulling data from multiple semesters, often leading to copy-paste errors in grades. Certification Bottleneck: Printing and mailing thousands of diplomas/certificates at graduation takes weeks.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius modernizes the student lifecycle from applicant to alumni:",
      steps: [
        {
          title: "1. The 'Perfect' Acceptance Packet",
          featureUsed: "Merge 2 Templates.",
          workflow:
            'When an applicant is marked "Accepted" in Salesforce, the admissions officer doesn\'t just send a letter. They use the Merge Template feature. Doc 1: The personalized "Acceptance Letter" (mapped with the student\'s name and scholarship amount). Doc 2: The "Student Code of Conduct & Housing Guide" (standardized PDF). DocGenius merges them into one professional "Welcome Packet" PDF, ensuring the student gets all necessary info in one file.',
          imageKey: "EducationTraining1",
        },
        {
          title: "2. Generating Complex Transcripts (No Code)",
          featureUsed: "Child Object Table & Zero-Query Mapping.",
          workflow:
            'A student requests an official transcript. This document must list every course taken over 4 years, organized by semester. The Registrar uses the Child Object Table feature. Parent: Student Contact Record. Child: Course Connections/Grades Object. DocGenius automatically builds a formatted table listing Course Name, Credits, and Final Grade for 40+ courses without the Registrar writing a single SOQL query.',
          imageKey: "EducationTraining2",
        },
        {
          title: "3. Student Enrollment & Liability Forms",
          featureUsed: "Signature Function.",
          workflow:
            'Before a student can go on a field trip or join the sports team, they (or their parents) need to sign a liability waiver. The document is generated and sent via the Signature Key. The student signs on their phone. The system automatically stores the signed PDF in the student\'s Salesforce record, ensuring the university is legally protected.',
          imageKey: "EducationTraining3",
        },
        {
          title: "4. Graduation Day: Bulk Diploma Generation",
          featureUsed: "Bulk Document Generation.",
          workflow:
            'It is May, and 800 students are graduating. The Registrar selects the "Graduating Class of 2025" list view. They click Bulk Generate using the "Diploma" template. DocGenius generates 800 high-resolution PDFs (or a Zip file) in minutes, ready for printing.',
          imageKey: "EducationTraining4",
        },
        {
          title: "5. Personalized Training Certificates (Corporate Training)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            'A corporate trainer is finalizing "Completion Certificates" for a leadership workshop. They notice one participant\'s name is spelled "Jon" in Salesforce, but the attendee mentioned it should be "Jonathan" on the certificate. Instead of updating the Salesforce record and re-running the process, the trainer uses the Real-time Editor in the preview window. They correct the name to "Jonathan" instantly on the document and hit print/send.',
          imageKey: "EducationTraining5",
        },
        {
          title: "6. Government Reporting & Census",
          featureUsed: "CSV Export.",
          workflow:
            'The university needs to submit a demographic report of all enrolled students to the Department of Education. Instead of buying a separate reporting tool, the Data Analyst uses DocGenius to Export the student records (up to 1,000,000 rows) into a CSV or single-sheet format that matches the government\'s required layout.',
          imageKey: "EducationTraining6",
        },
        {
          title: "7. Long-Term Record Archiving",
          featureUsed: "External Storage Integration.",
          workflow:
            'Student records must be kept for decades. Storing thousands of PDFs in Salesforce is too expensive. DocGenius is configured to automatically route all "Final Transcripts" and "Diplomas" to a specific Google Drive or AWS bucket named "Alumni_Records_2025". This keeps Salesforce lean while keeping records accessible.',
          imageKey: "EducationTraining6",
        },
      ],
    },
  ],
};
