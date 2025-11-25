import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useContactModal } from '@/contexts/ContactModalContext';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  fetchSurveyQuestions,
  fetchQuestionOptions,
  getCurrentUserId,
  saveResponse,
  getOrCreateSurveyAttempt,
  completeSurveyAttempt,
  loadAttemptResponses,
  supabase,
  type DbQuestion,
  type DbQuestionOption,
} from "@/lib/supabase";

type UiQuestion = { id: number; text: string; dimension?: string };

const scaleOptions = [
  { value: "1", label: "Never" },
  { value: "2", label: "Rarely" },
  { value: "3", label: "Sometimes" },
  { value: "4", label: "Often" },
  { value: "5", label: "Always" },
];

const DEFAULT_SURVEY_ID = 1;

export default function DbQuestionnaire() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openModal } = useContactModal();
  const { toast } = useToast();

  const [dbQuestions, setDbQuestions] = useState<DbQuestion[]>([]);
  const [questions, setQuestions] = useState<UiQuestion[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [surveyId, setSurveyId] = useState<number>(DEFAULT_SURVEY_ID);
  const [questionOptions, setQuestionOptions] = useState<Record<number, DbQuestionOption[]>>({});
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [countedQuestionIds, setCountedQuestionIds] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [optionDisplayTexts, setOptionDisplayTexts] = useState<string[]>([]);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const progressedCount = countedQuestionIds.length;
  const rawProgress = (progressedCount / Math.max(1, questions.length)) * 100;
  const progress = Math.max(0, Math.min(100, rawProgress));
  const allAnswered = questions.length > 0 && Object.keys(responses).length === questions.length;

  // Dimension mapping (optional)
  const questionDimensionMap: Record<number, string> = {};
  const currentDimension = questionDimensionMap[questions[currentQuestion]?.id] || 'total';

  useEffect(() => {
    setOptionDisplayTexts(scaleOptions.map(o => o.label));
  }, [currentQuestion, responses]);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const uid = await getCurrentUserId();
        if (!uid) {
          navigate("/login", { replace: true, state: { from: "/questionnaire/db" } });
          return;
        }
        setUserId(uid);

        // Get survey ID from URL params or use default
        const surveyIdParam = searchParams.get('survey');
        const currentSurveyId = surveyIdParam ? parseInt(surveyIdParam, 10) : DEFAULT_SURVEY_ID;
        setSurveyId(currentSurveyId);

        // Get or create a survey attempt (reuses incomplete attempts)
        const currentAttemptId = await getOrCreateSurveyAttempt(currentSurveyId, uid);
        setAttemptId(currentAttemptId);

        const qs = await fetchSurveyQuestions(currentSurveyId);
        setDbQuestions(qs);
        const uiQuestions = qs.map(q => ({ id: q.question_id, text: q.question_text || "" }));
        setQuestions(uiQuestions);

        // Load options for multiple choice questions
        const optionsMap: Record<number, DbQuestionOption[]> = {};
        for (const q of qs) {
          if (q.question_type === 'multiple_choice') {
            const options = await fetchQuestionOptions(q.question_id);
            optionsMap[q.question_id] = options;
          }
        }
        setQuestionOptions(optionsMap);

        // Load existing responses for this attempt (if any)
        const existingResponses = await loadAttemptResponses(currentAttemptId);
        if (existingResponses.size > 0) {
          const loadedResponses: Record<number, string> = {};
          const answeredIds: number[] = [];
          
          existingResponses.forEach((value, questionId) => {
            loadedResponses[questionId] = value;
            answeredIds.push(questionId);
          });
          
          setResponses(loadedResponses);
          setCountedQuestionIds(answeredIds);
          
          // Find the first unanswered question to resume from
          const firstUnansweredIndex = uiQuestions.findIndex(
            q => !loadedResponses[q.id]
          );
          
          if (firstUnansweredIndex !== -1) {
            setCurrentQuestion(firstUnansweredIndex);
          } else {
            // All questions answered, show submit button
            setCurrentQuestion(uiQuestions.length - 1);
            setShowSubmitButton(true);
          }
        }
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Failed to load questionnaire",
          description: error?.message || String(error),
        });
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [navigate, toast, searchParams]);

  function handleResponse(value: string) {
    if (isAnimating) return;
    const qId = questions[currentQuestion]?.id;
    if (!qId) return;
    setResponses(prev => ({ ...prev, [qId]: value }));
  }

  async function handleNext() {
    if (isAnimating) return;

    const qId = questions[currentQuestion]?.id;
    if (qId !== undefined && responses[qId] !== undefined && !countedQuestionIds.includes(qId)) {
      setCountedQuestionIds(prev => [...prev, qId]);
    }

    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 976));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // On last question, show submit button
      setShowSubmitButton(true);
    }

    setIsAnimating(false);
  }

  async function handleSubmitSurvey() {
    if (!attemptId || !allAnswered) return;

    try {
      setIsAnimating(true);
      await completeSurveyAttempt(attemptId);
      
      toast({
        title: "Survey submitted!",
        description: "Thank you for completing the survey.",
      });

      const filtered = { ...responses } as Record<number, string>;
      delete (filtered as any)[24];
      navigate('/results', { state: { responses: filtered } });
    } catch (e: any) {
      console.error('Failed to submit survey:', e);
      toast({
        title: "Could not submit survey",
        description: e?.message || String(e),
      });
    } finally {
      setIsAnimating(false);
    }
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

  async function handleOptionClick(value: string, optionId?: number) {
    if (isAnimating) return;

    const q = questions[currentQuestion];
    if (!q || !attemptId) return;

    const currentDbQuestion = dbQuestions.find(dbQ => dbQ.question_id === q.id);
    if (!currentDbQuestion) return;

    setPendingSelection(value);
    await new Promise(resolve => setTimeout(resolve, 1));

    const updatedResponses = { ...responses, [q.id]: value };

    try {
      // Pass option_id for multiple choice questions
      if (currentDbQuestion.question_type === 'multiple_choice') {
        await saveResponse({ 
          question_id: q.id, 
          attempt_id: attemptId,
          response: value,
          option_id: optionId 
        });
      } else {
        await saveResponse({ 
          question_id: q.id, 
          attempt_id: attemptId,
          response: value 
        });
      }
    } catch (e: any) {
      console.error(e);
      toast({ title: "Could not save answer", description: e?.message || String(e) });
    }

    await new Promise(resolve => setTimeout(resolve, 1));
    setIsAnimating(true);
    await new Promise(resolve => setTimeout(resolve, 1));

    if (currentQuestion < questions.length - 1) {
      setResponses(updatedResponses);
      setCountedQuestionIds(prev => Array.from(new Set([...prev, q.id])));
      setPendingSelection(null);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResponses(updatedResponses);
      const allAnsweredIds = Object.keys(updatedResponses).map(Number);
      setCountedQuestionIds(prev => Array.from(new Set([...prev, ...allAnsweredIds])));
      setPendingSelection(null);
      
      // On last question, show submit button
      setShowSubmitButton(true);
    }

    setIsAnimating(false);
  }

  function renderAnswerArea() {
    const q = questions[currentQuestion];
    if (!q) return null;

    const currentDbQuestion = dbQuestions.find(dbQ => dbQ.question_id === q.id);
    if (!currentDbQuestion) return null;

    const questionType = currentDbQuestion.question_type;

    // Handle open-ended questions
    if (questionType === 'open_ended') {
      return (
        <div className="p-4 md:p-6">
          <textarea
            className="w-full min-h-[150px] p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Type your answer here..."
            value={responses[q.id] || ''}
            onChange={(e) => handleResponse(e.target.value)}
          />
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => {
              if (responses[q.id]) {
                handleOptionClick(responses[q.id]);
              }
            }}
            disabled={!responses[q.id] || isAnimating}
            className="mt-4 w-full md:w-auto px-8 py-3 rounded-lg bg-white text-primary font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Submit Answer
          </motion.button>
        </div>
      );
    }

    // Handle multiple choice questions
    if (questionType === 'multiple_choice') {
      const options = questionOptions[q.id] || [];
      
      return (
        <>
          {/* DESKTOP */}
          <div className="hidden md:grid gap-2 p-4">
            {options.map((opt, idx) => {
              const selected = responses[q.id] === opt.option_value || pendingSelection === opt.option_value;

              return (
                <motion.button
                  key={opt.option_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => handleOptionClick(opt.option_value, opt.option_id)}
                  aria-disabled={isAnimating}
                  aria-pressed={!!selected}
                  className="w-full px-6 py-4 rounded-lg border border-white/20 text-white font-semibold text-lg flex items-center justify-center cursor-pointer transition-all hover:bg-white hover:text-primary"
                  style={{
                    background: selected ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.03)',
                    opacity: isAnimating ? 0.6 : 1,
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    borderColor: selected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="text-center">{opt.option_text}</span>
                </motion.button>
              );
            })}
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden flex-col gap-3 p-4">
            {options.map((opt, idx) => {
              const selected = responses[q.id] === opt.option_value || pendingSelection === opt.option_value;

              return (
                <motion.button
                  key={opt.option_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  onClick={() => handleOptionClick(opt.option_value, opt.option_id)}
                  aria-disabled={isAnimating}
                  aria-pressed={!!selected}
                  className="w-full px-5 py-4 rounded-lg border border-white/20 text-white font-semibold text-base flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    background: selected ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.03)',
                    opacity: isAnimating ? 0.6 : 1,
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    borderColor: selected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'
                  }}
                >
                  <span className="text-center">{opt.option_text}</span>
                </motion.button>
              );
            })}
          </div>
        </>
      );
    }

    // Handle scale questions (default)
    return (
      <>
        {/* DESKTOP */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(' + scaleOptions.length + ', minmax(0, 1fr))' }}>
          {scaleOptions.map((opt, idx) => {
            const q = questions[currentQuestion];
            const selected = q && (responses[q.id] === opt.value || pendingSelection === opt.value);

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
                  aria-pressed={!!selected}
                  className="qa-option w-full h-[76px] border-none text-white font-semibold text-2xl flex items-center justify-center cursor-pointer transition-all"
                  style={{
                    padding: '20px 12px',
                    background: selected ? 'rgba(255,255,255,0.12)' : 'transparent',
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

        {/* MOBILE */}
        <div className="flex md:hidden flex-col gap-3 p-4">
          {scaleOptions.map((opt, idx) => {
            const q = questions[currentQuestion];
            const selected = q && (responses[q.id] === opt.value || pendingSelection === opt.value);

            return (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.05, delay: idx * 0.1 }}
                onClick={() => handleOptionClick(opt.value)}
                aria-disabled={isAnimating}
                aria-pressed={!!selected}
                className="qa-option-mobile w-full px-5 py-4 rounded-lg border border白/20 text-white font-semibold text-base flex items-center justify-center cursor-pointer transition-all"
                style={{
                  background: selected ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.03)',
                  opacity: isAnimating ? 0.6 : 1,
                  cursor: isAnimating ? 'not-allowed' : 'pointer',
                  borderColor: selected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, var(--primary), var(--primary-light))' }}>
        <div className="text-white text-lg">Loading questionnaire…</div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, var(--primary), var(--primary-light))' }}>
        <div className="text-white text-lg">Redirecting to login…</div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, var(--primary), var(--primary-light))' }}>
        <div className="text-white text-lg">No questions found for this survey.</div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(180deg, var(--primary), var(--primary-light))', overflow: 'hidden' }}>
      {/* Background tint layers */}
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
        @media (max-width: 767px) {
          .qa-option-mobile:active {
            transform: scale(0.97);
          }
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-164 py-8 sm:py-64" style={{ paddingBottom: 'clamp(200px, 25vh, 320px)', position: 'relative', zIndex: 2 }}>
        <Header />

        <div className="flex justify-center">
          <div className="w-full max-w-[1020px] mt-[25px] mb-8 sm:mb-16 lg:mb-[120px] relative">
            <AnimatePresence mode="wait">
              <div key={currentQuestion} className="relative">
                {/* Borders */}
                <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0, originX: 1 }} transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }} className="absolute top-0 left-3 right-3 h-px bg-white z-[2]" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }} className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white rounded-tl-xl z-[2]" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }} className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white rounded-tr-xl z-[2]" />
                <motion.div initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0, originY: 1 }} transition={{ duration: 0.46875, delay: 0.9375, ease: "easeOut" }} className="absolute top-3 right-0 bottom-3 w-px bg-white z-[2]" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.3125, delay: 0.9375, ease: "easeOut" }} className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white rounded-br-xl z-[2]" />
                <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0, originX: 0 }} transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }} className="absolute bottom-0 left-3 right-3 h-px bg-white z-[2]" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.3125, delay: 0.46875, ease: "easeOut" }} className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white rounded-bl-xl z-[2]" />
                <motion.div initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0, originY: 1 }} transition={{ duration: 0.46875, delay: 0, ease: "easeOut" }} className="absolute top-3 left-0 bottom-3 w-px bg-white z-[2]" />

                {/* Card */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3125 }} className="rounded-xl overflow-hidden relative">
                  <div className="relative">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.375 }} className="px-4 py-5 sm:px-6 sm:py-6 lg:px-5 lg:py-[22px] bg-transparent text-white font-bold text-center relative">
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 0.95, y: 0 }} transition={{ duration: 0.3125, delay: 0.078125 }} className="text-base sm:text-lg lg:text-xl font-normal opacity-95 mb-2">
                        Question {currentQuestion + 1} of {questions.length}
                      </motion.div>
                      <div className="text-lg sm:text-xl lg:text-[26px] max-w-[90%] sm:max-w-[80%] mx-auto min-h-[30px] sm:min-h-[35px]">
                        {questions[currentQuestion]?.text}
                      </div>
                    </motion.div>
                    <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0, originX: 1 }} transition={{ duration: 0.46875, delay: 0.46875, ease: "easeOut" }} className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                  </div>

                  {renderAnswerArea()}
                </motion.div>
              </div>
            </AnimatePresence>

            {/* Submit Button - shown when all questions are answered */}
            {showSubmitButton && allAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmitSurvey}
                  disabled={isAnimating}
                  className="px-12 py-4 rounded-xl bg-white text-primary font-bold text-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Survey
                </motion.button>
              </motion.div>
            )}

            {/* Controls */}
            <div className="w-full flex items-center justify-between mt-2 px-0 md:px-0 mb-24 md:mb-0 z-[61]" style={{ maxWidth: '1020px' }}>
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
                <span className="sm:hidden">
                  <ChevronLeft className="w-8 h-8" />
                </span>
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

              {/* Further info */}
              <AlertDialog open={alertOpen} onOpenChange={(v) => setAlertOpen(v)}>
                <AlertDialogTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                    whileHover={{ scale: 1.12 }}
                    disabled={isAnimating}
                    onClick={() => setAlertOpen(true)}
                    className="bg-transparent text白 border-none px-2 py-6 sm:px-2.5 sm:py-2 font-bold text-xs sm:text-sm lg:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Further information"
                  >
                    <span className="hidden sm:inline">Further Info</span>
                    <span className="sm:hidden text-sm">Info</span>
                  </motion.button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Anonymous & Private</AlertDialogTitle>
                    <AlertDialogDescription className="font-normal">
                      The questionnaire is fully anonymous and will not be linked to any personal
                      information such as your name or email. Your answers are used only for
                      aggregated insights.
                      <br />
                      If you have questions, feedback, or need support, message us at:{' '}
                      <button
                        className="text-accent underline font-medium bg-transparent border-none p-0 m-0 cursor-pointer"
                        onClick={() => {
                          setAlertOpen(false);
                          setTimeout(() => openModal('info@bemaia.nl'), 220);
                        }}
                      >
                        info@bemaia.nl
                      </button>
                      <br />
                      <button
                        className="text-accent underline font-medium bg-transparent border-none p-0 m-0 cursor-pointe"
                        onClick={() => {
                          setAlertOpen(false);
                          setTimeout(() => setCreditOpen(true), 220);
                        }}
                      >
                        About the Questionnaire
                      </button>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAlertOpen(false)}>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Credit dialog */}
              <AlertDialog open={creditOpen} onOpenChange={(v) => setCreditOpen(v)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Questionaire</AlertDialogTitle>
                    <AlertDialogDescription className="font-normal">
                      The BAT-12 (Burnout Assessment Tool) is used under the Creative Commons Attribution 4.0 International License (CC BY 4.0), developed by Wilmar Schaufeli and collaborators. For more information, see Schaufeli et al.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setCreditOpen(false)}>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

