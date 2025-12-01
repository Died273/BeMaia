import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Data access helpers for questionnaire/survey domain
export type DbSurvey = {
  survey_id: number;
  question_text?: string; // optional if using separate question table
};

export type DbQuestion = {
  question_id: number;
  survey_id: number;
  question_text: string;
  question_type: string; // 'scale', 'multiple_choice', 'open_ended'
  created_at?: string;
};

export type DbQuestionOption = {
  option_id: number;
  question_id: number;
  option_text: string;
  option_value: string;
  sort_order?: number;
};

export type DbResponseInsert = {
  question_id: number;
  attempt_id: number; // link to survey attempt
  response: string | number; // store as text
  option_id?: number; // for multiple choice responses
};

export type DbSurveyAttempt = {
  attempt_id: number;
  survey_id: number;
  user_id: string | null;
  started_at: string;
  completed_at: string | null;
};

export async function fetchSurveyQuestions(surveyId: number) {
  const { data, error } = await supabase
    .from('question')
    .select('*')
    .eq('survey_id', surveyId)
    .order('question_id', { ascending: true });

  if (error) throw error;
  return (data || []) as DbQuestion[];
}

export async function fetchQuestionOptions(questionId: number) {
  const { data, error } = await supabase
    .from('question_option')
    .select('*')
    .eq('question_id', questionId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data || []) as DbQuestionOption[];
}

export async function createSurveyAttempt(surveyId: number, userId: string | null) {
  const { data, error } = await supabase
    .from('survey_attempt')
    .insert({
      survey_id: surveyId,
      user_id: userId,
      started_at: new Date().toISOString(),
    })
    .select('attempt_id')
    .single();

  if (error) throw error;
  if (!data) throw new Error('Failed to create survey attempt');
  
  return data.attempt_id;
}

export async function getOrCreateSurveyAttempt(surveyId: number, userId: string | null): Promise<number> {
  // First, check if there's an incomplete attempt for this user and survey
  const { data: existingAttempt, error: fetchError } = await supabase
    .from('survey_attempt')
    .select('attempt_id')
    .eq('survey_id', surveyId)
    .eq('user_id', userId)
    .is('completed_at', null)
    .order('started_at', { ascending: false })
    .limit(1)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
    throw fetchError;
  }

  // If an incomplete attempt exists, return it
  if (existingAttempt) {
    return existingAttempt.attempt_id;
  }

  // Otherwise, create a new attempt
  return await createSurveyAttempt(surveyId, userId);
}

export async function completeSurveyAttempt(attemptId: number) {
  const { error } = await supabase
    .from('survey_attempt')
    .update({
      completed_at: new Date().toISOString(),
    })
    .eq('attempt_id', attemptId);

  if (error) throw error;
}

export async function saveResponse(payload: DbResponseInsert) {
  if (!payload.attempt_id) {
    throw new Error('attempt_id is required');
  }

  // Get the question to determine its type
  const { data: question, error: questionError } = await supabase
    .from('question')
    .select('question_type')
    .eq('question_id', payload.question_id)
    .single();

  if (questionError) throw questionError;
  if (!question) throw new Error('Question not found');

  // Prepare the response data based on question type
  const responseData: any = {
    question_id: payload.question_id,
    attempt_id: payload.attempt_id,
    value_text: null,
    value_int: null,
    value_option_id: null,
  };

  // Set the appropriate value field based on question type
  if (question.question_type === 'multiple_choice') {
    responseData.value_option_id = payload.option_id;
  } else if (question.question_type === 'scale') {
    responseData.value_int = Number(payload.response);
  } else if (question.question_type === 'open_ended') {
    responseData.value_text = String(payload.response);
  } else {
    throw new Error(`Unknown question type: ${question.question_type}`);
  }

  // Use upsert to handle both insert and update
  // The unique constraint on (question_id, attempt_id) will handle conflicts
  const { error } = await supabase
    .from('response')
    .upsert(responseData, {
      onConflict: 'question_id,attempt_id'
    });

  if (error) throw error;
}

export async function loadAttemptResponses(attemptId: number): Promise<Map<number, string>> {
  const responses = new Map<number, string>();

  // Get all responses for this attempt with question info
  const { data: responseData, error: responseError } = await supabase
    .from('response')
    .select('question_id, value_text, value_int, value_option_id, question(question_type)')
    .eq('attempt_id', attemptId);

  if (responseError) throw responseError;
  if (!responseData || responseData.length === 0) return responses;

  // For each response, extract the appropriate value based on question type
  for (const resp of responseData) {
    const questionId = resp.question_id;
    const questionType = (resp.question as any)?.question_type;

    if (!questionType) continue;

    let value: string | null = null;

    if (questionType === 'multiple_choice' && resp.value_option_id) {
      // Get the option value for multiple choice
      const { data: optionData } = await supabase
        .from('question_option')
        .select('option_value')
        .eq('option_id', resp.value_option_id)
        .single();

      if (optionData) {
        value = optionData.option_value;
      }
    } else if (questionType === 'scale' && resp.value_int !== null) {
      value = String(resp.value_int);
    } else if (questionType === 'open_ended' && resp.value_text) {
      value = resp.value_text;
    }

    if (value !== null) {
      responses.set(questionId, value);
    }
  }

  return responses;
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

