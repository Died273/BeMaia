import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Activity } from "lucide-react";
import heroImage from "@/assets/hero-visualization.jpg";
import { motion } from "framer-motion";
import { useContactModal } from '@/contexts/ContactModalContext';

// Animation delays
const headlineDelay = 0.05;
const descDelay = headlineDelay + 0.2;
const buttonsDelay = descDelay + 0.2;
const statsDelay = buttonsDelay + 0.2;
const imageDelay = 0.3;
const floatingCard1Delay = imageDelay + 0.3;
const floatingCard2Delay = floatingCard1Delay + 0.2;

const Hero = () => {
  const { openModal } = useContactModal();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20">
      {/* background is provided by pages via .page-bg; removed local gradient so hero doesn't influence page background */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual (now left on large screens) */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, y: -38, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.1, 
              delay: imageDelay,
              ease: [0.39, 1.69, 0.36, 1]
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[12rem] md:max-w-[24rem] mx-auto">
              <img
                src={heroImage}
                alt="BeMaia Analytics Dashboard"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 "></div>
            </div>

            {/* Floating stats cards (static) */}
            <div className="absolute -left-6 top-1/4 bg-card p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Team Health</p>
                  <p className="text-2xl font-bold text-primary">89%</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/4 bg-card p-4 rounded-2xl shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Risk Score</p>
                  <p className="text-2xl font-bold text-accent">Low</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content (now text on the right) */}
          <div className="space-y-8">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.9, 
                delay: headlineDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              Catch Burnout
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Before It Starts
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.9, 
                delay: descDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              We turn insights into recommended changes that actively boost employee well-being
              and company performance. Real data. Real recommendations. Real results.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                onClick={() => openModal('info@bemaia.nl')}
              >
                Get in Touch
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1.1, 
                delay: statsDelay,
                ease: [0.39, 1.69, 0.36, 1]
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <TrendingUp className="w-5 h-5" />
                  €20k
                </div>
                <p className="text-sm text-muted-foreground">Cost per person on Bornout</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-secondary">Continuous</div>
                <p className="text-sm text-muted-foreground">Insights delivered</p>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">Proactive</div>
                <p className="text-sm text-muted-foreground">Early intervention</p>
              </div>
            </motion.div>
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

export default Hero;
