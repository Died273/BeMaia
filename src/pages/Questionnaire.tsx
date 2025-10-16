import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";

type Question = { id: number; text: string; dimension?: string };

const questions: Question[] = [
  { id: 1, text: "At work, I feel mentally exhausted" },
  { id: 3, text: "After a day at work, I find it hard to recover my energy" },
  { id: 4, text: "At work, I feel physically exhausted" },
  { id: 9, text: "I struggle to find any enthusiasm for my work" },
  { id: 11, text: "I feel a strong aversion towards my job" },
  { id: 13, text: "I'm cynical about what my work means to others" },
  { id: 14, text: "At work, I have trouble staying focused" },
  { id: 17, text: "When I'm working, I have trouble concentrating" },
  { id: 18, text: "I make mistakes in my work because I have my mind on other things" },
  { id: 19, text: "At work, I feel unable to control my emotions" },
  { id: 20, text: "I do not recognize myself in the way I react emotionally at work" },
  { id: 23, text: "At work I may overreact unintentionally" },
  { id: 24, text: "Too see your Results please share your Email with us." },
];

const scaleOptions = [
  { value: "1", label: "Never" },
  { value: "2", label: "Rarely" },
  { value: "3", label: "Sometimes" },
  { value: "4", label: "Often" },
  { value: "5", label: "Always" },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [countedQuestionIds, setCountedQuestionIds] = useState<number[]>([]);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [optionDisplayTexts, setOptionDisplayTexts] = useState<string[]>([]);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const progressedCount = countedQuestionIds.length;
  const rawProgress = (progressedCount / questions.length) * 100;
  const progress = Math.max(0, Math.min(100, rawProgress));
  const canProceed = responses[questions[currentQuestion]?.id] !== undefined;
  const allAnswered = Object.keys(responses).length === questions.length;

  // Map question id to dimension for background tinting
  const questionDimensionMap: Record<number, string> = {
    1: 'exhaustion', 3: 'exhaustion', 4: 'exhaustion',
    9: 'mental_distance', 11: 'mental_distance', 13: 'mental_distance',
    14: 'cognitive', 17: 'cognitive', 18: 'cognitive',
    19: 'emotional', 20: 'emotional', 23: 'emotional'
  };
  const currentDimension = questionDimensionMap[questions[currentQuestion]?.id] || 'total';

  // render question and options immediately (no typing)
  useEffect(() => {
    setDisplayText(questions[currentQuestion].text);
    setOptionDisplayTexts(scaleOptions.map(o => o.label));
    // sync email input when arriving at the email question
    if (questions[currentQuestion].id === 24) {
      setEmailInput(responses[24] || '');
    }
  }, [currentQuestion, responses]);

  function handleResponse(value: string) {
    if (isAnimating) return;
    setResponses(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  }

  async function handleNext() {
    if (isAnimating) return;
    
    const qId = questions[currentQuestion].id;
    if (responses[qId] !== undefined && !countedQuestionIds.includes(qId)) {
      setCountedQuestionIds(prev => [...prev, qId]);
    }

    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 976));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (allAnswered) {
      const allAnsweredIds = Object.keys(responses).map(Number);
      setCountedQuestionIds(prev => Array.from(new Set([...prev, ...allAnsweredIds])));
      const filtered = { ...responses };
      delete filtered[24];
      navigate('/results', { state: { responses: filtered } });
    }

    setIsAnimating(false);
  }

  function handlePrevious() {
    if (isAnimating) return;
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsAnimating(false);
      }, 586);
    } else {
      window.history.back();
    }
  }

  async function handleOptionClick(value: string) {
    if (isAnimating) return;

    setPendingSelection(value);
    await new Promise(resolve => setTimeout(resolve, 1));

    const updatedResponses = { ...responses, [questions[currentQuestion].id]: value };

    await new Promise(resolve => setTimeout(resolve, 1));
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 1));

    if (currentQuestion < questions.length - 1) {
      setResponses(updatedResponses);
      setCountedQuestionIds(prev => Array.from(new Set([...prev, questions[currentQuestion].id])));
      setPendingSelection(null);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResponses(updatedResponses);
      const allAnsweredIds = Object.keys(updatedResponses).map(Number);
      setCountedQuestionIds(prev => Array.from(new Set([...prev, ...allAnsweredIds])));
      setPendingSelection(null);
      const filtered = { ...updatedResponses };
      delete filtered[24];
      navigate('/results', { state: { responses: filtered } });
    }

    setIsAnimating(false);
  }

  // BACKEND NOTE: Email submission handler
  // You should save the email to Supabase 'questionnaire_emails' table with columns:
  // - id (uuid, primary key)
  // - created_at (timestamp)
  // - email (text)
  // - questionnaire_response_id (uuid, optional foreign key)
  const handleEmailSubmit = async () => {
    const email = emailInput.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Please enter your email');
      emailRef.current?.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      emailRef.current?.focus();
      return;
    }

    const updatedResponses = { ...responses, [questions[currentQuestion].id]: email };
    setResponses(updatedResponses);

    // BACKEND TODO: Save email to Supabase here
    // const { data, error } = await supabase
    //   .from('questionnaire_emails')
    //   .insert({ email: email });

    if (currentQuestion < questions.length - 1) {
      handleNext();
    } else {
      const filtered = { ...updatedResponses };
      delete filtered[24];
      navigate('/results', { state: { responses: filtered } });
    }
  };

  // Render either the email input (for question id 24) or the scale options
  function renderAnswerArea() {
    const qId = questions[currentQuestion].id;
    
    if (qId === 24) {
      return (
        /* Email Input Section - Responsive */
        <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
          <input
            ref={emailRef}
            type="email"
            value={emailInput}
            onChange={(e) => { setEmailInput(e.target.value); if (emailError) setEmailError(null); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEmailSubmit();
              }
            }}
            aria-label="Email"
            placeholder="you@company.com"
            className="w-full px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-white/20 bg-transparent text-white outline-none focus:border-white/40 focus:bg-white/5 transition-all"
          />
          {emailError && (
            <div className="text-red-400 text-sm mt-2">{emailError}</div>
          )}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-white/90 text-xs sm:text-sm md:text-base italic font-normal">
              *Your answers are fully anonymous and not connected to your email.
            </div>
            <motion.button
              onClick={handleEmailSubmit}
              disabled={isAnimating || !isValidEmail(emailInput.trim())}
              whileHover={{ scale: isValidEmail(emailInput.trim()) ? 1.05 : 1 }}
              whileTap={{ scale: isValidEmail(emailInput.trim()) ? 0.95 : 1 }}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white text-primary font-bold text-sm sm:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </motion.button>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* DESKTOP: Horizontal grid layout (≥768px) */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(' + scaleOptions.length + ', minmax(0, 1fr))' }}>
          {scaleOptions.map((opt, idx) => {
            const selected = responses[questions[currentQuestion].id] === opt.value || pendingSelection === opt.value;

            return (
              <div key={opt.value} style={{ position: 'relative' }}>
                {idx > 0 && (
                  <motion.div
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0, originY: 1 }}
                    transition={{ duration: 0.390625, delay: idx * 0.046875, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      background: 'var(--primary-foreground)',
                      zIndex: 1
                    }}
                  />
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3125 }}
                  onClick={() => handleOptionClick(opt.value)}
                  aria-disabled={isAnimating}
                  aria-pressed={selected}
                  className="qa-option w-full h-[76px] border-none text-white font-semibold text-2xl flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    padding: '20px 12px',
                    background: selected ? 'rgba(255,255,255,0.06)' : 'transparent',
                    opacity: isAnimating ? 0.6 : 1,
                    cursor: isAnimating ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span className="qa-label">
                    {optionDisplayTexts[idx] || ""}
                  </span>
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* MOBILE: Vertical stack (< 768px) */}
        <div className="flex md:hidden flex-col gap-3 p-4">
          {scaleOptions.map((opt, idx) => {
            const selected = responses[questions[currentQuestion].id] === opt.value || pendingSelection === opt.value;

            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.05, delay: idx * 0.1 }}
                onClick={() => handleOptionClick(opt.value)}
                aria-disabled={isAnimating}
                aria-pressed={selected}
                className="qa-option-mobile w-full px-5 py-4 rounded-lg border border-white/20 text-white font-semibold text-base flex items-center justify-center cursor-pointer transition-all"
                style={{
                  background: selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                  opacity: isAnimating ? 0.6 : 1,
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  borderColor: selected ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'
                }}
              >
                <span className="text-center">{opt.label}</span>
              </motion.button>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(180deg, var(--primary), var(--primary-light))', overflow: 'hidden' }}>
      {/* Background tint layers based on dimension */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {currentDimension === 'exhaustion' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--primary), var(--primary-light))', opacity: 0.12 }} />
        )}
        {currentDimension === 'mental_distance' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--sidebar-accent), var(--sidebar-primary))', opacity: 0.12 }} />
        )}
        {currentDimension === 'cognitive' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--accent), var(--accent-foreground))', opacity: 0.12 }} />
        )}
        {currentDimension === 'emotional' && (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--secondary), var(--secondary-foreground))', opacity: 0.12 }} />
        )}
      </div>
      
      <style>{`
        /* DESKTOP STYLES (≥768px) */
        @media (min-width: 768px) {
          .qa-option { 
            transition: background 225ms ease, color 225ms ease; 
            -webkit-background-clip: padding-box;
          }
          .qa-option .qa-label { 
            transition: background 225ms ease, color 225ms ease; 
          }
          
          .qa-option:hover { 
            background: white !important; 
          }
          .qa-option:hover .qa-label { 
            color: transparent !important;
            background: linear-gradient(180deg, var(--primary), var(--primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }

        /* MOBILE HOVER EFFECTS (< 768px) */
        @media (max-width: 767px) {
          .qa-option-mobile:active {
            transform: scale(0.97);
          }
          /* Mirror desktop hover effect for touch/devices that support hover on mobile/tablet */
          .qa-option-mobile:hover {
            background: white !important;
          }
          .qa-option-mobile:hover .qa-label,
          .qa-option-mobile:hover span {
            color: transparent !important;
            background: linear-gradient(180deg, var(--primary), var(--primary-light));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }
        
        .typing-cursor::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      
  {/* Main Container - Responsive padding */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-164 py-8 sm:py-64" style={{ paddingBottom: 'clamp(200px, 25vh, 320px)', position: 'relative', zIndex: 2 }}>
        
  {/* Header - Responsive */}
  <header className="text-center mb-0">
          <motion.a
            href="/"
            initial={{ opacity: 1 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.98 }}
            className="text-white font-bold text-xl sm:text-2xl lg:text-[26px] inline-block underline underline-offset-4 decoration-white/90 decoration-2"
          >
            Homepage
          </motion.a>
        </header>

        {/* Question Card Container - Responsive spacing */}
        <div className="flex justify-center">
          <div className="w-full max-w-[1020px] mt-[25px] mb-8 sm:mb-16 lg:mb-[120px] relative">
            <AnimatePresence mode="wait">
              <div key={currentQuestion} className="relative">
                
                {/* Animated Border - All 8 parts (maintained for desktop, simplified for mobile) */}
                {/* Top border */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, originX: 1 }}
                  transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }}
                  className="absolute top-0 left-3 right-3 h-px bg-white z-[2]"
                />
                
                {/* Top-left corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }}
                  className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white rounded-tl-xl z-[2]"
                />
                
                {/* Top-right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }}
                  className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white rounded-tr-xl z-[2]"
                />
                
                {/* Right border */}
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0, originY: 1 }}
                  transition={{ duration: 0.46875, delay: 0.9375, ease: "easeOut" }}
                  className="absolute top-3 right-0 bottom-3 w-px bg-white z-[2]"
                />
                
                {/* Bottom-right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }}
                  className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white rounded-br-xl z-[2]"
                />
                
                {/* Bottom border */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, originX: 0 }}
                  transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }}
                  className="absolute bottom-0 left-3 right-3 h-px bg-white z-[2]"
                />
                
                {/* Bottom-left corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white rounded-bl-xl z-[2]"
                />
                
                {/* Left border */}
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0, originY: 1 }}
                  transition={{ duration: 0.46875, delay: 0, ease: "easeOut" }}
                  className="absolute top-3 left-0 bottom-3 w-px bg-white z-[2]"
                />

                {/* Question Card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3125 }}
                  className="rounded-xl overflow-hidden relative"
                >
                  {/* Question Header Section - Responsive */}
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.375 }}
                      className="px-4 py-5 sm:px-6 sm:py-6 lg:px-5 lg:py-[22px] bg-transparent text-white font-bold text-center relative"
                    >
                      {/* Question Counter - Responsive */}
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.95, y: 0 }}
                        transition={{ duration: 0.3125, delay: 0.078125 }}
                        className="text-base sm:text-lg lg:text-xl font-normal opacity-95 mb-2"
                      >
                        Question {currentQuestion + 1} of {questions.length}
                      </motion.div>
                      
                      {/* Question Text - Responsive */}
                      <div 
                        className="text-lg sm:text-xl lg:text-[26px] max-w-[90%] sm:max-w-[80%] mx-auto min-h-[30px] sm:min-h-[35px]"
                      >
                        {displayText}
                      </div>
                    </motion.div>

                    {/* Horizontal divider line */}
                    <motion.div
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0, originX: 1 }}
                      transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    />
                  </div>

                  {/* Answer Area - Responsive layouts handled within renderAnswerArea() */}
                  {renderAnswerArea()}
                </motion.div>
              </div>
            </AnimatePresence>

            {/* Controls: Previous button (left), Progress dots (center), spacer (right) */}
            <div className="w-full flex items-center justify-between mt-2 px-0 md:px-0 mb-24 md:mb-0 z-[61] md:fixed md:left-0 md:right-0 md:mx-auto md:bottom-4" style={{ maxWidth: '1020px' }}>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.12 }}
                onClick={handlePrevious}
                disabled={isAnimating}
                className="bg-transparent text-white border-none px-2 py-2 sm:px-2.5 sm:py-2 font-bold text-xs sm:text-sm lg:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous question"
              >
                <span className="hidden sm:inline">Previous question</span>
                <span className="sm:hidden">Previous</span>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46875 }}
                className="mx-auto flex justify-center gap-2 sm:gap-2.5 px-2 py-4 bg-transparent rounded-full"
                style={{ maxWidth: '320px' }}
              >
                {questions.map((q, i) => {
                  const answered = responses[q.id] !== undefined;
                  const isCurrent = i === currentQuestion;
                  const isFilled = answered;
                  const isOutline = isCurrent && !answered;

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.625 + (i * 0.03125), type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{ scale: 1.3 }}
                      role="img"
                      aria-label={`Question ${i + 1} ${answered ? 'answered' : 'not answered'}`}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200"
                      style={{
                        background: isFilled ? 'white' : 'transparent',
                        border: isOutline ? '2px solid white' : (isFilled ? 'none' : '1px solid rgba(255,255,255,0.2)'),
                        opacity: isCurrent ? 1 : 0.95
                      }}
                    />
                  );
                })}
              </motion.div>

              {/* Right action button to keep layout symmetric on wide viewports */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                whileHover={{ scale: 1.12 }}
                onClick={() => navigate('/mission')}
                disabled={isAnimating}
                className="bg-transparent text-white border-none px-2 py-6 sm:px-2.5 sm:py-2 font-bold text-xs sm:text-sm lg:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Further information"
              >
                <span className="hidden sm:inline">Further Info</span>
                <span className="sm:hidden">Info</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}