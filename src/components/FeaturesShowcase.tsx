import { useState } from "react";

export default function FeaturesShowcase() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const challenges = {
    "global-events": {
      title: "Global Events",
      text: "The workplace is changing fast. Gen Z brings new expectations for mental health and work-life balance. By 2030, they'll make up 30% of the workforce. Companies must adapt now. Those who do will retain talent. Those who don't will fall behind.",
      image: "/assets/images/global-events.jpg",
      color: "bg-secondary"
    },
    "uncertainty": {
      title: "Uncertainty in the Workplace",
      text: "Workplace stress has reached crisis levels. Employees feel overwhelmed and unsupported. Burnout drains resources and disrupts teams. Traditional programs fail because they're reactive, not preventive. The cost shows up in lost talent and broken cultures.",
      image: "/assets/images/uncertainty.jpg",
      color: "bg-[#E57373]"
    },
    "generational": {
      title: "Generational Bias",
      text: "A gap divides employees and management. Gen Z wants flexibility, transparency, and feedback. Many managers struggle to deliver. Both sides feel frustrated. Employees feel unheard. Managers feel overwhelmed. The answer is building bridges that translate needs into action.",
      image: "/assets/images/generational.jpg",
      color: "bg-[#E8B67A]"
    }
  };

  return (
    <div className="bg-background px-4 sm:px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
        
        {/* Section 1: Understand risks better */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Understand<br />risks better
            </h2>
            <p className="text-base sm:text-lg text-foreground max-w-md mx-auto lg:mx-0">
              Scientifically validated surveys enable better insights into your organization's mental health status. Our dashboard helping you uncover potential pain points and turning it into actionable changes
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            {/* Dimensions Image */}
            <img 
              src="/assets/images/dimensions.png" 
              alt="Dimensions Dashboard" 
              className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
            />
          </div>
        </section>

        {/* Section 2: Adapt to new challenges */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Adapt to new<br />challenges
            </h2>
            <p className="text-base sm:text-lg text-foreground max-w-md mx-auto lg:mx-0">
              Adjust your organization's working environment to your employees' needs. Preventing burnout, reducing stress and fostering a high-performance culture.
            </p>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col gap-4 items-center lg:items-end max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {/* Global Events Card */}
              <div className="w-full">
                <button
                  onClick={() => setSelectedChallenge(selectedChallenge === "global-events" ? null : "global-events")}
                  className="relative rounded-2xl overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 bg-secondary text-white text-center py-4 font-bold text-xl z-10">
                    Global Events
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1591848478625-de43268e6fb8?w=400&h=300&fit=crop" 
                    alt="Global Events" 
                    className="w-full h-48 object-cover"
                  />
                </button>
                {selectedChallenge === "global-events" && (
                  <div className="mt-4 p-4">
                    <p className="text-base text-foreground leading-relaxed">
                      {challenges["global-events"].text}
                    </p>
                  </div>
                )}
              </div>

              {/* Uncertainty Card */}
              <div className="w-full">
                <button
                  onClick={() => setSelectedChallenge(selectedChallenge === "uncertainty" ? null : "uncertainty")}
                  className="relative rounded-2xl overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 bg-[#E57373] text-white text-center py-4 font-bold text-xl z-10">
                    Uncertainty in the Workplace
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop" 
                    alt="Uncertainty in the Workplace" 
                    className="w-full h-48 object-cover"
                  />
                </button>
                {selectedChallenge === "uncertainty" && (
                  <div className="mt-4 p-4">
                    <p className="text-base text-foreground leading-relaxed">
                      {challenges["uncertainty"].text}
                    </p>
                  </div>
                )}
              </div>

              {/* Generational Bias Card */}
              <div className="w-full">
                <button
                  onClick={() => setSelectedChallenge(selectedChallenge === "generational" ? null : "generational")}
                  className="relative rounded-2xl overflow-hidden w-full hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="absolute top-0 left-0 right-0 bg-[#E8B67A] text-white text-center py-4 font-bold text-xl z-10">
                    Generational Bias
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop" 
                    alt="Generational Bias" 
                    className="w-full h-48 object-cover"
                  />
                </button>
                {selectedChallenge === "generational" && (
                  <div className="mt-4 p-4">
                    <p className="text-base text-foreground leading-relaxed">
                      {challenges["generational"].text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Create meaningful change */}
        <section className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          <div className="lg:w-1/2 text-center lg:text-left w-full">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Create meaningful<br />change
            </h2>
            <p className="text-base sm:text-lg text-foreground max-w-md mx-auto lg:mx-0">
              Update procedures and working environment to benefit employees' well-being. Saving costs, improving retention and attracting the top talent from future generations.
            </p>
          </div>
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
            {/* YouTube Video */}
            <div className="w-full max-w-2xl aspect-video">
              <iframe
                className="w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/BkAXLuhr8j8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
