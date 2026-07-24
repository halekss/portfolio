# Refonte UX/UI "Data Terminal" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer l'identité visuelle "cyberpunk violet/cyan" du portfolio par une identité sobre "Data Terminal" (encre + ambre, typographie Sora/Inter/JetBrains Mono), passer d'une nav top-bar à une sidebar fixe, remplacer les cartes projets "sticky stack" par une liste log accordéon, et retirer `framer-motion` — sans changer le contenu.

**Architecture:** `App.jsx` monolithique (~550 lignes) éclaté en composants dédiés sous `src/components/`, données extraites sous `src/data/`, nouvelle feuille de style sous `src/styles/style.css`. Le scroll-spy existant (`IntersectionObserver`) est conservé et déplacé dans `App.jsx`, piloté par la liste de navigation partagée `src/data/navigation.js`.

**Tech Stack:** React 19, Vite 7, CSS custom properties (pas de framework CSS), ESLint (flat config, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`). `framer-motion` est retiré.

## Global Constraints

- Palette : fond `#0a0a0a`, surface `#111110`, bordure `#232320`, texte `#f2f2ef`, texte muted `#8a8a82`, accent unique ambre `#d4a24b`. Pas de dégradé, pas de `box-shadow` glow.
- Typographie : display `Sora`, corps `Inter` (conservé), metadata/tags/index/statuts en `JetBrains Mono`. Chargées via Google Fonts dans `index.html`.
- Layout : sidebar fixe `260px` sur desktop (`≥769px`), transformée en barre horizontale sticky en dessous de `768px`.
- Aucun changement de contenu (textes, projets, liens, assets `public/`) ni du `base: '/portfolio/'` de `vite.config.js`. Les chemins d'images restent relatifs sans slash de tête (ex. `'images/xxx.png'`), cohérent avec ce `base`.
- `framer-motion` retiré de `package.json` ; plus aucune animation d'apparition au scroll — seules exceptions : transition CSS de l'accordéon projets et curseur clignotant CSS dans le hero.
- Ce projet n'a pas de suite de tests automatisés. Chaque tâche est vérifiée par `npx eslint <fichier(s)>` (doit passer sans sortie) et, pour la tâche finale, par `npm run lint`, `npm run build` et une vérification manuelle via `npm run dev`.
- Les tâches sont ordonnées pour que le build reste fonctionnel après chaque commit : les nouveaux fichiers sont créés avant d'être branchés dans `App.jsx`, qui est réécrit en une seule tâche (Tâche 8).

---

### Task 1: Couche de données et polices

**Files:**
- Create: `src/data/projects.js`
- Create: `src/data/navigation.js`
- Modify: `index.html:8`

**Interfaces:**
- Produces (utilisé par les tâches 5 et 8) : `src/data/projects.js` exporte par défaut un tableau d'objets `{ id, number, name, tags: string[], status, title, description, image, link: { label, url } }`.
- Produces (utilisé par les tâches 3 et 8) : `src/data/navigation.js` exporte par défaut un tableau d'objets `{ id, number, label }`.

- [ ] **Step 1: Créer `src/data/projects.js`**

```js
const projects = [
  {
    id: 'oracle-loyers',
    number: '01',
    name: 'ORACLE_LOYERS',
    tags: ['React', 'Leaflet', 'Web Scraping', 'Chatbot IA', 'XGBoost'],
    status: 'DEPLOYÉ',
    title: 'Oracle des Loyers',
    description:
      "Récupération et affichage sur map React d'annonces immobilières & établissements commerciaux / publics avec intégration chatbot cynique pour comparer les prix entre les quartiers de Lyon.",
    image: 'images/view_website_oracle.png',
    link: { label: 'Voir le dépôt Github', url: 'https://github.com/halekss/oracle_loyers.git' },
  },
  {
    id: 'api-pipeline-viz',
    number: '02',
    name: 'API_PIPELINE_VIZ',
    tags: ['OAuth', 'Github Actions', 'HTML/CSS'],
    status: 'DEPLOYÉ',
    title: 'Pipeline et Viz de données API',
    description:
      "Projet Data end-to-end : collecte automatisée de données via une API REST authentifiée, traitement et structuration en CSV, puis restitution dans un dashboard web interactif mis à jour quotidiennement.",
    image: 'images/main_screen_dashboard_wow.png',
    link: { label: 'Voir le dashboard', url: 'https://halekss.github.io/data_classification_API_blizzard/' },
  },
  {
    id: 'scraper-discord',
    number: '03',
    name: 'SCRAPER_DISCORD',
    tags: ['Playwright', 'Asyncio', 'Github Actions', 'Webhook Discord'],
    status: 'DEPLOYÉ',
    title: 'Scraper automate avec alerte Discord',
    description:
      'Un script Python automatisé et asynchrone pour suivre les meilleurs builds de talents "Gouffres" (Delves) pour toutes les spécialisations de World of Warcraft depuis Wowhead, avec notifications Discord en temps réel.',
    image: 'images/logo_wowhead.png',
    link: { label: 'Voir le Github', url: 'https://github.com/halekss/webhook_discord_wowhead.git' },
  },
  {
    id: 'movie-recommender',
    number: '04',
    name: 'MOVIE_RECOMMENDER',
    tags: ['Streamlit', 'Machine Learning'],
    status: 'DEPLOYÉ',
    title: 'Modèle de recommandation de films',
    description:
      "Exploration et nettoyage d'un jeu de données pour entrainement d'un modèle de Machine Learning, utilisable directement sur une application Streamlit.",
    image: 'images/senechal_movie.png',
    link: { label: 'Voir le site', url: 'https://senechalmovieapp-cvl6oryohmkmr7rzmgngg9.streamlit.app/' },
  },
  {
    id: 'kpi-toys-models',
    number: '05',
    name: 'KPI_TOYS_MODELS',
    tags: ['Power BI', 'SQL'],
    status: 'DEPLOYÉ',
    title: 'Dashboard KPI Financiers : Toys & Models',
    description:
      "Création de requêtes SQL complexes pour extraire les indicateurs clés et visualisation interactive sur Power BI.",
    image: 'images/pict_toys_and_models.png',
    link: { label: 'Voir le Dashboard', url: 'toys_and_models.pdf' },
  },
]

export default projects
```

- [ ] **Step 2: Créer `src/data/navigation.js`**

```js
const navigation = [
  { id: 'home', number: '01', label: 'Home' },
  { id: 'about', number: '02', label: 'About' },
  { id: 'projects', number: '03', label: 'Projets' },
  { id: 'skills', number: '04', label: 'Compétences' },
  { id: 'tools', number: '05', label: 'Outils' },
  { id: 'contact', number: '06', label: 'Contact' },
]

export default navigation
```

- [ ] **Step 3: Ajouter les polices Sora et JetBrains Mono dans `index.html`**

Dans `index.html:8`, remplacer :

```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
```

par :

```html
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

- [ ] **Step 4: Vérifier avec ESLint**

Run: `npx eslint src/data/projects.js src/data/navigation.js`
Expected: aucune sortie (0 erreur, 0 warning)

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.js src/data/navigation.js index.html
git commit -m "feat: extraire les données projets/navigation et ajouter les polices Data Terminal"
```

---

### Task 2: Feuille de style "Data Terminal"

**Files:**
- Create: `src/styles/style.css`

**Interfaces:**
- Produces (utilisé par la tâche 8) : classes CSS `app-shell`, `content`, `section`, `section-title`, `section-number`, `sidebar`, `sidebar-logo`, `sidebar-nav`, `nav-number`, `sidebar-footer`, `sidebar-link`, `hero`, `hero-text`, `hero-role`, `subtitle`, `cursor`, `btn-group`, `btn`, `btn-primary`, `btn-outline`, `hero-stats`, `stat-value`, `stat-label`, `about-text`, `projects-log`, `project-row`, `project-row-header`, `project-number`, `project-name`, `project-tags`, `project-tag`, `project-status`, `project-toggle`, `project-row-body`, `project-row-body-inner`, `project-visual`, `project-details`, `card-title`, `card-desc`, `business-card`, `business-visual`, `business-content`, `skills-grid`, `skill-card`, `skill-title`, `skill-tags`, `skill-tag`, `tools-grid`, `tool-category`, `tool-category-icon`, `tool-category-title`, `tool-category-desc`, `tool-list`, `tool-item`, `tool-item-icon`, `tool-item-name`, `tool-item-desc`, `contact-card`, `contact-text`, `contact-list`, `contact-label`, `footer`.

- [ ] **Step 1: Créer `src/styles/style.css`**

```css
/* ===== TOKENS ===== */
:root {
  --bg: #0a0a0a;
  --surface: #111110;
  --border: #232320;
  --text: #f2f2ef;
  --text-muted: #8a8a82;
  --accent: #d4a24b;
  --sidebar-w: 260px;

  --font-display: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 40px;
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  line-height: 1.6;
}

a { text-decoration: none; color: inherit; transition: color 0.2s, border-color 0.2s; }
ul { list-style: none; margin: 0; padding: 0; }
h1, h2, h3 { font-family: var(--font-display); margin: 0; }
p { margin: 0; }

/* ===== LAYOUT ===== */
.app-shell {
  display: flex;
  min-height: 100vh;
}

.content {
  margin-left: var(--sidebar-w);
  flex: 1;
  max-width: 900px;
  padding: 0 60px;
}

.section { padding: 70px 0; border-bottom: 1px solid var(--border); }
.section:last-of-type { border-bottom: none; }

.section-title {
  font-size: 1.8rem;
  margin-bottom: 40px;
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.section-number {
  font-family: var(--font-mono);
  font-size: 1rem;
  color: var(--accent);
}

/* ===== SIDEBAR ===== */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-w);
  height: 100vh;
  border-right: 1px solid var(--border);
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
}

.sidebar-logo {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 40px;
}

.sidebar-nav { display: flex; flex-direction: column; gap: 18px; }

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.sidebar-nav a:hover { color: var(--text); }

.sidebar-nav a.active { color: var(--accent); }

.nav-number { font-family: var(--font-mono); font-size: 0.8rem; }

.sidebar-footer { display: flex; flex-direction: column; gap: 10px; }

.sidebar-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}

.sidebar-link:hover { color: var(--accent); }

/* ===== HERO ===== */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  flex-wrap: wrap;
  padding-top: 60px;
}

.hero-text { max-width: 560px; }

.hero-text h1 { font-size: 3rem; line-height: 1.15; margin-bottom: 20px; }

.hero-role { color: var(--accent); }

.subtitle {
  font-family: var(--font-body);
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 30px;
  display: block;
}

.cursor {
  display: inline-block;
  color: var(--accent);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink { 50% { opacity: 0; } }

.btn-group { display: flex; gap: 15px; flex-wrap: wrap; }

.btn {
  padding: 12px 26px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid transparent;
  display: inline-block;
}

.btn-primary { background: var(--accent); color: #0a0a0a; }
.btn-primary:hover { background: #e3b666; }

.btn-outline { border-color: var(--border); color: var(--text); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-mono);
  border-left: 1px solid var(--border);
  padding-left: 30px;
}

.stat-value { display: block; font-size: 2rem; color: var(--accent); }
.stat-label { color: var(--text-muted); font-size: 0.8rem; }

/* ===== ABOUT ===== */
.about-text { color: var(--text-muted); font-size: 1.05rem; max-width: 760px; }

/* ===== PROJECTS LOG ===== */
.projects-log { display: flex; flex-direction: column; }

.project-row { border-bottom: 1px solid var(--border); }

.project-row-header {
  width: 100%;
  display: grid;
  grid-template-columns: 40px 1fr auto 90px 24px;
  align-items: center;
  gap: 16px;
  padding: 18px 0;
  background: none;
  border: none;
  color: var(--text);
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.project-row-header:hover { color: var(--accent); }

.project-number { font-family: var(--font-mono); color: var(--text-muted); }

.project-name {
  font-family: var(--font-display);
  letter-spacing: 0.5px;
  font-weight: 600;
}

.project-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.project-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  color: var(--text-muted);
}

.project-status {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  text-align: right;
}

.project-toggle { font-family: var(--font-mono); color: var(--text-muted); }

.project-row-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.project-row-body.is-open { grid-template-rows: 1fr; }

.project-row-body-inner {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding: 0 0 30px 56px;
}

.project-visual {
  min-height: 220px;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.project-details .card-title { margin-bottom: 12px; }
.project-details .card-desc { margin-bottom: 20px; }

.card-title { font-size: 1.3rem; color: var(--text); }
.card-desc { color: var(--text-muted); font-size: 0.95rem; }

/* ===== BUSINESS CASE ===== */
.business-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: center;
}

.business-visual {
  min-height: 240px;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.business-content .card-desc { margin: 16px 0 24px; }

/* ===== SKILLS ===== */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.skill-card {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 24px;
  transition: border-color 0.2s;
}

.skill-card:hover { border-color: var(--accent); }

.skill-title { font-size: 1rem; margin-bottom: 16px; }

.skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 5px 10px;
  color: var(--text-muted);
}

/* ===== TOOLS ===== */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.tool-category {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 28px;
  transition: border-color 0.2s;
}

.tool-category:hover { border-color: var(--accent); }

.tool-category-icon {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  margin-bottom: 20px;
}

.tool-category-title { font-size: 1.05rem; margin-bottom: 6px; }
.tool-category-desc { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 22px; }

.tool-list { display: flex; flex-direction: column; gap: 16px; }

.tool-item { display: flex; align-items: flex-start; gap: 14px; }

.tool-item-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 4px;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--accent);
}

.tool-item-name { font-size: 0.9rem; font-weight: 600; margin-bottom: 2px; }
.tool-item-desc { font-size: 0.8rem; color: var(--text-muted); }

/* ===== CONTACT ===== */
.contact-card {
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 40px;
}

.contact-text { color: var(--text-muted); margin-bottom: 30px; }

.contact-list { display: flex; flex-direction: column; gap: 14px; }

.contact-list li { display: flex; gap: 16px; align-items: center; }

.contact-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  width: 70px;
}

.contact-list a:hover { color: var(--accent); }

/* ===== FOOTER ===== */
.footer {
  padding: 40px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .app-shell { flex-direction: column; }

  .sidebar {
    position: sticky;
    top: 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 14px 20px;
    overflow-x: auto;
  }

  .sidebar-logo { margin-bottom: 0; margin-right: 24px; }

  .sidebar-nav { flex-direction: row; gap: 20px; white-space: nowrap; }

  .sidebar-footer { display: none; }

  .content { margin-left: 0; padding: 0 20px; }

  .hero { flex-direction: column; align-items: flex-start; min-height: auto; padding: 50px 0; }

  .hero-stats { flex-direction: row; flex-wrap: wrap; border-left: none; padding-left: 0; gap: 30px; }

  .project-row-header { grid-template-columns: 30px 1fr 20px; }

  .project-tags, .project-status { display: none; }

  .project-row-body-inner { grid-template-columns: 1fr; padding-left: 0; }

  .business-card { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Vérifier avec ESLint**

Run: `npx eslint src`
Expected: aucune sortie (le CSS n'est pas linté par ESLint ; cette commande confirme juste qu'aucun fichier JS existant n'est cassé)

- [ ] **Step 3: Commit**

```bash
git add src/styles/style.css
git commit -m "feat: nouvelle feuille de style Data Terminal (non branchée)"
```

---

### Task 3: Composant Sidebar

**Files:**
- Create: `src/components/Sidebar.jsx`

**Interfaces:**
- Consumes: `src/data/navigation.js` default export (tableau `{ id, number, label }`).
- Produces (utilisé par la tâche 8) : `Sidebar({ activeSection: string })` — composant par défaut, prop `activeSection` = id de la section active.

- [ ] **Step 1: Créer `src/components/Sidebar.jsx`**

```jsx
import navigation from '../data/navigation'

function Sidebar({ activeSection }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">AC</div>
        <nav>
          <ul className="sidebar-nav">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <a href="mailto:alex_2c@hotmail.fr" className="sidebar-link">mail</a>
        <a
          href="https://www.linkedin.com/in/alex-cattelin/"
          target="_blank"
          rel="noreferrer"
          className="sidebar-link"
        >
          linkedin
        </a>
      </div>
    </aside>
  )
}

