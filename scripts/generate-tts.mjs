#!/usr/bin/env node

/**
 * Génère les MP3 TTS de chaque question de la banque via Mistral Voxtral.
 *
 * Local : `MISTRAL_API_KEY=... node scripts/generate-tts.mjs`
 * (ou `node --env-file=.env.local scripts/generate-tts.mjs`)
 *
 * CI : déclencher le workflow `generate-tts.yml` (utilise le secret repo).
 *
 * Sortie : `public/audio/tts/<question.id>.mp3`. Idempotent : ne (re)génère
 * que les fichiers manquants. Pour régénérer un fichier précis, le supprimer
 * et relancer.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'public', 'audio', 'tts');
const QUESTIONS_PATH = join(ROOT, 'src', 'lib', 'questions.ts');

const MISTRAL_TTS_URL = 'https://api.mistral.ai/v1/audio/speech';
const MODEL = 'voxtral-mini-tts-2603';
// Voix française neutre, adaptée à un contexte formel.
// Marie - Curious (fr_fr, female), réutilisée de Multiplix.
const VOICE_ID = 'e0580ce5-e63c-4cbe-88c8-a983b80c5f1f';

const API_KEY = process.env.MISTRAL_API_KEY;
if (!API_KEY) {
  console.error('MISTRAL_API_KEY environment variable not set');
  process.exit(1);
}

/**
 * Tente jusqu'à 4 fois avec backoff exponentiel (1s, 2s, 4s) pour absorber
 * les coupures réseau (ECONNRESET) et les throttling API (429).
 */
async function generateAudio(text, outputPath) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await fetch(MISTRAL_TTS_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          input: text,
          voice_id: VOICE_ID,
          response_format: 'mp3',
        }),
      });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`API ${response.status}`);
      }
      if (!response.ok) {
        const body = await response.text();
        console.error(`API error: ${response.status} - ${body}`);
        return false;
      }
      const data = await response.json();
      if (!data.audio_data) {
        console.error('No audio_data in response');
        return false;
      }
      await writeFile(outputPath, Buffer.from(data.audio_data, 'base64'));
      return true;
    } catch (err) {
      if (attempt === 4) {
        console.error(`giving up after 4 attempts: ${err.message}`);
        return false;
      }
      const wait = 2 ** (attempt - 1) * 1000;
      process.stdout.write(`(retry in ${wait}ms after ${err.message}) `);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  return false;
}

/**
 * Extrait { id, prompt } pour chaque question depuis le source TS.
 * Pour rester sans toolchain TS côté Node, on parse au regex (le format
 * du fichier est stable et linté). Échoue bruyamment si un libellé contient
 * un caractère exotique non géré.
 */
async function loadQuestions() {
  const src = await readFile(QUESTIONS_PATH, 'utf8');
  const entries = [];
  // Capture {id: '...', ..., prompt: '...'} en respectant les apostrophes
  // échappées (\\'). On s'arrête à la prochaine ligne contenant 'prompt:'.
  const re = /id:\s*'([^']+)'[\s\S]*?prompt:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(src))) {
    const id = m[1];
    const prompt = m[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
    entries.push({ id, prompt });
  }
  if (entries.length === 0) throw new Error('No questions parsed from ' + QUESTIONS_PATH);
  return entries;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const entries = await loadQuestions();
  console.log(`Found ${entries.length} questions. Generating missing MP3s...\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const { id, prompt } of entries) {
    const filepath = join(OUTPUT_DIR, `${id}.mp3`);
    if (existsSync(filepath)) {
      skipped++;
      continue;
    }
    const preview = prompt.length > 60 ? prompt.slice(0, 57) + '...' : prompt;
    process.stdout.write(`${id}: "${preview}"... `);
    const ok = await generateAudio(prompt, filepath);
    if (ok) { console.log('ok'); success++; }
    else { console.log('FAILED'); failed++; }
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone! ${success} generated, ${skipped} skipped, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
