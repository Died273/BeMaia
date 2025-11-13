import { TrendingUp, Users, Building2, Euro } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// Animation delays - faster and more energetic
const headlineDelay = 0;
const descDelay = headlineDelay + 0.08;
const getCardDelay = (idx: number) => descDelay + 0.1 + idx * 0.06;
const bottomCardDelay = getCardDelay(3) + 0.08;

const MarketOpportunity = () => {
  const stats = [
    {
      icon: <Euro className="w-8 h-8 text-primary" />,
      value: "€4 Billion",
      label: "Burnout cost in the Netherlands",
      color: "primary"
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      value: "1 out of 5",
      label: "Employees had a burnout",
      color: "secondary"
    },
    {
      icon: <Building2 className="w-8 h-8 text-secondary" />,
      value: "85%",
      label: "Of organizations are affected",
      color: "secondary"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      value: "3X",
      label: "ROI on prevention vs treatment",
      color: "accent"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden page-bg pt-24 sm:pt-20 pb-24">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -38, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: headlineDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              The Burnout Crisis is Real
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: descDelay,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              Employee burnout costs billions annually. Organizations that act now gain a competitive advantage
              in talent retention, productivity, and financial performance.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -38, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: getCardDelay(index),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <Card className="p-6 text-center bg-card hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 hover:border-primary/40">
                  <div className={`w-16 h-16 rounded-full bg-${stat.color}/10 flex items-center justify-center mx-auto mb-4`}>
                    {stat.icon}
                  </div>
                  <p className={`text-3xl font-bold text-${stat.color} mb-2`} style={{ fontFamily: 'Arial, sans-serif' }}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -38, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: bottomCardDelay,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <Card className="p-8 md:p-12 from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20 hover:scale-105 hover:shadow-xl hover:border-primary/40 transition-all duration-300">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Early Intervention Saves Money
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Organizations using predictive analytics to combat burnout see up to 40% reduction in turnover costs,
                  25% increase in productivity, and significant improvements in employee satisfaction and retention.
                </p>
                <div className="flex flex-wrap justify-center gap-8 pt-6 border-t border-border/50">
                  <div>
                    <p className="text-3xl font-bold text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>40%</p>
                    <p className="text-sm text-muted-foreground">Lower turnover</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-secondary" style={{ fontFamily: 'Arial, sans-serif' }}>25%</p>
                    <p className="text-sm text-muted-foreground">More productive</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-accent" style={{ fontFamily: 'Arial, sans-serif' }}>60%</p>
                    <p className="text-sm text-muted-foreground">Higher engagement</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* blobs removed — page background handled by global .page-bg in src/index.css */}
    </section>
  );
};

export default MarketOpportunity;
