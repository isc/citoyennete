import { useState } from 'react';
import type { ExamLevel } from '../lib/questions';

interface Props {
  initial: ExamLevel | null;
  onChoose: (level: ExamLevel) => void;
  onCancel?: () => void;
}

/**
 * Choix du niveau d'examen civique. Pensé en FALC :
 * - phrases courtes
 * - 2 grandes cartes cliquables, sans jargon
 * - explication détaillée disponible à la demande
 */
export function OnboardingScreen({ initial, onChoose, onCancel }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="onboarding">
      <h2 className="onboarding-title">Quel examen tu prépares ?</h2>
      <p className="onboarding-sub">
        Il y a deux examens civiques en France. Choisis celui qui correspond à ta démarche.
      </p>

      <button
        className="onboarding-card"
        onClick={() => onChoose('csp')}
        aria-pressed={initial === 'csp'}
      >
        <div className="onboarding-card-title">Pour rester en France</div>
        <div className="onboarding-card-sub">Carte de séjour pluriannuelle (2 à 4 ans)</div>
        <div className="onboarding-card-detail">191 questions · niveau A2</div>
      </button>

      <button
        className="onboarding-card"
        onClick={() => onChoose('cr')}
        aria-pressed={initial === 'cr'}
      >
        <div className="onboarding-card-title">Pour devenir français</div>
        <div className="onboarding-card-sub">Carte de résident (10 ans) ou naturalisation</div>
        <div className="onboarding-card-detail">209 questions · niveau B2</div>
      </button>

      <button
        type="button"
        className="link-btn onboarding-help"
        onClick={() => setShowDetails((s) => !s)}
      >
        {showDetails ? 'Masquer l\'explication' : 'Je ne sais pas, explique-moi'}
      </button>

      {showDetails && (
        <div className="onboarding-details">
          <p>
            <strong>La carte de séjour pluriannuelle</strong> permet de vivre en
            France entre 2 et 4 ans. Elle est demandée après le premier titre
            d'un an. L'examen est court et porte sur la vie quotidienne.
          </p>
          <p>
            <strong>La carte de résident</strong> permet de vivre en France
            pendant 10 ans. Elle est aussi exigée pour devenir français
            (naturalisation). L'examen est plus long et porte aussi sur les
            institutions, l'histoire et le droit.
          </p>
          <p className="onboarding-details-note">
            Tu pourras changer ce choix plus tard depuis la page d'accueil.
          </p>
        </div>
      )}

      {onCancel && initial && (
        <div className="onboarding-cancel">
          <button className="btn btn-ghost" onClick={onCancel}>Annuler</button>
        </div>
      )}
    </div>
  );
}
