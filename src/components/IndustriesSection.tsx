import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  { icon: Building2, name: "Real Estate", description: "Industry focused on property development, sales, and management." },
  { icon: Landmark, name: "Financial Services", description: "Industry providing banking, investment, and insurance services." },
  { icon: Code, name: "IT & Software (SaaS)", description: "Industry specializing in software development and IT solutions." },
  { icon: HeartPulse, name: "Healthcare", description: "Industry dedicated to medical services, health management, and patient care." },
  { icon: Users, name: "HR Teams", description: "Industry focused on human resources, recruitment, and employee management." },
  { icon: Factory, name: "Manufacturing", description: "Industry involved in the production of goods and materials." },
  { icon: Scale, name: "Legal & Professional", description: "Industry providing legal services, consulting, and professional advice." },
  { icon: GraduationCap, name: "Education & Training", description: "Industry focused on learning, training, and educational services." },
  { icon: ShoppingCart, name: "Retail & E-Commerce", description: "Industry involved in the sale of goods and services to consumers." },
  { icon: Truck, name: "Logistics & Supply Chain", description: "Industry managing the transportation and distribution of goods." },
  { icon: Building, name: "Government & Public", description: "Industry involving government services and public administration." },
  { icon: HeadphonesIcon, name: "Customer Support", description: "Industry focused on customer service and support operations." },
];

export const IndustriesSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleIndustryClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const getItemsPerRow = () => {
    if (typeof window === 'undefined') return 6;
    const width = window.innerWidth;
    if (width < 640) return 2; // Mobile
    if (width < 768) return 3; // sm
    if (width < 1024) return 4; // md
    return 6; // lg
  };

  const renderIndustriesWithExpansion = () => {
    const itemsPerRow = getItemsPerRow();
    const rows: JSX.Element[] = [];
    
    for (let i = 0; i < industries.length; i += itemsPerRow) {
      const rowItems = industries.slice(i, i + itemsPerRow);
      const rowIndex = Math.floor(i / itemsPerRow);
      
      // Check if any item in this row is selected
      const selectedInRow = selectedIndex !== null && 
        selectedIndex >= i && 
        selectedIndex < i + itemsPerRow;
      
      rows.push(
        <div key={`row-${rowIndex}`} className="contents">
          {rowItems.map((industry, indexInRow) => {
            const absoluteIndex = i + indexInRow;
            const isSelected = selectedIndex === absoluteIndex;
            
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: absoluteIndex * 0.05 }}
                onClick={() => handleIndustryClick(absoluteIndex)}
                className={`group bg-card border rounded-xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                  isSelected ? 'border-primary shadow-lg' : 'border-border hover:border-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors duration-300 ${
                  isSelected ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'
                }`}>
                  <industry.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{industry.name}</p>
              </motion.div>
            );
          })}
          
          {selectedInRow && selectedIndex !== null && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`expansion-${rowIndex}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-full"
              >
                <div className="bg-card border border-primary/50 rounded-xl p-6 mt-4 mb-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                      {(() => {
                        const Icon = industries[selectedIndex].icon;
                        return <Icon className="w-6 h-6 text-primary-foreground" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold font-display mb-2">
                        {industries[selectedIndex].name}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {industries[selectedIndex].description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      );
    }
    
    return rows;
  };

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
          {renderIndustriesWithExpansion()}
        </div>
      </div>
    </section>
  );
};
