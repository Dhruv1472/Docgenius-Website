import { motion } from "framer-motion";
import { Cloud, Code2, TrendingUp, Shield, Sparkles, Users } from "lucide-react";

const reasons = [
  {
    icon: Cloud,
    title: "Built for Salesforce",
    description: "Native integration delivers seamless, high-performance document generation directly within your Salesforce environment.",
  },
  {
    icon: Code2,
    title: "No Coding Needed",
    description: "Easily create professional documents with no technical expertise needed, using powerful document generation tools that are simple and accessible.",
  },
  {
    icon: TrendingUp,
    title: "Scales with Your Business",
    description: "Whether you're generating one document or millions, DocGenius handles your needs quickly and growing with your business.",
  },
  {
    icon: Shield,
    title: "Secure, Role-Based Access",
    description: "Control document creation with flexible, role-based access and maintain the security of your data within the Salesforce.",
  },
  {
    icon: Sparkles,
    title: "User-Friendly & Fast Setup",
    description: "Get started instantly with an intuitive interface, designed for quick setup and smooth operation.",
  },
  {
    icon: Users,
    title: "Made for Real Users",
    description: "Eliminate errors, increase productivity, and streamline your document creation process with the best document generation software for all businesses.",
  },
];

export const WhyChooseSection = () => {
  return (
    <section id="why-docgenius" className="section-padding bg-surface">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Why Choose <span className="gradient-text">DocGenius?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate Documents at Salesforce Speed. Smarter. Faster. Instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 ease-in-out relative overflow-visible h-[11rem] md:h-[12rem]"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center transition-all ease-in-out group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="transition-all duration-700 ease-in-out pl-16">
                  <h3 className="text-lg font-bold font-display mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
