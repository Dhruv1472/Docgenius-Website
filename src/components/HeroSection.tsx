import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Eye, Files, FileDown, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import featureImg1 from "@/assets/hero-section-feature-1.png";
import featureImg2 from "@/assets/hero-section-feature-2.png";
import featureImg3 from "@/assets/hero-section-feature-3.png";
import featureImg4 from "@/assets/hero-section-feature-4.png";
import featureImg5 from "@/assets/hero-section-feature-5.png";

const carouselItems = [
  { icon: FileText, label: "Template Builder", description: "Design professional templates with drag-and-drop ease", image: featureImg1 },
  { icon: Eye, label: "Live Preview with Data", description: "See your documents with real Salesforce data instantly", image: featureImg2 },
  { icon: Files, label: "Bulk Document Generation", description: "Generate thousands of documents in seconds", image: featureImg3 },
  { icon: FileDown, label: "One-Click PDF", description: "Create instant PDFs without any template setup", image: featureImg4 },
  { icon: PenTool, label: "Digital Signature", description: "Built-in e-signatures for seamless approvals", image: featureImg5 },
];

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, 400000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Native Salesforce Document Generation
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-display !leading-[1.3] mb-6"
          >
            <span className="block">Stop Building Documents Manually.</span>
            <span className="block gradient-text">Start Generating Them Instantly.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Convert Salesforce records into professional, ready-to-share documents instantly and accurately. 
            Design, preview, sign, store, and share documents with ease no code, no complexity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="xl">
              Book a Demo
            </Button>
            <Button variant="hero-outline" size="xl">
              Start Free Trial
            </Button>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Carousel Content */}
            <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-start gap-6 md:gap-8 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                      {(() => {
                        const Icon = carouselItems[activeIndex].icon;
                        return <Icon className="w-8 h-8 text-primary-foreground" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-lg font-bold font-display">
                        {carouselItems[activeIndex].label}
                      </h3>
                      <p className="text-muted-foreground text-m">
                        {carouselItems[activeIndex].description}
                      </p>
                    </div>
                  </div>

                  <div className="w-[80%] mx-auto overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                    <img
                      src={carouselItems[activeIndex].image}
                      alt={`${carouselItems[activeIndex].label} preview`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative gradient */}
              {/* <div className="absolute bottom-0 left-0 right-0 h-1 gradient-bg opacity-50" /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
