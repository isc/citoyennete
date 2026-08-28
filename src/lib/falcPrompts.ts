// Versions FALC (« Facile À Lire et à Comprendre ») des énoncés officiels.
//
// Ce fichier ne contient QUE des reformulations. Les énoncés officiels, eux,
// vivent dans questions.ts et ne doivent jamais être modifiés : ce sont eux
// qui seront lus le jour de l'examen. Une version FALC est un appui à la
// compréhension, affiché en complément et à la demande.
//
// Règles suivies (cf. commit d'origine) : une idée par phrase, phrases
// courtes, vocabulaire courant, voix active, tutoiement, pas de négation
// inutile — et surtout : la reformulation ne doit jamais donner ni suggérer
// la réponse.
//
// Les énoncés déjà courts et clairs n'ont volontairement PAS d'entrée ici :
// une paraphrase inutile ajouterait du bruit. Couverture actuelle :
// 199 / 368 énoncés.
//
// Statut : premier jet non validé. La norme FALC prévoit une relecture par
// des personnes concernées — voir FALC_REVIEW.md.

export const FALC_PROMPTS: Record<string, string> = {
  // Parmi les propositions suivantes, laquelle constitue une participation citoyenne ?
  'p-csutq': 'Un citoyen peut participer à la vie du pays. Dans cette liste, quelle action est une participation de citoyen ?',

  // Que garantit la liberté d'expression ?
  'p-g8ls': 'La liberté d\'expression est un droit. Que permet ce droit ?',

  // La liberté de circulation permet à toute personne de :
  'p-d7jpr': 'La liberté de circulation est un droit. Que peut faire une personne grâce à ce droit ?',

  // Complétez ces paroles de la Marseillaise : « Aux armes [...] ! Formez vos bataillons »
  'p-2hqjg': 'La Marseillaise est un chant. Voici une phrase de ce chant : « Aux armes [...] ! Formez vos bataillons ». Quels mots manquent ?',

  // Complétez les paroles de la Marseillaise : « Allons enfants de la patrie [...] »
  'p-91auu': 'La Marseillaise est un chant. Voici une phrase de ce chant : « Allons enfants de la patrie [...] ». Quels mots manquent ?',

  // En application de la liberté individuelle, quelle proposition est correcte ? Une personne peut :
  'p-drqk0': 'La liberté individuelle est un droit. Dans cette liste, qu\'est-ce qu\'une personne peut faire grâce à ce droit ?',

  // Concernant la pratique de la religion, quelle proposition est correcte ?
  'p-c9u7s': 'Une personne veut pratiquer une religion. Dans cette liste, quelle phrase est correcte ?',

  // En tant que parent, peut-on refuser que son enfant participe aux cours de sport à l'école car ils sont mixtes ?
  'p-8h4qe': 'À l\'école, les cours de sport sont mixtes : les filles et les garçons sont ensemble. Tu es parent. Est-ce que tu peux refuser que ton enfant aille à ces cours ?',

  // Quelle est la devise de la France ?
  'p-an3p4': 'La devise, c\'est une phrase courte qui dit les valeurs d\'un pays. Quelle est la devise de la France ?',

  // La répudiation de sa femme est :
  'p-enqu8': 'Un homme décide seul de renvoyer sa femme et d\'arrêter le mariage. On appelle cela la répudiation. En France, que dit la loi sur la répudiation ?',

  // Les impôts permettent de financer les dépenses publiques. Quelle proposition est correcte ?
  'p-a0080': 'Les impôts servent à payer les dépenses publiques. Dans cette liste, quelle phrase est vraie ?',

  // Que fait l'État pour lutter contre les discriminations ?
  'p-cap94': 'Une discrimination, c\'est traiter une personne moins bien à cause de ce qu\'elle est. Que fait l\'État contre les discriminations ?',

  // Un employeur refuse d'embaucher des femmes dans son entreprise. Que dit la loi ?
  'p-1qn0n': 'Un patron refuse de donner du travail aux femmes dans son entreprise. Que dit la loi ?',

  // Une des valeurs de la devise républicaine est l'égalité. Qu'est-ce que cela signifie ?
  'p-92b3u': 'L\'égalité fait partie de la devise de la République. Que veut dire l\'égalité ?',

  // A-t-on le droit d'insulter publiquement quelqu'un parce qu'il est différent (handicap, apparence physique, sexe…) ?
  'p-c1kog': 'Une personne est différente des autres : par exemple elle a un handicap, un autre physique ou un autre sexe. Est-ce que tu as le droit de l\'insulter devant tout le monde ?',

  // Le régime de la France est :
  'p-4n7hu': 'Le régime, c\'est la façon dont un pays est dirigé. Quel est le régime de la France ?',

  // Pourquoi le principe de laïcité doit-il être respecté à l'école ?
  'p-a2vfn': 'À l\'école, on doit respecter la laïcité. Pourquoi ?',

  // En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?
  'p-8u4j3': 'La France a voté une loi pour séparer les Églises et l\'État. C\'était en quelle année ?',

  // Quel droit est garanti par la laïcité ?
  'p-cto85': 'La laïcité protège un droit. Quel est ce droit ?',

  // Selon le principe de laïcité, que signifie la neutralité de l'État ?
  'p-cl2e0': 'Avec la laïcité, l\'État doit être neutre. Qu\'est-ce que cela veut dire ?',

  // Que peut faire un usager du service public dans une mairie ?
  'p-bhicm': 'Tu vas à la mairie. La mairie est un service public. Que peux-tu y faire ?',

  // Qui doit respecter le principe de neutralité religieuse dans une préfecture ?
  'p-1oor7': 'La neutralité religieuse, c\'est ne pas montrer sa religion. Dans une préfecture, qui doit respecter cette règle ?',

  // La laïcité impose-t-elle aux agents publics d'être neutres vis-à-vis des usagers ?
  'p-d5gku': 'Les agents publics travaillent pour l\'État, par exemple à la mairie. Est-ce que la laïcité leur demande d\'être neutres avec le public ?',

  // Que garantit le principe de laïcité ?
  'p-cigv': 'La laïcité est une règle importante en France. Qu\'est-ce que cette règle garantit ?',

  // Qu'est ce qui est interdit par la Charte de la laïcité à l'école ?
  'p-4ra50': 'La Charte de la laïcité est un texte pour l\'école. Qu\'est-ce que ce texte interdit ?',

  // Le président de la République a commis un crime. Quelle proposition est correcte ?
  'i-7a6a3': 'Imagine : le président de la République commet un crime. Dans cette liste, quelle phrase est correcte ?',

  // La loi est l'expression de :
  'i-1so34': 'Cette phrase n\'est pas finie : « La loi est l\'expression de… ». Choisis la bonne fin.',

  // Quelle est la durée du mandat du conseil municipal et du maire ?
  'i-5op4e': 'Le mandat, c\'est la durée pendant laquelle une personne est élue. Combien de temps dure le mandat du maire et du conseil municipal ?',

  // À la fin de son mandat, le président de la République peut-il décider de rester au pouvoir ?
  'i-b0j6t': 'Le président de la République est élu pour une durée limitée. À la fin de cette durée, est-ce qu\'il peut rester président ?',

  // Qu'est-ce que le pouvoir législatif ? Le pouvoir :
  'i-e07gt': 'Cette phrase n\'est pas finie : « Le pouvoir législatif, c\'est le pouvoir… ». Choisis la bonne fin.',

  // Pourquoi séparer les trois pouvoirs dans une démocratie ?
  'i-b482g': 'Dans une démocratie, les trois pouvoirs sont séparés. Pourquoi ?',

  // Qui sanctionne l'auteur d'un vol ?
  'i-8lsng': 'Une personne a volé quelque chose. Qui la punit ?',

  // Combien de députés composent l'Assemblée nationale ?
  'i-bl50o': 'Combien de députés y a-t-il à l\'Assemblée nationale ?',

  // Pour combien de temps sont élus les sénateurs ?
  'i-fpldv': 'Les sénateurs sont élus. Pendant combien de temps ?',

  // La séparation des pouvoirs est un principe fondamental. Quels sont les trois pouvoirs concernés ?
  'i-e1m2v': 'Les pouvoirs de l\'État sont séparés : c\'est un principe important. Quels sont ces trois pouvoirs ?',

  // Quelle condition est nécessaire pour voter aux élections ?
  'i-fiolm': 'Que faut-il pour avoir le droit de voter aux élections ?',

  // Quel est le régime politique de la France aujourd'hui ?
  'i-du82s': 'Un régime politique, c\'est la façon de gouverner un pays. Quel est aujourd\'hui le régime politique de la France ?',

  // Le Parlement est composé :
  'i-727g6': 'De quoi est composé le Parlement ?',

  // Quel traité concerne la construction de l'Union européenne ?
  'i-gid9': 'Un traité est un accord entre plusieurs pays. Quel traité a servi à construire l\'Union européenne ?',

  // Quel État a quitté l'Union européenne en 2020 ?
  'i-5nb17': 'Quel pays est sorti de l\'Union européenne en 2020 ?',

  // Quelle est la devise de l'Union européenne ?
  'i-2h28v': 'Une devise est une phrase courte qui représente un groupe. Quelle est la devise de l\'Union européenne ?',

  // Quel est l'hymne de l'Union européenne ?
  'i-5g8q': 'Un hymne est une musique officielle. Quel est l\'hymne de l\'Union européenne ?',

  // De quoi est composé le drapeau européen ?
  'i-9lvot': 'Qu\'est-ce qu\'il y a sur le drapeau européen ?',

  // En quelle année le traité de Maastricht, qui marque la fondation de l'Union européenne, a-t-il été signé ?
  'i-11t9i': 'Le traité de Maastricht a créé l\'Union européenne. En quelle année a-t-on signé ce traité ?',

  // Où est le siège du Parlement européen ?
  'i-aud95': 'Le siège, c\'est le lieu principal. Où est le siège du Parlement européen ?',

  // Où est le siège de la Commission européenne ?
  'i-43mg0': 'Le siège, c\'est le lieu principal. Où est le siège de la Commission européenne ?',

  // Quel État n'est pas membre de l'Union européenne ?
  'i-bokkq': 'Quel pays ne fait pas partie de l\'Union européenne ?',

  // À quelle fréquence les élections européennes sont-elles organisées ?
  'i-8hj6': 'On organise les élections européennes tous les combien de temps ?',

  // Quelle condition est nécessaire pour voter aux élections européennes ?
  'i-1eoc6': 'Que faut-il pour avoir le droit de voter aux élections européennes ?',

  // Quel pays est un pays fondateur de l'Union européenne ?
  'i-d86bd': 'Quel pays a participé à la création de l\'Union européenne ?',

  // Au nom de quoi l'État justifie-t-il la restriction des droits ?
  'd-cv6u6': 'Parfois, l\'État limite les droits des personnes. Quelle raison donne-t-il pour cela ?',

  // Concernant le droit de se marier, quelle proposition est correcte ?
  'd-eeltm': 'Dans cette liste, quelle phrase est vraie sur le droit de se marier ?',

  // La peine de mort est :
  'd-2sskc': 'Quelle phrase est vraie sur la peine de mort ?',

  // Laquelle de ces citations est inscrite dans la Déclaration des Droits de l'homme et du Citoyen de 1789 ?
  'd-5g7bj': 'La Déclaration des Droits de l\'homme et du Citoyen de 1789 est un texte officiel. Quelle phrase de cette liste vient de ce texte ?',

  // Le recours à l'avortement est-il autorisé ?
  'd-du7gl': 'Est-ce que l\'avortement est autorisé ?',

  // Que garantit la liberté de la presse ?
  'd-6fi5j': 'La liberté de la presse est un droit. Que permet ce droit ?',

  // Que prévoit la Charte de l'environnement ?
  'd-8jrm5': 'La Charte de l\'environnement est un texte officiel. Que dit ce texte ?',

  // Quelle liberté permet à une personne de croire en la religion de son choix ?
  'd-2d3pl': 'Une personne peut croire en la religion qu\'elle veut. Quelle liberté donne ce droit ?',

  // Une femme majeure de nationalité française a-t-elle le droit de voter aux élections ?
  'd-9oq3q': 'Une femme française et majeure peut-elle voter aux élections ?',

  // Concernant l'utilisation des réseaux sociaux, quelle proposition est correcte ?
  'd-3nvsb': 'Dans cette liste, quelle phrase est vraie sur l\'utilisation des réseaux sociaux ?',

  // Jeter un mégot par terre est :
  'd-d0ncd': 'Une personne jette un mégot de cigarette par terre. Quelle phrase est vraie sur cette action ?',

  // Parmi ces actions, laquelle permet d'adopter une attitude respectueuse de l'environnement ?
  'd-52a2b': 'Dans cette liste, quelle action protège l\'environnement ?',

  // Quelle proposition constitue une obligation ?
  'd-85l16': 'Une obligation est une chose qu\'on doit faire. Dans cette liste, quelle phrase est une obligation ?',

  // Pour quel motif peut-on limiter la liberté d'expression ?
  'd-3hk6t': 'Pour quelle raison peut-on limiter la liberté d\'expression ?',

  // Que doit-on faire face aux ordres des policiers ou gendarmes ?
  'd-76hhf': 'Un policier ou un gendarme te donne un ordre. Que dois-tu faire ?',

  // Quel est un exemple d'assistance à personne en danger ?
  'd-dpiej': 'Dans cette liste, quel exemple montre qu\'on aide une personne en danger ?',

  // Quel exemple illustre une limitation de liberté pour protéger l'intérêt général ?
  'd-2rm9a': 'Parfois, on limite une liberté pour protéger tout le monde. Dans cette liste, quel exemple montre cela ?',

  // Quelle est l'attitude à avoir lorsque qu'on est témoin de violences ?
  'd-8r55i': 'Tu vois des violences. Que dois-tu faire ?',

  // Quelle est l'infraction la plus grave ?
  'd-5db46': 'Une infraction est une action interdite par la loi. Dans cette liste, quelle infraction est la plus grave ?',

  // Quelle obligation concerne toutes les personnes résidant en France quelle que soit leur nationalité ?
  'd-b94mr': 'Quelle obligation concerne toutes les personnes qui vivent en France, même les étrangers ?',

  // Quelle proposition représente un exemple de crime ?
  'd-7hfhj': 'Dans cette liste, quel exemple est un crime ?',

  // Quelle proposition représente un exemple de délit ?
  'd-2k5st': 'Dans cette liste, quel exemple est un délit ?',

  // Qui veille au maintien de l'ordre public ?
  'd-d3j39': 'Qui doit faire respecter l\'ordre public ?',

  // S'agissant des déchets, quelle proposition est correcte ?
  'd-9hone': 'Les déchets sont les ordures que tu jettes. Dans cette liste, quelle phrase sur les déchets est vraie ?',

  // Quel roi de France a été exécuté pendant la Révolution française ?
  'h-otcp': 'Pendant la Révolution française, on a tué un roi de France. De quel roi s\'agit-il ?',

  // Lequel de ces personnages a un lien avec la République française ?
  'h-cgu0f': 'Dans cette liste, quelle personne a un lien avec la République française ?',

  // De quand date l'appel à la résistance du général de Gaulle ?
  'h-3cn11': 'Le général de Gaulle a lancé un appel à la résistance. Quelle est la date de cet appel ?',

  // Pourquoi la Shoah est-elle étudiée à l'école ?
  'h-2hjof': 'À l\'école, on étudie la Shoah. Pourquoi ?',

  // Depuis quand les Français élisent-ils le président de la République au suffrage universel direct ?
  'h-8lqkq': 'Aujourd\'hui, les Français votent eux-mêmes pour élire le président. On appelle cela le suffrage universel direct. Depuis quand est-ce que les Français votent comme ça ?',

  // Quelle est la première étape de la construction européenne en 1951 ?
  'h-3j3if': 'En 1951, des pays d\'Europe commencent à s\'unir. Quelle est la première étape de cette construction européenne ?',

  // Durant le mandat de quel président la peine de mort a-t-elle été abolie ?
  'h-cv13m': 'La France a supprimé la peine de mort. Quel président dirigeait la France à ce moment-là ?',

  // Quel régime politique a été mis en place pendant la Révolution française en 1792 ?
  'h-fu098': 'En 1792, pendant la Révolution française, la France change de régime politique. Quel est ce nouveau régime ?',

  // Qui était une figure de la Résistance française pendant la Seconde Guerre mondiale ?
  'h-17gnb': 'Dans cette liste, quelle personne a été importante dans la Résistance française pendant la Seconde Guerre mondiale ?',

  // Quelle organisation internationale a été créée en 1945 après la Seconde Guerre mondiale ?
  'h-a441c': 'En 1945, après la Seconde Guerre mondiale, des pays ont créé une organisation internationale. Laquelle ?',

  // Quelle peine a été supprimée en 1981 ?
  'h-3lr1c': 'Une peine est une punition donnée par la justice. En 1981, la France a supprimé une peine. Laquelle ?',

  // En quelle année l'euro est-elle devenue la monnaie utilisée en France ?
  'h-4b1mk': 'En quelle année est-ce que l\'euro est devenu la monnaie de la France ?',

  // Où a eu lieu le débarquement en 1944 ?
  'h-drapl': 'Où s\'est passé le débarquement de 1944 ?',

  // Quel continent a été le plus concerné par la décolonisation française après la Seconde Guerre mondiale ?
  'h-2242t': 'Après la Seconde Guerre mondiale, les colonies françaises sont devenues indépendantes. On appelle cela la décolonisation. Quel continent a été le plus touché ?',

  // Quelle mer ou océan borde la France métropolitaine ?
  'h-551lm': 'La France métropolitaine, c\'est la France en Europe. Quelle mer ou quel océan touche la France métropolitaine ?',

  // Quel pays a une frontière terrestre avec la France métropolitaine ?
  'h-1qm0h': 'La France métropolitaine, c\'est la France en Europe. Dans cette liste, quel pays touche la France par la terre ?',

  // Quelle ville française est un port maritime ?
  'h-esa8u': 'Quelle ville française a un port sur la mer ?',

  // Quelle est la population approximative de la France en 2025 ?
  'h-4h1l3': 'En 2025, combien de personnes habitent en France, à peu près ?',

  // Lequel de ces pays partage des frontières terrestres avec la France ?
  'h-654r5': 'Dans cette liste, quel pays touche la France par la terre ?',

  // Quel pays a une frontière avec la France métropolitaine au nord-est ?
  'h-f6j6o': 'La France métropolitaine, c\'est la France en Europe. Quel pays est à côté de la France, au nord-est ?',

  // Où se trouvent les principales activités économiques en France ?
  'h-aprfd': 'Les activités économiques, ce sont les entreprises et le travail. En France, où sont-elles surtout ?',

  // Parmi ces pays, lequel attire le plus de visiteurs chaque année ?
  'h-eh37m': 'Dans cette liste, quel pays reçoit le plus de touristes chaque année ?',

  // Quelle région est la plus peuplée ?
  'h-aee63': 'Quelle région a le plus d\'habitants ?',

  // Quelle ville française fait partie des 10 plus grandes métropoles du pays ?
  'h-cbj5e': 'Une métropole est une très grande ville. Quelle ville française fait partie des 10 plus grandes métropoles du pays ?',

  // Lequel de ces départements de France est le plus touristique ?
  'h-95d74': 'Dans cette liste, quel département de France reçoit le plus de touristes ?',

  // Quand peut-on visiter gratuitement des lieux culturels en France ?
  'h-5f2pq': 'Les lieux culturels sont par exemple les musées et les monuments. Quand peut-on les visiter sans payer en France ?',

  // Quel est le classement de la langue française parmi les langues les plus parlées dans le monde ?
  'h-3tdll': 'Beaucoup de gens parlent français dans le monde. À quelle place est le français parmi les langues les plus parlées ?',

  // Quelle cathédrale célèbre a été en partie détruite par un incendie en 2019 ?
  'h-9ol9f': 'En 2019, un incendie a détruit une partie d\'une cathédrale célèbre. Quelle est cette cathédrale ?',

  // Quel mariage est reconnu par l'État ?
  's-47r0u': 'Dans cette liste, quel mariage est valable pour l\'État français ?',

  // Auprès de quelle institution les parents peuvent-ils inscrire leur enfant à l'école publique ?
  's-9mgaf': 'Tu veux inscrire ton enfant à l\'école publique. Où dois-tu faire l\'inscription ?',

  // En cas de divorce, qui exerce l'autorité parentale ?
  's-e08s6': 'L\'autorité parentale, c\'est le droit de décider pour son enfant. Après un divorce, qui a l\'autorité parentale ?',

  // Quelle aide permet aux personnes qui ont des difficultés financières d'avoir un avocat ?
  's-9cgbs': 'Tu as des difficultés d\'argent et tu as besoin d\'un avocat. Quelle aide peux-tu demander ?',

  // Quelle est l'une des conditions pour passer l'examen du permis de conduire ?
  's-5dupn': 'Tu veux passer l\'examen du permis de conduire. Quelle condition faut-il remplir ?',

  // Un bail locatif est valide s'il est :
  's-6u0d9': 'Un bail locatif est l\'accord entre un propriétaire et un locataire pour un logement. Cet accord est valable s\'il est :',

  // Concernant l'accès aux soins, quelle proposition est correcte ?
  's-d8085': 'Les soins, c\'est aller chez le médecin ou à l\'hôpital. Dans cette liste, quelle phrase est vraie ?',

  // À qui est accessible la contraception ?
  's-d9a0t': 'La contraception permet de ne pas avoir d\'enfant. Qui peut l\'obtenir ?',

  // Qu'est-ce que le principe de confidentialité dans le domaine de la santé ?
  's-beia1': 'En santé, il existe une règle : la confidentialité. Que veut dire cette règle ?',

  // L'inscription à l'Assurance maladie est :
  's-un1u': 'L\'Assurance maladie rembourse une partie des frais de santé. Complète la phrase : l\'inscription à l\'Assurance maladie est ...',

  // Qui peut demander un congé parental d'éducation ?
  's-c3b9j': 'Avec le congé parental d\'éducation, un parent arrête de travailler pour s\'occuper de son enfant. Qui peut demander ce congé ?',

  // Quelles sont les affaires traitées par le conseil de prud'hommes ?
  's-fu5ad': 'Le conseil de prud\'hommes est un tribunal. De quels problèmes s\'occupe ce tribunal ?',

  // Travailler sans être déclaré est :
  's-fqidb': 'Certaines personnes travaillent sans être déclarées. Complète la phrase : travailler sans être déclaré, c\'est ...',

  // Lorsqu'un employeur veut qu'un salarié travaille plus longtemps que la durée prévue dans le contrat de travail :
  's-s7hm': 'Le contrat de travail prévoit un nombre d\'heures. Un employeur demande à un salarié de travailler plus d\'heures. Que dit la loi dans ce cas ?',

  // Quelle est la mission de France Travail ?
  's-fppa4': 'À quoi sert France Travail ?',

  // Dans une entreprise, le droit syndical permet :
  's-9ul56': 'Dans une entreprise, que permet le droit syndical ?',

  // Dans une entreprise, le droit de grève autorise :
  's-knm0': 'Dans une entreprise, que permet le droit de grève ?',

  // Quelles sont les conditions pour toucher les allocations chômage ?
  's-3ns1r': 'Les allocations chômage sont de l\'argent versé quand une personne perd son travail. Que faut-il pour les recevoir ?',

  // Comment s'appelle le diplôme passé par les élèves à la fin du collège ?
  's-4n177': 'À la fin du collège, les élèves passent un diplôme. Quel est le nom de ce diplôme ?',

  // Les parents d'élève ont le droit de :
  's-au4vd': 'Complète la phrase : les parents d\'un élève ont le droit de ...',

  // À quel âge commence l'instruction obligatoire des enfants ?
  's-d0es1': 'L\'instruction est obligatoire pour les enfants. À partir de quel âge ?',

  // À l'école, il est interdit aux parents de :
  's-cp3bg': 'Complète la phrase : à l\'école, les parents n\'ont pas le droit de ...',

  // Quel motif d'absence est accepté par l'école ?
  's-9arqh': 'Parfois, un élève ne va pas à l\'école. Quelle raison d\'absence est-ce que l\'école accepte ?',

  // Des parents ne respectent pas l'obligation d'instruction pour leurs enfants. Quelle sanction maximale risquent-ils ?
  's-17bd8': 'L\'instruction des enfants est obligatoire. Des parents ne respectent pas cette obligation. Quelle est la punition la plus grave pour eux ?',

  // À l'école, un enfant en situation de handicap :
  's-dl59r': 'Complète la phrase : à l\'école, un enfant en situation de handicap ...',

  // À quoi correspond la date du 14 juillet ?
  'cp-3j2ru': 'Le 14 juillet est une date importante en France. Que représente cette date ?',

  // Le principe d'égalité signifie que :
  'cp-frgi4': 'Complète la phrase : le principe d\'égalité veut dire que ...',

  // Certains métiers peuvent-ils être réservés aux hommes ?
  'cp-chbbc': 'Est-ce que certains métiers peuvent être réservés aux hommes ?',

  // De quand date la Constitution de la Ve République ?
  'cp-6slma': '« Ve République » se lit « cinquième République ». De quelle année date sa Constitution ?',

  // Lequel de ces symboles représente officiellement la République française ?
  'cp-748vm': 'Dans cette liste, quel symbole représente officiellement la République française ?',

  // Que signifie le mot « fraternité » dans la devise française ?
  'cp-ebouk': 'La devise française contient le mot « fraternité ». Que veut dire ce mot ?',

  // Quel est l'un des rôles des associations ?
  'cp-5f447': 'Une association est un groupe de personnes. À quoi peut servir une association ?',

  // Quelle liberté permet à chacun d'exprimer ses idées ?
  'cp-7s0m2': 'Chaque personne peut dire ses idées. Quelle liberté permet cela ?',

  // Quelle proposition est correcte ? La liberté d'expression :
  'cp-13sol': 'La liberté d\'expression est un droit. Dans cette liste, quelle phrase sur ce droit est vraie ?',

  // Qu'est ce qui est traditionnellement organisé sur les Champs-Élysées le 14 juillet pour célébrer la fête nationale ?
  'cp-75dne': 'Le 14 juillet, la France fête sa fête nationale. Chaque année, on organise quelque chose sur les Champs-Élysées. Qu\'est-ce que c\'est ?',

  // Une personne peut-elle changer librement de religion ?
  'cp-86r4v': 'Est-ce qu\'une personne a le droit de changer de religion quand elle veut ?',

  // « La France est une République indivisible, ..., démocratique et sociale ». Complétez cette phrase extraite de l'article 1er de la Constitution :
  'cp-h269': 'Voici une phrase de la Constitution française : « La France est une République indivisible, ..., démocratique et sociale ». Quel mot manque ?',

  // En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?
  'cp-5v6jm': 'Une loi sépare les Églises et l\'État en France. De quelle année date cette loi ?',

  // Un enfant peut-il refuser d'aller à l'école pour une raison religieuse ?
  'cp-ankk7': 'Est-ce qu\'un enfant peut refuser d\'aller à l\'école pour une raison religieuse ?',

  // Qu'est-ce que le pouvoir exécutif ? Le pouvoir :
  'ci-7nld3': 'Complète la phrase. Le pouvoir exécutif, c\'est le pouvoir ...',

  // Les dirigeants sont élus par les citoyens dans :
  'ci-sl82': 'Les citoyens élisent leurs dirigeants. Complète la phrase : cela se passe dans ...',

  // A-t-on le droit de ne pas respecter une loi ?
  'ci-uh28': 'Est-ce qu\'une personne a le droit de ne pas respecter une loi ?',

  // Quel est le rôle de l'autorité judiciaire ?
  'ci-7ldmc': 'À quoi sert l\'autorité judiciaire ?',

  // Quel pouvoir détient un juge ? Le pouvoir :
  'ci-3vhip': 'Un juge a un pouvoir. Complète la phrase : c\'est le pouvoir ...',

  // L'autorité judiciaire est exercée par :
  'ci-dhtuq': 'Qui exerce l\'autorité judiciaire ?',

  // Qui est élu lors des élections législatives ?
  'ci-abahi': 'Aux élections législatives, les citoyens votent. Qui est-ce qu\'ils élisent ?',

  // Qui est élu lors des élections municipales ?
  'ci-2q4vh': 'Aux élections municipales, les citoyens votent. Qui est-ce qu\'ils élisent ?',

  // Pour combien de temps est élu le président de la République française ?
  'ci-6eee4': 'Le président de la République est élu. Combien de temps reste-t-il président ?',

  // Pour combien de temps sont élus les députés ?
  'ci-71om4': 'Les députés sont élus. Combien de temps restent-ils députés ?',

  // Que signifie « suffrage universel » ?
  'ci-eandd': 'Que veut dire l\'expression « suffrage universel » ?',

  // Concernant les partis politiques, quelle proposition est correcte ?
  'ci-eh679': 'Cette liste parle des partis politiques. Quelle phrase est vraie ?',

  // Qui réside au palais de l'Élysée ?
  'ci-8sv7s': 'Qui habite au palais de l\'Élysée ?',

  // Combien d'États font partie de l'Union européenne au 1er janvier 2025 ?
  'ci-3enho': 'Le 1er janvier 2025, combien de pays sont membres de l\'Union européenne ?',

  // Comment s'appelle le texte qui énonce les droits et devoirs des personnes résidant en France ?
  'cd-18l07': 'Un texte donne les droits et les devoirs des personnes qui vivent en France. Quel est le nom de ce texte ?',

  // Concernant les droits individuels, quelle proposition est correcte ?
  'cd-1m07h': 'Les droits individuels sont les droits de chaque personne. Dans cette liste, quelle phrase est vraie ?',

  // De quelle année date la Déclaration des droits de l'homme et du citoyen ?
  'cd-1rsh6': 'En quelle année a-t-on écrit la Déclaration des droits de l\'homme et du citoyen ?',

  // Lequel de ces droits est un droit fondamental ?
  'cd-pqlo': 'Un droit fondamental est un droit très important pour toutes les personnes. Dans cette liste, quel droit est fondamental ?',

  // Parmi ces textes, lequel garantit les droits et libertés en France ?
  'cd-a32cl': 'En France, un texte protège les droits et les libertés. Dans cette liste, quel est ce texte ?',

  // Quel est le texte fondateur établissant en France les droits et les devoirs de chaque citoyen ?
  'cd-1vl1q': 'En France, un grand texte donne les droits et les devoirs de chaque citoyen. Quel est le nom de ce texte ?',

  // Quel texte a été adopté pendant la Révolution française ?
  'cd-frmeq': 'Pendant la Révolution française, les Français ont adopté un texte. Dans cette liste, quel est ce texte ?',

  // Une femme peut avorter :
  'cd-kd3j': 'Avorter veut dire arrêter une grossesse. Complète la phrase : « Une femme peut avorter… »',

  // Concernant les limites aux libertés individuelles, quelle proposition est correcte ?
  'cd-cmcp4': 'Les libertés individuelles sont les libertés de chaque personne. Cette liste parle des limites à ces libertés. Quelle phrase est vraie ?',

  // En France, est-ce légal d'être marié à plusieurs personnes en même temps ?
  'cd-f9sjt': 'En France, est-ce que la loi permet d\'être marié avec plusieurs personnes en même temps ?',

  // Faut-il réduire ses déchets ?
  'cd-36p9e': 'Les déchets sont les choses qu\'on jette à la poubelle. Est-ce qu\'il faut réduire ses déchets ?',

  // Pourquoi les libertés individuelles peuvent-elles être limitées ?
  'cd-bj88u': 'Les libertés individuelles sont les libertés de chaque personne. Pourquoi peut-on limiter ces libertés ?',

  // Que permet la citoyenneté française ?
  'cd-7kstk': 'Une personne peut avoir la citoyenneté française. Qu\'est-ce que cela permet ?',

  // Que risque une personne qui ne respecte pas la loi ?
  'cd-8m0pt': 'Une personne ne respecte pas la loi. Qu\'est-ce qu\'elle risque ?',

  // Comment peut-on réduire ses déchets ?
  'cd-f5p4g': 'Les déchets sont les choses qu\'on jette à la poubelle. Comment peux-tu réduire tes déchets ?',

  // En quoi consiste la traite des êtres humains ?
  'cd-8orfj': 'Que veut dire l\'expression « traite des êtres humains » ?',

  // En quelle année a débuté la Révolution française ?
  'ch-6abrm': 'En quelle année la Révolution française a-t-elle commencé ?',

  // Lequel de ces personnages historiques est français ?
  'ch-abkuo': 'Dans cette liste, quelle personne célèbre de l\'histoire est française ?',

  // Dans quelle République est-on aujourd'hui ?
  'ch-619ml': 'Aujourd\'hui, dans quelle République sommes-nous ?',

  // Quel pays ou région du monde a été colonisé par la France ?
  'ch-88ovo': 'Dans cette liste, quel pays ou quelle région du monde la France a colonisé ?',

  // Qui a rendu l'école gratuite, laïque et obligatoire ?
  'ch-uapa': 'En France, l\'école est gratuite, laïque et obligatoire. Qui a décidé cela ?',

  // Le 11 novembre est un jour férié. À quoi correspond cette date ?
  'ch-60gnd': 'Le 11 novembre est un jour férié : on ne travaille pas. Que célèbre-t-on ce jour-là ?',

  // En quelle année l'esclavage a-t-il été aboli définitivement en France ?
  'ch-fp6u4': 'La France a supprimé l\'esclavage pour toujours. En quelle année ?',

  // Depuis quelle année l'école publique est-elle gratuite ?
  'ch-77d9a': 'En France, l\'école publique est gratuite. Depuis quelle année ?',

  // Qui a fondé la Ve République ?
  'ch-dvkp6': 'Qui a créé la Ve République ?',

  // Quel océan borde la côte ouest française ?
  'ch-64cr3': 'L\'ouest de la France touche un océan. Quel est cet océan ?',

  // Sur quel continent se situe la France métropolitaine ?
  'ch-41ng3': 'La France métropolitaine, c\'est la France sans les territoires d\'outre-mer. Sur quel continent est-elle ?',

  // Quelle chaîne de montagnes est située entre la France et l'Italie ?
  'ch-8ikbc': 'Des montagnes se trouvent entre la France et l\'Italie. Comment s\'appellent ces montagnes ?',

  // Quel numéro d'urgence permet d'appeler le SAMU ?
  'cs-96q5d': 'Le SAMU, c\'est le service médical d\'urgence. Quel numéro appelles-tu pour joindre le SAMU ?',

  // Après avoir obtenu le permis de conduire, que faut-il faire pour pouvoir conduire sa voiture ?
  'cs-3ek78': 'Tu as obtenu ton permis de conduire. Que dois-tu faire encore pour conduire ta voiture ?',

  // À quelles conditions un mariage est-il reconnu juridiquement ?
  'cs-6v9kf': 'La loi reconnaît un mariage sous certaines conditions. Quelles sont ces conditions ?',

  // Quand faut-il déclarer son enfant au service d'état civil de la mairie ?
  'cs-4uuvq': 'Tu dois déclarer ton enfant au service d\'état civil de la mairie. Quand dois-tu le faire ?',

  // Le travail non déclaré est :
  'cs-bboc': 'Parfois, un employeur ne déclare pas un travailleur. Ce travail non déclaré est :',

  // Quelle est la première démarche à réaliser pour chercher un emploi ?
  'cs-ce2c3': 'Tu cherches un emploi. Quelle est la première chose à faire ?',

  // Quelle est la durée légale du temps de travail par semaine ?
  'cs-6s3eo': 'La loi fixe une durée de travail par semaine. Quelle est cette durée ?',

  // Qui est aidé par France Travail ?
  'cs-ehlfh': 'France Travail aide certaines personnes. Qui sont ces personnes ?',

  // Une personne étrangère en situation régulière peut créer son entreprise :
  'cs-7ssud': 'Une personne étrangère a des papiers en règle pour vivre en France. Elle peut créer son entreprise :',

  // Auprès de quel organisme faut-il demander le remboursement des frais de santé ?
  'cs-5j8cg': 'Tu as payé des frais de santé. À quel organisme demandes-tu le remboursement de cet argent ?',

  // En cas de problème de santé non urgent, à qui faut-il s'adresser en premier ?
  'cs-7uqju': 'Tu as un problème de santé, mais ce n\'est pas urgent. À qui dois-tu t\'adresser en premier ?',

  // Dans quelles situations doit-on se rendre aux urgences de l'hôpital ?
  'cs-1jqbt': 'Dans quelles situations dois-tu aller aux urgences de l\'hôpital ?',

  // Quel est l'objectif des vaccinations obligatoires ?
  'cs-3sn88': 'Certains vaccins sont obligatoires. À quoi servent ces vaccins ?',

  // L'autorité parentale prévoit l'obligation :
  'cs-a3tvu': 'Les parents ont l\'autorité parentale sur leur enfant. Cette autorité les oblige à :',

  // Dans quels établissements scolaires vont les élèves après l'école élémentaire ?
  'cs-fc8qk': 'Les élèves finissent l\'école élémentaire. Où vont-ils étudier après ?',

  // Un enfant inscrit à l'école :
  'cs-4nqao': 'Les parents inscrivent leur enfant à l\'école. Cet enfant :',
};
