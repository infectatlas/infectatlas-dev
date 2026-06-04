import { useState, FormEvent } from "react";
import { StudyList, PerformanceAnalytics, SpacedRepetitionItem } from "../types";
import { Microorganism, microorganismsData } from "../data/microorganisms";
import { 
  Award, Layers, Plus, Trash2, Calendar, Target, CheckCircle, 
  HelpCircle, BookOpen, Clock, Sparkles, ChevronRight, Zap, 
  GraduationCap, History, BarChart3, Star, ShieldCheck, PlayCircle, LogIn 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DashboardProps {
  studyLists: StudyList[];
  onCreateStudyList: (name: string, description: string) => void;
  onDeleteStudyList: (id: string) => void;
  analytics: PerformanceAnalytics;
  spacedRepetitionItems: SpacedRepetitionItem[];
  onReviewSpacedRepetition: (pathogenId: string, gotEasy: boolean) => void;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
  isGrandfathered?: boolean;
  isPromoActive?: boolean;
  registeredEmail?: string | null;
  setActiveTab?: (tab: "dashboard" | "search" | "flashcards" | "quiz" | "grid") => void;
  onGrandfatherUser?: (email: string) => void;
  onResetGrandfather?: () => void;
}

export default function Dashboard({
  studyLists,
  onCreateStudyList,
  onDeleteStudyList,
  analytics,
  spacedRepetitionItems,
  onReviewSpacedRepetition,
  isPremium = true,
  onUnlockPremium,
  isGrandfathered = false,
  isPromoActive = false,
  registeredEmail = null,
  setActiveTab,
  onGrandfatherUser,
  onResetGrandfather
}: DashboardProps) {
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEngineExpanded, setIsEngineExpanded] = useState(false);
  const [isBannerCollapsed, setIsBannerCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem("microbe_banner_collapsed");
      if (saved !== null) return saved === "true";
    } catch (e) {
      // Ignore
    }
    // Default to collapsed on mobile/small screens, open on tablet/desktop
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const handleToggleBanner = () => {
    const nextState = !isBannerCollapsed;
    setIsBannerCollapsed(nextState);
    try {
      localStorage.setItem("microbe_banner_collapsed", String(nextState));
    } catch (e) {
      // ignore
    }
  };

  // Active Spaced Repetition cards (due or in queue)
  const sortedSRItems = [...spacedRepetitionItems].sort(
    (a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime()
  );

  // Total questions overall
  const accuracy = analytics.totalQuestionsAnswered > 0
    ? Math.round((analytics.totalCorrect / analytics.totalQuestionsAnswered) * 100)
    : 0;

  // Compute breakdown of categories
  const categoryKeys = Object.keys(analytics.questionsPerCategory);

  const handleCreateListSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    onCreateStudyList(newListName, newListDesc);
    setNewListName("");
    setNewListDesc("");
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6" id="dashboard-root">
      {/* Redesigned Brand Hero Section focused on Adaptive Recall */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-4 sm:py-4.5 sm:px-6 md:py-5 md:px-7 text-white shadow-md overflow-hidden border border-slate-800">
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 bg-[radial-gradient(circle_at_bottom_right,var(--color-indigo-500),transparent)] pointer-events-none" />
        <div className="absolute left-12 top-0 w-64 h-64 opacity-5 bg-[radial-gradient(circle_at_top_left,var(--color-violet-500),transparent)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 md:gap-6">
          <div className="w-full md:max-w-lg lg:max-w-xl space-y-1.5 sm:space-y-2">
            <span className="inline-flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 border border-indigo-400/20 px-2 py-0.5 rounded-full shrink-0">
              <Sparkles className="h-2.5 w-2.5 text-indigo-400 animate-pulse" />
              Empiric Medicine Study Engine
            </span>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-snug">
              Master Infectious Diseases Through <span className="text-indigo-400 bg-linear-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">Adaptive Recall</span>
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed max-w-lg font-normal line-clamp-2">
              Track weak pathogens, reinforce forgotten treatments, and build long-term retention with a personalized learning engine. Designed specifically for medical board exams and pharmacy rotations.
            </p>

            <div className="flex flex-row flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab?.("search")}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-indigo-600 hover:bg-indigo-550 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md transition-all shadow-md shadow-indigo-950/40 transform hover:scale-101 cursor-pointer"
              >
                <PlayCircle className="h-3 w-3" />
                Start Learning
              </button>
              <button
                type="button"
                onClick={() => setActiveTab?.("quiz")}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md transition-all border border-white/10 cursor-pointer"
              >
                <Zap className="h-3 w-3 text-amber-400" />
                Take a Quiz
              </button>
            </div>
          </div>

          {/* Combined compact metrics shown side-by-side or stacked on desktop; hidden on mobile since they are visual duplicates of the dashboard cards immediately below */}
          <div className="hidden md:flex items-center gap-4 bg-slate-900/40 backdrop-blur-md rounded-lg p-3 border border-white/5 shrink-0 select-none">
            <div className="text-center px-1.5">
              <span className="text-indigo-300 font-extrabold block text-lg transform hover:scale-110 transition-transform">{analytics.currentStreak} 🔥</span>
              <span className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold">Streak</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="text-center px-1.5">
              <span className="text-emerald-400 font-extrabold block text-lg transform hover:scale-110 transition-transform">{accuracy}%</span>
              <span className="text-[8px] text-slate-400 uppercase tracking-widest font-semibold">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Horizontal Trust Indicators Row - Hidden on mobile to maximize vertical space density */}
        <div className="hidden sm:grid mt-4 pt-3.5 border-t border-white/5 grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="p-0.5 bg-indigo-500/10 rounded-sm text-indigo-400">
              <Calendar className="h-3 w-3" />
            </div>
            <span className="font-semibold tracking-tight">Personalized Review Scheduling</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="p-0.5 bg-indigo-500/10 rounded-sm text-indigo-400">
              <Target className="h-3 w-3" />
            </div>
            <span className="font-semibold tracking-tight">Pathogen Mastery Tracking</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="p-0.5 bg-indigo-500/10 rounded-sm text-indigo-400">
              <Award className="h-3 w-3" />
            </div>
            <span className="font-semibold tracking-tight font-sans">Clinical Quiz Engine</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <div className="p-0.5 bg-indigo-500/10 rounded-sm text-indigo-400">
              <History className="h-3 w-3" />
            </div>
            <span className="font-semibold tracking-tight">Progress History Logs</span>
          </div>
        </div>
      </div>

      {/* Your Study Engine section detailing custom services */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs transition-all duration-300">
        <button
          onClick={() => setIsEngineExpanded(!isEngineExpanded)}
          className="w-full flex items-center justify-between text-left cursor-pointer group focus:outline-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight font-sans flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              InfectAtlas Study Engine
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              Active: 5 intelligence modules tracking your clinical mastery
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold group-hover:text-indigo-800 transition-colors">
            <span>{isEngineExpanded ? "Collapse Details" : "How it Works"}</span>
            <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-300 ${isEngineExpanded ? "rotate-90" : ""}`} />
          </div>
        </button>

        {isEngineExpanded ? (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Our background scheduler automatically maps your diagnostic strengths and weaknesses behind the scenes to lock in active recall memory:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1.5 text-left">
                <Layers className="h-4 w-4 text-indigo-600" />
                <h4 className="font-bold text-slate-800 text-[11px]">Weak-Area Tracking</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Monitors taxonomic scores to pinpoint precisely where you need focus.
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1.5 text-left">
                <Clock className="h-4 w-4 text-emerald-600" />
                <h4 className="font-bold text-slate-800 text-[11px]">Spaced Repetition</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Exposes you to challenging bugs right before you naturally forget.
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1.5 text-left">
                <Calendar className="h-4 w-4 text-amber-600" />
                <h4 className="font-bold text-slate-800 text-[11px]">Review Scheduling</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Builds a customized due queue in optimal intervals.
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1.5 text-left">
                <Zap className="h-4 w-4 text-orange-600" />
                <h4 className="font-bold text-slate-800 text-[11px]">Streak Tracking</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Maintains momentum through visual habit counters.
                </p>
              </div>

              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 space-y-1.5 text-left">
                <Target className="h-4 w-4 text-rose-500" />
                <h4 className="font-bold text-slate-800 text-[11px]">Progress Analytics</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Visualizes accuracy indexes and missed queries.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100/60">
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              <Layers className="h-3 w-3 text-indigo-500 shrink-0" /> Weak-Area Tracking
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              <Clock className="h-3 w-3 text-emerald-500 shrink-0" /> Spaced Repetition
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              <Calendar className="h-3 w-3 text-amber-500 shrink-0" /> Review Scheduling
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              <Zap className="h-3 w-3 text-orange-500 shrink-0" /> Streak Tracking
            </span>
            <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-150 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-lg">
              <Target className="h-3 w-3 text-rose-500 shrink-0" /> Progress Analytics
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        {/* If not premium, overlay a high-conversion CTA over the lower dashboard widgets */}
        {!isPremium && (
          <div className="absolute inset-0 z-20 bg-slate-50/55 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center text-center p-6">
            <div className="max-w-md bg-white p-7 rounded-3xl border border-slate-200 shadow-2xl space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-500 rounded-full animate-pulse">
                <Clock className="h-7 w-7 text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-sans">👑 Scholar Progress & Repetition Systems Locked</h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Unlock active review desks, custom board focal lists, spaced repetition scheduling, and diagnostic category bars to maximize your clinical exam results.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onUnlockPremium}
                  className="w-full text-xs font-bold py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-150 transition-all transform hover:scale-101 cursor-pointer"
                >
                  Unlock Premium Access ($5.99/mo)
                </button>
                <span className="text-[9px] text-slate-400 mt-2 block font-medium">
                  Free Reference tools (Browser, Lookup, and maps) remain fully open.
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={`space-y-8 ${!isPremium ? "pointer-events-none select-none max-h-[380px] overflow-hidden rounded-2xl brightness-95" : ""}`}>
          
          {/* Dashboard Preview Cards displaying real progress details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Review Queue Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Review Queue</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {sortedSRItems.filter(item => new Date(item.nextReviewDate).getTime() <= Date.now() + 60000).length} Due Cards
                  </h4>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>{sortedSRItems.length} active review cards</span>
                <button
                  type="button" 
                  onClick={() => setActiveTab?.("flashcards")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  Study Drills <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* 2. Weak Areas Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-sans">Focus Targets</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5 truncate max-w-[150px]">
                    {categoryKeys.length > 0 
                      ? [...categoryKeys].sort((a,b) => {
                          const scoreA = analytics.questionsPerCategory[a].correct / (analytics.questionsPerCategory[a].correct + analytics.questionsPerCategory[a].incorrect || 1);
                          const scoreB = analytics.questionsPerCategory[b].correct / (analytics.questionsPerCategory[b].correct + analytics.questionsPerCategory[b].incorrect || 1);
                          return scoreA - scoreB;
                        })[0]
                      : "Tuning..."}
                  </h4>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Lowest taxonomic group</span>
                <button 
                  type="button"
                  onClick={() => setActiveTab?.("quiz")}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  Train Now <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* 3. Study Streak Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Study Streak</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {analytics.currentStreak} Days
                  </h4>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>{analytics.currentStreak > 0 ? "Momentum active 🔥" : "Start a daily routine"}</span>
                <button 
                  type="button"
                  onClick={() => setActiveTab?.("quiz")}
                  className="text-xs text-amber-600 hover:text-amber-800 font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  Test Skills <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* 4. Mastery Progress Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-2xs gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Progress Score</span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                    {accuracy}% Accurate
                  </h4>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>{analytics.totalQuestionsAnswered} questions total</span>
                <span className="text-xs text-slate-400 font-semibold font-mono">
                  {analytics.totalCorrect}/{analytics.totalQuestionsAnswered}
                </span>
              </div>
            </div>
          </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Spaced Repetition Items & Category Breakdown */}
        <div className="lg:col-span-8 space-y-6">
          {/* Spaced Repetition Quick Deck */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center pb-4 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Active Spaced Repetition Review Deck</h2>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                {sortedSRItems.length} active tracker cards
              </span>
            </div>

            {/* List of active SRS cards */}
            <div className="divide-y divide-slate-100 text-sm mt-2">
              {sortedSRItems.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No tracking cards in Spaced Repetition. Study via **Flashcards Mode** or complete a **Quiz Test**, then tag items to review them here!
                </div>
              ) : (
                sortedSRItems.slice(0, 5).map((item) => {
                  const microbe = microorganismsData.find(m => m.id === item.pathogenId);
                  if (!microbe) return null;
                  const isDue = new Date(item.nextReviewDate).getTime() <= Date.now() + 60000;

                  return (
                    <div key={item.pathogenId} className="py-3 flex flex-wrap justify-between items-center gap-3">
                      <div>
                        <h4 className="font-semibold text-slate-900 italic">{microbe.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span>Interval: {item.intervalDays}d</span>
                          <span>&bull;</span>
                          <span className={isDue ? "text-rose-500 font-semibold" : "text-emerald-600"}>
                            {isDue ? "🚨 Due Now" : `Next review: ${new Date(item.nextReviewDate).toLocaleDateString()}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onReviewSpacedRepetition(item.pathogenId, false)}
                          className="bg-rose-50 text-rose-700 text-xs hover:bg-rose-100 font-semibold px-2.5 py-1 rounded-md transition-colors border border-rose-200/50"
                        >
                          Hard / Repeat
                        </button>
                        <button
                          onClick={() => onReviewSpacedRepetition(item.pathogenId, true)}
                          className="bg-emerald-50 text-emerald-700 text-xs hover:bg-emerald-100 font-semibold px-2.5 py-1 rounded-md transition-colors border border-emerald-200/50"
                        >
                          Easy / Mastered
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {sortedSRItems.length > 5 && (
              <p className="text-center text-[11px] text-slate-400 italic pt-2.5 border-t border-slate-100 mt-2">
                Showing top 5 cards. Total card inventory is {sortedSRItems.length}.
              </p>
            )}
          </div>

          {/* Core Categories Strengths & Weaknesses */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="pb-3 border-b border-slate-150">
              <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-600" />
                Category Performance Breakdown
              </h2>
            </div>
            {categoryKeys.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Complete dynamic quizzes to gather performance data and identify weak taxonomic categories.
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                {categoryKeys.map((key) => {
                  const stat = analytics.questionsPerCategory[key];
                  const total = stat.correct + stat.incorrect;
                  const correctPct = total > 0 ? Math.round((stat.correct / total) * 100) : 0;

                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{key}</span>
                        <span>
                          {correctPct}% ({stat.correct}/{total} hits)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            correctPct >= 75
                              ? "bg-emerald-500"
                              : correctPct >= 45
                              ? "bg-amber-500"
                              : "bg-rose-500"
                          }`}
                          style={{ width: `${correctPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Study List Creator & My Custom Lists */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-150">
              <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Custom Study Lists
              </h2>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> New List
              </button>
            </div>

            {/* Create Study List Form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateListSubmit}
                  className="space-y-3 bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/50 my-2 text-xs overflow-hidden"
                >
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">List Name</label>
                    <input
                      title="List name input"
                      type="text"
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                      placeholder="e.g. Gram-Negative Bacteremia"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      title="List description input"
                      className="w-full bg-white border border-slate-200 rounded-md p-1.5 focus:outline-hidden"
                      placeholder="High-yield microbes for block exam #1"
                      value={newListDesc}
                      onChange={(e) => setNewListDesc(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="text-slate-400 hover:text-slate-600 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1 rounded-md transition-colors"
                    >
                      Create
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* List details */}
            <div className="space-y-3 mt-3">
              {studyLists.length === 0 ? (
                <div className="text-center text-slate-400 text-xs p-6 border border-dashed border-slate-100 rounded-xl">
                  No custom lists created. Click **New List** above to organize your exam study focus!
                </div>
              ) : (
                studyLists.map((list) => (
                  <div key={list.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-slate-800">{list.name}</span>
                        {list.description && <p className="text-slate-500 text-[11px] mt-0.5">{list.description}</p>}
                      </div>
                      <button
                        title="Delete list"
                        onClick={() => onDeleteStudyList(list.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-2.5 flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/50">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Microbes:</span>
                      <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-0.5 rounded-md text-[10px]">
                        {list.pathogenIds.length} organisms
                      </span>
                    </div>

                    {list.pathogenIds.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 max-h-20 overflow-y-auto pt-1">
                        {list.pathogenIds.map((pid) => {
                          const name = microorganismsData.find(m => m.id === pid)?.name || pid;
                          return (
                            <span key={pid} className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.5 rounded-md font-medium italic">
                              {name.split(" ")[1] ? `${name.charAt(0)}. ${name.split(" ")[1]}` : name}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {list.pathogenIds.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic mt-2.5">
                        Add pathogens to this list from the **Cross-Reference** tab catalog.
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
