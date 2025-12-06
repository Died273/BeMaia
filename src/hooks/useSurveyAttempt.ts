import { useState, useEffect } from 'react';
import {
  fetchSurveyQuestions,
  fetchQuestionOptions,
  fetchSurveyLogic,
  getOrCreateSurveyAttempt,
  loadAttemptResponses,
  saveResponse,
  completeSurveyAttempt,
  determineNextQuestion,
  supabase,
  type DbQuestion,
  type DbQuestionOption,
  type DbSurveyLogic,
} from '@/lib/supabase';

export interface SurveyAttemptState {
  attemptId: number | null;
  surveyId: number;
  questions: DbQuestion[];
  surveyLogic: DbSurveyLogic[];
  questionOptions: Record<number, DbQuestionOption[]>;
  responses: Map<number, string>;
  visitedQuestions: number[]; // Track which questions were actually shown
  loading: boolean;
  error: string | null;
  currentQuestionId: number | null; // Changed from index to ID
  showSubmitButton: boolean;
}

export interface SurveyAttemptActions {
  saveAnswerAndNavigate: (questionId: number, value: string, optionId?: number) => Promise<void>;
  submitSurvey: () => Promise<void>;
  goToPreviousQuestion: () => void;
  setShowSubmitButton: (show: boolean) => void;
}

interface UseSurveyAttemptResult {
  state: SurveyAttemptState;
  actions: SurveyAttemptActions;
}

