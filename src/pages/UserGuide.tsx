import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import DocPage from "@/components/DocPage";
import {
  ClipboardList,
  Home,
  FileText,
  Key,
  Map,
  PlusSquare,
  Cloud,
  Zap,
  GitBranch,
  Calendar,
  Layers,
  PenTool,
  Tag,
  Mail,
  ChevronDown,
  BookMarked
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Markdown content imports ─────────────────────────────────────────────────
// Each section is a plain .md file — edit these files to update content.
// Images: use standard markdown syntax: ![caption](S3_URL)
import prerequisitesMd from "@/content/userGuide/prerequisites.md?raw";
import homePageMd from "@/content/userGuide/home-page.md?raw";
import templateTypesMd from "@/content/userGuide/template-types.md?raw";
import customKeyManagerMd from "@/content/userGuide/custom-key-manager.md?raw";
import keyMappingMd from "@/content/userGuide/key-mapping.md?raw";
import buttonGeneratorMd from "@/content/userGuide/button-generator.md?raw";
import integrationMd from "@/content/userGuide/integration.md?raw";
import documentGeneratorMd from "@/content/userGuide/document-generator.md?raw";
import flowGenerationMd from "@/content/userGuide/flow-generation.md?raw";
import scheduleTemplateMd from "@/content/userGuide/schedule-template.md?raw";
import bulkGenerationMd from "@/content/userGuide/bulk-generation.md?raw";
import documentSigningMd from "@/content/userGuide/document-signing.md?raw";
import dynamicNameMd from "@/content/userGuide/dynamic-name.md?raw";

/* ─── Type Definitions ─────────────────────────────────────────── */
interface GuideSection {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  content: string;
  comingSoon?: boolean;
}

/* ─── Guide Sections Config ─────────────────────────────────────── */
const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "prerequisites",
    label: "Prerequisites",
    icon: ClipboardList,
    description: "Salesforce setup: Connected App, Trusted URL & Lightning Security",
    content: prerequisitesMd,
  },
  {
    id: "home-page",
    label: "Home Page",
    icon: Home,
    description: "Overview, folder management & template navigation",
    content: homePageMd,
  },
  {
    id: "template-types",
    label: "Template Types",
    icon: FileText,
    description: "Simple, Google Doc, and CSV template types",
    content: templateTypesMd,
  },
  {
    id: "custom-key-manager",
    label: "Custom Key Manager",
    icon: Key,
    description: "Manage, create and query Custom Keys using SOQL Builder",
    content: customKeyManagerMd,
  },
  {
    id: "key-mapping",
    label: "Key Mapping",
    icon: Map,
    description: "Format fields, map custom keys, related lists, and signatures",
    content: keyMappingMd,
  },
  {
    id: "button-generator",
    label: "Button Generator",
    icon: PlusSquare,
    description: "Deploy Quick Action, List View & Related List buttons",
    content: buttonGeneratorMd,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Cloud,
    description: "AWS S3, Google Drive, Dropbox, OneDrive integration",
    content: integrationMd,
  },
  {
    id: "document-generator",
    label: "Document Generator",
    icon: Zap,
    description: "Process document generation with preview and storage",
    content: documentGeneratorMd,
  },
  {
    id: "flow-generation",
    label: "Flow Generation",
    icon: GitBranch,
    description: "Automate document generation using Salesforce Flows",
    content: flowGenerationMd,
  },
  {
    id: "schedule-template",
    label: "Scheduled Templates",
    icon: Calendar,
    description: "Generate documents automatically on a recurring schedule",
    content: scheduleTemplateMd,
  },
  {
    id: "bulk-generation",
    label: "Bulk Generation",
    icon: Layers,
    description: "Generate documents for multiple records in batches",
    content: bulkGenerationMd,
  },
  {
    id: "document-signing",
    label: "Document Signing",
    icon: PenTool,
    description: "Secure recipient document e-signing portal",
    content: documentSigningMd,
  },
  {
    id: "dynamic-name",
    label: "Dynamic File Name",
    icon: Tag,
    description: "Dynamically name generated files using fields or dates",
    content: dynamicNameMd,
  },
];

