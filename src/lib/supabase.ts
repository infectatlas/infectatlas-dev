/**
 * InfectAtlas Offline Client Sync Hub
 * Replaces cloud-synced database endpoints with resilient client-side offline localStorage persistence.
 */

export const isSupabaseConfigured = false;

/**
 * Ensures a unique user study ID is persisted locally to represent the user's records.
 */
export function getOrCreateUserId(): string {
  let userId = localStorage.getItem("infectatlas_user_uuid");
  if (!userId) {
    userId = `user_stud_${Math.random().toString(36).substring(2, 11)}_${Date.now().toString(36)}`;
    localStorage.setItem("infectatlas_user_uuid", userId);
  }
  return userId;
}

/**
 * Clean offline replication helper caching current board status to backup namespaces.
 */
export async function syncUserDataToCloud(lists: any[], analytics: any): Promise<{ success: boolean; error?: string }> {
  try {
    localStorage.setItem("infectatlas_backup_lists", JSON.stringify(lists));
    localStorage.setItem("infectatlas_backup_analytics", JSON.stringify(analytics));
    return { success: true };
  } catch (err: any) {
    console.error("Local backup write failed:", err);
    return { success: false, error: err.message };
  }
}
