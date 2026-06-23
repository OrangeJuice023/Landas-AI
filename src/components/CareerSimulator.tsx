import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, X, TrendingUp, Clock, Building2, Zap, ArrowRight } from "lucide-react";
import { simulateCareer, type SimulationResult } from "../api/simulatorClient";

export function CareerSimulator() {
  const [currentRole, setCurrentRole] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s) && skills.length < 8) {
      setSkills([...skills, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (s: string) => setSkills(skills.filter((x) => x !== s));

  const run = async () => {
    if (!currentRole.trim() || skills.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await simulateCareer(currentRole.trim(), skills));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="text-blue-500" size={28} /> Career Simulator
        </h2>
        <p className="text-gray-500">See how learning new skills reshapes your career path in the PH market.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm mb-8">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Role</label>
            <input
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              placeholder="e.g. Data Analyst"
              className="mt-2 w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-gray-300 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Skills to Learn</label>
            <div className="mt-2 flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="e.g. Spark, Airflow, dbt"
                className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-gray-300 transition-all"
              />
              <button onClick={addSkill} className="px-4 bg-black text-white rounded-2xl hover:scale-[0.97] active:scale-95 transition-all">
                <Plus size={18} />
              </button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-blue-900"><X size={12} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={run}
            disabled={loading || !currentRole.trim() || skills.length === 0}
            className={`w-full py-4 bg-black text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[0.99] active:scale-95 disabled:opacity-40 ${loading ? "animate-pulse" : ""}`}
          >
            {loading ? <Zap size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {loading ? "Simulating..." : "Simulate My Future"}
          </button>

          {error ? <p className="text-xs text-amber-600 text-center font-medium">{error}</p> : null}
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 text-center">
            <p className="text-sm font-medium text-blue-900">{result.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {result.projected_roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold leading-tight pr-2">{role.title}</h3>
                  <div className="shrink-0 flex flex-col items-center">
                    <span className="text-2xl font-black text-blue-600">{role.unlock_score}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-300">unlock</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">{role.why}</p>

                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-gray-400 font-medium">{role.salary_now}</span>
                  <ArrowRight size={14} className="text-blue-400" />
                  <span className="font-bold text-green-600">{role.salary_projected}</span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {role.timeline}</span>
                  {role.key_employers?.length > 0 && (
                    <span className="flex items-center gap-1.5"><Building2 size={13} /> {role.key_employers.join(", ")}</span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-500">
                  <TrendingUp size={12} /> Projected with your new skills
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
