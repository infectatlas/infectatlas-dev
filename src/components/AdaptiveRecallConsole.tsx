import { useState, useMemo } from "react";
import AdaptiveQuestionEngine from "./AdaptiveQuestionEngine";
import { Question, SessionStats } from "../types";
import { generateQuestionPool } from "../utils/questionGenerator";
import { 
  Award, RefreshCw, AlertCircle, CheckCircle, X, Play, Clock, 
  HelpCircle, BookOpen, Target, Sparkles, Flame, Check, AlertTriangle
} from "lucide-react";
import { microorganismsData } from "../data/microorganisms";

interface AdaptiveRecallConsoleProps {
  pathogenIds: string[];
  onComplete: (stats: SessionStats, pathogenGrades: Record<string, "forgot" | "partial" | "mastered">) => void;
  onQuit: () => void;
}

export default function AdaptiveRecallConsole({ 
  pathogenIds, 
  onComplete, 
  onQuit 
}: AdaptiveRecallConsoleProps) {
  const [sessionState, setSessionState] = useState<"setup" | "active" | "complete">("setup");
  const [sessionLength, setSessionLength] = useState<number>(10);
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessionGrades, setSessionGrades] = useState<Record<string, "forgot" | "partial" | "mastered">>({});

  // 1. Compile the complete question pool for the selected pathogens
  const questionPool = useMemo(() => {
    return generateQuestionPool(pathogenIds);
  }, [pathogenIds]);

  const handleStartSession = () => {
    if (questionPool.length === 0) return;
    setSessionState("active");
  };

  const handleSessionFinished = (
    finalStats: SessionStats, 
    pathogenGrades: Record<string, "forgot" | "partial" | "mastered">
  ) => {
    setStats(finalStats);
    setSessionGrades(pathogenGrades);
    setSessionState("complete");
  };

  const handleCommitResults = () => {
    if (stats) {
      onComplete(stats, sessionGrades);
    }
  };

  // 1. SETUP STATE: Choose session constraints
  if (sessionState === "setup") {
    return (
      <div className="p-6 md:p-8 text-center bg-white rounded-3xl max-w-xl mx-auto border border-slate-200 shadow-xl space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-150 animate-pulse">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-850 leading-tight">
            Adaptive Recall Session Launcher
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
            Reviewing <strong className="text-slate-805">{pathogenIds.length}</strong> selected pathogens with dynamic, focused active-recall queries.
          </p>
        </div>

        {/* Selected Targets List Mini-HUD */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150/70 text-left space-y-1.5">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">Review Candidates Matrix:</span>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {pathogenIds.map(id => {
              const name = microorganismsData.find(m => m.id === id)?.name || id;
              return (
                <span key={id} className="bg-white border border-slate-200 text-slate-650 text-[10px] font-bold py-1 px-2 rounded-lg italic">
                  🔬 {name}
                </span>
              );
            })}
          </div>
        </div>

        {/* Question Count Selection Block */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Choose Practice Length:</label>
          <div className="grid grid-cols-3 gap-2.5">
            {[10, 15, 20].map(count => (
              <button
                key={count}
                type="button"
                onClick={() => setSessionLength(count)}
                className={`py-3 text-center rounded-xl font-extrabold text-xs border-2 transition duration-150 cursor-pointer ${
                  sessionLength === count 
                    ? "border-indigo-600 bg-indigo-50/20 text-indigo-905" 
                    : "border-slate-150 hover:border-slate-250 bg-white text-slate-600"
                }`}
              >
                {count} Questions
              </button>
            ))}
          </div>
        </div>

        {/* Main triggering actions */}
        <div className="flex flex-col gap-2.5 pt-2">
          {questionPool.length > 0 ? (
            <button 
              onClick={handleStartSession}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] text-white rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="h-4.5 w-4.5 fill-white/10" />
              Begin Adaptive Retrieval Practice
            </button>
          ) : (
            <p className="text-xs text-rose-500 font-semibold italic">Error: No questions could be compiled for selected pathogens.</p>
          )}
          
          <button 
            type="button"
            onClick={onQuit}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition cursor-pointer"
          >
            Cancel and Exit
          </button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE SESSION WORKSPACE
  if (sessionState === "active") {
    return (
      <AdaptiveQuestionEngine 
        questions={questionPool}
        sessionLength={Math.min(sessionLength, questionPool.length)}
        onSessionComplete={handleSessionFinished}
        onQuit={onQuit}
      />
    );
  }

  // 3. COMPLETION STATS SUMMARY PANEL
  return (
    <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl max-w-xl mx-auto shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-150 animate-bounce">
          <Award className="h-6 w-6" />
        </div>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
          Active Retrieval Summary
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-sm mx-auto">
          Fantastic compliance. We have compiled your responses and updated the memory spacing algorithm.
        </p>
      </div>
      
      {/* HUD Score row */}
      <div className="grid grid-cols-2 gap-3 pb-3 border-b">
        <div className="p-4 bg-slate-50 rounded-2xl border text-center">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider">Overall Accuracy</span>
          <span className="text-2xl font-black text-indigo-650 font-mono">
            {stats?.accuracy.toFixed(1)}%
          </span>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border text-center">
          <span className="text-[9px] font-extrabold uppercase text-slate-400 block tracking-wider">Missed Objectives</span>
          <span className="text-2xl font-black text-rose-650 font-mono">
            {stats?.missedQuestionsCount}
          </span>
        </div>
      </div>

      {/* Accuracy breakdown by difficulty */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Performance by Difficulty:</span>
        <div className="grid grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-center">
            <span className="text-[9px] font-bold text-emerald-800 uppercase block">Easy</span>
            <span className="font-mono font-bold text-emerald-950">
              {stats ? (stats.difficultyBreakdown.easy * 100).toFixed(0) : 0}%
            </span>
          </div>
          <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-center">
            <span className="text-[9px] font-bold text-amber-800 uppercase block">Medium</span>
            <span className="font-mono font-bold text-amber-950">
              {stats ? (stats.difficultyBreakdown.medium * 100).toFixed(0) : 0}%
            </span>
          </div>
          <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl text-center">
            <span className="text-[9px] font-bold text-rose-800 uppercase block">Hard</span>
            <span className="font-mono font-bold text-rose-950">
              {stats ? (stats.difficultyBreakdown.hard * 100).toFixed(0) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Weak area highlights & corrective flashcards */}
      <div className="space-y-2 text-left">
        <span className="text-[10px] font-extrabold uppercase text-indigo-500 tracking-wider block">Actionable Remediations:</span>
        <div className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-4 text-xs space-y-3.5">
          {stats && stats.weakTopics.length > 0 ? (
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-indigo-850">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-[11px]">Identified Topic Holes (Accuracy &lt; 70%):</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {stats.weakTopics.map(t => (
                      <span key={t} className="bg-amber-100/75 border border-amber-200 text-amber-900 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-md tracking-wider">
                        ⚠️ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10.5px] leading-relaxed text-slate-550 pl-6 border-l-2 border-indigo-200">
                <strong>Recommended action:</strong> Head to the <strong>Flashcards</strong> section and filter by these pathogen classifications to drill exact facts, then retest.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-emerald-800">
              <Check className="h-4.5 w-4.5 text-emerald-600 font-extrabold shrink-0" />
              <span className="font-extrabold text-[11px]">All topic accuracy above standard. Spacing intervals expanded!</span>
            </div>
          )}

          {/* Microbe specific outcomes */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Pathogen Mastery updates:</span>
            <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto pr-1">
              {Object.keys(sessionGrades).map(pId => {
                const name = microorganismsData.find(m => m.id === pId)?.name || pId;
                const grade = sessionGrades[pId];
                return (
                  <div key={pId} className="flex justify-between items-center bg-white border rounded-lg p-2 text-[11px]">
                    <span className="italic font-bold text-slate-700">{name}</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wide ${
                      grade === "mastered" ? "bg-emerald-100 text-emerald-700" :
                      grade === "partial" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-700"
                    }`}>
                      {grade}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Finish Actions */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button 
          onClick={handleCommitResults}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <CheckCircle className="h-4.5 w-4.5" />
          Update database & Complete Session
        </button>
      </div>
    </div>
  );
}
