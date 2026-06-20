import { useState } from "react";
import { Radar, ExternalLink, MapPin, Building2 } from "lucide-react";
import { fetchLiveJobs, type LiveJob } from "../api/jobsClient";

export function LiveJobs({ roleTitle }: { roleTitle: string }) {
  const [jobs, setJobs] = useState<LiveJob[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLiveJobs(roleTitle);
      setJobs(result);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Couldn't load live jobs.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (jobs === null) {
    return (
      <div className="mt-6">
        <button
          onClick={load}
          disabled={loading}
          className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:border-blue-300 hover:text-blue-600 transition-all disabled:opacity-60"
        >
          <Radar size={16} />
          <span>{loading ? "Scanning the PH job market..." : "View live PH openings"}</span>
        </button>
        {error ? <p className="mt-2 text-xs text-amber-600 text-center font-medium">{error}</p> : null}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="mt-6 text-xs text-gray-400 text-center font-medium">
        No live PH listings found for this role right now.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
        <Radar size={14} className="text-blue-500" />
        <span>Live PH Openings</span>
      </h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {jobs.map((job, i) => (
          <div
            key={i}
            onClick={() => openLink(job.apply_link)}
            className="group p-4 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold leading-snug line-clamp-2">{job.title}</span>
              <ExternalLink size={14} className="shrink-0 text-gray-300 group-hover:text-blue-500 transition-colors mt-0.5" />
            </div>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Building2 size={12} />
              <span>{job.company}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400">
              <MapPin size={12} />
              <span>{job.location}</span>
            </span>
            <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
              {job.salary ? <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-md">{job.salary}</span> : null}
              {job.employment_type ? <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-md uppercase">{job.employment_type}</span> : null}
              {job.posted_at ? <span className="text-[10px] text-gray-300 font-medium">{new Date(job.posted_at).toLocaleDateString()}</span> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
