import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  industries,
  getIndustryIcon,
  getIndustryImage,
} from "@/data/industries";
import type { Industry, UseCase, UseCaseStep } from "@/data/industries";

const BREAKPOINTS = [
  { max: 640, cols: 2 },
  { max: 768, cols: 3 },
  { max: 1024, cols: 4 },
  { max: Infinity, cols: 6 },
] as const;

// calculate items per row based on window width
function useItemsPerRow() {
  const [itemsPerRow, setItemsPerRow] = useState(6);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const cols =
        BREAKPOINTS.find((b) => w < b.max)?.cols ?? BREAKPOINTS[BREAKPOINTS.length - 1].cols;
      setItemsPerRow(cols);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return itemsPerRow;
}

type IndustryCardProps = {
  industry: Industry;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
};

// Individual Industry Card Component without expansion panel by default vieww
function IndustryCard({ industry, index, isSelected, onSelect }: IndustryCardProps) {
  const Icon = getIndustryIcon(industry.iconKey);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={onSelect}
      className={`group bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-150 cursor-pointer flex flex-col items-center justify-center min-h-[120px] gap-3 ${
        isSelected ? "border-primary shadow-lg" : "border-border hover:border-primary/30"
      }`}
    >
      <motion.div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          isSelected ? "bg-primary shadow-lg" : "bg-primary/10 group-hover:bg-primary group-hover:shadow-lg"
        }`}
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.15 }}
      >
        {Icon && (
          <Icon
            className={`w-5 h-5 transition-colors duration-150 ${
              isSelected ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"
            }`}
          />
        )}
      </motion.div>
      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150 leading-tight text-center px-1 min-h-[2.5rem] flex items-center justify-center">
        {industry.name}
      </p>
    </motion.div>
  );
}

type StepBlockProps = {
  step: UseCaseStep;
  stepIndex: number;
};

// Individual Step Block Component used in UseCaseBlock for right left layout one stepblock for one usecase step
function StepBlock({ step, stepIndex }: StepBlockProps) {
  const imageSrc = getIndustryImage(step.imageKey);
  const isReversed = stepIndex % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + stepIndex * 0.15 }}
      className={`flex flex-col gap-8 items-center ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        className="w-full lg:w-1/2"
        whileHover={{ scale: 1.03}}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent min-h-[200px] flex items-center justify-center">
          <img
            src={imageSrc}
            alt={step.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>

      <div className="w-full lg:w-1/2 space-y-4">
        <h5 className="text-xl md:text-2xl font-bold font-display mb-4 text-foreground">
          {step.title}
        </h5>
        <div className="space-y-4">
          <InfoBox label="Feature Used" content={step.featureUsed} delay={0.4 + stepIndex * 0.15} />
          <InfoBox
            label="Workflow"
            content={step.workflow}
            delay={0.5 + stepIndex * 0.15}
            variant="muted"
          />
          {step.additionalInfo?.map((info, i) => (
            <InfoBox
              key={i}
              label={info.label}
              content={info.content}
              delay={0.6 + stepIndex * 0.15 + i * 0.1}
              variant="primary"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

type InfoBoxProps = {
  label: string;
  content: string;
  delay: number;
  variant?: "default" | "muted" | "primary";
};

// Info Box Component used in StepBlock for right left layout besides image
function InfoBox({ label, content, delay, variant = "default" }: InfoBoxProps) {
  const variantClasses = {
    default: "bg-card border-primary/20 shadow-md",
    muted: "bg-muted/50 border-border",
    primary: "bg-primary/5 border-primary/20",
  };
  const x = variant === "muted" ? -20 : 20;
  const contentClass =
    variant === "muted"
      ? "text-sm text-muted-foreground leading-relaxed"
      : "text-sm text-foreground font-medium leading-relaxed";

  return (
    <motion.div
      initial={{ opacity: 0, x }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-lg p-4 border ${variantClasses[variant]}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary/70 mb-1">{label}:</p>
          <p className={contentClass}>{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

type UseCaseBlockProps = {
  useCase: UseCase;
  useCaseIndex: number;
};

// Renders one full use case: title, “The Scenario”, “The Solution” + description, and steps generated via StepBlock
function UseCaseBlock({ useCase, useCaseIndex }: UseCaseBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: useCaseIndex * 0.2 }}
      className="space-y-10"
    >
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <motion.h4
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold font-display gradient-text"
        >
          {useCase.title}
        </motion.h4>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-xl p-6 border border-border"
        >
          <p className="text-sm font-semibold text-primary mb-3">The Scenario:</p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {useCase.scenario}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20"
        >
          <p className="text-sm font-semibold text-primary mb-3">The Solution:</p>
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">{useCase.solution}</p>
          <p className="text-sm md:text-base text-muted-foreground">{useCase.description}</p>
        </motion.div>
      </div>
      <div className="space-y-12 mt-12">
        {useCase.steps.map((step, stepIdx) => (
          <StepBlock key={stepIdx} step={step} stepIndex={stepIdx} />
        ))}
      </div>
    </motion.div>
  );
}

type ExpansionPanelProps = {
  industry: Industry;
  selectedIndex: number;
};

// Expansion Panel Component that shows when an industry is selected
function ExpansionPanel({ industry, selectedIndex }: ExpansionPanelProps) {
  const Icon = getIndustryIcon(industry.iconKey);

  return (
    <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-primary/30 rounded-2xl p-8 mt-6 mb-6">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20">
        <div className="flex-shrink-0 w-16 h-16 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
          {Icon && <Icon className="w-8 h-8 text-primary-foreground" />}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold font-display gradient-text">
            {industry.name}
          </h3>
          <p className="text-muted-foreground mt-1">{industry.description}</p>
        </div>
      </div>
      {industry.useCases.length > 0 ? (
        <div className="space-y-16">
          {industry.useCases.map((useCase, idx) => (
            <UseCaseBlock key={idx} useCase={useCase} useCaseIndex={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Use cases coming soon for this industry.</p>
        </div>
      )}
    </div>
  );
}

// Main Industries Section Component
export function IndustriesSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const itemsPerRow = useItemsPerRow();

  const handleIndustryClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  useEffect(() => {
    setSelectedIndex(null);
  }, [itemsPerRow]);

  const rows: React.ReactNode[] = [];
  for (let i = 0; i < industries.length; i += itemsPerRow) {
    const rowItems = industries.slice(i, i + itemsPerRow);
    const rowIndex = Math.floor(i / itemsPerRow);
    const selectedInRow =
      selectedIndex !== null && selectedIndex >= i && selectedIndex < i + itemsPerRow;

    rows.push(
      <div key={`row-${rowIndex}`} className="contents">
        {rowItems.map((industry, indexInRow) => {
          const absoluteIndex = i + indexInRow;
          return (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={absoluteIndex}
              isSelected={selectedIndex === absoluteIndex}
              onSelect={() => handleIndustryClick(absoluteIndex)}
            />
          );
        })}
        <AnimatePresence mode="wait" initial={false}>
          {selectedInRow && selectedIndex !== null && (
            <motion.div
              key={`expansion-${rowIndex}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="col-span-full overflow-hidden"
            >
              <ExpansionPanel industry={industries[selectedIndex]} selectedIndex={selectedIndex} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Main Industries Section Component without expansion panel
  return (
    <section id="industries" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Built for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            That runs on documents
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {rows}
        </div>
      </div>
    </section>
  );
}
