# Palette violette + carrousel Business Case Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la palette bleu/cyan du portfolio par la palette violette du CV, et transformer la section Business Case (4 cases) en carrousel horizontal navigable par flèches et dots.

**Architecture:** Tout le thème passe par des variables CSS `:root` dans `src/styles/style.css` — le remap de couleurs est un changement localisé à ce bloc. Le carrousel est un composant React avec état local (`useState`) pilotant une transformation CSS (`translateX`) sur une track flex ; les données des 4 business cases sont extraites dans `src/data/businessCases.js` (même pattern que `src/data/projects.js`).

**Tech Stack:** React 19 (Vite), CSS vanilla (pas de librairie carrousel/UI), pas de framework de test dans le projet (vérification par `npm run lint`, `npm run build`, et contrôle visuel via `npm run dev`).

## Global Constraints

- Aucune couleur en dur dans les composants JSX — tout passe par les variables CSS de `:root`.
- Le thème reste sombre : `--bg` (`#000000`), `--bg-darkest` (`#0d1317`) et `--text` (`#f2f2ef`) ne changent pas.
- Pas de librairie externe ajoutée (pas de Swiper/Embla/etc.) — carrousel en React + CSS natif.
- Pas de boucle sur le carrousel : les flèches se désactivent en butée (1er/dernier slide) — confirmé avec l'utilisateur.
- Indicateur de position sous forme de dots cliquables (pas de compteur texte) — confirmé avec l'utilisateur.
- Pas de swipe tactile, pas de navigation clavier dédiée, pas d'autoplay (hors périmètre explicite de la spec).

---

### Task 1: Remap de la palette de couleurs

**Files:**
- Modify: `src/styles/style.css:1-21` (bloc `:root`)

**Interfaces:**
- Produces: tokens CSS `--deep`, `--indigo`, `--violet`, `--purple`, `--purple-mid`, `--purple-light`, `--purple-xlight`, `--border-violet`, `--muted-violet` disponibles pour toute règle CSS ultérieure (y compris Task 3). `--accent`, `--accent-2`, `--accent-3`, `--accent-rgb`, `--accent-2-rgb`, `--accent-3-rgb`, `--bg-navy`, `--surface`, `--border`, `--text-muted` gardent leurs noms mais changent de valeur.

- [ ] **Step 1: Remplacer le bloc `:root` par la nouvelle palette**

Remplacer les lignes 1 à 21 de `src/styles/style.css` (de `:root {` à la fermeture avant `* { box-sizing: border-box; }`) par :