export default Sidebar
```

- [ ] **Step 2: Vérifier avec ESLint**

Run: `npx eslint src/components/Sidebar.jsx`
Expected: aucune sortie

- [ ] **Step 3: Commit**

```bash
git add src/components/Sidebar.jsx
git commit -m "feat: composant Sidebar (non branché)"
```

---

### Task 4: Composants Hero et About

**Files:**
- Create: `src/components/Hero.jsx`
- Create: `src/components/About.jsx`

**Interfaces:**
- Produces (utilisés par la tâche 8) : `Hero()` et `About()`, composants par défaut sans props, chacun rend une `<section>`/`<header>` avec un `id` (`home`, `about`) requis par le scroll-spy.

- [ ] **Step 1: Créer `src/components/Hero.jsx`**

```jsx
const STATS = [
  { value: '05', label: 'projets livrés' },
  { value: '02', label: 'business cases' },
  { value: '2024', label: 'début reconversion data' },
]

function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-text">
        <h1>
          Alex Cattelin
          <br />
          <span className="hero-role">Data Analyst</span>
        </h1>
        <p className="subtitle">
          Convertir la donnée brute en information exploitable : c&apos;est ce qui me motive.
          Data Analyst junior, je cherche à enrichir mon expertise technique et explorer les
          passerelles vers le Data Engineering et la Data Science sur des projets concrets.
          <span className="cursor">_</span>
        </p>
        <div className="btn-group">
          <a href="#projects" className="btn btn-primary">Voir mes projets</a>
          <a href="#contact" className="btn btn-outline">Me contacter</a>
        </div>
      </div>
      <div className="hero-stats">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </header>
  )
}

