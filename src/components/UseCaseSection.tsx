import { motion } from "framer-motion";
import { MousePointer, FileText, Send, Database, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LINKS } from "@/lib/utils";

const steps = [
  { icon: MousePointer, label: "Open Record", description: "Open any Salesforce record" },
  { icon: FileText, label: "Generate", description: "Click Generate Document" },
  { icon: CheckCircle, label: "Auto-Generate", description: "DocGenius generates the document" },
  { icon: Send, label: "Send for Signature", description: "Sent for digital signature" },
  { icon: Database, label: "Auto-Store", description: "Stored automatically in Salesforce" },
];

export const UseCaseSection = () => {
  return (
    <section id="usecase" className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            From Salesforce Record to <span className="gradient-text">Ready Document</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how simple document generation can be
          </p>
        </motion.div>

        {/* Use Case Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12 mb-12 shadow-lg overflow-hidden"
        >
          <div className="lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <img 
                src="/src/assets/case-hero.png" 
                alt="Instant Branded Contracts from Salesforce - DocGenius"
                className="w-full rounded-lg shadow-md object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xl md:text-2xl font-bold font-display gradient-text mt-6">
                No manual work. No errors. No delays.
              </p>
            </div>
          </div>
        </motion.div> 

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-xl p-6 text-center h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4 transition-all ease-in-out group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <h4 className="font-semibold font-display mb-1">{step.label}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-4 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <a href={CTA_LINKS.bookDemo} target="_blank" rel="noreferrer">
              Book a Demo
            </a>
          </Button>
          <Button variant="hero-outline" size="lg" asChild>
            <a href={CTA_LINKS.freeTrial} target="_blank" rel="noreferrer">
              Start Free Trial
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
