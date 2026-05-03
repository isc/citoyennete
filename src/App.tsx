import { useEffect, useState } from 'react';
import type { SessionResult, UserProfile } from './types';
import { loadProfile, resetProfile, saveProfile, setExamLevel } from './lib/storage';
import { HomeScreen } from './screens/HomeScreen';
import { SessionScreen } from './screens/SessionScreen';
import { RecapScreen } from './screens/RecapScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { SOURCE_INFO, type ExamLevel } from './lib/questions';

type Screen =
  | { kind: 'onboarding' }
  | { kind: 'home' }
  | { kind: 'session' }
  | { kind: 'recap'; result: SessionResult };

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [screen, setScreen] = useState<Screen>(() =>
    profile.examLevel === null ? { kind: 'onboarding' } : { kind: 'home' },
  );

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  function handleSessionFinish(updated: UserProfile, result: SessionResult) {
    setProfile(updated);
    setScreen({ kind: 'recap', result });
  }

  function handleReset() {
    if (!confirm('Réinitialiser ta progression ?')) return;
    setProfile(resetProfile());
    setScreen({ kind: 'onboarding' });
  }

  function handleChooseLevel(level: ExamLevel) {
    setProfile((p) => setExamLevel(p, level));
    setScreen({ kind: 'home' });
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="flag">
          <span style={{ background: 'var(--bleu)' }} />
          <span style={{ background: 'var(--blanc)' }} />
          <span style={{ background: 'var(--rouge)' }} />
        </span>
        <h1>Citoyenneté</h1>
        <span className="sub">examen civique</span>
      </header>

      {screen.kind === 'onboarding' && (
        <OnboardingScreen
          initial={profile.examLevel}
          onChoose={handleChooseLevel}
          onCancel={profile.examLevel ? () => setScreen({ kind: 'home' }) : undefined}
        />
      )}

      {screen.kind === 'home' && (
        <HomeScreen
          profile={profile}
          onStart={() => setScreen({ kind: 'session' })}
          onReset={handleReset}
          onChangeLevel={() => setScreen({ kind: 'onboarding' })}
        />
      )}

      {screen.kind === 'session' && (
        <SessionScreen profile={profile} onFinish={handleSessionFinish} />
      )}

      {screen.kind === 'recap' && (
        <RecapScreen
          result={screen.result}
          onHome={() => setScreen({ kind: 'home' })}
          onAgain={() => setScreen({ kind: 'session' })}
        />
      )}

      <footer className="app-source">
        Sources : <a href={SOURCE_INFO.urlCsp} target="_blank" rel="noopener noreferrer">liste CSP</a> · <a href={SOURCE_INFO.urlCr} target="_blank" rel="noopener noreferrer">liste CR</a> — {SOURCE_INFO.publisher}.
      </footer>
    </div>
  );
}
