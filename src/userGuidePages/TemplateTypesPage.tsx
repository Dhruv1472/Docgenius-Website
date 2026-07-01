import { motion } from "framer-motion";
import {
  FileText,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  HelpCircle,
  BarChart2,
  Lightbulb,
  PlusSquare,
  Wrench,
  Pin,
  Globe,
  Edit2,
  Eye,
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

const TemplateTypesPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Templates</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Template Types</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          DocGenius supports multiple template types to cater to different document generation requirements.
          Learn about Simple Templates, CSV Templates, and Google Doc Templates.
        </p>
      </motion.div>

      {/* ─── SECTION 1: Simple Template ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Simple Template (Word/PDF)" icon={FileText} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Simple templates allow you to build templates using Microsoft Word format or PDF layout directly.
            They provide the ability to merge Salesforce fields, tables, and sections into your final output.
          </p>

          <SubSection title="Page Configuration Options" icon={SlidersHorizontal}>
            <div className="space-y-3">
              <BulletItem>
                <strong>Header:</strong> Define a header section that appears at the top of every generated page. You can insert key mappings here.
              </BulletItem>
              <BulletItem>
                <strong>Footer:</strong> Configure a footer section at the bottom of each page, useful for page numbers, confidentiality notes, or dynamic values.
              </BulletItem>
              <BulletItem>
                <strong>Basic Detail:</strong> Contains general template metadata such as the template name, folder placement, primary object mapping, and output file format.
              </BulletItem>
            </div>
          </SubSection>

          <InfoBox type="info">
            Simple templates support conditional sections and nesting to dynamically hide or display blocks based on Salesforce field values.
          </InfoBox>
        </div>
      </motion.section>

      {/* ─── SECTION 2: CSV Template ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="CSV Template" icon={BarChart2} />

        <div className="mb-5">
          <SubSection title="Purpose of the CSV Template" icon={Lightbulb}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CSV templates are designed specifically for exporting large datasets from Salesforce into spreadsheet-compatible CSV files.
              Unlike Word or PDF templates, they focus entirely on data columns, filtering, sorting, and row limits.
            </p>
          </SubSection>

          <SubSection title="Creating a New CSV Template" icon={PlusSquare}>
            <div className="space-y-2">
              <BulletItem>Click the "Create Template" button on the home page and select "CSV" as the template type.</BulletItem>
              <BulletItem>Enter the basic details (Name, folder, target Salesforce object) and click Save.</BulletItem>
            </div>
          </SubSection>

          <SubSection title="Edit Template Tab Options" icon={Wrench}>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-sm font-semibold text-foreground mb-1">Column Selection Section</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Choose which fields from the Salesforce object should appear as columns in your CSV. You can define custom column headers for each field.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-sm font-semibold text-foreground mb-1">Apply Filters Section</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Define query conditions (SOQL-like filters) to export only records that meet specific criteria.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-sm font-semibold text-foreground mb-1">Order By Section</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Set the sorting logic for the exported records (e.g., sort by CreatedDate descending).
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-sm font-semibold text-foreground mb-1">Limit Section</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Restrict the maximum number of records exported in a single CSV file.
                </p>
              </div>
            </div>
          </SubSection>

          <SubSection title="Template Defaults Tab" icon={Pin}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use this tab to set default file names, export behaviors, and custom Salesforce buttons associated with the CSV generation.
            </p>
          </SubSection>
        </div>
      </motion.section>

      {/* ─── SECTION 3: Google Doc Template ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Google Doc Template" icon={Globe} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Google Doc templates let you utilize your existing Google Docs as document layouts.
            DocGenius integrates with Google Drive to read the document, process key mappings, and output PDF or DOCX formats.
          </p>

          <SubSection title="Editing the Template" icon={Edit2}>
            <BulletItem>Connect your Google Workspace / Drive account to Salesforce.</BulletItem>
            <BulletItem>Directly embed key mappings into the Google Doc (e.g. using rich formatting).</BulletItem>
            <BulletItem>Edit your layout directly inside Google Docs, and DocGenius will automatically fetch the latest version when generating.</BulletItem>
          </SubSection>

          <SubSection title="Previewing the Template" icon={Eye}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the "Save & Preview" option in DocGenius to test the Google Doc mapping with live Salesforce record data before deploying it.
            </p>
          </SubSection>
        </div>
      </motion.section>
    </div>
  );
};

export default TemplateTypesPage;
