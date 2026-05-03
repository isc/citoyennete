# Banque officielle — points à relire

La banque agrège les **deux listes officielles** publiées par le ministère
de l'Intérieur sur formation-civique.interieur.gouv.fr :

- **CR** (carte de résident / naturalisation, niveau B2) — 209 énoncés
  ([liste](https://formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-cr/))
- **CSP** (carte de séjour pluriannuelle, niveau A2) — 191 énoncés
  ([liste](https://formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-csp/))

32 énoncés sont communs aux deux listes (taggés `levels: ['csp', 'cr']`),
177 sont CR-only (`['cr']` ou implicite) et 159 sont CSP-only (`['csp']`).
Total = **368 questions**.

Les **énoncés sont repris à l'identique**. En revanche les **4 choix de
réponse et la bonne réponse** ne sont pas publiés par le ministère —
ils ont été rédigés à partir du Livret du citoyen, de la Constitution
de 1958, du Code civil/pénal et de service-public.fr.

Ce document liste les questions dont la **bonne réponse est ambiguë** ou
mériterait d'être vérifiée avant de servir à de vrais candidats.

---

## Questions à vérifier en priorité

| ID | Énoncé | Réponse retenue | Doute |
|---|---|---|---|
| `p-dnrf2` | Sur quel site internet peut-on retrouver le symbole de la République ? | `elysee.fr` | Plusieurs sites institutionnels affichent les symboles (`gouvernement.fr`, `vie-publique.fr`, `service-public.fr`). À vérifier dans le corrigé officiel quand il filtrera. |
| `i-8iln` | Depuis quand l'euro est-elle la monnaie unique ? | `2002` | 1999 (scriptural) vs 2002 (pièces et billets). La question dit « monnaie unique » — selon le sens, 1999 peut aussi être valide. |
| `i-91e8c` | Combien y a-t-il de régions en France ? | `18` | 13 (métropole seules) ou 18 (avec outre-mer). Ambiguïté fréquente. |
| `d-ab547` | À quelle liberté la PMA fait-elle référence ? | « Liberté individuelle (droit de fonder une famille) » | Pas de catégorie consacrée dans la DDHC ; formulation à confirmer. |
| `h-3tdll` | Classement de la langue française dans le monde | « Parmi les 5 premières » | Selon la source (locuteurs natifs / L2 / total) le rang varie de 5e à 7e. |
| `h-95d74` | Département le plus touristique de France | `Paris (75)` | « Le plus touristique » selon nombre de visiteurs ou recettes ? Les Alpes-Maritimes sont également souvent citées. |
| `h-4h1l3` | Population approximative de la France en 2025 | « 68 millions » | Chiffre INSEE 2024 : 68,4 M. Le chiffre exact évolue chaque année. |
| `h-5m782` | Combien de personnes parlent français dans le monde ? | « ~320 millions » | Selon OIF 2022. Le ministère pourrait retenir un autre chiffre rond. |
| `s-5dupn` | Condition pour passer le permis de conduire | « Au moins 17 ans + Code réussi » | Depuis 2024 le minimum est 17 ans pour le permis B. La conduite supervisée commence à 15 ans. |
| `cs-3lec9` | À partir de quel âge un mineur peut-il travailler ? | `16 ans` | Règle générale 16 ans, dérogation possible dès 14 ans pour des travaux légers en vacances scolaires. |
| `cp-5f447` | Rôle des associations | « Permettre aux citoyens de s'engager pour une cause » | Plusieurs formulations possibles selon le corrigé attendu. |
| `ch-cau0p` | Qui était Joséphine Baker ? | « Artiste de music-hall et résistante, naturalisée française » | Formulation longue à confronter au corrigé. |
| `ch-7dk59` | Quel fleuve coule en France ? | `La Loire` | Plusieurs réponses possibles (Seine, Rhône, Garonne) ; le distracteur évite l'ambiguïté en proposant des fleuves étrangers. |

---

## Questions dont les distracteurs mériteraient une relecture

Pour les questions suivantes, la **bonne réponse est solide** mais les 3
distracteurs ont été imaginés et pourraient être améliorés (plus
plausibles, mieux calibrés au niveau attendu) :

- Toutes les questions « Quelle ville française… », « Quel pays a une
  frontière avec… », « Lequel de ces personnages… » : la liste des bonnes
  réponses possibles est large, le choix d'une seule peut piéger
  injustement si une autre bonne réponse plausible est mise en distracteur.
- `h-cgu0f` (lien avec la République) : « Marianne » retenue, mais
  d'autres figures historiques pourraient aussi être valides.
- `h-bfg5f` (fête française) : « 14 juillet » retenu vs des fêtes
  étrangères évidentes — le distracteur est trop simple à éliminer.

---

## Champ `source`

Chaque question référence la source de sa **bonne réponse** :
- `Livret du citoyen` (édition fév. 2022) — pour les faits civiques de base
- `Constitution de 1958, art. X` — articles constitutionnels
- `DDHC 1789, art. X` — Déclaration des droits de l'homme et du citoyen
- `Code civil` / `Code pénal` / `Code du travail` / `Code électoral` /
  `Code de l'éducation` / `Code de la sécurité sociale` / `Code de la
  santé publique` / `Code de l'environnement` / `Code de la sécurité
  intérieure` / `Code de la route`
- `Loi de 1905` (séparation Églises/État), `Loi du 29 juillet 1881`
  (presse), `Loi du 1er juillet 1901` (associations), etc.
- `Service-public.fr`, `INSEE`, `europa.eu`, `OIF`, `Atout France`

Les sources sont indicatives — pas un quote verbatim systématique.

---

## Comment traiter les questions ambiguës

1. Quand le corrigé officiel sera disponible (s'il l'est un jour), confronter.
2. En attendant, ajouter `explanation` pour préciser le raisonnement
   quand la bonne réponse n'est pas évidente.
3. Pour les distracteurs trop faibles, lister 2-3 candidats meilleurs
   et choisir celui qui isole le mieux la bonne réponse.
