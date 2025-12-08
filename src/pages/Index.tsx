// src/pages/index.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import AffectingEveryone from "@/components/AffectingEveryone";
import FeaturesShowcase from "@/components/FeaturesShowcase";


const Index = () => {
  return (
  <div className="min-h-screen page-bg">
      <Header />
        <Hero />
        <AffectingEveryone />
        <FeaturesShowcase />

      <Footer />
    </div>
  );
};

export default Index;
