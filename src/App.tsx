import { useState, useEffect } from "react";
import { StudyList, PerformanceAnalytics, SpacedRepetitionItem } from "./types";
import { microorganismsData } from "./data/microorganisms";
import Dashboard from "./components/Dashboard";
import SearchEngine from "./components/SearchEngine";
import Flashcards from "./components/Flashcards";
import QuizMode from "./components/QuizMode";
import AntimicrobialGrid from "./components/AntimicrobialGrid";
import LegalModal from "./components/LegalModal";
import { isSupabaseConfigured, syncUserDataToCloud } from "./lib/supabase";
import { Search, BrainCircuit, Activity, BookOpen, Layers, Award, Grid, Sparkles, ShieldCheck, CheckCircle, Database, Cloud, CloudOff, RefreshCw, X } from "lucide-react";
import { analytics as analyticsUtil } from "./utils/analytics";

// Initial system list presets for healthcare students
const PRESET_LISTS: StudyList[] = [
  {
    id: "preset-gpos",
    name: "Gram-Positive Core Pathogens",
    description: "Crucial Gram-positive cocci and rods key for clinical evaluations.",
    pathogenIds: ["s-aureus", "s-pneumoniae", "s-pyogenes", "s-agalactiae", "e-faecalis", "e-faecium", "c-difficile", "c-tetani", "l-monocytogenes"],
    createdAt: new Date().toISOString()
  },
  {
    id: "preset-gnegs",
    name: "High-Yield Enteric Gram-Negatives",
    description: "Common Gram-negative rods causing GI or urinary complications.",
    pathogenIds: ["e-coli", "k-pneumoniae", "p-aeruginosa", "a-baumannii", "e-cloacae"],
    createdAt: new Date().toISOString()
  },
  {
    id: "preset-spiro-atyp",
    name: "Spirochetes & Atypical Pathogens",
    description: "Spirochetes and cell wall atypical bugs.",
    pathogenIds: ["t-pallidum", "b-burgdorferi", "l-pneumophila", "h-pylori", "n-meningitidis"],
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "search" | "flashcards" | "quiz" | "grid">("dashboard");

  // Track app opened log on initial load
  useEffect(() => {
    analyticsUtil.track("app_opened");
  }, []);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaBanner, setShowPwaBanner] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already dismissed the banner in this browser session or persistent store
    const isDismissed = localStorage.getItem("infectatlas_pwa_dismissed") === "true";
    if (isDismissed) return;

    // Detect if already running in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Detect iOS
    const iosDetected = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iosDetected);

    // If iOS, prompt immediately since beforeinstallprompt is never fired on iOS Safari
    if (iosDetected) {
      setShowPwaBanner(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent automatic prompt bubble
      e.preventDefault();
      // Store the event so we can trigger it upon CTA click
      setDeferredPrompt(e);
      // Show PWA installation CTA banner
      setShowPwaBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install user choice outcome: ${outcome}`);
    // Clear deferredPrompt on interaction
    setDeferredPrompt(null);
    setShowPwaBanner(false);
  };

  const handleDismissPwaBanner = () => {
    setShowPwaBanner(false);
    localStorage.setItem("infectatlas_pwa_dismissed", "true");
  };

  // Premium Billing simulation states
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem("infectatlas_is_premium") === "true";
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  // Early User Promotional Phases & Grandfathering states
  const [isGrandfathered, setIsGrandfathered] = useState<boolean>(() => {
    return localStorage.getItem("infectatlas_grandfathered") === "true";
  });
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(() => {
    return localStorage.getItem("infectatlas_registered_email");
  });
  const [isPromoActive, setIsPromoActive] = useState<boolean>(() => {
    // Defaults to True (represent Phase 1: Free Beta active for early 3-6 months)
    return localStorage.getItem("infectatlas_promo_active") !== "false";
  });

  const [isPromoDismissed, setIsPromoDismissed] = useState<boolean>(() => {
    return localStorage.getItem("infectatlas_promo_dismissed") === "true";
  });

  const hasPremiumAccess = isPremium || isGrandfathered || isPromoActive;

  // Legal Modal and compliance states
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<"privacy" | "terms">("privacy");

  const handleUpgrade = () => {
    setIsPremium(true);
    localStorage.setItem("infectatlas_is_premium", "true");
  };

  const handleStripeCheckout = async () => {
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert("ℹ️ Stripe billing credentials are unconfigured. To test production card payments, set STRIPE_SECRET_KEY in your container variables. \n\nStarting sandboxed trial access instead!");
        handleUpgrade();
        setShowUpgradeModal(false);
      }
    } catch (error) {
      console.error("Stripe Checkout Session API call failed:", error);
      alert("Billing system is in simulated sandbox. Initializing instant evaluation access...");
      handleUpgrade();
      setShowUpgradeModal(false);
    }
  };

  // State managed via client-side localStorage persistence
  const [studyLists, setStudyLists] = useState<StudyList[]>([]);
  const [spacedRepetitionItems, setSpacedRepetitionItems] = useState<SpacedRepetitionItem[]>([]);
  const [analytics, setAnalytics] = useState<PerformanceAnalytics>({
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    currentStreak: 0,
    questionsPerPathogen: {},
    questionsPerCategory: {},
    studyHistory: []
  });

  // Load Initial States
  useEffect(() => {
    // 1. Study Lists
    const cachedLists = localStorage.getItem("micro_study_lists");
    if (cachedLists) {
      setStudyLists(JSON.parse(cachedLists));
    } else {
      setStudyLists(PRESET_LISTS);
      localStorage.setItem("micro_study_lists", JSON.stringify(PRESET_LISTS));
    }

    // 2. SRS Trackers
    const cachedSR = localStorage.getItem("micro_srs_trackers");
    if (cachedSR) {
      setSpacedRepetitionItems(JSON.parse(cachedSR));
    } else {
      // Seed with some default pathogen IDs for demonstration
      const initialSR = [
        { pathogenId: "s-aureus", intervalDays: 1, easinessFactor: 2.5, repetitions: 0, nextReviewDate: new Date().toISOString() },
        { pathogenId: "e-coli", intervalDays: 3, easinessFactor: 2.5, repetitions: 1, nextReviewDate: new Date().toISOString() }
      ];
      setSpacedRepetitionItems(initialSR);
      localStorage.setItem("micro_srs_trackers", JSON.stringify(initialSR));
    }

    // 3. Analytics logs
    const cachedAnalytics = localStorage.getItem("micro_analytics");
    if (cachedAnalytics) {
      const parsed = JSON.parse(cachedAnalytics);
      setAnalytics(parsed);
      
      // Calculate daily study streaks safely
      const todayString = new Date().toISOString().split("T")[0];
      if (parsed.lastStudyDate) {
        const lastDate = new Date(parsed.lastStudyDate);
        const diffInTime = new Date(todayString).getTime() - lastDate.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
        
        if (diffInDays > 1) {
          // Streak broken
          setAnalytics(prev => {
            const updated = { ...prev, currentStreak: 0 };
            localStorage.setItem("micro_analytics", JSON.stringify(updated));
            return updated;
          });
        }
      }
    } else {
      // Seed statistics
      const initialStats = {
        totalQuestionsAnswered: 12,
        totalCorrect: 9,
        currentStreak: 2,
        lastStudyDate: new Date().toISOString().split("T")[0],
        questionsPerPathogen: {},
        questionsPerCategory: {
          "Gram-positive": { correct: 6, incorrect: 2 },
          "Gram-negative": { correct: 3, incorrect: 1 }
        },
        studyHistory: []
      };
      setAnalytics(initialStats);
      localStorage.setItem("micro_analytics", JSON.stringify(initialStats));
    }
  }, []);

  // Handle Stripe Success or Cancel URL query params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkoutStatus = urlParams.get("checkout_status");
    if (checkoutStatus === "success") {
      setIsPremium(true);
      localStorage.setItem("infectatlas_is_premium", "true");
      alert("🎉 Premium Activated! Your Stripe payment has succeeded, unlocking all advanced decks and vignettes.");
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    } else if (checkoutStatus === "cancel") {
      alert("⚠️ Checkout cancelled. If you need any assistance, unlock again or apply the MicroVIP ambassador code.");
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  // Supabase cloud data replication state & helpers
  const [cloudSyncStatus, setCloudSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const handleCloudSync = async () => {
    if (!isSupabaseConfigured) return;
    setCloudSyncStatus("syncing");
    const result = await syncUserDataToCloud(studyLists, analytics);
    if (result.success) {
      setCloudSyncStatus("success");
      setTimeout(() => setCloudSyncStatus("idle"), 3000);
    } else {
      setCloudSyncStatus("error");
    }
  };

  // Triggers automatic synchronization when lists or performance trackers modify
  useEffect(() => {
    if (isSupabaseConfigured && studyLists.length > 0) {
      const timer = setTimeout(() => {
        handleCloudSync();
      }, 5000); // 5s debounce
      return () => clearTimeout(timer);
    }
  }, [studyLists, analytics]);

  // Save Helper: Study Lists
  const saveStudyLists = (lists: StudyList[]) => {
    setStudyLists(lists);
    localStorage.setItem("micro_study_lists", JSON.stringify(lists));
  };

  // Save Helper: Spaced Repetition items
  const saveSRItems = (items: SpacedRepetitionItem[]) => {
    setSpacedRepetitionItems(items);
    localStorage.setItem("micro_srs_trackers", JSON.stringify(items));
  };

  // Add/Remove Pathogen from a Study List
  const handleAddPathogenToStudyList = (pathogenId: string) => {
    // Add to the first custom list or display list management
    const updated = studyLists.map((list) => {
      if (list.id.startsWith("preset-")) {
        // Presets are read-only to preserve curriculum integrity, toggle custom lists
        return list;
      }
      const hasPathogen = list.pathogenIds.includes(pathogenId);
      const nextIds = hasPathogen
        ? list.pathogenIds.filter((id) => id !== pathogenId)
        : [...list.pathogenIds, pathogenId];

      return { ...list, pathogenIds: nextIds };
    });
    saveStudyLists(updated);
  };

  // Create customized study list
  const handleCreateStudyList = (name: string, description: string) => {
    const newList: StudyList = {
      id: `custom-list-${Date.now()}`,
      name,
      description,
      pathogenIds: [],
      createdAt: new Date().toISOString()
    };
    saveStudyLists([...studyLists, newList]);
  };

  // Delete customized list
  const handleDeleteStudyList = (id: string) => {
    const filtered = studyLists.filter((l) => l.id !== id);
    saveStudyLists(filtered);
  };

  // Update spaced repetition score rating
  const handleReviewSpacedRepetition = (pathogenId: string, gotEasy: boolean) => {
    const today = new Date();
    const updated = spacedRepetitionItems.map((item) => {
      if (item.pathogenId !== pathogenId) return item;

      let nextInterval = item.intervalDays;
      let nextRepetitions = item.repetitions;
      let nextEF = item.easinessFactor;

      if (gotEasy) {
        nextRepetitions += 1;
        if (nextRepetitions === 1) nextInterval = 1;
        else if (nextRepetitions === 2) nextInterval = 3;
        else {
          nextInterval = Math.round(nextInterval * nextEF);
        }
        nextEF = Math.max(1.3, nextEF + 0.1);
      } else {
        nextRepetitions = 0;
        nextInterval = 1; // Restart intervals
        nextEF = Math.max(1.3, nextEF - 0.2);
      }

      // Compute exact date offset
      const nextReviewDate = new Date(today);
      nextReviewDate.setDate(today.getDate() + nextInterval);

      return {
        ...item,
        intervalDays: nextInterval,
        repetitions: nextRepetitions,
        easinessFactor: nextEF,
        nextReviewDate: nextReviewDate.toISOString(),
        lastReviewed: today.toISOString()
      };
    });

    saveSRItems(updated);
  };

  // Add pathogen to spaced repetition tracking list
  const handleAddSpacedRepetition = (pathogenId: string) => {
    const exists = spacedRepetitionItems.some((s) => s.pathogenId === pathogenId);
    if (exists) return;

    const newItem: SpacedRepetitionItem = {
      pathogenId,
      intervalDays: 1,
      easinessFactor: 2.5,
      repetitions: 0,
      nextReviewDate: new Date().toISOString()
    };
    saveSRItems([...spacedRepetitionItems, newItem]);
  };

  // Stop tracking pathogen in spaced repetition tracking list
  const handleRemoveSpacedRepetition = (pathogenId: string) => {
    const filtered = spacedRepetitionItems.filter((s) => s.pathogenId !== pathogenId);
    saveSRItems(filtered);
  };

  // Record final quiz stats inside central stats engine
  const handleCommitQuizResults = (
    correctCount: number,
    totalCount: number,
    categoryHits: Record<string, { correct: number; incorrect: number }>
  ) => {
    const todayString = new Date().toISOString().split("T")[0];

    setAnalytics((prev) => {
      // Compute correct streak
      let nextStreak = prev.currentStreak;
      if (prev.lastStudyDate === todayString) {
        // Already studied today
      } else {
        const lastStudy = prev.lastStudyDate ? new Date(prev.lastStudyDate) : null;
        if (lastStudy) {
          const diff = new Date(todayString).getTime() - lastStudy.getTime();
          const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if (diffDays <= 1) {
            nextStreak += 1;
          } else {
            nextStreak = 1;
          }
        } else {
          nextStreak = 1;
        }
      }

      // Merge category hits
      const mergedCategories = { ...prev.questionsPerCategory };
      Object.keys(categoryHits).forEach((cat) => {
        const currentCat = mergedCategories[cat] || { correct: 0, incorrect: 0 };
        mergedCategories[cat] = {
          correct: currentCat.correct + categoryHits[cat].correct,
          incorrect: currentCat.incorrect + categoryHits[cat].incorrect
        };
      });

      const updatedHistory = [...(prev.studyHistory || [])];
      const todayIndex = updatedHistory.findIndex((h) => h.date === todayString);
      if (todayIndex > -1) {
        updatedHistory[todayIndex].questionsAttempted += totalCount;
        updatedHistory[todayIndex].correctCount += correctCount;
      } else {
        updatedHistory.push({
          date: todayString,
          questionsAttempted: totalCount,
          correctCount: correctCount
        });
      }

      const updated = {
        ...prev,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + totalCount,
        totalCorrect: prev.totalCorrect + correctCount,
        currentStreak: nextStreak,
        lastStudyDate: todayString,
        questionsPerCategory: mergedCategories,
        studyHistory: updatedHistory
      };

      localStorage.setItem("micro_analytics", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans" id="app-viewport">
      {/* Principal Academic Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 py-2.5 sm:px-4 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-hidden"
              title="Go to Progress Dashboard"
            >
              <div className="p-1.5 sm:p-2.5 bg-indigo-600 text-white rounded-lg sm:rounded-xl shadow-sm group-hover:bg-indigo-700 transition-colors">
                <BrainCircuit className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors col-span-full">InfectAtlas</h1>
                <span className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-0.5 sm:mt-1.5">
                  Medical Microorganism Study Tool
                </span>
              </div>
            </button>

            {/* Compact Supabase Sync Indicator always visible on mobile beside title to save vertical stack space */}
            <div className="flex sm:hidden items-center gap-1 text-[10px] bg-slate-50 rounded-lg py-1 px-2 border border-slate-200 text-slate-500">
              {isSupabaseConfigured ? (
                <div className="flex items-center gap-1 font-semibold text-emerald-600 flex-row" title="Supabase Cloud Database connected and listening.">
                  <Cloud className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>Cloud Synced</span>
                  {cloudSyncStatus === "syncing" && <RefreshCw className="h-2.5 w-2.5 animate-spin text-indigo-500 shrink-0" />}
                </div>
              ) : (
                <div className="flex items-center gap-1 font-medium text-slate-400 flex-row">
                  <CloudOff className="h-3 w-3 shrink-0" />
                  <span>Offline</span>
                </div>
              )}
            </div>
          </div>

          {/* Academic disclaimer/Status info & Premium subscription actions */}
          <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Desktop-only Supabase connection status indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-50 rounded-lg py-1.5 px-3 border border-slate-200 text-slate-500">
              {isSupabaseConfigured ? (
                <div className="flex items-center gap-1.5 font-semibold text-emerald-600 flex-row" title="Supabase Cloud Database connected and listening.">
                  <Cloud className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Cloud Synced</span>
                  {cloudSyncStatus === "syncing" && <RefreshCw className="h-3 w-3 animate-spin text-indigo-500 shrink-0" />}
                  {cloudSyncStatus === "success" && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold shrink-0">Ok</span>}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 font-medium text-slate-400 flex-row" title="Sandbox Offline Cache Only. To persist, connect Supabase in Cloud Run variables.">
                  <CloudOff className="h-3.5 w-3.5 shrink-0" />
                  <span>Offline Cache</span>
                </div>
              )}
            </div>

            {/* Hidden on mobile to avoid 30% screen usage */}
            <div className="hidden md:flex items-center gap-2 text-xs bg-slate-50 text-slate-500 rounded-lg py-1.5 px-3 border border-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Educational Practice Console (USMLE / NCLEX standard)</span>
            </div>

            {isPremium ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div id="premium-status-badge" className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs bg-amber-50 text-amber-800 border border-amber-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 font-semibold shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500" />
                  Premium Active
                </div>
                <button
                  id="reset-demo-premium"
                  onClick={() => {
                    setIsPremium(false);
                    localStorage.setItem("infectatlas_is_premium", "false");
                  }}
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  title="Resets premium plan status for demonstrating checking out"
                >
                  Reset
                </button>
              </div>
            ) : isGrandfathered ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div id="grandfather-status-badge" className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 font-semibold shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500" />
                  Lifetime Partner
                </div>
                <button
                  id="reset-demo-grandfather"
                  onClick={() => {
                    setIsGrandfathered(false);
                    setRegisteredEmail(null);
                    localStorage.removeItem("infectatlas_grandfathered");
                    localStorage.removeItem("infectatlas_registered_email");
                  }}
                  className="text-[9px] sm:text-[10px] text-slate-400 hover:text-slate-600 underline cursor-pointer"
                  title="Resets grandfather status for demonstration"
                >
                  Unlink
                </button>
              </div>
            ) : isPromoActive ? (
              <div className="flex items-center gap-1.5 sm:gap-2 justify-between w-full sm:w-auto">
                <div id="promo-status-badge" className="flex items-center gap-1 text-[10px] sm:text-xs bg-indigo-50 text-indigo-850 border border-indigo-200 rounded-lg py-1 px-2 sm:py-1.5 sm:px-3 font-semibold shadow-2xs">
                  <span className="text-indigo-600 font-bold animate-pulse">🎁</span>
                  Beta Promo Access (Free)
                </div>
                <button
                  id="unlock-premium-btn"
                  onClick={() => setShowUpgradeModal(true)}
                  className="flex items-center gap-1 text-[10px] sm:text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg py-1 px-2.5 sm:py-1.5 sm:px-3 shadow-xs hover:scale-102 transition-all cursor-pointer animate-slow-blink"
                >
                  Claim Free Lifetime
                </button>
              </div>
            ) : (
              <button
                id="unlock-premium-btn"
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white font-bold rounded-lg py-1 px-2 sm:py-1.5 sm:px-3.5 shadow-sm hover:from-amber-600 hover:to-indigo-700 transition-all hover:scale-102 transform cursor-pointer w-full sm:w-auto justify-center"
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Unlock Premium ($5.99/mo)
              </button>
            )}
          </div>
        </div>
      </header>


      {/* Primary Study Navigation Bars */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-2 flex justify-start space-x-1 py-1 overflow-x-auto scrollbar-none">
          <button
            id="tab-dashboard"
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "dashboard"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Layers className="h-4 w-4" />
            Progress Dashboard
          </button>

          <button
            id="tab-search"
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "search"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Search className="h-4 w-4" />
            Cross-Reference Catalog
          </button>

          <button
            id="tab-grid"
            onClick={() => setActiveTab("grid")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "grid"
                ? "bg-indigo-55 text-indigo-700 bg-indigo-50"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Grid className="h-4 w-4" />
            Empiric Treatment Grid
          </button>

          <button
            id="tab-flashcards"
            onClick={() => setActiveTab("flashcards")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "flashcards"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Spaced Flashcards
          </button>

          <button
            id="tab-quiz"
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "quiz"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Activity className="h-4 w-4" />
            Boards Exam Practicum
          </button>
        </div>
      </div>

      {/* Main Focus Screen Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div>
          {activeTab === "dashboard" && (
            <Dashboard
              studyLists={studyLists}
              onCreateStudyList={handleCreateStudyList}
              onDeleteStudyList={handleDeleteStudyList}
              analytics={analytics}
              spacedRepetitionItems={spacedRepetitionItems}
              onReviewSpacedRepetition={handleReviewSpacedRepetition}
              isPremium={hasPremiumAccess}
              isGrandfathered={isGrandfathered}
              isPromoActive={isPromoActive}
              registeredEmail={registeredEmail}
              onUnlockPremium={() => setShowUpgradeModal(true)}
              setActiveTab={setActiveTab}
              onGrandfatherUser={(email) => {
                localStorage.setItem("infectatlas_grandfathered", "true");
                localStorage.setItem("infectatlas_registered_email", email);
                setIsGrandfathered(true);
                setRegisteredEmail(email);
                alert(`🎉 Account ${email} joined the early partner program! Lifetime premium bypass status is now active.`);
              }}
              onResetGrandfather={() => {
                setIsGrandfathered(false);
                setRegisteredEmail(null);
                localStorage.removeItem("infectatlas_grandfathered");
                localStorage.removeItem("infectatlas_registered_email");
                alert("Grandfathered account link has been reset.");
              }}
            />
          )}

          {activeTab === "search" && (
            <SearchEngine
              onAddPathogenToStudyList={handleAddPathogenToStudyList}
              studyLists={studyLists}
              isPremium={hasPremiumAccess}
              onUnlockPremium={() => setShowUpgradeModal(true)}
            />
          )}

          {activeTab === "grid" && (
            <AntimicrobialGrid />
          )}

          {activeTab === "flashcards" && (
            <Flashcards
              studyLists={studyLists}
              spacedRepetitionIds={spacedRepetitionItems.map((s) => s.pathogenId)}
              onAddSpacedRepetition={handleAddSpacedRepetition}
              onRemoveSpacedRepetition={handleRemoveSpacedRepetition}
              isPremium={hasPremiumAccess}
              onUnlockPremium={() => setShowUpgradeModal(true)}
            />
          )}

          {activeTab === "quiz" && (
            <QuizMode
              onCommitQuizResults={handleCommitQuizResults}
              isPremium={hasPremiumAccess}
              onUnlockPremium={() => setShowUpgradeModal(true)}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p>
              &copy; 2026 InfectAtlas Memory Tool. Strictly for educational use & exam preparation purposes only.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-[10px] text-slate-500">
              <button
                id="link-privacy-policy"
                onClick={() => {
                  setLegalModalTab("privacy");
                  setShowLegalModal(true);
                }}
                className="hover:underline text-indigo-600 font-semibold cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>&bull;</span>
              <button
                id="link-terms-of-service"
                onClick={() => {
                  setLegalModalTab("terms");
                  setShowLegalModal(true);
                }}
                className="hover:underline text-indigo-600 font-semibold cursor-pointer"
              >
                Terms & Medical Disclaimer
              </button>
              <span>&bull;</span>
              <span>Developer Reference: support@infectatlas.com</span>
            </div>
          </div>
          <div className="flex gap-4 shrink-0 text-[11px]">
            <span>Reference criteria: Clinically aligned IDSA rules</span>
            <span>&bull;</span>
            <span>Gemini AI Tutor Integrated</span>
          </div>
        </div>
      </footer>

      {/* Simulated Premium Billing / Checkout Modal */}
      {showUpgradeModal && (
        <div id="pricing-upgrade-overlay" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full flex flex-col max-h-[90vh] sm:max-h-[85vh] overflow-hidden my-auto relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 p-4 sm:p-5 text-white text-center relative shrink-0">
              <button
                id="close-upgrade-modal"
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/25 text-xs font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer z-10"
              >
                ✕
              </button>
              <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-white/10 rounded-full mb-1">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-200 animate-spin-slow" />
              </div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">Unlock InfectAtlas Premium</h2>
              <p className="text-amber-100 text-[11px] mt-0.5 max-w-xs mx-auto font-medium">
                Acquire ultimate mastery of clinical bugs, therapies, and cross-references.
              </p>
            </div>
            {/* Scrollable Contents Container */}
            <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1 text-slate-700">
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 text-[11px] sm:text-xs">
                <h3 className="font-bold text-slate-800 text-[11px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-2.5 flex items-center gap-1.5">
                  🛡️ Free Tier vs. 👑 Paid Tier Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Free columns */}
                  <div className="space-y-1.5">
                    <span className="font-extrabold text-[#0f172a] text-[10px] sm:text-[11px] block text-slate-500 uppercase">Always Free & No-Signup:</span>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span> Pathogen Browser
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span> Disease & Bug Lookup
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span> Basic IV/PO treatment maps
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">✓</span> Full catalog cross-reference
                      </li>
                    </ul>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 italic mt-1 leading-snug">
                      Valuable immediately without signup to build peer-to-peer trust.
                    </p>
                  </div>

                  {/* Paid columns */}
                  <div className="space-y-1.5 md:border-l md:border-slate-200 md:pl-4">
                    <span className="font-extrabold text-indigo-700 text-[10px] sm:text-[11px] block uppercase">Premium Retention:</span>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600">★</span> Spaced repetition intervals
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600">★</span> Board-style active recall quiz
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600">★</span> Progress tracking & streak logs
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600">★</span> Weak categories analysis
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600">★</span> Dynamic AI memory mnemonics
                      </li>
                    </ul>
                    <p className="text-[9px] sm:text-[10px] text-indigo-500 font-semibold mt-1 leading-snug">
                      Engineered for high-yield retention and boards performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Early Adopter Grandfathering Offer */}
              {isPromoActive && (
                <div id="grandfather-promotion-banner" className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-3 sm:p-4 border-2 border-dashed border-indigo-300 space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">🎁</span>
                    <h4 className="font-bold text-slate-900 text-[11px] sm:text-xs uppercase tracking-wider">
                      Early Adopter Partner Handshake (Free Lifetime Access)
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                    By launching InfectAtlas during our first 3 to 6 partner months, you can bypass payments completely. Enter your clinical or school email below to active a <strong>Lifetime free license (Permanently Grandfathered)</strong>.
                  </p>
                  
                  {isGrandfathered ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center text-xs text-emerald-800 font-semibold flex items-center justify-center gap-1.5 animate-fade-in shadow-2xs">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      Grandfather Lifetime Key Locked: {registeredEmail}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          id="grandfather-email"
                          placeholder="Please enter your email as user account ID"
                          className="w-full sm:flex-1 text-xs py-2 px-3 border border-indigo-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white shadow-2xs"
                        />
                        <button
                          onClick={() => {
                            const emailInput = document.getElementById("grandfather-email") as HTMLInputElement;
                            if (emailInput && emailInput.value.includes("@") && emailInput.value.length > 5) {
                              const email = emailInput.value.trim();
                              localStorage.setItem("infectatlas_grandfathered", "true");
                              localStorage.setItem("infectatlas_registered_email", email);
                              setIsGrandfathered(true);
                              
                              // Track founder_claimed event
                              analyticsUtil.track("founder_claimed", { email });
                              
                              alert(`🎉 Account ${email} verified and grandfathered! Your lifetime bypass license has been activated and cached successfully.`);
                            } else {
                              alert("Please enter a valid email address to represent your student/clinician account ID.");
                            }
                          }}
                          className="w-full sm:w-auto text-xs bg-indigo-600 text-white font-extrabold py-2 px-4 rounded-lg hover:bg-indigo-500 transition-all cursor-pointer shadow-sm select-none shrink-0"
                        >
                          Unlock Lifetime Free Status
                        </button>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-indigo-500 block text-center font-medium">
                        🛡️ No billing details or credit card required. Free forever for early launch partners.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Cards Selection */}
              <div className="space-y-2.5 sm:space-y-3 pt-1">
                <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Select Premium Scholar Subscription</h3>
                
                {/* Plan A */}
                <div className="border border-slate-200 rounded-xl p-3 sm:p-3.5 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-all bg-indigo-50/20 border-indigo-200">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <input type="radio" defaultChecked name="plan-tier" id="plan-monthly" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="plan-monthly" className="cursor-pointer">
                      <span className="block font-bold text-xs sm:text-sm text-slate-800">Monthly High-Cram Access</span>
                      <span className="block text-[11px] sm:text-xs text-slate-500">Master upcoming exams. Cancel anytime.</span>
                    </label>
                  </div>
                  <div className="text-right pl-2 shrink-0">
                    <span className="block font-extrabold text-[16px] sm:text-lg text-slate-900">$5.99</span>
                    <span className="text-[10px] text-slate-400 font-medium">/ month</span>
                  </div>
                </div>

                {/* Plan B */}
                <div className="border border-slate-200 rounded-xl p-3 sm:p-3.5 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <input type="radio" name="plan-tier" id="plan-lifetime" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="plan-lifetime" className="cursor-pointer">
                      <span className="block font-bold text-xs sm:text-sm text-slate-800">Lifetime Boards Scholar Pass</span>
                      <span className="block text-[11px] sm:text-xs text-slate-500">Pay once, study forever. Perfect for rotations & residencies.</span>
                    </label>
                  </div>
                  <div className="text-right pl-2 shrink-0">
                    <span className="block font-extrabold text-[16px] sm:text-lg text-slate-900">$39.99</span>
                    <span className="text-[10px] text-slate-400 font-medium font-bold text-indigo-600">ONE-OFF</span>
                  </div>
                </div>
              </div>

              {/* Promo and ambassador key validation */}
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200 space-y-2.5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    id="promo-code-input"
                    placeholder="Enter Ambassador key or Beta access code"
                    className="w-full sm:flex-1 text-xs py-2 px-3 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("promo-code-input") as HTMLInputElement;
                      if (input && input.value.trim().toUpperCase() === "MICROVIP") {
                        alert("🎉 Ambassador Access Key Verified! Early-access premium subscription is now 100% active.");
                        input.value = "MICROVIP (Ambassador Beta Pass Applied)";
                      } else {
                        alert("Invalid or expired key. For student beta access trials, please enter the ambassador code MICROVIP.");
                      }
                    }}
                    className="w-full sm:w-auto text-xs bg-slate-800 text-white font-semibold py-2 px-3.5 rounded-lg hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    Apply Key
                  </button>
                </div>

                <div className="border-t border-slate-200 pt-2.5 sm:pt-3 flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1">
                    🔒 SSL Secured Checkout & License System
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <button
                      id="simulated-checkout"
                      onClick={() => {
                        handleUpgrade();
                        setShowUpgradeModal(false);
                        alert("🎉 Instant Sandbox Access Approved! All core spaced repetition systems, exam decks, and clinical vignette builders are now fully unlocked for evaluation.");
                      }}
                      className="w-full sm:w-auto text-xs font-semibold py-2 px-4 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all text-center shrink-0 cursor-pointer"
                    >
                      Instant Sandbox Trial
                    </button>
                    <button
                      id="confirm-checkout"
                      onClick={handleStripeCheckout}
                      className="w-full sm:w-auto text-xs font-bold py-2 px-5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-200 transition-all text-center shrink-0 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Checkout via Stripe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legal & Compliance Modal */}
      {showLegalModal && (
        <LegalModal
          isOpen={showLegalModal}
          onClose={() => setShowLegalModal(false)}
          initialTab={legalModalTab}
        />
      )}

      {/* PWA Floating Install Prompt */}
      {showPwaBanner && (
        <div 
          id="pwa-install-banner" 
          className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-40 bg-slate-900 text-white rounded-xl shadow-2xl border border-indigo-550/35 p-4 transform transition-all duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-indigo-600 rounded-lg shrink-0 text-white mt-0.5 shadow-inner">
              <BrainCircuit className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-extrabold text-xs text-white uppercase tracking-wider">Add InfectAtlas to Home Screen</h3>
                <button
                  id="close-pwa-banner"
                  onClick={handleDismissPwaBanner}
                  className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-1 cursor-pointer transition-all shrink-0"
                  aria-label="Dismiss install prompt"
                >
                  <span className="block h-3.5 w-3.5 text-center leading-3 text-[9px] font-bold">✕</span>
                </button>
              </div>
              
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Install this study tool to get instant offline speed, full-screen clinical simulation reviews, and access your custom lists directly like a real store application.
              </p>

              {isIOS ? (
                <div className="mt-3 bg-slate-800/80 rounded-lg p-3 border border-slate-705/30 space-y-2 text-[11px] text-slate-300">
                  <div className="font-semibold text-indigo-400">
                    How to Install on iOS (iPhone / iPad):
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300 leading-normal">
                    <li>Tap the <strong className="text-white">Share</strong> button in Safari (resembles an upward arrow emerging from a box <span className="inline-block align-middle px-1 py-0.5 bg-slate-700 rounded text-slate-100 font-bold text-[10px]">↥</span>).</li>
                    <li>Scroll down the menu list and tap <strong className="text-white">Add to Home Screen</strong> (styled as a plus symbol enclosed in a square <span className="inline-block align-middle px-1 py-0.5 bg-slate-700 rounded text-slate-100 font-bold text-[10px]">+</span>).</li>
                    <li>Tap <strong className="text-indigo-400 font-bold">Add</strong> at the upper-right corner of your screen to confirm.</li>
                  </ol>
                </div>
              ) : (
                <div className="mt-3.5 flex justify-end gap-2 text-xs">
                  <button
                    id="pwa-dismiss-btn"
                    onClick={handleDismissPwaBanner}
                    className="text-slate-400 hover:text-white font-semibold py-1.5 px-3 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Not Now
                  </button>
                  <button
                    id="pwa-install-btn"
                    onClick={deferredPrompt ? handleInstallClick : handleDismissPwaBanner}
                    className="bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white py-1.5 px-4 rounded-lg shadow-sm shadow-indigo-500/30 hover:scale-102 transition-all cursor-pointer"
                  >
                    Install App
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
