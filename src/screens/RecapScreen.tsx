import type { SessionResult } from '../types';
import { CATEGORY_LABELS, type Category } from '../lib/questions';

interface Props {
  result: SessionResult;
  onHome: () => void;
  onAgain: () => void;
}

export function RecapScreen({ result, onHome, onAgain }: Props) {
  const pct = Math.round((result.correctCount / result.questionsCount) * 100);
  const message =
    pct === 100 ? 'Sans-faute, bravo !' :
    pct >= 80 ? 'Très bon score, tu es prêt(e).' :
    pct >= 50 ? 'Bonne base, continue à réviser.' :
    'On y retravaille — la répétition fait tout.';

  return (
    <div className="recap-card">
      <h2>Séance terminée</h2>
      <p style={{ margin: 0, color: 'var(--texte-doux)' }}>{message}</p>

      <div className="recap-score">
        {result.correctCount}<span className="total"> / {result.questionsCount}</span>
      </div>

      <div style={{ textAlign: 'left' }}>
        {(Object.keys(result.byCategory) as Category[]).map((cat) => {
          const slot = result.byCategory[cat]!;
          return (
            <div key={cat} className="category-row">
              <span className="name">{CATEGORY_LABELS[cat]}</span>
              <div className="bar">
                <div style={{ width: `${(slot.correct / slot.total) * 100}%` }} />
              </div>
              <span className="pct">{slot.correct}/{slot.total}</span>
            </div>
          );
        })}
      </div>

      <div className="recap-actions">
        <button className="btn btn-primary" onClick={onAgain}>Encore une séance</button>
        <button className="btn btn-ghost" onClick={onHome}>Retour à l'accueil</button>
      </div>
    </div>
  );
}
