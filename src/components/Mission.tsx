import { Target, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const getCardDelay = (idx: number) => descDelay + 0.2 + idx * 0.12;

const Mission = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      gradient: "from-primary to-secondary",
      title: "Proactive",
      description: "Identify risks before they become crises"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      gradient: "from-secondary to-accent",
      title: "Empathetic",
      description: "Put people first with privacy-protected insights"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      gradient: "from-accent to-primary",
      title: "Results-Driven",
      description: "Deliver measurable impact on well-being and profits"
    }
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
        <div className="max-w-4xl mx-auto">
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
              Building Healthier Organizations
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.9, 
                delay: descDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              BeMaia was founded on the belief that employee burnout is preventable. By combining cutting-edge data science 
              with deep organizational psychology insights, we empower companies to create workplaces where people thrive—and 
              businesses prosper.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1.1, 
                  delay: getCardDelay(index),
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
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

export default Mission;
