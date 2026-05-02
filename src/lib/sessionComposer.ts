import type { Card } from '../types';
import { isDue, shouldIntroduceNew } from './leitner';
import { QUESTIONS } from './questions';
import { shuffle } from './utils';

export interface SessionItem {
  card: Card;
  isIntroduction: boolean;
}

const SESSION_LENGTH = 10;
const MAX_NEW_PER_SESSION = 5;

/**
 * Compose une séance :
 * - cartes dues aujourd'hui mais pas encore vues aujourd'hui (boîte basse en
 *   priorité, pour retravailler ce qu'on maîtrise le moins)
 * - complète avec jusqu'à MAX_NEW_PER_SESSION nouvelles introductions, soit
 *   parce que la condition leitner est remplie, soit parce qu'il n'y a rien
 *   d'autre à faire (cas des toutes premières séances)
 * - cap à SESSION_LENGTH cartes
 *
 * Pas de "bonus review" : une carte vue aujourd'hui n'est pas re-poussée
 * dans la même journée. Sinon les cartes fraîchement apprises reviennent
 * immédiatement et la répétition espacée perd son sens.
 */
export function composeSession(cards: Card[], today: string): SessionItem[] {
  const dueCards = cards
    .filter((c) => c.introduced && c.lastSeen !== today && isDue(c, today))
    .sort((a, b) => a.box - b.box);

  const items: SessionItem[] = dueCards.slice(0, SESSION_LENGTH).map((card) => ({
    card,
    isIntroduction: false,
  }));

  const allowIntro = items.length === 0 || shouldIntroduceNew(cards);
  if (allowIntro) {
    const newCardPool = cards.filter((c) => !c.introduced);
    const cap = Math.min(
      MAX_NEW_PER_SESSION,
      SESSION_LENGTH - items.length,
      newCardPool.length,
    );
    for (let i = 0; i < cap; i++) {
      items.push({ card: newCardPool[i], isIntroduction: true });
    }
  }

  return shuffle(items);
}

export function questionFor(card: Card) {
  return QUESTIONS.find((q) => q.id === card.questionId);
}
