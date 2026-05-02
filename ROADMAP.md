# Roadmap

Classé par impact réel pour quelqu'un qui prépare l'entretien (oral, individuel, ~15 min en préfecture).

## Court terme (gros levier, faible effort)

1. **TTS sur les questions** — réutiliser le système Mistral Voxtral de Multiplix (`scripts/generate-tts.mjs`). L'entretien est oral, donc s'entraîner à comprendre la question prononcée vaut plus que 50 questions de plus. ~2 h.
2. **Mode "entretien blanc"** — 10-15 questions tirées aléatoirement de toutes catégories, sans aide, sans feedback en cours, score + correction à la fin. C'est *le* parcours qui compte. ~1 h.
3. **Filtre par catégorie sur la home** — pouvoir se concentrer sur un thème. ~30 min.
4. **PWA installable + offline** — mêmes conditions que Multiplix, indispensable pour réviser sans réseau (transports). ~1 h.

## Moyen terme (vrai contenu à produire)

5. **Mode "réponse libre"** — masquer les choix, l'apprenant tape ou dit la réponse, s'auto-évalue (vert/rouge). Plus proche de l'oral réel. Tradeoff : faut une réponse "canonique" courte par question — ajout d'un champ `answerShort` dans la banque.
6. **FALC en complément** — chaque question a sa version FALC affichable à la demande, sans remplacer le libellé officiel. ~70 reformulations à écrire à la main puis relire.
7. **Étendre la banque à ~150 questions** — en croisant les "encadrés Q/R" du livret avec des questions remontées par des agents de préfecture (sources publiques type service-public.fr). Au passage, vérifier qu'on couvre la **Charte des droits et devoirs** signée à la naturalisation.

## Long terme (si l'usage décolle)

8. **Multilingue de l'explication** — garder le français pour la question (ce qui sera demandé), mais permettre l'explication en arabe/espagnol/anglais. Très utile pour les niveaux B1 stricts.
9. **Compréhension orale** — au-delà du TTS sur les questions, ajouter un mode "écoute un extrait de l'entretien type, réponds" avec voix variées.
10. **Compte / sync** — pour reprendre sur téléphone et ordi. À ne faire que si le POC trouve son public, sinon localStorage suffit.

---

**Si une seule chose maintenant : (1) TTS + (2) entretien blanc.** Les deux ensemble transforment l'app de "QCM de révision" en "simulateur de l'épreuve orale".
