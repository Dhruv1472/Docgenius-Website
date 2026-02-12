import type { Industry } from "./types";

import HR1 from "@/assets/Real Estate/Real1.png";
import HR2 from "@/assets/Real Estate/Real2.png";
import HR3 from "@/assets/Real Estate/Real3.png";
import HR4 from "@/assets/Real Estate/Real4.png";
import HR5 from "@/assets/Real Estate/Real5.png";
import HR6 from "@/assets/Real Estate/Real6.png";

// import HR1 from "@/assets/HR/hr1.png";
// import HR2 from "@/assets/HR/hr2.png";
// import HR3 from "@/assets/HR/hr3.png";
// import HR4 from "@/assets/HR/hr4.png";
// import HR5 from "@/assets/HR/hr5.png";
// import HR6 from "@/assets/HR/hr6.png";

export const hrTeamsImages: Record<string, string> = {
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
};

export const hrTeams: Industry = {
  iconKey: "Users",
  name: "HR Teams",
  description: "Industry focused on human resources, recruitment, and employee management.",
  useCases: [
    {
      title: "Automated Recruitment, Onboarding & Performance Management",
      scenario:
        '"PeopleFirst Corp" is hiring aggressively while managing annual reviews for 500 existing employees. Their HR team is drowning in paperwork: Offer Letter Chaos: Recruiters are manually typing offer letters, leading to errors in salary figures and joining dates. Onboarding Delays: New hires receive their "Employee Handbook" and "NDAs" in separate emails, often forgetting to sign one. Review Season Bottleneck: Generating "Compensation Update Letters" for 500 staff takes two weeks of manual work.',
      solution: "DocGenius Implementation",
      description:
        "Here is how DocGenius streamlines the entire employee lifecycle:",
      steps: [
        {
          title: "1. Error-Free Offer Letters",
          featureUsed:
            "Template Editor & Child Object Mapping.",
          workflow:
            'When a candidate is moved to "Offer Stage" in Salesforce, the Recruiter selects the "Standard Offer" template.',
          additionalInfo: [
            {
              label: "Mapping",
              content:
                "The system pulls the candidate's Name, Address, and Position from the Candidate object.",
            },
            {
              label: "Compensation",
              content:
                'Crucially, it maps the "Salary Breakdown" (Base, Bonus, Stock Options) directly from the Offer object fields, ensuring zero typos in the numbers.',
            },
          ],
          imageKey: "hr1",
        },
        {
          title: "2. Negotiating the Offer (The 'Closing' Moment)",
          featureUsed: "Real-time Document Editor.",
          workflow:
            "During the final call, the candidate agrees to join only if the joining bonus is increased by $2,000. The Recruiter doesn't need to hang up and ask the Admin to edit the template. They use the Real-time Document Editor in the preview screen, update the bonus amount instantly, and generate the final PDF while still on the phone.",
          imageKey: "hr2",
        },
        {
          title: "3. The 'All-In-One' Onboarding Packet",
          featureUsed: "Merge 2 Templates.",
          workflow:
            'Instead of sending three separate emails, HR uses the Merge Template feature. DocGenius generates the personalized "Offer Letter" and automatically merges it with the standard "Non-Disclosure Agreement (NDA)" and "Employee Handbook" into a single, professional PDF packet.',
          imageKey: "hr3",
        },
        {
          title: "4. Digital Acceptance",
          featureUsed: "Signature Function.",
          workflow:
            'The packet is emailed to the candidate using the Signature Key. The candidate signs the Offer and the NDA on their mobile device using the user-friendly signature pad. The status in Salesforce automatically flips to "Offer Accepted."',
          imageKey: "hr4",
        },
        {
          title: "5. Annual Appraisal Letters (Mass Processing)",
          featureUsed: "Bulk Document Generation & Scheduling.",
          workflow:
            'It\'s March, and all 500 employees need their "Salary Increment Letter." The HR Director selects all active employees and clicks Bulk Generate. They schedule this to run at 8:00 AM on Monday so the letters are ready when they walk in. DocGenius creates 500 personalized letters in a single Zip file (or emails them individually), saving hundreds of hours.',
          imageKey: "hr5",
        },
        {
          title: "6. Confidentiality & Security",
          featureUsed: "Role-Based Access.",
          workflow:
            'HR contains sensitive salary data. HR VP (Admin User) creates and locks the "Salary Increment" templates. HR Interns (Base User) can generate "Employment Verification Letters" (which only show dates of employment) but are restricted from accessing or generating the "Compensation Update" templates.',
          imageKey: "hr6",
        },
        {
          title: "7. Automated Exit Process",
          featureUsed: "Record Triggering Flow.",
          workflow:
            'When an employee resigns, the HR manager changes the contact status to "Terminated" in Salesforce. This trigger fires a Flow that automatically generates the "Experience Letter" and "Full & Final Settlement" document, saving it to the employee\'s record and emailing a copy to the Payroll department.',
          imageKey: "hr6",
        },
      ],
    },
  ],
};
