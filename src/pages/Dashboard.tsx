import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown,
  Minus,
  Zap, 
  Wind,
  Brain, 
  Heart,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Target,
  Calendar,
  ArrowRight,
  Flame,
  Sparkles,
  Activity
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data
const mockData = {
  currentScore: 2.8,
  previousScore: 3.2,
  weekRange: "Nov 10 - Nov 14, 2025",
  
  subcategories: [
    { 
      key: "exhaustion", 
      name: "Exhaustion", 
      score: 4.5, 
      previousScore: 4.2,
      status: "critical",
      icon: Zap,
      description: "Energy and fatigue levels",
      color: "#EB5F43", // red for critical (>3.5)
      trend: "worsening"
    },
    { 
      key: "mental_distance", 
      name: "Mental Distance", 
      score: 1.3,
      previousScore: 1.6, 
      status: "healthy",
      icon: Wind,
      description: "Engagement with work",
      color: "#4ade80", // green for healthy (0-2.5)
      trend: "improving"
    },
    { 
      key: "cognitive", 
      name: "Cognitive", 
      score: 3.2,
      previousScore: 3.0, 
      status: "at-risk",
      icon: Brain,
      description: "Focus and concentration",
      color: "#fbbf24", // yellow for at-risk (2.6-3.5)
      trend: "worsening"
    },
    { 
      key: "emotional", 
      name: "Emotional", 
      score: 1.8,
      previousScore: 2.1, 
      status: "healthy",
      icon: Heart,
      description: "Emotional regulation",
      color: "#4ade80", // green for healthy (0-2.5)
      trend: "improving"
    }
  ],

  historicalData: [
    { week: "Sep 2", score: 2.3 },
    { week: "Sep 9", score: 2.5 },
    { week: "Sep 16", score: 2.8 },
    { week: "Sep 23", score: 3.0 },
    { week: "Sep 30", score: 3.2 },
    { week: "Oct 7", score: 3.1 },
    { week: "Oct 14", score: 2.9 },
    { week: "Oct 20", score: 2.8 }
  ],

  recommendations: [
    {
      priority: "critical",
      dimension: "Exhaustion",
      dimensionKey: "exhaustion",
      title: "Immediate Energy Recovery Protocol",
      action: "Implement mandatory rest periods and reduce overtime by 40%",
      why: "Exhaustion at 4.5/5 indicates severe burnout risk. Team energy is critically depleted.",
      howTo: [
        "Block 2-3pm daily as 'no meeting' recovery time",
        "Cap work weeks at 40 hours - enforce strictly",
        "Introduce flexible start times (7am-11am window)"
      ],
      timeframe: "Start immediately - See results in 1 month",
      impact: "Could reduce exhaustion by 30-40%"
    },
    {
      priority: "high",
      dimension: "Cognitive",
      dimensionKey: "cognitive",
      title: "Focus & Deep Work Protection",
      action: "Create distraction-free zones for concentration-intensive work",
      why: "Cognitive score of 3.2/5 shows declining mental sharpness and focus ability.",
      howTo: [
        "Designate Mon/Wed/Fri mornings as 'deep work only'",
        "Turn off all notifications during focus blocks",
        "Limit meetings to 25 minutes with 5-min breaks"
      ],
      timeframe: "Implement next week - Review in 3 weeks",
      impact: "Expected 15-25% cognitive improvement"
    },
    {
      priority: "low",
      dimension: "Emotional",
      dimensionKey: "emotional",
      title: "Sustain Emotional Resilience",
      action: "Maintain current support systems and add peer recognition",
      why: "Emotional health is good at 1.8/5, but worsening trend requires attention.",
      howTo: [
        "Weekly team check-ins focusing on wellbeing",
        "Peer recognition program (kudos board/channel)",
        "Monthly 1-on-1s to discuss stress and support needs"
      ],
      timeframe: "Ongoing - No urgent changes needed",
      impact: "Prevent deterioration, maintain healthy zone"
    },
    {
      priority: "low",
      dimension: "Mental Distance",
      dimensionKey: "mental_distance",
      title: "Keep Engagement Strong",
      action: "Celebrate progress and reinforce team connection",
      why: "Engagement is excellent at 1.3/5 and improving - keep the momentum.",
      howTo: [
        "Share wins and progress updates weekly",
        "Maintain transparent communication on goals",
        "Continue current team building activities"
      ],
      timeframe: "Ongoing - No urgent changes needed",
      impact: "Maintain current healthy engagement"
    }
  ]
};