export default Hero
```

- [ ] **Step 2: Créer `src/components/About.jsx`**

```jsx
function About() {
  return (
    <section id="about" className="section">
      <h2 className="section-title">
        <span className="section-number">02 /</span> About
      </h2>
      <p className="about-text">
        Actuellement en reconversion professionnelle vers les métiers de la data, je développe
        mes compétences en analyse de données, visualisation et machine learning. Je recherche
        une alternance en tant que <strong>Data Engineer</strong> ou <strong>Data Scientist</strong>{' '}
        pour approfondir mes connaissances et contribuer à des projets data ambitieux.
      </p>
    </section>
  )
}

export default About
```

- [ ] **Step 3: Vérifier avec ESLint**

Run: `npx eslint src/components/Hero.jsx src/components/About.jsx`
Expected: aucune sortie

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.jsx src/components/About.jsx
git commit -m "feat: composants Hero et About (non branchés)"
```

---

### Task 5: Liste de projets en accordéon

**Files:**
- Create: `src/components/ProjectRow.jsx`
- Create: `src/components/ProjectsLog.jsx`

**Interfaces:**
- Consumes: `src/data/projects.js` default export ; `ProjectRow` consomme un objet `project` unique de ce tableau.
- Produces (utilisé par la tâche 8) : `ProjectsLog()` — composant par défaut sans props, rend `<section id="projects">`.

