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

      // Fetch all surveys
      const { data: allSurveys, error: surveysError } = await supabase
        .from('survey')
        .select('survey_id, survey_name, created_at')
        .order('survey_name');

      if (surveysError) {
        console.error('Error fetching surveys:', surveysError);
        return;
      }

      if (!allSurveys || allSurveys.length === 0) {
        setAvailableSurveys([]);
        return;
      }

      // Fetch user's survey attempts
      const { data: userAttempts, error: attemptsError } = await supabase
        .from('survey_attempt')
        .select('attempt_id, survey_id, completed_at')
        .eq('user_id', userId);

      if (attemptsError) {
        console.error('Error fetching user attempts:', attemptsError);
        return;
      }

      // Get completed survey IDs (surveys with completed_at set)
      const completedSurveyIds = new Set(
        userAttempts?.filter(a => a.completed_at).map(a => a.survey_id) || []
      );

      // Get in-progress attempts (started but not completed)
      const inProgressAttempts = userAttempts?.filter(a => !a.completed_at) || [];

      // Get all questions for each survey to determine completion
      const surveyCompletion = new Map<number, { total: number; answered: number }>();

      for (const survey of allSurveys) {
        const { data: questions, error: questionsError } = await supabase
          .from('question')
          .select('question_id')
          .eq('survey_id', survey.survey_id);

        if (!questionsError && questions) {
          const totalQuestions = questions.length;
          
          // Find in-progress attempt for this survey
          const inProgressAttempt = inProgressAttempts.find(
            a => a.survey_id === survey.survey_id
          );

          let answeredQuestions = 0;
          if (inProgressAttempt) {
            // Count responses for this attempt
            const { data: responses, error: responsesError } = await supabase
              .from('response')
              .select('question_id')
              .eq('attempt_id', inProgressAttempt.attempt_id);

            if (!responsesError && responses) {
              answeredQuestions = responses.length;
            }
          }

          surveyCompletion.set(survey.survey_id, {
            total: totalQuestions,
            answered: answeredQuestions,
          });
        }
      }

      // Map surveys with progress information
      // Show all surveys - users can complete them multiple times
      const surveysWithProgress = allSurveys.map((survey) => {
        const completion = surveyCompletion.get(survey.survey_id);
        if (!completion) {
          return { ...survey, progress: 0, is_started: false };
        }
        
        const progress = completion.total > 0 
          ? Math.round((completion.answered / completion.total) * 100) 
          : 0;
        
        return {
          ...survey,
          progress,
          is_started: completion.answered > 0,
        };
      });

      setAvailableSurveys(surveysWithProgress);
    } catch (error) {
      console.error('Error in fetchAvailableSurveys:', error);
    } finally {
      setLoading(false);
    }
  };

  return { availableSurveys, loading, refetch: fetchAvailableSurveys };
};