export default function DashboardCompany() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedRec, setExpandedRec] = useState<number | null>(0);
  
  // Helper function to get color based on score (lower is better for burnout)
  const getScoreColor = (score: number): string => {
    if (score <= 2.5) return '#4ade80'; // Green - Healthy
    if (score <= 3.5) return '#fbbf24'; // Yellow - At Risk
    return '#EB5F43'; // Red - Critical
  };
  
  // Animate score on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const easeProgress = 1 - Math.pow(1 - currentStep / steps, 3);
      setAnimatedScore(mockData.currentScore * easeProgress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedScore(mockData.currentScore);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, []);

  const scoreChange = mockData.currentScore - mockData.previousScore;
  const isImproving = scoreChange < 0;

  return (
    <>
      <Header />
      <div className="min-h-screen w-full relative flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--primary), var(--primary-light))' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-24 left-12 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-16 right-16 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
          />
        </div>

        <div className="flex-1 relative z-10 flex flex-col pt-20 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0">
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.39, 1.69, 0.36, 1] }}
              className="mb-6 relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl border border-white/20 bg-white/5 shadow-xl backdrop-blur-xl p-6 lg:p-8">
                <div className="flex flex-col xl:flex-row xl:items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        Burnout Score
                      </h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{mockData.weekRange}</span>
                      <span className="text-[11px] uppercase tracking-wide border rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.3)', padding: '4px 8px' }}>
                        Live Data
                      </span>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm sm:text-base" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                      Snapshot of workforce energy, focus, and emotional resilience. <br /> Lower scores indicate healthier teams.
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="rounded-2xl px-4 py-3 backdrop-blur-sm" style={{ border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <p className="text-xs font-semibold uppercase" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Prev Month</p>
                        <p className="text-2xl font-bold text-white font-number" style={{ fontFamily: 'Arial, sans-serif' }}>{mockData.previousScore.toFixed(2)}</p>
                      </div>
                      <div className="rounded-2xl px-4 py-3 backdrop-blur-sm" style={{ 
                        border: isImproving ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(235, 95, 67, 0.3)',
                        backgroundColor: isImproving ? 'rgba(34, 197, 94, 0.1)' : 'rgba(235, 95, 67, 0.1)'
                      }}>
                        <p className="text-xs font-semibold uppercase" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Change</p>
                        <div className="flex items-center gap-2 font-bold font-number text-2xl" style={{ color: isImproving ? 'rgb(34, 197, 94)' : 'rgb(235, 95, 67)', fontFamily: 'Arial, sans-serif' }}>
                          {isImproving ? (
                            <TrendingDown className="w-5 h-5" />
                          ) : (
                            <TrendingUp className="w-5 h-5" />
                          )}
                          <span>{Math.abs(scoreChange).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-44 h-44 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full" style={{ border: '4px solid rgba(255, 255, 255, 0.2)' }} />
                        <div className="absolute inset-4 rounded-full" style={{ border: '4px solid rgba(255, 255, 255, 0.3)' }} />
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 110 }}
                          className="relative flex flex-col items-center justify-center gap-1"
                        >
                          <span className="text-5xl sm:text-6xl font-black text-white font-number" style={{ fontFamily: 'Arial, sans-serif' }}>
                            {animatedScore.toFixed(2)}
                          </span>
                          <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            out of 5
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid flex-1 min-h-0 gap-6 xl:grid-cols-[1.1fr_0.9fr] xl:auto-rows-[minmax(0,1fr)]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="relative min-h-0"
              >
                <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-70" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                <div className="relative h-full rounded-3xl shadow-xl backdrop-blur-xl p-6 flex flex-col" style={{ border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                      <h2 className="text-xl font-black text-white">Dimensions</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 min-h-0 overflow-auto pr-1 content-start">
                    {mockData.subcategories.map((category, index) => {
                      const Icon = category.icon;
                      const scoreColor = getScoreColor(category.score);

                      return (
                        <motion.div
                          key={category.key}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="relative rounded-2xl p-4 transition-all duration-300"
                          style={{ 
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="p-2.5 rounded-xl backdrop-blur-sm"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                              >
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white mb-0.5">{category.name}</p>
                                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  {category.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-xs font-semibold font-number" style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'Arial, sans-serif' }}>
                              {category.trend === "improving" ? (
                                <TrendingDown className="w-4 h-4 text-green-400" />
                              ) : (
                                <TrendingUp className="w-4 h-4 text-orange-400" />
                              )}
                              <span>{Math.abs(category.score - category.previousScore).toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="flex items-end gap-2 mt-4">
                            <span
                              className="text-3xl font-black font-number"
                              style={{ color: scoreColor, fontFamily: 'Arial, sans-serif' }}
                            >
                              {category.score.toFixed(1)}
                            </span>
                            <span className="text-sm font-semibold uppercase font-number" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              /5
                            </span>
                          </div>

                          <div className="w-full h-2.5 rounded-full overflow-hidden mt-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(category.score / 5) * 100}%` }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ duration: 1.1, delay: index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: scoreColor }}
                            />
                          </div>

                          <div className="mt-3 text-[11px] uppercase tracking-wide">
                            <span 
                              className="font-bold"
                              style={{ color: scoreColor }}
                            >
                              {category.score <= 2.5 ? 'Healthy' : category.score <= 3.5 ? 'At Risk' : 'Critical'}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-6 min-h-0">
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                  className="relative min-h-0"
                >
                  <div className="absolute -inset-1 rounded-3xl blur-2xl opacity-60" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <div className="relative h-full rounded-3xl shadow-xl backdrop-blur-xl p-6 flex flex-col" style={{ border: '1px solid rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        <h2 className="text-xl font-black text-white">Manager Action Plan</h2>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac', fontFamily: 'Arial, sans-serif' }}>
                        {mockData.recommendations.length} Actions
                      </div>
                    </div>

                    <p className="text-xs mb-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Prioritized interventions based on current burnout dimensions
                    </p>

                    <div className="flex-1 min-h-0 overflow-auto pr-1 space-y-3">
                      {mockData.recommendations.map((rec, index) => {
                        const isExpanded = expandedRec === index;
                        const dimensionColor = getScoreColor(
                          mockData.subcategories.find(cat => cat.key === rec.dimensionKey)?.score || 0
                        );
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300"
                            style={{
                              border: isExpanded ? `2px solid ${dimensionColor}50` : '1px solid rgba(255, 255, 255, 0.2)',
                              backgroundColor: isExpanded ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedRec(isExpanded ? null : index)}
                              className="w-full text-left p-4 transition-colors"
                              onMouseEnter={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.parentElement!.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.parentElement!.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                                }
                              }}
                            >
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide"
                                    style={{
                                      backgroundColor: rec.priority === 'critical'
                                        ? 'rgba(239, 68, 68, 0.2)'
                                        : rec.priority === 'high'
                                        ? 'rgba(251, 146, 60, 0.2)'
                                        : rec.priority === 'medium'
                                        ? 'rgba(234, 179, 8, 0.2)'
                                        : 'rgba(34, 197, 94, 0.2)',
                                      color: rec.priority === 'critical'
                                        ? '#ef4444'
                                        : rec.priority === 'high'
                                        ? '#fb923c'
                                        : rec.priority === 'medium'
                                        ? '#eab308'
                                        : '#22c55e'
                                    }}
                                  >
                                    Priority: {rec.priority}
                                  </span>
                                </div>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <ArrowRight className="w-4 h-4 transform rotate-90" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                </motion.div>
                              </div>

                              <h3 className="text-sm font-bold text-white mb-1.5">
                                {rec.title}
                              </h3>
                              <p className="text-xs font-semibold" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                {rec.action}
                              </p>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                                    <div className="pt-3">
                                      <div className="flex items-start gap-2 mb-2">
                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#fbbf24' }} />
                                        <div>
                                          <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                            Why This Matters
                                          </p>
                                          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                                            {rec.why}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {rec.priority !== 'low' && (
                                      <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                                        <p className="text-[10px] font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: 'white' }}>
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                          How to Execute
                                        </p>
                                        <ul className="space-y-1.5">
                                          {rec.howTo.map((step, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'white' }}>
                                              <span className="text-sm font-black mt-0.5 font-number" style={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                                                {i + 1}.
                                              </span>
                                              <span className="leading-relaxed">{step}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    <div className="flex items-center justify-between gap-3 pt-2">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                        <span className="text-[11px] font-semibold" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                          {rec.timeframe}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}