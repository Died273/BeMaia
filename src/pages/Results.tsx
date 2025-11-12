import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { 
  TrendingUp, 
  Award, 
  Zap, 
  Wind,
  Brain, 
  Heart, 
  Building2,
  Users,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Mail,
  User,
  Phone,
  Send
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
  // Unified bins for all dimensions and total:
  // Low Risk / Healthy: 1.00 - 2.79
  // At Risk: 2.80 - 3.49
  // Very High Risk / High Risk: 3.50 - 5.00
  total: { green: [1.0, 2.79], orange: [2.8, 3.49], red: [3.5, 5.0] },
  exhaustion: { green: [1.0, 2.79], orange: [2.8, 3.49], red: [3.5, 5.0] },
  mental_distance: { green: [1.0, 2.79], orange: [2.8, 3.49], red: [3.5, 5.0] },
  cognitive: { green: [1.0, 2.79], orange: [2.8, 3.49], red: [3.5, 5.0] },
  emotional: { green: [1.0, 2.79], orange: [2.8, 3.49], red: [3.5, 5.0] }
};

const dimensionInfo = {
  exhaustion: {
    icon: Zap,
    name: "Exhaustion",
    description: "Physical and mental energy "
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
  
  // BACKEND NOTE: Contact form state - these values will be sent to Supabase
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [contactErrors, setContactErrors] = useState<{ email?: string }>({});
  const emailRef = useRef<HTMLInputElement | null>(null);
  
  const finalScores = useMemo(() => calcScores(responses), [responses]);
  const totalZone = getZone("total", finalScores.total);

  // BACKEND NOTE: Save questionnaire responses to Supabase when component mounts
  // You should create a 'questionnaire_responses' table with columns:
  // - id (uuid, primary key)
  // - created_at (timestamp)
  // - total_score (numeric)
  // - exhaustion_score (numeric)
  // - mental_distance_score (numeric)
  // - cognitive_score (numeric)
  // - emotional_score (numeric)
  // - responses (jsonb) - stores the raw responses object
  useEffect(() => {
    // BACKEND TODO: Implement Supabase insert here
    // const saveResponses = async () => {
    //   const { data, error } = await supabase
    //     .from('questionnaire_responses')
    //     .insert({
    //       total_score: finalScores.total,
    //       exhaustion_score: finalScores.exhaustion,
    //       mental_distance_score: finalScores.mental_distance,
    //       cognitive_score: finalScores.cognitive,
    //       emotional_score: finalScores.emotional,
    //       responses: responses
    //     });
    // };
    // saveResponses();
  }, [finalScores, responses]);

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

  // BACKEND NOTE: Contact form submission handler
  // You should create a 'contact_submissions' table in Supabase with columns:
  // - id (uuid, primary key)
  // - created_at (timestamp)
  // - name (text)
  // - email (text)
  // - organization (text)
  // - message (text)
  // - questionnaire_response_id (uuid, optional foreign key to link with questionnaire response)
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate email is present and looks like an email
    const email = contactForm.email?.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setContactErrors({ email: 'Please provide your email.' });
      emailRef.current?.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      setContactErrors({ email: 'Please provide a valid email address.' });
      emailRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    // BACKEND TODO: Implement Supabase insert here
    // const { data, error } = await supabase
    //   .from('contact_submissions')
    //   .insert({
    //     name: contactForm.name,
    //     email: contactForm.email,
    //     organization: contactForm.organization,
    //     message: contactForm.message
    //   });
    // 
    // if (error) {
    //   console.error('Error submitting contact form:', error);
    //   setIsSubmitting(false);
    //   // Handle error - show error message to user
    //   return;
    // }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form
  setContactForm({ name: '', email: '', phone: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
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
          /* ensure the card has a stable height and clips any transformed content */
          min-height: 250px;
          height: 100%;
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 12px;
          -webkit-font-smoothing: antialiased;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 200px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          transform-origin: center center;
          will-change: transform;
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
          box-sizing: border-box;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, opacity;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .flip-card-container:hover .flip-card:not(.flipped) {
          transform: translateZ(0) scale(1.02);
        }

        .contact-input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
          outline: none;
        }

        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .contact-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .contact-textarea {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
          outline: none;
          resize: vertical;
          min-height: 120px;
          font-family: inherit;
        }

        .contact-textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .contact-textarea:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        /* Responsive grid for dimension cards */
        .dimension-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 60px;
        }

        @media (min-width: 768px) {
          .dimension-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .dimension-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Mobile: add spacing between score number and badge, remove translate overlap */
        @media (max-width: 639px) {
          .score-badge {
            transform: none !important;
            margin-top: 12px !important;
            display: inline-flex !important;
            margin-left: 0 !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .flip-card {
            transition: none;
          }
        }
      `}</style>

      <Header />

      <div className="max-w-6xl mx-auto px-6 py-14" style={{ paddingBottom: 80, position: 'relative', zIndex: 2 }}>

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
                    lineHeight: 1,
                    fontFamily: 'Arial, sans-serif'
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
                  className="score-badge"
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
              className="dimension-grid"
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
                        minHeight: 200,
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
                              color: zoneColors[zone.color].text,
                              fontFamily: 'Arial, sans-serif'
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

            {/* Contact Form - Primary Focus */}
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
                initial={{ scaleY:0, originY: 0 }}
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
                padding: '48px 40px'
              }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring" }}
                  style={{ marginBottom: 20, textAlign: 'center' }}
                >
                  <Building2 style={{ width: 48, height: 48, color: 'white', margin: '0 auto' }} />
                </motion.div>

                <h2 style={{ 
                  fontSize: 28, 
                  fontWeight: 800, 
                  color: 'white', 
                  marginBottom: 16,
                  textAlign: 'center'
                }}>
                  We can improve the well-beeing of organizations!
                </h2>

                <p style={{ 
                  fontSize: 18, 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  marginBottom: 40,
                  maxWidth: 600,
                  margin: '0 auto 40px',
                  textAlign: 'center'
                }}>
                  You know someone who works at a organization that could benefit from a proactive burnout-prevention program? We can help teams reduce risk, improve wellbeing, and deliver measurable results — if so, get in touch and we'll show how we can support them.
                </p>

                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 24, 
                  justifyContent: 'center',
                  marginBottom: 40
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

                {/* Contact Form */}
                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      style={{
                        padding: '32px',
                        background: 'rgba(34, 197, 94, 0.2)',
                        border: '2px solid rgba(34, 197, 94, 0.5)',
                        borderRadius: 12,
                        textAlign: 'center'
                      }}
                    >
                      <CheckCircle2 style={{ width: 48, height: 48, color: 'rgb(34, 197, 94)', margin: '0 auto 16px' }} />
                      <h3 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                        Thank You!
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: 16 }}>
                        We've received your message and will get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit}
                      style={{ maxWidth: 600, margin: '0 auto' }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginBottom: 20 }}>
                        {/* Email Input (required) - now first field */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <label style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
                              Email <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            {contactErrors.email && (
                              <div style={{ color: '#ef4444', fontSize: 13, fontWeight: 600 }}>
                                {contactErrors.email}
                              </div>
                            )}
                          </div>

                          <div style={{ position: 'relative' }}>
                            <div style={{ 
                              position: 'absolute', 
                              left: 16, 
                              top: '50%', 
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none'
                            }}>
                              <Mail style={{ width: 18, height: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
                            </div>
                            <input
                              ref={emailRef}
                              type="email"
                              placeholder="Email"
                              value={contactForm.email}
                              onChange={(e) => {
                                setContactForm({ ...contactForm, email: e.target.value });
                                if (contactErrors.email) setContactErrors({});
                              }}
                              className="contact-input"
                              style={{ paddingLeft: 48, borderColor: contactErrors.email ? 'rgba(239, 68, 68, 0.8)' : undefined }}
                            />
                          </div>
                        </div>

                        {/* Name Input (optional) */}
                        <div style={{ position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            left: 16, 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                          }}>
                            <User style={{ width: 18, height: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
                          </div>
                          <input
                            type="text"
                            placeholder="Full Name "
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="contact-input"
                            style={{ paddingLeft: 48 }}
                          />
                        </div>

                        {/* Phone Input (optional) */}
                        <div style={{ position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            left: 16, 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                          }}>
                            <Phone style={{ width: 18, height: 18, color: 'rgba(255, 255, 255, 0.5)' }} />
                          </div>
                          <input
                            type="tel"
                            placeholder="Phone number "
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="contact-input"
                            style={{ paddingLeft: 48 }}
                          />
                        </div>

                        {/* Message Textarea (optional) */}
                        <div>
                          <textarea
                            placeholder="Anything else you'd like us to know? "
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="contact-textarea"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        style={{
                          width: '100%',
                          padding: '16px 32px',
                          background: isSubmitting ? 'rgba(255, 255, 255, 0.5)' : 'white',
                          color: 'var(--primary)',
                          border: 'none',
                          borderRadius: 999,
                          fontSize: 18,
                          fontWeight: 800,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 12,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              style={{ width: 20, height: 20, border: '2px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send
                            <Send style={{ width: 20, height: 20 }} />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
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