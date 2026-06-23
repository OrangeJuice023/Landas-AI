import { motion } from "framer-motion";

interface Node { id: string; label: string; x: number; y: number; r: number; tier: 0 | 1 | 2; }

// A denser, crossing network — multiple origins converging toward senior roles
const nodes: Node[] = [
  { id: "student", label: "Student", x: 60, y: 230, r: 16, tier: 0 },
  { id: "grad", label: "Fresh Grad", x: 80, y: 90, r: 14, tier: 0 },
  { id: "shifter", label: "Career Shifter", x: 70, y: 370, r: 14, tier: 0 },

  { id: "analyst", label: "Data Analyst", x: 320, y: 130, r: 16, tier: 1 },
  { id: "dev", label: "Developer", x: 300, y: 300, r: 16, tier: 1 },
  { id: "support", label: "Specialist", x: 340, y: 420, r: 13, tier: 1 },

  { id: "engineer", label: "Data Engineer", x: 600, y: 80, r: 16, tier: 2 },
  { id: "ml", label: "ML Engineer", x: 620, y: 220, r: 15, tier: 2 },
  { id: "lead", label: "Tech Lead", x: 580, y: 350, r: 15, tier: 2 },
  { id: "pm", label: "Product Mgr", x: 610, y: 460, r: 14, tier: 2 },

  { id: "architect", label: "Analytics Architect", x: 900, y: 160, r: 19, tier: 2 },
  { id: "cto", label: "Head of Data", x: 910, y: 360, r: 18, tier: 2 },
];

const edges: [string, string][] = [
  ["grad", "analyst"], ["student", "analyst"], ["student", "dev"], ["shifter", "dev"], ["shifter", "support"],
  ["analyst", "engineer"], ["analyst", "ml"], ["dev", "ml"], ["dev", "lead"], ["support", "pm"], ["support", "lead"],
  ["engineer", "architect"], ["ml", "architect"], ["ml", "cto"], ["lead", "cto"], ["pm", "cto"], ["engineer", "cto"],
];

// Several highlighted journeys that animate
const journeys = [
  "M60 230 L320 130 L600 80 L900 160",   // student → analyst → engineer → architect
  "M70 370 L300 300 L620 220 L900 160",  // shifter → dev → ml → architect
  "M80 90 L320 130 L620 220 L910 360",   // grad → analyst → ml → head of data
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

export function HeroNetwork() {
  return (
    <svg viewBox="0 0 980 520" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {/* faint base connections */}
      {edges.map(([a, b], i) => {
        const na = byId(a); const nb = byId(b);
        return (
          <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 6"
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 + i * 0.04, duration: 0.8 }} />
        );
      })}

      {/* highlighted journeys */}
      {journeys.map((d, i) => (
        <motion.path key={i} d={d} fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ delay: 0.6 + i * 0.4, duration: 1.8, ease: "easeInOut" }} />
      ))}

      {/* traveling pulses on each journey */}
      {journeys.map((d, i) => (
        <circle key={`p${i}`} r={i === 0 ? 4 : 3} fill={i === 0 ? "#2563EB" : "#93C5FD"}>
          <animateMotion dur={`${6 + i}s`} begin={`${i * 1.5}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}

      {/* nodes */}
      {nodes.map((n, i) => {
        const isHub = n.tier === 2 && n.r >= 18;
        return (
          <motion.g key={n.id}
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 180, damping: 16 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            {isHub && (
              <circle cx={n.x} cy={n.y} r={n.r + 6} fill="#3B82F6" opacity="0.12">
                <animate attributeName="r" values={`${n.r + 4};${n.r + 11};${n.r + 4}`} dur="3.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={isHub ? "#0A0A0A" : "#fff"} stroke={isHub ? "#0A0A0A" : "#CBD5E1"} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="2.5" fill={isHub ? "#3B82F6" : "#94A3B8"} />
            <text x={n.x} y={n.y + n.r + 13} textAnchor="middle" fontSize="10" fontWeight="600"
              fill={isHub ? "#0A0A0A" : "#94A3B8"} fontFamily="inherit">{n.label}</text>
          </motion.g>
        );
      })}
    </svg>
  );
}
