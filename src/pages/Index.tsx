import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import HowWeWork from "@/components/HowWeWork";
import PartnerSection from "@/components/PartnerSection";
import UniversityOrigin from "@/components/UniversityOrigin";
import MarketOpportunity from "@/components/MarketOpportunity";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <MarketOpportunity />
      <Mission />
      <HowWeWork />
      <UniversityOrigin />
      <CTA />
      <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
