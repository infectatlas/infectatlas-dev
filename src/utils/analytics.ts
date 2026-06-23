/**
 * Centralized Analytics System for InfectAtlas
 * Supports clean type-safe event tracking, safe non-blocking async execution,
 * and standard environment configuration to toggle tracking in development vs production.
 */

export interface AnalyticsPropsMap {
  app_opened: undefined;
  quiz_started: { mode: string; category?: string };
  quiz_completed: { score: number; totalQuestions: number; category?: string };
  review_started: { totalCards: number };
  review_completed: { cardsReviewed: number };
  deck_reshuffled: undefined;
  deck_auto_reshuffled: undefined;
  founder_claimed: { email: string };
}

type EventName = keyof AnalyticsPropsMap;

class AnalyticsManager {
  private isDevelopment = (import.meta as any).env?.DEV || (import.meta as any).env?.MODE === "development";
  private isEnabled = true; // Can be toggled dynamically or via environment flags

  constructor() {
    // Enable/Disable via client metadata or standard configuration
    const disabledInDev = (import.meta as any).env?.VITE_DISABLE_ANALYTICS_IN_DEV === "true";
    if (this.isDevelopment && disabledInDev) {
      this.isEnabled = false;
    }
  }

  /**
   * Safe, non-blocking async event tracking
   */
  public track<T extends EventName>(
    eventName: T,
    properties?: AnalyticsPropsMap[T]
  ): void {
    if (!this.isEnabled) {
      return;
    }

    // Wrap in setTimeout/Promise.resolve to guarantee non-blocking execute behavior
    Promise.resolve().then(() => {
      const timestamp = new Date().toISOString();
      const payload = {
        event: eventName,
        properties: properties || {},
        timestamp,
        environment: this.isDevelopment ? "development" : "production",
      };

      // 1. Local logging in development space
      if (this.isDevelopment) {
        console.groupCollapsed(`📊 [Analytics] Event: ${eventName}`);
        console.log("Timestamp:", timestamp);
        console.log("Payload:", payload.properties);
        console.groupEnd();
      }

      // 2. Future Integration Handlers (GA4 / PostHog) can be safely injected here
      try {
        // Example GA4:
        // if (typeof window !== 'undefined' && (window as any).gtag) {
        //   (window as any).gtag('event', eventName, properties);
        // }
        // Example PostHog:
        // if (typeof window !== 'undefined' && (window as any).posthog) {
        //   (window as any).posthog.capture(eventName, properties);
        // }
      } catch (err) {
        console.error("Analytics downstream integration failed:", err);
      }
    });
  }

  /**
   * Toggle tracking status dynamically if desired
   */
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export const analytics = new AnalyticsManager();
export default analytics;
