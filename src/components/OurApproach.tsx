import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Phone, 
  Settings, 
  Send, 
  TrendingUp, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";

const STAGGER_DELAY = 0.1;
const BASE_DURATION = 0.4;

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
  gradient: string;
  features: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Onboarding Call",
    subtitle: "Understanding Your Needs",
    description: "We start with a focused 45-minute video call to understand your organization's current situation and specific needs.",
    icon: <Phone className="w-full h-full" />,
    color: "hsl(251 51% 37%)",
    accentColor: "hsl(251 51% 67%)",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    features: [
      "45-minute video call",
      "Discussion about recent burnout cases",
      "Request for relevant company data"
    ]
  },
  {
    id: 2,
    title: "Customizing Questionnaire",
    subtitle: "Tailored to Your Organization",
    description: "We create a customized survey specifically designed for your company, based on the information and needs identified in our initial conversation.",
    icon: <Settings className="w-full h-full" />,
    color: "hsl(343 85% 51%)",
    accentColor: "hsl(343 85% 65%)",
    gradient: "from-secondary/20 via-secondary/10 to-transparent",
    features: [
      "Tailored survey design",
      "Based on company information",
      "Aligned with organizational needs"
    ]
  },
  {
    id: 3,
    title: "Sending Out Assessment",
    subtitle: "Easy Distribution",
    description: "We provide a simple link that your contact person can easily share with team members to complete the assessment.",
    icon: <Send className="w-full h-full" />,
    color: "hsl(43 98% 53%)",
    accentColor: "hsl(43 98% 70%)",
    gradient: "from-accent/20 via-accent/10 to-transparent",
    features: [
      "Shareable survey link",
      "Easy distribution for contact person",
      "Simple access for team members"
    ]
  },
  {
    id: 4,
    title: "Results & Actionable Recommendations",
    subtitle: "Insights and Action Plans",
    description: "Comprehensive results delivered through multiple channels: a management dashboard, a follow-up discussion call, individual feedback, and a concrete action plan.",
    icon: <TrendingUp className="w-full h-full" />,
    color: "hsl(251 51% 37%)",
    accentColor: "hsl(251 51% 67%)",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    features: [
      "Anonymized results dashboard for management",
      "1-hour call to discuss findings",
      "Individual results sent to employees",
      "Concrete action plan for the team"
    ]
  },
  {
    id: 5,
    title: "Follow-Up",
    subtitle: "Continuous Support",
    description: "Optional ongoing tracking and the flexibility to explore new features based on what your organization finds most valuable and helpful.",
    icon: <CheckCircle2 className="w-full h-full" />,
    color: "hsl(343 85% 51%)",
    accentColor: "hsl(343 85% 65%)",
    gradient: "from-secondary/20 via-secondary/10 to-transparent",
    features: [
      "Potential continuous tracking",
      "New features to try out",
      "Based on organizational preferences",
      "Flexible support options"
    ]
  }
];

/**
 * Step Card Component - Clean and modern with expandable features
 */
const StepCard = ({ step, index }: { step: Step; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: BASE_DURATION, delay: index * STAGGER_DELAY }}
    >
      <div className="flex gap-6 lg:gap-8">
        {/* Left side - Step number and connecting line */}
        <div className="flex flex-col items-center">
          {/* Step Number Circle */}
          <motion.div
            className="relative flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 flex items-center justify-center font-bold text-lg lg:text-xl z-10 bg-card"
            style={{ borderColor: step.color, color: step.color }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * STAGGER_DELAY + 0.2 }}
          >
            {step.id}
          </motion.div>
          
          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <motion.div
              className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-border to-transparent min-h-[60px]"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.4, delay: index * STAGGER_DELAY + 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          )}
        </div>

        {/* Right side - Content Card */}
        <div className="flex-1 pb-12 lg:pb-16">
          <motion.div
            className="group relative bg-white backdrop-blur-sm rounded-2xl border border-border/50 p-6 lg:p-8 hover:border-border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            whileHover={{ y: -4 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {/* Subtle gradient overlay on hover */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top left, ${step.color}08 0%, transparent 60%)`
              }}
            />

            <div className="relative">
              {/* Icon and Title Row */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <div className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: step.color }}>
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold mb-1" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {step.subtitle}
                  </p>
                </div>

                {/* Expand/Collapse Indicator */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/70 leading-relaxed">
                {step.description}
              </p>

              {/* Expandable Features List */}
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? 24 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-6 border-t border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Key Features
                  </p>
                  {step.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <CheckCircle2 
                        className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover/item:scale-110" 
                        style={{ color: step.color }} 
                      />
                      <span className="text-sm text-foreground/60 group-hover/item:text-foreground/80 transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Click hint when collapsed */}
              {!isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-muted-foreground mt-4 flex items-center gap-1"
                >
                  <span>Click to view key features</span>
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Section Header
 */
const SectionHeader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-16 lg:mb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-primary">
          Our Approach
        </h2>
        
        <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A 5-step methodology that transforms organizational wellness from vision to reality.
        </p>
      </motion.div>
    </div>
  );
};

/**
 * Main OurApproach Component
 */
const OurApproach = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden page-bg" aria-labelledby="our-approach-heading">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader />
          
          {/* Steps Timeline */}
          <div className="relative">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      <h2 id="our-approach-heading" className="sr-only">
        Our Five-Step Approach to Organizational Wellness
      </h2>
    </section>
  );
};

export default OurApproach;