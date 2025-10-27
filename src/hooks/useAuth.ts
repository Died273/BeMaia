import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface SignupData {
  firstName: string;
  email: string;
  password: string;
  company: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: any;
  error: any;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signUp = async (userData: SignupData): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.firstName,
            company_id: Number(1), // TODO: Map company string to actual ID
            role: userData.role,
          }
        }
      });

      return { data, error };
    } catch (error) {
      console.error('Signup error:', error);
      return { data: null, error: { message: 'An unexpected error occurred. Please try again.' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (loginData: LoginData): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      return { data, error };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error: { message: 'An unexpected error occurred. Please try again.' } };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      return { data: null, error };
    } catch (error) {
      console.error('Signout error:', error);
      return { data: null, error: { message: 'An unexpected error occurred during signout.' } };
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  };

  const getSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    getSession,
    isLoading,
  };
};
