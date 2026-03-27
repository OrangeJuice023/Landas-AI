import type { CareerRecommendation } from "../types/career";

export const mockApiResponse: CareerRecommendation = {
  recommendations: [
    {
      industry: "Technology",
      department: "Engineering",
      team: "Product Development",
      industry_description: "The fast-paced field focused on building software and digital solutions.",
      department_description: "Focuses on the creation, maintenance, and optimization of software systems.",
      roles: [
        {
          title: "Senior Product Engineer",
          fit_score: 92,
          explanation: "Combines high-level technical skills with product thinking to build features that matter.",
          skills: ["React/TypeScript", "Product Discovery", "System Architecture", "Leadership"],
          tools: ["Vite", "Supabase", "Linear", "Framer Motion"],
          career_path: ["Intern", "Junior Dev", "Mid-level Engineer", "Senior Architect", "VP of Engineering"],
          next_steps: ["Complete Advanced Next.js course", "Participate in Product Discovery sessions", "Lead a small feature rollout"],
          starter_projects: ["Build a real-time analytics dashboard", "Design a custom component library with Tailwind", "Create a micro-SaaS with Stripe integration"]
        }
      ]
    },
    {
      industry: "Landa-Specific Path",
      department: "Data & Analytics",
      team: "Insight Generation",
      industry_description: "Specialized path for mapping career goals with data-driven insights.",
      department_description: "Analyzes inputs to provide actionable roadmap for professionals.",
      roles: [
        {
          title: "Career Systems Architect",
          fit_score: 85,
          explanation: "Designing platforms that help others naviate their career path using AI and data.",
          skills: ["Data Modeling", "AI Integration", "User Experience Design"],
          tools: ["Python", "OpenAI API", "Figma"],
          career_path: ["Junior Data Analyst", "Data Engineer", "Systems Architect", "CTO"],
          next_steps: ["Learn vector databases", "Get AWS Certified Solutions Architect", "Build an AI agent from scratch"],
          starter_projects: ["Knowledge graph for industry roles", "Personal career advisor chatbot", "Interactive skill-gap analysis tool"]
        }
      ]
    }
  ]
};

export async function fetchCareerAdvice(input: string): Promise<CareerRecommendation> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log("Processing input:", input);
  return mockApiResponse;
}
