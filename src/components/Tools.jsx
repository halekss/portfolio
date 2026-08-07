import { useReveal } from '../hooks/useReveal'

function Tools() {
  const [ref, visible] = useReveal()

  return (
    <section id="tools" className="section">
      <h2 className="section-title">
        <span className="section-number">05 /</span> Outils
      </h2>
      <div ref={ref} className={`tools-grid reveal ${visible ? 'is-visible' : ''}`}>
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
              <div className="tool-item-icon">LN</div>
              <div>
                <div className="tool-item-name">Linear</div>
                <div className="tool-item-desc">Gestion de projets</div>
              </div>
            </div>
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
                <div className="tool-item-desc">Notes & guides</div>
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
