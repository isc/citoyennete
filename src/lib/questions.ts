// Banque de questions inspirée du « Livret du citoyen » (DILCRAH / ministère de l'Intérieur).
// Format QCM : 4 choix, une seule bonne réponse. Catégorisé pour suivi par thème.

export type Category =
  | 'symboles'
  | 'institutions'
  | 'histoire'
  | 'geographie'
  | 'valeurs'
  | 'culture';

export interface Question {
  id: string;
  category: Category;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation?: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  symboles: 'Symboles',
  institutions: 'Institutions',
  histoire: 'Histoire',
  geographie: 'Géographie',
  valeurs: 'Valeurs',
  culture: 'Culture',
};

export const QUESTIONS: Question[] = [
  // — Symboles —
  {
    id: 'sym-devise',
    category: 'symboles',
    prompt: 'Quelle est la devise de la République française ?',
    choices: [
      'Honneur, Patrie, Travail',
      'Liberté, Égalité, Fraternité',
      'Unité, Solidarité, Justice',
      'Travail, Famille, Patrie',
    ],
    answerIndex: 1,
    explanation: 'Devise inscrite dans la Constitution (article 2).',
  },
  {
    id: 'sym-hymne',
    category: 'symboles',
    prompt: 'Quel est l\'hymne national français ?',
    choices: ['La Parisienne', 'Le Chant des Partisans', 'La Marseillaise', 'Le Chant du départ'],
    answerIndex: 2,
    explanation: 'Composée par Rouget de Lisle en 1792, hymne officiel depuis 1879.',
  },
  {
    id: 'sym-drapeau',
    category: 'symboles',
    prompt: 'Quelles sont les couleurs du drapeau français, de la hampe vers l\'extérieur ?',
    choices: ['Bleu, blanc, rouge', 'Rouge, blanc, bleu', 'Bleu, rouge, blanc', 'Blanc, bleu, rouge'],
    answerIndex: 0,
  },
  {
    id: 'sym-fete',
    category: 'symboles',
    prompt: 'Quelle est la fête nationale française ?',
    choices: ['Le 8 mai', 'Le 11 novembre', 'Le 14 juillet', 'Le 1er mai'],
    answerIndex: 2,
    explanation: 'Commémore la prise de la Bastille (1789) et la Fête de la Fédération (1790).',
  },
  {
    id: 'sym-marianne',
    category: 'symboles',
    prompt: 'Qui est Marianne ?',
    choices: [
      'Une reine de France',
      'L\'allégorie de la République française',
      'Une héroïne de la Résistance',
      'Une figure mythologique grecque',
    ],
    answerIndex: 1,
  },

  // — Institutions —
  {
    id: 'inst-regime',
    category: 'institutions',
    prompt: 'Sous quelle République vit la France actuellement ?',
    choices: ['IVe République', 'Ve République', 'IIIe République', 'VIe République'],
    answerIndex: 1,
    explanation: 'La Ve République a été instaurée en 1958 par Charles de Gaulle.',
  },
  {
    id: 'inst-mandat',
    category: 'institutions',
    prompt: 'Quelle est la durée du mandat du Président de la République ?',
    choices: ['4 ans', '5 ans', '7 ans', '6 ans'],
    answerIndex: 1,
    explanation: 'Quinquennat depuis le référendum de 2000.',
  },
  {
    id: 'inst-deux-chambres',
    category: 'institutions',
    prompt: 'Quelles sont les deux chambres du Parlement français ?',
    choices: [
      'Assemblée nationale et Sénat',
      'Conseil constitutionnel et Sénat',
      'Assemblée nationale et Conseil d\'État',
      'Sénat et Conseil des ministres',
    ],
    answerIndex: 0,
  },
  {
    id: 'inst-1er-ministre',
    category: 'institutions',
    prompt: 'Qui nomme le Premier ministre ?',
    choices: [
      'L\'Assemblée nationale',
      'Le Président de la République',
      'Le Sénat',
      'Le peuple par référendum',
    ],
    answerIndex: 1,
  },
  {
    id: 'inst-vote-age',
    category: 'institutions',
    prompt: 'À quel âge peut-on voter en France ?',
    choices: ['16 ans', '18 ans', '21 ans', '20 ans'],
    answerIndex: 1,
  },
  {
    id: 'inst-laicite',
    category: 'institutions',
    prompt: 'En quelle année a été votée la loi de séparation des Églises et de l\'État ?',
    choices: ['1789', '1848', '1905', '1958'],
    answerIndex: 2,
    explanation: 'Loi du 9 décembre 1905, fondement de la laïcité.',
  },

  // — Histoire —
  {
    id: 'hist-revolution',
    category: 'histoire',
    prompt: 'En quelle année a eu lieu la Révolution française ?',
    choices: ['1689', '1789', '1815', '1848'],
    answerIndex: 1,
  },
  {
    id: 'hist-ddhc',
    category: 'histoire',
    prompt: 'Quand la Déclaration des droits de l\'homme et du citoyen a-t-elle été adoptée ?',
    choices: ['1789', '1804', '1848', '1958'],
    answerIndex: 0,
  },
  {
    id: 'hist-jeanne',
    category: 'histoire',
    prompt: 'Qui a libéré Orléans en 1429 pendant la guerre de Cent Ans ?',
    choices: ['Charlemagne', 'Jeanne d\'Arc', 'Henri IV', 'Vercingétorix'],
    answerIndex: 1,
  },
  {
    id: 'hist-napoleon',
    category: 'histoire',
    prompt: 'Qui était Napoléon Bonaparte ?',
    choices: [
      'Un roi de France',
      'Un empereur des Français',
      'Un président de la République',
      'Un Premier ministre',
    ],
    answerIndex: 1,
    explanation: 'Empereur de 1804 à 1814, puis brièvement en 1815 (Cent-Jours).',
  },
  {
    id: 'hist-degaulle',
    category: 'histoire',
    prompt: 'Quel appel Charles de Gaulle a-t-il lancé depuis Londres en 1940 ?',
    choices: ['L\'appel du 14 juillet', 'L\'appel du 18 juin', 'L\'appel du 8 mai', 'L\'appel du 11 novembre'],
    answerIndex: 1,
  },
  {
    id: 'hist-ww2-fin',
    category: 'histoire',
    prompt: 'Quelle date marque la fin de la Seconde Guerre mondiale en Europe ?',
    choices: ['11 novembre 1918', '8 mai 1945', '6 juin 1944', '14 juillet 1945'],
    answerIndex: 1,
  },
  {
    id: 'hist-ue',
    category: 'histoire',
    prompt: 'Quel traité fondateur de la construction européenne a été signé à Rome en 1957 ?',
    choices: ['Le traité de Maastricht', 'Le traité de Rome', 'Le traité de Lisbonne', 'Le traité de Versailles'],
    answerIndex: 1,
  },

  // — Géographie —
  {
    id: 'geo-capitale',
    category: 'geographie',
    prompt: 'Quelle est la capitale de la France ?',
    choices: ['Lyon', 'Marseille', 'Paris', 'Bordeaux'],
    answerIndex: 2,
  },
  {
    id: 'geo-mers',
    category: 'geographie',
    prompt: 'Combien de mers et océans bordent la France métropolitaine ?',
    choices: ['2', '3', '4', '5'],
    answerIndex: 2,
    explanation: 'Manche, mer du Nord, océan Atlantique et mer Méditerranée.',
  },
  {
    id: 'geo-fleuves',
    category: 'geographie',
    prompt: 'Lequel de ces fleuves ne traverse pas la France ?',
    choices: ['La Loire', 'La Seine', 'Le Rhône', 'Le Danube'],
    answerIndex: 3,
  },
  {
    id: 'geo-domtom',
    category: 'geographie',
    prompt: 'Lequel de ces territoires fait partie de la France d\'outre-mer ?',
    choices: ['Le Québec', 'La Guadeloupe', 'Le Sénégal', 'La Belgique'],
    answerIndex: 1,
  },
  {
    id: 'geo-frontalier',
    category: 'geographie',
    prompt: 'Lequel de ces pays ne partage pas de frontière terrestre avec la France métropolitaine ?',
    choices: ['L\'Espagne', 'L\'Allemagne', 'Le Portugal', 'L\'Italie'],
    answerIndex: 2,
  },

  // — Valeurs —
  {
    id: 'val-laicite-def',
    category: 'valeurs',
    prompt: 'Que garantit la laïcité ?',
    choices: [
      'L\'interdiction de toute religion',
      'La neutralité de l\'État et la liberté de conscience',
      'La promotion d\'une religion d\'État',
      'L\'obligation de pratiquer une religion',
    ],
    answerIndex: 1,
  },
  {
    id: 'val-egalite-hf',
    category: 'valeurs',
    prompt: 'En quelle année les femmes ont-elles obtenu le droit de vote en France ?',
    choices: ['1848', '1918', '1944', '1965'],
    answerIndex: 2,
    explanation: 'Ordonnance du 21 avril 1944 ; premier vote en 1945.',
  },
  {
    id: 'val-mariage',
    category: 'valeurs',
    prompt: 'Quel principe républicain garantit que la loi est la même pour tous ?',
    choices: ['La fraternité', 'La laïcité', 'L\'égalité', 'La souveraineté'],
    answerIndex: 2,
  },
  {
    id: 'val-symbole-liberte',
    category: 'valeurs',
    prompt: 'Quel texte fondamental proclame que « les hommes naissent et demeurent libres et égaux en droits » ?',
    choices: [
      'La Constitution de 1958',
      'La Déclaration des droits de l\'homme et du citoyen de 1789',
      'Le Code civil de 1804',
      'Le préambule de 1946',
    ],
    answerIndex: 1,
  },

  // — Culture —
  {
    id: 'cult-langue',
    category: 'culture',
    prompt: 'Quelle est la langue officielle de la République ?',
    choices: ['Le français et l\'anglais', 'Le français', 'Aucune langue officielle', 'Les langues régionales'],
    answerIndex: 1,
    explanation: 'Article 2 de la Constitution : « La langue de la République est le français. »',
  },
  {
    id: 'cult-hugo',
    category: 'culture',
    prompt: 'Qui a écrit Les Misérables ?',
    choices: ['Émile Zola', 'Victor Hugo', 'Honoré de Balzac', 'Marcel Proust'],
    answerIndex: 1,
  },
  {
    id: 'cult-curie',
    category: 'culture',
    prompt: 'Quelle scientifique française a obtenu deux prix Nobel ?',
    choices: ['Simone Veil', 'Marie Curie', 'Olympe de Gouges', 'Françoise Barré-Sinoussi'],
    answerIndex: 1,
    explanation: 'Prix Nobel de physique (1903) et de chimie (1911).',
  },
  {
    id: 'cult-pasteur',
    category: 'culture',
    prompt: 'À qui doit-on la mise au point du vaccin contre la rage ?',
    choices: ['Claude Bernard', 'Louis Pasteur', 'René Laennec', 'Ambroise Paré'],
    answerIndex: 1,
  },
];
