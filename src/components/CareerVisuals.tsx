import { useState, useEffect } from "react";
import { Briefcase, TrendingUp, MapPin, Wifi, Sparkles, GraduationCap } from "lucide-react";

/* ============================================================
   Landa — Career Data Visualization Components
   Drop-in components matched to the existing design language:
   white cards, rounded corners, gray/black/blue palette.
   Pure React + Tailwind + lucide-react. No extra deps.
   (In your app you can wrap any of these in <motion.div> for
   entrance animation — they're already animation-friendly.)
   ============================================================ */

/* ---------- 1. FIT SCORE RING ---------- */
function FitScoreRing({ score = 0, size = 120, stroke = 10 }) {
  const [progress, setProgress] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Color tiers — stays inside the brand palette
  const tier =
    score >= 85
      ? { ring: "#2563eb", text: "text-blue-600", label: "Excellent fit" }
      : score >= 70
      ? { ring: "#3b82f6", text: "text-blue-500", label: "Strong fit" }
      : score >= 50
      ? { ring: "#64748b", text: "text-slate-500", label: "Moderate fit" }
      : { ring: "#94a3b8", text: "text-slate-400", label: "Low fit" };

  useEffect(() => {
    const t = setTimeout(() => setProgress(score), 100);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tier.ring}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-black tracking-tighter ${tier.text}`}>
            {Math.round(progress)}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">
            fit score
          </span>
        </div>
      </div>
      <span className={`text-xs font-bold ${tier.text}`}>{tier.label}</span>
    </div>
  );
}

/* ---------- 2. SALARY BAND ---------- */
// Parses "₱25,000 – ₱40,000" -> [25000, 40000]
function parsePeso(range) {
  if (!range) return [0, 0];
  const nums = range.replace(/[₱,]/g, "").match(/\d+/g) || [];
  return [Number(nums[0] || 0), Number(nums[1] || nums[0] || 0)];
}
const fmt = (n) => "₱" + n.toLocaleString();

function SalaryBand({ entry, mid }) {
  const [grow, setGrow] = useState(false);
  const [eMin, eMax] = parsePeso(entry);
  const [mMin, mMax] = parsePeso(mid);
  const scaleMin = Math.min(eMin, mMin);
  const scaleMax = Math.max(eMax, mMax);
  const span = scaleMax - scaleMin || 1;
  const pct = (v) => ((v - scaleMin) / span) * 100;

  useEffect(() => {
    const t = setTimeout(() => setGrow(true), 150);
    return () => clearTimeout(t);
  }, []);

  const Bar = ({ min, max, label, color, sub }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {label}
        </span>
        <span className="text-xs font-bold text-gray-700">
          {fmt(min)} – {fmt(max)}
        </span>
      </div>
      <div className="relative h-2.5 w-full rounded-full bg-gray-100">
        <div
          className={`absolute h-2.5 rounded-full ${color}`}
          style={{
            left: `${pct(min)}%`,
            width: grow ? `${pct(max) - pct(min)}%` : "0%",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <span className="absolute -bottom-1 text-[9px] text-gray-300">{sub}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
        <TrendingUp size={14} /> Salary Range (PH)
      </h4>
      <Bar min={eMin} max={eMax} label="Entry level" color="bg-gray-800" sub="" />
      <Bar min={mMin} max={mMax} label="Mid level" color="bg-blue-500" sub="" />
    </div>
  );
}

/* ---------- 3. CAREER TIMELINE ---------- */
function CareerTimeline({ stages = [], currentIndex = 0 }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= stages.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 120 * revealed + 200);
    return () => clearTimeout(t);
  }, [revealed, stages.length]);

  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
        <Briefcase size={14} /> Career Path
      </h4>
      <div className="relative flex items-start justify-between">
        {/* connecting line */}
        <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-100" />
        <div
          className="absolute top-3 left-3 h-0.5 bg-blue-500"
          style={{
            width:
              stages.length > 1
                ? `calc((100% - 1.5rem) * ${currentIndex / (stages.length - 1)})`
                : "0%",
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {stages.map((stage, i) => {
          const done = i <= currentIndex;
          const isCurrent = i === currentIndex;
          const shown = i < revealed;
          return (
            <div
              key={i}
              className="relative flex flex-col items-center text-center"
              style={{
                width: `${100 / stages.length}%`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.5s ease",
              }}
            >
              <div
                className={`z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${
                    isCurrent
                      ? "bg-blue-500 border-blue-500 ring-4 ring-blue-100"
                      : done
                      ? "bg-gray-800 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
              >
                {done && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span
                className={`mt-2 text-[10px] leading-tight px-1 ${
                  isCurrent
                    ? "font-bold text-blue-600"
                    : done
                    ? "font-semibold text-gray-700"
                    : "text-gray-400"
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 4. MARKET TAGS (bonus quick-win) ---------- */
function MarketTags({ tags = {} }) {
  const pills = [
    { key: "in_demand", label: "In demand", icon: Sparkles, on: "bg-blue-50 text-blue-600 border-blue-100" },
    { key: "remote_friendly", label: "Remote friendly", icon: Wifi, on: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { key: "fresh_grad_friendly", label: "Fresh grad OK", icon: GraduationCap, on: "bg-amber-50 text-amber-600 border-amber-100" },
  ].filter((p) => tags[p.key]);

  if (!pills.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map(({ key, label, icon: Icon, on }) => (
        <span
          key={key}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${on}`}
        >
          <Icon size={12} /> {label}
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   DEMO — shows the components composed into a role card,
   using your real data shapes (mock role + PH industry data)
   ============================================================ */
export default function App() {
  const role = {
    title: "Data Analyst",
    fit_score: 88,
    salary: { entry: "₱25,000 – ₱40,000", mid: "₱50,000 – ₱80,000" },
    career_path: ["Junior Analyst", "Data Analyst", "Senior Analyst", "Analytics Mgr", "Head of Data"],
    market_tags: { in_demand: true, remote_friendly: true, fresh_grad_friendly: true },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Recommended role
          </span>
          <h2 className="text-3xl font-black tracking-tight mt-1">{role.title}</h2>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] p-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <FitScoreRing score={role.fit_score} />
            <div className="flex-1 w-full space-y-4">
              <MarketTags tags={role.market_tags} />
              <SalaryBand entry={role.salary.entry} mid={role.salary.mid} />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <CareerTimeline stages={role.career_path} currentIndex={1} />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          FitScoreRing · SalaryBand · CareerTimeline · MarketTags
        </p>
      </div>
    </div>
  );
}
