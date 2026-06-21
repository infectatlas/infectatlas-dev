import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Check, AlertCircle, Award, Activity, 
  Sparkles, Clock, Layers, Star, RotateCcw, ChevronRight 
} from "lucide-react";
import { generateQuestionPool } from "../utils/questionGenerator";
import { microorganismsData } from "../data/microorganisms";
import { Question, PerformanceAnalytics } from "../types";

interface ActiveRecallDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entityType: "organism" | "disease" | "drug";
  entityId: string;
  entityName: string;
}

export default function ActiveRecallDrawer({
  isOpen,
  onClose,
  entityType,
  entityId,
  entityName
}: ActiveRecallDrawerProps) {
  // Configured Questions Pool
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  
  // Custom Intensity
  const [intensity, setIntensity] = useState<number>(3);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Compile active pathogen context lists based on disease or drug matches
  const preloadedPathogens = useMemo(() => {
    if (entityType === "organism") {
      return [entityId];
    } else if (entityType === "disease") {
      // Find microorganisms that cause this disease name or ID
      const query = entityName.toLowerCase();
      const matches = microorganismsData.filter(m => 
        m.id === entityId || 
        m.name.toLowerCase().includes(query) ||
        m.diseases.some(d => d.id === entityId || d.name.toLowerCase().includes(query))
      );
      return matches.length > 0 ? matches.map(m => m.id) : ["s-aureus"]; // fallback to Staph Aureus as high yield
    } else if (entityType === "drug") {
      // Find microorganisms treated by this drug
      const query = entityName.toLowerCase();
      const matches = microorganismsData.filter(m => 
        m.diseases.some(d => d.treatment.toLowerCase().includes(query))
      );
      return matches.length > 0 ? matches.map(m => m.id) : ["s-aureus"];
    }
    return ["s-aureus"];
  }, [entityType, entityId, entityName]);

  // Set up questions
  useEffect(() => {
    if (isOpen) {
      const pool = generateQuestionPool(preloadedPathogens);
      // Shuffle pool deterministically or randomly for active sessions
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      setQuestions(shuffled);
      setCurrentIdx(0);
      setSelectedOption(null);
      setIsSubmitted(false);
      setSessionCorrectCount(0);
      setIsFinished(false);
      setHasStarted(false);
    }
  }, [isOpen, preloadedPathogens]);

  const activeQuestion = questions[currentIdx];

  const handleStartSession = (selectedQuestionsCount: number) => {
    setIntensity(Math.min(selectedQuestionsCount, questions.length));
    setHasStarted(true);
  };

  const handleOptionClick = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isSubmitted || !activeQuestion) return;
    setIsSubmitted(true);
    
    const isCorrect = selectedOption === activeQuestion.correctAnswer;
    if (isCorrect) {
      setSessionCorrectCount(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentIdx + 1 < intensity) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Complete and catalog session analytics locally
      handleCompleteSession();
    }
  };

  const handleCompleteSession = () => {
    // Collect stats to write to localStorage for full application metrics sync
    const categoryHits: Record<string, { correct: number; incorrect: number }> = {};
    const pathogenHits: Record<string, { correct: number; incorrect: number }> = {};

    questions.slice(0, intensity).forEach((q, idx) => {
      // Resolve which microbe this belongs to
      const microbe = microorganismsData.find(m => m.id === q.organism);
      const cat = microbe?.gramStatus || "Atypical & Others";
      const isCorrect = idx < currentIdx 
        ? true // previously recorded count correctly
        : selectedOption === q.correctAnswer; // current item check

      // Category update
      if (!categoryHits[cat]) {
        categoryHits[cat] = { correct: 0, incorrect: 0 };
      }
      if (isCorrect) {
        categoryHits[cat].correct += 1;
      } else {
        categoryHits[cat].incorrect += 1;
      }

      // Pathogen update
      if (!pathogenHits[q.organism]) {
        pathogenHits[q.organism] = { correct: 0, incorrect: 0 };
      }
      if (isCorrect) {
        pathogenHits[q.organism].correct += 1;
      } else {
        pathogenHits[q.organism].incorrect += 1;
      }
    });

    saveResultsToAnalytics(sessionCorrectCount, intensity, categoryHits, pathogenHits);
    setIsFinished(true);
  };

  const saveResultsToAnalytics = (
    correctAnswersCount: number, 
    totalCount: number, 
    categoryHits: Record<string, { correct: number; incorrect: number }>, 
    pathogenHits: Record<string, { correct: number; incorrect: number }>
  ) => {
    const cached = localStorage.getItem("micro_analytics");
    let prev: PerformanceAnalytics = {
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      currentStreak: 0,
      questionsPerPathogen: {},
      questionsPerCategory: {},
      studyHistory: []
    };

    if (cached) {
      try {
        prev = JSON.parse(cached);
      } catch (e) {
        // fallback
      }
    }

    const todayString = new Date().toISOString().split("T")[0];
    let nextStreak = prev.currentStreak || 0;
    if (!prev.lastStudyDate) {
      nextStreak = 1;
    } else {
      const lastDate = new Date(prev.lastStudyDate);
      const today = new Date(todayString);
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        if (prev.lastStudyDate !== todayString) {
          nextStreak = (prev.currentStreak || 0) + 1;
        }
      } else {
        nextStreak = 1;
      }
    }

    // Merge categories
    const mergedCategories = { ...prev.questionsPerCategory };
    Object.keys(categoryHits).forEach((cat) => {
      const currentCat = mergedCategories[cat] || { correct: 0, incorrect: 0 };
      mergedCategories[cat] = {
        correct: currentCat.correct + categoryHits[cat].correct,
        incorrect: currentCat.incorrect + categoryHits[cat].incorrect
      };
    });

    // Merge pathogens
    const mergedPathogens = { ...prev.questionsPerPathogen };
    Object.keys(pathogenHits).forEach((pat) => {
      const currentPat = mergedPathogens[pat] || { correct: 0, incorrect: 0 };
      mergedPathogens[pat] = {
        correct: currentPat.correct + pathogenHits[pat].correct,
        incorrect: currentPat.incorrect + pathogenHits[pat].incorrect
      };
    });

    const updatedHistory = [...(prev.studyHistory || [])];
    const todayIndex = updatedHistory.findIndex((h) => h.date === todayString);
    if (todayIndex > -1) {
      updatedHistory[todayIndex].questionsAttempted += totalCount;
      updatedHistory[todayIndex].correctCount += correctAnswersCount;
    } else {
      updatedHistory.push({
        date: todayString,
        questionsAttempted: totalCount,
        correctCount: correctAnswersCount
      });
    }

    const updated: PerformanceAnalytics = {
      ...prev,
      totalQuestionsAnswered: (prev.totalQuestionsAnswered || 0) + totalCount,
      totalCorrect: (prev.totalCorrect || 0) + correctAnswersCount,
      currentStreak: nextStreak,
      lastStudyDate: todayString,
      questionsPerCategory: mergedCategories,
      questionsPerPathogen: mergedPathogens,
      studyHistory: updatedHistory
    };

    localStorage.setItem("micro_analytics", JSON.stringify(updated));
    // Trigger window event so that components loaded on the background can refresh state
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900 z-50 transition-opacity"
            id="recall-drawer-backdrop"
          />

          {/* Core Sliding Panel Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="fixed inset-y-0 right-0 max-w-lg w-full bg-white shadow-2xl z-50 flex flex-col h-full border-l border-slate-200"
            id="recall-drawer-panel"
          >
            {/* Header section with branding & cross close */}
            <div className="border-b border-slate-100 p-5 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                    Microbe Active Recall Console
                  </h3>
                  <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
                    Learning Context: {entityName}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                title="Minimize Practice Module"
                id="recall-drawer-close-btn"
              >
                <X className="h-4 w-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Inner Content Grid */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {questions.length === 0 ? (
                /* No questions available loading state */
                <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-3">
                  <Clock className="h-10 w-10 text-slate-300 animate-pulse" />
                  <p className="text-xs font-semibold text-slate-550 italic">
                    Compiling cognitive vignettes and board-style items for this micro section...
                  </p>
                </div>
              ) : !hasStarted ? (
                /* Session Initiation Selection Screen */
                <div className="space-y-6 my-auto pt-10" id="session-setup-view">
                  <div className="text-center space-y-2">
                    <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-full inline-flex">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Convert Passive Reading into Active Recall
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Passive medical reading fades rapidly without retrieval practice. Lock in details of <span className="font-sans font-bold text-slate-800 italic">{entityName}</span> by answering diagnostic board-style questions now.
                    </p>
                  </div>

                  {/* Adaptive intensity selection buttons */}
                  <div className="space-y-3 pt-4">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block text-center">
                      Choose Your Sessions Intensity:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleStartSession(3)}
                        className="p-4 bg-slate-50/50 hover:bg-indigo-50/30 text-left rounded-xl border border-slate-200 hover:border-indigo-200 cursor-pointer transition-all space-y-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800 group-hover:text-indigo-900">
                            Turbo Study Practice
                          </span>
                          <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 font-bold rounded">
                            3 Questions
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                          Quick 2-minute clinical recall sprint. Perfect for rapid self-testing.
                        </p>
                      </button>

                      <button
                        onClick={() => handleStartSession(5)}
                        className="p-4 bg-slate-50/50 hover:bg-emerald-50/35 text-left rounded-xl border border-slate-200 hover:border-emerald-250 cursor-pointer transition-all space-y-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800 group-hover:text-emerald-900">
                            Boards Prep Sprint
                          </span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 font-bold rounded">
                            5 Questions
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-450 leading-relaxed font-semibold">
                          Engaged memory session including multi-system vignettes and therapy pearls.
                        </p>
                      </button>
                    </div>

                    <div className="bg-amber-50/40 p-3.5 rounded-xl border border-amber-100 flex gap-2.5 mt-2">
                      <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-amber-850 uppercase block">Board Exam Fidelity</span>
                        <p className="text-[9.5px] text-slate-500 leading-normal font-medium">
                          These recall cards directly reflect USMLE Step 1, COMLEX Level 1, and NCLEX-RN standards for diagnosing and treating clinical pathology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isFinished ? (
                /* Session Performance Results Screen */
                <div className="space-y-6 my-auto pt-6 text-center" id="session-results-view">
                  <div className="inline-flex p-3 bg-indigo-50 text-indigo-700 rounded-full">
                    <Award className="h-10 w-10 text-indigo-600" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-slate-900">Active Recall Cycle Completed</h4>
                    <p className="text-xs text-slate-550 max-w-sm mx-auto leading-relaxed">
                      You completed your scheduled review session for <span className="font-bold text-slate-800">{entityName}</span>.
                    </p>
                  </div>

                  {/* Summary Metric Score Board */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-xs mx-auto grid grid-cols-2 divide-x divide-slate-200">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Correct</span>
                      <span className="text-2xl font-black text-indigo-600 block">
                        {sessionCorrectCount} <span className="text-xs text-slate-400 font-semibold">/ {intensity}</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">Accuracy</span>
                      <span className="text-2xl font-black text-emerald-600 block">
                        {Math.round((sessionCorrectCount / intensity) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 max-w-md mx-auto bg-indigo-50/30 p-4 border border-indigo-100 rounded-xl leading-relaxed">
                    🌟 <strong>Compliance Logged</strong>: Your response metrics are successfully written to your local study databases and completely synced with your <strong>Progress Dashboard</strong>.
                  </div>

                  <div className="pt-4 flex flex-col gap-2.5">
                    <button
                      onClick={() => {
                        // Reset session using same questions
                        setCurrentIdx(0);
                        setSelectedOption(null);
                        setIsSubmitted(false);
                        setSessionCorrectCount(0);
                        setIsFinished(false);
                        setHasStarted(false);
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-205 py-2.5 rounded-xl font-bold text-xs text-slate-700 shadow-3xs cursor-pointer hover:border-slate-300 border border-slate-200"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Study This Pathogen Again
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Return to Reference Page
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Step Question Form Screen */
                <div className="space-y-5" id="recall-questions-view">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-605 tracking-wider font-mono">
                      Question {currentIdx + 1} of {intensity}
                    </span>
                    <div className="flex items-center gap-1 font-semibold text-slate-400">
                      <Layers className="h-3.5 w-3.5" />
                      <span className="capitalize">{activeQuestion.difficulty}</span>
                    </div>
                  </div>

                  {/* Progress Step Bullet Bar */}
                  <div className="w-full bg-slate-100 h-1 rounded-full flex gap-1">
                    {Array.from({ length: intensity }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-full rounded-full transition-all duration-300 ${
                          idx < currentIdx
                            ? "bg-indigo-600"
                            : idx === currentIdx
                            ? isSubmitted
                              ? selectedOption === activeQuestion.correctAnswer
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                              : "bg-indigo-400 animate-pulse"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Question Stem Text */}
                  <div className="bg-slate-50/70 border border-slate-150 p-4.5 rounded-xl">
                    <p className="text-xs text-slate-800 font-extrabold leading-relaxed text-left">
                      {activeQuestion.prompt}
                    </p>
                  </div>

                  {/* Selection Options Stack */}
                  <div className="space-y-2.5">
                    {activeQuestion.options?.map((option, i) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === activeQuestion.correctAnswer;
                      
                      let optionBg = "bg-white hover:bg-slate-50 border-slate-200";
                      let optionText = "text-slate-700";
                      let iconIndicator = null;

                      if (isSubmitted) {
                        if (isCorrect) {
                          optionBg = "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold";
                          iconIndicator = <Check className="h-4 w-4 text-emerald-600 shrink-0" />;
                        } else if (isSelected) {
                          optionBg = "bg-rose-50 border-rose-305 text-rose-950 font-bold";
                          iconIndicator = <X className="h-4 w-4 text-rose-600 shrink-0" />;
                        } else {
                          optionBg = "bg-white border-slate-200 opacity-60";
                        }
                      } else if (isSelected) {
                        optionBg = "bg-indigo-50 border-indigo-300 text-indigo-950 font-bold ring-2 ring-indigo-100";
                      }

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleOptionClick(option)}
                          disabled={isSubmitted}
                          className={`w-full p-3 px-4 rounded-xl border text-xs text-left transition-all flex items-center justify-between gap-3 ${
                            !isSubmitted ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                          } ${optionBg} ${optionText}`}
                        >
                          <span className="leading-snug">{option}</span>
                          {iconIndicator}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback panel absolute block */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl text-xs space-y-1.5 ${
                          selectedOption === activeQuestion.correctAnswer
                            ? "bg-emerald-50/70 border border-emerald-200 text-emerald-950"
                            : "bg-rose-50/70 border border-rose-200 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-extrabold uppercase text-[10px]">
                          {selectedOption === activeQuestion.correctAnswer ? (
                            <>
                              <Check className="h-4 w-4 text-emerald-700" />
                              <span>Excellent Recall!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-rose-700" />
                              <span>Concept Clarification Needed</span>
                            </>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed font-semibold">
                          {activeQuestion.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Operational Footer action controls */}
                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    {!isSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitAnswer}
                        disabled={!selectedOption}
                        className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 select-none ${
                          selectedOption
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-[0.985]"
                            : "bg-slate-150 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-xs transition-all cursor-pointer active:scale-[0.985] select-none"
                      >
                        <span>{currentIdx + 1 < intensity ? "Next Question" : "Complete Session"}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
