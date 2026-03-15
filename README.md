# ActuaireX — Guide complet d'utilisation

=================================================================
  TON DOSSIER COMPLET — NE RIEN SUPPRIMER
=================================================================

actuairex/
├── index.html              ← LE SITE (ne jamais modifier)
├── netlify.toml            ← Sécurité + redirections (ne pas modifier)
├── sitemap.xml             ← Plan du site pour Google (ne pas modifier)
├── robots.txt              ← Instructions pour Google (ne pas modifier)
├── logo.svg                ← Logo horizontal ActuaireX
├── logo-carre.svg          ← Logo carré (TikTok, LinkedIn)
├── favicon.svg             ← Icône onglet navigateur
├── README.md               ← Ce guide
│
├── data/                   ← ⭐ TU TRAVAILLES UNIQUEMENT ICI
│   ├── config.json         ← Infos du site, réseaux sociaux, À propos
│   ├── articles.json       ← Tes articles
│   ├── videos.json         ← Tes vidéos TikTok / YouTube
│   ├── projets.json        ← Tes projets actuariels
│   ├── glossaire.json      ← Définitions actuarielles
│   ├── ressources.json     ← Boutique : fichiers à vendre
│   └── devenir-actuaire.json ← Page orientation
│
├── fichiers/               ← Tes fichiers à afficher/vendre
│   ├── pdf/                ← PDFs lisibles gratuitement sur le site
│   ├── previews/           ← Images d'aperçu Excel/R/Python
│   └── apercu/             ← (optionnel) PDFs partiels
│
└── templates/              ← Tes templates de documents
    ├── template-actuairex.docx
    ├── template-actuairex.xlsx
    ├── template-actuairex.R
    ├── template-actuairex.py
    ├── template-youtube-actuairex.pptx
    └── template-tiktok-actuairex.pptx

=================================================================
  RÈGLE D'OR
=================================================================
Tu ne touches QU'AUX FICHIERS dans le dossier data/
et au dossier fichiers/ pour ajouter tes documents.
Tout le reste ne se touche pas.

=================================================================
  AVANT DE DÉPLOYER — 3 CODES À REMPLACER
=================================================================
Ouvre index.html avec un éditeur de texte (Notepad, TextEdit)
et fais Ctrl+H (chercher/remplacer) pour chaque code :

  1. G-XXXXXXXXXX     → ton ID Google Analytics
     (tu l'obtiens sur analytics.google.com)
     Remplace les 2 occurrences

  2. actuairex.disqus.com → TON-NOM.disqus.com
     (tu l'obtiens sur disqus.com)

  3. formspree.io/f/XXXXXXXX → formspree.io/f/TON-ID
     (tu l'obtiens sur formspree.io)

Si tu ne veux pas encore ces fonctionnalités, laisse comme ça
et active-les plus tard.

=================================================================
  COMMENT METTRE À JOUR LE SITE
=================================================================

ÉTAPE 1 — Modifie le fichier JSON dans data/
ÉTAPE 2 — Va sur app.netlify.com
ÉTAPE 3 — Ton site → onglet "Deploys"
ÉTAPE 4 — Glisse à nouveau le dossier actuairex entier
ÉTAPE 5 — Mis à jour en 15-20 secondes ✓

=================================================================
  AJOUTER UN ARTICLE
=================================================================
Ouvre data/articles.json et ajoute ce bloc AVANT le dernier ] :

  ,
  {
    "id": 5,
    "titre": "Titre de ton article",
    "categorie": "Bases de l'assurance",
    "tag": "Débutant",
    "date": "2025-04-01",
    "resume": "Résumé court affiché dans la liste.",
    "contenu": "Premier paragraphe.\n\nDeuxième paragraphe.\n\nConclusion.",
    "lecture": "5 min"
  }

⚠️ L'id doit être unique (toujours plus grand que le précédent)
⚠️ \n\n entre les paragraphes = saut de ligne

=================================================================
  AJOUTER UNE VIDÉO
=================================================================
Ouvre data/videos.json et ajoute :

  ,
  {
    "id": 5,
    "titre": "Titre de ta vidéo",
    "plateforme": "TikTok",
    "url": "https://tiktok.com/@actuairex/video/IDVIDEO",
    "date": "2025-04-01",
    "duree": "60s",
    "description": "Description courte."
  }

=================================================================
  AJOUTER UN DOCUMENT PAYANT (Excel, R, Python, PDF)
=================================================================
1. Pour Excel/R/Python :
   - Fais une capture d'écran de ton fichier
   - Ajoute le filigrane "ActuaireX © — Aperçu uniquement" sur Canva
   - Sauvegarde en .png dans fichiers/previews/

2. Pour PDF lisible gratuitement :
   - Mets le PDF dans fichiers/pdf/

3. Upload le fichier complet (avec filigrane) sur selar.co
   - Récupère le lien de vente Selar

4. Ouvre data/ressources.json et ajoute :

  ,
  {
    "id": 7,
    "titre": "Nom du fichier",
    "type": "Outil Excel",
    "auteur": "ActuaireX",
    "niveau": "Intermédiaire",
    "langue": "Français",
    "description": "Description du fichier.",
    "preview": "fichiers/previews/mon-fichier.png",
    "lien_lecture": "",
    "lien_achat": "https://selar.co/actuairex/mon-fichier",
    "prix": "2 000 XOF",
    "gratuit": false,
    "type_fichier": "Excel"
  }

=================================================================
  MODIFIER TES INFOS PERSONNELLES
=================================================================
Ouvre data/config.json et modifie :
- "linkedin" : ton vrai lien LinkedIn
- "tiktok" : ton vrai lien TikTok
- "email" : ton email de contact
- Les paragraphes de la page "À propos"

=================================================================
  UTILISER LES TEMPLATES
=================================================================
Pour chaque nouveau document :
1. Copie le template correspondant (Word, Excel, R, Python, PPT)
2. Renomme-le avec le nom de ton document
3. Remplace les [crochets] par ton vrai contenu
4. La structure, le style et la protection restent identiques

