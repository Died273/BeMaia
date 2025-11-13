import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useContactModal } from '@/contexts/ContactModalContext';

// Animation delays - faster and more energetic
const headlineDelay = 0;
const descDelay = headlineDelay + 0.1;
const buttonsDelay = descDelay + 0.1;
const statsDelay = buttonsDelay + 0.1;

const Hero = () => {
  const { openModal } = useContactModal();
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-36 pb-12">
      {/* background is provided by pages via .page-bg; removed local gradient so hero doesn't influence page background */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center">
          {/* Centered Content */}
          <div className="space-y-8 max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.3] pb-2 overflow-visible"
              style={{ lineHeight: '1.3' }}
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: headlineDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              Make Wellbeing
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-2">
                Your Advantage
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: descDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              We turn insights into recommended changes that actively boost employee well-being
              and company performance. Real data. Real recommendations. Real results.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: buttonsDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
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
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: statsDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-2xl font-bold text-primary justify-center">
                  <TrendingUp className="w-5 h-5" />
                  €20k
                </div>
                <p className="text-sm text-muted-foreground">Cost per person on Burnout</p>
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
    </section>
  );
};

export default Hero;