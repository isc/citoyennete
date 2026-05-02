import { useEffect, useState } from 'react';
import type { SessionResult, UserProfile } from './types';
import { loadProfile, resetProfile, saveProfile } from './lib/storage';
import { HomeScreen } from './screens/HomeScreen';
import { SessionScreen } from './screens/SessionScreen';
import { RecapScreen } from './screens/RecapScreen';

type Screen =
  | { kind: 'home' }
  | { kind: 'session' }
  | { kind: 'recap'; result: SessionResult };

export function App() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());
  const [screen, setScreen] = useState<Screen>({ kind: 'home' });

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
        <span className="sub">naturalisation française</span>
      </header>

      {screen.kind === 'home' && (
        <HomeScreen
          profile={profile}
          onStart={() => setScreen({ kind: 'session' })}
          onReset={handleReset}
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
    </div>
  );
}
