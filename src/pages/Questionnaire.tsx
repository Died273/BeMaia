import React, { useState, useEffect } from "react";
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
  // typing animation removed - questions and options render immediately
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);

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
  }, [currentQuestion]);

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
      navigate('/results', { state: { responses } });
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
      navigate('/results', { state: { responses: updatedResponses } });
    }

    setIsAnimating(false);
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
        .qa-option { 
          transition: background 225ms ease, color 225ms ease; 
          -webkit-background-clip: padding-box;
        }
        .qa-option .qa-label { 
          transition: background 225ms ease, color 225ms ease; 
        }
        
        /* Hover effect: white background with text cut-out showing gradient */
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
      
      <div className="max-w-6xl mx-auto px-6 py-14" style={{ paddingBottom: 320, position: 'relative', zIndex: 2 }}>
        <header className="text-center mb-6">
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

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 1020, marginTop: 120, marginBottom: 120 }}>
            <AnimatePresence mode="wait">
              <div key={currentQuestion} style={{ position: 'relative' }}>
                {/* Animated outer border with rounded corners - 8 parts total */}
                
                {/* Top border (straight line between corners) */}
                  <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, originX: 1 }}
                  transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 12,
                    right: 12,
                    height: '1px',
                    background: 'var(--primary-foreground)',
                    zIndex: 2
                  }}
                />
                
                {/* Top-left corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 12,
                    height: 12,
                    borderTop: '1px solid var(--primary-foreground)',
                    borderLeft: '1px solid var(--primary-foreground)',
                    borderTopLeftRadius: 12,
                    zIndex: 2
                  }}
                />
                
                {/* Top-right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderTop: '1px solid var(--primary-foreground)',
                    borderRight: '1px solid var(--primary-foreground)',
                    borderTopRightRadius: 12,
                    zIndex: 2
                  }}
                />
                
                {/* Right border (straight line between corners) */}
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0, originY: 1 }}
                  transition={{ duration: 0.46875, delay: 0.9375, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 0,
                    bottom: 12,
                    width: '1px',
                    background: 'var(--primary-foreground)',
                    zIndex: 2
                  }}
                />
                
                {/* Bottom-right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    borderBottom: '1px solid var(--primary-foreground)',
                    borderRight: '1px solid var(--primary-foreground)',
                    borderBottomRightRadius: 12,
                    zIndex: 2
                  }}
                />
                
                {/* Bottom border (straight line between corners) */}
                <motion.div
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, originX: 0 }}
                  transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 12,
                    right: 12,
                    height: '1px',
                    background: 'var(--primary-foreground)',
                    zIndex: 2
                  }}
                />
                
                {/* Bottom-left corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 12,
                    height: 12,
                    borderBottom: '1px solid var(--primary-foreground)',
                    borderLeft: '1px solid var(--primary-foreground)',
                    borderBottomLeftRadius: 12,
                    zIndex: 2
                  }}
                />
                
                {/* Left border (straight line between corners) */}
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0, originY: 1 }}
                  transition={{ duration: 0.46875, delay: 0, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 0,
                    bottom: 12,
                    width: '1px',
                    background: 'var(--primary-foreground)',
                    zIndex: 2
                  }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3125 }}
                  style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}
                >
                  {/* Question header section */}
                  <div style={{ position: 'relative' }}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.375 }}
                      style={{ 
                        padding: '22px 20px', 
                        background: 'transparent', 
                        color: 'white', 
                        fontWeight: 800, 
                        fontSize: 20, 
                        textAlign: 'center',
                        position: 'relative'
                      }}
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.95, y: 0 }}
                        transition={{ duration: 0.3125, delay: 0.078125 }}
                        style={{ fontSize: 20, fontWeight: 400, opacity: 0.95, marginBottom: 8 }}
                      >
                        Question {currentQuestion + 1} of {questions.length}
                      </motion.div>
                      
                      <div 
                        className={displayText.length > 0 && displayText.length < questions[currentQuestion].text.length ? "typing-cursor" : ""}
                        style={{ fontSize: 26, maxWidth: '80%', margin: '0 auto', minHeight: 35 }}
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
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--primary-foreground)'
                      }}
                    />
                  </div>

                  {/* Answer options grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + scaleOptions.length + ', minmax(0, 1fr))', position: 'relative' }}>
                    {scaleOptions.map((opt, idx) => {
                      const selected = responses[questions[currentQuestion].id] === opt.value || pendingSelection === opt.value;
                      const showCursor = false;
                      
                      return (
                        <div key={opt.value} style={{ position: 'relative' }}>
                          {/* Vertical divider line */}
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
                            className="qa-option"
                            style={{
                              padding: '20px 12px',
                              height: 76,
                              border: 'none',
                              color: 'white',
                              background: selected ? 'rgba(255,255,255,0.06)' : 'transparent',
                              fontWeight: 600,
                              textAlign: 'center',
                              fontSize: 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: isAnimating ? 'not-allowed' : 'pointer',
                              opacity: isAnimating ? 0.6 : 1,
                              width: '100%',
                              position: 'relative'
                            }}
                          >
                            <span className={`qa-label ${showCursor ? 'typing-cursor' : ''}`}>
                              {optionDisplayTexts[idx] || ""}
                            </span>
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </AnimatePresence>

            {/* Progress indicator dots */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46875 }}
              style={{ 
                position: 'fixed', 
                left: 0,
                right: 0,
                bottom: 18,
                maxWidth: 320,
                margin: '0 auto',
                display: 'flex', 
                justifyContent: 'center', 
                gap: 10, 
                padding: '8px 8px', 
                background: 'rgba(0, 0, 0, 0)', 
                borderRadius: 999, 
                zIndex: 60 
              }}
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
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: isFilled ? 'white' : 'transparent',
                      border: isOutline ? '2px solid white' : (isFilled ? 'none' : '1px solid rgba(255,255,255,0.2)'),
                      opacity: isCurrent ? 1 : 0.95,
                      transition: 'all 0.2s ease'
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Previous question button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0 }}
              whileHover={{ scale: 1.15, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={isAnimating}
              style={{ 
                position: 'fixed', 
                left: 18, 
                bottom: 18, 
                background: 'transparent', 
                color: 'white', 
                border: 'none', 
                padding: '8px 10px', 
                zIndex: 61, 
                fontWeight: 700,
                cursor: isAnimating ? 'not-allowed' : 'pointer',
                opacity: isAnimating ? 0.5 : 1
              }}
            >
              Previous question
            </motion.button>
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>

      <Footer />
    </div>
  );
}