export function useSurveyAttempt(
  surveyId: number,
  userId: string | null
): UseSurveyAttemptResult {
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<DbQuestion[]>([]);
  const [surveyLogic, setSurveyLogic] = useState<DbSurveyLogic[]>([]);
  const [questionOptions, setQuestionOptions] = useState<Record<number, DbQuestionOption[]>>({});
  const [responses, setResponses] = useState<Map<number, string>>(new Map());
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  // Initialize survey attempt
  useEffect(() => {
    if (!userId || !surveyId) {
      setLoading(false);
      return;
    }

    const initialize = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get or create attempt
        const currentAttemptId = await getOrCreateSurveyAttempt(surveyId, userId);
        setAttemptId(currentAttemptId);

        // Load questions and logic
        const qs = await fetchSurveyQuestions(surveyId);
        setQuestions(qs);

        const logic = await fetchSurveyLogic(surveyId);
        setSurveyLogic(logic);

        // Load options for multiple choice questions
        const optionsMap: Record<number, DbQuestionOption[]> = {};
        for (const q of qs) {
          if (q.question_type === 'multiple_choice') {
            const options = await fetchQuestionOptions(q.question_id);
            optionsMap[q.question_id] = options;
          }
        }
        setQuestionOptions(optionsMap);

        // Load existing responses
        const existingResponses = await loadAttemptResponses(currentAttemptId);
        setResponses(existingResponses);

        // Determine starting question
        if (qs.length > 0) {
          let startQuestionId = qs[0].question_id;
          const visited: number[] = [];

          // If there are existing responses, try to resume from where user left off
          if (existingResponses.size > 0) {
            // Build the path of answered questions by following the logic
            let currentId = qs[0].question_id;
            visited.push(currentId);

            while (currentId) {
              const answer = existingResponses.get(currentId);
              if (!answer) {
                // Found first unanswered question - start here
                startQuestionId = currentId;
                break;
              }
              
              // For multiple choice, we need to convert option_value back to option_id for logic
              const currentQuestion = qs.find(q => q.question_id === currentId);
              let valueForLogic = answer;
              
              if (currentQuestion?.question_type === 'multiple_choice' && optionsMap[currentId]) {
                const selectedOption = optionsMap[currentId].find(opt => opt.option_value === answer);
                if (selectedOption) {
                  valueForLogic = String(selectedOption.option_id);
                }
              }
              
              // Get next question based on answer and logic
              const nextId = await determineNextQuestion(currentId, valueForLogic, logic, qs);
              
              if (nextId) {
                visited.push(nextId);
                currentId = nextId;
              } else {
                // Reached the end - user completed survey or ready to submit
                startQuestionId = currentId;
                setShowSubmitButton(true);
                break;
              }
            }
          } else {
            // No existing responses - start from beginning
            visited.push(startQuestionId);
          }

          setCurrentQuestionId(startQuestionId);
          setVisitedQuestions(visited);
        }
      } catch (err: any) {
        console.error('Failed to initialize survey attempt:', err);
        setError(err?.message || 'Failed to load survey');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [surveyId, userId]);

  // Save answer and determine next question
  const saveAnswerAndNavigate = async (questionId: number, value: string, optionId?: number) => {
    if (!attemptId) {
      throw new Error('No active survey attempt');
    }

    // Check if there are any responses in the DATABASE for questions that come after this one
    // We must query the database directly, not rely on local state, because:
    // 1. User might have gone back using Previous button
    // 2. Responses might be orphaned from a previous branch
    const currentQuestionIndex = questions.findIndex(q => q.question_id === questionId);
    const questionsAfterCurrent = questions
      .slice(currentQuestionIndex + 1)
      .map(q => q.question_id);
    
    // Query database for any existing responses for these questions
    if (questionsAfterCurrent.length > 0) {
      const { data: existingResponses } = await supabase
        .from('response')
        .select('question_id')
        .eq('attempt_id', attemptId)
        .in('question_id', questionsAfterCurrent);
      
      const questionsToInvalidate = existingResponses?.map(r => r.question_id) || [];
      
      if (questionsToInvalidate.length > 0) {
        // Delete responses for those specific questions from the database
        const { error: deleteError } = await supabase
          .from('response')
          .delete()
          .eq('attempt_id', attemptId)
          .in('question_id', questionsToInvalidate);
        
        if (deleteError) {
          console.error('Error deleting subsequent responses:', deleteError);
          throw deleteError;
        }
        
        // Update local state - remove responses for invalidated questions
        const newResponses = new Map(responses);
        questionsToInvalidate.forEach(qId => newResponses.delete(qId));
        setResponses(newResponses);
        
        // Remove invalidated questions from visited list
        setVisitedQuestions(prev => prev.filter(qId => !questionsToInvalidate.includes(qId)));
      }
    }

    // Save the response
    await saveResponse({
      question_id: questionId,
      attempt_id: attemptId,
      response: value,
      option_id: optionId,
    });

    // Update local state
    setResponses(prev => new Map(prev).set(questionId, value));

    // For logic evaluation, use option_id for multiple choice, value for others
    const valueForLogic = optionId !== undefined ? String(optionId) : value;

    // Determine next question using logic
    const nextQuestionId = await determineNextQuestion(
      questionId,
      valueForLogic,
      surveyLogic,
      questions
    );

    if (nextQuestionId) {
      // Navigate to next question
      setCurrentQuestionId(nextQuestionId);
      
      // Only add to visited if it's not already there
      if (!visitedQuestions.includes(nextQuestionId)) {
        setVisitedQuestions(prev => [...prev, nextQuestionId]);
      }
    } else {
      // No next question - show submit button
      setShowSubmitButton(true);
    }
  };

  // Go back to previous question
  const goToPreviousQuestion = () => {
    if (visitedQuestions.length > 1) {
      const newVisited = [...visitedQuestions];
      newVisited.pop(); // Remove current
      const previousId = newVisited[newVisited.length - 1];
      
      setVisitedQuestions(newVisited);
      setCurrentQuestionId(previousId);
      setShowSubmitButton(false);
    }
  };

  // Submit survey
  const submitSurvey = async () => {
    if (!attemptId) {
      throw new Error('No active survey attempt');
    }

    await completeSurveyAttempt(attemptId);
  };

  return {
    state: {
      attemptId,
      surveyId,
      questions,
      surveyLogic,
      questionOptions,
      responses,
      visitedQuestions,
      loading,
      error,
      currentQuestionId,
      showSubmitButton,
    },
    actions: {
      saveAnswerAndNavigate,
      submitSurvey,
      goToPreviousQuestion,
      setShowSubmitButton,
    },
  };
}
