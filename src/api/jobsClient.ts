import { supabase } from "../lib/supabase";

export interface LiveJob {
  title: string;
  company: string;
  location: string;
  salary: string | null;
  employment_type: string | null;
  apply_link: string;
  posted_at: string | null;
}

export async function fetchLiveJobs(role: string): Promise<LiveJob[]> {
  const { data, error } = await supabase.functions.invoke("jobs-proxy", {
    body: { role },
  });

  if (error) {
    let message = "Couldn't load live jobs.";
    try {
      const errBody = await error.context?.json();
      if (errBody?.error) message = errBody.error;
    } catch { /* keep default */ }
    throw new Error(message);
  }

  if (data?.error) throw new Error(data.error);
  return (data?.jobs ?? []) as LiveJob[];
}
