import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// Pure, Zero-Dependency Local API Endpoint Simulation middleware for Vite-only boots
function localApiPlugin() {
  return {
    name: 'local-api-simulation',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/api/gemini/vignette' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { pathogenName, characteristics, diseases } = JSON.parse(body);
              const apiKey = process.env.GEMINI_API_KEY;

              if (!apiKey) {
                // Return descriptive mockup local JSON if GEMINI_API_KEY is not defined
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  vignette: `A patient presents with symptoms correlated with ${pathogenName || 'this germ'}. Running in offline mock simulation mode.`,
                  question: `Based on the suspected pathogen, what is the most appropriate first-line treatment and route (IV vs PO)?`,
                  options: [
                    `Correct clinical regimen to target ${pathogenName || 'this pathogen'}`,
                    `Incorrect treatment route (wrong formulation)`,
                    `Incorrect antibiotic subclass`,
                    `Broad spectrum toxic alternative`
                  ],
                  correctAnswerIndex: 0,
                  explanation: `Full coverage of ${pathogenName || 'pathogen'} includes precise guideline-aligned treatment.`,
                  source: "local-simulation-backup"
                }));
                return;
              }

              // Import GoogleGenAI dynamically to avoid issues
              const { GoogleGenAI } = await import("@google/genai");
              const ai = new GoogleGenAI({
                apiKey: apiKey,
                httpOptions: {
                  headers: { 'User-Agent': 'aistudio-build' }
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
                model: "gemini-1.5-flash",
                contents: prompt,
                config: {
                  responseMimeType: "application/json",
                }
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(response.text || "{}");
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
