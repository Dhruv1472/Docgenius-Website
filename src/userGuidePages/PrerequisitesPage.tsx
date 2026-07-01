import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Link, 
  Globe, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  HelpCircle,
  LucideIcon 
} from "lucide-react";
import { GuideImage } from "@/components/GuideImage";

const StepCard = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex gap-4 mb-6"
  >
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
      {number}
    </div>
    <div className="flex-1">
      <p className="font-semibold text-foreground mb-1">{title}</p>
      <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
    </div>
  </motion.div>
);

const PathBadge = ({ children }: { children: React.ReactNode }) => (
  <code className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/8 border border-primary/15 text-primary text-xs font-medium mx-0.5">
    {children}
  </code>
);

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

const fadeInSection = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const PrerequisitesPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Getting Started</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Prerequisites</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Before using DocGenius, you need to configure a few settings in your Salesforce organization.
          Complete the following steps in order to enable full functionality.
        </p>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
      >
        {[
          { icon: Link, title: "Connected App", desc: "Create a Salesforce Connected App for OAuth access" },
          { icon: Globe, title: "Trusted URL", desc: "Add DocGenius as a Trusted URL in Salesforce" },
          { icon: Zap, title: "Lightning Security", desc: "Enable Lightning Web Security settings" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="text-primary mb-2">
                <Icon className="w-6 h-6" />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </motion.div>

      {/* ─── SECTION 1: Connected App ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="Connected App" icon={Link} />

        <div className="mb-5">
          <p className="text-sm text-muted-foreground mb-1 font-medium">Purpose</p>
          <p className="text-sm text-foreground leading-relaxed">
            A Connected App is required to get an <strong>access token</strong> for accessing Salesforce
            records, creating custom buttons, and generating documents via DocGenius.
          </p>
        </div>

        <div className="mb-2">
          <p className="text-sm font-semibold text-foreground mb-4">Setup Steps:</p>

          <StepCard number="1" title="Enable External Client App creation">
            Navigate to{" "}
            <PathBadge>Setup</PathBadge>→<PathBadge>External Client Apps</PathBadge>→
            <PathBadge>Settings</PathBadge>
            {" "}and enable the <strong>"Allow creation of connected apps"</strong> option.
          </StepCard>

          <GuideImage
            imageName="Prerequisites_1"
            alt="Salesforce External Client App Settings"
            caption="Salesforce Settings: Allow creation of connected apps."
          />

          <StepCard number="2" title="Create a New Connected App">
            After enabling the setting, click the <strong>"New Connected App"</strong> button that
            appears in the External Client Apps section.
          </StepCard>

          <StepCard number="3" title="Enter Basic Information">
            In the <strong>Basic Information</strong> section:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Enter <strong>DG Connect</strong> as the <em>Connected App Name</em></li>
              <li>Enter your <strong>email address</strong> in the Contact Email field</li>
            </ul>
          </StepCard>

          <GuideImage
            imageName="Prerequisites_2"
            alt="Connected App Basic Information"
            caption="Basic Information: Enter Connected App Name and contact email address."
          />

          <StepCard number="4" title="Enable OAuth Settings">
            Scroll down to the <strong>API (Enable OAuth Settings)</strong> section:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Check <strong>"Enable OAuth Settings"</strong></li>
              <li>
                Set the <em>Callback URL</em> to your DocGenius app URL (e.g.,{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                  https://your-org.salesforce.com/apex/docgenius
                </code>
                )
              </li>
            </ul>
          </StepCard>

          <StepCard number="5" title="Add Required OAuth Scopes">
            Add the following OAuth scopes:
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Access and manage your data (api)",
                "Full access (full)",
                "Perform requests at any time (refresh_token)",
              ].map((scope) => (
                <span
                  key={scope}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium"
                >
                  ✓ {scope}
                </span>
              ))}
            </div>
          </StepCard>

          <GuideImage
            imageName="Prerequisites_3"
            alt="API Enable OAuth Settings"
            caption="API Settings: Enable OAuth Settings, Callback URL, and select OAuth scopes."
          />

          <StepCard number="6" title="Save and Wait">
            Click <strong>Save</strong>. Salesforce may take <strong>2–10 minutes</strong> to apply
            the changes before the Connected App becomes active.
          </StepCard>

          <StepCard number="7" title="Retrieve Consumer Key and Consumer Secret">
            Go to <PathBadge>Setup</PathBadge>→<PathBadge>App Manager</PathBadge>, locate your <strong>DG Connect</strong> app, click the dropdown arrow on the right, and select <strong>View</strong>. Click the <strong>"Manage Consumer Details"</strong> button to verify and view your credentials.
          </StepCard>

          <GuideImage
            imageName="Prerequisites_4"
            alt="Manage Consumer Details in App Manager"
            caption="App Manager: Locate Connected App and click Manage Consumer Details."
          />

          <GuideImage
            imageName="Prerequisites_5"
            alt="Retrieve Consumer Key and Consumer Secret"
            caption="Consumer Details: Verify identity to view and copy the Consumer Key and Consumer Secret."
          />

          <StepCard number="8" title="Configure Connected App Policies">
            Click <strong>Manage</strong> on the Connected App page, then click <strong>Edit Policies</strong>:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Set <em>Permitted Users</em> to <strong>"All users may self-authorize"</strong></li>
              <li>Set <em>IP Relaxation</em> to <strong>"Relax IP restrictions"</strong></li>
            </ul>
          </StepCard>

          <GuideImage
            imageName="Prerequisites_6"
            alt="Salesforce Connected App Policies"
            caption="App Policies: Configure Permitted Users and IP Relaxation."
          />
        </div>

        <InfoBox type="tip">
          After creating the Connected App, copy the <strong>Consumer Key</strong> and{" "}
          <strong>Consumer Secret</strong> from the Connected App detail page — you'll need these
          when configuring DocGenius.
        </InfoBox>
      </motion.section>

      {/* ─── SECTION 2: Trusted URL ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Trusted URL" icon={Globe} />

        <p className="text-sm text-foreground leading-relaxed mb-5">
          Salesforce Lightning requires all external domains to be added as Trusted URLs to allow
          proper rendering and communication. You must add the DocGenius application domain as a
          trusted URL in your organization's settings.
        </p>

        <div className="mb-2">
          <p className="text-sm font-semibold text-foreground mb-4">Setup Steps:</p>

          <StepCard number="1" title="Open Trusted URLs Settings">
            Go to <PathBadge>Setup</PathBadge>→<PathBadge>Security</PathBadge>→
            <PathBadge>Trusted URLs</PathBadge> (or search for "Trusted URLs" in Setup Quick Find).
          </StepCard>

          <StepCard number="2" title="Add New Trusted URL">
            Click <strong>"New Trusted URL"</strong> and fill in:
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>
                <em>API Name:</em> <code className="text-xs bg-muted px-1 py-0.5 rounded">DocGenius</code>
              </li>
              <li>
                <em>URL:</em>{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
                  https://docgenius.app
                </code>{" "}
                (or your specific DocGenius domain)
              </li>
            </ul>
          </StepCard>

          <StepCard number="3" title="Enable Directives">
            Enable the following Content Security Policy (CSP) directives:
            <div className="flex flex-wrap gap-2 mt-2">
              {["connect-src", "font-src", "frame-src", "img-src", "script-src", "style-src"].map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center px-2.5 py-1 rounded bg-muted text-xs font-mono text-muted-foreground border border-border"
                >
                  {d}
                </span>
              ))}
            </div>
          </StepCard>

          <StepCard number="4" title="Save">
            Click <strong>Save</strong> to apply the Trusted URL configuration.
          </StepCard>
        </div>

        <GuideImage
          imageName="Prerequisites_7"
          alt="Salesforce Trusted URL Settings"
          caption="Trusted URL Configuration: Add the DocGenius API Name and URL, then select CSP directives."
        />

        <InfoBox type="warning">
          Without the Trusted URL configuration, the DocGenius app may fail to load or display
          security errors in Salesforce Lightning Experience.
        </InfoBox>
      </motion.section>

      {/* ─── SECTION 3: Lightning Security ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Enable Lightning Security" icon={ShieldCheck} />

        <p className="text-sm text-foreground leading-relaxed mb-5">
          Lightning Web Security (LWS) must be enabled to allow DocGenius components to run
          securely within Salesforce Lightning Experience.
        </p>

        <div className="mb-2">
          <p className="text-sm font-semibold text-foreground mb-4">Setup Steps:</p>

          <StepCard number="1" title="Open Session Settings">
            Navigate to{" "}
            <PathBadge>Setup</PathBadge>→<PathBadge>Security</PathBadge>→
            <PathBadge>Session Settings</PathBadge>
          </StepCard>

          <StepCard number="2" title="Enable Lightning Web Security">
            Scroll down to the <strong>"Lightning Web Security"</strong> section and toggle{" "}
            <strong>"Use Lightning Web Security for Lightning web components and Aura components"</strong>{" "}
            to <strong>Enabled</strong>.
          </StepCard>

          <StepCard number="3" title="Save Settings">
            Click <strong>Save</strong> to apply the changes.
          </StepCard>
        </div>

        <GuideImage
          imageName="Prerequisites_8"
          alt="Enable Lightning Web Security"
          caption="Session Settings: Toggle Use Lightning Web Security to Enabled."
        />

        <InfoBox type="info">
          Lightning Web Security replaces the older Locker Service and provides enhanced security
          isolation. It is required for DocGenius to function correctly.
        </InfoBox>
      </motion.section>

      {/* Done Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-primary/20 text-center"
      >
        <div className="text-primary flex justify-center mb-2">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Prerequisites Complete!</h3>
        <p className="text-sm text-muted-foreground">
          You've completed all the prerequisite configurations. You can now proceed to use
          DocGenius to create and manage your document templates.
        </p>
      </motion.div>
    </div>
  );
};

export default PrerequisitesPage;
