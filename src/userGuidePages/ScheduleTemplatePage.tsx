import { motion } from "framer-motion";
import {
  Calendar,
  SlidersHorizontal,
  Info,
  PlusSquare,
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

const TermCard = ({ term, definition }: { term: string; definition: string }) => (
  <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 hover:shadow-sm transition-shadow">
    <p className="text-sm font-bold text-primary mb-1">{term}</p>
    <p className="text-xs text-muted-foreground leading-relaxed">{definition}</p>
  </div>
);

const ScheduleTemplatePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>Schedule</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Scheduled Templates</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Configure DocGenius to run document generation tasks on a recurring schedule. Generate and distribute reports, invoices, or summaries automatically.
        </p>
      </motion.div>

      {/* ─── Dashboard ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Schedule Dashboard" icon={Calendar} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            The Scheduled Template Dashboard lists all active schedules, recurrence patterns, next run times, and execution history.
          </p>

          <SubSection title="Dashboard Key Information" icon={Info}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TermCard term="Schedule ID" definition="Unique identifier for the scheduled template configuration." />
              <TermCard term="Recurrence Pattern" definition="Selected schedule interval (e.g. daily, weekly, monthly)." />
              <TermCard term="First Run Date/Time" definition="The scheduled start date and time of the recurrence." />
              <TermCard term="Next Run Date/Time" definition="The timestamp of the next automated generation run." />
            </div>
          </SubSection>
        </div>
      </motion.section>

      {/* ─── How to Schedule ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="How to Schedule Templates" icon={PlusSquare} />

        <div className="mb-5">
          <StepItem number={1}>
            Open the <strong>Schedule Template</strong> dashboard in DocGenius.
          </StepItem>
          <StepItem number={2}>
            Click <strong>"New Schedule"</strong>.
          </StepItem>
          <StepItem number={3}>
            Select the target template and primary object query conditions.
          </StepItem>
          <StepItem number={4}>
            Define the recurrence schedule (Daily, Weekly, Monthly, or custom cron).
          </StepItem>
          <StepItem number={5}>
            Select the storage channel (Salesforce Files, AWS, Google Drive) and output channels (e.g., Email or Download).
          </StepItem>
          <StepItem number={6}>
            Click <strong>Save</strong>. DocGenius will automatically enqueue the schedule background job.
          </StepItem>
        </div>
      </motion.section>
    </div>
  );
};

export default ScheduleTemplatePage;
