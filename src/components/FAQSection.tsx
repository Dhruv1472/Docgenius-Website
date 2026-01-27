import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is DocGenius?",
    answer: "DocGenius is a native Salesforce application that transforms your Salesforce data into professional documents instantly. It works with both standard and custom objects, allowing you to create contracts, proposals, reports, and more without any coding.",
  },
  {
    question: "How does DocGenius integrate with Salesforce?",
    answer: "DocGenius is a 100% native Salesforce app, meaning it's installed directly in your Salesforce org. There's no external setup required - it works seamlessly with your existing data, objects, and security settings.",
  },
  {
    question: "Can I use my own document templates?",
    answer: "Absolutely! You can create templates using our built-in editor, import existing Google Docs, or create new ones directly within the app. Our drag-and-drop interface makes it easy to design professional templates without any technical skills.",
  },
  {
    question: "What file formats does DocGenius support?",
    answer: "DocGenius supports multiple output formats including PDF, DOCX (Word), and CSV. You can also dynamically name your files based on record data for better organization.",
  },
  {
    question: "Is there a limit on how many documents I can generate?",
    answer: "With our Professional and Enterprise plans, you can generate unlimited documents. Our bulk generation feature can handle hundred of documents at once, and we even support exporting up to 1 million records to a single spreadsheet.",
  },
  {
    question: "How secure is DocGenius?",
    answer: "DocGenius follows Salesforce security best practices with role-based access control. You can configure Admin, Standard User, and Basic User roles to control who can create templates, generate documents, or access specific features.",
  },
  {
    question: "Does DocGenius support electronic signatures?",
    answer: "Yes! DocGenius includes built-in digital signature functionality. You can send documents for signing, and signers get a user-friendly signature pad. Signed documents are automatically stored in your configured location.",
  },
  {
    question: "Can I automate document generation?",
    answer: "Definitely! DocGenius integrates with Salesforce Flows, allowing you to trigger document generation automatically based on record changes or include it in your Screen Flows. You can also schedule recurring document generation.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faqs" className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about DocGenius
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold font-display py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
