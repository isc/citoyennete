import { useEffect, useMemo, useRef, useState } from 'react';
import type { Card, SessionResult, UserProfile } from '../types';
import { processAnswer } from '../lib/leitner';
import { composeSession, questionFor, type SessionItem } from '../lib/sessionComposer';
import { CATEGORY_LABELS, type Category } from '../lib/questions';
import { todayISO, shuffle } from '../lib/utils';

interface Props {
  profile: UserProfile;
  onFinish: (updated: UserProfile, result: SessionResult) => void;
}

interface ChoiceOrder {
  shuffled: string[];
  correctIndex: number;
}

export function SessionScreen({ profile, onFinish }: Props) {
  const [items] = useState<SessionItem[]>(() => composeSession(profile.cards, todayISO()));
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>(profile.cards);
  const [results, setResults] = useState<{ correct: boolean; category: Category }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const startedAt = useRef<number>(performance.now());

  const current = items[index];
  const question = current ? questionFor(current.card) : undefined;

  const choiceOrder = useMemo<ChoiceOrder | null>(() => {
    if (!question) return null;
    const indexed = question.choices.map((text, i) => ({ text, i }));
    const shuffled = shuffle(indexed);
    return {
      shuffled: shuffled.map((c) => c.text),
      correctIndex: shuffled.findIndex((c) => c.i === question.answerIndex),
    };
  }, [question]);

  useEffect(() => {
    startedAt.current = performance.now();
    setSelected(null);
  }, [index]);

  if (!current || !question || !choiceOrder) {
    return (
      <div className="recap-card">
        <h2>Aucune question disponible</h2>
        <p>Reviens plus tard ou réinitialise ton profil.</p>
      </div>
    );
  }

  function handleSelect(choiceIdx: number) {
    if (selected !== null) return;
    setSelected(choiceIdx);
  }

  function handleNext() {
    if (selected === null || !current || !question || !choiceOrder) return;
    const elapsed = performance.now() - startedAt.current;
    const correct = selected === choiceOrder.correctIndex;
    const now = todayISO();

    const updatedCard = processAnswer(
      { ...current.card, introduced: true },
      correct,
      elapsed,
      now,
    );
    const newCards = cards.map((c) =>
      c.questionId === updatedCard.questionId ? updatedCard : c,
    );
    setCards(newCards);
    setResults((r) => [...r, { correct, category: question.category }]);

    if (index + 1 >= items.length) {
      finishSession(newCards, [...results, { correct, category: question.category }]);
    } else {
      setIndex(index + 1);
    }
  }

  function finishSession(
    finalCards: Card[],
    finalResults: { correct: boolean; category: Category }[],
  ) {
    const today = todayISO();
    const correctCount = finalResults.filter((r) => r.correct).length;

    const byCategory: SessionResult['byCategory'] = {};
    for (const r of finalResults) {
      const slot = byCategory[r.category] ?? { total: 0, correct: 0 };
      slot.total += 1;
      if (r.correct) slot.correct += 1;
      byCategory[r.category] = slot;
    }

    const result: SessionResult = {
      date: today,
      questionsCount: finalResults.length,
      correctCount,
      byCategory,
    };

    const sameDay = profile.lastSessionDate === today;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().slice(0, 10);
    const continuingStreak = profile.lastSessionDate === yesterdayISO;
    const newStreak = sameDay
      ? profile.currentStreak
      : continuingStreak
        ? profile.currentStreak + 1
        : 1;

    const updatedProfile: UserProfile = {
      ...profile,
      cards: finalCards,
      totalSessions: profile.totalSessions + 1,
      currentStreak: newStreak,
      longestStreak: Math.max(profile.longestStreak, newStreak),
      lastSessionDate: today,
      sessionHistory: [...profile.sessionHistory, result].slice(-30),
    };

    onFinish(updatedProfile, result);
  }

  const showFeedback = selected !== null;
  const isCorrect = selected === choiceOrder.correctIndex;

  return (
    <div>
      <div className="session-progress">
        <span>{index + 1} / {items.length}</span>
        <div className="bar">
          <div style={{ width: `${((index + (showFeedback ? 1 : 0)) / items.length) * 100}%` }} />
        </div>
      </div>

      {current.isIntroduction && (
        <div className="intro-banner">
          Nouvelle question — prends le temps de la lire, on la reverra plus tard.
        </div>
      )}

      <div className="question-card">
        <span className="category-tag">{CATEGORY_LABELS[question.category]}</span>
        <h2 className="prompt">{question.prompt}</h2>

        <div className="choices">
          {choiceOrder.shuffled.map((text, i) => {
            let cls = 'choice';
            if (showFeedback) {
              if (i === choiceOrder.correctIndex) cls += ' correct';
              else if (i === selected) cls += ' incorrect';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
              >
                <span className="marker">{String.fromCharCode(65 + i)}</span>
                <span>{text}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'bon' : 'mauvais'}`}>
            {isCorrect ? 'Bonne réponse.' : `Bonne réponse : ${choiceOrder.shuffled[choiceOrder.correctIndex]}.`}
            {question.explanation && <div style={{ marginTop: 6 }}>{question.explanation}</div>}
            <div className="feedback-source">
              Livret du citoyen, p. {question.page} — {question.source}
            </div>
          </div>
        )}

        {showFeedback && (
          <div className="session-actions">
            <button className="btn btn-primary" onClick={handleNext}>
              {index + 1 >= items.length ? 'Voir le récap' : 'Suivant'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