- [ ] **Step 1: Créer `src/components/ProjectRow.jsx`**

```jsx
import { useState } from 'react'

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="project-row">
      <button
        type="button"
        className="project-row-header"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="project-number">{project.number}</span>
        <span className="project-name">{project.name}</span>
        <span className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>{tag}</span>
          ))}
        </span>
        <span className="project-status">{project.status}</span>
        <span className="project-toggle">{open ? 'v' : '>'}</span>
      </button>
      <div className={`project-row-body ${open ? 'is-open' : ''}`}>
        <div className="project-row-body-inner">
          <div
            className="project-visual"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
          <div className="project-details">
            <h3 className="card-title">{project.title}</h3>
            <p className="card-desc">{project.description}</p>
            <a
              href={project.link.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              {project.link.label} &rarr;
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ProjectRow
```

- [ ] **Step 2: Créer `src/components/ProjectsLog.jsx`**

```jsx
import projects from '../data/projects'
import ProjectRow from './ProjectRow'

function ProjectsLog() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">
        <span className="section-number">03 /</span> Projets
      </h2>
      <ul className="projects-log">
        {projects.map((project) => (
          <ProjectRow project={project} key={project.id} />
        ))}
      </ul>
    </section>
  )
}

export default ProjectsLog
```

- [ ] **Step 3: Vérifier avec ESLint**

