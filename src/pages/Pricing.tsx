import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useContactModal } from '@/contexts/ContactModalContext';

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.18;
const cardDelay = descDelay + 0.25;
const buttonDelay = cardDelay + 0.28;

const Pricing = () => {
  const { openModal } = useContactModal();

  return (
    <>
      <Header />
  <section className="min-h-screen w-full pt-48 pb-6 page-bg relative overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-6 text-foreground py-4 animate-fade-down"
              style={{ animationDelay: `${headlineDelay}s` }}
            >
              Pricing
            </h1>
            <p
              className="text-xl text-muted-foreground max-w-xl mx-auto animate-fade-down"
              style={{ animationDelay: `${descDelay}s` }}
            >
              <span>
                BeMaia is currently <b className="text-primary">free</b> for all partners during our pilot phase!
              </span>
              <br />
              <span className="block mt-4">
                Join our partnership program, get full access, and help us improve BeMaia for everyone.
              </span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 max-w-2xl mx-auto">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: `${cardDelay}s` }}
            >
              <Card
                className={`
                  group p-8 bg-white/80 border border-border/30 shadow-xl
                  hover:scale-105 hover:shadow-2xl hover:border-primary/40
                  transition-all duration-300
                `}
                style={{
                  borderRadius: "2rem",
                  maxWidth: "32rem",
                  margin: "0 auto",
                }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r text-primary">
                  Early Access – <span className="text-secondary">€0</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Enjoy <span className="font-bold text-primary">all features</span>,
                  help shape the platform, and connect with our team.<br />
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="hero"
                    size="sm"
                    className="text-white"
                    onClick={() => openModal('info@bemaia.nl')}
                  >
                    Become a Pilot Partner
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <style>{`
          .animate-fade-in-up { animation: fadeinUp 0.92s cubic-bezier(.39,1.69,.36,1) both; }
          @keyframes fadeinUp { 0% {opacity: 0;transform: translateY(32px);} 70%{opacity:.82} 100% {opacity:1; transform:translateY(0);} }
          .animate-fade-down { 
            opacity: 0; 
            transform: translateY(-32px); 
            animation: fadeDown .95s cubic-bezier(.39,1.69,.36,1) both;
          }
          @keyframes fadeDown {
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-up {
            opacity: 0;
            transform: translateY(24px); 
            animation: fadeUp .87s cubic-bezier(.39,1.69,.36,1) both;
          }
          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </section>
        <Footer />
    </>
  );
};

export default Pricing;
