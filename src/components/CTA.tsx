import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Animation delays
const cardDelay = 0.05;
const headlineDelay = cardDelay + 0.15;
const descDelay = headlineDelay + 0.2;
const buttonsDelay = descDelay + 0.1;
const footerDelay = buttonsDelay + 0.2;

const CTA = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-bl from-secondary/10 via-blue-400/10 to-primary/5 pt-24 sm:pt-20">
      {/* Animated soft white/neutral blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1 left-1 w-[5rem] h-[5rem] bg-white/60 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-8 right-12 w-[30rem] h-[28rem] bg-muted/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-3/4 left-1/3 w-40 h-40 bg-white/30 rounded-full blur-2xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8, 
            delay: cardDelay,
            ease: [0.39, 1.69, 0.36, 1]
          }}
        >
          <Card className="max-w-4xl mx-auto p-8 md:p-16 bg-card border-2 border-primary/20 shadow-2xl">
            <div className="text-center">
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.9, 
                  delay: headlineDelay,
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                Ready to Transform Your Organization?
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.9, 
                  delay: descDelay,
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                Join forward-thinking companies using data-driven insights to build healthier,
                more productive workplaces. Start your journey with BeMaia today.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1, 
                  delay: buttonsDelay,
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="group text-white"
                  onClick={() => window.open('https://calendly.com/l-boeker-bemaia/30min', '_blank')}
                >
                  Book a Demo
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-white relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div 
                className="pt-8 border-t border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: footerDelay,
                  ease: [0.39, 1.69, 0.36, 1]
                }}
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Questions? Our team is here to help.
                </p>
                <a href="mailto:info@bemaia.nl" className="text-accent hover:text-primary/80 font-medium transition-colors">
                  info@bemaia.nl
                </a>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      <style>{`
        .animate-float { animation: float 8s ease-in-out infinite alternate;}
        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-26px);} }
      `}</style>
    </section>
  );
};

export default CTA;
