import { FALC_PROMPTS } from './falcPrompts';

/**
 * FALC = « Facile À Lire et à Comprendre ».
 *
 * Chaque énoncé officiel peut avoir une version reformulée en langage simple,
 * proposée **en complément** de l'énoncé d'origine — jamais à la place : ce
 * qui sera lu le jour de l'examen, c'est le libellé officiel.
 *
 * Toutes les questions n'ont pas de version FALC : quand l'énoncé officiel est
 * déjà court et clair, en produire une paraphrase n'apporterait rien. Dans ce
 * cas `falcPromptFor` renvoie `undefined` et l'interface n'affiche pas le
 * bouton.
 */
export function falcPromptFor(questionId: string): string | undefined {
  const text = FALC_PROMPTS[questionId];
  return text && text.length > 0 ? text : undefined;
}

export function hasFalcPrompt(questionId: string): boolean {
  return falcPromptFor(questionId) !== undefined;
}

/**
 * La préférence FALC est un réglage d'accessibilité, pas de la progression :
 * on la stocke à part du profil pour qu'une réinitialisation de progression
 * ne la remette pas à zéro.
 */
const FALC_MODE_KEY = 'citoyennete-falc';

export function loadFalcMode(): boolean {
  try {
    return localStorage.getItem(FALC_MODE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveFalcMode(enabled: boolean): void {
  try {
    localStorage.setItem(FALC_MODE_KEY, enabled ? '1' : '0');
  } catch {
    // mode privé / stockage indisponible : on se contente de l'état en mémoire
  }
}
