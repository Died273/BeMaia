import { Card } from "@/components/ui/card";
import { Award, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const logoCardDelay = descDelay + 0.2;
const getStatCardDelay = (idx: number) => logoCardDelay + 0.2 + idx * 0.12;

const PartnerSection = () => {
  const highlights = [
    {
      icon: Award,
      stat: "5+ Years",
      label: "Experience in burnout prevention",
    },
    {
      icon: Users,
      stat: "10,000+",
      label: "Employees supported in multiple companies",
    },
    {
      icon: TrendingUp,
      stat: "10+",
      label: "Burnout Experts on the Team",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-blue-400/10 to-secondary/10 pt-24 sm:pt-20">
      {/* Animated soft white/neutral blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1 left-1 w-[5rem] h-[5rem] bg-white/60 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-[30rem] h-[28rem] bg-muted/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-white/30 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: headlineDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              In Partnership with ByeByeBurnout
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: descDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              We've joined forces with ByeByeBurnout, a leading expert in burnout prevention
              with years of proven experience helping organizations build healthier workplaces.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Partner Logo/Info Card */}
            <motion.a
              href="https://www.byebyeburnout.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.1, 
                delay: logoCardDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <Card
                className="p-12 bg-white border-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
                style={{ borderColor: "#B2DD5C" }}
              >
                <div className="text-center space-y-8">
                  <img
                    src="https://www.byebyeburnout.nl/wp-content/uploads/2018/01/logo-bbb.png"
                    alt="ByeByeBurnout Logo"
                    className="mx-auto rounded-xl shadow-md"
                    style={{ width: "400px", maxWidth: "100%", height: "auto" }}
                  />
                  <h3 className="text-3xl font-bold"></h3>
                  <p className="text-muted-foreground font-bold">
                    Leading experts in workplace well-being and burnout prevention,
                    bringing years of hands-on experience and proven methodologies.
                  </p>
                </div>
              </Card>
            </motion.a>

            {/* Testimonial & Stats */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -38, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 1.1, 
                      delay: getStatCardDelay(index),
                      ease: [0.39, 1.69, 0.36, 1]
                    }}
                  >
                    <Card
                      className="p-6 text-center border-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
                      style={{ borderColor: "#B2DD5C" }}
                    >
                      <item.icon className="w-6 h-6 mx-auto mb-2" style={{ color: "#B2DD5C" }} />
                      <p className="text-2xl font-bold mb-1" style={{ color: "#B2DD5C" }}>{item.stat}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-float { animation: float 8s ease-in-out infinite alternate;}
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-26px);} }
      `}</style>
    </section>
  );
};

export default PartnerSection;
