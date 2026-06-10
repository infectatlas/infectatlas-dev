import { useState, FormEvent, useMemo } from "react";
import { StudyList, PerformanceAnalytics, SpacedRepetitionItem } from "../types";
import { Microorganism, microorganismsData } from "../data/microorganisms";
import { 
  Award, Layers, Plus, Trash2, Calendar, Target, CheckCircle, 
  HelpCircle, BookOpen, Clock, Sparkles, ChevronRight, Zap, 
  GraduationCap, History, BarChart3, Star, ShieldCheck, PlayCircle, LogIn, Play, Flame
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DailyRecallDesk from "./DailyRecallDesk";

interface DashboardProps {
  studyLists: StudyList[];
  onCreateStudyList: (name: string, description: string) => void;
  onDeleteStudyList: (id: string) => void;
  analytics: PerformanceAnalytics;
  spacedRepetitionItems: SpacedRepetitionItem[];
  onReviewSpacedRepetition: (pathogenId: string, gotEasy: boolean, grade?: "forgot" | "partial" | "mastered") => void;
  onAddSpacedRepetition: (pathogenId: string) => void;
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
  onAddSpacedRepetition,
  isPremium = true,
  onUnlockPremium,
  isGrandfathered = false,
  isPromoActive = false,
  registeredEmail = null,
  setActiveTab,
  onGrandfatherUser,
  onResetGrandfather
}: DashboardProps) {
  const [sessionLaunchQueue, setSessionLaunchQueue] = useState<string[] | null>(null);

  const now = new Date();
  const dueItems = useMemo(() => {
    return spacedRepetitionItems.filter(item => {
      const nextDate = new Date(item.nextReviewDate);
      return nextDate.getTime() <= now.getTime() + 60000; // 1-minute buffer
    });
  }, [spacedRepetitionItems]);

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
      {/* Unified Master Header & Spaced Repetition Workspace Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden" id="dashboard-unified-card">
        {/* Top: Sleek Ultra-Slim Board HUD Section merged seamlessly as header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 pt-4 pb-3 px-3.5 sm:pt-5 sm:pb-3.5 sm:px-5 md:pt-5.5 md:pb-4 md:px-6 text-white overflow-hidden border-b border-slate-800/85">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,var(--color-indigo-500),transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-1 sm:gap-1.5">
            {/* Main heading and stats row */}
            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="space-y-1.5">
                <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white leading-tight sm:leading-snug pr-[105px] xs:pr-[125px] sm:pr-[145px] md:pr-0">
                  <span>Master Infectious Diseases</span>
                  <span className="block sm:inline sm:pl-1 mt-0.5 sm:mt-0">
                    Through <span className="text-indigo-400 bg-linear-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent font-black inline-block">Adaptive Recall</span>
                  </span>
                </h1>
                
                <p className="text-[9px] sm:text-xs text-slate-400 font-semibold leading-normal pr-[105px] xs:pr-[125px] sm:pr-[145px] md:pr-0 whitespace-normal block">
                  Medical Board active memory spacing dashboard
                </p>
              </div>

              <div className="absolute top-0 right-0 md:relative md:top-auto md:right-auto flex flex-col items-end md:flex-row md:items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0 md:mt-0.5">
                {/* Start Recall / Queue Clear Action */}
                {dueItems.length > 0 ? (
                  <button
                    onClick={() => setSessionLaunchQueue(dueItems.map(item => item.pathogenId))}
                    title="Click to launch active recall session"
                    className="text-[9px] sm:text-[10px] md:text-[11px] font-medium px-2 py-1 sm:py-1.5 md:px-3 md:py-1.5 rounded-md uppercase tracking-wider select-none transition-all active:scale-[0.96] duration-150 flex items-center justify-center gap-1.5 border border-rose-500/20 text-rose-300 bg-rose-950/40 hover:bg-rose-900/55 hover:border-rose-500/40 cursor-pointer shadow-xs animate-glow-rose shrink-0"
                  >
                    <Clock className="h-3 w-3 text-rose-300 shrink-0" />
                    <span className="text-slate-300 font-normal"><span className="text-rose-300 font-mono font-normal">{dueItems.length}</span> Due • Start</span>
                  </button>
                ) : (
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-medium px-2 py-1 sm:py-1.5 md:px-3 md:py-1.5 rounded-md uppercase tracking-wider select-none bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 inline-flex items-center justify-center gap-1.5">
                    <Clock className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="font-normal text-emerald-300">✓ Clear</span>
                  </span>
                )}

                {/* Streak Panel */}
                <div className="text-[9px] sm:text-[10px] md:text-[11px] font-medium px-2 py-1 sm:py-1.5 md:px-3 md:py-1.5 rounded-md uppercase tracking-wider select-none bg-slate-950/60 backdrop-blur-md border border-white/10 shrink-0 inline-flex items-center justify-center gap-1.5">
                  <Flame className="h-3 w-3 text-amber-500 shrink-0 fill-amber-500/20" />
                  <span className="text-slate-300 font-normal">Streak •</span>
                  <span className="font-extrabold text-indigo-300 font-mono">{analytics.currentStreak}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal HUD Bar - Arranged in one sleek, clean line on desktop */}
          <div className="hidden sm:flex flex-row items-center justify-between mt-3 text-[10px] tracking-tight text-slate-300 w-full gap-2">
            <div className="flex items-center gap-1.5 font-medium">
              <div className="p-1 bg-indigo-500/15 rounded-md text-indigo-400 shrink-0">
                <Layers className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold tracking-tight">Weak-Area Tracking</span>
            </div>
            <div className="h-3 w-px bg-white/10 shrink-0" />
            <div className="flex items-center gap-1.5 font-medium">
              <div className="p-1 bg-indigo-500/15 rounded-md text-indigo-400 shrink-0">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold tracking-tight font-sans">Spaced Repetition</span>
            </div>
            <div className="h-3 w-px bg-white/10 shrink-0" />
            <div className="flex items-center gap-1.5 font-medium">
              <div className="p-1 bg-indigo-500/15 rounded-md text-indigo-400 shrink-0">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold tracking-tight">Review Scheduling</span>
            </div>
            <div className="h-3 w-px bg-white/10 shrink-0" />
            <div className="flex items-center gap-1.5 font-medium">
              <div className="p-1 bg-indigo-500/15 rounded-md text-indigo-400 shrink-0">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold tracking-tight font-sans">Streak Tracking</span>
            </div>
            <div className="h-3 w-px bg-white/10 shrink-0" />
            <div className="flex items-center gap-1.5 font-medium">
              <div className="p-1 bg-indigo-500/15 rounded-md text-indigo-400 shrink-0">
                <Target className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold tracking-tight">Progress Analytics</span>
            </div>
          </div>
        </div>

        {/* Bottom Panel Dynamic Workspace with Overlay and DailyRecallDesk nested */}
        <div className="relative">
          {/* If not premium, overlay a high-conversion CTA over the lower dashboard widgets */}
          {!isPremium && (
            <div className="absolute inset-0 z-20 bg-slate-50/55 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 border-t border-slate-150">
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

          <div className={!isPremium ? "pointer-events-none select-none max-h-[300px] overflow-hidden brightness-95" : ""}>
            {/* Active Recall Spaced Repetition Desk placed right inside the unified card */}
            <DailyRecallDesk
              spacedRepetitionItems={spacedRepetitionItems}
              studyLists={studyLists}
              onReviewSpacedRepetition={onReviewSpacedRepetition}
              onAddSpacedRepetition={onAddSpacedRepetition}
              isPremium={isPremium}
              onUnlockPremium={onUnlockPremium}
              externalSessionLaunchIds={sessionLaunchQueue}
              onClearExternalSessionLaunch={() => setSessionLaunchQueue(null)}
              isUnified={true}
            />
          </div>
        </div>
      </div>

      {/* Main Split Grid wrapped in premium block if not unlocked */}
      <div className={`pt-4 ${!isPremium ? "pointer-events-none select-none brightness-95 opacity-50" : ""}`}>
          


      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Custom Study Lists */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-150">
              <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Custom Study Lists
              </h2>
              <button
                type="button"
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
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
                <div className="text-center text-slate-400 text-xs p-8 border border-dashed border-slate-100 rounded-xl">
                  No custom lists created. Click **New List** above to organize your exam study focus!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studyLists.map((list) => (
                    <div key={list.id} className="p-3.5 bg-slate-50/50 rounded-xl border border-slate-200 text-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <span className="font-bold text-slate-850 text-xs truncate block">{list.name}</span>
                            {list.description && <p className="text-slate-450 text-[10.5px] leading-snug mt-0.5 line-clamp-2">{list.description}</p>}
                          </div>
                          <button
                            type="button"
                            title="Delete list"
                            onClick={() => onDeleteStudyList(list.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {list.pathogenIds.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5 max-h-24 overflow-y-auto pt-1">
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

                      <div className="mt-4 flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/50">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Microbes</span>
                        <span className="bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                          {list.pathogenIds.length} organisms
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Category Performance Breakdown */}
        <div className="lg:col-span-4 space-y-6">
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
                          {correctPct}% ({stat.correct}/{total})
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
      </div>
      </div>
    </div>
  );
}
