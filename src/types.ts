import { Microorganism } from "./data/microorganisms";

export interface StudyList {
  id: string;
  name: string;
  description: string;
  pathogenIds: string[];
  createdAt: string;
}

export interface Question {
  id: string;
  organism: string;
  difficulty: "easy" | "medium" | "hard";
  type: "mcq" | "true_false" | "short_answer" | "multi_select" | "vignette";
  topic: "classification" | "clinical" | "treatment" | "differential" | "diagnostics" | "resistance";
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface SessionStats {
  accuracy: number;
  difficultyBreakdown: { easy: number; medium: number; hard: number };
  weakTopics: string[];
  missedQuestionsCount: number;
}

export interface QuizSessionStats {
  correct: number;
  incorrect: number;
  totalAnswered: number;
  questionsLog: {
    questionText: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timestamp: string;
  }[];
}

export interface PerformanceAnalytics {
  totalQuestionsAnswered: number;
  totalCorrect: number;
  currentStreak: number;
  lastStudyDate?: string;
  questionsPerPathogen: Record<string, { correct: number; incorrect: number }>;
  questionsPerCategory: Record<string, { correct: number; incorrect: number }>; // e.g. "Gram-positive", "Gram-negative"
  studyHistory: {
    date: string; // YYYY-MM-DD
    questionsAttempted: number;
    correctCount: number;
  }[];
}

export interface SpacedRepetitionItem {
  pathogenId: string;
  intervalDays: number;
  easinessFactor: number;
  repetitions: number;
  nextReviewDate: string;
}
