import { motion } from "framer-motion";
import {
  Key,
  Settings,
  PlusSquare,
  Code,
  SlidersHorizontal,
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

const StepItem = ({ number, children }: { number: number; children: React.ReactNode }) => (
  <div className="flex gap-3 mb-3">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center text-xs border border-primary/25 mt-0.5">
      {number}
    </div>
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

const CustomKeyManagerPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Key className="w-3.5 h-3.5" />
          <span>Key Management</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Custom Key Manager</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          The Custom Key Manager provides the ability to create complex key queries (using SOQL or the Custom Key Builder)
          to fetch data that is not directly accessible on the primary object.
        </p>
      </motion.div>

      {/* ─── Manage Custom Keys ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Manage Custom Keys" icon={Settings} />

        <div className="mb-5">
          <StepItem number={1}>
            Navigate to the <strong>Custom Key Manager</strong> tab in the DocGenius App.
          </StepItem>
          <StepItem number={2}>
            Switch between <strong>Record Custom Keys</strong> (used inside document templates) and <strong>Attachment Custom Keys</strong> (used for dynamic email attachments).
          </StepItem>
          <StepItem number={3}>
            Apply filters to the list using the filter buttons on the top left corner.
          </StepItem>
          <StepItem number={4}>
            Search for specific custom key names using the search bar on the top right.
          </StepItem>
          <StepItem number={5}>
            Manage existing keys: <strong>Preview</strong> the output, <strong>Edit</strong> the settings, or <strong>Delete</strong> the key.
          </StepItem>
        </div>
      </motion.section>

      {/* ─── Create Custom Keys ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Create Custom Keys" icon={PlusSquare} />

        <div className="mb-5">
          <StepItem number={1}>
            Go to the Custom Key Manager tab and click the <strong>"Create Custom Key"</strong> button.
          </StepItem>
          <StepItem number={2}>
            Select the <strong>Custom Key Type</strong> (Record or Attachment).
          </StepItem>
          <StepItem number={3}>
            Provide a unique <strong>Custom Key Name</strong> (alphanumeric only, no spaces or special characters).
          </StepItem>
          <StepItem number={4}>
            Select the <strong>Salesforce Object</strong> you want to query from.
          </StepItem>
          <StepItem number={5}>
            Choose between using the <strong>Custom Key Builder</strong> (UI-based query designer) or the <strong>Plain SOQL Query Builder</strong> (for advanced developers).
          </StepItem>
        </div>
      </motion.section>

      {/* ─── SOQL Query Builder ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Plain SOQL Query Builder" icon={Code} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            For advanced use cases, you can write plain Salesforce Object Query Language (SOQL) queries to retrieve related records, aggregates, or parent relationships.
          </p>

          <SubSection title="Configuration Steps" icon={SlidersHorizontal}>
            <StepItem number={1}>
              Enter the SOQL query in the query editor. Use the reference bind variable (e.g. `:recordId`) to fetch data dynamic to the current record.
            </StepItem>
            <StepItem number={2}>
              Ensure you select valid fields that align with the object API names.
            </StepItem>
            <StepItem number={3}>
              Click <strong>Save & Test</strong> to verify your query runs successfully against your Salesforce organization.
            </StepItem>
          </SubSection>

          <InfoBox type="warning">
            Always test your SOQL queries to verify they return records. Invalid SOQL queries will cause document generation to fail.
          </InfoBox>
        </div>
      </motion.section>
    </div>
  );
};

export default CustomKeyManagerPage;
