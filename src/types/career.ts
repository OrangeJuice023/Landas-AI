export interface Role {
  title: string;
  fit_score: number;
  explanation: string;
  skills: string[];
  tools: string[];
  career_path: string[];
  next_steps: string[];
  starter_projects: string[];
  salary?: {
    entry: string;
    mid: string;
  };
  market_tags?: {
    in_demand: boolean;
    remote_friendly: boolean;
    fresh_grad_friendly: boolean;
  };
}

export interface Recommendation {
  industry: string;
  department: string;
  team: string;
  industry_description: string;
  department_description: string;
  roles: Role[];
}

export interface CareerRecommendation {
  recommendations: Recommendation[];
}
