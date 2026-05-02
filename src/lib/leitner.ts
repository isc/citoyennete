import type { Card, BoxLevel } from '../types';
import { BOX_INTERVALS } from '../types';

const SLOW_THRESHOLD_MS = 8000;

export function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function computeNextDue(box: BoxLevel, lastSeen: string): string {
  return addDays(lastSeen, BOX_INTERVALS[box]);
}

export function isDue(card: Card, today: string): boolean {
  if (!card.nextDue) return true;
  return card.nextDue <= today;
}

/**
 * - Bonne réponse rapide : promotion (max boîte 5)
 * - Bonne réponse lente : pas de promotion, mais on replanifie sur la boîte courante
 * - Mauvaise réponse : retour boîte 1
 */
export function processAnswer(
  card: Card,
  correct: boolean,
  responseTimeMs: number,
  now: string,
): Card {
  const attempt = { date: now, correct, responseTimeMs };
  const history = [...card.history, attempt].slice(-30);

  if (!correct) {
    const box: BoxLevel = 1;
    return { ...card, box, lastSeen: now, nextDue: computeNextDue(box, now), history };
  }

  if (responseTimeMs < SLOW_THRESHOLD_MS) {
    const box = Math.min(card.box + 1, 5) as BoxLevel;
    return { ...card, box, lastSeen: now, nextDue: computeNextDue(box, now), history };
  }

  return { ...card, lastSeen: now, nextDue: computeNextDue(card.box, now), history };
}

/**
 * On introduit un nouveau fait quand tous les introduits ont au moins atteint la boîte 2.
 * Évite de surcharger l'apprenant avec trop de nouveautés en parallèle.
 */
export function shouldIntroduceNew(cards: Card[]): boolean {
  const introduced = cards.filter((c) => c.introduced);
  if (introduced.length === 0) return true;
  return introduced.every((c) => c.box >= 2);
}
