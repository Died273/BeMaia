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
  question_type: string; // e.g., 'scale', 'text'
  created_at?: string;
};

export type DbResponseInsert = {
  question_id: number;
  user_id: string | null; // allow null for unauthenticated
  response: string; // store as text; use JSON for complex
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

export async function saveResponse(payload: DbResponseInsert) {
  const { error } = await supabase
    .from('response')
    .insert({
      question_id: payload.question_id,
      user_id: payload.user_id,
      response: payload.response,
    });

  if (error) throw error;
}

export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

