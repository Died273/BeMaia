import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Survey {
  survey_id: number;
  survey_name: string;
  created_at: string;
  progress?: number; // percentage of completion
  is_started?: boolean; // whether user has started this survey
}

export const useSurveys = (userId: string | null) => {
  const [availableSurveys, setAvailableSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setAvailableSurveys([]);
      setLoading(false);
      return;
    }

    fetchAvailableSurveys();
  }, [userId]);

  const fetchAvailableSurveys = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      // Fetch allowed surveys using RPC function
      const { data: allowedSurveys, error: surveysError } = await supabase
        .rpc('get_allowed_surveys');

      if (surveysError) {
        console.error('Error fetching surveys:', surveysError);
        return;
      }

      if (!allowedSurveys || allowedSurveys.length === 0) {
        setAvailableSurveys([]);
        return;
      }

      // Fetch user's in-progress attempts for these surveys
      const surveyIds = allowedSurveys.map(s => s.survey_id);
      const { data: userAttempts, error: attemptsError } = await supabase
        .from('survey_attempt')
        .select('attempt_id, survey_id')
        .eq('user_id', userId)
        .in('survey_id', surveyIds)
        .is('completed_at', null); // Only in-progress attempts

      if (attemptsError) {
        console.error('Error fetching user attempts:', attemptsError);
        return;
      }

      // Calculate progress for each survey
      const surveysWithProgress = await Promise.all(
        allowedSurveys.map(async (survey) => {
          const inProgressAttempt = userAttempts?.find(
            a => a.survey_id === survey.survey_id
          );

          if (!inProgressAttempt) {
            return { ...survey, progress: 0, is_started: false };
          }

          // Get total questions
          const { data: questions } = await supabase
            .from('question')
            .select('question_id')
            .eq('survey_id', survey.survey_id);

          // Get answered questions
          const { data: responses } = await supabase
            .from('response')
            .select('question_id')
            .eq('attempt_id', inProgressAttempt.attempt_id);

          const totalQuestions = questions?.length || 0;
          const answeredQuestions = responses?.length || 0;
          const progress = totalQuestions > 0 
            ? Math.round((answeredQuestions / totalQuestions) * 100) 
            : 0;

          return {
            ...survey,
            progress,
            is_started: answeredQuestions > 0,
          };
        })
      );

      setAvailableSurveys(surveysWithProgress);
    } catch (error) {
      console.error('Error in fetchAvailableSurveys:', error);
    } finally {
      setLoading(false);
    }
  };

  return { availableSurveys, loading, refetch: fetchAvailableSurveys };
};
