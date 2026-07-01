import { motion } from "framer-motion";
import {
  Tag,
  Lightbulb,
  Settings,
  LucideIcon
} from "lucide-react";

const fadeInSection = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const SectionTitle = ({ number, title, icon: Icon }: { number: string; title: string; icon: LucideIcon }) => (
  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Step {number}</p>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
    </div>
  </div>
);

const StepItem = ({ number, children }: { number: number; children: React.ReactNode }) => (
  <div className="flex gap-3 mb-3">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center text-xs border border-primary/25 mt-0.5">
      {number}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{children}</p>
  </div>
);

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 mb-2">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{children}</p>
  </div>
);

const PathBadge = ({ children }: { children: React.ReactNode }) => (
  <code className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/8 border border-primary/15 text-primary text-xs font-medium mx-0.5">
    {children}
  </code>
);

const DynamicNamePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Tag className="w-3.5 h-3.5" />
          <span>File Naming</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Dynamic File Name</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Configure DocGenius to name generated documents dynamically using Salesforce field placeholders, timestamps, or static strings.
        </p>
      </motion.div>

      {/* ─── Overview ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Dynamic Name Overview" icon={Lightbulb} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Instead of giving all generated files the same generic name, you can build dynamic file names that contain specific record details (e.g. Invoice Number, Account Name, or Date).
          </p>
          <div className="space-y-2">
            <BulletItem>Build names such as <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">Invoice_INV-00249_Salesforce_20251225</code>.</BulletItem>
            <BulletItem>Eliminates manually renaming files after generation.</BulletItem>
            <BulletItem>Ensures consistency in Salesforce file attachments and external storage structures.</BulletItem>
          </div>
        </div>
      </motion.section>

      {/* ─── Configuration ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="How to Configure Dynamic Names" icon={Settings} />

        <div className="mb-5">
          <StepItem number={1}>
            Open the template editor and navigate to the <PathBadge>Template Defaults</PathBadge> tab.
          </StepItem>
          <StepItem number={2}>
            Scroll down to the <strong>"Dynamic File Name Configuration"</strong> section.
          </StepItem>
          <StepItem number={3}>
            Build your naming structure in the input editor using static text mixed with field keys:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Use standard field variables</li>
              <li>Include timestamp fields to prevent duplicate filenames.</li>
            </ul>
          </StepItem>
          <StepItem number={4}>
            Click <strong>Save</strong> to store the configuration. The Document Generator will automatically build the filename on the next generation run.
          </StepItem>
        </div>
      </motion.section>
    </div>
  );
};

export default DynamicNamePage;
