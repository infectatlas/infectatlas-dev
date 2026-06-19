import { useState, useMemo, useRef, useEffect } from "react";
import { SpacedRepetitionItem, StudyList } from "../types";
import { microorganismsData, Microorganism } from "../data/microorganisms";
import { 
  BrainCircuit, Sparkles, Clock, Calendar, CheckCircle2, ChevronRight, 
  RotateCw, Plus, Zap, Award, BookOpen, Layers, Play, Check, AlertCircle, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { diseasesData } from "../data/diseases";
import { drugsData } from "../data/drugs";

const getPathogenSlug = (name: string): string => {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

interface DailyRecallDeskProps {
  spacedRepetitionItems: SpacedRepetitionItem[];
  studyLists: StudyList[];
  onReviewSpacedRepetition: (pathogenId: string, gotEasy: boolean, grade?: "forgot" | "partial" | "mastered") => void;
  onAddSpacedRepetition: (pathogenId: string) => void;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
  externalSessionLaunchIds?: string[] | null;
  onClearExternalSessionLaunch?: () => void;
  isUnified?: boolean;
}

export default function DailyRecallDesk({
  spacedRepetitionItems,
  studyLists,
  onReviewSpacedRepetition,
  onAddSpacedRepetition,
  isPremium = true,
  onUnlockPremium,
  externalSessionLaunchIds = null,
  onClearExternalSessionLaunch,
  isUnified = false
}: DailyRecallDeskProps) {
  // Session Active states
  const [sessionQueue, setSessionQueue] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [sessionState, setSessionState] = useState<"idle" | "expose" | "reveal" | "complete">("idle");
  const [isTheaterScrolled, setIsTheaterScrolled] = useState(false);
  const theaterScrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top of the content and restore header visibility on card progression or state flips
  useEffect(() => {
    if (theaterScrollRef.current) {
      theaterScrollRef.current.scrollTop = 0;
    }
    setIsTheaterScrolled(false);
  }, [activeIndex, sessionState]);
  
  // Session stats tracked during play
  const [stats, setStats] = useState({
    forgot: 0,
    partial: 0,
    mastered: 0
  });

  // Calculate due items
  const now = new Date();
  const dueItems = useMemo(() => {
    return spacedRepetitionItems.filter(item => {
      const nextDate = new Date(item.nextReviewDate);
      return nextDate.getTime() <= now.getTime() + 60000; // 1-minute buffer
    });
  }, [spacedRepetitionItems, sessionState]); // update when session resets or items list updates

  // Find non-due tracking items if they want to review ahead
  const trackingButNotDueItems = useMemo(() => {
    return spacedRepetitionItems.filter(item => {
      const nextDate = new Date(item.nextReviewDate);
      return nextDate.getTime() > now.getTime() + 60000;
    });
  }, [spacedRepetitionItems]);

  // Launch Session of specific items
  const startSession = (pathogenIds: string[]) => {
    if (pathogenIds.length === 0) return;
    setSessionQueue(pathogenIds);
    setActiveIndex(0);
    setStats({ forgot: 0, partial: 0, mastered: 0 });
    setSessionState("expose");
  };

  // Skip / Quit active session
  const quitSession = () => {
    setSessionState("idle");
    setSessionQueue([]);
  };

  useEffect(() => {
    if (externalSessionLaunchIds && externalSessionLaunchIds.length > 0) {
      startSession(externalSessionLaunchIds);
      if (onClearExternalSessionLaunch) {
        onClearExternalSessionLaunch();
      }
    }
  }, [externalSessionLaunchIds, onClearExternalSessionLaunch]);

  // Perform recall rating review
  const handleRate = (pathogenId: string, grade: "forgot" | "partial" | "mastered") => {
    // 1. Trigger the spacing logic update
    const gotEasy = grade === "mastered";
    onReviewSpacedRepetition(pathogenId, gotEasy, grade);

    // 2. Log performance metrics in local session state
    setStats(prev => ({
      ...prev,
      [grade]: prev[grade] + 1
    }));

    // 3. Cycle to next card
    if (activeIndex + 1 >= sessionQueue.length) {
      setSessionState("complete");
    } else {
      setActiveIndex(prev => prev + 1);
      setSessionState("expose");
    }
  };

  // Hydration Helper: Load random/high-yield bugs instantly to study desk
  const handleHydrateDeskRandom = (count: number = 3) => {
    // Find pathogens not currently tracked in SRS
    const trackedIds = new Set(spacedRepetitionItems.map(item => item.pathogenId));
    const untrackedMicrobes = microorganismsData.filter(m => !trackedIds.has(m.id));

    let selectedIds: string[] = [];
    if (untrackedMicrobes.length > 0) {
      // Shuffle untracked first to provide new exploration
      const shuffled = [...untrackedMicrobes].sort(() => 0.5 - Math.random());
      selectedIds = shuffled.slice(0, count).map(m => m.id);
    } else {
      // If all are tracked, grab any random pathogens
      const shuffledAll = [...microorganismsData].sort(() => 0.5 - Math.random());
      selectedIds = shuffledAll.slice(0, count).map(m => m.id);
    }

    // Add them to Spaced Repetition queue
    selectedIds.forEach(id => {
      onAddSpacedRepetition(id);
    });

    // Launch immediately for study
    setTimeout(() => {
      startSession(selectedIds);
    }, 100);
  };

  // Hydrate desk from a specific Study List
  const handleHydrateDeskFromList = (listId: string) => {
    const list = studyLists.find(l => l.id === listId);
    if (!list || list.pathogenIds.length === 0) return;

    // Ensure they are added to spaced repetition items
    const trackedSet = new Set(spacedRepetitionItems.map(item => item.pathogenId));
    list.pathogenIds.forEach(id => {
      if (!trackedSet.has(id)) {
        onAddSpacedRepetition(id);
      }
    });

    // Launch lists session
    setTimeout(() => {
      startSession(list.pathogenIds);
    }, 100);
  };

  // Get active microorganism details
  const activePathogenId = sessionQueue[activeIndex];
  const activeMicrobe = useMemo(() => {
    if (!activePathogenId) return null;
    return microorganismsData.find(m => m.id === activePathogenId) || null;
  }, [activePathogenId]);

  const renderConsoleContent = () => (
    <div className="p-5 space-y-5">
      {dueItems.length === 0 && (
        /* Queue Cleared Success Box */
        <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 text-center space-y-2.5">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100/60 text-emerald-800 rounded-full">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-800">Your Active Recall Queue is Pristine!</h4>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
              Amazing compliance. All spaced repetition pathogen schedules are fully synced. Keep your knowledge sharp by hydrating the desk with additional organisms below.
            </p>
          </div>
        </div>
      )}

      {/* Desk Hydrator Action Console */}
      <div className="border-t border-slate-100 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-700 flex items-center gap-1.5 font-sans">
            <RotateCw className="h-3.5 w-3.5 text-indigo-500" />
            Hydrate Memory Desk & Study Ahead
          </h4>
          <span className="text-[10px] text-slate-400">Simulate practice anytime</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Random hydrate */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex flex-col justify-between text-xs space-y-2.5">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Dynamic Target Picker</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Pulls 3 fresh, high-yield pathogens from the syllabus that are not yet mastered.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleHydrateDeskRandom(3)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 hover:border-indigo-300 font-bold rounded-lg transition-colors text-[10px]"
            >
              <Plus className="h-3 w-3" />
              Load 3 Target Pathogens
            </button>
          </div>

          {/* Lists hydrate */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex flex-col justify-between text-xs space-y-2.5">
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">Load Active Curriculum</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                Feed targets instantly from your custom focal study lists or school presets.
              </p>
            </div>
            
            {studyLists.length > 0 ? (
              <div className="relative group text-[10px]">
                <select
                  title="Select Study List to Study now"
                  className="w-full bg-white border border-slate-200 hover:border-indigo-300 font-semibold rounded-lg py-1.5 px-2.5 text-slate-755 focus:outline-hidden"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleHydrateDeskFromList(e.target.value);
                      e.target.value = ""; // reset
                    }
                  }}
                >
                  <option value="">-- Choose Study List to Load --</option>
                  {studyLists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name} ({list.pathogenIds.length} bugs)
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-[9px] text-slate-400 italic">No custom study lists logged. Create lists in the right panel.</p>
            )}
          </div>
        </div>

        {/* Study Tracker Status list if tracking but not due */}
        {trackingButNotDueItems.length > 0 && (
          <div className="bg-slate-50 rounded-xl border border-slate-150 p-2 text-xs">
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold px-1 pb-1">
              <span>Upcoming Automated Reviews (Future Spacings):</span>
              <span>{trackingButNotDueItems.length} total</span>
            </div>
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
              {trackingButNotDueItems.slice(0, 5).map(item => {
                const name = microorganismsData.find(m => m.id === item.pathogenId)?.name || item.pathogenId;
                const diffInSecs = new Date(item.nextReviewDate).getTime() - Date.now();
                const hoursLeft = Math.max(1, Math.round(diffInSecs / (1000 * 60 * 60)));
                const daysLeft = Math.round(hoursLeft / 24);

                return (
                  <div key={item.pathogenId} className="bg-white p-1.5 rounded-md border border-slate-200/40 flex justify-between items-center text-[11px]">
                    <span className="font-semibold text-slate-755 italic truncate max-w-[170px]">{name}</span>
                    <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                      <span className="font-semibold text-slate-400">Int: {item.intervalDays}d</span>
                      <span className="bg-slate-100 text-slate-505 py-0.5 px-1.5 rounded-full font-bold">
                        {daysLeft >= 1 ? `Due in ${daysLeft}d` : `Due in ${hoursLeft}h`}
                      </span>
                      <button
                        title="Review ahead"
                        type="button"
                        onClick={() => startSession([item.pathogenId])}
                        className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                      >
                        Study
                      </button>
                    </div>
                  </div>
                );
              })}
              {trackingButNotDueItems.length > 5 && (
                <div className="text-center text-[9px] text-slate-400 italic pt-1 text-[9px]">
                  + {trackingButNotDueItems.length - 5} more mapped future reviews
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div id="daily-recall-desk-widget" className={isUnified ? "" : "space-y-6"}>
      {isUnified ? (
        renderConsoleContent()
      ) : (
        /* 1. Main Static Desk Dashboard Card */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Clean Secondary-Card White Header */}
          <div className="px-5 py-4 border-b border-slate-150 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              Adaptive Recall Console
            </h2>
            <span className="text-[10px] text-indigo-505 font-bold uppercase tracking-wider bg-indigo-50 py-0.5 px-2 rounded-md">
              {dueItems.length} Due Today
            </span>
          </div>

          {renderConsoleContent()}
        </div>
      )}

      {/* 2. Focused Theater / Focus Mode Modal Overlay */}
      <AnimatePresence>
        {sessionState !== "idle" && (
          <motion.div
            key="theater-focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-0 sm:p-6 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-2xl bg-white sm:rounded-3xl border-0 sm:border border-slate-200 shadow-2xl flex flex-col relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Theater Mode Header */}
              <motion.div
                initial={false}
                animate={{
                  height: isTheaterScrolled ? 0 : "auto",
                  opacity: isTheaterScrolled ? 0 : 1,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden shrink-0"
              >
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-white">
                    <div className="p-1.5 bg-indigo-500/10 border border-indigo-400/25 text-indigo-400 rounded-lg shrink-0">
                      <BrainCircuit className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400">
                        Adaptive Recall Focus Chamber
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold font-mono">
                        USMLE High-Intent Board Mode
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={quitSession}
                    className="inline-flex items-center gap-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 text-[9px] sm:text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Exit Focus Mode
                  </button>
                </div>
              </motion.div>

              {/* Theater Content States */}
              <div
                ref={theaterScrollRef}
                onScroll={(e) => {
                  const scrollTop = e.currentTarget.scrollTop;
                  setIsTheaterScrolled(scrollTop > 20);
                }}
                className="p-5 sm:p-7 flex-1 overflow-y-auto"
              >
                <AnimatePresence mode="wait">
                  {/* State 2: Expose Stage of active recall session */}
                  {sessionState === "expose" && activeMicrobe && (
                    <motion.div
                      key="expose-state"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {/* Session Stepper */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-semibold font-mono">
                          Organism {activeIndex + 1} of {sessionQueue.length}
                        </span>
                        <div className="w-1/2 h-1.5 bg-slate-150 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                            style={{ width: `${((activeIndex + 1) / sessionQueue.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Microbe Reveal Query Prompt */}
                      <div className="bg-slate-50/70 border-2 border-dashed border-indigo-200 rounded-2xl p-6 md:p-8 text-center space-y-4 relative">
                        <div className="absolute top-3 right-3 text-[10px] uppercase font-bold text-indigo-500 tracking-wider flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                          Testing phase
                        </div>

                        <div className="inline-flex items-center justify-center p-3.5 bg-indigo-50 text-indigo-600 border border-indigo-150 rounded-full mb-1">
                          <BrainCircuit className="h-7 w-7" />
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Identify Pathology Target:</span>
                          <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 italic leading-none">{activeMicrobe.name}</h4>
                        </div>

                        <p className="text-xs text-slate-500 font-sans max-w-md mx-auto leading-relaxed pt-2">
                          Study prompt: Recite the principal Gram staining characteristics, common clinical diseases, first-line treatments (drugs & delivery routes), and USMLE clinical pearls for <strong className="text-slate-800">{activeMicrobe.name}</strong> before revealing.
                        </p>
                      </div>

                    </motion.div>
                  )}

                  {/* State 3: Reveal and Judgment Console */}
                  {sessionState === "reveal" && activeMicrobe && (
                    <motion.div
                      key="reveal-state"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-4"
                    >
                      {/* Session Stepper */}
                      <div className="flex justify-between items-center text-xs pb-1">
                        <span className="text-slate-400 font-semibold font-mono">
                          Evaluation target {activeIndex + 1} of {sessionQueue.length}
                        </span>
                        <span className="font-bold text-indigo-600 uppercase tracking-widest text-[9px]">Comparing details</span>
                      </div>

                      {/* Clean Verification Cards Column */}
                      <div className="space-y-3.5 pr-1">
                        {/* Core Taxonomy Block */}
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 hover:border-slate-300 transition-colors">
                          <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Classification Core</span>
                          <h4 className="font-extrabold text-slate-800 text-xs italic leading-tight">{activeMicrobe.name}</h4>
                          <p className="text-xs text-slate-600 leading-normal">{activeMicrobe.description}</p>
                          
                          {activeMicrobe.characteristics && activeMicrobe.characteristics.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-200 mt-1.5">
                              {activeMicrobe.characteristics.map(char => (
                                <span key={char} className="bg-white text-slate-700 text-[9px] font-semibold border border-slate-200 rounded px-1.5 py-0.5">
                                  {char}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Disease-Treatment Matrix */}
                        <div className="space-y-2">
                          <span className="text-[9px] font-extrabold uppercase text-indigo-500 tracking-wider block">Empiric Treatments Checklist</span>
                          
                          {activeMicrobe.diseases.map(disease => (
                            <div key={disease.id} className="bg-indigo-50/20 rounded-xl p-3 border border-indigo-100/50 space-y-1.5 text-xs text-left">
                              <div className="flex justify-between items-start gap-2">
                                <span className="font-bold text-slate-800">{disease.name}</span>
                                <span className="bg-indigo-55 border border-indigo-105 text-indigo-700 text-[9px] font-bold px-1.5 rounded">
                                  {disease.route}
                                </span>
                              </div>
                              
                              <div className="bg-white px-2 py-1.5 rounded-lg border border-indigo-50/40">
                                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Therapeutic Drugs:</div>
                                <p className="font-bold text-indigo-805 text-[11px] leading-relaxed mt-0.5">{disease.treatment}</p>
                              </div>

                              {disease.clinicalPearl && (
                                <p className="text-[10px] text-slate-500 italic leading-relaxed border-l-2 border-indigo-400 pl-2 mt-1">
                                  <strong>Clinical Pearl:</strong> {disease.clinicalPearl}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Contextual reference links */}
                        {activeMicrobe && (
                          <div className="pt-3 border-t border-slate-200 mt-4 flex flex-wrap gap-2 text-xs text-left">
                            <a
                              href={`/organisms/${getPathogenSlug(activeMicrobe.name)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                            >
                              📚 View full reference article
                            </a>
                            
                            {diseasesData.filter(dis => 
                              activeMicrobe.diseases.some(d => 
                                d.name.toLowerCase().includes(dis.name.toLowerCase()) || 
                                dis.name.toLowerCase().includes(d.name.toLowerCase())
                              )
                            ).slice(0, 1).map(dis => (
                              <a
                                key={dis.id}
                                href={`/diseases/${dis.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                              >
                                📚 Review {dis.name}
                              </a>
                            ))}

                            {drugsData.filter(drug => 
                              activeMicrobe.diseases.some(d => 
                                d.treatment.toLowerCase().includes(drug.name.toLowerCase())
                              )
                            ).slice(0, 1).map(drug => (
                              <a
                                key={drug.id}
                                href={`/drugs/${drug.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white hover:bg-amber-50 border border-amber-100 text-amber-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                              >
                                📚 Drug reference: {drug.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                    </motion.div>
                  )}

                  {/* State 4: Study session evaluation summary complete */}
                  {sessionState === "complete" && (
                    <motion.div
                      key="complete-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="text-center space-y-6 py-4"
                    >
                      <div className="inline-flex items-center justify-center p-3.5 bg-indigo-50 border border-indigo-150 text-indigo-600 rounded-full animate-bounce">
                        <Award className="h-8 w-8 text-indigo-600" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight font-sans">
                          Daily Recall Desk Cycle Complete!
                        </h3>
                        <p className="text-xs text-slate-500 leading-normal max-w-sm mx-auto">
                          Excellent clinical active recall session. Your memory decay rates have updated in our database.
                        </p>
                      </div>

                      {/* Performance Analytics metrics column */}
                      <div className="max-w-xs mx-auto grid grid-cols-1 gap-2.5 text-xs text-left">
                        {/* Mastered element */}
                        <div className="bg-emerald-50 border border-emerald-100 p-2 px-3 rounded-lg flex justify-between items-center text-emerald-800 font-semibold text-xs gap-2">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span className="truncate">Organisms Mastered:</span>
                          </span>
                          <span className="bg-emerald-100 px-2 py-0.5 rounded-md font-bold shrink-0">{stats.mastered}</span>
                        </div>
                        {/* Partial recall element */}
                        <div className="bg-amber-50 border border-amber-100 p-2 px-3 rounded-lg flex justify-between items-center text-amber-800 font-semibold text-xs gap-2">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                            <span className="truncate">Partial Recall (Upcoming):</span>
                          </span>
                          <span className="bg-amber-100 px-2 py-0.5 rounded-md font-bold shrink-0">{stats.partial}</span>
                        </div>
                        {/* Forgot elements */}
                        <div className="bg-rose-50 border border-rose-100 p-2 px-3 rounded-lg flex justify-between items-center text-rose-800 font-semibold text-xs gap-2">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <X className="h-4 w-4 text-rose-600 shrink-0" />
                            <span className="truncate">Forgotten (Immediate):</span>
                          </span>
                          <span className="bg-rose-100 px-2 py-0.5 rounded-md font-bold shrink-0">{stats.forgot}</span>
                        </div>
                      </div>

                      {/* CTA action buttons */}
                      <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto pt-2">
                        <button
                          onClick={() => setSessionState("idle")}
                          className="w-full sm:w-1/2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 font-bold rounded-lg transition-colors text-xs cursor-pointer font-sans"
                        >
                          Return to Dashboard
                        </button>
                        <button
                          onClick={() => {
                            // Rehydrate Random Session instantly to review more
                            handleHydrateDeskRandom(3);
                          }}
                          className="w-full sm:w-1/2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-lg shadow-sm transition-transform cursor-pointer text-xs"
                        >
                          Keep Reviewing Fresh Bugs
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pin Action Footer to the Absolute Bottom */}
              {(sessionState === "expose" || sessionState === "reveal") && activeMicrobe && (
                <div className="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/70 shrink-0">
                  {sessionState === "expose" && (
                    <button
                      onClick={() => setSessionState("reveal")}
                      className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.985] text-white font-extrabold text-xs py-3 rounded-xl shadow-md cursor-pointer transition-all"
                    >
                      Expose Therapy Model & Verify Answers
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {sessionState === "reveal" && (
                    <div className="space-y-3">
                      <div className="text-center">
                        <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest block">How was your recall?</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {/* Got wrong/Forgot */}
                        <button
                          type="button"
                          onClick={() => handleRate(activeMicrobe.id, "forgot")}
                          className="bg-rose-50 hover:bg-rose-100/90 active:scale-[0.985] text-rose-700 border border-rose-200 font-bold py-2.5 px-1.5 sm:px-3 rounded-xl transition-all cursor-pointer text-[11px] sm:text-xs text-center flex items-center justify-center gap-1 sm:gap-1.5"
                        >
                          <X className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                          <span className="font-extrabold whitespace-nowrap">Forgot</span>
                        </button>

                        {/* Partially right */}
                        <button
                          type="button"
                          onClick={() => handleRate(activeMicrobe.id, "partial")}
                          className="bg-amber-50 hover:bg-amber-100/90 active:scale-[0.985] text-amber-800 border border-amber-200 font-bold py-2.5 px-1.5 sm:px-3 rounded-xl transition-all cursor-pointer text-[11px] sm:text-xs text-center flex items-center justify-center gap-1 sm:gap-1.5"
                        >
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span className="font-extrabold whitespace-nowrap">Partial</span>
                        </button>

                        {/* Mastered */}
                        <button
                          type="button"
                          onClick={() => handleRate(activeMicrobe.id, "mastered")}
                          className="bg-emerald-50 hover:bg-emerald-100/90 active:scale-[0.985] text-emerald-800 border border-emerald-200 font-extrabold py-2.5 px-1.5 sm:px-3 rounded-xl transition-all cursor-pointer text-[11px] sm:text-xs text-center flex items-center justify-center gap-1 sm:gap-1.5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="font-extrabold whitespace-nowrap">Mastered</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
