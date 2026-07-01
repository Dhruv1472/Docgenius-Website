import { motion } from "framer-motion";
import {
  PenTool,
  Link,
  Zap,
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

const DocumentSigningPage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <motion.div {...fadeInSection} className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
          <PenTool className="w-3.5 h-3.5" />
          <span>Signing</span>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3">Document Signing Page</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          DocGenius provides a secure signature collection page where recipients can preview, verify, and e-sign generated documents instantly.
        </p>
      </motion.div>

      {/* ─── Signing Workflow ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="1" title="The Signing Workflow" icon={Link} />

        <div className="mb-5">
          <StepItem number={1}>
            Once document generation is triggered with signature enabled, the recipient receives a unique signing link via email.
          </StepItem>
          <StepItem number={2}>
            Clicking the link opens the secure <strong>Document Signing Page</strong>. No Salesforce login or DocGenius account is required for the recipient.
          </StepItem>
          <StepItem number={3}>
            The recipient can read and verify the entire document content in the embedded viewer.
          </StepItem>
          <StepItem number={4}>
            Clicking the signature zones opens the signature entry dialog.
          </StepItem>
        </div>
      </motion.section>

      {/* ─── Signing Options ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="2" title="Signature Input Options" icon={PenTool} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            Recipients can complete their signature using three methods:
          </p>

          <div className="space-y-3">
            <BulletItem>
              <strong>Draw:</strong> Draw a freehand signature using a mouse, trackpad, or touchscreen.
            </BulletItem>
            <BulletItem>
              <strong>Type:</strong> Type their name and select from styled cursive fonts to generate an aesthetic signature.
            </BulletItem>
            <BulletItem>
              <strong>Upload:</strong> Upload a pre-scanned signature image from their computer or mobile device.
            </BulletItem>
          </div>
        </div>
      </motion.section>

      {/* ─── Post-Signing ─── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 p-6 rounded-2xl border border-border bg-card shadow-sm"
      >
        <SectionTitle number="3" title="Post-Signing Actions" icon={Zap} />

        <div className="mb-5">
          <p className="text-sm text-foreground leading-relaxed mb-4">
            After the document is signed and submitted:
          </p>

          <div className="space-y-2">
            <BulletItem>DocGenius flattens the signature into the document layout.</BulletItem>
            <BulletItem>The signed document is saved back to Salesforce Files (or external cloud storage).</BulletItem>
            <BulletItem>The target Salesforce record status is updated automatically to show that signing is complete.</BulletItem>
            <BulletItem>Both parties receive a signed confirmation copy via email.</BulletItem>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DocumentSigningPage;
