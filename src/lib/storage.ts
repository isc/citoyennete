import type { UserProfile, Card } from '../types';
import { QUESTIONS, type ExamLevel } from './questions';
import { todayISO } from './utils';

const STORAGE_KEY = 'citoyennete-profile';

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UserProfile>;
      return reconcileWithBank(parsed);
    }
  } catch {
    // fall through to fresh profile
  }
  return createNewProfile();
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function createNewProfile(): UserProfile {
  return {
    startDate: todayISO(),
    examLevel: null,
    cards: QUESTIONS.map(createCard),
    totalSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastSessionDate: null,
    sessionHistory: [],
  };
}

export function resetProfile(): UserProfile {
  const fresh = createNewProfile();
  saveProfile(fresh);
  return fresh;
}

export function setExamLevel(profile: UserProfile, level: ExamLevel): UserProfile {
  return { ...profile, examLevel: level };
}

function createCard(q: { id: string }): Card {
  return {
    questionId: q.id,
    box: 1,
    lastSeen: '',
    nextDue: '',
    history: [],
    introduced: false,
  };
}

/**
 * Réconcilie un profil persisté avec la banque actuelle :
 * - garde la progression (cartes existantes) sur les questions encore présentes
 * - ajoute des cartes pour les questions nouvellement introduites
 * - injecte les valeurs par défaut sur les champs ajoutés au schéma au fil du temps
 */
function reconcileWithBank(profile: Partial<UserProfile>): UserProfile {
  const knownIds = new Set(QUESTIONS.map((q) => q.id));
  const existingCards = profile.cards ?? [];
  const existingIds = new Set(existingCards.map((c) => c.questionId));

  const kept = existingCards.filter((c) => knownIds.has(c.questionId));
  const added = QUESTIONS.filter((q) => !existingIds.has(q.id)).map(createCard);

  return {
    startDate: profile.startDate ?? todayISO(),
    examLevel: profile.examLevel ?? null,
    cards: [...kept, ...added],
    totalSessions: profile.totalSessions ?? 0,
    currentStreak: profile.currentStreak ?? 0,
    longestStreak: profile.longestStreak ?? 0,
    lastSessionDate: profile.lastSessionDate ?? null,
    sessionHistory: profile.sessionHistory ?? [],
  };
}
