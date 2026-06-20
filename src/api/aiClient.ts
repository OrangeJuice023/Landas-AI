import { supabase } from "../lib/supabase";
import type { CareerRecommendation } from "../types/career";

export interface DetailedSearchParams {
  industry?: string;
  department?: string;
  jobRole?: string;
  salaryRange?: string;
  skillsRequired?: string;
  careerGrowth?: string;
}

export async function fetchCareerAdvice(
  userInput: string,
  detailedParams?: DetailedSearchParams,
): Promise<CareerRecommendation> {
  const { data, error } = await supabase.functions.invoke("ai-proxy", {
    body: { userInput, detailedParams },
  });

  if (error) {
    let message = "AI request failed. Please try again.";
    try {
      const errBody = await error.context?.json();
      if (errBody?.error) message = errBody.error;
    } catch { /* keep default */ }
    throw new Error(message);
  }

  if (data?.error) throw new Error(data.error);
  return data.data as CareerRecommendation;
}
