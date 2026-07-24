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
