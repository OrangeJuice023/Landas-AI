import { useState, useEffect } from "react";
import { Briefcase, TrendingUp, Wifi, Sparkles, GraduationCap } from "lucide-react";

/* ---------- 1. FIT SCORE RING ---------- */
interface FitScoreRingProps {
  score: number;
  size?: number;
  stroke?: number;
}

export function FitScoreRing({ score, size = 120, stroke = 10 }: FitScoreRingProps) {
  const [progress, setProgress] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

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
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
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
          <span className={`text-3xl font-black tracking-tighter ${tier.text}`}>{Math.round(progress)}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">fit score</span>
        </div>
      </div>
      <span className={`text-xs font-bold ${tier.text}`}>{tier.label}</span>
    </div>
  );
}

/* ---------- 2. SALARY BAND ---------- */
interface SalaryBandProps {
  entry?: string;
  mid?: string;
}

function parsePeso(range?: string): [number, number] {
  if (!range) return [0, 0];
  const nums = range.replace(/[₱,]/g, "").match(/\d+/g) || [];
  return [Number(nums[0] || 0), Number(nums[1] || nums[0] || 0)];
}
const fmt = (n: number) => "₱" + n.toLocaleString();

export function SalaryBand({ entry, mid }: SalaryBandProps) {
  const [grow, setGrow] = useState(false);
  const [eMin, eMax] = parsePeso(entry);
  const [mMin, mMax] = parsePeso(mid);
  const scaleMin = Math.min(eMin, mMin);
  const scaleMax = Math.max(eMax, mMax);
  const span = scaleMax - scaleMin || 1;
  const pct = (v: number) => ((v - scaleMin) / span) * 100;

  useEffect(() => {
    const t = setTimeout(() => setGrow(true), 150);
    return () => clearTimeout(t);
  }, []);

  if (!entry && !mid) return null;

  const Bar = ({ min, max, label, color }: { min: number; max: number; label: string; color: string }) => (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
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
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
        <TrendingUp size={14} /> Salary Range (PH)
      </h4>
      <Bar min={eMin} max={eMax} label="Entry level" color="bg-gray-800" />
      <Bar min={mMin} max={mMax} label="Mid level" color="bg-blue-500" />
    </div>
  );
}

/* ---------- 3. CAREER TIMELINE ---------- */
interface CareerTimelineProps {
  stages: string[];
  currentIndex?: number;
}

export function CareerTimeline({ stages, currentIndex = 0 }: CareerTimelineProps) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= stages.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 120 * revealed + 200);
    return () => clearTimeout(t);
  }, [revealed, stages.length]);

  if (!stages?.length) return null;

  return (
    <div>
      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
        <Briefcase size={14} /> Career Path
      </h4>
      <div className="relative flex items-start justify-between">
        <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-100" />
        <div
          className="absolute top-3 left-3 h-0.5 bg-blue-500"
          style={{
            width: stages.length > 1 ? `calc((100% - 1.5rem) * ${currentIndex / (stages.length - 1)})` : "0%",
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
                className={`z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
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
                  isCurrent ? "font-bold text-blue-600" : done ? "font-semibold text-gray-700" : "text-gray-400"
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

/* ---------- 4. MARKET TAGS ---------- */
interface MarketTagsProps {
  tags?: {
    in_demand?: boolean;
    remote_friendly?: boolean;
    fresh_grad_friendly?: boolean;
  };
}

export function MarketTags({ tags }: MarketTagsProps) {
  if (!tags) return null;
  const pills = [
    { key: "in_demand", label: "In demand", icon: Sparkles, cls: "bg-blue-50 text-blue-600 border-blue-100" },
    { key: "remote_friendly", label: "Remote friendly", icon: Wifi, cls: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { key: "fresh_grad_friendly", label: "Fresh grad OK", icon: GraduationCap, cls: "bg-amber-50 text-amber-600 border-amber-100" },
  ].filter((p) => tags[p.key as keyof typeof tags]);

  if (!pills.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map(({ key, label, icon: Icon, cls }) => (
        <span key={key} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${cls}`}>
          <Icon size={12} /> {label}
        </span>
      ))}
    </div>
  );
}
