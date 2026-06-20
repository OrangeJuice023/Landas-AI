import { motion } from "framer-motion";

interface Node { id: string; label: string; x: number; y: number; r: number; accent?: boolean; }

const nodes: Node[] = [
  { id: "you", label: "You", x: 70, y: 150, r: 22, accent: true },
  { id: "skills", label: "Skills", x: 185, y: 62, r: 15 },
  { id: "univ", label: "University", x: 185, y: 238, r: 15 },
  { id: "analyst", label: "Data Analyst", x: 340, y: 150, r: 18 },
  { id: "company", label: "Companies", x: 495, y: 235, r: 15 },
  { id: "engineer", label: "Data Engineer", x: 495, y: 85, r: 18 },
  { id: "architect", label: "Analytics Architect", x: 648, y: 150, r: 21, accent: true },
];

const edges: [string, string][] = [
  ["you", "skills"], ["you", "univ"], ["skills", "analyst"], ["univ", "analyst"],
  ["analyst", "company"], ["company", "architect"], ["analyst", "engineer"], ["engineer", "architect"],
];

const careerPath = "M70 150 L340 150 L495 85 L648 150";
const byId = (id: string) => nodes.find((n) => n.id === id)!;

export function HeroNetwork() {
  return (
    <svg viewBox="0 0 720 300" className="w-full h-auto" role="img" aria-label="Animated career network">
      {edges.map(([a, b], i) => {
        const na = byId(a); const nb = byId(b);
        return (
          <motion.line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }} />
        );
      })}
      <motion.path d={careerPath} stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ delay: 0.8, duration: 1.6, ease: "easeInOut" }} />
      <circle r="4" fill="#3B82F6"><animateMotion dur="5s" repeatCount="indefinite" path={careerPath} /></circle>
      <circle r="2.5" fill="#93C5FD"><animateMotion dur="5s" begin="2.2s" repeatCount="indefinite" path={careerPath} /></circle>
      {nodes.map((n, i) => (
        <motion.g key={n.id}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 200, damping: 18 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
          {n.accent && (
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill="#3B82F6" opacity="0.1">
              <animate attributeName="r" values={`${n.r + 4};${n.r + 10};${n.r + 4}`} dur="3s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.accent ? "#0A0A0A" : "white"} stroke={n.accent ? "#0A0A0A" : "#E5E7EB"} strokeWidth="2" />
          <circle cx={n.x} cy={n.y} r="3" fill={n.accent ? "#3B82F6" : "#9CA3AF"} />
          <text x={n.x} y={n.y + n.r + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill={n.accent ? "#0A0A0A" : "#6B7280"} fontFamily="inherit">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}