Run: `npx eslint src/components/ProjectRow.jsx src/components/ProjectsLog.jsx`
Expected: aucune sortie

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectRow.jsx src/components/ProjectsLog.jsx
git commit -m "feat: liste de projets en accordéon terminal (non branchée)"
```

---

### Task 6: Composants BusinessCase, Skills et Tools

**Files:**
- Create: `src/components/BusinessCase.jsx`
- Create: `src/components/Skills.jsx`
- Create: `src/components/Tools.jsx`

**Interfaces:**
- Produces (utilisés par la tâche 8) : `BusinessCase()`, `Skills()`, `Tools()` — composants par défaut sans props, rendant respectivement `<section id="business-case">`, `<section id="skills">`, `<section id="tools">`.

- [ ] **Step 1: Créer `src/components/BusinessCase.jsx`**

```jsx
function BusinessCase() {
  return (
    <section id="business-case" className="section">
      <h2 className="section-title">Business Case</h2>
      <article className="business-card">
        <div
          className="business-visual"
          style={{ backgroundImage: "url('images/illus_jv.png')" }}
        />
        <div className="business-content">
          <h3 className="card-title">Consommation du jeu vidéo</h3>
          <p className="card-desc">
            Analyse approfondie des performances commerciales des jeux vidéos selon différents
            facteurs et recommandations stratégiques présentées au client en vue de créer un
            nouveau jeu.
          </p>
          <div className="btn-group">
            <a href="pbi_jeux_video.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              Rapport Power BI
            </a>
            <a href="PPT_bc_jeux_video.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              Support PPT
            </a>
          </div>
        </div>
      </article>
    </section>
  )
}

