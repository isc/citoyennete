import type { Category, ExamLevel } from './lib/questions';

export type BoxLevel = 1 | 2 | 3 | 4 | 5;

export const BOX_INTERVALS: Record<BoxLevel, number> = {
  1: 0,
  2: 1,
  3: 3,
  4: 7,
  5: 21,
};

export interface Attempt {
  date: string;
  correct: boolean;
  responseTimeMs: number;
}

export interface Card {
  questionId: string;
  box: BoxLevel;
  lastSeen: string;
  nextDue: string;
  history: Attempt[];
  introduced: boolean;
}

export interface SessionResult {
  date: string;
  questionsCount: number;
  correctCount: number;
  byCategory: Partial<Record<Category, { total: number; correct: number }>>;
}

export interface UserProfile {
  startDate: string;
  /** Niveau d'examen visé. `null` tant que l'utilisateur n'a pas choisi. */
  examLevel: ExamLevel | null;
  cards: Card[];
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string | null;
  sessionHistory: SessionResult[];
}
