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

  // First, get the question to determine its type
  const { data: question, error: questionError } = await supabase
    .from('question')
    .select('question_type')
    .eq('question_id', payload.question_id)
    .single();

  if (questionError) throw questionError;
  if (!question) throw new Error('Question not found');

  // Check if a response already exists for this question and attempt
  const { data: existingResponse, error: existingError } = await supabase
    .from('response')
    .select('response_id')
    .eq('question_id', payload.question_id)
    .eq('attempt_id', payload.attempt_id)
    .single();

  let responseId: number;

  if (existingResponse) {
    // Response exists, we'll update it
    responseId = existingResponse.response_id;
  } else {
    // No existing response, create a new one
    const { data: responseData, error: responseError } = await supabase
      .from('response')
      .insert({
        question_id: payload.question_id,
        attempt_id: payload.attempt_id,
      })
      .select('response_id')
      .single();

    if (responseError) throw responseError;
    if (!responseData) throw new Error('Failed to create response');
    responseId = responseData.response_id;
  }

  // Update or insert into the appropriate type-specific table based on question_type
  if (question.question_type === 'multiple_choice') {
    // Use upsert to handle insert or update
    const { error: mcError } = await supabase
      .from('response_multiple_choice')
      .upsert({
        response_id: responseId,
        option_id: payload.option_id,
      }, {
        onConflict: 'response_id'
      });

    if (mcError) throw mcError;
  } else if (question.question_type === 'scale') {
    // Use upsert to handle insert or update
    const { error: scaleError } = await supabase
      .from('response_scale')
      .upsert({
        response_id: responseId,
        scale_value: Number(payload.response),
      }, {
        onConflict: 'response_id'
      });

    if (scaleError) throw scaleError;
  } else if (question.question_type === 'open_ended') {
    // Use upsert to handle insert or update
    const { error: openError } = await supabase
      .from('response_open_ended')
      .upsert({
        response_id: responseId,
        text_value: String(payload.response),
      }, {
        onConflict: 'response_id'
      });

    if (openError) throw openError;
  } else {
    throw new Error(`Unknown question type: ${question.question_type}`);
  }
}

export async function loadAttemptResponses(attemptId: number): Promise<Map<number, string>> {
  const responses = new Map<number, string>();

  // Get all responses for this attempt
  const { data: responseData, error: responseError } = await supabase
    .from('response')
    .select('response_id, question_id')
    .eq('attempt_id', attemptId);

  if (responseError) throw responseError;
  if (!responseData || responseData.length === 0) return responses;

  // For each response, get the actual answer from the type-specific tables
  for (const resp of responseData) {
    const questionId = resp.question_id;
    const responseId = resp.response_id;

    // Get question type
    const { data: question } = await supabase
      .from('question')
      .select('question_type')
      .eq('question_id', questionId)
      .single();

    if (!question) continue;

    // Get the actual response value based on type
    if (question.question_type === 'multiple_choice') {
      const { data: mcData } = await supabase
        .from('response_multiple_choice')
        .select('option_id, question_option(option_value)')
        .eq('response_id', responseId)
        .single();

      if (mcData && mcData.question_option) {
        responses.set(questionId, (mcData.question_option as any).option_value);
      }
    } else if (question.question_type === 'scale') {
      const { data: scaleData } = await supabase
        .from('response_scale')
        .select('scale_value')
        .eq('response_id', responseId)
        .single();

      if (scaleData) {
        responses.set(questionId, String(scaleData.scale_value));
      }
    } else if (question.question_type === 'open_ended') {
      const { data: openData } = await supabase
        .from('response_open_ended')
        .select('text_value')
        .eq('response_id', responseId)
        .single();

      if (openData) {
        responses.set(questionId, openData.text_value);
      }
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

