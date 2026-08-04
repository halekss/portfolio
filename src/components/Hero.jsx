import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'

const STATS = [
  { value: '06', label: 'projets livrés' },
  { value: '04', label: 'business case' },
  { value: '2025', label: 'début reconversion data' },
]

function Stat({ stat, active }) {
  const value = useCountUp(stat.value, active)
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{stat.label}</span>
    </div>
  )
}

function Hero() {
  const [ref, visible] = useReveal({ threshold: 0.1 })

  return (
    <header id="home" className="hero" ref={ref}>
      <div className={`hero-text reveal ${visible ? 'is-visible' : ''}`}>
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
      <div className={`hero-stats reveal reveal-delay-1 ${visible ? 'is-visible' : ''}`}>
        {STATS.map((stat) => (
          <Stat stat={stat} active={visible} key={stat.label} />
        ))}
      </div>
    </header>
  )
}

export default Hero
