import type { Card } from '../types';
import { isDue, shouldIntroduceNew } from './leitner';
import { QUESTIONS } from './questions';
import { shuffle } from './utils';

export interface SessionItem {
  card: Card;
  isIntroduction: boolean;
}

const TARGET_LENGTH = 10;
const MIN_LENGTH = 5;
const MAX_NEW_PER_SESSION = 3;

/**
 * Compose une séance :
 * 1. cartes en retard / dues du jour (boîte basse en priorité)
 * 2. complète avec jusqu'à 3 nouvelles introductions si autorisé
 * 3. complète avec des révisions bonus (cartes les plus anciennes vues)
 * 4. au tout début (peu de cartes introduites), force MIN_LENGTH nouveautés
 *    pour que la 1ʳᵉ séance ne soit pas vide
 */
export function composeSession(cards: Card[], today: string): SessionItem[] {
  const dueCards = cards
    .filter((c) => c.introduced && isDue(c, today))
    .sort((a, b) => a.box - b.box);

  const items: SessionItem[] = dueCards.slice(0, TARGET_LENGTH).map((card) => ({
    card,
    isIntroduction: false,
  }));

  const newCardPool = cards.filter((c) => !c.introduced);

  if (shouldIntroduceNew(cards)) {
    const cap = Math.min(MAX_NEW_PER_SESSION, TARGET_LENGTH - items.length);
    for (let i = 0; i < cap; i++) {
      const next = newCardPool[i];
      if (!next) break;
      items.push({ card: next, isIntroduction: true });
    }
  }

  // Première séance : pas assez de cartes connues pour remplir, on force le minimum
  // en puisant dans les nouveautés restantes.
  while (items.length < MIN_LENGTH) {
    const next = newCardPool[items.filter((i) => i.isIntroduction).length];
    if (!next) break;
    items.push({ card: next, isIntroduction: true });
  }

  if (items.length < TARGET_LENGTH) {
    const usedIds = new Set(items.map((i) => i.card.questionId));
    const bonus = cards
      .filter((c) => c.introduced && !usedIds.has(c.questionId))
      .sort((a, b) => (a.lastSeen || '').localeCompare(b.lastSeen || ''));
    for (const card of bonus) {
      if (items.length >= TARGET_LENGTH) break;
      items.push({ card, isIntroduction: false });
    }
  }

  return shuffle(items);
}

export function questionFor(card: Card) {
  return QUESTIONS.find((q) => q.id === card.questionId);
}
