import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Network, Briefcase, Wrench, Building2 } from "lucide-react";
import {
  technologyDepartments, healthcareDepartments, financeDepartments, logisticsDepartments,
  manufacturingDepartments, constructionDepartments, foodBeverageDepartments, retailDepartments,
  energyDepartments, mediaDepartments, governmentDepartments, agricultureDepartments,
  tourismDepartments, bpoDepartments, type Department,
} from "../data/industryData";

const INDUSTRIES: { name: string; depts: Department[] }[] = [
  { name: "Technology", depts: technologyDepartments },
  { name: "BPO & Business Services", depts: bpoDepartments },
  { name: "Tourism & Hospitality", depts: tourismDepartments },
  { name: "Agriculture & Fisheries", depts: agricultureDepartments },
  { name: "Healthcare", depts: healthcareDepartments },
  { name: "Finance & Banking", depts: financeDepartments },
  { name: "Retail & Trade", depts: retailDepartments },
  { name: "Logistics", depts: logisticsDepartments },
  { name: "Manufacturing", depts: manufacturingDepartments },
  { name: "Construction", depts: constructionDepartments },
  { name: "Food & Beverage", depts: foodBeverageDepartments },
  { name: "Energy", depts: energyDepartments },
  { name: "Media", depts: mediaDepartments },
  { name: "Government", depts: governmentDepartments },
];

interface GraphNode {
  id: string;
  label: string;
  type: "industry" | "role" | "skill" | "employer";
  x: number;
  y: number;
}
interface GraphEdge { from: string; to: string; }

export function KnowledgeGraph() {
  const [industryName, setIndustryName] = useState("Technology");
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const industry = INDUSTRIES.find((i) => i.name === industryName);
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];
    if (!industry) return { nodes, edges };

    // Collect all roles across the industry's departments
    const roles = industry.depts.flatMap((d) => d.teams);

    const W = 1000;
    const cx = W / 2;

    // Center: industry node
    const industryId = `ind-${industry.name}`;
    nodes.push({ id: industryId, label: industry.name, type: "industry", x: cx, y: 60 });

    // Roles in a row below the industry
    const roleY = 200;
    const roleGap = Math.min(220, (W - 100) / Math.max(roles.length, 1));
    const roleStartX = cx - (roleGap * (roles.length - 1)) / 2;

    roles.forEach((role, i) => {
      const roleId = `role-${role.name}`;
      const rx = roleStartX + i * roleGap;
      nodes.push({ id: roleId, label: role.name, type: "role", x: rx, y: roleY });
      edges.push({ from: industryId, to: roleId });

      // Only expand skills/employers for the active role (or first role by default)
      const isActive = activeRole ? activeRole === role.name : i === 0;
      if (!isActive) return;

      const skills = role.key_skills?.hard.slice(0, 5) ?? [];
      const employers = role.typical_employers?.slice(0, 4) ?? [];

      skills.forEach((skill, si) => {
        const sid = `skill-${role.name}-${skill}`;
        const sx = 130;
        const sy = 320 + si * 70;
        nodes.push({ id: sid, label: skill, type: "skill", x: sx, y: sy });
        edges.push({ from: roleId, to: sid });
      });

      employers.forEach((emp, ei) => {
        const eid = `emp-${role.name}-${emp}`;
        const ex = W - 130;
        const ey = 340 + ei * 70;
        nodes.push({ id: eid, label: emp, type: "employer", x: ex, y: ey });
        edges.push({ from: roleId, to: eid });
      });
    });

    return { nodes, edges };
  }, [industryName, activeRole]);

  const nodeById = (id: string) => nodes.find((n) => n.id === id);

  const colorFor = (type: GraphNode["type"]) => {
    switch (type) {
      case "industry": return { fill: "#0A0A0A", text: "#fff", stroke: "#0A0A0A" };
      case "role": return { fill: "#3B82F6", text: "#fff", stroke: "#3B82F6" };
      case "skill": return { fill: "#EFF6FF", text: "#1D4ED8", stroke: "#BFDBFE" };
      case "employer": return { fill: "#F0FDF4", text: "#15803D", stroke: "#BBF7D0" };
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Network className="text-blue-500" size={28} /> Career Knowledge Graph
        </h2>
        <p className="text-gray-500">Explore how industries, roles, skills, and PH employers connect. Click a role to expand it.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.name}
            onClick={() => { setIndustryName(ind.name); setActiveRole(null); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
              industryName === ind.name
                ? "bg-black text-white border-black"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-x-auto">
        <svg viewBox="0 0 1000 700" className="w-full min-w-[700px] h-auto">
          {edges.map((e, i) => {
            const a = nodeById(e.from); const b = nodeById(e.to);
            if (!a || !b) return null;
            return (
              <motion.line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="#E5E7EB" strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} />
            );
          })}

          {nodes.map((n, i) => {
            const c = colorFor(n.type);
            const isRole = n.type === "role";
            const w = Math.max(n.label.length * 6.5 + 28, 70);
            return (
              <motion.g key={n.id}
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: isRole ? "pointer" : "default" }}
                onClick={() => isRole && setActiveRole(n.label)}>
                <rect x={n.x - w / 2} y={n.y - 16} width={w} height={32} rx={16}
                  fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.type === "industry" ? 13 : 11}
                  fontWeight={isRole || n.type === "industry" ? 700 : 600} fill={c.text} fontFamily="inherit">
                  {n.label.length > 22 ? n.label.slice(0, 20) + "…" : n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap gap-4 mt-5 text-xs font-bold text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-black" /> Industry</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" /> <Briefcase size={12} /> Role</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300" /> <Wrench size={12} /> Skill</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-100 border border-green-300" /> <Building2 size={12} /> Employer</span>
      </div>
    </motion.div>
  );
}
