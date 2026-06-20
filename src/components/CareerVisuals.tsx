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