export default BusinessCase
```

- [ ] **Step 2: Créer `src/components/Skills.jsx`**

```jsx
const SKILL_GROUPS = [
  { title: 'Langages & Outils', tags: ['Python', 'SQL'] },
  { title: 'Data Analysis & Viz', tags: ['Pandas', 'NumPy', 'Power BI', 'Seaborn', 'Plotly'] },
  { title: 'Data Engineering & ML', tags: ['Scikit-learn', 'API & WebScraping', 'Docker', 'Airflow'] },
]

function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">
        <span className="section-number">04 /</span> Compétences
      </h2>
      <div className="skills-grid">
        {SKILL_GROUPS.map((group) => (
          <div className="skill-card" key={group.title}>
            <h3 className="skill-title">{group.title}</h3>
            <div className="skill-tags">
              {group.tags.map((tag) => (
                <span className="skill-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
```

- [ ] **Step 3: Créer `src/components/Tools.jsx`**

```jsx
function Tools() {
  return (
    <section id="tools" className="section">
      <h2 className="section-title">
        <span className="section-number">05 /</span> Outils
      </h2>
      <div className="tools-grid">
        <div className="tool-category">
          <div className="tool-category-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <h3 className="tool-category-title">Développement & Code</h3>
          <p className="tool-category-desc">Pour écrire, tester et versionner mes scripts</p>
          <div className="tool-list">
            <div className="tool-item">
              <div className="tool-item-icon">VS</div>
              <div>
                <div className="tool-item-name">VS Code</div>
                <div className="tool-item-desc">Éditeur de code principal</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">GH</div>
              <div>
                <div className="tool-item-name">GitHub</div>
                <div className="tool-item-desc">Versioning & déploiement</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">DK</div>
              <div>
                <div className="tool-item-name">Docker</div>
                <div className="tool-item-desc">Conteneurisation de mes environnements</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">JN</div>
              <div>
                <div className="tool-item-name">Jupyter Notebook</div>
                <div className="tool-item-desc">Exploration de données</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tool-category">
          <div className="tool-category-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M7 14l4-4 3 3 5-6" />
            </svg>
          </div>
          <h3 className="tool-category-title">Data, IA & Visualisation</h3>
          <p className="tool-category-desc">Pour transformer la donnée en information</p>
          <div className="tool-list">
            <div className="tool-item">
              <div className="tool-item-icon">BI</div>
              <div>
                <div className="tool-item-name">Power BI Desktop</div>
                <div className="tool-item-desc">Dashboards & rapports interactifs</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">BK</div>
              <div>
                <div className="tool-item-name">Beekeeper</div>
                <div className="tool-item-desc">Explorateur de base de données</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">LM</div>
              <div>
                <div className="tool-item-name">LM Studio</div>
                <div className="tool-item-desc">IA & Modèles</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">ST</div>
              <div>
                <div className="tool-item-name">Streamlit</div>
                <div className="tool-item-desc">Mise en ligne d'applications data</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">CO</div>
              <div>
                <div className="tool-item-name">Google Colab</div>
                <div className="tool-item-desc">Notebooks cloud & ML</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tool-category">
          <div className="tool-category-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="7" r="4" />
              <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
              <circle cx="18" cy="7" r="3" />
            </svg>
          </div>
          <h3 className="tool-category-title">Organisation & Veille</h3>
          <p className="tool-category-desc">Pour structurer mon travail et rester à jour</p>
          <div className="tool-list">
            <div className="tool-item">
              <div className="tool-item-icon">DC</div>
              <div>
                <div className="tool-item-name">Discord</div>
                <div className="tool-item-desc">Communication & veille</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">NO</div>
              <div>
                <div className="tool-item-name">Notion</div>
                <div className="tool-item-desc">Gestion de projets & notes</div>
              </div>
            </div>
            <div className="tool-item">
              <div className="tool-item-icon">IN</div>
              <div>
                <div className="tool-item-name">LinkedIn</div>
                <div className="tool-item-desc">Réseau & veille professionnelle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tools
```

- [ ] **Step 4: Vérifier avec ESLint**

Run: `npx eslint src/components/BusinessCase.jsx src/components/Skills.jsx src/components/Tools.jsx`
Expected: aucune sortie

- [ ] **Step 5: Commit**

```bash
git add src/components/BusinessCase.jsx src/components/Skills.jsx src/components/Tools.jsx
git commit -m "feat: composants BusinessCase, Skills et Tools (non branchés)"
```

---

### Task 7: Composants Contact et Footer

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Produces (utilisés par la tâche 8) : `Contact()` et `Footer()`, composants par défaut sans props ; `Contact` rend `<section id="contact">`.

- [ ] **Step 1: Créer `src/components/Contact.jsx`**

```jsx
function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">
        <span className="section-number">06 /</span> Contact
      </h2>
      <div className="contact-card">
        <p className="contact-text">
          Intéressé par mon profil ? N&apos;hésitez pas à me contacter pour discuter
          d&apos;opportunités d&apos;alternance.
        </p>
        <ul className="contact-list">
          <li>
            <span className="contact-label">mail</span>
            <a href="mailto:alex_2c@hotmail.fr">alex_2c@hotmail.fr</a>
          </li>
          <li>
            <span className="contact-label">linkedin</span>
            <a href="https://www.linkedin.com/in/alex-cattelin/" target="_blank" rel="noreferrer">
              /in/alex-cattelin
            </a>
          </li>
          <li>
            <span className="contact-label">cv</span>
            <a href="Alex_Cattelin_CV_Epitech_Alt.pdf" target="_blank" rel="noreferrer">
              télécharger le CV
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Contact
```

- [ ] **Step 2: Créer `src/components/Footer.jsx`**

```jsx
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Alex Cattelin. Portfolio Data Analyst.</p>
    </footer>
  )
}

export default Footer
```

- [ ] **Step 3: Vérifier avec ESLint**

Run: `npx eslint src/components/Contact.jsx src/components/Footer.jsx`
Expected: aucune sortie

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx src/components/Footer.jsx
git commit -m "feat: composants Contact et Footer (non branchés)"
```

---

### Task 8: Brancher App.jsx, retirer framer-motion et les anciens fichiers

**Files:**
- Modify: `src/App.jsx` (réécriture complète)
- Modify: `package.json` (retirer la dépendance `framer-motion`)
- Delete: `src/style.css`
- Delete: `src/index.css`

**Interfaces:**
- Consumes: `Sidebar` (tâche 3), `Hero`/`About` (tâche 4), `ProjectsLog` (tâche 5), `BusinessCase`/`Skills`/`Tools` (tâche 6), `Contact`/`Footer` (tâche 7), `src/data/navigation.js` (tâche 1), `src/styles/style.css` (tâche 2).

- [ ] **Step 1: Réécrire `src/App.jsx`**

```jsx
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import ProjectsLog from './components/ProjectsLog'
import BusinessCase from './components/BusinessCase'
import Skills from './components/Skills'
import Tools from './components/Tools'
import Contact from './components/Contact'
import Footer from './components/Footer'
import navigation from './data/navigation'
import './styles/style.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const elements = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-shell">
      <Sidebar activeSection={activeSection} />
      <main className="content">
        <Hero />
        <About />
        <ProjectsLog />
        <BusinessCase />
        <Skills />
        <Tools />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default App
```

- [ ] **Step 2: Supprimer les anciens fichiers de style**

```bash
git rm src/style.css src/index.css
```

- [ ] **Step 3: Retirer `framer-motion` de `package.json`**

Dans `package.json`, supprimer la ligne :

```json
    "framer-motion": "^12.40.0",
```

de la section `"dependencies"`.

- [ ] **Step 4: Réinstaller les dépendances pour mettre à jour `package-lock.json`**

Run: `npm install`
Expected: sortie sans erreur, `package-lock.json` modifié (retrait de `framer-motion` et ses sous-dépendances)

- [ ] **Step 5: Vérifier avec ESLint**

Run: `npm run lint`
Expected: aucune erreur (le script `lint` exécute `eslint .` sur tout le projet)

- [ ] **Step 6: Vérifier que le build de production passe**

Run: `npm run build`
Expected: sortie `vite build` se terminant par `✓ built in ...` sans erreur

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx package.json package-lock.json
git commit -m "feat: brancher la nouvelle UI Data Terminal, retirer framer-motion et les anciens styles"
```

---

### Task 9: Vérification manuelle finale

**Files:** aucun (vérification uniquement)

- [ ] **Step 1: Lancer le serveur de dev**

Run: `npm run dev`
Expected: serveur démarré sur `http://localhost:5173/portfolio/`

- [ ] **Step 2: Vérifier la vue desktop dans le navigateur**

Ouvrir `http://localhost:5173/portfolio/` dans le navigateur, fenêtre large (`≥1024px`) :
- La sidebar est fixe à gauche, les 6 sections numérotées sont listées, l'item correspondant à la section visible est surligné en ambre au scroll
- Le hero affiche le nom, le rôle en ambre, le curseur `_` clignote après le sous-titre, le bloc stats (`05`, `02`, `2024`) est visible à droite
- La section Projets affiche les 5 projets en lignes compactes ; cliquer sur une ligne l'ouvre en accordéon (visuel + description + lien), en cliquer une deuxième la referme
- Aucune trace de dégradé violet/cyan, de `box-shadow` néon ni d'animation de fade-in au scroll ne subsiste

- [ ] **Step 3: Vérifier la vue mobile**

Réduire la fenêtre (ou ouvrir les devtools en mode responsive) à `<768px` :
- La sidebar devient une barre horizontale en haut, scrollable, sans les liens mail/linkedin
- Le hero passe en colonne, les stats passent sous le texte
- Les lignes de projets masquent les tags/statut mais restent cliquables pour ouvrir l'accordéon

- [ ] **Step 4: Arrêter le serveur de dev**

Arrêter le processus `npm run dev` (Ctrl+C ou équivalent).

- [ ] **Step 5: Commit final si des ajustements ont été faits pendant la vérification**

```bash
git add -A
git commit -m "fix: ajustements visuels suite à la vérification manuelle Data Terminal"
```

(Si aucun ajustement n'a été nécessaire, ne rien committer à cette étape.)

---

## Self-Review Notes

- **Couverture de la spec** : palette/typo (Task 2), sidebar + responsive (Tasks 2-3), hero + stats + curseur (Task 4), liste log + accordéon (Task 5), business case/skills/tools/contact reskinnés (Tasks 6-7), suppression `framer-motion` + `src/index.css` (Task 8), découpage en composants + `data/projects.js` (Tasks 1-8), vérification lint/build/manuelle (Tasks 1-9). Tous les points de la spec sont couverts.
- **Cohérence des types/noms** : `project.link.label`/`project.link.url` utilisés de façon identique dans `data/projects.js` (Task 1) et `ProjectRow.jsx` (Task 5) ; `navigation` (id/number/label) identique entre `data/navigation.js` (Task 1), `Sidebar.jsx` (Task 3) et `App.jsx` (Task 8).
- **Ordre des tâches** : chaque nouveau fichier est créé et lintable indépendamment avant d'être branché dans `App.jsx` à la Task 8, ce qui garantit que le site déployé (build précédent) n'est jamais cassé entre deux commits avant la bascule finale.
