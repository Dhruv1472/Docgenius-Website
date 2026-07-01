import { motion } from "framer-motion";
import {
  Home,
  Folder,
  FileText,
  Search,
  Settings,
  FolderPlus,
  Edit2,
  Trash2,
  Info,
  Filter,
  BookOpen,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  LucideIcon
} from "lucide-react";

const fadeInSection = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const SubSection = ({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: React.ReactNode }) => (
  <div className="mb-8">
    <h4 className="text-base font-bold text-foreground flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-primary" />
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

const ActionButton = ({ icon: Icon, label, desc }: { icon: LucideIcon; label: string; desc: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
    <Icon className="w-5 h-5 text-primary mt-0.5" />
    <div>
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TermCard = ({ term, definition }: { term: string; definition: string }) => (
  <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 hover:shadow-sm transition-shadow">
    <p className="text-sm font-bold text-primary mb-1">{term}</p>
    <p className="text-xs text-muted-foreground leading-relaxed">{definition}</p>
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
      <div className="leading-relaxed">{children}</div>
    </div>
  );
};

const HomePageGuide = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold mb-4">
          <Home className="w-3.5 h-3.5" />
          <span>Navigation</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Home Page</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          The DocGenius Home Page serves as the <strong>central hub</strong> for creating and managing
          your document templates. It provides an intuitive interface for organizing templates into
          folders, filtering, searching, and managing your entire template library.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
      >
        {[
          { icon: Folder, label: "Folders", desc: "Organize templates" },
          { icon: FileText, label: "Templates", desc: "Manage & generate" },
          { icon: Search, label: "Search", desc: "Quick template lookup" },
          { icon: Settings, label: "Actions", desc: "Edit, delete, generate" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-3 rounded-xl border border-border bg-card text-center hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="text-primary flex justify-center mb-1.5">
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-semibold text-foreground text-xs mb-0.5">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          );
        })}
      </motion.div>

      {/* ─── Overview ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-8 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <Home className="w-4 h-4" />
          </div>
          Overview
        </h3>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          The Home Page is the first screen you see when you open the DocGenius app in Salesforce.
          It is designed to give you full control over your document templates from a single,
          unified view.
        </p>
        <div className="space-y-2">
          <BulletItem>
            The page where you can <strong>create and manage</strong> your DocGenius templates.
          </BulletItem>
          <BulletItem>
            Serves as a <strong>central hub</strong> for users to manage and interact with the
            templates they have created.
          </BulletItem>
          <BulletItem>
            Offers an intuitive and efficient user experience by providing essential functionalities
            like <strong>filtering, sorting, searching</strong>, managing templates, and organizing
            templates using folders.
          </BulletItem>
        </div>
      </motion.section>

      {/* ─── Folder Management ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <Folder className="w-4 h-4" />
          </div>
          Folder Management
        </h3>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Folders allow you to organize your templates into a structured hierarchy, making it easier
          to find and manage large numbers of templates. You can create nested folders to build a
          folder tree that mirrors your organization's structure.
        </p>

        <SubSection title="How to Create a Folder" icon={FolderPlus}>
          <StepItem number={1}>
            Click on the <strong>"Create New Folder"</strong> button on the Home Page.
          </StepItem>
          <StepItem number={2}>
            Enter the <strong>folder name</strong> in the input field that appears.
          </StepItem>
          <StepItem number={3}>
            Select a <strong>parent folder</strong>, or leave it empty to create a root-level folder.
          </StepItem>
          <StepItem number={4}>
            Click <strong>Save</strong> to create the folder.
          </StepItem>
          <InfoBox type="tip">
            You can create nested folder structures by selecting a parent folder. This is helpful for
            organizing templates by department, project, or document type.
          </InfoBox>
        </SubSection>

        <SubSection title="How to Rename a Folder" icon={Edit2}>
          <StepItem number={1}>
            Hover over the folder you want to rename in the folder tree on the left side.
          </StepItem>
          <StepItem number={2}>
            Click the <strong>Edit (pencil)</strong> icon that appears next to the folder name.
          </StepItem>
          <StepItem number={3}>
            Update the folder name in the input field and click <strong>Save</strong>.
          </StepItem>
        </SubSection>

        <SubSection title="How to Delete a Folder" icon={Trash2}>
          <StepItem number={1}>
            Hover over the folder you want to delete and click the <strong>Delete (trash)</strong> icon.
          </StepItem>
          <StepItem number={2}>
            A confirmation dialog will appear. Click <strong>Confirm</strong> to permanently delete
            the folder.
          </StepItem>
          <InfoBox type="warning">
            Deleting a folder will <strong>move all templates</strong> inside it to the root level
            (they will not be deleted). However, sub-folders may also be removed — review the
            folder contents before deleting.
          </InfoBox>
        </SubSection>
      </motion.section>

      {/* ─── Template Management ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-8 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <FileText className="w-4 h-4" />
          </div>
          Template Management
        </h3>

        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          The main content area of the Home Page displays your templates as cards. Each card shows
          key information about the template and provides action buttons for common operations.
        </p>

        {/* Template Info */}
        <SubSection title="Template Card Information" icon={Info}>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Each template card on the Home Page displays the following information:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: FileText, label: "Template Name", desc: "The name of the template" },
              { icon: Folder, label: "Template Type", desc: "Word, Google Doc, CSV, etc." },
              { icon: Folder, label: "Folder", desc: "The folder the template belongs to" },
              { icon: Settings, label: "Created Date", desc: "When the template was created" },
              { icon: Settings, label: "Modified Date", desc: "Last modification timestamp" },
              { icon: Settings, label: "Created By", desc: "User who created the template" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50 border border-border/50">
                  <Icon className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SubSection>

        {/* Action Buttons */}
        <SubSection title="Template Action Buttons" icon={Settings}>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Each template card provides the following action buttons:
          </p>
          <div className="space-y-2">
            <ActionButton
              icon={Edit2}
              label="Edit Template"
              desc="Open the template editor to modify the template configuration, key mappings, and settings."
            />
            <ActionButton
              icon={Sparkles}
              label="Generate Document"
              desc="Generate a document from this template using Salesforce record data. Select the target record and output format."
            />
            <ActionButton
              icon={FileText}
              label="Clone Template"
              desc="Create a duplicate of this template with all its configurations. Useful for creating similar templates quickly."
            />
            <ActionButton
              icon={Folder}
              label="Move to Folder"
              desc="Move this template to a different folder in your folder structure."
            />
            <ActionButton
              icon={Trash2}
              label="Delete Template"
              desc="Permanently delete this template. This action cannot be undone — review carefully before deleting."
            />
          </div>
        </SubSection>

        {/* Filters & Sort */}
        <SubSection title="Filter, Sort & Search" icon={Filter}>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The Home Page toolbar provides powerful options to find templates quickly:
          </p>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground mb-1">🔍 Search</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Type in the search box to instantly filter templates by name. The search is
                real-time and case-insensitive.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground mb-1">🔽 Filter</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Filter templates by <strong>Template Type</strong> (Word, Google Doc, CSV),{" "}
                <strong>Folder</strong>, or <strong>Created By</strong> to narrow down results.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground mb-1">↕️ Sort</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sort templates by <strong>Name</strong>, <strong>Created Date</strong>, or{" "}
                <strong>Modified Date</strong> in ascending or descending order.
              </p>
            </div>
          </div>
        </SubSection>
      </motion.section>

      {/* ─── DocGenius Terminology ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
            <BookOpen className="w-4 h-4" />
          </div>
          DocGenius Terminology
        </h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Familiarize yourself with these key terms used throughout DocGenius:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TermCard
            term="Template"
            definition="A reusable document structure (Word, Google Doc, or CSV) with placeholders (keys) that get replaced with actual Salesforce data when generating a document."
          />
          <TermCard
            term="Key / Placeholder"
            definition="A special marker in the template (e.g., {{AccountName}}) that DocGenius replaces with actual field values from a Salesforce record."
          />
          <TermCard
            term="Key Mapping"
            definition="The configuration that maps a template key/placeholder to a specific Salesforce object field, formula, or related record field."
          />
          <TermCard
            term="Template Type"
            definition="The format of the template — Simple Template (Word/PDF), Google Doc Template, or CSV Template."
          />
          <TermCard
            term="Folder"
            definition="A container used to organize templates into a hierarchical structure. Folders can be nested to create a tree-like organization."
          />
          <TermCard
            term="Generate Document"
            definition="The action of creating a final document by combining a template with actual Salesforce record data, replacing all keys with real values."
          />
          <TermCard
            term="Connected App"
            definition="A Salesforce configuration that allows DocGenius to securely authenticate and access Salesforce data via OAuth."
          />
          <TermCard
            term="Salesforce Object"
            definition="A Salesforce entity (like Account, Contact, Opportunity) whose record data can be used to populate template keys."
          />
        </div>
      </motion.section>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent border border-secondary/20 text-center"
      >
        <div className="text-primary flex justify-center mb-2">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">You're all set!</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Now that you understand the Home Page, explore the <strong>Template Types</strong> section
          to learn how to create your first document template.
        </p>
      </motion.div>
    </div>
  );
};

export default HomePageGuide;
