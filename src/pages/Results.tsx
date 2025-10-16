import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { 
  TrendingUp, 
  Award, 
  Zap, 
  Wind,
  Brain, 
  Heart, 
  ArrowRight,
  Building2,
  Users,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  RotateCcw
} from "lucide-react";

const questions = [
  { id: 1, dimension: "exhaustion" },
  { id: 3, dimension: "exhaustion" },
  { id: 4, dimension: "exhaustion" },
  { id: 9, dimension: "mental_distance" },
  { id: 11, dimension: "mental_distance" },
  { id: 13, dimension: "mental_distance" },
  { id: 14, dimension: "cognitive" },
  { id: 17, dimension: "cognitive" },
  { id: 18, dimension: "cognitive" },
  { id: 19, dimension: "emotional" },
  { id: 20, dimension: "emotional" },
  { id: 23, dimension: "emotional" },
];

const cutoff = {
  total: { green: [1.00, 2.53], orange: [2.54, 2.95], red: [2.96, 5.00] },
  exhaustion: { green: [1.00, 3.16], orange: [3.17, 3.50], red: [3.51, 5.00] },
  mental_distance: { green: [1.00, 2.16], orange: [2.17, 3.16], red: [3.17, 5.00] },
  cognitive: { green: [1.00, 2.82], orange: [2.83, 3.16], red: [3.17, 5.00] },
  emotional: { green: [1.00, 2.16], orange: [2.17, 2.82], red: [2.83, 5.00] }
};

const dimensionInfo = {
  exhaustion: {
    icon: Zap,
    name: "Exhaustion",
    description: "Physical and mental energy levels"
  },
  mental_distance: {
    icon: Wind,
    name: "Mental Distance",
    description: "Engagement with work"
  },
  cognitive: {
    icon: Brain,
    name: "Cognitive",
    description: "Focus and concentration"
  },
  emotional: {
    icon: Heart,
    name: "Emotional",
    description: "Emotional regulation"
  }
};

const dimensionAdvice = {
  exhaustion: {
    healthy: "You're managing your energy well! Continue prioritizing rest and recovery to maintain your vitality.",
    atRisk: "Your energy levels need attention. Try incorporating short breaks throughout your day and ensure you're getting quality sleep.",
    highRisk: "Your exhaustion levels are concerning. Please prioritize rest, consider taking time off, and speak with a healthcare professional."
  },
  mental_distance: {
    healthy: "You're staying engaged with your work! Keep finding meaning in what you do and maintain that positive connection.",
    atRisk: "Your enthusiasm is waning. Try reconnecting with the purpose of your work or exploring new challenges that excite you.",
    highRisk: "You're feeling disconnected from your work. This is serious—consider discussing your role with a manager or exploring career counseling."
  },
  cognitive: {
    healthy: "Your focus and concentration are strong! Maintain your productive routines and continue managing distractions effectively.",
    atRisk: "Your concentration is slipping. Try minimizing distractions, using time-blocking techniques, or incorporating mindfulness practices.",
    highRisk: "You're struggling to focus significantly. This may indicate burnout—consider reducing your workload and seeking professional support."
  },
  emotional: {
    healthy: "You're managing emotions effectively at work! Your emotional regulation skills are serving you well.",
    atRisk: "Your emotional responses are becoming harder to control. Practice stress-reduction techniques and consider talking to someone you trust.",
    highRisk: "You're finding it very difficult to regulate emotions at work. Please reach out to a mental health professional for support."
  }
};

function getZone(dim: keyof typeof cutoff, value: number) {
  if (value >= cutoff[dim].red[0]) return { label: "High Risk", color: "red" };
  if (value >= cutoff[dim].orange[0]) return { label: "At Risk", color: "orange" };
  return { label: "Healthy", color: "green" };
}

function getDimensionAdvice(dimension: string, zone: string) {
  const advice = dimensionAdvice[dimension as keyof typeof dimensionAdvice];
  if (zone === "Healthy") return advice.healthy;
  if (zone === "At Risk") return advice.atRisk;
  return advice.highRisk;
}

