import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UseCaseSection } from "@/components/UseCaseSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";

const Index = () => {
  // Ensure page starts at top on initial load
  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Scroll to top immediately
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="DocGenius | Salesforce-Native Document Generation"
        description="Automate proposals, contracts, and reports directly from Salesforce with DocGenius. Build templates once, capture data instantly, and ship compliant documents in minutes."
        path="/"
      />
      <Header />
      <main>
        <HeroSection />
        <UseCaseSection />
        <FeaturesSection />
        <WhyChooseSection />
        <IndustriesSection />
        <PricingSection />
        <BlogPreviewSection />
        {/* <TestimonialsSection /> */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
