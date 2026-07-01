import { motion } from "framer-motion";
import {
  PlusSquare,
  Lightbulb,
  Zap,
  Folder,
  Link,
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

const ButtonGeneratorPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <PlusSquare className="w-3.5 h-3.5" />
          <span>Buttons</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Button Generator</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Create and deploy custom buttons in Salesforce to trigger document generation with a single click from record pages, list views, or related lists.
        </p>
      </motion.div>

      {/* ─── Purpose of Button Generator ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Purpose of Button Generator" icon={Lightbulb} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            The Button Generator automates the creation of custom Salesforce buttons and quick actions.
            Instead of manually writing URL hacks or complex code, the generator configures everything automatically based on your template.
          </p>

          <div className="space-y-2">
            <BulletItem>Allows users to trigger document generation directly from the record layout.</BulletItem>
            <BulletItem>Pre-configures output storage and delivery channels (e.g. download or email attachment).</BulletItem>
            <BulletItem>Enables list-view buttons for bulk document generation.</BulletItem>
          </div>
        </div>
      </motion.section>

      {/* ─── Creating Buttons ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Creating Custom Buttons" icon={PlusSquare} />

        <div className="mb-5">
          <StepItem number={1}>
            Open the template editor and navigate to the <strong>Template Defaults</strong> tab.
          </StepItem>
          <StepItem number={2}>
            Choose the **Button Type** you want to generate.
          </StepItem>
          <StepItem number={3}>
            Select the button actions, default storage locations (AWS S3, Salesforce Files, etc.), and file name conventions.
          </StepItem>
          <StepItem number={4}>
            Click the <strong>"Create Button"</strong> button. DocGenius will automatically deploy the custom button code or quick action to your Salesforce org.
          </StepItem>
          <StepItem number={5}>
            Add the generated button to your Salesforce object's Page Layouts or Lightning Record Pages.
          </StepItem>
        </div>
      </motion.section>

      {/* ─── Button Placements ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Button Placements & Options" icon={Zap} />

        <div className="mb-5">
          <SubSection title="List View Button" icon={Folder}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Place a custom button on the Salesforce Object List View (e.g., Contact List View) to select multiple records and run bulk document generation in a single batch.
            </p>
          </SubSection>

          <SubSection title="Quick Action Button" icon={Zap}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deploy a Quick Action button on the Opportunity or Account record page. Quick Actions provide a cleaner user interface in Lightning Experience.
            </p>
          </SubSection>

          <SubSection title="Related List Button" icon={Link}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create a custom button specifically for related lists on a record page to generate documents containing related item records.
            </p>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default ButtonGeneratorPage;
