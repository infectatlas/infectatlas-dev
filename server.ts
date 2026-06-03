import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY environment variable is missing. AI features will run in offline demo mode.");
}

// Stripe Lazy Initialization & Configuration Verification
let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is missing. Please configure it in your environment/Secrets tab.");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2023-10-16" as any,
    });
  }
  return stripeClient;
}

// Supabase Lazy Initialization with detailed validation and cleaning helpers
function cleanServerValue(val: string | undefined): string {
  if (!val) return "";
  let cleaned = val.trim();
  // Strip trailing/leading quotes if any
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  
  const placeholders = [
    "MY_SUPABASE_URL",
    "YOUR_SUPABASE_URL",
    "MY_VITE_SUPABASE_URL",
    "MY_GEMINI_API_KEY",
    "MY_APP_URL",
    "placeholder",
    "your_supabase_url",
    "your_supabase_anon_key",
    "your_supabase_service_role_key"
  ];
  if (placeholders.some(p => cleaned.toLowerCase().includes(p.toLowerCase()))) {
    return "";
  }
  return cleaned;
}

function cleanSupabaseUrl(urlStr: string): string {
  if (!urlStr) return "";
  let url = urlStr.trim();
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  if (url.endsWith("/rest/v1")) {
    url = url.slice(0, -8);
  }
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  return url;
}

function isValidSupabaseUrl(urlStr: string): boolean {
  if (!urlStr) return false;
  try {
    const parsed = new URL(urlStr);
    // Real Supabase URLs should not point to the app itself
    if (parsed.hostname.includes("run.app") || parsed.hostname.includes("localhost") || parsed.hostname.includes("127.0.0.1")) {
      return false;
    }
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    return false;
  }
}

let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const rawUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    const url = cleanSupabaseUrl(cleanServerValue(rawUrl));
    const key = cleanServerValue(rawKey);

    if (!url || !key) {
      throw new Error("Supabase integration is missing or has placeholder credentials. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY under the Secrets / Environment variables tab.");
    }
    
    if (!isValidSupabaseUrl(url)) {
      throw new Error("The configured SUPABASE_URL is invalid, contains copy-paste characters, or mistakenly points to the app itself instead of your Supabase project (e.g. https://xyz.supabase.co).");
    }
    
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

// REST API Endpoints

