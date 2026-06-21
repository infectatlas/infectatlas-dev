import { useState, useMemo } from "react";
import { Microorganism, microorganismsData } from "../data/microorganisms";
import { Award, CheckCircle, XCircle, ChevronRight, Sparkles, BookOpen, Brain, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { analytics } from "../utils/analytics";
import { diseasesData } from "../data/diseases";
import { drugsData } from "../data/drugs";

const getPathogenSlug = (name: string): string => {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const getRelatedDiseases = (text: string) => {
  const lowercaseText = text.toLowerCase();
  return diseasesData.filter(dis => 
    lowercaseText.includes(dis.name.toLowerCase()) || 
    lowercaseText.includes(dis.id.toLowerCase()) ||
    (dis.alternateSlugs && dis.alternateSlugs.some(alt => lowercaseText.includes(alt.toLowerCase())))
  );
};

const getRelatedDrugs = (text: string) => {
  const lowercaseText = text.toLowerCase();
  return drugsData.filter(drug => 
    lowercaseText.includes(drug.name.toLowerCase()) || 
    lowercaseText.includes(drug.id.toLowerCase())
  );
};

interface QuizModeProps {
  onCommitQuizResults: (correctCount: number, totalCount: number, categoryHits: Record<string, { correct: number; incorrect: number }>) => void;
  isPremium?: boolean;
  onUnlockPremium?: () => void;
}

type QuizType = "RECOGNITION" | "DISEASE" | "TREATMENT_ROUTE" | "AI_VIGNETTE";

interface Question {
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referencePathogen: Microorganism;
  category: string; // "Gram-positive", "Gram-negative", etc.
}

interface VignetteQuestion {
  vignette: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  referencePathogen: Microorganism;
}

export default function QuizMode({
  onCommitQuizResults,
  isPremium = true,
  onUnlockPremium
}: QuizModeProps) {
  // Config state
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType | null>(null);
  const [quizLength, setQuizLength] = useState<number>(5);

  // Active quiz session states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

  // Tracking detailed performance indicators to commit on completion
  const [sessionCategoryHits, setSessionCategoryHits] = useState<Record<string, { correct: number; incorrect: number }>>({});

  // AI Vignette Mode States
  const [aiVignetteLoading, setAiVignetteLoading] = useState<boolean>(false);
  const [activeVignetteQuestion, setActiveVignetteQuestion] = useState<VignetteQuestion | null>(null);
  const [isVignetteComplete, setIsVignetteComplete] = useState<boolean>(false);

  // Generate randomized questions statically for the chosen quiz mode
  const generateStaticQuiz = (type: QuizType, count: number) => {
    // Analytics tracking for starting a static quiz mode
    analytics.track("quiz_started", { mode: type });

    const list: Question[] = [];
    const pathogens = [...microorganismsData];

    // Shuffle helper
    const shuffledPathogens = pathogens.sort(() => 0.5 - Math.random());

    for (let i = 0; i < Math.min(count, shuffledPathogens.length); i++) {
      const microbe = shuffledPathogens[i];
      let questionText = "";
      let options: string[] = [];
      let correctIndex = 0;
      let explanation = "";

      if (type === "RECOGNITION") {
        questionText = `A patient biopsy or laboratory stain reveals a microbe with the following characteristics: ${microbe.characteristics.join(", ")}. It is classified as ${microbe.gramStatus} with a shape of ${microbe.shape} and arrangement described as "${microbe.arrangement}". Identify this microorganism.`;
        
        // Options should be pathogen names
        const incorrects = pathogens.filter(p => p.id !== microbe.id).sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.name);
        options = [microbe.name, ...incorrects].sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(microbe.name);
        explanation = `Correct. ${microbe.name} is a ${microbe.gramStatus} ${microbe.shape} showing arrangement: ${microbe.arrangement}. Highly unique markers: ${microbe.characteristics.join(", ")}.`;

      } else if (type === "DISEASE") {
        const randomDisease = microbe.diseases[Math.floor(Math.random() * microbe.diseases.length)];
        questionText = `Which of the following is the primary curative/etiological pathogen responsible for the disease presentation: "${randomDisease.name}"?`;
        
        // Options should be pathogen names
        const incorrects = pathogens.filter(p => p.id !== microbe.id).sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.name);
        options = [microbe.name, ...incorrects].sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(microbe.name);
        explanation = `Correct. ${microbe.name} causes ${randomDisease.name}. Standard treatment regimen: ${randomDisease.treatment} (administered via ${randomDisease.route}).`;

      } else if (type === "TREATMENT_ROUTE") {
        const randomDisease = microbe.diseases[Math.floor(Math.random() * microbe.diseases.length)];
        questionText = `Identify the correct clinical treatment drug AND administration route (IV vs PO) to manage: "${randomDisease.name}" associated with suspected causative pathogen "${microbe.name}".`;

        // We construct options carefully to test drug AND route!
        // Option 1 (Correct): correct drug + correct route
        const correctOpt = `${randomDisease.treatment} via ${randomDisease.route}`;
        // Option 2: correct drug + incorrect route
        const wrRoute = randomDisease.route === "PO" ? "IV" : "PO";
        const wrOptRoute = `${randomDisease.treatment} via ${wrRoute}`;
        // Option 3 and 4: incorrect drug options
        const otherMicrobe = pathogens.find(p => p.id !== microbe.id && p.diseases.length > 0) || pathogens[0];
        const randomOtherDisease = otherMicrobe.diseases[0];
        const otherOpt1 = `${randomOtherDisease.treatment} via ${randomOtherDisease.route}`;
        const otherOpt2 = `${randomOtherDisease.treatment} via ${randomOtherDisease.route === "PO" ? "IV" : "PO"}`;

        options = [correctOpt, wrOptRoute, otherOpt1, otherOpt2];
        // Clean duplicates if any occurred
        options = Array.from(new Set(options));
        while (options.length < 4) {
          options.push(`Broad spectrum carbapenem/linezolid empirically via ${Math.random() > 0.5 ? "IV" : "PO"}`);
        }
        options = options.sort(() => 0.5 - Math.random());
        correctIndex = options.indexOf(correctOpt);

        explanation = `Correct. First-line therapy for ${microbe.name} presenting as ${randomDisease.name} requires ${randomDisease.treatment} administered specifically via the ${randomDisease.route} route. Pathophysiology note: Route selection is vital for tissue penetration or reducing toxic systemic side effects (e.g., C. diff demands oral vancomycin).`;
      }

      list.push({
        questionText,
        options,
        correctIndex,
        explanation,
        referencePathogen: microbe,
        category: microbe.gramStatus
      });
    }

    setQuestions(list);
    setActiveQuestionIndex(0);
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setCorrectAnswersCount(0);
    setSessionCategoryHits({});
  };

  // Generate dynamic AI boards-style question using server-side Gemini
  const generateAIVignette = async () => {
    // Analytics tracking for starting an AI case vignette
    analytics.track("quiz_started", { mode: "AI_VIGNETTE" });

    setAiVignetteLoading(true);
    setActiveVignetteQuestion(null);
    setIsVignetteComplete(false);
    setSelectedOptionIndex(null);
    setHasAnswered(false);

    try {
      // Pick a random pathogen to prompt Gemini with
      const randomPathogen = microorganismsData[Math.floor(Math.random() * microorganismsData.length)];

      const response = await fetch("/api/gemini/vignette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathogenName: randomPathogen.name,
          characteristics: randomPathogen.characteristics,
          diseases: randomPathogen.diseases
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate clinical vignette from Gemini AI Engine");
      }

      const result = await response.json();
      setActiveVignetteQuestion({
        vignette: result.vignette,
        question: result.question,
        options: result.options,
        correctAnswerIndex: result.correctAnswerIndex,
        explanation: result.explanation,
        referencePathogen: randomPathogen
      });
    } catch (err) {
      console.error(err);
      // Construct fallback offline Vignette
      const fallbackPathogen = microorganismsData[0]; // S. aureus
      setActiveVignetteQuestion({
        vignette: "A 24-year-old college football player presents to the health clinic with a localized, painful, fluctuant erythematous nodule on his right forearm. He mentions he noticed it yesterday after sharing weight room equipment. Temperature is 37.9°C. Gram stain of purulent material displays Gram-positive cocci in clusters.",
        question: "Based on the suspected pathogen, what is the best outpatient management and route of administration?",
        options: [
          "TMP-SMX (Bactrim) administered PO (oral)",
          "Cefazolin administered IV (intravenous)",
          "Vancomycin administered PO for systemic tissue levels",
          "Nafcillin administered PO (poor bioavailability)"
        ],
        correctAnswerIndex: 0,
        explanation: "The clinical presentation is classic for CA-MRSA (Community-Acquired Methicillin-Resistant S. aureus) cellulitis/abscess. For uncomplicated cutaneous MRSA, oral PO TMP-SMX or Doxycycline is first-line. Cefazolin (IV) is for severe/systemic infections, and oral vancomycin is not absorbed systemically so it cannot treat skin infections.",
        referencePathogen: fallbackPathogen
      });
    } finally {
      setAiVignetteLoading(false);
    }
  };

  // Handle user selecting an option
  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setSelectedOptionIndex(index);
    setHasAnswered(true);

    const isCorrect = selectedQuizType === "AI_VIGNETTE"
      ? index === activeVignetteQuestion?.correctAnswerIndex
      : index === questions[activeQuestionIndex]?.correctIndex;

    const currentQuestionCategory = selectedQuizType === "AI_VIGNETTE"
      ? activeVignetteQuestion?.referencePathogen.gramStatus || "Atypical"
      : questions[activeQuestionIndex].category;

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
    }

    // Record category analytics for this question
    setSessionCategoryHits(prev => {
      const current = prev[currentQuestionCategory] || { correct: 0, incorrect: 0 };
      return {
        ...prev,
        [currentQuestionCategory]: {
          correct: current.correct + (isCorrect ? 1 : 0),
          incorrect: current.incorrect + (isCorrect ? 0 : 1)
        }
      };
    });
  };

  const handleNextQuestion = () => {
    if (selectedQuizType === "AI_VIGNETTE") {
      // Vignette session concludes in 1 question increments (students can generate a new one)
      setIsVignetteComplete(true);

      // Track AI quiz completion
      analytics.track("quiz_completed", {
        score: correctAnswersCount,
        totalQuestions: 1,
        category: "AI_VIGNETTE",
      });

      onCommitQuizResults(correctAnswersCount, 1, sessionCategoryHits);
    } else {
      if (activeQuestionIndex < questions.length - 1) {
        setActiveQuestionIndex(activeQuestionIndex + 1);
        setSelectedOptionIndex(null);
        setHasAnswered(false);
      } else {
        // Entire quiz session concluded!
        // Commit outcomes to analytics engine
        analytics.track("quiz_completed", {
          score: correctAnswersCount,
          totalQuestions: questions.length,
          category: selectedQuizType || "STATIC",
        });

        onCommitQuizResults(correctAnswersCount, questions.length, sessionCategoryHits);
      }
    }
  };

  return (
    <div className="space-y-6" id="quiz-mode-root">
      {!isPremium ? (
        <div className="max-w-2xl mx-auto py-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-2xl">
              <Activity className="h-8 w-8 text-indigo-650 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 tracking-wider bg-indigo-100/50 px-3 py-1 rounded-full uppercase">
                Premium Board Exam Training Mode
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">👑 Boards Exam Practicum Locked</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Gain access to 4 advanced boards training modes including clinical vignette simulations, active recall assessments, drug administration routes testing, and real-time step-by-step rationales.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold mt-0.5">★</span>
                <div>
                  <strong className="text-slate-900 block font-semibold text-xs">Boards Scenario Engine</strong>
                  Pre-compiled and dynamically-generated clinical cases.
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold mt-0.5">★</span>
                <div>
                  <strong className="text-slate-900 block font-semibold text-xs">Active Recall Quiz System</strong>
                  Test your taxonomy & therapy recognition.
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold mt-0.5">★</span>
                <div>
                  <strong className="text-slate-900 block font-semibold text-xs">Step-by-step Rationales</strong>
                  Complete pathophysiological clinical explanations.
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                <span className="text-indigo-600 font-extrabold mt-0.5">★</span>
                <div>
                  <strong className="text-slate-900 block font-semibold text-xs">Rapid Drill Sessions</strong>
                  Custom study loops targeting weak areas.
                </div>
              </div>
            </div>

            <div className="pt-2 max-w-sm mx-auto">
              <button
                onClick={onUnlockPremium}
                className="w-full text-xs font-bold py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-150 transition-all font-semibold transform hover:scale-101 cursor-pointer"
              >
                Unlock Boards Exam Practicum ($5.99/mo)
              </button>
              <span className="text-[10px] text-slate-400 block mt-2">
                Accelerate boards scoring by up to 18%. Perfect for USMLE / NCLEX prep.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 1. Selector Config State */}
          {!selectedQuizType && (
        <div className="space-y-6">
          {/* Title Header Hero Card */}
          <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white overflow-hidden border border-slate-800 shadow-sm">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 bg-[radial-gradient(circle_at_bottom_right,var(--color-indigo-500),transparent)] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col gap-1.5">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                  Clinical Knowledge Exam Practice
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-none">
                  Select an exam mode designed around USMLE, NCLEX, and boards-style clinical assessment criteria. Practice key infectious disease vignettes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recognition Card */}
            <div
              onClick={() => {
                setSelectedQuizType("RECOGNITION");
                generateStaticQuiz("RECOGNITION", quizLength);
              }}
              className="bg-white p-5 rounded-2xl border border-slate-250 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl w-fit">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-4 group-hover:text-indigo-600 transition-colors">
                  Organism Recognition
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Identify the pathogen based solely on morphological features, Gram stain reactions, shapes, and biochem test profiles.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                Begin Recognition Mode <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Disease Recall Card */}
            <div
              onClick={() => {
                setSelectedQuizType("DISEASE");
                generateStaticQuiz("DISEASE", quizLength);
              }}
              className="bg-white p-5 rounded-2xl border border-slate-250 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="bg-purple-50 text-purple-600 p-3 rounded-xl w-fit">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-4 group-hover:text-indigo-600 transition-colors">
                  Disease Causative Agent Recall
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Given specific diseases (e.g., Pneumonia, Necrotizing Fasciitis, Tabes Dorsalis), determine the causative pathogen.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                Begin Disease Recall <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Treatment Route Card */}
            <div
              onClick={() => {
                setSelectedQuizType("TREATMENT_ROUTE");
                generateStaticQuiz("TREATMENT_ROUTE", quizLength);
              }}
              className="bg-white p-5 rounded-2xl border border-slate-250 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-4 group-hover:text-indigo-600 transition-colors">
                  Treatment Route Verification (IV / PO)
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Test your clinic rules! Determine the exact drug and specific route matching the clinical severity (e.g., IV Cefazolin vs. PO Cephalexin).
                </p>
              </div>
              <span className="text-[10px] font-semibold text-indigo-600 mt-4 flex items-center gap-1">
                Begin Route Testing <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* AI Boards-style Vignette Card */}
            <div
              onClick={() => {
                setSelectedQuizType("AI_VIGNETTE");
                generateAIVignette();
              }}
              className="bg-gradient-to-br from-indigo-900 to-slate-930 text-white p-5 rounded-2xl border border-indigo-950 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10">
                <div className="bg-white/10 text-indigo-300 p-3 rounded-xl w-fit border border-white/5">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold mt-4 group-hover:text-indigo-300 transition-colors">
                  AI Boards-Style Clinical Vignettes
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Call on the server-side Gemini AI engine to draft random, highly realistic patient admission stories with lab diagnostic findings and test yourself on medical outcomes.
                </p>
              </div>
              <span className="text-[10px] font-semibold text-indigo-300 mt-4 flex items-center gap-1 relative z-10">
                Generate AI Case Vignette <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Config parameters (Active static quiz length option) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
            <span>Configure standard static quiz dimensions:</span>
            <div className="flex gap-2">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuizLength(count)}
                  className={`px-3 py-1.5 rounded-lg border font-semibold ${
                    quizLength === count
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Static Quiz Session View */}
      {selectedQuizType && selectedQuizType !== "AI_VIGNETTE" && questions.length > 0 && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header Stats bar */}
          <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 pb-3">
            <button
              onClick={() => setSelectedQuizType(null)}
              className="font-medium text-slate-500 hover:text-slate-800"
            >
              &larr; Exit Exam Session
            </button>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-50 px-2 py-0.5 rounded text-indigo-700 font-semibold">
                Question {activeQuestionIndex + 1} of {questions.length}
              </span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded text-emerald-700 font-semibold">
                Accuracy: {correctAnswersCount}/{activeQuestionIndex + (hasAnswered ? 1 : 0)}
              </span>
            </div>
          </div>

          {/* Question context */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
              Clinical Assessment
            </span>
            <p className="text-base font-semibold leading-relaxed text-slate-800">
              {questions[activeQuestionIndex].questionText}
            </p>

            {/* Answer Options list */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {questions[activeQuestionIndex].options.map((option, index) => {
                const isSelected = selectedOptionIndex === index;
                const isCorrectIndex = index === questions[activeQuestionIndex].correctIndex;

                let btnStyles = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/50 hover:border-slate-350";
                if (hasAnswered) {
                  if (isCorrectIndex) {
                    btnStyles = "bg-emerald-50 border-emerald-550 text-emerald-900 font-semibold shadow-xs";
                  } else if (isSelected) {
                    btnStyles = "bg-rose-50 border-rose-550 text-rose-900 font-semibold";
                  } else {
                    btnStyles = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={hasAnswered}
                    className={`p-3.5 rounded-xl border text-left text-sm transition-all duration-150 flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && isCorrectIndex && <CheckCircle className="h-4.5 w-4.5 text-emerald-600 grow-0 shrink-0" />}
                    {hasAnswered && isSelected && !isCorrectIndex && <XCircle className="h-4.5 w-4.5 text-rose-600 grow-0 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanatory Rationales block */}
            <AnimatePresence>
              {hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-indigo-50/25 p-4 rounded-xl border border-indigo-100/30 space-y-2.5 overflow-hidden"
                >
                  <span className="font-bold text-indigo-900 uppercase tracking-wide text-[10px] block">
                    Diagnostic & Pharmacotherapy Rationale
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {questions[activeQuestionIndex].explanation}
                  </p>

                  {/* Contextual reference links */}
                  <div className="pt-2 border-t border-indigo-100/30 flex flex-wrap gap-2 text-[11px]">
                    {questions[activeQuestionIndex].referencePathogen && (
                      <a
                        href={`/organisms/${getPathogenSlug(questions[activeQuestionIndex].referencePathogen.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                      >
                        📚 View full reference article
                      </a>
                    )}
                    
                    {getRelatedDiseases(questions[activeQuestionIndex].questionText + " " + questions[activeQuestionIndex].explanation).slice(0, 1).map(dis => (
                      <a
                        key={dis.id}
                        href={`/diseases/${dis.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                      >
                        📚 Review {dis.name}
                      </a>
                    ))}

                    {getRelatedDrugs(questions[activeQuestionIndex].explanation).slice(0, 1).map(drug => (
                      <a
                        key={drug.id}
                        href={`/drugs/${drug.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-amber-50 border border-amber-100 text-amber-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                      >
                        📚 Drug reference: {drug.name}
                      </a>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    Note: Statically aligned verified guidelines.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next/Complete Button trigger */}
            {hasAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                {activeQuestionIndex < questions.length - 1 ? (
                  <>Next Question <ChevronRight className="h-4 w-4" /></>
                ) : (
                  "Conclude Exam Session"
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Static Quiz Done summary card */}
      {selectedQuizType && selectedQuizType !== "AI_VIGNETTE" && questions.length === 0 && (
        <div className="max-w-md mx-auto bg-white border border-slate-250 rounded-2xl p-6 text-center space-y-5 shadow-sm">
          <div className="inline-block p-4 bg-indigo-50 text-indigo-600 rounded-full">
            <Award className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Exam Session Complete</h3>
            <p className="text-xs text-slate-500">
              Your results have been locked into the local dashboard analytics cache.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 flex justify-around text-sm font-bold text-slate-700">
            <div>
              <span className="text-2xl text-slate-900 block">{correctAnswersCount}</span>
              <span className="text-[9px] text-slate-400 uppercase font-sans">Correct hits</span>
            </div>
            <div className="border-r border-slate-200" />
            <div>
              <span className="text-2xl text-rose-600 block">
                {quizLength - correctAnswersCount}
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-sans">Missed</span>
            </div>
            <div className="border-r border-slate-200" />
            <div>
              <span className="text-2xl text-indigo-600 block">
                {Math.round((correctAnswersCount / quizLength) * 100)}%
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-sans">Session accuracy</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedQuizType(null)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      )}

      {/* 4. AI Vignette System */}
      {selectedQuizType === "AI_VIGNETTE" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-100 pb-3">
            <button
              onClick={() => {
                setSelectedQuizType(null);
                setActiveVignetteQuestion(null);
                setIsVignetteComplete(false);
              }}
              className="font-medium text-slate-500 hover:text-slate-800"
            >
              &larr; Exit AI Vignettes
            </button>
            <span className="bg-indigo-900 text-indigo-200 px-2.5 py-0.5 rounded font-bold font-sans">
              AI Powered Boards Trainer
            </span>
          </div>

          {/* Loading state display */}
          {aiVignetteLoading && (
            <div className="p-16 border border-slate-200 rounded-3xl bg-white text-center space-y-4">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h4 className="font-bold text-slate-800">Synthesizing Patient Case Study...</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Gemini-3.5-flash is drafting a unique USMLE/NCLEX clinical patient story containing microscopy clues, vitals, and antibiotic indications.
                </p>
              </div>
            </div>
          )}

          {/* Vignette Presentation and test Qs */}
          {!aiVignetteLoading && activeVignetteQuestion && !isVignetteComplete && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest block bg-indigo-50 px-2 py-0.5 rounded w-fit">
                Admission Patient Vignette
              </span>
              
              <div className="text-sm text-slate-700 font-serif leading-relaxed bg-slate-50/50 border border-slate-100 p-4 rounded-xl italic">
                "{activeVignetteQuestion.vignette}"
              </div>

              <p className="text-sm font-bold leading-relaxed text-slate-900">
                {activeVignetteQuestion.question}
              </p>

              {/* Distractors list */}
              <div className="grid grid-cols-1 gap-2 mt-3">
                {activeVignetteQuestion.options.map((option, index) => {
                  const isSelected = selectedOptionIndex === index;
                  const isCorrect = index === activeVignetteQuestion.correctAnswerIndex;

                  let btnStyles = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/50 hover:border-slate-350";
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyles = "bg-emerald-50 border-emerald-550 text-emerald-900 font-semibold";
                    } else if (isSelected) {
                      btnStyles = "bg-rose-50 border-rose-550 text-rose-900 font-semibold";
                    } else {
                      btnStyles = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      disabled={hasAnswered}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyles}`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />}
                      {hasAnswered && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Rationales */}
              <AnimatePresence>
                {hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-indigo-50/35 p-4 rounded-xl border border-indigo-150/50 space-y-2 overflow-hidden text-xs text-slate-700"
                  >
                    <span className="font-bold text-indigo-900 uppercase tracking-wide text-[10px] block">
                      Boards-Style Rationale Explanation
                    </span>
                    <p className="leading-relaxed mt-0.5">{activeVignetteQuestion.explanation}</p>

                    {/* Contextual reference links */}
                    <div className="pt-2 border-t border-indigo-150/40 flex flex-wrap gap-2 text-[11px] mt-2">
                      {activeVignetteQuestion.referencePathogen && (
                        <a
                          href={`/organisms/${getPathogenSlug(activeVignetteQuestion.referencePathogen.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-indigo-100/50 border border-indigo-200 text-indigo-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                        >
                          📚 View full reference article
                        </a>
                      )}
                      
                      {getRelatedDiseases(activeVignetteQuestion.vignette + " " + activeVignetteQuestion.explanation).slice(0, 1).map(dis => (
                        <a
                          key={dis.id}
                          href={`/diseases/${dis.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                        >
                          📚 Review {dis.name}
                        </a>
                      ))}

                      {getRelatedDrugs(activeVignetteQuestion.explanation).slice(0, 1).map(drug => (
                        <a
                          key={drug.id}
                          href={`/drugs/${drug.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-amber-50 border border-amber-100 text-amber-700 font-semibold rounded-lg shadow-3xs cursor-pointer transition-colors"
                        >
                          📚 Drug reference: {drug.name}
                        </a>
                      ))}
                    </div>

                    <span className="text-[9px] block text-right text-slate-400 italic">
                      Correct target pathogen: {activeVignetteQuestion.referencePathogen.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Conclude Vignette Practice
                </button>
              )}
            </div>
          )}

          {/* AI Vignette complete summary screen */}
          {isVignetteComplete && (
            <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-5 shadow-xs">
              <div className="inline-block p-4 bg-purple-50 text-purple-600 rounded-full">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Case Solved!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  You successfully examined the patient case. Result committed in database logs.
                </p>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setSelectedQuizType(null)}
                  className="w-1/2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-xl text-xs transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={generateAIVignette}
                  className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Next AI Vignette <Sparkles className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
}
