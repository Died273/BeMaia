import { Card } from "@/components/ui/card";
import { Lightbulb, Users, TrendingUp, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const getCardDelay = (idx: number) => descDelay + 0.2 + idx * 0.12;

const HowWeWork = () => {
  const steps = [
    {
      icon: Shield,
      title: "Privacy -First Design",
      description: "Enterprise-grade security with full GDPR compliance and anonymous data aggregation.",
      color: "from-primary to-accent",
    },
    {
      icon: TrendingUp,
      title: "Actionable Recommendations",
      description: "We don't just provide insights. We deliver specific, prioritized steps company leaders can take to improve well-being right now.",
      color: "from-accent to-primary",
    },
    {
      icon: Lightbulb,
      title: "Expert-Driven Analysis",
      description: "Our team analyzes the data using proven research methodologies—no black-box algorithms. Fully anonymized to ensure honest feedback.",
      color: "from-secondary to-accent",
    },
    {
      icon: Users,
      title: "Continuous Surveys",
      description: "Employees enjoy filling out our engaging surveys, designed to feel natural and non-intrusive. Higher participation means better data quality.",
      color: "from-primary to-secondary",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-bl from-secondary/10 via-blue-400/10 to-primary/5 pt-24 sm:pt-20">
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
              How We Work
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
              BeMaia delivers real, actionable recommendations for company leaders based on data
              gathered from employees—not just insight, but specific steps to improve workplace well-being.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1.1, 
                  delay: getCardDelay(index),
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/30 group hover:scale-105">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
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

export default HowWeWork;
