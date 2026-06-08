import { useState } from "react";
import { FitScoreRing, SalaryBand, CareerTimeline, MarketTags } from "./components/CareerVisuals";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Map, Compass, Briefcase, Zap, Star, Layout, Database, BookOpen, Layers } from "lucide-react";
import type { CareerRecommendation, Recommendation } from "./types/career";
import { fetchCareerAdvice, type DetailedSearchParams } from "./api/openrouter";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { technologyDepartments, healthcareDepartments, financeDepartments, logisticsDepartments, manufacturingDepartments, constructionDepartments, foodBeverageDepartments, retailDepartments, energyDepartments, mediaDepartments, governmentDepartments, fallbackDepartments, type Department } from "./data/industryData";
import { savePath, getSavedPaths, type SavedPath } from "./api/supabaseApi";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const industriesList = [
  "Technology", "Healthcare", "Finance & Banking", "Logistics", 
  "Manufacturing", "Construction", "Food & Beverage", 
  "Retail & E-Commerce", "Energy", "Media", "Government"
];

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CareerRecommendation | null>(null);
  const [view, setView] = useState<"home" | "departments" | "roles" | "results" | "suggestions">("home");
  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [savedPaths, setSavedPaths] = useState<SavedPath[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Detailed Search States
  const [detailedFields, setDetailedFields] = useState<DetailedSearchParams>({
    industry: "",
    department: "",
    jobRole: "",
    salaryRange: "",
    skillsRequired: "",
    careerGrowth: ""
  });

  let displayDepartments = fallbackDepartments;
  if (selectedIndustry === "Technology") displayDepartments = technologyDepartments;
  if (selectedIndustry === "Healthcare") displayDepartments = healthcareDepartments;
  if (selectedIndustry === "Finance & Banking") displayDepartments = financeDepartments;
  if (selectedIndustry === "Logistics") displayDepartments = logisticsDepartments;
  if (selectedIndustry === "Manufacturing") displayDepartments = manufacturingDepartments;
  if (selectedIndustry === "Construction") displayDepartments = constructionDepartments;
  if (selectedIndustry === "Food & Beverage") displayDepartments = foodBeverageDepartments;
  if (selectedIndustry === "Retail & E-Commerce") displayDepartments = retailDepartments;
  if (selectedIndustry === "Energy") displayDepartments = energyDepartments;
  if (selectedIndustry === "Media") displayDepartments = mediaDepartments;
  if (selectedIndustry === "Government") displayDepartments = governmentDepartments;

  const handleSearch = async () => {
    const hasDetailed = Object.values(detailedFields).some(val => val && val.trim());
    if (!input.trim() && !hasDetailed) return;

    setLoading(true);
    setView("results");
    setSaveSuccess(false);
    try {
      const data = await fetchCareerAdvice(input, hasDetailed ? detailedFields : undefined);
      setResult(data);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePath = async () => {
    if (!result || !input.trim()) return;
    setIsSaving(true);
    const saved = await savePath(input, result);
    if (saved) setSaveSuccess(true);
    setIsSaving(false);
  };

  const loadSavedPaths = async () => {
    const paths = await getSavedPaths();
    setSavedPaths(paths);
  };

  const handleBack = () => {
    if (view === "results") setView("home");
    else if (view === "roles") setView("departments");
    else if (view === "departments") setView("home");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] font-sans overflow-x-hidden selection:bg-black selection:text-white">
      {/* BACKGROUND ACCENTS */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[35%] h-[40%] bg-purple-50 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
              <Map size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Landas AI</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400">Career Navigator 🇵🇭</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            {view !== "home" && view !== "suggestions" && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            )}

            <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-full border border-gray-100 shadow-sm">
              <button
                 onClick={() => {
                  setResult(null);
                  setView("home");
                 }}
                 className={cn(
                   "text-sm font-bold px-4 py-1.5 rounded-full transition-all duration-300",
                   view === "home" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-black/5"
                 )}
              >
                Home
              </button>
              <button
                 onClick={() => {
                   setView("suggestions");
                   loadSavedPaths();
                 }}
                 className={cn(
                   "text-sm font-bold px-4 py-1.5 rounded-full transition-all duration-300",
                   view === "suggestions" ? "bg-black text-white shadow-md" : "text-gray-500 hover:text-black hover:bg-black/5"
                 )}
              >
                Suggestions
              </button>
            </div>
          </div>
        </header>

        {/* SEARCH BAR */}
        <div className="mb-12">
          <div className="relative group">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Describe your passions, skills, or dream roles..."
              className="w-full bg-white border border-gray-100 rounded-[24px] p-6 shadow-xl shadow-gray-200/40 outline-none ring-2 ring-transparent focus:ring-black/5 focus:border-gray-200 transition-all text-lg placeholder:text-gray-300"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !input.trim()}
              className={cn(
                "absolute right-3 top-3 px-8 py-3 bg-black text-white rounded-2xl flex items-center gap-2 font-medium transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-50",
                loading && "animate-pulse"
              )}
            >
              {loading ? <Zap size={18} className="animate-spin" /> : <Compass size={18} />}
              {loading ? "Analyzing..." : "Analyze Path"}
            </button>
          </div>
        </div>

        <main className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* HOME VIEW */}
            {view === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {industriesList.map((ind, i) => (
                  <IndustryCard
                    key={ind}
                    name={ind}
                    delay={i * 0.05}
                    onClick={() => {
                      setSelectedIndustry(ind);
                      setView("departments");
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* DEPARTMENTS VIEW */}
            {view === "departments" && (
              <motion.div
                key="departments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{selectedIndustry}</h2>
                  <p className="text-gray-500">Discover specialized departments and teams.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayDepartments.map((dep, i) => (
                    <motion.div
                      key={dep.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setSelectedDepartment(dep);
                        setView("roles");
                      }}
                      className="group relative p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden flex flex-col h-full"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Layout size={80} />
                      </div>
                      <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">{dep.subtitle}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors tracking-tight">{dep.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">
                        {dep.description}
                      </p>
                      <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors">
                        Explore Teams &rarr;
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ROLES VIEW */}
            {view === "roles" && selectedDepartment && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 tracking-tight">{selectedDepartment.name}</h2>
                  <p className="text-gray-500 max-w-2xl leading-relaxed">{selectedDepartment.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {selectedDepartment.teams.map((team, i) => (
                    <div
                      key={i}
                      className="p-8 md:p-10 bg-white border border-gray-100 rounded-[32px] group hover:border-black/5 transition-all shadow-sm hover:shadow-xl group"
                    >
                      <div className="flex flex-col lg:flex-row gap-10">
                        {/* LEFT COLUMN: BASIC INFO */}
                        <div className="lg:w-1/3 space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="p-3 bg-black text-white rounded-2xl">
                                <Briefcase size={20} />
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {team.market_tags?.in_demand && (
                                  <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase rounded-full tracking-wider">In Demand</span>
                                )}
                                {team.market_tags?.remote_friendly && (
                                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full tracking-wider">Remote</span>
                                )}
                                {team.market_tags?.fresh_grad_friendly && (
                                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full tracking-wider">Fresh Grad OK</span>
                                )}
                              </div>
                            </div>
                            <h3 className="text-2xl font-black mb-3 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{team.name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed italic">"{team.desc}"</p>
                          </div>

                          {team.salary && (
                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Estimated Salary (PH)</p>
                               <div className="space-y-1">
                                  <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-gray-500">Entry:</span>
                                    <span>{team.salary.entry}</span>
                                  </div>
                                  <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-gray-500">Mid-Level:</span>
                                    <span>{team.salary.mid}</span>
                                  </div>
                               </div>
                            </div>
                          )}

                          <button
                            onClick={() => {
                              setInput(`I want to be a ${team.name} in the ${selectedDepartment.name} department (${selectedIndustry})`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:scale-[0.98] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
                          >
                            Map Career Path <Zap size={16} className="group-hover/btn:fill-current" />
                          </button>
                        </div>

                        {/* RIGHT COLUMN: DETAILS */}
                        <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 lg:border-l lg:border-gray-100 lg:pl-10">
                           {/* SKILLS */}
                           <div className="space-y-6">
                              <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Hard Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {team.key_skills?.hard.map(s => (
                                    <span key={s} className="px-3 py-1.5 bg-white border border-gray-100 text-[10px] font-bold rounded-lg shadow-sm">{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Soft Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {team.key_skills?.soft.map(s => (
                                    <span key={s} className="px-3 py-1.5 bg-gray-50 text-[10px] font-bold rounded-lg">{s}</span>
                                  ))}
                                </div>
                              </div>
                           </div>

                           {/* PROGRESSION & EMPLOYERS */}
                           <div className="space-y-6">
                              <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Career Ladder</h4>
                                <div className="space-y-3">
                                   {team.progression?.map((p, idx) => (
                                     <div key={idx} className="flex items-center gap-3">
                                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                       <span className="text-xs font-bold text-gray-700">{p}</span>
                                     </div>
                                   ))}
                                </div>
                              </div>
                              {team.typical_employers && (
                                <div>
                                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Top PH Employers</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {team.typical_employers.map(e => (
                                      <span key={e} className="text-[10px] font-medium text-gray-500 bg-gray-100/50 px-2.5 py-1 rounded-md">{e}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* RESULTS VIEW */}
            {view === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 pb-20"
              >
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
                    <p className="text-gray-400 font-medium animate-pulse">Mapping your future possibilities...</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                       <p className="font-medium text-gray-500 text-sm ml-4">Analysis complete based on your input.</p>
                       <button
                         onClick={handleSavePath}
                         disabled={isSaving || saveSuccess}
                         className={cn(
                           "px-6 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-sm transition-all shadow-sm",
                           saveSuccess ? "bg-green-500 text-white" : "bg-black text-white hover:scale-[0.98] active:scale-95 disabled:opacity-50"
                         )}
                       >
                         <Database size={16} />
                         {saveSuccess ? "Saved to Suggestions!" : (isSaving ? "Saving..." : "Save this Path")}
                       </button>
                    </div>

                    {result?.recommendations.map((rec, i) => (
                      <RecommendationSection key={i} rec={rec} />
                    ))}
                  </>
                )}
              </motion.div>
            )}

            {/* SUGGESTIONS VIEW */}
            {view === "suggestions" && (
              <motion.div
                key="suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Saved Suggestions</h2>
                  <p className="text-gray-500">Your personalized and saved career compass directions.</p>
                </div>

                {/* DETAILED INPUTS SECTION IN SUGGESTIONS */}
                <div className="mb-12 bg-white/40 backdrop-blur-lg border border-gray-100 rounded-[40px] p-8 md:p-12 shadow-sm">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div>
                        <h3 className="text-xl font-bold mb-1">Custom Roadmap Generator</h3>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Generate precise paths based on your current status</p>
                      </div>
                      <button
                        onClick={handleSearch}
                        disabled={loading || !Object.values(detailedFields).some(v => v)}
                        className={cn(
                          "px-10 py-4 bg-black text-white rounded-2xl flex items-center gap-3 font-bold text-sm shadow-xl transition-all hover:scale-[0.98] active:scale-95 disabled:opacity-30",
                          loading && "animate-pulse"
                        )}
                      >
                        {loading ? <Zap size={18} className="animate-spin" /> : <Compass size={18} />}
                        {loading ? "Calculating..." : "Generate Analysis"}
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <InputField
                        label="Industry"
                        placeholder="e.g. Fintech, E-commerce"
                        value={detailedFields.industry || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, industry: v})}
                      />
                      <InputField
                        label="Department"
                        placeholder="e.g. R&D, Operations"
                        value={detailedFields.department || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, department: v})}
                      />
                      <InputField
                        label="Job Role"
                        placeholder="e.g. Senior Manager"
                        value={detailedFields.jobRole || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, jobRole: v})}
                      />
                      <InputField
                        label="Salary Range"
                        placeholder="e.g. ₱50k - ₱80k"
                        value={detailedFields.salaryRange || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, salaryRange: v})}
                      />
                      <InputField
                        label="Skills Required"
                        placeholder="e.g. SQL, Python, Agile"
                        value={detailedFields.skillsRequired || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, skillsRequired: v})}
                      />
                      <InputField
                        label="Growth Potential"
                        placeholder="e.g. Fast-track to C-suite"
                        value={detailedFields.careerGrowth || ""}
                        onChange={(v) => setDetailedFields({...detailedFields, careerGrowth: v})}
                      />
                   </div>
                </div>

                {savedPaths.length === 0 ? (
                  <div className="p-12 text-center bg-white border border-gray-100 rounded-3xl">
                    <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 text-blue-500 flex items-center justify-center rounded-2xl">
                      <Database size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No saved paths yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Generate a career path analysis and save it to revisit your personalized suggestions here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {savedPaths.map((path) => (
                      <div key={path.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                          <div>
                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Search Query</span>
                             <h3 className="text-lg font-bold mt-1">"{path.input_query}"</h3>
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full font-medium shadow-sm border border-gray-100">
                             {new Date(path.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                           {path.data.recommendations.map((rec, idx) => (
                              <div key={idx} className="bg-gray-50/50 p-4 border border-gray-100 rounded-2xl flex flex-col gap-2 cursor-pointer hover:border-blue-200 transition-colors"
                               onClick={() => {
                                 setResult(path.data);
                                 setInput(path.input_query);
                                 setView("results");
                                 window.scrollTo({ top: 0, behavior: "smooth" });
                               }}
                              >
                                 <div className="flex items-center gap-2 text-blue-600">
                                   <Briefcase size={14} />
                                   <span className="text-xs font-bold uppercase tracking-tighter">{rec.department}</span>
                                 </div>
                                 <h4 className="font-bold">{rec.industry}</h4>
                                 <p className="text-xs text-gray-500 line-clamp-2">{rec.industry_description}</p>
                              </div>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/80 border border-gray-100/50 rounded-2xl px-4 py-3 text-sm outline-none focus:border-black/10 focus:ring-4 focus:ring-black/[0.02] transition-all placeholder:text-gray-200 shadow-sm"
      />
    </div>
  );
}

function IndustryCard({ name, delay, onClick }: { name: string, delay: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      onClick={onClick}
      className="group relative p-6 bg-white border border-gray-50 rounded-[28px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all cursor-pointer duration-500"
    >
      <div className="mb-12 w-10 h-10 bg-gray-50 group-hover:bg-black group-hover:text-white transition-all rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-6">
        <Star size={18} />
      </div>
      <h2 className="text-lg font-bold group-hover:tracking-tight transition-all">{name}</h2>
      <p className="text-xs text-gray-400 mt-1 font-medium group-hover:text-gray-600">Navigate Roles &rarr;</p>
    </motion.div>
  );
}

function RecommendationSection({ rec }: { rec: Recommendation }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-1 gap-6 flex flex-col"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Analysis Segment</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-black/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <Database size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">{rec.department} &bull; {rec.team}</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight">{rec.industry}</h2>
            </div>
            <div className="text-right">
               <p className="text-sm text-gray-400 max-w-xs">{rec.industry_description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {rec.roles.map((role, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: j * 0.1 }}
                className="bg-[#fafafa] border border-gray-100 rounded-3xl p-6 md:p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <h3 className="text-2xl font-bold leading-tight uppercase tracking-tight mb-4">{role.title}</h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">"{role.explanation}"</p>

                    <div className="mb-6 flex flex-col items-center">
                      <FitScoreRing score={role.fit_score} />
                    </div>

                    <div className="mb-6">
                      <MarketTags tags={role.market_tags} />
                    </div>

                    {role.salary && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <SalaryBand entry={role.salary.entry} mid={role.salary.mid} />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map(s => <span key={s} className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[10px] uppercase font-bold text-gray-500 shadow-sm">{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3 grid md:grid-cols-2 gap-8 lg:border-l lg:border-gray-200 lg:pl-10">
                    <div>
                      <CareerTimeline stages={role.career_path} currentIndex={Math.floor(role.career_path.length / 2)} />
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                        <BookOpen size={14} /> Next Steps
                      </h4>
                      <ul className="space-y-3">
                        {role.next_steps.map((step, idx) => (
                          <li key={idx} className="text-sm font-medium flex gap-2">
                            <span className="text-blue-500">&bull;</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center gap-6">
                   <div className="flex -space-x-2">
                      {role.tools.map((tool, idx) => (
                        <div key={idx} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold shadow-sm">
                          {tool}
                        </div>
                      ))}
                   </div>
                   <div className="flex-1 overflow-x-auto">
                     <div className="flex items-center gap-4">
                        <span className="whitespace-nowrap flex items-center gap-1.5 text-xs font-bold text-gray-300 uppercase letter-wider">
                          <Layers size={14} /> Projects:
                        </span>
                        {role.starter_projects.map((proj, idx) => (
                          <span key={idx} className="whitespace-nowrap text-xs font-medium text-gray-500 bg-gray-100/50 px-3 py-1.5 rounded-xl hover:bg-black hover:text-white transition-colors cursor-default">
                             {proj}
                          </span>
                        ))}
                     </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
