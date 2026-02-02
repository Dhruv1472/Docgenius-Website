import { useEffect, useState } from "react";
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
  CheckCircle2,
} from "lucide-react";

interface UseCaseStep {
  title: string;
  featureUsed: string;
  workflow: string;
  additionalInfo?: { label: string; content: string }[];
  image: string;
}

interface UseCase {
  title: string;
  scenario: string;
  solution: string;
  description: string;
  steps: UseCaseStep[];
}

interface Industry {
  icon: any;
  name: string;
  description: string;
  useCases: UseCase[];
}

const industries: Industry[] = [
  { 
    icon: Building2, 
    name: "Real Estate", 
    description: "Industry focused on property development, sales, and management.",
    useCases: [
      {
        title: "Automated Lease Agreements & Property Sales Contracts",
        scenario: "\"Prime Estates,\" a real estate agency using Salesforce, struggles with the manual creation of Lease Agreements and Sales Contracts. Their agents waste time copy-pasting client names, property addresses, and terms into Word documents. They often forget to attach property photos, make errors in rental amounts, and face delays in getting signatures.",
        solution: "DocGenius Implementation",
        description: "Here is how DocGenius streamlines the entire lifecycle of a property transaction:",
        steps: [
          {
            title: "1. Template Creation & Organization (Admin Setup)",
            featureUsed: "Template Editor (Google Doc/Internal Editor) & Folder-based Management (Point 1 & 11).",
            workflow: "The Admin creates a master \"Residential Lease Agreement\" template. They use the Folder-based management to keep \"Commercial Leases,\" \"Residential Sales,\" and \"Renewal Notices\" organized separately.",
            additionalInfo: [
              {
                label: "Mapping",
                content: "Using the Drag and Drop mapping (Point 1), they map fields from the Property (Parent Object) and Tenant (Contact Object). They specifically map the \"Rent Amount,\" \"Lease Start Date,\" and \"Security Deposit\" fields without writing any complex queries."
              }
            ],
            image: "/src/assets/Real Estate/Real1.png"
          },
          {
            title: "2. Visuals & Dynamic Content",
            featureUsed: "Image Support & Child Object Mapping (Point 1).",
            workflow: "The template is configured to automatically pull the primary photo of the house from Salesforce (or an external URL) and place it at the top of the contract.",
            additionalInfo: [
              {
                label: "Complex Data",
                content: "If there are multiple co-tenants, the Child Object Table feature automatically lists all names and contact details in a neat table within the document."
              }
            ],
            image: "/src/assets/Real Estate/Real2.png"
          },
          {
            title: "3. One-Click Generation for Agents",
            featureUsed: "Default Document Process / Button Generation (Point 8 & 10).",
            workflow: "An agent is on a Property Record page in Salesforce. Instead of manually typing a contract, they simply click a custom \"Generate Lease\" button.",
            additionalInfo: [
              {
                label: "Automation",
                content: "DocGenius automatically selects the correct template, pulls the live data, and prepares the PDF."
              }
            ],
            image: "/src/assets/Real Estate/Real3.png"
          },
          {
            title: "4. The \"Negotiation\" Phase (Crucial Differentiator)",
            featureUsed: "Real-time Document Editor (Point 12).",
            workflow: "During the preview, the agent realizes the client negotiated a slightly lower rent or a different move-in date. Instead of going back to Salesforce to update the record and re-generate the whole document, the agent uses the Real-time Document Editor. They modify the specific rent value directly in the preview.",
            additionalInfo: [
              {
                label: "Result",
                content: "The specific document is updated instantly for the client without altering the master template."
              }
            ],
            image: "/src/assets/Real Estate/Real4.png"
          },
          {
            title: "5. Closing the Deal: Integrated E-Signature",
            featureUsed: "Signature Function (Point 13).",
            workflow: "Once the document is perfect, the agent uses the Signature Key mapping. The document is sent directly to the tenant's email. The tenant opens it, signs using the user-friendly signature pad, and the signed document is instantly routed back to Salesforce.",
            image: "/src/assets/Real Estate/Real5.png"
          },
          {
            title: "6. Storage, Distribution & Bulk Operations",
            featureUsed: "External Storage Integration, Email & Bulk Document Generation (Point 3, 4, 9, & 10).",
            workflow: "The signed PDF is automatically attached to the Salesforce Opportunity record under \"Files.\" A copy is simultaneously pushed to the agency's Google Drive or Dropbox into a folder named after the property address (using the Dynamic Naming feature). For seasonal tasks, the Property Manager can select 50 tenants whose leases are expiring and use Bulk Generation to create all renewal letters in one click.",
            additionalInfo: [
              {
                label: "Storage OPtions and Client Distribution",
                content: "The signed PDF is automatically attached to the Salesforce Opportunity record under \"Files.\""
              },
            ],
            image: "/src/assets/Real Estate/Real6.png"
          }
        ]
      }
    ]
  },
  { 
    icon: Landmark, 
    name: "Financial Services", 
    description: "Industry providing banking, investment, and insurance services.",
    useCases: []
  },
  { 
    icon: Code, 
    name: "IT & Software (SaaS)", 
    description: "Industry specializing in software development and IT solutions.",
    useCases: []
  },
  { 
    icon: HeartPulse, 
    name: "Healthcare", 
    description: "Industry dedicated to medical services, health management, and patient care.",
    useCases: []
  },
  { 
    icon: Users, 
    name: "HR Teams", 
    description: "Industry focused on human resources, recruitment, and employee management.",
    useCases: []
  },
  { 
    icon: Factory, 
    name: "Manufacturing", 
    description: "Industry involved in the production of goods and materials.",
    useCases: []
  },
  { 
    icon: Scale, 
    name: "Legal & Professional", 
    description: "Industry providing legal services, consulting, and professional advice.",
    useCases: []
  },
  { 
    icon: GraduationCap, 
    name: "Education & Training", 
    description: "Industry focused on learning, training, and educational services.",
    useCases: []
  },
  { 
    icon: ShoppingCart, 
    name: "Retail & E-Commerce", 
    description: "Industry involved in the sale of goods and services to consumers.",
    useCases: []
  },
  { 
    icon: Truck, 
    name: "Logistics & Supply Chain", 
    description: "Industry managing the transportation and distribution of goods.",
    useCases: []
  },
  { 
    icon: Building, 
    name: "Government & Public", 
    description: "Industry involving government services and public administration.",
    useCases: []
  },
  { 
    icon: HeadphonesIcon, 
    name: "Customer Support", 
    description: "Industry focused on customer service and support operations.",
    useCases: []
  },
];

