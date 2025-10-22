// src/pages/index.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import PartnerSection from "@/components/PartnerSection";
import MarketOpportunity from "@/components/MarketOpportunity";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
  <div className="min-h-screen page-bg">
      <Header />
        <Hero />
        <MarketOpportunity />
        <HowWeWork />
        <CTA />
        <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
