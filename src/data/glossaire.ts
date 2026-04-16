export const glossaire = [
  {
    terme: "Actuaire",
    categorie: "Métier",
    definition: "Professionnel des mathématiques appliquées qui évalue les risques financiers liés à des événements incertains (accidents, décès, catastrophes). Il calcule les primes d'assurance, les provisions et la solvabilité des compagnies.",
    exemple: "L'actuaire d'une compagnie d'assurance auto calcule la prime à facturer à chaque conducteur selon son profil de risque.",
  },
  {
    terme: "Prime d'assurance",
    categorie: "Assurance",
    definition: "Somme versée par l'assuré à l'assureur en échange d'une couverture contre un risque défini. Elle se compose de la prime pure (coût du risque) et des chargements (frais de gestion, marge).",
    exemple: "Tu paies 500€/an de prime pour ton assurance habitation. L'actuaire a calculé que le coût moyen du risque pour ton profil est de 300€, le reste couvre les frais.",
  },
  {
    terme: "Provision technique",
    categorie: "Comptabilité",
    definition: "Somme qu'une compagnie d'assurance doit mettre de côté pour faire face à ses engagements futurs envers les assurés. Ce n'est pas un bénéfice — c'est une dette.",
    exemple: "Si 1000 sinistres auto sont déclarés mais pas encore réglés, l'assureur constitue une PSAP (Provision pour Sinistres À Payer) pour les montants estimés.",
  },
  {
    terme: "Sinistre",
    categorie: "Assurance",
    definition: "Réalisation du risque assuré qui déclenche l'obligation d'indemnisation de l'assureur. Peut être un accident, un incendie, un décès, une maladie, etc.",
    exemple: "Un accident de voiture est un sinistre pour l'assurance auto. L'assureur indemnise les dommages selon les garanties du contrat.",
  },
  {
    terme: "Mutualisation",
    categorie: "Principe",
    definition: "Principe fondamental de l'assurance : répartir le coût d'un risque rare mais coûteux sur un grand nombre d'assurés. Chacun paie peu, mais le groupe peut indemniser ceux qui subissent un sinistre.",
    exemple: "1000 personnes cotisent 100€ chacune. 10 ont un sinistre de 5000€. Le pool de 100 000€ suffit à indemniser les 10 sinistres (10 × 5000€ = 50 000€).",
  },
  {
    terme: "Solvabilité",
    categorie: "Réglementation",
    definition: "Capacité d'une compagnie d'assurance à honorer tous ses engagements envers les assurés, même dans des scénarios défavorables. Solvabilité II est la réglementation européenne qui encadre cela.",
    exemple: "Une compagnie est solvable si ses actifs dépassent ses provisions techniques d'une marge suffisante pour absorber des chocs (marchés financiers, catastrophes naturelles).",
  },
  {
    terme: "Best Estimate",
    categorie: "Solvabilité II",
    definition: "Meilleure estimation de la valeur actuelle probable des flux de trésorerie futurs liés aux contrats d'assurance. Calculée sans marge de prudence, actualisée avec la courbe des taux EIOPA.",
    exemple: "Pour une rente viagère, le Best Estimate est la somme actualisée de toutes les rentes futures pondérées par les probabilités de survie de l'assuré.",
  },
  {
    terme: "Loi des grands nombres",
    categorie: "Mathématiques",
    definition: "Théorème statistique fondamental : plus le nombre d'observations est grand, plus la moyenne observée se rapproche de la moyenne théorique. C'est le fondement mathématique de l'assurance.",
    exemple: "Une pièce équilibrée tombe sur Face 50% du temps EN MOYENNE sur de nombreux lancers. Avec 10 lancers, tu peux avoir 70% de Face. Avec 1 million, tu seras très proche de 50%.",
  },
  {
    terme: "CIMA",
    categorie: "Réglementation Afrique",
    definition: "Conférence Interafricaine des Marchés d'Assurances. Organisation qui réglemente le marché des assurances dans 14 pays d'Afrique francophone, dont la Côte d'Ivoire.",
    exemple: "Le code CIMA fixe les règles de provisionnement, les ratios de solvabilité et les conditions d'agrément pour toutes les compagnies d'assurance de la zone.",
  },
  {
    terme: "Table de mortalité",
    categorie: "Démographie actuarielle",
    definition: "Tableau statistique indiquant, pour chaque âge, la probabilité de décéder dans l'année (qx) et l'espérance de vie résiduelle. Outil central en assurance vie et retraite.",
    exemple: "La table TD 88-90 indique qu'un homme de 60 ans a une probabilité de 0.8% de décéder dans l'année, avec une espérance de vie résiduelle d'environ 20 ans.",
  },
];
