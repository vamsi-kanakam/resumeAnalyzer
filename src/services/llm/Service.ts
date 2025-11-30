import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

export async function analyzeResume(
  resumeText: string,
  jobDescription: string
): Promise<string> {
  const modelName = 'gemini-2.5-pro';

  const prompt = `You are an expert dual-agent system specializing in technical recruiting for top-tier Software/IT/Tech companies.

Your task is to analyze a candidate's resume against a specific job description. Adopt the following two personas in your analysis:

1.  **ATS (Applicant Tracking System):** Perform a raw keyword and formatting match.
2.  **Senior Hiring Manager:** Perform a deep, critical review of technical impact, seniority, and project depth.

Based on this dual-analysis, provide a comprehensive report structured using **Markdown** with clear headings and formatting.

### Instructions

1.  **ATS Score Calculation:** Calculate the **ATS Match Score** (0-100) based on the presence, frequency, and prominence of keywords (e.g., framework names, specific methodologies like 'Agile', 'CI/CD') required by the Job Description within the Resume Text. Penalize poor formatting.
2.  **Shortlisting Decision:** State clearly the **Overall Decision** (SHORTLISTED or REJECTED). The candidate is **SHORTLISTED** only if the score is 80 or above AND the Senior Hiring Manager review finds clear technical impact, sufficient seniority, and relevant architectural thinking.
3.  **Drawbacks:** List critical failures identified by the Hiring Manager persona, focusing on **technical substance** and **quantifiable results**.
4.  **Focus Areas/Suggested Changes:** Provide actionable, specific advice for the candidate to improve their chances for similar roles.

**Your Final Output MUST be a single, complete Markdown file.**

### Output Structure (Strictly Follow this Markdown Format)

## 🎯 Resume Analysis Report

### 1. Overall Decision: [SHORTLISTED/REJECTED]

* **ATS Match Score:** [0-100]%
* **Rejection Reason (if applicable):** [Brief critical reason, e.g., "Lack of required X framework experience."]

---

### 2. Major Drawbacks & Weaknesses (Hiring Manager Review)

* **[Area 1]:** [Description of the problem, focusing on technical depth or impact.]
* **[Area 2]:** [Description of the problem, focusing on quantifiable results or seniority.]
* **[Area 3]:** [Description of the problem, focusing on alignment or formatting.]

---

### 3. Actionable Focus Areas

A list of 3-5 key priorities for immediate improvement:
* [Focus Area 1]
* [Focus Area 2]
* [Focus Area 3]

---

### 4. Suggested Changes & Rewrites

#### **A. Summary Rewrite**
[Suggested one-paragraph rewrite of the summary to be more targeted.]

#### **B. Bullet Point Level-Up Example**
* **Original Bullet Point:** [Paste one original bullet point]
* **Suggested Rewrite (XYZ Pattern):** [Provide the rewritten bullet point using quantifiable metrics and active voice.]

### Input Data

**Resume Text:**
${resumeText}

**Job Description:**
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: 'You are a High grade premium resume analyzer that MNCs use to shortlist candidates for their jobs.'
      },
    });

    if (!response.text) {
      throw new Error('No response text received from AI Service.');
    }

    return response.text;
  }
  catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume from AI Service.');
  }
}