function calcScores(responses: Record<number, string>) {
  const dims: Record<string, number[]> = {
    exhaustion: [], mental_distance: [], cognitive: [], emotional: []
  };
  questions.forEach(q => {
    const val = parseInt(responses[q.id] || "0", 10);
    if (val) dims[q.dimension].push(val);
  });
  const scores: Record<string, number> = {};
  Object.keys(dims).forEach(dim => {
    scores[dim] = dims[dim].length ? dims[dim].reduce((a, b) => a + b, 0) / dims[dim].length : 0;
  });
  const all = Object.values(responses).map(v => parseInt(v, 10)).filter(v => v);
  scores["total"] = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
  return scores;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const responses = useMemo(() => location.state?.responses || {}, [location.state]);
  
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({
    total: 0, exhaustion: 0, mental_distance: 0, cognitive: 0, emotional: 0
  });
  
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [showFlipHint, setShowFlipHint] = useState(true);
  
  const finalScores = useMemo(() => calcScores(responses), [responses]);
  const totalZone = getZone("total", finalScores.total);

  useEffect(() => {
    setAnimatedScores({ total: 0, exhaustion: 0, mental_distance: 0, cognitive: 0, emotional: 0 });

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedScores({
        total: finalScores.total * easeProgress,
        exhaustion: finalScores.exhaustion * easeProgress,
        mental_distance: finalScores.mental_distance * easeProgress,
        cognitive: finalScores.cognitive * easeProgress,
        emotional: finalScores.emotional * easeProgress,
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedScores(finalScores);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [finalScores]);

  const toggleFlip = (key: string) => {
    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));
    setShowFlipHint(false);
  };

  if (Object.keys(responses).length !== questions.length) {
    navigate("/questionnaire");
    return null;
  }

  const zoneColors = {
    green: { bg: 'rgba(34, 197, 94, 0.1)', text: 'rgb(34, 197, 94)', border: 'rgba(34, 197, 94, 0.3)' },
    orange: { bg: 'rgba(251, 191, 36, 0.1)', text: 'rgb(251, 191, 36)', border: 'rgba(251, 191, 36, 0.3)' },
    red: { bg: 'rgba(239, 68, 68, 0.1)', text: 'rgb(239, 68, 68)', border: 'rgba(239, 68, 68, 0.3)' }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(180deg, var(--primary), var(--primary-light))', overflow: 'hidden' }}>
      <style>{`
        .flip-card-container {
          perspective: 1000px;
          height: 100%;
          position: relative; /* ensure positioned children are contained */
          display: block;
          -webkit-font-smoothing: antialiased;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          transform-origin: center center; /* ensure it flips in place */
          will-change: transform; /* hint for smoother animation */
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, opacity; /* smoother back/front transitions */
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        /* Hover effect should only scale on the composite transform to avoid layout shifts */
        .flip-card-container:hover .flip-card:not(.flipped) {
          transform: translateZ(0) scale(1.02);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .flip-card {
            transition: none;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 py-14" style={{ paddingBottom: 80, position: 'relative', zIndex: 2 }}>
        <header className="text-center mb-12">
          <motion.a
            href="/"
            initial={{ opacity: 1 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.98 }}
            style={{ color: 'white', fontWeight: 700, fontSize: 26, display: 'inline-block' }}
          >
            Homepage
          </motion.a>
        </header>

        {/* Main Results Container */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <div style={{ width: '100%', maxWidth: 1020 }}>
            
            {/* Overall Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                borderRadius: 12, 
                overflow: 'hidden', 
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                marginBottom: 40
              }}
            >
              <div style={{ 
                padding: '40px 32px', 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  style={{ marginBottom: 24 }}
                >
                  <Award style={{ width: 64, height: 64, color: 'white', margin: '0 auto' }} />
                </motion.div>

                <h1 style={{ 
                  fontSize: 32, 
                  fontWeight: 800, 
                  color: 'white', 
                  marginBottom: 32 
                }}>
                  Your Well-being Score
                </h1>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                  style={{ 
                    display: 'inline-block',
                    padding: '24px 64px 24px 48px',
                    background: zoneColors[totalZone.color].bg,
                    border: `2px solid ${zoneColors[totalZone.color].border}`,
                    borderRadius: 12,
                    marginBottom: 20
                  }}
                >
                  <div style={{ 
                    fontSize: 72, 
                    fontWeight: 800, 
                    color: zoneColors[totalZone.color].text,
                    lineHeight: 1
                  }}>
                    {animatedScores.total.toFixed(2)}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    marginLeft: 24,
                    padding: '12px 24px',
                    background: zoneColors[totalZone.color].bg,
                    border: `2px solid ${zoneColors[totalZone.color].border}`,
                    borderRadius: 999,
                    color: zoneColors[totalZone.color].text,
                    fontWeight: 700,
                    fontSize: 18,
                    verticalAlign: 'middle',
                    transform: 'translateY(-20px)'
                  }}
                >
                  <CheckCircle2 style={{ width: 20, height: 20 }} />
                  {totalZone.label}
                </motion.div>
              </div>
            </motion.div>

            {/* Flip Hint */}
            {showFlipHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{ 
                  textAlign: 'center',
                  marginBottom: 24
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 999,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 14
                }}>
                  <RotateCcw style={{ width: 16, height: 16 }} />
                  Click cards below for personalized advice
                  <Sparkles style={{ width: 16, height: 16 }} />
                </div>
              </motion.div>
            )}

            {/* Dimension Breakdown - FLIPPABLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 20,
                marginBottom: 60
              }}
            >
              {Object.entries(dimensionInfo).map(([key, info], idx) => {
                const zone = getZone(key as keyof typeof cutoff, finalScores[key]);
                const Icon = info.icon;
                const isFlipped = flippedCards[key];
                const dimensionAdviceText = getDimensionAdvice(key, zone.label);
                
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    style={{
                      height: 200,
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleFlip(key)}
                  >
                    <div className="flip-card-container">
                      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                        {/* FRONT - Score Card */}
                        <div 
                          className="flip-card-front"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 12,
                            padding: '24px 20px',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <div style={{ 
                              padding: 10, 
                              background: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: 8
                            }}>
                              <Icon style={{ width: 24, height: 24, color: 'white' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                                {info.name}
                              </div>
                              <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)' }}>
                                {info.description}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ 
                              fontSize: 36, 
                              fontWeight: 800, 
                              color: zoneColors[zone.color].text 
                            }}>
                              {animatedScores[key].toFixed(2)}
                            </div>
                            <div style={{
                              padding: '6px 16px',
                              background: zoneColors[zone.color].bg,
                              border: `1px solid ${zoneColors[zone.color].border}`,
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 700,
                              color: zoneColors[zone.color].text
                            }}>
                              {zone.label}
                            </div>
                          </div>

                          <div style={{ 
                            width: '100%', 
                            height: 6, 
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginBottom: 16
                          }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(animatedScores[key] / 5) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              style={{ 
                                height: '100%', 
                                background: zoneColors[zone.color].text,
                                borderRadius: 999
                              }}
                            />
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            <RotateCcw style={{ width: 14, height: 14 }} />
                            Click for advice
                          </div>
                        </div>

                        {/* BACK - Advice Card */}
                        <div 
                          className="flip-card-back"
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: 12,
                            padding: '24px 20px',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{ 
                              padding: 8, 
                              background: 'rgba(255, 255, 255, 0.15)',
                              borderRadius: 8
                            }}>
                              <Lightbulb style={{ width: 20, height: 20, color: 'white' }} />
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                              Personalized Advice
                            </div>
                          </div>

                          <div style={{ 
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 16
                          }}>
                            <p style={{ 
                              fontSize: 14, 
                              lineHeight: 1.6,
                              color: 'rgba(255, 255, 255, 0.95)',
                              margin: 0
                            }}>
                              {dimensionAdviceText}
                            </p>
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            <RotateCcw style={{ width: 14, height: 14 }} />
                            Click to see score
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Call to Action - Primary Focus */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                position: 'relative',
                marginBottom: 40
              }}
            >
              {/* Animated border */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 12,
                  right: 12,
                  height: '1px',
                  background: 'white'
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 12,
                  height: 12,
                  borderTop: '1px solid white',
                  borderLeft: '1px solid white',
                  borderTopLeftRadius: 12
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderTop: '1px solid white',
                  borderRight: '1px solid white',
                  borderTopRightRadius: 12
                }}
              />
              <motion.div
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 0,
                  bottom: 12,
                  width: '1px',
                  background: 'white'
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  borderBottom: '1px solid white',
                  borderRight: '1px solid white',
                  borderBottomRightRadius: 12
                }}
              />
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 12,
                  right: 12,
                  height: '1px',
                  background: 'white'
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 12,
                  height: 12,
                  borderBottom: '1px solid white',
                  borderLeft: '1px solid white',
                  borderBottomLeftRadius: 12
                }}
              />
              <motion.div
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 0,
                  bottom: 12,
                  width: '1px',
                  background: 'white'
                }}
              />

              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: 12,
                padding: '48px 40px',
                textAlign: 'center'
              }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring" }}
                  style={{ marginBottom: 20 }}
                >
                  <Building2 style={{ width: 48, height: 48, color: 'white', margin: '0 auto' }} />
                </motion.div>

                <h2 style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  color: 'white', 
                  marginBottom: 16 
                }}>
                  Protect Your Team's Well-being
                </h2>

                <p style={{ 
                  fontSize: 18, 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  marginBottom: 32,
                  maxWidth: 600,
                  margin: '0 auto 32px'
                }}>
                  This individual assessment is just the beginning. We've built a comprehensive solution for organizations to prevent burnout across entire teams—with zero effort for HR.
                </p>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 24, 
                  justifyContent: 'center',
                  marginBottom: 32
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Sparkles style={{ width: 20, height: 20, color: 'white' }} />
                    <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Personalized Recommendations</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Users style={{ width: 20, height: 20, color: 'white' }} />
                    <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Expert Support</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp style={{ width: 20, height: 20, color: 'white' }} />
                    <span style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>Real Results</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '16px 48px',
                    background: 'white',
                    color: 'var(--primary)',
                    border: 'none',
                    borderRadius: 999,
                    fontSize: 18,
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                  onClick={() => window.location.href = 'mailto:contact@yourcompany.com'}
                >
                  Learn More for Organizations
                  <ArrowRight style={{ width: 20, height: 20 }} />
                </motion.button>
              </div>
            </motion.div>

            {/* Retake Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ textAlign: 'center' }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/questionnaire')}
                style={{
                  padding: '12px 32px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 999,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Retake Assessment
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}