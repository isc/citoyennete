# Citoyenneté

Application de révision pour l'**examen civique** français — le QCM exigé
depuis le 1<sup>er</sup> janvier 2026 pour la naturalisation, la carte de
résident (CR) et la carte de séjour pluriannuelle (CSP).

👉 **[isc.github.io/citoyennete](https://isc.github.io/citoyennete/)**

Répétition espacée (système de Leitner), 368 questions issues des deux listes
officielles, versions simplifiées FALC et lecture audio de chaque énoncé.
Tout fonctionne dans le navigateur, sans compte ni serveur.

## L'examen

| | Détail |
|---|---|
| Format | QCM, 40 questions, 45 minutes |
| Seuil | 80 % — soit 32 bonnes réponses sur 40 |
| Niveaux | **CSP** (carte de séjour pluriannuelle, A2) et **CR** (carte de résident / naturalisation, B2) |
| En plus | Pour la naturalisation, un entretien d'assimilation oral en préfecture (~15 min) |

La banque agrège les **deux listes officielles publiques** : 368 questions au
total (209 CR, 159 propres au CSP, 32 communes aux deux). Au premier
lancement, l'application demande quel examen tu prépares et filtre les
séances en conséquence ; le choix reste modifiable depuis l'accueil.

## Comment ça marche

### Répétition espacée

Chaque question est une carte qui circule entre 5 boîtes. Le délai avant de
la revoir dépend de la boîte :

| Boîte | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Revue dans | le jour même | 1 jour | 3 jours | 7 jours | 21 jours |

- **Bonne réponse rapide** (moins de 8 s) → la carte monte d'une boîte.
- **Bonne réponse lente** → la carte reste dans sa boîte et est replanifiée :
  savoir n'est pas encore savoir vite.
- **Mauvaise réponse** → retour en boîte 1.

Une séance fait au plus 10 cartes : d'abord celles à revoir (boîtes les plus
basses en premier), complétées par 5 nouvelles questions au maximum. Une
question ratée dans la journée peut être retravaillée immédiatement, sans
attendre le lendemain ; une question réussie, elle, ne revient pas le jour
même — c'est tout l'intérêt de l'espacement.

### FALC — « Facile À Lire et à Comprendre »

199 des 368 énoncés ont une reformulation en langage simple, accessible via
le bouton « Version simplifiée ». L'énoncé officiel **reste toujours
affiché** : c'est lui qui sera lu le jour de l'examen, la version FALC ne
fait que l'éclairer. La préférence est mémorisée d'une séance à l'autre.

Les 169 énoncés sans version FALC ont été jugés déjà assez simples pour
qu'une paraphrase n'apporte rien.

> ⚠️ **Ces reformulations sont un premier jet non validé.** La norme FALC
> exige une relecture par des personnes concernées. Voir
> [`FALC_REVIEW.md`](FALC_REVIEW.md).

### Audio

Chaque question dispose d'un MP3 généré via Mistral Voxtral
(`public/audio/tts/<id>.mp3`), utile pour préparer l'entretien oral.

## Développement

Node 20.19+ requis.

```bash
npm install
npm run dev      # serveur de dev sur http://localhost:5173/citoyennete/
```

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | `tsc -b` puis build de production dans `dist/` |
| `npm run preview` | Sert le build de production |
| `npm run e2e` | Suite end-to-end Playwright |
| `npm run lint` | ESLint (config plate dans `eslint.config.js`) |

### Tests end-to-end

La suite pilote un vrai navigateur et vérifie les parcours complets (première
séance, boîtes de Leitner, séries, statistiques, FALC, captures d'écran). Elle
a besoin du serveur de dev **lancé à part** :

```bash
npm run dev &
npm run e2e
```

Si le serveur écoute ailleurs, surcharge l'adresse :
`E2E_BASE=http://localhost:4000/citoyennete/ npm run e2e`.

Les tests s'exécutent tous même en cas d'échec — le récapitulatif final liste
ce qui a cassé, et les captures partent dans `/tmp/citoyennete-e2e`.

### Régénérer l'audio

Le script n'écrit que les fichiers manquants ; pour refaire un MP3, supprime-le
d'abord.

```bash
MISTRAL_API_KEY=... node scripts/generate-tts.mjs
```

En CI, déclencher le workflow `generate-tts.yml` (`workflow_dispatch`), qui
utilise le secret du dépôt et commite les nouveaux fichiers.

## Structure

```
src/
  lib/
    questions.ts       les 368 questions officielles (source de vérité)
    falcPrompts.ts     les 199 reformulations FALC, indexées par id
    falc.ts            accès aux reformulations + préférence d'affichage
    leitner.ts         boîtes, délais, promotion/rétrogradation
    sessionComposer.ts composition d'une séance (à revoir + nouveautés)
    storage.ts         profil persisté, réconciliation avec la banque
  screens/             Onboarding · Home · Session · Recap
e2e/run.mjs            suite Playwright
scripts/generate-tts.mjs
```

### Données

Tout est en `localStorage`, rien ne quitte l'appareil :

- `citoyennete-profile` — progression (cartes, boîtes, séries, historique).
  Réinitialisable depuis l'accueil.
- `citoyennete-falc` — préférence d'affichage FALC. Stockée à part pour
  qu'une remise à zéro de la progression ne l'efface pas : c'est un réglage
  d'accessibilité, pas de la progression.

Au chargement, un profil existant est réconcilié avec la banque courante :
la progression est conservée, les questions ajoutées entre-temps apparaissent
comme nouvelles, celles retirées disparaissent.

## Déploiement

Chaque push sur `main` déclenche la CI (lint + typecheck, puis e2e) et publie `dist/`
sur la branche `gh-pages`. Le chemin de base est `/citoyennete/`, surchargeable
à la construction via `VITE_BASE_PATH`.

## Sources

Questions, choix et réponses sont rédigés à partir des sources publiques :
[listes officielles de questions de connaissance](https://formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-cr/)
du ministère de l'Intérieur (DGEF), Livret du citoyen, Constitution, codes et
service-public.fr.

Les points à relire dans la banque sont consignés dans
[`BANK_REVIEW.md`](BANK_REVIEW.md), et la suite envisagée dans
[`ROADMAP.md`](ROADMAP.md).

Ce projet est un outil de révision non officiel, sans lien avec
l'administration française.
