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
