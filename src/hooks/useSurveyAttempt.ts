import { useState, useEffect } from 'react';
import {
  fetchSurveyQuestions,
  fetchQuestionOptions,
  getOrCreateSurveyAttempt,
  loadAttemptResponses,
  saveResponse,
  completeSurveyAttempt,
  type DbQuestion,
  type DbQuestionOption,
} from '@/lib/supabase';

export interface SurveyAttemptState {
  attemptId: number | null;
  surveyId: number;
  questions: DbQuestion[];
  questionOptions: Record<number, DbQuestionOption[]>;
  responses: Map<number, string>;
  loading: boolean;
  error: string | null;
  currentQuestionIndex: number;
  showSubmitButton: boolean;
}

export interface SurveyAttemptActions {
  saveAnswer: (questionId: number, value: string, optionId?: number) => Promise<void>;
  submitSurvey: () => Promise<void>;
  setCurrentQuestionIndex: (index: number) => void;
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
  const [questionOptions, setQuestionOptions] = useState<Record<number, DbQuestionOption[]>>({});
  const [responses, setResponses] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

        // Load questions
        const qs = await fetchSurveyQuestions(surveyId);
        setQuestions(qs);

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
        if (existingResponses.size > 0) {
          const firstUnansweredIndex = qs.findIndex(
            q => !existingResponses.has(q.question_id)
          );

          if (firstUnansweredIndex !== -1) {
            setCurrentQuestionIndex(firstUnansweredIndex);
          } else {
            // All answered, show submit button
            setCurrentQuestionIndex(qs.length - 1);
            setShowSubmitButton(true);
          }
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

  // Save answer
  const saveAnswer = async (questionId: number, value: string, optionId?: number) => {
    if (!attemptId) {
      throw new Error('No active survey attempt');
    }

    await saveResponse({
      question_id: questionId,
      attempt_id: attemptId,
      response: value,
      option_id: optionId,
    });

    // Update local state
    setResponses(prev => new Map(prev).set(questionId, value));
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
      questionOptions,
      responses,
      loading,
      error,
      currentQuestionIndex,
      showSubmitButton,
    },
    actions: {
      saveAnswer,
      submitSurvey,
      setCurrentQuestionIndex,
      setShowSubmitButton,
    },
  };
}
