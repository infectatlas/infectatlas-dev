import { createClient } from "@supabase/supabase-js";

const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const rawKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

function cleanClientValue(val: string): string {
  if (!val) return "";
  let cleaned = val.trim();
  // Strip quotes if any
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
    "your_supabase_anon_key"
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

const supabaseUrl = cleanSupabaseUrl(cleanClientValue(rawUrl));
const supabaseAnonKey = cleanClientValue(rawKey);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Ensures a unique user study ID is persisted locally to represent the user's cloud records.
 */
export function getOrCreateUserId(): string {
  let userId = localStorage.getItem("infectatlas_user_uuid");
  if (!userId) {
    userId = `user_stud_${Math.random().toString(36).substr(2, 9)}_${Date.now().toString(36)}`;
    localStorage.setItem("infectatlas_user_uuid", userId);
  }
  return userId;
}

/**
 * Synchronizes list and performance record stats to Supabase if it's connected.
 */
export async function syncUserDataToCloud(lists: any[], analytics: any): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: false, error: "Supabase credentials are not set in the client system." };
  }

  const userId = getOrCreateUserId();

  try {
    // Sync lists
    const listsRes = await fetch("/api/supabase/sync-lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, lists }),
    });

    // Sync analytics
    const analyticsRes = await fetch("/api/supabase/sync-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, analytics }),
    });

    if (!listsRes.ok || !analyticsRes.ok) {
      let errorMessage = "Unable to complete secure back-end sync handshake.";
      try {
        const errorData = !listsRes.ok ? await listsRes.json() : await analyticsRes.json();
        if (errorData?.details) {
          errorMessage = `${errorData.error || "Sync error"}: ${errorData.details}`;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }
      } catch (err) {
        // Fallback to default message
      }
      throw new Error(errorMessage);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Cloud syncing failed:", err);
    return { success: false, error: err.message };
  }
}
