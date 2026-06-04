import { GoogleGenAI } from "@google/genai";

export async function onRequestPost(context: { request: Request; env: Record<string, string> }) {
  try {
    const { request, env } = context;
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY environment variable is missing on server edge environment." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { pathogenName, characteristics, diseases } = await request.json() as any;

    if (!pathogenName) {
      return new Response(
        JSON.stringify({ error: "Missing pathogen name" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `You are a medical school exam writer (USMLE, COMLEX, or NCLEX style).
Generate a multiple-choice clinical case vignette for: "${pathogenName}".

Microbe profile:
- Morphology: ${characteristics?.join(", ")}
- Common clinical presentation(s): ${diseases?.map((d: any) => d.name).join(", ")}

Guidelines:
1. Write a premium clinical vignette detailing a patient's presentation (history, physical exam, lab results like Gram stain but *do not name the microorganism directly in the vignette story*).
2. The question should ask: "Based on the suspected pathogen, what is the most appropriate first-line treatment and administration route?"
3. Provide 4 option strings, focusing heavily on matching the drug to the correct route (e.g., distinguishing PO cephalexin vs IV cefazolin, or PO vancomycin for C. diff).
4. Identify the correct answer option index (0 to 3).
5. Provide a clear, educational, step-by-step diagnostic and treatment rationale explaining why the correct option is superior, why the other options represent incorrect routes of administration or incorrect drug coverages, and caution that this is strictly a mock study simulator.

Your response should follow a structured JSON format:
{
  "vignette": "The clinical presentation text. Include physical findings, vital signs, and microscopy clues.",
  "question": "The board-style question testing treatment route verification",
  "options": [
    "Option A (Include drug name and IV or PO route)",
    "Option B",
    "Option C",
    "Option D"
  ],
  "correctAnswerIndex": 0,
  "explanation": "Clear, concise rationale addressing why the target route is correct, and why other options fail clinical rules."
}

Do NOT wrap the output in markdown code blocks like \`\`\`json. Return only the raw JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText.trim());

    return new Response(
      JSON.stringify({ ...data, source: "gemini-api" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error generating vignette:", error);
    return new Response(
      JSON.stringify({
        error: "Could not generate case vignette.",
        details: error.message
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
