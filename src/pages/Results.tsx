import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ContactFormInput, ContactFormTextarea } from "@/components/ui/contactform";
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
    green: { bg: 'var(--success-bg)', text: 'var(--success-bright)', border: 'var(--success-border)' },
    orange: { bg: 'var(--warning-bg)', text: 'var(--warning)', border: 'var(--warning-bg)' },
    red: { bg: 'var(--danger-bg)', text: 'var(--danger-bright)', border: 'var(--danger-border)' }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full relative flex flex-col overflow-hidden" style={{ background: 'var(--background)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="flex-1 relative z-10 flex flex-col pt-32 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col max-w-6xl">
            
            {/* Overall Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="relative rounded-[15px] border-2 shadow-lg p-8 lg:p-10" style={{ borderColor: 'var(--foreground)', background: 'var(--background-light)' }}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="mb-6"
                  >
                    <Award className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>

                  <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-8">
                    Your overall well-being score
                  </h1>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                      className="inline-block px-12 py-6 rounded-[15px] border-2"
                      style={{
                        background: zoneColors[totalZone.color].bg,
                        borderColor: zoneColors[totalZone.color].border
                      }}
                    >
                      <div
                        className="text-5xl font-black"
                        style={{ 
                          color: zoneColors[totalZone.color].text
                        }}
                      >
                        {animatedScores.total.toFixed(2)}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2"
                      style={{
                        background: zoneColors[totalZone.color].bg,
                        borderColor: zoneColors[totalZone.color].border,
                        color: zoneColors[totalZone.color].text
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold text-lg">{totalZone.label}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dimension Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(dimensionInfo).map(([key, info], idx) => {
                  const zone = getZone(key as keyof typeof cutoff, finalScores[key]);
                  const Icon = info.icon;
                  const isFlipped = flippedCards[key] || false;
                  const dimensionAdviceText = getDimensionAdvice(key, zone.label);
                  
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="relative h-[280px]"
                      style={{ perspective: '1000px' }}
                    >
                      <motion.div
                        onClick={() => toggleFlip(key)}
                        className="relative w-full h-full cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      >
                        {/* Front of card */}
                        <div
                          className="absolute inset-0 rounded-[15px] border-2 shadow-lg p-5 flex flex-col hover:shadow-xl transition-shadow"
                          style={{ 
                            borderColor: 'var(--foreground)',
                            background: 'var(--background-light)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          {/* Score View - Front of card */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-[15px] bg-muted/50">
                                <Icon className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{info.description}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-end gap-2 mb-4">
                            <span
                              className="text-4xl font-black"
                              style={{ 
                                color: zoneColors[zone.color].text
                              }}
                            >
                              {animatedScores[key].toFixed(2)}
                            </span>
                            <span className="text-base font-semibold uppercase text-muted-foreground pb-1.5">
                              /5
                            </span>
                          </div>

                          <div 
                            className="px-3 py-1.5 rounded-full text-sm font-bold inline-flex items-center gap-1.5 mb-4 w-fit"
                            style={{
                              background: zoneColors[zone.color].bg,
                              border: `1px solid ${zoneColors[zone.color].border}`,
                              color: zoneColors[zone.color].text
                            }}
                          >
                            {zone.label}
                          </div>

                          <div className="w-full h-2.5 bg-muted/30 rounded-full overflow-hidden mb-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(animatedScores[key] / 5) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: zoneColors[zone.color].text }}
                            />
                          </div>

                          <div className="flex-grow" />

                          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-semibold">
                            <Lightbulb className="w-4 h-4" />
                            Click for advice
                          </div>
                        </div>

                        {/* Back of card */}
                        <div
                          className="absolute inset-0 rounded-[15px] border-2 shadow-lg p-5 flex flex-col hover:shadow-xl transition-shadow"
                          style={{ 
                            borderColor: 'var(--foreground)',
                            background: 'var(--background-light)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          {/* Advice View - Back of card */}
                          <div className="flex items-center gap-2.5 mb-4">
                            <div className="p-2 rounded-[15px] bg-primary/10">
                              <Lightbulb className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-sm font-bold text-primary">Personalized Advice</h3>
                          </div>

                          <p className="text-sm leading-relaxed text-foreground/80 flex-grow">
                            {dimensionAdviceText}
                          </p>

                          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm font-semibold">
                            <RotateCcw className="w-4 h-4" />
                            Click to see score
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-8"
            >
              <div className="relative rounded-[15px] border-2 shadow-lg p-8 lg:p-10" style={{ borderColor: 'var(--foreground)', background: 'var(--background-light)' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.3, type: "spring" }}
                  className="mb-5 text-center"
                >
                  <Building2 className="w-12 h-12 text-primary mx-auto" />
                </motion.div>

                <h2 className="text-2xl lg:text-3xl font-black text-foreground mb-4 text-center">
                  We can improve the well-being of organizations!
                </h2>

                <p className="text-base text-foreground/80 mb-8 max-w-2xl mx-auto text-center">
                  You know someone who works at an organization that could benefit from a proactive burnout-prevention program? We can help teams reduce risk, improve wellbeing, and deliver measurable results — if so, get in touch and we'll show how we can support them.
                </p>

                <div className="flex flex-wrap gap-6 justify-center mb-8">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Personalized Recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Expert Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Real Results</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-8 bg-green-50 border-2 border-green-200 rounded-[15px] text-center"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-foreground text-xl font-bold mb-2">
                        Thank You!
                      </h3>
                      <p className="text-foreground/80">
                        We've received your message and will get back to you soon.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit}
                      className="max-w-2xl mx-auto"
                    >
                      <div className="grid grid-cols-1 gap-5 mb-5">
                        {/* Name Input */}
                        <ContactFormInput
                          type="text"
                          label="Your name"
                          placeholder="John Doe"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        />

                        {/* Email Input */}
                        <ContactFormInput
                          ref={emailRef}
                          type="email"
                          label="Business email address"
                          placeholder="john@company.com"
                          value={contactForm.email}
                          onChange={(e) => {
                            setContactForm({ ...contactForm, email: e.target.value });
                            if (contactErrors.email) setContactErrors({});
                          }}
                          error={contactErrors.email}
                        />

                        {/* Company Name Input */}
                        <ContactFormInput
                          type="text"
                          label="Company name"
                          placeholder="Please enter your company name"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        />

                        {/* Message Textarea */}
                        <ContactFormTextarea
                          label="Reason for reaching out"
                          placeholder="Tell us why you're interested in BeMaia..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className="px-8 py-3 rounded-[15px] text-base font-semibold transition-all duration-300 hover:scale-100"
                          style={{
                            background: '#88C0E5',
                            color: '#000000'
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full mr-3"
                              />
                              Sending...
                            </>
                          ) : (
                            'Submit'
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}