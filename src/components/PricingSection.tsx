import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Up to 50 documents/month",
      "2 templates",
      "PDF export",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/user/month",
    description: "For growing teams",
    features: [
      "Unlimited documents",
      "Unlimited templates",
      "PDF, DOCX, CSV exports",
      "Digital signatures",
      "Bulk generation",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantees",
      "Advanced security",
      "Custom training",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState("Professional");

  return (
    <section id="pricing" className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Simple & Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative bg-card border rounded-2xl p-8 flex flex-col cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.name
                  ? "border-primary shadow-xl scale-105"
                  : "border-border hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {selectedPlan === plan.name && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg rounded-full text-sm font-semibold text-primary-foreground">
                  Selected
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold font-display mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold font-display">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={selectedPlan === plan.name ? "hero" : "outline"}
                size="lg"
                className="w-full mt-auto"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
