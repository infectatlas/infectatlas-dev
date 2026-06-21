import { useState, useEffect, useMemo, useRef } from "react";
import { Question, SessionStats } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, Clock, Sparkles, AlertCircle, CheckCircle2, 
  ArrowRight, Lightbulb, Activity, ArrowLeft, RefreshCw
} from "lucide-react";
import { microorganismsData, Microorganism } from "../data/microorganisms";

interface AdaptiveQuestionEngineProps {
  questions: Question[];
  onSessionComplete: (stats: SessionStats, pathogenGrades: Record<string, "forgot" | "partial" | "mastered">) => void;
  onQuit: () => void;
  sessionLength?: number;
}

interface PerformanceLog {
  questionId: string;
  organismId: string;
  isCorrect: boolean;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  duration: number;
}

export default function AdaptiveQuestionEngine({ 
  questions,
  onSessionComplete,
  onQuit,
  sessionLength = 10
}: AdaptiveQuestionEngineProps) {
  // Mastery score starts at 30 (representing Easy difficulty band)
  const [masteryScore, setMasteryScore] = useState<number>(30);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sessionLogs, setSessionLogs] = useState<PerformanceLog[]>([]);
  
  // Active Question state
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  
  // Timer state
  const [startTime, setStartTime] = useState<number>(Date.now());

  // Spaced-repetition retry for missed concepts:
  // We track missed questions in a queue and reintroduce them after 3 other questions.
  const [missedQuestionsQueue, setMissedQuestionsQueue] = useState<{ question: Question; insertAfterIndex: number }[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  // Determine current system difficulty based on mastery level
  const activeDifficulty = useMemo(() => {
    if (masteryScore < 40) return "easy";
    if (masteryScore < 75) return "medium";
    return "hard";
  }, [masteryScore]);

  // Track accuracy by topic to support adaptive weakness enforcement
  const topicStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    sessionLogs.forEach(log => {
      if (!stats[log.topic]) {
        stats[log.topic] = { total: 0, correct: 0 };
      }
      stats[log.topic].total += 1;
      if (log.isCorrect) {
        stats[log.topic].correct += 1;
      }
    });
    return stats;
  }, [sessionLogs]);

  // Find weakest topic in current session (accuracy < 70% or unattempted but in failures)
  const weakestTopic = useMemo(() => {
    const topics: ("classification" | "diagnostics" | "clinical" | "resistance" | "treatment")[] = [
      "classification", "diagnostics", "clinical", "resistance", "treatment"
    ];
    let weakest: any = null;
    let minAcc = 1.1;

    topics.forEach(t => {
      const s = topicStats[t];
      if (s && s.total > 0) {
        const acc = s.correct / s.total;
        if (acc < minAcc) {
          minAcc = acc;
          weakest = t;
        }
      }
    });

    // Fallback if no topic has any logs yet
    if (!weakest) {
      return "classification";
    }
    return minAcc < 0.75 ? weakest : null;
  }, [topicStats]);

  // Get active Microorganism for "View Reference" modal lookup
  const activeMicrobe = useMemo(() => {
    if (!activeQuestion) return null;
    return microorganismsData.find(m => m.id === activeQuestion.organism) || null;
  }, [activeQuestion]);

  // Hook to choose and mount the next adaptive question on index changes or starts
  useEffect(() => {
    if (questions.length === 0) return;

    // 1. Check if there is a missed question due for retesting (spaced repetition)
    const pendingMissed = missedQuestionsQueue.find(item => currentIdx >= item.insertAfterIndex);
    if (pendingMissed) {
      setActiveQuestion(pendingMissed.question);
      setMissedQuestionsQueue(prev => prev.filter(item => item.question.id !== pendingMissed.question.id));
      setSelectedAnswers([]);
      setSubmitted(false);
      setStartTime(Date.now());
      return;
    }

    // 2. Otherwise, select a fresh question adaptively matching current difficulty and prioritising weakest topic
    let potentialQuestions = questions.filter(q => !usedQuestionIds.has(q.id));

    // Try finding questions matching active difficulty
    let difficultyMatches = potentialQuestions.filter(q => q.difficulty === activeDifficulty);
    if (difficultyMatches.length === 0) {
      // Fallback: any difficulty if active has run dry
      difficultyMatches = potentialQuestions;
    }

    // Prioritize weakest topic if one is identified
    let adaptiveSelection = difficultyMatches;
    if (weakestTopic) {
      const topicMatches = difficultyMatches.filter(q => q.topic === weakestTopic);
      if (topicMatches.length > 0) {
        adaptiveSelection = topicMatches;
      }
    }

    if (adaptiveSelection.length > 0) {
      // Pick a random question from adaptive list
      const chosen = adaptiveSelection[Math.floor(Math.random() * adaptiveSelection.length)];
      setActiveQuestion(chosen);
      setUsedQuestionIds(prev => {
        const next = new Set(prev);
        next.add(chosen.id);
        return next;
      });
    } else if (potentialQuestions.length > 0) {
      // Fallback: absolute backup
      const chosen = potentialQuestions[Math.floor(Math.random() * potentialQuestions.length)];
      setActiveQuestion(chosen);
      setUsedQuestionIds(prev => {
        const next = new Set(prev);
        next.add(chosen.id);
        return next;
      });
    } else {
      // If we completely exhausted the pool, repeat any question that can reinforce retention
      const chosen = questions[Math.floor(Math.random() * questions.length)];
      setActiveQuestion(chosen);
    }

    // Reset interaction states
    setSelectedAnswers([]);
    setSubmitted(false);
    setStartTime(Date.now());
  }, [currentIdx, questions]);

  if (!activeQuestion) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 font-bold mb-4">Establishing study targets...</p>
        <RefreshCw className="h-6 w-6 text-indigo-500 animate-spin mx-auto" />
      </div>
    );
  }

  const handleSelectOption = (opt: string) => {
    if (submitted) return;

    if (activeQuestion.type === "multi_select") {
      setSelectedAnswers(prev => 
        prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
      );
    } else {
      setSelectedAnswers([opt]);
    }
  };

  const handleToggleTrueFalse = (val: "True" | "False") => {
    if (submitted) return;
    setSelectedAnswers([val]);
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0 || submitted) return;

    const duration = (Date.now() - startTime) / 1000;
    let correct = false;

    if (activeQuestion.type === "multi_select") {
      const correctAnswers = activeQuestion.correctAnswer as string[];
      correct = selectedAnswers.length === correctAnswers.length &&
                selectedAnswers.every(x => correctAnswers.includes(x));
    } else {
      correct = selectedAnswers[0] === activeQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setSubmitted(true);

    // Calculate response time modifier (confident vs standard vs hesitant)
    let speedMultiplier = 1.0;
    if (correct) {
      if (duration < 8) speedMultiplier = 1.15; // Confidence bonus
      else if (duration > 18) speedMultiplier = 0.8; // Hesitation penalty
    }

    // Calculate mastery delta depending on difficulty
    let delta = 0;
    if (correct) {
      if (activeQuestion.difficulty === "easy") delta = Math.round(12 * speedMultiplier);
      if (activeQuestion.difficulty === "medium") delta = Math.round(16 * speedMultiplier);
      if (activeQuestion.difficulty === "hard") delta = Math.round(20 * speedMultiplier);
    } else {
      // Large drop to reinforce basics on failure
      if (activeQuestion.difficulty === "easy") delta = -20;
      if (activeQuestion.difficulty === "medium") delta = -16;
      if (activeQuestion.difficulty === "hard") delta = -12;

      // Space missed concept: introduce again after 3-4 indices
      setMissedQuestionsQueue(prev => [
        ...prev,
        { question: activeQuestion, insertAfterIndex: currentIdx + 3 }
      ]);
    }

    // Set next mastery score (clamped [0, 100])
    setMasteryScore(m => Math.max(0, Math.min(100, m + delta)));

    // Save performance logs
    setSessionLogs(prev => [
      ...prev,
      {
        questionId: activeQuestion.id,
        organismId: activeQuestion.organism,
        isCorrect: correct,
        difficulty: activeQuestion.difficulty,
        topic: activeQuestion.topic,
        duration
      }
    ]);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= sessionLength) {
      // Calculate final stats and trigger finish callback
      const totalAnswers = sessionLogs.length;
      const totalCorrect = sessionLogs.filter(l => l.isCorrect).length;
      const acc = totalAnswers > 0 ? (totalCorrect / totalAnswers) * 100 : 0;

      // Classify performance by difficulty
      const diffLogs = (diff: "easy" | "medium" | "hard") => sessionLogs.filter(l => l.difficulty === diff);
      const getDiffAcc = (diff: "easy" | "medium" | "hard") => {
        const list = diffLogs(diff);
        return list.length > 0 ? (list.filter(l => l.isCorrect).length / list.length) : 1;
      };

      // Classify weak topics (accuracy < 70% in this session)
      const uniquePathogenEvaluations = Array.from(new Set(sessionLogs.map(l => l.organismId)));
      const pathogenAverages: Record<string, { correct: number; total: number }> = {};
      sessionLogs.forEach(l => {
        if (!pathogenAverages[l.organismId]) {
          pathogenAverages[l.organismId] = { correct: 0, total: 0 };
        }
        pathogenAverages[l.organismId].total += 1;
        if (l.isCorrect) {
          pathogenAverages[l.organismId].correct += 1;
        }
      });

      // Grade each pathogen inside Spaced Repetition values
      const pathogenGrades: Record<string, "forgot" | "partial" | "mastered"> = {};
      Object.keys(pathogenAverages).forEach(pId => {
        const statsObj = pathogenAverages[pId];
        const pAcc = statsObj.correct / statsObj.total;
        if (pAcc >= 0.8) {
          pathogenGrades[pId] = "mastered";
        } else if (pAcc >= 0.4) {
          pathogenGrades[pId] = "partial";
        } else {
          pathogenGrades[pId] = "forgot";
        }
      });

      // Generate weak topics descriptions dynamically
      const weakTopicsList: string[] = [];
      const topics: ("classification" | "diagnostics" | "clinical" | "resistance" | "treatment")[] = [
        "classification", "diagnostics", "clinical", "resistance", "treatment"
      ];
      topics.forEach(t => {
        const s = topicStats[t];
        if (s && s.total > 0 && (s.correct / s.total) < 0.7) {
          weakTopicsList.push(t);
        }
      });

      const finalStats: SessionStats = {
        accuracy: acc,
        difficultyBreakdown: {
          easy: getDiffAcc("easy"),
          medium: getDiffAcc("medium"),
          hard: getDiffAcc("hard")
        },
        weakTopics: weakTopicsList,
        missedQuestionsCount: totalAnswers - totalCorrect
      };

      onSessionComplete(finalStats, pathogenGrades);
    } else {
      setCurrentIdx(idx => idx + 1);
    }
  };

  return (
    <div className="w-full bg-slate-50 flex flex-col justify-between" id="recall-player-root">
      {/* HUD Header displaying score and topic */}
      <div className="bg-slate-900 text-white p-4 rounded-t-3xl flex justify-between items-center select-none border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-indigo-500/10 border border-indigo-400/25 rounded-lg text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
            Q {currentIdx + 1} / {sessionLength}
          </div>
          <span className="text-xs font-semibold text-slate-400 capitalize">
            Topic: <strong className="text-indigo-300 font-extrabold">{activeQuestion.topic}</strong>
          </span>
        </div>

        {/* Combined Mastery Meter HUD */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Mastery Index</span>
            <span className="text-xs font-mono font-bold text-slate-200">Score: {masteryScore}</span>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                activeDifficulty === "easy" ? "bg-emerald-500" :
                activeDifficulty === "medium" ? "bg-amber-400" : "bg-rose-500"
              }`}
              style={{ width: `${masteryScore}%` }}
            />
          </div>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider ${
            activeDifficulty === "easy" ? "bg-emerald-500/15 text-emerald-400" :
            activeDifficulty === "medium" ? "bg-amber-500/15 text-amber-400" : "bg-rose-500/15 text-rose-400"
          }`}>
            {activeDifficulty}
          </span>
        </div>
      </div>

      {/* Main Study Screen Workspace */}
      <div className="p-6 md:p-8 space-y-6 flex-1 bg-white">
        {/* Main Question Display */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Evaluation Objective</span>
          <h2 className="text-base md:text-lg font-bold text-slate-800 leading-relaxed font-sans whitespace-pre-line border-l-4 border-indigo-600 pl-4">
            {activeQuestion.prompt}
          </h2>
        </div>

        {/* Input formats */}
        <div className="py-2">
          {/* MCQ or Vignette formats */}
          {(activeQuestion.type === "mcq" || activeQuestion.type === "vignette") && activeQuestion.options && (
            <div className="space-y-3.5">
              {activeQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswers.includes(opt);
                const isCorrectOption = opt === activeQuestion.correctAnswer;
                
                let btnStyles = "border-slate-200 hover:border-indigo-200 text-slate-700 bg-slate-50/50 hover:bg-indigo-50/30";
                if (submitted) {
                  if (isSelected && isCorrectOption) {
                    btnStyles = "border-emerald-500 text-emerald-800 bg-emerald-50/80 font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    btnStyles = "border-rose-500 text-rose-800 bg-rose-50/80";
                  } else if (isCorrectOption) {
                    btnStyles = "border-emerald-500 text-emerald-700 bg-emerald-50/30 font-semibold";
                  } else {
                    btnStyles = "border-slate-100 text-slate-400 bg-white opacity-60";
                  }
                } else if (isSelected) {
                  btnStyles = "border-indigo-600 text-indigo-900 bg-indigo-50/50 font-semibold shadow-xs";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 text-left border-2 rounded-2xl transition duration-155 ease-in flex items-start gap-3 justify-between ${btnStyles}`}
                    disabled={submitted}
                  >
                    <span className="text-xs leading-relaxed">{opt}</span>
                    {submitted && isCorrectOption && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />}
                    {submitted && isSelected && !isCorrectOption && <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* True / False format */}
          {activeQuestion.type === "true_false" && (
            <div className="grid grid-cols-2 gap-4">
              {["True", "False"].map(v => {
                const isSelected = selectedAnswers.includes(v);
                const isCorrectTF = v === activeQuestion.correctAnswer;

                let btnStyles = "border-slate-200 hover:border-indigo-200 text-slate-700 bg-slate-50/50 hover:bg-indigo-50/30";
                if (submitted) {
                  if (isSelected && isCorrectTF) {
                    btnStyles = "border-emerald-500 text-emerald-800 bg-emerald-50/80 font-bold";
                  } else if (isSelected && !isCorrectTF) {
                    btnStyles = "border-rose-500 text-rose-800 bg-rose-50/80";
                  } else if (isCorrectTF) {
                    btnStyles = "border-emerald-500 text-emerald-700 bg-emerald-50/30 font-semibold";
                  } else {
                    btnStyles = "border-slate-100 text-slate-400 bg-white opacity-60";
                  }
                } else if (isSelected) {
                  btnStyles = "border-indigo-600 text-indigo-900 bg-indigo-50 font-semibold";
                }

                return (
                  <button
                    key={v}
                    onClick={() => handleSelectOption(v)}
                    className={`p-5 text-center border-2 rounded-2xl font-bold transition duration-155 text-xs ${btnStyles}`}
                    disabled={submitted}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          )}

          {/* Multi-Select format */}
          {activeQuestion.type === "multi_select" && activeQuestion.options && (
            <div className="space-y-3.5">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase items-center gap-1 flex mb-1.5 tracking-wider">
                <Activity className="h-3 w-3 text-indigo-500" />
                Select all that apply
              </span>
              {activeQuestion.options.map((opt, i) => {
                const isSelected = selectedAnswers.includes(opt);
                const correctAnswers = activeQuestion.correctAnswer as string[];
                const isCorrectOption = correctAnswers.includes(opt);
                
                let btnStyles = "border-slate-200 hover:border-indigo-200 text-slate-705 bg-slate-50/50 hover:bg-indigo-50/30";
                if (submitted) {
                  if (isSelected && isCorrectOption) {
                    btnStyles = "border-emerald-500 text-emerald-850 bg-emerald-50/80 font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    btnStyles = "border-rose-500 text-rose-850 bg-rose-50/80";
                  } else if (isCorrectOption) {
                    btnStyles = "border-emerald-500 text-emerald-700 bg-emerald-50/30 font-bold";
                  } else {
                    btnStyles = "border-slate-100 text-slate-400 bg-white opacity-60";
                  }
                } else if (isSelected) {
                  btnStyles = "border-indigo-600 text-indigo-900 bg-indigo-50 font-semibold shadow-2xs";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 text-left border-2 rounded-2xl transition duration-155 ease-in flex items-center justify-between text-xs gap-3 ${btnStyles}`}
                    disabled={submitted}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-slate-300 text-indigo-600 select-none pointer-events-none shrink-0"
                        disabled={submitted}
                      />
                      <span>{opt}</span>
                    </div>
                    {submitted && isCorrectOption && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />}
                    {submitted && isSelected && !isCorrectOption && <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}

              {!submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length === 0}
                  className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-md disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
                >
                  Confirm Choice & Submit
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Feedback Block displaying keys & clinical pearls */}
        <AnimatePresence>
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border ${
                isCorrect 
                  ? "bg-emerald-50/45 border-emerald-150 text-slate-800" 
                  : "bg-rose-50/45 border-rose-150 text-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-full shrink-0 ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                </div>
                <div className="space-y-3 flex-1 text-left">
                  <div>
                    <h4 className={`text-xs font-extrabold uppercase ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isCorrect ? "Correct Diagnosis & Logic!" : "Incorrect Strategy"}
                    </h4>
                    <p className="text-xs leading-relaxed mt-1 whitespace-pre-line text-slate-700 font-sans">{activeQuestion.explanation}</p>
                  </div>

                  {/* Highlighted Clinical Pearl */}
                  {activeMicrobe && (
                    <div className="border-l-2 border-indigo-400 pl-3 pt-0.5 space-y-0.5 bg-indigo-50/20 py-1.5 pr-2 rounded-r-md">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1 select-none">
                        <Lightbulb className="h-3 w-3 text-indigo-500 fill-indigo-500/10" />
                        High-Yield Clinical Pearl
                      </span>
                      <p className="text-[10.5px] italic text-slate-600 leading-relaxed font-sans font-medium">
                        {activeQuestion.clinicalPearl || activeMicrobe.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Session Control bar on Bottom */}
      <div className="bg-slate-50/70 border-t border-slate-100 p-4 rounded-b-3xl flex items-center justify-between gap-4">
        <button
          onClick={onQuit}
          className="inline-flex items-center gap-1 py-2 py-2 px-3 text-slate-505 hover:text-slate-800 font-bold hover:underline transition text-xs select-none cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Abandon Practice
        </button>

        {!submitted ? (
          activeQuestion.type !== "multi_select" && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.length === 0}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl font-bold transition flex items-center justify-center gap-1.5 text-xs shadow-md cursor-pointer"
            >
              Examine Answer
              <ArrowRight className="h-4.5 w-4.5 animate-pulse" />
            </button>
          )
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold transition flex items-center justify-center gap-1.5 text-xs shadow-md animate-glow-indigo cursor-pointer"
          >
            {currentIdx + 1 >= sessionLength ? "Conclude & See Results" : "Next Objective"}
            <ArrowRight className="h-4.5 w-4.5" />
          </button>
        )}
      </div>
    </div>
  );
}
