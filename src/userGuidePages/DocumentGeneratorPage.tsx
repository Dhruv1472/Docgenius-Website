import { motion } from "framer-motion";
import {
  Zap,
  Lightbulb,
  Folder,
  Database,
  Cloud,
  RefreshCw,
  Send,
  FileText,
  Eye,
  Info,
  AlertTriangle,
  HelpCircle,
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

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 mb-2">
    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{children}</p>
  </div>
);

const InfoBox = ({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) => {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300",
    warning: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-300",
    tip: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-300",
  };
  const Icon = type === "warning" ? AlertTriangle : type === "tip" ? HelpCircle : Info;

  return (
    <div className={`flex gap-2 p-3 rounded-lg border text-sm my-3 ${styles[type]}`}>
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
};

const DocumentGeneratorPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Generator</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Document Generator</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          The Document Generator combines templates with live Salesforce record data to output the final files.
          Learn about storage, output formats, and generation settings.
        </p>
      </motion.div>

      {/* ─── Purpose ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Purpose of Document Generator" icon={Lightbulb} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            The Document Generator processes active templates. It queries Salesforce fields using specified key mappings,
            merges them into document placeholders, and saves the final file.
          </p>
        </div>
      </motion.section>

      {/* ─── Storage Options ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Storage Options" icon={Folder} />

        <div className="mb-5">
          <SubSection title="Internal Storage" icon={Database}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Generated files can be stored directly within Salesforce:
            </p>
            <BulletItem>
              <strong>Salesforce Files:</strong> Attach files directly as Salesforce Files associated with the record layout.
            </BulletItem>
            <BulletItem>
              <strong>Notes & Attachments:</strong> Support legacy attachments on Salesforce standard object layouts.
            </BulletItem>
          </SubSection>

          <SubSection title="External Storage" icon={Cloud}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Automatically upload generated documents to third-party providers:
            </p>
            <BulletItem>AWS S3 buckets.</BulletItem>
            <BulletItem>Google Drive folders.</BulletItem>
            <BulletItem>Dropbox or Microsoft OneDrive folders.</BulletItem>
          </SubSection>
        </div>
      </motion.section>

      {/* ─── Output & Preview ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Output, Preview & Generation" icon={RefreshCw} />

        <div className="mb-5">
          <SubSection title="Output Channels" icon={Send}>
            <BulletItem>
              <strong>Direct Download:</strong> Download the generated file instantly through the browser.
            </BulletItem>
            <BulletItem>
              <strong>Email:</strong> Automatically attach the generated document to a Salesforce email template and send it.
            </BulletItem>
          </SubSection>

          <SubSection title="Output Formats" icon={FileText}>
            <BulletItem>PDF (Portable Document Format)</BulletItem>
            <BulletItem>DOCX (Microsoft Word)</BulletItem>
            <BulletItem>CSV (Comma Separated Values)</BulletItem>
          </SubSection>

          <SubSection title="Preview and Generation" icon={Eye}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Before saving the file, you can run a dry-run preview to check the mappings:
            </p>
            <BulletItem>Click the <strong>Preview</strong> button to load a render screen with live data.</BulletItem>
            <BulletItem>Verify alignments, variables, and formats look correct.</BulletItem>
            <BulletItem>Click <strong>Generate</strong> to commit the file generation and save it to storage.</BulletItem>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default DocumentGeneratorPage;
