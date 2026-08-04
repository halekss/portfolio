import { useReveal } from '../hooks/useReveal'

function BusinessCase() {
  const [ref, visible] = useReveal()

  return (
    <section id="business-case" className="section">
      <h2 className="section-title">Business Case</h2>

      <article ref={ref} className={`business-card reveal ${visible ? 'is-visible' : ''}`}>
        <div className="business-visual-frame">
          <div
            className="business-visual"
            style={{ backgroundImage: "url('images/illus_jv.png')" }}
          />
        </div>
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

      <article ref={ref} className={`business-card reveal ${visible ? 'is-visible' : ''}`}>
        <div className="business-visual-frame">
          <div
            className="business-visual"
            style={{ backgroundImage: "url('images/tel_low_cost.png')" }}
          />
        </div>
        <div className="business-content">
          <h3 className="card-title">Lancement d'un téléphone entrée de gamme</h3>
          <p className="card-desc">
            Comparaison stratégique des marques et produits fortement implémentés sur le marché
            afin d'établir un prix concurentiel d'un téléphone entrée de gamme.
          </p>
          <div className="btn-group">
            <a href="pbi_phone.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              Rapport Power BI
            </a>
            <a href="ppt_phone.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              Support PPT
            </a>
          </div>
        </div>
      </article>

      <article ref={ref} className={`business-card reveal ${visible ? 'is-visible' : ''}`}>
        <div className="business-visual-frame">
          <div
            className="business-visual"
            style={{ backgroundImage: "url('images/eau-potable-fontaineo.png')" }}
          />
        </div>
        <div className="business-content">
          <h3 className="card-title">Accès et sanité de l'eau</h3>
          <p className="card-desc">
            Repérage des inégalités dans le monde à l'accès à l'eau potable ou non, et détermination 
            d'un lieu d'intervention d'une action humanitaire pour permettre l'accès aux plus démunis en
            fonction de différents facteurs.
          </p>
          <div className="btn-group">
            <a href="pbi_watergate.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              Rapport Power BI
            </a>
            <a href="ppt_watergate.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
              Support PPT
            </a>
          </div>
        </div>
      </article>

      <article ref={ref} className={`business-card reveal ${visible ? 'is-visible' : ''}`}>
        <div className="business-visual-frame">
          <div
            className="business-visual"
            style={{ backgroundImage: "url('images/eau-potable-fontaineo.png')" }}
          />
        </div>
        <div className="business-content">
          <h3 className="card-title">Lancement d'une boutique de cyclisme</h3>
          <p className="card-desc">
            Analyse du marché consommateur des vélos et des accessoires de cyclismes + habitudes des usagers 
            afin de lancer une boutique dans un secteur adéquat.
          </p>
          <div className="btn-group">
            <a href="buisness_case_bike.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              Support PPT (inclus Rapport Power BI)
            </a>
          </div>
        </div>
      </article>

    </section>
  )
}

export default BusinessCase
