# Roadmap

Le **format officiel a changé au 1er janvier 2026** : la naturalisation passe
désormais par un **examen civique** sous forme de QCM (40 questions /
45 min / seuil 80 % = 32/40), **en plus** de l'entretien d'assimilation oral
en préfecture. La banque a été refondue sur la **liste officielle CR**
(209 énoncés publics, 5 thématiques) — voir `BANK_REVIEW.md` pour les
points à relire.

L'app sert donc deux préparations :
- **Le QCM** (épreuve éliminatoire, 80 %), couvert par la banque actuelle.
- **L'entretien oral** en préfecture (~15 min), où il faut savoir
  reformuler à l'oral sans choix proposés.

Classé par impact réel.

## Court terme (gros levier, faible effort)

1. **Mode « examen blanc »** — 40 questions tirées aléatoirement (avec la
   répartition officielle 38/40/31/33/36 ≈ proportionnelle), 45 min
   chronométrés, score + correction à la fin, indication réussite ≥ 32/40.
   C'est *l'épreuve* qui compte le jour J. ~1 h.
2. **Filtre par thématique sur la home** — pouvoir se concentrer sur les
   5 thématiques officielles (Principes et valeurs / Système institutionnel
   et politique / Droits et devoirs / Histoire-géo-culture / Vivre dans la
   société française). ~30 min.
3. **TTS sur les questions** — déjà en place pour l'ancienne banque
   (cf. `scripts/generate-tts.mjs`). À régénérer pour les 209 nouvelles.
   Utile surtout pour la prépa de l'entretien oral. ~2 h (génération).
4. **PWA installable + offline** — indispensable pour réviser sans réseau
   (transports). ~1 h.
5. **Relire BANK_REVIEW.md** — environ 10 questions ambiguës, 30-40
   distracteurs à durcir. À faire avant tout déploiement utilisateur. ~3-4 h.

## Moyen terme (vrai contenu à produire)

6. **Mode « réponse libre »** — masquer les choix, l'apprenant tape ou dit
   la réponse, s'auto-évalue (vert/rouge). Plus proche de l'**entretien**
   oral (qui n'est pas un QCM). Ajouter `answerShort` dans la banque.
7. **FALC en complément** — chaque question a sa version FALC affichable à
   la demande, sans remplacer le libellé officiel. 209 reformulations à
   écrire — gros chantier mais utile pour les profils B1/B2 stricts.
8. **Mises en situation** — l'examen réel comporte 12 questions de mise en
   situation (sur 40), confidentielles. Construire 30-50 cas pratiques
   plausibles à partir des thèmes du livret pour s'entraîner.

## Long terme (si l'usage décolle)

9. **Multilingue de l'explication** — garder le français pour la question
   (ce qui sera demandé), mais permettre l'explication en arabe / espagnol
   / anglais.
10. **Compréhension orale** — au-delà du TTS sur les questions, ajouter un
    mode « écoute un extrait de l'entretien type, réponds » avec voix
    variées.
11. **Compte / sync** — pour reprendre sur téléphone et ordi. À ne faire
    que si le POC trouve son public, sinon localStorage suffit.

---

**Si une seule chose maintenant : (1) examen blanc 40 Q / 45 min / 80 %.**
Le reste est secondaire tant que ce parcours-là n'existe pas.
