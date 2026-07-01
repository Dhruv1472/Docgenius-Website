import { motion } from "framer-motion";
import {
  Layers,
  Settings,
  FileText,
  Filter,
  Send,
  Zap,
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

const SubSection = ({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) => (
  <div className="mb-6">
    <h4 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-primary" />
      {title}
    </h4>
    {children}
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

const BulkGenerationPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Bulk</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Bulk Document Generation</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Generate documents for multiple records simultaneously. Streamline operations like bulk billing, sending monthly statements, or batch contract generation.
        </p>
      </motion.div>

      {/* ─── Steps ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="How to Run Bulk Generation" icon={Settings} />

        <div className="mb-5">
          <SubSection title="1. Select the Template" icon={FileText}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Navigate to the Bulk Document Generation panel and choose the document template you wish to run.
            </p>
          </SubSection>

          <SubSection title="2. Filter & Record Selection" icon={Filter}>
            <StepItem number={1}>
              Apply filters to locate specific records from the target Salesforce object (e.g. choose Accounts where BillingCountry is 'USA').
            </StepItem>
            <StepItem number={2}>
              Review the filtered record list and check the checkboxes next to the specific records you want to include in this bulk run.
            </StepItem>
          </SubSection>

          <SubSection title="3. Output Channel Selection" icon={Send}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Define the bulk execution output behavior:
            </p>
            <div className="space-y-1">
              <BulletItem><strong>Merge File:</strong> Combine all generated documents into a single, merged PDF file.</BulletItem>
              <BulletItem><strong>Individual Files:</strong> Generate separate files for each record and save them to the designated storage channel (Salesforce Files, S3, Dropbox).</BulletItem>
              <BulletItem><strong>Email Distribution:</strong> Automatically attach and email each document to its corresponding recipient.</BulletItem>
            </div>
          </SubSection>

          <SubSection title="4. Run Generation" icon={Zap}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Click <strong>"Generate Bulk Documents"</strong> to queue the job. The generation runs asynchronously. You will receive an email confirmation or dashboard alert once the batch run finishes.
            </p>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default BulkGenerationPage;