export const IndustriesSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [itemsPerRow, setItemsPerRow] = useState(() => {
    if (typeof window === "undefined") return 6;
    const width = window.innerWidth;
    if (width < 640) return 2; // Mobile
    if (width < 768) return 3; // sm
    if (width < 1024) return 4; // md
    return 6; // lg
  });

  const handleIndustryClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  // Reset selection when layout breakpoint changes to avoid abrupt jumps
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      let next = 6;
      if (width < 640) next = 2;
      else if (width < 768) next = 3;
      else if (width < 1024) next = 4;

      setItemsPerRow((prev) => {
        if (prev !== next) {
          setSelectedIndex(null);
          return next;
        }
        return prev;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderIndustriesWithExpansion = () => {
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
                whileHover={{ y: -8 }}
                onClick={() => handleIndustryClick(absoluteIndex)}
                className={`group bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-150 cursor-pointer flex flex-col items-center justify-center gap-3 ${
                  isSelected ? 'border-primary shadow-lg' : 'border-border hover:border-primary/30'
                }`}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-150 ${
                    isSelected ? 'bg-primary shadow-lg' : 'bg-primary/10 group-hover:bg-primary group-hover:shadow-lg'
                  }`}
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <industry.icon className={`w-5 h-5 transition-colors duration-150 ${
                    isSelected ? 'text-primary-foreground' : 'text-primary group-hover:text-primary-foreground'
                  }`} />
                </motion.div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">{industry.name}</p>
              </motion.div>
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
                <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-primary/30 rounded-2xl p-8 mt-6 mb-6 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
                      {(() => {
                        const Icon = industries[selectedIndex].icon;
                        return <Icon className="w-8 h-8 text-primary-foreground" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold font-display gradient-text">
                        {industries[selectedIndex].name}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {industries[selectedIndex].description}
                      </p>
                    </div>
                  </div>

                  {/* Use Cases */}
                  {industries[selectedIndex].useCases.length > 0 ? (
                    <div className="space-y-16">
                      {industries[selectedIndex].useCases.map((useCase, useCaseIdx) => (
                        <motion.div
                          key={useCaseIdx}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: useCaseIdx * 0.2 }}
                          className="space-y-10"
                        >
                          {/* Use Case Header - Full Width */}
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
                              <p className="text-lg md:text-xl font-semibold text-foreground mb-2">
                                {useCase.solution}
                              </p>
                              <p className="text-sm md:text-base text-muted-foreground">
                                {useCase.description}
                              </p>
                            </motion.div>
                          </div>

                          {/* Steps - Zigzag Layout */}
                          <div className="space-y-12 mt-12">
                            {useCase.steps.map((step, stepIdx) => (
                              <motion.div
                                key={stepIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + stepIdx * 0.15 }}
                                className={`flex flex-col ${
                                  stepIdx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                } gap-8 items-center`}
                              >
                                {/* Image Section */}
                                <motion.div 
                                  className="w-full lg:w-1/2"
                                  whileHover={{ scale: 1.03, rotate: stepIdx % 2 === 0 ? 1 : -1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
                                    <img
                                      src={step.image}
                                      alt={step.title}
                                      className="w-full h-auto object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect width="600" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%23999"%3EImage Coming Soon%3C/text%3E%3C/svg%3E';
                                      }}
                                    />
                                    {/* <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                                      {stepIdx + 1}
                                    </div> */}
                                  </div>
                                </motion.div>

                                {/* Content Section */}
                                <div className="w-full lg:w-1/2 space-y-4">
                                  <div>
                                    <h5 className="text-xl md:text-2xl font-bold font-display mb-4 text-foreground">
                                      {step.title}
                                    </h5>
                                    
                                    <div className="space-y-4">
                                      {/* Feature Used */}
                                      <motion.div 
                                        initial={{ opacity: 0, x: stepIdx % 2 === 0 ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.4 + stepIdx * 0.15 }}
                                        className="bg-card rounded-lg p-4 border border-primary/20 shadow-md"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="flex-shrink-0 mt-0.5">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                              <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-xs font-semibold text-primary/70 mb-1">Feature Used:</p>
                                            <p className="text-sm text-foreground font-medium leading-relaxed">
                                              {step.featureUsed}
                                            </p>
                                          </div>
                                        </div>
                                      </motion.div>

                                      {/* Workflow */}
                                      <motion.div 
                                        initial={{ opacity: 0, x: stepIdx % 2 === 0 ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.5 + stepIdx * 0.15 }}
                                        className="bg-muted/50 rounded-lg p-4 border border-border"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="flex-shrink-0 mt-0.5">
                                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                              <CheckCircle2 className="w-4 h-4 text-primary" />
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-xs font-semibold text-primary/70 mb-1">Workflow:</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                              {step.workflow}
                                            </p>
                                          </div>
                                        </div>
                                      </motion.div>

                                      {/* Additional Info */}
                                      {step.additionalInfo && step.additionalInfo.map((info, infoIdx) => (
                                        <motion.div 
                                          key={infoIdx}
                                          initial={{ opacity: 0, x: stepIdx % 2 === 0 ? 20 : -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.4, delay: 0.6 + stepIdx * 0.15 + infoIdx * 0.1 }}
                                          className="bg-primary/5 rounded-lg p-4 border border-primary/20"
                                        >
                                          <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                              </div>
                                            </div>
                                            <div className="flex-1">
                                              <p className="text-xs font-semibold text-primary/70 mb-1">{info.label}:</p>
                                              <p className="text-sm text-muted-foreground leading-relaxed">
                                                {info.content}
                                              </p>
                                            </div>
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Use cases coming soon for this industry.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
