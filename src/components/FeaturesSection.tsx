import { motion } from "framer-motion";
import {
  FileCode2,
  Database,
  MousePointerClick,
  Eye,
  Files,
  FileOutput,
  Cloud,
  Zap,
  PenTool,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: FileCode2,
    title: "No-Code Template Builder",
    description: "Design professional document templates effortlessly — no coding or technical skills necessary. Customize with our intuitive drag-and-drop editor.",
  },
  {
    icon: Database,
    title: "Works with Standard & Custom Objects",
    description: "Pull data from any Salesforce object — standard or custom — ensuring your documents perfectly reflect your unique business data.",
  },
  {
    icon: MousePointerClick,
    title: "Easy Field Mapping",
    description: "Quickly map Salesforce fields into your documents using drag-and-drop or simple copy-paste — without complex queries or coding.",
  },
  {
    icon: Eye,
    title: "Live Preview with Real-Time Editing",
    description: "Visualize exactly how your document will appear using real Salesforce data. Make last-minute edits on the fly without impacting your original template.",
  },
  {
    icon: Files,
    title: "Bulk & Scheduled Generation",
    description: "Save valuable time by generating documents for hundreds or thousands of records simultaneously. Automate recurring document creation with flexible scheduling.",
  },
  {
    icon: FileOutput,
    title: "Multiple Export Formats",
    description: "Export documents as polished PDFs, editable DOCX files, or data-friendly CSVs — ready for any workflow or use case.",
  },
  {
    icon: Cloud,
    title: "Salesforce & External Storage",
    description: "Securely save your documents within Salesforce or to external platforms like Google Drive, OneDrive, Dropbox, or AWS — all seamlessly connected.",
  },
  {
    icon: Zap,
    title: "One-Click Document Generation",
    description: "Predefine your entire document workflow and generate ready-to-use documents with a single click from any record page.",
  },
  {
    icon: PenTool,
    title: "Built-In Digital Signature",
    description: "Simplify approvals with integrated e-signatures. Send documents for signing and capture signatures electronically, all stored safely and automatically.",
  },
  {
    icon: Workflow,
    title: "Flow & Automation Ready",
    description: "Integrate DocGenius effortlessly into your Salesforce automation — generate documents as part of Screen Flows or trigger automatically when records change.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            What Makes DocGenius <span className="gradient-text">Different?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to simplify your document workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold font-display mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
