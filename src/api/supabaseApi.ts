import { supabase } from '../lib/supabase';
import type { CareerRecommendation } from '../types/career';

export interface SavedPath {
  id: string;
  created_at: string;
  input_query: string;
  data: CareerRecommendation;
}

export async function savePath(inputQuery: string, data: CareerRecommendation) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No active session');

    const { data: savedData, error } = await supabase
      .from('saved_paths')
      .insert([{ input_query: inputQuery, data, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return savedData;
  } catch (error) {
    console.error('Error saving path to Supabase:', error);
    return null;
  }
}

export async function getSavedPaths(): Promise<SavedPath[]> {
  try {
    // RLS automatically returns only the current user's rows
    const { data, error } = await supabase
      .from('saved_paths')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching paths from Supabase:', error);
    return [];
  }
}
