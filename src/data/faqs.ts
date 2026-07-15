export type FAQItem = {
  question: string;
  answer: string;
};

export const generalFaqs: FAQItem[] = [
  {
    question: "What is DocGenius?",
    answer:
      "DocGenius is a native Salesforce application that transforms your Salesforce data into professional documents instantly. It works with both standard and custom objects, allowing you to create contracts, proposals, reports, and more without any coding.",
  },
  {
    question: "How does DocGenius integrate with Salesforce?",
    answer:
      "DocGenius is a 100% native Salesforce app, meaning it's installed directly in your Salesforce org. There's no external setup required - it works seamlessly with your existing data, objects, and security settings.",
  },
  {
    question: "Can I use my own document templates?",
    answer:
      "Absolutely! You can create templates using our built-in editor, import existing Google Docs, or create new ones directly within the app. Our drag-and-drop interface makes it easy to design professional templates without any technical skills.",
  },
  {
    question: "What file formats does DocGenius support?",
    answer:
      "DocGenius supports multiple output formats including PDF, DOCX (Word), and CSV. You can also dynamically name your files based on record data for better organization.",
  },
  {
    question: "Is there a limit on how many documents I can generate?",
    answer:
      "With our Professional and Enterprise plans, you can generate unlimited documents. Our bulk generation feature can handle hundred of documents at once, and we even support exporting up to 1 million records to a single spreadsheet.",
  },
  {
    question: "How secure is DocGenius?",
    answer:
      "DocGenius follows Salesforce security best practices with role-based access control. You can configure Admin, Standard User, and Basic User roles to control who can create templates, generate documents, or access specific features.",
  },
  {
    question: "Does DocGenius support electronic signatures?",
    answer:
      "Yes! DocGenius includes built-in digital signature functionality. You can send documents for signing, and signers get a user-friendly signature pad. Signed documents are automatically stored in your configured location.",
  },
  {
    question: "Can I automate document generation?",
    answer:
      "Definitely! DocGenius integrates with Salesforce Flows, allowing you to trigger document generation automatically based on record changes or include it in your Screen Flows. You can also schedule recurring document generation.",
  },
];

export const fileUploadFaqs: FAQItem[] = [
  {
    question: "Why can't I upload a file to GoogleDrive / OneDrive / Dropbox / AWS of size 100 MB?",
    answer:
      "Currently, we have a limitation of uploading files up to 5 MB, and 5 MB for AWS integration without named credential.",
  },
  {
    question: "Why can't I see my file on external storages after uploading it?",
    answer: "Uploads take a few minutes. Check your email for any errors.",
  },
  {
    question: "Why am I not able to select Google Drive while generating documents?",
    answer:
      "Make sure you have integrated GoogleDrive org-wide to upload files into GoogleDrive.",
  },
  {
    question: "Why am I getting an error while uploading a file?",
    answer:
      "Make sure your integration is active and that the document is as small as possible.",
  },
  {
    question: "Can I use multiple GoogleDrive / OneDrive / Dropbox / AWS accounts?",
    answer:
      "No, each user can have one Google Drive integration but you can use it for saving Google Doc templates. You cannot have multiple external storage accounts integrated to upload files.",
  },
  {
    question: "What is the difference between org-wide and user-wide Google Drive?",
    answer:
      "Files are uploaded to the org-wide Google Drive, while Google Doc templates use your personal (user-wide) Drive.",
  },
];

export const csvTemplateFaqs: FAQItem[] = [
  {
    question: "What's the maximum number of records I can set in the \"Limit\" section?",
    answer: "You can set up to 50,000 records.",
  },
  {
    question: "What is the Edit Template tab?",
    answer:
      "It lets you customize the CSV, including selecting fields, applying filters, sorting records, and setting limits.",
  },
  {
    question: "Can I select multiple fields at once?",
    answer:
      "Yes, hold the Ctrl (or Cmd) key and click on the fields you want to select.",
  },
  {
    question: "How do I write custom logic for filters?",
    answer:
      "Use filter numbers with AND/OR operators and parentheses to create custom logic. Only AND/OR operators are allowed.",
  },
  {
    question: "What is the priority order for sorting by fields?",
    answer:
      "The first field has the highest priority, and the priority decreases as you go down the list.",
  },
  {
    question: "What happens when I click the \"Clear\" button?",
    answer: "The section will reset to its default settings, clearing any changes.",
  },
  {
    question: "What happens when I click the \"Reset\" button?",
    answer:
      "Unsaved changes will be removed, and the section will revert to the last saved version.",
  },
  {
    question: "How can I add fields from a parent object?",
    answer:
      "Select the parent object from the drop-down next to the field search bar to add its fields.",
  },
];

export const integrationFaqs: FAQItem[] = [
  {
    question: "Why can't I integrate GoogleDrive / OneDrive / Dropbox / AWS?",
    answer:
      "You might not have the necessary permissions. Ask your System Administrator for access and ensure you've followed the steps in the user guide. For GoogleDrive, if you already have an active user-wide integration, you need to remove it first and then you can integrate as both user and org-wide.",
  },
  {
    question: "How do I change my GoogleDrive / OneDrive / Dropbox / AWS Account?",
    answer: "Unlink the current integration and follow the integration process again.",
  },
  {
    question: "Can I use multiple GoogleDrive / OneDrive / Dropbox / AWS accounts?",
    answer:
      "No, each user can have one Google Drive integration but you can use it for saving Google Doc templates. You cannot have multiple external storage accounts integrated to upload files.",
  },
  {
    question: "What is the difference between org-wide and user-wide Google Drive?",
    answer:
      "Files are uploaded to the org-wide Google Drive, while Google Doc templates use your personal (user-wide) Drive.",
  },
];

