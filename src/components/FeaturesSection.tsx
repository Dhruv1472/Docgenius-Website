import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileCode2,
    title: "No-Code Template Builder",
    description: "Design professional document templates effortlessly - no coding or technical skills necessary. Customize with our intuitive drag-and-drop editor.",
  },
  {
    icon: Database,
    title: "Works with Standard & Custom Objects",
    description: "Pull data from any Salesforce object - standard or custom - ensuring your documents perfectly reflect your unique business data.",
  },
  {
    icon: MousePointerClick,
    title: "Easy Field Mapping",
    description: "Quickly map Salesforce fields into your documents using drag-and-drop or simple copy-paste - without complex queries or coding.",
  },
  {
    icon: Eye,
    title: "Live Preview with Real-Time Editing",
    description: "Visualize exactly how your document will appear using real Salesforce data. Make last-minute edits on the fly without impacting your original template.",
  },
  {
    icon: Files,
    title: "Bulk & Scheduled Generation",
    description: "Save valuable time by generating documents for hundreds of records simultaneously. Automate recurring document creation with flexible scheduling.",
  },
  {
    icon: FileOutput,
    title: "Multiple Export Formats",
    description: "Export documents as polished PDFs, editable DOCX files, or data-friendly CSVs - ready for any workflow or use case.",
  },
  {
    icon: Cloud,
    title: "Salesforce & External Storage",
    description: "Securely save your documents within Salesforce or to external platforms like Google Drive, OneDrive, Dropbox, or AWS - all seamlessly connected.",
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
    description: "Integrate DocGenius effortlessly into your Salesforce automation - generate documents as part of Screen Flows or trigger automatically when records change.",
  },
];

export const FeaturesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleFeatures = showAll ? features : features.slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    if (showAll && sectionRef.current) {
      // Scroll to top of section when collapsing
      const offset = window.innerWidth >= 1024 ? 50 : 0; // 2 box heights offset on desktop
      const elementPosition = sectionRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section id="features" className="section-padding" ref={sectionRef}>
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence initial={false}>
            {visibleFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
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
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mt-10">
          <Button
            variant="hero"
            size="lg"
            className="rounded-full px-6"
            onClick={handleToggle}
          >
            {showAll ? "View Less" : "View More"}
          </Button>
        </div>
      </div>
    </section>
  );
};
