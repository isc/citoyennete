import type { UserProfile, Card } from '../types';
import { QUESTIONS } from './questions';
import { todayISO } from './utils';

const STORAGE_KEY = 'citoyennete-profile';

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserProfile;
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
 * Si la banque évolue (questions ajoutées / retirées), on ajuste le profil
 * sans perdre la progression existante.
 */
function reconcileWithBank(profile: UserProfile): UserProfile {
  const knownIds = new Set(QUESTIONS.map((q) => q.id));
  const existingIds = new Set(profile.cards.map((c) => c.questionId));

  const kept = profile.cards.filter((c) => knownIds.has(c.questionId));
  const added = QUESTIONS.filter((q) => !existingIds.has(q.id)).map(createCard);

  return { ...profile, cards: [...kept, ...added] };
}
