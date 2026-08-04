# Palette violette (remap bleu → violet) + carrousel Business Case

Date : 2026-08-04

## Contexte

Le portfolio utilise actuellement une palette bleu/cyan sombre (tokens CSS dans `src/styles/style.css`). L'objectif est de la réaligner sur la palette violette du CV (`CV_alex_cattelin_Epitech.pdf`), et de refondre la section Business Case (passée à 4 cases) en carrousel horizontal avec navigation par flèches.

## 1. Remap des couleurs

Tous les usages de couleur passent par des variables CSS dans `:root` (`src/styles/style.css`), aucune couleur en dur dans les composants (vérifié par grep). Le remap se fait donc uniquement dans ce bloc `:root`.

Nouveaux tokens ajoutés (palette fournie par l'utilisateur) :

```css
--deep:      #2a2040;
--indigo:    #3b3b58;
--violet:    #7a5980;
--purple:    #a96da3;
--purple-mid:#8a60a0;
--purple-light: #e8dff0;
--purple-xlight: #f4f0f8;
--border-violet: #d8cce8;
--muted-violet: #8a7898;
```

Réassignation des tokens existants (thème sombre conservé — seuls les champs bleus changent) :

| Token existant | Ancienne valeur | Nouvelle valeur | Usage impacté |
|---|---|---|---|
| `--bg-navy` | `#101d42` | `var(--deep)` | fond de la vague de dégradé du `body` |
| `--surface` | `#101d42` | `var(--deep)` | fond des cards (`.business-visual`, `.project-visual`, `.toast`) |
| `--accent` | `#232ed1` | `var(--purple-mid)` | liens actifs sidebar, section-number, curseur clignotant, hover boutons/liens |
| `--accent-2` | `#6564db` | `var(--purple)` | stat-value, project-status, accents 2/3 des grilles skills/tools |
| `--accent-3` | `#89d2dc` | `var(--purple-light)` | gradient hero/logo, bouton primaire, glow, base des bordures translucides |
| `--text-muted` | `#8f96b3` | `var(--muted-violet)` | textes secondaires |
| `--border` | `rgba(137, 210, 220, 0.16)` | `rgba(216, 204, 232, 0.16)` (rgb de `--border-violet`) | bordures de cards/sections |

Inchangés (pas des champs bleus) : `--bg` (`#000000`), `--bg-darkest` (`#0d1317`), `--text` (`#f2f2ef`). Le thème reste sombre ; on n'adopte pas le `--text: #1e1830` du CV (pensé pour un thème clair).

`--indigo` et `--purple-xlight` sont déclarés comme tokens disponibles mais non forcés sur un usage existant (pas d'équivalent bleu direct).

## 2. Carrousel Business Case

### Données

Extraction des 4 business cases (actuellement 4 blocs JSX dupliqués dans `BusinessCase.jsx`) vers `src/data/businessCases.js`, même pattern que `src/data/projects.js` : un tableau d'objets `{ id, image, title, description, links: [{ url, label, variant }] }`.

### Composant

`BusinessCase.jsx` est réécrit :

- État `index` (`useState(0)`) pour le slide actif.
- Conteneur `.business-carousel` avec `overflow: hidden`, contenant une track `.business-carousel-track` (flex, `width: 100% * n`, chaque slide `flex: 0 0 100%`), translatée via `transform: translateX(calc(index * -100%))` avec `transition: transform 0.4s ease`.
- Chaque slide reprend le markup actuel de `.business-card` (visuel + titre + description + boutons), inchangé visuellement à part la palette.
- Boutons flèche précédent/suivant (`.carousel-arrow`) de part et d'autre du carrousel :
  - `disabled` (et style atténué) quand `index === 0` (flèche précédente) ou `index === length - 1` (flèche suivante) — **pas de boucle**, comportement confirmé avec l'utilisateur.
  - `aria-label` explicites ("Business case précédent" / "Business case suivant") pour l'accessibilité.
- Dots de position (`.carousel-dots`) sous le carrousel : un bouton rond par slide, cliquable pour naviguer directement, le dot actif stylé avec `--purple-mid` (confirmé avec l'utilisateur, alternative aux flèches seules).
- Animation `reveal` au scroll : un seul `ref`/`visible` (via `useReveal`) posé sur le conteneur `.business-carousel` global, corrigeant le bug actuel où le même ref/state est réutilisé sur 4 `<article>` distincts (ce qui ne pose pas de problème visible aujourd'hui car `IntersectionObserver` ne s'attache qu'au dernier `ref.current` assigné, mais est sémantiquement incorrect avec 4 refs identiques).

### CSS (`src/styles/style.css`)

Nouvelles classes dans le bloc `/* ===== BUSINESS CASE ===== */` :
- `.business-carousel` : `position: relative; overflow: hidden;`
- `.business-carousel-track` : `display: flex; transition: transform 0.4s ease;`
- `.business-carousel-slide` : `flex: 0 0 100%; min-width: 0;` — englobe le `.business-card` existant.
- `.carousel-nav` : conteneur flex placé sous le carrousel (sous `.business-carousel`, au-dessus des dots), avec la flèche précédente à gauche et la flèche suivante à droite.
- `.carousel-arrow` : bouton rond/carré style cohérent avec `.btn-outline` (bordure `--border`, hover `--purple-mid`), `:disabled` → opacité réduite + `cursor: not-allowed`, pas de hover.
- `.carousel-dots`, `.carousel-dot`, `.carousel-dot.is-active` (fond `--purple-mid` vs bordure `--border` inactif).

### Responsive (`@media (max-width: 768px)`)

- `.business-card` garde son passage actuel en 1 colonne (`grid-template-columns: 1fr`).
- Flèches et dots réduits (taille, espacement) mais présents ; pas de comportement différent (chaque slide = 100% de la largeur du conteneur, donc déjà adapté).

## Hors périmètre

- Pas de swipe tactile ni de navigation clavier (flèches directionnelles) — non demandé, ajoutable plus tard si besoin.
- Pas de librairie de carrousel externe (Swiper, Embla, etc.) — implémentation CSS/React native, cohérente avec le reste du projet qui n'a aucune dépendance de ce type.
- Pas d'autoplay.
