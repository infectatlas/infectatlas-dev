import { useState, useEffect } from "react";
import { StudyList, PerformanceAnalytics, SpacedRepetitionItem } from "./types";
import { microorganismsData } from "./data/microorganisms";
import Dashboard from "./components/Dashboard";
import SearchEngine from "./components/SearchEngine";
import Flashcards from "./components/Flashcards";
import QuizMode from "./components/QuizMode";
import AntimicrobialGrid from "./components/AntimicrobialGrid";
import LegalModal from "./components/LegalModal";
import LandingPage from "./components/LandingPage";
import MarketingLandingPage from "./components/MarketingLandingPage";
import LegalPage from "./components/LegalPage";
import OrganismsSEO from "./components/OrganismsSEO";
import DiseasesSEO from "./components/DiseasesSEO";
import DrugsSEO from "./components/DrugsSEO";
import ComparisonsSEO, { COMPARISONS_DATA } from "./components/ComparisonsSEO";
import HowItWorksPage from "./components/HowItWorks";
import { isSupabaseConfigured, syncUserDataToCloud } from "./lib/supabase";
import { Search, BrainCircuit, Activity, BookOpen, Layers, Award, Grid, Sparkles, ShieldCheck, CheckCircle, Database, Cloud, CloudOff, RefreshCw, X } from "lucide-react";
import { analytics as analyticsUtil } from "./utils/analytics";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";

// Initial system list presets for healthcare students (InfectAtlas rev)
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
  return (
    <BrowserRouter>
      <InnerApp />
    </BrowserRouter>
  );
}

function InnerApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith("/app/guide")) return "landing";
    if (path.startsWith("/app/dashboard")) return "dashboard";
    if (path.startsWith("/app/search")) return "search";
    if (path.startsWith("/app/grid")) return "grid";
    if (path.startsWith("/app/flashcards")) return "flashcards";
    if (path.startsWith("/app/quiz")) return "quiz";
    return "dashboard"; // default for /app or anything else in /app/*
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab: "landing" | "dashboard" | "search" | "flashcards" | "quiz" | "grid") => {
    if (tab === "landing") {
      navigate("/app/guide");
    } else {
      navigate(`/app/${tab}`);
    }
  };

  const handleStartStudying = (tab: "dashboard" | "search" | "flashcards" | "quiz" | "grid") => {
    navigate(`/app/${tab}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Redirect invalid paths to root / or let SEO slugs load cleanly
  useEffect(() => {
    const path = location.pathname.toLowerCase().trim().replace(/\/$/, "");
    const isComparison = path === "/comparisons" || COMPARISONS_DATA.some(c => path === "/" + c.slug);

    if (
      location.pathname !== "/" && 
      !isComparison &&
      location.pathname !== "/how-it-works" &&
      location.pathname !== "/privacy" &&
      location.pathname !== "/terms" &&
      !location.pathname.startsWith("/app") && 
      !location.pathname.startsWith("/organisms") && 
      !location.pathname.startsWith("/diseases") && 
      !location.pathname.startsWith("/drugs")
    ) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  // Technical SEO meta-robots management: block search indexes on study paths
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const isAppPath = path.startsWith("/app") || path.startsWith("/profile") || path.startsWith("/settings");

    let robotsTag = document.querySelector('meta[name="robots"]');
    if (isAppPath) {
      if (!robotsTag) {
        robotsTag = document.createElement("meta");
        robotsTag.setAttribute("name", "robots");
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute("content", "noindex, nofollow");
    } else {
      if (robotsTag) {
        robotsTag.remove();
      }
    }
  }, [location.pathname]);

  // Handle automatic scrolling to the top on any route change to prevent mid-page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Track app opened log on initial load
  useEffect(() => {
    analyticsUtil.track("app_opened");
  }, []);

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaBanner, setShowPwaBanner] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  // Dynamic Smart Header show/hide state on scroll
  const [showHeader, setShowHeader] = useState<boolean>(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If close to top, always show header
      if (currentScrollY < 80) {
        setShowHeader(true);
        lastScrollY = currentScrollY;
        return;
      }
      
      const diff = Math.abs(currentScrollY - lastScrollY);
      if (diff > 12) {
        if (currentScrollY > lastScrollY) {
          setShowHeader(false); // scrolling down
        } else {
          setShowHeader(true); // scrolling up
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Premium Billing states - hardcoded to true for offline full-unlocked local workspace session
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  // Early User Promotional Phases & Grandfathering states
  const [isGrandfathered, setIsGrandfathered] = useState<boolean>(true);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>("scholar.local@infectatlas.org");
  const [isPromoActive, setIsPromoActive] = useState<boolean>(true);

  const [isPromoDismissed, setIsPromoDismissed] = useState<boolean>(true);

  const hasPremiumAccess = true;

  // Legal Modal and compliance states
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<"privacy" | "terms">("privacy");

  const handleUpgrade = () => {
    setIsPremium(true);
  };

  const handleStripeCheckout = async () => {
    alert("🎉 Premium access is fully unlocked locally. Standard Stripe processing is disabled as InfectAtlas runs in a serverless, static architecture.");
    setIsPremium(true);
    setShowUpgradeModal(false);
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

  // Local Backup saving state (replacing Supabase cloud sync)
  const [cloudSyncStatus, setCloudSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const handleCloudSync = async () => {
    setCloudSyncStatus("syncing");
    const result = await syncUserDataToCloud(studyLists, analytics);
    if (result.success) {
      setCloudSyncStatus("success");
      setTimeout(() => setCloudSyncStatus("idle"), 3000);
    } else {
      setCloudSyncStatus("error");
    }
  };

  // Triggers automatic localStorage sync when lists or performance trackers modify
  useEffect(() => {
    if (studyLists.length > 0) {
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

  // Update spaced repetition score rating with optional 3-tier clinical grades
  const handleReviewSpacedRepetition = (pathogenId: string, gotEasy: boolean, grade?: "forgot" | "partial" | "mastered") => {
    const today = new Date();
    const resolvedGrade = grade || (gotEasy ? "mastered" : "forgot");

    const updated = spacedRepetitionItems.map((item) => {
      if (item.pathogenId !== pathogenId) return item;

      let nextInterval = item.intervalDays;
      let nextRepetitions = item.repetitions;
      let nextEF = item.easinessFactor;

      if (resolvedGrade === "mastered") {
        nextRepetitions += 1;
        if (nextRepetitions === 1) nextInterval = 1;
        else if (nextRepetitions === 2) nextInterval = 3;
        else {
          nextInterval = Math.round(nextInterval * nextEF);
        }
        nextEF = Math.min(3.0, nextEF + 0.15);
      } else if (resolvedGrade === "partial") {
        nextRepetitions = Math.max(1, nextRepetitions);
        nextInterval = 2; // Scheduled very close
        nextEF = Math.max(1.3, nextEF - 0.05);
      } else {
        // Forgot
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

  if (location.pathname === "/") {
    return <MarketingLandingPage />;
  }

  if (location.pathname === "/how-it-works") {
    return <HowItWorksPage />;
  }

  if (location.pathname === "/privacy") {
    return <LegalPage initialTab="privacy" />;
  }

  if (location.pathname === "/terms") {
    return <LegalPage initialTab="terms" />;
  }

  const cleanPath = location.pathname.toLowerCase().trim().replace(/\/$/, "");
  const isComparisonPath = cleanPath === "/comparisons" || COMPARISONS_DATA.some(c => cleanPath === "/" + c.slug);

  if (isComparisonPath) {
    return <ComparisonsSEO />;
  }

  if (location.pathname.startsWith("/organisms")) {
    return <OrganismsSEO />;
  }

  if (location.pathname.startsWith("/diseases")) {
    return <DiseasesSEO />;
  }

  if (location.pathname.startsWith("/drugs")) {
    return <DrugsSEO />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans" id="app-viewport">
      {/* Principal Academic Header */}
      <header className={`bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs transition-transform duration-300 ease-in-out ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-7xl mx-auto px-3 py-2.5 sm:px-4 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => handleTabChange("dashboard")}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-hidden"
              title="Go to Progress Dashboard"
            >
              <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm group-hover:bg-indigo-700 transition-colors shrink-0">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight block leading-none group-hover:text-indigo-600 transition-colors col-span-full">InfectAtlas</h1>
                <span className="text-[9px] sm:text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-1 leading-none">
                  Medical Microorganism Study Tool
                </span>
              </div>
            </button>

            {/* Compact Local Sync Indicator always visible on mobile beside title to save vertical stack space */}
            <div className="flex sm:hidden items-center gap-1 text-[10px] bg-emerald-50 rounded-lg py-1 px-2 border border-emerald-100 text-emerald-700">
              <div className="flex items-center gap-1 font-semibold text-emerald-600 flex-row" title="Local persistent backup database is connected.">
                <Database className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>Offline Active</span>
                {cloudSyncStatus === "syncing" && <RefreshCw className="h-2.5 w-2.5 animate-spin text-emerald-500 shrink-0" />}
              </div>
            </div>
          </div>

          {/* Academic disclaimer/Status info & Premium subscription actions */}
          <div className="flex flex-row flex-wrap items-center gap-1.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Desktop-only Local connection status indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs bg-emerald-50 rounded-lg py-1.5 px-3 border border-emerald-100 text-emerald-700">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 flex-row" title="Persistent Web Storage connected.">
                <Database className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>LocalDB Backup</span>
                {cloudSyncStatus === "syncing" && <RefreshCw className="h-3 w-3 animate-spin text-emerald-500 shrink-0" />}
                {cloudSyncStatus === "success" && <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold shrink-0">Saved</span>}
              </div>
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
            id="tab-landing"
            onClick={() => handleTabChange("landing")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "landing"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="h-4 w-4 text-indigo-500" />
            Guide & Overview
          </button>

          <button
            id="tab-dashboard"
            onClick={() => handleTabChange("dashboard")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "dashboard"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Layers className="h-4 w-4" />
            Progress Dashboard
          </button>

          <button
            id="tab-search"
            onClick={() => handleTabChange("search")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "search"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Search className="h-4 w-4" />
            Cross-Reference Catalog
          </button>

          <button
            id="tab-grid"
            onClick={() => handleTabChange("grid")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "grid"
                ? "bg-indigo-55 text-indigo-700 bg-indigo-55 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Grid className="h-4 w-4" />
            Empiric Treatment Grid
          </button>

          <button
            id="tab-flashcards"
            onClick={() => handleTabChange("flashcards")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "flashcards"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Spaced Flashcards
          </button>

          <button
            id="tab-quiz"
            onClick={() => handleTabChange("quiz")}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all shrink-0 ${
              activeTab === "quiz"
                ? "bg-indigo-50 text-indigo-700 font-bold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            <Activity className="h-4 w-4" />
            Boards Exam Practicum
          </button>

          <div className="flex-1" />

          <a
            href="/organisms"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-150 border border-indigo-100 rounded-lg transition-all shrink-0 font-sans cursor-pointer shadow-3xs"
          >
            📚 Reference Library
          </a>
        </div>
      </div>

      {/* Main Focus Screen Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div>
          {activeTab === "landing" && (
            <LandingPage onStartStudying={handleStartStudying} />
          )}

          {activeTab === "dashboard" && (
            <Dashboard
              studyLists={studyLists}
              onCreateStudyList={handleCreateStudyList}
              onDeleteStudyList={handleDeleteStudyList}
              analytics={analytics}
              spacedRepetitionItems={spacedRepetitionItems}
              onReviewSpacedRepetition={handleReviewSpacedRepetition}
              onAddSpacedRepetition={handleAddSpacedRepetition}
              isPremium={hasPremiumAccess}
              isGrandfathered={isGrandfathered}
              isPromoActive={isPromoActive}
              registeredEmail={registeredEmail}
              onUnlockPremium={() => setShowUpgradeModal(true)}
              setActiveTab={handleTabChange}
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
            <span>Gemini AI Quiz Integrated</span>
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
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-slate-700">
              <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <span>🛡️</span> Free Tier vs. Paid Tier Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Free columns */}
                  <div className="space-y-2">
                    <span className="font-extrabold text-[11px] sm:text-xs block text-slate-550 uppercase tracking-wide">Always Free & No-Signup:</span>
                    <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-extrabold">✓</span> Pathogen Browser
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-extrabold">✓</span> Disease & Bug Lookup
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-extrabold">✓</span> Basic IV/PO treatment maps
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-extrabold">✓</span> Full catalog cross-reference
                      </li>
                    </ul>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 italic mt-1 leading-normal">
                      Valuable immediately without signup to build peer-to-peer trust.
                    </p>
                  </div>

                  {/* Paid columns */}
                  <div className="space-y-2 md:border-l md:border-slate-200 md:pl-5">
                    <span className="font-extrabold text-indigo-700 text-[11px] sm:text-xs block uppercase tracking-wide">Premium Retention:</span>
                    <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-600">
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600 font-extrabold">★</span> Spaced repetition intervals
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600 font-extrabold">★</span> Board-style active recall quiz
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600 font-extrabold">★</span> Progress tracking & streak logs
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600 font-extrabold">★</span> Weak categories analysis
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-600 font-extrabold">★</span> Dynamic AI Board Vignettes
                      </li>
                    </ul>
                    <p className="text-[10px] sm:text-[11px] text-indigo-600 font-bold mt-1 leading-normal">
                      Engineered for high-yield retention and boards performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Early Adopter Grandfathering Offer */}
              {isPromoActive && (
                <div id="grandfather-promotion-banner" className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-4 sm:p-5 border border-dashed border-indigo-350 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📚</span>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                      InfectAtlas is currently in open study mode.
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-normal font-medium">
                    All features are available for free during early access.
                  </p>
                  
                  <div className="bg-white/60 rounded-xl p-3 text-[11px] sm:text-xs text-slate-700 space-y-2 border border-indigo-100">
                    <div className="font-extrabold text-[11px] sm:text-xs uppercase tracking-wide text-slate-500">We are currently improving:</div>
                    <ul className="space-y-1.5 text-slate-600 pl-0.5">
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-500 font-extrabold">•</span> AI clinical case generation
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-500 font-extrabold">•</span> board-style question quality
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <span className="text-indigo-500 font-extrabold">•</span> learning system feedback
                      </li>
                    </ul>
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-indigo-700 font-extrabold text-center bg-indigo-50 py-2 px-4 rounded-xl border border-indigo-100 uppercase tracking-widest mt-1">
                    No payment required.
                  </div>
                </div>
              )}

              {/* Pricing Cards Selection - Simplified for local scholar session */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-6 text-center space-y-3">
                <div className="inline-flex items-center justify-center p-2.5 bg-emerald-100 text-emerald-800 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">Premium Active & Fully Unlocked</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  InfectAtlas is now running in <strong>Local Scholar Mode</strong>. All board exam vignette generators, active recall flashcards, and weak-area trackers are 100% unlocked offline.
                </p>
                <div className="pt-1.5">
                  <button
                    onClick={() => {
                      setIsPremium(true);
                      setShowUpgradeModal(false);
                    }}
                    className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    Continue Studying Setup
                  </button>
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