/* ─── Main UserGuide Component ─────────────────────────────────── */
const UserGuide = () => {
  const [activeId, setActiveId] = useState<string>("prerequisites");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSection = GUIDE_SECTIONS.find((s) => s.id === activeId)!;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo
        title="DocGenius User Guide | Step-by-Step Setup"
        description="Follow the DocGenius user guide to configure templates, connect Salesforce objects, and automate document generation across your teams."
        path="/userguide"
        type="article"
      />
      <Header />

      <main className="flex-1 pt-20 pb-16">
        {/* ─── Page Hero ─── */}
        <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 py-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
                <BookMarked className="w-3.5 h-3.5" /> Documentation
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                DocGenius User Guide
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
                Everything you need to set up, configure, and use DocGenius to automate document
                generation directly within Salesforce.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ─── Main Layout ─── */}
        <div className="container mx-auto px-4 mt-8">
          <div className="flex flex-col md:flex-row gap-8 relative">
            {/* ─── Left Sidebar (Desktop/Tablet) ─── */}
            <aside className="hidden md:block md:w-60 lg:w-72 flex-shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 pb-6 space-y-3 scrollbar-thin">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-2">
                  Guide Sections
                </p>
                {GUIDE_SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => !section.comingSoon && setActiveId(section.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl transition-all duration-200 border group shadow-sm ${section.comingSoon
                      ? "opacity-50 cursor-not-allowed border-dashed border-border bg-muted/20"
                      : activeId === section.id
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-border/80 hover:border-primary/20 hover:bg-accent/5"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeId === section.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                        }`}>
                        <section.icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-semibold truncate ${activeId === section.id
                              ? "text-primary"
                              : "text-foreground group-hover:text-primary"
                              }`}
                          >
                            {section.label}
                          </span>
                          {section.comingSoon && (
                            <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium">
                              Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Sidebar Footer */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/15">
                  <p className="text-xs font-semibold text-foreground mb-1">Need Help?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Can't find what you're looking for? Contact our support team.
                  </p>
                  <a
                    href="mailto:support@docgenius.com"
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Contact Support
                  </a>
                </div>
              </div>
            </aside>

            {/* ─── Mobile Section Navigation ─── */}
            <div className="md:hidden w-full mb-6">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  {activeSection.icon && <activeSection.icon className="w-5 h-5 text-primary" />}
                  <span className="font-semibold text-foreground text-sm">{activeSection.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-2 rounded-xl border border-border bg-card shadow-lg space-y-1 z-10"
                  >
                    {GUIDE_SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          if (!section.comingSoon) {
                            setActiveId(section.id);
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 ${section.comingSoon
                          ? "opacity-50 cursor-not-allowed"
                          : activeId === section.id
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-foreground"
                          }`}
                      >
                        {section.icon && <section.icon className="w-4 h-4" />}
                        <span className="text-sm font-medium">{section.label}</span>
                        {section.comingSoon && (
                          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                            Soon
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ─── Content Area ─── */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <motion.div
                key={activeId + "-breadcrumb"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:flex items-center gap-2 text-sm text-muted-foreground mb-6"
              >
                <span>User Guide</span>
                <span className="text-border">›</span>
                <span className="text-foreground font-medium flex items-center gap-1.5">
                  {activeSection.icon && <activeSection.icon className="w-4 h-4 text-primary" />}
                  {activeSection.label}
                </span>
              </motion.div>

              {/* Content with page transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* ✅ DocPage renders the .md file content — edit the .md file to update this section */}
                  <DocPage content={activeSection.content} />
                </motion.div>
              </AnimatePresence>

              {/* Bottom Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
              >
                {/* Prev */}
                {(() => {
                  const idx = GUIDE_SECTIONS.findIndex((s) => s.id === activeId);
                  const prev = GUIDE_SECTIONS.slice(0, idx).reverse().find((s) => !s.comingSoon);
                  return prev ? (
                    <button
                      onClick={() => setActiveId(prev.id)}
                      className="flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group text-center sm:text-left"
                    >
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">←</span>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Previous</p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {prev.icon && <prev.icon className="w-3.5 h-3.5" />}
                          {prev.label}
                        </p>
                      </div>
                    </button>
                  ) : (
                    <div />
                  );
                })()}

                {/* Next */}
                {(() => {
                  const idx = GUIDE_SECTIONS.findIndex((s) => s.id === activeId);
                  const next = GUIDE_SECTIONS.slice(idx + 1).find((s) => !s.comingSoon);
                  return next ? (
                    <button
                      onClick={() => setActiveId(next.id)}
                      className="flex items-center justify-center sm:justify-end gap-2.5 px-4 py-2.5 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group text-center sm:text-right"
                    >
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next</p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                          {next.label}
                          {next.icon && <next.icon className="w-3.5 h-3.5" />}
                        </p>
                      </div>
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                    </button>
                  ) : (
                    <div />
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserGuide;
