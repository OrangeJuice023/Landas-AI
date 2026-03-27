import type { CareerRecommendation } from "../types/career";

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

const SYSTEM_PROMPT = `
You are a highly intelligent Philippine career advisor AI designed to map user interests into structured, realistic, and actionable career paths within the Philippine context.

Your goal is to analyze the user's input and generate career recommendations that are specific, practical, and aligned with real-world industries and roles in the Philippines.

---

🚨 OUTPUT RULE:
Return ONLY valid JSON.
Do NOT include any text, explanation, or formatting outside the JSON.

---

📦 JSON FORMAT:

{
  "recommendations": [
    {
      "industry": "",
      "department": "",
      "team": "",
      "industry_description": "",
      "department_description": "",
      "roles": [
        {
          "title": "",
          "fit_score": 0,
          "explanation": "",
          "skills": ["", "", ""],
          "tools": ["", "", ""],
          "career_path": ["", "", "", "", ""],
          "next_steps": ["", "", ""],
          "starter_projects": ["", "", ""],
          "salary": {
            "entry": "₱XX,XXX – ₱XX,XXX",
            "mid": "₱XX,XXX – ₱XXX,XXX"
          },
          "market_tags": {
            "in_demand": true,
            "remote_friendly": true,
            "fresh_grad_friendly": true
          }
        }
      ]
    }
  ]
}

---

🧠 CORE INSTRUCTIONS:

1. Analyze the user's:
   - Interests, Skills, Personality traits, Preferences (e.g., no coding, remote work).
   - Context: Always frame everything for the Philippine market (PH).

2. Map them into 3 to 5 UNIQUE roles total across all recommendations.

3. Provide salary ranges in PHP based on current Philippine market standards (e.g., ₱25k-40k for entry tech).

🎯 FIT SCORE:
- Assign a "fit_score" from 0 to 100 reflecting how well the role matches the user.

🧩 FIELD GUIDELINES:
- "industry": technology, healthcare, finance, logistics, manufacturing, etc.
- "salary": Must be in Philippine Pesos (₱).
`;

export interface DetailedSearchParams {
  industry?: string;
  department?: string;
  jobRole?: string;
  salaryRange?: string;
  skillsRequired?: string;
  careerGrowth?: string;
}

export async function fetchCareerAdvice(userInput: string, detailedParams?: DetailedSearchParams): Promise<CareerRecommendation> {
  try {
    let finalUserInput = `USER INPUT: "${userInput}"`;
    
    if (detailedParams) {
      finalUserInput += `\n\nDETAILED CONTEXT:
- Targeted Industry: ${detailedParams.industry || 'Any'}
- Specific Department: ${detailedParams.department || 'Any'}
- Desired Job Role: ${detailedParams.jobRole || 'Any'}
- Expected Salary Range: ${detailedParams.salaryRange || 'Any'}
- Key Skills: ${detailedParams.skillsRequired || 'Any'}
- Career Growth Priority: ${detailedParams.careerGrowth || 'High'}`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "stepfun/step-3.5-flash:free",
        models: [
          "nvidia/nemotron-3-super-120b-a12b:free",
          "google/gemini-2.0-flash-exp:free"
        ],
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: finalUserInput }
        ],
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    
    // Attempt to parse text in case it's wrapped in triple backticks
    const cleanedJson = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanedJson) as CareerRecommendation;
    
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw error;
  }
}
