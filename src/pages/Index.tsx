import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { UseCaseSection } from "@/components/UseCaseSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <UseCaseSection />
        <FeaturesSection />
        <WhyChooseSection />
        <IndustriesSection />
        {/* <PricingSection />
        <TestimonialsSection /> */}
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
