import { motion } from "framer-motion";
import {
  Map,
  SlidersHorizontal,
  Sparkles,
  Info,
  AlertTriangle,
  HelpCircle,
  Wrench,
  RefreshCw,
  Zap,
  ClipboardList,
  Image,
  PenTool,
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

const KeyMappingPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Map className="w-3.5 h-3.5" />
          <span>Mapping Config</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Key Mapping</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Configure how template placeholders (Keys) are mapped to Salesforce field values, related list tables, signature blocks, images, or logic.
        </p>
      </motion.div>

      {/* ─── Field Formatting ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Field Formatting" icon={SlidersHorizontal} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            When mapping standard fields to keys, you can specify custom formats for dates, currencies, times, and numbers.
          </p>

          <SubSection title="Supported Field Formatters" icon={Sparkles}>
            <div className="space-y-3">
              <BulletItem>
                <strong>DateTime Fields:</strong> Convert Salesforce timestamps into readable formats (e.g. `MM/dd/yyyy HH:mm`, `dd-MMM-yyyy`).
              </BulletItem>
              <BulletItem>
                <strong>Date Fields:</strong> Customize the date displays (e.g., `EEEE, MMMM d, yyyy` for "Monday, December 25, 2025").
              </BulletItem>
              <BulletItem>
                <strong>Time Fields:</strong> Format time values in 12-hour or 24-hour options.
              </BulletItem>
              <BulletItem>
                <strong>Number / Currency Fields:</strong> Format numeric data to include currency symbols, decimal points, and thousand separators (e.g., `$1,234.56`).
              </BulletItem>
              <BulletItem>
                <strong>Checkbox Fields:</strong> Define text representations for boolean values (e.g., "Yes/No", "Active/Inactive", or custom checkmark symbols).
              </BulletItem>
            </div>
          </SubSection>
        </div>
      </motion.section>

      {/* ─── Custom Key Mapping ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Custom Key's Field & List Mapping" icon={Wrench} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Once Custom Keys are created in the Custom Key Manager, you can map them inside your templates as single-value keys or lists.
          </p>

          <SubSection title="Field Mapping vs. List Mapping" icon={RefreshCw}>
            <div className="space-y-3">
              <BulletItem>
                <strong>Custom Key's Field Mapping:</strong> Maps a single field output returned by a Custom Key query directly to a template text key.
              </BulletItem>
              <BulletItem>
                <strong>Custom Key's List Key Mapping:</strong> Maps a list or array of records returned by a Custom Key query to a table row inside Microsoft Word or Google Docs templates, allowing dynamic rows to generate for every record retrieved.
              </BulletItem>
            </div>
          </SubSection>
        </div>
      </motion.section>

      {/* ─── Other Mapping Types ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Specialized Mapping Configurations" icon={Zap} />

        <div className="mb-5">
          <SubSection title="Related List Mapping" icon={ClipboardList}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dynamically build table grids from related lists (e.g. Opportunity Line Items on an Opportunity template). Specify columns, widths, and sort order.
            </p>
          </SubSection>

          <SubSection title="Salesforce Image Mapping" icon={Image}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Embed Salesforce images, logo attachments, or rich-text image fields dynamically inside your document templates using image keys.
            </p>
          </SubSection>

          <SubSection title="Signature Configuration" icon={PenTool}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set up electronic signature zones. Map DocGenius to placeholder signature boxes to integrate smoothly with signing workflows.
            </p>
          </SubSection>

          <SubSection title="Conditional & Replace Mapping" icon={Settings}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Conditional Key Mapping:</strong> Render specific sections of the document only when certain Salesforce data conditions are met.<br />
              <strong>Replace Key Mapping:</strong> Automatically replace string segments or perform string formatting on keys during generation.
            </p>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default KeyMappingPage;