export const simpleTemplateFaqs: FAQItem[] = [
  {
    question: "Can documents be generated in landscape mode?",
    answer:
      "Yes, you can. Go to the \"Basic Details\" tab and change the page orientation in the page configuration.",
  },
  {
    question: "Can we add a watermark in a simple template?",
    answer:
      "No, watermarks aren't supported in the simple template. You can use the Google Doc template for this feature, as it's more advanced.",
  },
  {
    question: "Can we change the page size in a simple template?",
    answer: "Yes, you can adjust the page size, orientation, and margins in the page configuration.",
  },
  {
    question: "Can I add a custom font family?",
    answer: "Not yet, but this feature is planned for future updates.",
  },
  {
    question: "Can we insert a page break?",
    answer: "Yes, you can insert a page break using the toolbar or by pressing Ctrl+Enter (Command+Return on Mac).",
  },
  {
    question: "Will formatting be the same in both PDF and DOC format?",
    answer: "Yes, formatting will be the same in PDF and DOC formats.",
  },
  {
    question: "How do I add a header and footer to the simple template?",
    answer: "You can add them through the \"Header\" and \"Footer\" tabs.",
  },
];

export const googleDocTemplateFaqs: FAQItem[] = [
  {
    question: "What happens if a record doesn't have a value for a merge field?",
    answer: "An empty value would be displayed.",
  },
  {
    question: "Why do I see permission issues even though I've integrated from another account?",
    answer: "You might be logged in to a different Google account in your browser.",
  },
  {
    question: "Why can't I see all the Google Docs in the template selector?",
    answer: "You can only see documents created through the DocGenius application.",
  },
  {
    question: "Do changes I make to the template affect the original Google Doc?",
    answer: "Yes, changes are saved to the original Google Doc in real-time.",
  },
  {
    question: "Does deleting or cloning the template affect the original Google Doc?",
    answer: "No, deleting or cloning the template does not affect the original document in Google Drive.",
  },
  {
    question: "Can I preview the document in a pageless PDF format?",
    answer: "No, the preview will show the document in pages, like a regular PDF.",
  },
  {
    question: "Can I create multiple templates from the same Google Doc?",
    answer:
      "Yes, you can create more than one template from the same document, but it is not recommended as changes in one template will affect the other.",
  },
  {
    question: "Is there a size limit for Google Docs?",
    answer: "No, there's no size limit for the document.",
  },
  {
    question: "Why can't I edit the document?",
    answer: "You may not have the necessary permissions to edit it.",
  },
];

export const keyMappingFaqs: FAQItem[] = [
  {
    question: "Why are some fields not available in key mapping?",
    answer: "Address and geolocation type fields are not supported.",
  },
  {
    question: "How can we format date, time, numbers, strings, checkbox field's value?",
    answer: "Click on the 3 dots next to the field in the key mapping component to format.",
  },
  {
    question: "Why some of my Salesforce images not showing in the image section?",
    answer:
      "You can add images up to 30 MB. If your image size is more than 30 MB, it will not display in the image section.",
  },
  {
    question: "Can we merge two or more templates?",
    answer:
      "Yes, we can merge other simple templates into the current template. However, the source object of the merged template must be the same.",
  },
  {
    question: "Can we change the timezone for general fields?",
    answer:
      "General fields display dates as per the org's default timezone. If you want to change, you need to change the org's timezone.",
  },
  {
    question: "Is there a limit on entering merge fields and tables in the template?",
    answer: "Doc Genius allows you to insert a maximum of 10 tables.",
  },
  {
    question: "Is it possible to display child records in any form other than tables?",
    answer: "No, you can display child records only in the form of tables.",
  },
];

export const generateButtonFaqs: FAQItem[] = [
  {
    question: "How can I rename a button generated using the \"Create Button\" feature?",
    answer: "Go to Setup > Object Manager > Select Object > Buttons, Links, and Actions > Select Button > Edit.",
  },
  {
    question: "Why can't I change the name of a custom default button?",
    answer:
      "You can only name the button during creation. To rename it later, go to the setup and edit the button label.",
  },
  {
    question: "How can I add email addresses for To, CC, and BCC?",
    answer: "Enter addresses directly into the \"To\" field, and click \"CC\" or \"BCC\" to add those addresses.",
  },
  {
    question: "What happens if I update data without a trusted URL?",
    answer:
      "The data will update, but the list view won't import, and you'll receive an error if you try to update the list view.",
  },
  {
    question: "Why can't I deselect a document type?",
    answer:
      "At least one document type must be selected when generating documents or creating a default button.",
  },
  {
    question: "How do I use an email template to send emails?",
    answer:
      "After selecting email as the output channel, choose an email template from the dropdown. The subject and body will auto-fill. Deselecting the template allows you to manually enter the email body.",
  },
];

export const categoryFaqs: Record<string, FAQItem[]> = {
  general: generalFaqs,
  "file-upload": fileUploadFaqs,
  "csv-template": csvTemplateFaqs,
  integration: integrationFaqs,
  "simple-template": simpleTemplateFaqs,
  "google-doc-template": googleDocTemplateFaqs,
  "key-mapping": keyMappingFaqs,
  "generate-button": generateButtonFaqs,
};

// Maintain single list export for backward compatibility (shows general FAQs on the main page)
export const faqs: FAQItem[] = generalFaqs;

// Combined list for SEO purposes on the FAQs page
export const allFaqs: FAQItem[] = [
  ...generalFaqs,
  ...fileUploadFaqs,
  ...csvTemplateFaqs,
  ...integrationFaqs,
  ...simpleTemplateFaqs,
  ...googleDocTemplateFaqs,
  ...keyMappingFaqs,
  ...generateButtonFaqs,
];
