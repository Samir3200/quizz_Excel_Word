// data/quizData.js
export const quizData = [
  {
    id: 1,
    question: "Comment définit-on l'intersection d'une ligne et d'une colonne dans un tableur ?",
    options: ["Un classeur", "Une cellule", "Un champ", "Une plage"],
    answer: "Une cellule",
    rationale: "La cellule est précisément définie comme l'intersection d'une ligne et d'une colonne."
  },
  {
    id: 2,
    question: "Lequel de ces éléments constitue un ensemble de feuilles de calcul ?",
    options: ["Le logiciel", "La cellule", "Le classeur", "Le répertoire"],
    answer: "Le classeur",
    rationale: "Le cours précise que le classeur est l'ensemble regroupant les différentes feuilles de calcul."
  },
  {
    id: 3,
    question: "Quelle est la principale fonction du 'filtre automatique' selon le cours ?",
    options: [
      "Changer l'ordre alphabétique des lignes", 
      "Masquer définitivement les mauvaises données", 
      "Visualiser uniquement les lignes répondant à des critères particuliers", 
      "Calculer automatiquement la moyenne d'une colonne"
    ],
    answer: "Visualiser uniquement les lignes répondant à des critères particuliers",
    rationale: "Le filtre automatique ne modifie pas l'ordre et ne supprime rien : il sélectionne visuellement les lignes qui correspondent à vos critères."
  },
  {
    id: 4,
    question: "Parmi les propositions suivantes, laquelle décrit un 'adressage mixte' ?",
    options: [
      "Les adresses de type $A$1", 
      "Les adresses de type A1", 
      "Les adresses de type $A1 ou A$1", 
      "Le remplacement d'une plage par un nom propre"
    ],
    answer: "Les adresses de type $A1 ou A$1",
    rationale: "L'adressage est dit 'mixte' car un seul des deux éléments (soit la ligne, soit la colonne) est verrouillé par le symbole $."
  },
  {
    id: 5,
    question: "Qu'est-ce que le 'tri des données' permet d'arranger ?",
    options: [
      "Les formules de calcul", 
      "Les lignes d'une feuille de calcul selon un ordre alphabétique ou numérique", 
      "La taille des colonnes automatiquement", 
      "Les messages d'erreur de validation"
    ],
    answer: "Les lignes d'une feuille de calcul selon un ordre alphabétique ou numérique",
    rationale: "Le tri réorganise l'ordre d'affichage des lignes en se basant sur un ordre logique (croissant, décroissant, alphabétique...)."
  },
  {
    id: 6,
    question: "En plus de gérer les tableaux de données, que permet de faire un tableur d'après l'introduction de votre cours ?",
    options: [
      "Créer des pages web animées", 
      "Effectuer des calculs automatisés, gérer des bases de données simples et faire des graphiques", 
      "Modifier des fichiers audio et vidéo", 
      "Remplacer le système d'exploitation de l'ordinateur"
    ],
    answer: "Effectuer des calculs automatisés, gérer des bases de données simples et faire des graphiques",
    rationale: "Le cours spécifie que le tableur apporte tout genre de calcul automatisé, gère des bases de données simples et permet des représentations graphiques."
  },
  {
    id: 7,
    question: "Que possède obligatoirement chaque cellule dans Excel d'après vos notes ?",
    options: [
      "Un mot de passe et un graphique", 
      "Une couleur verte et une formule", 
      "Une adresse et une valeur", 
      "Une ligne infinie"
    ],
    answer: "Une adresse et une valeur",
    rationale: "Le cours indique textuellement : 'la cellule : est l'intersection d'une ligne et d'une colonne, elle a une adresse et une valeur'."
  },
  {
    id: 8,
    question: "Que se passe-t-il si les données entrées par un utilisateur ne sont pas validées par la 'validation des données' ?",
    options: [
      "Excel ferme le document automatiquement", 
      "L'application affiche un message d'erreur et refuse l'entrée", 
      "La cellule s'efface et la ligne est triée", 
      "La donnée est convertie en texte automatiquement"
    ],
    answer: "L'application affiche un message d'erreur et refuse l'entrée",
    rationale: "La validation des données permet de s'assurer de la validité des entrées, d'afficher un message d'erreur et de bloquer la saisie incorrecte."
  },
  {
    id: 9,
    question: "Comment se présente la structure d'une 'feuille de calcul' ?",
    options: [
      "C'est un ensemble fini de lignes et de colonnes", 
      "C'est une page de texte libre sans lignes", 
      "C'est un alignement de graphiques uniquement", 
      "C'est un dossier contenant plusieurs classeurs"
    ],
    answer: "C'est un ensemble fini de lignes et de colonnes",
    rationale: "Une feuille de calcul est structurellement composée d'un nombre défini (fini) de lignes et de colonnes qui forment un quadrillage."
  },
  {
    id: 10,
    question: "Si vous copiez une formule contenant un adressage relatif, que fait sa valeur d'une position à une autre ?",
    options: [
      "Elle reste strictement identique", 
      "Elle change de position/valeur lors du calcul", 
      "Elle affiche une erreur $A$1", 
      "Elle se transforme en filtre automatique"
    ],
    answer: "Elle change de position/valeur lors du calcul",
    rationale: "C'est la définition même du relatif : l'adresse s'adapte et change selon la position où la formule est déplacée ou copiée."
  }
];