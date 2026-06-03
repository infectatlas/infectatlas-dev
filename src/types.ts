import { Microorganism } from "./data/microorganisms";

export interface StudyList {
  id: string;
  name: string;
  description: string;
  pathogenIds: string[];
  createdAt: string;
}

export interface SpacedRepetitionItem {
  pathogenId: string;
  intervalDays: number; // Interval for SR (1, 3, 7, 14, 30, etc.)
  easinessFactor: number; // EF modifier
  repetitions: number;
  nextReviewDate: string; // ISO String
  lastReviewed?: string;
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
