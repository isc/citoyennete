import type { UserProfile } from '../types';
import {
  CATEGORY_LABELS,
  EXAM_LEVEL_LABELS,
  QUESTIONS,
  questionLevels,
  type Category,
  type ExamLevel,
} from '../lib/questions';
import { needsReview } from '../lib/leitner';
import { todayISO } from '../lib/utils';

interface Props {
  profile: UserProfile;
  onStart: () => void;
  onReset: () => void;
  onChangeLevel: () => void;
}

export function HomeScreen({ profile, onStart, onReset, onChangeLevel }: Props) {
  const today = todayISO();
  const level: ExamLevel = profile.examLevel ?? 'cr';
  const levelQuestions = QUESTIONS.filter((q) => questionLevels(q).includes(level));
  const levelIds = new Set(levelQuestions.map((q) => q.id));

  const levelCards = profile.cards.filter((c) => levelIds.has(c.questionId));
  const dueCount = levelCards.filter((c) => needsReview(c, today)).length;
  const introducedCount = levelCards.filter((c) => c.introduced).length;
  const totalCount = levelQuestions.length;

  const categoryStats = computeCategoryStats(profile, levelIds);

  return (
    <div>
      <div className="level-banner">
        <span className="level-label">{EXAM_LEVEL_LABELS[level]}</span>
        <button className="link-btn" onClick={onChangeLevel}>Changer</button>
      </div>

      {introducedCount === 0 ? (
        <p className="home-intro">
          Révise les énoncés officiels de l'<strong>examen civique</strong> ({EXAM_LEVEL_LABELS[level]}),
          publiés par le ministère de l'Intérieur. {totalCount} questions, réparties par
          thème, présentées par paquets et revues à intervalles croissants au fil
          des séances.
        </p>
      ) : (
        <div className="home-stats">
          <div className="stat-card">
            <div className="value">{dueCount}</div>
            <div className="label">À réviser</div>
          </div>
          <div className="stat-card">
            <div className="value">{introducedCount}<span className="value-total"> / {totalCount}</span></div>
            <div className="label">Vues</div>
          </div>
          <div className="stat-card">
            <div className="value">{profile.currentStreak}</div>
            <div className="label">Série (jours)</div>
          </div>
        </div>
      )}

      {dueCount === 0 && introducedCount === totalCount && (
        <p className="home-message">
          Bravo, plus rien d'urgent à réviser ! Reviens demain ou lance une séance bonus.
        </p>
      )}

      <button className="btn btn-primary home-cta" onClick={onStart}>
        {introducedCount === 0 ? 'Commencer' : 'Lancer une séance'}
      </button>

      {introducedCount > 0 && (
        <div className="category-progress">
          <h2>Progression par thème</h2>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => {
            const stat = categoryStats[cat];
            const pct = stat.total === 0 ? 0 : Math.round((stat.progress / stat.total) * 100);
            return (
              <div key={cat} className="category-row">
                <span className="name">{CATEGORY_LABELS[cat]}</span>
                <div className="bar">
                  <div style={{ width: `${pct}%` }} />
                </div>
                <span className="pct">{pct}%</span>
              </div>
            );
          })}
          <p className="category-progress-legend">
            0 % = jamais vue · 100 % = boîte 5 (revue à 21 j d'écart sans erreur).
          </p>
        </div>
      )}

      {introducedCount > 0 && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className="btn btn-ghost" onClick={onReset}>
            Réinitialiser ma progression
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Progression pondérée par boîte Leitner :
 *   box 1 = 0 %, box 2 = 25 %, box 3 = 50 %, box 4 = 75 %, box 5 = 100 %.
 * Une carte non encore introduite vaut 0. La somme par catégorie est ensuite
 * normalisée par le nombre total de questions de la catégorie pour le niveau
 * choisi.
 */
function computeCategoryStats(profile: UserProfile, levelIds: Set<string>) {
  const stats = {} as Record<Category, { total: number; progress: number }>;
  for (const cat of Object.keys(CATEGORY_LABELS) as Category[]) {
    stats[cat] = { total: 0, progress: 0 };
  }

  for (const q of QUESTIONS) {
    if (!levelIds.has(q.id)) continue;
    stats[q.category].total += 1;
    const card = profile.cards.find((c) => c.questionId === q.id);
    if (card && card.introduced) {
      stats[q.category].progress += (card.box - 1) / 4;
    }
  }

  return stats;
}
