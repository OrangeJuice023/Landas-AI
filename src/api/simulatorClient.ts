import { supabase } from "../lib/supabase";

export interface ProjectedRole {
  title: string;
  unlock_score: number;
  why: string;
  salary_now: string;
  salary_projected: string;
  timeline: string;
  key_employers: string[];
}

export interface SimulationResult {
  current_role: string;
  added_skills: string[];
  summary: string;
  projected_roles: ProjectedRole[];
}

export async function simulateCareer(currentRole: string, skills: string[]): Promise<SimulationResult> {
  const { data, error } = await supabase.functions.invoke("ai-proxy", {
    body: { mode: "simulate", currentRole, skills },
  });

  if (error) {
    let message = "Simulation failed. Please try again.";
    try {
      const errBody = await error.context?.json();
      if (errBody?.error) message = errBody.error;
    } catch { /* keep default */ }
    throw new Error(message);
  }

  if (data?.error) throw new Error(data.error);
  return data.data as SimulationResult;
}
