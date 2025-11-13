// src/pages/index.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PartnerSection from "@/components/PartnerSection";
import MarketOpportunity from "@/components/MarketOpportunity";
import OurApproach from "@/components/OurApproach";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
  <div className="min-h-screen page-bg">
      <Header />
        <Hero />
        <MarketOpportunity />
        <OurApproach />
        <CTA />
        <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
