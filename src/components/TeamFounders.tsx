import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const founders = [
  {
    name: "Louis Boeker",
    role: "Co-Founder",
    expertise: "Business Lead",
    photo: "/assets/team/louis.png",
    color: "var(--secondary)",
    linkedin: "https://www.linkedin.com/in/louis-enrico-böker-1616191b1",
    email: "l.boeker@bemaia.nl",
  },
  {
    name: "Jakob Blin",
    role: "Co-Founder",
    expertise: "Creative Lead",
    photo: "/assets/team/jakob.png",
    color: "var(--accent)",
    linkedin: "https://www.linkedin.com/in/jakob-blin-6043a1203/",
    email: "j.blin@bemaia.nl",
  },
  {
    name: "Tanushri Chidanand",
    role: "Co-Founder",
    expertise: "Research Lead",
    photo: "/assets/team/tanushri.png",
    color: "var(--primary)",
    linkedin: "https://www.linkedin.com/in/tanushri-chidanand-a721a0234/",
    email: "info@bemaia.com",
  },
  {
    name: "Tim Spargaarem",
    role: "Co-Founder",
    expertise: "Customer Acquisition Lead",
    photo: "/assets/team/tim.png",
    color: "var(--danger)",
    linkedin: "https://www.linkedin.com/in/tim-spaargaren-a15412244/",
    email: "t.spaargaren@bemaia.nl",
  },
  {
    name: "Diederick de Gier",
    role: "Co-Founder",
    expertise: "Technical Lead",
    photo: "/assets/team/diederick.jpg",
    color: "var(--secondary)",
    linkedin: "https://www.linkedin.com/in/diederickdegier/",
    email: "d.gier@bemaia.nl",
  },
];
 
export default function TeamFounders() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useContactModal();
  const [cardSpacing, setCardSpacing] = useState(220);
  const [containerHeight, setContainerHeight] = useState("190vh");
  
  useEffect(() => {
    const updateSpacing = () => {
      // More spacing on small screens (when buttons wrap)
      if (window.innerWidth < 640) {
        setCardSpacing(320); // Extra space for mobile (increased from 300)
        setContainerHeight("180vh"); // Tall for mobile
      } else if (window.innerWidth < 768) {
        setCardSpacing(220); // Same as desktop (reduced from 280)
        setContainerHeight("115vh"); // Medium for tablet
      } else {
        setCardSpacing(220); // Normal space for desktop
        setContainerHeight("120vh"); // Shorter for desktop
      }
    };
    
    updateSpacing();
    window.addEventListener('resize', updateSpacing);
    return () => window.removeEventListener('resize', updateSpacing);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
  <div ref={containerRef} className="bg-background flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 pb-24" style={{ minHeight: "260vh" }}>
      {/* Founders Section */}
      <div className="max-w-6xl w-full sticky top-24">
        <div className="flex flex-col-reverse lg:flex-row gap-6 md:gap-8 items-start">
          {/* Founder Cards */}
          <div className="relative w-full lg:w-3/5 lg:mt-32" style={{ minHeight: containerHeight }}>
            {founders.map((founder, index) => {
              // Reverse the animation order - last person (index 4) moves first
              const reverseIndex = founders.length - 1 - index;
              const startProgress = reverseIndex * 0.15;
              const endProgress = (reverseIndex + 0.5) * 0.15;
              
              // Calculate final position - cards stack with responsive spacing
              const finalPosition = index * cardSpacing;
              
              const cardY = useTransform(
                scrollYProgress,
                [startProgress, endProgress],
                [0, finalPosition] // Move from top to final position
              );

              return (
                <motion.div
                  key={index}
                  className="absolute w-full"
                  style={{
                    y: cardY,
                    zIndex: index + 1, // Higher index = higher z-index (Diederick has 5, Louis has 1)
                  }}
                >
                  <div className="relative">
                    {/* Color Tab - Always visible */}
                    <motion.div
                      className="absolute -top-2 sm:-top-3 md:-top-4 h-2 sm:h-3 md:h-4 rounded-t-lg"
                      style={{
                        left: `${8 + index * 15}%`,
                        width: '15%',
                        zIndex: 100 + index, // Tabs always on top
                        backgroundColor: founder.color,
                      }}
                    />
                    {/* Card */}
                    <div 
                      className="rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4 md:gap-6"
                      style={{ 
                        backgroundColor: 'var(--background-accent)',
                      }}
                    >
                      <img
                        src={founder.photo}
                        alt={founder.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 sm:min-w-[180px] md:min-w-[200px]">
                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground underline break-words">{founder.name}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-foreground">{founder.role}</p>
                        <p className="text-xs sm:text-sm md:text-base text-foreground">{founder.expertise}</p>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                        {founder.linkedin && (
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button variant="hero" size="sm" className="text-white w-full whitespace-nowrap">
                              <Linkedin className="mr-2 w-4 h-4 flex-shrink-0" />
                              <span className="truncate">LinkedIn</span>
                            </Button>
                          </a>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-white w-full whitespace-nowrap"
                          onClick={() => openModal(founder.email)}
                        >
                          <Mail className="mr-2 w-4 h-4 flex-shrink-0" />
                          <span className="truncate">Contact</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Title */}
          <div className="lg:w-2/5 w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-left lg:text-right">
              Our team of founders
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