// Endpoint: Generate high-yield study aid / mnemonics for clinical memory retention
app.post("/api/gemini/mnemonic", async (req, res) => {
  try {
    const { pathogenName, characteristics, diseases } = req.body;

    if (!pathogenName) {
      return res.status(400).json({ error: "Missing pathogen name" });
    }

    if (!ai) {
      // Return offline backup mnemonic if API key is not configured
      return res.json({
        mnemonic: `[Offline Support] Remember: "${pathogenName}" has features: ${JSON.stringify(characteristics || [])}. Target diseases include: ${JSON.stringify(diseases || [])}.`,
        source: "local-backup"
      });
    }

    const prompt = `You are an expert Medical Microbiology Professor and Study Coach.
Provide a memorable, creative, and highly clinical mnemonic or memory technique to help medical, pharmacy, or nursing students study the pathogen: "${pathogenName}".

Pathogen details:
- Morphology & Characteristics: ${characteristics?.join(", ") || "Standard characteristics"}
- Associated Diseases: ${diseases?.map((d: any) => `${d.name} (${d.treatment} via ${d.route})`).join("; ") || "Various clinical diseases"}

Your response should follow a structured JSON format:
{
  "keyMnemonic": "A short, memorable phrase, acronym, or visualization",
  "explanation": "Brief breakdown explaining how the mnemonic connects to the details",
  "vividStory": "A 2-sentence highly memorable, slightly visual or humorous clinical scenario depicting a student or clinician recognizing this microbe and selecting the correct IV or PO route."
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
    return res.json({ ...data, source: "gemini-api" });
  } catch (error: any) {
    console.error("Error generating mnemonic:", error);
    return res.status(500).json({
      error: "Could not generate mnemonic at this time.",
      details: error.message
    });
  }
});

// Endpoint: Generate boards-style clinic case vignette for exam prep
app.post("/api/gemini/vignette", async (req, res) => {
  try {
    const { pathogenName, characteristics, diseases } = req.body;

    if (!pathogenName) {
      return res.status(400).json({ error: "Missing pathogen name" });
    }

    if (!ai) {
      return res.json({
        vignette: `A patient presents with symptoms correlated with ${pathogenName}. This Gram-associated pathogen typically displays: ${characteristics?.join(", ") || "standard characteristics"}.`,
        question: `Which of the following describes the correct first-line treatment and route (IV vs PO)?`,
        options: [
          `Correct clinical regimen to target ${pathogenName}`,
          `Incorrect treatment route (wrong formulation)`,
          `Incorrect antibiotic subclass`,
          `Broad spectrum toxic alternative`
        ],
        correctAnswerIndex: 0,
        explanation: `Full coverage of ${pathogenName} includes precise guideline-aligned treatment.`,
        source: "local-backup"
      });
    }

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
    return res.json({ ...data, source: "gemini-api" });
  } catch (error: any) {
    console.error("Error generating vignette:", error);
    return res.status(500).json({
      error: "Could not generate case vignette.",
      details: error.message
    });
  }
});

// Stripe Payment Endpoints
app.get("/api/stripe/config", (req, res) => {
  try {
    res.json({
      publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
      isConfigured: !!process.env.STRIPE_SECRET_KEY,
    });
  } catch (error) {
    res.json({ publishableKey: "", isConfigured: false });
  }
});

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  try {
    const stripe = getStripe();
    const appUrl = process.env.APP_URL || `${req.protocol}://${req.get("host")}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "InfectAtlas Premium Scholar Access",
              description: "Fast-track clinical microbiology retention tool with spaced repetition, mnemonics & board exam vignettes.",
            },
            unit_amount: 3999, // $39.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/?checkout_status=success`,
      cancel_url: `${appUrl}/?checkout_status=cancel`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout setup error:", error.message);
    res.status(500).json({
      error: "Stripe integration is in simulation mode or requires secrets configuration.",
      details: error.message,
    });
  }
});

// Supabase Sync Endpoints
app.get("/api/supabase/status", (req, res) => {
  try {
    getSupabase();
    res.json({ isConfigured: true });
  } catch (error) {
    res.json({ isConfigured: false });
  }
});

app.post("/api/supabase/sync-lists", async (req, res) => {
  try {
    const { userId, lists } = req.body;
    if (!userId || !lists) {
      return res.status(400).json({ error: "Missing userId or lists data" });
    }
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("study_lists")
      .upsert({ user_id: userId, lists: lists, updated_at: new Date() }, { onConflict: "user_id" });

    if (error) {
      throw error;
    }
    res.json({ success: true, message: "Study lists synced successfully", data });
  } catch (error: any) {
    console.error("Supabase sync lists error:", error.message);
    res.status(500).json({
      error: "Supabase integration remains unconfigured or returned storage service connection issues.",
      details: error.message,
    });
  }
});

app.post("/api/supabase/sync-analytics", async (req, res) => {
  try {
    const { userId, analytics } = req.body;
    if (!userId || !analytics) {
      return res.status(400).json({ error: "Missing userId or analytics data" });
    }
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("user_analytics")
      .upsert({ user_id: userId, analytics: analytics, updated_at: new Date() }, { onConflict: "user_id" });

    if (error) {
      throw error;
    }
    res.json({ success: true, message: "Analytics synced successfully", data });
  } catch (error: any) {
    console.error("Supabase sync analytics error:", error.message);
    res.status(500).json({
      error: "Supabase integration remains unconfigured or returned storage service connection issues.",
      details: error.message,
    });
  }
});

// Configure Vite or Static files depending on running environment
async function setupServer() {
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
    console.log(`[ClinMicroServer] Server running on port ${PORT}`);
  });
}

setupServer();
