import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Explicit Sitemap XML Routes
  // This ensures Google gets the correct Content-Type: application/xml
  const sitemapFiles = [
    "sitemap.xml",
    "sitemap-organisms.xml",
    "sitemap-diseases.xml",
    "sitemap-drugs.xml",
    "sitemap-comparisons.xml"
  ];

  sitemapFiles.forEach(file => {
    app.get(`/${file}`, (req, res) => {
      const filePath = path.join(process.cwd(), "public", file);
      const distPath = path.join(process.cwd(), "dist", file);
      
      // Try dist first (production), then public (dev/source)
      let finalPath = fs.existsSync(distPath) ? distPath : filePath;
      
      if (fs.existsSync(finalPath)) {
        res.setHeader("Content-Type", "application/xml");
        res.sendFile(finalPath);
      } else {
        res.status(404).send("Sitemap not found");
      }
    });
  });

  // 2. API Routes (Ported from vite.config.ts)
  app.post("/api/gemini/vignette", async (req, res) => {
    try {
      const { pathogenName, characteristics, diseases } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.json({
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
        });
      }

      const ai = new GoogleGenAI(apiKey);
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

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
  "vignette": "...",
  "question": "...",
  "options": ["...", "...", "...", "..."],
  "correctAnswerIndex": 0,
  "explanation": "..."
}

Do NOT wrap the output in markdown code blocks like \`\`\`json. Return only the raw JSON.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      res.setHeader('Content-Type', 'application/json');
      res.send(text);
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // 3. Vite Middleware or Static Assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
