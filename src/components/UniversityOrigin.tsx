import { Card } from "@/components/ui/card";
import { GraduationCap, Lightbulb, Rocket, Users } from "lucide-react";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const mainCardDelay = descDelay + 0.2;
const getValueCardDelay = (idx: number) => mainCardDelay + 0.15 + idx * 0.12;

const UniversityOrigin = () => {
  const values = [
    {
      icon: GraduationCap,
      title: "Research-Backed",
      description: "Founded on rigorous academic research and evidence-based methodologies from leading institutions.",
    },
    {
      icon: Lightbulb,
      title: "Innovation-Driven",
      description: "Born from a culture of innovation, we bring fresh perspectives to age-old workplace challenges.",
    },
    {
      icon: Rocket,
      title: "Entrepreneurial Spirit",
      description: "Young, dynamic team combining academic excellence with startup agility and ambition.",
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
              Born from Academic Excellence
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
              BeMaia originated in the University of Amsterdam's vibrant startup ecosystem, 
              where cutting-edge research meets entrepreneurial innovation.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 1.1, 
                delay: mainCardDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <Card className="p-8 md:p-12 bg-card border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">University of Amsterdam</h3>
                      <p className="text-muted-foreground">Minor of Entrepenuership</p>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We started out at the University of Amsterdam, 
                    combining practical research in workplace psychology with data science to tackle burnout in organizations across the Netherlands.
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <p className="text-sm font-medium text-primary">
                      Innovating since 2025
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Values Grid */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: -38, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1.1, 
                    delay: getValueCardDelay(index),
                    ease: [0.39, 1.69, 0.36, 1]
                  }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30 group hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
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

export default UniversityOrigin;
