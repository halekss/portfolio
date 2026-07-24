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
