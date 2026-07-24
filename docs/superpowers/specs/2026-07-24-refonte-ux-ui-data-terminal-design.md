# Refonte UX/UI — Portfolio "Data Terminal"

**Date** : 2026-07-24
**Statut** : Approuvé, en attente de plan d'implémentation

## Contexte et objectif

Le portfolio actuel (React + Vite, un seul composant `App.jsx` de ~550 lignes)
utilise une identité visuelle sombre dégradé violet/cyan avec glow, glassmorphism
et animations `framer-motion` systématiques sur presque chaque élément. Ce
style est très reconnaissable comme "généré par IA" / template générique et ne
démarque pas le profil du candidat (Data Analyst en reconversion, visant
Data Engineering / Data Science).

Objectif : refondre le style **et** la structure de la page pour une identité
plus personnelle, sobre et cohérente avec le métier visé, sans changer le
contenu (projets, textes, liens, assets existants dans `public/`).

## Direction retenue : "Data Terminal / Dashboard"

Esthétique technique et sobre inspirée des dashboards data / terminaux, sans
tomber dans le pastiche "hacker". Un seul accent couleur (ambre), typographie
mono utilisée comme signature pour les métadonnées (index, tags, statuts),
grille et bordures fines plutôt que glow/gradient.

### Tokens visuels

| Rôle | Valeur |
|---|---|
| Fond | `#0a0a0a` |
| Surface / cartes | `#111110`, bordure `#232320` |
| Texte principal | `#f2f2ef` |
| Texte muted | `#8a8a82` |
| Accent unique | ambre `#d4a24b` |
| Grille de fond (sections) | lignes `1px` `rgba(255,255,255,.06)` |

### Typographie

- Display (nom, titres) : **Sora**
- Corps de texte : **Inter** (conservé)
- Metadata / labels / tags / index / statuts : **JetBrains Mono**
- Les deux nouvelles familles sont ajoutées via le lien Google Fonts déjà
  présent dans `index.html`.

### Suppressions explicites du style actuel

- Plus de `background-clip: text` gradient sur le nom / logo
- Plus de `box-shadow` néon sur les boutons ni sur les cartes au survol
- Plus de `backdrop-filter: blur` générique sur une nav top-bar (la nav
  top-bar disparaît, remplacée par la sidebar)
- Plus d'alternance de couleur violet/cyan sur les cartes projets/outils

## Layout

- **Desktop (≥1024px)** : sidebar fixe ~260px (`position: fixed`, non
  scrollable) à gauche : initiales/logo, nav verticale numérotée
  (`01 About`, `02 Projets`, …) avec indicateur actif façon curseur (`>`)
  devant l'item courant, liens mail/LinkedIn en pied de sidebar. Contenu
  principal avec `margin-left` égal à la largeur de la sidebar.
- **Tablette (768–1024px)** : sidebar réduite (libellés courts ou icônes).
- **Mobile (<768px)** : sidebar transformée en barre horizontale sticky en
  haut de page, items scrollables horizontalement (`overflow-x: auto`) —
  correction du comportement actuel qui masque purement la nav sur mobile.
- Le scroll-spy existant (`IntersectionObserver` sur les ids de section) est
  conservé tel quel, déplacé dans `App.jsx`, et pilote l'état actif affiché
  dans la `Sidebar`.

## Découpage en composants

Le fichier unique `App.jsx` est éclaté en composants dédiés (l'ampleur de la
réécriture visuelle rend ce découpage naturel et améliore la maintenabilité) :

```
src/
  main.jsx
  App.jsx                 (assemble les sections + scroll-spy)
  data/
    projects.js            (liste des projets, extraite du JSX en dur)
  components/
    Sidebar.jsx
    Hero.jsx
    About.jsx
    ProjectsLog.jsx
    ProjectRow.jsx
    BusinessCase.jsx
    Skills.jsx
    Tools.jsx
    Contact.jsx
    Footer.jsx
  styles/
    style.css               (remplace l'actuel src/style.css)
```

`src/index.css` (fichier orphelin du template Vite par défaut, jamais
importé) est supprimé au passage.

## Détail des sections

### Hero (`Hero.jsx`)

- Nom en Sora, texte plein (pas de gradient), poids fort
- Sous-titre inchangé (texte existant)
- Bloc stats : à droite du texte en desktop, en dessous en mobile — chiffres
  en JetBrains Mono grande taille façon "readout" :
  - `05` — projets livrés
  - `02` — business cases
  - `2024` — début reconversion data
