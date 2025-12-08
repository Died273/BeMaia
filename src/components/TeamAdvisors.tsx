import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

const advisors = [
  {
    name: "Mascha Mooy",
    role: "Advisor",
    expertise: "Founder of ByeByeBurnout",
    photo: "https://www.maschamooy.nl/wp-content/uploads/2017/06/Mascha-Mooy-Bye-Bye-Burnout-Dutch-Global-Media-3.jpg",
    linkedin: "https://www.linkedin.com/in/maschamooy/",
  },
];

export default function TeamAdvisors() {
  return (
    <div className="bg-background-light px-4 sm:px-6 md:px-8 py-16 md:py-24" style={{ backgroundColor: '#fff8ef' }}>
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-12">
          We are advised by
        </h2>
        
        {/* Mascha - bigger and spread out */}
        {advisors.map((advisor, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start gap-8 md:gap-12">
            {/* Photo */}
            <img
              src={advisor.photo}
              alt={advisor.name}
              className="w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-lg object-cover flex-shrink-0"
            />
            
            {/* Info */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">{advisor.name}</h3>
              <p className="text-base sm:text-lg md:text-xl text-foreground font-bold">{advisor.expertise}</p>
              <p className="text-base sm:text-lg md:text-xl text-foreground font-bold">{advisor.role}</p>
              
              {advisor.linkedin && (
                <a href={advisor.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3">
                  <Button variant="hero" size="lg" className="text-white px-6">
                    <Linkedin className="mr-2 w-5 h-5" />
                    LinkedIn
                  </Button>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
