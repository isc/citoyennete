// Suite E2E. Exécute via `npm run e2e` (lance le dev server à part avec
// `npm run dev`). Surcharge le port avec `E2E_BASE=http://host:port/citoyennete/`.
//
// Chaque test prend une page neuve, vide localStorage, exerce un parcours
// et vérifie l'état attendu (DOM + profil persisté). Les échecs sont
// collectés sans interrompre la suite.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.E2E_BASE ?? 'http://localhost:5174/citoyennete/';
const SHOTS_DIR = process.env.E2E_SHOTS ?? '/tmp/citoyennete-e2e';
mkdirSync(SHOTS_DIR, { recursive: true });

const browser = await chromium.launch();
const results = [];
let failures = 0;

function ok(name) {
  results.push({ name, status: 'PASS' });
  console.log(`✓ ${name}`);
}
function fail(name, msg) {
  failures++;
  results.push({ name, status: 'FAIL', msg });
  console.error(`✗ ${name}\n  ${msg}`);
}
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
function assertEq(actual, expected, msg) {
  if (actual !== expected) throw new Error(`${msg} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

async function freshPage(viewport = { width: 420, height: 820 }) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
  });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  return { page, context, errors };
}

async function getProfile(page) {
  return page.evaluate(() => {
    const raw = localStorage.getItem('citoyennete-profile');
    return raw ? JSON.parse(raw) : null;
  });
}

async function getQuestionsBank(page) {
  return page.evaluate(async () => {
    const mod = await import('/citoyennete/src/lib/questions.ts');
    return mod.QUESTIONS;
  });
}

async function answerCurrentQuestion(page, { correct }) {
  const prompt = await page.textContent('.question-card .prompt');
  const correctText = await page.evaluate(async (prompt) => {
    const mod = await import('/citoyennete/src/lib/questions.ts');
    const q = mod.QUESTIONS.find((q) => q.prompt === prompt);
    return q ? q.choices[q.answerIndex] : null;
  }, prompt);
  if (!correctText) throw new Error(`could not resolve correct answer for "${prompt}"`);

  const choiceButtons = await page.$$('.choice');
  let targetIdx = -1;
  for (let i = 0; i < choiceButtons.length; i++) {
    const t = (await choiceButtons[i].textContent()).trim();
    if (t.includes(correctText)) { targetIdx = i; break; }
  }
  if (targetIdx === -1) throw new Error(`correct choice "${correctText}" not found`);

  if (correct) {
    await choiceButtons[targetIdx].click();
  } else {
    const wrongIdx = choiceButtons.length === 1 ? 0 : (targetIdx + 1) % choiceButtons.length;
    await choiceButtons[wrongIdx].click();
  }
  await page.waitForSelector('.feedback', { timeout: 3000 });
  return { prompt, correctText };
}

async function playSession(page, mode) {
  const seenPrompts = [];
  let i = 0;
  while (true) {
    if (await page.$('.recap-card')) break;
    const wantCorrect = mode === 'all-correct' || (mode === 'mixed' && i % 2 === 0);
    const { prompt } = await answerCurrentQuestion(page, { correct: wantCorrect });
    seenPrompts.push(prompt);
    const next = await page.$('.session-actions .btn-primary');
    if (!next) throw new Error('no next button after answer');
    await next.click();
    await page.waitForTimeout(120);
    i++;
    if (i > 30) throw new Error('session > 30 questions, infinite loop?');
  }
  return seenPrompts;
}

// ──────────────────────────────────────────────────────────────────────
// Tests
// ──────────────────────────────────────────────────────────────────────

async function test_bank_integrity() {
  const name = 'Banque : chaque question est valide (choix, answerIndex, source)';
  const { page, errors } = await freshPage();
  try {
    const bank = await getQuestionsBank(page);
    assert(bank.length > 0, 'banque vide');
    const ids = new Set();
    for (const q of bank) {
      assert(q.id && typeof q.id === 'string', `id manquant : ${JSON.stringify(q)}`);
      assert(!ids.has(q.id), `id dupliqué : ${q.id}`);
      ids.add(q.id);
      assert(q.prompt && q.prompt.length > 0, `prompt vide pour ${q.id}`);
      assert(Array.isArray(q.choices) && q.choices.length >= 2, `choix < 2 pour ${q.id}`);
      assert(q.choices.every((c) => typeof c === 'string' && c.length > 0), `choix vide pour ${q.id}`);
      assert(new Set(q.choices).size === q.choices.length, `choix dupliqués pour ${q.id}`);
      assert(typeof q.answerIndex === 'number' && q.answerIndex >= 0 && q.answerIndex < q.choices.length,
        `answerIndex hors limites pour ${q.id} : ${q.answerIndex} / ${q.choices.length}`);
      assert(q.source && q.source.length > 0, `source vide pour ${q.id}`);
      assert(typeof q.page === 'number' && q.page > 0, `page invalide pour ${q.id} : ${q.page}`);
      assert(q.category && q.category.length > 0, `catégorie vide pour ${q.id}`);
    }
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(`${name} (${bank.length} questions)`);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_first_session_5_questions() {
  const name = 'Première séance = 5 questions, toutes des nouveautés';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    const introBanner = await page.$('.intro-banner');
    assert(introBanner, 'intro banner manquant pour la 1re question');
    const total = await page.evaluate(() => {
      const t = document.querySelector('.session-progress span').textContent;
      return parseInt(t.split('/')[1].trim(), 10);
    });
    assertEq(total, 5, 'longueur séance');
    const prompts = await playSession(page, 'all-correct');
    assertEq(prompts.length, 5, 'questions répondues');
    assertEq(new Set(prompts).size, 5, 'questions toutes distinctes');
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_no_repeat_same_day() {
  const name = '2e séance le même jour : aucune question de la 1re ne revient';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    const session1 = await playSession(page, 'all-correct');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');

    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    const session2 = await playSession(page, 'all-correct');

    const overlap = session2.filter((p) => session1.includes(p));
    assert(overlap.length === 0, `overlap : ${overlap.length} questions répétées : ${overlap.slice(0, 2).join(' | ')}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_wrong_answers_keep_box_1() {
  const name = 'Réponses fausses → cartes restent en boîte 1';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-wrong');
    const profile = await getProfile(page);
    const introduced = profile.cards.filter((c) => c.introduced);
    assertEq(introduced.length, 5, 'cartes introduites');
    for (const c of introduced) assertEq(c.box, 1, `boîte de ${c.questionId}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_correct_fast_promotes_to_box_2() {
  const name = 'Bonne réponse rapide → boîte 2, nextDue = demain';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    const profile = await getProfile(page);
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    for (const c of profile.cards.filter((c) => c.introduced)) {
      assertEq(c.box, 2, `boîte de ${c.questionId}`);
      assertEq(c.lastSeen, today, `lastSeen de ${c.questionId}`);
      assertEq(c.nextDue, tomorrow, `nextDue de ${c.questionId}`);
    }
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_recap_score() {
  const name = 'Recap : 5/5 si tout correct, 0/5 si tout faux';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    const score = await page.textContent('.recap-score');
    assert(score.replace(/\s+/g, ' ').includes('5 / 5'), `score correct: "${score}"`);

    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');
    page.on('dialog', (d) => d.accept());
    const ghosts = await page.$$('button.btn-ghost');
    await ghosts[ghosts.length - 1].click();
    await page.waitForTimeout(200);
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-wrong');
    const score2 = await page.textContent('.recap-score');
    assert(score2.replace(/\s+/g, ' ').includes('0 / 5'), `score faux: "${score2}"`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_home_progress_after_correct_session() {
  const name = 'Home : progression > 0 après une séance toute correcte';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');

    const vues = await page.textContent('.stat-card:nth-child(2) .value');
    assert(vues.replace(/\s+/g, '').startsWith('5'), `vues = ${vues}`);

    const pcts = await page.$$eval('.category-row .pct', (els) => els.map((e) => parseInt(e.textContent, 10)));
    const positive = pcts.filter((p) => p > 0);
    assert(positive.length > 0, `aucune catégorie n'a de progression : ${pcts}`);
    for (const p of positive) assert(p > 0 && p <= 100, `pct anormal : ${p}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_no_stats_before_first_session() {
  const name = 'Home : pas de stats cards avant la 1re séance, juste l\'intro';
  const { page, errors } = await freshPage();
  try {
    const stats = await page.$('.home-stats');
    assert(!stats, 'home-stats ne devrait pas apparaître avant la 1re séance');
    const intro = await page.$('.home-intro');
    assert(intro, 'home-intro manquante');
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_reset_clears_state() {
  const name = 'Réinitialiser : confirme + remet à zéro';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');

    page.once('dialog', (d) => d.accept());
    const ghosts = await page.$$('button.btn-ghost');
    await ghosts[ghosts.length - 1].click();
    await page.waitForTimeout(200);

    const profile = await getProfile(page);
    assertEq(profile.cards.filter((c) => c.introduced).length, 0, 'cartes introduites après reset');
    assertEq(profile.totalSessions, 0, 'totalSessions après reset');
    assertEq(profile.currentStreak, 0, 'currentStreak après reset');
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_double_click_choice_ignored() {
  const name = 'Double-clic sur un choix : 2e clic ignoré';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    const choices = await page.$$('.choice');
    await choices[0].click();
    await page.waitForSelector('.feedback');
    await choices[1].click({ force: true }).catch(() => {});
    const incorrectCount = await page.$$eval('.choice.incorrect', (els) => els.length);
    assert(incorrectCount <= 1, `trop de choix marqués incorrect : ${incorrectCount}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_audio_button_and_files() {
  const name = 'Audio : bouton 🔊 présent + MP3 chargé pour la question';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    const btn = await page.$('.audio-btn');
    assert(btn, 'bouton audio absent');
    // Récupère l'id de la question via la banque + son prompt visible.
    const prompt = await page.textContent('.question-card .prompt');
    const id = await page.evaluate(async (p) => {
      const m = await import('/citoyennete/src/lib/questions.ts');
      return m.QUESTIONS.find((q) => q.prompt === p)?.id;
    }, prompt);
    assert(id, 'id de la question introuvable');
    const audioResp = await page.request.get(`${BASE}audio/tts/${id}.mp3`);
    assertEq(audioResp.status(), 200, `MP3 statut pour ${id}`);
    assert(parseInt(audioResp.headers()['content-length'] || '0', 10) > 1000, `MP3 vide pour ${id}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_feedback_shows_source() {
  const name = 'Feedback : citation + référence page/section affichées';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await page.click('.choice');
    await page.waitForSelector('.feedback');
    const sourceText = await page.textContent('.feedback-source');
    assert(/livret du citoyen, p\. \d+ — /i.test(sourceText), `format source attendu, reçu : ${sourceText}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_footer_link() {
  const name = 'Footer : lien vers le livret officiel présent';
  const { page, errors } = await freshPage();
  try {
    const href = await page.getAttribute('.app-source a', 'href');
    assert(href && href.includes('immigration.interieur.gouv.fr'), `href footer : ${href}`);
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_stats_match_profile() {
  const name = 'Cohérence : stats Home == données du profil';
  const { page, errors } = await freshPage();
  try {
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'mixed');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');
    const profile = await getProfile(page);
    const introducedCount = profile.cards.filter((c) => c.introduced).length;
    const vuesText = (await page.textContent('.stat-card:nth-child(2) .value')).replace(/\s+/g, '');
    assertEq(parseInt(vuesText, 10), introducedCount, 'Vues vs profile.cards introduced');
    assertEq(profile.totalSessions, 1, 'totalSessions après 1 séance');
    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await page.context().close();
}

async function test_streak_multi_day() {
  const name = 'Streak : +1 jour si séance le lendemain, reset si > 1 jour';
  const context = await browser.newContext({ viewport: { width: 420, height: 820 } });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  try {
    // J1 — installe l'horloge à une date connue, lance une séance.
    await page.clock.install({ time: new Date('2026-06-01T10:00:00Z') });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'load' });
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');
    let profile = await getProfile(page);
    assertEq(profile.currentStreak, 1, 'streak J1');
    assertEq(profile.lastSessionDate, '2026-06-01', 'lastSessionDate J1');

    // J2 — avance d'un jour, séance, streak = 2.
    await page.clock.setFixedTime(new Date('2026-06-02T10:00:00Z'));
    await page.reload({ waitUntil: 'load' });
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    await page.click('.recap-actions .btn-ghost');
    await page.waitForSelector('.home-cta');
    profile = await getProfile(page);
    assertEq(profile.currentStreak, 2, 'streak J2');
    assertEq(profile.longestStreak, 2, 'longestStreak J2');

    // J3 manqué, J4 — séance, streak doit retomber à 1.
    await page.clock.setFixedTime(new Date('2026-06-04T10:00:00Z'));
    await page.reload({ waitUntil: 'load' });
    await page.click('.home-cta');
    await page.waitForSelector('.question-card');
    await playSession(page, 'all-correct');
    profile = await getProfile(page);
    assertEq(profile.currentStreak, 1, 'streak après jour manqué');
    assertEq(profile.longestStreak, 2, 'longestStreak conservé');

    assert(errors.length === 0, `JS errors: ${errors.join(' / ')}`);
    ok(name);
  } catch (e) { fail(name, e.message); }
  await context.close();
}

async function test_screenshots() {
  const name = 'Screenshots : home, session, feedback, recap (mobile + desktop)';
  for (const vp of [
    { width: 420, height: 820, label: 'mobile' },
    { width: 1280, height: 800, label: 'desktop' },
  ]) {
    const { page, errors } = await freshPage(vp);
    try {
      await page.screenshot({ path: `${SHOTS_DIR}/home-${vp.label}.png` });
      await page.click('.home-cta');
      await page.waitForSelector('.question-card');
      await page.screenshot({ path: `${SHOTS_DIR}/session-${vp.label}.png` });
      await page.click('.choice');
      await page.waitForSelector('.feedback');
      await page.screenshot({ path: `${SHOTS_DIR}/feedback-${vp.label}.png` });
      await page.click('.session-actions .btn-primary');
      await page.waitForTimeout(120);
      await playSession(page, 'all-correct');
      await page.screenshot({ path: `${SHOTS_DIR}/recap-${vp.label}.png` });
      assert(errors.length === 0, `JS errors (${vp.label}): ${errors.join(' / ')}`);
    } catch (e) { fail(`${name} [${vp.label}]`, e.message); await page.context().close(); return; }
    await page.context().close();
  }
  ok(name);
}

// ──────────────────────────────────────────────────────────────────────

const tests = [
  test_bank_integrity,
  test_first_session_5_questions,
  test_no_repeat_same_day,
  test_wrong_answers_keep_box_1,
  test_correct_fast_promotes_to_box_2,
  test_recap_score,
  test_home_progress_after_correct_session,
  test_no_stats_before_first_session,
  test_reset_clears_state,
  test_double_click_choice_ignored,
  test_audio_button_and_files,
  test_feedback_shows_source,
  test_footer_link,
  test_stats_match_profile,
  test_streak_multi_day,
  test_screenshots,
];

for (const t of tests) {
  try { await t(); }
  catch (e) { fail(t.name, `uncaught: ${e.message}`); }
}

await browser.close();

console.log(`\n────────────\n${tests.length - failures} / ${tests.length} OK`);
if (failures > 0) {
  console.log('\nÉCHECS :');
  for (const r of results.filter((r) => r.status === 'FAIL')) {
    console.log(`  • ${r.name}\n      ${r.msg}`);
  }
  process.exit(1);
}
