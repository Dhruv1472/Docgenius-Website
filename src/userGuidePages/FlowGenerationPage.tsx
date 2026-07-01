import { motion } from "framer-motion";
import {
  GitBranch,
  Lightbulb,
  Settings,
  Zap,
  PlusSquare,
  SlidersHorizontal,
  AlertTriangle,
  Info,
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

const FlowGenerationPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <GitBranch className="w-3.5 h-3.5" />
          <span>Flow</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Document Generation Using Flow</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          DocGenius integrates directly with Salesforce Flow Builder, allowing you to trigger automated document generation, emails, and cloud storage uploads in the background.
        </p>
      </motion.div>

      {/* ─── Overview ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Overview" icon={Lightbulb} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Salesforce Flows allow you to automate document generation without writing Apex code.
            DocGenius provides pre-configured Apex actions that can be added to any flow (Record-Triggered, Screen Flow, or Scheduled Flow) to run template generation in the background.
          </p>
        </div>
      </motion.section>

      {/* ─── Setup Steps ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Steps to Generate via Flow" icon={Settings} />

        <div className="mb-5">
          <SubSection title="1. Select the Flow Type" icon={Zap}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create a new flow in Salesforce Flow Builder. Depending on the trigger requirement, choose:
            </p>
            <div className="space-y-1 mt-2">
              <BulletItem><strong>Record-Triggered Flow:</strong> Trigger generation when a record is created or updated (e.g., set Opportunity Stage to 'Closed Won').</BulletItem>
              <BulletItem><strong>Screen Flow:</strong> Guide users through a wizard before generating the file.</BulletItem>
              <BulletItem><strong>Scheduled Flow:</strong> Automatically run template generation at recurring times.</BulletItem>
            </div>
          </SubSection>

          <SubSection title="2. Add DocGenius Action Element" icon={PlusSquare}>
            <StepItem number={1}>
              Click the **plus (+)** icon in the flow to add an element and select <strong>Action</strong>.
            </StepItem>
            <StepItem number={2}>
              Search for <strong>"DocGenius Document Generation"</strong> or choose the matching package action.
            </StepItem>
            <StepItem number={3}>
              Enter a Label and API Name for the action.
            </StepItem>
          </SubSection>

          <SubSection title="3. Configure Input Variables" icon={SlidersHorizontal}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Configure the required inputs inside the action panel:
            </p>
            <div className="space-y-2">
              <BulletItem>
                <strong>Template ID:</strong> Pass the Salesforce ID of the template you want to generate.
              </BulletItem>
              <BulletItem>
                <strong>Record ID:</strong> Map this to the current record's ID .
              </BulletItem>
              <BulletItem>
                <strong>Output Channel:</strong> Optionally override default template output destinations (e.g., set to "Email" or "Download").
              </BulletItem>
            </div>
          </SubSection>

          <SubSection title="4. Handle Fault Paths" icon={AlertTriangle}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Always add a <strong>Fault Path</strong> connection from the DocGenius Action element. This ensures that if document generation fails (e.g. due to template misconfiguration or validation rules), your flow can handle the error gracefully (like logging a task or sending an admin alert) instead of crashing.
            </p>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default FlowGenerationPage;
