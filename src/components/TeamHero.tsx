import { useContactModal } from "@/contexts/ContactModalContext";

export default function TeamHero() {
  const { openModal } = useContactModal();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 pt-28">
      <div className="text-center max-w-4xl">
        {/* Main Heading */}
        <h1 className="text-7xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          Bridging the<br />generation gap
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-foreground mb-12 leading-relaxed">
          Our founding team consists of Gen Z experts<br />
          as they themselves belong to this dynamic generation.<br />
        </p>
        
        {/* CTA Button */}
        <button 
          onClick={() => openModal('info@bemaia.nl')}
          className="bg-secondary hover:bg-secondary-dark text-foreground font-semibold text-lg px-16 py-4 rounded-2xl transition-colors duration-200 shadow-sm"
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