```css
:root {
  --bg: #000000;
  --bg-darkest: #0d1317;

  --deep:      #2a2040;
  --indigo:    #3b3b58;
  --violet:    #7a5980;
  --purple:    #a96da3;
  --purple-mid:#8a60a0;
  --purple-light: #e8dff0;
  --purple-xlight: #f4f0f8;
  --border-violet: #d8cce8;
  --muted-violet: #8a7898;

  --bg-navy: var(--deep);
  --surface: var(--deep);
  --border: rgba(216, 204, 232, 0.16);
  --text: #f2f2ef;
  --text-muted: var(--muted-violet);
  --accent: var(--purple-mid);
  --accent-rgb: 138, 96, 160;
  --accent-2: var(--purple);
  --accent-2-rgb: 169, 109, 163;
  --accent-3: var(--purple-light);
  --accent-3-rgb: 232, 223, 240;
  --sidebar-w: 260px;

  --font-display: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

- [ ] **Step 2: Lancer le lint**

Run: `npm run lint`
Expected: pas d'erreur (le CSS n'est pas lint-checké par ce script mais ça vérifie qu'aucune régression JS n'a été introduite par erreur).

- [ ] **Step 3: Lancer le serveur de dev et vérifier visuellement**

Run: `npm run dev`
Ouvrir la page dans le navigateur et vérifier que :
- Le dégradé de fond, les bordures, le curseur clignotant du hero, les liens actifs de la sidebar, les boutons et les cards utilisent des tons violets (plus aucun bleu/cyan visible).
- Le texte reste clair (blanc/gris) sur fond noir, la lisibilité est inchangée.

- [ ] **Step 4: Commit**

```bash
git add src/styles/style.css
git commit -m "style: remap la palette bleue vers la palette violette du CV"
```

---

### Task 2: Extraction des données Business Case

**Files:**
- Create: `src/data/businessCases.js`

**Interfaces:**
- Consumes: rien (données statiques, recopiées telles quelles depuis `src/components/BusinessCase.jsx` actuel).
- Produces: `export const businessCases` — un tableau de 4 objets `{ id: string, image: string, title: string, description: string, links: { url: string, label: string, variant: 'primary' | 'outline' }[] }`, consommé par Task 3.

- [ ] **Step 1: Créer le fichier de données**

Créer `src/data/businessCases.js` avec exactement ce contenu :

```js
export const businessCases = [
  {
    id: 'jeux-video',
    image: 'images/illus_jv.png',
    title: 'Consommation du jeu vidéo',
    description:
      "Analyse approfondie des performances commerciales des jeux vidéos selon différents " +
      "facteurs et recommandations stratégiques présentées au client en vue de créer un " +
      "nouveau jeu.",
    links: [
      { url: 'pbi_jeux_video.pdf', label: 'Rapport Power BI', variant: 'primary' },
      { url: 'PPT_bc_jeux_video.pdf', label: 'Support PPT', variant: 'outline' },
    ],
  },
  {
    id: 'telephone',
    image: 'images/tel_low_cost.png',
    title: "Lancement d'un téléphone entrée de gamme",
    description:
      "Comparaison stratégique des marques et produits fortement implémentés sur le marché " +
      "afin d'établir un prix concurentiel d'un téléphone entrée de gamme.",
    links: [
      { url: 'pbi_phone.pdf', label: 'Rapport Power BI', variant: 'primary' },
      { url: 'ppt_phone.pdf', label: 'Support PPT', variant: 'outline' },
    ],
  },
  {
    id: 'eau-potable',
    image: 'images/eau-potable-fontaineo.png',
    title: "Accès et sanité de l'eau",
    description:
      "Repérage des inégalités dans le monde à l'accès à l'eau potable ou non, et détermination " +
      "d'un lieu d'intervention d'une action humanitaire pour permettre l'accès aux plus démunis en " +
      "fonction de différents facteurs.",
    links: [
      { url: 'pbi_watergate.pdf', label: 'Rapport Power BI', variant: 'primary' },
      { url: 'ppt_watergate.pdf', label: 'Support PPT', variant: 'outline' },
    ],
  },
  {
    id: 'cyclisme',
    image: 'images/bike_riding.png',
    title: "Lancement d'une boutique de cyclisme",
    description:
      "Analyse du marché consommateur des vélos et des accessoires de cyclismes + habitudes des usagers " +
      "afin de lancer une boutique dans un secteur adéquat.",
    links: [
      { url: 'buisness_case_bike.pdf', label: 'Support PPT (inclus Rapport Power BI)', variant: 'primary' },
    ],
  },
]
```

- [ ] **Step 2: Lancer le lint**

Run: `npm run lint`
Expected: pas d'erreur.

- [ ] **Step 3: Commit**

```bash
git add src/data/businessCases.js
git commit -m "feat: extraire les données Business Case dans src/data/businessCases.js"
```

---

### Task 3: Carrousel Business Case (composant + CSS)

**Files:**
- Modify: `src/components/BusinessCase.jsx` (réécriture complète)
- Modify: `src/styles/style.css` (bloc `/* ===== BUSINESS CASE ===== */`, lignes ~359-384 dans la version actuelle, + ajout dans le bloc `@media (max-width: 768px)`)

**Interfaces:**
- Consumes: `businessCases` depuis `src/data/businessCases.js` (Task 2) ; `useReveal` depuis `src/hooks/useReveal.js` (signature existante : `const [ref, visible] = useReveal()`).
- Produces: composant `BusinessCase` (export default, inchangé pour ses consommateurs — `App.jsx` continue à l'importer et l'utiliser sans changement).

- [ ] **Step 1: Réécrire `src/components/BusinessCase.jsx`**

Remplacer tout le contenu du fichier par :

```jsx
import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { businessCases } from '../data/businessCases'

