import { useState } from 'react'
import './style.css' // On importe ton fichier CSS ici

function App() {
  return (
    <div>
      {/* --- NAVIGATION --- */}
      <nav>
        <div className="nav-container">
          <div className="logo">Portfolio.AC/DA</div>
          <ul className="nav-links">
            <li><a href="#home">Accueil</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#skills">Compétences</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="container">
        
        {/* --- HEADER --- */}
        <header id="home">
          <h1>Alex Cattelin<br /><span className="gradient-text">Data Analyst</span></h1>
          <p className="subtitle">En route vers l'Engineering & la Data Science.</p>
          
          <div className="btn-group">
            <a href="#projects" className="btn btn-primary">Voir mes projets</a>
            <a href="#contact" className="btn btn-outline">Me contacter</a>
          </div>
        </header>

        {/* --- SECTION ABOUT --- */}
        <section id="about">
          <h2 className="section-title">À propos</h2>
          {/* Note la conversion du style en objet JS {{ }} */}
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px' }}>
            Actuellement en reconversion professionnelle vers les métiers de la data, je développe mes compétences en analyse de données, visualisation et machine learning. Je recherche une alternance en tant que <strong>Data Engineer</strong> ou <strong>Data Scientist</strong> pour approfondir mes connaissances et contribuer à des projets data ambitieux.
          </p>
        </section>

        {/* --- SECTION SKILLS --- */}
        <section id="skills">
          <h2 className="section-title">Mes Compétences</h2>
          
          <div className="skills-grid">
            <div className="skill-card">
              <h3 className="skill-title">Langages & Outils</h3>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-card">
              <h3 className="skill-title">Data Analysis & Viz</h3>
              <div className="skill-tags">
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Seaborn</span>
                <span className="skill-tag">Plotly</span>
              </div>
            </div>

            <div className="skill-card">
              <h3 className="skill-title">Data Engineering & ML</h3>
              <div className="skill-tags">
                <span className="skill-tag">Scikit-learn</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION PROJECTS --- */}
        <section id="projects">
          <h2 className="section-title">Projets Réalisés</h2>
          
          <div className="projects-grid">

            {/* Projet 1 */}
            <article className="project-card">
              {/* Le chemin d'image commence par / pour aller chercher dans public */}
              <div className="project-img" style={{ backgroundImage: "url('images/pict_toys_and_models.png')" }}></div>
              <div className="card-content">
                <h3 className="card-title">Dashboard KPI Financiers : Toys & Models</h3>
                <p className="card-desc">Création de requêtes SQL complexes pour extraire les indicateurs clés et visualisation interactive sur Power BI.</p>
                <a href="toys_and_models.pdf" target="_blank" className="card-link">Voir le Dashboard &rarr;</a>
              </div>
            </article>

            {/* Projet 2 */}
            <article className="project-card">
              <div className="project-img" style={{ backgroundImage: "url('images/senechal_movie.png')" }}></div>
              <div className="card-content">
                <h3 className="card-title">Modèle de recommandation de films</h3>
                <p className="card-desc">Exploration et nettoyage d'un jeu de données pour entrainement d'un modèle de Machine Learning, utilisable directement sur une application Streamlit.</p>
                <a href="https://senechalmovieapp-cvl6oryohmkmr7rzmgngg9.streamlit.app/" target="_blank" className="card-link">Voir le site &rarr;</a>
              </div>
            </article>

          </div>
        </section>

        {/* --- SECTION CONTACT --- */}
        <section id="contact">
          <h2 className="section-title">Me Contacter</h2>
          <div className="contact-box">
            <p className="contact-text">
              Intéressé par mon profil ? N'hésitez pas à me contacter pour discuter d'opportunités d'alternance.
            </p>
            <div className="btn-group">
              <a href="mailto:alex_2c@hotmail.fr" className="btn btn-primary">M'envoyer un mail</a>
              <a href="https://www.linkedin.com/in/alex-cattelin/" target="_blank" className="btn btn-outline">LinkedIn</a>
              <a href="Alex_Cattelin_Alternance.pdf" target="_blank" className="btn btn-outline">Mon CV</a>
              <a href="https://github.com/halekss" target="_blank" className="btn btn-outline">Mon GitHub</a>
            </div>
          </div>
        </section>

        <footer>
          <p>&copy; 2025 Alex Cattelin. Portfolio Data Analyst.</p>
        </footer>

      </div>
    </div>
  )
}

export default App
