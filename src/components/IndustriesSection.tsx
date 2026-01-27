import { motion } from "framer-motion";
import {
  Building2,
  Landmark,
  Code,
  HeartPulse,
  Users,
  Factory,
  Scale,
  GraduationCap,
  ShoppingCart,
  Truck,
  Building,
  HeadphonesIcon,
} from "lucide-react";

const industries = [
  { icon: Building2, name: "Real Estate" },
  { icon: Landmark, name: "Financial Services" },
  { icon: Code, name: "IT & Software (SaaS)" },
  { icon: HeartPulse, name: "Healthcare" },
  { icon: Users, name: "HR Teams" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Scale, name: "Legal & Professional" },
  { icon: GraduationCap, name: "Education & Training" },
  { icon: ShoppingCart, name: "Retail & E-Commerce" },
  { icon: Truck, name: "Logistics & Supply Chain" },
  { icon: Building, name: "Government & Public" },
  { icon: HeadphonesIcon, name: "Customer Support" },
];

export const IndustriesSection = () => {
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
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                <industry.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{industry.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
