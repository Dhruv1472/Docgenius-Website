import { motion } from "framer-motion";
import {
  Cloud,
  Key,
  Folder,
  FolderOpen,
  HardDrive,
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

const IntegrationPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <Cloud className="w-3.5 h-3.5" />
          <span>Cloud Storage</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Integrations</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Connect DocGenius to external storage providers. Automatically upload generated documents to AWS S3, Google Drive, Dropbox, or Microsoft OneDrive.
        </p>
      </motion.div>

      {/* ─── Setup Integration ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Setup Integration Connection" icon={Key} />

        <div className="mb-5">
          <StepItem number={1}>
            Go to the DocGenius Admin panel and click on <strong>Integrations</strong>.
          </StepItem>
          <StepItem number={2}>
            Select the storage provider you want to configure.
          </StepItem>
          <StepItem number={3}>
            Enter the provider credentials / API credentials (e.g. AWS access keys, or click to authenticate via OAuth for Google/Dropbox/OneDrive).
          </StepItem>
          <StepItem number={4}>
            Click <strong>Test Connection</strong> to verify settings. Once verified, click <strong>Save</strong>.
          </StepItem>
        </div>
      </motion.section>

      {/* ─── Storage Configurations ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Storage Configurations" icon={Folder} />

        <div className="mb-5">
          <SubSection title="Configure Folders" icon={FolderOpen}>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Define the default path hierarchy where files should be stored. You can use dynamic variables to create folders based on Salesforce fields (e.g. `Account/Name/Year`).
            </p>
          </SubSection>

          <SubSection title="Storage Providers Supported" icon={HardDrive}>
            <div className="space-y-3">
              <BulletItem>
                <strong>AWS S3:</strong> Enter bucket name, region, access keys, and folders.
              </BulletItem>
              <BulletItem>
                <strong>Google Drive:</strong> Complete OAuth authorization, select root directory, and folder mappings.
              </BulletItem>
              <BulletItem>
                <strong>Dropbox:</strong> Authorize access and define relative upload directories.
              </BulletItem>
              <BulletItem>
                <strong>OneDrive:</strong> Connect your Microsoft 365 organization account and map default SharePoint sites or personal folders.
              </BulletItem>
            </div>
          </SubSection>

          <InfoBox type="info">
            When external storage is enabled, DocGenius still saves a dynamic log of the generated files directly inside Salesforce, including URLs to access the external files.
          </InfoBox>
        </div>
      </motion.section>
    </div>
  );
};

export default IntegrationPage;