- Boutons CTA rectangulaires, bordure fine, changement de fond au survol
  (pas de `box-shadow` glow)
- Signature d'animation unique : curseur clignotant (`_`) après le
  sous-titre, en CSS pur (`@keyframes`)

### About (`About.jsx`)

Reprend le texte existant, section reskinnée (titre avec numéro mono `01 /`
au lieu de la barre violette à gauche).

### Projets (`ProjectsLog.jsx` + `ProjectRow.jsx`)

Remplace l'effet "sticky cards" empilées au scroll par une liste compacte
façon log terminal, un item par projet :

```
01  ORACLE_LOYERS        [React][Leaflet][XGBoost]     DEPLOYÉ   v
02  API_PIPELINE_VIZ      [OAuth][GH Actions]           DEPLOYÉ   >
03  SCRAPER_DISCORD       [Playwright][Asyncio]         DEPLOYÉ   >
04  MOVIE_RECOMMENDER      [Streamlit][ML]              DEPLOYÉ   >
05  KPI_TOYS_MODELS        [Power BI][SQL]               DEPLOYÉ   >
```

- Nom de projet en majuscules/underscore ("constante"), en Sora avec
  letter-spacing élargi (lisibilité meilleure qu'en mono à cette taille)
- Tags de stack en JetBrains Mono, pastille à bordure fine (pas de fond
  coloré plein)
- Accordéon inline au clic (un seul projet ouvert à la fois) : révèle
  visuel + description complète + lien (repo/demo), transition CSS native
  (`grid-template-rows: 0fr → 1fr`), pas de dépendance JS d'animation
- Accessibilité : chaque ligne est un `<button>` natif avec
  `aria-expanded`, navigable au clavier

Les données des 5 projets (titre, tags, description, image, lien, statut)
sont extraites dans `src/data/projects.js` et mappées en JSX dans
`ProjectsLog.jsx`.

### Business Case (`BusinessCase.jsx`)

Contenu identique (analyse jeu vidéo, liens PDF Power BI + PPT), reskinné
dans la même charte (titre numéroté, bordures fines, accent ambre au survol
au lieu du glow).

### Skills (`Skills.jsx`) et Tools (`Tools.jsx`)

Contenu identique, cartes/tags passent en bordures fines + accent ambre au
survol, suppression de l'alternance violet/cyan par carte.

### Contact (`Contact.jsx`) et Footer (`Footer.jsx`)

Contact simplifié en liste façon "carte d'identité" (mail, LinkedIn, CV) en
JetBrains Mono avec petites icônes, au lieu des 3 gros boutons colorés
actuels. Footer inchangé dans le fond, reskinné dans la charte.

## Animation

Approche minimale et fonctionnelle (validé) :

- Accordéon projets : transition CSS
- Curseur clignotant dans le hero : CSS pur
- Survol (nav, cartes, boutons) : changement de couleur/bordure uniquement,
  pas de scale ni de shadow
- Aucune animation d'apparition systématique au scroll (suppression de tous
  les `whileInView`/`fadeUp`/`staggerContainer` actuels)

**`framer-motion` est retiré des dépendances** (`package.json`) : plus
aucun usage ne le justifie avec ce niveau de motion.

## Contenu — non modifié

Aucun changement de texte, de projets, de liens ou d'assets. Tous les
fichiers de `public/` (images, CV, PDF) restent utilisés tels quels.

## Accessibilité

- Contraste `#f2f2ef` sur `#0a0a0a` : largement conforme AA
- Nav sidebar : `aria-current="page"` sur le lien de section actif
- Accordéon projets : `<button>` + `aria-expanded`, focus visible

## Vérification

Pas de suite de tests automatisés dans ce projet (site vitrine statique).
Vérification par :

- `npm run dev` — contrôle visuel desktop + mobile (redimensionnement /
  devtools), test du scroll-spy, de l'accordéon projets et du curseur
  clignotant
- `npm run lint` — aucune erreur ESLint
- `npm run build` — build de production sans erreur

## Hors périmètre

- Pas de mode clair/sombre togglable (sombre uniquement, décision validée)
- Pas de changement de contenu ou d'ajout de nouveaux projets
- Pas de refonte du déploiement (`gh-pages` inchangé)
