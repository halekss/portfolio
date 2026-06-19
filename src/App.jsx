import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './style.css' // On importe ton fichier CSS ici

// --- Variantes d'animation réutilisables ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// Sections suivies par la navbar (scroll-spy)
const NAV_SECTIONS = ['home', 'about', 'projects', 'skills', 'tools', 'contact']

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const elements = NAV_SECTIONS
      .map((id) => document.getElementById(id))
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

  const linkClass = (id) => (activeSection === id ? 'active' : '')

  return (
    <div>
      {/* --- NAVIGATION --- */}
      <nav>
        <div className="nav-container">
          <div className="logo">Portfolio.AC/DA</div>
          <ul className="nav-links">
            <li><a href="#home" className={linkClass('home')}>Accueil</a></li>
            <li><a href="#about" className={linkClass('about')}>À propos</a></li>
            <li><a href="#projects" className={linkClass('projects')}>Projets</a></li>
            <li><a href="#skills" className={linkClass('skills')}>Compétences</a></li>
            <li><a href="#tools" className={linkClass('tools')}>Outils</a></li>
            <li><a href="#contact" className={linkClass('contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">

        {/* --- HEADER --- */}
        <header id="home">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainer}
          >
            <motion.h1 variants={fadeUp}>
              Alex Cattelin<br /><span className="gradient-text">Data Analyst</span>
            </motion.h1>
            <motion.p className="subtitle" variants={fadeUp}>
              Convertir la donnée brute en information exploitable : c'est ce qui me motive. Data Analyst junior, je cherche à enrichir mon expertise technique et explorer les passerelles vers le Data Engineering et la Data Science sur des projets concrets.
            </motion.p>

            <motion.div className="btn-group" variants={fadeUp}>
              <a href="#projects" className="btn btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn btn-outline">Me contacter</a>
            </motion.div>
          </motion.div>
        </header>

        {/* --- SECTION ABOUT --- */}
        <section id="about">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            À propos
          </motion.h2>
          <motion.p
            style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Actuellement en reconversion professionnelle vers les métiers de la data, je développe mes compétences en analyse de données, visualisation et machine learning. Je recherche une alternance en tant que <strong>Data Engineer</strong> ou <strong>Data Scientist</strong> pour approfondir mes connaissances et contribuer à des projets data ambitieux.
          </motion.p>
        </section>

        {/* --- SECTION PROJECTS (cartes empilées au scroll) --- */}
        <section id="projects">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Projets Réalisés
          </motion.h2>

          <div className="stack-wrapper">

            {/* Projet 1 */}
            <article className="stack-card">
              <motion.div
                className="stack-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="tech-stack">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Leaflet</span>
                  <span className="tech-tag">Web Scraping</span>
                  <span className="tech-tag">Chatbot IA</span>
                  <span className="tech-tag">XGBoost</span>
                </div>
                <h3 className="card-title">Oracle des Loyers</h3>
                <p className="card-desc">Récupération et affichage sur map React d'annonces immobilières & établissements commerciaux / publics avec intégration chatbot cynique pour comparer les prix entre les quartiers de Lyon.</p>
                <a href="https://github.com/halekss/oracle_loyers.git" target="_blank" className="btn btn-outline">Voir le dépôt Github &rarr;</a>
              </motion.div>
              <motion.div
                className="stack-visual"
                style={{ backgroundImage: "url('images/view_website_oracle.png')" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </article>
            
            {/* Projet 2 */}
            <article className="stack-card">
              <motion.div
                className="stack-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="tech-stack">
                  <span className="tech-tag">OAuth</span>
                  <span className="tech-tag">Github Actions</span>
                  <span className="tech-tag">HTML/CSS</span>
                </div>
                <h3 className="card-title">Pipeline et Viz de données API</h3>
                <p className="card-desc">Projet Data end-to-end : collecte automatisée de données via une API REST authentifiée, traitement et structuration en CSV, puis restitution dans un dashboard web interactif mis à jour quotidiennement.</p>
                <a href="https://halekss.github.io/data_classification_API_blizzard/" target="_blank" className="btn btn-outline">Voir le dashboard &rarr;</a>
              </motion.div>
              <motion.div
                className="stack-visual"
                style={{ backgroundImage: "url('images/main_screen_dashboard_wow.png')" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </article>

            {/* Projet 3 */}
            <article className="stack-card">
              <motion.div
                className="stack-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="tech-stack">
                  <span className="tech-tag">Playwright</span>
                  <span className="tech-tag">Asyncio</span>
                  <span className="tech-tag">Github Actions</span>
                  <span className="tech-tag">Webhook Discord</span>
                </div>
                <h3 className="card-title">Scraper automate avec alerte Discord</h3>
                <p className="card-desc">Un script Python automatisé et asynchrone pour suivre les meilleurs builds de talents "Gouffres" (Delves) pour toutes les spécialisations de *World of Warcraft* depuis Wowhead, avec notifications Discord en temps réel.</p>
                <a href="https://github.com/halekss/webhook_discord_wowhead.git" target="_blank" className="btn btn-outline">Voir le Github &rarr;</a>
              </motion.div>
              <motion.div
                className="stack-visual"
                style={{ backgroundImage: "url('images/logo_wowhead.png')" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </article>

            {/* Projet 4 */}
            <article className="stack-card">
              <motion.div
                className="stack-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="tech-stack">
                  <span className="tech-tag">Streamlit</span>
                  <span className="tech-tag">Machine Learning</span>
                </div>
                <h3 className="card-title">Modèle de recommandation de films</h3>
                <p className="card-desc">Exploration et nettoyage d'un jeu de données pour entrainement d'un modèle de Machine Learning, utilisable directement sur une application Streamlit.</p>
                <a href="https://senechalmovieapp-cvl6oryohmkmr7rzmgngg9.streamlit.app/" target="_blank" className="btn btn-outline">Voir le site &rarr;</a>
              </motion.div>
              <motion.div
                className="stack-visual"
                style={{ backgroundImage: "url('images/senechal_movie.png')" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </article>

            {/* Projet 5 */}
            <article className="stack-card">
              <motion.div
                className="stack-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
              >
                <div className="tech-stack">
                  <span className="tech-tag">Power BI</span>
                  <span className="tech-tag">SQL</span>
                </div>
                <h3 className="card-title">Dashboard KPI Financiers : Toys & Models</h3>
                <p className="card-desc">Création de requêtes SQL complexes pour extraire les indicateurs clés et visualisation interactive sur Power BI.</p>
                <a href="toys_and_models.pdf" target="_blank" className="btn btn-outline">Voir le Dashboard &rarr;</a>
              </motion.div>
              <motion.div
                className="stack-visual"
                style={{ backgroundImage: "url('images/pict_toys_and_models.png')" }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ></motion.div>
            </article>



          </div>
        </section>

        {/* --- SECTION BUSINESS CASE --- */}
        <section id="business-case">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Business Case
          </motion.h2>

          <motion.article
            className="stack-card stack-card-static"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="stack-content">
              <h3 className="card-title">Consommation du jeu vidéo</h3>
              <p className="card-desc">Analyse approfondie des performances commerciales des jeux vidéos selon différents facteurs et recommandations stratégiques présentées au client en vue de créer un nouveau jeu.</p>

              <div style={{ display: 'flex', gap: '15px', marginTop: '1rem', flexWrap: 'wrap' }}>
                <a href="pbi_jeux_video.pdf" target="_blank" className="btn btn-primary">
                  Rapport Power BI
                </a>
                <a href="PPT_bc_jeux_video.pdf" target="_blank" className="btn btn-outline">
                  Support PPT
                </a>
              </div>
            </div>
            <div
              className="stack-visual"
              style={{ backgroundImage: "url('images/illus_jv.png')" }}
            ></div>
          </motion.article>

          {/* Tu peux dupliquer le bloc <motion.article> ci-dessus pour ajouter un 2ème Business Case */}
        </section>

        {/* --- SECTION SKILLS --- */}
        <section id="skills">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Mes Compétences
          </motion.h2>

          <motion.div
            className="skills-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="skill-card" variants={fadeUp}>
              <h3 className="skill-title">Langages & Outils</h3>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">SQL</span>
              </div>
            </motion.div>

            <motion.div className="skill-card" variants={fadeUp}>
              <h3 className="skill-title">Data Analysis & Viz</h3>
              <div className="skill-tags">
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Seaborn</span>
                <span className="skill-tag">Plotly</span>
              </div>
            </motion.div>

            <motion.div className="skill-card" variants={fadeUp}>
              <h3 className="skill-title">Data Engineering & ML</h3>
              <div className="skill-tags">
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">API & WebScraping</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Airflow</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* --- SECTION TOOLS (logiciels & sites utilisés, regroupés par catégorie) --- */}
        <section id="tools">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Mes Outils
          </motion.h2>

          <motion.div
            className="tools-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Catégorie 1 */}
            <motion.div className="tool-category" variants={fadeUp}>
              <div className="tool-category-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </motion.div>

            {/* Catégorie 2 */}
            <motion.div className="tool-category" variants={fadeUp}>
              <div className="tool-category-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </motion.div>

            {/* Catégorie 3 */}
            <motion.div className="tool-category" variants={fadeUp}>
              <div className="tool-category-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            </motion.div>
          </motion.div>
        </section>

        {/* --- SECTION CONTACT --- */}
        <section id="contact">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            Me Contacter
          </motion.h2>
          <motion.div
            className="contact-box"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="contact-text">
              Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités d'alternance.
            </p>
            <div className="btn-group">
              <a href="mailto:alex_2c@hotmail.fr" className="btn btn-primary">M'envoyer un mail</a>
              <a href="https://www.linkedin.com/in/alex-cattelin/" target="_blank" className="btn btn-outline">LinkedIn</a>
              <a href="Alex_Cattelin_CV_Epitech_Alt.pdf" target="_blank" className="btn btn-outline">Mon CV</a>
            </div>
          </motion.div>
        </section>

        <footer>
          <p>&copy; 2025 Alex Cattelin. Portfolio Data Analyst.</p>
        </footer>

      </div>
    </div>
  )
}

export default App