function BusinessCase() {
  const [ref, visible] = useReveal()
  const [index, setIndex] = useState(0)

  const isFirst = index === 0
  const isLast = index === businessCases.length - 1

  const goPrev = () => {
    if (!isFirst) setIndex((prev) => prev - 1)
  }

  const goNext = () => {
    if (!isLast) setIndex((prev) => prev + 1)
  }

  return (
    <section id="business-case" className="section">
      <h2 className="section-title">Business Case</h2>

      <div ref={ref} className={`business-carousel reveal ${visible ? 'is-visible' : ''}`}>
        <div
          className="business-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {businessCases.map((businessCase) => (
            <div className="business-carousel-slide" key={businessCase.id}>
              <article className="business-card">
                <div className="business-visual-frame">
                  <div
                    className="business-visual"
                    style={{ backgroundImage: `url('${businessCase.image}')` }}
                  />
                </div>
                <div className="business-content">
                  <h3 className="card-title">{businessCase.title}</h3>
                  <p className="card-desc">{businessCase.description}</p>
                  <div className="btn-group">
                    {businessCase.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn ${link.variant === 'primary' ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-nav">
        <button
          type="button"
          className="carousel-arrow"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Business case précédent"
        >
          &larr;
        </button>
        <div className="carousel-dots">
          {businessCases.map((businessCase, i) => (
            <button
              key={businessCase.id}
              type="button"
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Aller au business case ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-arrow"
          onClick={goNext}
          disabled={isLast}
          aria-label="Business case suivant"
        >
          &rarr;
        </button>
      </div>
    </section>
  )
}

export default BusinessCase
```

- [ ] **Step 2: Remplacer le bloc CSS Business Case**

Dans `src/styles/style.css`, remplacer tout le bloc actuel :

```css
/* ===== BUSINESS CASE ===== */
.business-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: center;
}

.business-visual-frame {
  overflow: hidden;
  border-radius: 6px;
}

.business-visual {
  min-height: 240px;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  border: 1px solid var(--border);
  transition: transform 0.4s ease;
}

.business-visual-frame:hover .business-visual { transform: scale(1.05); }

.business-content .card-desc { margin: 16px 0 24px; }
```

par :

```css
/* ===== BUSINESS CASE ===== */
.business-carousel {
  overflow: hidden;
}

.business-carousel-track {
  display: flex;
  transition: transform 0.4s ease;
}

.business-carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
}

.business-card {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: center;
}

.business-visual-frame {
  overflow: hidden;
  border-radius: 6px;
}

.business-visual {
  min-height: 240px;
  background-color: var(--surface);
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  border: 1px solid var(--border);
  transition: transform 0.4s ease;
}

.business-visual-frame:hover .business-visual { transform: scale(1.05); }

.business-content .card-desc { margin: 16px 0 24px; }

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 30px;
}

.carousel-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: none;
  color: var(--text);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.carousel-arrow:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent-3);
  box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.3);
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 10px;
}

.carousel-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.carousel-dot:hover { border-color: var(--accent); }

.carousel-dot.is-active {
  background-color: var(--accent);
  border-color: var(--accent);
  transform: scale(1.2);
}
```

- [ ] **Step 3: Ajouter les ajustements mobile**

Dans `src/styles/style.css`, à l'intérieur du bloc `@media (max-width: 768px)` existant, juste après la ligne `.business-card { grid-template-columns: 1fr; }`, ajouter :

```css
  .carousel-nav { gap: 16px; margin-top: 20px; }

  .carousel-arrow { width: 34px; height: 34px; font-size: 1rem; }
```

- [ ] **Step 4: Lancer le lint**

Run: `npm run lint`
Expected: pas d'erreur.

- [ ] **Step 5: Lancer le build**

Run: `npm run build`
Expected: build réussi sans erreur.

- [ ] **Step 6: Vérification manuelle dans le navigateur**

Run: `npm run dev`
Ouvrir la section Business Case et vérifier :
- Le premier slide (Consommation du jeu vidéo) s'affiche, la flèche gauche est désactivée (grisée, non cliquable), la flèche droite est active.
- Cliquer sur la flèche droite fait glisser horizontalement vers le slide suivant (transition fluide), le dot correspondant devient actif.
- Avancer jusqu'au 4e slide (cyclisme, un seul bouton) : la flèche droite devient désactivée.
- Cliquer directement sur un dot navigue vers le slide correspondant.
- Réduire la fenêtre à une largeur mobile (< 768px) : le slide passe en 1 colonne, les flèches/dots restent utilisables et sont plus petits.
- Le carrousel entier apparaît avec l'animation `reveal` (fade + translateY) au scroll dans la section.

- [ ] **Step 7: Commit**

```bash
git add src/components/BusinessCase.jsx src/styles/style.css
git commit -m "feat: transformer Business Case en carrousel horizontal avec flèches et dots"
```

---

## Self-Review Notes

- **Spec coverage** : remap couleurs (Task 1) ✅, extraction données (Task 2) ✅, carrousel avec track/transform, flèches désactivées en butée, dots cliquables, responsive mobile, reveal corrigé sur conteneur unique (Task 3) ✅. Rien du spec n'est laissé de côté ; le hors-périmètre (swipe, clavier, autoplay, librairie externe) n'est délibérément pas implémenté.
- **Placeholders** : aucun — chaque step contient le code exact à écrire.
- **Cohérence des types/noms** : `businessCases` (Task 2) exporté avec les champs `id/image/title/description/links[{url,label,variant}]`, consommés à l'identique dans `BusinessCase.jsx` (Task 3). `--accent`, `--accent-rgb`, `--border` définis en Task 1 sont réutilisés tels quels par les nouvelles règles `.carousel-arrow`/`.carousel-dot` en Task 3.
